#==============================================================================
# GROWCTRL Integration – controller
# Zweck   : Steuer-Loops (1 min). Station: Licht/Pumpe inkl. Trocknung, GETEILTE
#           Lichter per ODER-Votes, Failsafe, Manual-Override-Erkennung, Zelt-Gate.
#           Zelt: Master-Enable, Klima VPD-/RH-gefuehrt mit Hysterese, DLI-Akkumulation,
#           Phasen-Empfehlung -> ToDo.
# Version : 2.2.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

import logging
from datetime import date, datetime

from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

# Klartext fuer das Ereignis-Log (Quelle der Status-/Checkup-Bewertungen)
_LOG_TEXT = {
    "light": lambda d: ("Licht AN" if d.get("soll") == "on" else "Licht AUS", "info"),
    "pump": lambda d: ("Pumpe AN" if d.get("soll") == "on" else "Pumpe AUS", "info"),
    "o2": lambda d: ("O2 AN", "info"),
    "fan": lambda d: ("Umluft AN", "info"),
    "humidifier": lambda d: ("Befeuchter AN" if d.get("soll") == "on" else "Befeuchter AUS", "info"),
    "dehumidifier": lambda d: ("Entfeuchter AN" if d.get("soll") == "on" else "Entfeuchter AUS", "info"),
    "exhaust": lambda d: ("Abluft-Boost AN" if d.get("soll") == "on" else "Abluft-Boost AUS", "info"),
    "manual_override": lambda d: (f"Manueller Eingriff erkannt (Ist={d.get('ist')})", "warning"),
    "light_failsafe": lambda d: (f"FAILSAFE: Licht lief {d.get('on_minutes')} min -> Not-Aus", "critical"),
    "time_invalid": lambda d: ("Lichtzeiten unvollstaendig - Automatik pausiert", "warning"),
}

from . import logic
from .const import (
    DATA_LIGHT_VOTES, DATA_TENTS, DEFAULT_MAX_LIGHT_ON_MIN, DOMAIN,
    EVENT_GROWCTRL, LUX_LIGHT_THRESHOLD, STAGE_KEYS, STAGE_MAX_DAYS, STAGE_ORDER,
)
from .runtime import StationRuntime, TentRuntime


class _Base:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    def _is_on(self, eid: str | None) -> bool:
        if not eid:
            return False
        st = self.hass.states.get(eid)
        return st is not None and st.state == "on"

    def _num(self, eid: str | None) -> float | None:
        if not eid:
            return None
        st = self.hass.states.get(eid)
        if st is None:
            return None
        try:
            return float(st.state)
        except (ValueError, TypeError):
            return None

    async def _set_all(self, entities: list[str], on: bool) -> None:
        todo = [e for e in entities if self._is_on(e) != on]
        if todo:
            await self.hass.services.async_call(
                "switch", "turn_on" if on else "turn_off",
                {"entity_id": todo}, blocking=False,
            )


class StationController(_Base):
    """Regelzyklus einer Station."""

    def __init__(self, hass: HomeAssistant, rt: StationRuntime) -> None:
        super().__init__(hass)
        self.rt = rt

    def _fire(self, kind: str, **data) -> None:
        self.hass.bus.async_fire(EVENT_GROWCTRL, {
            "tent": self.rt.tent, "station": self.rt.station, "kind": kind, **data,
        })
        text, level = _LOG_TEXT.get(kind, (lambda d: (kind, "info")))(data)
        self.rt.add_log(text, level)
        getattr(_LOGGER, "warning" if level != "info" else "info")(
            "[%s/%s] %s", self.rt.tent, self.rt.station, text)

    def _tent(self) -> TentRuntime | None:
        return self.hass.data.get(DOMAIN, {}).get(DATA_TENTS, {}).get(self.rt.tent)

    async def _set_light_with_votes(self, want: bool) -> None:
        """Geteilte Lichter: pro Switch ODER-Verknuepfung aller Stations-Wuensche."""
        votes_root: dict = self.hass.data[DOMAIN].setdefault(DATA_LIGHT_VOTES, {})
        for eid in self.rt.light_switches:
            votes = votes_root.setdefault(eid, {})
            votes[self.rt.slug] = want
            desired = logic.aggregate_light_votes(votes)
            await self._set_all([eid], desired)

    async def async_run(self) -> None:
        rt = self.rt

        # Zelt-Gate: deaktiviertes Zelt stoppt alle Stationen (Aktoren aus)
        tent = self._tent()
        if tent is not None and not tent.enabled:
            await self._set_light_with_votes(False)
            await self._set_all(rt.pump_switches, False)
            return

        if not rt.auto or rt.maintenance or rt.testmode:
            rt.manual_override = False
            rt._override_strikes = 0
            return

        if rt.light_on_min is None or rt.light_off_sv_min is None or rt.light_off_bloom_min is None:
            if not rt.time_invalid:
                rt.time_invalid = True
                self._fire("time_invalid")
            return
        rt.time_invalid = False

        now = datetime.now()
        now_min = now.hour * 60 + now.minute
        off_min = logic.off_min_for_stage(rt.stage, rt.light_off_sv_min, rt.light_off_bloom_min)

        # ── DLI je Station: eigener Lux-Sensor (darf geteilt sein), Tagesreset ──
        if rt.lux_sensor:
            today = date.today().isoformat()
            if rt.dli_date != today:
                rt.dli_date, rt.dli_today, rt.lit_seconds_today = today, 0.0, 0.0
            lux = self._num(rt.lux_sensor) or 0.0
            rt.ppfd_now = lux * rt.lux_factor
            if lux > LUX_LIGHT_THRESHOLD:
                rt.lit_seconds_today += 60.0
                rt.dli_today += logic.dli_increment(lux, rt.lux_factor, 60.0)
        want_light = logic.lights_enabled(rt.stage) and logic.light_desired(
            now_min, rt.light_on_min, off_min)

        # ── Failsafe: Licht lief laenger als erlaubt -> Not-Aus + Flag ──
        light_was = self._is_on(rt.light_switches[0]) if rt.light_switches else False
        if light_was:
            if rt.light_on_since is None:
                rt.light_on_since = now
            on_minutes = (now - rt.light_on_since).total_seconds() / 60.0
            if logic.failsafe_tripped(on_minutes, DEFAULT_MAX_LIGHT_ON_MIN):
                rt.light_failsafe = True
                want_light = False
                self._fire("light_failsafe", on_minutes=int(on_minutes))
        else:
            rt.light_on_since = None
            rt.light_failsafe = False

        # ── Manual-Override-Erkennung: Ist weicht 2 Zyklen vom Soll ab ──
        if light_was != want_light and rt._override_strikes >= 2 and not rt.manual_override:
            rt.manual_override = True
            self._fire("manual_override", ist="on" if light_was else "off")
        rt._override_strikes = rt._override_strikes + 1 if light_was != want_light else 0
        if light_was == want_light:
            rt.manual_override = False

        if want_light != light_was:
            await self._set_light_with_votes(want_light)
            if want_light:
                rt.light_on_since = now
            self._fire("light", soll="on" if want_light else "off")
        else:
            await self._set_light_with_votes(want_light)   # Votes aktuell halten

        # ── Pumpe (Trocknung: aus) ──
        if rt.has_pump:
            key = STAGE_KEYS.get(rt.stage, "veg")
            want_pump = logic.pump_enabled(rt.stage) and logic.pump_desired(
                now_min, rt.pump[f"on_{key}"], rt.pump[f"off_{key}"], rt.pump_247)
            pump_was = self._is_on(rt.pump_switches[0])
            if want_pump != pump_was:
                await self._set_all(rt.pump_switches, want_pump)
                self._fire("pump", soll="on" if want_pump else "off")

        # ── O2 / Umluft dauerhaft AN (auch bei Trocknung: Umluft wichtig) ──
        for group, name in ((rt.o2_switches, "o2"), (rt.fan_switches, "fan")):
            if group and not self._is_on(group[0]):
                await self._set_all(group, True)
                self._fire(name, soll="on")

        # ── Phasen-Empfehlung -> ToDo des Zelts ──
        rec, note = logic.stage_recommendation(rt.age_days, rt.stage, STAGE_MAX_DAYS, STAGE_ORDER)
        if note and tent is not None and tent.todo_add is not None:
            tent.todo_add(f"{rt.station}: {note}")


class TentController(_Base):
    """Regelzyklus eines Zelts: Klima (VPD/RH) + DLI."""

    def __init__(self, hass: HomeAssistant, rt: TentRuntime) -> None:
        super().__init__(hass)
        self.rt = rt

    def _fire(self, kind: str, **data) -> None:
        self.hass.bus.async_fire(EVENT_GROWCTRL, {
            "tent": self.rt.tent, "station": "zelt", "kind": kind, **data,
        })
        text, level = _LOG_TEXT.get(kind, (lambda d: (kind, "info")))(data)
        self.rt.add_log(text, level)
        getattr(_LOGGER, "warning" if level != "info" else "info")(
            "[Zelt %s] %s", self.rt.tent, text)

    async def async_run(self) -> None:
        rt = self.rt

        # Messwerte einlesen (auch bei Klima AUS, fuer Sensoren/Karten)
        rt.current_temp = self._num(rt.temp_sensor)
        rt.current_rh = self._num(rt.hum_sensor)
        rt.current_vpd = (logic.vpd_kpa(rt.current_temp, rt.current_rh, rt.leaf_offset)
                          if rt.current_temp is not None and rt.current_rh is not None else None)
        rt.climate_problem = None
        if rt.climate_on and rt.current_vpd is None:
            rt.climate_problem = "Klima aktiv, aber Temp/RH-Sensor liefert keine Werte"

        if not rt.enabled:
            for grp in (rt.humidifier_switches, rt.dehumidifier_switches,
                        rt.exhaust_switches, rt.heater_switches):
                await self._set_all(grp, False)
            return
        if not rt.climate_on:
            return

        # ── Klima-Regelung mit Hysterese ──
        humid_on = self._is_on(rt.humidifier_switches[0]) if rt.humidifier_switches else False
        dehum_on = self._is_on(rt.dehumidifier_switches[0]) if rt.dehumidifier_switches else False
        want_h, want_d = logic.climate_actions(
            rt.climate_mode, rt.current_vpd, rt.current_rh,
            rt.vpd_min, rt.vpd_max, rt.rh_min, rt.rh_max, humid_on, dehum_on)
        if want_h != humid_on:
            await self._set_all(rt.humidifier_switches, want_h)
            self._fire("humidifier", soll="on" if want_h else "off")
        if want_d != dehum_on:
            await self._set_all(rt.dehumidifier_switches, want_d)
            self._fire("dehumidifier", soll="on" if want_d else "off")
        if rt.exhaust_switches:
            want_e = logic.exhaust_desired(rt.current_rh, rt.rh_max)
            if want_e != self._is_on(rt.exhaust_switches[0]):
                await self._set_all(rt.exhaust_switches, want_e)
                self._fire("exhaust", soll="on" if want_e else "off")

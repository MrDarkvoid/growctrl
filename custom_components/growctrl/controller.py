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
    "manual_override": lambda d: (
        f"Manueller Eingriff erkannt - Automatik pausiert {d.get('minuten')} min", "warning"),
    "override_end": lambda d: ("Automatik \u00fcbernimmt wieder den Lichtplan", "info"),
    "light_failsafe": lambda d: (f"FAILSAFE: Licht lief {d.get('on_minutes')} min -> Not-Aus", "critical"),
    "time_invalid": lambda d: ("Lichtzeiten unvollst\u00e4ndig - Automatik pausiert", "warning"),
    "gate_off": lambda d: ("Zelt deaktiviert - Station gestoppt", "warning"),
    "gate_on": lambda d: ("Zelt wieder aktiv - Automatik l\u00e4uft", "info"),
    "pump_blocked": lambda d: (
        f"Pumpe gesperrt - F\u00fcllstand {d.get('level')}% unter Minimum {d.get('min')}%", "critical"),
    "pump_unblocked": lambda d: ("Pumpe wieder freigegeben - F\u00fcllstand OK", "info"),
    "power_problem": lambda d: (
        f"Licht AN, aber nur {d.get('watt')} W Leistung - Lampe pr\u00fcfen!", "critical"),
    "soil_skip": lambda d: (
        f"Bew\u00e4sserung \u00fcbersprungen - Bodenfeuchte {d.get('moisture')}% ausreichend", "info"),
    "sensors_stale": lambda d: (
        f"Klima-Sensoren eingefroren ({d.get('minuten')} min unverändert) - sicherer Zustand", "critical"),
    "sensors_ok": lambda d: ("Klima-Sensoren liefern wieder Werte", "info"),
}

from . import logic
from datetime import timedelta

from .const import (
    DATA_LIGHT_VOTES, DATA_STATIONS, DATA_TENTS, DEFAULT_MAX_LIGHT_ON_MIN, DOMAIN,
    EVENT_GROWCTRL, LUX_LIGHT_THRESHOLD, STAGE_KEYS, STAGE_MAX_DAYS, STAGE_ORDER,
    STAGE_TO_CLIMATE,
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
        rt.last_tick = datetime.now()

        # Zelt-Gate: deaktiviertes Zelt stoppt alle Stationen (Aktoren aus)
        tent = self._tent()
        if tent is not None and not tent.enabled:
            if not rt.gate_logged:
                rt.gate_logged = True
                self._fire("gate_off")
            await self._set_light_with_votes(False)
            await self._set_all(rt.pump_switches, False)
            await self._set_all(rt.o2_switches, False)
            await self._set_all(rt.fan_switches, False)
            return
        if rt.gate_logged:
            rt.gate_logged = False
            self._fire("gate_on")

        if not rt.auto or rt.maintenance:
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

        # ── Manuelle Übernahme: erkanntes Handschalten wird respektiert ──
        if rt.manual_override:
            if now >= (rt.override_until or now) or light_was == want_light:
                # Zeit abgelaufen ODER Plan stimmt wieder mit Ist ueberein
                rt.manual_override = False
                rt.override_until = None
                rt._override_strikes = 0
                self._fire("override_end")
            else:
                # Waehrend der Übernahme: Ist-Zustand respektieren (Vote = Ist),
                # damit geteilte Lichter den manuellen Wunsch mittragen.
                await self._set_light_with_votes(light_was)
                if rt.has_pump:
                    pass  # Pumpe läuft regulaer weiter (unten)
                # Licht-Regelung in diesem Zyklus aussetzen:
                want_light = light_was

        if not rt.manual_override:
            if light_was != want_light:
                rt._override_strikes += 1
                if rt._override_strikes >= 2:
                    # 2 Zyklen Abweichung trotz Regelung = Handschaltung
                    rt.manual_override = True
                    rt.override_until = now + timedelta(minutes=max(0.0, rt.override_minutes))
                    self._fire("manual_override", ist="on" if light_was else "off",
                               minuten=int(rt.override_minutes))
                    await self._set_light_with_votes(light_was)
                    want_light = light_was
                else:
                    await self._set_light_with_votes(want_light)
                    if want_light:
                        rt.light_on_since = now
                    self._fire("light", soll="on" if want_light else "off")
            else:
                rt._override_strikes = 0
                await self._set_light_with_votes(want_light)   # Votes aktuell halten

        # ── Pumpe (Trocknung aus; Trockenlauf-Schutz; Erde nach Bodenfeuchte) ──
        if rt.has_pump:
            key = STAGE_KEYS.get(rt.stage, "veg")
            want_pump = logic.pump_enabled(rt.stage) and logic.pump_desired(
                now_min, rt.pump[f"on_{key}"], rt.pump[f"off_{key}"], rt.pump_247)

            # Trockenlauf-Schutz (DWC-Füllstand)
            level = self._num(rt.level_sensor)
            level_ok = logic.pump_level_ok(level, rt.level_min if rt.level_sensor else None)
            if not level_ok and not rt.pump_blocked:
                rt.pump_blocked = True
                self._fire("pump_blocked", level=round(level or 0, 1), min=rt.level_min)
            elif level_ok and rt.pump_blocked:
                rt.pump_blocked = False
                self._fire("pump_unblocked")
            if rt.pump_blocked:
                want_pump = False

            # Erde: nur bewaessern, wenn die Bodenfeuchte es verlangt
            if want_pump and rt.moisture_sensor:
                moisture = self._num(rt.moisture_sensor)
                if not logic.soil_needs_water(moisture, rt.moisture_min):
                    want_pump = False
                    if self._is_on(rt.pump_switches[0]):
                        self._fire("soil_skip", moisture=round(moisture or 0, 1))

            pump_was = self._is_on(rt.pump_switches[0])
            if want_pump != pump_was:
                await self._set_all(rt.pump_switches, want_pump)
                self._fire("pump", soll="on" if want_pump else "off")

        # ── Leistungs-Plausibilitaet: Licht AN ohne Watt = Lampe defekt ──
        if rt.power_sensor and rt.light_switches:
            on_now = self._is_on(rt.light_switches[0])
            on_min_dur = ((datetime.now() - rt.light_on_since).total_seconds() / 60.0
                          if on_now and rt.light_on_since else 0.0)
            watt = self._num(rt.power_sensor)
            bad = logic.power_implausible(on_now, on_min_dur, watt)
            if bad and not rt.power_problem:
                rt.power_problem = True
                self._fire("power_problem", watt=round(watt or 0, 1))
            elif not bad and rt.power_problem:
                rt.power_problem = False

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
        rt.last_tick = datetime.now()

        # Messwerte einlesen (auch bei Klima AUS, fuer Sensoren/Karten)
        rt.current_temp = self._num(rt.temp_sensor)
        rt.current_rh = self._num(rt.hum_sensor)
        rt.current_vpd = (logic.vpd_kpa(rt.current_temp, rt.current_rh, rt.leaf_offset)
                          if rt.current_temp is not None and rt.current_rh is not None else None)
        rt.climate_problem = None
        if rt.climate_on and rt.current_vpd is None:
            rt.climate_problem = "Klima aktiv, aber Temp/RH-Sensor liefert keine Werte"

        # ── Stale-Erkennung: eingefrorene Klima-Sensoren ──
        pair = (rt.current_temp, rt.current_rh)
        if pair == rt._last_temp_rh and rt.current_vpd is not None:
            rt._unchanged_min += 1.0
        else:
            rt._unchanged_min = 0.0
            if rt.sensors_stale:
                rt.sensors_stale = False
                self._fire("sensors_ok")
        rt._last_temp_rh = pair
        if logic.sensor_stale(rt._unchanged_min, rt.stale_minutes) and not rt.sensors_stale:
            rt.sensors_stale = True
            self._fire("sensors_stale", minuten=int(rt._unchanged_min))
        if rt.sensors_stale:
            rt.climate_problem = "Klima-Sensoren eingefroren - sicherer Zustand aktiv"

        # ── VPD-Zeit im Sollband (heute) ──
        today = date.today().isoformat()
        if rt.band_date != today:
            rt.band_date, rt.band_total_s, rt.band_in_s = today, 0.0, 0.0

        if not rt.enabled:
            for grp in (rt.humidifier_switches, rt.dehumidifier_switches,
                        rt.exhaust_switches, rt.heater_switches):
                await self._set_all(grp, False)
            return
        if not rt.climate_on:
            return

        # Sicherer Zustand bei eingefrorenen Sensoren: Befeuchter/Entfeuchter aus, Abluft an
        if rt.sensors_stale:
            await self._set_all(rt.humidifier_switches, False)
            await self._set_all(rt.dehumidifier_switches, False)
            await self._set_all(rt.exhaust_switches, True)
            return

        # ── Klima-Regelung: Sollwerte folgen der Phase (Auto = fuehrende Station) ──
        stages = [s.stage for s in
                  self.hass.data.get(DOMAIN, {}).get(DATA_STATIONS, {}).get(rt.tent, {}).values()]
        phase = logic.effective_climate_phase(rt.climate_phase, stages,
                                              STAGE_TO_CLIMATE, STAGE_ORDER)
        tg = rt.targets.get(phase, rt.targets["Veg"])
        humid_on = self._is_on(rt.humidifier_switches[0]) if rt.humidifier_switches else False
        dehum_on = self._is_on(rt.dehumidifier_switches[0]) if rt.dehumidifier_switches else False
        # Sollband-Statistik (VPD- oder RH-gefuehrt)
        if rt.current_vpd is not None:
            rt.band_total_s += 60.0
            metric_ok = (logic.in_band(rt.current_vpd, tg["vpd_min"], tg["vpd_max"])
                         if rt.climate_mode == "VPD"
                         else logic.in_band(rt.current_rh, tg["rh_min"], tg["rh_max"]))
            if metric_ok:
                rt.band_in_s += 60.0

        want_h, want_d = logic.climate_actions(
            rt.climate_mode, rt.current_vpd, rt.current_rh,
            tg["vpd_min"], tg["vpd_max"], tg["rh_min"], tg["rh_max"], humid_on, dehum_on)
        if want_h != humid_on:
            await self._set_all(rt.humidifier_switches, want_h)
            self._fire("humidifier", soll="on" if want_h else "off")
        if want_d != dehum_on:
            await self._set_all(rt.dehumidifier_switches, want_d)
            self._fire("dehumidifier", soll="on" if want_d else "off")
        if rt.exhaust_switches:
            want_e = logic.exhaust_desired(rt.current_rh, tg["rh_max"])
            if want_e != self._is_on(rt.exhaust_switches[0]):
                await self._set_all(rt.exhaust_switches, want_e)
                self._fire("exhaust", soll="on" if want_e else "off")

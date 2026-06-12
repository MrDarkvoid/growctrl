#==============================================================================
# GROWCTRL Integration – sensor
# Zweck   : Berechnete Sensoren: Licht-/Pumpen-Restzeit aus logic.py – ersetzt die 6x duplizierten Jinja-Templates. Pumpen-Restzeit nur bei zugeordneter Pumpe.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from datetime import datetime

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity import EntityCategory

from . import logic
from .const import (DATA_STATIONS, DLI_TARGETS, DOMAIN, SIGNAL_UPDATE,
                    STAGE_KEYS, STAGE_MAX_DAYS, STAGE_ORDER, STAGE_TO_CLIMATE)
from .runtime import StationRuntime, TentRuntime
from .entity import GrowctrlEntity


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if isinstance(rt, TentRuntime):
        async_add_entities([
            TentVpd(entry.entry_id, rt),
            TentStatus(hass, entry.entry_id, rt),
            LastEvent(entry.entry_id, rt),
            Watchdog(entry.entry_id, rt),
            BandShare(entry.entry_id, rt),
        ])
        return
    ents: list[SensorEntity] = [
        LightRest(entry.entry_id, rt),
        PlantAge(entry.entry_id, rt),
        StageRecommendation(entry.entry_id, rt),
        LastEvent(entry.entry_id, rt),
        Watchdog(entry.entry_id, rt),
    ]
    if rt.has_pump:
        ents.append(PumpRest(entry.entry_id, rt))
    if rt.lux_sensor:
        ents += [StationDli(entry.entry_id, rt), StationDliForecast(entry.entry_id, rt)]
    async_add_entities(ents)


class _RestBase(GrowctrlEntity, SensorEntity):
    _attr_native_unit_of_measurement = "min"
    _attr_should_poll = False

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        self.async_on_remove(async_dispatcher_connect(
            self.hass, SIGNAL_UPDATE.format(self._entry_id),
            self.async_write_ha_state))

    @staticmethod
    def _now_min() -> int:
        n = datetime.now()
        return n.hour * 60 + n.minute


class LightRest(_RestBase):
    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "light_rest", "Licht Restzeit")

    @property
    def native_value(self) -> int | None:
        rt = self.rt
        if rt.light_on_min is None or rt.light_off_sv_min is None or rt.light_off_bloom_min is None:
            return None
        off = logic.off_min_for_stage(rt.stage, rt.light_off_sv_min, rt.light_off_bloom_min)
        return logic.light_rest_min(self._now_min(), rt.light_on_min, off)

    @property
    def extra_state_attributes(self):
        attrs = dict(super().extra_state_attributes)
        rt = self.rt
        now = datetime.now()
        now_min = now.hour * 60 + now.minute
        on_min = logic.parse_hhmm(rt.times.get("light_on"))
        off_min = logic.parse_hhmm(rt.times.get(
            "light_off_sv" if rt.stage in ("Seedling", "Veg") else "light_off_bloom"))
        if on_min is None or off_min is None:
            return attrs
        an, rest, dur = logic.light_phase_progress(now_min, on_min, off_min)
        attrs.update({
            "zustand": "an" if an else "aus",
            "text": f"Licht {'an' if an else 'aus'} f\u00fcr {logic.fmt_duration_de(rest)}",
            "anteil": round(rest / dur, 3),
            "phasendauer_min": dur,
        })
        return attrs



class PumpRest(_RestBase):
    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "pump_rest", "Pumpe Restzeit")

    @property
    def native_value(self) -> int:
        key = STAGE_KEYS.get(self.rt.stage, "veg")
        return logic.pump_rest_min(self._now_min(),
                                   self.rt.pump[f"on_{key}"], self.rt.pump[f"off_{key}"])


# ════════════ v2.2: Stations-Sensoren (Keimstart-Auswertung) ════════════

class PlantAge(_RestBase):
    _attr_native_unit_of_measurement = "d"

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "plant_age", "Alter seit Keimung")

    @property
    def native_value(self) -> int | None:
        return self.rt.age_days

    @property
    def extra_state_attributes(self):
        d = self.native_value
        attrs = dict(super().extra_state_attributes)
        if d is not None:
            week, day = divmod(int(d), 7)
            attrs.update({"woche": week + 1, "tag_in_woche": day + 1,
                          "text_wochen": f"Woche {week + 1} \u00b7 Tag {day + 1}",
                          "text_tage": f"{int(d)} Tage"})
        return attrs



class StageRecommendation(_RestBase):
    _attr_native_unit_of_measurement = None

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "stage_recommendation", "Phasen-Empfehlung")

    @property
    def native_value(self) -> str:
        rec, _ = logic.stage_recommendation(
            self.rt.age_days, self.rt.stage, STAGE_MAX_DAYS, STAGE_ORDER)
        return rec

    @property
    def extra_state_attributes(self):
        rec, note = logic.stage_recommendation(
            self.rt.age_days, self.rt.stage, STAGE_MAX_DAYS, STAGE_ORDER)
        return {**super().extra_state_attributes,
                "aktuelle_phase": self.rt.stage, "alter_tage": self.rt.age_days,
                "hinweis": note or "Phase passt zum Alter (Richtwert)"}


# ════════════ v2.2: Zelt-Sensoren (Klima, DLI, Informationssystem) ════════════

class _TentBase(GrowctrlEntity, SensorEntity):
    _attr_should_poll = False

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        self.async_on_remove(async_dispatcher_connect(
            self.hass, SIGNAL_UPDATE.format(self._entry_id), self.async_write_ha_state))


class TentVpd(_TentBase):
    _attr_native_unit_of_measurement = "kPa"

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "vpd", "VPD")

    @property
    def native_value(self):
        return self.rt.current_vpd

    @property
    def extra_state_attributes(self):
        stations = self.hass.data.get(DOMAIN, {}).get(DATA_STATIONS, {}).get(self.rt.tent, {})
        phase = logic.effective_climate_phase(
            self.rt.climate_phase, [s.stage for s in stations.values()],
            STAGE_TO_CLIMATE, STAGE_ORDER)
        return {**super().extra_state_attributes,
                "temp": self.rt.current_temp, "rh": self.rt.current_rh,
                "leaf_offset": self.rt.leaf_offset, "modus": self.rt.climate_mode,
                "phase_effektiv": phase, "sollwerte": self.rt.targets.get(phase)}


class StationDli(_RestBase):
    """DLI heute aus dem Stations-Lichtsensor (darf zwischen Stationen geteilt sein)."""
    _attr_native_unit_of_measurement = "mol/m\u00b2\u00b7d"

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "dli_today", "DLI heute")

    @property
    def native_value(self):
        return round(self.rt.dli_today, 2)

    @property
    def extra_state_attributes(self):
        target = DLI_TARGETS.get(self.rt.stage)
        return {**super().extra_state_attributes,
                "ppfd_aktuell": round(self.rt.ppfd_now, 1),
                "lichtzeit_heute_h": round(self.rt.lit_seconds_today / 3600, 2),
                "ziel_aktuelle_phase": target, "ziele": DLI_TARGETS}


class StationDliForecast(_RestBase):
    """Prognose ueber den KONFIGURIERTEN Lichtplan der Station (Phase-abhaengige AUS-Zeit)."""
    _attr_native_unit_of_measurement = "mol/m\u00b2\u00b7d"

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "dli_forecast", "DLI Prognose")

    def _planned_seconds(self) -> int:
        rt = self.rt
        if rt.light_on_min is None or rt.light_off_sv_min is None or rt.light_off_bloom_min is None:
            return 0
        if not logic.lights_enabled(rt.stage):
            return 0
        off = logic.off_min_for_stage(rt.stage, rt.light_off_sv_min, rt.light_off_bloom_min)
        return logic.planned_light_seconds(rt.light_on_min, off)

    @property
    def native_value(self):
        return logic.dli_forecast(self.rt.dli_today, self.rt.lit_seconds_today,
                                  self._planned_seconds())

    @property
    def extra_state_attributes(self):
        return {**super().extra_state_attributes,
                "geplante_lichtzeit_h": round(self._planned_seconds() / 3600, 2),
                "ziel_aktuelle_phase": DLI_TARGETS.get(self.rt.stage)}


class LastEvent(GrowctrlEntity, SensorEntity):
    """Letztes Ereignis mit Verlauf (Quelle der Bewertungen, fuer Station UND Zelt)."""
    _attr_should_poll = False

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "last_event", "Letztes Ereignis")

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        self.async_on_remove(async_dispatcher_connect(
            self.hass, SIGNAL_UPDATE.format(self._entry_id), self.async_write_ha_state))

    @property
    def native_value(self) -> str:
        return (self.rt.last_event or "Noch keine Ereignisse")[:255]

    @property
    def extra_state_attributes(self):
        worst = "ok"
        for e in self.rt.log:
            if e["level"] == "critical":
                worst = "critical"
            elif e["level"] == "warning" and worst != "critical":
                worst = "warning"
        return {**super().extra_state_attributes,
                "verlauf": list(self.rt.log), "schweregrad": worst}


class TentStatus(_TentBase):
    """Zeltweites Informationssystem: ok/warning + Problemliste aller Stationen."""

    def __init__(self, hass, entry_id, rt):
        super().__init__(entry_id, rt, "status", "Status")
        self._hass_ref = hass

    def _all_problems(self) -> list[str]:
        problems = list(self.rt.problems)
        stations = self._hass_ref.data.get(DOMAIN, {}).get(DATA_STATIONS, {}).get(self.rt.tent, {})
        for st in stations.values():
            problems.extend(st.problems)
        return problems

    @property
    def native_value(self) -> str:
        return "Problem" if self._all_problems() else "OK"

    @property
    def extra_state_attributes(self):
        return {**super().extra_state_attributes, "probleme": self._all_problems()}


class Watchdog(GrowctrlEntity, SensorEntity):
    """Zeitpunkt der letzten Regelung - Heartbeat f\u00fcr \u00dcberwachungs-Automationen."""
    _attr_should_poll = False
    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "watchdog", "Letzte Regelung")

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        self.async_on_remove(async_dispatcher_connect(
            self.hass, SIGNAL_UPDATE.format(self._entry_id), self.async_write_ha_state))

    @property
    def native_value(self):
        lt = self.rt.last_tick
        return lt.astimezone() if lt else None


class BandShare(_TentBase):
    """Anteil der heutigen Klima-Laufzeit im Sollband (VPD- bzw. RH-gefuehrt)."""
    _attr_native_unit_of_measurement = "%"

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "band_share", "Zeit im Sollband heute")

    @property
    def native_value(self):
        if self.rt.band_total_s <= 0:
            return None
        return round(100.0 * self.rt.band_in_s / self.rt.band_total_s, 1)

    @property
    def extra_state_attributes(self):
        return {**super().extra_state_attributes,
                "im_soll_h": round(self.rt.band_in_s / 3600, 2),
                "gesamt_h": round(self.rt.band_total_s / 3600, 2),
                "gefuehrt_nach": self.rt.climate_mode}

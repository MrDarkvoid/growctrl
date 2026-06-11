#==============================================================================
# GROWCTRL Integration – sensor
# Zweck   : Berechnete Sensoren: Licht-/Pumpen-Restzeit aus logic.py – ersetzt die 6x duplizierten Jinja-Templates. Pumpen-Restzeit nur bei zugeordneter Pumpe.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from datetime import datetime

from homeassistant.components.sensor import SensorEntity
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from . import logic
from .const import (DATA_STATIONS, DLI_TARGETS, DOMAIN, SIGNAL_UPDATE,
                    STAGE_KEYS, STAGE_MAX_DAYS, STAGE_ORDER)
from .runtime import StationRuntime, TentRuntime
from .entity import GrowctrlEntity


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if isinstance(rt, TentRuntime):
        async_add_entities([
            TentVpd(entry.entry_id, rt), TentDli(entry.entry_id, rt),
            TentDliForecast(entry.entry_id, rt), TentStatus(hass, entry.entry_id, rt),
        ])
        return
    ents: list[SensorEntity] = [
        LightRest(entry.entry_id, rt),
        PlantAge(entry.entry_id, rt),
        StageRecommendation(entry.entry_id, rt),
    ]
    if rt.has_pump:
        ents.append(PumpRest(entry.entry_id, rt))
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
        return {**super().extra_state_attributes,
                "temp": self.rt.current_temp, "rh": self.rt.current_rh,
                "leaf_offset": self.rt.leaf_offset, "modus": self.rt.climate_mode}


class TentDli(_TentBase):
    _attr_native_unit_of_measurement = "mol/m\u00b2\u00b7d"

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "dli_today", "DLI heute")

    @property
    def native_value(self):
        return round(self.rt.dli_today, 2)

    @property
    def extra_state_attributes(self):
        return {**super().extra_state_attributes,
                "ppfd_aktuell": round(self.rt.ppfd_now, 1),
                "lichtzeit_heute_h": round(self.rt.lit_seconds_today / 3600, 2),
                "ziele": DLI_TARGETS}


class TentDliForecast(_TentBase):
    _attr_native_unit_of_measurement = "mol/m\u00b2\u00b7d"

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "dli_forecast", "DLI Prognose")

    @property
    def native_value(self):
        return logic.dli_forecast(self.rt.dli_today, self.rt.ppfd_now,
                                  self.rt.lit_seconds_today, self.rt.light_hours)


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
        return "problem" if self._all_problems() else "ok"

    @property
    def extra_state_attributes(self):
        return {**super().extra_state_attributes, "probleme": self._all_problems()}

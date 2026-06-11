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
from .const import DOMAIN, SIGNAL_UPDATE, STAGE_KEYS
from .entity import GrowctrlEntity


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    ents: list[SensorEntity] = [LightRest(entry.entry_id, rt)]
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

#==============================================================================
# GROWCTRL Integration – number
# Zweck   : OPTIONALE Entities: Pumpenzyklen je Phase – werden NUR erzeugt, wenn dem Entry Pumpen-Switches zugeordnet sind.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from homeassistant.components.number import NumberEntity, NumberMode

from .const import DOMAIN
from .entity import GrowctrlEntity

_DEFS = [
    ("pump_on_seedling", "Pumpe AN Seedling", "on_seedling", 60),
    ("pump_off_seedling", "Pumpe AUS Seedling", "off_seedling", 120),
    ("pump_on_veg", "Pumpe AN Veg", "on_veg", 60),
    ("pump_off_veg", "Pumpe AUS Veg", "off_veg", 120),
    ("pump_on_bloom", "Pumpe AN Bloom/Flush", "on_bloom", 60),
    ("pump_off_bloom", "Pumpe AUS Bloom/Flush", "off_bloom", 120),
]


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if not rt.has_pump:
        return  # Optionale Funktion ohne Zuordnung -> keine Entitaeten
    async_add_entities([PumpNumber(entry.entry_id, rt, *d) for d in _DEFS])


class PumpNumber(GrowctrlEntity, NumberEntity):
    _attr_native_min_value = 1
    _attr_native_step = 1
    _attr_native_unit_of_measurement = "min"
    _attr_mode = NumberMode.SLIDER

    def __init__(self, entry_id, rt, role, name, key, max_v):
        super().__init__(entry_id, rt, role, name)
        self._key = key
        self._attr_native_max_value = max_v

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None:
            try:
                self.rt.pump[self._key] = int(float(last.state))
            except (ValueError, TypeError):
                pass

    @property
    def native_value(self) -> float:
        return self.rt.pump[self._key]

    async def async_set_native_value(self, value: float):
        self.rt.pump[self._key] = int(value)
        self.async_write_ha_state()

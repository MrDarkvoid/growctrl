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
from .runtime import TentRuntime

_DEFS = [
    ("pump_on_seedling", "Pumpe AN Seedling", "on_seedling", 60),
    ("pump_off_seedling", "Pumpe AUS Seedling", "off_seedling", 120),
    ("pump_on_veg", "Pumpe AN Veg", "on_veg", 60),
    ("pump_off_veg", "Pumpe AUS Veg", "off_veg", 120),
    ("pump_on_bloom", "Pumpe AN Bloom/Flush", "on_bloom", 60),
    ("pump_off_bloom", "Pumpe AUS Bloom/Flush", "off_bloom", 120),
]


_TENT_DEFS = [
    # role, name, rt_attr, min, max, step, unit
    ("vpd_min", "VPD Min", "vpd_min", 0.2, 2.0, 0.05, "kPa"),
    ("vpd_max", "VPD Max", "vpd_max", 0.2, 2.5, 0.05, "kPa"),
    ("rh_min", "RH Min", "rh_min", 20, 90, 1, "%"),
    ("rh_max", "RH Max", "rh_max", 25, 95, 1, "%"),
    ("leaf_offset", "Blatt-Offset", "leaf_offset", -5, 5, 0.1, "K"),
]


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if isinstance(rt, TentRuntime):
        async_add_entities([TentNumber(entry.entry_id, rt, *d) for d in _TENT_DEFS])
        return
    ents = []
    if rt.has_pump:
        ents += [PumpNumber(entry.entry_id, rt, *d) for d in _DEFS]
    if rt.lux_sensor:  # Lux-Faktor nur, wenn die Station einen Lichtsensor hat
        ents.append(TentNumber(entry.entry_id, rt,
                    "lux_factor", "Lux\u2192PPFD-Faktor", "lux_factor",
                    0.005, 0.05, 0.001, None))
    if ents:
        async_add_entities(ents)


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


class TentNumber(GrowctrlEntity, NumberEntity):
    _attr_mode = NumberMode.BOX

    def __init__(self, entry_id, rt, role, name, attr, min_v, max_v, step, unit):
        super().__init__(entry_id, rt, role, name)
        self._rt_attr = attr
        self._attr_native_min_value = min_v
        self._attr_native_max_value = max_v
        self._attr_native_step = step
        self._attr_native_unit_of_measurement = unit

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None:
            try:
                setattr(self.rt, self._rt_attr, float(last.state))
            except (ValueError, TypeError):
                pass

    @property
    def native_value(self) -> float:
        return float(getattr(self.rt, self._rt_attr))

    async def async_set_native_value(self, value: float):
        setattr(self.rt, self._rt_attr, value)
        self.async_write_ha_state()

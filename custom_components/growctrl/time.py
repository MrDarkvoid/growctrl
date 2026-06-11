#==============================================================================
# GROWCTRL Integration – time
# Zweck   : Pflicht-Entities: Lichtzeiten (AN, AUS Seedling/Veg, AUS Bloom/Flush) als time-Entities.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from datetime import time as dt_time

from homeassistant.components.time import TimeEntity

from .const import DOMAIN
from .entity import GrowctrlEntity
from .runtime import StationRuntime


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if not isinstance(rt, StationRuntime):
        return
    async_add_entities([
        LightTime(entry.entry_id, rt, "light_on", "Licht AN", "light_on_min"),
        LightTime(entry.entry_id, rt, "light_off_sv", "Licht AUS Seedling/Veg", "light_off_sv_min"),
        LightTime(entry.entry_id, rt, "light_off_bloom", "Licht AUS Bloom/Flush", "light_off_bloom_min"),
    ])


class LightTime(GrowctrlEntity, TimeEntity):
    def __init__(self, entry_id, rt, role, name, attr):
        super().__init__(entry_id, rt, role, name)
        self._rt_attr = attr

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None and ":" in (last.state or ""):
            h, m = last.state.split(":")[0:2]
            try:
                setattr(self.rt, self._rt_attr, int(h) * 60 + int(m))
            except ValueError:
                pass

    @property
    def native_value(self) -> dt_time | None:
        v = getattr(self.rt, self._rt_attr)
        return None if v is None else dt_time(hour=v // 60, minute=v % 60)

    async def async_set_value(self, value: dt_time):
        setattr(self.rt, self._rt_attr, value.hour * 60 + value.minute)
        self.async_write_ha_state()

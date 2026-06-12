#==============================================================================
# GROWCTRL Integration – date
# Zweck   : Keimstart je Station (RestoreEntity) -> Alter, Phasen-Empfehlung, ToDo.
# Version : 2.2.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from datetime import date

from homeassistant.components.date import DateEntity
from homeassistant.helpers.entity import EntityCategory

from .const import DOMAIN
from .entity import GrowctrlEntity
from .runtime import StationRuntime


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if not isinstance(rt, StationRuntime):
        return
    async_add_entities([GerminationDate(entry.entry_id, rt)])


class GerminationDate(GrowctrlEntity, DateEntity):
    _attr_entity_category = EntityCategory.CONFIG
    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "germination", "Keimstart")

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None and last.state not in (None, "unknown", "unavailable"):
            try:
                self.rt.germination = date.fromisoformat(last.state)
            except ValueError:
                pass

    @property
    def native_value(self) -> date | None:
        return self.rt.germination

    async def async_set_value(self, value: date) -> None:
        self.rt.germination = value
        self.async_write_ha_state()

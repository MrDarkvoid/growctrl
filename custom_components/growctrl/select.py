#==============================================================================
# GROWCTRL Integration – select
# Zweck   : Pflicht-Entity: Wachstumsphase (Seedling/Veg/Bloom/Flush).
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from homeassistant.components.select import SelectEntity

from .const import CLIMATE_MODES, DOMAIN, STAGES
from .runtime import TentRuntime
from .entity import GrowctrlEntity


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if isinstance(rt, TentRuntime):
        async_add_entities([ClimateModeSelect(entry.entry_id, rt)])
        return
    async_add_entities([StageSelect(entry.entry_id, rt)])


class StageSelect(GrowctrlEntity, SelectEntity):
    _attr_options = STAGES

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "stage", "Wachstumsphase")

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None and last.state in STAGES:
            self.rt.stage = last.state

    @property
    def current_option(self) -> str:
        return self.rt.stage

    async def async_select_option(self, option: str):
        self.rt.stage = option
        self.async_write_ha_state()


class ClimateModeSelect(GrowctrlEntity, SelectEntity):
    """Klima-Fuehrung: VPD- oder RH-gesteuert."""
    _attr_options = CLIMATE_MODES

    def __init__(self, entry_id, rt):
        super().__init__(entry_id, rt, "climate_mode", "Klima-Modus")

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None and last.state in CLIMATE_MODES:
            self.rt.climate_mode = last.state

    @property
    def current_option(self) -> str:
        return self.rt.climate_mode

    async def async_select_option(self, option: str):
        self.rt.climate_mode = option
        self.async_write_ha_state()

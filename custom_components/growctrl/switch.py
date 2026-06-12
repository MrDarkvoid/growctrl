#==============================================================================
# GROWCTRL Integration – switch
# Zweck   : Pflicht-Schalter je Station: Automatik, Wartung, Testmodus (RestoreEntity).
# Version : 2.0.0-dev | Lizenz: GC-SAL 1.0 (siehe LICENSE)
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from homeassistant.components.switch import SwitchEntity

from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import DOMAIN
from .entity import GrowctrlEntity
from .runtime import TentRuntime


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if isinstance(rt, TentRuntime):
        async_add_entities([
            _RtSwitch(entry.entry_id, rt, "tent_enabled", "Zelt aktiv", "enabled"),
            _RtSwitch(entry.entry_id, rt, "climate_enabled", "Klima-Automatik", "climate_on"),
        ])
        return
    async_add_entities([
        _RtSwitch(entry.entry_id, rt, "auto", "Automatik", "auto"),
        _RtSwitch(entry.entry_id, rt, "maintenance", "Wartung", "maintenance"),
    ])


class _RtSwitch(GrowctrlEntity, SwitchEntity):
    def __init__(self, entry_id, rt, role, name, attr):
        super().__init__(entry_id, rt, role, name)
        self._rt_attr = attr

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None:
            setattr(self.rt, self._rt_attr, last.state == "on")

    @property
    def is_on(self) -> bool:
        return bool(getattr(self.rt, self._rt_attr))

    async def async_turn_on(self, **kwargs):
        setattr(self.rt, self._rt_attr, True)
        self.rt.add_log(f"{self.name} AN")
        if self.rt.kick:
            self.rt.kick()
        if getattr(self.rt, "kick_stations", None):
            self.rt.kick_stations()
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs):
        setattr(self.rt, self._rt_attr, False)
        self.rt.add_log(f"{self.name} AUS", "warning" if self._rt_attr == "enabled" else "info")
        if self.rt.kick:
            self.rt.kick()
        if getattr(self.rt, "kick_stations", None):
            self.rt.kick_stations()
        self.async_write_ha_state()

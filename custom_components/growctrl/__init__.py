#==============================================================================
# GROWCTRL Integration – __init__
# Zweck   : Entry-Setup: Runtime aufbauen, Plattformen laden, Controller-Loop minuetlich starten, Sensor-Update-Signal senden.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_interval

from .const import (
    CONF_FAN_SWITCHES, CONF_LIGHT_SWITCHES, CONF_O2_SWITCHES, CONF_PUMP_247,
    CONF_PUMP_SWITCHES, CONF_STATION, CONF_TENT, DOMAIN, SIGNAL_UPDATE,
)
from .controller import StationController
from .runtime import StationRuntime

PLATFORMS = ["switch", "select", "time", "number", "sensor"]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    d = entry.data
    rt = StationRuntime(
        tent=d[CONF_TENT], station=d[CONF_STATION],
        light_switches=list(d.get(CONF_LIGHT_SWITCHES, [])),
        pump_switches=list(d.get(CONF_PUMP_SWITCHES, [])),
        o2_switches=list(d.get(CONF_O2_SWITCHES, [])),
        fan_switches=list(d.get(CONF_FAN_SWITCHES, [])),
        pump_247=bool(d.get(CONF_PUMP_247, False)),
    )
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = rt
    controller = StationController(hass, rt)

    async def _tick(_now) -> None:
        await controller.async_run()
        async_dispatcher_send(hass, SIGNAL_UPDATE.format(entry.entry_id))

    entry.async_on_unload(async_track_time_interval(hass, _tick, timedelta(minutes=1)))
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
    return ok

#==============================================================================
# GROWCTRL Integration – __init__
# Zweck   : Entry-Setup fuer ZWEI Typen: Zelt (Klima/DLI/ToDo) und Station.
#           Registriert Runtimes in zentralen Registries (Zelt-Gate, geteilte Lichter).
# Version : 2.2.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store

from .const import (
    CONF_DEHUMIDIFIER_SWITCHES, CONF_ENTRY_TYPE, CONF_EXHAUST_SWITCHES,
    CONF_FAN_SWITCHES, CONF_HEATER_SWITCHES, CONF_HUMIDIFIER_SWITCHES,
    CONF_HUM_SENSOR, CONF_LEVEL_SENSOR, CONF_LIGHT_SWITCHES, CONF_LUX_SENSOR,
    CONF_O2_SWITCHES, CONF_POWER_SENSOR, CONF_PUMP_247, CONF_PUMP_SWITCHES,
    CONF_SOIL_MOISTURE_SENSOR, CONF_STATION, CONF_TEMP_SENSOR, CONF_TENT,
    CONF_TENT_NAME, DATA_STATIONS, DATA_TENTS, DOMAIN, ENTRY_TENT, SIGNAL_UPDATE,
)
from .controller import StationController, TentController
from .runtime import StationRuntime, TentRuntime

PLATFORMS_STATION = ["switch", "select", "time", "number", "sensor", "binary_sensor", "date"]
PLATFORMS_TENT = ["switch", "select", "number", "sensor", "todo"]


def _platforms(entry: ConfigEntry) -> list[str]:
    return PLATFORMS_TENT if entry.data.get(CONF_ENTRY_TYPE) == ENTRY_TENT else PLATFORMS_STATION


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    d = entry.data
    root = hass.data.setdefault(DOMAIN, {})
    root.setdefault(DATA_TENTS, {})
    root.setdefault(DATA_STATIONS, {})

    if d.get(CONF_ENTRY_TYPE) == ENTRY_TENT:
        rt: TentRuntime | StationRuntime = TentRuntime(
            tent=d[CONF_TENT_NAME],
            temp_sensor=d.get(CONF_TEMP_SENSOR),
            hum_sensor=d.get(CONF_HUM_SENSOR),
            humidifier_switches=list(d.get(CONF_HUMIDIFIER_SWITCHES, [])),
            dehumidifier_switches=list(d.get(CONF_DEHUMIDIFIER_SWITCHES, [])),
            exhaust_switches=list(d.get(CONF_EXHAUST_SWITCHES, [])),
            heater_switches=list(d.get(CONF_HEATER_SWITCHES, [])),
        )
        root[DATA_TENTS][rt.tent] = rt
        controller: TentController | StationController = TentController(hass, rt)
    else:
        rt = StationRuntime(
            tent=d[CONF_TENT], station=d[CONF_STATION],
            light_switches=list(d.get(CONF_LIGHT_SWITCHES, [])),
            pump_switches=list(d.get(CONF_PUMP_SWITCHES, [])),
            o2_switches=list(d.get(CONF_O2_SWITCHES, [])),
            fan_switches=list(d.get(CONF_FAN_SWITCHES, [])),
            pump_247=bool(d.get(CONF_PUMP_247, False)),
            lux_sensor=d.get(CONF_LUX_SENSOR),
            level_sensor=d.get(CONF_LEVEL_SENSOR),
            moisture_sensor=d.get(CONF_SOIL_MOISTURE_SENSOR),
            power_sensor=d.get(CONF_POWER_SENSOR),
        )
        root[DATA_STATIONS].setdefault(rt.tent, {})[rt.station] = rt
        controller = StationController(hass, rt)

    root[entry.entry_id] = rt

    # ── Ereignis-Log persistent (uebersteht Neustarts) ──
    store: Store = Store(hass, 1, f"{DOMAIN}_log_{rt.slug}")
    saved = await store.async_load()
    if isinstance(saved, list):
        rt.log.extend(saved[-30:])

    def _log_dirty() -> None:
        store.async_delay_save(lambda: list(rt.log), 10)

    rt.log_dirty = _log_dirty

    async def _tick(_now) -> None:
        await controller.async_run()
        async_dispatcher_send(hass, SIGNAL_UPDATE.format(entry.entry_id))

    # Sofort-Regelung nach Nutzeraktionen (Automatik AN, Phase gewechselt, ...)
    rt.kick = lambda: hass.async_create_task(_tick(None))

    entry.async_on_unload(async_track_time_interval(hass, _tick, timedelta(minutes=1)))
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    await hass.config_entries.async_forward_entry_setups(entry, _platforms(entry))
    # Erster Regelzyklus sofort, nicht erst nach 60 s
    hass.async_create_task(_tick(None))
    return True


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Options-Aenderungen uebernehmen (Entry neu laden)."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    ok = await hass.config_entries.async_unload_platforms(entry, _platforms(entry))
    if ok:
        root = hass.data[DOMAIN]
        rt = root.pop(entry.entry_id, None)
        if isinstance(rt, TentRuntime):
            root[DATA_TENTS].pop(rt.tent, None)
        elif isinstance(rt, StationRuntime):
            root[DATA_STATIONS].get(rt.tent, {}).pop(rt.station, None)
    return ok

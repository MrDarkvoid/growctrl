#==============================================================================
# GROWCTRL Integration – config_flow
# Zweck   : Menue: ZELT anlegen (Klima-Aktoren, Sensoren, Lux/DLI) oder STATION
#           anlegen (Zelt-Auswahl aus vorhandenen Zelten, Switches, Systemtyp).
# Version : 2.2.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.helpers import selector

from .const import (
    CONF_DEHUMIDIFIER_SWITCHES, CONF_EC_SENSOR, CONF_ENTRY_TYPE,
    CONF_EXHAUST_SWITCHES, CONF_FAN_SWITCHES, CONF_HEATER_SWITCHES,
    CONF_HUMIDIFIER_SWITCHES, CONF_HUM_SENSOR, CONF_LEVEL_SENSOR,
    CONF_LIGHT_SWITCHES, CONF_LUX_SENSOR, CONF_O2_SWITCHES, CONF_PH_SENSOR,
    CONF_PUMP_247, CONF_PUMP_SWITCHES, CONF_SOIL_MOISTURE_SENSOR,
    CONF_SOIL_TEMP_SENSOR, CONF_STATION, CONF_SYSTEM_TYPE, CONF_TEMP_SENSOR,
    CONF_TENT, CONF_TENT_NAME, CONF_WATER_TEMP_SENSOR, DOMAIN, ENTRY_STATION,
    ENTRY_TENT, SYSTEM_DWC, SYSTEM_GENERIC, SYSTEM_SOIL,
)

def _sw_multi():
    return selector.EntitySelector(selector.EntitySelectorConfig(domain="switch", multiple=True))


def _sensor():
    return selector.EntitySelector(selector.EntitySelectorConfig(domain="sensor"))


def _tent_schema() -> vol.Schema:
    """Lazy gebaut: ein Selector-Problem bricht so nie den Flow-Import."""
    return vol.Schema({
        vol.Required(CONF_TENT_NAME): str,
        vol.Optional(CONF_TEMP_SENSOR): _sensor(),
        vol.Optional(CONF_HUM_SENSOR): _sensor(),
        vol.Optional(CONF_HUMIDIFIER_SWITCHES, default=[]): _sw_multi(),
        vol.Optional(CONF_DEHUMIDIFIER_SWITCHES, default=[]): _sw_multi(),
        vol.Optional(CONF_EXHAUST_SWITCHES, default=[]): _sw_multi(),
        vol.Optional(CONF_HEATER_SWITCHES, default=[]): _sw_multi(),
    })


def _station_schema(tents: list[str]) -> vol.Schema:
    """Zelt-Auswahl als Dropdown, wenn Zelte existieren; sonst Freitext."""
    tent_field = (selector.SelectSelector(selector.SelectSelectorConfig(
        options=tents, mode=selector.SelectSelectorMode.DROPDOWN, custom_value=True))
        if tents else str)
    return vol.Schema({
        vol.Required(CONF_TENT): tent_field,
        vol.Required(CONF_STATION): str,
        vol.Required(CONF_LIGHT_SWITCHES): _sw_multi(),
        vol.Optional(CONF_PUMP_SWITCHES, default=[]): _sw_multi(),
        vol.Optional(CONF_O2_SWITCHES, default=[]): _sw_multi(),
        vol.Optional(CONF_FAN_SWITCHES, default=[]): _sw_multi(),
        vol.Optional(CONF_TEMP_SENSOR): _sensor(),
        vol.Optional(CONF_HUM_SENSOR): _sensor(),
        vol.Optional(CONF_LUX_SENSOR): _sensor(),
        vol.Optional(CONF_PUMP_247, default=False): bool,
        vol.Required(CONF_SYSTEM_TYPE, default=SYSTEM_GENERIC): selector.SelectSelector(
            selector.SelectSelectorConfig(
                options=[SYSTEM_GENERIC, SYSTEM_DWC, SYSTEM_SOIL],
                translation_key="system_type",
                mode=selector.SelectSelectorMode.DROPDOWN)),
        vol.Optional(CONF_EC_SENSOR): _sensor(),
        vol.Optional(CONF_PH_SENSOR): _sensor(),
        vol.Optional(CONF_WATER_TEMP_SENSOR): _sensor(),
        vol.Optional(CONF_LEVEL_SENSOR): _sensor(),
        vol.Optional(CONF_SOIL_MOISTURE_SENSOR): _sensor(),
        vol.Optional(CONF_SOIL_TEMP_SENSOR): _sensor(),
    })


class GrowctrlConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Zelt- und Stations-Entries."""

    VERSION = 2

    async def async_step_user(self, user_input=None):
        return self.async_show_menu(step_id="user", menu_options=["tent", "station"])

    async def async_step_tent(self, user_input=None):
        if user_input is not None:
            name = user_input[CONF_TENT_NAME].strip().lower()
            await self.async_set_unique_id(f"{DOMAIN}_tent_{name}")
            self._abort_if_unique_id_configured()
            return self.async_create_entry(
                title=f"GROWCTRL Zelt {name}",
                data={**user_input, CONF_TENT_NAME: name, CONF_ENTRY_TYPE: ENTRY_TENT},
            )
        return self.async_show_form(step_id="tent", data_schema=_tent_schema())

    async def async_step_station(self, user_input=None):
        tents = sorted({
            e.data.get(CONF_TENT_NAME) for e in self._async_current_entries()
            if e.data.get(CONF_ENTRY_TYPE) == ENTRY_TENT and e.data.get(CONF_TENT_NAME)
        })
        if user_input is not None:
            tent = user_input[CONF_TENT].strip().lower()
            station = user_input[CONF_STATION].strip().lower()
            await self.async_set_unique_id(f"{DOMAIN}_{tent}_{station}")
            self._abort_if_unique_id_configured()
            return self.async_create_entry(
                title=f"GROWCTRL {tent} / {station}",
                data={**user_input, CONF_TENT: tent, CONF_STATION: station,
                      CONF_ENTRY_TYPE: ENTRY_STATION},
            )
        return self.async_show_form(step_id="station", data_schema=_station_schema(tents))

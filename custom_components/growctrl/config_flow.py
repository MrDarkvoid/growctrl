#==============================================================================
# GROWCTRL Integration – config_flow
# Zweck   : Config Flow 'Station hinzufuegen': Zelt/Station-Name, Licht (Pflicht, Mehrfach), optionale Switches/Sensoren. Optionale Funktionen ohne Zuordnung erzeugen keine Entitaeten.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.helpers import selector

from .const import (
    CONF_FAN_SWITCHES, CONF_HUM_SENSOR, CONF_LIGHT_SWITCHES, CONF_O2_SWITCHES,
    CONF_PUMP_247, CONF_PUMP_SWITCHES, CONF_STATION, CONF_TEMP_SENSOR,
    CONF_TENT, DOMAIN,
)

_ENT_MULTI = selector.EntitySelector(selector.EntitySelectorConfig(domain="switch", multiple=True))
_ENT_SENSOR = selector.EntitySelector(selector.EntitySelectorConfig(domain="sensor"))

SCHEMA = vol.Schema({
    vol.Required(CONF_TENT): str,
    vol.Required(CONF_STATION): str,
    vol.Required(CONF_LIGHT_SWITCHES): _ENT_MULTI,
    vol.Optional(CONF_PUMP_SWITCHES, default=[]): _ENT_MULTI,
    vol.Optional(CONF_O2_SWITCHES, default=[]): _ENT_MULTI,
    vol.Optional(CONF_FAN_SWITCHES, default=[]): _ENT_MULTI,
    vol.Optional(CONF_TEMP_SENSOR): _ENT_SENSOR,
    vol.Optional(CONF_HUM_SENSOR): _ENT_SENSOR,
    vol.Optional(CONF_PUMP_247, default=False): bool,
})


class GrowctrlConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Eine Station = ein Config Entry."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        errors: dict[str, str] = {}
        if user_input is not None:
            tent = user_input[CONF_TENT].strip().lower()
            station = user_input[CONF_STATION].strip().lower()
            await self.async_set_unique_id(f"{DOMAIN}_{tent}_{station}")
            self._abort_if_unique_id_configured()
            return self.async_create_entry(
                title=f"GROWCTRL {tent} / {station}",
                data={**user_input, CONF_TENT: tent, CONF_STATION: station},
            )
        return self.async_show_form(step_id="user", data_schema=SCHEMA, errors=errors)

#==============================================================================
# GROWCTRL Integration – const
# Zweck   : Domain, Konfig-Schluessel, Stages.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

DOMAIN = "growctrl"

CONF_TENT = "tent"
CONF_STATION = "station"
CONF_LIGHT_SWITCHES = "light_switches"
CONF_PUMP_SWITCHES = "pump_switches"
CONF_O2_SWITCHES = "o2_switches"
CONF_FAN_SWITCHES = "fan_switches"
CONF_TEMP_SENSOR = "temp_sensor"
CONF_HUM_SENSOR = "hum_sensor"
CONF_PUMP_247 = "pump_247"

# Systemtyp + systemspezifische Sensoren (DWC / Erde)
CONF_SYSTEM_TYPE = "system_type"          # generic | dwc | soil
SYSTEM_GENERIC, SYSTEM_DWC, SYSTEM_SOIL = "generic", "dwc", "soil"
CONF_EC_SENSOR = "ec_sensor"              # DWC + Erde
CONF_PH_SENSOR = "ph_sensor"              # DWC + Erde
CONF_WATER_TEMP_SENSOR = "water_temp_sensor"   # DWC
CONF_LEVEL_SENSOR = "level_sensor"             # DWC Fuellstand
CONF_SOIL_MOISTURE_SENSOR = "soil_moisture_sensor"  # Erde
CONF_SOIL_TEMP_SENSOR = "soil_temp_sensor"          # Erde

STAGES = ["Seedling", "Veg", "Bloom", "Flush"]
STAGE_KEYS = {"Seedling": "seedling", "Veg": "veg", "Bloom": "bloom", "Flush": "bloom"}

EVENT_GROWCTRL = "growctrl_event"
SIGNAL_UPDATE = "growctrl_update_{}"

DEFAULT_MAX_LIGHT_ON_MIN = 1440
DEFAULT_MAX_PUMP_ON_MIN = 180

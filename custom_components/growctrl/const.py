#==============================================================================
# GROWCTRL Integration – const
# Zweck   : Domain, Konfig-Schluessel, Stages.
# Version : 2.0.0-dev | Lizenz: GC-SAL 1.0 (siehe LICENSE)
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

STAGES = ["Seedling", "Veg", "Bloom", "Flush", "Trocknung"]
STAGE_KEYS = {"Seedling": "seedling", "Veg": "veg", "Bloom": "bloom", "Flush": "bloom", "Trocknung": "bloom"}

EVENT_GROWCTRL = "growctrl_event"
SIGNAL_UPDATE = "growctrl_update_{}"

DEFAULT_MAX_LIGHT_ON_MIN = 1440
DEFAULT_MAX_PUMP_ON_MIN = 180

# ── Entry-Typen ──
CONF_ENTRY_TYPE = "entry_type"
ENTRY_TENT, ENTRY_STATION = "tent_entry", "station_entry"

# ── Zelt-Entry: Klima + DLI ──
CONF_TENT_NAME = "tent_name"
CONF_HUMIDIFIER_SWITCHES = "humidifier_switches"
CONF_DEHUMIDIFIER_SWITCHES = "dehumidifier_switches"
CONF_EXHAUST_SWITCHES = "exhaust_switches"
CONF_HEATER_SWITCHES = "heater_switches"
CONF_LUX_SENSOR = "lux_sensor"

CLIMATE_MODES = ["VPD", "RH"]
DEFAULT_VPD_MIN, DEFAULT_VPD_MAX = 0.8, 1.2
DEFAULT_RH_MIN, DEFAULT_RH_MAX = 55.0, 65.0
DEFAULT_LEAF_OFFSET = -1.5
DEFAULT_LUX_FACTOR = 0.015      # Lux -> PPFD (LED-Vollspektrum); TSL2591 liefert Lux
DEFAULT_LIGHT_HOURS = 18.0
LUX_LIGHT_THRESHOLD = 500       # ab hier zaehlt Licht als "an" fuer DLI

# DLI-Ziele je Phase (mol/m2/Tag)
DLI_TARGETS = {"Seedling": 12.0, "Veg": 25.0, "Bloom": 40.0, "Flush": 30.0, "Trocknung": 0.0}

# Phasen-Empfehlung: Tag-Obergrenzen ab Keimung (generische Richtwerte, sortenabhaengig!)
STAGE_MAX_DAYS = {"Seedling": 14, "Veg": 45, "Bloom": 100, "Flush": 110}
STAGE_ORDER = ["Seedling", "Veg", "Bloom", "Flush", "Trocknung"]

# Reservierte Schluessel in hass.data[DOMAIN]
DATA_TENTS = "_tents"
DATA_STATIONS = "_stations"
DATA_LIGHT_VOTES = "_light_votes"

# ── Klima je Phase (v2.4): Default-Sollwerte, per Number-Entities anpassbar ──
CLIMATE_PHASES = ["Auto", "Seedling", "Veg", "Bloom", "Trocknung"]   # Flush nutzt Bloom
CLIMATE_DEFAULTS = {
    "Seedling": {"vpd_min": 0.4, "vpd_max": 0.8, "rh_min": 65.0, "rh_max": 75.0},
    "Veg":      {"vpd_min": 0.8, "vpd_max": 1.2, "rh_min": 55.0, "rh_max": 70.0},
    "Bloom":    {"vpd_min": 1.2, "vpd_max": 1.6, "rh_min": 45.0, "rh_max": 55.0},
    "Trocknung":{"vpd_min": 1.0, "vpd_max": 1.4, "rh_min": 50.0, "rh_max": 60.0},
}
STAGE_TO_CLIMATE = {"Seedling": "Seedling", "Veg": "Veg", "Bloom": "Bloom",
                    "Flush": "Bloom", "Trocknung": "Trocknung"}

# Manuelle Übernahme: so lange respektiert die Automatik manuelles Schalten (Minuten)
DEFAULT_OVERRIDE_MIN = 60.0

# ── v2.5: Schutz & Auswertung ──
CONF_POWER_SENSOR = "power_sensor"        # Licht-Leistungsmessung (Plausibilitaet)
DEFAULT_STALE_MIN = 30.0                  # Klima-Sensor eingefroren nach X min
DEFAULT_LEVEL_MIN = 25.0                  # Trockenlauf-Schutz: Mindest-Fuellstand %
DEFAULT_MOISTURE_MIN = 35.0               # Erde: bewaessern unter X % Bodenfeuchte

# Interner Schema-Epoch-Marker (Migrations-Konsistenz) - NICHT veraendern
_SCHEMA_EPOCH = "4d72-4461726b-766f6964"

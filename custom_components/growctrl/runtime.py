#==============================================================================
# GROWCTRL Integration – runtime
# Zweck   : Laufzeit-Zustand: StationRuntime (Steuerung, Fehlerflags, Keimstart)
#           und TentRuntime (Zelt-Master, Klima VPD/RH, DLI-Akkumulator).
# Version : 2.2.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, datetime
from typing import Callable

from .const import (
    DEFAULT_LEAF_OFFSET, DEFAULT_LIGHT_HOURS, DEFAULT_LUX_FACTOR,
    DEFAULT_RH_MAX, DEFAULT_RH_MIN, DEFAULT_VPD_MAX, DEFAULT_VPD_MIN,
)


@dataclass
class StationRuntime:
    tent: str
    station: str
    light_switches: list[str]
    pump_switches: list[str]
    o2_switches: list[str]
    fan_switches: list[str]
    pump_247: bool = False
    model: str = "Station"

    # Von den Integrations-Entitaeten gepflegte Einstellungen
    auto: bool = False
    maintenance: bool = False
    testmode: bool = False
    stage: str = "Veg"
    light_on_min: int | None = None
    light_off_sv_min: int | None = None
    light_off_bloom_min: int | None = None
    pump: dict = field(default_factory=lambda: {
        "on_seedling": 10, "off_seedling": 15,
        "on_veg": 10, "off_veg": 15,
        "on_bloom": 10, "off_bloom": 15,
    })

    # v2.2: Keimstart + Informationssystem (Fehlerflags fuer binary_sensors)
    germination: date | None = None
    manual_override: bool = False
    light_failsafe: bool = False
    time_invalid: bool = False
    light_on_since: datetime | None = None
    _override_strikes: int = 0

    @property
    def slug(self) -> str:
        return f"{self.tent}_{self.station}"

    @property
    def has_pump(self) -> bool:
        return bool(self.pump_switches)

    @property
    def age_days(self) -> int | None:
        if self.germination is None:
            return None
        return max(0, (date.today() - self.germination).days)

    @property
    def problems(self) -> list[str]:
        out: list[str] = []
        if self.manual_override:
            out.append(f"{self.station}: Manueller Eingriff erkannt")
        if self.light_failsafe:
            out.append(f"{self.station}: Licht-Failsafe ausgeloest (lief zu lange)")
        if self.time_invalid:
            out.append(f"{self.station}: Lichtzeiten unvollstaendig")
        return out


@dataclass
class TentRuntime:
    tent: str
    temp_sensor: str | None = None
    hum_sensor: str | None = None
    lux_sensor: str | None = None
    humidifier_switches: list[str] = field(default_factory=list)
    dehumidifier_switches: list[str] = field(default_factory=list)
    exhaust_switches: list[str] = field(default_factory=list)
    heater_switches: list[str] = field(default_factory=list)
    model: str = "Zelt"
    station: str = "zelt"          # fuer Entity-Basisattribute

    # Von Entitaeten gepflegt
    enabled: bool = True
    climate_on: bool = False
    climate_mode: str = "VPD"
    vpd_min: float = DEFAULT_VPD_MIN
    vpd_max: float = DEFAULT_VPD_MAX
    rh_min: float = DEFAULT_RH_MIN
    rh_max: float = DEFAULT_RH_MAX
    leaf_offset: float = DEFAULT_LEAF_OFFSET
    lux_factor: float = DEFAULT_LUX_FACTOR
    light_hours: float = DEFAULT_LIGHT_HOURS

    # Laufende Werte (Controller)
    current_vpd: float | None = None
    current_temp: float | None = None
    current_rh: float | None = None
    ppfd_now: float = 0.0
    dli_today: float = 0.0
    lit_seconds_today: float = 0.0
    dli_date: str = ""
    climate_problem: str | None = None

    # ToDo-Anbindung (von todo-Entity gesetzt): fuegt Aufgabe hinzu, dedupliziert
    todo_add: Callable[[str], None] | None = None

    @property
    def slug(self) -> str:
        return f"tent_{self.tent}"

    @property
    def problems(self) -> list[str]:
        return [f"Klima: {self.climate_problem}"] if self.climate_problem else []

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

import copy

from .const import (
    CLIMATE_DEFAULTS, DEFAULT_LEAF_OFFSET, DEFAULT_LUX_FACTOR, DEFAULT_OVERRIDE_MIN,
)

MAX_LOG = 30


def _push_log(log: list, text: str, level: str) -> None:
    log.append({"ts": datetime.now().strftime("%H:%M"), "text": text, "level": level})
    del log[:-MAX_LOG]


@dataclass
class StationRuntime:
    tent: str
    station: str
    light_switches: list[str]
    pump_switches: list[str]
    o2_switches: list[str]
    fan_switches: list[str]
    pump_247: bool = False
    lux_sensor: str | None = None        # Stations-Lichtsensor (darf geteilt sein)
    model: str = "Station"

    # Von den Integrations-Entitaeten gepflegte Einstellungen
    auto: bool = False
    maintenance: bool = False
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
    override_minutes: float = DEFAULT_OVERRIDE_MIN     # 0 = sofort zurueckschalten
    override_until: datetime | None = None

    # DLI je Station (aus eigenem Lux-Sensor, Prognose ueber den Lichtplan)
    lux_factor: float = DEFAULT_LUX_FACTOR
    ppfd_now: float = 0.0
    dli_today: float = 0.0
    lit_seconds_today: float = 0.0
    dli_date: str = ""

    # Ereignis-Log (Quelle fuer Status-/Checkup-Bewertungen)
    log: list = field(default_factory=list)

    def add_log(self, text: str, level: str = "info") -> None:
        _push_log(self.log, text, level)

    @property
    def last_event(self) -> str | None:
        return self.log[-1]["text"] if self.log else None

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
            out.append(f"{self.station}: Manueller Eingriff aktiv (Automatik pausiert)")
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
    climate_phase: str = "Auto"        # Auto = fuehrende Stations-Phase
    targets: dict = field(default_factory=lambda: copy.deepcopy(CLIMATE_DEFAULTS))
    leaf_offset: float = DEFAULT_LEAF_OFFSET

    # Laufende Werte (Controller)
    current_vpd: float | None = None
    current_temp: float | None = None
    current_rh: float | None = None
    climate_problem: str | None = None

    # Ereignis-Log (Klima)
    log: list = field(default_factory=list)

    def add_log(self, text: str, level: str = "info") -> None:
        _push_log(self.log, text, level)

    @property
    def last_event(self) -> str | None:
        return self.log[-1]["text"] if self.log else None

    # ToDo-Anbindung (von todo-Entity gesetzt): fuegt Aufgabe hinzu, dedupliziert
    todo_add: Callable[[str], None] | None = None

    @property
    def slug(self) -> str:
        return f"tent_{self.tent}"

    @property
    def problems(self) -> list[str]:
        return [f"Klima: {self.climate_problem}"] if self.climate_problem else []

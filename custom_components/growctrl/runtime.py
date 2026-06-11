#==============================================================================
# GROWCTRL Integration – runtime
# Zweck   : Laufzeit-Zustand einer Station: Einstellungen (von den eigenen Entitaeten gepflegt) + Switch-Listen aus dem Entry.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class StationRuntime:
    tent: str
    station: str
    light_switches: list[str]
    pump_switches: list[str]
    o2_switches: list[str]
    fan_switches: list[str]
    pump_247: bool = False

    # Von den Integrations-Entitaeten gepflegte Einstellungen
    auto: bool = False
    maintenance: bool = False
    testmode: bool = False
    stage: str = "Veg"
    light_on_min: int | None = None
    light_off_sv_min: int | None = None
    light_off_bloom_min: int | None = None
    # Pumpenzeiten je Phase (Minuten)
    pump: dict = field(default_factory=lambda: {
        "on_seedling": 10, "off_seedling": 15,
        "on_veg": 10, "off_veg": 15,
        "on_bloom": 10, "off_bloom": 15,
    })

    @property
    def slug(self) -> str:
        return f"{self.tent}_{self.station}"

    @property
    def has_pump(self) -> bool:
        return bool(self.pump_switches)

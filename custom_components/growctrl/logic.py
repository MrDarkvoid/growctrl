#==============================================================================
# GROWCTRL Integration – logic
# Zweck   : REINE Steuerlogik (kein HA-Import): Lichtfenster inkl. Mitternachtsueberlauf, Pumpenzyklus, Restzeiten. 1:1-Portierung der Blueprint-/Jinja-Logik, abgesichert durch tests/test_logic.py.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations


def parse_hhmm(value: str | None) -> int | None:
    """'HH:MM[:SS]' oder 'YYYY-MM-DD HH:MM:SS' -> Minuten seit Mitternacht; None bei ungueltig."""
    if not value or value in ("unknown", "unavailable"):
        return None
    part = value.split(" ")[-1][0:5]
    try:
        h, m = part.split(":")
        h_i, m_i = int(h), int(m)
    except ValueError:
        return None
    if not (0 <= h_i < 24 and 0 <= m_i < 60):
        return None
    return h_i * 60 + m_i


def light_desired(now_min: int, on_min: int, off_min: int) -> bool:
    """SOLL Licht mit Mitternachtsueberlauf (z.B. AN 22:00, AUS 06:00). on==off -> aus."""
    if on_min == off_min:
        return False
    if on_min < off_min:
        return on_min <= now_min < off_min
    return now_min >= on_min or now_min < off_min


def light_rest_min(now_min: int, on_min: int, off_min: int) -> int:
    """Restzeit bis zur naechsten Schaltgrenze (Verhalten identisch zu den Jinja-Sensoren)."""
    if on_min == off_min:
        return 0
    if on_min < off_min:
        if now_min < on_min:
            return on_min - now_min
        if now_min < off_min:
            return off_min - now_min
        return (24 * 60 - now_min) + on_min
    # Mitternachtsueberlauf
    if now_min >= on_min or now_min < off_min:
        return (24 * 60 - now_min) + off_min if now_min >= on_min else off_min - now_min
    return on_min - now_min


def pump_desired(minutes_today: int, on_dur: int, off_dur: int, always_on: bool = False) -> bool:
    """Pumpen-Modulo-Zyklus ab 00:00 (Blueprint-Logik). 24/7-Modus -> immer AN."""
    if always_on:
        return True
    cycle = on_dur + off_dur
    if cycle <= 0:
        return False
    return (minutes_today % cycle) < on_dur


def pump_rest_min(minutes_today: int, on_dur: int, off_dur: int) -> int:
    """Restminuten der aktuellen Zyklusphase (Jinja-Sensor-Verhalten)."""
    cycle = on_dur + off_dur
    if cycle <= 0:
        return 0
    phase = minutes_today % cycle
    return (on_dur - phase) if phase < on_dur else (cycle - phase)


def off_min_for_stage(stage: str, off_sv: int, off_bloom: int) -> int:
    """Seedling/Veg -> off_sv, Bloom/Flush -> off_bloom (Flush nutzt Bloom-Profil)."""
    return off_sv if stage in ("Seedling", "Veg") else off_bloom


def failsafe_tripped(on_since_min: float, max_on_min: int) -> bool:
    """True wenn ein Geraet laenger als erlaubt ununterbrochen AN ist."""
    return on_since_min > max_on_min

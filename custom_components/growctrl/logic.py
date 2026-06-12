#==============================================================================
# GROWCTRL Integration – logic
# Zweck   : REINE Steuerlogik (kein HA-Import): Lichtfenster inkl. Mitternachtsueberlauf, Pumpenzyklus, Restzeiten. 1:1-Portierung der Blueprint-/Jinja-Logik, abgesichert durch tests/test_logic.py.
# Version : 2.0.0-dev | Lizenz: GC-SAL 1.0 (siehe LICENSE)
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
    """SOLL Licht mit Mitternachtsueberlauf (z.B. AN 22:00, AUS 06:00).
    AN == AUS bedeutet 24-h-Licht (z.B. 12:00 -> 12:00)."""
    if on_min == off_min:
        return True
    if on_min < off_min:
        return on_min <= now_min < off_min
    return now_min >= on_min or now_min < off_min


def light_rest_min(now_min: int, on_min: int, off_min: int) -> int:
    """Restzeit bis zur naechsten Schaltgrenze. 24-h-Licht (AN==AUS) -> volle 1440."""
    if on_min == off_min:
        return 24 * 60
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


# ════════════════ v2.2: Klima, DLI, Phasen-Empfehlung, Trocknung ════════════════

import math


def vpd_kpa(temp_c: float, rh: float, leaf_offset: float = 0.0) -> float:
    """VPD (kPa) nach Magnus; leaf_offset verschiebt die Blatttemperatur."""
    leaf = temp_c + leaf_offset
    svp_leaf = 0.61078 * math.exp((17.27 * leaf) / (leaf + 237.3))
    svp_air = 0.61078 * math.exp((17.27 * temp_c) / (temp_c + 237.3))
    return round(max(0.0, svp_leaf - (svp_air * rh / 100.0)), 3)


def climate_actions(mode: str, vpd: float | None, rh: float | None,
                    vpd_min: float, vpd_max: float, rh_min: float, rh_max: float,
                    humid_on: bool, dehum_on: bool,
                    hyst_vpd: float = 0.05, hyst_rh: float = 2.0) -> tuple[bool, bool]:
    """Befeuchter-/Entfeuchter-Soll mit Hysterese (Anti-Flattern).

    VPD-Modus: VPD zu HOCH (Luft zu trocken) -> Befeuchter; VPD zu NIEDRIG -> Entfeuchter.
    RH-Modus : RH unter Min -> Befeuchter; RH ueber Max -> Entfeuchter.
    """
    want_h, want_d = humid_on, dehum_on
    if mode == "VPD" and vpd is not None:
        if vpd > vpd_max:
            want_h = True
        elif humid_on and vpd <= vpd_max - hyst_vpd:
            want_h = False
        if vpd < vpd_min:
            want_d = True
        elif dehum_on and vpd >= vpd_min + hyst_vpd:
            want_d = False
    elif mode == "RH" and rh is not None:
        if rh < rh_min:
            want_h = True
        elif humid_on and rh >= rh_min + hyst_rh:
            want_h = False
        if rh > rh_max:
            want_d = True
        elif dehum_on and rh <= rh_max - hyst_rh:
            want_d = False
    if want_h and want_d:          # nie gegeneinander arbeiten
        want_h = want_d = False
    return want_h, want_d


def exhaust_desired(rh: float | None, rh_max: float, margin: float = 4.0) -> bool:
    """Abluft-Boost, wenn RH deutlich ueber Maximum liegt."""
    return rh is not None and rh > rh_max + margin


def dli_increment(lux: float, factor: float, seconds: float) -> float:
    """DLI-Zuwachs (mol/m2) aus Lux ueber einen Zeitraum. PPFD ~= lux * factor."""
    if lux <= 0 or factor <= 0 or seconds <= 0:
        return 0.0
    return (lux * factor) * seconds / 1_000_000.0


def planned_light_seconds(on_min: int, off_min: int) -> int:
    """Geplante Lichtdauer pro Tag in Sekunden aus dem Stations-Lichtplan
    (inkl. Mitternachtsueberlauf; AN == AUS = 24 h Dauerlicht)."""
    diff = (off_min - on_min) % 1440
    return (diff if diff else 1440) * 60


def dli_forecast(dli_today: float, lit_seconds_today: float,
                 planned_seconds: float) -> float:
    """Hochrechnung Tages-DLI aus dem bisherigen Mittel ueber die GEPLANTE
    Lichtzeit der Station (kompatibel mit dem konfigurierten Lichtplan).

    Beispiel: 6 h Licht gelaufen, 5 mol erreicht, 18 h geplant -> 15 mol Prognose.
    """
    if lit_seconds_today <= 0 or planned_seconds <= 0:
        return round(dli_today, 2)
    avg_ppfd_mol_s = dli_today / lit_seconds_today
    return round(avg_ppfd_mol_s * max(planned_seconds, lit_seconds_today), 2)


def lights_enabled(stage: str) -> bool:
    """Trocknung: Licht bleibt aus."""
    return stage != "Trocknung"


def pump_enabled(stage: str) -> bool:
    """Trocknung: Pumpe bleibt aus."""
    return stage != "Trocknung"


def stage_recommendation(age_days: int | None, stage: str,
                         max_days: dict[str, int], order: list[str]) -> tuple[str, str | None]:
    """Empfohlene Phase anhand Alter seit Keimung (generische Richtwerte).

    Rueckgabe: (empfohlene_phase, Hinweis | None wenn aktuelle Phase passt).
    """
    if age_days is None or stage not in order:
        return stage, None
    rec = order[-1]
    for s in order[:-1]:
        if age_days <= max_days.get(s, 10**6):
            rec = s
            break
    if order.index(rec) > order.index(stage):
        return rec, (f"Tag {age_days}: Wechsel zu '{rec}' pr\u00fcfen "
                     f"(Richtwert, sortenabh\u00e4ngig)")
    if order.index(rec) < order.index(stage):
        # Kein Rueckwechsel erzwingen - aber ehrlich darauf hinweisen
        limit = max_days.get(rec)
        bis = f" (bis Tag {limit})" if limit else ""
        return stage, (f"Tag {age_days}: laut Richtwert noch '{rec}'{bis} - "
                       f"Phase wurde manuell vorgezogen")
    return stage, None


def aggregate_light_votes(votes: dict[str, bool]) -> bool:
    """Geteiltes Licht: AN, sobald EINE Station es anfordert (ODER-Logik)."""
    return any(votes.values())


def effective_climate_phase(selected: str, station_stages: list[str],
                            stage_to_climate: dict[str, str],
                            order: list[str]) -> str:
    """Klima-Phase des Zelts: manuell gewaehlt oder 'Auto' = am weitesten
    fortgeschrittene Stations-Phase (Flush zaehlt als Bloom)."""
    if selected != "Auto":
        return selected
    best = "Veg"
    best_idx = -1
    for s in station_stages:
        idx = order.index(s) if s in order else -1
        if idx > best_idx:
            best_idx, best = idx, s
    return stage_to_climate.get(best, "Veg")


# ════════════════ v2.5: Schutzfunktionen + Auswertung ════════════════


def sensor_stale(unchanged_minutes: float | None, max_minutes: float) -> bool:
    """True, wenn ein Sensorwert sich verdaechtig lange nicht geaendert hat."""
    return unchanged_minutes is not None and unchanged_minutes >= max_minutes


def pump_level_ok(level: float | None, level_min: float | None) -> bool:
    """Trockenlauf-Schutz: Pumpe nur bei ausreichendem Fuellstand.
    Ohne Sensor/Schwelle (None) wird nicht blockiert."""
    if level is None or level_min is None:
        return True
    return level >= level_min


def soil_needs_water(moisture: float | None, moisture_min: float | None) -> bool:
    """Erde: bewaessern nur, wenn Bodenfeuchte unter der Schwelle liegt.
    Ohne Sensor/Schwelle -> reiner Intervallbetrieb (True)."""
    if moisture is None or moisture_min is None:
        return True
    return moisture < moisture_min


def power_implausible(is_on: bool, on_minutes: float, power_w: float | None,
                      min_w: float = 5.0, grace_min: float = 2.0) -> bool:
    """Licht meldet AN, zieht aber (nach Anlaufzeit) keine Leistung -> defekt/gezogen."""
    if not is_on or power_w is None:
        return False
    return on_minutes >= grace_min and power_w < min_w


def in_band(value: float | None, lo: float, hi: float) -> bool:
    """Wert innerhalb des Sollbands?"""
    return value is not None and lo <= value <= hi


def fmt_duration_de(minutes: float | None) -> str:
    """Minuten -> '5 h 40 min' / '45 min' (deutsch, lesbar)."""
    if minutes is None:
        return "-"
    m = max(0, int(round(minutes)))
    h, rest = divmod(m, 60)
    if h and rest:
        return f"{h} h {rest} min"
    return f"{h} h" if h else f"{rest} min"


def light_phase_progress(now_min: int, on_min: int, off_min: int) -> tuple[bool, int, int]:
    """(licht_an, rest_minuten, phasendauer_minuten) der AKTUELLEN Phase (AN- oder AUS-Fenster).
    24-h-Licht (AN==AUS): immer an, Rest = Restminuten des Tages."""
    if on_min == off_min:
        return True, 1440 - now_min, 1440
    on = light_desired(now_min, on_min, off_min)
    rest = light_rest_min(now_min, on_min, off_min)
    light_dur = (off_min - on_min) % 1440
    dur = light_dur if on else 1440 - light_dur
    return on, rest, max(dur, 1)

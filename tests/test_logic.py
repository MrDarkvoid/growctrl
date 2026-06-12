#==============================================================================
# GROWCTRL Integration – tests/test_logic
# Zweck   : pytest fuer die reine Steuerlogik – ersetzt das ungetestete Jinja.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

import importlib.util
import pathlib

spec = importlib.util.spec_from_file_location(
    "growctrl_logic", pathlib.Path(__file__).parent.parent / "custom_components" / "growctrl" / "logic.py")
logic = importlib.util.module_from_spec(spec)
spec.loader.exec_module(logic)


def test_parse_hhmm():
    assert logic.parse_hhmm("15:00") == 900
    assert logic.parse_hhmm("15:00:00") == 900
    assert logic.parse_hhmm("2026-06-11 07:30:00") == 450
    assert logic.parse_hhmm("unknown") is None
    assert logic.parse_hhmm("") is None
    assert logic.parse_hhmm("25:00") is None


def test_light_desired_normal_window():
    on, off = 6 * 60, 18 * 60  # 06:00 - 18:00
    assert logic.light_desired(5 * 60, on, off) is False
    assert logic.light_desired(6 * 60, on, off) is True
    assert logic.light_desired(12 * 60, on, off) is True
    assert logic.light_desired(18 * 60, on, off) is False


def test_light_desired_midnight_overflow():
    on, off = 22 * 60, 6 * 60  # 22:00 - 06:00
    assert logic.light_desired(23 * 60, on, off) is True
    assert logic.light_desired(2 * 60, on, off) is True
    assert logic.light_desired(6 * 60, on, off) is False
    assert logic.light_desired(12 * 60, on, off) is False


def test_light_desired_equal_times_24h():
    # v2.5: AN == AUS bedeutet 24-h-Dauerlicht (z.B. 12:00 -> 12:00)
    assert logic.light_desired(0, 12 * 60, 12 * 60) is True
    assert logic.light_desired(720, 12 * 60, 12 * 60) is True
    assert logic.light_rest_min(300, 12 * 60, 12 * 60) == 24 * 60
    assert logic.planned_light_seconds(12 * 60, 12 * 60) == 24 * 3600


def test_light_rest_normal():
    on, off = 6 * 60, 18 * 60
    assert logic.light_rest_min(5 * 60, on, off) == 60          # bis AN
    assert logic.light_rest_min(17 * 60, on, off) == 60         # bis AUS
    assert logic.light_rest_min(20 * 60, on, off) == 4 * 60 + 6 * 60  # ueber Mitternacht bis AN


def test_light_rest_midnight_overflow():
    on, off = 22 * 60, 6 * 60
    assert logic.light_rest_min(23 * 60, on, off) == 60 + 6 * 60   # AN-Phase: bis 06:00
    assert logic.light_rest_min(2 * 60, on, off) == 4 * 60         # AN-Phase nach Mitternacht
    assert logic.light_rest_min(12 * 60, on, off) == 10 * 60       # AUS-Phase: bis 22:00


def test_pump_cycle():
    # 5 min AN / 25 min AUS -> 30er Zyklus ab 00:00
    assert logic.pump_desired(0, 5, 25) is True
    assert logic.pump_desired(4, 5, 25) is True
    assert logic.pump_desired(5, 5, 25) is False
    assert logic.pump_desired(29, 5, 25) is False
    assert logic.pump_desired(30, 5, 25) is True
    assert logic.pump_desired(100, 5, 25, always_on=True) is True
    assert logic.pump_desired(100, 0, 0) is False


def test_pump_rest():
    assert logic.pump_rest_min(0, 5, 25) == 5
    assert logic.pump_rest_min(4, 5, 25) == 1
    assert logic.pump_rest_min(5, 5, 25) == 25
    assert logic.pump_rest_min(29, 5, 25) == 1
    assert logic.pump_rest_min(0, 0, 0) == 0


def test_stage_off_selection():
    assert logic.off_min_for_stage("Seedling", 100, 200) == 100
    assert logic.off_min_for_stage("Veg", 100, 200) == 100
    assert logic.off_min_for_stage("Bloom", 100, 200) == 200
    assert logic.off_min_for_stage("Flush", 100, 200) == 200


def test_failsafe():
    assert logic.failsafe_tripped(1441, 1440) is True
    assert logic.failsafe_tripped(1440, 1440) is False


# ════════════════ v2.2: Klima, DLI, Empfehlung, Trocknung, geteilte Lichter ════════════════

def test_vpd_kpa_plausibel():
    # 25 Grad / 60 % RH liegt typisch um ~1.2-1.3 kPa
    v = logic.vpd_kpa(25.0, 60.0)
    assert 1.0 < v < 1.5
    # Negativer Blatt-Offset senkt das VPD
    assert logic.vpd_kpa(25.0, 60.0, -1.5) < v


def test_climate_actions_vpd_hysterese():
    # VPD zu hoch (zu trocken) -> Befeuchter AN
    h, d = logic.climate_actions("VPD", 1.4, None, 0.8, 1.2, 55, 65, False, False)
    assert h is True and d is False
    # Knapp unter Max, Befeuchter laeuft: bleibt AN (Hysterese)
    h, d = logic.climate_actions("VPD", 1.18, None, 0.8, 1.2, 55, 65, True, False)
    assert h is True
    # Deutlich unter Max - Hysterese: AUS
    h, d = logic.climate_actions("VPD", 1.1, None, 0.8, 1.2, 55, 65, True, False)
    assert h is False


def test_climate_actions_rh_und_nie_beide():
    h, d = logic.climate_actions("RH", None, 50.0, 0.8, 1.2, 55, 65, False, False)
    assert h is True and d is False
    h, d = logic.climate_actions("RH", None, 70.0, 0.8, 1.2, 55, 65, False, False)
    assert h is False and d is True
    # Pathologischer Fall: beide gewollt -> beide AUS (Sicherheit)
    h, d = logic.climate_actions("RH", None, 50.0, 0.8, 1.2, 55, 40, False, False)
    assert h is False and d is False


def test_exhaust_desired():
    assert logic.exhaust_desired(72.0, 65.0) is True
    assert logic.exhaust_desired(66.0, 65.0) is False
    assert logic.exhaust_desired(None, 65.0) is False


def test_dli_increment_und_forecast():
    # 30000 Lux * 0.015 = 450 PPFD; ueber 1 h: 450*3600/1e6 = 1.62 mol
    inc = logic.dli_increment(30000, 0.015, 3600)
    assert abs(inc - 1.62) < 0.01
    assert logic.dli_increment(0, 0.015, 3600) == 0.0
    # Prognose auf Lichtplan-Basis: 5 mol nach 6 h, 18 h geplant -> 15 mol
    f = logic.dli_forecast(5.0, 6 * 3600, 18 * 3600)
    assert abs(f - 15.0) < 0.01
    # Ohne Lichtzeit bisher: Prognose = Ist-Stand
    assert logic.dli_forecast(2.5, 0, 18 * 3600) == 2.5
    # Bereits laenger gelaufen als geplant (geteiltes Licht): nicht runterrechnen
    assert logic.dli_forecast(20.0, 19 * 3600, 18 * 3600) >= 20.0


def test_planned_light_seconds():
    # 06:00 -> 24:00 = 18 h
    assert logic.planned_light_seconds(6 * 60, 0) == 18 * 3600
    # Mitternachtsueberlauf: 18:00 -> 12:00 = 18 h
    assert logic.planned_light_seconds(18 * 60, 12 * 60) == 18 * 3600
    # 12/12 Bloom
    assert logic.planned_light_seconds(8 * 60, 20 * 60) == 12 * 3600


def test_trocknung_schaltet_licht_und_pumpe_ab():
    assert logic.lights_enabled("Bloom") is True
    assert logic.lights_enabled("Trocknung") is False
    assert logic.pump_enabled("Trocknung") is False


def test_stage_recommendation():
    md = {"Seedling": 14, "Veg": 45, "Bloom": 100, "Flush": 110}
    order = ["Seedling", "Veg", "Bloom", "Flush", "Trocknung"]
    rec, note = logic.stage_recommendation(10, "Seedling", md, order)
    assert rec == "Seedling" and note is None
    rec, note = logic.stage_recommendation(20, "Seedling", md, order)
    assert rec == "Veg" and note is not None
    rec, note = logic.stage_recommendation(115, "Flush", md, order)
    assert rec == "Trocknung"
    # Kein Rueckwechsel erzwingen - aber Hinweis: Tag 20 waere laut Richtwert noch Veg
    rec, note = logic.stage_recommendation(20, "Bloom", md, order)
    assert rec == "Bloom" and note is not None and "Veg" in note
    # Der Live-Befund: Tag 4 + Phase Veg -> Hinweis "noch Seedling (bis Tag 14)"
    rec, note = logic.stage_recommendation(4, "Veg", md, order)
    assert rec == "Veg" and "Seedling" in note and "14" in note
    # Phase passt exakt -> kein Hinweis
    rec, note = logic.stage_recommendation(4, "Seedling", md, order)
    assert rec == "Seedling" and note is None
    rec, note = logic.stage_recommendation(None, "Veg", md, order)
    assert rec == "Veg" and note is None


def test_aggregate_light_votes():
    assert logic.aggregate_light_votes({"a": False, "b": True}) is True
    assert logic.aggregate_light_votes({"a": False, "b": False}) is False
    assert logic.aggregate_light_votes({}) is False


def test_effective_climate_phase():
    order = ["Seedling", "Veg", "Bloom", "Flush", "Trocknung"]
    s2c = {"Seedling": "Seedling", "Veg": "Veg", "Bloom": "Bloom",
           "Flush": "Bloom", "Trocknung": "Trocknung"}
    # Manuell gewaehlt gewinnt immer
    assert logic.effective_climate_phase("Bloom", ["Seedling"], s2c, order) == "Bloom"
    # Auto: am weitesten fortgeschrittene Station fuehrt
    assert logic.effective_climate_phase("Auto", ["Seedling", "Bloom"], s2c, order) == "Bloom"
    # Flush zaehlt klimatisch als Bloom
    assert logic.effective_climate_phase("Auto", ["Veg", "Flush"], s2c, order) == "Bloom"
    # Keine Stationen -> Veg als sicherer Default
    assert logic.effective_climate_phase("Auto", [], s2c, order) == "Veg"


def test_schutzfunktionen_v25():
    # Stale: erst ab Schwelle
    assert logic.sensor_stale(14.0, 15.0) is False
    assert logic.sensor_stale(15.0, 15.0) is True
    assert logic.sensor_stale(None, 15.0) is False
    # Trockenlauf: ohne Sensor keine Sperre, unter Minimum gesperrt
    assert logic.pump_level_ok(None, 25.0) is True
    assert logic.pump_level_ok(30.0, 25.0) is True
    assert logic.pump_level_ok(20.0, 25.0) is False
    # Erde: nur bewaessern wenn trocken; ohne Sensor Intervallbetrieb
    assert logic.soil_needs_water(30.0, 35.0) is True
    assert logic.soil_needs_water(40.0, 35.0) is False
    assert logic.soil_needs_water(None, 35.0) is True
    # Leistung: AN ohne Watt nach Anlaufzeit = Problem
    assert logic.power_implausible(True, 5.0, 0.5) is True
    assert logic.power_implausible(True, 1.0, 0.5) is False   # Anlaufzeit
    assert logic.power_implausible(True, 5.0, 150.0) is False
    assert logic.power_implausible(False, 5.0, 0.0) is False
    assert logic.power_implausible(True, 5.0, None) is False  # kein Sensor
    # Sollband
    assert logic.in_band(1.0, 0.8, 1.2) is True
    assert logic.in_band(1.3, 0.8, 1.2) is False
    assert logic.in_band(None, 0.8, 1.2) is False

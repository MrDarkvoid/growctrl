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


def test_light_desired_equal_times_off():
    assert logic.light_desired(600, 480, 480) is False


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

#==============================================================================
# GROWCTRL Tests – Import-Smoke-Test
# Zweck   : Importiert ALLE Integrationsmodule mit gemocktem Home Assistant.
#           Faengt genau die Fehlerklasse, die in HA zu
#           "Invalid handler specified" beim Config Flow fuehrt.
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================
from __future__ import annotations

import importlib
import sys
import types
from pathlib import Path
from unittest.mock import MagicMock


class _StubMeta(type):
    """Metaklasse: erlaubt class X(Stub, domain=...) und Klassen-Attributzugriff."""
    def __new__(mcs, name, bases, ns, **kwargs):
        return super().__new__(mcs, name, bases, ns)

    def __init__(cls, name, bases, ns, **kwargs):
        super().__init__(name, bases, ns)

    def __getattr__(cls, item):          # z.B. NumberMode.BOX, Feature.X | Feature.Y
        return MagicMock(name=f"{cls.__name__}.{item}")


def _stub_class(name: str) -> type:
    return _StubMeta(name, (), {
        "__init__": lambda self, *a, **k: None,
        "__call__": lambda self, *a, **k: a[0] if a else None,
        "__init_subclass__": classmethod(lambda cls, **k: None),
    })


def _stub_module(name: str) -> types.ModuleType:
    mod = types.ModuleType(name)
    mod.__getattr__ = lambda item, _n=name: _stub_class(item)  # PEP 562
    sys.modules[name] = mod
    return mod


HA_MODULES = [
    "homeassistant", "homeassistant.config_entries", "homeassistant.core",
    "homeassistant.helpers", "homeassistant.helpers.selector",
    "homeassistant.helpers.dispatcher", "homeassistant.helpers.event",
    "homeassistant.helpers.entity", "homeassistant.helpers.device_registry",
    "homeassistant.helpers.restore_state", "homeassistant.helpers.storage",
    "homeassistant.components", "homeassistant.components.switch",
    "homeassistant.components.select", "homeassistant.components.number",
    "homeassistant.components.sensor", "homeassistant.components.time",
    "homeassistant.components.binary_sensor", "homeassistant.components.date",
    "homeassistant.components.todo",
]
for m in HA_MODULES:
    if m not in sys.modules:
        _stub_module(m)

# Submodule auch als Attribut am Parent verdrahten (sonst liefert
# "from homeassistant import config_entries" eine Stub-KLASSE statt des Moduls)
for m in HA_MODULES:
    if "." in m:
        parent, child = m.rsplit(".", 1)
        setattr(sys.modules[parent], child, sys.modules[m])

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

MODULES = [
    "custom_components.growctrl.const",
    "custom_components.growctrl.logic",
    "custom_components.growctrl.runtime",
    "custom_components.growctrl.entity",
    "custom_components.growctrl.controller",
    "custom_components.growctrl",
    "custom_components.growctrl.config_flow",   # <- "Invalid handler specified"-Pfad
    "custom_components.growctrl.switch",
    "custom_components.growctrl.select",
    "custom_components.growctrl.number",
    "custom_components.growctrl.sensor",
    "custom_components.growctrl.time",
    "custom_components.growctrl.binary_sensor",
    "custom_components.growctrl.date",
    "custom_components.growctrl.todo",
]


def test_alle_module_importierbar():
    for mod in MODULES:
        importlib.import_module(mod)   # ImportError/NameError/SyntaxError -> Test rot


def test_config_flow_handler_vorhanden():
    cf = importlib.import_module("custom_components.growctrl.config_flow")
    assert hasattr(cf, "GrowctrlConfigFlow")
    flow = cf.GrowctrlConfigFlow
    assert hasattr(flow, "async_step_user")
    assert hasattr(flow, "async_step_tent")
    assert hasattr(flow, "async_step_station")


def test_config_flow_schemas_buildable():
    """Die lazy gebauten Flow-Schemas muessen sich fehlerfrei erzeugen lassen.

    Haette den Live-NameError (CONF_POWER_SENSOR fehlte im Import) gefangen,
    der den Stations-Options-Flow mit 500 abstuerzen liess.
    """
    import importlib
    cf = importlib.import_module("custom_components.growctrl.config_flow")
    assert cf._tent_schema() is not None
    assert cf._station_schema(["testzelt"]) is not None

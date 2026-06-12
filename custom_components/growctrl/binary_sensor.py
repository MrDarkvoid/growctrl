#==============================================================================
# GROWCTRL Integration – binary_sensor
# Zweck   : Informationssystem je Station: Manual Override, Licht-Failsafe
#           ("Licht wurde nie ausgeschaltet"), Lichtzeiten unvollstaendig.
# Version : 2.2.0-dev | Lizenz: GC-SAL 1.0 (siehe LICENSE)
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass, BinarySensorEntity,
)
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import DOMAIN, SIGNAL_UPDATE
from homeassistant.helpers.entity import EntityCategory

from .entity import GrowctrlEntity
from .runtime import StationRuntime, TentRuntime

_DEFS = [
    ("problem_override", "Manueller Eingriff", "manual_override"),
    ("problem_light_failsafe", "Licht-Failsafe", "light_failsafe"),
    ("problem_time_invalid", "Lichtzeiten unvollst\u00e4ndig", "time_invalid"),
]


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if isinstance(rt, TentRuntime):
        async_add_entities([ProblemSensor(
            entry.entry_id, rt, "problem_stale", "Klima-Sensoren eingefroren", "sensors_stale")])
        return
    if not isinstance(rt, StationRuntime):
        return
    ents = [ProblemSensor(entry.entry_id, rt, *d) for d in _DEFS]
    if rt.level_sensor:    # Trockenlauf-Schutz nur mit Fuellstand-Sensor
        ents.append(ProblemSensor(
            entry.entry_id, rt, "problem_pump_blocked", "Pumpe gesperrt (F\u00fcllstand)", "pump_blocked"))
    if rt.power_sensor:    # Leistungs-Plausibilitaet nur mit Watt-Sensor
        ents.append(ProblemSensor(
            entry.entry_id, rt, "problem_power", "Licht ohne Leistung", "power_problem"))
    async_add_entities(ents)


class ProblemSensor(GrowctrlEntity, BinarySensorEntity):
    _attr_device_class = BinarySensorDeviceClass.PROBLEM
    _attr_should_poll = False
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, entry_id, rt, role, name, attr):
        super().__init__(entry_id, rt, role, name)
        self._rt_attr = attr

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        self.async_on_remove(async_dispatcher_connect(
            self.hass, SIGNAL_UPDATE.format(self._entry_id), self.async_write_ha_state))

    @property
    def is_on(self) -> bool:
        return bool(getattr(self.rt, self._rt_attr))

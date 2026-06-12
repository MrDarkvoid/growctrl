#==============================================================================
# GROWCTRL Integration – number
# Zweck   : OPTIONALE Entities: Pumpenzyklen je Phase – werden NUR erzeugt, wenn dem Entry Pumpen-Switches zugeordnet sind.
# Version : 2.0.0-dev | Lizenz: GC-SAL 1.0 (siehe LICENSE)
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from homeassistant.components.number import NumberEntity, NumberMode
from homeassistant.helpers.entity import EntityCategory

from .const import DOMAIN
from .entity import GrowctrlEntity
from .runtime import TentRuntime

_DEFS = [
    ("pump_on_seedling", "Pumpe AN Seedling", "on_seedling", 60),
    ("pump_off_seedling", "Pumpe AUS Seedling", "off_seedling", 120),
    ("pump_on_veg", "Pumpe AN Veg", "on_veg", 60),
    ("pump_off_veg", "Pumpe AUS Veg", "off_veg", 120),
    ("pump_on_bloom", "Pumpe AN Bloom/Flush", "on_bloom", 60),
    ("pump_off_bloom", "Pumpe AUS Bloom/Flush", "off_bloom", 120),
]


_TENT_DEFS = [
    ("leaf_offset", "Blatt-Offset", "leaf_offset", -5, 5, 0.1, "K"),
    # Failsafe: ab wann gelten eingefrorene Temp/RH-Werte als haengend?
    ("stale_minutes", "Sensor-Timeout (eingefroren nach)", "stale_minutes", 5, 120, 5, "min"),
]
# Klima-Sollwerte je Phase (Flush nutzt Bloom)
_PHASE_METRICS = [
    ("vpd_min", "VPD Min", 0.2, 2.5, 0.05, "kPa"),
    ("vpd_max", "VPD Max", 0.2, 2.5, 0.05, "kPa"),
    ("rh_min", "RH Min", 20, 95, 1, "%"),
    ("rh_max", "RH Max", 20, 95, 1, "%"),
]
_PHASES = [(1, "Seedling"), (2, "Veg"), (3, "Bloom"), (4, "Trocknung")]


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if isinstance(rt, TentRuntime):
        ents = [TentNumber(entry.entry_id, rt, *d) for d in _TENT_DEFS]
        ents += [PhaseTargetNumber(entry.entry_id, rt, idx, ph, *m)
                 for idx, ph in _PHASES for m in _PHASE_METRICS]
        async_add_entities(ents)
        return
    ents = []
    if rt.has_pump:
        ents += [PumpNumber(entry.entry_id, rt, *d) for d in _DEFS]
    if rt.lux_sensor:  # Lux-Faktor nur, wenn die Station einen Lichtsensor hat
        ents.append(TentNumber(entry.entry_id, rt,
                    "lux_factor", "Lux\u2192PPFD-Faktor", "lux_factor",
                    0.005, 0.05, 0.001, None))
    # Manuelle Übernahme: so lange respektiert die Automatik Handschaltungen
    ents.append(TentNumber(entry.entry_id, rt,
                "override_minutes", "Manuelle \u00dcbernahme", "override_minutes",
                0, 1440, 5, "min"))
    if rt.level_sensor:   # Trockenlauf-Schutz
        ents.append(TentNumber(entry.entry_id, rt,
                    "level_min", "F\u00fcllstand Minimum (Pumpensperre)", "level_min",
                    0, 100, 1, "%"))
    if rt.moisture_sensor:  # Erde: bedarfsgesteuerte Bewaesserung
        ents.append(TentNumber(entry.entry_id, rt,
                    "moisture_min", "Bodenfeuchte-Schwelle (bew\u00e4ssern unter)", "moisture_min",
                    0, 100, 1, "%"))
    if ents:
        async_add_entities(ents)


class PumpNumber(GrowctrlEntity, NumberEntity):
    _attr_entity_category = EntityCategory.CONFIG
    _attr_native_min_value = 1
    _attr_native_step = 1
    _attr_native_unit_of_measurement = "min"
    _attr_mode = NumberMode.SLIDER

    def __init__(self, entry_id, rt, role, name, key, max_v):
        super().__init__(entry_id, rt, role, name)
        self._key = key
        self._attr_native_max_value = max_v

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None:
            try:
                self.rt.pump[self._key] = int(float(last.state))
            except (ValueError, TypeError):
                pass

    @property
    def native_value(self) -> float:
        return self.rt.pump[self._key]

    async def async_set_native_value(self, value: float):
        self.rt.pump[self._key] = int(value)
        self.async_write_ha_state()


class TentNumber(GrowctrlEntity, NumberEntity):
    _attr_entity_category = EntityCategory.CONFIG
    _attr_mode = NumberMode.BOX

    def __init__(self, entry_id, rt, role, name, attr, min_v, max_v, step, unit):
        super().__init__(entry_id, rt, role, name)
        self._rt_attr = attr
        self._attr_native_min_value = min_v
        self._attr_native_max_value = max_v
        self._attr_native_step = step
        self._attr_native_unit_of_measurement = unit

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None:
            try:
                setattr(self.rt, self._rt_attr, float(last.state))
            except (ValueError, TypeError):
                pass

    @property
    def native_value(self) -> float:
        return float(getattr(self.rt, self._rt_attr))

    async def async_set_native_value(self, value: float):
        setattr(self.rt, self._rt_attr, value)
        self.async_write_ha_state()


class PhaseTargetNumber(GrowctrlEntity, NumberEntity):
    """Klima-Sollwert einer Phase (liest/schreibt rt.targets[phase][metric])."""
    _attr_mode = NumberMode.BOX

    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, entry_id, rt, idx, phase, metric, label, min_v, max_v, step, unit):
        # Nummerierung sorgt fuer logische Sortierung statt Alphabet (1 Seedling ... 4 Trocknung)
        super().__init__(entry_id, rt, f"{phase.lower()}_{metric}", f"{idx} {phase} \u00b7 {label}")
        self._phase, self._metric = phase, metric
        self._attr_native_min_value = min_v
        self._attr_native_max_value = max_v
        self._attr_native_step = step
        self._attr_native_unit_of_measurement = unit

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None:
            try:
                self.rt.targets[self._phase][self._metric] = float(last.state)
            except (ValueError, TypeError, KeyError):
                pass

    @property
    def native_value(self) -> float:
        return float(self.rt.targets[self._phase][self._metric])

    async def async_set_native_value(self, value: float):
        self.rt.targets[self._phase][self._metric] = value
        self.async_write_ha_state()

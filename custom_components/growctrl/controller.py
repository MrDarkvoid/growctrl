#==============================================================================
# GROWCTRL Integration – controller
# Zweck   : Steuer-Loop (1 min): SOLL berechnen (logic.py), VOLLSTAENDIGE Switch-Listen schalten (Issues #1/#1b geloest), Snapshot vor dem Schalten (Issue #2 geloest), Events statt input_text-Logs.
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from datetime import datetime

from homeassistant.core import HomeAssistant

from . import logic
from .const import EVENT_GROWCTRL, STAGE_KEYS
from .runtime import StationRuntime


class StationController:
    """Fuehrt einen Regelzyklus fuer eine Station aus."""

    def __init__(self, hass: HomeAssistant, rt: StationRuntime) -> None:
        self.hass = hass
        self.rt = rt

    def _is_on(self, eid: str) -> bool:
        st = self.hass.states.get(eid)
        return st is not None and st.state == "on"

    async def _set_all(self, entities: list[str], on: bool) -> None:
        if entities:
            await self.hass.services.async_call(
                "switch", "turn_on" if on else "turn_off",
                {"entity_id": entities}, blocking=False,
            )

    def _fire(self, kind: str, **data) -> None:
        self.hass.bus.async_fire(EVENT_GROWCTRL, {
            "tent": self.rt.tent, "station": self.rt.station, "kind": kind, **data,
        })

    async def async_run(self) -> None:
        rt = self.rt
        if not rt.auto or rt.maintenance or rt.testmode:
            return
        if rt.light_on_min is None or rt.light_off_sv_min is None or rt.light_off_bloom_min is None:
            self._fire("time_invalid")
            return

        now = datetime.now()
        now_min = now.hour * 60 + now.minute
        off_min = logic.off_min_for_stage(rt.stage, rt.light_off_sv_min, rt.light_off_bloom_min)
        want_light = logic.light_desired(now_min, rt.light_on_min, off_min)

        # Snapshot VOR dem Schalten (Issue #2)
        light_was = self._is_on(rt.light_switches[0]) if rt.light_switches else False

        if want_light != light_was:
            await self._set_all(rt.light_switches, want_light)
            self._fire("light", soll="on" if want_light else "off")

        if rt.has_pump:
            key = STAGE_KEYS.get(rt.stage, "veg")
            want_pump = logic.pump_desired(
                now_min, rt.pump[f"on_{key}"], rt.pump[f"off_{key}"], rt.pump_247)
            pump_was = self._is_on(rt.pump_switches[0])
            if want_pump != pump_was:
                await self._set_all(rt.pump_switches, want_pump)
                self._fire("pump", soll="on" if want_pump else "off")

        # O2 / Umluft: dauerhaft AN, alle Switches
        for group, name in ((rt.o2_switches, "o2"), (rt.fan_switches, "fan")):
            if group and not self._is_on(group[0]):
                await self._set_all(group, True)
                self._fire(name, soll="on")

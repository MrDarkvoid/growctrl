#==============================================================================
# GROWCTRL Integration – entity
# Zweck   : Basisklasse: Device-Zuordnung (Zelt/Station), growctrl_role-Attribut fuer den Karten-Resolver (Quelle C).
# Version : 2.0.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.restore_state import RestoreEntity

from .const import DOMAIN
from .runtime import StationRuntime


class GrowctrlEntity(RestoreEntity, Entity):
    _attr_has_entity_name = True

    def __init__(self, entry_id: str, rt: StationRuntime, role: str, name: str) -> None:
        self._entry_id = entry_id
        self.rt = rt
        self._role = role
        self._attr_name = name
        self._attr_unique_id = f"{DOMAIN}_{rt.slug}_{role}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, rt.slug)},
            name=f"GROWCTRL {rt.tent} {rt.station}",
            manufacturer="GROWCTRL", model="Station",
        )

    @property
    def extra_state_attributes(self):
        return {"growctrl_role": self._role, "growctrl_tent": self.rt.tent,
                "growctrl_station": self.rt.station}

#==============================================================================
# GROWCTRL Integration – entity
# Zweck   : Basisklasse: Device-Zuordnung (Zelt/Station), growctrl_role-Attribut fuer den Karten-Resolver (Quelle C).
# Version : 2.0.0-dev | Lizenz: GC-SAL 1.0 (siehe LICENSE)
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.restore_state import RestoreEntity

from .const import DOMAIN, SIGNAL_UPDATE
from .runtime import StationRuntime, TentRuntime


class GrowctrlEntity(RestoreEntity, Entity):
    _attr_has_entity_name = True

    def __init__(self, entry_id: str, rt: StationRuntime | TentRuntime, role: str, name: str) -> None:
        self._entry_id = entry_id
        self.rt = rt
        self._role = role
        self._attr_name = name
        self._attr_unique_id = f"{DOMAIN}_{rt.slug}_{role}"
        dev_name = f"GROWCTRL Zelt {rt.tent}" if rt.model == "Zelt" else f"GROWCTRL {rt.tent} {rt.station}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, rt.slug)},
            name=dev_name,
            manufacturer="GROWCTRL", model=rt.model,
        )

    async def async_added_to_hass(self) -> None:
        """Jede Entity folgt dem Regelzyklus: setzt der Controller z.B. die
        Klima-Automatik beim Zelt-Deaktivieren auf AUS, zeigt der Schalter
        das sofort an (vorher blieb der alte Zustand in der UI stehen)."""
        await super().async_added_to_hass()
        self.async_on_remove(async_dispatcher_connect(
            self.hass, SIGNAL_UPDATE.format(self._entry_id), self.async_write_ha_state))

    @property
    def extra_state_attributes(self):
        return {"growctrl_role": self._role, "growctrl_tent": self.rt.tent,
                "growctrl_station": self.rt.station}

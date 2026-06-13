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

# Deutsch -> Englisch fuer Entity-Anzeigenamen. Fehlt ein Eintrag, bleibt Deutsch
# (Deutsch ist die Quelle und kann nie "fehlen"). Auswahl nach HA-Sprache.
_NAMES_EN = {
    "Alter seit Keimung": "Age since germination", "Aufgaben": "Tasks",
    "DLI Prognose": "DLI forecast", "DLI heute": "DLI today",
    "Keimstart": "Germination date", "Klima-Modus": "Climate mode",
    "Klima-Phase": "Climate phase", "Letzte Regelung": "Last control",
    "Letztes Ereignis": "Last event", "Licht Restzeit": "Light remaining",
    "Phasen-Empfehlung": "Phase recommendation", "Pumpe Restzeit": "Pump remaining",
    "Status": "Status", "VPD": "VPD", "Wachstumsphase": "Growth phase",
    "Zeit im Sollband heute": "Time in target band today",
    "Automatik": "Automatic", "Blatt-Offset": "Leaf offset",
    "Klima-Automatik": "Climate automatic", "Klima-Sensoren eingefroren": "Climate sensors frozen",
    "Licht ohne Leistung": "Light without power", "Licht-Failsafe": "Light failsafe",
    "Lichtzeiten unvollst\u00e4ndig": "Light times incomplete", "Manueller Eingriff": "Manual override",
    "Pumpe gesperrt (F\u00fcllstand)": "Pump blocked (level)",
    "RH Max": "RH max", "RH Min": "RH min",
    "Sensor-Timeout (eingefroren nach)": "Sensor timeout (frozen after)",
    "VPD Max": "VPD max", "VPD Min": "VPD min", "Wartung": "Maintenance",
    "Zelt aktiv": "Tent active",
}


def _is_english(hass) -> bool:
    try:
        return str(getattr(hass.config, "language", "de") or "de").lower().startswith("en")
    except Exception:
        return False


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

    @property
    def name(self):
        """Anzeigename, automatisch Englisch bei englischer HA-Sprache (Deutsch = Standard)."""
        base = self._attr_name
        hass = getattr(self, "hass", None)
        if base and hass is not None and _is_english(hass):
            return _NAMES_EN.get(base, base)
        return base

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

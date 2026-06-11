<!-- GROWCTRL – Architektur-Notizen | Version 2.0.0-dev | MIT | MrDarkvoid + Claude (Anthropic), Vibe Coding -->
# Architektur-Notizen (verbindlich für Phase 2 & 3)

## Leitsatz
**Home Assistant ist die Steuerzentrale.** Die gesamte Steuerlogik (Lichtfenster inkl.
Mitternachtsüberlauf, Pumpenzyklus je Phase, Klima-Hysterese, Failsafes, Override) lebt in HA –
heute in den Legacy-Blueprints, künftig in der GROWCTRL-Integration.

## Hardware-Agnostik
Aktoren sind **beliebige HA-Switch-Entitäten**. Aktueller Betrieb: Zigbee-Steckdosen.
Die eigene ESPHome-Hardware (`/firmware`) ist ein optionaler "verlängerter Arm":
- schaltet Relais und liest Sensoren (inkl. lokaler Kalibrierung auf den Nodes),
- legt Addon-Entitäten selbst per MQTT Discovery an,
- wird von HA gesteuert und liefert Messwerte zurück.

**Konsequenz für die Integration (Phase 3):** Sie bindet KEINE Hardware direkt an. Im Config Flow
werden vorhandene HA-Entitäten zugeordnet (Licht-Switch = Pflicht; Pumpe/O₂/Fan/Befeuchter/
Sensoren = optional). Die Integration erzeugt daraus:
- **Pflicht-Entitäten** je Station: Stage (select), Lichtzeiten (time/datetime), Automatik (switch)
- **Optionale Entitäten** nur bei zugeordneter Hardware-Funktion: Pumpenzyklen (number, je Phase),
  Klima-Sollwerte, Wartung/Testmodus
- **Berechnete Sensoren:** Licht-/Pumpen-Restzeit, Status/Ampel
- **Events/Logbuch** statt input_text-Logs (Format-Doku: `log_referenz.md` gilt für den Übergang)

## Größen-Tiers
"klein/mittel/groß" verschwinden als Code-Varianten. Ein Zelt ist ein Config Entry mit n Stationen;
Unterschiede sind reine Parameter.

## Karten-Cluster (Phase 2)
Karten konsumieren ausschließlich definierte Entitäten/Attribute. Übergangsweise parsen sie die
Legacy-Logs (ein einziger Parser in `cards/core`), Ziel sind Integrations-Events.
Eine einzige VPD-Implementierung in `cards/core` löst Issue #5 (Formel-Inkonsistenz).

# GROWCTRL – Informationssystem, Fehlererkennung & Failsafe

## Woher kommen die Bewertungen?
Das System schreibt jede Entscheidung und jeden Fehler an **vier Stellen** — die Karten
und Automationen bedienen sich daraus:

| Kanal | Was | Wofür |
|---|---|---|
| **Ereignis-Sensor** `sensor.…_letztes_ereignis` (je Station UND je Zelt) | Klartext-Zustand + Attribut `verlauf` (letzte 30 Einträge mit Zeit + Schweregrad) + `schweregrad` | Checkup-Karte (Zeilentyp „Ereignis-Sensor"), Dashboards, eigene Templates |
| **Problem-binary_sensors** je Station | `Manueller Eingriff`, `Licht-Failsafe`, `Lichtzeiten unvollständig` (device_class *problem*) | Hero-Karte `problem_sensors:`, Checkup Typ „Problem-Sensor", HA-Benachrichtigungen |
| **Zelt-Status-Sensor** `sensor.…_status` | `ok`/`problem` + Attribut `probleme` (gesammelt über ALLE Stationen des Zelts) | zeltweite Ampel, eine einzige Automation für alles |
| **Event-Bus** `growctrl_event` + HA-Systemprotokoll | Rohdaten jedes Schaltvorgangs/Fehlers (`kind`, `tent`, `station`, Details) | eigene Automationen, Debugging (Protokolle nach `growctrl` filtern) |

Die `input_text`-Logs gehören zum **Legacy-Blueprint-System** und werden von der
Integration NICHT beschrieben — bei Parallelbetrieb laufen beide Welten getrennt.

## Implementierte Fehlererkennungen
1. **Manueller Eingriff:** Ist-Zustand des Lichts weicht 2 Regelzyklen in Folge vom Soll ab
   → Flag + Event; löst sich selbst auf, sobald Ist und Soll wieder übereinstimmen.
2. **Licht-Failsafe („Licht wurde nie ausgeschaltet"):** Einschaltdauer wird mitgezählt;
   über dem Maximum (Default 1440 min) → **Not-Aus** aller Licht-Switches + Critical-Eintrag.
3. **Lichtzeiten unvollständig:** Automatik pausiert, Warnung statt unkontrolliertem Schalten.
4. **Klima-Sensorausfall:** Klima aktiv, aber Temp/RH liefern nichts → Problem im Zelt-Status.

## Failsafe-Maßnahmen (by design)
- **Zelt-Gate:** „Zelt aktiv" AUS → alle Stationen schalten ihre Aktoren ab.
- **Trocknung:** Licht + Pumpe zwangsweise aus, Umluft bleibt an.
- **Befeuchter/Entfeuchter-Sperre:** nie gleichzeitig; Konfliktfall → beide AUS.
- **Hysterese** (0.05 kPa / 2 % RH) gegen Schalt-Flattern.
- **Geteilte Lichter:** ODER-Votes — keine Station kann einer anderen das Licht ausschalten.
- **Idempotentes Schalten:** Service-Calls nur bei tatsächlicher Abweichung.

## Noch offen (ehrlich)
Pumpen-Failsafe (Trockenlauf), Sensor-Stale-Erkennung (Wert friert ein) und persistente
Log-Historie über Neustarts hinaus stehen auf der Roadmap.

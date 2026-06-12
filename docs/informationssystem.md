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
1. **Manueller Eingriff (mit Übernahmezeit):** Weicht das Licht 2 Regelzyklen vom Soll ab,
   **respektiert** die Automatik die Handschaltung für die konfigurierten
   „Manuelle Übernahme"-Minuten (Number je Station, Default 60; 0 = sofort zurück) und
   übernimmt danach wieder den Lichtplan. Geteilte Lichter tragen den manuellen Wunsch
   über die Votes mit. Endet automatisch früher, sobald der Plan dem Ist-Zustand entspricht.
2. **Licht-Failsafe („Licht wurde nie ausgeschaltet"):** Einschaltdauer wird mitgezählt;
   über dem Maximum (Default 1440 min) → **Not-Aus** aller Licht-Switches + Critical-Eintrag.
3. **Lichtzeiten unvollständig:** Automatik pausiert, Warnung statt unkontrolliertem Schalten.
4. **Klima-Sensorausfall:** Klima aktiv, aber Temp/RH liefern nichts → Problem im Zelt-Status.
5. **Eingefrorene Sensoren (Stale):** Temp+RH ändern sich 15 min nicht → **sicherer Zustand**
   (Befeuchter/Entfeuchter aus, Abluft an), Critical-Eintrag; löst sich bei neuen Werten.
6. **Trockenlauf-Schutz:** Füllstand unter „Füllstand Minimum" → **Pumpe gesperrt**,
   Critical-Eintrag; automatische Freigabe bei ausreichendem Stand.
7. **Leistungs-Plausibilität:** Licht AN, aber < 5 W nach 2 min Anlaufzeit → „Lampe prüfen!"
   (optionaler Leistungssensor je Station).
8. **Bedarfs-Bewässerung (Erde):** Pumpzyklen werden übersprungen, solange die Bodenfeuchte
   über der Schwelle liegt (Number „Bodenfeuchte-Schwelle").

## Failsafe-Maßnahmen (by design)
- **Zelt-Gate:** „Zelt aktiv" AUS → alle Stationen schalten ihre Aktoren ab.
- **Trocknung:** Licht + Pumpe zwangsweise aus, Umluft bleibt an.
- **Befeuchter/Entfeuchter-Sperre:** nie gleichzeitig; Konfliktfall → beide AUS.
- **Hysterese** (0.05 kPa / 2 % RH) gegen Schalt-Flattern.
- **Geteilte Lichter:** ODER-Votes — keine Station kann einer anderen das Licht ausschalten.
- **Idempotentes Schalten:** Service-Calls nur bei tatsächlicher Abweichung.

## Watchdog: merkt, wenn die Regelung selbst steht
Jede Station und jedes Zelt hat den Sensor **„Letzte Regelung"** (Timestamp). Beispiel-
Automation für eine Push-Nachricht, wenn der Regelkreis > 5 min still steht:

```yaml
automation:
  - alias: GROWCTRL Watchdog
    trigger:
      - platform: template
        value_template: >
          {{ (now() - states('sensor.growctrl_gross_main1_letzte_regelung')
              | as_datetime).total_seconds() > 300 }}
    action:
      - service: notify.mobile_app_dein_handy
        data: { message: "GROWCTRL: Regelung main1 reagiert nicht mehr!" }
```

Dazu misst das Zelt den Sensor **„Zeit im Sollband heute"** (% der Klima-Laufzeit innerhalb
der Phasen-Sollwerte) — die ehrlichste Kennzahl für die Klimaqualität.

## Noch offen (ehrlich)
Sunrise/Sunset-Dimmen für dimmbare Lichter und ein Grow-Report (Zyklus-Auswertung über
Wochen) stehen auf der Roadmap. Die Ereignis-Logs sind seit v2.5 **persistent** (Store).

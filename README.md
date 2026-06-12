<p align="center"><img src="assets/logo/logo.png" alt="GROWCTRL" width="170"/></p>

# GROWCTRL

**Komplette Growzelt-Steuerung für Home Assistant** — eine native Integration
(Zelte + Stationen, Klima, DLI, Failsafe, Informationssystem) plus elf aufeinander
abgestimmte Dashboard-Karten. Keine YAML-Helfer, keine Blueprints nötig.

> Entwickelt von **MrDarkvoid** in Zusammenarbeit mit Claude (Anthropic), Vibe Coding · Lizenz GC-SAL 1.0

---

## 1. Architektur

```
Zelt (Master)                      Station (1..n je Zelt)
├─ Zelt aktiv  ── Gate ──────────► stoppt ALLE Stationen
├─ Klima-Automatik (VPD/RH)        ├─ Licht (Zeitplan, phasenabh. AUS-Zeit)
├─ Klima-Phase (Auto/manuell)      ├─ Pumpe (Intervall oder 24/7)
├─ Status + Ereignisprotokoll      ├─ O₂ / Umluft (dauerhaft AN)
└─ Aufgabenliste (ToDo)            ├─ DLI aus eigenem Lux-Sensor
                                   ├─ Keimstart → Alter → Phasen-Empfehlung
                                   └─ Fehlererkennung + Ereignisprotokoll
```

- **Aktoren sind beliebige HA-Switches** — nichts wird geraten, alles wird explizit zugeordnet.
- **Geteilte Lichter erlaubt:** derselbe Switch darf in mehreren Stationen stehen;
  die Integration verodert die Anforderungen (ODER-Votes).
- **Lux-Sensoren** sind Stations-Sache und dürfen ebenfalls geteilt werden.

## 2. Installation

**HACS (empfohlen):** HACS → Custom Repositories → `MrDarkvoid/growctrl`
(Kategorie *Integration*) hinzufügen → installieren → HA neu starten.
Karten: `MrDarkvoid/growctrl-cards` (Kategorie *Dashboard*).

**Manuell:** Ordner `custom_components/growctrl/` nach `/config/custom_components/`
kopieren, HA neu starten. Karten: `cards/dist/growctrl-cards.js` nach `/config/www/`
und als Ressource `/local/growctrl-cards.js` (JavaScript-Modul) eintragen.

## 3. Einrichtung (Reihenfolge wichtig)

1. Einstellungen → Geräte & Dienste → **GROWCTRL** hinzufügen → **„Zelt anlegen"**:
   **Pflicht ist nur der Name** — Sensoren und Klima-Aktoren sind optional und jederzeit
   über „Konfigurieren" (Options-Dialog) nachrüstbar.
2. Erneut hinzufügen → **„Station anlegen"**: Zelt im Dropdown wählen, Licht-Switches
   (Pflicht), optional Pumpe/O₂/Umluft, Lux-Sensor (für DLI), Systemtyp DWC/Erde mit Sensoren.
3. Pro Station: Lichtzeiten setzen, Phase wählen, ggf. Keimstart-Datum → **Automatik AN**.
4. Am Zelt: **Klima-Automatik AN**, Modus (VPD/RH) und Phasen-Sollwerte prüfen.

Test-Leitfaden vor dem Echtbetrieb: **`docs/testplan.md`**.

## 4. Entitäten-Referenz

### Zelt (`GROWCTRL Zelt <name>`)
| Entität | Typ | Funktion |
|---|---|---|
| Zelt aktiv | switch | **Master-Gate** – AUS stoppt alle Stationen des Zelts |
| Klima-Automatik | switch | Klima-Regelung zuschalten |
| Klima-Modus | select | **VPD** oder **RH** geführt |
| Klima-Phase | select | **Auto** (führende Stations-Phase) oder fest |
| `<Phase>` VPD/RH Min/Max | number ×16 | Sollwerte je Phase (Seedling/Veg/Bloom/Trocknung; Flush nutzt Bloom) |
| Blatt-Offset | number | Blatttemperatur-Korrektur für VPD |
| VPD | sensor | aktueller VPD; Attribute: temp, rh, phase_effektiv, sollwerte |
| Status | sensor | ok/problem + Attribut `probleme` (alle Stationen gesammelt) |
| Letztes Ereignis | sensor | Klartext + Attribut `verlauf` (30 Einträge) |
| Aufgaben | todo | Liste; Phasen-Empfehlungen landen automatisch hier |
| Letzte Regelung | sensor | Watchdog-Heartbeat (Timestamp) |
| Zeit im Sollband heute | sensor | % der Klima-Laufzeit innerhalb der Phasen-Sollwerte |

### Station (`GROWCTRL <zelt> <station>`)
| Entität | Typ | Funktion |
|---|---|---|
| Automatik / Wartung | switch | Regelung an/aus · Wartung = System greift nicht ein |
| Wachstumsphase | select | Seedling/Veg/Bloom/Flush/**Trocknung** |
| Licht AN / AUS Seed-Veg / AUS Bloom-Flush | time | Lichtplan (Mitternachtsüberlauf ok) |
| Pumpe AN/AUS je Phase | number ×6 | Intervall in Minuten (nur mit Pumpe) |
| Manuelle Übernahme | number | Minuten, die Handschaltungen respektiert werden (0 = sofort zurück) |
| Lux→PPFD-Faktor | number | nur mit Lux-Sensor; Default 0.015 |
| Licht/Pumpe Restzeit | sensor | Minuten bis zum nächsten Schaltpunkt |
| DLI heute / DLI Prognose | sensor | aus Lux; Prognose über den **konfigurierten Lichtplan** |
| Alter seit Keimung / Phasen-Empfehlung | sensor | aus Keimstart (Richtwerte, sortenabhängig) |
| Letztes Ereignis | sensor | Klartext + `verlauf` + `schweregrad` |
| Manueller Eingriff / Licht-Failsafe / Zeiten unvollständig | binary_sensor | Problem-Melder |
| Keimstart | date | Startdatum der Pflanze |
| Letzte Regelung | sensor | Watchdog-Heartbeat (Timestamp) |
| Füllstand Minimum | number | Trockenlauf-Schutz (nur mit Füllstand-Sensor) |
| Bodenfeuchte-Schwelle | number | Erde: bewässern nur unterhalb (nur mit Sensor) |
| Pumpe gesperrt (Füllstand) | binary_sensor | Trockenlauf-Schutz aktiv (nur mit Füllstand-Sensor) |
| Licht ohne Leistung | binary_sensor | Plausibilitäts-Alarm (nur mit Leistungssensor) |

## 5. Was das System überwacht und absichert

### Fehlererkennungen
| Erkennung | Auslöser | Reaktion |
|---|---|---|
| **Manueller Eingriff** | Licht-Ist weicht 2 Regelzyklen vom Soll ab | Automatik **respektiert** die Handschaltung für „Manuelle Übernahme"-Minuten, dann Rückkehr zum Plan; binary_sensor + Log |
| **Licht-Failsafe** | Licht länger AN als Maximum (Default 1440 min) | **Not-Aus** aller Licht-Switches, Critical-Eintrag, binary_sensor |
| **Lichtzeiten unvollständig** | AN/AUS-Zeit fehlt | Automatik pausiert (kein blindes Schalten), Warnung |
| **Klima-Sensorausfall** | Klima AN, Temp/RH liefern nichts | Problem im Zelt-Status |

### Failsafe-Maßnahmen (by design)
| Maßnahme | Wirkung |
|---|---|
| Zelt-Gate | „Zelt aktiv" AUS → alle Stations-Aktoren aus |
| Wartungsmodus | Station wird vom System komplett in Ruhe gelassen |
| Trocknung | Licht + Pumpe zwangsweise aus, Umluft bleibt an |
| Befeuchter/Entfeuchter-Sperre | nie gleichzeitig; Konflikt → beide aus |
| Hysterese | 0.05 kPa / 2 % RH gegen Schalt-Flattern |
| ODER-Votes | keine Station schaltet einer anderen das geteilte Licht aus |
| Idempotenz | Service-Calls nur bei tatsächlicher Abweichung |

Details und Log-Kanäle: **`docs/informationssystem.md`**.

## 6. Dashboard-Karten (11)

Hero · Zelt-Klima · Station · Ereignisprotokoll · Checkup · Sensoren · Aktoren ·
Pflanzen · Tank · Verlauf · Metric — alle mit GUI-Editor und `style:`-Anpassung.
Die GROWCTRL-Karten (Hero/Zelt/Station/Protokoll/Checkup) leiten ihre Entity-IDs
**automatisch aus Zelt-/Stationsnamen** ab. Referenz: **`cards/README.md`**,
fertiges Beispiel: **`examples/zelt_gross_komplett.yaml`**.

## 7. Dokumentation

| Datei | Inhalt |
|---|---|
| `docs/testplan.md` | Schritt-für-Schritt-Test der gesamten Steuerung |
| `docs/informationssystem.md` | Erkennungen, Failsafes, Log-Kanäle |
| `docs/migration.md` | Legacy-Blueprints → Integration, Release-Checkliste |
| `docs/branding.md` | Logo in HA (brands-PR) und in den Karten |
| `docs/integration_konzept.md`, `docs/karten_cluster_konzept.md` | Architektur-Entscheidungen |

## 8. Troubleshooting

- **Integration taucht nicht auf:** `custom_components/` muss im Repo-/Config-Root liegen
  (nicht in einem Wrapper-Ordner); HA neu starten.
- **„Invalid handler specified":** installierte `manifest.json` prüfen (Version aktuell?
  `"config_flow": true`?), HA **vollständig** neu starten; danach Protokolle nach
  `growctrl` filtern — „Error occurred loading flow…" enthält den echten Traceback.
- **Karten „Entität nicht gefunden":** Entity-IDs in Entwicklertools prüfen; weicht eine
  ID ab → `overrides:` in der Karte setzen.

## 9. Status

| Phase | Inhalt | Status |
|---|---|---|
| 0–2 | Bestandsaufnahme · Monorepo · Karten-Cluster | ✅ |
| 3 | Integration (Zelt+Station, Klima, DLI, Informationssystem) | ✅ v2.4, 22 Tests grün — **Live-HA-Test ausstehend** |
| 4 | Doku, Migration, Release-Vorbereitung | ✅ Doku fertig; Release-Schritte: `docs/migration.md` |

## Credits & Lizenz

GC-SAL 1.0 — © MrDarkvoid. Entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding.


## Entitäten-Organisation
Jedes Gerät trennt seine Entitäten in drei Bereiche: **Steuerung** (Automatik, Wartung,
Phase, Zelt/Klima-Schalter), **Konfiguration** (Lichtzeiten, Pumpenzyklen, Keimstart,
Schwellen, Sollwerte) und **Diagnose** (Problem-Sensoren, Watchdog). So bleibt die
Geräteseite aufgeräumt und Dashboards zeigen nur, was täglich gebraucht wird.


## Lizenz
GROWCTRL steht unter der **GROWCTRL Source-Available License (GC-SAL 1.0)**:
privat und nicht-kommerziell frei nutzbar mit Namensnennung (**MrDarkvoid**) -
kommerzielle Nutzung, Re-Hosting und veröffentlichte Modifikationen nur mit
schriftlicher Zustimmung. Details: [`LICENSE`](LICENSE) · Anleitung &
ehrliche Hinweise zu GitHub-Forks: [`docs/lizenz.md`](docs/lizenz.md).

## Highlights v2.6/v2.7
- Zelt AUS = wirklich aus: Licht, Pumpen, O₂, Lüfter, Klima-Aktoren UND
  Klima-Schalter; alle Schalter zeigen Controller-Änderungen sofort an
- Sofort-Reaktion: Regelzyklus läuft beim Start und nach jeder Nutzeraktion;
  Zelt-Schaltungen stoßen alle Stationen direkt an
- Schutzpaket: Stale-Erkennung (Timeout einstellbar), Trockenlauf-Sperre,
  Bedarfs-Bewässerung, Leistungs-Plausibilität - alles als Diagnose-Sensoren
- Watchdog „Letzte Regelung“ + „Zeit im Sollband heute“, persistentes
  Ereignisprotokoll, Options-Flow zum Nachrüsten
- Karten: umbenennungssichere Auflösung + echte Dropdowns, Licht-Balken,
  VPD-Zonen-Balken, Apex-Style-Charts, Vorschau im Kartenwähler,
  Mobil-Layout, großzügigere Typografie

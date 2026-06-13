<div align="center">

# 🌱 GROWCTRL

**Ein vollständiges Steuer- und Visualisierungs-System für hydroponische Growzelte – nativ in Home Assistant.**

Automatik für Licht, Pumpen, Klima und O₂ · phasenabhängige Sollwerte · DLI-Tracking ·
Handschaltungs-Erkennung · mehrstufige Schutzfunktionen · persistentes Ereignisprotokoll ·
ein durchgestyltes Dashboard im Design **„Soft Garden“**.

![Lizenz](https://img.shields.io/badge/Lizenz-GC--SAL%201.0-7BE8A8)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.6%2B-41BDF5)
![HACS](https://img.shields.io/badge/HACS-Custom-orange)
![Status](https://img.shields.io/badge/Version-3.3.2-7BE8A8)

*MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding*

</div>

---

## Was ist GROWCTRL?

GROWCTRL verwandelt Home Assistant in eine vollwertige Growzelt-Steuerung. Statt dutzender
loser Automationen, Helfer und Template-Sensoren installierst du **eine Integration**, legst
deine Zelte und Stationen über den Konfigurations-Dialog an – und bekommst eine konsistente
Menge an Entitäten, eine robuste Regel-Logik und ein dazu passendes Dashboard.

Das System ist um drei Zelte herum gedacht, lässt sich aber frei erweitern:

| Zelt | Rolle | Theme |
|------|-------|-------|
| **Klein** | Anzucht / Sämlinge / Propagation | Grün |
| **Mittel** | spezielle Pflanzen | Weinrot / Burgunder |
| **Groß** | Hauptanbau | Violett |

Jedes Zelt enthält eine oder mehrere **Stationen** (z. B. ein DWC-Becken oder ein Beet), und
jede Station steuert ihre eigenen Aktoren und kennt ihre eigene Wachstumsphase.

---

## Was die Integration tut

GROWCTRL ist kein reines „Anzeige-Paket“ – der Kern ist ein **Controller**, der pro Station
und pro Zelt im Takt arbeitet und Entscheidungen trifft.

### 💡 Lichtsteuerung
- Phasenabhängige **AN/AUS-Zeiten**: getrennte Ausschaltzeiten für Seedling/Veg und für
  Bloom/Flush, damit der Lichtzyklus beim Phasenwechsel automatisch umschaltet.
- **24-Stunden-Licht** wird korrekt erkannt (AN-Zeit = AUS-Zeit) und durchgehalten.
- Live-Sensor **„Licht-Restzeit“** mit Klartext („Licht an für 5 h 40 min“), Zustand und
  prozentualem Fortschritt der laufenden Phase.

### 💧 Pumpen & Bewässerung
- **Zyklische Pumpensteuerung** (z. B. 30 s alle 60 min) mit Restzeit-Sensor.
- **Trockenlauf-Schutz**: ist ein Tank-Füllstand konfiguriert und fällt unter den
  Mindeststand, wird die Pumpe gesperrt und ein Diagnose-Hinweis gesetzt.

### 🌡️ Klima pro Phase
- Pro Zelt **16 Sollwert-Zahlen** (VPD- und RH-Min/Max für Seedling, Veg, Bloom, Trocknung;
  Flush erbt die Bloom-Werte).
- Eine **„Klima-Phase“-Auswahl**: *Auto* folgt der führenden Stationsphase, oder du setzt die
  Phase manuell.
- Der **VPD-Sensor** legt die aktuell wirksame Phase (`phase_effektiv`) und die zugehörigen
  Sollwerte (`sollwerte`) als Attribute offen – das Dashboard zeigt daraus den Zonen-Balken.

### ☀️ DLI (Daily Light Integral)
- DLI wird **auf Zelt-Ebene** aus dem Lux-Sensor und dem konfigurierten Lichtplan berechnet.
- **Prognose** für das Tagesende auf Basis des Plans, dazu ein phasenabhängiges Ziel.

### ✋ Manuelle Übernahme (Handschaltung)
- Schaltest du einen Aktor von Hand, erkennt GROWCTRL das (zwei aufeinanderfolgende Zyklen,
  in denen Ist- und Soll-Zustand auseinanderlaufen) und **respektiert deinen Eingriff**.
- Nach einer einstellbaren Dauer („Manuelle Übernahme“, Standard 60 min; `0` = sofort)
  kehrt die Automatik selbsttätig zum Lichtplan zurück.
- Bei geteilten Lichtern wird der manuelle Zustand während des Fensters über die ODER-Logik
  korrekt mitgeführt.

### 🛡️ Schutz- & Diagnosefunktionen
- **Sensor-Stale-Erkennung**: eingefrorene Klima-Sensoren werden nach einer einstellbaren
  Frist erkannt; die Karte zeigt „—“ statt veralteter Werte.
- **Leistungs-Plausibilität**: Licht „an“, aber keine Leistungsaufnahme → Hinweis.
- **Licht-Failsafe** und **Watchdog/Heartbeat** überwachen den Regelbetrieb.
- **Wartungsmodus**: die Automatik greift bewusst nicht ein, alle Aktoren bleiben von Hand
  schaltbar.
- **Zelt-Schalter (Gate)**: deaktiviert ein Zelt komplett (Licht, Pumpe, O₂, Lüfter, Klima-
  Aktoren aus). Die **Klima-Automatik-Einstellung bleibt erhalten**, damit das Klima beim
  Reaktivieren sofort weiterläuft.

### 📓 Ereignisprotokoll
- Jede relevante Aktion wird in einem **persistenten Log** festgehalten (übersteht Neustarts).
- Drei Schweregrade (Info / Warnung / Kritisch); das Dashboard kann ab einer Stufe filtern.
- Der Sensor **„Letztes Ereignis“** trägt den Schweregrad des **jüngsten** Eintrags – die
  Statusfarbe einer Station spiegelt also den aktuellen Zustand, nicht die schlimmste je
  aufgetretene Meldung.

---

## Entitäten im Überblick

GROWCTRL legt die Entitäten deterministisch nach dem Muster
`<domain>.growctrl_<zelt>_<station>_<funktion>` an (z. B.
`switch.growctrl_gross_main1_automatik`). Auf Zelt-Ebene entfällt der Stationsteil.

**Pro Station**

| Plattform | Funktion | Zweck |
|-----------|----------|-------|
| `switch` | Automatik | Regelbetrieb der Station an/aus |
| `switch` | Wartung | Automatik pausieren, manuell schalten |
| `select` | Wachstumsphase | Seedling · Veg · Bloom · Flush · Trocknung |
| `time` | Licht AN / AUS (Seed-Veg) / AUS (Bloom) | Lichtplan je Phase |
| `date` | Keimstart | Basis für die Altersberechnung |
| `number` | Manuelle Übernahme | Rückkehr-Dauer der Automatik (min) |
| `sensor` | Licht-Restzeit, Pumpe-Restzeit | Live-Status mit Klartext & Fortschritt |
| `sensor` | Alter seit Keimung, Phasen-Empfehlung | „Wo 8 · Tag 52“, Richtwert-Hinweis |
| `sensor` | Letztes Ereignis | jüngster Log-Eintrag inkl. Schweregrad |
| `binary_sensor` | Manueller Eingriff, Licht-Failsafe, Zeiten unvollständig, Pumpe gesperrt, Licht ohne Leistung | Diagnose |

**Pro Zelt**

| Plattform | Funktion | Zweck |
|-----------|----------|-------|
| `switch` | Zelt aktiv | Gate für das ganze Zelt |
| `switch` | Klima-Automatik | VPD/RH-Regelung an/aus |
| `select` | Klima-Modus, Klima-Phase | Betriebsart & Phasenquelle (Auto/manuell) |
| `number` | 16× VPD/RH Min/Max je Phase, Sensor-Timeout | phasenabhängige Sollwerte & Stale-Frist |
| `sensor` | VPD, DLI heute, DLI-Prognose, Status, Letztes Ereignis | Klima- & Lichtkennzahlen |
| `binary_sensor` | Klima-Sensoren eingefroren | Stale-Diagnose |

---

## Installation

GROWCTRL besteht aus **zwei HACS-Repositories**: der Integration (Backend) und den
Dashboard-Karten (Frontend).

### 1. Integration

1. HACS → drei Punkte → **Benutzerdefinierte Repositories**.
2. `https://github.com/MrDarkvoid/growctrl` als **Integration** hinzufügen.
3. „GROWCTRL“ installieren, Home Assistant neu starten.
4. **Einstellungen → Geräte & Dienste → Integration hinzufügen → GROWCTRL** und dem
   Dialog folgen (Zelt anlegen, Stationen, Sensoren zuordnen).

### 2. Karten

1. `https://github.com/MrDarkvoid/growctrl-cards` als **Dashboard** (Lovelace) hinzufügen.
2. Installieren – die Ressource wird von HACS automatisch eingebunden.

Details zu Konfiguration und Migration stehen in [`docs/migration.md`](docs/migration.md).

---

## Das Dashboard – Design „Soft Garden“

Das Frontend besteht aus **zehn aufeinander abgestimmten Karten**. Alle sind
integrations-nativ: Entity-IDs werden aus Zelt- und Stationsname abgeleitet, du musst sie
nicht von Hand eintragen (`overrides:` als Notausgang bleibt).

| # | Karte | Aufgabe |
|---|-------|---------|
| 1 | **Hero** | Zelt-Übersicht: Schalter, Klima-KPIs, VPD-Zone, Stationsliste, Infosystem |
| 2 | **Station** | Herzstück: Phasen-Dropdown, Versorgungszeilen Licht/Pumpe/DLI/Tank, Aktoren, Pflanzen-Tabs |
| 3 | **Checkup** | Ampel-Matrix über alle Zelte & Stationen (Licht/Pumpe/Klima/Status) |
| 4 | **Status / Protokoll** | Ereignisprotokoll mit Schweregrad-Filter |
| 5 | **History** | Klima-Verlauf (Temp/RH), 24 h / 48 h |
| 6 | **Metric** | Einzelwert mit Sollband (z. B. Wassertemperatur) |
| 7 | **Tank** | Füllstand mit Visual, Mindeststand-Marke, Liter |
| 8 | **Controls** | Aktoren-Raster pro Zelt (inkl. Heizmatte/Befeuchter) |
| 9 | **Sensors** | freie Wertübersicht |
| 10 | **Tent (kompakt)** | platzsparende Zelt-Karte mit VPD-Zone |

**Designprinzipien**

- Warmes Schwarzgrün als Fläche, **ein** Akzent je Zelt (Klein grün, Mittel weinrot,
  Groß violett) – Sonderfarben (Heizmatte orange, Befeuchter blau) bleiben themen­unabhängig.
- Status (OK/Warnung/Kritisch) ist überall gleich kodiert; Farbe ist nie der einzige Träger.
- Zahlen in Tabellenziffern, runde Formen, weiche Schatten.
- **Barrierearm**: 44-px-Touchziele, sichtbare Fokus-Ringe, ausreichender Kontrast,
  `prefers-reduced-motion` wird respektiert.

Per-Karte-Konfiguration mit Beispielen: [`cards/README.md`](cards/README.md).

---

## Sicherheit & Haftung

GROWCTRL schaltet **Pumpen, Licht und Heizung**. Für sichere Installation, elektrische
Sicherheit (Fehlerstromschutz, geeignete Relais/Schütze) und die Aufsicht bist allein **du**
verantwortlich. Das System wird ohne Gewähr bereitgestellt – siehe [`LICENSE`](LICENSE).

---

## Lizenz & Namensnennung

Veröffentlicht unter der **GROWCTRL Source-Available License (GC-SAL) 1.0**
([`LICENSE`](LICENSE), Deutsch maßgeblich, vollständige englische Fassung enthalten):

- ✅ Ansehen, privat & nicht-kommerziell nutzen, Fehler melden, PRs einreichen.
- ❗ **Namensnennung „MrDarkvoid“** ist Pflicht; Urheber-, Lizenz- und Verfolgbarkeits-
  Vermerke dürfen nicht entfernt werden.
- ⛔ Kommerzielle Nutzung, Re-Hosting und das Veröffentlichen modifizierter Versionen nur mit
  schriftlicher Zustimmung. (GitHubs Plattform-Fork-Recht bleibt unberührt.)

Quellcode und Build tragen einen stabilen Urheber-Fingerprint zur **Verfolgbarkeit**
(Hex von „MrDarkvoid“). Details im Abschnitt *Traceability* der `LICENSE`.

---

## Hinter dem Projekt: Vibe Coding

GROWCTRL ist „Vibe Coding“ – iterativ entworfen und gebaut im Dialog zwischen **MrDarkvoid**
und **Claude (Anthropic)**. Funktionsumfang, Arbeitsweise und die Spezifikation der Prompts
sind ausführlich dokumentiert in **[`docs/vibe_coding.md`](docs/vibe_coding.md)**.

<div align="center">

*🌱 GROWCTRL · GC-SAL 1.0 · MrDarkvoid — „Soft Garden“*

</div>

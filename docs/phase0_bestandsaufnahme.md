# GROWCTRL – Phase 0: Bestandsaufnahme

**Projekt:** GROWCTRL · **Autor:** MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding · **Lizenz:** MIT
**Stand:** 2026-06-11 · **Status:** Inventar abgeschlossen, wartet auf Freigabe für Phase 1

---

## 1. Systemüberblick (Ist-Zustand)

Das Projekt besteht aus **vier Schichten**, die bisher in keinem gemeinsamen Repository liegen:

```
┌─────────────────────────────────────────────────────────────────┐
│ SCHICHT 4 · DASHBOARD     button-card Checkup-Karten (3x JS)     │
│                           + growctrl-tent-card (TS/Lit, Monolith)│
├─────────────────────────────────────────────────────────────────┤
│ SCHICHT 3 · HA-LOGIK      Blueprints: hydro_station,             │
│                           hydro_zelt_klima                       │
├─────────────────────────────────────────────────────────────────┤
│ SCHICHT 2 · HA-KONFIG     Packages: klein / mittel / gross       │
│                           (Helper: ~100 Entitäten, Templates)    │
├─────────────────────────────────────────────────────────────────┤
│ SCHICHT 1 · HARDWARE      ESPHome: relay-board-v4 (ESP32,        │
│ (NEU im Inventar)         8 Relais, RS485-Master, MQTT-Discovery │
│                           für Addons HYDRO2/TERRA2/POWER4)       │
│                           + sensor-node-v4 (ESP32-C3, AHT21/     │
│                           ENS160, TSL2591, 2x DS18B20)           │
└─────────────────────────────────────────────────────────────────┘
```

**Wichtige Erkenntnis aus den neuen Uploads:** Die Steuerung ist **ESPHome-basiert** (nicht proprietäre Firmware) und bereits **v4.0 mit adaptivem MQTT-Discovery-System**. Das Relay Board erzeugt HA-Entitäten für Addons selbständig per MQTT Discovery. Das ist für Phase 3 (Integration) hochrelevant: Die Hardware-Schicht kann ihre Entitäten bereits dynamisch anlegen – die geplante Integration muss das nicht duplizieren, sondern kann darauf aufsetzen.

---

## 2. Datei-Inventar

### 2.1 Hardware / Firmware (ESPHome) — Uploads

| Datei | Zeilen | Zweck | Zustand |
|---|---|---|---|
| `relay-board-v4.yaml` | 1065 | ESP32 (esp32dev, ESP-IDF 5.3.2). 8 Relais (Licht, Heizung, CO₂-Ventil, Pumpe, Lüfter, 3× Reserve). RS485-Master für bis zu 3 Addons (HYDRO2/TERRA2/POWER4) mit HELLO/ACK/ADATA-Protokoll. Publiziert MQTT Discovery (Topic-Schema `gc/slot<N>/…`), Availability, Addon-Registry-Textsensoren. | ✅ Aktuell (v4.0). Secrets korrekt via `!secret`. ⚠️ Fallback-AP-Passwörter hartkodiert (`growctrl123`) – vor Veröffentlichung als Platzhalter dokumentieren. |
| `sensor-node-v4.yaml` | 395 | ESP32-C3 Mini. AHT21+ENS160 (Temp/rF/CO₂/TVOC), TSL2591 (Lux), 2× DS18B20 (1-Wire), RS485-Anbindung ans Relay Board. Inkl. Montage-Doku im Kopf. | ✅ Aktuell (v4.0). ⚠️ Fallback-AP-Passwort hartkodiert (`sensornode123`). |
| `GrowCTRL_Logo.svg` / `.png` | – | Projektlogo „GROW CONTROL" (Pflanze/Wurzel-Emblem, dunkelblau). | ✅ Verwendbar für README/Branding. SVG ist eine Vektorisierung (potrace-Stil), PNG 377 KB. |

### 2.2 HA-Packages (Helper-Definitionen)

| Datei | Zeilen | Zweck | Zustand |
|---|---|---|---|
| `PACKAGE_-_hydro_zelt_klein.yaml` | 164 | Zelt Klein: 1× Anzucht-Konfiguration (shared), 2 Unterbereiche (oben/unten) mit getrennter Automatik + Log. Helper: maintenance, testmode, climate_auto, dehum_request, 2× auto, 3× log, stage, 3× Lichtzeiten, 6× Pumpenzeiten. Template-Sensoren: Licht-/Pumpe-Restzeit. | 🔁 **Dupliziert** – identische Struktur wie mittel/gross, nur andere Suffixe. |
| `PACKAGE_-_hydro_zelt_mittel.yaml` | 138 | Zelt Mittel: 1× Main. Gleiche Helper-Struktur. | 🔁 **Dupliziert.** |
| `PACKAGE_-_hydro_zelt_gross.yaml` | 461 | Zelt Groß: 4× Main. Gleiche Helper-Struktur **vierfach kopiert** + 8 Restzeit-Template-Sensoren. | 🔁 **Dupliziert (intern 4×).** ⚠️ Friendly Names mit „Groß" → Slugification-Risiko (siehe Issue #3). |

**Duplikationsfaktor:** Die Restzeit-Jinja-Templates (Licht ~25 Zeilen, Pumpe ~20 Zeilen) existieren **6× nahezu identisch** (klein 1×, mittel 1×, gross 4×). Jede Logikänderung muss 6× nachgezogen werden.

### 2.3 HA-Blueprints (Automatisierungslogik)

| Datei | Zeilen | Zweck | Zustand |
|---|---|---|---|
| `BLUEPRINT_-_hydro_station.yaml` | 1156 | Stationssteuerung v2.0: Licht (inkl. Mitternachtsüberlauf), Pumpenzyklus (Modulo je Phase), O₂, Stationsumluft. Failsafe Licht/Pumpe, Manual-Override via Log-Marker (`OVRUNTIL=`), IST/SOLL-Logging, Mismatch-Erkennung, State-Bestätigung. | ✅ Funktional, aber 🐛 Issue #1 (Multi-Entity) und hohe Jinja-Komplexität. |
| `BLUEPRINT_-_hydro_zelt_klima.yaml` | 933 | Zeltklima v2.0: Umluft, Befeuchter (Hysterese, Temperatursperre, Anti-Flattern), Entfeuchter-**Request** (zentrales Modell für geteilten Entfeuchter), Sensor-Safety, Heartbeat-Log. | ✅ Funktional, aber 🐛 Issue #2 (Log-Race) und 🐛 Issue #1b (Multi-Entity auch hier, siehe unten). |

### 2.4 Dashboard (Legacy – wird durch Karten-Cluster ersetzt)

| Datei | Zeilen | Zweck | Zustand |
|---|---|---|---|
| `CHECKUP_gz_klein.yaml` | 272 | button-card mit großem JS-Lambda: Übersichtskarte Zelt Klein (Temp/rF/VPD, Stage-Badges, Restzeit-Balken, Log-Übersetzung, Status-Ampel). | 🔁 **3× duplizierter JS-Code** (THEME, stageBadge, barRow, translateKlimaLog, translateStationLog, fmtMin, toMin – laut eigener Doku „müssen in allen drei Dateien gespiegelt werden"). Wird ersetzt. |
| `CHECKUP_gz_mittel.yaml` | 264 | dito für Zelt Mittel. | 🔁 dito. |
| `CHECKUP_gz_gross.yaml` | 275 | dito für Zelt Groß (4 Stationen). | 🔁 dito + 🐛 Issue #3/#4. |
| `DASHBOARD-RAW-CONFIG_-_Template.txt` | 439 | button_card_templates (hydro_panel_flat, hydro_cfg_section …) als Roh-Dashboard-Config. | ⚠️ Veraltet durch Karten-Strategie; CRLF-Zeilenenden (Windows) – bei Übernahme normalisieren. Wird Legacy. |
| `DASHBOARD_CHECKUP_KARTEN.md` | 196 | Doku der drei Checkup-Karten inkl. THEME-Definition und Funktionsliste. | ✅ Wertvoll als Spezifikation für den Karten-Cluster (Phase 2) – wandert nach /docs. |

### 2.5 Custom Card (TypeScript/Lit)

| Datei/Bereich | Zweck | Zustand |
|---|---|---|
| `src/card.ts` (~1500 Z.) | Monolithische growctrl-tent-card v1.3: Hero (Klima/VPD), Chart, Stats, Log-Zeilen, Sensoren, Steuerung, Licht-/Pumpenbalken, Grow-Phasen, Pflanzen, Settings, Experte, Popups. | ✅ Funktional, aber Monolith → Phase 2 zerlegt sie in den Karten-Cluster. |
| `src/editor.ts` | GUI-Editor (komplett ohne YAML bedienbar). | ✅ Gute Basis, wird je Karte aufgeteilt. |
| `src/vpd.ts`, `src/loglang.ts`, `src/data.ts`, `src/util.ts`, `src/types.ts` | VPD-Berechnung, Log-Übersetzung, History-/Kalender-Cache (gedrosselt), Helfer, Typen. | ✅ **Kern der zukünftigen /cards/core-Bibliothek** – bereits sauber modularisiert. |
| `dist/growctrl-tent-card.js` | Build-Artefakt (esbuild, minified). | ✅ Reproduzierbar aus src. |
| `examples/*.yaml`, `hacs.json`, `package.json`, `tsconfig.json`, `README.md` | Beispiele (dwc, soil, zelt-mittel mit echten Entitäten), HACS-Meta, Build-Setup, Doku. | ✅ Übernehmbar. ⚠️ `documentationURL: github.com/your-user/...` ist Platzhalter → auf MrDarkvoid-Repo ändern. |

### 2.6 Begleitdokumente

| Datei | Zweck | Zustand |
|---|---|---|
| `LOG_REFERENZ_-_Hydro_Automation.md` (488 Z.) | Vollständige Referenz beider Blueprint-Log-Formate (`YYYY-MM-DD HH:MM EREIGNIS \| OVR \| IST \| SOLL`, Abkürzungen L/P/F/O2, alle Ereignistypen). | ✅ **Zentrale Schnittstellen-Doku** – wird /docs/log-referenz.md und definiert das Parser-Verhalten in /cards/core. |
| `hydro_entitaeten_liste_Correct.html` | Gestylte HTML-Übersicht aller Entitäten: **105 eindeutige Entity-IDs** (input_boolean/text/select/datetime/number, sensor, switch). | ✅ Wertvoll als Migrations-Grundlage (Mapping-Tabelle Phase 3). 🐛 Enthält die Platzhalter-Entitäten aus Issue #4. Wandert als Quelle nach /docs (ggf. zu Markdown konvertiert). |

---

## 3. Abhängigkeitsübersicht

```
ESPHome relay-board ──MQTT Discovery──▶ HA-Entitäten (switch.relais_*, sensor.gc_slot*)
ESPHome sensor-node ──RS485──▶ relay-board ──▶ sensor.sensor_node_* (via API/MQTT)
        │
Packages (Helper) ◀──referenziert von── Blueprints (pro Station/Zelt instanziiert)
        │                                      │
        │                                      └─▶ schreibt input_text-Logs
        ▼                                              │
Template-Restzeit-Sensoren                             ▼
        │                              Checkup-Karten + Tent Card
        └──────────────▶ lesen Helper + Logs + Restzeit-Sensoren (per Regex/Parsing)
```

Kopplungs-Hotspots (Risiko bei Änderungen):
1. **Log-Format** = inoffizielle API zwischen Blueprints und allen Karten (3× JS + 1× TS-Parser). Jede Format-Änderung bricht 4 Konsumenten.
2. **Entity-Namensschema** `hydro_<typ>_<zelt>_<station>` = implizite Konvention, nirgends maschinenlesbar definiert.
3. **Restzeit-Sensoren** werden von Karten vorausgesetzt, sind aber optional in den Packages.

---

## 4. TODO-Issues (dokumentiert, NICHT gefixt)

| # | Issue | Fundstelle | Schwere | Entfällt durch Integration? |
|---|---|---|---|---|
| **1** | **Multi-Entity-Bug (Station):** Inputs `switch_pump/o2/fan` erlauben `multiple: true` (Z. 141/174/198), Logik nutzt aber nur `list[0]` (Z. 572–574). Weitere ausgewählte Entitäten werden **stillschweigend ignoriert**. | `BLUEPRINT_-_hydro_station.yaml` | Hoch | ✅ Ja – Python-Logik iteriert trivial über Listen; mit pytest abgesichert. |
| **1b** | **NEU – derselbe Bug im Klima-Blueprint:** `multiple: true` (Z. 149/175), aber nur `v_fan_list[0]` / `v_humid_list[0]` (Z. 687–688). Mehrere Fans/Befeuchter werden nicht geschaltet. | `BLUEPRINT_-_hydro_zelt_klima.yaml` | Hoch | ✅ Ja. |
| **2** | **Logging-Race-Condition (Klima):** Zustand wird **nach** dem Schalten evaluiert → Log kann den State-Wechsel verpassen. Empfehlung aus Review: Pre-Switch-Snapshot-Variable. | `BLUEPRINT_-_hydro_zelt_klima.yaml` | Mittel | ✅ Ja – Events/Logbuch der Integration statt input_text; Zustände werden im Python-Code vor dem Service-Call gesichert. |
| **3** | **Slugification „Groß":** Friendly Names „Groß Main1 …" – HA slugifiziert `ß` versionsabhängig (`gross` vs. Wegfall), Dashboard referenziert fest `sensor.gross_main1_licht_restzeit`. Entity-ID kann abweichen → Karte zeigt „Entität fehlt". | `PACKAGE_-_hydro_zelt_gross.yaml` + `CHECKUP_gz_gross.yaml` | Hoch | ✅ Ja – Integration vergibt `unique_id`/`entity_id` programmatisch; zusätzlich Repo-Konvention: nur ASCII (`gross`). |
| **4** | **Undefinierte Platzhalter-Entitäten:** z. B. `input_boolean.hydro_light_group_gross_main1_placeholder` wird im Dashboard/Entitätenliste referenziert, ist aber in keinem Package definiert → „entity not found"-Warnungen. | Entitätenliste + Dashboard gross | Niedrig | ✅ Ja – Entitäten existieren nur, wenn die Integration sie anlegt; Karten nutzen Discovery statt fest verdrahteter IDs. |
| **5** | **NEU – VPD-Formel-Inkonsistenz:** Checkup-Karten rechnen `0.6107·e^(17.38·T/(239+T))` (Tetens-Variante), Tent Card `0.61078·e^(17.27·T/(T+237.3))` (Magnus) **plus Blattoffset**. Ergebnisse weichen ab → verwirrende Anzeigen je nach Karte. | `CHECKUP_gz_*.yaml` vs. `src/vpd.ts` | Mittel | ⚠️ Teilweise – gelöst durch /cards/core als einzige VPD-Quelle (Phase 2), unabhängig von der Integration. |
| **6** | **NEU – Log-Übersetzer 3-fach dupliziert (JS)** + 1× in TS: Pflege-Albtraum, bereits in eigener Doku als Risiko benannt. | `CHECKUP_gz_*.yaml`, `src/loglang.ts` | Mittel | ✅ Ja (langfristig: Events statt Log-Parsing) / Phase 2: nur noch 1 Parser in /cards/core. |
| **7** | **NEU – Hartkodierte Fallback-AP-Passwörter** in beiden ESPHome-Dateien. Funktional ok, aber vor GitHub-Veröffentlichung als „CHANGE ME"-Platzhalter kennzeichnen + Hinweis in Doku. | `relay-board-v4.yaml`, `sensor-node-v4.yaml` | Niedrig (Privacy) | ➖ Unabhängig. ✅ Bereits in Phase 1 erledigt (`!secret ap_fallback_password`). |
| **8** | **NEU – Relay-Board: Discovery-Lösch-Lambdas 3× kopiert** (Slot 1/2/3 je ~25 publish-Zeilen, nur Slot-Nummer unterscheidet sich). Kandidat für ESPHome-Script mit Parameter. | `relay-board-v4.yaml` (mqtt.on_message) | Niedrig | ➖ Firmware-seitig; als Refactoring-Issue für später notieren. |

---

## 5. Duplikations-Bilanz (Treiber für die Zielarchitektur)

| Logik | Heute dupliziert | Ziel |
|---|---|---|
| Helper-Definitionen je Station | 6× (klein 1 shared, mittel 1, gross 4) | 1× – Config Entry der Integration (Phase 3) |
| Restzeit-Berechnung (Jinja) | 6× | 1× – Python-Sensor der Integration |
| Log-Übersetzung | 4× (3× JS, 1× TS) | 1× – /cards/core (Phase 2), langfristig obsolet durch Events |
| VPD-Berechnung | 2× (inkonsistent!) | 1× – /cards/core |
| THEME/Badge/Bar-Helfer (JS) | 3× | 1× – /cards/core Styles |
| MQTT-Discovery-Löschung (ESPHome) | 3× | 1× parametrisiertes Script (separates Firmware-Issue) |

---

## 6. Bewertung „übernehmen / verwerfen"

| Bestandteil | Entscheidung |
|---|---|
| ESPHome relay-board / sensor-node v4 | **Übernehmen** → neuer Repo-Bereich `/firmware` (war im ursprünglichen Plan nicht vorgesehen – Strukturvorschlag in Phase 1 wird erweitert). |
| Logo SVG/PNG | **Übernehmen** → `/assets` + README-Einbindung. |
| Packages + Blueprints | **Übernehmen als Legacy** (funktionierender Stand) → `/legacy`, klar markiert. |
| Checkup-Karten + Raw-Dashboard | **Übernehmen als Legacy**; ihre Funktionsliste dient als Spezifikation für den Karten-Cluster. |
| Tent Card src/ | **Übernehmen aktiv** → Basis für `/cards` (core wird aus vpd/loglang/data/util/types extrahiert). |
| Log-Referenz, Entitätenliste, Checkup-Doku | **Übernehmen** → `/docs`. |
| Verworfen wird: nichts. | – |

---

## 7. Nächster Schritt

**Phase 1 – Monorepo-Struktur**, mit einer Erweiterung gegenüber dem ursprünglichen Plan: zusätzlicher Top-Level-Ordner **`/firmware`** (relay-board, sensor-node, später Addon-Firmware) und **`/assets`** (Logo). Strukturvorschlag wird vor dem Anlegen der Dateien zur Freigabe vorgelegt.

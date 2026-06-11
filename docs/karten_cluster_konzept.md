<!-- GROWCTRL – Karten-Cluster-Konzept (Phase 2) | Version 2.0.0-dev | MIT | MrDarkvoid + Claude (Anthropic), Vibe Coding -->
# Karten-Cluster – Konzept (Phase 2)

**Status:** Konzept zur Freigabe · Implementierung erst nach OK
**Ersetzt:** Checkup-Karten (3× button-card-JS) und die monolithische growctrl-tent-card v1.3

---

## 1. Leitprinzipien

1. **Fokussierte Karten statt Monolith** – jede Karte macht eine Sache, ist einzeln nutzbar und frei kombinierbar.
2. **Minimale Pflichtkonfiguration** – jede Karte rendert mit 1–2 Pflichtfeldern; alles Weitere hat Defaults oder wird automatisch gefunden.
3. **Keine doppelte Logik** – alles Gemeinsame lebt in `cards/core` (löst Issues #5 VPD-Inkonsistenz und #6 Log-Parser 4×).
4. **Zukunftssicher** – Entitäten-Auflösung ist abstrahiert: heute Namensschema, morgen Integration-Discovery. Kartencode bleibt identisch.
5. **Ein Bundle für HACS** – alle Karten werden zu einer `growctrl-cards.js` gebaut (Mushroom-Modell).

---

## 2. Kartenschnitt (6 Karten)

| Karte | Element-Name | Zweck | Pflichtfelder | Wichtigste Optionen |
|---|---|---|---|---|
| **Tent** | `growctrl-tent-card` | Zelt-Hero: Temp/rF/VPD-KPIs, VPD-Zonenskala mit Marker, Status-Ampel, Header-Badges, optional 24h-Verlaufschart | `temperature`, `humidity` | `vpd`, `leaf_offset`, `badges[]`, `stats[]`, `show_chart`, `chart_hours`, `tap_navigation` |
| **Station** | `growctrl-station-card` | Eine Station: Licht-/Pumpen-Laufzeitbalken (Restzeit-Countdown, „AN in …"), O₂/Umluft-Status, Stage-Badge + Phasen-Chips, Auto-Schalter, einklappbare Konfig-Kacheln (Lichtzeiten, Pumpenzyklen) | `station` (Profil) **oder** `light_schedule.on/off` | `pump_schedule`, `phases[]`, `settings_collapsed`, `show_stage_chips` |
| **Controls** | `growctrl-controls-card` | Aktoren-Raster mit Gruppen-Überschriften, Kritisch-Erkennung (Pumpe/CO₂ → Bestätigungsdialog) | `controls[]` (min. 1) | `confirm`, `group`, `columns` |
| **Sensors** | `growctrl-sensors-card` | Sensor-Kacheln mit Sparklines (gedrosselter History-Cache), Tap → More-Info | `sensors[]` (min. 1) | `sparkline_hours`, `columns` |
| **Plants** | `growctrl-plants-card` | Pflanzen-Chips, Sorte/Alter (Keimdatum), eigene Sensoren je Pflanze, Ereignis-Kalender (letzte 3 + Popup) | `plants[]` (min. 1) | je Pflanze: `strain`, `germination_helper`, `calendar`, `sensors[]` |
| **Status** | `growctrl-status-card` | Übersetzte Live-Logzeilen (Station/Klima/raw) mit Schweregrad-Farben, Status-Ampel-Logik, Experten-Bereich: Roh-Logs + Wartung/Testmodus-Schalter (immer mit Bestätigung) | `logs[]` (min. 1) | `status` (dehum/temp_min/max), `expert.controls[]`, `expert.logs[]` |

**Beispiel-Kombinationen:**
- *Wandtablet-Übersicht:* 3× Tent (klein/mittel/gross) nebeneinander, Tap navigiert in die Zelt-Ansicht.
- *Zelt-Detailseite:* Tent + Station(s) + Controls + Sensors + Status.
- *Pflege-View:* Plants + Station.
So entsteht die Flexibilität, die du willst: Zelte ändern sich → Karten werden hinzugefügt/entfernt, nichts ist fest verdrahtet.

---

## 3. `cards/core` – gemeinsame Bibliothek

| Modul | Inhalt | Herkunft |
|---|---|---|
| `types.ts` | Alle Config-/HA-Typen, Rollen-Enum (s. Abschnitt 4) | erweitert aus `src/types.ts` |
| `entity-resolver.ts` | **Neu, zentral:** löst Karten-Konfiguration zu Entity-IDs auf (3 Quellen, s. Abschnitt 4) | neu |
| `vpd.ts` | **Die eine** VPD-Implementierung (Magnus, 0.61078 · 17.27/237.3, Blattoffset). Checkup-Formel (Tetens) wird verworfen → Issue #5 ✅ | aus `src/vpd.ts` |
| `loglang.ts` | **Der eine** Log-Parser (Station/Klima/raw), inkl. `pumpOnFromLog`. Verhalten = `docs/log_referenz.md` → Issue #6 ✅ | aus `src/loglang.ts` |
| `data.ts` | History-Cache (5 min TTL, Downsampling 48 Punkte), Kalender-Cache (10 min) | aus `src/data.ts` |
| `format.ts` | `fmtDur`, `parseHaDate`, `daysSince`, `formatDate`, `timeToMin`, `settingValue` | aus `src/util.ts` + `card.ts` |
| `charts.ts` | Sparkline-SVG, Verlaufschart-Serien | aus `src/util.ts` |
| `theme.ts` | CSS-Variablen + geteilte Styles (Kacheln, Chips, Balken, Log-Zeilen, Popup) – Theme-neutral wie bisher | aus `card.ts`-Styles, zusammengeführt mit Checkup-THEME-Semantik |
| `base-card.ts` | Abstrakte Basisklasse: hass-Handling, `_state/_num/_unit/_friendly`, more-info, Bestätigungs-Popup, History-Tick | extrahiert aus `card.ts` |
| `editor-base.ts` | ha-form-Helfer, Labels (DE), Zeilen-/Listen-Editor-Bausteine | aus `src/editor.ts` |

Regel: **Karten importieren nur aus `core`** – nie voneinander.

---

## 4. Entitäten-Auflösung (das Flexibilitäts-Herzstück)

Jede Karte beschreibt ihren Bedarf über **Rollen** (z. B. `light_switch`, `pump_remaining`, `stage_select`, `station_log`). Der `entity-resolver` füllt die Rollen aus einer von drei Quellen – Priorität von oben nach unten:

```yaml
# Quelle A – explizit (volle Kontrolle, wie heute)
light_schedule:
  on_helper: input_datetime.hydro_light_on_mittel_main1

# Quelle B – Profil (Namensschema, spart 90 % Tipparbeit im Legacy-Betrieb)
station:
  tent: mittel        # frei wählbar
  station: main1
# → Resolver bildet daraus hydro_light_on_<tent>_<station>, hydro_log_<tent>_<station>, …
#   und prüft Existenz in hass.states (fehlende Rollen = Feature aus, kein Fehler)

# Quelle C – Integration (Phase 3, höchste Stufe)
station:
  device: <device_id der GROWCTRL-Integration>
# → Resolver liest die Rollen aus Entity-Attributen (growctrl_role) bzw. der Entity Registry
```

Explizite Angaben überschreiben Profil-Treffer einzeln. Der GUI-Editor bietet alle drei Modi an; fehlende optionale Rollen blenden Features stumm aus (kein „Entität fehlt"-Spam, Issue #4 entschärft).

---

## 5. Build & Distribution (inkl. HACS-Entscheidung)

```
cards/
├── core/                  gemeinsame Bibliothek (kein eigenes Bundle)
├── tent/ station/ controls/ sensors/ plants/ status/   je: card.ts, editor.ts, index.ts
├── bundle.ts              importiert alle Karten + registriert window.customCards
├── package.json           npm workspace, esbuild, typecheck
└── dist/growctrl-cards.js EIN minifiziertes Bundle (Build-Artefakt)
```

**HACS-Strategie (2 Repos, verbindlich):**
1. `MrDarkvoid/growctrl` → HACS-Kategorie **Integration** (Monorepo; `custom_components/growctrl` ab Phase 3).
2. `MrDarkvoid/growctrl-cards` → HACS-Kategorie **Dashboard**; enthält nur `growctrl-cards.js`, `hacs.json` (`"filename": "growctrl-cards.js"`), README, LICENSE. Wird je Release aus dem Monorepo-Build befüllt (zunächst manuell: `dist/` kopieren, Release taggen; später optional GitHub Action).

Versionierung: Karten-Bundle trägt die gemeinsame Projektversion (2.0.0). Die alte tent-card v1.3 bleibt als Referenz unter `legacy/tent-card-v1/` erhalten (Quelltexte), damit der Abschluss-Check „alles übernommen" erfüllt ist.

---

## 6. Abdeckungs-Nachweis (nichts geht verloren)

| Alte Funktion (Tent Card v1.3 / Checkups) | Neue Heimat |
|---|---|
| Hero KPIs + VPD-Skala + Badges + Stats + Chart | Tent |
| Licht-/Pumpenbalken, Stage, Phasen-Chips, Settings-Kacheln, Grow-Timeline | Station |
| Aktoren-Raster + Gruppen + Bestätigung | Controls |
| Sensor-Kacheln + Sparklines | Sensors |
| Pflanzen + Kalender + Popup | Plants |
| Log-Übersetzung, Status-Ampel, Experten-Modus | Status |
| Checkup-„Alles auf einen Blick" | Kombination Tent (+ kompakter `dense`-Modus) |

---

## 7. Offene Punkte zur Freigabe

1. **Kartenschnitt ok?** (6 Karten; Konfig-Kacheln in Station integriert statt 7. Karte)
2. **Namensschema-Defaults** des Profil-Modus = heutiges `hydro_*`-Schema – passt das, oder sollen die Templates im Editor frei editierbar sein? (Empfehlung: Defaults fest + überschreibbar)
3. Nach Freigabe: Implementierung Core → Tent → Station → Status → Controls/Sensors/Plants, je mit Typecheck + Build.

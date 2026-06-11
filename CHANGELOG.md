# Changelog – GROWCTRL

## [2.1.0-dev] – 2026-06-11 · Große Reorganisation (Phase 0–1)

### Hinzugefügt (Design-Refresh v2.1)
- **Modernes Karten-Design v2:** neue Typo-Hierarchie, weiche Radien, dezente Borders, mehr Luft
- **Status-Ampel auf Kartenebene:** Karten bekommen bei Warnung/Fehler farbigen Rahmen + Glow –
  „einmal raufgucken und sehen, dass alles in Ordnung ist" (Checkup-Prinzip)
- **Stil pro Karte konfigurierbar** (`style:`): Hintergrund (Farbe/Gradient/CSS), Deckkraft 0–1,
  Glas-Effekt (Blur), Akzentfarbe, Eckenradius – in allen 6 GUI-Editoren als Sektion „Stil"
- **Systemtypen DWC/Erde (Station-Karte):** `system: dwc` → EC/pH/Wassertemperatur/Füllstand,
  `system: soil` → Bodenfeuchte/-temperatur/EC/pH; je Wert Sollbereich (min/max) mit Ampelfarbe,
  Verletzungen färben Kachel + Kartenrahmen; vollständig im GUI-Editor
- **Sensors-Karte:** Flächen-Sparkline, großer Wert + Einheit, optionaler Sollbereich je Sensor (Ampel)
- **Controls-Karte:** Kacheln mit Icon + animierter Schalter-Pille
- **Integration:** Config Flow um Systemtyp (Generisch/DWC/Erde) + optionale System-Sensoren erweitert;
  `strings.json` + `translations/en.json` ergänzt (Härtung); Manifest 2.1.0;
  Installations-Troubleshooting im README

### Hinzugefügt (HACS + GUI-Editoren)
- **Integration HACS-installierbar:** `hacs.json` im Repo-Root – Monorepo = HACS-Repo Kategorie *Integration*
  (Zwei-Repo-Strategie: `growctrl-cards` bleibt Kategorie *Dashboard*); README-Installationsabschnitt neu
- **Vollständige GUI-Editoren für alle 6 Karten** (`*/editor.ts` + `core/editor-base.ts`):
  ha-form-basiert, generischer Listen-Editor (Zeilen hinzufügen/entfernen) für Logs, Aktoren, Sensoren,
  Pflanzen und Experten-Schalter; Station-Editor erhält YAML-`overrides`/`templates` beim Speichern
- Plants-Karte akzeptiert Sensoren jetzt auch als reine Entity-Liste (GUI-Mehrfachauswahl)

### Hinzugefügt (Phase 3 – Skeleton)
- Integrations-Konzept (`docs/integration_konzept.md`): 1 Config Entry = 1 Station, Pflicht- vs.
  optionale Entitäten, Events statt input_text, Migrationspfad
- `custom_components/growctrl/`: manifest, Config Flow (Zelt/Station + Entity-Zuordnung),
  Controller-Loop (1 min), Plattformen switch/select/time/number/sensor, translations (de)
- `logic.py`: reine Steuerlogik (Lichtfenster inkl. Mitternachtsüberlauf, Pumpen-Modulo-Zyklus,
  Restzeiten, Failsafe) – **10/10 pytest grün** (`tests/test_logic.py`)
- Strukturell gelöst: Issues #1/#1b (Switch-Listen vollständig), #2 (Snapshot vor Service-Call),
  #4 (optionale Entitäten nur bei Zuordnung)
- Karten-Test-Beispiele mit echten Entity-IDs: `cards/examples/` (Installationsanleitung + 2 Views)
- v1.3-Tent-Card vollständig archiviert: `legacy/tent-card-v1/`
- Offen (vor Produktivbetrieb): Options-Flow, Klima-Entry-Typ, Manual-Override,
  Failsafe-Anbindung im Controller, Lauf in echter HA-Instanz

### Hinzugefügt (Phase 2)
- Karten-Cluster implementiert: `cards/core` (types, format, vpd, loglang, resolver, data, theme, base-card)
  + 6 Karten (tent, station, controls, sensors, plants, status) als EIN Bundle `dist/growctrl-cards.js`
- Entity-Resolver mit Rollen-Geltungsbereich Zelt/Station/Pflanze: explizit > Profil-Namensschema (`hydro_*`,
  via `templates` überschreibbar) > Integration (Phase 3); fehlende Rollen blenden Features stumm aus
- Genau EINE VPD-Implementierung (Magnus, Issue #5 ✅) und EIN Log-Übersetzer (Issue #6 ✅) in `cards/core`
- HACS-Zweitrepo-Vorlage `growctrl-cards` (Bundle + hacs.json + README)
- Hinweis: GUI-Editoren folgen; Konfiguration zunächst per YAML (Beispiele in `cards/README.md`)

### Hinzugefügt
- Monorepo-Struktur: `assets/ cards/ custom_components/ docs/ firmware/ legacy/`
- Einheitliche Kopfblöcke (Projekt, Zweck, Bezug, Version, Autor MrDarkvoid + Claude, MIT) in allen Dateien
- `docs/phase0_bestandsaufnahme.md`: vollständiges Inventar + Issue-Liste (#1–#8)
- `docs/architektur_notizen.md`: korrigiertes Architekturbild (HA = Steuerzentrale, Hardware-agnostisch)
- README mit Logo, Mermaid-Architektur, Installations- und Roadmap-Abschnitt
- LICENSE (MIT), CONTRIBUTING, .gitignore
- ESPHome-Firmware (Relay Board v4, Sensor Node v4) und Logo ins Repo aufgenommen

### Geändert
- Alle Dateinamen vereinheitlicht (lowercase, ASCII: `gross` statt `groß`)
- Dashboard-Raw-Config: CRLF → LF normalisiert, als `button_card_templates.yaml` übernommen
- Firmware: hartkodierte Fallback-AP-Passwörter durch `!secret ap_fallback_password` ersetzt (Issue #7 ✅)

### Unverändert (bewusst)
- Inhaltliche Logik der Legacy-Packages/-Blueprints – bekannte Bugs bleiben dokumentierte Issues
  (#1, #1b, #2, #3, #4, #5, #6, #8) und werden in Phase 2/3 strukturell gelöst.

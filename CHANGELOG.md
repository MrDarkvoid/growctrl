# Changelog – GROWCTRL

## [2.0.0-dev] – 2026-06-11 · Große Reorganisation (Phase 0–1)

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

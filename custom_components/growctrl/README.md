# GROWCTRL Integration (Phase 3 – Skeleton)
Ersetzt Packages + Blueprints. Eine Station = ein Config Entry (UI: "Integration hinzufügen → GROWCTRL").
- **Pflicht-Entitäten:** Automatik/Wartung/Testmodus (switch), Wachstumsphase (select),
  3× Lichtzeit (time), Licht-Restzeit (sensor)
- **Optional (nur bei zugeordneter Pumpe):** 6× Pumpenzyklus (number), Pumpen-Restzeit (sensor)
- **Logik:** `logic.py` – reine Funktionen, pytest-getestet (`/tests/test_logic.py`), schaltet
  vollständige Switch-LISTEN (Issues #1/#1b ✅), Snapshot vor Service-Call (Issue #2 ✅)
- **Events:** `growctrl_event` statt input_text-Logs
- Konzept & Status: `docs/integration_konzept.md`

**Ehrlich:** Skeleton-Stand. logic.py ist getestet, die HA-Dateien sind syntaxgeprüft –
ein Lauf in einer echten HA-Instanz steht aus. Noch offen: Options-Flow, Klima-Entry-Typ,
Manual-Override, Failsafe-Anbindung im Controller.

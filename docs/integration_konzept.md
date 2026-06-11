<!-- GROWCTRL – Integrations-Konzept (Phase 3) | Version 2.0.0-dev | MIT | MrDarkvoid + Claude (Anthropic), Vibe Coding -->
# GROWCTRL Integration – Konzept (Phase 3)

**Ersetzt:** Packages (Helper) + Blueprints (Logik). **Leitsatz:** HA ist die Steuerzentrale;
Aktoren sind beliebige HA-Switches (Zigbee-Steckdosen heute, Relay Board optional).

## 1. Datenmodell
Ein **Config Entry = eine Station** (mehrere Entries = Zelt mit n Stationen; Zelt-Name gruppiert
sie als Device-Bereich). Größen-Tiers verschwinden: alles sind Parameter.

Config Flow fragt ab:
| Feld | Pflicht | Typ |
|---|---|---|
| Zelt-Name, Stations-Name | ✅ | Text |
| Licht-Switch(es) | ✅ | entity multiple (switch) |
| Pumpen-/O₂-/Umluft-Switches | optional | entity multiple |
| Temperatur-/Feuchte-Sensor | optional | entity (sensor) |
| Pumpe 24/7 | optional | bool |

## 2. Erzeugte Entitäten (Pflicht vs. optional)
**Immer:** `switch.<station>_automatik`, `select.<station>_stage`,
`time.<station>_licht_an / _aus_sv / _aus_bloom`, `sensor.<station>_licht_restzeit`,
`switch.<station>_wartung`, `switch.<station>_testmodus`.
**Nur wenn Pumpe zugeordnet:** 6× `number.<station>_pumpe_{an,aus}_{seedling,veg,bloom}` (min),
`sensor.<station>_pumpe_restzeit`. Optionale Funktionen ohne Zuordnung erzeugen NICHTS
(ersetzt das Package-Modell, Issue #4 strukturell gelöst).
Alle Entitäten tragen `unique_id` + Attribut `growctrl_role` → Quelle C des Karten-Resolvers.

## 3. Steuerlogik (Python statt Jinja)
`logic.py` enthält die **reinen, getesteten** Funktionen (pytest):
Lichtfenster inkl. Mitternachtsüberlauf, Pumpen-Modulo-Zyklus je Phase, Restzeiten
(identisches Verhalten wie die 6× duplizierten Jinja-Templates – nun 1×).
`controller.py` läuft minütlich + auf relevante State-Changes und schaltet **vollständige
Switch-Listen** (`entity_id: [..]`) → Issues #1/#1b strukturell gelöst. Zustands-Snapshot
VOR dem Service-Call → Issue #2 gelöst. Failsafes (Licht/Pumpe max. AN) wie im Blueprint.

## 4. Events statt input_text
Jede Aktion feuert `growctrl_event` (`{tent, station, kind, ist, soll}`) + Logbucheintrag.
Karten migrieren vom Log-Parser auf Events; der Parser in cards/core bleibt für den Übergang.

## 5. Migration (Phase 4 im Detail)
Mapping-Tabelle alte → neue Entity-IDs aus `docs/entitaeten_liste.html`; Parallelbetrieb möglich
(Legacy-Automation deaktivieren je Station, Integration aktivieren). Klima-Blueprint folgt als
zweiter Entry-Typ ("Zeltklima") in einem späteren Schritt – Station zuerst (Skeleton-Scope).

## 6. Status Skeleton
Enthalten: manifest, const, **logic.py (getestet)**, config_flow (1 Step), __init__ mit
Controller-Loop, Plattformen switch/select/time/number/sensor, translations (de).
Noch offen (vor Produktivbetrieb): Options-Flow, Klima-Entry, Manual-Override, Reload-Feinheiten,
HA-Integrationstests. Reine Logik ist pytest-grün; HA-Dateien sind syntaxgeprüft (py_compile),
ein Lauf in echter HA-Instanz steht aus.

# Phase 4 – Migration Legacy → GROWCTRL-Integration

## Prinzip: Parallelbetrieb je Station
Beide Systeme können gleichzeitig laufen — aber **nie für dieselbe Station**:
1. Integration installieren, Zelt + eine Station anlegen (Automatik noch AUS).
2. Legacy-Blueprint-Automation **dieser einen Station** deaktivieren.
3. Integrations-Schalter „Automatik" AN, einen Tag beobachten (Ereignis-Sensor!).
4. Station für Station wiederholen; zum Schluss Klima-Blueprint deaktivieren und
   „Klima-Automatik" des Zelts aktivieren.

**Rollback** jederzeit: Integrations-Automatik AUS, Legacy-Automation wieder AN.

## Mapping: Legacy-Helfer → Integrations-Entitäten
`<t>` = Zelt (klein/mittel/gross), `<s>` = Station (z.B. main1). Die exakten IDs
in Entwicklertools → Zustände prüfen (HA-Slugification).

| Legacy (YAML-Paket) | Integration (automatisch erzeugt) |
|---|---|
| `input_boolean.hydro_auto_<t>_<s>` | `switch.growctrl_<t>_<s>_automatik` |
| `input_boolean.hydro_wartung_<t>_<s>` | `switch.growctrl_<t>_<s>_wartung` |
| `input_boolean.hydro_testmodus_<t>_<s>` | `switch.growctrl_<t>_<s>_testmodus` |
| `input_select.hydro_phase_<t>_<s>` | `select.growctrl_<t>_<s>_wachstumsphase` (inkl. **Trocknung**) |
| `input_datetime.hydro_licht_an_<t>_<s>` | `time.growctrl_<t>_<s>_licht_an` |
| `input_datetime.hydro_licht_aus_sv_<t>_<s>` | `time.growctrl_<t>_<s>_licht_aus_seedling_veg` |
| `input_datetime.hydro_licht_aus_bt_<t>_<s>` | `time.growctrl_<t>_<s>_licht_aus_bloom_flush` |
| `input_number.hydro_pumpe_*_<t>_<s>` (6×) | `number.growctrl_<t>_<s>_pumpe_*` (6×) |
| `sensor.<t>_<s>_licht_restzeit` (Template) | `sensor.growctrl_<t>_<s>_licht_restzeit` |
| `input_text.hydro_log_<t>_<s>` | `sensor.growctrl_<t>_<s>_letztes_ereignis` + binary_sensors |
| `input_text.hydro_klima_log_<t>` | `sensor.growctrl_zelt_<t>_letztes_ereignis` |
| – (neu) | Keimstart (date), Alter, Phasen-Empfehlung, DLI heute/Prognose, Zelt-Status, Aufgaben |

## Karten umstellen
Resolver-Stufe C greift automatisch (Integrations-Entitäten tragen `growctrl_role`).
Explizite `overrides:` in Karten-Configs auf die neuen IDs ändern; Status-/Checkup-Zeilen
vom Typ „Stations-Log" (`input_text`) auf Typ **„Ereignis-Sensor"** umstellen.

## Release-Checkliste
1. Monorepo-Inhalt in den **Repo-Root** von `MrDarkvoid/growctrl` pushen (nicht den ZIP-Ordner!)
2. GitHub-Release `v2.3.0` taggen
3. `growctrl-cards.js` + `hacs.json` nach `MrDarkvoid/growctrl-cards`, Release taggen
4. HACS: beide Repos als Custom Repository (Integration / Dashboard) hinzufügen
5. brands-PR für das Logo (`docs/branding.md`)

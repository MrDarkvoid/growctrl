<!--
GROWCTRL – Doku Checkup-Karten (LEGACY)
Zweck: Beschreibung der drei alten Checkup-Karten. Dient als Funktions-Spezifikation fuer den Karten-Cluster (Phase 2).
Version: 2.0.0-dev | Lizenz: MIT
Autor: MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
-->
# Dashboard Checkup Karten — Überblick

Letzte Aktualisierung: 2026-03-20

---

## Gemeinsame Architektur

Alle drei Karten teilen identische Funktionen und ein gemeinsames `THEME`-Objekt.
Änderungen an diesen Funktionen müssen in **allen drei Dateien** gespiegelt werden.

### Geteilte Funktionen
| Funktion | Zweck |
|---|---|
| `THEME` | Farbpalette — Labels, Values, Status-Farben, Tile/Row-Backgrounds |
| `stageBadge(stage)` | Farbiger Stage-Badge (Seedling/Veg/Bloom/Flush) |
| `barRow(icon, fillStyle, timeText, timeColor)` | Wiederverwendbare Progress-Bar Zeile |
| `translateKlimaLog(raw)` | Klima-Blueprint Log → lesbares Deutsch |
| `translateStationLog(raw)` | Station-Blueprint Log → lesbares Deutsch |
| `fmtMin(m)` | Minuten → "Xh Ymin" Format |
| `toMin(s)` | datetime-String → Minuten seit Mitternacht |

### THEME Objekt (aktuell)
```javascript
const THEME = {
  label:    'rgba(255,255,255,0.85)',   // Labels / Überschriften
  value:    'rgba(255,255,255,1.0)',    // Hauptwerte
  muted:    'rgba(255,255,255,0.50)',   // Zeitstempel, sekundär
  logLabel: 'rgba(255,255,255,0.75)',   // Log-Zeilenlabel
  logText:  'rgba(255,255,255,0.88)',   // Log-Zeilentext
  ok:       '#4DFFC3',                  // Status OK (Mint)
  warn:     '#FFD166',                  // Warnung (Gelb)
  crit:     '#FF6B6B',                  // Fehler (Rot)
  info:     '#FFD166',                  // Info (Gelb)
  tileBg:   'rgba(0,0,0,0.20)',         // Sensor-Tile Hintergrund
  rowBg:    'rgba(0,0,0,0.18)',         // Row/Block Hintergrund
};
```

### Stage-Badge Farben
| Stage | Hintergrund | Textfarbe |
|---|---|---|
| Seedling | `rgba(100,180,255,0.2)` | `#7EC8FF` |
| Veg | `rgba(100,220,100,0.25)` | `#7EE87E` |
| Bloom | `rgba(255,180,50,0.25)` | `#FFB432` |
| Flush | `rgba(255,180,50,0.25)` | `#FFB432` |

### Log-Level Hintergründe
| Level | Hintergrund | Textfarbe |
|---|---|---|
| critical | `rgba(255,107,107,.22)` | `#FF6B6B` |
| warning | `rgba(255,209,102,.2)` | `#FFD166` |
| info | `rgba(255,209,102,.15)` | `#FFD166` |
| ok | `rgba(0,0,0,0.18)` | `rgba(255,255,255,0.88)` |
| none | `rgba(0,0,0,0.12)` | `rgba(255,255,255,0.35)` |

---

## Zelt Klein

**Datei:** `CHECKUP_gz_klein.yaml`
**Gradient:** `#1D9E75` → `#0F6E56` (Grün)
**Navigation:** `/grow-zelt/gz_klein`
**Stationen:** 2 (Anzucht Oben, Anzucht Unten)

### Entitäten
| Typ | Entity ID | Zweck |
|---|---|---|
| sensor | `sensor.us_grow_zelt_klein_temperature` | Temperatur |
| sensor | `sensor.us_grow_zelt_klein_humidity` | Luftfeuchte |
| sensor | `sensor.growzelt_klein_leistungsbezug` | Leistung W |
| input_boolean | `input_boolean.hydro_climate_auto_klein` | Klima Auto |
| input_boolean | `input_boolean.hydro_dehum_request_klein` | Dehum Request |
| input_boolean | `input_boolean.hydro_maintenance_klein` | Wartung |
| input_boolean | `input_boolean.hydro_auto_klein_anzucht1` | Auto Oben |
| input_boolean | `input_boolean.hydro_auto_klein_anzucht2` | Auto Unten |
| switch | `switch.anzucht_oben` | Lampe Oben |
| switch | `switch.anzucht_unten` | Lampe Unten |
| input_select | `input_select.hydro_stage_klein_anzucht1` | Stage (geteilt) |
| sensor | `sensor.klein_anzucht_licht_restzeit` | Licht Restzeit (geteilt) |
| sensor | `sensor.klein_anzucht_pumpe_restzeit` | Pumpe Restzeit (geteilt) |
| input_datetime | `input_datetime.hydro_light_on_klein_anzucht1` | Licht AN |
| input_datetime | `input_datetime.hydro_light_off_sv_klein_anzucht1` | Licht AUS S/V |
| input_datetime | `input_datetime.hydro_light_off_bloom_klein_anzucht1` | Licht AUS Bloom |
| input_number | `input_number.hydro_pump_on_[stage]_klein_anzucht1` | Pumpe AN Zeit |
| input_number | `input_number.hydro_pump_off_[stage]_klein_anzucht1` | Pumpe AUS Zeit |
| input_text | `input_text.hydro_log_klein_anzucht1` | Log Oben |
| input_text | `input_text.hydro_log_klein_anzucht2` | Log Unten |
| input_text | `input_text.hydro_climate_log_klein` | Klima Log |

### Besonderheiten
- Licht/Pumpe Restzeit-Sensoren sind geteilt (beide Stationen nutzen `anzucht1`)
- Stage ist geteilt über `hydro_stage_klein_anzucht1`

---

## Zelt Mittel

**Datei:** `CHECKUP_gz_mittel.yaml`
**Gradient:** `#E87B2E` → `#C45A10` (Orange)
**Navigation:** `/grow-zelt/gz_mittel`
**Stationen:** 1 (Grow · Main)

### Entitäten
| Typ | Entity ID | Zweck |
|---|---|---|
| sensor | `sensor.us_grow_zelt_mittel_temperature` | Temperatur |
| sensor | `sensor.us_grow_zelt_mittel_humidity` | Luftfeuchte |
| sensor | `sensor.growzelt_mittel_leistungsbezug` | Leistung W |
| input_boolean | `input_boolean.hydro_climate_auto_mittel` | Klima Auto |
| input_boolean | `input_boolean.hydro_dehum_request_mittel` | Dehum Request |
| input_boolean | `input_boolean.hydro_maintenance_mittel` | Wartung |
| input_boolean | `input_boolean.hydro_auto_mittel_main1` | Auto Main |
| switch | `switch.fs_gz_mittel_licht` | Lampe |
| input_select | `input_select.hydro_stage_mittel_main1` | Stage |
| sensor | `sensor.mittel_main1_licht_restzeit` | Licht Restzeit |
| sensor | `sensor.mittel_main1_pumpe_restzeit` | Pumpe Restzeit |
| input_datetime | `input_datetime.hydro_light_on_mittel_main1` | Licht AN |
| input_datetime | `input_datetime.hydro_light_off_sv_mittel_main1` | Licht AUS S/V |
| input_datetime | `input_datetime.hydro_light_off_bloom_mittel_main1` | Licht AUS Bloom |
| input_number | `input_number.hydro_pump_on_[stage]_mittel_main1` | Pumpe AN Zeit |
| input_number | `input_number.hydro_pump_off_[stage]_mittel_main1` | Pumpe AUS Zeit |
| input_text | `input_text.hydro_log_mittel_main1` | Station Log |
| input_text | `input_text.hydro_climate_log_mittel` | Klima Log |

---

## Zelt Groß

**Datei:** `CHECKUP_gz_gross.yaml`
**Gradient:** `#7B4FBE` → `#52309A` (Violett)
**Navigation:** `/grow-zelt/gz_gross`
**Stationen:** 4 (Blattgemüse, Main 2, Main 3, Main 4)

### Entitäten (pro Station N = 1–4)
| Typ | Entity ID | Zweck |
|---|---|---|
| sensor | `sensor.us_grow_zelt_gross_temperature` | Temperatur |
| sensor | `sensor.us_grow_zelt_gross_humidity` | Luftfeuchte |
| sensor | `sensor.growzelt_gross_leistungsbezug` | Leistung W |
| input_boolean | `input_boolean.hydro_climate_auto_gross` | Klima Auto |
| input_boolean | `input_boolean.hydro_dehum_request_gross` | Dehum Request |
| input_boolean | `input_boolean.hydro_maintenance_gross` | Wartung |
| input_boolean | `input_boolean.hydro_auto_gross_mainN` | Auto Station N |
| switch | `switch.fs_gz_gross_licht_mainN` | Lampe Station N |
| input_select | `input_select.hydro_stage_gross_mainN` | Stage Station N |
| sensor | `sensor.gross_mainN_licht_restzeit` | Licht Restzeit N |
| sensor | `sensor.gross_mainN_pumpe_restzeit` | Pumpe Restzeit N |
| input_datetime | `input_datetime.hydro_light_on_gross_mainN` | Licht AN N |
| input_datetime | `input_datetime.hydro_light_off_sv_gross_mainN` | Licht AUS S/V N |
| input_datetime | `input_datetime.hydro_light_off_bloom_gross_mainN` | Licht AUS Bloom N |
| input_number | `input_number.hydro_pump_on_[stage]_gross_mainN` | Pumpe AN Zeit N |
| input_number | `input_number.hydro_pump_off_[stage]_gross_mainN` | Pumpe AUS Zeit N |
| input_text | `input_text.hydro_log_gross_mainN` | Station Log N |
| input_text | `input_text.hydro_climate_log_gross` | Klima Log |

### Stationsnamen
| ID | Name |
|---|---|
| main1 | Blattgemüse |
| main2 | Main 2 |
| main3 | Main 3 |
| main4 | Main 4 |

### Besonderheiten
- Jede Station hat eigenen Zeitplan (keine geteilten Restzeit-Sensoren)
- `stations`-Array macht spätere Erweiterung einfach

---

## Workflow für Änderungen

### Änderung an einer einzelnen Karte
1. Lade `CHECKUP_gz_[zelt].yaml` ins Projekt
2. Sage mir was geändert werden soll
3. Ich lese die Datei, mache den Fix, du bekommst die neue Version
4. Ersetze die Datei im Projekt

### Änderung an geteilten Funktionen (THEME, stageBadge, barRow, translateLog)
1. Alle drei YAML-Dateien müssen aktualisiert werden
2. Sage mir die gewünschte Änderung
3. Ich lese alle drei Dateien und liefere alle drei aktualisiert zurück

### Neue Karte entwickeln
1. Sage mir welche Entitäten/Struktur die neue Karte hat
2. Ich lese die bestehenden Karten für Konsistenz
3. Neue Karte wird als `CHECKUP_[name].yaml` angelegt

---

## Offene Punkte / Bekannte Issues

- [ ] `sensor.growzelt_gross_leistungsbezug` — Sensor noch nicht installiert (Platzhalter aktiv)
- [ ] Zelt Groß: `sensor.us_grow_zelt_gross_temperature/humidity` — bestätigt korrekt
- [ ] Issue aus Code-Review: Entity ID `sensor.gross_main1_licht_restzeit` — ß-Slugifikation prüfen
- [ ] Issue aus Code-Review: `input_boolean.hydro_light_group_gross_mainN_placeholder` nicht definiert

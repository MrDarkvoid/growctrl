# GROWCTRL Karten-Cluster

6 fokussierte Lovelace-Karten, gebaut als **ein** Bundle (`dist/growctrl-cards.js`).
Gemeinsame Logik (VPD, Log-Übersetzer, Resolver, Theme) lebt ausschließlich in `core/`.

## Build
```bash
npm install
npm run typecheck   # tsc --noEmit
npm run build       # -> dist/growctrl-cards.js
```

## Karten & Minimal-Konfiguration (YAML)

```yaml
# Zelt-Ebene: Hero mit Klima, VPD-Skala, Status-Ampel
type: custom:growctrl-tent-card
title: Zelt Mittel
temperature: sensor.us_grow_zelt_mittel_temperature
humidity: sensor.us_grow_zelt_mittel_humidity
power: sensor.growzelt_mittel_leistungsbezug
gradient: "#E87B2E,#C45A10"
climate_auto: input_boolean.hydro_climate_auto_mittel
maintenance: input_boolean.hydro_maintenance_mittel
dehum_request: input_boolean.hydro_dehum_request_mittel
logs:
  - entity: input_text.hydro_log_mittel_main1
  - entity: input_text.hydro_climate_log_mittel
    type: climate
tap_navigation: /grow-zelt/gz_mittel
```

```yaml
# Stations-Ebene: Profil-Modus – Resolver baut alle hydro_*-Helper selbst.
# Hardware-Switches (Zigbee-Steckdose ODER Relay Board) sind nie ableitbar -> explizit.
type: custom:growctrl-station-card
name: Grow · Main
station:
  tent: mittel
  station: main1
  light_switch: switch.fs_gz_mittel_licht
  # Einzelne Rollen überschreiben (Quelle A schlägt Profil):
  # overrides:
  #   light_rest: sensor.mein_eigener_restzeit_sensor
  # Namensschema ändern:
  # templates:
  #   log: "input_text.mein_{tent}_{station}_log"
```

```yaml
# Ebenen-neutral: zentrale Zelt-Aktoren ODER Pro-Pflanze-Pumpen – gleiche Karte
type: custom:growctrl-controls-card
title: Aktoren Zelt Gross
controls:
  - entity: switch.o2_zentral
    name: O₂ zentral
    group: Zelt
  - entity: switch.zirkulation_tomate_1
    name: Zirkulation Tomate 1
    group: Pflanzen
    confirm: true
```

```yaml
type: custom:growctrl-sensors-card
sensors:
  - entity: sensor.us_grow_zelt_gross_temperature
  - entity: sensor.us_grow_zelt_gross_humidity
```

```yaml
type: custom:growctrl-plants-card
calendar: calendar.grow_ereignisse
plants:
  - name: Tomate 1
    strain: San Marzano
    germination_helper: input_datetime.keimdatum_tomate_1
    sensors:
      - entity: sensor.gc_slot1_ec1
```

```yaml
type: custom:growctrl-status-card
title: Zelt Gross
logs:
  - entity: input_text.hydro_log_gross_main1
    name: Main 1
  - entity: input_text.hydro_climate_log_gross
    name: Klima
    type: climate
expert:
  controls:
    - entity: input_boolean.hydro_maintenance_gross
      name: Wartung
    - entity: input_boolean.hydro_testmode_gross
      name: Testmodus
  show_raw: true
```

## Hinweise
- **Alle 6 Karten haben vollständige GUI-Editoren** (ha-form). Nur `station.overrides`/`station.templates` bleiben YAML-Experten-Features – der Editor erhält sie beim Speichern.
- HACS-Veröffentlichung: Bundle in das Zweitrepo `MrDarkvoid/growctrl-cards` kopieren (siehe `docs/karten_cluster_konzept.md`, Abschnitt 5).

## Stil anpassen (alle Karten)

```yaml
style:
  background: "#0E1A2B,#091018"   # Farbe, "a,b" = Gradient oder beliebiges CSS-background
  opacity: 0.8                    # Transparenz der Kartenfläche (0–1)
  glass: true                     # Milchglas-Effekt (Blur)
  accent: "#4DFFC3"
  radius: 22
```

## Systemtyp der Station (DWC / Erde)

```yaml
type: custom:growctrl-station-card
station: { tent: gross, station: main1, light_switch: switch.fs_gz_gross_licht_main1 }
system: dwc
dwc:
  ec:         { entity: sensor.gc_slot1_ec1, min: 1.2, max: 2.2 }
  ph:         { entity: sensor.gc_slot1_ph1, min: 5.5, max: 6.5 }
  water_temp: { entity: sensor.gc_slot1_wtemp1, min: 16, max: 22 }
  level:      { entity: sensor.gc_slot1_level1, min: 30 }
# Erde analog: system: soil + soil: { moisture, soil_temp, ec, ph }
```
Werte außerhalb des Sollbereichs färben Kachel **und Kartenrahmen** (Ampel-Prinzip).

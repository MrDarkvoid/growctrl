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
- Konfiguration aktuell per YAML (`getStubConfig` liefert Startgerüste); GUI-Editoren folgen als nächster Ausbauschritt.
- HACS-Veröffentlichung: Bundle in das Zweitrepo `MrDarkvoid/growctrl-cards` kopieren (siehe `docs/karten_cluster_konzept.md`, Abschnitt 5).

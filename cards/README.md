# GROWCTRL Cards – Dashboard im Design „Soft Garden“

Zehn aufeinander abgestimmte Lovelace-Karten für die GROWCTRL-Integration. Alle Karten sind
**integrations-nativ**: Entity-IDs werden aus `tent` + `station` abgeleitet
(`switch.growctrl_<zelt>_<station>_automatik` …). `overrides:` bleibt als Notausgang.

> Die Karten setzen die GROWCTRL-Integration voraus. Werte sind im Dashboard antippbar und
> öffnen den normalen Home-Assistant-More-Info-Dialog.

## Design „Soft Garden“

- Warmes Schwarzgrün, **ein** Akzent je Zelt über `style.accent`
  (Klein grün, Mittel weinrot, Groß violett). Status- und Sonderfarben sind themen­unabhängig.
- 44-px-Touchziele, Fokus-Ringe, `prefers-reduced-motion`, Tabellenziffern.

```yaml
# Zelt-Theme setzen (gilt für jede Karte):
style:
  accent: "#EE7E92"   # Mittel = Weinrot   ·   Groß = "#B79CF5"   ·   Klein = Standard (grün)
```

---

## 1 · Hero — `growctrl-hero-card`

```yaml
type: custom:growctrl-hero-card
tent: klein
name: Growroom · Anzucht
show_chart: false        # Klima-Chart optional einblenden
```

## 2 · Station — `growctrl-station-card`

Das Herzstück. Phasen-**Dropdown** (volle Breite), Versorgungszeilen für Licht/Pumpe/DLI/Tank
im einheitlichen Stil, optionales **Aktor-Raster** und **Pflanzen-Tabs** mit drei
Sensor-Anzeigemodi.

```yaml
type: custom:growctrl-station-card
tent: mittel
station: main1
name: Mittel · Haupt 1
style: { accent: "#EE7E92" }

# Stations-Tank (optional) – erscheint als Versorgungszeile
tank_entity: sensor.tank_main1
tank_min: 30
tank_volume: 200

# Schaltaktoren in der Station (optional, 4 nebeneinander)
actuators:
  - { entity: switch.licht_main1,  name: Licht,  kind: light }
  - { entity: switch.pumpe_main1,  name: Pumpe,  kind: pump }
  - { entity: switch.o2_main1,     name: O₂,     kind: o2 }
  - { entity: switch.umluft_main1, name: Umluft, kind: fan }

# Pflanzen-Tabs mit Sensoren
plants:
  - name: Pflanze 1
    strain: Northern Lights
    germination_helper: date.keimstart_p1     # speist den Alters-Chip „Wo 8 · Tag 52“
    image: /local/grow/p1.jpg                 # optional, sonst Sprout-Symbol
    sensors:
      - { entity: sensor.temp_p1,    name: Temp,        anzeige: graph, color: "#FFB98A", icon: mdi:thermometer, hours: 24 }
      - { entity: sensor.feuchte_p1, name: Feuchtigkeit, anzeige: graph, color: "#7CC8F0", icon: mdi:water-percent }
      - { entity: sensor.ph_p1,      name: pH,  anzeige: zone, min: 4, max: 8,  ok: [5.5, 6.5], ideal: [5.8, 6.3] }
      - { entity: sensor.ec_p1,      name: EC,  anzeige: zone, min: 0.4, max: 3, ok: [1.0, 2.4], ideal: [1.2, 2.2] }
      - sensor.co2_p1                          # Kurzform = anzeige: wert
    tank_entity: sensor.tank_p1
    tank_min: 30
```

**Sensor-Anzeigemodi:** `wert` (Zahl + Label) · `zone` (Balken rot→grün→rot mit Idealbereich,
für pH/EC/VPD) · `graph` (24-h-Mini-Verlauf, für Temp/Feuchte). Optional je Sensor: `name`,
`color`, `icon`, `min`/`max`, `ok`, `ideal`, `hours`.

## 3 · Checkup — `growctrl-checkup-card`

```yaml
type: custom:growctrl-checkup-card
title: Checkup
# zeigt automatisch alle konfigurierten Zelte/Stationen als Ampel-Matrix
```

## 4 · Status / Protokoll — `growctrl-status-card`

```yaml
type: custom:growctrl-status-card
tent: gross
min_level: info        # info | warning | critical
```

## 5 · History — `growctrl-history-card`

```yaml
type: custom:growctrl-history-card
title: Klima · 24 h
entities:
  - { entity: sensor.zelt_temp, name: Temp, color: "#FFB98A" }
  - { entity: sensor.zelt_rh,   name: RH,   color: "#7CC8F0" }
hours: 24
```

## 6 · Metric — `growctrl-metric-card`

```yaml
type: custom:growctrl-metric-card
entity: sensor.wassertemp_main1
name: Wassertemp · Main 1
band: { min: 18, max: 22 }     # Sollband (grün gestrichelt)
```

## 7 · Tank — `growctrl-tank-card`

```yaml
type: custom:growctrl-tank-card
entity: sensor.tank_main1
name: Tank · Main 1
min: 30
volume: 200
```

## 8 · Controls — `growctrl-controls-card`

```yaml
type: custom:growctrl-controls-card
title: Aktoren · Zelt Groß
controls:
  - { entity: switch.o2_zentral, name: O₂ zentral }
  - { entity: switch.umluft,     name: Umluft }
  - { entity: switch.heizmatte,  name: Heizmatte, icon: mdi:radiator }   # bleibt orange
  - { entity: switch.befeuchter, name: Befeuchter, icon: mdi:air-humidifier, confirm: true }
```

## 9 · Sensors — `growctrl-sensors-card`

```yaml
type: custom:growctrl-sensors-card
title: Sensoren · Zelt
columns: 3
sensors:
  - { entity: sensor.zelt_temp, name: Temp }
  - { entity: sensor.zelt_rh,   name: RH }
  - { entity: sensor.zelt_co2,  name: CO₂ }
```

## 10 · Tent (kompakt) — `growctrl-tent-card`

```yaml
type: custom:growctrl-tent-card
tent: gross
```

---

*Alle Diagramme tragen den Urheber-Fingerprint zur Verfolgbarkeit (siehe `LICENSE`).
GROWCTRL · GC-SAL 1.0 · MrDarkvoid – Vibe Coding mit Claude (Anthropic).*

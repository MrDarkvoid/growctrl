# GROWCTRL Karten (11)

Ein Bundle (`dist/growctrl-cards.js`), elf Karten, alle mit GUI-Editor.
Die GROWCTRL-Karten leiten ihre Entity-IDs **automatisch** aus Zelt-/Stationsnamen
der Integration ab — abweichende IDs per `overrides: { suffix: entity_id }`.

## Installation
HACS-Repo `MrDarkvoid/growctrl-cards` (Dashboard) **oder** Datei nach `/config/www/`
und Ressource `/local/growctrl-cards.js` (JavaScript-Modul).

## Integrations-Karten

```yaml
# Hero – ganz oben: globale Schalter, Klima-KPIs, VPD-Chart, Informationssystem
type: custom:growctrl-hero-card
tent: gross
logo: /local/growctrl/logo.png
stations:
  - { station: main1, name: Main 1 }
  - { station: main2, name: Main 2 }

# Zelt-Klima – Modus/Phase umschalten, Sollband-Chart, Probleme
type: custom:growctrl-tent-card
tent: gross

# Station – Auto/Wartung, Phasen-Chips, Licht/Pumpe/DLI/Alter, Ereignis, Zahnrad
type: custom:growctrl-station-card
tent: gross
station: main1
name: Grow · Main 1

# Ereignisprotokoll – Verlauf der Letztes-Ereignis-Sensoren, neueste zuerst
type: custom:growctrl-status-card
sources:
  - { entity: sensor.growctrl_gross_main1_letztes_ereignis, name: Main 1 }
  - { entity: sensor.growctrl_zelt_gross_letztes_ereignis,  name: Klima }

# Checkup – eine Ampel-Zeile je Quelle
type: custom:growctrl-checkup-card
rows:
  - { name: Main 1, entity: sensor.growctrl_gross_main1_letztes_ereignis, type: event }
  - { name: Failsafe, entity: binary_sensor.growctrl_gross_main1_licht_failsafe, type: problem }
```

## Generische Karten (beliebige Entitäten)

```yaml
# Aktoren – Icon-Touch-Kacheln (Vivosun-Stil); confirm: true für 🔒-Abfrage
type: custom:growctrl-controls-card
controls:
  - { entity: switch.gz_gross_o2_zentral, name: O₂ zentral, group: Zelt }

# Verlauf – 24h-Mehrserien-Chart
type: custom:growctrl-history-card
sensors:
  - { entity: sensor.us_grow_zelt_gross_temperature, name: Temp }
  - { entity: sensor.us_grow_zelt_gross_humidity, name: RH }

# Metric – EC/pH groß mit Chart + Sollband
type: custom:growctrl-metric-card
entity: sensor.gc_slot1_ec1
name: EC
min: 1.2
max: 2.2

# Tank – DWC-Füllstand mit Mindeststand und Litern
type: custom:growctrl-tank-card
entity: sensor.gc_slot1_level1
min: 30
volume_l: 60

# Sensoren – Kacheln mit Sparkline + optionalem Sollbereich
type: custom:growctrl-sensors-card
sensors:
  - { entity: sensor.gc_slot1_wtemp1, name: Wassertemp, min: 16, max: 22 }

# Pflanzen – Steckbriefe, optional Kamera-Livebild oder Bild-URL
type: custom:growctrl-plants-card
plants:
  - { name: Tomate 1, strain: San Marzano, camera: camera.zelt_gross }
```

## Stil (alle Karten)

```yaml
style:
  background: "#0E1A2B,#091018"   # Farbe, "a,b" = Gradient oder CSS
  opacity: 0.85
  glass: true
  accent: "#4DFFC3"
  radius: 22
```

## overrides-Referenz (Suffix → Standard-ID)
Station: `automatik, wartung, wachstumsphase, licht_an, licht_aus_seedling_veg,
licht_aus_bloom_flush, licht_restzeit, pumpe_restzeit, alter_seit_keimung,
phasen_empfehlung, letztes_ereignis, dli_heute, dli_prognose, keimstart,
manuelle_ubernahme, manueller_eingriff, licht_failsafe, lichtzeiten_unvollstandig`
· Zelt: `zelt_aktiv, klima_automatik, klima_modus, klima_phase, vpd, status,
letztes_ereignis`

Fertige View: `../examples/zelt_gross_komplett.yaml`


## Informationssystem (Hero)
Zeigt seit 2.7 nur noch **echte Warnungen und Fehler** - Info-Ereignisse wie
„Licht AN“ erscheinen nicht mehr als gelbe Einträge, und die Status-Pille
springt nur noch bei wirklichen Problemen auf „Warnung“.

## Vorschau im Kartenwähler
Alle GROWCTRL-Karten liefern jetzt eine Live-Vorschau im „Karte hinzufügen“-Dialog:
fehlen die Beispiel-Entitäten, rendert die Karte automatisch ansprechende Demo-Daten.

## Chart-Stil
Verlaufs-Diagramme zeichnen seit 2.6 weiche Kurven mit Farbverlaufs-Füllung und
Endpunkt-Glow (Apex-Look) - betrifft Hero, Zelt, Metric und History.


## Lizenz
GC-SAL 1.0 (source-available, keine kommerzielle Nutzung) - siehe `LICENSE`
im Hauptrepository.

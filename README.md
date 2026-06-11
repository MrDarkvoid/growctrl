<p align="center">
  <img src="assets/growctrl_logo.png" alt="GROWCTRL Logo" width="280">
</p>

# GROWCTRL

**Home-Assistant-Gesamtsystem zur Automatisierung von Growzelten (Hydroponik & Erde).**

> Version 2.0.0-dev · Lizenz: MIT
> Entwickelt von **MrDarkvoid** in Zusammenarbeit mit **Claude (Anthropic)** – Vibe Coding

---

## Was ist GROWCTRL?

GROWCTRL steuert Licht, Pumpen, O₂, Umluft und Klima beliebig vieler Growzelte vollständig
über Home Assistant. **HA ist die Steuerzentrale** – die eigentliche Logik (Lichtzeiten mit
Mitternachtsüberlauf, Pumpenzyklen je Wachstumsphase, Klima-Hysterese, Failsafes,
Manual-Override) läuft in HA.

Aktoren und Sensoren sind **hardware-agnostisch**:

| Ebene | Heute | Optional |
|---|---|---|
| Aktoren | Zigbee-Steckdosen (beliebige HA-Switches) | GROWCTRL Relay Board (ESPHome, 8 Relais) |
| Sensorik | Beliebige HA-Sensoren | GROWCTRL Sensor Node + RS485-Addons (HYDRO2/TERRA2/POWER4) |

Die eigene Hardware (siehe `/firmware`) ist ein **verlängerter Arm**: Sie schaltet, misst und
kalibriert lokal – gesteuert wird sie von HA, ihre Messwerte fließen zurück nach HA.

## Architektur

```mermaid
flowchart TD
    subgraph HA["Home Assistant – Steuerzentrale"]
        INT["GROWCTRL Integration (Ziel, Phase 3)\nConfig Flow · Entitäten · Steuerlogik · Events"]
        LEG["Legacy: Packages + Blueprints\n(funktionierender Übergangsstand)"]
        CARDS["GROWCTRL Karten-Cluster (Phase 2)\nfokussierte Lovelace Custom Cards"]
    end
    subgraph HW["Aktoren & Sensoren (austauschbar)"]
        ZB["Zigbee-Steckdosen\n(aktueller Betrieb)"]
        RB["Relay Board v4 (ESPHome)\n8 Relais · RS485-Master"]
        SN["Sensor Node v4 (ESPHome)\nTemp/rF/CO₂/Lux/DS18B20"]
        AD["RS485-Addons\nHYDRO2 · TERRA2 · POWER4"]
    end
    INT -- "schaltet beliebige switches" --> ZB
    INT -- "schaltet beliebige switches" --> RB
    LEG -. wird abgelöst .-> INT
    SN -- RS485 --> RB
    AD -- RS485 --> RB
    RB -- "MQTT Discovery + States" --> HA
    SN -- "ESPHome API" --> HA
    CARDS -- liest/steuert --> INT
    CARDS -. "liest (Übergang)" .-> LEG
```

## Repository-Struktur

```
growctrl/
├── assets/                  Logo & Grafiken
├── cards/                   Karten-Cluster (Phase 2) – fokussierte Custom Cards + core-Bibliothek
├── custom_components/
│   └── growctrl/            Die GROWCTRL-Integration (Phase 3) – ersetzt Packages & Blueprints
├── docs/                    Architektur, Log-Referenz, Entitäten-Liste, Bestandsaufnahme
├── firmware/                Optionale ESPHome-Hardware (Relay Board, Sensor Node)
├── legacy/                  Heutiger funktionierender Stand (Packages, Blueprints, Dashboard)
│   ├── packages/
│   ├── blueprints/
│   └── dashboard/
├── CHANGELOG.md · CONTRIBUTING.md · LICENSE · README.md
```

## Installation (heutiger Legacy-Weg)

1. **Helper anlegen:** Dateien aus `legacy/packages/` nach `<config>/packages/` kopieren und
   Packages in `configuration.yaml` aktivieren (`homeassistant: packages: !include_dir_named packages`).
2. **Blueprints importieren:** `legacy/blueprints/*.yaml` nach
   `<config>/blueprints/automation/growctrl/` kopieren, je Station/Zelt eine Automation anlegen.
3. **Dashboard:** Übergangsweise `legacy/dashboard/` (button-card erforderlich) – wird durch den
   Karten-Cluster ersetzt.
4. **Optional Hardware:** `firmware/*.yaml` mit ESPHome flashen (`secrets.yaml` siehe `firmware/README.md`).

## Roadmap

| Phase | Inhalt | Status |
|---|---|---|
| 0 | Bestandsaufnahme & Issue-Liste | ✅ abgeschlossen (`docs/phase0_bestandsaufnahme.md`) |
| 1 | Monorepo, Vereinheitlichung, Kopfblöcke | ✅ dieses Repo |
| 2 | Karten-Cluster (core + 6 Karten, ein Bundle) | ✅ implementiert (`cards/`, Build: `dist/growctrl-cards.js`) |
| 3 | GROWCTRL-Integration (Config Flow, Entitäten, Logik in Python, Events) | geplant |
| 4 | Vollständige Doku, Migration, Release | geplant |

Bekannte Probleme: siehe Issue-Liste in `docs/phase0_bestandsaufnahme.md` (Abschnitt 4).

## HACS-Veröffentlichung (geplant)

Zwei benutzerdefinierte HACS-Repositories (HACS erlaubt eine Kategorie pro Repo):
`MrDarkvoid/growctrl` (Kategorie *Integration*, dieses Monorepo) und
`MrDarkvoid/growctrl-cards` (Kategorie *Dashboard*, nur das gebaute Karten-Bundle
`growctrl-cards.js`). Details: `docs/karten_cluster_konzept.md`, Abschnitt 5.

## Credits & Lizenz

Konzept, Anforderungen und Praxistests: **MrDarkvoid**.
Architektur & Implementierung in Zusammenarbeit mit **Claude (Anthropic)** – Vibe Coding.
Lizenz: [MIT](LICENSE).

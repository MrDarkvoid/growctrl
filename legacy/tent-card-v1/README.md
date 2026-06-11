# GROWCTRL Tent Card

Lovelace Custom Card für Home Assistant, die ein komplettes Growzelt abbildet – für **DWC (Hydroponik)** und **Erde**. Vollständig über den **GUI-Editor** konfigurierbar: keine Entity-ID muss von Hand getippt werden, Pflanzen werden per Klick angelegt und bekommen jeweils eigene Sensoren und einen Ereignis-Kalender.

## Funktionen

- **Hero-Bereich mit VPD-Zone:** Temperatur, Luftfeuchte und VPD groß im Blick. Farbige Zonenskala (Zu niedrig / Steckling / Vegetativ / Blüte / Zu hoch) mit Live-Marker. VPD kommt wahlweise aus einem eigenen Sensor oder wird per Magnus-Formel aus Temperatur + rF berechnet (Blatttemperatur-Offset einstellbar, Standard −2 K).
- **Sensor-Kacheln mit Sparklines:** Beliebig viele Zelt-Sensoren (EC, pH, Wassertemperatur, Füllstand, Licht, eCO2 …). Jede Kachel zeigt den Live-Wert plus 24-h-Trend (Zeitfenster einstellbar). Tap öffnet den HA-More-Info-Dialog mit dem vollen Graphen. History-Abrufe sind gecacht und gedrosselt (max. 1 Abruf je Entität pro 5 Minuten).
- **Steuerung:** Licht, Lüfter, Heizmatte, Pumpe, CO2 … als Schalter-Chips. Als kritisch markierte Aktoren verlangen einen Bestätigungsdialog. Pumpen und CO2-Ventile werden anhand des Namens automatisch als kritisch erkannt, manuell übersteuerbar.
- **Verlaufsdiagramm in der Karte:** Temperatur + Luftfeuchte als 24-h-Flächendiagramm (Zeitfenster einstellbar, abschaltbar), direkt unter dem Hero. Tap öffnet den vollen HA-Graphen.
- **Licht & Pumpe im Hero:** Laufzeitbalken direkt unter der VPD-Skala. Mit Restzeit-Sensoren zählen die Balken live herunter ("noch 7h 15min"), nachts zeigt der Lichtbalken "AN in …", der Pumpenbalken den Zyklus (AN+AUS je Phase aus input_number-Helpern).
- **Header-Badges:** Pills oben rechts (z. B. Klima Auto, Auto Main, Wartung), erscheinen sobald die Entität "an" ist.
- **Status-Ampel:** Automatische Bewertung ("✓ Alles OK" / Warnung / Fehler) aus Log-Schweregrad, Entfeuchter-Anforderung und Temperaturbereich.
- **Live-Logzeilen mit Übersetzung:** GROWCTRL-Rohlogs (Station/Klima) werden in deutschen Klartext mit Farb-Schweregrad übersetzt – FAILSAFE und MISMATCH erscheinen rot/gelb hinterlegt. Die Rohlogs bleiben im Experten-Modus einsehbar.
- **Deutsche Phasen-Anzeige:** Seedling/Veg/Bloom/Flush werden als Sämling/Wachstum/Blüte/Spülung angezeigt (Servicecalls nutzen weiter die Originalwerte).
- **Zweispalten-Layout:** Auf breiten Karten (Sections-Dashboard) ordnen sich Sensoren/Steuerung und Pflanzen/Konfiguration nebeneinander an.
- **Status-Boxen:** Frei wählbare Kennzahlen unter dem Hero (z. B. Leistung in W, Entfeuchter-Status, Automatik-Modus).
- **Steuerung als gruppiertes Kachel-Raster:** Aktoren bekommen optional eine Gruppe (z. B. „Licht · Direktschalten", „Automatik", „Geräte · Manuell") und erscheinen als sortierte Schalt-Kacheln mit Überschriften. Als kritisch markierte Aktoren verlangen einen Bestätigungsdialog; Pumpen und CO2-Ventile werden anhand des Namens automatisch als kritisch erkannt.
- **Licht-Laufzeitbalken:** „7h 15min / 18h" – berechnet aus AN-/AUS-Zeit-Helpern. Die AUS-Zeit für Bloom/Flush wird automatisch verwendet, sobald die aktuelle Phase Blüte oder Spülen ist.
- **Konfigurations-Sektion (einklappbar):** Phasen-Chips zum direkten Umschalten (setzt das `input_select`) plus frei gruppierbare Helper-Kacheln (Lichtzeiten, Pumpenzeiten je Phase …). Tap auf eine Kachel öffnet den HA-Einstellungsdialog.
- **Experten-Modus (einklappbar):** Wartungs-/Testmodus-Schalter (Bestätigung standardmäßig an) und Log-Anzeigen (Text-/Sensor-Entitäten) als Monospace-Boxen – für Diagnose deiner ESP32-Steuerung.
- **Grow-Status:** Aktuelle Phase aus einem `input_select`, „Tag X / Y" der Phase und Gesamt-Grow-Tag aus `input_datetime`-Helpern, Fortschrittsbalken. Tap öffnet die Phasen-Timeline.
- **Pflanzen-Verwaltung:** Beliebig viele Pflanzen als Chips. Pro Pflanze: Sorte/Genetik, Alter (Tag X seit Keimung), eigene Sensoren (z. B. Substratfeuchte bei Erde, Wurzelzonen-Temperatur bei DWC) und die letzten Ereignisse (Topping, Umtopfen …) aus einer Kalender-Entity. Tap öffnet die vollständige Ereignis-Historie.
- **Theme-neutral:** Folgt vollständig deinem HA-Theme (hell/dunkel) über CSS-Variablen.

## Installation

### HACS (empfohlen)

1. HACS → Drei-Punkte-Menü → *Benutzerdefinierte Repositories* → dieses Repo als Typ **Dashboard** hinzufügen.
2. „GROWCTRL Tent Card" installieren.
3. HACS registriert die Ressource automatisch. Browser-Cache leeren (Strg+F5).

### Manuell

1. `dist/growctrl-tent-card.js` nach `/config/www/` kopieren.
2. *Einstellungen → Dashboards → Drei-Punkte-Menü → Ressourcen → Ressource hinzufügen:*
   - URL: `/local/growctrl-tent-card.js`
   - Typ: **JavaScript-Modul**
3. Browser-Cache leeren.

## Schnellstart (komplett ohne YAML)

1. Dashboard bearbeiten → *Karte hinzufügen* → **GROWCTRL Tent Card** suchen.
2. Im Editor unter **Klima & VPD** mindestens Temperatur- und Luftfeuchte-Sensor wählen — die Karte rendert sofort.
3. Unter **Zelt-Sensoren** und **Steuerung** mit „+ hinzufügen" beliebig viele Entitäten anlegen.
4. Unter **Pflanzen** mit „+ Pflanze hinzufügen" jede Pflanze anlegen und ihre Sensoren/Kalender auswählen.

## Benötigte Helper (einmalig anlegen)

Unter *Einstellungen → Geräte & Dienste → Helfer*:

| Helper | Typ | Zweck |
|---|---|---|
| `input_select.zelt1_phase` | Dropdown | Optionen = deine Phasennamen (z. B. Keimung, Steckling, Vegetativ, Blüte, Spülen) |
| `input_datetime.zelt1_phasenstart` | Datum | Start der aktuellen Phase → „Tag X / Y" |
| `input_datetime.zelt1_growstart` | Datum | Start des Grows → „Grow-Tag N" |
| `input_datetime.pflanze_a_keimung` | Datum | Keimdatum je Pflanze → Pflanzenalter |

**Ereignis-Kalender pro Pflanze:** *Einstellungen → Geräte & Dienste → Integration „Lokaler Kalender"* → je Pflanze einen Kalender anlegen (z. B. „Pflanze A"). Ereignisse wie „Topping", „Umtopfen", „Defoliation" trägst du dort ein; die Karte zeigt sie automatisch an (letzte 3 in der Übersicht, alle im Popup).

> **Tipp:** Phasenwechsel lassen sich automatisieren — eine Automation, die beim Ändern von `input_select.zelt1_phase` das `input_datetime.zelt1_phasenstart` auf heute setzt:
> ```yaml
> triggers:
>   - trigger: state
>     entity_id: input_select.zelt1_phase
> actions:
>   - action: input_datetime.set_datetime
>     target:
>       entity_id: input_datetime.zelt1_phasenstart
>     data:
>       date: "{{ now().date() }}"
> ```

## YAML-Referenz

Vollständige Beispiele: [`examples/zelt-mittel.yaml`](examples/zelt-mittel.yaml) (reales GROWCTRL-Setup), [`examples/dwc.yaml`](examples/dwc.yaml) und [`examples/soil.yaml`](examples/soil.yaml).

| Option | Typ | Standard | Beschreibung |
|---|---|---|---|
| `name` | string | `Growzelt` | Titel der Karte |
| `mode` | `dwc` \| `soil` | `dwc` | Badge/Modus des Zelts (fest pro Karte) |
| `sparkline_hours` | number | `24` | Zeitfenster der Mini-Graphen |
| `climate.temperature` | entity | **Pflicht** | Lufttemperatur-Sensor |
| `climate.humidity` | entity | **Pflicht** | Luftfeuchte-Sensor |
| `climate.vpd` | entity | – | Fertiger VPD-Sensor; leer = Berechnung |
| `climate.leaf_offset` | number | `-2` | Blatttemperatur-Offset (K) für die Berechnung |
| `sensors[]` | Liste | `[]` | `entity`, optional `name`, `icon` |
| `stats[]` | Liste | `[]` | Status-Boxen: `entity`, optional `name`, `icon` |
| `controls[]` | Liste | `[]` | `entity`, optional `name`, `icon`, `confirm`, `group` |
| `light_schedule.entity` | entity | – | Licht-Entität für AN/AUS-Erkennung |
| `light_schedule.on_helper` | entity | – | `input_datetime` Einschaltzeit |
| `light_schedule.off_helper` | entity | – | `input_datetime` Ausschaltzeit (Seed/Veg) |
| `light_schedule.off_helper_bloom` | entity | – | `input_datetime` Ausschaltzeit Bloom/Flush |
| `settings[]` | Liste | `[]` | Gruppen `{title, items[]}`; Items: `entity`, optional `name`, `icon` |
| `expert.controls[]` | Liste | `[]` | Schalter im Experten-Modus (Bestätigung Standard an) |
| `expert.logs[]` | Liste | `[]` | Log-Anzeigen: `entity` (sensor/text/input_text), optional `name` |
| `grow.phase_helper` | entity | – | `input_select` mit aktueller Phase |
| `grow.phase_start_helper` | entity | – | `input_datetime` Phasenstart |
| `grow.grow_start_helper` | entity | – | `input_datetime` Growstart |
| `grow.phases[]` | Liste | Standardplan | `name` + `days`; Namen müssen zum input_select passen |
| `plants[]` | Liste | `[]` | siehe unten |
| `plants[].name` | string | – | Anzeigename |
| `plants[].strain` | string | – | Sorte/Genetik |
| `plants[].germination_helper` | entity | – | `input_datetime` Keimdatum |
| `plants[].germination_date` | string | – | Alternativ festes Datum `YYYY-MM-DD` |
| `plants[].sensors[]` | Liste | `[]` | Sensoren dieser Pflanze |
| `plants[].calendar` | entity | – | Kalender mit Ereignissen |

## VPD-Zonen

| Bereich (kPa) | Zone |
|---|---|
| < 0,4 | Zu niedrig |
| 0,4 – 0,8 | Steckling / frühe Veg |
| 0,8 – 1,2 | Vegetativ |
| 1,2 – 1,6 | Blüte |
| > 1,6 | Zu hoch |

Berechnung: `VPD = SVP(T_Luft + Offset) − SVP(T_Luft) · rF/100`, Magnus-Formel für SVP.

## Entwicklung

```bash
npm install
npm run typecheck   # TypeScript-Prüfung
npm run build       # erzeugt dist/growctrl-tent-card.js
```

## Lizenz

MIT

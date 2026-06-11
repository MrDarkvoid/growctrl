<!--
GROWCTRL – Log-Referenz
Zweck: Vollstaendige Referenz der Blueprint-Log-Formate. Definiert das Parser-Verhalten der Karten (cards/core) bis zur Abloesung durch Integrations-Events.
Version: 2.0.0-dev | Lizenz: MIT
Autor: MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
-->
# Log-Referenz – Hydro Automation System
## Beide Blueprints vollständig dokumentiert

---

## Aufbau eines Log-Eintrags

Jeder Log-Eintrag folgt immer demselben Schema:

```
YYYY-MM-DD HH:MM  EMOJI EREIGNIS  |  OVR-STATUS  |  IST-ZUSTÄNDE  |  SOLL-ZUSTÄNDE
```

### Bestandteile im Detail

| Segment | Beispiel | Bedeutung |
|---|---|---|
| Zeitstempel | `2024-03-15 14:00` | Wann der Eintrag geschrieben wurde |
| Ereignis | `💡 LIGHT → ON` | Was passiert ist (immer eindeutig erkennbar) |
| OVR-Status | `OVR=OFF` oder `OVRUNTIL=2024-03-15 14:10` | Override aktiv oder nicht |
| IST-Zustände | `IST L=on P=off F=n/a O2=on` | Tatsächliche Gerätezustände **nach** der Aktion |
| SOLL-Zustände | `SOLL L=ON P=OFF F=OFF O2=ON` | Was die Automation als Ziel berechnet hat |

**Abkürzungen IST/SOLL:**
`L` = Licht · `P` = Pumpe · `F` = Fan (Stations-Umluft) · `O2` = O₂-Versorgung
Wert `n/a` = Gerät nicht konfiguriert in dieser Station

---
---

# BLUEPRINT 1 – Hydro Station
### `input_text.hydro_log_[zelt]_[station]`

---

## 🟢 Normalbetrieb – Informationsmeldungen

---

### `🟢 AUTO ON`
```
2024-03-15 08:00 🟢 AUTO ON | OVR=OFF | IST L=off P=off F=n/a O2=on | SOLL L=ON P=OFF F=OFF O2=ON
```
**Auslöser:** Automatik-Schalter wurde auf AN gestellt  
**Bedeutung:** Die Automation startet. IST/SOLL zeigen den Zustand beim Einschalten.  
**Aktion erforderlich:** Keine. Normalfall beim Starten des Systems.  
**Folgemeldungen:** Kurz danach typischerweise `💡 LIGHT → ON` oder `💧 PUMP → ON`

---

### `🔴 AUTO OFF`
```
2024-03-15 22:00 🔴 AUTO OFF | OVR=OFF | IST L=on P=off F=n/a O2=on | SOLL L=ON P=OFF F=OFF O2=ON
```
**Auslöser:** Automatik-Schalter wurde auf AUS gestellt  
**Bedeutung:** Automation hält sofort an. Geräte bleiben im aktuellen Zustand.  
**Aktion erforderlich:** Keine, wenn manuell ausgeschaltet. Bei unerwartetem AUTO OFF → Prüfen ob ein Failsafe ausgelöst hat (dann steht vorher `🚨 FAILSAFE`)  
**Wichtig:** AUTO OFF durch Failsafe erscheint als `🚨 FAILSAFE ... → AUTO OFF`, nicht als dieses Ereignis.

---

### `🌱 STAGE → [Phase]`
```
2024-03-15 10:00 🌱 STAGE → Bloom | OVR=OFF | IST L=on P=on F=n/a O2=on | SOLL L=ON P=ON F=OFF O2=ON
```
**Auslöser:** Wachstumsphase wurde geändert  
**Mögliche Werte:** `Seedling` · `Veg` · `Bloom` · `Flush`  
**Bedeutung:** Reine Bestätigung der Phasenänderung. Die Automation verwendet ab jetzt die neuen Licht- und Pumpenzeiten.  
**Aktion erforderlich:** Keine. Kontrolliere, ob die SOLL-Werte für die neue Phase korrekt sind.

---

### `💡 LIGHT → ON`
```
2024-03-15 06:00 💡 LIGHT → ON | OVR=OFF | IST L=on P=off F=n/a O2=on | SOLL L=ON P=OFF F=OFF O2=ON
```
**Auslöser:** Licht wurde planmäßig eingeschaltet  
**Bedeutung:** Lichtzeit beginnt. `IST L=on` bestätigt erfolgreiche Schaltung.  
**Problem:** Wenn `IST L=off` obwohl der Eintrag `LIGHT → ON` zeigt → Gerät hat nicht reagiert (Timeout), Verbindungsproblem prüfen. Nach Grace-Period folgt dann `⚠️ MISMATCH`.

---

### `🌑 LIGHT → OFF`
```
2024-03-15 00:00 🌑 LIGHT → OFF | OVR=OFF | IST L=off P=on F=n/a O2=on | SOLL L=OFF P=ON F=OFF O2=ON
```
**Auslöser:** Licht wurde planmäßig ausgeschaltet  
**Bedeutung:** Dunkelphase beginnt.  
**Problem:** Wie bei `LIGHT → ON` – `IST L=on` nach diesem Eintrag deutet auf Geräteproblem hin.

---

### `💧 PUMP → ON`
```
2024-03-15 06:10 💧 PUMP → ON | OVR=OFF | IST L=on P=on F=n/a O2=on | SOLL L=ON P=ON F=OFF O2=ON
```
**Auslöser:** Pumpenzyklus hat die AN-Phase erreicht  
**Bedeutung:** Pumpe läuft jetzt. Erscheint regelmäßig je nach konfiguriertem Zyklus.  
**Frequenz:** Abhängig vom Zyklus, z.B. bei 15min/15min: 48× täglich

---

### `⏸️ PUMP → OFF`
```
2024-03-15 06:25 ⏸️ PUMP → OFF | OVR=OFF | IST L=on P=off F=n/a O2=on | SOLL L=ON P=OFF F=OFF O2=ON
```
**Auslöser:** Pumpenzyklus hat die AUS-Phase erreicht  
**Bedeutung:** Pumpe pausiert jetzt.

---

### `🫧 O2 → ON`
```
2024-03-15 08:01 🫧 O2 → ON | OVR=OFF | IST L=on P=off F=n/a O2=on | SOLL L=ON P=OFF F=OFF O2=ON
```
**Auslöser:** O₂-Versorgung war AUS und wurde beim Automationslauf eingeschaltet  
**Bedeutung:** Einmalige Meldung bei Inbetriebnahme oder nach Wiederanlauf. O₂ soll danach dauerhaft AN bleiben.  
**Problem:** Wenn diese Meldung häufig erscheint → O₂-Switch verliert regelmäßig die Verbindung oder wird extern abgeschaltet.

---

### `🌀 FAN → ON`
```
2024-03-15 08:01 🌀 FAN → ON | OVR=OFF | IST L=on P=off F=on O2=on | SOLL L=ON P=OFF F=ON O2=ON
```
**Auslöser:** Stations-Umluft war AUS und wurde eingeschaltet  
**Bedeutung:** Wie `O2 → ON` – einmalig bei Start oder Wiederanlauf.

---

### `✋ MANUAL OVERRIDE [X]min`
```
2024-03-15 14:30 ✋ MANUAL OVERRIDE 10min | OVRUNTIL=2024-03-15 14:40 | IST L=off P=on F=n/a O2=on | SOLL L=ON P=ON F=OFF O2=ON
```
**Auslöser:** Licht wurde manuell gegen den SOLL-Zustand geschaltet  
**Bedeutung:** Override ist jetzt aktiv bis zum angezeigten Zeitpunkt. Die Automation greift das Licht nicht an.  
**Erkennung:** Log enthält `OVRUNTIL=YYYY-MM-DD HH:MM` – dieser Marker wird für die Override-Logik ausgelesen.  
**Aktion erforderlich:** Keine. Üblich bei manuellem Eingriff für Kontrolle/Wartung.

---

### `✅ OVERRIDE END`
```
2024-03-15 14:40 ✅ OVERRIDE END | OVR=OFF | IST L=on P=on F=n/a O2=on | SOLL L=ON P=ON F=OFF O2=ON
```
**Auslöser:** Override-Zeitfenster abgelaufen  
**Bedeutung:** Automation übernimmt wieder die Lichtsteuerung. Erscheint einmalig im 60-Sekunden-Fenster nach Ablauf.

---

### `🔧 MAINTENANCE`
```
2024-03-15 11:00 🔧 MAINTENANCE | OVR=OFF | IST L=on P=off F=n/a O2=on | SOLL L=ON P=OFF F=OFF O2=ON
```
**Auslöser:** Maintenance-Schalter ist AN (Automation läuft durch, aber stoppt hier)  
**Bedeutung:** Wird bei jedem Automationslauf (jede Minute) geschrieben solange Maintenance aktiv ist.  
**Aktion erforderlich:** Maintenance-Schalter nach Wartung deaktivieren.

---

### `🧪 TESTMODE`
```
2024-03-15 11:00 🧪 TESTMODE | OVR=OFF | IST L=off P=off F=n/a O2=off | SOLL L=ON P=OFF F=OFF O2=ON
```
**Auslöser:** Testmode-Schalter ist AN  
**Bedeutung:** Keine Schaltaktionen werden ausgeführt. Nützlich um SOLL-Berechnungen zu prüfen.  
**Aktion erforderlich:** Testmode nach Test deaktivieren.

---

## 🚨 Fehler & Warnungen

---

### `⚠️ TIME INVALID`
```
2024-03-15 06:00 ⚠️ TIME INVALID | OVR=OFF | IST L=off P=off F=n/a O2=off | SOLL L=OFF P=n/a F=OFF O2=OFF
```
**Auslöser:** Mindestens einer der drei `input_datetime`-Helper ist nicht gesetzt (Wert `unknown` oder leer)  
**Bedeutung:** Die Automation kann keine Lichtzeiten berechnen und bricht ab. **Keine Geräte werden geschaltet.**  
**Häufigkeit:** Bei erstem Start vor dem Einrichten, nach HA-Reset wenn Helper-Werte verloren gingen  
**Aktion erforderlich:** ⚠️ **Sofort** – Lichtzeiten in der Station-Konfiguration setzen:
- Licht AN-Zeit
- Licht AUS Seedling/Veg
- Licht AUS Bloom/Flush

---

### `🚨 FAILSAFE LIGHT → AUTO OFF`
```
2024-03-15 18:00 🚨 FAILSAFE LIGHT → AUTO OFF | OVR=OFF | IST L=off P=off F=n/a O2=on | SOLL L=ON P=ON F=OFF O2=ON
```
**Auslöser:** Licht war länger als `max_light_on_minutes` (Standard: 1440 min) ununterbrochen AN  
**Bedeutung:** Sicherheitsabschaltung ausgelöst. Licht wurde zwangsweise AUS geschaltet. **Automatik wurde deaktiviert.**  
**Konsequenz:** Station läuft nicht mehr automatisch – manuelle Intervention nötig  
**Aktion erforderlich:** 🚨 **Kritisch**
1. Ursache prüfen: War die Lichtzeit falsch konfiguriert? Hat der AUS-Zeitpunkt nicht ausgelöst?
2. Lichtzeiten überprüfen und ggf. korrigieren
3. Automatik manuell wieder einschalten

---

### `🚨 FAILSAFE PUMP → AUTO OFF`
```
2024-03-15 14:00 🚨 FAILSAFE PUMP → AUTO OFF | OVR=OFF | IST L=on P=off F=n/a O2=on | SOLL L=ON P=ON F=OFF O2=ON
```
**Auslöser:** Pumpe war länger als `max_pump_on_minutes` (Standard: 180 min) ununterbrochen AN  
**Bedeutung:** Pumpe wurde zwangsweise abgeschaltet, Automatik deaktiviert. Schutz vor Trockenlauf oder Überhitzung.  
**Aktion erforderlich:** 🚨 **Kritisch**
1. Pumpe und Wasserstand prüfen
2. Pumpenprofil überprüfen (ist das AN-Intervall realistisch?)
3. Automatik erst wieder einschalten nach Ursachenklärung

---

### `⚠️ MISMATCH`
```
2024-03-15 06:02 ⚠️ MISMATCH | OVR=OFF | IST L=off P=off F=n/a O2=on | SOLL L=ON P=OFF F=OFF O2=ON
```
**Auslöser:** Ein Gerät weicht nach der konfigurierten Grace-Period (Standard: 90 s) vom SOLL ab  
**Bedeutung:** Die Automation hat versucht zu schalten, aber das Gerät hat nicht reagiert (oder wurde extern zurückgesetzt).  
**Frequenz:** Erscheint einmalig im 60-Sekunden-Fenster pro Abweichungsereignis – kein Dauerspam  
**Betroffene Geräte erkennbar:** IST vs. SOLL vergleichen – welcher Wert weicht ab?
- `IST L=off` aber `SOLL L=ON` → Licht reagiert nicht
- `IST P=on` aber `SOLL P=OFF` → Pumpe lässt sich nicht abschalten
- `IST O2=off` aber `SOLL O2=ON` → O₂-Pumpe ausgefallen  

**Aktion erforderlich:** ⚠️ **Mittelfristig** – Gerät prüfen, Verbindung/Zigbee-Qualität checken. Keine automatische Abschaltung – Automation versucht beim nächsten Lauf erneut zu schalten.

---
---

# BLUEPRINT 2 – Hydro Zelt Klima
### `input_text.hydro_climate_log_[zelt]`

---

## Log-Format Klima

```
YYYY-MM-DD HH:MM  IST CIRC=[Wert] HUM=[ON/OFF] REQ=[ON/OFF]  |  SOLL CIRC=[Wert] HUM=[ON/OFF(ZENTRAL-BLOCK)] REQ=[ON/OFF]  |  RH=[Wert]%  T=[Wert]°C  Target=[Wert]±[Toleranz]%
```

**Abkürzungen:**
`CIRC` = Umluft (Circulation) · `HUM` = Befeuchter (Humidifier) · `REQ` = Entfeuchter-Anforderung (Request)  
`MANUAL` = Umluft ist im manuellen Modus konfiguriert

---

## 🟢 Normalbetrieb – Informationsmeldungen

---

### `🔴 AUTO OFF`
```
2024-03-15 22:00 🔴 AUTO OFF
```
**Auslöser:** Klima-Automatik-Schalter wurde auf AUS gestellt  
**Bedeutung:** Klima-Automation stoppt. Keine weiteren Schaltaktionen.

---

### Heartbeat / Statuslog (kein festes Prefix)
```
2024-03-15 14:15 IST CIRC=on HUM=OFF REQ=OFF | SOLL CIRC=ON HUM=OFF REQ=OFF | RH=58.2% T=24.1°C Target=60±3%
```
**Auslöser:** Regulärer Heartbeat alle X Minuten (konfigurierbar, Standard: 15 min) oder Zustandsänderung von HUM/REQ  
**Bedeutung:** Normaler Betriebsstatus. Alles im grünen Bereich wenn IST = SOLL.  
**Erkennung Normalzustand:** `HUM=OFF REQ=OFF` bei RH zwischen `Target-Toleranz` und `Target+Toleranz`  
**Heartbeat deaktiviert:** Wenn `log_heartbeat_minutes = 0`, erscheinen nur noch Änderungs- und Fehlermeldungen

---

### Befeuchter eingeschaltet
```
2024-03-15 09:30 IST CIRC=on HUM=ON REQ=OFF | SOLL CIRC=ON HUM=ON REQ=OFF | RH=54.1% T=23.8°C Target=60±3%
```
**Auslöser:** RH fiel unter `Zielwert − Toleranz` (hier: < 57 %) und Mindest-AUS-Zeit war erfüllt  
**Erkennung:** `HUM=OFF` → `HUM=ON` im Vergleich zum vorherigen Eintrag  
**Normaler Vorgang bei:** RH unter Schwellwert + Temp über Mindestgrenze + keine Zentral-Blockade

---

### Befeuchter ausgeschaltet
```
2024-03-15 09:45 IST CIRC=on HUM=OFF REQ=OFF | SOLL CIRC=ON HUM=OFF REQ=OFF | RH=61.8% T=24.0°C Target=60±3%
```
**Auslöser:** RH stieg über `Zielwert − Toleranz` und Mindest-EIN-Zeit war erfüllt  
**Erkennung:** `HUM=ON` → `HUM=OFF`

---

### Entfeuchter-Request gesetzt
```
2024-03-15 16:00 IST CIRC=on HUM=OFF REQ=ON | SOLL CIRC=ON HUM=OFF REQ=ON | RH=67.4% T=24.5°C Target=60±3%
```
**Auslöser:** RH stieg über `Zielwert + Toleranz` (hier: > 63 %) + Temp über Mindestgrenze  
**Erkennung:** `REQ=OFF` → `REQ=ON`  
**Bedeutung:** Der `input_boolean.hydro_dehum_request_[zelt]` wurde auf AN gesetzt. Eine separate Aggregations-Automation entscheidet, ob der zentrale Entfeuchter läuft.

---

### Entfeuchter-Request zurückgesetzt
```
2024-03-15 16:25 IST CIRC=on HUM=OFF REQ=OFF | SOLL CIRC=ON HUM=OFF REQ=OFF | RH=59.9% T=24.3°C Target=60±3%
```
**Auslöser:** RH fiel unter `Zielwert + Toleranz`  
**Erkennung:** `REQ=ON` → `REQ=OFF`

---

### Befeuchter durch Zentral-Blockade gesperrt
```
2024-03-15 16:05 IST CIRC=on HUM=OFF REQ=ON | SOLL CIRC=ON HUM=OFF(ZENTRAL-BLOCK) REQ=ON | RH=54.0% T=24.5°C Target=60±3%
```
**Auslöser:** RH wäre niedrig genug für Befeuchter, aber der zentrale Entfeuchter läuft gerade  
**Erkennung:** `SOLL HUM=OFF(ZENTRAL-BLOCK)` – der Zusatz `(ZENTRAL-BLOCK)` unterscheidet diesen Fall von normalem HUM=OFF  
**Bedeutung:** Korrekte Schutzfunktion bei `allow_parallel = false`. Befeuchter und Entfeuchter laufen nicht gleichzeitig.

---

### `🔧 MAINTENANCE`
```
2024-03-15 11:00 🔧 MAINTENANCE
```
**Auslöser:** Maintenance-Schalter ist AN

---

### `🧪 TESTMODE`
```
2024-03-15 11:00 🧪 TESTMODE
```
**Auslöser:** Testmode-Schalter ist AN

---

## 🚨 Fehler & Warnungen

---

### `⚠️ SENSOR INVALID → HUM OFF / REQ OFF / CIRC ON`
```
2024-03-15 03:00 ⚠️ SENSOR INVALID → HUM OFF / REQ OFF / CIRC ON
```
**Auslöser:** Temperatur- oder Luftfeuchte-Sensor liefert `unknown`, `unavailable` oder leeren Wert  
**Bedeutung:** Sicherheitsabschaltung: Befeuchter AUS + Request AUS + Umluft AN erzwungen  
**Konsequenz:** Klima-Regelung ist bis zur Sensor-Wiederherstellung vollständig außer Betrieb  
**Aktion erforderlich:** 🚨 **Kritisch**
1. Sensor-Batterie prüfen (bei Zigbee/Z-Wave Sensoren)
2. Sensor-Verbindung prüfen (Linkqualität, Reichweite)
3. HA Developer Tools → States → Sensor-Entity prüfen ob Wert vorhanden
4. Nach Sensor-Wiederherstellung: Automation läuft beim nächsten Trigger automatisch wieder an

---

---

# Schnellreferenz: Meldungs-Klassifikation

## Station-Blueprint

| Emoji | Meldung | Typ | Aktion nötig? |
|---|---|---|---|
| 🟢 | `AUTO ON` | Info | Nein |
| 🔴 | `AUTO OFF` | Info | Nein (außer unerwartet) |
| 🌱 | `STAGE → [Phase]` | Info | Nein |
| 💡 | `LIGHT → ON` | Info | Nein |
| 🌑 | `LIGHT → OFF` | Info | Nein |
| 💧 | `PUMP → ON` | Info | Nein |
| ⏸️ | `PUMP → OFF` | Info | Nein |
| 🫧 | `O2 → ON` | Info | Nein (häufig = Geräteproblem) |
| 🌀 | `FAN → ON` | Info | Nein (häufig = Geräteproblem) |
| ✋ | `MANUAL OVERRIDE` | Info | Nein |
| ✅ | `OVERRIDE END` | Info | Nein |
| 🔧 | `MAINTENANCE` | Info | Schalter vergessen? |
| 🧪 | `TESTMODE` | Info | Schalter vergessen? |
| ⚠️ | `TIME INVALID` | **Fehler** | ✅ Ja – Zeiten konfigurieren |
| ⚠️ | `MISMATCH` | **Warnung** | ⚠️ Gerät/Verbindung prüfen |
| 🚨 | `FAILSAFE LIGHT` | **Kritisch** | 🚨 Sofort – Lichtzeiten prüfen |
| 🚨 | `FAILSAFE PUMP` | **Kritisch** | 🚨 Sofort – Pumpe/Wasser prüfen |

## Klima-Blueprint

| Meldung / Erkennung | Typ | Aktion nötig? |
|---|---|---|
| Heartbeat (kein Prefix) | Info | Nein |
| `HUM=OFF→ON` | Info | Nein |
| `HUM=ON→OFF` | Info | Nein |
| `REQ=OFF→ON` | Info | Nein |
| `REQ=ON→OFF` | Info | Nein |
| `HUM=OFF(ZENTRAL-BLOCK)` | Info | Nein (Schutzfunktion) |
| `🔧 MAINTENANCE` | Info | Schalter vergessen? |
| `🧪 TESTMODE` | Info | Schalter vergessen? |
| `🔴 AUTO OFF` | Info | Nein (außer unerwartet) |
| `⚠️ SENSOR INVALID` | **Kritisch** | 🚨 Sofort – Sensor prüfen |

---

# Template: Log auswerten in HA

## Fehlererkennung per Template-Sensor (für Benachrichtigungen)

Der folgende Template-Code prüft alle Station-Logs und Klima-Logs auf kritische Meldungen.
Kann als `binary_sensor` in einer `template:`-Sektion oder als Trigger in einer Benachrichtigungs-Automation genutzt werden.

```yaml
# Prüft ob irgendein Log eine kritische Meldung enthält
# True = mindestens ein Fehler aktiv
template:
  - binary_sensor:
      - name: "Hydro Fehler aktiv"
        unique_id: hydro_any_error_active
        icon: mdi:alert-circle
        state: >
          {% set logs = [
            states('input_text.hydro_log_klein_anzucht1'),
            states('input_text.hydro_log_klein_anzucht2'),
            states('input_text.hydro_log_mittel_main1'),
            states('input_text.hydro_log_mittel_main2'),
            states('input_text.hydro_log_gross_main1'),
            states('input_text.hydro_log_gross_main2'),
            states('input_text.hydro_log_gross_main3'),
            states('input_text.hydro_log_gross_main4'),
            states('input_text.hydro_climate_log_klein'),
            states('input_text.hydro_climate_log_mittel'),
            states('input_text.hydro_climate_log_gross')
          ] %}
          {% set critical_keywords = ['🚨 FAILSAFE', '⚠️ TIME INVALID', '⚠️ SENSOR INVALID', '⚠️ MISMATCH'] %}
          {{ logs | select('search', '🚨|TIME INVALID|SENSOR INVALID|MISMATCH') | list | count > 0 }}
```

## Fehler-Klassifikation per Template

```yaml
# Gibt den Schweregrad des schlimmsten aktiven Fehlers zurück
# Werte: "ok" | "warning" | "critical"
template:
  - sensor:
      - name: "Hydro Fehlerstufe"
        unique_id: hydro_error_level
        state: >
          {% set logs = [
            states('input_text.hydro_log_klein_anzucht1'),
            states('input_text.hydro_log_klein_anzucht2'),
            states('input_text.hydro_log_mittel_main1'),
            states('input_text.hydro_log_mittel_main2'),
            states('input_text.hydro_log_gross_main1'),
            states('input_text.hydro_log_gross_main2'),
            states('input_text.hydro_log_gross_main3'),
            states('input_text.hydro_log_gross_main4'),
            states('input_text.hydro_climate_log_klein'),
            states('input_text.hydro_climate_log_mittel'),
            states('input_text.hydro_climate_log_gross')
          ] %}
          {% if logs | select('search', '🚨|TIME INVALID|SENSOR INVALID') | list | count > 0 %}
            critical
          {% elif logs | select('search', 'MISMATCH') | list | count > 0 %}
            warning
          {% elif logs | select('search', 'MAINTENANCE|TESTMODE') | list | count > 0 %}
            info
          {% else %}
            ok
          {% endif %}
```

## Fehlende Automatik erkennen (AUTO OFF bei aktiver Stunde)

```yaml
# Prüft ob ein Stations-Auto-Boolean AUS ist, obwohl er laufen sollte
# Nützlich für tägliche Checks – "Hat ein Failsafe die Automatik abgeschaltet?"
template:
  - binary_sensor:
      - name: "Hydro Automatik ausgefallen"
        unique_id: hydro_auto_killed
        state: >
          {% set autos = [
            states('input_boolean.hydro_auto_klein_anzucht1'),
            states('input_boolean.hydro_auto_klein_anzucht2'),
            states('input_boolean.hydro_auto_mittel_main1'),
            states('input_boolean.hydro_auto_mittel_main2'),
            states('input_boolean.hydro_auto_gross_main1'),
            states('input_boolean.hydro_auto_gross_main2'),
            states('input_boolean.hydro_auto_gross_main3'),
            states('input_boolean.hydro_auto_gross_main4')
          ] %}
          {{ 'off' in autos }}
```

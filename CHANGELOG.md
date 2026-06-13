# Changelog – GROWCTRL

## [3.3.1] — Live-Test-Feinschliff (v6) + Integration: Lichtplan-Gate

### Karten
- Hero/Tent: VPD-Zonenbalken jetzt **Blau · Hellgrün · Dunkelgrün · Gelb-orange · Rot**
  (zu feucht / Seedling / Veg / Bloom / zu trocken).
- Hero: KPI-Label "LUFTFEUCHTE" läuft nicht mehr aus der Kachel (Laufweite + Umbruchschutz).
- Tent: **Phase ist jetzt ein Dropdown** (Modus VPD/RH bleibt als Chips, Zelt/Klima als Schalter).
- Station: Licht-Zeile zeigt nur noch die **Dauer** ("1 h 2 min") statt eines doppelten Satzes;
  bei ausgeschaltetem Licht erscheint **"Licht ausgeschaltet"**.
- Station: Pflanzen-Kopf zeigt Name und Genetik in **einer Zeile** ("Pflanze 1 · Northern Lights").
- Station: **pH/EC** ohne Icon-Doppelung (nur Textlabel).
- Station: **+/−-Stepper** liegen nicht mehr im darunterliegenden Diagramm (Ausrichtung + Abstand).

### Editoren
- **Sensoren je Pflanze** (Station- und Plants-Karte) sind jetzt eine echte Unterliste mit
  **eigenem Anzeigenamen pro Sensor** statt namenloser Mehrfachauswahl.

### Integration
- **Licht-Restzeit** wird auf 0 gesetzt und als "Licht ausgeschaltet" gemeldet, sobald das
  Zelt-Gate (zelt_aktiv) **aus** ist ODER die Stations-Automatik **aus** ist – vorher lief die
  Berechnung dauerhaft weiter.

## [3.3.0] — Komplettes v6-Redesign aller Karten ("Soft Garden")

Alle Karten wurden 1:1 auf den v6-Entwurf gebracht. Fundament + jede Karte neu.

### Fundament (theme.ts = exakter v6-CSS-Port)
- Komplettes v6-Komponenten-CSS portiert (Tokens, Radien, Schatten, Typo).
- **`* { box-sizing: border-box }`** global -> behebt Out-of-Bounds-Ueberlaeufe
  (Inhalte rechnen Padding in die Breite ein statt darueber hinaus).
- CSS-Reset-Spezifitaet gesenkt (`.gc { all: unset }`), damit alle Button-
  Komponenten (.supply/.dd/.act/.event/.lrow/.kpi/.tgl/.stepbtn) ihr Layout behalten.
- Status-Ampel (ok/warn/crit) ist **zelt-unabhaengig**; nur der Akzent (--gc-accent)
  traegt die Zelt-Identitaet (Klein gruen / Mittel weinrot / Gross violett).

### Karten auf v6-Markup umgestellt
- **Checkup**: jetzt echte **Matrix** (Stationen x Licht/Pumpe/Klima/Status mit
  Ampelpunkten) statt Zeilenliste. Neues Schema: `tent` + `stations[]` + `show_tent_row`.
- **Station**: Kopf mit `.icbtn`/`.chip-auto`, Versorgungszeilen mit `.bar`, pH/EC als
  echte v6-Zonenbalken (`.zones` + Ideal-Label), Ereignis/Einstellungen im v6-Stil.
- **Hero**: Badge-Icon, `.tgl`-Schalter, Klima-KPIs, VPD-Zonenbalken, Stationszeilen,
  Informationssystem als Ereignis-Liste.
- **Tent/Klima**: v6-Kopf, KPIs, VPD-Zonenbalken, Modus-/Phasen-Chips, Chart, Ereignis.
- **Status**: v6-Log-Zeilen (Zeit · Quelle · Klartext, farbcodiert).
- **Tank**: vertikaler v6-Tank mit Mindestlinie + grossem Wert.
- **Metric**: grosser Wert + Sollbereich rechts + Verlauf mit Sollband.
- **Sensors**: v6-KPI-Raster; neues Feld **Akzentfarbe** je Sensor.
- **Controls**: v6-Aktor-Raster; neues Feld **Art** (Licht/Heizung/Wasser/O2/Luefter/Pumpe).
- **History**: v6-Kopf + Chart + v6-Legende. **Plants**: v6-Panels.

### GUI-Editoren
- Checkup-, Sensors- und Controls-Editor an die neuen Schemata angepasst.
- Pflanzen-Editor: zusaetzliche **weitere Sensoren** je Pflanze (als Felder).

### Diagnose
- Konsolen-Banner: `GROWCTRL Cards v3.3.0`.

## [3.2.0] — Pflanzen-Messwerte dediziert (GUI) + setzbar

### Stations-Karte & GUI-Editor
- **Vier dedizierte Felder je Pflanze** im GUI-Editor: **Temperatur**, **Feuchtigkeit**,
  **pH**, **EC** – jede beliebige Entity waehlbar (Sensor *oder* `number`/`input_number`).
- Darstellung wie im Design-Preview: **Temp & Feuchte als Mini-Verlauf**, **pH & EC als
  Zonen-Balken** (Ideal/akzeptiert/schlecht) mit sinnvollen Standard-Bereichen
  (pH 5.8–6.3, EC 1.2–2.2; per YAML `ph_ideal`/`ec_ideal` anpassbar).
- Ist das gewaehlte Entity ein `input_number`/`number`, erscheint ein **−/＋-Stepper** zum
  Setzen direkt in der Pflanze (Handmessungen ohne Sonde eintragen).
- **Aktoren-Builder im GUI-Editor**: das 4er-Aktor-Raster (Licht/Pumpe/O₂/Lüfter/Heizmatte/
  Befeuchter) laesst sich jetzt klickbar konfigurieren, inklusive Bestaetigung.
- Erweiterte `sensors: [...]`-Liste bleibt fuer Spezialfaelle (YAML) erhalten.

### Diagnose
- Konsolen-Banner: `GROWCTRL Cards v3.2.0`.

## [3.1.2] — Render-Crash bei deaktiviertem Zelt behoben

### Fix
- **Karten stürzten beim Rendern ab** (`TypeError: can't access property "bg"`),
  sobald ein Zelt **deaktiviert** war: die Zelt-Karte setzte den Status `none`,
  für den es in `STATUS_PILL` keinen Eintrag gab → die ganze Karte (und damit Teile
  des Dashboards) brach ab. Behoben durch einen neutralen `none`-Eintrag („Inaktiv",
  grau) und abgesicherte Zugriffe in Hero-, Checkup- und Status-Karte.
- Das Konsolen-Banner meldet jetzt `GROWCTRL Cards v3.1.2`.

## [3.1.1] — Pflanzen-Werte setzbar + Diagnose

### Stations-Karte · Pflanzen-Sensoren
- **Setzbare Werte:** Ist ein Sensor ein `number` oder `input_number` (z. B. manuell
  gemessener pH/EC/Temperatur), erscheint im Pflanzen-Block ein **−/＋-Stepper** zum
  direkten Setzen (Schrittweite aus dem Entity oder `step:`), plus ✎-Hinweis. `sensor`
  bleibt schreibgeschützt (nur Anzeige).
- Jeder Sensor (Temp, pH, EC, …) ist ein eigener, sauberer Block – kein gequetschtes
  „EC 0 PH 0" mehr.

### Diagnose
- Das Konsolen-Banner zeigt jetzt die tatsächlich geladene Bundle-Version
  (`GROWCTRL Cards v3.1.1`) – so lässt sich ein veraltetes, zwischengespeichertes
  Bundle sofort erkennen.

## [3.1.0] — Design „Soft Garden“ (Release)

### Komplettes Karten-Redesign
- Neues Design-System **„Soft Garden“** in `cards/core/theme.ts`: warmes Schwarzgrün,
  weiche Schatten, runde Radien (22/15 px), Tabellenziffern, freundliche Schrift-Stacks.
  Eine zentrale Stelle reskint **alle** Karten konsistent.
- **Ein Akzent je Zelt** über `style.accent` (Klein grün · Mittel weinrot · Groß violett);
  Status- und Sonderfarben (Heizmatte orange, Befeuchter blau) bleiben themenunabhängig.
- Geteilte Komponenten neu: Versorgungszeile, Phasen-Dropdown, 4er-Aktor-Raster,
  Pflanzen-Panel, Sensor-Indikatoren – als wiederverwendbare Klassen.

### Stations-Karte
- Phasen-Chips → **Dropdown über die volle Breite** (mit Richtwert-Hinweis).
- Licht, **Pumpe**, **DLI** und **Tank** jetzt einheitlich als **Versorgungszeilen** voller
  Breite. **DLI-Fix:** Fortschrittsbalken zum Tagesziel + Marker für die Prognose (vorher
  gequetschte Drei-Spalten-Leiste).
- Neues, optionales **Aktor-Raster** (`actuators:`), fest 4 nebeneinander.
- Pflanzen-Sensoren als einheitliche `.ind`-Blöcke; je Sensor optional `color`/`icon`.

### Barrierefreiheit & Robustheit
- 44-px-Touchziele, sichtbare Fokus-Ringe, `prefers-reduced-motion`, Farbe nie alleiniger
  Informationsträger.
- Verfolgbarkeits-Fingerprint (`4d72…766f6964`) in Integration und Karten bestätigt; an jedem
  Chart-SVG als `data-gce`.

### Doku & Lizenz
- Haupt-`README` neu (erklärt die Integration vollständig), beide Karten-READMEs angeglichen.
- `LICENSE`: vollständige englische Fassung aller Klauseln + Traceability-Abschnitt ergänzt.
- Neu: `docs/vibe_coding.md` (Funktion, Umfang, Prompt-Spezifikation).

---

## [3.0.0-dev]

### BREAKING
- **`growctrl-plants-card` entfernt.** Migration: Pflanzen als `plants:` in der
  Stations-Karte konfigurieren (Tabs) - Karteninstanzen vom Dashboard löschen,
  sonst erscheint „Custom element doesn't exist“

### PC-Chart-Fix („sehen aus wie scheiße“ - berechtigt)
- Charts rendern jetzt in der **echten Containerbreite** (ResizeObserver) statt
  einer fixen 300-px-viewBox mit `preserveAspectRatio: none` - auf breiten
  Monitoren wurden Text und Kurven horizontal verzerrt, mobil passte es zufällig

### Stations-Karte
- **Sensor-Anzeigemodi je Pflanze:** Kachel, **Zonen-Balken** für pH/EC
  (ideal/akzeptiert/schlecht, gleiche Sprache wie der Hero-VPD-Balken) und
  **Mini-Graph** (24h-Sparkline, z.B. Temperatur)
- **Stations-Tank:** `tank_entity`/`tank_min`/`tank_volume` als Füllstands-Zeile
  mit Liter-Anzeige; Tank je Pflanze bleibt
- Alter-KPI samt Option entfernt (lebt als Chip im Pflanzen-Panel)
- **Ereignisfeld** am Kartenfuß: gestaltetes Textfeld mit Icon/Label/Chevron,
  jetzt Standard AN (`show_event: false` zum Ausblenden)

## [2.9.0-dev]

### Fixes aus dem fünften Live-Test (Screenshot-Markierungen)
- **„Warum wird alles als Warnung angezeigt?“ gelöst:** `schweregrad` am
  „Letztes Ereignis“-Sensor war der SCHLECHTESTE Level des ganzen Verlaufs -
  dadurch erbte „Umluft AN“ die Warnfarbe einer älteren Meldung. Jetzt:
  `schweregrad` = letzter Eintrag, `schweregrad_verlauf` = Historie-Ampel
- **Hero-Logo:** Fallback-Sprout-Badge statt kaputtem Bild (auch bei Ladefehler);
  Anleitung für `/local/growctrl/logo.png` im Karten-README
- **Charts entwaschen:** dezentere Verlaufsfüllung, kräftigere Linie, hellere
  und größere Achsen, sichtbareres Grid; Metric-Karte: Wert kollidiert nicht
  mehr mit der Y-Achse

### Pflanzen im Mittelpunkt
- **Pflanzen-Panel gross & hübsch:** 64-px-Bild/Sprout-Badge, Alters-Chip
  (Doppelanzeige „4 Tage · Tag 5“ entfernt), antippbare 22-px-Sensor-Kacheln
- **Tank je Pflanze:** `tank_entity`/`tank_min` mit Füllstands-Balken und
  Mindeststand-Markierung (rot + NACHFÜLLEN unter der Schwelle)
- Karten-Reduktion dokumentiert: empfohlenes Set Hero + Station(+Tabs) + Status;
  Plants-Karte als Legacy markiert, EC/PH-Einzelkarten entfallen

## [2.8.0-dev]

### Fixes aus dem vierten Live-Test
- **Sensor-Timeout endlich einstellbar:** Die Zelt-Number „Sensor-Timeout
  (eingefroren nach)“ (5–120 min, Standard 30) fehlte - der v2.6-Patch hatte
  still nicht gegriffen. Eingebaut und verifiziert (Konfiguration-Bereich des Zelts)
- **Klima-Schalter bleibt beim Zelt-Deaktivieren bewusst erhalten:** Aktoren gehen
  aus, die Automatik-Einstellung nicht - beim Reaktivieren läuft das Klima sofort
  weiter. Mit Protokoll-Einträgen „Klima pausiert“ / „läuft weiter“
- Patch-Disziplin: alle Codeänderungen laufen jetzt mit Anker-Verifikation

### Karten
- **Pflanzen-Tabs in der Stations-Karte:** Hero + Station decken das Tagesgeschäft
  ab - pro Pflanze Tab mit Name, Sorte, Alter, eigenen Sensoren und Bild
- Karten-Zweitrepo: README aktualisiert (11 Karten) und auf **GC-SAL 1.0** umgestellt

## [2.7.0-dev]

### Fixes aus dem dritten Live-Test
- **Licht-Restzeit-Sensor wieder verfügbar:** die neuen Attribute griffen auf ein
  nicht existierendes Feld zu (`rt.times`) - dadurch crashte der State-Write und
  riss die frisch hinzugekommenen Sensoren der Plattform gleich mit. Jetzt werden
  die echten Runtime-Felder genutzt und die Attribute sind crashsicher gekapselt
- **Klima-Schalter zeigt Zelt-AUS sofort an:** alle GROWCTRL-Entitäten (auch
  Switches/Selects) folgen jetzt dem Regelzyklus-Signal - Controller-Änderungen
  erscheinen ohne Verzögerung in der UI

### Karten-Designpass
- Hero-Informationssystem meldet nur noch Warnungen/Fehler („Licht AN“ ist keine
  Warnung mehr); Status-Pille entsprechend; Groß-/Kleinschreibungs-Fix für den
  neuen „OK/Problem“-Status
- Hero: 24h-Chart ist opt-in (`show_chart: true`) - der VPD-Zonen-Balken führt
- Station: Alter-KPI (`show_age`) und Ereigniszeile (`show_event`) sind jetzt
  Optionen mit Standard AUS; das Alter zeigt die Pflanzen-Karte („Wo 2 · Tag 3“)
- Typografie: größere Mindestschriften, hellere Sekundärtexte, lesbarere
  Chart-Achsen; KPI-Kacheln mit einheitlicher Höhe (Symmetrie)

### Lizenz & Herkunft
- **Lizenzwechsel:** MIT → GROWCTRL Source-Available License (GC-SAL 1.0) -
  privat/nicht-kommerziell frei mit Namensnennung, alles Weitere nur mit
  Zustimmung; Anleitung in `docs/lizenz.md`
- Dezente Herkunfts-Signatur in Integration und Karten-Bundle

## [2.6.0-dev]

### Fixes aus dem zweiten Live-Test
- **Stations-Options-Flow 500er behoben:** fehlender `CONF_POWER_SENSOR`-Import in
  `config_flow.py` (NameError); neuer Test ruft die Flow-Schemas jetzt wirklich auf
- **Zelt AUS = wirklich aus:** Gate schaltet zusätzlich O₂ + Lüfter ab und setzt den
  Klima-Automatik-Schalter mit auf AUS (inkl. Log-Eintrag)
- **Stationen reagieren sofort auf Zelt-Schaltungen** (kick_stations statt Minutentakt)
- **24-h-Phasen-Hinweis statt Fehlempfehlung:** „Tag 4: laut Richtwert noch 'Seedling'
  (bis Tag 14)“, wenn die Phase manuell vorgezogen wurde - kein Rückwechsel-Zwang
- **Sensor-Timeout konfigurierbar** (Zelt-Number, Standard 30 min statt 15)
- **Umlaute** in allen Entitätsnamen und Log-Texten (IDs bleiben sauber slugifiziert)

### Integration
- Alter-Sensor: Einheit „Tage“ + Wochen-Attribute (`woche`, `tag_in_woche`, `text_wochen`)
- Licht-Restzeit: Attribute `zustand`/`text`/`anteil` („Licht an für 5 h 40 min“)
- Neue Diagnose-Sensoren: Pumpe gesperrt (Füllstand), Licht ohne Leistung,
  Klima-Sensoren eingefroren
- Entitäten getrennt in Steuerung / Konfiguration / Diagnose (EntityCategory)

### Karten
- Stations-Karte: **Licht-Balken** (Lampe mit Glow, Klartext, Restzeit-Balken gelb/blaugrau),
  Alter-Format-Option, neue Problem-Badges
- Hero: **VPD-Zonen-Balken** mit Sollband-Rahmen und Ist-Marker
- Charts im Apex-Stil: weiche Kurven, Gradient-Füllung, Endpunkt-Glow
- Mehr Kontrast: kräftigere Ränder + tiefere Schatten
- **Live-Vorschau im Kartenwähler** (Demo-Daten, `preview: true`)

## [2.5.0-dev]

### Fixes aus dem ersten Live-Test
- **24-h-Licht:** AN == AUS (z.B. 12:00 → 12:00) bedeutet jetzt Dauerlicht statt „aus"
- **Sofortige Reaktion:** Regelzyklus läuft direkt beim Start UND unmittelbar nach jeder
  Nutzeraktion (Automatik/Zelt/Klima/Phase) — kein Warten mehr auf den Minutentakt
- **Lückenloses Protokoll:** Zelt deaktivieren/aktivieren, Klima an/aus, Phasenwechsel und
  das Zelt-Gate („Station gestoppt") erscheinen jetzt als Ereignisse; Logs sind **persistent**
- **Status-Sensor:** Zustand jetzt `OK`/`Problem`; repräsentiert die gesammelte Problemlage
  des Zelts inkl. aller Stationen (Attribut `probleme`)
- **Phasen-Sollwerte sortiert:** „1 Seedling · …" bis „4 Trocknung · …" + als Konfigurations-
  Entitäten gruppiert (eigener Bereich auf der Geräteseite)

### Karten
- **Umbenennungssichere Auflösung:** Entitäten werden über die `growctrl_*`-Attribute gefunden —
  funktioniert auch mit Area-Präfixen wie `keller_zimmer_…` (Reihenfolge: overrides → Registry → abgeleitete ID)
- **Echte Dropdowns:** Zelt und Station im Editor auswählbar (aus der Integration gelesen)
- **Mobil entzerrt:** KPI-Raster 4→2 Spalten, kompaktere Kacheln/Paddings unter 480 px
- Ereignisprotokoll: Filter „Nur Warnungen/Fehler"

### Neue Schutz- & Auswertungsfunktionen
- **Sensor-Stale-Erkennung** (15 min unverändert → sicherer Klima-Zustand)
- **Trockenlauf-Schutz** (Pumpensperre unter „Füllstand Minimum")
- **Bedarfs-Bewässerung Erde** (Pumpzyklen nur unter Bodenfeuchte-Schwelle)
- **Leistungs-Plausibilität** (optionaler Watt-Sensor: Licht AN ohne Leistung → Critical)
- **Watchdog** „Letzte Regelung" je Station/Zelt + Automation-Vorlage
- **„Zeit im Sollband heute"** (% der Klima-Laufzeit im Phasen-Soll)
- **Options Flow:** Aktoren/Sensoren nachträglich ändern ohne Neuanlegen
- **CI:** GitHub Actions mit pytest, tsc/Build, hassfest und HACS-Validierung

## [2.4.0-dev]

### Integration
- **Manuelle Übernahme:** Handschaltungen werden erkannt und für eine konfigurierbare Zeit
  respektiert (Number „Manuelle Übernahme" je Station, Default 60 min, 0 = sofort zurück);
  danach kehrt die Automatik zum Lichtplan zurück
- **Klima folgt der Phase:** Sollwerte (VPD min/max, RH min/max) je Phase als Number-Entities
  (Seedling/Veg/Bloom/Trocknung; Flush nutzt Bloom); Select „Klima-Phase" mit **Auto** =
  führende Stations-Phase; VPD-Sensor zeigt `phase_effektiv` + `sollwerte`
- **Testmodus entfernt** — Wartung deckt den Anwendungsfall ab
- Menü-Texte des Config Flows korrigiert (DLI ist Stations-Funktion)

### Karten (integrations-nativ, v2.4)
- **Station, Zelt, Hero, Ereignisprotokoll von Grund auf neu**: Entity-IDs werden automatisch
  aus Zelt-/Stationsnamen abgeleitet (`overrides:` für Abweichungen) — keine Legacy-Helfer mehr
- Station: Auto-Pill + Wartungs-Icon, Phasen-Chips schalten das Select, KPI-Reihe
  (Licht/Pumpe/DLI mit Ziel/Alter mit Empfehlung), Ereigniszeile, Problem-Badges, Zahnrad-Einstellungen
- Zelt: Modus-/Phasen-Chips, Sollband-Chart der effektiven Phase, Problemliste
- Ereignisprotokoll liest die `verlauf`-Attribute der Letztes-Ereignis-Sensoren

### Doku
- README (Root + cards) komplett neu strukturiert; Tabellen für Entitäten, Erkennungen,
  Failsafes; `docs/testplan.md` (kompletter Test-Leitfaden);
  `examples/zelt_gross_komplett.yaml` (fertige View für ein Zelt inkl. Stationen)

## [2.3.0-dev]

### Geändert (Feedback)
- **DLI in die Station verlegt:** Lux-Sensor wird je Station konfiguriert (darf zwischen
  Stationen geteilt sein, mehrere Sensoren pro Zelt möglich); „DLI heute" + „DLI Prognose"
  sind jetzt Stations-Sensoren. Die **Prognose nutzt den konfigurierten Lichtplan der
  Station** (AN-Zeit + phasenabhängige AUS-Zeit, inkl. Mitternachtsüberlauf) — die
  Zelt-Number „Lichtstunden/Tag" entfällt ersatzlos
- Lux→PPFD-Faktor ist jetzt eine Stations-Number (nur sichtbar mit Lichtsensor)

### Hinzugefügt (Informationssystem)
- **Ereignis-Sensor „Letztes Ereignis"** je Station UND je Zelt: Klartext-Zustand,
  Attribut `verlauf` (letzte 30 Einträge mit Zeit + Schweregrad), Attribut `schweregrad`
  — damit haben Status-/Checkup-Bewertungen eine echte Quelle aus der Integration
- Alle Schaltvorgänge/Fehler landen zusätzlich im HA-Systemprotokoll (Logger `growctrl`)
- Checkup-Karte: neuer Zeilentyp **„Ereignis-Sensor"** liest die neuen Sensoren direkt
- `docs/informationssystem.md`: alle Fehlererkennungen, Failsafe-Maßnahmen und Log-Kanäle

### Phase 4
- `docs/migration.md`: Mapping-Tabelle Legacy→Integration, Parallelbetrieb je Station,
  Rollback, Karten-Umstellung, Release-Checkliste; Roadmap im README aktualisiert

## [2.2.0-dev]

### Integration
- **Zelt als eigener Entry-Typ:** Menü „Zelt anlegen / Station anlegen"; Stationen wählen ihr Zelt im Dropdown
- **Zelt-Master:** „Zelt aktiv" stoppt alle Stationen; „Klima-Automatik" separat zuschaltbar
- **Klima VPD- ODER RH-geführt** (Select „Klima-Modus"), Sollwerte als Number-Entities, Hysterese gegen Flattern, Befeuchter/Entfeuchter nie gleichzeitig, Abluft-Boost
- **DLI automatisch aus Lux** (TSL2591 o.ä.): Sensoren „DLI heute" + „DLI Prognose" (Lux→PPFD-Faktor und Lichtstunden/Tag konfigurierbar)
- **Geteilte Lichter:** derselbe Licht-Switch in mehreren Stationen erlaubt — ODER-Koordination
- **Informationssystem:** binary_sensors je Station (Manueller Eingriff, Licht-Failsafe „Licht lief zu lange", Lichtzeiten unvollständig) + zeltweiter Status-Sensor mit Problemliste
- **Keimstart** als date-Entity → Sensoren „Alter seit Keimung" und „Phasen-Empfehlung" (generische Richtwerte, sortenabhängig)
- **Aufgabenliste (ToDo) je Zelt**, Phasen-Empfehlungen landen automatisch als Aufgabe
- **Neue Phase „Trocknung"** (nach Spülen): Licht + Pumpe aus, Umluft bleibt an

### Karten (jetzt 11)
- **NEU Hero-Karte:** Logo, globale Schalter (Zelt/Klima), Klima-KPIs, VPD-24h-Chart mit Sollband, Informationssystem mit Problemliste
- **NEU Checkup-Karte:** eine Ampel-Zeile je Zelt/Station mit Klartext-Auswertung
- **NEU Tank-Karte:** DWC-Füllstand mit animiertem Tank, Mindeststand-Linie, Liter-Anzeige
- **NEU History-Karte:** 24h-Mehrserien-Diagramm (z.B. Temp + RH) mit Grid, Achsenwerten, Legende
- **NEU Metric-Karte:** EC/pH groß mit Chart, Sollband und „zu hoch/zu niedrig"-Ampel
- **Controls v3:** Icon-zentrierte Touch-Kacheln im Vivosun-Stil — keine separate Schalter-Pille mehr
- Ausklapper „Konfiguration"/„Experte" durch dezente Icon-Buttons im Header ersetzt
- Plants-Karte: **Kamera-Livebild** (10s-Refresh, Klick → Stream) oder statisches Bild je Pflanze
- Phase „Trocknung" überall (Chips, Farben)

### Branding
- Logo ins Repo übernommen; brands-PR-Paket vorbereitet (`docs/brands/…`), Anleitung in `docs/branding.md`

## [2.1.0-dev] – 2026-06-11 · Große Reorganisation (Phase 0–1)

### Hinzugefügt (Design-Refresh v2.1)
- **Modernes Karten-Design v2:** neue Typo-Hierarchie, weiche Radien, dezente Borders, mehr Luft
- **Status-Ampel auf Kartenebene:** Karten bekommen bei Warnung/Fehler farbigen Rahmen + Glow –
  „einmal raufgucken und sehen, dass alles in Ordnung ist" (Checkup-Prinzip)
- **Stil pro Karte konfigurierbar** (`style:`): Hintergrund (Farbe/Gradient/CSS), Deckkraft 0–1,
  Glas-Effekt (Blur), Akzentfarbe, Eckenradius – in allen 6 GUI-Editoren als Sektion „Stil"
- **Systemtypen DWC/Erde (Station-Karte):** `system: dwc` → EC/pH/Wassertemperatur/Füllstand,
  `system: soil` → Bodenfeuchte/-temperatur/EC/pH; je Wert Sollbereich (min/max) mit Ampelfarbe,
  Verletzungen färben Kachel + Kartenrahmen; vollständig im GUI-Editor
- **Sensors-Karte:** Flächen-Sparkline, großer Wert + Einheit, optionaler Sollbereich je Sensor (Ampel)
- **Controls-Karte:** Kacheln mit Icon + animierter Schalter-Pille
- **Integration:** Config Flow um Systemtyp (Generisch/DWC/Erde) + optionale System-Sensoren erweitert;
  `strings.json` + `translations/en.json` ergänzt (Härtung); Manifest 2.1.0;
  Installations-Troubleshooting im README

### Hinzugefügt (HACS + GUI-Editoren)
- **Integration HACS-installierbar:** `hacs.json` im Repo-Root – Monorepo = HACS-Repo Kategorie *Integration*
  (Zwei-Repo-Strategie: `growctrl-cards` bleibt Kategorie *Dashboard*); README-Installationsabschnitt neu
- **Vollständige GUI-Editoren für alle 6 Karten** (`*/editor.ts` + `core/editor-base.ts`):
  ha-form-basiert, generischer Listen-Editor (Zeilen hinzufügen/entfernen) für Logs, Aktoren, Sensoren,
  Pflanzen und Experten-Schalter; Station-Editor erhält YAML-`overrides`/`templates` beim Speichern
- Plants-Karte akzeptiert Sensoren jetzt auch als reine Entity-Liste (GUI-Mehrfachauswahl)

### Hinzugefügt (Phase 3 – Skeleton)
- Integrations-Konzept (`docs/integration_konzept.md`): 1 Config Entry = 1 Station, Pflicht- vs.
  optionale Entitäten, Events statt input_text, Migrationspfad
- `custom_components/growctrl/`: manifest, Config Flow (Zelt/Station + Entity-Zuordnung),
  Controller-Loop (1 min), Plattformen switch/select/time/number/sensor, translations (de)
- `logic.py`: reine Steuerlogik (Lichtfenster inkl. Mitternachtsüberlauf, Pumpen-Modulo-Zyklus,
  Restzeiten, Failsafe) – **10/10 pytest grün** (`tests/test_logic.py`)
- Strukturell gelöst: Issues #1/#1b (Switch-Listen vollständig), #2 (Snapshot vor Service-Call),
  #4 (optionale Entitäten nur bei Zuordnung)
- Karten-Test-Beispiele mit echten Entity-IDs: `cards/examples/` (Installationsanleitung + 2 Views)
- v1.3-Tent-Card vollständig archiviert: `legacy/tent-card-v1/`
- Offen (vor Produktivbetrieb): Options-Flow, Klima-Entry-Typ, Manual-Override,
  Failsafe-Anbindung im Controller, Lauf in echter HA-Instanz

### Hinzugefügt (Phase 2)
- Karten-Cluster implementiert: `cards/core` (types, format, vpd, loglang, resolver, data, theme, base-card)
  + 6 Karten (tent, station, controls, sensors, plants, status) als EIN Bundle `dist/growctrl-cards.js`
- Entity-Resolver mit Rollen-Geltungsbereich Zelt/Station/Pflanze: explizit > Profil-Namensschema (`hydro_*`,
  via `templates` überschreibbar) > Integration (Phase 3); fehlende Rollen blenden Features stumm aus
- Genau EINE VPD-Implementierung (Magnus, Issue #5 ✅) und EIN Log-Übersetzer (Issue #6 ✅) in `cards/core`
- HACS-Zweitrepo-Vorlage `growctrl-cards` (Bundle + hacs.json + README)
- Hinweis: GUI-Editoren folgen; Konfiguration zunächst per YAML (Beispiele in `cards/README.md`)

### Hinzugefügt
- Monorepo-Struktur: `assets/ cards/ custom_components/ docs/ firmware/ legacy/`
- Einheitliche Kopfblöcke (Projekt, Zweck, Bezug, Version, Autor MrDarkvoid + Claude, MIT) in allen Dateien
- `docs/phase0_bestandsaufnahme.md`: vollständiges Inventar + Issue-Liste (#1–#8)
- `docs/architektur_notizen.md`: korrigiertes Architekturbild (HA = Steuerzentrale, Hardware-agnostisch)
- README mit Logo, Mermaid-Architektur, Installations- und Roadmap-Abschnitt
- LICENSE (MIT), CONTRIBUTING, .gitignore
- ESPHome-Firmware (Relay Board v4, Sensor Node v4) und Logo ins Repo aufgenommen

### Geändert
- Alle Dateinamen vereinheitlicht (lowercase, ASCII: `gross` statt `groß`)
- Dashboard-Raw-Config: CRLF → LF normalisiert, als `button_card_templates.yaml` übernommen
- Firmware: hartkodierte Fallback-AP-Passwörter durch `!secret ap_fallback_password` ersetzt (Issue #7 ✅)

### Unverändert (bewusst)
- Inhaltliche Logik der Legacy-Packages/-Blueprints – bekannte Bugs bleiben dokumentierte Issues
  (#1, #1b, #2, #3, #4, #5, #6, #8) und werden in Phase 2/3 strukturell gelöst.

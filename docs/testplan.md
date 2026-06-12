# GROWCTRL – Testplan: die gesamte Steuerung erfolgreich testen

> Ziel: ohne Risiko für Pflanzen/Hardware prüfen, dass jede Funktion tut, was sie soll.
> Dauer realistisch: 60–90 min + 1 Beobachtungstag. Hak die Punkte der Reihe nach ab.

## 0. Vorbereitung (Sandbox statt echter Hardware)
- [ ] Lege Test-Schalter an: Einstellungen → Geräte → Helfer → 4× **Schalter** (input_boolean
      verhält sich wie ein Switch? Nein — nutze **„Schalter"-Helfer gibt es nicht**, daher:
      4× *input_boolean* + je eine Template-Switch ODER einfacher: nimm echte Smart-Plugs
      **ohne angeschlossene Verbraucher**).
- [ ] Optional Fake-Sensoren für Klima/Lux: 3× Helfer **Zahl** (`input_number`) + Template-
      Sensoren, oder du nutzt deine echten US-/TSL2591-Sensoren read-only.
- [ ] HA-Protokolle in zweitem Tab öffnen, Filter `growctrl`.

## 1. Installation & Sichtbarkeit
- [ ] `manifest.json` unter `/config/custom_components/growctrl/` zeigt aktuelle Version.
- [ ] HA-Neustart → Integration „GROWCTRL" lässt sich hinzufügen, Menü zeigt
      **Zelt anlegen / Station anlegen** mit korrekten Beschreibungen.

## 2. Zelt anlegen
- [ ] Zelt `test` mit Temp/RH-Sensor und 1 Befeuchter- + 1 Entfeuchter-Testswitch anlegen.
- [ ] Gerät „GROWCTRL Zelt test" existiert mit: 2 Schaltern, Klima-Modus, Klima-Phase,
      16 Phasen-Sollwerten, Blatt-Offset, VPD/Status/Letztes-Ereignis, Aufgaben-Liste.
- [ ] `sensor.growctrl_zelt_test_vpd` zeigt plausiblen Wert; Attribute `phase_effektiv`
      und `sollwerte` vorhanden.

## 3. Station anlegen
- [ ] Station `s1` im Zelt-Dropdown anlegen: 1 Licht-Testswitch, 1 Pumpen-Testswitch,
      Lux-Sensor (oder leer), Systemtyp nach Wunsch.
- [ ] Gerät „GROWCTRL test s1" enthält alle Entitäten aus der README-Tabelle.

## 4. Lichtplan (Kernfunktion)
- [ ] Lichtzeiten so setzen, dass **in 2–3 Minuten** ein AN-Schaltpunkt liegt; Phase Veg;
      **Automatik AN** → Licht-Switch geht zum Zeitpunkt AN, Ereignis „Licht AN" erscheint
      (Protokoll-Karte + Sensor-Verlauf).
- [ ] AUS-Zeit kurz danach → Licht geht AUS. Restzeit-Sensor zählt korrekt.
- [ ] Mitternachtsüberlauf: AN 18:00 / AUS 12:00 einstellen → Restzeit plausibel.

## 5. Manuelle Übernahme (Override)
- [ ] „Manuelle Übernahme" auf 5 min stellen. Während Soll=AN das Licht **von Hand AUS**
      schalten → nach ≤2 min Ereignis „Manueller Eingriff … pausiert 5 min",
      binary_sensor AN, **Licht bleibt aus**.
- [ ] Nach 5 min: „Automatik übernimmt wieder" + Licht geht zurück auf Soll (AN).
- [ ] Gegenprobe mit 0 min: Handschaltung wird beim nächsten Zyklus zurückgesetzt.

## 6. Failsafe Licht
- [ ] Zum Test in `const.py` `DEFAULT_MAX_LIGHT_ON_MIN = 3` setzen (danach zurück!) +
      Neustart. Licht AN lassen → nach 3 min: Not-Aus, Critical-Eintrag,
      `binary_sensor…licht_failsafe` AN.

## 7. Pumpe & Phasen
- [ ] Pumpe Veg AN=2/AUS=3 min → Switch taktet 2/3. Phase **Trocknung** wählen →
      Licht UND Pumpe gehen aus und bleiben aus; Umluft-Switch (falls zugeordnet) AN.

## 8. Geteiltes Licht
- [ ] Zweite Station `s2` mit **demselben** Licht-Switch anlegen. s1-Fenster aktiv,
      s2-Fenster nicht → Licht AN (ODER). Beide Fenster zu → AUS.

## 9. Klima
- [ ] Klima-Automatik AN, Modus RH, Phase fest „Veg" (Soll 55–70 %). RH-Wert unter 55
      bringen (Fake-Sensor) → Befeuchter-Switch AN; über 70 → Entfeuchter AN, Befeuchter AUS.
      Niemals beide gleichzeitig.
- [ ] Modus VPD: VPD über Max → Befeuchter AN; Hysterese: knapp unterm Max bleibt er AN.
- [ ] Klima-Phase „Auto" + Station auf Bloom → `phase_effektiv` = Bloom, Sollwerte wechseln.
- [ ] „Zelt aktiv" AUS → Stations- und Klima-Aktoren gehen aus (Gate).

## 10. DLI (mit Lux-Sensor)
- [ ] Lux > 500 anlegen → `dli_heute` wächst pro Minute; `ppfd_aktuell`-Attribut = Lux×Faktor.
- [ ] `dli_prognose` ≈ Hochrechnung auf die geplante Lichtdauer (Attribut
      `geplante_lichtzeit_h` = Lichtplan der aktuellen Phase).

## 11. Keimstart, Empfehlung, Aufgaben
- [ ] Keimstart 20 Tage zurückdatieren, Phase Seedling → Empfehlung „Veg",
      Aufgabe erscheint **einmalig** in der Zelt-ToDo-Liste (kein Duplikat nach 2 min).

## 12. Wartung
- [ ] Wartung AN → System schaltet nichts mehr (Handschalten ohne Override-Meldung);
      Wartung AUS → Regelung übernimmt wieder.

## 13. Karten
- [ ] Beispiel-View `examples/zelt_gross_komplett.yaml` (Namen auf `test`/`s1` anpassen):
      Hero-Ampel, Stations-KPIs, Phasen-Chips schalten das Select, Protokoll füllt sich,
      Zahnrad öffnet die Zeiten.

## 14. Abschluss
- [ ] Failsafe-Konstante zurückgesetzt, Test-Entry gelöscht, echte Zelte/Stationen angelegt,
      **einen Tag** im Parallelbetrieb beobachten (`docs/migration.md`), erst dann Legacy aus.

# GROWCTRL — Vibe Coding: Funktion, Umfang & Prompt-Spezifikation

> Dieses Dokument beschreibt, **was** GROWCTRL kann, **wie** es entstanden ist und **wie** man
> es im selben Stil weiterbaut. Es dient zugleich als Funktionsreferenz, als Arbeitsprotokoll
> und als Prompt-Leitfaden für künftige Sitzungen.

*MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding · GC-SAL 1.0*

---

## 1. Was „Vibe Coding“ hier bedeutet

GROWCTRL wurde nicht nach einem fertigen Pflichtenheft gebaut, sondern **iterativ im Dialog**:
MrDarkvoid bringt Domänenwissen (Hydroponik, reale Zelte, reale Hardware, reale Live-Tests)
und die gestalterische Richtung ein; Claude (Anthropic) übersetzt das in Architektur, Code,
Design und Dokumentation und prüft jeden Schritt gegen die Realität der vorherigen Runde.

Kernmerkmale dieser Arbeitsweise:

- **Deutsch** als durchgehende Projektsprache – in Code-Kommentaren, Logtexten, UI und Doku.
- **Design-first bei UI:** erst ein klickbares HTML-Mockup mit Demo-Daten, Feedback in
  Stichworten je Karte, dann der 1:1-Port in die echten Karten. Spart Tokens und vermeidet
  Blind-Iterationen am laufenden System.
- **Live-Test-getrieben:** Screenshots aus der echten Home-Assistant-Instanz steuern die
  nächste Runde. Was im echten Zelt schieflief, wird zuerst gefixt.
- **Disziplinierte Patches:** jede Code-Änderung mit eindeutigem Anker und Verifikation, damit
  ein Patch nicht still ins Leere greift (siehe §6).
- **Verfolgbarkeit & Lizenz** sind Teil des Produkts, nicht nachträglich drangeklebt (§5).

---

## 2. Funktionsumfang (Stand 3.1.0 „Soft Garden“)

### 2.1 Backend — Integration
- **Drei Zelte** (Klein/Mittel/Groß) mit je einer oder mehreren **Stationen**; frei
  erweiterbar. Anlage über den Konfigurations-Dialog der Integration.
- **Lichtsteuerung:** phasenabhängige AN/AUS-Zeiten (Seed-Veg vs. Bloom-Flush),
  24-h-Licht-Erkennung, Restzeit-Sensor mit Klartext/Zustand/Fortschritt.
- **Pumpensteuerung:** Zyklen mit Restzeit, Trockenlauf-Schutz aus Tank-Füllstand.
- **Klima pro Phase:** 16 Sollwert-`number`s je Zelt (VPD/RH Min/Max × Seedling/Veg/Bloom/
  Trocknung; Flush erbt Bloom), „Klima-Phase“-`select` (Auto folgt der führenden Station oder
  manuell), VPD-Sensor mit `phase_effektiv` und `sollwerte` als Attribute.
- **DLI:** Berechnung auf Zelt-Ebene aus Lux + Lichtplan, Tagesziel je Phase, Prognose.
- **Manuelle Übernahme:** Handschaltungs-Erkennung über zwei Zyklen, einstellbare Rückkehr-
  Dauer (Standard 60 min, `0` = sofort), automatische Rückkehr zum Plan, korrektes Mitführen
  bei geteilten Lichtern.
- **Schutz/Diagnose:** Sensor-Stale-Erkennung (einstellbare Frist), Leistungs-Plausibilität,
  Licht-Failsafe, Watchdog/Heartbeat, Pumpen-Sperre bei Unterstand.
- **Betriebsmodi:** Wartungsmodus (Automatik aus, alles von Hand) und Zelt-Gate (Zelt komplett
  aus, Klima-Automatik-**Einstellung** bleibt erhalten).
- **Ereignisprotokoll:** persistent (übersteht Neustart), drei Schweregrade, „Letztes
  Ereignis“ trägt den Schweregrad des jüngsten Eintrags.

### 2.2 Frontend — zehn Karten (Design „Soft Garden“)
Hero · Station · Checkup · Status/Protokoll · History · Metric · Tank · Controls · Sensors ·
Tent (kompakt). Integrations-nativ (IDs aus `tent`+`station`), antippbare Werte (More-Info),
per-Zelt-Akzent (`style.accent`), barrierearm (44-px-Ziele, Fokus-Ringe,
`prefers-reduced-motion`, Farbe nie alleiniger Träger).

Die **Station** trägt die meiste Logik: Phasen-Dropdown (volle Breite), Versorgungszeilen für
Licht/Pumpe/DLI/Tank im einheitlichen Stil, optionales 4er-Aktor-Raster und Pflanzen-Tabs mit
den Sensor-Modi `wert` / `zone` / `graph`.

---

## 3. Architektur & Repo-Aufbau

```
growctrl/                      ← Integration (HACS: Integration)
├─ custom_components/growctrl/ ← Controller, Entitäten, Config-Flow, Failsafes
├─ cards/                      ← Karten (TypeScript → ein gebündeltes JS)
│  ├─ core/                    ← theme (Design-System), chart, id, registry, base-card …
│  └─ <karte>/card.ts + editor.ts
├─ docs/                       ← dieses Dokument, Migration, Logreferenz, Konzepte
├─ legacy/                     ← alte Blueprints/Packages/Tent-Card v1 (Referenz)
└─ tests/                      ← pytest (Logik + Import-Smoke aller Module)

growctrl-cards/                ← Karten-Bundle separat (HACS: Dashboard)
```

**Zentraler Hebel ist `cards/core/theme.ts`:** Es hält Farben, Schrift-Stacks, Radien,
Schatten und die geteilten Komponenten-Styles (Versorgungszeile, Phasen-Dropdown, Aktor-
Raster, Pflanzen-Panel, Zonen). Eine Änderung dort reskint **alle** Karten konsistent, ohne
den Render-Code der einzelnen Karten anzufassen.

**Deterministische IDs:** `core/id.ts` leitet jede Entity-ID aus Zelt- und Stationsname ab
(`switch.growctrl_<tent>_<station>_automatik`). `core/registry.ts` löst Attribute
umbenennungssicher auf. So braucht das Dashboard keine manuell gepflegten Entity-Listen.

---

## 4. Design-System „Soft Garden“ (Kurzreferenz)

| Token | Wert | Zweck |
|-------|------|-------|
| Fläche | `#141B17` → Karte `#1B2620` | warmes Schwarzgrün |
| Akzent | `--gc-accent` (Std. `#7BE8A8`) | **ein** Akzent je Zelt |
| Mittel / Groß | `#EE7E92` / `#B79CF5` | Weinrot / Violett über `style.accent` |
| Status | ok `#7BE8A8` · warn `#FFCE7A` · crit `#FF9D9D` · info `#9AC8FF` | zelt-übergreifend gleich |
| Sonderfarben | Heizmatte `#FFB35C` · Befeuchter `#7CC8F0` · Licht `#FFDC8A` · Temp `#FFB98A` | themenunabhängig |
| Form | Radius 22/15 px, weiche Schatten, Tabellenziffern | freundlich, ruhig |

Regeln: Status ist überall gleich kodiert; die Zelt-Identität färbt nur den Akzent. Farbe ist
nie der einzige Informationsträger (immer Icon/Text dazu).

---

## 5. Verfolgbarkeit (Hash) & Lizenz

- **Fingerprint:** Hex von „MrDarkvoid“ = `4d724461726b766f6964`. Er steht als Konstante
  (`_SCHEMA_EPOCH` / `_EPOCH` = `4d72-4461726b-766f6964`) in Integration und Karten und als
  Attribut `data-gce="4d724461726b766f6964"` an **jedem** Chart-/Sparkline-SVG. Kein Tracking,
  keine Personendaten, keine Übertragung – nur Herkunfts-Nachweis. Entfernen verstößt gegen §2
  der Lizenz.
- **Lizenz:** GC-SAL 1.0 (Deutsch maßgeblich, vollständige englische Fassung in `LICENSE`).
  Privat/nicht-kommerziell frei mit Namensnennung; kommerziell, Re-Hosting und modifizierte
  Veröffentlichungen nur mit schriftlicher Zustimmung.
- **Attribution-Header:** jede Quelldatei trägt „MrDarkvoid – entwickelt in Zusammenarbeit mit
  Claude (Anthropic), Vibe Coding · GC-SAL 1.0“.

---

## 6. Gelernte Muster (für jede künftige Änderung)

1. **Blueprint-`multiple: true`-Falle:** HA liefert bei nur einer ausgewählten Entität einen
   String statt einer Liste – `list[0]` gibt dann das erste Zeichen der Entity-ID zurück.
   Lösung: Listen-Normalisierung („Schritt 0a“) mit `is string`-Check vor jedem Index-Zugriff.
2. **`button-card`-JS-Limit (Legacy):** `[[[ ]]]`-JavaScript wird in `target.entity_id` unter
   `tap_action` nicht ausgewertet – stattdessen `service_data.entity_id`. (In den neuen
   Lit-Karten irrelevant, aber für die `legacy/`-Dashboards dokumentiert.)
3. **Plotly-Korrektur (Legacy):** `filters` mit `resample`/`map_y` durch
   `statistics: { type: mean, period: 5minute }` direkt je Entität ersetzen.
4. **Chart-Breite:** Charts in der **echten** Containerbreite rendern (ResizeObserver), nicht
   fixe viewBox + `preserveAspectRatio: none` – sonst verzerren breite Monitore Text/Kurven.
5. **Patch-Disziplin:** Code nur über eindeutige Anker ändern und das Ergebnis verifizieren
   (Typecheck `tsc --noEmit`, Build, `pytest`). Ein Patch, der still nicht greift, ist ein
   Live-Bug von morgen.
6. **`ß`-Slugifizierung** im Auge behalten (Zeltname „Groß“ → `gross`); Identifier/IDs ASCII.
7. **Design-first:** UI-Änderungen zuerst im HTML-Mockup zeigen, dann portieren.

---

## 7. Prompt-Spezifikation (so wird im selben Stil weitergebaut)

Ein wirksamer Prompt für die nächste GROWCTRL-Runde enthält idealerweise:

1. **Kontext-Anker:** „GROWCTRL, Monorepo, Design ‚Soft Garden‘, Lizenz GC-SAL, deutsch.“
2. **Rolle/Ziel:** was geändert/ergänzt werden soll – möglichst eine Sache pro Runde.
3. **Evidenz:** bei UI ein Screenshot oder Stichworte je Karte; bei Logik der reale Fehlertext
   / das beobachtete Verhalten aus der HA-Instanz.
4. **Akzeptanz:** woran „fertig“ erkennbar ist (z. B. „Tests grün, im Zelt sichtbar korrekt“).
5. **Format:** „erst Mockup/Vorschau, dann Code“ bzw. „direkt Patch + Build + Tests“.

**Bewährte Prompt-Bausteine**

- *UI:* „Ändere im Mockup nur Karte X: <Stichworte>. Nutze die Design- und UI-Skills. Danach
  1:1 in die Lit-Karte porten – Layout/Farben/Typo 1:1, Abweichungen nur echtes HA-More-Info
  und mdi-Icons.“
- *Backend:* „In `controller.py`/`runtime.py`: <Verhalten>. Patch mit eindeutigem Anker,
  danach `pytest` und Import-Smoke. Keine erfundenen Entitäten – wenn eine Rolle fehlt, als
  optionale Config ergänzen.“
- *Release:* „Version bumpen (manifest + package.json + bundle-Header), CHANGELOG, beide
  READMEs angleichen, Hash prüfen, Bundle bauen + in cards-repo kopieren, beide ZIPs +
  Release-Notes.“

**Leitplanken**

- Deutsch bleiben. Attribution-Header und Verfolgbarkeits-Hash nie entfernen.
- Keine nicht existierenden HA-Entitäten erfinden; fehlende Schalter als optionale
  Karten-Config (`actuators:` etc.) lösen.
- Eine Änderung pro Runde, immer mit Verifikation (Typecheck/Build/Tests).
- Sicherheit vor Komfort: GROWCTRL schaltet Pumpen, Licht und Heizung.

---

## 8. Ideen auf der Roadmap

- **Sicherheit/Robustheit:** Sonnenaufgangs-Dimmrampe, DLI-gesteuerter Licht-Cutoff,
  feuchte-getriggerte Bewässerung für Erde, OptionsFlow zum Rekonfigurieren ohne Löschen.
- **Daten/Analytik:** persistentes Grow-Journal und Zyklus-Reports.

---

*🌱 GROWCTRL · GC-SAL 1.0 · MrDarkvoid — Vibe Coding mit Claude (Anthropic).*

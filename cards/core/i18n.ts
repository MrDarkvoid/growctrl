/*==============================================================================
 * GROWCTRL – core/i18n
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Automatische Sprache nach Home-Assistant-Sprache. DEUTSCH ist die
 *           Quelle und der Standard (kann nie "fehlen"); Englisch kommt aus der
 *           EN-Map. Fehlt ein Eintrag, wird automatisch der deutsche Text gezeigt.
 *           -> Deutsch bleibt garantiert vollstaendig, Englisch ist additiv.
 * Version : 3.4.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

export type GcLang = "de" | "en";

/** HA-Sprache lesen; alles ausser "en*" => Deutsch. */
export const gcLang = (hass: any): GcLang => {
  const l = (hass?.locale?.language ?? hass?.language ?? "de").toString().toLowerCase();
  return l.startsWith("en") ? "en" : "de";
};

/** Deutsch -> Englisch. Schluessel = exakter deutscher Quelltext (Laufzeit). */
const EN: Record<string, string> = {
  // Status / Ampel
  "Alles OK": "All OK", "Warnung": "Warning", "Kritisch": "Critical", "Info": "Info",
  "Inaktiv": "Inactive", "Fehler": "Error", "Deaktiviert": "Disabled", "OK": "OK",
  "Alle Systeme arbeiten normal": "All systems operating normally", "Klima-Phase": "Climate phase",
  "an": "on", "aus": "off",
  // Phasen / Stages
  "Seedling": "Seedling", "Veg": "Veg", "Bloom": "Bloom", "Flush": "Flush",
  "Trocknung": "Drying", "Anzucht": "Propagation", "Wachstum": "Vegetative",
  "Blüte": "Flowering", "Ernte": "Harvest", "Spülen": "Flush", "automatisch": "automatic",
  "Auto": "Auto",
  // Zelt / Klima / Hero
  "Zelt": "Tent", "Klima": "Climate", "Logo": "Logo", "Luftfeuchte": "Humidity",
  "Temperatur": "Temperature", "zu feucht": "too humid", "zu trocken": "too dry",
  "Phase": "Phase", "Soll": "Target", "Informationssystem": "Information system",
  "Modus": "Mode",
  // Station
  "Automatik": "Automatic", "Einstellungen": "Settings", "Keimstart": "Germination",
  "Leuchtphase": "Light phase", "Licht AN": "Light ON", "Licht an": "Light on",
  "Licht aus": "Light off", "Licht ausgeschaltet": "Light switched off",
  "Licht ohne Leistung": "Light without power", "Licht-Failsafe": "Light failsafe",
  "Man. Übernahme": "Manual hold", "Manueller Eingriff": "Manual override",
  "Marker = Prognose": "Marker = forecast", "Nächster Zyklus": "Next cycle",
  "Pumpe aus": "Pump off", "Pumpe ausgeschaltet": "Pump switched off",
  "Pumpe gesperrt (Füllstand)": "Pump blocked (level)", "Pumpe läuft": "Pump running",
  "Tank": "Tank", "Feuchtigkeit": "Humidity", "DLI heute": "DLI today",
  "AUS Bloom": "OFF Bloom", "AUS Seed/Veg": "OFF Seed/Veg", "Unter Mindeststand": "Below minimum",
  "Wartung (System greift nicht ein)": "Maintenance (system inactive)",
  "verbleibend": "remaining", "Zyklus": "Cycle", "ideal": "ideal", "Min": "Min", "von": "of",
  "Zeiten unvollständig": "Times incomplete", "Wartung aktiv": "Maintenance active",
  "AN": "ON", "AUS": "OFF", "Richtwert": "Reference", "Prognose": "Forecast",
  "Aktoren": "Actuators", "weniger": "less", "mehr": "more",
  // Checkup
  "Checkup": "Checkup", "Stationen": "Stations", "Station": "Station",
  "Automatik AN": "Automatic ON", "Automatik AUS (manuell)": "Automatic OFF (manual)",
  "Kein Eingriff": "No override", "Klima-Automatik AN": "Climate automatic ON",
  "Klima-Automatik AUS": "Climate automatic OFF", "Licht AN ohne Leistung": "Light ON without power",
  "Licht-Failsafe ausgelöst": "Light failsafe tripped", "Lichtzeiten unvollständig": "Light times incomplete",
  "Manueller Eingriff aktiv": "Manual override active", "Problem erkannt": "Problem detected",
  "Wartungsmodus aktiv": "Maintenance mode active", "Zelt aktiv": "Tent active",
  "Zelt deaktiviert": "Tent disabled", "Zyklus läuft": "Cycle running",
  // Matrix-Kopf (Titel/Tooltip)
  "Pumpe": "Pump", "Licht": "Light", "Eingriff": "Override", "Status": "Status",
  "Aktiv": "Active",
  // Status-Karte
  "Ereignisprotokoll": "Event log", "Nur Infos": "Info only", "Noch keine Ereignisse": "No events yet",
  // Pflanzen
  "Pflanze": "Plant", "Sorte": "Strain", "Verlauf": "History",
  // Alters-/Zeiteinheiten
  "Tage": "days", "Tag": "Day", "Wo": "Wk", "Woche": "Week",
};

/** Uebersetzt einen deutschen Quelltext gemaess HA-Sprache (DE-Fallback). */
export const gcT = (hass: any, de: string): string =>
  gcLang(hass) === "en" ? (EN[de] ?? de) : de;

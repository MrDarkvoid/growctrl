/* Typdefinitionen: Karten-Konfiguration & minimale HA-Frontend-Typen */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  themes?: any;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<any>;
  callApi<T>(method: string, path: string, data?: Record<string, any>): Promise<T>;
  callWS<T>(msg: Record<string, any>): Promise<T>;
}

/* ---------- Konfiguration ---------- */

export interface SensorConfig {
  entity: string;
  name?: string;
  icon?: string;
}

export interface ControlConfig {
  entity: string;
  name?: string;
  icon?: string;
  /** true = Bestätigungsdialog vor dem Schalten (Standard für Pumpe/CO2-Erkennung, sonst false) */
  confirm?: boolean;
  /** Gruppen-Überschrift, z.B. "Licht · Direktschalten" – gleiche Gruppe = gleiches Raster */
  group?: string;
}

export interface StatConfig {
  entity: string;
  name?: string;
  icon?: string;
}

export interface SettingItem {
  entity: string;
  name?: string;
  icon?: string;
}

export interface SettingsGroup {
  title?: string;
  items?: SettingItem[];
}

export interface LogConfig {
  entity: string;
  name?: string;
}

export interface ExpertConfig {
  /** Schalter im Expertenmodus (Wartung, Test ...) – Bestätigung standardmäßig AN */
  controls?: ControlConfig[];
  /** Text-/Sensor-Entitäten mit Logzeilen */
  logs?: LogConfig[];
}

export interface LightScheduleConfig {
  /** Licht-Entität (für AN/AUS-Erkennung), optional */
  entity?: string;
  /** input_datetime: Einschaltzeit */
  on_helper?: string;
  /** input_datetime: Ausschaltzeit (Seed/Veg) */
  off_helper?: string;
  /** input_datetime: Ausschaltzeit in Blüte/Spülen (optional) */
  off_helper_bloom?: string;
  /** Sensor mit Restzeit in Minuten (z.B. *_licht_restzeit) */
  remaining_helper?: string;
}

export interface BadgeConfig {
  entity: string;
  name?: string;
  icon?: string;
}

export interface LogRowConfig {
  entity: string;
  name?: string;
  /** Format des Logs: 'station' (GROWCTRL Station), 'climate' (Klima), 'raw' (nur anzeigen) */
  kind?: 'station' | 'climate' | 'raw';
}

export interface PumpScheduleConfig {
  /** Pumpen-Schalter (optional, sonst Erkennung über log_helper) */
  entity?: string;
  /** Sensor mit Restzeit in Minuten (z.B. *_pumpe_restzeit) */
  remaining_helper?: string;
  /** Stations-Log (input_text) zur AN/AUS-Erkennung über "IST ... P=on" */
  log_helper?: string;
  on_seedling?: string;
  off_seedling?: string;
  on_veg?: string;
  off_veg?: string;
  on_bloom?: string;
  off_bloom?: string;
}

export interface StatusConfig {
  /** input_boolean: Entfeuchtungs-Anforderung (zeigt "Entfeuchter AN") */
  dehum_entity?: string;
  /** Temperatur-Warnung unterhalb (Standard 18) */
  temp_min?: number;
  /** Temperatur-Warnung oberhalb (Standard 30) */
  temp_max?: number;
}

export interface PhaseDef {
  name: string;
  /** geplante Dauer in Tagen */
  days: number;
}

export interface GrowConfig {
  /** input_select mit aktueller Phase */
  phase_helper?: string;
  /** input_datetime: Start der aktuellen Phase */
  phase_start_helper?: string;
  /** input_datetime: Start des gesamten Grows */
  grow_start_helper?: string;
  /** Phasen-Plan (Name + geplante Tage) für Fortschritt & Timeline */
  phases?: PhaseDef[];
}

export interface PlantConfig {
  name: string;
  strain?: string;
  /** input_datetime: Keimdatum */
  germination_helper?: string;
  /** alternativ festes Datum YYYY-MM-DD */
  germination_date?: string;
  sensors?: SensorConfig[];
  /** calendar-Entity mit Ereignissen (Topping, Umtopfen, ...) */
  calendar?: string;
}

export interface ClimateConfig {
  temperature: string;
  humidity: string;
  /** optionaler fertiger VPD-Sensor; wenn leer wird berechnet */
  vpd?: string;
  /** Blatttemperatur-Offset in K für die VPD-Berechnung (Standard -2) */
  leaf_offset?: number;
}

export type TentMode = 'dwc' | 'soil';

export interface TentCardConfig {
  type: string;
  name?: string;
  mode?: TentMode;
  climate?: ClimateConfig;
  /** Header-Badges (erscheinen, wenn Entität "on" ist) */
  badges?: BadgeConfig[];
  /** Status-Boxen unter dem Hero (Leistung, Status-Texte ...) */
  stats?: StatConfig[];
  /** Automatische Status-Ampel ("Alles OK" / Warnung / Fehler) */
  status?: StatusConfig;
  /** Übersetzte Live-Logzeilen (Klima/Station) */
  logs?: LogRowConfig[];
  /** Zelt-Sensoren (EC, pH, Wassertemp, Füllstand, Licht, CO2 ...) */
  sensors?: SensorConfig[];
  /** Aktoren (Licht, Pumpe, Lüfter, CO2, Heizmatte ...) */
  controls?: ControlConfig[];
  /** Licht-Zeitplan für den Laufzeitbalken im Hero */
  light_schedule?: LightScheduleConfig;
  /** Pumpen-Zeitplan für den Zyklusbalken im Hero */
  pump_schedule?: PumpScheduleConfig;
  grow?: GrowConfig;
  /** Konfigurations-Sektion: Helper-Kacheln (Lichtzeiten, Pumpenzeiten ...) */
  settings?: SettingsGroup[];
  plants?: PlantConfig[];
  /** Experten-Modus: Wartungs-/Test-Schalter und Logs */
  expert?: ExpertConfig;
  /** Zeitfenster der Sparklines in Stunden (Standard 24) */
  sparkline_hours?: number;
  /** Temp/Feuchte-Verlaufsdiagramm anzeigen (Standard an) */
  show_chart?: boolean;
  /** Zeitfenster des Diagramms in Stunden (Standard 24) */
  chart_hours?: number;
}

/* Standard-Phasenplan, wenn nichts konfiguriert ist */
export const DEFAULT_PHASES: PhaseDef[] = [
  { name: 'Keimung', days: 7 },
  { name: 'Steckling', days: 14 },
  { name: 'Vegetativ', days: 28 },
  { name: 'Blüte', days: 56 },
  { name: 'Spülen', days: 10 },
];

/*==============================================================================
 * GROWCTRL – core/types
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Gemeinsame Typen: HA-Minimal-Interface, Rollen, Karten-Konfigurationen.
 * Version : 2.0.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
}
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(domain: string, service: string, data?: any): Promise<any>;
  callApi<T>(method: string, path: string): Promise<T>;
  formatEntityState?(e: HassEntity): string;
}

/** Geltungsbereich einer Rolle: Zelt, Station oder Pflanze. */
export type Scope = "tent" | "station" | "plant";

/** Rollen, die der Resolver aus einem Profil ableiten kann (Helper-Ebene). */
export type Role =
  | "auto" | "stage" | "log" | "climate_log"
  | "light_on" | "light_off_sv" | "light_off_bloom"
  | "pump_on_seedling" | "pump_off_seedling"
  | "pump_on_veg" | "pump_off_veg"
  | "pump_on_bloom" | "pump_off_bloom"
  | "light_rest" | "pump_rest"
  | "maintenance" | "testmode" | "climate_auto" | "dehum_request";

export interface StationProfile {
  tent: string;          // z.B. "mittel"
  station: string;       // z.B. "main1"
  /** Hardware-Switches sind nie ableitbar -> immer explizit. */
  light_switch?: string;
  pump_switch?: string;
  o2_switch?: string;
  fan_switch?: string;
  /** Einzelne Rollen explizit ueberschreiben (gewinnt immer). */
  overrides?: Partial<Record<Role, string>>;
  /** Namensschema-Templates ueberschreiben ({tent}/{station} Platzhalter). */
  templates?: Partial<Record<Role, string>>;
}

export interface LogResult { level: "critical"|"warning"|"info"|"ok"|"none"; label: string; ts: string; }

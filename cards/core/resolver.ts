/*==============================================================================
 * GROWCTRL – core/entity-resolver
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Rollen->Entity-Aufloesung: explizit > Profil-Namensschema > (Phase 3: Integration-Device). Fehlende Rollen = Feature stumm aus.
 * Version : 2.0.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import type { HomeAssistant, Role, StationProfile } from "./types";

/** Default-Namensschema = heutiges hydro_*-Schema ({tent}/{station} Platzhalter). */
export const DEFAULT_TEMPLATES: Record<Role, string> = {
  auto:             "input_boolean.hydro_auto_{tent}_{station}",
  stage:            "input_select.hydro_stage_{tent}_{station}",
  log:              "input_text.hydro_log_{tent}_{station}",
  climate_log:      "input_text.hydro_climate_log_{tent}",
  light_on:         "input_datetime.hydro_light_on_{tent}_{station}",
  light_off_sv:     "input_datetime.hydro_light_off_sv_{tent}_{station}",
  light_off_bloom:  "input_datetime.hydro_light_off_bloom_{tent}_{station}",
  pump_on_seedling: "input_number.hydro_pump_on_seedling_{tent}_{station}",
  pump_off_seedling:"input_number.hydro_pump_off_seedling_{tent}_{station}",
  pump_on_veg:      "input_number.hydro_pump_on_veg_{tent}_{station}",
  pump_off_veg:     "input_number.hydro_pump_off_veg_{tent}_{station}",
  pump_on_bloom:    "input_number.hydro_pump_on_bloom_{tent}_{station}",
  pump_off_bloom:   "input_number.hydro_pump_off_bloom_{tent}_{station}",
  light_rest:       "sensor.{tent}_{station}_licht_restzeit",
  pump_rest:        "sensor.{tent}_{station}_pumpe_restzeit",
  maintenance:      "input_boolean.hydro_maintenance_{tent}",
  testmode:         "input_boolean.hydro_testmode_{tent}",
  climate_auto:     "input_boolean.hydro_climate_auto_{tent}",
  dehum_request:    "input_boolean.hydro_dehum_request_{tent}",
};

const fill = (tpl: string, p: StationProfile) =>
  tpl.replaceAll("{tent}", p.tent).replaceAll("{station}", p.station);

/**
 * Loest alle Rollen eines Stationsprofils auf.
 * Rueckgabe enthaelt nur Rollen, deren Entity in hass.states existiert
 * ODER explizit ueberschrieben wurde (Quelle A schlaegt B).
 */
export const resolveStation = (hass: HomeAssistant, p: StationProfile): Partial<Record<Role, string>> => {
  const out: Partial<Record<Role, string>> = {};
  (Object.keys(DEFAULT_TEMPLATES) as Role[]).forEach((role) => {
    const explicit = p.overrides?.[role];
    if (explicit) { out[role] = explicit; return; }
    const tpl = p.templates?.[role] ?? DEFAULT_TEMPLATES[role];
    const eid = fill(tpl, p);
    if (hass.states[eid]) out[role] = eid;   // fehlend = Feature aus (Issue #4 entschaerft)
  });
  return out;
};

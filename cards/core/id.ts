/*==============================================================================
 * GROWCTRL – core/id
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Leitet Entity-IDs der GROWCTRL-Integration deterministisch aus Zelt-/Stationsnamen ab (has_entity_name-Schema); overrides als Ausweich-Map.
 * Version : 2.4.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

export type GcOverrides = Record<string, string>;

/** HA-Slugify (vereinfacht, deckt deutsche Namen der Integration ab). */
export const gcSlug = (s: string) =>
  s.toLowerCase()
    .replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

/** Stations-Entity: <domain>.growctrl_<tent>_<station>_<suffix>. */
export const stEnt = (domain: string, tent: string, station: string,
                      suffix: string, o?: GcOverrides) =>
  o?.[suffix] ?? `${domain}.growctrl_${gcSlug(tent)}_${gcSlug(station)}_${suffix}`;

/** Zelt-Entity: <domain>.growctrl_zelt_<tent>_<suffix>. */
export const tentEnt = (domain: string, tent: string, suffix: string, o?: GcOverrides) =>
  o?.[suffix] ?? `${domain}.growctrl_zelt_${gcSlug(tent)}_${suffix}`;

/** Suffixe der Integrations-Entitaeten (Referenz fuer overrides:). */
export const ST = {
  auto: ["switch", "automatik", "auto"], wartung: ["switch", "wartung", "maintenance"],
  stage: ["select", "wachstumsphase", "stage"],
  lightOn: ["time", "licht_an", "light_on"],
  lightOffSv: ["time", "licht_aus_seedling_veg", "light_off_sv"],
  lightOffBloom: ["time", "licht_aus_bloom_flush", "light_off_bloom"],
  lightRest: ["sensor", "licht_restzeit", "light_rest"],
  pumpRest: ["sensor", "pumpe_restzeit", "pump_rest"],
  age: ["sensor", "alter_seit_keimung", "plant_age"],
  rec: ["sensor", "phasen_empfehlung", "stage_recommendation"],
  event: ["sensor", "letztes_ereignis", "last_event"],
  dli: ["sensor", "dli_heute", "dli_today"], dliFc: ["sensor", "dli_prognose", "dli_forecast"],
  germination: ["date", "keimstart", "germination"],
  overrideMin: ["number", "manuelle_ubernahme", "override_minutes"],
  pOverride: ["binary_sensor", "manueller_eingriff", "problem_override"],
  pFailsafe: ["binary_sensor", "licht_failsafe", "problem_light_failsafe"],
  pTime: ["binary_sensor", "lichtzeiten_unvollstandig", "problem_time_invalid"],
  pPump: ["binary_sensor", "pumpe_gesperrt_fullstand", "problem_pump_blocked"],
  pPower: ["binary_sensor", "licht_ohne_leistung", "problem_power"],
} as const;

export const TENT = {
  enabled: ["switch", "zelt_aktiv", "tent_enabled"],
  climate: ["switch", "klima_automatik", "climate_enabled"],
  mode: ["select", "klima_modus", "climate_mode"],
  phase: ["select", "klima_phase", "climate_phase"],
  vpd: ["sensor", "vpd", "vpd"], status: ["sensor", "status", "status"],
  event: ["sensor", "letztes_ereignis", "last_event"],
} as const;

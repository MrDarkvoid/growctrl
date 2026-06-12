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
  auto: ["switch", "automatik"], wartung: ["switch", "wartung"],
  stage: ["select", "wachstumsphase"],
  lightOn: ["time", "licht_an"], lightOffSv: ["time", "licht_aus_seedling_veg"],
  lightOffBloom: ["time", "licht_aus_bloom_flush"],
  lightRest: ["sensor", "licht_restzeit"], pumpRest: ["sensor", "pumpe_restzeit"],
  age: ["sensor", "alter_seit_keimung"], rec: ["sensor", "phasen_empfehlung"],
  event: ["sensor", "letztes_ereignis"],
  dli: ["sensor", "dli_heute"], dliFc: ["sensor", "dli_prognose"],
  germination: ["date", "keimstart"], overrideMin: ["number", "manuelle_ubernahme"],
  pOverride: ["binary_sensor", "manueller_eingriff"],
  pFailsafe: ["binary_sensor", "licht_failsafe"],
  pTime: ["binary_sensor", "lichtzeiten_unvollstandig"],
} as const;

export const TENT = {
  enabled: ["switch", "zelt_aktiv"], climate: ["switch", "klima_automatik"],
  mode: ["select", "klima_modus"], phase: ["select", "klima_phase"],
  vpd: ["sensor", "vpd"], status: ["sensor", "status"],
  event: ["sensor", "letztes_ereignis"], todo: ["todo", "aufgaben"],
} as const;

/*==============================================================================
 * GROWCTRL – core/registry
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Loest Integrations-Entitaeten ueber ihre growctrl_role/tent/station-
 *           Attribute auf - robust gegen umbenannte Entity-IDs (z.B. Area-Praefix).
 *           Liefert auch die Zelt-/Stationslisten fuer Editor-Dropdowns.
 * Version : 2.5.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/
export interface GcRegistry {
  tents: string[];
  stations: Record<string, string[]>;
  byRole: Map<string, string>;          // "tent::station::role" -> entity_id
}

let _key: unknown;
let _cache: GcRegistry | null = null;

/** Index aller GROWCTRL-Entitaeten (gecacht pro hass.states-Objekt). */
export function gcRegistry(hass: any): GcRegistry {
  if (hass?.states === _key && _cache) return _cache;
  const byRole = new Map<string, string>();
  const tents = new Set<string>();
  const stations: Record<string, Set<string>> = {};
  for (const [eid, st] of Object.entries<any>(hass?.states ?? {})) {
    const a = st?.attributes;
    if (!a?.growctrl_role || !a?.growctrl_tent) continue;
    const tent = String(a.growctrl_tent);
    const station = String(a.growctrl_station ?? "zelt");
    byRole.set(`${tent}::${station}::${a.growctrl_role}`, eid);
    if (station === "zelt") tents.add(tent);
    else (stations[tent] ??= new Set()).add(station);
  }
  _key = hass?.states;
  _cache = {
    tents: [...tents].sort(),
    stations: Object.fromEntries(Object.entries(stations).map(([t, s]) => [t, [...s].sort()])),
    byRole,
  };
  return _cache;
}

export const gcResolve = (hass: any, tent: string, station: string, role: string) =>
  gcRegistry(hass).byRole.get(`${tent}::${station}::${role}`);

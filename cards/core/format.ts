/*==============================================================================
 * GROWCTRL – core/format
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Format-Helfer: Minuten, Zeit-Parsing, Tage seit Datum.
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

export const fmtMin = (m: number | null): string =>
  m === null || isNaN(m as any) ? "\u2013" : m < 60 ? `${m} min` : `${Math.floor(m/60)}h ${m%60}min`;

/** "HH:MM[:SS]" oder "YYYY-MM-DD HH:MM:SS" -> Minuten seit Mitternacht. */
export const toMin = (s: string): number => {
  const p = s.split(" ").pop()!.substring(0,5).split(":");
  return parseInt(p[0]) * 60 + parseInt(p[1]);
};

export const num = (v: string | undefined, fallback: number | null = null): number | null => {
  if (v === undefined || ["unknown","unavailable",""].includes(v)) return fallback;
  const f = parseFloat(v);
  return isNaN(f) ? fallback : f;
};

export const daysSince = (iso: string): number | null => {
  const t = Date.parse(iso);
  return isNaN(t) ? null : Math.floor((Date.now() - t) / 86400000);
};

/*==============================================================================
 * GROWCTRL – core/format
 * Zweck   : Lesbare Dauer-Formatierung ("5 h 40 min") + Alters-Formate.
 * Version : 2.6.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/
export function fmtDur(minutes: number | null | undefined): string {
  if (minutes == null || isNaN(minutes)) return "\u2013";
  const m = Math.max(0, Math.round(minutes));
  const h = Math.floor(m / 60), rest = m % 60;
  if (h && rest) return `${h} h ${rest} min`;
  return h ? `${h} h` : `${rest} min`;
}

/** Alter formatieren: auto = unter 7 Tagen in Tagen, sonst Wochen-Zaehlung. */
export function fmtAge(days: number, mode: "auto" | "tage" | "wochen" = "auto"): string {
  const w = Math.floor(days / 7) + 1, d = (days % 7) + 1;
  if (mode === "tage" || (mode === "auto" && days < 7)) return `${days} Tage`;
  return `Wo ${w} \u00b7 Tag ${d}`;
}

/** State-String -> Zahl oder null ("unknown"/"unavailable" sicher abgefangen). */
export function num(v: string | undefined | null): number | null {
  if (v == null || v === "unknown" || v === "unavailable" || v === "") return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
}

/** Tage seit einem ISO-Datum (z.B. Keimstart) - negativ ausgeschlossen. */
export function daysSince(iso: string | undefined | null): number | null {
  if (!iso || iso === "unknown" || iso === "unavailable") return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return Math.max(0, Math.floor((Date.now() - d.getTime()) / 86400000));
}

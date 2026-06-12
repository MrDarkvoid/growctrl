/*==============================================================================
 * GROWCTRL – core/data
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Gedrosselte Daten-Caches: History (5 min TTL, 48 Punkte) und Kalender (10 min).
 * Version : 2.0.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import type { HomeAssistant } from "./types";

const histCache = new Map<string, { t: number; data: number[] }>();
const calCache  = new Map<string, { t: number; data: any[] }>();

/** History eines Sensors, auf maxPoints heruntergerechnet. 5 min Cache. */
export async function fetchHistory(hass: HomeAssistant, entity: string, hours = 24, maxPoints = 48): Promise<number[]> {
  const key = `${entity}:${hours}`;
  const hit = histCache.get(key);
  if (hit && Date.now() - hit.t < 5 * 60_000) return hit.data;
  try {
    const start = new Date(Date.now() - hours * 3600_000).toISOString();
    const res = await hass.callApi<any[][]>("GET",
      `history/period/${start}?filter_entity_id=${entity}&minimal_response&no_attributes`);
    const raw = (res?.[0] ?? [])
      .map((s: any) => parseFloat(s.state ?? s.s))
      .filter((v: number) => !isNaN(v));
    const step = Math.max(1, Math.floor(raw.length / maxPoints));
    const data = raw.filter((_: number, i: number) => i % step === 0);
    histCache.set(key, { t: Date.now(), data });
    return data;
  } catch { return hit?.data ?? []; }
}

/** Kommende Kalender-Ereignisse (10 min Cache). */
export async function fetchCalendar(hass: HomeAssistant, calendar: string, days = 14): Promise<any[]> {
  const hit = calCache.get(calendar);
  if (hit && Date.now() - hit.t < 10 * 60_000) return hit.data;
  try {
    const start = new Date().toISOString();
    const end = new Date(Date.now() + days * 86400_000).toISOString();
    const data = await hass.callApi<any[]>("GET", `calendars/${calendar}?start=${start}&end=${end}`);
    calCache.set(calendar, { t: Date.now(), data: data ?? [] });
    return data ?? [];
  } catch { return hit?.data ?? []; }
}

/** Mini-Sparkline als SVG-Pfad (normalisiert). */
export const sparkPath = (data: number[], w = 100, h = 24): string => {
  if (data.length < 2) return "";
  const min = Math.min(...data), max = Math.max(...data), span = max - min || 1;
  return data.map((v, i) =>
    `${i === 0 ? "M" : "L"}${((i / (data.length - 1)) * w).toFixed(1)},${(h - ((v - min) / span) * h).toFixed(1)}`
  ).join(" ");
};

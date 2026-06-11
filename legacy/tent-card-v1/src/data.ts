/* Gedrosselter Abruf von History- und Kalenderdaten über die HA-API.
 * Cache verhindert Request-Spam: pro Entität max. 1 Abruf je TTL-Fenster. */

import { HomeAssistant } from './types';

const HISTORY_TTL = 5 * 60 * 1000; // 5 Minuten
const CALENDAR_TTL = 10 * 60 * 1000; // 10 Minuten
const MAX_POINTS = 48;

interface HistoryCacheEntry {
  fetchedAt: number;
  points: number[];
  pending?: Promise<number[]>;
}

const historyCache = new Map<string, HistoryCacheEntry>();

/** Downsampling auf max. MAX_POINTS gleichverteilte Werte */
function downsample(values: number[]): number[] {
  if (values.length <= MAX_POINTS) return values;
  const out: number[] = [];
  const step = values.length / MAX_POINTS;
  for (let i = 0; i < MAX_POINTS; i++) {
    out.push(values[Math.floor(i * step)]);
  }
  out[out.length - 1] = values[values.length - 1];
  return out;
}

/**
 * Numerische History einer Entität (für Sparklines).
 * Gibt sofort den Cache zurück, wenn aktuell; sonst wird gefetcht.
 */
export async function fetchHistory(
  hass: HomeAssistant,
  entityId: string,
  hours: number
): Promise<number[]> {
  const key = `${entityId}:${hours}`;
  const cached = historyCache.get(key);
  const now = Date.now();
  if (cached) {
    if (cached.pending) return cached.pending;
    if (now - cached.fetchedAt < HISTORY_TTL) return cached.points;
  }

  const start = new Date(now - hours * 3600 * 1000).toISOString();
  const path =
    `history/period/${start}?filter_entity_id=${encodeURIComponent(entityId)}` +
    `&minimal_response&no_attributes&significant_changes_only`;

  const pending = hass
    .callApi<any[][]>('GET', path)
    .then((res) => {
      const series = (res && res[0]) || [];
      const points = downsample(
        series
          .map((s: any) => parseFloat(s.state ?? s.s))
          .filter((v: number) => Number.isFinite(v))
      );
      historyCache.set(key, { fetchedAt: Date.now(), points });
      return points;
    })
    .catch(() => {
      historyCache.set(key, { fetchedAt: Date.now(), points: cached?.points ?? [] });
      return cached?.points ?? [];
    });

  historyCache.set(key, {
    fetchedAt: cached?.fetchedAt ?? 0,
    points: cached?.points ?? [],
    pending,
  });
  return pending;
}

export function getCachedHistory(entityId: string, hours: number): number[] | undefined {
  return historyCache.get(`${entityId}:${hours}`)?.points;
}

/* ---------- Kalender ---------- */

export interface CalEvent {
  summary: string;
  description?: string;
  start: string; // ISO oder YYYY-MM-DD
}

interface CalCacheEntry {
  fetchedAt: number;
  events: CalEvent[];
  pending?: Promise<CalEvent[]>;
}

const calCache = new Map<string, CalCacheEntry>();

/** Ereignisse der letzten 120 Tage bis +30 Tage, neueste zuerst. */
export async function fetchCalendar(
  hass: HomeAssistant,
  entityId: string
): Promise<CalEvent[]> {
  const cached = calCache.get(entityId);
  const now = Date.now();
  if (cached) {
    if (cached.pending) return cached.pending;
    if (now - cached.fetchedAt < CALENDAR_TTL) return cached.events;
  }

  const start = new Date(now - 120 * 86400 * 1000).toISOString();
  const end = new Date(now + 30 * 86400 * 1000).toISOString();
  const path = `calendars/${entityId}?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;

  const pending = hass
    .callApi<any[]>('GET', path)
    .then((res) => {
      const events: CalEvent[] = (res || [])
        .map((e: any) => ({
          summary: e.summary ?? '',
          description: e.description ?? undefined,
          start: e.start?.dateTime ?? e.start?.date ?? e.start ?? '',
        }))
        .sort((a, b) => (a.start < b.start ? 1 : -1));
      calCache.set(entityId, { fetchedAt: Date.now(), events });
      return events;
    })
    .catch(() => {
      calCache.set(entityId, { fetchedAt: Date.now(), events: cached?.events ?? [] });
      return cached?.events ?? [];
    });

  calCache.set(entityId, {
    fetchedAt: cached?.fetchedAt ?? 0,
    events: cached?.events ?? [],
    pending,
  });
  return pending;
}

export function getCachedCalendar(entityId: string): CalEvent[] | undefined {
  return calCache.get(entityId)?.events;
}

/* Hilfsfunktionen: Sparkline-SVG, Datums-/Tageslogik */

import { svg, SVGTemplateResult } from 'lit';

export function sparkline(
  points: number[],
  width = 100,
  height = 26
): SVGTemplateResult | null {
  if (!points || points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const stepX = width / (points.length - 1);
  const pts = points
    .map((v, i) => {
      const x = (i * stepX).toFixed(1);
      const y = (height - 2 - ((v - min) / span) * (height - 4)).toFixed(1);
      return `${x},${y}`;
    })
    .join(' ');
  return svg`
    <svg class="spark" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <polyline points=${pts} fill="none" stroke="currentColor"
        stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.55"/>
    </svg>`;
}

/** Datum aus input_datetime-State oder festem String parsen */
export function parseHaDate(value: string | undefined): Date | null {
  if (!value || value === 'unknown' || value === 'unavailable') return null;
  // input_datetime liefert "YYYY-MM-DD" oder "YYYY-MM-DD HH:MM:SS"
  const d = new Date(value.includes('T') ? value : value.replace(' ', 'T'));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Volle Tage seit Datum, Tag des Starts = Tag 1 */
export function daysSince(date: Date): number {
  const ms = Date.now() - date.getTime();
  return Math.max(1, Math.floor(ms / 86400000) + 1);
}

export function formatDate(value: string): string {
  const d = parseHaDate(value);
  if (!d) return value;
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/** Linien- und Flächenpfad für das Verlaufsdiagramm (eigene Y-Skala je Serie) */
export function chartSeries(
  points: number[],
  w: number,
  h: number
): { line: string; area: string; min: number; max: number } | null {
  if (!points || points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const lo = min - span * 0.1;
  const scale = span * 1.2;
  const step = w / (points.length - 1);
  const xy = points.map(
    (v, i) => `${(i * step).toFixed(1)},${(h - ((v - lo) / scale) * h).toFixed(1)}`
  );
  return {
    line: xy.join(' '),
    area: `M0,${h} L${xy.join(' L')} L${w},${h} Z`,
    min,
    max,
  };
}

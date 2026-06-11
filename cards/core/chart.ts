/*==============================================================================
 * GROWCTRL – core/chart
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : SVG-Liniendiagramm (Vivosun-/MarsHydro-Stil): Grid, Min/Max-Achsenwerte, optionales Sollband, Flaechenfuellung, Mehrfachserien.
 * Version : 2.2.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { svg, html, nothing, type TemplateResult } from "lit";

export interface Series { data: number[]; color: string; name?: string; fill?: boolean; }
export interface ChartOpts {
  w?: number; h?: number;
  min?: number; max?: number;            // feste Skala (sonst auto)
  band?: { min?: number; max?: number; color?: string };  // Sollbereich
  unit?: string; grid?: number;          // Anzahl horizontaler Gridlinien
}

const PADL = 30, PADR = 4, PADT = 6, PADB = 14;

/** Mehrserien-Liniendiagramm als Lit-Template. */
export function lineChart(series: Series[], o: ChartOpts = {}): TemplateResult {
  const w = o.w ?? 300, h = o.h ?? 110;
  const all = series.flatMap(s => s.data);
  if (!all.length) return html`<div style="height:${h}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.35)">Keine Verlaufsdaten</div>`;
  let min = o.min ?? Math.min(...all, o.band?.min ?? Infinity);
  let max = o.max ?? Math.max(...all, o.band?.max ?? -Infinity);
  if (max - min < 0.001) { max += 1; min -= 1; }
  const pad = (max - min) * 0.08; min -= pad; max += pad;
  const X = (i: number, n: number) => PADL + (i / Math.max(1, n - 1)) * (w - PADL - PADR);
  const Y = (v: number) => PADT + (1 - (v - min) / (max - min)) * (h - PADT - PADB);
  const grid = o.grid ?? 3;
  const fmt = (v: number) => Math.abs(v) >= 100 ? v.toFixed(0) : Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2);

  return html`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:${h}px;display:block">
    ${o.band && (o.band.min !== undefined || o.band.max !== undefined) ? svg`
      <rect x="${PADL}" y="${Y(o.band.max ?? max)}" width="${w - PADL - PADR}"
        height="${Math.max(0, Y(o.band.min ?? min) - Y(o.band.max ?? max))}"
        fill="${o.band.color ?? "rgba(77,255,195,.08)"}" />` : nothing}
    ${Array.from({ length: grid + 1 }, (_, gi) => {
      const v = min + ((max - min) * gi) / grid;
      return svg`
        <line x1="${PADL}" y1="${Y(v)}" x2="${w - PADR}" y2="${Y(v)}"
          stroke="rgba(255,255,255,.07)" stroke-width="1"/>
        <text x="${PADL - 4}" y="${Y(v) + 3}" text-anchor="end"
          font-size="8" fill="rgba(255,255,255,.4)">${fmt(v)}</text>`;
    })}
    ${series.map(s => {
      if (s.data.length < 2) return nothing;
      const pts = s.data.map((v, i) => `${X(i, s.data.length).toFixed(1)},${Y(v).toFixed(1)}`);
      const path = `M${pts.join(" L")}`;
      return svg`
        ${s.fill !== false ? svg`<path d="${path} L${X(s.data.length - 1, s.data.length)},${h - PADB} L${PADL},${h - PADB} Z"
          fill="${s.color}" opacity=".10"/>` : nothing}
        <path d="${path}" fill="none" stroke="${s.color}" stroke-width="1.8"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${X(s.data.length - 1, s.data.length)}" cy="${Y(s.data[s.data.length - 1])}"
          r="2.6" fill="${s.color}"/>`;
    })}
    <text x="${PADL}" y="${h - 3}" font-size="8" fill="rgba(255,255,255,.35)">-24h</text>
    <text x="${w - PADR}" y="${h - 3}" text-anchor="end" font-size="8" fill="rgba(255,255,255,.35)">jetzt</text>
  </svg>`;
}

/** Legende unter dem Chart. */
export const chartLegend = (series: Series[]): TemplateResult => html`
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:4px">
    ${series.filter(s => s.name).map(s => html`<span style="display:inline-flex;align-items:center;gap:5px;
      font-size:10px;color:rgba(255,255,255,.6)">
      <span style="width:10px;height:3px;border-radius:2px;background:${s.color}"></span>${s.name}</span>`)}
  </div>`;

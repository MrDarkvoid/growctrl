/*==============================================================================
 * GROWCTRL – core/chart
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : SVG-Liniendiagramm (Vivosun-/MarsHydro-Stil): Grid, Min/Max-Achsenwerte, optionales Sollband, Flaechenfuellung, Mehrfachserien.
 * Version : 2.2.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
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
let _gradSeq = 0;  // eindeutige Gradient-IDs pro Chart-Render

/** Catmull-Rom -> kubische Bezier: weiche "Apex-Style"-Kurven statt Polylinien. */
function smoothPath(pts: Array<[number, number]>): string {
  if (pts.length < 3) return `M${pts.map(p => p.join(",")).join(" L")}`;
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1],
          p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function lineChart(series: Series[], o: ChartOpts = {}): TemplateResult {
  const gid = `gcg${_gradSeq++}`;
  const w = o.w ?? 300, h = o.h ?? 110;
  const all = series.flatMap(s => s.data);
  if (!all.length) return html`<div style="height:${h}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.5)">Keine Verlaufsdaten</div>`;
  let min = o.min ?? Math.min(...all, o.band?.min ?? Infinity);
  let max = o.max ?? Math.max(...all, o.band?.max ?? -Infinity);
  if (max - min < 0.001) { max += 1; min -= 1; }
  const pad = (max - min) * 0.08; min -= pad; max += pad;
  const X = (i: number, n: number) => PADL + (i / Math.max(1, n - 1)) * (w - PADL - PADR);
  const Y = (v: number) => PADT + (1 - (v - min) / (max - min)) * (h - PADT - PADB);
  const grid = o.grid ?? 3;
  const fmt = (v: number) => Math.abs(v) >= 100 ? v.toFixed(0) : Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2);

  return html`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:${h}px;display:block">
    ${o.band && (o.band.min !== undefined || o.band.max !== undefined) ? svg`
      <rect x="${PADL}" y="${Y(o.band.max ?? max)}" width="${w - PADL - PADR}"
        height="${Math.max(0, Y(o.band.min ?? min) - Y(o.band.max ?? max))}"
        fill="${o.band.color ?? "rgba(77,255,195,.08)"}" />` : nothing}
    ${Array.from({ length: grid + 1 }, (_, gi) => {
      const v = min + ((max - min) * gi) / grid;
      return svg`
        <line x1="${PADL}" y1="${Y(v)}" x2="${w - PADR}" y2="${Y(v)}"
          stroke="rgba(255,255,255,.10)" stroke-width="1"/>
        <text x="${PADL - 4}" y="${Y(v) + 3}" text-anchor="end"
          font-size="9.5" fill="rgba(255,255,255,.68)">${fmt(v)}</text>`;
    })}
    ${series.map((s, si) => {
      if (s.data.length < 2) return nothing;
      const pts: Array<[number, number]> = s.data.map((v, i) =>
        [Number(X(i, s.data.length).toFixed(1)), Number(Y(v).toFixed(1))]);
      const path = smoothPath(pts);
      const lx = pts[pts.length - 1][0], ly = pts[pts.length - 1][1];
      return svg`
        <defs>
          <linearGradient id="${gid}-${si}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${s.color}" stop-opacity=".18"/>
            <stop offset="100%" stop-color="${s.color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${s.fill !== false ? svg`<path
          d="${path} L${lx},${h - PADB} L${PADL},${h - PADB} Z"
          fill="url(#${gid}-${si})"/>` : nothing}
        <path d="${path}" fill="none" stroke="${s.color}" stroke-width="2.4"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${lx}" cy="${ly}" r="6" fill="${s.color}" opacity=".18"/>
        <circle cx="${lx}" cy="${ly}" r="3" fill="${s.color}"/>
        <circle cx="${lx}" cy="${ly}" r="1.3" fill="rgba(10,14,18,.9)"/>`;
    })}
    <text x="${PADL}" y="${h - 3}" font-size="9" fill="rgba(255,255,255,.5)">-24h</text>
    <text x="${w - PADR}" y="${h - 3}" text-anchor="end" font-size="9" fill="rgba(255,255,255,.5)">jetzt</text>
  </svg>`;
}

/** Legende unter dem Chart. */
export const chartLegend = (series: Series[]): TemplateResult => html`
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:4px">
    ${series.filter(s => s.name).map(s => html`<span style="display:inline-flex;align-items:center;gap:5px;
      font-size:10px;color:rgba(255,255,255,.6)">
      <span style="width:10px;height:3px;border-radius:2px;background:${s.color}"></span>${s.name}</span>`)}
  </div>`;

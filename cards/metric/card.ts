/*==============================================================================
 * GROWCTRL – growctrl-metric-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Einzelwert gross (v6): EC/pH/Wassertemp... mit grossem Wert, Sollbereich
 *           rechts, 24h-Verlauf mit Sollband; Ampel (Wertfarbe + Kartenrahmen).
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, cardVars, type StyleConfig,
  fetchHistory, lineChart, num,
} from "../core/index";

interface MetricConfig {
  type: string; title?: string; entity: string; name?: string;
  min?: number; max?: number; hours?: number; decimals?: number; height?: number;
  style?: StyleConfig;
}

export class GrowctrlMetricCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true } };
  private _hist: number[] = [];
  private _timer?: number;

  protected validateConfig(c: MetricConfig) {
    if (!c.entity) throw new Error("growctrl-metric-card: 'entity' ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-metric-editor"); }
  static getStubConfig() { return { entity: "sensor.gc_slot1_ec1", name: "EC", min: 1.2, max: 2.2 }; }

  connectedCallback() { super.connectedCallback(); this._load(); this._timer = window.setInterval(() => this._load(), 5 * 60_000); }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    const c = this._config as MetricConfig;
    this._hist = await fetchHistory(this.hass, c.entity, c.hours ?? 24);
  }

  render() {
    const c = this._config as MetricConfig;
    if (!this.hass) return nothing;
    const v = num(this.st(c.entity)) ?? (!this.hass.states[c.entity] ? 1.84 : null);
    const tooLow = v !== null && c.min !== undefined && v < c.min;
    const tooHigh = v !== null && c.max !== undefined && v > c.max;
    const bad = tooLow || tooHigh;
    const color = v === null ? "var(--tx-3)" : bad ? THEME.crit : THEME.ok;
    const dec = c.decimals ?? 2;
    const hasRange = c.min !== undefined || c.max !== undefined;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${bad ? "warning" : "ok"} style=${cardVars(c.style)}>
      <div class="hd">
        <div class="grow" style="min-width:0">
          <span class="mlbl">${c.name ?? this.friendly(c.entity)}</span>
          <button class="gc" style="display:block; margin-top:4px" @click=${() => this.moreInfo(c.entity)}>
            <span style="font:700 34px/1 var(--f-num); letter-spacing:-1.5px; color:${color}; font-variant-numeric:tabular-nums">
              ${v !== null ? v.toFixed(dec) : "--"}</span>
            <span style="font:600 14px var(--f-num); color:var(--tx-2); margin-left:2px">${this.unit(c.entity)}</span>
          </button>
        </div>
        ${hasRange ? html`<div style="text-align:right; flex-shrink:0">
          <span class="mlbl">Sollbereich</span>
          <div style="font:700 13px var(--f-num); color:${bad ? THEME.crit : "var(--acc)"}; margin-top:3px">${c.min ?? "–"} – ${c.max ?? "–"}</div>
          ${bad ? html`<div style="font:900 10px var(--f-ui); color:${THEME.crit}; margin-top:2px">${tooLow ? "▼ ZU NIEDRIG" : "▲ ZU HOCH"}</div>` : nothing}
        </div>` : nothing}
      </div>
      <div style="margin-top:6px">
        ${lineChart([{ data: this._hist, color: bad ? THEME.crit : THEME.ok, fill: true }],
          { w: this.chartW(), h: c.height ?? 104, band: { min: c.min, max: c.max }, grid: 3 })}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-metric-card", GrowctrlMetricCard);

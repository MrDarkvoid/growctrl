/*==============================================================================
 * GROWCTRL – growctrl-metric-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Einzelwert gross (EC/pH/Wassertemp/...) mit 24h-Chart, Sollband im Diagramm und Ampel (Wertfarbe + Kartenrahmen) bei Sollbereichs-Verletzung.
 * Version : 2.2.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
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
  min?: number; max?: number;        // Sollbereich
  hours?: number; decimals?: number; height?: number;
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

  connectedCallback() {
    super.connectedCallback();
    this._load();
    this._timer = window.setInterval(() => this._load(), 5 * 60_000);
  }
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
    const bad = v !== null && ((c.min !== undefined && v < c.min) || (c.max !== undefined && v > c.max));
    const color = v === null ? "rgba(255,255,255,.4)" : bad ? THEME.crit : THEME.ok;
    const dec = c.decimals ?? 2;
    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${bad ? "warning" : "ok"}
        style=${cardVars(c.style)}>
      <div class="hdr">
        <div>
          <div class="lbl" style="font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:rgba(255,255,255,.5);font-weight:700">
            ${c.name ?? this.friendly(c.entity)}</div>
          <button class="gc" @click=${() => this.moreInfo(c.entity)}>
            <span class="val" style="font-size:36px;font-weight:800;letter-spacing:-1px;color:${color}">
              ${v !== null ? v.toFixed(dec) : "--"}</span>
            <span class="unit" style="font-size:14px">${this.unit(c.entity)}</span>
          </button>
        </div>
        ${c.min !== undefined || c.max !== undefined ? html`
          <div style="text-align:right">
            <div class="lbl">Sollbereich</div>
            <div style="font-size:13px;font-weight:700;color:${bad ? THEME.crit : "rgba(255,255,255,.7)"}">
              ${c.min ?? "\u2013"} \u2013 ${c.max ?? "\u2013"}</div>
            ${bad ? html`<div style="font-size:10px;font-weight:800;color:${THEME.crit};margin-top:2px">
              ${v! < (c.min ?? -Infinity) ? "\u25BC ZU NIEDRIG" : "\u25B2 ZU HOCH"}</div>` : nothing}
          </div>` : nothing}
      </div>
      <div style="margin-top:6px">
        ${lineChart([{ data: this._hist, color: bad ? THEME.crit : "#4DFFC3" }],
          { h: c.height ?? 110, band: { min: c.min, max: c.max }, grid: 3 })}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-metric-card", GrowctrlMetricCard);

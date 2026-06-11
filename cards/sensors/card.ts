/*==============================================================================
 * GROWCTRL – growctrl-sensors-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Sensor-Kacheln v2: grosser Wert + Einheit, Flaechen-Sparkline, optionaler Sollbereich je Sensor (Ampelfarbe + Kartenrahmen), Stil konfigurierbar.
 * Version : 2.1.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, cardVars, type StyleConfig,
  fetchHistory, sparkPath, num,
} from "../core/index";

interface SensorItem { entity: string; name?: string; min?: number; max?: number; }
interface SensorsConfig {
  type: string; title?: string; sensors: SensorItem[];
  columns?: number; sparkline_hours?: number; style?: StyleConfig;
}

export class GrowctrlSensorsCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true } };
  private _hist: Record<string, number[]> = {};
  private _timer?: number;

  protected validateConfig(c: SensorsConfig) {
    if (!Array.isArray(c.sensors) || !c.sensors.length)
      throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-sensors-editor"); }
  static getStubConfig() { return { sensors: [{ entity: "sensor.beispiel" }] }; }

  connectedCallback() {
    super.connectedCallback();
    this._load();
    this._timer = window.setInterval(() => this._load(), 5 * 60_000);
  }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    const c = this._config as SensorsConfig;
    const out: Record<string, number[]> = {};
    for (const s of c.sensors) out[s.entity] = await fetchHistory(this.hass, s.entity, c.sparkline_hours ?? 24);
    this._hist = out;
  }
  private bad(v: number | null, s: SensorItem): boolean {
    return v !== null && ((s.min !== undefined && v < s.min) || (s.max !== undefined && v > s.max));
  }

  render() {
    const c = this._config as SensorsConfig;
    if (!this.hass) return nothing;
    const cols = c.columns ?? 2;
    const anyBad = c.sensors.some(s => this.bad(num(this.st(s.entity)), s));
    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${anyBad ? "warning" : "ok"}
        style=${cardVars(c.style)}>
      ${c.title ? html`<div class="title" style="font-size:15px;margin-bottom:2px">${c.title}</div>` : nothing}
      <div class="grid" style="grid-template-columns:repeat(${cols},1fr)">
        ${c.sensors.map(s => {
          const v = num(this.st(s.entity));
          const isBad = this.bad(v, s);
          const path = sparkPath(this._hist[s.entity] ?? [], 100, 26);
          const name = s.name ?? this.friendly(s.entity);
          return html`<button class="gc tile" style="text-align:left;position:relative;overflow:hidden;
              ${isBad ? "border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)" : ""}"
            @click=${() => this.moreInfo(s.entity)}>
            ${path ? html`<svg viewBox="0 0 100 26" preserveAspectRatio="none"
              style="position:absolute;left:0;right:0;bottom:0;width:100%;height:30px;opacity:.5">
              <path d="${path} L100,26 L0,26 Z" fill="${isBad ? "rgba(255,107,107,.25)" : "rgba(77,255,195,.18)"}"/>
              <path d="${path}" fill="none" stroke="${isBad ? THEME.crit : "rgba(77,255,195,.8)"}" stroke-width="1.4"/>
            </svg>` : nothing}
            <div class="lbl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
            <div class="val" style="font-size:22px;${isBad ? `color:${THEME.crit}` : ""}">${v !== null ? v : "--"}<span class="unit">${this.unit(s.entity)}</span></div>
            <div style="height:14px"></div>
          </button>`;
        })}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-sensors-card", GrowctrlSensorsCard);

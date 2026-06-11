/*==============================================================================
 * GROWCTRL – growctrl-sensors-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Sensor-Kacheln mit gedrosselten History-Sparklines. Tap = More-Info.
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import { GrowctrlBaseCard, sharedStyles, fetchHistory, sparkPath, num } from "../core/index";

interface SensorItem { entity: string; name?: string; }
interface SensorsConfig { type: string; title?: string; sensors: SensorItem[]; columns?: number; sparkline_hours?: number; }

export class GrowctrlSensorsCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true } };
  private _hist: Record<string, number[]> = {};
  private _timer?: number;

  protected validateConfig(c: SensorsConfig) {
    if (!Array.isArray(c.sensors) || !c.sensors.length)
      throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.");
  }
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

  render() {
    const c = this._config as SensorsConfig;
    if (!this.hass) return nothing;
    const cols = c.columns ?? 3;
    return html`<div class="card">
      ${c.title ? html`<div class="title" style="font-size:15px">${c.title}</div>` : nothing}
      <div class="grid" style="grid-template-columns:repeat(${cols},1fr)">
        ${c.sensors.map(s => {
          const v = num(this.st(s.entity));
          const path = sparkPath(this._hist[s.entity] ?? []);
          return html`<button class="gc tile" style="text-align:left" @click=${() => this.moreInfo(s.entity)}>
            <div class="lbl">${s.name ?? this.friendly(s.entity)}</div>
            <div class="val sm">${v !== null ? v : "--"} ${this.unit(s.entity)}</div>
            ${path ? html`<svg viewBox="0 0 100 24" style="width:100%;height:24px;margin-top:4px" preserveAspectRatio="none">
              <path d="${path}" fill="none" stroke="rgba(77,255,195,.7)" stroke-width="1.5"/></svg>` : nothing}
          </button>`;
        })}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-sensors-card", GrowctrlSensorsCard);

/*==============================================================================
 * GROWCTRL – growctrl-history-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Verlaufsdiagramm (v6): Mehrserien-Chart mit Grid/Achsen, v6-Legende
 *           (Farbstrich + Name + aktueller Wert). Stundenfenster konfigurierbar.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, cardVars, type StyleConfig,
  fetchHistory, lineChart, num, type Series,
} from "../core/index";

interface HistSensor { entity: string; name?: string; color?: string; }
interface HistoryConfig { type: string; title?: string; sensors: HistSensor[]; hours?: number; height?: number; style?: StyleConfig; }
const PALETTE = ["#FFB98A", "#7CC8F0", "#7BE8A8", "#C3ABF5"];

export class GrowctrlHistoryCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true } };
  private _hist: Record<string, number[]> = {};
  private _timer?: number;

  protected validateConfig(c: HistoryConfig) {
    if (!Array.isArray(c.sensors) || !c.sensors.length)
      throw new Error("growctrl-history-card: 'sensors' (min. 1 Eintrag) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-history-editor"); }
  static getStubConfig() { return { sensors: [{ entity: "sensor.zelt_temperature" }], hours: 24 }; }

  connectedCallback() { super.connectedCallback(); this._load(); this._timer = window.setInterval(() => this._load(), 5 * 60_000); }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    const c = this._config as HistoryConfig;
    const out: Record<string, number[]> = {};
    for (const s of c.sensors) out[s.entity] = await fetchHistory(this.hass, s.entity, c.hours ?? 24);
    this._hist = out;
  }

  render() {
    const c = this._config as HistoryConfig;
    if (!this.hass) return nothing;
    const series: Series[] = c.sensors.map((s, i) => ({
      data: this._hist[s.entity] ?? [], color: s.color ?? PALETTE[i % PALETTE.length],
      name: s.name ?? this.friendly(s.entity), fill: c.sensors.length === 1,
    }));
    return html`<div class="card ${c.style?.glass ? "glass" : ""}" style=${cardVars(c.style)}>
      <div class="hd">
        <div class="ttl grow">${c.title ?? "Verlauf"}</div>
        <button class="gc icbtn" style="width:auto; padding:0 13px; font:800 11px var(--f-num)">${c.hours ?? 24}h</button>
      </div>
      ${lineChart(series, { w: this.chartW(), h: c.height ?? 120, grid: 3 })}
      <div class="legend">
        ${c.sensors.map((s, i) => html`<span><i style="background:${series[i].color}"></i>${s.name ?? this.friendly(s.entity)} · ${num(this.st(s.entity)) ?? "--"} ${this.unit(s.entity)}</span>`)}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-history-card", GrowctrlHistoryCard);

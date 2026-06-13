/*==============================================================================
 * GROWCTRL – growctrl-tank-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : DWC-Fuellstand (v6): vertikaler Tank mit Fuellung + Mindestlinie,
 *           Prozent gross, optional Liter; Warnfarbe + Karten-Ampel unter Minimum.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import { GrowctrlBaseCard, sharedStyles, THEME, cardVars, type StyleConfig, num } from "../core/index";

interface TankConfig {
  type: string; title?: string; entity: string;
  min?: number; volume_l?: number; style?: StyleConfig;
}

export class GrowctrlTankCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  protected validateConfig(c: TankConfig) {
    if (!c.entity) throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-tank-editor"); }
  static getStubConfig() { return { entity: "sensor.gc_slot1_level1", title: "Tank", min: 30, volume_l: 200 }; }

  render() {
    const c = this._config as TankConfig;
    if (!this.hass) return nothing;
    const demo = !this.hass.states[c.entity];
    const pct = Math.min(100, Math.max(0, num(this.st(c.entity)) ?? (demo ? 49 : 0)));
    const low = c.min !== undefined && pct < c.min;
    const col = low ? THEME.crit : THEME.water;
    const liters = c.volume_l ? (pct / 100) * c.volume_l : null;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${low ? "critical" : "ok"} style=${cardVars(c.style)}>
      <div class="hd">
        <div class="ttl grow">${c.title ?? "Tank"}</div>
        ${low ? html`<span class="pill crit">Nachfüllen</span>` : nothing}
      </div>
      <div style="display:flex; gap:18px; align-items:center">
        <button class="gc tankv" @click=${() => this.moreInfo(c.entity)}>
          ${c.min !== undefined ? html`<span class="minl" style="bottom:${c.min}%"></span>` : nothing}
          <span class="fill" style="height:${pct}%; background:linear-gradient(180deg, ${col}d9, ${col}80)"></span>
        </button>
        <button class="gc" style="flex:1; min-width:0; text-align:left" @click=${() => this.moreInfo(c.entity)}>
          <span class="mlbl">Aktueller Füllstand</span>
          <div style="font:700 38px/1 var(--f-num); letter-spacing:-1.5px; color:${col}; margin-top:5px; font-variant-numeric:tabular-nums">
            ${Math.round(pct)}<span style="font:600 14px var(--f-num); color:var(--tx-2); margin-left:2px">%</span></div>
          ${liters !== null ? html`<div style="margin-top:6px; font:700 12.5px var(--f-ui); color:var(--tx-2)">≈ ${liters.toFixed(1)} l von ${c.volume_l} l</div>` : nothing}
          ${c.min !== undefined ? html`<div style="font:700 10.5px var(--f-ui); color:var(--tx-3); margin-top:2px">Mindeststand ${c.min} %</div>` : nothing}
        </button>
      </div>
    </div>`;
  }
}
customElements.define("growctrl-tank-card", GrowctrlTankCard);

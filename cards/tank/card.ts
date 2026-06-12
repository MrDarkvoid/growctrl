/*==============================================================================
 * GROWCTRL – growctrl-tank-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : DWC-Fuellstandsanzeige: animierter Tank mit Fuellung, Prozent gross, optional Liter; Warnfarbe + Karten-Ampel unter Mindeststand.
 * Version : 2.2.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import { GrowctrlBaseCard, sharedStyles, THEME, cardVars, type StyleConfig, num } from "../core/index";

interface TankConfig {
  type: string; title?: string; entity: string;
  min?: number;              // Warnung unter X %
  volume_l?: number;         // Tankvolumen -> Liter-Anzeige
  style?: StyleConfig;
}

export class GrowctrlTankCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  protected validateConfig(c: TankConfig) {
    if (!c.entity) throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-tank-editor"); }
  static getStubConfig() { return { entity: "sensor.gc_slot1_level1", title: "Tank" }; }

  render() {
    const c = this._config as TankConfig;
    if (!this.hass) return nothing;
    const demo = !this.hass.states[c.entity];
    const pct = Math.min(100, Math.max(0, num(this.st(c.entity)) ?? (demo ? 62 : 0)));
    const low = c.min !== undefined && pct < c.min;
    const color = low ? THEME.crit : pct < (c.min ?? 0) + 15 ? THEME.warn : "#4FC3F7";
    const liters = c.volume_l ? (pct / 100) * c.volume_l : null;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${low ? "critical" : "ok"}
        style=${cardVars(c.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${c.title ?? "F\u00fcllstand"}</div>
        ${low ? html`<span class="badge warn">\u26A0 Nachf\u00fcllen</span>` : nothing}
      </div>
      <div style="display:flex;align-items:center;gap:18px;margin-top:12px">
        <button class="gc" style="position:relative;width:74px;height:108px;flex-shrink:0;border-radius:12px 12px 16px 16px;
            border:2px solid rgba(255,255,255,.15);overflow:hidden;background:rgba(0,0,0,.3)"
          @click=${() => this.moreInfo(c.entity)}>
          <div style="position:absolute;left:0;right:0;bottom:0;height:${pct}%;transition:height .8s;
              background:linear-gradient(180deg, ${color}cc, ${color}88)">
            <div style="position:absolute;top:-5px;left:-10%;width:120%;height:10px;border-radius:50%;
              background:${color};opacity:.9"></div>
          </div>
          ${c.min !== undefined ? html`<div style="position:absolute;left:0;right:0;bottom:${c.min}%;
            border-top:1.5px dashed rgba(255,107,107,.7)"></div>` : nothing}
        </button>
        <div style="flex:1;min-width:0">
          <div class="lbl">Aktueller F\u00fcllstand</div>
          <div class="val" style="font-size:34px;color:${color}">${Math.round(pct)}<span class="unit">%</span></div>
          ${liters !== null ? html`<div style="font-size:12px;font-weight:600;color:rgba(255,255,255,.55);margin-top:2px">
            \u2248 ${liters.toFixed(1)} l von ${c.volume_l} l</div>` : nothing}
          ${c.min !== undefined ? html`<div style="font-size:10.5px;color:rgba(255,255,255,.4);margin-top:6px">
            Mindeststand ${c.min}%</div>` : nothing}
        </div>
      </div>
    </div>`;
  }
}
customElements.define("growctrl-tank-card", GrowctrlTankCard);

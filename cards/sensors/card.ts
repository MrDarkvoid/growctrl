/*==============================================================================
 * GROWCTRL – growctrl-sensors-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Sensor-Kacheln (v6): KPI-Raster mit grossem Wert + Einheit, optionaler
 *           Sollbereich je Sensor (Ampelfarbe + Kartenrahmen). Spalten konfigurierbar.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import { GrowctrlBaseCard, sharedStyles, THEME, cardVars, type StyleConfig, num } from "../core/index";

interface SensorItem { entity: string; name?: string; min?: number; max?: number; accent?: "temp"|"hum"|"vpd"; }
interface SensorsConfig {
  type: string; title?: string; sensors: SensorItem[];
  columns?: number; style?: StyleConfig;
}

export class GrowctrlSensorsCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  protected validateConfig(c: SensorsConfig) {
    if (!Array.isArray(c.sensors) || !c.sensors.length)
      throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-sensors-editor"); }
  static getStubConfig() { return { sensors: [{ entity: "sensor.beispiel" }] }; }

  private bad(v: number | null, s: SensorItem): boolean {
    return v !== null && ((s.min !== undefined && v < s.min) || (s.max !== undefined && v > s.max));
  }

  render() {
    const c = this._config as SensorsConfig;
    if (!this.hass) return nothing;
    const cols = c.columns ?? 3;
    const anyBad = c.sensors.some(s => this.bad(num(this.st(s.entity)), s));
    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${anyBad ? "warning" : "ok"} style=${cardVars(c.style)}>
      ${c.title ? html`<div class="hd"><div class="ttl">${c.title}</div></div>` : nothing}
      <div class="kpis" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">
        ${c.sensors.map(s => {
          const v = num(this.st(s.entity));
          const isBad = this.bad(v, s);
          const name = s.name ?? this.friendly(s.entity);
          const accCls = s.accent ? `c-${s.accent}` : "";
          return html`<button class="gc kpi ${accCls}" @click=${() => this.moreInfo(s.entity)}>
            <span class="mlbl" style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis; display:block">${name}</span>
            <span class="v" style="${isBad ? `color:${THEME.crit}` : ""}">${v !== null ? v : "--"}<span class="u">${this.unit(s.entity)}</span></span>
          </button>`;
        })}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-sensors-card", GrowctrlSensorsCard);

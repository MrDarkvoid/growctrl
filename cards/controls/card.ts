/*==============================================================================
 * GROWCTRL – growctrl-controls-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Aktoren (v6): Icon-zentrierte Touch-Kacheln (4er-Raster), Zustand ueber
 *           die ganze Kachel, optionale Gruppen, Bestaetigung. Farbe je Art.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import { GrowctrlBaseCard, sharedStyles, cardVars, type StyleConfig } from "../core/index";

interface ControlItem { entity: string; name?: string; icon?: string; confirm?: boolean; group?: string;
  kind?: "light" | "heat" | "water" | "o2" | "fan" | "pump"; }
interface ControlsConfig { type: string; title?: string; controls: ControlItem[]; columns?: number; style?: StyleConfig; }

const FALLBACK_ICON: Record<string, string> = {
  switch: "mdi:power", light: "mdi:lightbulb", fan: "mdi:fan", input_boolean: "mdi:toggle-switch",
};
const KIND_ICON: Record<string, string> = {
  light: "mdi:lightbulb", heat: "mdi:radiator", water: "mdi:air-humidifier",
  o2: "mdi:scuba-tank", fan: "mdi:fan", pump: "mdi:water-pump",
};

export class GrowctrlControlsCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  protected validateConfig(c: ControlsConfig) {
    if (!Array.isArray(c.controls) || !c.controls.length)
      throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-controls-editor"); }
  static getStubConfig() { return { controls: [{ entity: "switch.beispiel" }] }; }

  render() {
    const c = this._config as ControlsConfig;
    if (!this.hass) return nothing;
    const cols = c.columns ?? 4;
    const groups = new Map<string, ControlItem[]>();
    c.controls.forEach(it => { const g = it.group ?? ""; if (!groups.has(g)) groups.set(g, []); groups.get(g)!.push(it); });

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" style="${cardVars(c.style)};position:relative">
      ${c.title ? html`<div class="hd"><div class="ttl">${c.title}</div></div>` : nothing}
      ${[...groups.entries()].map(([g, items]) => html`
        ${g ? html`<div class="seclbl">${g}</div>` : nothing}
        <div class="acts" style="grid-template-columns:repeat(${cols},1fr); ${g ? "" : "margin-top:4px"}">
          ${items.map(it => {
            const on = this.isOn(it.entity);
            const name = it.name ?? this.friendly(it.entity);
            const kind = it.kind ?? "";
            const tint = kind === "light" || kind === "heat" || kind === "water" ? kind : "";
            const icon = it.icon ?? this.hass.states[it.entity]?.attributes?.icon
              ?? KIND_ICON[kind] ?? FALLBACK_ICON[it.entity.split(".")[0]] ?? "mdi:power";
            return html`<button class="gc act ${on ? "on" : ""} ${on ? tint : ""}"
              @click=${() => it.confirm ? this.confirmToggle(it.entity, name) : this.toggle(it.entity)}>
              <ha-icon class="aic" icon=${icon} style="--mdc-icon-size:18px"></ha-icon>
              <span class="anm">${name}</span>
              <span class="ast">${on ? "AN" : "AUS"}</span>
            </button>`;
          })}
        </div>`)}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-controls-card", GrowctrlControlsCard);

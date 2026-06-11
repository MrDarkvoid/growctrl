/*==============================================================================
 * GROWCTRL – growctrl-controls-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Aktoren v3: Icon-zentrierte Touch-Kacheln (Vivosun-Stil), Zustand ueber ganze Kachel, Gruppen, Bestaetigung. Keine separate Schalter-Pille.
 * Version : 2.2.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import { GrowctrlBaseCard, sharedStyles, cardVars, type StyleConfig } from "../core/index";

interface ControlItem { entity: string; name?: string; icon?: string; confirm?: boolean; group?: string; }
interface ControlsConfig { type: string; title?: string; controls: ControlItem[]; columns?: number; style?: StyleConfig; }

const FALLBACK_ICON: Record<string, string> = {
  switch: "mdi:power", light: "mdi:lightbulb", fan: "mdi:fan", input_boolean: "mdi:toggle-switch",
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
    const accent = c.style?.accent ?? "#4DFFC3";
    const groups = new Map<string, ControlItem[]>();
    c.controls.forEach(it => {
      const g = it.group ?? "";
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g)!.push(it);
    });
    const cols = c.columns ?? 3;
    return html`<div class="card ${c.style?.glass ? "glass" : ""}" style="${cardVars(c.style)};position:relative">
      ${c.title ? html`<div class="title" style="font-size:15px">${c.title}</div>` : nothing}
      ${[...groups.entries()].map(([g, items]) => html`
        ${g ? html`<div class="seclbl">${g}</div>` : nothing}
        <div class="grid" style="grid-template-columns:repeat(${cols},1fr);margin-top:${g ? 0 : 10}px">
          ${items.map(it => {
            const on = this.isOn(it.entity);
            const name = it.name ?? this.friendly(it.entity);
            const stateObj = this.hass.states[it.entity];
            const icon = it.icon ?? stateObj?.attributes?.icon
              ?? FALLBACK_ICON[it.entity.split(".")[0]] ?? "mdi:power";
            return html`<button class="gc" style="display:flex;flex-direction:column;align-items:center;gap:7px;
                padding:15px 8px 12px;border-radius:16px;transition:all .18s;min-width:0;
                background:${on ? `color-mix(in srgb, ${accent} 12%, transparent)` : "rgba(255,255,255,.04)"};
                border:1.5px solid ${on ? accent : "rgba(255,255,255,.08)"};
                box-shadow:${on ? `0 4px 18px -8px ${accent}` : "none"}"
              @click=${() => it.confirm ? this.confirmToggle(it.entity, name) : this.toggle(it.entity)}>
              <span style="width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                  transition:all .18s;
                  background:${on ? accent : "rgba(255,255,255,.07)"};
                  color:${on ? "#0C1117" : "rgba(255,255,255,.55)"}">
                <ha-icon .icon=${icon} style="--mdc-icon-size:21px"></ha-icon>
              </span>
              <span style="font-size:11.5px;font-weight:700;max-width:100%;overflow:hidden;white-space:nowrap;
                  text-overflow:ellipsis;color:${on ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.65)"}">
                ${name}${it.confirm ? " \u{1F512}" : ""}</span>
              <span style="font-size:9.5px;font-weight:800;letter-spacing:1px;
                  color:${on ? accent : "rgba(255,255,255,.35)"}">${on ? "AN" : "AUS"}</span>
            </button>`;
          })}
        </div>`)}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-controls-card", GrowctrlControlsCard);

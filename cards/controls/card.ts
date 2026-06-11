/*==============================================================================
 * GROWCTRL – growctrl-controls-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Aktoren v2: Kachel mit Icon + Schalter-Optik (Pille), Gruppen, Bestaetigung; Stil konfigurierbar.
 * Version : 2.1.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import { GrowctrlBaseCard, sharedStyles, cardVars, type StyleConfig } from "../core/index";

interface ControlItem { entity: string; name?: string; icon?: string; confirm?: boolean; group?: string; }
interface ControlsConfig { type: string; title?: string; controls: ControlItem[]; columns?: number; style?: StyleConfig; }

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
    const groups = new Map<string, ControlItem[]>();
    c.controls.forEach(it => {
      const g = it.group ?? "";
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g)!.push(it);
    });
    const cols = c.columns ?? 2;
    return html`<div class="card ${c.style?.glass ? "glass" : ""}" style="${cardVars(c.style)};position:relative">
      ${c.title ? html`<div class="title" style="font-size:15px">${c.title}</div>` : nothing}
      ${[...groups.entries()].map(([g, items]) => html`
        ${g ? html`<div class="seclbl">${g}</div>` : nothing}
        <div class="grid" style="grid-template-columns:repeat(${cols},1fr);margin-top:${g ? 0 : 10}px">
          ${items.map(it => {
            const on = this.isOn(it.entity);
            const name = it.name ?? this.friendly(it.entity);
            const stateObj = this.hass.states[it.entity];
            const icon = it.icon ?? stateObj?.attributes?.icon;
            return html`<button class="gc tile" style="display:flex;align-items:center;gap:11px;padding:12px 13px;
                background:${on ? "rgba(77,255,195,.10)" : "rgba(255,255,255,.045)"};
                border:1px solid ${on ? "rgba(77,255,195,.3)" : "rgba(255,255,255,.07)"}"
              @click=${() => it.confirm ? this.confirmToggle(it.entity, name) : this.toggle(it.entity)}>
              <span style="width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;
                  background:${on ? "rgba(77,255,195,.16)" : "rgba(255,255,255,.06)"};color:${on ? "#4DFFC3" : "rgba(255,255,255,.5)"}">
                ${icon ? html`<ha-icon .icon=${icon} style="--mdc-icon-size:19px"></ha-icon>` : html`\u23FB`}
              </span>
              <span style="flex:1;min-width:0;text-align:left">
                <span style="display:block;font-size:12px;font-weight:700;color:rgba(255,255,255,.9);
                  white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}${it.confirm ? " \u{1F512}" : ""}</span>
                <span style="display:block;font-size:10px;font-weight:600;color:${on ? "#4DFFC3" : "rgba(255,255,255,.4)"}">${on ? "AN" : "AUS"}</span>
              </span>
              <span style="width:34px;height:19px;border-radius:10px;flex-shrink:0;position:relative;transition:background .2s;
                  background:${on ? "rgba(77,255,195,.5)" : "rgba(255,255,255,.14)"}">
                <span style="position:absolute;top:2.5px;width:14px;height:14px;border-radius:50%;background:#fff;
                  transition:left .2s;left:${on ? "17.5px" : "2.5px"}"></span>
              </span>
            </button>`;
          })}
        </div>`)}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-controls-card", GrowctrlControlsCard);

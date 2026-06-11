/*==============================================================================
 * GROWCTRL – growctrl-controls-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Aktoren-Raster mit Gruppen und Bestaetigung fuer kritische Schalter. Ebenen-neutral: Zelt-, Stations- oder Pflanzen-Aktoren.
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import { GrowctrlBaseCard, sharedStyles } from "../core/index";

interface ControlItem { entity: string; name?: string; icon?: string; confirm?: boolean; group?: string; }
interface ControlsConfig { type: string; title?: string; controls: ControlItem[]; columns?: number; }

export class GrowctrlControlsCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  protected validateConfig(c: ControlsConfig) {
    if (!Array.isArray(c.controls) || !c.controls.length)
      throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.");
  }
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
    const cols = c.columns ?? 3;
    return html`<div class="card" style="position:relative">
      ${c.title ? html`<div class="title" style="font-size:15px">${c.title}</div>` : nothing}
      ${[...groups.entries()].map(([g, items]) => html`
        ${g ? html`<div class="seclbl">${g}</div>` : nothing}
        <div class="grid" style="grid-template-columns:repeat(${cols},1fr)">
          ${items.map(it => {
            const on = this.isOn(it.entity);
            const name = it.name ?? this.friendly(it.entity);
            return html`<button class="gc tile" style="text-align:left;
                background:${on ? "rgba(77,255,195,.15)" : "rgba(0,0,0,.20)"};
                border:1px solid ${on ? "rgba(77,255,195,.25)" : "rgba(255,255,255,.08)"}"
              @click=${() => it.confirm ? this.confirmToggle(it.entity, name) : this.toggle(it.entity)}>
              <div class="lbl" style="color:${on ? "#4DFFC3" : "rgba(255,255,255,.5)"}">${name}</div>
              <div class="val sm" style="color:${on ? "#4DFFC3" : "rgba(255,255,255,.6)"}">${on ? "AN" : "AUS"}${it.confirm ? " \u26A0\uFE0F" : ""}</div>
            </button>`;
          })}
        </div>`)}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-controls-card", GrowctrlControlsCard);

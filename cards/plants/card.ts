/*==============================================================================
 * GROWCTRL – growctrl-plants-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Pflanzen-Ebene: Sorte, Alter (Keimdatum), eigene Sensoren je Pflanze (z.B. eigene O2-/Zirkulationspumpe als Aktor in Controls), Kalender-Ereignisse.
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import { GrowctrlBaseCard, sharedStyles, daysSince, num, fetchCalendar } from "../core/index";

interface PlantItem { name: string; strain?: string; germination_helper?: string; sensors?: { entity: string; name?: string }[]; }
interface PlantsConfig { type: string; title?: string; plants: PlantItem[]; calendar?: string; columns?: number; }

export class GrowctrlPlantsCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _events: { state: true } };
  private _events: any[] = [];
  private _timer?: number;

  protected validateConfig(c: PlantsConfig) {
    if (!Array.isArray(c.plants) || !c.plants.length)
      throw new Error("growctrl-plants-card: 'plants' (min. 1 Eintrag) ist Pflicht.");
  }
  static getStubConfig() { return { plants: [{ name: "Pflanze 1" }] }; }

  connectedCallback() {
    super.connectedCallback();
    this._load();
    this._timer = window.setInterval(() => this._load(), 10 * 60_000);
  }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    const c = this._config as PlantsConfig;
    if (!c.calendar) return;
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    this._events = (await fetchCalendar(this.hass, c.calendar)).slice(0, 3);
  }

  render() {
    const c = this._config as PlantsConfig;
    if (!this.hass) return nothing;
    return html`<div class="card">
      ${c.title ? html`<div class="title" style="font-size:15px">${c.title}</div>` : nothing}
      <div class="grid" style="grid-template-columns:repeat(${c.columns ?? 2},1fr)">
        ${c.plants.map(p => {
          const germ = p.germination_helper ? this.st(p.germination_helper) : undefined;
          const age = germ ? daysSince(germ) : null;
          return html`<div class="tile">
            <div style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
              <span style="font-size:13px;font-weight:800">\u{1F331} ${p.name}</span>
              ${p.strain ? html`<span style="font-size:10px;color:rgba(255,255,255,.55)">${p.strain}</span>` : nothing}
            </div>
            ${age !== null ? html`<div class="lbl" style="margin-top:4px">Tag ${age}</div>` : nothing}
            ${(p.sensors ?? []).map(s => html`
              <button class="gc" style="display:flex;justify-content:space-between;width:100%;font-size:11px;margin-top:4px;color:rgba(255,255,255,.75)"
                @click=${() => this.moreInfo(s.entity)}>
                <span>${s.name ?? this.friendly(s.entity)}</span>
                <span style="font-weight:700">${num(this.st(s.entity)) ?? "--"} ${this.unit(s.entity)}</span>
              </button>`)}
          </div>`;
        })}
      </div>
      ${c.calendar ? html`<div class="seclbl">Anstehend</div>
        ${this._events.length ? this._events.map(e => html`
          <div class="logrow" style="background:rgba(0,0,0,.18);margin-top:4px">
            <span class="txt">${e.summary}</span>
            <span class="ts">${(e.start?.date ?? e.start?.dateTime ?? "").substring(0,10)}</span>
          </div>`) : html`<div class="logrow" style="background:rgba(0,0,0,.12)"><span class="txt" style="color:rgba(255,255,255,.35)">Keine Ereignisse</span></div>`}` : nothing}
    </div>`;
  }
}
customElements.define("growctrl-plants-card", GrowctrlPlantsCard);

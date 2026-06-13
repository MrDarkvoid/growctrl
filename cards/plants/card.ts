/*==============================================================================
 * GROWCTRL – growctrl-plants-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Pflanzen-Ebene (v6): je Pflanze ein Panel (Bild/Sorte/Alter), eigene
 *           Sensoren als Werte-Felder, optionale Kalender-Ereignisse als Log.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import { GrowctrlBaseCard, sharedStyles, daysSince, fmtAge, num, fetchCalendar, cardVars, type StyleConfig } from "../core/index";

type PlantSensor = string | { entity: string; name?: string };
interface PlantItem { name: string; strain?: string; germination_helper?: string; sensors?: PlantSensor[]; camera?: string; image?: string; }
interface PlantsConfig { type: string; title?: string; plants: PlantItem[]; calendar?: string; columns?: number; style?: StyleConfig; }

export class GrowctrlPlantsCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _events: { state: true }, _tick: { state: true } };
  private _events: any[] = [];
  private _timer?: number;
  private _tick = 0;
  private _mediaTimer?: number;

  protected validateConfig(c: PlantsConfig) {
    if (!Array.isArray(c.plants) || !c.plants.length)
      throw new Error("growctrl-plants-card: 'plants' (min. 1 Eintrag) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-plants-editor"); }
  static getStubConfig() { return { plants: [{ name: "Pflanze 1" }] }; }

  connectedCallback() {
    super.connectedCallback();
    this._load();
    this._timer = window.setInterval(() => this._load(), 10 * 60_000);
    this._mediaTimer = window.setInterval(() => { this._tick++; }, 10_000);
  }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); if (this._mediaTimer) clearInterval(this._mediaTimer); }
  private async _load() {
    const c = this._config as PlantsConfig;
    if (!c.calendar) return;
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    this._events = (await fetchCalendar(this.hass, c.calendar)).slice(0, 3);
  }

  render() {
    const c = this._config as PlantsConfig;
    if (!this.hass) return nothing;
    const cols = c.columns ?? 2;
    return html`<div class="card ${c.style?.glass ? "glass" : ""}" style=${cardVars(c.style)}>
      ${c.title ? html`<div class="hd"><div class="ttl">${c.title}</div></div>` : nothing}
      <div style="display:grid; gap:10px; grid-template-columns:repeat(${cols},minmax(0,1fr))">
        ${c.plants.map(p => {
          const germ = p.germination_helper ? this.st(p.germination_helper) : undefined;
          const age = germ ? daysSince(germ) : null;
          const pic = p.camera
            ? (this.hass.states[p.camera]?.attributes?.entity_picture ? `${this.hass.states[p.camera].attributes.entity_picture}&t=${this._tick}` : undefined)
            : p.image;
          return html`<div class="plant" style="margin-top:0">
            <div class="phd">
              ${pic
                ? html`<button class="gc" style="flex-shrink:0" @click=${() => p.camera && this.moreInfo(p.camera)}>
                    <img src=${pic} class="pimg" style="object-fit:cover" loading="lazy" alt=${p.name} /></button>`
                : html`<div class="pimg"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:27px"></ha-icon></div>`}
              <div style="flex:1; min-width:0">
                <div class="pname">${p.name}</div>
                ${p.strain ? html`<div class="pstrain">${p.strain}</div>` : nothing}
                ${age !== null ? html`<span class="agechip">${fmtAge(age)}</span>` : nothing}
              </div>
            </div>
            ${(p.sensors ?? []).map(raw => { const s = typeof raw === "string" ? { entity: raw } : raw; return html`
              <button class="gc ind" style="margin-top:8px" @click=${() => this.moreInfo(s.entity)}>
                <div class="ihd"><span class="ilbl" style="color:var(--tx-2)">${s.name ?? this.friendly(s.entity)}</span>
                  <span class="ival">${num(this.st(s.entity)) ?? "--"}<span class="u"> ${this.unit(s.entity)}</span></span></div>
              </button>`; })}
          </div>`;
        })}
      </div>
      ${c.calendar ? html`<div class="seclbl">Anstehend</div>
        <div class="log">
          ${this._events.length ? this._events.map(e => html`
            <div class="lrow"><span class="tm">${(e.start?.date ?? e.start?.dateTime ?? "").substring(5, 10)}</span><span class="what">${e.summary}</span></div>`)
          : html`<div class="lrow"><span class="what" style="color:var(--tx-3)">Keine Ereignisse</span></div>`}
        </div>` : nothing}
    </div>`;
  }
}
customElements.define("growctrl-plants-card", GrowctrlPlantsCard);

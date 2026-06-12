/*==============================================================================
 * GROWCTRL – core/base-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Abstrakte Basisklasse aller GROWCTRL-Karten: hass-Handling, State-Helfer, more-info, Bestaetigungs-Overlay.
 * Version : 2.0.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { LitElement, html, nothing } from "lit";
import type { HomeAssistant } from "./types";

export abstract class GrowctrlBaseCard extends LitElement {
  static properties = { hass: { attribute: false }, _config: { state: true }, _confirm: { state: true } };
  hass!: HomeAssistant;
  protected _config: any = {};
  protected _confirm: { text: string; action: () => void } | null = null;

  setConfig(config: any) { this.validateConfig(config); this._config = config; }
  protected validateConfig(_config: any): void { /* je Karte */ }
  getCardSize(): number { return 4; }

  protected st(eid?: string): string | undefined { return eid ? this.hass?.states[eid]?.state : undefined; }
  protected isOn(eid?: string): boolean { return this.st(eid) === "on"; }
  protected friendly(eid?: string): string {
    return (eid && this.hass?.states[eid]?.attributes?.friendly_name) || eid || "";
  }
  protected unit(eid?: string): string { return (eid && this.hass?.states[eid]?.attributes?.unit_of_measurement) || ""; }

  protected moreInfo(eid: string) {
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: eid }, bubbles: true, composed: true }));
  }
  protected navigate(path: string) {
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed"));
  }
  protected toggle(eid: string) {
    const domain = eid.split(".")[0];
    const d = ["switch","input_boolean","light","fan"].includes(domain) ? domain : "homeassistant";
    this.hass.callService(d, "toggle", { entity_id: eid });
  }
  /** Toggle mit Bestaetigungs-Overlay (fuer kritische Aktoren). */
  protected confirmToggle(eid: string, name: string) {
    this._confirm = { text: `${name} wirklich schalten?`, action: () => this.toggle(eid) };
  }
  protected renderConfirm() {
    if (!this._confirm) return nothing;
    return html`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
        display:flex;align-items:center;justify-content:center;z-index:5">
      <div style="background:#1c2330;border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:16px;max-width:80%">
        <div style="font-size:13px;margin-bottom:12px">${this._confirm.text}</div>
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <button class="gc" style="padding:6px 14px;border-radius:8px;background:rgba(255,255,255,.1)"
            @click=${() => { this._confirm = null; }}>Abbrechen</button>
          <button class="gc" style="padding:6px 14px;border-radius:8px;background:rgba(77,255,195,.2);color:#4DFFC3"
            @click=${() => { this._confirm!.action(); this._confirm = null; }}>Schalten</button>
        </div>
      </div>
    </div>`;
  }
}

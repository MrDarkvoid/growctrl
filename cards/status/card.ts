/*==============================================================================
 * GROWCTRL – growctrl-status-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Uebersetzte Live-Logs (Station/Klima) mit Schweregrad-Ampel; Experten-Bereich mit Roh-Logs und Wartung/Testmodus (immer mit Bestaetigung).
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX,
  translateStationLog, translateKlimaLog,
} from "../core/index";

interface LogItem { entity: string; name?: string; type?: "station" | "climate"; }
interface ExpertCfg { controls?: { entity: string; name?: string }[]; show_raw?: boolean; }
interface StatusConfig { type: string; title?: string; logs: LogItem[]; expert?: ExpertCfg; }

export class GrowctrlStatusCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _expert: { state: true } };
  private _expert = false;

  protected validateConfig(c: StatusConfig) {
    if (!Array.isArray(c.logs) || !c.logs.length)
      throw new Error("growctrl-status-card: 'logs' (min. 1 Eintrag) ist Pflicht.");
  }
  static getStubConfig() { return { logs: [{ entity: "input_text.hydro_log_mittel_main1" }] }; }

  render() {
    const c = this._config as StatusConfig;
    if (!this.hass) return nothing;
    const rows = c.logs.map(l => ({
      l, r: (l.type === "climate" ? translateKlimaLog : translateStationLog)(this.st(l.entity)),
    }));
    const levels = rows.map(x => x.r.level);
    let warn: { label: string; color: string } = { label: "\u2713 Alles OK", color: THEME.ok };
    if (levels.includes("critical")) warn = { label: "\u{1F6A8} Fehler", color: THEME.crit };
    else if (levels.includes("warning")) warn = { label: "\u26A0\uFE0F Warnung", color: THEME.warn };
    else if (levels.includes("info")) warn = { label: "\u2139\uFE0F Info", color: THEME.info };

    return html`<div class="card" style="position:relative">
      <div class="hdr" style="align-items:center">
        <div class="title" style="font-size:15px">${c.title ?? "Status"}</div>
        <span class="stagebadge" style="background:rgba(0,0,0,.25);color:${warn.color}">${warn.label}</span>
      </div>
      ${rows.map(({ l, r }) => html`
        <div class="logrow" style="background:${LOG_BG[r.level]};margin-top:6px">
          ${l.name ? html`<span style="font-size:11px;font-weight:700;color:${THEME.logLabel};min-width:42px;flex-shrink:0">${l.name}</span>` : nothing}
          <span class="txt" style="color:${LOG_TX[r.level]}">${r.label}</span>
          ${r.ts ? html`<span class="ts">${r.ts}</span>` : nothing}
        </div>`)}
      ${c.expert ? html`
        <button class="gc seclbl" style="display:block;width:100%;text-align:left"
          @click=${() => { this._expert = !this._expert; }}>Experte ${this._expert ? "\u25B2" : "\u25BC"}</button>
        ${this._expert ? html`
          ${(c.expert.controls ?? []).length ? html`<div class="grid" style="grid-template-columns:repeat(2,1fr)">
            ${c.expert.controls!.map(it => {
              const on = this.isOn(it.entity);
              const name = it.name ?? this.friendly(it.entity);
              return html`<button class="gc tile" style="text-align:left;
                  background:${on ? "rgba(255,165,0,.18)" : "rgba(0,0,0,.18)"};
                  border:1px solid ${on ? "rgba(255,165,0,.38)" : "rgba(255,165,0,.15)"}"
                @click=${() => this.confirmToggle(it.entity, name)}>
                <div class="lbl" style="color:${on ? "#FFD166" : "rgba(255,255,255,.45)"}">${name}</div>
                <div class="val sm" style="color:${on ? "#FFD166" : "rgba(255,255,255,.5)"}">${on ? "AN" : "AUS"}</div>
              </button>`;
            })}
          </div>` : nothing}
          ${c.expert.show_raw !== false ? c.logs.map(l => html`
            <div style="background:rgba(0,0,0,.28);border-radius:8px;padding:9px 11px;margin-top:6px">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:rgba(255,215,0,.65);margin-bottom:4px">${l.name ?? l.entity}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.72);font-family:monospace;word-break:break-all;line-height:1.6">${this.st(l.entity) ?? "\u2013"}</div>
            </div>`) : nothing}` : nothing}` : nothing}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-status-card", GrowctrlStatusCard);

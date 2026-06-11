/*==============================================================================
 * GROWCTRL – growctrl-station-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Eine Station: Licht-/Pumpenbalken mit Restzeit, Stage-Badge + Phasen-Chips, Auto-Schalter, einklappbare Konfig-Kacheln. Nutzt den Entity-Resolver (Profil ODER explizit).
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX, STAGE_COLORS,
  resolveStation, fmtMin, toMin, num,
  translateStationLog, pumpOnFromLog,
  type StationProfile, type Role,
} from "../core/index";

interface StationConfig {
  type: string;
  name?: string;
  station?: StationProfile;                     // Quelle B (+A via overrides)
  show_settings?: boolean; settings_collapsed?: boolean;
  show_stage_chips?: boolean;
}
const STAGES = ["Seedling","Veg","Bloom","Flush"];

export class GrowctrlStationCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _open: { state: true } };
  private _open = false;

  protected validateConfig(c: StationConfig) {
    if (!c.station?.tent || !c.station?.station)
      throw new Error("growctrl-station-card: 'station: { tent, station }' ist Pflicht (Profil-Modus).");
  }
  static getStubConfig() { return { station: { tent: "mittel", station: "main1", light_switch: "switch.licht" } }; }

  render() {
    const c = this._config as StationConfig;
    if (!this.hass) return nothing;
    const p = c.station!;
    const r = resolveStation(this.hass, p);
    const get = (role: Role) => r[role];

    const stage = this.st(get("stage")) ?? "";
    const auto = this.isOn(get("auto"));
    const licht = p.light_switch ? this.isOn(p.light_switch) : false;
    const log = this.st(get("log"));
    const lr = num(this.st(get("light_rest")));
    const pr = num(this.st(get("pump_rest")));

    // Tag-/Nachtdauer fuer Balanced-Balken (portiert aus Checkup)
    const dtOn = this.st(get("light_on")) ?? "";
    const dtOff = (stage === "Bloom" || stage === "Flush")
      ? this.st(get("light_off_bloom")) ?? "" : this.st(get("light_off_sv")) ?? "";
    let dayMin = (dtOff ? toMin(dtOff) : 0) - (dtOn ? toMin(dtOn) : 0);
    if (dayMin <= 0) dayMin += 24 * 60;
    const nightMin = 24 * 60 - dayMin;

    const sk = stage === "Seedling" ? "seedling" : stage === "Veg" ? "veg" : "bloom";
    const pOn = num(this.st(get(`pump_on_${sk}` as Role)), 10)!;
    const pOff = num(this.st(get(`pump_off_${sk}` as Role)), 15)!;
    const pCyc = pOn + pOff;
    const pumpeAn = pumpOnFromLog(log);

    const lPct = lr !== null && dayMin > 0 ? Math.min(100, Math.round((lr / dayMin) * 100)) : 0;
    const nPct = lr !== null && nightMin > 0 ? Math.min(100, Math.round((lr / nightMin) * 100)) : 0;
    const pPct = pr !== null && pCyc > 0 ? Math.min(100, Math.round((pr / pCyc) * 100)) : 0;

    const sc = STAGE_COLORS[stage] ?? { bg: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" };
    const rs = translateStationLog(log);
    const bar = (icon: string, fill: string, w: number, time: string, tc: string, dim = false) => html`
      <div class="barrow">
        <span class="ico" style=${dim ? "opacity:.25" : ""}>${icon}</span>
        <div class="track"><div class="fill" style="background:${fill};width:${w}%"></div></div>
        <span class="time" style="color:${tc}">${time}</span>
      </div>`;

    const settingsTiles = [
      { eid: get("light_on"), name: "Licht AN", val: (this.st(get("light_on")) ?? "").substring(0,5) },
      { eid: get(stage === "Bloom" || stage === "Flush" ? "light_off_bloom" : "light_off_sv"),
        name: "Licht AUS", val: (dtOff ?? "").substring(0,5) },
      { eid: get(`pump_on_${sk}` as Role), name: "Pumpe AN", val: `${pOn} min` },
      { eid: get(`pump_off_${sk}` as Role), name: "Pumpe AUS", val: `${pOff} min` },
    ].filter(t => t.eid);

    return html`<div class="card" style="position:relative">
      <div class="hdr" style="align-items:center">
        <span style="font-size:14px;font-weight:800">${c.name ?? `${p.tent} \u00b7 ${p.station}`}</span>
        <span class="stagebadge" style="background:${sc.bg};color:${sc.color}">${stage || "\u2013"}</span>
        <div style="flex:1"></div>
        <span style="width:8px;height:8px;border-radius:50%;flex-shrink:0;
          background:${licht ? "#FFD700" : auto ? "#8B9FC4" : "rgba(255,255,255,.18)"}"></span>
        <span style="font-size:11px;font-weight:700;color:${licht ? "rgba(255,255,255,.85)" : auto ? "#B0BED4" : "rgba(255,255,255,.3)"}">
          ${licht ? "\u{1F4A1} AN" : auto ? "\u{1F319} AUS" : "\u{1F4A1} Auto AUS"}</span>
        ${get("auto") ? html`<button class="gc stagebadge"
            style="background:${auto ? "rgba(77,255,195,.15)" : "rgba(255,107,107,.15)"};color:${auto ? "#4DFFC3" : "#FF6B6B"}"
            @click=${() => this.toggle(get("auto")!)}>Auto ${auto ? "AN" : "AUS"}</button>` : nothing}
      </div>
      <div style="display:flex;flex-direction:column;gap:7px;margin-top:10px">
        ${licht ? bar("\u{1F4A1}", "linear-gradient(90deg,#FFD700,#FFA500)", lPct, fmtMin(lr), THEME.muted)
          : auto ? bar("\u{1F319}", "linear-gradient(90deg,#8B9FC4,#5B6F96)", nPct, `AN in ${fmtMin(lr)}`, THEME.label)
          : bar("\u{1F4A1}", "transparent", 0, "\u2013", "rgba(255,255,255,.25)", true)}
        ${pumpeAn ? bar("\u{1F4A7}", "linear-gradient(90deg,#4FC3F7,#0288D1)", pPct, fmtMin(pr), THEME.muted)
          : bar("\u{1F4A7}", "transparent", 0, "\u2013", "rgba(255,255,255,.25)", true)}
      </div>
      ${c.show_stage_chips !== false && get("stage") ? html`
        <div style="display:flex;gap:6px;margin-top:10px">
          ${STAGES.map(s => {
            const col = STAGE_COLORS[s];
            const active = stage === s;
            return html`<button class="gc" style="flex:1;text-align:center;padding:8px 4px;border-radius:11px;
                font-size:11px;font-weight:700;
                background:${active ? col.bg : "rgba(255,255,255,.05)"};
                border:1px solid ${active ? col.color : "rgba(255,255,255,.12)"};
                color:${active ? col.color : "rgba(255,255,255,.5)"}"
              @click=${() => this.hass.callService("input_select","select_option",
                { entity_id: get("stage"), option: s })}>${s}</button>`;
          })}
        </div>` : nothing}
      ${c.show_settings !== false && settingsTiles.length ? html`
        <button class="gc seclbl" style="display:block;width:100%;text-align:left"
          @click=${() => { this._open = !this._open; }}>
          Konfiguration ${this._open ? "\u25B2" : "\u25BC"}</button>
        ${this._open ? html`<div class="grid" style="grid-template-columns:repeat(${Math.min(4, settingsTiles.length)},1fr);margin-top:2px">
          ${settingsTiles.map(tl => html`<button class="gc tile" style="text-align:left"
              @click=${() => this.moreInfo(tl.eid!)}>
            <div class="lbl">${tl.name}</div><div class="val sm">${tl.val || "\u2013"}</div></button>`)}
        </div>` : nothing}` : nothing}
      <div class="logrow" style="background:${LOG_BG[rs.level]};margin-top:10px">
        <span class="txt" style="color:${LOG_TX[rs.level]}">${rs.label}</span>
        ${rs.ts ? html`<span class="ts">${rs.ts}</span>` : nothing}
      </div>
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-station-card", GrowctrlStationCard);

/*==============================================================================
 * GROWCTRL – growctrl-station-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Station v2: modernes Layout, Status-Ampel auf Kartenrahmen, Systemtyp DWC (EC/pH/Wassertemp/Fuellstand) oder Erde (Bodenfeuchte/-temp/EC/pH) mit Sollbereich-Ampeln, Stage-Chips, Konfig-Kacheln, Stil konfigurierbar.
 * Version : 2.1.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX, STAGE_COLORS,
  cardVars, type StyleConfig,
  resolveStation, fmtMin, toMin, num,
  translateStationLog, pumpOnFromLog,
  type StationProfile, type Role,
} from "../core/index";

/** Messwert mit optionalem Sollbereich -> Ampelfarbe. */
interface RangeSensor { entity?: string; min?: number; max?: number; }
interface DwcConfig  { ec?: RangeSensor; ph?: RangeSensor; water_temp?: RangeSensor; level?: RangeSensor; }
interface SoilConfig { moisture?: RangeSensor; soil_temp?: RangeSensor; ec?: RangeSensor; ph?: RangeSensor; }

interface StationConfig {
  type: string; name?: string;
  station?: StationProfile;
  system?: "generic" | "dwc" | "soil";
  dwc?: DwcConfig; soil?: SoilConfig;
  show_settings?: boolean; show_stage_chips?: boolean;
  style?: StyleConfig;
}
const STAGES = ["Seedling","Veg","Bloom","Flush","Trocknung"];
const DWC_DEFS: Array<[keyof DwcConfig, string, string]> = [
  ["ec", "EC", "mS/cm"], ["ph", "pH", ""], ["water_temp", "Wasser", "\u00b0C"], ["level", "F\u00fcllstand", "%"],
];
const SOIL_DEFS: Array<[keyof SoilConfig, string, string]> = [
  ["moisture", "Bodenfeuchte", "%"], ["soil_temp", "Bodentemp", "\u00b0C"], ["ec", "EC Boden", "mS/cm"], ["ph", "pH Boden", ""],
];

export class GrowctrlStationCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _open: { state: true } };
  private _open = false;

  protected validateConfig(c: StationConfig) {
    if (!c.station?.tent || !c.station?.station)
      throw new Error("growctrl-station-card: 'station: { tent, station }' ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-station-editor"); }
  static getStubConfig() { return { station: { tent: "mittel", station: "main1", light_switch: "switch.licht" } }; }

  /** Ampelfarbe fuer Messwert mit Sollbereich. */
  private rangeColor(v: number | null, r: RangeSensor): string {
    if (v === null) return "rgba(255,255,255,.35)";
    if (r.min !== undefined && v < r.min) return THEME.crit;
    if (r.max !== undefined && v > r.max) return THEME.crit;
    return THEME.ok;
  }
  private rangeBad(v: number | null, r: RangeSensor): boolean {
    return v !== null && ((r.min !== undefined && v < r.min) || (r.max !== undefined && v > r.max));
  }

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

    const sc = STAGE_COLORS[stage] ?? { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" };
    const rs = translateStationLog(log);

    // Systemwerte (DWC / Erde) + Karten-Ampel
    const defs: Array<[string, string, string, RangeSensor]> =
      c.system === "dwc" ? DWC_DEFS.filter(([k]) => c.dwc?.[k]?.entity).map(([k, l, u]) => [k as string, l, u, c.dwc![k]!])
      : c.system === "soil" ? SOIL_DEFS.filter(([k]) => c.soil?.[k]?.entity).map(([k, l, u]) => [k as string, l, u, c.soil![k]!])
      : [];
    const sysVals = defs.map(([k, l, u, rs2]) => {
      const v = num(this.st(rs2.entity));
      return { key: k, label: l, unit: u, v, color: this.rangeColor(v, rs2), bad: this.rangeBad(v, rs2), entity: rs2.entity! };
    });
    let level: string = rs.level === "none" ? "ok" : rs.level;
    if (sysVals.some(s => s.bad) && level !== "critical") level = "warning";

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
    ].filter(tl => tl.eid);

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level}
        style="${cardVars(c.style)};position:relative">
      <div class="hdr">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="title" style="font-size:15px">${c.name ?? `${p.tent} \u00b7 ${p.station}`}</span>
          <span class="stagebadge" style="background:${sc.bg};color:${sc.color}">${stage || "\u2013"}</span>
          ${c.system && c.system !== "generic" ? html`<span class="badge" style="font-size:9px">${c.system === "dwc" ? "DWC" : "Erde"}</span>` : nothing}
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;
            background:${licht ? "#FFD700" : auto ? "#8B9FC4" : "rgba(255,255,255,.18)"};
            ${licht ? "box-shadow:0 0 8px #FFD700aa" : ""}"></span>
          <span style="font-size:11px;font-weight:700;color:${licht ? "rgba(255,255,255,.9)" : auto ? "#B0BED4" : "rgba(255,255,255,.3)"}">
            ${licht ? "Licht AN" : auto ? "Nacht" : "Inaktiv"}</span>
          ${c.show_settings !== false && settingsTiles.length ? html`<button class="gc"
              title="Konfiguration" style="width:26px;height:26px;border-radius:8px;display:flex;align-items:center;
                justify-content:center;background:${this._open ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.05)"};
                border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.6)"
              @click=${() => { this._open = !this._open; }}>
              <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:14px"></ha-icon></button>` : nothing}
          ${get("auto") ? html`<button class="gc stagebadge"
              style="background:${auto ? "rgba(77,255,195,.14)" : "rgba(255,107,107,.14)"};
                border:1px solid ${auto ? "rgba(77,255,195,.3)" : "rgba(255,107,107,.3)"};
                color:${auto ? "#4DFFC3" : "#FF6B6B"}"
              @click=${() => this.toggle(get("auto")!)}>Auto ${auto ? "AN" : "AUS"}</button>` : nothing}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
        ${licht ? bar("\u{1F4A1}", "linear-gradient(90deg,#FFD700,#FFA500)", lPct, fmtMin(lr), THEME.muted)
          : auto ? bar("\u{1F319}", "linear-gradient(90deg,#8B9FC4,#5B6F96)", nPct, `AN in ${fmtMin(lr)}`, THEME.label)
          : bar("\u{1F4A1}", "transparent", 0, "\u2013", "rgba(255,255,255,.25)", true)}
        ${pumpeAn ? bar("\u{1F4A7}", "linear-gradient(90deg,#4FC3F7,#0288D1)", pPct, fmtMin(pr), THEME.muted)
          : bar("\u{1F4A7}", "transparent", 0, "\u2013", "rgba(255,255,255,.25)", true)}
      </div>
      ${sysVals.length ? html`
        <div class="grid" style="grid-template-columns:repeat(${Math.min(4, sysVals.length)},1fr)">
          ${sysVals.map(s => html`<button class="gc tile" style="text-align:left;padding:9px 11px;
              ${s.bad ? "border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)" : ""}"
            @click=${() => this.moreInfo(s.entity)}>
            <div class="lbl">${s.label}</div>
            <div class="val sm" style="color:${s.color}">${s.v !== null ? s.v : "--"}<span class="unit">${s.unit}</span></div>
          </button>`)}
        </div>` : nothing}
      ${c.show_stage_chips !== false && get("stage") ? html`
        <div style="display:flex;gap:6px;margin-top:10px">
          ${STAGES.map(s => {
            const col = STAGE_COLORS[s];
            const active = stage === s;
            return html`<button class="gc" style="flex:1;text-align:center;padding:9px 4px;border-radius:12px;
                font-size:11px;font-weight:700;transition:all .15s;
                background:${active ? col.bg : "rgba(255,255,255,.04)"};
                border:1px solid ${active ? col.color : "rgba(255,255,255,.1)"};
                color:${active ? col.color : "rgba(255,255,255,.45)"}"
              @click=${() => this.hass.callService("input_select","select_option",
                { entity_id: get("stage"), option: s })}>${s}</button>`;
          })}
        </div>` : nothing}
      ${c.show_settings !== false && settingsTiles.length ? html`
        ${this._open ? html`<div class="grid" style="grid-template-columns:repeat(${Math.min(4, settingsTiles.length)},1fr);margin-top:10px">
          ${settingsTiles.map(tl => html`<button class="gc tile" style="text-align:left;padding:9px 11px"
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

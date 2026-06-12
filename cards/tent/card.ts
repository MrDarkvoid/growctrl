/*==============================================================================
 * GROWCTRL – growctrl-tent-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Zelt-Klima (integrations-nativ): Zelt/Klima-Schalter, Temp/RH/VPD aus dem VPD-Sensor, Modus- und Phasen-Chips, VPD-24h-Chart mit Sollband der effektiven Phase, Ereigniszeile.
 * Version : 2.4.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, STATUS_PILL, LOG_TX,
  cardVars, type StyleConfig, num, fetchHistory, lineChart,
  tentEnt, TENT, type GcOverrides,
} from "../core/index";

const MODES = ["VPD", "RH"];
const PHASES = ["Auto", "Seedling", "Veg", "Bloom", "Trocknung"];

interface TentConfig {
  type: string; tent: string; name?: string;
  show_chart?: boolean; hours?: number;
  overrides?: GcOverrides; style?: StyleConfig;
}

export class GrowctrlTentCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true } };
  private _hist: number[] = [];
  private _timer?: number;

  protected validateConfig(c: TentConfig) {
    if (!c.tent) throw new Error("growctrl-tent-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).");
  }
  static getConfigElement() { return document.createElement("growctrl-tent-editor"); }
  static getStubConfig() { return { tent: "gross" }; }

  private e(key: keyof typeof TENT): string {
    const [domain, suffix] = TENT[key];
    const c = this._config as TentConfig;
    return tentEnt(domain, c.tent, suffix, c.overrides);
  }
  private _select(entity: string, option: string) {
    this.hass.callService("select", "select_option", { entity_id: entity, option });
  }
  connectedCallback() {
    super.connectedCallback();
    this._load();
    this._timer = window.setInterval(() => this._load(), 5 * 60_000);
  }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    this._hist = await fetchHistory(this.hass, this.e("vpd"), (this._config as TentConfig).hours ?? 24);
  }

  private chips(entity: string, options: string[], current: string) {
    return html`<div style="display:flex;gap:5px;flex-wrap:wrap">
      ${options.map(o => html`<button class="gc" style="padding:4px 11px;border-radius:9px;font-size:10.5px;
          font-weight:700;transition:all .15s;
          background:${o === current ? "rgba(77,255,195,.13)" : "rgba(255,255,255,.04)"};
          border:1.5px solid ${o === current ? THEME.ok : "rgba(255,255,255,.09)"};
          color:${o === current ? THEME.ok : "rgba(255,255,255,.45)"}"
        @click=${() => this._select(entity, o)}>${o}</button>`)}
    </div>`;
  }

  render() {
    const c = this._config as TentConfig;
    if (!this.hass) return nothing;
    const vpdSt = this.hass.states[this.e("vpd")];
    const v = num(vpdSt?.state);
    const t = vpdSt?.attributes?.temp as number | null;
    const h = vpdSt?.attributes?.rh as number | null;
    const phaseEff = (vpdSt?.attributes?.phase_effektiv as string) ?? "Veg";
    const targets = vpdSt?.attributes?.sollwerte as
      { vpd_min: number; vpd_max: number; rh_min: number; rh_max: number } | undefined;
    const enabled = this.isOn(this.e("enabled"));
    const climate = this.isOn(this.e("climate"));
    const statusSt = this.hass.states[this.e("status")];
    const problems = (statusSt?.attributes?.probleme as string[]) ?? [];
    const level = statusSt?.state === "problem" ? "warning" : enabled ? "ok" : "none";
    const pill = STATUS_PILL[level] ?? STATUS_PILL.none;
    const evt = this.hass.states[this.e("event")];
    const vpdOk = v !== null && targets && v >= targets.vpd_min && v <= targets.vpd_max;

    const toggle = (entity: string, label: string, on: boolean, icon: string) => html`
      <button class="gc" style="flex:1;display:flex;align-items:center;justify-content:center;gap:7px;
          padding:9px 10px;border-radius:13px;transition:all .18s;
          background:${on ? "rgba(77,255,195,.12)" : "rgba(255,255,255,.05)"};
          border:1.5px solid ${on ? THEME.ok : "rgba(255,255,255,.12)"};
          color:${on ? THEME.ok : "rgba(255,255,255,.5)"}"
        @click=${() => this.confirmToggle(entity, label)}>
        <ha-icon .icon=${icon} style="--mdc-icon-size:15px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${label} ${on ? "AN" : "AUS"}</span>
      </button>`;

    const kpi = (label: string, value: string, unit: string, color?: string) => html`
      <div class="tile" style="text-align:center">
        <div class="lbl">${label}</div>
        <div class="val" style="font-size:22px;${color ? `color:${color}` : ""}">${value}<span class="unit">${unit}</span></div>
      </div>`;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level === "none" ? "ok" : level}
        style="${cardVars(c.style)};position:relative">
      <div class="hdr">
        <div>
          <div class="title">${c.name ?? `Zelt ${c.tent}`}</div>
          <div class="subtitle">Klima \u00b7 Phase ${phaseEff}${targets ? ` \u00b7 Soll ${targets.vpd_min}\u2013${targets.vpd_max} kPa / ${targets.rh_min}\u2013${targets.rh_max} %` : ""}</div>
        </div>
        <span class="status-pill" style="background:${pill.bg};color:${pill.color}">
          <span class="dot" style="background:${pill.color}"></span>${enabled ? pill.label : "Deaktiviert"}</span>
      </div>

      <div style="display:flex;gap:8px;margin-top:12px">
        ${toggle(this.e("enabled"), "Zelt", enabled, "mdi:power")}
        ${toggle(this.e("climate"), "Klima", climate, "mdi:thermostat")}
      </div>

      <div class="grid" style="grid-template-columns:1fr 1fr 1fr;margin-top:10px">
        ${kpi("Temperatur", t != null ? Number(t).toFixed(1) : "\u2013", "\u00b0C")}
        ${kpi("Luftfeuchte", h != null ? String(Math.round(Number(h))) : "\u2013", "%")}
        ${kpi("VPD", v !== null ? v.toFixed(2) : "\u2013", "kPa",
              v === null ? undefined : vpdOk ? THEME.ok : "#FFD166")}
      </div>

      <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:11px;align-items:center">
        <span class="lbl" style="margin:0">Modus</span>
        ${this.chips(this.e("mode"), MODES, this.st(this.e("mode")) ?? "VPD")}
        <span class="lbl" style="margin:0">Phase</span>
        ${this.chips(this.e("phase"), PHASES, this.st(this.e("phase")) ?? "Auto")}
      </div>

      ${c.show_chart !== false && this._hist.length > 1 ? html`
        <div class="seclbl">VPD \u00b7 ${c.hours ?? 24}h</div>
        ${lineChart([{ data: this._hist, color: vpdOk === false ? "#FFD166" : THEME.ok }],
          { h: 100, band: targets ? { min: targets.vpd_min, max: targets.vpd_max } : undefined, grid: 3 })}` : nothing}

      ${problems.length ? html`<div style="margin-top:9px">
        ${problems.map(p => html`<div class="logrow" style="background:rgba(255,209,102,.08);margin-top:4px">
          <span class="txt" style="color:#FFD166">\u26A0 ${p}</span></div>`)}</div>` : nothing}

      ${evt ? html`<button class="gc logrow" style="width:100%;margin-top:9px;text-align:left"
          @click=${() => this.moreInfo(this.e("event"))}>
          <span class="dot" style="background:${LOG_TX[(evt.attributes?.schweregrad as string)] ?? THEME.info};flex-shrink:0"></span>
          <span class="txt" style="color:rgba(255,255,255,.6)">${evt.state}</span>
        </button>` : nothing}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-tent-card", GrowctrlTentCard);

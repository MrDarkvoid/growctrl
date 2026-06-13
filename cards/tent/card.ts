/*==============================================================================
 * GROWCTRL – growctrl-tent-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Zelt-Klima (v6): Zelt/Klima-Toggles, Temp/RH/VPD-KPIs, VPD-Zonenbalken,
 *           Modus- (VPD/RH) und Phasen-Chips, optionaler VPD-24h-Chart mit Sollband,
 *           Ereigniszeile. Integrations-nativ.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, cardVars, pillClass, type StyleConfig,
  num, fetchHistory, lineChart, tentEnt, TENT, type GcOverrides, gcResolve,
} from "../core/index";

const MODES = ["VPD", "RH"];
const PHASES = ["Auto", "Seedling", "Veg", "Bloom", "Trocknung"];
const PHASE_PD: Record<string, string> = { Auto: "", Seedling: "pd-seed", Veg: "pd-veg", Bloom: "pd-bloom", Trocknung: "pd-dry" };
const PHASE_HINT: Record<string, string> = { Auto: "automatisch", Seedling: "Anzucht", Veg: "Wachstum", Bloom: "Bl\u00fcte", Trocknung: "Ernte" };
const VPD_ZONES = [
  { w: 20, col: "#6E97DE", lbl: "zu feucht" }, { w: 20, col: "#58E0A5", lbl: "Seedling" },
  { w: 20, col: "#2FB36C", lbl: "Veg" }, { w: 20, col: "#E5B567", lbl: "Bloom" }, { w: 20, col: "#D4726F", lbl: "zu trocken" },
];
const VPD_MAX = 2.0;

interface TentConfig { type: string; tent: string; name?: string; show_chart?: boolean; hours?: number; overrides?: GcOverrides; style?: StyleConfig; }

export class GrowctrlTentCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true }, _phase: { state: true } };
  private _hist: number[] = [];
  private _phase = false;
  private _timer?: number;

  protected validateConfig(c: TentConfig) {
    if (!c.tent) throw new Error("growctrl-tent-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).");
  }
  static getConfigElement() { return document.createElement("growctrl-tent-editor"); }
  static getStubConfig() { return { tent: "gross" }; }

  private e(key: keyof typeof TENT): string {
    const [domain, suffix, role] = TENT[key];
    const c = this._config as TentConfig;
    return c.overrides?.[suffix] ?? gcResolve(this.hass, c.tent, "zelt", role) ?? tentEnt(domain, c.tent, suffix, c.overrides);
  }
  private _select(entity: string, option: string) { this.hass.callService("select", "select_option", { entity_id: entity, option }); }
  connectedCallback() { super.connectedCallback(); this._load(); this._timer = window.setInterval(() => this._load(), 5 * 60_000); }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    this._hist = await fetchHistory(this.hass, this.e("vpd"), (this._config as TentConfig).hours ?? 24);
  }

  private tglBtn(entity: string, label: string, on: boolean) {
    return html`<button class="gc tgl ${on ? "on" : ""}" style="flex:1; justify-content:center" @click=${() => this.confirmToggle(entity, label)}>
      <span class="sw"></span> ${label}</button>`;
  }
  private chips(entity: string, options: string[], current: string) {
    return html`<div style="display:flex; gap:6px; flex-wrap:wrap">
      ${options.map(o => { const on = o === current;
        return html`<button class="gc" style="padding:7px 13px; border-radius:999px; font:800 11.5px var(--f-ui);
            border:1.5px solid ${on ? "color-mix(in srgb, var(--acc) 50%, transparent)" : "var(--line)"};
            background:${on ? "var(--acc-soft)" : "transparent"}; color:${on ? "var(--acc)" : "var(--tx-2)"}"
          @click=${() => this._select(entity, o)}>${o}</button>`; })}
    </div>`;
  }
  private phaseDropdown(entity: string, current: string) {
    return html`<div class="dd ${this._phase ? "open" : ""}">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase} @click=${() => { this._phase = !this._phase; }}>
        <span class="pdot ${PHASE_PD[current]}" style="${current === "Auto" ? "background:var(--acc);color:var(--acc)" : ""}"></span>${this.t(current)}
        <span class="hint">${this.t(PHASE_HINT[current] ?? "")}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:var(--tx-3);transition:transform .2s;${this._phase ? "transform:rotate(180deg)" : ""}"></ha-icon>
      </button>
      ${this._phase ? html`<div class="dd-menu" role="listbox">
        ${PHASES.map(s => html`<button class="gc dd-it" role="option" aria-selected=${s === current}
          @click=${() => { this._select(entity, s); this._phase = false; }}>
          <span class="pdot ${PHASE_PD[s]}" style="${s === "Auto" ? "background:var(--acc)" : ""}"></span>${this.t(s)}<span class="hint">${this.t(PHASE_HINT[s] ?? "")}</span></button>`)}
      </div>` : nothing}
    </div>`;
  }

  render() {
    const c = this._config as TentConfig;
    if (!this.hass) return nothing;
    const vpdSt = this.hass.states[this.e("vpd")];
    const demo = !vpdSt && !this.hass.states[this.e("enabled")];
    const v = num(vpdSt?.state) ?? (demo ? 1.06 : null);
    const t = vpdSt?.attributes?.temp as number | null;
    const h = vpdSt?.attributes?.rh as number | null;
    const phaseEff = (vpdSt?.attributes?.phase_effektiv as string) ?? "Veg";
    const targets = vpdSt?.attributes?.sollwerte as { vpd_min: number; vpd_max: number; rh_min: number; rh_max: number } | undefined;
    const enabled = this.isOn(this.e("enabled")) || demo;
    const climate = this.isOn(this.e("climate"));
    const statusSt = this.hass.states[this.e("status")];
    const problems = (statusSt?.attributes?.probleme as string[]) ?? [];
    const level = statusSt?.state?.toLowerCase?.() === "problem" ? "warning" : enabled ? "ok" : "none";
    const evt = this.hass.states[this.e("event")];
    const vpdOk = v !== null && targets && v >= targets.vpd_min && v <= targets.vpd_max;
    const markPct = v !== null ? Math.min(100, Math.max(0, (v / VPD_MAX) * 100)) : null;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level === "none" ? "ok" : level} style="${cardVars(c.style)};position:relative">
      <div class="hd">
        <div class="grow" style="min-width:0">
          <div class="ttl">${c.name ?? `${this.t("Klima")} ${this.t("Zelt")} ${c.tent}`}</div>
          <div class="sub">${this.t("Phase")} ${this.t(phaseEff)}${targets ? ` · ${this.t("Soll")} ${targets.vpd_min}–${targets.vpd_max} kPa / ${targets.rh_min}–${targets.rh_max} %` : ""}</div>
        </div>
        <span class="pill ${enabled ? pillClass(level) : "none"}">${enabled ? (level === "ok" ? this.t("Alles OK") : level === "warning" ? this.t("Warnung") : this.t("Info")) : this.t("Deaktiviert")}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px">
        ${this.tglBtn(this.e("enabled"), this.t("Zelt"), enabled)}
        ${this.tglBtn(this.e("climate"), this.t("Klima"), climate)}
      </div>

      <div class="kpis">
        <button class="gc kpi c-temp" @click=${() => this.moreInfo(this.e("vpd"))}><span class="mlbl">${this.t("Temperatur")}</span><span class="v">${t != null ? Number(t).toFixed(1) : "–"}<span class="u">°C</span></span></button>
        <button class="gc kpi c-hum" @click=${() => this.moreInfo(this.e("vpd"))}><span class="mlbl">${this.t("Luftfeuchte")}</span><span class="v">${h != null ? Math.round(Number(h)) : "–"}<span class="u">%</span></span></button>
        <button class="gc kpi c-vpd" @click=${() => this.moreInfo(this.e("vpd"))}><span class="mlbl">VPD</span><span class="v" style="${v !== null && !vpdOk ? `color:${THEME.warn}` : ""}">${v !== null ? v.toFixed(2) : "–"}<span class="u">kPa</span></span></button>
      </div>

      <div style="margin-top:16px">
        <div class="zones">
          ${VPD_ZONES.map(z => html`<i style="width:${z.w}%;background:${z.col}"></i>`)}
          ${targets ? html`<span class="zband" style="left:${(targets.vpd_min / VPD_MAX) * 100}%;width:${((targets.vpd_max - targets.vpd_min) / VPD_MAX) * 100}%"></span>` : nothing}
          ${markPct !== null ? html`<span class="zmark" style="left:${markPct}%"></span>` : nothing}
        </div>
        <div class="zlbl">${VPD_ZONES.map(z => html`<span style="width:${z.w}%">${this.t(z.lbl)}</span>`)}</div>
      </div>

      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:14px; align-items:center">
        <span class="mlbl">${this.t("Modus")}</span>${this.chips(this.e("mode"), MODES, this.st(this.e("mode")) ?? "VPD")}
      </div>
      <div style="margin-top:13px">
        <span class="mlbl" style="display:block; margin-bottom:8px">${this.t("Phase")}</span>
        ${this.phaseDropdown(this.e("phase"), this.st(this.e("phase")) ?? "Auto")}
      </div>

      ${c.show_chart !== false && this._hist.length > 1 ? html`
        <div class="seclbl">VPD · ${c.hours ?? 24}h</div>
        ${lineChart([{ data: this._hist, color: vpdOk === false ? THEME.warn : THEME.ok, fill: true }],
          { w: this.chartW(), h: 96, band: targets ? { min: targets.vpd_min, max: targets.vpd_max } : undefined, grid: 3 })}` : nothing}

      ${problems.length ? html`<div style="display:flex; flex-wrap:wrap; gap:7px; margin-top:12px">
        ${problems.map(p => html`<span class="pbadge warn"><ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${p}</span>`)}</div>` : nothing}

      ${evt ? html`<button class="gc event" style="margin-top:14px" @click=${() => this.moreInfo(this.e("event"))}>
        <span class="edot" style="background:${evt.attributes?.schweregrad === "critical" ? THEME.crit : evt.attributes?.schweregrad === "warning" ? THEME.warn : THEME.info}"></span>
        <span class="etx">${evt.state}</span>
        <span class="etm">${evt.last_changed ? new Date(evt.last_changed).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : ""}</span>
      </button>` : nothing}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-tent-card", GrowctrlTentCard);

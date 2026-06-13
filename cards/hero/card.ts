/*==============================================================================
 * GROWCTRL – growctrl-hero-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Hero (v6): Logo-Badge, Zelt/Klima-Toggles, Klima-KPIs (Temp/RH/VPD),
 *           VPD-Zonenbalken, Stationszeilen, Informationssystem (Zelt-Status +
 *           Ereignis-/Problemlage aller Stationen). Integrations-nativ.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, cardVars, worstLevel, pillClass, type StyleConfig,
  num, fetchHistory, lineChart, stEnt, tentEnt, TENT, type GcOverrides, gcResolve,
} from "../core/index";

interface HeroStation { station: string; name?: string; }
interface HeroConfig {
  type: string; tent: string; title?: string; logo?: string;
  stations?: HeroStation[];
  hours?: number; show_chart?: boolean;
  overrides?: GcOverrides; style?: StyleConfig;
}

const VPD_ZONES = [
  { w: 20, col: "#6E97DE", lbl: "zu feucht" },
  { w: 20, col: "#58E0A5", lbl: "Seedling" },
  { w: 20, col: "#2FB36C", lbl: "Veg" },
  { w: 20, col: "#E5B567", lbl: "Bloom" },
  { w: 20, col: "#D4726F", lbl: "zu trocken" },
];
const VPD_MAX = 2.0;

export class GrowctrlHeroCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true }, _logoErr: { state: true } };
  private _logoErr = false;
  private _hist: number[] = [];
  private _timer?: number;

  protected validateConfig(c: HeroConfig) {
    if (!c.tent) throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).");
  }
  static getConfigElement() { return document.createElement("growctrl-hero-editor"); }
  static getStubConfig() { return { tent: "gross", stations: [{ station: "main1" }] }; }

  private te(key: keyof typeof TENT): string {
    const [domain, suffix, role] = TENT[key];
    const c = this._config as HeroConfig;
    return c.overrides?.[suffix] ?? gcResolve(this.hass, c.tent, "zelt", role) ?? tentEnt(domain, c.tent, suffix, c.overrides);
  }
  connectedCallback() { super.connectedCallback(); this._load(); this._timer = window.setInterval(() => this._load(), 5 * 60_000); }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    this._hist = await fetchHistory(this.hass, this.te("vpd"), (this._config as HeroConfig).hours ?? 24);
  }

  private tglBtn(entity: string, label: string, on: boolean) {
    return html`<button class="gc tgl ${on ? "on" : ""}" @click=${() => this.confirmToggle(entity, label)}>
      <span class="sw"></span> ${label}</button>`;
  }

  render() {
    const c = this._config as HeroConfig;
    if (!this.hass) return nothing;
    const vpdSt = this.hass.states[this.te("vpd")];
    const demo = !vpdSt && !this.hass.states[this.te("enabled")];
    const v = num(vpdSt?.state) ?? (demo ? 0.76 : null);
    const t = (vpdSt?.attributes?.temp as number | null) ?? (demo ? 21.5 : null);
    const h = (vpdSt?.attributes?.rh as number | null) ?? (demo ? 61 : null);
    const phaseEff = (vpdSt?.attributes?.phase_effektiv as string) ?? "";
    const targets = vpdSt?.attributes?.sollwerte as { vpd_min: number; vpd_max: number } | undefined;
    const enabled = this.isOn(this.te("enabled")) || demo;
    const climate = this.isOn(this.te("climate"));
    const statusSt = this.hass.states[this.te("status")];
    const tentProblems = (statusSt?.attributes?.probleme as string[]) ?? [];

    const stations = (c.stations ?? []).map(s => {
      const evt = this.hass.states[gcResolve(this.hass, c.tent, s.station, "last_event") ?? stEnt("sensor", c.tent, s.station, "letztes_ereignis", c.overrides)];
      const lightSt = this.hass.states[gcResolve(this.hass, c.tent, s.station, "light_rest") ?? stEnt("sensor", c.tent, s.station, "licht_restzeit", c.overrides)];
      const sev = (evt?.attributes?.schweregrad as string) ?? "ok";
      return { name: s.name ?? s.station, text: evt?.state ?? "–", level: sev,
        lightText: (lightSt?.attributes?.text as string) ?? (lightSt?.state ? `${this.t("Licht")} ${this.t(String(lightSt.attributes?.zustand ?? ""))}` : ""),
        on: (lightSt?.attributes?.zustand as string) === "an",
        ent: gcResolve(this.hass, c.tent, s.station, "last_event") ?? stEnt("sensor", c.tent, s.station, "letztes_ereignis", c.overrides) };
    });
    const isWarn = (l: string) => l === "warning" || l === "critical";
    const level = worstLevel([
      (statusSt?.state ?? "").toLowerCase() === "problem" ? "warning" : "ok",
      ...stations.map(s => (isWarn(s.level) ? s.level : "ok")),
    ]);
    const problems = [
      ...tentProblems.map(p => ({ label: p, level: "warning" })),
      ...stations.filter(s => isWarn(s.level)).map(s => ({ label: `${s.name}: ${s.text}`, level: s.level })),
    ];

    const vpdOk = v !== null && targets && v >= targets.vpd_min && v <= targets.vpd_max;
    const markPct = v !== null ? Math.min(100, Math.max(0, (v / VPD_MAX) * 100)) : null;
    const tempE = (vpdSt?.attributes?.temp_entity as string) || this.te("vpd");
    const rhE = (vpdSt?.attributes?.rh_entity as string) || this.te("vpd");

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level} style="${cardVars(c.style)};position:relative">
      <div class="hd">
        ${c.logo && !this._logoErr
          ? html`<img src=${c.logo} alt="Logo" @error=${() => { this._logoErr = true; }}
              style="width:46px;height:46px;border-radius:16px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px;flex-shrink:0" />`
          : html`<div class="badge-ic"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:22px"></ha-icon></div>`}
        <div class="grow" style="min-width:0">
          <div class="ttl">${c.title ?? `Growroom · ${c.tent}`}</div>
          ${phaseEff ? html`<div class="sub">${this.t("Klima-Phase")} ${this.t(phaseEff)}</div>` : nothing}
        </div>
        <span class="pill ${pillClass(level)}">${level === "ok" ? this.t("Alles OK") : level === "warning" ? this.t("Warnung") : level === "critical" ? this.t("Kritisch") : this.t("Info")}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap">
        ${this.tglBtn(this.te("enabled"), this.t("Zelt"), enabled)}
        ${this.tglBtn(this.te("climate"), this.t("Klima"), climate)}
      </div>

      <div class="kpis">
        <button class="gc kpi c-temp" @click=${() => this.moreInfo(tempE)}>
          <span class="mlbl">${this.t("Temperatur")}</span><span class="v">${t != null ? Number(t).toFixed(1) : "–"}<span class="u">°C</span></span></button>
        <button class="gc kpi c-hum" @click=${() => this.moreInfo(rhE)}>
          <span class="mlbl">${this.t("Luftfeuchte")}</span><span class="v">${h != null ? Math.round(Number(h)) : "–"}<span class="u">%</span></span></button>
        <button class="gc kpi c-vpd" @click=${() => this.moreInfo(this.te("vpd"))}>
          <span class="mlbl">VPD</span><span class="v" style="${v !== null && !vpdOk ? `color:${THEME.warn}` : ""}">${v !== null ? v.toFixed(2) : "–"}<span class="u">kPa</span></span></button>
      </div>

      <div style="margin-top:16px">
        <div class="zones">
          ${VPD_ZONES.map(z => html`<i style="width:${z.w}%;background:${z.col}"></i>`)}
          ${targets ? html`<span class="zband" style="left:${(targets.vpd_min / VPD_MAX) * 100}%;width:${((targets.vpd_max - targets.vpd_min) / VPD_MAX) * 100}%"></span>` : nothing}
          ${markPct !== null ? html`<span class="zmark" style="left:${markPct}%"></span>` : nothing}
        </div>
        <div class="zlbl">${VPD_ZONES.map(z => html`<span style="width:${z.w}%">${this.t(z.lbl)}</span>`)}</div>
      </div>

      ${c.show_chart === true && this._hist.length > 1 ? html`
        <div class="seclbl">VPD · ${c.hours ?? 24}h</div>
        ${lineChart([{ data: this._hist, color: vpdOk === false ? THEME.warn : THEME.ok, fill: true }],
          { w: this.chartW(), h: 96, band: targets ? { min: targets.vpd_min, max: targets.vpd_max } : undefined, grid: 3 })}` : nothing}

      ${stations.length ? html`<div class="seclbl">${this.t("Stationen")}</div>
        <div style="display:flex; flex-direction:column; gap:7px">
          ${stations.map(s => html`<button class="gc supply" @click=${() => s.ent && this.moreInfo(s.ent)}>
            <span class="shd">
              <span class="sic" style="color:${s.on ? THEME.light : "var(--tx-3)"}"><ha-icon icon="mdi:lightbulb${s.on ? "-on" : "-outline"}" style="--mdc-icon-size:18px"></ha-icon></span>
              <span class="stt">${s.name}</span>
              <span class="stm" style="color:${isWarn(s.level) ? (s.level === "critical" ? THEME.crit : THEME.warn) : THEME.ok};font-size:12px">${isWarn(s.level) ? (s.level === "critical" ? this.t("Fehler") : this.t("Warnung")) : this.t("OK")}</span>
            </span>
            <span class="sft"><span>${s.lightText || s.text}</span><span></span></span>
          </button>`)}
        </div>` : nothing}

      <div class="seclbl">${this.t("Informationssystem")}</div>
      ${problems.length
        ? html`<div style="display:flex; flex-direction:column; gap:7px">
            ${problems.map(p => html`<div class="event" style="cursor:default">
              <span class="edot" style="background:${p.level === "critical" ? THEME.crit : THEME.warn}"></span>
              <span class="etx" style="color:${p.level === "critical" ? THEME.crit : THEME.warn}">${p.label}</span></div>`)}
          </div>`
        : html`<div class="event" style="cursor:default">
            <span class="edot" style="background:${THEME.ok};box-shadow:0 0 6px ${THEME.ok}"></span>
            <span class="etx" style="color:${THEME.ok}">${this.t("Alle Systeme arbeiten normal")}</span></div>`}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-hero-card", GrowctrlHeroCard);

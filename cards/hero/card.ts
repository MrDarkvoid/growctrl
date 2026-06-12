/*==============================================================================
 * GROWCTRL – growctrl-hero-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Hero ueber allem (integrations-nativ): Logo, Zelt/Klima-Schalter, Klima-KPIs + VPD-Chart aus dem Zelt-VPD-Sensor, Informationssystem = Zelt-Status + Ereignis-/Problemlage aller Stationen.
 * Version : 2.4.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX, STATUS_PILL,
  cardVars, worstLevel, type StyleConfig, num, fetchHistory, lineChart,
  stEnt, tentEnt, TENT, ST, type GcOverrides,
} from "../core/index";

interface HeroStation { station: string; name?: string; }
interface HeroConfig {
  type: string; tent: string; title?: string; logo?: string;
  stations?: HeroStation[];
  hours?: number; show_chart?: boolean;
  overrides?: GcOverrides; style?: StyleConfig;
}

export class GrowctrlHeroCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true } };
  private _hist: number[] = [];
  private _timer?: number;

  protected validateConfig(c: HeroConfig) {
    if (!c.tent) throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).");
  }
  static getConfigElement() { return document.createElement("growctrl-hero-editor"); }
  static getStubConfig() { return { tent: "gross", stations: [{ station: "main1" }] }; }

  private te(key: keyof typeof TENT): string {
    const [domain, suffix] = TENT[key];
    const c = this._config as HeroConfig;
    return tentEnt(domain, c.tent, suffix, c.overrides);
  }
  connectedCallback() {
    super.connectedCallback();
    this._load();
    this._timer = window.setInterval(() => this._load(), 5 * 60_000);
  }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    this._hist = await fetchHistory(this.hass, this.te("vpd"), (this._config as HeroConfig).hours ?? 24);
  }

  render() {
    const c = this._config as HeroConfig;
    if (!this.hass) return nothing;
    const vpdSt = this.hass.states[this.te("vpd")];
    const v = num(vpdSt?.state);
    const t = vpdSt?.attributes?.temp as number | null;
    const h = vpdSt?.attributes?.rh as number | null;
    const phaseEff = (vpdSt?.attributes?.phase_effektiv as string) ?? "";
    const targets = vpdSt?.attributes?.sollwerte as { vpd_min: number; vpd_max: number } | undefined;
    const enabled = this.isOn(this.te("enabled"));
    const climate = this.isOn(this.te("climate"));
    const statusSt = this.hass.states[this.te("status")];
    const tentProblems = (statusSt?.attributes?.probleme as string[]) ?? [];

    // ── Informationssystem: Zelt-Probleme + Stations-Ereignislage ──
    const stations = (c.stations ?? []).map(s => {
      const evt = this.hass.states[stEnt("sensor", c.tent, s.station, "letztes_ereignis", c.overrides)];
      const sev = (evt?.attributes?.schweregrad as string) ?? "ok";
      return { name: s.name ?? s.station, text: evt?.state ?? "\u2013", level: sev };
    });
    const level = worstLevel([
      statusSt?.state === "problem" ? "warning" : "ok",
      ...stations.map(s => s.level),
    ]);
    const pill = STATUS_PILL[level];
    const problems = [
      ...tentProblems.map(p => ({ label: p, level: "warning" })),
      ...stations.filter(s => s.level !== "ok").map(s => ({ label: `${s.name}: ${s.text}`, level: s.level })),
    ];

    const bigToggle = (entity: string, label: string, on: boolean, icon: string) => html`
      <button class="gc" style="display:flex;align-items:center;gap:8px;padding:8px 15px;border-radius:14px;
          transition:all .18s;
          background:${on ? "rgba(77,255,195,.12)" : "rgba(255,255,255,.05)"};
          border:1.5px solid ${on ? THEME.ok : "rgba(255,255,255,.12)"};
          color:${on ? THEME.ok : "rgba(255,255,255,.5)"}"
        @click=${() => this.confirmToggle(entity, label)}>
        <ha-icon .icon=${icon} style="--mdc-icon-size:16px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${label} ${on ? "AN" : "AUS"}</span>
      </button>`;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level}
        style="${cardVars(c.style)};position:relative">
      <div class="hdr">
        <div style="display:flex;align-items:center;gap:11px">
          ${c.logo ? html`<img src=${c.logo} alt="Logo"
            style="width:42px;height:42px;border-radius:11px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px" />` : nothing}
          <div>
            <div class="title">${c.title ?? `GROWCTRL \u00b7 ${c.tent}`}</div>
            ${phaseEff ? html`<div class="subtitle">Klima-Phase ${phaseEff}</div>` : nothing}
          </div>
        </div>
        <span class="status-pill" style="background:${pill.bg};color:${pill.color}">
          <span class="dot" style="background:${pill.color}"></span>${pill.label}</span>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:13px">
        ${bigToggle(this.te("enabled"), "Zelt", enabled, "mdi:power")}
        ${bigToggle(this.te("climate"), "Klima", climate, "mdi:thermostat")}
      </div>

      <div class="grid" style="grid-template-columns:1fr 1fr 1fr;margin-top:12px">
        <div class="tile" style="text-align:center"><div class="lbl">Temperatur</div>
          <div class="val" style="font-size:22px">${t != null ? Number(t).toFixed(1) : "\u2013"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">Luftfeuchte</div>
          <div class="val" style="font-size:22px">${h != null ? Math.round(Number(h)) : "\u2013"}<span class="unit">%</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">VPD</div>
          <div class="val" style="font-size:22px;color:${v !== null && targets && v >= targets.vpd_min && v <= targets.vpd_max ? THEME.ok : "#FFD166"}">${v !== null ? v.toFixed(2) : "\u2013"}<span class="unit">kPa</span></div></div>
      </div>

      ${c.show_chart !== false && this._hist.length > 1 ? html`
        <div class="seclbl">VPD \u00b7 ${c.hours ?? 24}h</div>
        ${lineChart([{ data: this._hist, color: THEME.ok }],
          { h: 100, band: targets ? { min: targets.vpd_min, max: targets.vpd_max } : undefined, grid: 3 })}` : nothing}

      ${stations.length ? html`<div class="seclbl">Stationen</div>
        ${stations.map(s => html`<div class="logrow" style="margin-top:3px;padding:6px 9px">
          <span class="dot" style="background:${s.level === "ok" ? THEME.ok : LOG_TX[s.level] ?? THEME.warn};flex-shrink:0"></span>
          <span style="font-size:11px;font-weight:800;min-width:62px;flex-shrink:0;
            color:rgba(255,255,255,.8)">${s.name}</span>
          <span class="txt" style="color:rgba(255,255,255,.55)">${s.text}</span>
        </div>`)}` : nothing}

      <div class="seclbl">Informationssystem</div>
      ${problems.length
        ? problems.map(p => html`<div class="logrow" style="background:${LOG_BG[p.level] ?? LOG_BG.warning};margin-top:4px">
            <span class="txt" style="color:${LOG_TX[p.level] ?? LOG_TX.warning}">\u26A0 ${p.label}</span></div>`)
        : html`<div class="logrow" style="background:${LOG_BG.ok};margin-top:4px">
            <span class="txt" style="color:${THEME.ok}">\u2713 Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-hero-card", GrowctrlHeroCard);

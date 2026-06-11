/*==============================================================================
 * GROWCTRL – growctrl-hero-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Hero ueber allem: Logo, globale Schalter (Zelt aktiv, Klima), Klima-KPIs gross, VPD-24h-Chart, Informationssystem (alle Probleme aus Logs + Problem-Sensoren) mit Gesamt-Ampel auf dem Rahmen.
 * Version : 2.2.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX, STATUS_PILL,
  cardVars, worstLevel, type StyleConfig,
  vpd as calcVpd, vpdZone, num, fetchHistory, lineChart,
  translateStationLog, translateKlimaLog,
} from "../core/index";

interface HeroLog { entity: string; name?: string; type?: "station" | "climate"; }
interface HeroControl { entity: string; name?: string; icon?: string; confirm?: boolean; }
interface HeroConfig {
  type: string; title?: string; logo?: string;
  temperature: string; humidity: string; leaf_offset?: number; power?: string;
  tent_enable?: string; climate_enable?: string;
  controls?: HeroControl[];
  logs?: HeroLog[]; problem_sensors?: string[];
  hours?: number; show_chart?: boolean;
  style?: StyleConfig;
}

export class GrowctrlHeroCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true } };
  private _hist: { t: number[]; h: number[] } = { t: [], h: [] };
  private _timer?: number;

  protected validateConfig(c: HeroConfig) {
    if (!c.temperature || !c.humidity) throw new Error("growctrl-hero-card: 'temperature' und 'humidity' sind Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-hero-editor"); }
  static getStubConfig() { return { temperature: "sensor.zelt_temperature", humidity: "sensor.zelt_humidity", title: "GROWCTRL" }; }

  connectedCallback() {
    super.connectedCallback();
    this._load();
    this._timer = window.setInterval(() => this._load(), 5 * 60_000);
  }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    const c = this._config as HeroConfig;
    const hours = c.hours ?? 24;
    this._hist = {
      t: await fetchHistory(this.hass, c.temperature, hours),
      h: await fetchHistory(this.hass, c.humidity, hours),
    };
  }

  render() {
    const c = this._config as HeroConfig;
    if (!this.hass) return nothing;
    const t = num(this.st(c.temperature));
    const h = num(this.st(c.humidity));
    const p = c.power ? num(this.st(c.power)) : null;
    const v = t !== null && h !== null ? calcVpd(t, h, c.leaf_offset ?? 0) : null;
    const zone = v !== null ? vpdZone(v) : null;

    // ── Informationssystem: Logs uebersetzen + Problem-Sensoren einsammeln ──
    const logRows = (c.logs ?? []).map(l => ({
      name: l.name, r: (l.type === "climate" ? translateKlimaLog : translateStationLog)(this.st(l.entity)),
    }));
    const problems: { label: string; level: string }[] = [];
    logRows.forEach(x => {
      if (x.r.level === "warning" || x.r.level === "critical")
        problems.push({ label: `${x.name ? x.name + ": " : ""}${x.r.label}`, level: x.r.level });
    });
    (c.problem_sensors ?? []).forEach(e => {
      const s = this.st(e);
      if (s === "on" || s === "problem")
        problems.push({ label: this.friendly(e), level: "warning" });
    });
    const level = worstLevel([
      ...logRows.map(x => x.r.level),
      ...problems.map(pr => pr.level),
    ]);
    const pill = STATUS_PILL[level];

    // ── VPD-Verlauf aus Temp+RH-History punktweise ──
    const n = Math.min(this._hist.t.length, this._hist.h.length);
    const vpdSeries = Array.from({ length: n }, (_, i) =>
      calcVpd(this._hist.t[i], this._hist.h[i], c.leaf_offset ?? 0));

    const tentOn = c.tent_enable ? this.isOn(c.tent_enable) : null;
    const climateOn = c.climate_enable ? this.isOn(c.climate_enable) : null;
    const bigToggle = (entity: string, label: string, on: boolean, icon: string) => html`
      <button class="gc" style="display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:14px;
          transition:all .18s;
          background:${on ? "rgba(77,255,195,.12)" : "rgba(255,255,255,.05)"};
          border:1.5px solid ${on ? "#4DFFC3" : "rgba(255,255,255,.12)"};
          color:${on ? "#4DFFC3" : "rgba(255,255,255,.5)"}"
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
            <div class="title">${c.title ?? "GROWCTRL"}</div>
            ${p !== null ? html`<div class="subtitle">\u26A1 ${Math.round(p!)} W Gesamtleistung</div>` : nothing}
          </div>
        </div>
        <span class="status-pill" style="background:${pill.bg};color:${pill.color}">
          <span class="dot" style="background:${pill.color}"></span>${pill.label}</span>
      </div>
      ${tentOn !== null || climateOn !== null || (c.controls ?? []).length ? html`
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:13px">
          ${tentOn !== null ? bigToggle(c.tent_enable!, "Zelt", tentOn, "mdi:power") : nothing}
          ${climateOn !== null ? bigToggle(c.climate_enable!, "Klima", climateOn, "mdi:thermostat") : nothing}
          ${(c.controls ?? []).map(it => {
            const on = this.isOn(it.entity);
            const name = it.name ?? this.friendly(it.entity);
            return bigToggle(it.entity, name, on, it.icon ?? "mdi:power");
          })}
        </div>` : nothing}
      <div class="grid" style="grid-template-columns:1fr 1fr 1fr;margin-top:12px">
        <div class="tile"><div class="lbl">Temperatur</div>
          <div class="val">${t !== null ? t.toFixed(1) : "--"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile"><div class="lbl">Luftfeuchte</div>
          <div class="val">${h !== null ? Math.round(h) : "--"}<span class="unit">%</span></div></div>
        <div class="tile"><div class="lbl">VPD ${zone ? `\u00b7 ${zone.label}` : ""}</div>
          <div class="val" style=${zone ? `color:${zone.color}` : ""}>${v !== null ? v.toFixed(2) : "--"}<span class="unit">kPa</span></div></div>
      </div>
      ${c.show_chart !== false && vpdSeries.length > 1 ? html`
        <div class="seclbl">VPD \u00b7 ${c.hours ?? 24}h</div>
        ${lineChart([{ data: vpdSeries, color: zone?.color ?? "#4DFFC3" }],
          { h: 105, band: { min: 0.8, max: 1.2 }, grid: 3 })}` : nothing}
      <div class="seclbl">Informationssystem</div>
      ${problems.length
        ? problems.map(pr => html`<div class="logrow" style="background:${LOG_BG[pr.level]};margin-top:4px">
            <span class="txt" style="color:${LOG_TX[pr.level]}">\u26A0 ${pr.label}</span></div>`)
        : html`<div class="logrow" style="background:${LOG_BG.ok};margin-top:4px">
            <span class="txt" style="color:${THEME.ok}">\u2713 Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-hero-card", GrowctrlHeroCard);

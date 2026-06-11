/*==============================================================================
 * GROWCTRL – growctrl-tent-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Zelt-Hero v2: grosse Status-Ampel im Header (Karte 'leuchtet' bei Fehler), KPI-Reihe, VPD-Skala, kompakte Sekundaerzeile, Ereignisse. Stil (Hintergrund/Transparenz/Glas) konfigurierbar.
 * Version : 2.1.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX, STATUS_PILL,
  cardVars, worstLevel, type StyleConfig,
  vpd as calcVpd, vpdZone, VPD_ZONES, num,
  translateStationLog, translateKlimaLog,
} from "../core/index";

interface TentLog { entity: string; type?: "station" | "climate"; }
interface TentConfig {
  type: string; title?: string; subtitle?: string;
  temperature: string; humidity: string;
  power?: string; leaf_offset?: number;
  climate_auto?: string; maintenance?: string; dehum_request?: string;
  logs?: TentLog[];
  temp_min?: number; temp_max?: number;
  show_vpd_scale?: boolean; tap_navigation?: string;
  style?: StyleConfig;
  /** Abwaertskompatibel: gradient -> style.background */
  gradient?: string;
}

export class GrowctrlTentCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  protected validateConfig(c: TentConfig) {
    if (!c.temperature || !c.humidity) throw new Error("growctrl-tent-card: 'temperature' und 'humidity' sind Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-tent-editor"); }
  static getStubConfig() {
    return { temperature: "sensor.zelt_temperature", humidity: "sensor.zelt_humidity", title: "Mein Zelt" };
  }

  render() {
    const c = this._config as TentConfig;
    if (!this.hass) return nothing;
    const t = num(this.st(c.temperature));
    const h = num(this.st(c.humidity));
    const p = c.power ? num(this.st(c.power)) : null;
    const v = t !== null && h !== null ? calcVpd(t, h, c.leaf_offset ?? 0) : null;
    const zone = v !== null ? vpdZone(v) : null;

    const results = (c.logs ?? []).map(l =>
      (l.type === "climate" ? translateKlimaLog : translateStationLog)(this.st(l.entity)));
    let level = worstLevel(results.map(r => r.level));
    let pillLabel = STATUS_PILL[level].label;
    if (level === "ok") {
      if (this.isOn(c.dehum_request)) { level = "warning"; pillLabel = "Dehum AN"; }
      else if (t !== null && (t < (c.temp_min ?? 18) || t > (c.temp_max ?? 30))) { level = "warning"; pillLabel = "Temp!"; }
    }
    const pill = STATUS_PILL[level];

    const style = c.style ?? (c.gradient ? { background: c.gradient } : undefined);
    const total = 2.0;
    const marker = v !== null ? Math.min(100, Math.max(0, (v / total) * 100)) : null;

    return html`<div class="card ${style?.glass ? "glass" : ""} ${c.tap_navigation ? "clickable" : ""}"
        data-level=${level} style=${cardVars(style)}
        @click=${() => c.tap_navigation && this.navigate(c.tap_navigation)}>
      <div class="hdr">
        <div>
          <div class="title">${c.title ?? "Zelt"}</div>
          ${c.subtitle ? html`<div class="subtitle">${c.subtitle}</div>` : nothing}
        </div>
        <div class="badges">
          ${this.isOn(c.climate_auto) ? html`<span class="badge">\u2699 Klima</span>` : nothing}
          ${this.isOn(c.maintenance) ? html`<span class="badge warn">\u{1F527} Wartung</span>` : nothing}
          <span class="status-pill" style="background:${pill.bg};color:${pill.color}">
            <span class="dot" style="background:${pill.color}"></span>${pillLabel}</span>
        </div>
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr 1fr;margin-top:14px">
        <div class="tile"><div class="lbl">Temperatur</div>
          <div class="val">${t !== null ? t.toFixed(1) : "--"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile"><div class="lbl">Luftfeuchte</div>
          <div class="val">${h !== null ? Math.round(h) : "--"}<span class="unit">%</span></div></div>
        <div class="tile"><div class="lbl">VPD</div>
          <div class="val" style=${zone ? `color:${zone.color}` : ""}>${v !== null ? v.toFixed(2) : "--"}<span class="unit">kPa</span></div></div>
      </div>
      ${c.show_vpd_scale !== false && marker !== null ? html`
        <div style="margin-top:10px">
          <div style="position:relative;height:8px;border-radius:4px;overflow:visible;display:flex">
            ${VPD_ZONES.map((z, i) => {
              const prev = i === 0 ? 0 : Math.min(VPD_ZONES[i-1].max, total);
              const wdt = Math.max(0, (Math.min(z.max, total) - prev) / total * 100);
              const first = i === 0, last = z.max >= total;
              return html`<div style="width:${wdt}%;background:${z.color};opacity:.5;
                ${first ? "border-radius:4px 0 0 4px;" : ""}${last ? "border-radius:0 4px 4px 0;" : ""}"></div>`;
            })}
            <div style="position:absolute;left:${marker}%;top:-3px;width:3px;height:14px;background:#fff;
              border-radius:2px;transform:translateX(-50%);box-shadow:0 0 6px rgba(255,255,255,.8)"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:10px;color:${THEME.muted};margin-top:4px">
            <span>${zone!.label}${c.leaf_offset ? ` \u00b7 Blatt ${c.leaf_offset > 0 ? "+" : ""}${c.leaf_offset}K` : ""}</span>
            ${p !== null ? html`<span style="font-weight:700;color:rgba(255,255,255,.7)">\u26A1 ${Math.round(p!)} W</span>` : nothing}
          </div>
        </div>` : (p !== null ? html`<div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.7);margin-top:8px">\u26A1 ${Math.round(p!)} W</div>` : nothing)}
      ${results.length ? html`<div class="seclbl">Letzte Ereignisse</div>
        ${results.map(r => html`<div class="logrow" style="background:${LOG_BG[r.level]};margin-top:4px">
          <span class="txt" style="color:${LOG_TX[r.level]}">${r.label}</span>
          ${r.ts ? html`<span class="ts">${r.ts}</span>` : nothing}
        </div>`)}` : nothing}
    </div>`;
  }
}
customElements.define("growctrl-tent-card", GrowctrlTentCard);

/*==============================================================================
 * GROWCTRL – growctrl-tent-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Zelt-Hero: Temp/rF/VPD-KPIs, VPD-Zonenskala, Status-Ampel, Badges. Pflicht: temperature+humidity.
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX,
  vpd as calcVpd, vpdZone, VPD_ZONES, num,
  translateStationLog, translateKlimaLog,
} from "../core/index";

interface TentLog { entity: string; type?: "station" | "climate"; }
interface TentConfig {
  type: string;
  title?: string; subtitle?: string;
  temperature: string; humidity: string;     // Pflicht
  power?: string; leaf_offset?: number;
  gradient?: string;                          // z.B. "#1D9E75,#0F6E56"
  climate_auto?: string; maintenance?: string; dehum_request?: string;
  logs?: TentLog[];                           // fuer Status-Ampel
  temp_min?: number; temp_max?: number;
  show_vpd_scale?: boolean;
  tap_navigation?: string;
}

export class GrowctrlTentCard extends GrowctrlBaseCard {
  static styles = sharedStyles;

  protected validateConfig(c: TentConfig) {
    if (!c.temperature || !c.humidity) throw new Error("growctrl-tent-card: 'temperature' und 'humidity' sind Pflicht.");
  }
  static getStubConfig() {
    return { temperature: "sensor.zelt_temperature", humidity: "sensor.zelt_humidity", title: "Mein Zelt" };
  }

  private levels(): string[] {
    return (this._config.logs ?? []).map((l: TentLog) =>
      (l.type === "climate" ? translateKlimaLog : translateStationLog)(this.st(l.entity)).level);
  }

  render() {
    const c = this._config as TentConfig;
    if (!this.hass) return nothing;
    const t = num(this.st(c.temperature));
    const h = num(this.st(c.humidity));
    const p = c.power ? num(this.st(c.power)) : null;
    const v = t !== null && h !== null ? calcVpd(t, h, c.leaf_offset ?? 0) : null;
    const zone = v !== null ? vpdZone(v) : null;

    const lv = this.levels();
    let warn: { label: string; color: string } = { label: "\u2713 Alles OK", color: THEME.ok };
    if (lv.includes("critical")) warn = { label: "\u{1F6A8} Fehler", color: THEME.crit };
    else if (lv.includes("warning")) warn = { label: "\u26A0\uFE0F Warnung", color: THEME.warn };
    else if (this.isOn(c.dehum_request)) warn = { label: "\u{1F4A7} Dehum AN", color: THEME.warn };
    else if (t !== null && (t < (c.temp_min ?? 18) || t > (c.temp_max ?? 30))) warn = { label: "\u26A0\uFE0F Temp!", color: THEME.warn };
    else if (lv.includes("info")) warn = { label: "\u2139\uFE0F Info", color: THEME.info };

    const grad = c.gradient ? `linear-gradient(135deg,${c.gradient})` : undefined;
    const total = 2.0; // Skala 0..2.0 kPa
    const marker = v !== null ? Math.min(100, Math.max(0, (v / total) * 100)) : null;

    return html`<div class="card ${c.tap_navigation ? "clickable" : ""}"
        style=${grad ? `background:${grad}` : ""}
        @click=${() => c.tap_navigation && this.navigate(c.tap_navigation)}>
      <div class="hdr">
        <div>
          <div class="title">${c.title ?? "Zelt"}</div>
          ${c.subtitle ? html`<div class="subtitle">${c.subtitle}</div>` : nothing}
        </div>
        <div class="badges">
          ${this.isOn(c.climate_auto) ? html`<span class="badge">\u2699 Klima Auto</span>` : nothing}
          ${this.isOn(c.maintenance) ? html`<span class="badge warn">\u{1F527} Wartung</span>` : nothing}
        </div>
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr 1fr">
        <div class="tile"><div class="lbl">Temperatur</div><div class="val">${t !== null ? t.toFixed(1) : "--"}\u00b0C</div></div>
        <div class="tile"><div class="lbl">Luftfeuchte</div><div class="val">${h !== null ? Math.round(h) : "--"}%</div></div>
        <div class="tile"><div class="lbl">VPD</div><div class="val">${v !== null ? v.toFixed(2) : "--"}</div></div>
      </div>
      ${c.show_vpd_scale !== false && marker !== null ? html`
        <div style="margin-top:8px">
          <div style="position:relative;height:10px;border-radius:5px;overflow:hidden;display:flex">
            ${VPD_ZONES.map((z, i) => {
              const prev = i === 0 ? 0 : Math.min(VPD_ZONES[i-1].max, total);
              const wdt = Math.max(0, (Math.min(z.max, total) - prev) / total * 100);
              return html`<div style="width:${wdt}%;background:${z.color};opacity:.55"></div>`;
            })}
            <div style="position:absolute;left:${marker}%;top:-2px;width:3px;height:14px;background:#fff;border-radius:2px;transform:translateX(-50%)"></div>
          </div>
          <div style="font-size:10px;color:${THEME.muted};margin-top:3px">${zone!.label} \u00b7 ${v!.toFixed(2)} kPa${c.leaf_offset ? ` (Blatt ${c.leaf_offset > 0 ? "+" : ""}${c.leaf_offset}K)` : ""}</div>
        </div>` : nothing}
      <div class="grid" style="grid-template-columns:1fr 1fr">
        ${c.power ? html`<div class="tile"><div class="lbl">Leistung</div><div class="val sm">\u26A1 ${p !== null ? Math.round(p) : "--"} W</div></div>` : nothing}
        <div class="tile" style=${c.power ? "" : "grid-column:1 / -1"}><div class="lbl">Status</div>
          <div class="val sm" style="color:${warn.color}">${warn.label}</div></div>
      </div>
      ${(c.logs ?? []).length ? html`<div class="seclbl">Letzte Ereignisse</div>
        ${(c.logs ?? []).map((l) => {
          const r = (l.type === "climate" ? translateKlimaLog : translateStationLog)(this.st(l.entity));
          return html`<div class="logrow" style="background:${LOG_BG[r.level]};margin-top:4px">
            <span class="txt" style="color:${LOG_TX[r.level]}">${r.label}</span>
            ${r.ts ? html`<span class="ts">${r.ts}</span>` : nothing}
          </div>`;
        })}` : nothing}
    </div>`;
  }
}
customElements.define("growctrl-tent-card", GrowctrlTentCard);

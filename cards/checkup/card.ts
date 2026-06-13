/*==============================================================================
 * GROWCTRL – growctrl-checkup-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Checkup ueber alle Zelte/Stationen: eine Zeile je Quelle (Log oder Problem-Sensor) mit Ampelpunkt, Klartext-Auswertung und Zeit; Gesamt-Ampel auf Pill + Kartenrahmen.
 * Version : 2.2.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX, STATUS_PILL,
  cardVars, worstLevel, type StyleConfig,
  translateStationLog, translateKlimaLog,
} from "../core/index";

interface CheckupRow { name: string; entity: string; type?: "station" | "climate" | "problem" | "event"; }
interface CheckupConfig { type: string; title?: string; rows: CheckupRow[]; compact?: boolean; style?: StyleConfig; }

export class GrowctrlCheckupCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  protected validateConfig(c: CheckupConfig) {
    if (!Array.isArray(c.rows) || !c.rows.length)
      throw new Error("growctrl-checkup-card: 'rows' (min. 1 Eintrag) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-checkup-editor"); }
  static getStubConfig() { return { rows: [{ name: "Main 1", entity: "input_text.hydro_log_mittel_main1" }] }; }

  render() {
    const c = this._config as CheckupConfig;
    if (!this.hass) return nothing;
    const rows = c.rows.map(row => {
      if (row.type === "event") {
        // Ereignis-Sensor der Integration: Klartext-State + Schweregrad-Attribut
        const s = this.hass.states[row.entity];
        const lvl = (s?.attributes?.schweregrad as string) ?? "ok";
        return { row, level: lvl === "ok" ? "ok" : lvl,
                 label: s?.state ?? "\u2013", ts: "" };
      }
      if (row.type ?.toLowerCase?.() === "problem") {
        const on = this.isOn(row.entity);
        return { row, level: on ? "warning" : "ok", label: on ? "Problem erkannt" : "OK", ts: "" };
      }
      const r = (row.type === "climate" ? translateKlimaLog : translateStationLog)(this.st(row.entity));
      return { row, level: r.level === "none" ? "ok" : r.level, label: r.label, ts: r.ts ?? "" };
    });
    const level = worstLevel(rows.map(x => x.level));
    const pill = STATUS_PILL[level] ?? STATUS_PILL.ok;
    const dot = (lv: string) =>
      lv === "critical" ? THEME.crit : lv === "warning" ? THEME.warn : lv === "info" ? THEME.info : THEME.ok;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level} style=${cardVars(c.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${c.title ?? "Checkup"}</div>
        <span class="status-pill" style="background:${pill.bg};color:${pill.color}">
          <span class="dot" style="background:${pill.color}"></span>${pill.label}</span>
      </div>
      <div style="margin-top:10px">
        ${rows.map(x => html`<div class="logrow" style="background:${c.compact ? "transparent" : LOG_BG[x.level === "ok" ? "none" : x.level]};
            margin-top:${c.compact ? 2 : 5}px;padding:${c.compact ? "4px 6px" : "8px 11px"}">
          <span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;background:${dot(x.level)};
            box-shadow:0 0 7px ${dot(x.level)}66"></span>
          <span style="font-size:11.5px;font-weight:800;min-width:64px;flex-shrink:0;color:rgba(255,255,255,.85)">${x.row.name}</span>
          <span class="txt" style="color:${x.level === "ok" ? "rgba(255,255,255,.55)" : LOG_TX[x.level]}">${x.label}</span>
          ${x.ts ? html`<span class="ts">${x.ts}</span>` : nothing}
        </div>`)}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-checkup-card", GrowctrlCheckupCard);

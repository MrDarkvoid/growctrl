/*==============================================================================
 * GROWCTRL – growctrl-status-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Ereignisprotokoll (integrations-nativ): liest das 'verlauf'-Attribut der Letztes-Ereignis-Sensoren mehrerer Quellen, faerbt nach Schweregrad, neueste zuerst.
 * Version : 2.4.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX, STATUS_PILL,
  cardVars, worstLevel, type StyleConfig,
} from "../core/index";

interface StatusSource { entity: string; name?: string; }
interface StatusConfig {
  type: string; title?: string; sources: StatusSource[];
  limit?: number; min_level?: "alle" | "warnung"; style?: StyleConfig;
}
interface Row { ts: string; text: string; level: string; src?: string; }

export class GrowctrlStatusCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  protected validateConfig(c: StatusConfig) {
    if (!Array.isArray(c.sources) || !c.sources.length)
      throw new Error("growctrl-status-card: 'sources' (Letztes-Ereignis-Sensoren) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-status-editor"); }
  static getStubConfig() {
    return { sources: [{ entity: "sensor.growctrl_gross_main1_letztes_ereignis" }] };
  }

  render() {
    const c = this._config as StatusConfig;
    if (!this.hass) return nothing;
    const rows: Row[] = [];
    const levels: string[] = [];
    for (const s of c.sources) {
      const st = this.hass.states[s.entity];
      const verlauf = (st?.attributes?.verlauf as Row[]) ?? [];
      levels.push((st?.attributes?.schweregrad as string) ?? "ok");
      verlauf.forEach(r => rows.push({ ...r, src: s.name ?? this.friendly(s.entity) }));
    }
    rows.reverse();                                  // neueste zuerst
    const filtered = c.min_level === "warnung"
      ? rows.filter(r => r.level === "warning" || r.level === "critical") : rows;
    const shown = filtered.slice(0, c.limit ?? 12);
    const level = worstLevel(levels.map(l => l === "ok" ? "ok" : l));
    const pill = STATUS_PILL[level];

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level} style=${cardVars(c.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${c.title ?? "Ereignisprotokoll"}</div>
        <span class="status-pill" style="background:${pill.bg};color:${pill.color}">
          <span class="dot" style="background:${pill.color}"></span>${pill.label}</span>
      </div>
      <div style="margin-top:9px">
        ${shown.length ? shown.map(r => html`
          <div class="logrow" style="background:${r.level === "info" ? "transparent" : LOG_BG[r.level] ?? "transparent"};
              margin-top:3px;padding:6px 9px">
            <span class="ts" style="min-width:36px;flex-shrink:0">${r.ts}</span>
            ${c.sources.length > 1 ? html`<span style="font-size:10.5px;font-weight:800;min-width:62px;
              flex-shrink:0;color:rgba(255,255,255,.55)">${r.src}</span>` : nothing}
            <span class="txt" style="color:${r.level === "info" ? "rgba(255,255,255,.6)" : LOG_TX[r.level] ?? "rgba(255,255,255,.6)"}">${r.text}</span>
          </div>`) : html`<div class="logrow"><span class="txt" style="color:${THEME.ok}">
            \u2713 Noch keine Ereignisse</span></div>`}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-status-card", GrowctrlStatusCard);

/*==============================================================================
 * GROWCTRL – growctrl-status-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Ereignisprotokoll (v6): liest das 'verlauf'-Attribut der Letztes-
 *           Ereignis-Sensoren mehrerer Quellen, faerbt nach Schweregrad, neueste
 *           zuerst – als v6-Log-Zeilen (Zeit · Quelle · Klartext).
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, cardVars, worstLevel, pillClass, type StyleConfig,
} from "../core/index";

interface StatusSource { entity: string; name?: string; }
interface StatusConfig {
  type: string; title?: string; sources: StatusSource[];
  limit?: number; min_level?: "alle" | "warnung"; style?: StyleConfig;
}
interface Row { ts: string; text: string; level: string; src?: string; entity?: string; }

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
      verlauf.forEach(r => rows.push({ ...r, src: s.name ?? this.friendly(s.entity), entity: s.entity }));
    }
    rows.reverse();
    const filtered = c.min_level === "warnung"
      ? rows.filter(r => r.level === "warning" || r.level === "critical") : rows;
    const shown = filtered.slice(0, c.limit ?? 12);
    const level = worstLevel(levels);
    const multi = c.sources.length > 1;
    const rowCls = (lv: string) => lv === "critical" ? "c" : lv === "warning" ? "w" : lv === "info" ? "i" : "";

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level} style=${cardVars(c.style)}>
      <div class="hd">
        <div class="ttl grow">${c.title ?? "Ereignisprotokoll"}</div>
        <span class="pill ${pillClass(level)}">${level === "ok" ? "Info" : level === "warning" ? "Warnung" : level === "critical" ? "Kritisch" : "Info"}</span>
      </div>
      <div class="log">
        ${shown.length ? shown.map(r => html`
          <button class="gc lrow ${rowCls(r.level)}" @click=${() => r.entity && this.moreInfo(r.entity)}>
            <span class="tm">${r.ts}</span>
            ${multi ? html`<span class="who">${r.src}</span>` : nothing}
            <span class="what">${r.text}</span>
          </button>`)
        : html`<div class="lrow"><span class="what" style="color:var(--acc)">✓ Noch keine Ereignisse</span></div>`}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-status-card", GrowctrlStatusCard);

/*==============================================================================
 * GROWCTRL – growctrl-checkup-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Checkup-MATRIX (v6, integrations-nativ): je Station eine Zeile mit
 *           Ampelpunkten fuer Licht / Pumpe / Klima / Status; optionale Zelt-Zeile.
 *           Punkte werden aus den abgeleiteten Stations-/Zelt-Entitaeten gelesen.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, cardVars, worstLevel, pillClass, type StyleConfig,
  ST, TENT, stEnt, tentEnt, gcResolve, type GcOverrides,
} from "../core/index";

interface CheckupStation { tent?: string; station: string; name?: string; }
interface CheckupConfig {
  type: string; title?: string; tent?: string;
  stations?: CheckupStation[];
  show_tent_row?: boolean; tent_name?: string;
  overrides?: GcOverrides; style?: StyleConfig;
  // Rueckwaerts-kompatibel: altes rows[] wird ignoriert, falls stations gesetzt ist
  rows?: any[];
}

const STATUS_LABEL: Record<string,string> = {
  ok: "OK", warning: "Warnung", critical: "Kritisch", info: "Info", off: "—",
};

export class GrowctrlCheckupCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  protected validateConfig(c: CheckupConfig) {
    if ((!Array.isArray(c.stations) || !c.stations.length) && (!Array.isArray(c.rows) || !c.rows.length))
      throw new Error("growctrl-checkup-card: 'stations' (min. 1) ist Pflicht.");
  }
  static getConfigElement() { return document.createElement("growctrl-checkup-editor"); }
  static getStubConfig() { return { tent: "gross", show_tent_row: true, stations: [{ station: "main1" }, { station: "main2" }] }; }

  private sEnt(tent: string, station: string, key: keyof typeof ST): string {
    const [domain, suffix, role] = ST[key];
    return gcResolve(this.hass, tent, station, role) ?? stEnt(domain, tent, station, suffix);
  }
  private tEnt(tent: string, key: keyof typeof TENT): string {
    const [domain, suffix, role] = TENT[key];
    return gcResolve(this.hass, tent, "zelt", role) ?? tentEnt(domain, tent, suffix);
  }

  /** Licht/Pumpe/Status je Station als Level (ok|warning|critical|off). */
  private stationCells(tent: string, station: string) {
    const lightSt = this.hass.states[this.sEnt(tent, station, "lightRest")];
    const lichtAn = (lightSt?.attributes?.zustand as string) === "an";
    const licht = !lightSt ? "off" : lichtAn ? "ok" : "off";

    const pumpSt = this.hass.states[this.sEnt(tent, station, "pumpRest")];
    const pumpLocked = this.isOn(this.sEnt(tent, station, "pPump"));
    const pumpe = pumpLocked ? "warning" : !pumpSt ? "off" : "ok";

    const evt = this.hass.states[this.sEnt(tent, station, "event")];
    const sev = (evt?.attributes?.schweregrad as string) ?? "ok";
    const status = sev === "critical" ? "critical" : sev === "warning" ? "warning" : "ok";

    return { licht, pumpe, klima: "off", status,
      lichtText: lightSt ? (lichtAn ? `Licht an${lightSt.attributes?.text ? " · " + lightSt.attributes.text : ""}` : "Licht aus") : "—",
      pumpeText: pumpLocked ? "Pumpe gesperrt (Füllstand)" : pumpSt ? ((pumpSt.attributes?.text as string) ?? "Zyklus läuft") : "—",
      statusText: evt?.state ?? "OK",
      ent: { licht: this.sEnt(tent, station, "lightRest"), pumpe: this.sEnt(tent, station, "pumpRest"), status: this.sEnt(tent, station, "event") } };
  }

  private dot(level: string) {
    const cls = level === "off" ? "off" : pillClass(level);
    return html`<span class="dot ${cls}"></span>`;
  }
  private mc(level: string, title: string, ent?: string) {
    return html`<button class="gc mc" title=${title}
      @click=${() => ent && this.moreInfo(ent)}>${this.dot(level)}</button>`;
  }

  render() {
    const c = this._config as CheckupConfig;
    if (!this.hass) return nothing;
    const stations = (c.stations ?? []).map(s => ({ tent: s.tent ?? c.tent ?? "gross", station: s.station, name: s.name ?? s.station }));
    const tent = c.tent ?? stations[0]?.tent ?? "gross";

    const allLevels: string[] = [];
    const tentRow = c.show_tent_row ? (() => {
      const climateOn = this.isOn(this.tEnt(tent, "climate"));
      const statusSt = this.hass.states[this.tEnt(tent, "status")];
      const tentProblem = (statusSt?.state ?? "").toLowerCase() === "problem";
      const klima = climateOn ? "ok" : "off";
      const status = tentProblem ? "warning" : "ok";
      allLevels.push(status);
      return { name: c.tent_name ?? `Zelt ${tent}`, licht: "off", pumpe: "off", klima, status,
        klimaEnt: this.tEnt(tent, "climate"), statusEnt: this.tEnt(tent, "status") };
    })() : null;

    const rows = stations.map(s => { const cells = this.stationCells(s.tent, s.station); allLevels.push(cells.status, cells.pumpe); return { ...s, ...cells }; });
    const level = worstLevel(allLevels);

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level} style=${cardVars(c.style)}>
      <div class="hd">
        <div class="grow">
          <div class="ttl">${c.title ?? "Checkup"}</div>
          <div class="sub">${stations.length} ${stations.length === 1 ? "Station" : "Stationen"}${c.show_tent_row ? " · 1 Zelt" : ""}</div>
        </div>
        <span class="pill ${pillClass(level)}">${level === "ok" ? "Alles OK" : level === "warning" ? "Warnung" : level === "critical" ? "Kritisch" : "Info"}</span>
      </div>
      <div class="matrix">
        <span></span>
        <span class="mh">Licht</span><span class="mh">Pumpe</span><span class="mh">Klima</span><span class="mh">Status</span>
        ${tentRow ? html`
          <div class="mn">${tentRow.name}</div>
          ${this.mc(tentRow.licht, "Licht – auf Zeltebene nicht relevant")}
          ${this.mc(tentRow.pumpe, "Pumpe – auf Zeltebene nicht relevant")}
          ${this.mc(tentRow.klima, tentRow.klima === "ok" ? "Klima-Automatik AN" : "Klima-Automatik AUS", tentRow.klimaEnt)}
          ${this.mc(tentRow.status, "Zelt-Status", tentRow.statusEnt)}` : nothing}
        ${rows.map(r => html`
          <div class="mn">${r.name}</div>
          ${this.mc(r.licht, r.lichtText, r.ent.licht)}
          ${this.mc(r.pumpe, r.pumpeText, r.ent.pumpe)}
          ${this.mc(r.klima, "Klima wird auf Zeltebene geregelt")}
          ${this.mc(r.status, r.statusText, r.ent.status)}`)}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-checkup-card", GrowctrlCheckupCard);

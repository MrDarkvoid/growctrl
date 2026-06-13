/*==============================================================================
 * GROWCTRL – growctrl-checkup-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Checkup-MATRIX (v6, integrations-nativ), getrennt nach STATIONEN
 *           (Licht/Pumpe/Auto/Eingriff/Status) und ZELT (Aktiv/Klima/VPD/Status).
 *           So sind die Punkte je Ebene sinnvoll (das Zelt hat z.B. kein Licht).
 *           Punkte werden aus den abgeleiteten Entitaeten gelesen.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, cardVars, worstLevel, pillClass, num, type StyleConfig,
  ST, TENT, stEnt, tentEnt, gcResolve, type GcOverrides,
} from "../core/index";

interface CheckupStation { tent?: string; station: string; name?: string; }
interface CheckupConfig {
  type: string; title?: string; tent?: string;
  stations?: CheckupStation[];
  show_tent_row?: boolean; tent_name?: string;
  overrides?: GcOverrides; style?: StyleConfig;
  rows?: any[];   // alt; ignoriert wenn stations gesetzt
}

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

  /** Stations-Punkte: Licht / Pumpe / Auto / Eingriff / Status. */
  private stationCells(tent: string, station: string) {
    const lightSt = this.hass.states[this.sEnt(tent, station, "lightRest")];
    const lichtAn = (lightSt?.attributes?.zustand as string) === "an";
    const failsafe = this.isOn(this.sEnt(tent, station, "pFailsafe"));
    const lightProblem = this.isOn(this.sEnt(tent, station, "pPower")) || this.isOn(this.sEnt(tent, station, "pTime"));
    const licht = failsafe ? "critical" : lightProblem ? "warning" : lightSt ? (lichtAn ? "ok" : "off") : "off";
    const lichtText = failsafe ? "Licht-Failsafe ausgel\u00f6st"
      : this.isOn(this.sEnt(tent, station, "pPower")) ? "Licht AN ohne Leistung"
      : this.isOn(this.sEnt(tent, station, "pTime")) ? "Lichtzeiten unvollst\u00e4ndig"
      : lightSt ? (lichtAn ? "Licht an" : (lightSt.attributes?.aktiv === false ? "Licht ausgeschaltet" : "Licht aus")) : "\u2014";

    const pumpBlocked = this.isOn(this.sEnt(tent, station, "pPump"));
    const pumpSt = this.hass.states[this.sEnt(tent, station, "pumpRest")];
    const pumpe = pumpBlocked ? "critical" : pumpSt ? "ok" : "off";
    const pumpeText = pumpBlocked ? "Pumpe gesperrt (F\u00fcllstand)"
      : pumpSt ? (pumpSt.attributes?.aktiv === false ? "Pumpe ausgeschaltet" : ((pumpSt.attributes?.text as string) ?? "Zyklus l\u00e4uft")) : "\u2014";

    const autoOn = this.isOn(this.sEnt(tent, station, "auto"));
    const maint = this.isOn(this.sEnt(tent, station, "wartung"));
    const auto = maint ? "info" : autoOn ? "ok" : "warning";
    const autoText = maint ? "Wartungsmodus aktiv" : autoOn ? "Automatik AN" : "Automatik AUS (manuell)";

    const ovr = this.isOn(this.sEnt(tent, station, "pOverride"));
    const eingriff = ovr ? "warning" : "ok";
    const eingriffText = ovr ? "Manueller Eingriff aktiv" : "Kein Eingriff";

    const evt = this.hass.states[this.sEnt(tent, station, "event")];
    const sev = (evt?.attributes?.schweregrad as string) ?? "ok";
    const status = sev === "critical" ? "critical" : sev === "warning" ? "warning" : "ok";
    const statusText = evt?.state ?? "OK";

    return { licht, pumpe, auto, eingriff, status,
      lichtText, pumpeText, autoText, eingriffText, statusText,
      ent: {
        licht: this.sEnt(tent, station, "lightRest"), pumpe: this.sEnt(tent, station, "pumpRest"),
        auto: this.sEnt(tent, station, "auto"), eingriff: this.sEnt(tent, station, "pOverride"),
        status: this.sEnt(tent, station, "event"),
      } };
  }

  /** Zelt-Punkte: Aktiv / Klima / VPD / Status. */
  private tentCells(tent: string) {
    const enabledOn = this.isOn(this.tEnt(tent, "enabled"));
    const aktiv = enabledOn ? "ok" : "warning";
    const aktivText = enabledOn ? "Zelt aktiv" : "Zelt deaktiviert";

    const climateOn = this.isOn(this.tEnt(tent, "climate"));
    const klima = climateOn ? "ok" : "off";
    const klimaText = climateOn ? "Klima-Automatik AN" : "Klima-Automatik AUS";

    const vpdSt = this.hass.states[this.tEnt(tent, "vpd")];
    const v = num(vpdSt?.state);
    const tg = vpdSt?.attributes?.sollwerte as { vpd_min: number; vpd_max: number } | undefined;
    const vpd = (v !== null && tg) ? (v >= tg.vpd_min && v <= tg.vpd_max ? "ok" : "warning") : (vpdSt ? "ok" : "off");
    const vpdText = v !== null ? `VPD ${v.toFixed(2)} kPa${tg ? ` (Soll ${tg.vpd_min}\u2013${tg.vpd_max})` : ""}` : "\u2014";

    const statusSt = this.hass.states[this.tEnt(tent, "status")];
    const problem = (statusSt?.state ?? "").toLowerCase() === "problem";
    const probleme = (statusSt?.attributes?.probleme as string[]) ?? [];
    const status = problem ? "warning" : "ok";
    const statusText = problem ? (probleme[0] ?? "Problem erkannt") : "Alles OK";

    return { aktiv, klima, vpd, status, aktivText, klimaText, vpdText, statusText,
      ent: { aktiv: this.tEnt(tent, "enabled"), klima: this.tEnt(tent, "climate"), vpd: this.tEnt(tent, "vpd"), status: this.tEnt(tent, "status") } };
  }

  private dot(level: string) {
    return html`<span class="dot ${level === "off" ? "off" : pillClass(level)}"></span>`;
  }
  private mc(level: string, title: string, ent?: string) {
    return html`<button class="gc mc" title=${title} @click=${() => ent && this.moreInfo(ent)}>${this.dot(level)}</button>`;
  }

  render() {
    const c = this._config as CheckupConfig;
    if (!this.hass) return nothing;
    const stations = (c.stations ?? []).map(s => ({ tent: s.tent ?? c.tent ?? "gross", station: s.station, name: s.name ?? s.station }));
    const tent = c.tent ?? stations[0]?.tent ?? "gross";
    const showTent = c.show_tent_row !== false;

    const allLevels: string[] = [];
    const rows = stations.map(s => { const cells = this.stationCells(s.tent, s.station); allLevels.push(cells.status, cells.pumpe, cells.licht, cells.auto, cells.eingriff); return { ...s, ...cells }; });
    const t = showTent ? this.tentCells(tent) : null;
    if (t) allLevels.push(t.status, t.aktiv, t.vpd);
    const level = worstLevel(allLevels);

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level} style=${cardVars(c.style)}>
      <div class="hd">
        <div class="grow">
          <div class="ttl">${c.title ?? "Checkup"}</div>
          <div class="sub">${stations.length} ${stations.length === 1 ? "Station" : "Stationen"}${showTent ? " \u00b7 1 Zelt" : ""}</div>
        </div>
        <span class="pill ${pillClass(level)}">${level === "ok" ? "Alles OK" : level === "warning" ? "Warnung" : level === "critical" ? "Kritisch" : "Info"}</span>
      </div>

      <div class="seclbl" style="margin-top:2px">Stationen</div>
      <div class="matrix m5">
        <span></span>
        <span class="mh">Licht</span><span class="mh">Pumpe</span><span class="mh">Auto</span><span class="mh">Eingriff</span><span class="mh">Status</span>
        ${rows.map(r => html`
          <div class="mn">${r.name}</div>
          ${this.mc(r.licht, r.lichtText, r.ent.licht)}
          ${this.mc(r.pumpe, r.pumpeText, r.ent.pumpe)}
          ${this.mc(r.auto, r.autoText, r.ent.auto)}
          ${this.mc(r.eingriff, r.eingriffText, r.ent.eingriff)}
          ${this.mc(r.status, r.statusText, r.ent.status)}`)}
      </div>

      ${t ? html`
        <div class="seclbl">Zelt</div>
        <div class="matrix m4">
          <span></span>
          <span class="mh">Aktiv</span><span class="mh">Klima</span><span class="mh">VPD</span><span class="mh">Status</span>
          <div class="mn">${c.tent_name ?? `Zelt ${tent}`}</div>
          ${this.mc(t.aktiv, t.aktivText, t.ent.aktiv)}
          ${this.mc(t.klima, t.klimaText, t.ent.klima)}
          ${this.mc(t.vpd, t.vpdText, t.ent.vpd)}
          ${this.mc(t.status, t.statusText, t.ent.status)}
        </div>` : nothing}
    </div>`;
  }
}
customElements.define("growctrl-checkup-card", GrowctrlCheckupCard);

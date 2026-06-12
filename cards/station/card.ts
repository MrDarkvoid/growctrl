/*==============================================================================
 * GROWCTRL – growctrl-station-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Stations-Karte v3 (integrations-nativ): Auto/Wartung, Phasen-Chips, KPI-Reihe (Licht/Pumpe/DLI/Alter), Ereigniszeile, Problem-Badges, Einstellungen per Zahnrad. Entity-IDs werden aus tent+station abgeleitet (overrides moeglich).
 * Version : 2.4.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, STAGE_COLORS, STATUS_PILL, LOG_TX,
  cardVars, type StyleConfig, num,
  stEnt, ST, type GcOverrides,
} from "../core/index";

const STAGES = ["Seedling", "Veg", "Bloom", "Flush", "Trocknung"];

interface StationConfig {
  type: string; tent: string; station: string; name?: string;
  show_settings?: boolean; overrides?: GcOverrides; style?: StyleConfig;
}

export class GrowctrlStationCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _open: { state: true } };
  private _open = false;

  protected validateConfig(c: StationConfig) {
    if (!c.tent || !c.station)
      throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).");
  }
  static getConfigElement() { return document.createElement("growctrl-station-editor"); }
  static getStubConfig() { return { tent: "gross", station: "main1" }; }

  private e(key: keyof typeof ST): string {
    const [domain, suffix] = ST[key];
    const c = this._config as StationConfig;
    return stEnt(domain, c.tent, c.station, suffix, c.overrides);
  }
  private _select(entity: string, option: string) {
    this.hass.callService("select", "select_option", { entity_id: entity, option });
  }

  render() {
    const c = this._config as StationConfig;
    if (!this.hass) return nothing;
    const stage = this.st(this.e("stage")) ?? "Veg";
    const sc = STAGE_COLORS[stage] ?? STAGE_COLORS.Veg;
    const auto = this.isOn(this.e("auto"));
    const wart = this.isOn(this.e("wartung"));

    // Probleme + Schweregrad fuer die Karten-Ampel
    const problems = [
      { e: this.e("pOverride"), label: "Manueller Eingriff" },
      { e: this.e("pFailsafe"), label: "Licht-Failsafe" },
      { e: this.e("pTime"), label: "Zeiten unvollst\u00e4ndig" },
    ].filter(p => this.isOn(p.e));
    const evt = this.hass.states[this.e("event")];
    const sev = problems.length ? (this.isOn(this.e("pFailsafe")) ? "critical" : "warning")
      : ((evt?.attributes?.schweregrad as string) === "critical" ? "warning" : "ok");
    const pill = STATUS_PILL[sev] ?? STATUS_PILL.ok;

    const dli = num(this.st(this.e("dli")));
    const dliFc = num(this.st(this.e("dliFc")));
    const dliTarget = this.hass.states[this.e("dli")]?.attributes?.ziel_aktuelle_phase as number | undefined;
    const age = num(this.st(this.e("age")));
    const rec = this.st(this.e("rec"));
    const hasPump = !!this.hass.states[this.e("pumpRest")];
    const hasDli = !!this.hass.states[this.e("dli")];

    const kpi = (label: string, value: string, sub?: string, accent?: string) => html`
      <div class="tile" style="min-width:0">
        <div class="lbl">${label}</div>
        <div style="font-size:19px;font-weight:800;letter-spacing:-.3px;line-height:1.15;
          color:${accent ?? "rgba(255,255,255,.92)"}">${value}</div>
        ${sub ? html`<div style="font-size:10px;color:rgba(255,255,255,.45);margin-top:2px">${sub}</div>` : nothing}
      </div>`;

    const setting = (entity: string, label: string) => html`
      <button class="gc tile" style="text-align:left;min-width:0" @click=${() => this.moreInfo(entity)}>
        <div class="lbl">${label}</div>
        <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,.85)">
          ${this.st(entity) ?? "\u2013"}</div>
      </button>`;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${sev}
        style="${cardVars(c.style)};position:relative">
      <div class="hdr">
        <div style="min-width:0">
          <div class="title" style="display:flex;align-items:center;gap:8px">
            ${c.name ?? `${c.tent} \u00b7 ${c.station}`}
            <span class="stagebadge" style="background:${sc.bg};color:${sc.color}">${stage}</span>
          </div>
          <div class="subtitle" style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="dot" style="background:${pill.color}"></span>${pill.label}
            ${wart ? html`<span style="color:#FFD166;font-weight:700">\u00b7 Wartung</span>` : nothing}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <button class="gc" title="Wartung (System greift nicht ein)"
            style="width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;
              background:${wart ? "rgba(255,209,102,.16)" : "rgba(255,255,255,.05)"};
              border:1px solid ${wart ? "rgba(255,209,102,.5)" : "rgba(255,255,255,.1)"};
              color:${wart ? "#FFD166" : "rgba(255,255,255,.5)"}"
            @click=${() => this.toggle(this.e("wartung"))}>
            <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:14px"></ha-icon></button>
          ${c.show_settings !== false ? html`<button class="gc" title="Einstellungen"
            style="width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;
              background:${this._open ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.05)"};
              border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.55)"
            @click=${() => { this._open = !this._open; }}>
            <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:14px"></ha-icon></button>` : nothing}
          <button class="gc" style="padding:6px 13px;border-radius:12px;font-size:11px;font-weight:800;
              letter-spacing:.4px;transition:all .18s;
              background:${auto ? "rgba(77,255,195,.13)" : "rgba(255,255,255,.05)"};
              border:1.5px solid ${auto ? THEME.ok : "rgba(255,255,255,.14)"};
              color:${auto ? THEME.ok : "rgba(255,255,255,.5)"}"
            @click=${() => this.confirmToggle(this.e("auto"), "Automatik")}>
            AUTO ${auto ? "AN" : "AUS"}</button>
        </div>
      </div>

      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:12px">
        ${STAGES.map(s => {
          const col = STAGE_COLORS[s];
          const on = s === stage;
          return html`<button class="gc" style="padding:5px 12px;border-radius:10px;font-size:11px;
              font-weight:700;transition:all .15s;
              background:${on ? col.bg : "rgba(255,255,255,.04)"};
              border:1.5px solid ${on ? col.color : "rgba(255,255,255,.09)"};
              color:${on ? col.color : "rgba(255,255,255,.45)"}"
            @click=${() => this._select(this.e("stage"), s)}>${s}</button>`;
        })}
      </div>

      <div class="grid" style="grid-template-columns:repeat(${hasDli ? 4 : hasPump ? 3 : 2},1fr);margin-top:12px">
        ${kpi("Licht", this.st(this.e("lightRest")) ?? "\u2013",
              `${this.unit(this.e("lightRest")) || "min"} Restzeit`)}
        ${hasPump ? kpi("Pumpe", this.st(this.e("pumpRest")) ?? "\u2013",
              `${this.unit(this.e("pumpRest")) || "min"} Restzeit`) : nothing}
        ${hasDli ? kpi("DLI heute",
              dli !== null ? dli.toFixed(1) : "\u2013",
              dliTarget ? `Ziel ${dliTarget} \u00b7 Prognose ${dliFc !== null ? dliFc.toFixed(1) : "\u2013"}` : undefined,
              dliTarget && dli !== null && dli >= dliTarget ? THEME.ok : undefined) : nothing}
        ${kpi("Alter", age !== null ? `${age} d` : "\u2013",
              rec && rec !== stage ? `\u2192 ${rec} empfohlen` : "Phase passt",
              rec && rec !== stage ? "#FFD166" : undefined)}
      </div>

      ${problems.length ? html`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">
        ${problems.map(p => html`<span class="badge warn">\u26A0 ${p.label}</span>`)}</div>` : nothing}

      ${evt ? html`<button class="gc logrow" style="width:100%;margin-top:10px;text-align:left"
          @click=${() => this.moreInfo(this.e("event"))}>
          <span class="dot" style="background:${LOG_TX[(evt.attributes?.schweregrad as string) === "ok" ? "info" : (evt.attributes?.schweregrad as string)] ?? THEME.info};flex-shrink:0"></span>
          <span class="txt" style="color:rgba(255,255,255,.65)">${evt.state}</span>
        </button>` : nothing}

      ${this._open ? html`<div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:10px">
        ${setting(this.e("lightOn"), "Licht AN")}
        ${setting(this.e("lightOffSv"), "AUS Seed/Veg")}
        ${setting(this.e("lightOffBloom"), "AUS Bloom")}
        ${setting(this.e("germination"), "Keimstart")}
        ${setting(this.e("overrideMin"), "Man. \u00dcbernahme")}
      </div>` : nothing}
      ${this.renderConfirm()}
    </div>`;
  }
}
customElements.define("growctrl-station-card", GrowctrlStationCard);

/*==============================================================================
 * GROWCTRL – growctrl-station-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Stations-Karte v3 (integrations-nativ): Auto/Wartung, Phasen-Chips, KPI-Reihe (Licht/Pumpe/DLI/Alter), Ereigniszeile, Problem-Badges, Einstellungen per Zahnrad. Entity-IDs werden aus tent+station abgeleitet (overrides moeglich).
 * Version : 2.4.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, STAGE_COLORS, STATUS_PILL, LOG_TX,
  cardVars, type StyleConfig, num,
  stEnt, ST, type GcOverrides,
  gcResolve,
  fmtDur, fmtAge, daysSince,
} from "../core/index";

const STAGES = ["Seedling", "Veg", "Bloom", "Flush", "Trocknung"];

interface StationConfig {
  age_format?: "auto" | "tage" | "wochen";
  show_age?: boolean;       // Alter-KPI (Standard aus - gehoert eher zur Pflanzen-Karte)
  show_event?: boolean;     // Ereigniszeile am Kartenfuss (Standard aus)
  plants?: Array<{ name: string; strain?: string; germination_helper?: string;
    sensors?: string[]; image?: string }>;   // Pflanzen-Tabs direkt in der Station
  type: string; tent: string; station: string; name?: string;
  show_settings?: boolean; overrides?: GcOverrides; style?: StyleConfig;
}

export class GrowctrlStationCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _open: { state: true }, _tab: { state: true } };
  private _open = false;
  private _tab = 0;

  protected validateConfig(c: StationConfig) {
    if (!c.tent || !c.station)
      throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).");
  }
  static getConfigElement() { return document.createElement("growctrl-station-editor"); }
  static getStubConfig() { return { tent: "gross", station: "main1" }; }

  /** Vorschau im Kartenwaehler: Beispieldaten statt leerer Karte. */
  private get isPreview(): boolean {
    return !this.hass?.states?.[this.e("stage")];
  }

  private e(key: keyof typeof ST): string {
    const [domain, suffix, role] = ST[key];
    const c = this._config as StationConfig;
    // 1) explizite overrides  2) Attribut-Registry (umbenennungssicher)  3) abgeleitete ID
    return c.overrides?.[suffix]
      ?? gcResolve(this.hass, c.tent, c.station, role)
      ?? stEnt(domain, c.tent, c.station, suffix, c.overrides);
  }
  private _select(entity: string, option: string) {
    this.hass.callService("select", "select_option", { entity_id: entity, option });
  }

  render() {
    const c = this._config as StationConfig;
    if (!this.hass) return nothing;
    const demo = this.isPreview;
    const showAge = (this._config as StationConfig).show_age === true;
    const stage = this.st(this.e("stage")) ?? "Veg";
    const sc = STAGE_COLORS[stage] ?? STAGE_COLORS.Veg;
    const auto = this.isOn(this.e("auto")) || demo;
    const wart = this.isOn(this.e("wartung"));

    // Probleme + Schweregrad fuer die Karten-Ampel
    const problems = [
      { e: this.e("pOverride"), label: "Manueller Eingriff" },
      { e: this.e("pFailsafe"), label: "Licht-Failsafe" },
      { e: this.e("pTime"), label: "Zeiten unvollst\u00e4ndig" },
      { e: this.e("pPump"), label: "Pumpe gesperrt (F\u00fcllstand)" },
      { e: this.e("pPower"), label: "Licht ohne Leistung" },
    ].filter(p => this.isOn(p.e));
    const evt = this.hass.states[this.e("event")];
    const sev = problems.length ? (this.isOn(this.e("pFailsafe")) ? "critical" : "warning")
      : ((evt?.attributes?.schweregrad as string) === "critical" ? "warning" : "ok");
    const pill = STATUS_PILL[sev] ?? STATUS_PILL.ok;

    const dli = num(this.st(this.e("dli"))) ?? (demo ? 18.4 : null);
    const dliFc = num(this.st(this.e("dliFc"))) ?? (demo ? 24.7 : null);
    const dliTarget = this.hass.states[this.e("dli")]?.attributes?.ziel_aktuelle_phase as number | undefined;
    const age = num(this.st(this.e("age"))) ?? (demo ? 24 : null);
    const rec = this.st(this.e("rec"));
    const hasPump = !!this.hass.states[this.e("pumpRest")] || demo;
    const hasDli = !!this.hass.states[this.e("dli")] || demo;
    const kpiCount = (hasPump ? 1 : 0) + (hasDli ? 1 : 0) + (showAge ? 1 : 0);

    const kpi = (label: string, value: string, sub?: string, accent?: string) => html`
      <div class="tile" style="min-width:0">
        <div class="lbl">${label}</div>
        <div style="font-size:19px;font-weight:800;letter-spacing:-.3px;line-height:1.15;
          color:${accent ?? "rgba(255,255,255,.92)"}">${value}</div>
        ${sub ? html`<div style="font-size:11px;color:rgba(255,255,255,.6);margin-top:2px">${sub}</div>` : nothing}
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
              color:${on ? col.color : "rgba(255,255,255,.6)"}"
            @click=${() => this._select(this.e("stage"), s)}>${s}</button>`;
        })}
      </div>

      ${this.lightRow()}

      ${kpiCount > 0 ? html`<div class="kpis cols-${Math.min(3, Math.max(2, kpiCount))}" style="margin-top:10px">
        ${hasPump ? kpi("Pumpe", demo ? "12 min" : fmtDur(Number(this.st(this.e("pumpRest")))),
              demo ? "Restzeit (Demo)" : "Restzeit") : nothing}
        ${hasDli ? kpi("DLI heute",
              dli !== null ? dli.toFixed(1) : "\u2013",
              dliTarget ? `Ziel ${dliTarget} \u00b7 Prognose ${dliFc !== null ? dliFc.toFixed(1) : "\u2013"}` : undefined,
              dliTarget && dli !== null && dli >= dliTarget ? THEME.ok : undefined) : nothing}
        ${showAge ? kpi("Alter", age !== null ? fmtAge(age, c.age_format ?? "auto") : "\u2013",
              rec && rec !== stage ? `\u2192 ${rec} empfohlen`
                : (this.hass.states[this.e("rec")]?.attributes?.hinweis ? "Hinweis \u2013 antippen" : "Phase passt"),
              rec && rec !== stage ? "#FFD166" : undefined) : nothing}
      </div>` : nothing}

      ${this.plantTabs()}

      ${problems.length ? html`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">
        ${problems.map(p => html`<span class="badge warn">\u26A0 ${p.label}</span>`)}</div>` : nothing}

      ${(this._config as StationConfig).show_event === true && evt ? html`<button class="gc logrow" style="width:100%;margin-top:10px;text-align:left"
          @click=${() => this.moreInfo(this.e("event"))}>
          <span class="dot" style="background:${LOG_TX[(evt.attributes?.schweregrad as string) === "ok" ? "info" : (evt.attributes?.schweregrad as string)] ?? THEME.info};flex-shrink:0"></span>
          <span class="txt" style="color:rgba(255,255,255,.65)">${evt.state}</span>
        </button>` : nothing}

      ${this._open ? html`<div class="settings-grid" style="margin-top:10px">
        ${setting(this.e("lightOn"), "Licht AN")}
        ${setting(this.e("lightOffSv"), "AUS Seed/Veg")}
        ${setting(this.e("lightOffBloom"), "AUS Bloom")}
        ${setting(this.e("germination"), "Keimstart")}
        ${setting(this.e("overrideMin"), "Man. \u00dcbernahme")}
      </div>` : nothing}
      ${this.renderConfirm()}
    </div>`;
  }

  /** Licht-Status als volle Zeile: Lampe + "Licht an fuer 5 h 40 min" + Restzeit-Balken.
   *  Gelb = restliche LEUCHTzeit (nimmt ab), Blaugrau = restliche Dunkelzeit. */
  private lightRow() {
    if (this.isPreview) {
      const restSt = undefined as any;  // Demo-Zweig unten nutzt Festwerte
      void restSt;
      return this.lightRowView(true, "Licht an f\u00fcr 5 h 40 min", 0.62);
    }
    const restSt = this.hass.states[this.e("lightRest")];
    const rest = Number(restSt?.state);
    const a = restSt?.attributes ?? {};
    const an = a.zustand ? a.zustand === "an" : undefined;
    const text = a.text ?? (isNaN(rest) ? "\u2013" : `Restzeit ${fmtDur(rest)}`);
    const anteil = typeof a.anteil === "number" ? Math.min(1, Math.max(0, a.anteil)) : null;
    return this.lightRowView(an, text, anteil);
  }

  private lightRowView(an: boolean | undefined, text: string, anteil: number | null) {
    const col = an === false ? "#7A8CA8" : "#FFD166";
    return html`<div class="tile" style="margin-top:12px;display:flex;align-items:center;gap:12px">
      <ha-icon icon="${an === false ? "mdi:lightbulb-outline" : "mdi:lightbulb-on"}"
        style="--mdc-icon-size:26px;color:${col};flex-shrink:0;
               ${an !== false ? `filter:drop-shadow(0 0 7px ${col})` : ""}"></ha-icon>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,.9)">${text}</div>
        ${anteil !== null ? html`
          <div style="height:7px;border-radius:4px;background:rgba(255,255,255,.08);margin-top:6px;overflow:hidden">
            <div style="height:100%;width:${(anteil * 100).toFixed(1)}%;border-radius:4px;
              background:linear-gradient(90deg, ${col}, ${col}cc);
              box-shadow:0 0 8px ${col}66;transition:width .6s"></div>
          </div>
          <div style="font-size:10.5px;color:rgba(255,255,255,.55);margin-top:3px">
            ${an === false ? "Dunkelphase" : "Leuchtphase"} \u00b7 ${(anteil * 100).toFixed(0)} % verbleibend</div>`
        : nothing}
      </div>
    </div>`;
  }
  /** Pflanzen-Tabs: Infos + Sensorwerte je Pflanze direkt in der Stations-Karte. */
  private plantTabs() {
    const plants = (this._config as StationConfig).plants ?? [];
    if (!plants.length) return nothing;
    const i = Math.min(this._tab, plants.length - 1);
    const pl = plants[i];
    const germ = pl.germination_helper ? this.st(pl.germination_helper) : null;
    const age = germ ? daysSince(germ) : null;
    return html`
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:12px">
        ${plants.map((pp, pi) => html`<button class="gc" style="padding:5px 13px;border-radius:10px;
            font-size:11.5px;font-weight:700;transition:all .15s;
            background:${pi === i ? "rgba(77,255,195,.13)" : "rgba(255,255,255,.04)"};
            border:1.5px solid ${pi === i ? THEME.ok : "rgba(255,255,255,.1)"};
            color:${pi === i ? THEME.ok : "rgba(255,255,255,.55)"}"
          @click=${() => { this._tab = pi; }}>\ud83c\udf31 ${pp.name}</button>`)}
      </div>
      <div class="tile" style="margin-top:8px">
        <div style="display:flex;align-items:center;gap:12px">
          ${pl.image ? html`<img src="${pl.image}" style="width:52px;height:52px;border-radius:12px;
              object-fit:cover;border:1px solid rgba(255,255,255,.15)"/>` : nothing}
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:800">${pl.name}</div>
            <div style="font-size:11px;color:rgba(255,255,255,.6)">
              ${pl.strain ?? ""}${pl.strain && age !== null ? " \u00b7 " : ""}${age !== null ? `${fmtAge(age)} \u00b7 Tag ${age + 1}` : ""}</div>
          </div>
        </div>
        ${pl.sensors?.length ? html`
          <div class="kpis cols-${Math.min(3, Math.max(2, pl.sensors.length))}" style="margin-top:10px">
            ${pl.sensors.map(se => {
              const v = num(this.st(se));
              return html`<div class="tile" style="background:rgba(0,0,0,.18)">
                <div class="lbl">${this.friendly(se)}</div>
                <div style="font-size:18px;font-weight:800">${v !== null ? v : (this.st(se) ?? "\u2013")}
                  <span class="unit">${this.unit(se)}</span></div>
              </div>`;
            })}
          </div>` : nothing}
      </div>`;
  }
}
customElements.define("growctrl-station-card", GrowctrlStationCard);

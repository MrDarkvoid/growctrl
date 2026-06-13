/*==============================================================================
 * GROWCTRL – growctrl-station-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Stations-Karte "Soft Garden" (integrations-nativ): Auto/Wartung,
 *           Phasen-DROPDOWN (volle Breite), Versorgungszeilen Licht/Pumpe/DLI/Tank
 *           (einheitlicher Stil, voller Breite), optionales Aktor-Raster (4 nebenei-
 *           nander), Pflanzen-Tabs mit Sensor-Anzeige wert|zone|graph, Ereigniszeile,
 *           Diagnose-Badges, Einstellungen. Entity-IDs aus tent+station (overrides ok).
 * Version : 3.0.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, STAGE_COLORS, STATUS_PILL, LOG_TX,
  cardVars, type StyleConfig, num,
  stEnt, ST, type GcOverrides,
  gcResolve,
  fmtDur, fmtAge, daysSince, sparkline, zoneBar, fetchHistory,
} from "../core/index";

/** Pflanzen-Sensor: einfacher Entity-String ODER konfigurierte Anzeige.
 *  anzeige "wert": nur Zahl + Label.  "zone": pH/EC-Balken mit Idealbereich.
 *  "graph": Mini-Verlauf (Sparkline), z.B. Temperatur/Feuchtigkeit. */
type PlantSensor = string | { entity: string; name?: string;
  anzeige?: "wert" | "zone" | "graph"; icon?: string; color?: string;
  min?: number; max?: number; ok?: [number, number]; ideal?: [number, number];
  hours?: number };

/** Optionaler Aktor in der Station (Schalter direkt in der Karte). */
interface StationActuator { entity: string; name?: string; icon?: string;
  confirm?: boolean; kind?: "light" | "heat" | "water" }

const STAGES = ["Seedling", "Veg", "Bloom", "Flush", "Trocknung"];
const STAGE_HINT: Record<string, string> = {
  Seedling: "Anzucht", Veg: "Wachstum", Bloom: "Bl\u00fcte", Flush: "Sp\u00fclen", Trocknung: "Ernte",
};
const ACT_ICON: Record<string, string> = {
  light: "mdi:lightbulb", heat: "mdi:radiator", water: "mdi:air-humidifier",
  pump: "mdi:water-pump", fan: "mdi:fan", o2: "mdi:scuba-tank",
};

interface StationConfig {
  age_format?: "auto" | "tage" | "wochen";
  show_event?: boolean;
  tank_entity?: string; tank_min?: number; tank_volume?: number;
  actuators?: StationActuator[];     // optionale Schalter-Kacheln in der Station
  plants?: Array<{ name: string; strain?: string; germination_helper?: string;
    sensors?: PlantSensor[]; image?: string;
    tank_entity?: string; tank_min?: number }>;
  type: string; tent: string; station: string; name?: string;
  show_settings?: boolean; overrides?: GcOverrides; style?: StyleConfig;
}

export class GrowctrlStationCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties,
    _open: { state: true }, _tab: { state: true }, _spark: { state: true }, _phase: { state: true } };
  private _open = false;
  private _tab = 0;
  private _phase = false;
  private _spark: Record<string, number[]> = {};

  updated(changed: Map<string, unknown>) {
    super.updated?.(changed);
    if (!changed.has("hass") && !changed.has("_config")) return;
    const c = this._config as StationConfig;
    const graphs = (c?.plants ?? []).flatMap(pl => (pl.sensors ?? [])
      .map(s => (typeof s === "string" ? { entity: s } : s))
      .filter(s => s.anzeige === "graph"));
    graphs.forEach(async g => {
      const data = await fetchHistory(this.hass, g.entity, g.hours ?? 24);
      if (data.length && this._spark[g.entity]?.length !== data.length) {
        this._spark = { ...this._spark, [g.entity]: data };
      }
    });
  }

  protected validateConfig(c: StationConfig) {
    if (!c.tent || !c.station)
      throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).");
  }
  static getConfigElement() { return document.createElement("growctrl-station-editor"); }
  static getStubConfig() { return { tent: "gross", station: "main1" }; }

  private get isPreview(): boolean { return !this.hass?.states?.[this.e("stage")]; }

  private e(key: keyof typeof ST): string {
    const [domain, suffix, role] = ST[key];
    const c = this._config as StationConfig;
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
    const stage = this.st(this.e("stage")) ?? "Veg";
    const sc = STAGE_COLORS[stage] ?? STAGE_COLORS.Veg;
    const auto = this.isOn(this.e("auto")) || demo;
    const wart = this.isOn(this.e("wartung"));

    const problems = [
      { e: this.e("pOverride"), label: "Manueller Eingriff", crit: false },
      { e: this.e("pFailsafe"), label: "Licht-Failsafe", crit: true },
      { e: this.e("pTime"), label: "Zeiten unvollst\u00e4ndig", crit: false },
      { e: this.e("pPump"), label: "Pumpe gesperrt (F\u00fcllstand)", crit: false },
      { e: this.e("pPower"), label: "Licht ohne Leistung", crit: true },
    ].filter(p => this.isOn(p.e));
    const evt = this.hass.states[this.e("event")];
    const sev = problems.length ? (problems.some(p => p.crit) ? "critical" : "warning")
      : ((evt?.attributes?.schweregrad as string) === "critical" ? "warning" : "ok");
    const pill = STATUS_PILL[sev] ?? STATUS_PILL.ok;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${sev}
        style="${cardVars(c.style)};position:relative">

      <div class="hdr">
        <div style="min-width:0">
          <div class="title">${c.name ?? `${c.tent} \u00b7 ${c.station}`}</div>
          <div class="subtitle" style="display:flex;align-items:center;gap:6px">
            <span class="dot" style="width:7px;height:7px;border-radius:50%;background:${pill.color};box-shadow:0 0 8px ${pill.color}"></span>${pill.label}
            ${wart ? html`<span style="color:${THEME.warn};font-weight:800">\u00b7 Wartung</span>` : nothing}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <button class="gc" title="Wartung (System greift nicht ein)"
            style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;
              background:${wart ? "rgba(255,206,122,.14)" : "var(--card-2,#222F28)"};
              border:1px solid ${wart ? "rgba(255,206,122,.5)" : "var(--gc-line)"};
              color:${wart ? THEME.warn : "rgba(242,247,243,.55)"}"
            @click=${() => this.toggle(this.e("wartung"))}>
            <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:16px"></ha-icon></button>
          ${c.show_settings !== false ? html`<button class="gc" title="Einstellungen"
            style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;
              background:var(--card-2,#222F28);border:1px solid var(--gc-line);color:rgba(242,247,243,.55)"
            @click=${() => { this._open = !this._open; }}>
            <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:16px"></ha-icon></button>` : nothing}
          <button class="gc" style="min-height:40px;padding:0 16px;border-radius:999px;font-size:11.5px;font-weight:900;
              letter-spacing:.5px;
              background:${auto ? "var(--gc-accent)" : "var(--card-2,#222F28)"};
              border:${auto ? "none" : "1px solid var(--gc-line)"};
              color:${auto ? "#0D1812" : "rgba(242,247,243,.5)"};
              box-shadow:${auto ? "0 4px 16px -6px var(--gc-accent)" : "none"}"
            @click=${() => this.confirmToggle(this.e("auto"), "Automatik")}>
            AUTO ${auto ? "AN" : "AUS"}</button>
        </div>
      </div>

      ${this.phaseDropdown(stage, sc)}
      ${this.lightRow()}
      ${this.pumpRow(demo)}
      ${this.dliRow(demo)}
      ${this.actuators()}
      ${this.tankRow()}
      ${this.plantTabs()}

      ${problems.length ? html`<div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:12px">
        ${problems.map(p => html`<span class="pbadge ${p.crit ? "crit" : "warn"}">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${p.label}</span>`)}</div>` : nothing}

      ${(c.show_event !== false && evt) ? html`
        <button class="gc event" @click=${() => this.moreInfo(this.e("event"))}>
          <span class="edot" style="background:${LOG_TX[(evt.attributes?.schweregrad as string)] ?? "rgba(242,247,243,.4)"}"></span>
          <span class="ebody">
            <span class="elbl">Letztes Ereignis</span>
            <span class="etx">${evt.state}</span>
          </span>
          <span style="font:700 10.5px var(--f-num);color:rgba(242,247,243,.4)">
            ${evt.last_changed ? new Date(evt.last_changed).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : ""}</span>
        </button>` : nothing}

      ${this._open ? html`<div class="settings-grid" style="margin-top:10px">
        ${this.setting(this.e("lightOn"), "Licht AN")}
        ${this.setting(this.e("lightOffSv"), "AUS Seed/Veg")}
        ${this.setting(this.e("lightOffBloom"), "AUS Bloom")}
        ${this.setting(this.e("germination"), "Keimstart")}
        ${this.setting(this.e("overrideMin"), "Man. \u00dcbernahme")}
      </div>` : nothing}
      ${this.renderConfirm()}
    </div>`;
  }

  private setting(entity: string, label: string) {
    return html`<button class="gc tile" style="text-align:left;min-width:0" @click=${() => this.moreInfo(entity)}>
      <div class="lbl">${label}</div>
      <div style="font-size:14px;font-weight:800;color:rgba(242,247,243,.85);margin-top:3px">
        ${this.st(entity) ?? "\u2013"}</div></button>`;
  }

  /** Phasen-Dropdown ueber die volle Breite. */
  private phaseDropdown(stage: string, sc: { bg: string; color: string }) {
    const event = this.hass.states[this.e("rec")];
    const recHint = event?.state && event.state !== stage ? event.state : null;
    return html`<div class="dd">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase}
        @click=${() => { this._phase = !this._phase; }}>
        <span class="pdot" style="background:${sc.color};color:${sc.color}"></span>
        ${stage}
        <span class="hint">${STAGE_HINT[stage] ?? ""}${recHint ? " \u00b7 Richtwert " + recHint : ""}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:rgba(242,247,243,.5);
          transition:transform .2s;${this._phase ? "transform:rotate(180deg)" : ""}"></ha-icon>
      </button>
      ${this._phase ? html`<div class="dd-menu" role="listbox">
        ${STAGES.map(s => { const col = STAGE_COLORS[s];
          return html`<button class="gc dd-it" role="option" aria-selected=${s === stage}
            @click=${() => { this._select(this.e("stage"), s); this._phase = false; }}>
            <span class="pdot" style="background:${col.color}"></span>${s}
            <span class="hint">${STAGE_HINT[s] ?? ""}</span></button>`; })}
      </div>` : nothing}
    </div>`;
  }

  /** Generische Versorgungszeile (Licht/Pumpe/DLI/Tank). */
  private supplyRow(o: { icon: string; iconColor: string; glow?: boolean; title: string;
    value: string; valueColor: string; fillPct?: number | null; fillColor?: string;
    footL?: string; footR?: string; minPct?: number; onClick?: () => void }) {
    return html`<button class="gc supply" @click=${o.onClick ?? (() => {})}>
      <span class="shd">
        <span class="sic" style="color:${o.iconColor};${o.glow ? `filter:drop-shadow(0 0 7px ${o.iconColor})` : ""}">
          <ha-icon icon="${o.icon}" style="--mdc-icon-size:20px"></ha-icon></span>
        <span class="stt">${o.title}</span>
        <span class="stm" style="color:${o.valueColor}">${o.value}</span>
      </span>
      ${o.fillPct !== null && o.fillPct !== undefined ? html`
        <span class="sbar"><i style="width:${Math.min(100, Math.max(0, o.fillPct))}%;
          background:linear-gradient(90deg, ${o.fillColor}, ${o.fillColor}cc);
          box-shadow:0 0 9px ${o.fillColor}55"></i>
          ${o.minPct !== undefined ? html`<span class="min" style="left:${o.minPct}%"></span>` : nothing}</span>` : nothing}
      ${o.footL || o.footR ? html`<span class="sft"><span>${o.footL ?? ""}</span><span>${o.footR ?? ""}</span></span>` : nothing}
    </button>`;
  }

  private lightRow() {
    if (this.isPreview)
      return this.supplyRow({ icon: "mdi:lightbulb-on", iconColor: THEME.light, glow: true,
        title: "Licht an", value: "5 h 40 min", valueColor: THEME.light,
        fillPct: 62, fillColor: THEME.light, footL: "Leuchtphase", footR: "62 % verbleibend" });
    const st = this.hass.states[this.e("lightRest")];
    if (!st) return nothing;
    const a = st.attributes ?? {};
    const an = a.zustand ? a.zustand === "an" : undefined;
    const rest = Number(st.state);
    const text = (a.text as string) ?? (isNaN(rest) ? "\u2013" : fmtDur(rest));
    const anteil = typeof a.anteil === "number" ? Math.min(1, Math.max(0, a.anteil)) : null;
    const col = an === false ? "#7E9488" : THEME.light;
    return this.supplyRow({
      icon: an === false ? "mdi:lightbulb-outline" : "mdi:lightbulb-on",
      iconColor: col, glow: an !== false,
      title: an === false ? "Licht aus" : "Licht an", value: text, valueColor: col,
      fillPct: anteil !== null ? anteil * 100 : null, fillColor: col,
      footL: an === false ? "Dunkelphase" : "Leuchtphase",
      footR: anteil !== null ? `${(anteil * 100).toFixed(0)} % verbleibend` : "",
      onClick: () => this.moreInfo(this.e("lightRest")),
    });
  }

  private pumpRow(demo: boolean) {
    const st = this.hass.states[this.e("pumpRest")];
    if (!st && !demo) return nothing;
    if (demo)
      return this.supplyRow({ icon: "mdi:water-pump", iconColor: THEME.water,
        title: "Pumpe aus", value: "in 12 min", valueColor: THEME.water,
        fillPct: 80, fillColor: THEME.water, footL: "N\u00e4chster Zyklus", footR: "80 % der Pause" });
    const rest = Number(st!.state);
    const a = st!.attributes ?? {};
    const anteil = typeof a.anteil === "number" ? Math.min(1, Math.max(0, a.anteil)) : null;
    const an = a.zustand ? a.zustand === "an" : undefined;
    return this.supplyRow({ icon: "mdi:water-pump", iconColor: THEME.water,
      title: an ? "Pumpe l\u00e4uft" : "Pumpe aus", value: isNaN(rest) ? "\u2013" : fmtDur(rest), valueColor: THEME.water,
      fillPct: anteil !== null ? anteil * 100 : null, fillColor: THEME.water,
      footL: (a.text as string) ?? "Zyklus", footR: anteil !== null ? `${(anteil * 100).toFixed(0)} %` : "",
      onClick: () => this.moreInfo(this.e("pumpRest")) });
  }

  private dliRow(demo: boolean) {
    const st = this.hass.states[this.e("dli")];
    if (!st && !demo) return nothing;
    const dli = num(this.st(this.e("dli"))) ?? (demo ? 18.4 : null);
    const fc = num(this.st(this.e("dliFc"))) ?? (demo ? 24.7 : null);
    const target = (st?.attributes?.ziel_aktuelle_phase as number | undefined) ?? (demo ? 25 : undefined);
    const pct = target && dli !== null ? (dli / target) * 100 : null;
    const fcPct = target && fc !== null ? Math.min(100, (fc / target) * 100) : undefined;
    return this.supplyRow({ icon: "mdi:white-balance-sunny", iconColor: THEME.light,
      title: "DLI heute",
      value: dli !== null ? `${dli.toFixed(1)}${target ? ` / ${target}` : ""}` : "\u2013", valueColor: THEME.light,
      fillPct: pct, fillColor: THEME.light, minPct: fcPct,
      footL: fc !== null ? `Prognose ${fc.toFixed(1)} mol/m\u00b2` : "",
      footR: target ? "Marker = Prognose" : "",
      onClick: () => this.moreInfo(this.e("dli")) });
  }

  /** Optionale Aktor-Kacheln (4 nebeneinander) – nur wenn konfiguriert. */
  private actuators() {
    const acts = (this._config as StationConfig).actuators ?? [];
    if (!acts.length) return nothing;
    return html`
      <div class="seclbl">Aktoren</div>
      <div class="acts">
        ${acts.map(a => {
          const on = this.isOn(a.entity);
          const kind = a.kind ?? "";
          const icon = a.icon ?? ACT_ICON[kind] ?? "mdi:power";
          const name = a.name ?? this.friendly(a.entity);
          return html`<button class="gc act ${on ? "on" : ""} ${on && kind ? kind : ""}"
            @click=${() => a.confirm ? this.confirmToggle(a.entity, name) : this.toggle(a.entity)}>
            <span class="aic"><ha-icon icon="${icon}" style="--mdc-icon-size:18px"></ha-icon></span>
            <span class="anm">${name}</span>
            <span class="ast">${on ? "AN" : "AUS"}</span></button>`;
        })}
      </div>`;
  }

  private tankRow() {
    const c = this._config as StationConfig;
    if (!c.tank_entity) return nothing;
    const pct = Math.min(100, Math.max(0, num(this.st(c.tank_entity)) ?? 0));
    const minP = c.tank_min ?? 30;
    const low = pct < minP;
    const col = low ? THEME.crit : THEME.water;
    const vol = c.tank_volume;
    return this.supplyRow({ icon: "mdi:car-coolant-level", iconColor: THEME.water,
      title: "Tank", value: `${pct.toFixed(0)} %`, valueColor: col,
      fillPct: pct, fillColor: col, minPct: minP,
      footL: vol ? `\u2248 ${(pct / 100 * vol).toFixed(0)} l von ${vol} l` : (low ? "Unter Mindeststand" : ""),
      footR: `Min ${minP} %`,
      onClick: () => this.moreInfo(c.tank_entity!) });
  }

  private plantTabs() {
    const plants = (this._config as StationConfig).plants ?? [];
    if (!plants.length) return nothing;
    const i = Math.min(this._tab, plants.length - 1);
    const pl = plants[i];
    const germ = pl.germination_helper ? this.st(pl.germination_helper) : null;
    const age = germ ? daysSince(germ) : null;
    return html`
      <div class="ptabs">
        ${plants.map((pp, pi) => html`<button class="gc ptab" role="tab" aria-selected=${pi === i}
          @click=${() => { this._tab = pi; }}>
          <ha-icon icon="mdi:sprout" style="--mdc-icon-size:15px"></ha-icon>${pp.name}</button>`)}
      </div>
      <div class="plant">
        <div class="phd">
          ${pl.image
            ? html`<img class="pimg" src="${pl.image}"/>`
            : html`<div class="pimg"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:30px"></ha-icon></div>`}
          <div style="flex:1;min-width:0">
            <div class="pname">${pl.name}</div>
            ${pl.strain ? html`<div class="pstrain">${pl.strain}</div>` : nothing}
            ${age !== null ? html`<span class="agechip">${fmtAge(age)}</span>` : nothing}
          </div>
        </div>
        ${this.plantSensors(pl.sensors ?? [])}
        ${pl.tank_entity ? this.plantTankInd(pl.tank_entity, pl.tank_min ?? 30) : nothing}
      </div>`;
  }

  /** Pflanzen-Sensoren als einheitliche .ind-Bloecke: wert | zone | graph. */
  private plantSensors(raw: PlantSensor[]) {
    if (!raw.length) return nothing;
    const sens = raw.map(s => (typeof s === "string" ? { entity: s } as Exclude<PlantSensor, string> : s));
    return html`${sens.map(s => {
      const v = num(this.st(s.entity));
      const label = s.name ?? this.friendly(s.entity);
      const unit = this.unit(s.entity);
      const mode = s.anzeige ?? "wert";
      if (mode === "zone") {
        const ideal = s.ideal ?? [0, 0]; const ok = s.ok ?? ideal;
        const inIdeal = v !== null && v >= ideal[0] && v <= ideal[1];
        const inOk = v !== null && v >= ok[0] && v <= ok[1];
        const col = s.color ?? (inIdeal ? THEME.ok : inOk ? THEME.warn : THEME.crit);
        return html`<button class="gc ind" @click=${() => this.moreInfo(s.entity)}>
          <div class="ihd"><span class="ilbl" style="color:${col}">
            ${s.icon ? html`<ha-icon icon="${s.icon}" style="--mdc-icon-size:14px"></ha-icon>` : nothing}${label}</span>
            <span class="ival" style="color:${col}">${v !== null ? v : "\u2013"}<span class="u">${unit}</span></span></div>
          <div style="margin-top:8px">${zoneBar(v, { min: s.min ?? 0, max: s.max ?? 14,
            okMin: ok[0], okMax: ok[1], idealMin: ideal[0], idealMax: ideal[1] })}</div>
        </button>`;
      }
      if (mode === "graph") {
        const col = s.color ?? THEME.water;
        return html`<button class="gc ind" @click=${() => this.moreInfo(s.entity)}>
          <div class="ihd"><span class="ilbl" style="color:${col}">
            ${s.icon ? html`<ha-icon icon="${s.icon}" style="--mdc-icon-size:14px"></ha-icon>` : nothing}${label}</span>
            <span class="ival" style="color:${col}">${v !== null ? v : "\u2013"}<span class="u">${unit}</span></span></div>
          <div style="margin-top:6px">${sparkline(this._spark[s.entity] ?? [], col, this.chartW(74), 38)}</div>
        </button>`;
      }
      // wert
      const fval = v !== null ? v : (this.st(s.entity) ?? "\u2013");
      return html`<button class="gc ind" @click=${() => this.moreInfo(s.entity)}>
        <div class="ihd"><span class="ilbl" style="color:rgba(242,247,243,.6)">
          ${s.icon ? html`<ha-icon icon="${s.icon}" style="--mdc-icon-size:14px"></ha-icon>` : nothing}${label}</span>
          <span class="ival" style="color:${s.color ?? "rgba(242,247,243,.95)"}">${fval}<span class="u">${unit}</span></span></div>
      </button>`;
    })}`;
  }

  private plantTankInd(entity: string, minP: number) {
    const pct = Math.min(100, Math.max(0, num(this.st(entity)) ?? 0));
    const low = pct < minP;
    const col = low ? THEME.crit : THEME.water;
    return html`<button class="gc ind" @click=${() => this.moreInfo(entity)}>
      <div class="ihd"><span class="ilbl" style="color:${THEME.water}">
        <ha-icon icon="mdi:car-coolant-level" style="--mdc-icon-size:14px"></ha-icon>Tank</span>
        <span class="ival" style="color:${col}">${pct.toFixed(0)}<span class="u"> %</span></span></div>
      <div class="sbar" style="margin-top:8px;height:10px;border-radius:6px;background:#0D1410;overflow:hidden;position:relative">
        <i style="display:block;height:100%;width:${pct}%;border-radius:6px;
          background:linear-gradient(90deg, ${col}, ${col}cc);box-shadow:0 0 8px ${col}55"></i>
        <span style="position:absolute;top:-1px;bottom:-1px;left:${minP}%;width:2.5px;background:rgba(255,255,255,.45)"></span></div>
    </button>`;
  }
}
customElements.define("growctrl-station-card", GrowctrlStationCard);

/*==============================================================================
 * GROWCTRL – growctrl-station-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Stations-Karte "Soft Garden" v6 (integrations-nativ): Kopf mit
 *           Wartung/Einstellungen/AUTO, Phasen-Dropdown (volle Breite), Versorgungs-
 *           zeilen Licht/Pumpe/DLI/Tank (.supply + .bar), optionale Aktoren (.acts),
 *           Pflanzen-Tabs mit Werten (Spark / v6-Zonen / setzbare Stepper), Ereignis,
 *           Diagnose-Badges, Einstellungen. Entity-IDs aus tent+station (overrides ok).
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, STAGE_COLORS, pillClass,
  cardVars, type StyleConfig, num,
  stEnt, ST, type GcOverrides, gcResolve,
  fmtDur, fmtAge, daysSince, sparkline, fetchHistory,
} from "../core/index";

type PlantSensor = string | { entity: string; name?: string;
  anzeige?: "wert" | "zone" | "graph"; icon?: string; color?: string;
  min?: number; max?: number; ok?: [number, number]; ideal?: [number, number];
  hours?: number; step?: number };

interface StationActuator { entity: string; name?: string; icon?: string;
  confirm?: boolean; kind?: "light" | "heat" | "water" }

const STAGES = ["Seedling", "Veg", "Bloom", "Flush", "Trocknung"];
const STAGE_HINT: Record<string, string> = {
  Seedling: "Anzucht", Veg: "Wachstum", Bloom: "Bl\u00fcte", Flush: "Sp\u00fclen", Trocknung: "Ernte",
};
const STAGE_PD: Record<string, string> = {
  Seedling: "pd-seed", Veg: "pd-veg", Bloom: "pd-bloom", Flush: "pd-flush", Trocknung: "pd-dry",
};
const ACT_ICON: Record<string, string> = {
  light: "mdi:lightbulb", heat: "mdi:radiator", water: "mdi:air-humidifier",
  pump: "mdi:water-pump", fan: "mdi:fan", o2: "mdi:scuba-tank",
};

interface PlantCfg {
  name: string; strain?: string; germination_helper?: string;
  image?: string; sensors?: PlantSensor[];
  temp_entity?: string; humidity_entity?: string;
  ph_entity?: string; ph_ok?: [number, number]; ph_ideal?: [number, number];
  ec_entity?: string; ec_ok?: [number, number]; ec_ideal?: [number, number];
  tank_entity?: string; tank_min?: number;
}

interface StationConfig {
  age_format?: "auto" | "tage" | "wochen"; show_event?: boolean;
  tank_entity?: string; tank_min?: number; tank_volume?: number;
  actuators?: StationActuator[]; plants?: PlantCfg[];
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
    const graphs = (c?.plants ?? []).flatMap(pl => this.sensorsFor(pl).filter(s => s.anzeige === "graph"));
    graphs.forEach(async g => {
      const data = await fetchHistory(this.hass, g.entity, g.hours ?? 24);
      if (data.length && this._spark[g.entity]?.length !== data.length) this._spark = { ...this._spark, [g.entity]: data };
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
    return c.overrides?.[suffix] ?? gcResolve(this.hass, c.tent, c.station, role) ?? stEnt(domain, c.tent, c.station, suffix, c.overrides);
  }
  private _select(entity: string, option: string) { this.hass.callService("select", "select_option", { entity_id: entity, option }); }

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
    const statusLabel = wart ? "Wartung aktiv" : sev === "critical" ? "Kritisch" : sev === "warning" ? "Warnung" : "Alles OK";

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${sev} style="${cardVars(c.style)};position:relative">

      <div class="hd">
        <div class="grow" style="min-width:0">
          <div class="ttl">${c.name ?? `${c.tent} \u00b7 ${c.station}`}</div>
          <div class="sub" style="display:flex;align-items:center;gap:7px">
            <span style="width:7px;height:7px;border-radius:50%;flex-shrink:0;
              background:${sev === "critical" ? THEME.crit : sev === "warning" ? THEME.warn : THEME.ok};
              box-shadow:0 0 8px currentColor;color:${sev === "critical" ? THEME.crit : sev === "warning" ? THEME.warn : THEME.ok}"></span>
            ${statusLabel}
          </div>
        </div>
        <button class="gc icbtn ${wart ? "on" : ""}" title="Wartung (System greift nicht ein)"
          @click=${() => this.toggle(this.e("wartung"))}>
          <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:16px"></ha-icon></button>
        ${c.show_settings !== false ? html`<button class="gc icbtn" title="Einstellungen" @click=${() => { this._open = !this._open; }}>
          <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:16px"></ha-icon></button>` : nothing}
        <button class="gc chip-auto ${auto ? "" : "off"}" @click=${() => this.confirmToggle(this.e("auto"), "Automatik")}>
          AUTO ${auto ? "AN" : "AUS"}</button>
      </div>

      <div style="margin-bottom:10px">${this.phaseDropdown(stage, sc)}</div>
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
        <button class="gc event" style="margin-top:14px" @click=${() => this.moreInfo(this.e("event"))}>
          <span class="edot" style="background:${evt.attributes?.schweregrad === "critical" ? THEME.crit : evt.attributes?.schweregrad === "warning" ? THEME.warn : THEME.info}"></span>
          <span class="etx">${evt.state}</span>
          <span class="etm">${evt.last_changed ? new Date(evt.last_changed).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : ""}</span>
        </button>` : nothing}

      ${this._open ? html`<div class="settings-grid" style="margin-top:12px">
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
    return html`<button class="gc skv" @click=${() => this.moreInfo(entity)}>
      <div class="k">${label}</div><div class="vv">${this.st(entity) ?? "\u2013"}</div></button>`;
  }

  /** Phasen-Dropdown volle Breite. */
  private phaseDropdown(stage: string, sc: { bg: string; color: string }) {
    const event = this.hass.states[this.e("rec")];
    const recHint = event?.state && event.state !== stage ? event.state : null;
    return html`<div class="dd ${this._phase ? "open" : ""}">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase} @click=${() => { this._phase = !this._phase; }}>
        <span class="pdot" style="background:${sc.color};color:${sc.color}"></span>${stage}
        <span class="hint">${STAGE_HINT[stage] ?? ""}${recHint ? " \u00b7 Richtwert " + recHint : ""}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:var(--tx-3);transition:transform .2s;${this._phase ? "transform:rotate(180deg)" : ""}"></ha-icon>
      </button>
      ${this._phase ? html`<div class="dd-menu" role="listbox">
        ${STAGES.map(s => html`<button class="gc dd-it" role="option" aria-selected=${s === stage}
          @click=${() => { this._select(this.e("stage"), s); this._phase = false; }}>
          <span class="pdot ${STAGE_PD[s]}"></span>${s}<span class="hint">${STAGE_HINT[s] ?? ""}</span></button>`)}
      </div>` : nothing}
    </div>`;
  }

  /** Versorgungszeile (.supply + .bar). */
  private supplyRow(o: { icon: string; iconColor: string; glow?: boolean; title: string;
    value: string; valueColor: string; fillPct?: number | null; fillColor?: string;
    footL?: string; footR?: string; minPct?: number; topMargin?: boolean; onClick?: () => void }) {
    return html`<button class="gc supply" style="${o.topMargin ? "margin-top:8px" : ""}" @click=${o.onClick ?? (() => {})}>
      <span class="shd">
        <span class="sic" style="color:${o.iconColor};${o.glow ? `filter:drop-shadow(0 0 7px ${o.iconColor})` : ""}">
          <ha-icon icon="${o.icon}" style="--mdc-icon-size:20px"></ha-icon></span>
        <span class="stt">${o.title}</span>
        <span class="stm" style="color:${o.valueColor}">${o.value}</span>
      </span>
      ${o.fillPct !== null && o.fillPct !== undefined ? html`
        <span class="bar"><i style="width:${Math.min(100, Math.max(0, o.fillPct))}%;
          background:linear-gradient(90deg, ${o.fillColor}, ${o.fillColor}cc);box-shadow:0 0 9px ${o.fillColor}55"></i>
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
    const dur = isNaN(rest) ? "\u2013" : fmtDur(rest);
    const anteil = typeof a.anteil === "number" ? Math.min(1, Math.max(0, a.anteil)) : null;
    const col = an === false ? "#7E9488" : THEME.light;
    return this.supplyRow({
      icon: an === false ? "mdi:lightbulb-outline" : "mdi:lightbulb-on", iconColor: col, glow: an !== false,
      title: an === false ? "Licht aus" : "Licht an",
      value: an === false ? "\u2013" : dur, valueColor: col,
      fillPct: an === false ? null : (anteil !== null ? anteil * 100 : null), fillColor: col,
      footL: an === false ? "Licht ausgeschaltet" : "Leuchtphase",
      footR: an === false ? "" : (anteil !== null ? `${(anteil * 100).toFixed(0)} % verbleibend` : ""),
      onClick: () => this.moreInfo(this.e("lightRest")),
    });
  }

  private pumpRow(demo: boolean) {
    const st = this.hass.states[this.e("pumpRest")];
    if (!st && !demo) return nothing;
    if (demo)
      return this.supplyRow({ icon: "mdi:water-pump", iconColor: THEME.water, topMargin: true,
        title: "Pumpe aus", value: "in 12 min", valueColor: THEME.water,
        fillPct: 80, fillColor: THEME.water, footL: "N\u00e4chster Zyklus", footR: "80 % der Pause" });
    const rest = Number(st!.state);
    const a = st!.attributes ?? {};
    const anteil = typeof a.anteil === "number" ? Math.min(1, Math.max(0, a.anteil)) : null;
    const an = a.zustand ? a.zustand === "an" : undefined;
    return this.supplyRow({ icon: "mdi:water-pump", iconColor: THEME.water, topMargin: true,
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
    return this.supplyRow({ icon: "mdi:white-balance-sunny", iconColor: THEME.light, topMargin: true,
      title: "DLI heute",
      value: dli !== null ? `${dli.toFixed(1)}${target ? ` / ${target}` : ""}` : "\u2013", valueColor: THEME.light,
      fillPct: pct, fillColor: THEME.light, minPct: fcPct,
      footL: fc !== null ? `Prognose ${fc.toFixed(1)} mol/m\u00b2` : "",
      footR: target ? "Marker = Prognose" : "",
      onClick: () => this.moreInfo(this.e("dli")) });
  }

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
            <ha-icon class="aic" icon="${icon}" style="--mdc-icon-size:18px"></ha-icon>
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
    return this.supplyRow({ icon: "mdi:car-coolant-level", iconColor: THEME.water, topMargin: true,
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
      <div class="ptabs" style="margin-top:14px">
        ${plants.map((pp, pi) => html`<button class="gc ptab" role="tab" aria-selected=${pi === i} @click=${() => { this._tab = pi; }}>
          <ha-icon icon="mdi:sprout" style="--mdc-icon-size:15px"></ha-icon>${pp.name}</button>`)}
      </div>
      <div class="plant">
        <div class="phd">
          ${pl.image ? html`<img class="pimg" src="${pl.image}"/>`
            : html`<div class="pimg"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:28px"></ha-icon></div>`}
          <div style="flex:1;min-width:0">
            <div class="pname">${pl.name}${pl.strain ? html`<span class="pstrain" style="display:inline;margin:0 0 0 7px">\u00b7 ${pl.strain}</span>` : nothing}</div>
            ${age !== null ? html`<span class="agechip">${fmtAge(age)}</span>` : nothing}
          </div>
        </div>
        ${this.plantSensors(this.sensorsFor(pl))}
        ${pl.tank_entity ? this.plantTankInd(pl.tank_entity, pl.tank_min ?? 30) : nothing}
      </div>`;
  }

  private sensorsFor(pl: PlantCfg): Exclude<PlantSensor, string>[] {
    const d: Exclude<PlantSensor, string>[] = [];
    if (pl.temp_entity) d.push({ entity: pl.temp_entity, name: "Temperatur", anzeige: "graph", color: THEME.temp, icon: "mdi:thermometer", hours: 24 });
    if (pl.humidity_entity) d.push({ entity: pl.humidity_entity, name: "Feuchtigkeit", anzeige: "graph", color: THEME.water, icon: "mdi:water-percent", hours: 24 });
    if (pl.ph_entity) d.push({ entity: pl.ph_entity, name: "pH", anzeige: "zone", min: 4, max: 8, ok: pl.ph_ok ?? [5.5, 6.5], ideal: pl.ph_ideal ?? [5.8, 6.3] });
    if (pl.ec_entity) d.push({ entity: pl.ec_entity, name: "EC", anzeige: "zone", min: 0, max: 3, ok: pl.ec_ok ?? [1.0, 2.4], ideal: pl.ec_ideal ?? [1.2, 2.2] });
    const extra = (pl.sensors ?? []).map(s => (typeof s === "string" ? { entity: s } as Exclude<PlantSensor, string> : s));
    return [...d, ...extra];
  }

  private plantSensors(sens: Exclude<PlantSensor, string>[]) {
    if (!sens.length) return nothing;
    return html`${sens.map(s => this.sensorInd(s))}`;
  }

  /** v6-Zonenbalken (pH/EC) als .zones + .zlbl. */
  private zoneV6(v: number | null, min: number, max: number, ok: [number, number], ideal: [number, number], unit: string) {
    const span = max - min || 1;
    const pc = (a: number, b: number) => Math.max(0, ((Math.min(b, max) - Math.max(a, min)) / span) * 100);
    const segs = [
      { cls: "z-bad", w: pc(min, ok[0]) }, { cls: "z-low", w: pc(ok[0], ideal[0]) },
      { cls: "z-ok", w: pc(ideal[0], ideal[1]) }, { cls: "z-high", w: pc(ideal[1], ok[1]) },
      { cls: "z-bad", w: pc(ok[1], max) },
    ];
    const markPct = v !== null ? Math.min(100, Math.max(0, ((v - min) / span) * 100)) : null;
    return html`
      <span class="zones">
        ${segs.map(s => html`<i class="${s.cls}" style="width:${s.w}%"></i>`)}
        ${markPct !== null ? html`<span class="zmark" style="left:${markPct}%"></span>` : nothing}
      </span>
      <span class="zlbl">
        <span style="width:30%;text-align:left">${min}</span>
        <span style="width:40%;color:#4CB87E;font-weight:800">${ideal[0]}\u2013${ideal[1]} ideal</span>
        <span style="width:30%;text-align:right">${max}</span>
      </span>`;
  }

  private sensorInd(s: Exclude<PlantSensor, string>) {
    const v = num(this.st(s.entity));
    const label = s.name ?? this.friendly(s.entity);
    const unit = this.unit(s.entity);
    const mode = s.anzeige ?? "wert";
    const dom = s.entity.split(".")[0];
    const settable = dom === "number" || dom === "input_number";
    const att = this.hass.states[s.entity]?.attributes ?? {};
    const step = s.step ?? (Number(att.step) || 0.1);
    const lo = att.min as number | undefined, hi = att.max as number | undefined;
    const dec = (String(step).split(".")[1] ?? "").length || 1;
    const setV = (nv: number) => {
      let x = nv; if (lo !== undefined) x = Math.max(lo, x); if (hi !== undefined) x = Math.min(hi, x);
      this.hass.callService(dom, "set_value", { entity_id: s.entity, value: Number(x.toFixed(dec)) });
    };

    let col: string;
    const ideal = s.ideal ?? [0, 0]; const ok = s.ok ?? ideal;
    if (mode === "zone") {
      const inIdeal = v !== null && v >= ideal[0] && v <= ideal[1];
      const inOk = v !== null && v >= ok[0] && v <= ok[1];
      col = s.color ?? (inIdeal ? THEME.ok : inOk ? THEME.warn : THEME.crit);
    } else if (mode === "graph") { col = s.color ?? THEME.water; }
    else { col = s.color ?? "rgba(242,247,243,.95)"; }

    const head = html`<div class="ihd">
      <span class="ilbl" style="color:${mode === "wert" ? "var(--tx-2)" : col};cursor:pointer" @click=${() => this.moreInfo(s.entity)}>
        ${s.icon ? html`<ha-icon icon="${s.icon}" style="--mdc-icon-size:14px"></ha-icon>` : nothing}${label}
        ${settable ? html`<ha-icon icon="mdi:pencil" style="--mdc-icon-size:11px;opacity:.45;margin-left:3px"></ha-icon>` : nothing}
      </span>
      ${settable
        ? html`<span class="setrow">
            <button class="gc stepbtn" title="weniger" @click=${() => v !== null && setV(v - step)}><ha-icon icon="mdi:minus" style="--mdc-icon-size:16px"></ha-icon></button>
            <span class="setval" style="color:${col}">${v !== null ? v : "\u2013"}<span class="u">${unit}</span></span>
            <button class="gc stepbtn" title="mehr" @click=${() => setV((v ?? lo ?? 0) + step)}><ha-icon icon="mdi:plus" style="--mdc-icon-size:16px"></ha-icon></button></span>`
        : html`<span class="ival" style="color:${col};cursor:pointer" @click=${() => this.moreInfo(s.entity)}>
            ${v !== null ? v : (this.st(s.entity) ?? "\u2013")}<span class="u">${unit}</span></span>`}
    </div>`;

    const body = mode === "zone"
      ? this.zoneV6(v, s.min ?? 0, s.max ?? 14, ok, ideal, unit)
      : mode === "graph"
        ? html`<div class="spark">${sparkline(this._spark[s.entity] ?? [], col, this.chartW(74), 38)}</div>`
        : nothing;

    return html`<div class="ind">${head}${body}</div>`;
  }

  private plantTankInd(entity: string, minP: number) {
    const pct = Math.min(100, Math.max(0, num(this.st(entity)) ?? 0));
    const low = pct < minP;
    const col = low ? THEME.crit : THEME.water;
    return html`<button class="gc ind" @click=${() => this.moreInfo(entity)}>
      <div class="ihd"><span class="ilbl" style="color:${THEME.water}">
        <ha-icon icon="mdi:car-coolant-level" style="--mdc-icon-size:14px"></ha-icon>Tank</span>
        <span class="ival" style="color:${col}">${pct.toFixed(0)}<span class="u"> %</span></span></div>
      <span class="bar" style="margin-top:8px"><i style="width:${pct}%;background:linear-gradient(90deg, ${col}, ${col}cc);box-shadow:0 0 9px ${col}55"></i>
        <span class="min" style="left:${minP}%"></span></span>
    </button>`;
  }
}
customElements.define("growctrl-station-card", GrowctrlStationCard);

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
  fmtDur, fmtAge, daysSince, sparkline, zoneBar, fetchHistory,
} from "../core/index";

/** Pflanzen-Sensor: einfacher Entity-String ODER konfigurierte Anzeige.
 *  anzeige "zone": pH/EC-Balken schlecht|akzeptiert|IDEAL|akzeptiert|schlecht.
 *  anzeige "graph": Mini-Verlauf (Sparkline), z.B. Temperatur. */
type PlantSensor = string | { entity: string; name?: string;
  anzeige?: "wert" | "zone" | "graph";
  min?: number; max?: number; ok?: [number, number]; ideal?: [number, number];
  hours?: number };

const STAGES = ["Seedling", "Veg", "Bloom", "Flush", "Trocknung"];

interface StationConfig {
  age_format?: "auto" | "tage" | "wochen";
  show_event?: boolean;     // Ereignisfeld am Kartenfuss (Standard AN)
  tank_entity?: string;     // Stations-Tank: Fuellstand % als eigene Zeile
  tank_min?: number; tank_volume?: number;
  plants?: Array<{ name: string; strain?: string; germination_helper?: string;
    sensors?: PlantSensor[]; image?: string;
    tank_entity?: string; tank_min?: number }>;   // Pflanzen-Tabs inkl. Tank je Pflanze
  type: string; tent: string; station: string; name?: string;
  show_settings?: boolean; overrides?: GcOverrides; style?: StyleConfig;
}

export class GrowctrlStationCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _open: { state: true }, _tab: { state: true }, _spark: { state: true } };
  private _open = false;
  private _tab = 0;
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
    const hasPump = !!this.hass.states[this.e("pumpRest")] || demo;
    const hasDli = !!this.hass.states[this.e("dli")] || demo;
    const kpiCount = (hasPump ? 1 : 0) + (hasDli ? 1 : 0);

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
      </div>` : nothing}

      ${this.tankRow()}

      ${this.plantTabs()}

      ${problems.length ? html`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">
        ${problems.map(p => html`<span class="badge warn">\u26A0 ${p.label}</span>`)}</div>` : nothing}

      ${(this._config as StationConfig).show_event !== false && evt ? html`
        <button class="gc" style="width:100%;margin-top:10px;text-align:left;display:flex;
            align-items:center;gap:10px;padding:10px 12px;border-radius:12px;
            background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)"
          @click=${() => this.moreInfo(this.e("event"))}>
          <ha-icon icon="mdi:history" style="--mdc-icon-size:17px;flex-shrink:0;
            color:${LOG_TX[(evt.attributes?.schweregrad as string)] ?? "rgba(255,255,255,.45)"}"></ha-icon>
          <span style="flex:1;min-width:0">
            <span style="display:block;font-size:9.5px;text-transform:uppercase;letter-spacing:.8px;
              color:rgba(255,255,255,.45);font-weight:700">Letztes Ereignis</span>
            <span style="display:block;font-size:12.5px;color:rgba(255,255,255,.82);font-weight:600;
              overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${evt.state}</span>
          </span>
          <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size:16px;color:rgba(255,255,255,.3)"></ha-icon>
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
      <div class="tile" style="margin-top:8px;padding:14px;
          background:linear-gradient(145deg, rgba(77,255,195,.07), rgba(0,0,0,.22))">
        <div style="display:flex;align-items:center;gap:14px">
          ${pl.image ? html`<img src="${pl.image}" style="width:64px;height:64px;border-radius:16px;
              object-fit:cover;border:1.5px solid rgba(77,255,195,.35);flex-shrink:0"/>`
          : html`<div style="width:64px;height:64px;border-radius:16px;flex-shrink:0;
              display:flex;align-items:center;justify-content:center;
              background:linear-gradient(135deg, rgba(77,255,195,.22), rgba(52,209,123,.08));
              border:1.5px solid rgba(77,255,195,.3)">
              <ha-icon icon="mdi:sprout" style="--mdc-icon-size:32px;color:#4DFFC3"></ha-icon></div>`}
          <div style="flex:1;min-width:0">
            <div style="font-size:16.5px;font-weight:800;letter-spacing:-.2px">${pl.name}</div>
            ${pl.strain ? html`<div style="font-size:12px;color:rgba(255,255,255,.65);margin-top:1px">${pl.strain}</div>` : nothing}
            ${age !== null ? html`<span style="display:inline-block;margin-top:5px;padding:3px 10px;
                border-radius:8px;font-size:11.5px;font-weight:800;color:#4DFFC3;
                background:rgba(77,255,195,.12);border:1px solid rgba(77,255,195,.3)">${fmtAge(age)}</span>` : nothing}
          </div>
        </div>
        ${this.plantSensors(pl.sensors ?? [])}
        ${pl.tank_entity ? this.tankBar(pl.tank_entity, pl.tank_min ?? 30) : nothing}
      </div>`;
  }

  /** Pflanzen-Sensoren: einfache Kacheln + volle Zeilen fuer Zone (pH/EC) und Graph. */
  private plantSensors(raw: PlantSensor[]) {
    if (!raw.length) return nothing;
    const sens = raw.map(s => (typeof s === "string" ? { entity: s } as Exclude<PlantSensor, string> : s));
    const tiles = sens.filter(s => !s.anzeige || s.anzeige === "wert");
    const wide = sens.filter(s => s.anzeige === "zone" || s.anzeige === "graph");
    const fval = (e: string) => {
      const v = num(this.st(e));
      return v !== null ? v : (this.st(e) ?? "\u2013");
    };
    return html`
      ${tiles.length ? html`<div class="kpis cols-${Math.min(3, Math.max(2, tiles.length))}" style="margin-top:12px">
        ${tiles.map(s => html`<button class="gc tile" style="background:rgba(0,0,0,.22);text-align:center"
            @click=${() => this.moreInfo(s.entity)}>
          <div class="lbl">${s.name ?? this.friendly(s.entity)}</div>
          <div style="font-size:22px;font-weight:800;letter-spacing:-.4px;margin-top:2px">
            ${fval(s.entity)}<span class="unit">${this.unit(s.entity)}</span></div>
        </button>`)}
      </div>` : nothing}
      ${wide.map(s => {
        const v = num(this.st(s.entity));
        const ideal = s.ideal ?? [0, 0]; const ok = s.ok ?? ideal;
        const inIdeal = v !== null && v >= ideal[0] && v <= ideal[1];
        const inOk = v !== null && v >= ok[0] && v <= ok[1];
        const col = s.anzeige === "zone" ? (inIdeal ? "#34D17B" : inOk ? "#FFB35C" : "#FF6B6B") : "#5BC8EF";
        return html`<button class="gc tile" style="background:rgba(0,0,0,.22);width:100%;margin-top:10px;text-align:left"
            @click=${() => this.moreInfo(s.entity)}>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:7px">
            <span class="lbl">${s.name ?? this.friendly(s.entity)}</span>
            <span style="font-size:19px;font-weight:800;color:${col}">
              ${v !== null ? v : "\u2013"}<span class="unit">${this.unit(s.entity)}</span></span>
          </div>
          ${s.anzeige === "zone"
            ? zoneBar(v, { min: s.min ?? 0, max: s.max ?? 14,
                okMin: ok[0], okMax: ok[1], idealMin: ideal[0], idealMax: ideal[1] })
            : sparkline(this._spark[s.entity] ?? [], col, this.chartW(74))}
        </button>`;
      })}`;
  }

  /** Stations-Tank als eigene Zeile (Fuellstand + Liter, Mindeststand-Marke). */
  private tankRow() {
    const c = this._config as StationConfig;
    if (!c.tank_entity) return nothing;
    const pct = Math.min(100, Math.max(0, num(this.st(c.tank_entity)) ?? 0));
    const vol = c.tank_volume;
    return html`<div class="tile" style="margin-top:10px">
      <div style="display:flex;align-items:center;gap:10px">
        <ha-icon icon="mdi:water" style="--mdc-icon-size:22px;color:#5BC8EF;flex-shrink:0"></ha-icon>
        <div style="flex:1;min-width:0">${this.tankBar(c.tank_entity, c.tank_min ?? 30)}</div>
      </div>
      ${vol ? html`<div style="font-size:10.5px;color:rgba(255,255,255,.55);margin-top:4px;margin-left:32px">
        \u2248 ${(pct / 100 * vol).toFixed(1)} l von ${vol} l</div>` : nothing}
    </div>`;
  }

  /** Fuellstands-Balken (rot + NACHFUELLEN unter Mindeststand) - Station & Pflanze. */
  private tankBar(entity: string, minP: number) {
    const pct = Math.min(100, Math.max(0, num(this.st(entity)) ?? 0));
    const low = pct < minP;
    const col = low ? "#FF6B6B" : "#5BC8EF";
    return html`<div style="margin-top:2px">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <span class="lbl">Tank</span>
        <span style="font-size:14px;font-weight:800;color:${col}">${pct.toFixed(0)} %
          ${low ? html`<span style="font-size:10.5px;font-weight:800;color:#FF6B6B"> \u00b7 NACHF\u00dcLLEN</span>` : nothing}</span>
      </div>
      <div style="height:9px;border-radius:5px;background:rgba(255,255,255,.08);margin-top:5px;overflow:hidden;position:relative">
        <div style="height:100%;width:${pct}%;border-radius:5px;transition:width .6s;
          background:linear-gradient(90deg, ${col}, ${col}cc);box-shadow:0 0 8px ${col}55"></div>
        <div style="position:absolute;top:-1px;bottom:-1px;left:${minP}%;width:2px;background:rgba(255,255,255,.45)"></div>
      </div>
    </div>`;
  }
}
customElements.define("growctrl-station-card", GrowctrlStationCard);

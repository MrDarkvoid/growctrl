/*==============================================================================
 * GROWCTRL – growctrl-hero-card
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Hero ueber allem (integrations-nativ): Logo, Zelt/Klima-Schalter, Klima-KPIs + VPD-Chart aus dem Zelt-VPD-Sensor, Informationssystem = Zelt-Status + Ereignis-/Problemlage aller Stationen.
 * Version : 2.4.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import "./editor";
import {
  GrowctrlBaseCard, sharedStyles, THEME, LOG_BG, LOG_TX, STATUS_PILL,
  cardVars, worstLevel, type StyleConfig, num, fetchHistory, lineChart,
  stEnt, tentEnt, TENT, ST, type GcOverrides,
  gcResolve,
} from "../core/index";

interface HeroStation { station: string; name?: string; }
interface HeroConfig {
  type: string; tent: string; title?: string; logo?: string;
  stations?: HeroStation[];
  hours?: number; show_chart?: boolean;
  overrides?: GcOverrides; style?: StyleConfig;
}

export class GrowctrlHeroCard extends GrowctrlBaseCard {
  static styles = sharedStyles;
  static properties = { ...GrowctrlBaseCard.properties, _hist: { state: true }, _logoErr: { state: true } };
  private _logoErr = false;
  private _hist: number[] = [];
  private _timer?: number;

  protected validateConfig(c: HeroConfig) {
    if (!c.tent) throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).");
  }
  static getConfigElement() { return document.createElement("growctrl-hero-editor"); }
  static getStubConfig() { return { tent: "gross", stations: [{ station: "main1" }] }; }

  private te(key: keyof typeof TENT): string {
    const [domain, suffix, role] = TENT[key];
    const c = this._config as HeroConfig;
    // 1) explizite overrides  2) Attribut-Registry (umbenennungssicher)  3) abgeleitete ID
    return c.overrides?.[suffix]
      ?? gcResolve(this.hass, c.tent, "zelt", role)
      ?? tentEnt(domain, c.tent, suffix, c.overrides);
  }
  connectedCallback() {
    super.connectedCallback();
    this._load();
    this._timer = window.setInterval(() => this._load(), 5 * 60_000);
  }
  disconnectedCallback() { super.disconnectedCallback(); if (this._timer) clearInterval(this._timer); }
  private async _load() {
    if (!this.hass) { setTimeout(() => this._load(), 1000); return; }
    this._hist = await fetchHistory(this.hass, this.te("vpd"), (this._config as HeroConfig).hours ?? 24);
  }

  render() {
    const c = this._config as HeroConfig;
    if (!this.hass) return nothing;
    const vpdSt = this.hass.states[this.te("vpd")];
    const demo = !vpdSt && !this.hass.states[this.te("enabled")];
    const v = num(vpdSt?.state) ?? (demo ? 1.06 : null);
    const t = (vpdSt?.attributes?.temp as number | null) ?? (demo ? 22.4 : null);
    const h = (vpdSt?.attributes?.rh as number | null) ?? (demo ? 52 : null);
    const phaseEff = (vpdSt?.attributes?.phase_effektiv as string) ?? "";
    const targets = vpdSt?.attributes?.sollwerte as { vpd_min: number; vpd_max: number } | undefined;
    const enabled = this.isOn(this.te("enabled")) || demo;
    const climate = this.isOn(this.te("climate"));
    const statusSt = this.hass.states[this.te("status")];
    const tentProblems = (statusSt?.attributes?.probleme as string[]) ?? [];

    // ── Informationssystem: Zelt-Probleme + Stations-Ereignislage ──
    const stations = (c.stations ?? []).map(s => {
      const evt = this.hass.states[
        gcResolve(this.hass, c.tent, s.station, "last_event")
        ?? stEnt("sensor", c.tent, s.station, "letztes_ereignis", c.overrides)];
      const sev = (evt?.attributes?.schweregrad as string) ?? "ok";
      return { name: s.name ?? s.station, text: evt?.state ?? "\u2013", level: sev };
    });
    // Nur echte Warnungen/Fehler zaehlen - "Licht AN" (info) ist KEINE Warnung
    const isWarn = (l: string) => l === "warning" || l === "critical";
    const level = worstLevel([
      (statusSt?.state ?? "").toLowerCase() === "problem" ? "warning" : "ok",
      ...stations.map(s => (isWarn(s.level) ? s.level : "ok")),
    ]);
    const pill = STATUS_PILL[level] ?? STATUS_PILL.ok;
    const problems = [
      ...tentProblems.map(p => ({ label: p, level: "warning" })),
      ...stations.filter(s => isWarn(s.level)).map(s => ({ label: `${s.name}: ${s.text}`, level: s.level })),
    ];

    const bigToggle = (entity: string, label: string, on: boolean, icon: string) => html`
      <button class="gc" style="display:flex;align-items:center;gap:8px;padding:8px 15px;border-radius:14px;
          transition:all .18s;
          background:${on ? "rgba(77,255,195,.12)" : "rgba(255,255,255,.05)"};
          border:1.5px solid ${on ? THEME.ok : "rgba(255,255,255,.12)"};
          color:${on ? THEME.ok : "rgba(255,255,255,.5)"}"
        @click=${() => this.confirmToggle(entity, label)}>
        <ha-icon .icon=${icon} style="--mdc-icon-size:16px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${label} ${on ? "AN" : "AUS"}</span>
      </button>`;

    return html`<div class="card ${c.style?.glass ? "glass" : ""}" data-level=${level}
        style="${cardVars(c.style)};position:relative">
      <div class="hdr">
        <div style="display:flex;align-items:center;gap:11px">
          ${c.logo && !this._logoErr ? html`<img src=${c.logo} alt="Logo"
            @error=${() => { this._logoErr = true; }}
            style="width:42px;height:42px;border-radius:11px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px" />`
          : html`<div style="width:42px;height:42px;border-radius:11px;flex-shrink:0;
              display:flex;align-items:center;justify-content:center;
              background:linear-gradient(135deg, rgba(77,255,195,.25), rgba(52,209,123,.12));
              border:1px solid rgba(77,255,195,.35)">
              <ha-icon icon="mdi:sprout" style="--mdc-icon-size:24px;color:#4DFFC3"></ha-icon>
            </div>`}
          <div>
            <div class="title">${c.title ?? `GROWCTRL \u00b7 ${c.tent}`}</div>
            ${phaseEff ? html`<div class="subtitle">Klima-Phase ${phaseEff}</div>` : nothing}
          </div>
        </div>
        <span class="status-pill" style="background:${pill.bg};color:${pill.color}">
          <span class="dot" style="background:${pill.color}"></span>${pill.label}</span>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:13px">
        ${bigToggle(this.te("enabled"), "Zelt", enabled, "mdi:power")}
        ${bigToggle(this.te("climate"), "Klima", climate, "mdi:thermostat")}
      </div>

      <div class="kpis cols-3" style="margin-top:12px">
        <div class="tile" style="text-align:center"><div class="lbl">Temperatur</div>
          <div class="val" style="font-size:22px">${t != null ? Number(t).toFixed(1) : "\u2013"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">Luftfeuchte</div>
          <div class="val" style="font-size:22px">${h != null ? Math.round(Number(h)) : "\u2013"}<span class="unit">%</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">VPD</div>
          <div class="val" style="font-size:22px;color:${v !== null && targets && v >= targets.vpd_min && v <= targets.vpd_max ? THEME.ok : "#FFD166"}">${v !== null ? v.toFixed(2) : "\u2013"}<span class="unit">kPa</span></div></div>
      </div>

      ${this.vpdZoneBar(v, targets ?? null)}

      ${c.show_chart === true && this._hist.length > 1 ? html`
        <div class="seclbl">VPD \u00b7 ${c.hours ?? 24}h</div>
        ${lineChart([{ data: this._hist, color: THEME.ok }],
          { w: this.chartW(), h: 100, band: targets ? { min: targets.vpd_min, max: targets.vpd_max } : undefined, grid: 3 })}` : nothing}

      ${stations.length ? html`<div class="seclbl">Stationen</div>
        ${stations.map(s => html`<div class="logrow" style="margin-top:3px;padding:6px 9px">
          <span class="dot" style="background:${s.level === "ok" ? THEME.ok : LOG_TX[s.level] ?? THEME.warn};flex-shrink:0"></span>
          <span style="font-size:11px;font-weight:800;min-width:62px;flex-shrink:0;
            color:rgba(255,255,255,.8)">${s.name}</span>
          <span class="txt" style="color:rgba(255,255,255,.55)">${s.text}</span>
        </div>`)}` : nothing}

      <div class="seclbl">Informationssystem</div>
      ${problems.length
        ? problems.map(p => html`<div class="logrow" style="background:${LOG_BG[p.level] ?? LOG_BG.warning};margin-top:4px">
            <span class="txt" style="color:${LOG_TX[p.level] ?? LOG_TX.warning}">\u26A0 ${p.label}</span></div>`)
        : html`<div class="logrow" style="background:${LOG_BG.ok};margin-top:4px">
            <span class="txt" style="color:${THEME.ok}">\u2713 Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`;
  }

  /** VPD-Zonen-Balken: auf einen Blick sehen, ob der Wert in der richtigen Zone liegt. */
  private vpdZoneBar(v: number | null, targets: { vpd_min: number; vpd_max: number } | null) {
    const ZONES = [
      { to: 0.4, col: "#5B8DEF", lbl: "zu feucht" },
      { to: 0.8, col: "#58E0A5", lbl: "Seedling" },
      { to: 1.2, col: "#34D17B", lbl: "Veg" },
      { to: 1.6, col: "#FFB35C", lbl: "Bloom" },
      { to: 2.0, col: "#FF6B6B", lbl: "zu trocken" },
    ];
    const MAXV = 2.0;
    const pos = v !== null ? Math.min(1, Math.max(0, v / MAXV)) * 100 : null;
    let from = 0;
    return html`<div style="margin-top:12px">
      <div style="position:relative;height:12px;border-radius:6px;
                  display:flex;box-shadow:inset 0 1px 3px rgba(0,0,0,.4)">
        ${ZONES.map(z => {
          const wPct = ((z.to - from) / MAXV) * 100; const first = from === 0; from = z.to;
          return html`<div style="width:${wPct}%;background:${z.col};opacity:.75;
            ${first ? "border-radius:6px 0 0 6px;" : ""}
            ${z.to === MAXV ? "border-radius:0 6px 6px 0;" : ""}"></div>`;
        })}
        ${targets ? html`<div style="position:absolute;top:-2px;bottom:-2px;
          left:${(targets.vpd_min / MAXV) * 100}%;width:${((targets.vpd_max - targets.vpd_min) / MAXV) * 100}%;
          border:1.5px solid rgba(255,255,255,.85);border-radius:4px;pointer-events:none"></div>` : nothing}
        ${pos !== null ? html`<div style="position:absolute;top:-4px;bottom:-4px;left:${pos}%;
          width:3px;margin-left:-1.5px;background:#fff;border-radius:2px;
          box-shadow:0 0 6px rgba(255,255,255,.9)"></div>` : nothing}
      </div>
      <div style="display:flex;margin-top:4px">
        ${(() => { let f2 = 0; return ZONES.map(z => {
          const wPct = ((z.to - f2) / MAXV) * 100; f2 = z.to;
          return html`<div style="width:${wPct}%;text-align:center;font-size:9.5px;
            color:rgba(255,255,255,.6);overflow:hidden;white-space:nowrap">${z.lbl}</div>`;
        }); })()}
      </div>
    </div>`;
  }
}
customElements.define("growctrl-hero-card", GrowctrlHeroCard);

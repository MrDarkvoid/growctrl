/* GROWCTRL Tent Card – Hauptkomponente (v1.3) */

import { LitElement, html, css, nothing, TemplateResult, PropertyValues } from 'lit';
import {
  HomeAssistant,
  TentCardConfig,
  SensorConfig,
  ControlConfig,
  PlantConfig,
  SettingItem,
  DEFAULT_PHASES,
} from './types';
import { calcVpd, vpdZone, VPD_ZONES, VPD_SCALE_MAX } from './vpd';
import { fetchHistory, getCachedHistory, fetchCalendar, getCachedCalendar, CalEvent } from './data';
import { sparkline, parseHaDate, daysSince, formatDate, chartSeries } from './util';
import {
  translateClimateLog,
  translateStationLog,
  translateRawLog,
  pumpOnFromLog,
  LogLine,
} from './loglang';

const CRITICAL_HINTS = ['pump', 'pumpe', 'co2', 'valve', 'ventil'];
const BLOOM_HINTS = /bloom|blüte|bluete|flush|spül|spuel/i;

/** Deutsche Anzeige bekannter Phasen-Namen (Servicecalls nutzen weiter das Original) */
const STAGE_DE: Record<string, string> = {
  seedling: 'Sämling',
  veg: 'Wachstum',
  bloom: 'Blüte',
  flush: 'Spülung',
};

type Popup =
  | { kind: 'none' }
  | { kind: 'confirm'; control: ControlConfig }
  | { kind: 'phase' }
  | { kind: 'plant'; index: number };

export class GrowctrlTentCard extends LitElement {
  public hass!: HomeAssistant;
  private _config!: TentCardConfig;
  private _activePlant = 0;
  private _popup: Popup = { kind: 'none' };
  private _showSettings = false;
  private _showExpert = false;
  private _historyTick = 0;

  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _activePlant: { state: true },
      _popup: { state: true },
      _showSettings: { state: true },
      _showExpert: { state: true },
      _historyTick: { state: true },
    };
  }

  /* ---------- Lovelace-API ---------- */

  public setConfig(config: TentCardConfig): void {
    if (!config) throw new Error('Konfiguration fehlt');
    this._config = config;
    if (this._activePlant >= (config.plants?.length ?? 0)) this._activePlant = 0;
  }

  public getCardSize(): number {
    return 8;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('growctrl-tent-card-editor');
  }

  public static getStubConfig(): Partial<TentCardConfig> {
    return {
      name: 'Growzelt',
      mode: 'dwc',
      climate: { temperature: '', humidity: '', leaf_offset: -2 },
      badges: [],
      stats: [],
      logs: [],
      sensors: [],
      controls: [],
      settings: [],
      plants: [],
      sparkline_hours: 24,
      chart_hours: 24,
    };
  }

  /* ---------- Daten nachladen (gedrosselt über Cache) ---------- */

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this.hass || !this._config) return;
    if (!changed.has('hass') && !changed.has('_config')) return;

    const c = this._config;
    const tick = () => this._historyTick++;

    const sparkHours = c.sparkline_hours ?? 24;
    for (const s of c.sensors ?? []) {
      if (!s.entity) continue;
      const before = getCachedHistory(s.entity, sparkHours);
      fetchHistory(this.hass, s.entity, sparkHours).then((p) => p !== before && tick());
    }
    if (c.show_chart !== false && c.climate?.temperature && c.climate?.humidity) {
      const ch = c.chart_hours ?? 24;
      for (const e of [c.climate.temperature, c.climate.humidity]) {
        const before = getCachedHistory(e, ch);
        fetchHistory(this.hass, e, ch).then((p) => p !== before && tick());
      }
    }
    for (const p of c.plants ?? []) {
      if (!p.calendar) continue;
      const before = getCachedCalendar(p.calendar);
      fetchCalendar(this.hass, p.calendar).then((ev) => ev !== before && tick());
    }
  }

  /* ---------- Helfer ---------- */

  private _state(entity?: string): string | undefined {
    if (!entity) return undefined;
    return this.hass?.states?.[entity]?.state;
  }

  private _num(entity?: string): number | undefined {
    const s = this._state(entity);
    if (s === undefined) return undefined;
    const v = parseFloat(s);
    return Number.isFinite(v) ? v : undefined;
  }

  private _unit(entity?: string): string {
    if (!entity) return '';
    return this.hass?.states?.[entity]?.attributes?.unit_of_measurement ?? '';
  }

  private _friendly(entity: string, fallback?: string): string {
    return fallback || this.hass?.states?.[entity]?.attributes?.friendly_name || entity;
  }

  private _stageLabel(stage?: string): string {
    if (!stage) return '';
    return STAGE_DE[stage.toLowerCase()] ?? stage;
  }

  private _moreInfo(entity: string): void {
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        bubbles: true,
        composed: true,
        detail: { entityId: entity },
      })
    );
  }

  private _isCriticalDefault(c: ControlConfig): boolean {
    const hay = `${c.entity} ${c.name ?? ''}`.toLowerCase();
    return CRITICAL_HINTS.some((h) => hay.includes(h));
  }

  private _toggle(c: ControlConfig, expert = false): void {
    const confirm = c.confirm ?? (expert ? true : this._isCriticalDefault(c));
    if (confirm) {
      this._popup = { kind: 'confirm', control: c };
      return;
    }
    this._doToggle(c.entity);
  }

  private _doToggle(entity: string): void {
    this.hass.callService('homeassistant', 'toggle', { entity_id: entity });
    this._popup = { kind: 'none' };
  }

  /** Zeit aus "HH:MM[:SS]" oder "YYYY-MM-DD HH:MM:SS" -> Minuten des Tages */
  private _timeToMin(value?: string): number | undefined {
    if (!value) return undefined;
    const part = value.split(' ').pop() ?? value;
    const m = part.match(/^(\d{1,2}):(\d{2})/);
    if (!m) return undefined;
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  }

  private _fmtDur(mins: number): string {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return h > 0 ? `${h}h ${String(m).padStart(2, '0')}min` : `${m} min`;
  }

  private _settingValue(entity: string): string {
    const st = this.hass?.states?.[entity];
    if (!st) return '–';
    const s = st.state;
    const t = (s.split(' ').pop() ?? s).match(/^(\d{1,2}:\d{2})(:\d{2})?$/);
    if (t) return t[1];
    const n = parseFloat(s);
    if (Number.isFinite(n) && /^[\d.,-]+$/.test(s)) {
      const u = st.attributes?.unit_of_measurement;
      return u ? `${n} ${u}` : `${n}`;
    }
    return this._stageLabel(s);
  }

  private _logLines(): { name: string; line: LogLine }[] {
    return (this._config.logs ?? [])
      .filter((l) => l.entity)
      .map((l) => {
        const raw = this._state(l.entity);
        const kind = l.kind ?? 'station';
        const line =
          kind === 'climate'
            ? translateClimateLog(raw)
            : kind === 'raw'
            ? translateRawLog(raw)
            : translateStationLog(raw);
        return { name: this._friendly(l.entity, l.name), line };
      });
  }

  private _statusInfo(): { label: string; cls: string } | undefined {
    const stCfg = this._config.status;
    const logs = this._logLines();
    if (!stCfg && !logs.length) return undefined;
    const levels = logs.map((l) => l.line.level);
    if (levels.includes('critical')) return { label: '🚨 Fehler', cls: 'crit' };
    if (levels.includes('warning')) return { label: '⚠️ Warnung', cls: 'warn' };
    if (stCfg?.dehum_entity && this._state(stCfg.dehum_entity) === 'on')
      return { label: '💧 Entfeuchter AN', cls: 'warn' };
    const temp = this._num(this._config.climate?.temperature);
    const tmin = stCfg?.temp_min ?? 18;
    const tmax = stCfg?.temp_max ?? 30;
    if (stCfg && temp !== undefined && (temp < tmin || temp > tmax))
      return { label: '⚠️ Temperatur!', cls: 'warn' };
    if (levels.includes('info')) return { label: 'ℹ️ Info', cls: 'info' };
    return { label: '✓ Alles OK', cls: 'ok' };
  }

  /* ---------- Render ---------- */

  protected render(): TemplateResult {
    if (!this._config) return html``;
    const c = this._config;

    if (!c.climate?.temperature || !c.climate?.humidity) {
      return html`<ha-card>
        <div class="setup-hint">
          <ha-icon icon="mdi:sprout"></ha-icon>
          <div>
            <b>GROWCTRL Tent Card</b><br />
            Bitte im Karten-Editor mindestens <b>Temperatur</b> und
            <b>Luftfeuchte</b> auswählen.
          </div>
        </div>
      </ha-card>`;
    }

    return html`<ha-card>
      <div class="ct">
        ${this._renderHeader()} ${this._renderHero()} ${this._renderChart()}
        ${this._renderStats()} ${this._renderLogs()}
        <div class="duo">
          ${this._renderSensors()} ${this._renderControls()}
        </div>
        ${this._renderGrow()}
        <div class="duo">
          ${this._renderPlants()} ${this._renderSettings()}
        </div>
        ${this._renderExpert()}
      </div>
      ${this._renderPopup()}
    </ha-card>`;
  }

  private _renderHeader(): TemplateResult {
    const c = this._config;
    const mode = c.mode === 'soil' ? 'Erde' : 'DWC';
    const badges = (c.badges ?? []).filter(
      (b) => b.entity && this._state(b.entity) === 'on'
    );
    return html`<div class="header">
      <span class="title">${c.name ?? 'Growzelt'}</span>
      <span class="hbadges">
        ${badges.map(
          (b) => html`<span class="badge hb">
            ${b.icon ? html`<ha-icon icon=${b.icon}></ha-icon>` : nothing}
            ${this._friendly(b.entity, b.name)}
          </span>`
        )}
        <span class="badge mode">${mode}</span>
      </span>
    </div>`;
  }

  /* ---------- Hero: KPIs + VPD + Licht/Pumpe ---------- */

  private _renderHero(): TemplateResult {
    const cl = this._config.climate!;
    const temp = this._num(cl.temperature);
    const rh = this._num(cl.humidity);

    let vpd: number | undefined;
    if (cl.vpd) vpd = this._num(cl.vpd);
    if (vpd === undefined && temp !== undefined && rh !== undefined) {
      vpd = calcVpd(temp, rh, cl.leaf_offset ?? -2);
    }

    const zone = vpd !== undefined ? vpdZone(vpd) : undefined;
    const markerPos =
      vpd !== undefined ? Math.min(100, (vpd / VPD_SCALE_MAX) * 100) : undefined;

    return html`<div class="hero">
      <div class="hero-numbers">
        <div class="kpi" @click=${() => this._moreInfo(cl.temperature)}>
          <span class="kpi-value">${temp !== undefined ? temp.toFixed(1) : '–'}</span>
          <span class="kpi-unit">°C</span>
          <span class="kpi-label">Temperatur</span>
        </div>
        <div class="kpi kpi-vpd" style=${zone ? `--zone:${zone.color}` : ''}>
          <span class="kpi-value">${vpd !== undefined ? vpd.toFixed(2) : '–'}</span>
          <span class="kpi-unit">kPa</span>
          <span class="kpi-label">VPD · ${zone ? zone.label : '–'}</span>
        </div>
        <div class="kpi" @click=${() => this._moreInfo(cl.humidity)}>
          <span class="kpi-value">${rh !== undefined ? rh.toFixed(0) : '–'}</span>
          <span class="kpi-unit">%</span>
          <span class="kpi-label">Luftfeuchte</span>
        </div>
      </div>
      <div class="vpd-scale">
        ${VPD_ZONES.map((z, i) => {
          const prev = i === 0 ? 0 : VPD_ZONES[i - 1].max;
          const w = ((z.max - prev) / VPD_SCALE_MAX) * 100;
          return html`<div
            class="vpd-zone"
            style="width:${w}%;background:${z.color}"
            title="${z.label} (bis ${z.max} kPa)"
          ></div>`;
        })}
        ${markerPos !== undefined
          ? html`<div class="vpd-marker" style="left:${markerPos}%"></div>`
          : nothing}
      </div>
      ${this._renderBars()}
    </div>`;
  }

  private _lightInfo():
    | { state: 'on' | 'night' | 'off'; pct: number; text: string }
    | undefined {
    const ls = this._config.light_schedule;
    if (!ls?.on_helper || !ls.off_helper) return undefined;

    const phase = this._state(this._config.grow?.phase_helper) ?? '';
    const useBloom = !!ls.off_helper_bloom && BLOOM_HINTS.test(phase);
    const onM = this._timeToMin(this._state(ls.on_helper));
    const offM = this._timeToMin(
      useBloom ? this._state(ls.off_helper_bloom) : this._state(ls.off_helper)
    );
    if (onM === undefined || offM === undefined) return undefined;

    const duration = (offM - onM + 1440) % 1440 || 1440;
    const night = 1440 - duration;
    const now = new Date();
    const sinceOn = (now.getHours() * 60 + now.getMinutes() - onM + 1440) % 1440;
    const inWindow = sinceOn < duration;
    const on = ls.entity ? this._state(ls.entity) === 'on' : inWindow;
    const lr = this._num(ls.remaining_helper);

    if (lr !== undefined) {
      if (on)
        return {
          state: 'on',
          pct: duration ? Math.min(100, (lr / duration) * 100) : 0,
          text: `noch ${this._fmtDur(lr)}`,
        };
      return {
        state: 'night',
        pct: night ? Math.min(100, (lr / night) * 100) : 0,
        text: `AN in ${this._fmtDur(lr)}`,
      };
    }
    if (on) {
      const elapsed = Math.min(sinceOn, duration);
      return {
        state: 'on',
        pct: (elapsed / duration) * 100,
        text: `${this._fmtDur(elapsed)} / ${this._fmtDur(duration)}`,
      };
    }
    const onStr = (this._state(ls.on_helper) ?? '').split(' ').pop() ?? '';
    return { state: 'off', pct: 0, text: `Aus · an um ${onStr.slice(0, 5)}` };
  }

  private _pumpInfo():
    | { on: boolean; pct: number; text: string }
    | undefined {
    const ps = this._config.pump_schedule;
    if (!ps) return undefined;
    const phase = (this._state(this._config.grow?.phase_helper) ?? '').toLowerCase();
    const key = phase.startsWith('seed') || phase.startsWith('säm')
      ? 'seedling'
      : phase.startsWith('veg') || phase.startsWith('wachs')
      ? 'veg'
      : 'bloom';
    const onV = this._num((ps as any)[`on_${key}`]);
    const offV = this._num((ps as any)[`off_${key}`]);
    const cyc = (onV ?? 0) + (offV ?? 0);
    const pr = this._num(ps.remaining_helper);
    let on: boolean | undefined = ps.entity
      ? this._state(ps.entity) === 'on'
      : undefined;
    if (on === undefined && ps.log_helper) on = pumpOnFromLog(this._state(ps.log_helper));
    if (pr === undefined && on === undefined) return undefined;

    const pct = pr !== undefined && cyc > 0 ? Math.min(100, (pr / cyc) * 100) : 0;
    const text = on
      ? pr !== undefined
        ? `noch ${this._fmtDur(pr)}`
        : 'AN'
      : pr !== undefined
      ? `AN in ${this._fmtDur(pr)}`
      : 'AUS';
    return { on: on ?? false, pct, text };
  }

  private _renderBars(): TemplateResult | typeof nothing {
    const li = this._lightInfo();
    const pu = this._pumpInfo();
    if (!li && !pu) return nothing;
    return html`<div class="bars">
      ${li
        ? html`<div class="bar-row">
            <ha-icon
              class="bicon ${li.state}"
              icon=${li.state === 'on'
                ? 'mdi:lightbulb-on'
                : li.state === 'night'
                ? 'mdi:weather-night'
                : 'mdi:lightbulb-off-outline'}
            ></ha-icon>
            <div class="bar">
              <div
                class="bar-fill ${li.state}"
                style="width:${li.state === 'off' ? 0 : li.pct}%"
              ></div>
            </div>
            <span class="bar-text">${li.text}</span>
          </div>`
        : nothing}
      ${pu
        ? html`<div class="bar-row">
            <ha-icon class="bicon ${pu.on ? 'pump' : ''}" icon="mdi:water"></ha-icon>
            <div class="bar">
              <div class="bar-fill pump" style="width:${pu.pct}%"></div>
            </div>
            <span class="bar-text">${pu.text}</span>
          </div>`
        : nothing}
    </div>`;
  }

  /* ---------- Verlaufsdiagramm ---------- */

  private _renderChart(): TemplateResult | typeof nothing {
    const c = this._config;
    if (c.show_chart === false) return nothing;
    const cl = c.climate!;
    const hours = c.chart_hours ?? 24;
    const tPts = getCachedHistory(cl.temperature, hours);
    const hPts = getCachedHistory(cl.humidity, hours);
    const W = 300;
    const H = 80;
    const t = tPts ? chartSeries(tPts, W, H) : null;
    const h = hPts ? chartSeries(hPts, W, H) : null;
    if (!t && !h) return nothing;

    const tNow = this._num(cl.temperature);
    const hNow = this._num(cl.humidity);

    return html`<div class="chart" @click=${() => this._moreInfo(cl.temperature)}>
      <div class="chart-legend">
        <span class="cl"><i class="ct-dot"></i>Temperatur
          ${tNow !== undefined ? `${tNow.toFixed(1)} °C` : ''}
          ${t ? html`<small>(${t.min.toFixed(1)}–${t.max.toFixed(1)})</small>` : nothing}
        </span>
        <span class="cl"><i class="ch-dot"></i>Feuchte
          ${hNow !== undefined ? `${hNow.toFixed(0)} %` : ''}
          ${h ? html`<small>(${Math.round(h.min)}–${Math.round(h.max)})</small>` : nothing}
        </span>
        <span class="cl-range">${hours} h</span>
      </div>
      <svg class="chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        <line x1="0" y1="${H * 0.25}" x2="${W}" y2="${H * 0.25}" class="grid"></line>
        <line x1="0" y1="${H * 0.5}" x2="${W}" y2="${H * 0.5}" class="grid"></line>
        <line x1="0" y1="${H * 0.75}" x2="${W}" y2="${H * 0.75}" class="grid"></line>
        ${h
          ? html`<path d=${h.area} class="area hum"></path>
              <polyline points=${h.line} class="line hum"></polyline>`
          : nothing}
        ${t
          ? html`<path d=${t.area} class="area temp"></path>
              <polyline points=${t.line} class="line temp"></polyline>`
          : nothing}
      </svg>
    </div>`;
  }

  /* ---------- Status-Boxen + Ampel ---------- */

  private _renderStats(): TemplateResult | typeof nothing {
    const stats = this._config.stats ?? [];
    const status = this._statusInfo();
    if (!stats.length && !status) return nothing;
    return html`<div class="stats">
      ${stats.map((s) => {
        const st = this.hass?.states?.[s.entity];
        const missing = !st;
        const n = st ? parseFloat(st.state) : NaN;
        const value = !st
          ? '–'
          : Number.isFinite(n) && /^[\d.,-]+$/.test(st.state)
          ? `${Math.round(n * 10) / 10} ${this._unit(s.entity)}`.trim()
          : st.state;
        return html`<div
          class="stat ${missing ? 'missing' : ''}"
          title=${missing ? `${s.entity} fehlt` : ''}
          @click=${() => !missing && this._moreInfo(s.entity)}
        >
          <span class="stat-label">${this._friendly(s.entity, s.name)}</span>
          <span class="stat-value">
            ${s.icon ? html`<ha-icon icon=${s.icon}></ha-icon>` : nothing}
            ${value}
          </span>
        </div>`;
      })}
      ${status
        ? html`<div class="stat">
            <span class="stat-label">Status</span>
            <span class="stat-value sv-${status.cls}">${status.label}</span>
          </div>`
        : nothing}
    </div>`;
  }

  /* ---------- Live-Logzeilen (übersetzt) ---------- */

  private _renderLogs(): TemplateResult | typeof nothing {
    const lines = this._logLines();
    if (!lines.length) return nothing;
    return html`<div class="logs-live">
      ${lines.map(
        (l) => html`<div class="logrow lv-${l.line.level}">
          <span class="logrow-name">${l.name}</span>
          <span class="logrow-text">${l.line.label}</span>
          ${l.line.ts ? html`<span class="logrow-ts">${l.line.ts}</span>` : nothing}
        </div>`
      )}
    </div>`;
  }

  /* ---------- Sensor-Kacheln ---------- */

  private _renderSensorTile(s: SensorConfig): TemplateResult {
    const st = this.hass?.states?.[s.entity];
    const hours = this._config.sparkline_hours ?? 24;
    if (!st) {
      return html`<div class="tile tile-missing" title=${s.entity}>
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span class="tile-name">Entität fehlt</span>
      </div>`;
    }
    const v = parseFloat(st.state);
    const pts = getCachedHistory(s.entity, hours);
    return html`<div class="tile" @click=${() => this._moreInfo(s.entity)}>
      <div class="tile-top">
        <ha-icon icon=${s.icon ?? st.attributes.icon ?? 'mdi:gauge'}></ha-icon>
        <span class="tile-name">${this._friendly(s.entity, s.name)}</span>
      </div>
      <div class="tile-value">
        ${Number.isFinite(v) ? v : st.state}
        <span class="tile-unit">${this._unit(s.entity)}</span>
      </div>
      ${pts ? sparkline(pts) : nothing}
    </div>`;
  }

  private _renderSensors(): TemplateResult | typeof nothing {
    const sensors = this._config.sensors ?? [];
    if (!sensors.length) return nothing;
    return html`<div class="section col">
      <div class="group-label">Sensoren</div>
      <div class="tiles">${sensors.map((s) => this._renderSensorTile(s))}</div>
    </div>`;
  }

  /* ---------- Steuerung ---------- */

  private _renderControlTile(c: ControlConfig, expert = false): TemplateResult {
    const st = this.hass?.states?.[c.entity];
    const on = st?.state === 'on';
    const missing = !st;
    const critical = c.confirm ?? (expert ? true : this._isCriticalDefault(c));
    return html`<button
      class="ctrl ${on ? 'on' : ''} ${missing ? 'missing' : ''}"
      title=${missing ? `${c.entity} fehlt` : this._friendly(c.entity, c.name)}
      ?disabled=${missing}
      @click=${() => this._toggle(c, expert)}
    >
      ${critical
        ? html`<ha-icon class="lock" icon="mdi:shield-check-outline"></ha-icon>`
        : nothing}
      <ha-icon
        class="ctrl-icon"
        icon=${c.icon ?? st?.attributes?.icon ?? 'mdi:toggle-switch'}
      ></ha-icon>
      <span class="ctrl-name">${this._friendly(c.entity, c.name)}</span>
    </button>`;
  }

  private _renderControls(): TemplateResult | typeof nothing {
    const controls = this._config.controls ?? [];
    if (!controls.length) return nothing;

    const groups = new Map<string, ControlConfig[]>();
    for (const ctl of controls) {
      const g = ctl.group?.trim() ?? '';
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g)!.push(ctl);
    }

    return html`<div class="section col">
      ${[...groups.entries()].map(
        ([g, items], idx) => html`
          <div class="group-label">${g || (idx === 0 ? 'Steuerung' : '')}</div>
          <div class="ctrl-grid">${items.map((ctl) => this._renderControlTile(ctl))}</div>
        `
      )}
      <div class="hint-line">
        Tippen schaltet direkt ·
        <ha-icon icon="mdi:shield-check-outline"></ha-icon> = mit Bestätigung
      </div>
    </div>`;
  }

  /* ---------- Grow-Status ---------- */

  private _growInfo() {
    const g = this._config.grow;
    if (!g) return undefined;
    const phase = this._state(g.phase_helper);
    const phaseStart = parseHaDate(this._state(g.phase_start_helper));
    const growStart = parseHaDate(this._state(g.grow_start_helper));
    const phases = g.phases?.length ? g.phases : DEFAULT_PHASES;
    const def = phase
      ? phases.find((p) => p.name.toLowerCase() === phase.toLowerCase())
      : undefined;
    const dayInPhase = phaseStart ? daysSince(phaseStart) : undefined;
    const dayTotal = growStart ? daysSince(growStart) : undefined;
    const progress =
      def && dayInPhase ? Math.min(100, (dayInPhase / def.days) * 100) : undefined;
    return { phase, dayInPhase, dayTotal, progress, phases, def };
  }

  private _renderGrow(): TemplateResult | typeof nothing {
    const info = this._growInfo();
    if (!info || (!info.phase && !info.dayTotal)) return nothing;
    return html`<div class="grow" @click=${() => (this._popup = { kind: 'phase' })}>
      <div class="grow-row">
        <ha-icon icon="mdi:sprout-outline"></ha-icon>
        <span class="grow-phase">${this._stageLabel(info.phase) || 'Phase unbekannt'}</span>
        <span class="grow-days">
          ${info.dayInPhase ? `Tag ${info.dayInPhase}` : ''}
          ${info.def ? ` / ${info.def.days}` : ''}
          ${info.dayTotal ? ` · Grow-Tag ${info.dayTotal}` : ''}
        </span>
      </div>
      ${info.progress !== undefined
        ? html`<div class="grow-bar">
            <div class="grow-fill" style="width:${info.progress}%"></div>
          </div>`
        : nothing}
    </div>`;
  }

  /* ---------- Pflanzen ---------- */

  private _plantAge(p: PlantConfig): number | undefined {
    const d =
      parseHaDate(this._state(p.germination_helper)) ?? parseHaDate(p.germination_date);
    return d ? daysSince(d) : undefined;
  }

  private _renderPlants(): TemplateResult | typeof nothing {
    const plants = this._config.plants ?? [];
    if (!plants.length) return nothing;
    const idx = Math.min(this._activePlant, plants.length - 1);
    const p = plants[idx];
    const age = this._plantAge(p);
    const events = p.calendar ? getCachedCalendar(p.calendar) : undefined;
    const past = (events ?? []).filter((e) => new Date(e.start).getTime() <= Date.now());

    return html`<div class="section col plants">
      <div class="group-label">Pflanzen</div>
      <div class="chips">
        ${plants.map(
          (pl, i) => html`<button
            class="chip ${i === idx ? 'active' : ''}"
            @click=${() => (this._activePlant = i)}
          >
            ${pl.name || `Pflanze ${i + 1}`}
          </button>`
        )}
      </div>
      <div class="plant" @click=${() => (this._popup = { kind: 'plant', index: idx })}>
        <div class="plant-head">
          <span class="plant-name">${p.name}</span>
          ${p.strain ? html`<span class="plant-strain">${p.strain}</span>` : nothing}
          ${age ? html`<span class="plant-age">Tag ${age}</span>` : nothing}
        </div>
        ${p.sensors?.length
          ? html`<div class="tiles tiles-plant">
              ${p.sensors.map((s) => this._renderSensorTile(s))}
            </div>`
          : nothing}
        ${past.length
          ? html`<div class="events">
              ${past.slice(0, 3).map(
                (e) => html`<div class="event">
                  <span class="event-date">${formatDate(e.start)}</span>
                  <span class="event-text">${e.summary}</span>
                </div>`
              )}
            </div>`
          : nothing}
      </div>
    </div>`;
  }

  /* ---------- Konfigurations-Sektion ---------- */

  private _phaseOptions(): string[] {
    const helper = this._config.grow?.phase_helper;
    const fromHelper: string[] | undefined = helper
      ? this.hass?.states?.[helper]?.attributes?.options
      : undefined;
    if (fromHelper?.length) return fromHelper;
    const phases = this._config.grow?.phases?.length
      ? this._config.grow.phases
      : DEFAULT_PHASES;
    return phases.map((p) => p.name);
  }

  private _selectPhase(option: string): void {
    const helper = this._config.grow?.phase_helper;
    if (!helper) return;
    this.hass.callService('input_select', 'select_option', {
      entity_id: helper,
      option,
    });
  }

  private _renderSettingTile(item: SettingItem): TemplateResult {
    const st = this.hass?.states?.[item.entity];
    if (!st) {
      return html`<div class="tile tile-missing" title=${item.entity}>
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span class="tile-name">Entität fehlt</span>
      </div>`;
    }
    return html`<div class="tile setting" @click=${() => this._moreInfo(item.entity)}>
      <div class="tile-top">
        <ha-icon icon=${item.icon ?? st.attributes.icon ?? 'mdi:cog-outline'}></ha-icon>
        <span class="tile-name">${this._friendly(item.entity, item.name)}</span>
      </div>
      <div class="tile-value">${this._settingValue(item.entity)}</div>
    </div>`;
  }

  private _renderSettings(): TemplateResult | typeof nothing {
    const groups = this._config.settings ?? [];
    const hasPhaseChips = !!this._config.grow?.phase_helper;
    if (!groups.length && !hasPhaseChips) return nothing;

    return html`<div class="section col">
      <button class="section-head" @click=${() => (this._showSettings = !this._showSettings)}>
        <ha-icon icon="mdi:cog-outline"></ha-icon>
        <span>Konfiguration</span>
        <ha-icon
          class="chev"
          icon=${this._showSettings ? 'mdi:chevron-up' : 'mdi:chevron-down'}
        ></ha-icon>
      </button>
      ${this._showSettings
        ? html`
            ${hasPhaseChips
              ? html`<div class="group-label">Wachstumsphase · Tippen zum Wechseln</div>
                  <div class="chips chips-phase">
                    ${this._phaseOptions().map((opt) => {
                      const active =
                        (this._state(this._config.grow!.phase_helper) ?? '').toLowerCase() ===
                        opt.toLowerCase();
                      return html`<button
                        class="chip ${active ? 'active' : ''}"
                        @click=${() => this._selectPhase(opt)}
                      >
                        ${this._stageLabel(opt)}
                      </button>`;
                    })}
                  </div>`
              : nothing}
            ${groups.map(
              (g) => html`
                ${g.title ? html`<div class="group-label">${g.title}</div>` : nothing}
                <div class="tiles tiles-settings">
                  ${(g.items ?? []).map((it) => this._renderSettingTile(it))}
                </div>
              `
            )}
            <div class="hint-line">Tippen öffnet den HA-Einstellungsdialog</div>
          `
        : nothing}
    </div>`;
  }

  /* ---------- Experten-Modus ---------- */

  private _renderExpert(): TemplateResult | typeof nothing {
    const ex = this._config.expert;
    const hasContent = !!ex && (!!ex.controls?.length || !!ex.logs?.length);
    if (!hasContent) return nothing;

    return html`<div class="section expert">
      <button
        class="section-head expert-head"
        @click=${() => (this._showExpert = !this._showExpert)}
      >
        <ha-icon icon="mdi:tools"></ha-icon>
        <span>Experten-Modus</span>
        <span class="expert-toggle">${this._showExpert ? 'Ausblenden' : 'Einblenden'}</span>
      </button>
      ${this._showExpert
        ? html`
            ${ex!.controls?.length
              ? html`<div class="ctrl-grid">
                  ${ex!.controls!.map((c) => this._renderControlTile(c, true))}
                </div>`
              : nothing}
            ${(ex!.logs ?? []).map((log) => {
              const st = this.hass?.states?.[log.entity];
              return html`<div class="log">
                <div class="group-label">${this._friendly(log.entity, log.name)}</div>
                <pre class="log-body">${st ? st.state : `${log.entity} fehlt`}</pre>
              </div>`;
            })}
            <div class="hint-line warn">
              <ha-icon icon="mdi:alert-outline"></ha-icon>
              Experten-Modus · nur für Diagnose und Wartung
            </div>
          `
        : nothing}
    </div>`;
  }

  /* ---------- Popups ---------- */

  private _renderPopup(): TemplateResult | typeof nothing {
    const p = this._popup;
    if (p.kind === 'none') return nothing;

    let body: TemplateResult;
    if (p.kind === 'confirm') {
      body = html`<div class="popup-title">Wirklich schalten?</div>
        <p>
          <b>${this._friendly(p.control.entity, p.control.name)}</b> ist als kritischer
          Aktor markiert.
        </p>
        <div class="popup-actions">
          <button class="btn" @click=${() => (this._popup = { kind: 'none' })}>
            Abbrechen
          </button>
          <button class="btn primary" @click=${() => this._doToggle(p.control.entity)}>
            Schalten
          </button>
        </div>`;
    } else if (p.kind === 'phase') {
      const info = this._growInfo();
      body = html`<div class="popup-title">Grow-Zeitplan</div>
        <div class="timeline">
          ${(info?.phases ?? []).map((ph) => {
            const active =
              info?.phase && ph.name.toLowerCase() === info.phase.toLowerCase();
            return html`<div class="tl-row ${active ? 'active' : ''}">
              <span class="tl-name">${this._stageLabel(ph.name)}</span>
              <span class="tl-days">${ph.days} Tage</span>
              ${active && info?.dayInPhase
                ? html`<span class="tl-now">Tag ${info.dayInPhase}</span>`
                : nothing}
            </div>`;
          })}
        </div>
        <div class="popup-actions">
          <button class="btn" @click=${() => (this._popup = { kind: 'none' })}>
            Schließen
          </button>
        </div>`;
    } else {
      const plant = (this._config.plants ?? [])[p.index];
      const events = plant?.calendar ? getCachedCalendar(plant.calendar) ?? [] : [];
      body = html`<div class="popup-title">
          ${plant?.name}${plant?.strain ? ` · ${plant.strain}` : ''}
        </div>
        ${events.length
          ? html`<div class="events events-full">
              ${events.map(
                (e: CalEvent) => html`<div class="event">
                  <span class="event-date">${formatDate(e.start)}</span>
                  <span class="event-text">
                    ${e.summary}${e.description
                      ? html`<br /><small>${e.description}</small>`
                      : nothing}
                  </span>
                </div>`
              )}
            </div>`
          : html`<p>Keine Ereignisse im Kalender gefunden.</p>`}
        <div class="popup-actions">
          <button class="btn" @click=${() => (this._popup = { kind: 'none' })}>
            Schließen
          </button>
        </div>`;
    }

    return html`<div
      class="overlay"
      @click=${(e: Event) => {
        if (e.target === e.currentTarget) this._popup = { kind: 'none' };
      }}
    >
      <div class="popup">${body}</div>
    </div>`;
  }

  /* ---------- Styles ---------- */

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      position: relative;
      overflow: hidden;
      padding: 12px 12px 14px;
      color: var(--primary-text-color);
    }
    .ct {
      container-type: inline-size;
    }

    /* Header + Badges */
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }
    .title {
      font-size: 1.15em;
      font-weight: 600;
      letter-spacing: 0.2px;
    }
    .hbadges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.7em;
      font-weight: 700;
      letter-spacing: 0.4px;
      padding: 3px 9px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      border: 1px solid var(--divider-color);
      white-space: nowrap;
    }
    .badge.mode {
      text-transform: uppercase;
    }
    .badge.hb {
      border-color: color-mix(in srgb, var(--primary-color) 50%, transparent);
      color: var(--primary-color);
    }
    .badge ha-icon {
      --mdc-icon-size: 12px;
    }

    /* Hero */
    .hero {
      padding: 6px 2px 12px;
      border-bottom: 1px solid var(--divider-color);
    }
    .hero-numbers {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 8px;
      margin-bottom: 10px;
    }
    .kpi {
      flex: 1;
      text-align: center;
      cursor: pointer;
      min-width: 0;
    }
    .kpi-value {
      font-size: 1.7em;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .kpi-vpd .kpi-value {
      font-size: 2.3em;
      color: var(--zone, var(--primary-color));
    }
    .kpi-unit {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-left: 2px;
    }
    .kpi-label {
      display: block;
      font-size: 0.72em;
      color: var(--secondary-text-color);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .vpd-scale {
      position: relative;
      display: flex;
      height: 10px;
      border-radius: 5px;
      overflow: visible;
    }
    .vpd-zone:first-child {
      border-radius: 5px 0 0 5px;
    }
    .vpd-zone:last-child {
      border-radius: 0 5px 5px 0;
    }
    .vpd-marker {
      position: absolute;
      top: -4px;
      width: 4px;
      height: 18px;
      border-radius: 2px;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 2px var(--card-background-color);
      transform: translateX(-50%);
      transition: left 0.6s ease;
    }

    /* Licht/Pumpe-Balken im Hero */
    .bars {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .bar-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .bicon {
      --mdc-icon-size: 17px;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .bicon.on {
      color: #d9a13b;
    }
    .bicon.night {
      color: #8b9fc4;
    }
    .bicon.pump {
      color: #4fc3f7;
    }
    .bar {
      flex: 1;
      height: 6px;
      border-radius: 3px;
      background: var(--secondary-background-color);
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.6s ease;
    }
    .bar-fill.on {
      background: linear-gradient(90deg, #ffd700, #ffa500);
    }
    .bar-fill.night {
      background: linear-gradient(90deg, #8b9fc4, #5b6f96);
    }
    .bar-fill.pump {
      background: linear-gradient(90deg, #4fc3f7, #0288d1);
    }
    .bar-text {
      font-size: 0.74em;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      min-width: 92px;
      text-align: right;
    }

    /* Verlaufsdiagramm */
    .chart {
      padding: 10px 0 6px;
      border-bottom: 1px solid var(--divider-color);
      cursor: pointer;
    }
    .chart-legend {
      display: flex;
      align-items: baseline;
      gap: 14px;
      font-size: 0.74em;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
      flex-wrap: wrap;
    }
    .cl {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-variant-numeric: tabular-nums;
    }
    .cl small {
      opacity: 0.7;
    }
    .cl i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
    .ct-dot {
      background: #ffb347;
    }
    .ch-dot {
      background: #4fc3f7;
    }
    .cl-range {
      margin-left: auto;
      font-size: 0.95em;
      opacity: 0.7;
    }
    .chart-svg {
      display: block;
      width: 100%;
      height: 88px;
    }
    .chart-svg .grid {
      stroke: var(--divider-color);
      stroke-width: 0.5;
    }
    .chart-svg .line {
      fill: none;
      stroke-width: 1.6;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .chart-svg .line.temp {
      stroke: #ffb347;
    }
    .chart-svg .line.hum {
      stroke: #4fc3f7;
    }
    .chart-svg .area {
      stroke: none;
      opacity: 0.12;
    }
    .chart-svg .area.temp {
      fill: #ffb347;
    }
    .chart-svg .area.hum {
      fill: #4fc3f7;
    }

    /* Status-Boxen */
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
      padding: 10px 0 0;
    }
    .stat {
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 8px 10px;
      text-align: center;
      cursor: pointer;
      min-width: 0;
      transition: border-color 0.15s ease;
    }
    .stat:hover {
      border-color: var(--primary-color);
    }
    .stat.missing {
      opacity: 0.5;
      cursor: default;
    }
    .stat-label {
      display: block;
      font-size: 0.66em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .stat-value {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 1.1em;
      font-weight: 700;
      margin-top: 2px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      overflow: hidden;
    }
    .stat-value ha-icon {
      --mdc-icon-size: 16px;
      color: var(--primary-color);
    }
    .sv-ok {
      color: #3e9d52;
    }
    .sv-warn,
    .sv-info {
      color: #d9a13b;
    }
    .sv-crit {
      color: #cf5b4c;
    }

    /* Live-Logzeilen */
    .logs-live {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 10px 0;
      border-bottom: 1px solid var(--divider-color);
    }
    .logrow {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border-radius: 8px;
      background: var(--secondary-background-color);
      font-size: 0.76em;
    }
    .logrow-name {
      font-weight: 700;
      color: var(--secondary-text-color);
      flex-shrink: 0;
      min-width: 46px;
    }
    .logrow-text {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .logrow-ts {
      color: var(--secondary-text-color);
      font-size: 0.92em;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }
    .logrow.lv-critical {
      background: color-mix(in srgb, #cf5b4c 18%, var(--secondary-background-color));
    }
    .lv-critical .logrow-text {
      color: #e06a5b;
      font-weight: 600;
    }
    .logrow.lv-warning {
      background: color-mix(in srgb, #d9a13b 16%, var(--secondary-background-color));
    }
    .lv-warning .logrow-text {
      color: #d9a13b;
      font-weight: 600;
    }
    .lv-info .logrow-text {
      color: #d9a13b;
    }
    .lv-none .logrow-text {
      color: var(--secondary-text-color);
    }

    /* Zweispalten-Layout auf breiten Karten */
    .duo {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 18px;
    }
    @container (min-width: 540px) {
      .duo {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* Sektionen */
    .section {
      padding: 10px 0;
      border-bottom: 1px solid var(--divider-color);
      min-width: 0;
    }
    .group-label {
      font-size: 0.66em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.9px;
      color: var(--secondary-text-color);
      margin: 10px 2px 6px;
    }
    .group-label:first-child {
      margin-top: 0;
    }
    .section-head {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 4px 2px;
      background: none;
      border: none;
      color: var(--primary-text-color);
      font: inherit;
      font-weight: 600;
      font-size: 0.92em;
      cursor: pointer;
      text-align: left;
    }
    .section-head ha-icon {
      --mdc-icon-size: 18px;
      color: var(--primary-color);
    }
    .section-head .chev {
      margin-left: auto;
      color: var(--secondary-text-color);
    }

    /* Kacheln */
    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
      gap: 8px;
      padding: 2px 0 6px;
    }
    .tile {
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 8px 10px 4px;
      cursor: pointer;
      min-width: 0;
      transition: border-color 0.15s ease;
    }
    .tile:hover {
      border-color: var(--primary-color);
    }
    .tile.setting {
      padding-bottom: 8px;
    }
    .tile-missing {
      cursor: default;
      color: var(--error-color, #cf5b4c);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tile-top {
      display: flex;
      align-items: center;
      gap: 5px;
      color: var(--secondary-text-color);
      font-size: 0.72em;
      margin-bottom: 2px;
    }
    .tile-top ha-icon {
      --mdc-icon-size: 15px;
    }
    .tile-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tile-value {
      font-size: 1.25em;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .tile-unit {
      font-size: 0.7em;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .spark {
      display: block;
      width: 100%;
      height: 22px;
      color: var(--primary-color);
      margin-top: 2px;
    }

    /* Schalt-Kacheln */
    .ctrl-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(94px, 1fr));
      gap: 8px;
    }
    .ctrl {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 12px 6px 10px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 0.78em;
      cursor: pointer;
      min-width: 0;
      transition: all 0.15s ease;
    }
    .ctrl:hover {
      border-color: var(--primary-color);
    }
    .ctrl .ctrl-icon {
      --mdc-icon-size: 22px;
    }
    .ctrl-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .ctrl.on {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 16%, var(--secondary-background-color));
      color: var(--primary-text-color);
    }
    .ctrl.on .ctrl-icon {
      color: var(--primary-color);
    }
    .ctrl.missing {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .ctrl .lock {
      position: absolute;
      top: 5px;
      right: 6px;
      --mdc-icon-size: 12px;
      opacity: 0.65;
    }
    .hint-line {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.68em;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
    .hint-line ha-icon {
      --mdc-icon-size: 12px;
    }

    /* Grow */
    .grow {
      padding: 10px 2px;
      border-bottom: 1px solid var(--divider-color);
      cursor: pointer;
    }
    .grow-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9em;
    }
    .grow-row ha-icon {
      --mdc-icon-size: 18px;
      color: var(--primary-color);
    }
    .grow-phase {
      font-weight: 600;
    }
    .grow-days {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 0.85em;
      font-variant-numeric: tabular-nums;
    }
    .grow-bar {
      height: 6px;
      border-radius: 3px;
      background: var(--secondary-background-color);
      margin-top: 8px;
      overflow: hidden;
    }
    .grow-fill {
      height: 100%;
      border-radius: 3px;
      background: var(--primary-color);
      transition: width 0.6s ease;
    }

    /* Pflanzen */
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }
    .chips-phase {
      margin-bottom: 4px;
    }
    .chip {
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 0.8em;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .chip.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
    .plant {
      cursor: pointer;
    }
    .plant-head {
      display: flex;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
    }
    .plant-name {
      font-weight: 600;
    }
    .plant-strain {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      font-style: italic;
    }
    .plant-age {
      margin-left: auto;
      font-size: 0.8em;
      font-weight: 600;
      color: var(--primary-color);
      font-variant-numeric: tabular-nums;
    }
    .tiles-plant,
    .tiles-settings {
      padding-bottom: 4px;
    }
    .events {
      margin-top: 6px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .event {
      display: flex;
      gap: 10px;
      font-size: 0.8em;
    }
    .event-date {
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }
    .events-full {
      max-height: 50vh;
      overflow-y: auto;
    }

    /* Experten-Modus */
    .expert {
      border-bottom: none;
      padding-bottom: 0;
    }
    .expert-head {
      color: #d9a13b;
    }
    .expert-head ha-icon {
      color: #d9a13b;
    }
    .expert .ctrl-grid {
      margin-bottom: 4px;
    }
    .log {
      margin-top: 6px;
    }
    .log-body {
      margin: 0;
      padding: 8px 10px;
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.7em;
      line-height: 1.45;
      color: var(--primary-text-color);
      white-space: pre-wrap;
      word-break: break-word;
      max-height: 120px;
      overflow-y: auto;
    }
    .hint-line.warn {
      color: #d9a13b;
    }

    /* Popup / Overlay */
    .overlay {
      position: absolute;
      inset: 0;
      background: color-mix(in srgb, var(--card-background-color) 65%, transparent);
      backdrop-filter: blur(3px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 5;
    }
    .popup {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, 0 6px 24px rgba(0, 0, 0, 0.25));
      padding: 16px;
      width: 100%;
      max-width: 340px;
      font-size: 0.9em;
    }
    .popup-title {
      font-weight: 700;
      font-size: 1.05em;
      margin-bottom: 8px;
    }
    .popup-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 12px;
    }
    .btn {
      padding: 7px 14px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
    }
    .btn.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .tl-row {
      display: flex;
      gap: 8px;
      align-items: baseline;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
    }
    .tl-row.active {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    }
    .tl-name {
      font-weight: 600;
    }
    .tl-days {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 0.85em;
    }
    .tl-now {
      font-size: 0.8em;
      color: var(--primary-color);
      font-weight: 700;
    }

    .setup-hint {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 16px;
      color: var(--secondary-text-color);
    }
    .setup-hint ha-icon {
      --mdc-icon-size: 32px;
      color: var(--primary-color);
    }
  `;
}

customElements.define('growctrl-tent-card', GrowctrlTentCard);

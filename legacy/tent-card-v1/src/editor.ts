/* GUI-Konfigurationseditor für growctrl-tent-card.
 * Komplett ohne YAML bedienbar: Entity-Picker für alles,
 * beliebig viele Sensoren, Aktoren, Phasen und Pflanzen per "+ hinzufügen". */

import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import {
  HomeAssistant,
  TentCardConfig,
  SensorConfig,
  ControlConfig,
  PlantConfig,
  PhaseDef,
  SettingsGroup,
  SettingItem,
  ExpertConfig,
} from './types';

const LABELS: Record<string, string> = {
  name: 'Name des Zelts',
  mode: 'System-Modus',
  sparkline_hours: 'Sparkline-Zeitfenster (Stunden)',
  temperature: 'Temperatur-Sensor *',
  humidity: 'Luftfeuchte-Sensor *',
  vpd: 'VPD-Sensor (optional, sonst Berechnung)',
  leaf_offset: 'Blatttemperatur-Offset (K)',
  entity: 'Entität',
  icon: 'Icon',
  confirm: 'Bestätigung vor dem Schalten',
  phase_helper: 'Phase (input_select)',
  phase_start_helper: 'Phasen-Start (input_datetime)',
  grow_start_helper: 'Grow-Start (input_datetime)',
  strain: 'Sorte / Genetik',
  germination_helper: 'Keimdatum (input_datetime)',
  calendar: 'Ereignis-Kalender (calendar)',
  days: 'Tage',
  label: 'Anzeigename',
  group: 'Gruppe (Überschrift, z.B. "Geräte · Manuell")',
  title: 'Gruppen-Titel (z.B. "Lichtzeiten")',
  on_helper: 'Licht AN (input_datetime)',
  off_helper: 'Licht AUS – Seed/Veg (input_datetime)',
  off_helper_bloom: 'Licht AUS – Bloom/Flush (optional)',
  remaining_helper: 'Restzeit-Sensor (Minuten)',
  log_helper: 'Stations-Log (für AN/AUS-Erkennung)',
  on_seedling: 'Pumpe AN · Sämling (input_number)',
  off_seedling: 'Pumpe AUS · Sämling',
  on_veg: 'Pumpe AN · Wachstum',
  off_veg: 'Pumpe AUS · Wachstum',
  on_bloom: 'Pumpe AN · Blüte/Spülung',
  off_bloom: 'Pumpe AUS · Blüte/Spülung',
  kind: 'Log-Format',
  dehum_entity: 'Entfeuchter-Anforderung (input_boolean)',
  temp_min: 'Temperatur-Warnung unter (°C)',
  temp_max: 'Temperatur-Warnung über (°C)',
  show_chart: 'Verlaufsdiagramm anzeigen',
  chart_hours: 'Diagramm-Zeitfenster (Stunden)',
};

const SCHEMA_BASE = [
  { name: 'name', selector: { text: {} } },
  {
    name: 'mode',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'dwc', label: 'DWC (Hydroponik)' },
          { value: 'soil', label: 'Erde' },
        ],
      },
    },
  },
  { name: 'sparkline_hours', selector: { number: { min: 1, max: 168, mode: 'box' } } },
  { name: 'show_chart', selector: { boolean: {} } },
  { name: 'chart_hours', selector: { number: { min: 1, max: 168, mode: 'box' } } },
];

const SCHEMA_BADGE_ROW = [
  {
    name: 'entity',
    selector: { entity: { domain: ['input_boolean', 'switch', 'binary_sensor'] } },
  },
  { name: 'name', selector: { text: {} } },
  { name: 'icon', selector: { icon: {} } },
];

const SCHEMA_PUMP = [
  { name: 'entity', selector: { entity: { domain: ['switch', 'input_boolean'] } } },
  { name: 'remaining_helper', selector: { entity: { domain: 'sensor' } } },
  { name: 'log_helper', selector: { entity: { domain: ['input_text', 'sensor', 'text'] } } },
  { name: 'on_seedling', selector: { entity: { domain: ['input_number', 'number'] } } },
  { name: 'off_seedling', selector: { entity: { domain: ['input_number', 'number'] } } },
  { name: 'on_veg', selector: { entity: { domain: ['input_number', 'number'] } } },
  { name: 'off_veg', selector: { entity: { domain: ['input_number', 'number'] } } },
  { name: 'on_bloom', selector: { entity: { domain: ['input_number', 'number'] } } },
  { name: 'off_bloom', selector: { entity: { domain: ['input_number', 'number'] } } },
];

const SCHEMA_LOGROW = [
  { name: 'entity', selector: { entity: { domain: ['input_text', 'sensor', 'text'] } } },
  { name: 'name', selector: { text: {} } },
  {
    name: 'kind',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'station', label: 'Station (GROWCTRL)' },
          { value: 'climate', label: 'Klima (GROWCTRL)' },
          { value: 'raw', label: 'Unverändert anzeigen' },
        ],
      },
    },
  },
];

const SCHEMA_STATUS = [
  {
    name: 'dehum_entity',
    selector: { entity: { domain: ['input_boolean', 'binary_sensor', 'switch'] } },
  },
  { name: 'temp_min', selector: { number: { min: 0, max: 40, step: 0.5, mode: 'box' } } },
  { name: 'temp_max', selector: { number: { min: 0, max: 50, step: 0.5, mode: 'box' } } },
];

const SCHEMA_CLIMATE = [
  { name: 'temperature', selector: { entity: { domain: 'sensor' } } },
  { name: 'humidity', selector: { entity: { domain: 'sensor' } } },
  { name: 'vpd', selector: { entity: { domain: 'sensor' } } },
  { name: 'leaf_offset', selector: { number: { min: -6, max: 4, step: 0.5, mode: 'box' } } },
];

const SCHEMA_SENSOR_ROW = [
  { name: 'entity', selector: { entity: { domain: ['sensor', 'binary_sensor'] } } },
  { name: 'name', selector: { text: {} } },
  { name: 'icon', selector: { icon: {} } },
];

const SCHEMA_CONTROL_ROW = [
  {
    name: 'entity',
    selector: {
      entity: { domain: ['switch', 'light', 'fan', 'input_boolean', 'humidifier', 'valve'] },
    },
  },
  { name: 'name', selector: { text: {} } },
  { name: 'group', selector: { text: {} } },
  { name: 'icon', selector: { icon: {} } },
  { name: 'confirm', selector: { boolean: {} } },
];

const SCHEMA_STAT_ROW = [
  { name: 'entity', selector: { entity: {} } },
  { name: 'name', selector: { text: {} } },
  { name: 'icon', selector: { icon: {} } },
];

const SCHEMA_LIGHT = [
  { name: 'entity', selector: { entity: { domain: ['light', 'switch'] } } },
  { name: 'on_helper', selector: { entity: { domain: 'input_datetime' } } },
  { name: 'off_helper', selector: { entity: { domain: 'input_datetime' } } },
  { name: 'off_helper_bloom', selector: { entity: { domain: 'input_datetime' } } },
  { name: 'remaining_helper', selector: { entity: { domain: 'sensor' } } },
];

const SCHEMA_SETTING_ROW = [
  {
    name: 'entity',
    selector: {
      entity: {
        domain: ['input_datetime', 'input_number', 'input_select', 'input_text', 'number', 'select', 'time', 'datetime', 'text'],
      },
    },
  },
  { name: 'name', selector: { text: {} } },
  { name: 'icon', selector: { icon: {} } },
];

const SCHEMA_LOG_ROW = [
  { name: 'entity', selector: { entity: { domain: ['sensor', 'text', 'input_text'] } } },
  { name: 'name', selector: { text: {} } },
];

const SCHEMA_GROW = [
  { name: 'phase_helper', selector: { entity: { domain: 'input_select' } } },
  { name: 'phase_start_helper', selector: { entity: { domain: 'input_datetime' } } },
  { name: 'grow_start_helper', selector: { entity: { domain: 'input_datetime' } } },
];

const SCHEMA_PHASE_ROW = [
  { name: 'name', selector: { text: {} } },
  { name: 'days', selector: { number: { min: 1, max: 365, mode: 'box' } } },
];

const SCHEMA_PLANT_HEAD = [
  { name: 'name', selector: { text: {} } },
  { name: 'strain', selector: { text: {} } },
  { name: 'germination_helper', selector: { entity: { domain: 'input_datetime' } } },
  { name: 'calendar', selector: { entity: { domain: 'calendar' } } },
];

export class GrowctrlTentCardEditor extends LitElement {
  public hass!: HomeAssistant;
  private _config!: TentCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  public setConfig(config: TentCardConfig): void {
    this._config = config;
  }

  private _label = (schema: { name: string }) => LABELS[schema.name] ?? schema.name;

  private _emit(config: TentCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        bubbles: true,
        composed: true,
        detail: { config },
      })
    );
  }

  /** flachen Teil der Config über ha-form patchen */
  private _patch(part: Record<string, any>): void {
    this._emit({ ...this._config, ...part });
  }

  private _patchClimate(value: Record<string, any>): void {
    this._emit({ ...this._config, climate: { ...value } as any });
  }

  /* ---------- Listen-Helfer ---------- */

  private _listChange<T>(
    key: 'sensors' | 'controls' | 'stats' | 'badges' | 'logs',
    index: number,
    value: T
  ): void {
    const list = [...((this._config[key] as any[]) ?? [])];
    list[index] = value;
    this._emit({ ...this._config, [key]: list });
  }

  private _listAdd(
    key: 'sensors' | 'controls' | 'stats' | 'badges' | 'logs',
    item: any
  ): void {
    const list = [...((this._config[key] as any[]) ?? []), item];
    this._emit({ ...this._config, [key]: list });
  }

  private _listRemove(
    key: 'sensors' | 'controls' | 'stats' | 'badges' | 'logs',
    index: number
  ): void {
    const list = [...((this._config[key] as any[]) ?? [])];
    list.splice(index, 1);
    this._emit({ ...this._config, [key]: list });
  }

  /* ---------- Konfigurations-Gruppen ---------- */

  private _settings(): SettingsGroup[] {
    return this._config.settings ?? [];
  }

  private _settingsPatch(settings: SettingsGroup[]): void {
    this._emit({ ...this._config, settings });
  }

  private _settingsGroupPatch(gIdx: number, value: Partial<SettingsGroup>): void {
    const settings = [...this._settings()];
    settings[gIdx] = { ...settings[gIdx], ...value };
    this._settingsPatch(settings);
  }

  private _settingItemChange(gIdx: number, iIdx: number, value: SettingItem): void {
    const items = [...(this._settings()[gIdx].items ?? [])];
    items[iIdx] = value;
    this._settingsGroupPatch(gIdx, { items });
  }

  /* ---------- Experten-Modus ---------- */

  private _expertPatch(value: Partial<ExpertConfig>): void {
    this._emit({ ...this._config, expert: { ...(this._config.expert ?? {}), ...value } });
  }

  /* ---------- Phasen ---------- */

  private _phases(): PhaseDef[] {
    return this._config.grow?.phases ?? [];
  }

  private _phasePatch(phases: PhaseDef[]): void {
    this._emit({ ...this._config, grow: { ...(this._config.grow ?? {}), phases } });
  }

  /* ---------- Pflanzen ---------- */

  private _plants(): PlantConfig[] {
    return this._config.plants ?? [];
  }

  private _plantPatch(index: number, value: Partial<PlantConfig>): void {
    const plants = [...this._plants()];
    plants[index] = { ...plants[index], ...value };
    this._emit({ ...this._config, plants });
  }

  private _plantAdd(): void {
    const plants = [
      ...this._plants(),
      { name: `Pflanze ${this._plants().length + 1}`, sensors: [] } as PlantConfig,
    ];
    this._emit({ ...this._config, plants });
  }

  private _plantRemove(index: number): void {
    const plants = [...this._plants()];
    plants.splice(index, 1);
    this._emit({ ...this._config, plants });
  }

  private _plantSensorChange(pIdx: number, sIdx: number, value: SensorConfig): void {
    const sensors = [...(this._plants()[pIdx].sensors ?? [])];
    sensors[sIdx] = value;
    this._plantPatch(pIdx, { sensors });
  }

  private _plantSensorAdd(pIdx: number): void {
    const sensors = [...(this._plants()[pIdx].sensors ?? []), { entity: '' }];
    this._plantPatch(pIdx, { sensors });
  }

  private _plantSensorRemove(pIdx: number, sIdx: number): void {
    const sensors = [...(this._plants()[pIdx].sensors ?? [])];
    sensors.splice(sIdx, 1);
    this._plantPatch(pIdx, { sensors });
  }

  /* ---------- Render ---------- */

  private _form(
    data: any,
    schema: any[],
    onChange: (value: any) => void
  ): TemplateResult {
    return html`<ha-form
      .hass=${this.hass}
      .data=${data ?? {}}
      .schema=${schema}
      .computeLabel=${this._label}
      @value-changed=${(e: CustomEvent) => {
        e.stopPropagation();
        onChange(e.detail.value);
      }}
    ></ha-form>`;
  }

  private _row(inner: TemplateResult, onRemove: () => void): TemplateResult {
    return html`<div class="row">
      <div class="row-form">${inner}</div>
      <button class="icon-btn" title="Entfernen" @click=${onRemove}>
        <ha-icon icon="mdi:delete-outline"></ha-icon>
      </button>
    </div>`;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;
    const c = this._config;

    return html`
      <ha-expansion-panel outlined .expanded=${true}>
        <div slot="header" class="ph"><ha-icon icon="mdi:tune"></ha-icon>Basis</div>
        <div class="section">
          ${this._form(
            {
              name: c.name,
              mode: c.mode ?? 'dwc',
              sparkline_hours: c.sparkline_hours ?? 24,
              show_chart: c.show_chart ?? true,
              chart_hours: c.chart_hours ?? 24,
            },
            SCHEMA_BASE,
            (v) => this._patch(v)
          )}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined .expanded=${true}>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:thermometer-water"></ha-icon>Klima &amp; VPD
        </div>
        <div class="section">
          ${this._form(c.climate ?? { leaf_offset: -2 }, SCHEMA_CLIMATE, (v) =>
            this._patchClimate(v)
          )}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:label-outline"></ha-icon>Header-Badges
        </div>
        <div class="section">
          ${(c.badges ?? []).map((b, i) =>
            this._row(
              this._form(b, SCHEMA_BADGE_ROW, (v) => this._listChange('badges', i, v)),
              () => this._listRemove('badges', i)
            )
          )}
          <button class="add" @click=${() => this._listAdd('badges', { entity: '' })}>
            <ha-icon icon="mdi:plus"></ha-icon> Badge hinzufügen
          </button>
          <p class="hint">
            Erscheint oben rechts neben dem Modus, sobald die Entität "an" ist –
            z.B. Klima Auto, Auto Main oder Wartungsmodus.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:counter"></ha-icon>Status-Boxen
        </div>
        <div class="section">
          ${(c.stats ?? []).map((s, i) =>
            this._row(
              this._form(s, SCHEMA_STAT_ROW, (v) => this._listChange('stats', i, v)),
              () => this._listRemove('stats', i)
            )
          )}
          <button class="add" @click=${() => this._listAdd('stats', { entity: '' })}>
            <ha-icon icon="mdi:plus"></ha-icon> Status-Box hinzufügen
          </button>
          <p class="hint">
            Kompakte Boxen unter dem Hero, z.B. Leistung (W) oder
            Status-Texte (Entfeuchter AN, Modus ...). Beliebige Entität wählbar.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:list-status"></ha-icon>Status-Ampel
        </div>
        <div class="section">
          ${this._form(c.status ?? {}, SCHEMA_STATUS, (v) =>
            this._emit({ ...c, status: { ...v } })
          )}
          <p class="hint">
            Automatische Status-Box ("✓ Alles OK" / Warnung / Fehler) aus
            Log-Schweregrad, Entfeuchter-Anforderung und Temperaturbereich.
            Erscheint, sobald hier etwas gesetzt ist oder Live-Logzeilen
            konfiguriert sind.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:text-box-outline"></ha-icon>Live-Logzeilen
        </div>
        <div class="section">
          ${(c.logs ?? []).map((l, i) =>
            this._row(
              this._form({ kind: 'station', ...l }, SCHEMA_LOGROW, (v) =>
                this._listChange('logs', i, v)
              ),
              () => this._listRemove('logs', i)
            )
          )}
          <button
            class="add"
            @click=${() => this._listAdd('logs', { entity: '', kind: 'station' })}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Logzeile hinzufügen
          </button>
          <p class="hint">
            Übersetzt GROWCTRL-Rohlogs in Klartext mit Farb-Schweregrad,
            z.B. "💡 Licht eingeschaltet — Pumpe AUS · O₂ AN". Format "Station"
            für Stations-Logs, "Klima" für das Klima-Log.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph"><ha-icon icon="mdi:gauge"></ha-icon>Zelt-Sensoren</div>
        <div class="section">
          ${(c.sensors ?? []).map((s, i) =>
            this._row(
              this._form(s, SCHEMA_SENSOR_ROW, (v) => this._listChange('sensors', i, v)),
              () => this._listRemove('sensors', i)
            )
          )}
          <button class="add" @click=${() => this._listAdd('sensors', { entity: '' })}>
            <ha-icon icon="mdi:plus"></ha-icon> Sensor hinzufügen
          </button>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:toggle-switch-outline"></ha-icon>Steuerung
        </div>
        <div class="section">
          ${(c.controls ?? []).map((ctl, i) =>
            this._row(
              this._form(ctl, SCHEMA_CONTROL_ROW, (v) => this._listChange('controls', i, v)),
              () => this._listRemove('controls', i)
            )
          )}
          <button
            class="add"
            @click=${() => this._listAdd('controls', { entity: '', confirm: false })}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Aktor hinzufügen
          </button>
          <p class="hint">
            Gleiche <b>Gruppe</b> = gemeinsames Raster mit Überschrift
            (z.B. "Licht · Direktschalten", "Automatik", "Geräte · Manuell").
            Pumpe und CO2 werden auch ohne Haken automatisch als kritisch
            behandelt (Bestätigungsdialog).
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:weather-sunny-clock"></ha-icon>Licht-Zeitplan
        </div>
        <div class="section">
          ${this._form(c.light_schedule ?? {}, SCHEMA_LIGHT, (v) =>
            this._emit({ ...c, light_schedule: { ...v } })
          )}
          <p class="hint">
            Laufzeitbalken im Hero (z.B. "noch 7h 15min"). Die Bloom/Flush-AUS-Zeit
            wird automatisch verwendet, sobald die aktuelle Phase Blüte oder Spülung ist.
            Mit Restzeit-Sensor zählt der Balken live herunter, nachts zeigt er
            "AN in ...".
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:water-pump"></ha-icon>Pumpen-Zeitplan
        </div>
        <div class="section">
          ${this._form(c.pump_schedule ?? {}, SCHEMA_PUMP, (v) =>
            this._emit({ ...c, pump_schedule: { ...v } })
          )}
          <p class="hint">
            Zyklusbalken im Hero. AN/AUS-Dauer wird je nach aktueller Phase aus
            den passenden input_number-Helpern gelesen. Der Pumpen-Status kommt
            wahlweise von einem Schalter oder wird aus dem Stations-Log
            (IST ... P=on) erkannt.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph"><ha-icon icon="mdi:sprout-outline"></ha-icon>Grow-Phasen</div>
        <div class="section">
          ${this._form(
            {
              phase_helper: c.grow?.phase_helper,
              phase_start_helper: c.grow?.phase_start_helper,
              grow_start_helper: c.grow?.grow_start_helper,
            },
            SCHEMA_GROW,
            (v) => this._emit({ ...c, grow: { ...(c.grow ?? {}), ...v } })
          )}
          <div class="sub">Phasenplan (für Fortschritt &amp; Timeline)</div>
          ${this._phases().map((p, i) =>
            this._row(
              this._form(p, SCHEMA_PHASE_ROW, (v) => {
                const phases = [...this._phases()];
                phases[i] = v;
                this._phasePatch(phases);
              }),
              () => {
                const phases = [...this._phases()];
                phases.splice(i, 1);
                this._phasePatch(phases);
              }
            )
          )}
          <button
            class="add"
            @click=${() => this._phasePatch([...this._phases(), { name: '', days: 14 }])}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Phase hinzufügen
          </button>
          <p class="hint">
            Leer lassen = Standardplan (Keimung, Steckling, Vegetativ, Blüte, Spülen).
            Die Phasennamen müssen zu den Optionen des input_select passen.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:cog-outline"></ha-icon>Konfigurations-Kacheln
        </div>
        <div class="section">
          ${this._settings().map(
            (g, gIdx) => html`<ha-expansion-panel outlined class="plant-panel">
              <div slot="header" class="ph">
                <ha-icon icon="mdi:tune-variant"></ha-icon>${g.title || `Gruppe ${gIdx + 1}`}
              </div>
              <div class="section">
                ${this._form({ title: g.title }, [{ name: 'title', selector: { text: {} } }], (v) =>
                  this._settingsGroupPatch(gIdx, v)
                )}
                <div class="sub">Kacheln dieser Gruppe</div>
                ${(g.items ?? []).map((it, iIdx) =>
                  this._row(
                    this._form(it, SCHEMA_SETTING_ROW, (v) =>
                      this._settingItemChange(gIdx, iIdx, v)
                    ),
                    () => {
                      const items = [...(g.items ?? [])];
                      items.splice(iIdx, 1);
                      this._settingsGroupPatch(gIdx, { items });
                    }
                  )
                )}
                <button
                  class="add"
                  @click=${() =>
                    this._settingsGroupPatch(gIdx, {
                      items: [...(g.items ?? []), { entity: '' }],
                    })}
                >
                  <ha-icon icon="mdi:plus"></ha-icon> Kachel hinzufügen
                </button>
                <button
                  class="remove"
                  @click=${() => {
                    const settings = [...this._settings()];
                    settings.splice(gIdx, 1);
                    this._settingsPatch(settings);
                  }}
                >
                  <ha-icon icon="mdi:delete-outline"></ha-icon> Gruppe entfernen
                </button>
              </div>
            </ha-expansion-panel>`
          )}
          <button
            class="add primary"
            @click=${() => this._settingsPatch([...this._settings(), { title: '', items: [] }])}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Gruppe hinzufügen
          </button>
          <p class="hint">
            Helper-Kacheln in der einklappbaren Konfigurations-Sektion der Karte,
            z.B. Gruppen "Lichtzeiten" oder "Pumpenzeiten · Seedling". Tap auf eine
            Kachel öffnet den HA-Einstellungsdialog. Die Phasen-Chips zum Umschalten
            erscheinen automatisch, sobald unter Grow-Phasen ein input_select gewählt ist.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined .expanded=${true}>
        <div slot="header" class="ph"><ha-icon icon="mdi:flower-outline"></ha-icon>Pflanzen</div>
        <div class="section">
          ${this._plants().map(
            (p, pIdx) => html`<ha-expansion-panel outlined class="plant-panel">
              <div slot="header" class="ph">
                <ha-icon icon="mdi:sprout"></ha-icon>${p.name || `Pflanze ${pIdx + 1}`}
              </div>
              <div class="section">
                ${this._form(
                  {
                    name: p.name,
                    strain: p.strain,
                    germination_helper: p.germination_helper,
                    calendar: p.calendar,
                  },
                  SCHEMA_PLANT_HEAD,
                  (v) => this._plantPatch(pIdx, v)
                )}
                <div class="sub">Sensoren dieser Pflanze</div>
                ${(p.sensors ?? []).map((s, sIdx) =>
                  this._row(
                    this._form(s, SCHEMA_SENSOR_ROW, (v) =>
                      this._plantSensorChange(pIdx, sIdx, v)
                    ),
                    () => this._plantSensorRemove(pIdx, sIdx)
                  )
                )}
                <button class="add" @click=${() => this._plantSensorAdd(pIdx)}>
                  <ha-icon icon="mdi:plus"></ha-icon> Sensor hinzufügen
                </button>
                <button class="remove" @click=${() => this._plantRemove(pIdx)}>
                  <ha-icon icon="mdi:delete-outline"></ha-icon> Pflanze entfernen
                </button>
              </div>
            </ha-expansion-panel>`
          )}
          <button class="add primary" @click=${this._plantAdd}>
            <ha-icon icon="mdi:plus"></ha-icon> Pflanze hinzufügen
          </button>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:tools"></ha-icon>Experten-Modus
        </div>
        <div class="section">
          <div class="sub">Schalter (Wartung, Test ...)</div>
          ${(c.expert?.controls ?? []).map((ctl, i) =>
            this._row(
              this._form(ctl, SCHEMA_CONTROL_ROW, (v) => {
                const controls = [...(c.expert?.controls ?? [])];
                controls[i] = v;
                this._expertPatch({ controls });
              }),
              () => {
                const controls = [...(c.expert?.controls ?? [])];
                controls.splice(i, 1);
                this._expertPatch({ controls });
              }
            )
          )}
          <button
            class="add"
            @click=${() =>
              this._expertPatch({
                controls: [...(c.expert?.controls ?? []), { entity: '' }],
              })}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Schalter hinzufügen
          </button>

          <div class="sub">Logs (Text-/Sensor-Entitäten)</div>
          ${(c.expert?.logs ?? []).map((log, i) =>
            this._row(
              this._form(log, SCHEMA_LOG_ROW, (v) => {
                const logs = [...(c.expert?.logs ?? [])];
                logs[i] = v;
                this._expertPatch({ logs });
              }),
              () => {
                const logs = [...(c.expert?.logs ?? [])];
                logs.splice(i, 1);
                this._expertPatch({ logs });
              }
            )
          )}
          <button
            class="add"
            @click=${() =>
              this._expertPatch({ logs: [...(c.expert?.logs ?? []), { entity: '' }] })}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Log hinzufügen
          </button>
          <p class="hint">
            Erscheint als einklappbare Sektion am Ende der Karte. Schalter im
            Experten-Modus verlangen standardmäßig eine Bestätigung.
          </p>
        </div>
      </ha-expansion-panel>
    `;
  }

  static styles = css`
    ha-expansion-panel {
      display: block;
      margin-bottom: 10px;
      --expansion-panel-summary-padding: 0 12px;
    }
    .ph {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .ph ha-icon {
      --mdc-icon-size: 18px;
      color: var(--primary-color);
    }
    .section {
      padding: 4px 12px 12px;
    }
    ha-form {
      display: block;
      margin-bottom: 8px;
    }
    .row {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      padding: 10px 8px 2px;
      margin-bottom: 8px;
      border: 1px dashed var(--divider-color);
      border-radius: 10px;
    }
    .row-form {
      flex: 1;
      min-width: 0;
    }
    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 6px;
    }
    .icon-btn:hover {
      color: var(--error-color, #cf5b4c);
    }
    .add,
    .remove {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      margin: 4px 8px 4px 0;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      font: inherit;
      font-size: 0.85em;
      cursor: pointer;
    }
    .add.primary {
      border-color: var(--primary-color);
      color: var(--primary-color);
      font-weight: 600;
    }
    .remove {
      color: var(--error-color, #cf5b4c);
    }
    .add ha-icon,
    .remove ha-icon {
      --mdc-icon-size: 16px;
    }
    .sub {
      font-size: 0.8em;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 10px 0 6px;
    }
    .hint {
      font-size: 0.78em;
      color: var(--secondary-text-color);
      margin: 6px 0 0;
    }
    .plant-panel {
      margin: 8px 0;
    }
  `;
}

customElements.define('growctrl-tent-card-editor', GrowctrlTentCardEditor);

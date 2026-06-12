/*==============================================================================
 * GROWCTRL – core/editor-base
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Gemeinsame Editor-Basis: ha-form-Rendering + generischer Listen-Editor (Zeilen hinzufuegen/entfernen). Alle Karten-Editoren bauen NUR hierauf auf.
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import type { HomeAssistant } from "./types";

export interface ListOpts {
  key: string;                 // Config-Schluessel des Arrays
  rowSchema: any[];            // ha-form-Schema einer Zeile
  addLabel: string;
  newItem: () => any;
  title?: string;
}

export abstract class GrowctrlEditorBase extends LitElement {
  static properties = { hass: { attribute: false }, _config: { state: true } };
  hass!: HomeAssistant;
  protected _config: any = {};

  static styles = css`
    .lt { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .5px;
          color: var(--secondary-text-color); margin: 16px 0 6px; }
    .row { display: flex; align-items: flex-start; gap: 4px;
           border: 1px solid var(--divider-color); border-radius: 8px; padding: 8px; margin-bottom: 8px; }
    .row ha-form { flex: 1; min-width: 0; }
    button.del { all: unset; cursor: pointer; color: var(--secondary-text-color);
                 font-size: 16px; padding: 4px 8px; line-height: 1; }
    button.del:hover { color: var(--error-color, #db4437); }
    button.add { all: unset; cursor: pointer; color: var(--primary-color);
                 font-size: 13px; font-weight: 600; padding: 4px 0; }
    .hint { font-size: 11px; color: var(--secondary-text-color); margin-top: 12px; }
  `;

  setConfig(config: any) { this._config = { ...config }; }

  protected _fire(cfg: any) {
    this._config = cfg;
    this.dispatchEvent(new CustomEvent("config-changed",
      { detail: { config: cfg }, bubbles: true, composed: true }));
  }

  private _label = (s: any) => s.label ?? s.name;

  /** Flaches ha-form ueber die Top-Level-Konfiguration. */
  protected form(schema: any[]): TemplateResult {
    return html`<ha-form .hass=${this.hass} .data=${this._config} .schema=${schema}
      .computeLabel=${this._label}
      @value-changed=${(e: CustomEvent) => this._fire({ ...this._config, ...e.detail.value })}></ha-form>`;
  }

  /** Generischer Listen-Editor: je Zeile ein ha-form + Loeschen, darunter Hinzufuegen. */
  protected list(o: ListOpts): TemplateResult {
    const items: any[] = this._config[o.key] ?? [];
    const set = (arr: any[]) => this._fire({ ...this._config, [o.key]: arr });
    return html`
      ${o.title ? html`<div class="lt">${o.title}</div>` : nothing}
      ${items.map((it, i) => html`<div class="row">
        <ha-form .hass=${this.hass} .data=${it} .schema=${o.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${(e: CustomEvent) => { const a = [...items]; a[i] = { ...e.detail.value }; set(a); }}></ha-form>
        <button class="del" title="Entfernen"
          @click=${() => set(items.filter((_, j) => j !== i))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${() => set([...items, o.newItem()])}>+ ${o.addLabel}</button>`;
  }

  /** Zelt-Auswahl als echtes Dropdown (Quelle: Integrations-Attribute). */
  protected tentSelect(name = "tent", label = "Zelt") {
    const opts = gcRegistry(this.hass).tents;
    return { name, label, selector: { select: {
      options: opts, custom_value: true, mode: "dropdown" } } };
  }

  /** Stations-Auswahl (gefiltert auf das gewaehlte Zelt). */
  protected stationSelect(tent: string | undefined, name = "station", label = "Station") {
    const reg = gcRegistry(this.hass);
    const opts = tent ? (reg.stations[tent] ?? []) :
      [...new Set(Object.values(reg.stations).flat())];
    return { name, label, selector: { select: {
      options: opts, custom_value: true, mode: "dropdown" } } };
  }

  /** Stil-Sektion (alle Karten): Hintergrund, Deckkraft, Glas, Akzent, Radius. */
  protected styleSection(): TemplateResult {
    const style = this._config.style ?? {};
    const schema = [
      SEL.text("background", "Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),
      SEL.num("opacity", "Deckkraft (0\u20131)", 0, 1, 0.05),
      SEL.bool("glass", "Glas-Effekt (Blur)"),
      SEL.text("accent", "Akzentfarbe"),
      SEL.num("radius", "Eckenradius (px)", 0, 40),
    ];
    return html`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${style} .schema=${schema}
        .computeLabel=${(s: any) => s.label ?? s.name}
        @value-changed=${(e: CustomEvent) =>
          this._fire({ ...this._config, style: { ...e.detail.value } })}></ha-form>`;
  }
}

import { gcRegistry } from "./registry";

/* Wiederverwendete Schema-Bausteine */
export const SEL = {
  text: (name: string, label: string) => ({ name, label, selector: { text: {} } }),
  bool: (name: string, label: string) => ({ name, label, selector: { boolean: {} } }),
  num: (name: string, label: string, min?: number, max?: number, step?: number) =>
    ({ name, label, selector: { number: { min, max, step, mode: "box" } } }),
  entity: (name: string, label: string, domain?: string | string[]) =>
    ({ name, label, selector: { entity: domain ? { domain } : {} } }),
  entities: (name: string, label: string, domain?: string | string[]) =>
    ({ name, label, selector: { entity: { multiple: true, ...(domain ? { domain } : {}) } } }),
  select: (name: string, label: string, options: { value: string; label: string }[]) =>
    ({ name, label, selector: { select: { mode: "dropdown", options } } }),
};

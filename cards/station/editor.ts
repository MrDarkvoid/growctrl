/*==============================================================================
 * GROWCTRL – growctrl-station-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor der Station-Karte: Profil (Zelt/Station) + Hardware-Switches + Anzeigeoptionen. overrides/templates bleiben YAML (Experten-Feature).
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html, nothing } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const SCHEMA = [
  SEL.text("name", "Anzeigename"),
  SEL.select("system", "Systemtyp", [
    { value: "generic", label: "Generisch" },
    { value: "dwc", label: "DWC (Wasserkultur)" },
    { value: "soil", label: "Erde" }]),
  SEL.text("tent", "Zelt (Profil, z.B. mittel)"),
  SEL.text("station_id", "Station (Profil, z.B. main1)"),
  SEL.entity("light_switch", "Licht-Switch (Hardware, Pflicht)", "switch"),
  SEL.entity("pump_switch", "Pumpen-Switch (optional)", "switch"),
  SEL.entity("o2_switch", "O\u2082-Switch (optional)", "switch"),
  SEL.entity("fan_switch", "Umluft-Switch (optional)", "switch"),
  SEL.bool("show_stage_chips", "Phasen-Chips anzeigen"),
  SEL.bool("show_settings", "Konfigurations-Kacheln anzeigen"),
];

export class GrowctrlStationEditor extends GrowctrlEditorBase {
  private _origStation: any = {};

  /** station-Objekt fuer das Formular flach machen ... */
  setConfig(config: any) {
    const p = config.station ?? {};
    this._origStation = p;
    this._config = {
      ...config,
      tent: p.tent ?? "", station_id: p.station ?? "",
      light_switch: p.light_switch, pump_switch: p.pump_switch,
      o2_switch: p.o2_switch, fan_switch: p.fan_switch,
    };
  }
  /** ... und beim Feuern wieder zusammensetzen (overrides/templates unangetastet). */
  protected _fire(flat: any) {
    const { tent, station_id, light_switch, pump_switch, o2_switch, fan_switch, ...rest } = flat;
    const prev = this._origStation;
    const cfg = {
      ...rest,
      station: {
        ...prev,
        tent: tent ?? "", station: station_id ?? "",
        light_switch, pump_switch, o2_switch, fan_switch,
      },
    };
    this._config = flat;
    this.dispatchEvent(new CustomEvent("config-changed",
      { detail: { config: cfg }, bubbles: true, composed: true }));
  }
  /** Sollbereich-Zeile (Entity + Min + Max) fuer DWC-/Erde-Werte. */
  private range(group: "dwc" | "soil", key: string, label: string) {
    const data = (this._config[group] ?? {})[key] ?? {};
    const schema = [SEL.entity("entity", label, "sensor"), SEL.num("min", "Min"), SEL.num("max", "Max")];
    return html`<div class="row"><ha-form .hass=${this.hass} .data=${data} .schema=${schema}
      .computeLabel=${(s: any) => s.label ?? s.name}
      @value-changed=${(e: CustomEvent) => {
        const g = { ...(this._config[group] ?? {}), [key]: { ...e.detail.value } };
        this._fire({ ...this._config, [group]: g });
      }}></ha-form></div>`;
  }

  render() {
    const sys = this._config.system ?? "generic";
    return html`${this.form(SCHEMA)}
      ${sys === "dwc" ? html`<div class="lt">DWC-Wasserwerte (Ampel bei Sollbereich-Verletzung)</div>
        ${this.range("dwc", "ec", "EC-Sensor")}
        ${this.range("dwc", "ph", "pH-Sensor")}
        ${this.range("dwc", "water_temp", "Wassertemperatur-Sensor")}
        ${this.range("dwc", "level", "F\u00fcllstand-Sensor")}` : nothing}
      ${sys === "soil" ? html`<div class="lt">Erde-Bodenwerte (Ampel bei Sollbereich-Verletzung)</div>
        ${this.range("soil", "moisture", "Bodenfeuchte-Sensor")}
        ${this.range("soil", "soil_temp", "Bodentemperatur-Sensor")}
        ${this.range("soil", "ec", "EC-Sensor")}
        ${this.range("soil", "ph", "pH-Sensor")}` : nothing}
      ${this.styleSection()}
      <div class="hint">Erweitert (nur YAML): <code>station.overrides</code> /
        <code>station.templates</code> zum \u00dcberschreiben einzelner Rollen bzw. des Namensschemas.</div>`;
  }
}
customElements.define("growctrl-station-editor", GrowctrlStationEditor);

/*==============================================================================
 * GROWCTRL – growctrl-hero-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor der Hero-Karte: Klima/Leistung, globale Schalter, Controls-/Log-Listen, Problem-Sensoren, Chart, Stil.
 * Version : 2.2.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "Titel"),
  SEL.text("logo", "Logo-URL (z.B. /local/growctrl/logo.png)"),
  SEL.entity("temperature", "Temperatursensor (Pflicht)", "sensor"),
  SEL.entity("humidity", "Feuchtesensor (Pflicht)", "sensor"),
  SEL.num("leaf_offset", "Blatt-Offset (K)", -5, 5, 0.5),
  SEL.entity("power", "Gesamtleistung (optional)", "sensor"),
  SEL.entity("tent_enable", "Zelt aktiv (Hauptschalter)", ["input_boolean", "switch"]),
  SEL.entity("climate_enable", "Klima aktiv", ["input_boolean", "switch"]),
  SEL.entities("problem_sensors", "Problem-Sensoren (binary_sensor)", ["binary_sensor", "sensor"]),
  SEL.num("hours", "Chart-Zeitraum (h)", 1, 168),
  SEL.bool("show_chart", "VPD-Chart anzeigen"),
];
const CTRL_ROW = [
  SEL.entity("entity", "Schalter", ["switch", "input_boolean", "light", "fan"]),
  SEL.text("name", "Name (optional)"), SEL.text("icon", "Icon (mdi:..., optional)"),
];
const LOG_ROW = [
  SEL.entity("entity", "Log-Entity", "input_text"), SEL.text("name", "Label (optional)"),
  SEL.select("type", "Typ", [{ value: "station", label: "Station" }, { value: "climate", label: "Klima" }]),
];

export class GrowctrlHeroEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "controls", rowSchema: CTRL_ROW, title: "Globale Schalter",
        addLabel: "Schalter hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.list({ key: "logs", rowSchema: LOG_ROW, title: "Logs (Informationssystem)",
        addLabel: "Log hinzuf\u00fcgen", newItem: () => ({ entity: "", type: "station" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-hero-editor", GrowctrlHeroEditor);

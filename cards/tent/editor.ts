/*==============================================================================
 * GROWCTRL – growctrl-tent-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Vollstaendiger GUI-Editor der Tent-Karte (ha-form + Log-Liste).
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "Titel"), SEL.text("subtitle", "Untertitel"),
  SEL.entity("temperature", "Temperatursensor (Pflicht)", "sensor"),
  SEL.entity("humidity", "Feuchtesensor (Pflicht)", "sensor"),
  SEL.entity("power", "Leistungssensor (optional)", "sensor"),
  SEL.num("leaf_offset", "Blatt-Offset (K, z.B. -1.5)", -5, 5),
  SEL.text("gradient", "Gradient (z.B. #E87B2E,#C45A10)"),
  SEL.entity("climate_auto", "Klima-Automatik (Badge)", "input_boolean"),
  SEL.entity("maintenance", "Wartung (Badge)", "input_boolean"),
  SEL.entity("dehum_request", "Entfeuchter-Anforderung", "input_boolean"),
  SEL.num("temp_min", "Temp-Warnung unter (\u00b0C)"), SEL.num("temp_max", "Temp-Warnung \u00fcber (\u00b0C)"),
  SEL.bool("show_vpd_scale", "VPD-Skala anzeigen"),
  SEL.text("tap_navigation", "Navigation bei Tap (z.B. /grow-zelt/gz_mittel)"),
];
const LOG_ROW = [
  SEL.entity("entity", "Log-Entity", "input_text"),
  SEL.select("type", "Typ", [
    { value: "station", label: "Station" }, { value: "climate", label: "Klima" }]),
];

export class GrowctrlTentEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "logs", rowSchema: LOG_ROW, title: "Logs (Status-Ampel)",
        addLabel: "Log hinzuf\u00fcgen", newItem: () => ({ entity: "", type: "station" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-tent-editor", GrowctrlTentEditor);

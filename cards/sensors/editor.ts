/*==============================================================================
 * GROWCTRL – growctrl-sensors-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Titel/Spalten + Sensor-Liste (Entity, Name, Sollbereich, Akzent).
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [SEL.text("title", "Titel"), SEL.num("columns", "Spalten", 1, 6)];
const ROW = [
  SEL.entity("entity", "Sensor", "sensor"), SEL.text("name", "Name (optional)"),
  SEL.num("min", "Sollbereich Min (optional)"), SEL.num("max", "Sollbereich Max (optional)"),
  SEL.select("accent", "Akzentfarbe (optional)", [
    { value: "temp", label: "Temperatur (orange)" },
    { value: "hum", label: "Feuchte (blau)" },
    { value: "vpd", label: "VPD (Akzent)" }]),
];

export class GrowctrlSensorsEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "sensors", rowSchema: ROW, title: "Sensoren",
        addLabel: "Sensor hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-sensors-editor", GrowctrlSensorsEditor);

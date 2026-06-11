/*==============================================================================
 * GROWCTRL – growctrl-checkup-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor der Checkup-Karte: Zeilen (Name + Quelle + Typ), Kompaktmodus, Stil.
 * Version : 2.2.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [SEL.text("title", "Titel"), SEL.bool("compact", "Kompakte Zeilen")];
const ROW = [
  SEL.text("name", "Name (z.B. Main 1)"),
  SEL.entity("entity", "Quelle (Log oder Problem-Sensor)", ["input_text", "binary_sensor", "sensor"]),
  SEL.select("type", "Typ", [
    { value: "station", label: "Stations-Log" },
    { value: "climate", label: "Klima-Log" },
    { value: "problem", label: "Problem-Sensor" }]),
];

export class GrowctrlCheckupEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "rows", rowSchema: ROW, title: "Zeilen",
        addLabel: "Zeile hinzuf\u00fcgen", newItem: () => ({ name: "", entity: "", type: "station" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-checkup-editor", GrowctrlCheckupEditor);

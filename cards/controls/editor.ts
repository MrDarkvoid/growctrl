/*==============================================================================
 * GROWCTRL – growctrl-controls-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Titel/Spalten + Aktoren-Liste (Entity, Name, Gruppe, Art, Bestaetigung).
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [SEL.text("title", "Titel"), SEL.num("columns", "Spalten", 1, 6)];
const ROW = [
  SEL.entity("entity", "Aktor", ["switch", "input_boolean", "light", "fan"]),
  SEL.text("name", "Name (optional)"),
  SEL.text("group", "Gruppe (optional, z.B. Zelt / Pflanzen)"),
  SEL.select("kind", "Art (Farbe/Icon, optional)", [
    { value: "light", label: "Licht" }, { value: "heat", label: "Heizung" },
    { value: "water", label: "Wasser / Befeuchter" }, { value: "o2", label: "O\u2082" },
    { value: "fan", label: "L\u00fcfter" }, { value: "pump", label: "Pumpe" }]),
  SEL.bool("confirm", "Mit Best\u00e4tigung schalten"),
];

export class GrowctrlControlsEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "controls", rowSchema: ROW, title: "Aktoren",
        addLabel: "Aktor hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-controls-editor", GrowctrlControlsEditor);

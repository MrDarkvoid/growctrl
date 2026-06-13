/*==============================================================================
 * GROWCTRL – growctrl-controls-card Editor
 * Zweck   : GUI-Editor: Titel/Spalten + Aktoren-Liste (Entity, Anzeigename,
 *           Gruppe, Art, Bestaetigung). Mit Icons + Hilfetext.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [SEL.text("title", "\ud83c\udff7\ufe0f Titel"), SEL.num("columns", "\u25a6 Spalten", 1, 6)];
const ROW = [
  SEL.entity("entity", "\ud83d\udd0c Aktor", ["switch", "input_boolean", "light", "fan"]),
  SEL.text("name", "\u270f\ufe0f Anzeigename (optional)"),
  SEL.text("group", "\ud83d\uddc2\ufe0f Gruppe (optional, z.B. Zelt / Pflanzen)"),
  SEL.select("kind", "\ud83c\udfa8 Art (Farbe/Icon, optional)", [
    { value: "light", label: "Licht" }, { value: "heat", label: "Heizung" },
    { value: "water", label: "Wasser / Befeuchter" }, { value: "o2", label: "O\u2082" },
    { value: "fan", label: "L\u00fcfter" }, { value: "pump", label: "Pumpe" }]),
  SEL.bool("confirm", "\u2705 Mit Best\u00e4tigung schalten"),
];

export class GrowctrlControlsEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "controls", rowSchema: ROW, title: "\ud83d\udd0c Aktoren",
        addLabel: "Aktor hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.styleSection()}
      <div class="hint">Gleiche <b>Gruppe</b> = gemeinsame \u00dcberschrift. <b>Art</b> setzt Farbe und Icon.
        <b>Best\u00e4tigung</b> fragt vor dem Schalten nach (z.B. f\u00fcr Pumpen).</div>`;
  }
}
customElements.define("growctrl-controls-editor", GrowctrlControlsEditor);

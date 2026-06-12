/*==============================================================================
 * GROWCTRL – growctrl-status-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Quellen (Letztes-Ereignis-Sensoren), Zeilenlimit, Stil.
 * Version : 2.4.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "Titel"), SEL.num("limit", "Max. Zeilen", 3, 50),
  SEL.select("min_level", "Anzeige", [
    { value: "alle", label: "Alle Ereignisse" },
    { value: "warnung", label: "Nur Warnungen/Fehler" }]),
];
const ROW = [
  SEL.entity("entity", "Letztes-Ereignis-Sensor", "sensor"),
  SEL.text("name", "Label (optional)"),
];

export class GrowctrlStatusEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "sources", rowSchema: ROW, title: "Quellen",
        addLabel: "Quelle hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-status-editor", GrowctrlStatusEditor);

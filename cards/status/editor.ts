/*==============================================================================
 * GROWCTRL – growctrl-status-card Editor
 * Zweck   : GUI-Editor: Quellen (Letztes-Ereignis-Sensoren) mit Anzeigename,
 *           Zeilenlimit, Filter, Stil. Mit Icons + Hilfetext.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "\ud83c\udff7\ufe0f Titel"), SEL.num("limit", "\ud83d\udccb Max. Zeilen", 3, 50),
  SEL.select("min_level", "\ud83d\udd0d Anzeige", [
    { value: "alle", label: "Alle Ereignisse" },
    { value: "warnung", label: "Nur Warnungen/Fehler" }]),
];
const ROW = [
  SEL.entity("entity", "\ud83d\udcdc Letztes-Ereignis-Sensor", "sensor"),
  SEL.text("name", "\u270f\ufe0f Label (optional)"),
];

export class GrowctrlStatusEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "sources", rowSchema: ROW, title: "\ud83d\udce1 Quellen",
        addLabel: "Quelle hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.styleSection()}
      <div class="hint">Sammelt die Ereignisse mehrerer GROWCTRL-Sensoren in ein Protokoll, neueste zuerst.
        <b>Label</b> ersetzt den Quellennamen. <b>Anzeige</b> kann auf Warnungen/Fehler filtern.</div>`;
  }
}
customElements.define("growctrl-status-editor", GrowctrlStatusEditor);

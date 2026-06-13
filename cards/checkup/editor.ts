/*==============================================================================
 * GROWCTRL – growctrl-checkup-card Editor
 * Zweck   : GUI-Editor der Checkup-MATRIX: Zelt waehlen, Zelt-Sektion optional,
 *           Stationen-Liste (Station + Anzeigename). Mit Icons + Hilfetext.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

export class GrowctrlCheckupEditor extends GrowctrlEditorBase {
  render() {
    const tent = this._config.tent;
    const MAIN = [
      this.tentSelect("tent", "\ud83c\udfd5\ufe0f Zelt"),
      SEL.text("title", "\ud83c\udff7\ufe0f Titel"),
      SEL.bool("show_tent_row", "\ud83c\udfd5\ufe0f Zelt-Sektion zeigen (Aktiv/Klima/VPD/Status)"),
      SEL.text("tent_name", "\u270f\ufe0f Name der Zelt-Zeile (optional)"),
    ];
    const ROW = [
      this.stationSelect(tent, "station", "\ud83c\udf31 Station"),
      SEL.text("name", "\u270f\ufe0f Anzeigename (optional)"),
    ];
    return html`${this.form(MAIN)}
      ${this.list({ key: "stations", rowSchema: ROW, title: "\ud83c\udf31 Stationen",
        addLabel: "Station hinzuf\u00fcgen", newItem: () => ({ station: "" }) })}
      ${this.styleSection()}
      <div class="hint">Zwei Ampel-Sektionen: <b>Stationen</b> (Licht / Pumpe / Auto / Eingriff / Status) und
        <b>Zelt</b> (Aktiv / Klima / VPD / Status). Ein <b>grauer</b> Punkt bedeutet \u201enicht aktiv / nicht
        relevant\u201c, gr\u00fcn = OK, gelb = Warnung, rot = kritisch. Tippen \u00f6ffnet die Entit\u00e4t.</div>`;
  }
}
customElements.define("growctrl-checkup-editor", GrowctrlCheckupEditor);

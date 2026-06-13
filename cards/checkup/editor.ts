/*==============================================================================
 * GROWCTRL – growctrl-checkup-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor der Checkup-MATRIX: Zelt waehlen, Zelt-Zeile optional,
 *           Stationen-Liste (Station + Anzeigename). Punkte = Licht/Pumpe/Klima/Status.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

export class GrowctrlCheckupEditor extends GrowctrlEditorBase {
  render() {
    const tent = this._config.tent;
    const MAIN = [
      this.tentSelect("tent", "Zelt"),
      SEL.text("title", "Titel"),
      SEL.bool("show_tent_row", "Zelt-Zeile zeigen (Klima/Status)"),
      SEL.text("tent_name", "Name der Zelt-Zeile (optional)"),
    ];
    const ROW = [
      this.stationSelect(tent, "station", "Station"),
      SEL.text("name", "Anzeigename (optional)"),
    ];
    return html`${this.form(MAIN)}
      ${this.list({ key: "stations", rowSchema: ROW, title: "Stationen",
        addLabel: "Station hinzuf\u00fcgen", newItem: () => ({ station: "" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-checkup-editor", GrowctrlCheckupEditor);

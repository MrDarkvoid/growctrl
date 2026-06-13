/*==============================================================================
 * GROWCTRL – growctrl-tent-card Editor
 * Zweck   : GUI-Editor: Zelt-Name, Anzeigename, Chart, Stil. Mit Icons + Hilfetext.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

export class GrowctrlTentEditor extends GrowctrlEditorBase {
  render() {
    const main = [
      this.tentSelect("tent", "\ud83c\udfd5\ufe0f Zelt"),
      SEL.text("name", "\u270f\ufe0f Anzeigename (optional)"),
      SEL.bool("show_chart", "\ud83d\udcc8 VPD-Chart anzeigen"),
      SEL.num("hours", "\u23f1\ufe0f Chart-Zeitraum (h)", 1, 168),
    ];
    return html`${this.form(main)}${this.styleSection()}
      <div class="hint">Zeigt Klima-Werte (Temperatur/Feuchte/VPD), die VPD-Zonenskala, Modus (VPD/RH) und
        die <b>Phase</b> als Dropdown. Zelt- und Klima-Schalter steuern die Automatik.</div>`;
  }
}
customElements.define("growctrl-tent-editor", GrowctrlTentEditor);

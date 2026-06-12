/*==============================================================================
 * GROWCTRL – growctrl-tent-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Zelt-Name, Anzeigename, Chart, Stil.
 * Version : 2.4.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

export class GrowctrlTentEditor extends GrowctrlEditorBase {
  render() {
    const main = [
      this.tentSelect(),
      SEL.text("name", "Anzeigename (optional)"),
      SEL.bool("show_chart", "VPD-Chart anzeigen"),
      SEL.num("hours", "Chart-Zeitraum (h)", 1, 168),
    ];
    return html`${this.form(main)}${this.styleSection()}`;
  }
}
customElements.define("growctrl-tent-editor", GrowctrlTentEditor);

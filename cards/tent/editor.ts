/*==============================================================================
 * GROWCTRL – growctrl-tent-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Zelt-Name, Anzeigename, Chart, Stil.
 * Version : 2.4.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("tent", "Zelt (Name wie in der Integration, z.B. gross)"),
  SEL.text("name", "Anzeigename (optional)"),
  SEL.bool("show_chart", "VPD-Chart anzeigen"),
  SEL.num("hours", "Chart-Zeitraum (h)", 1, 168),
];

export class GrowctrlTentEditor extends GrowctrlEditorBase {
  render() { return html`${this.form(MAIN)}${this.styleSection()}`; }
}
customElements.define("growctrl-tent-editor", GrowctrlTentEditor);

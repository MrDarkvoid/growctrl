/*==============================================================================
 * GROWCTRL – growctrl-hero-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Zelt, Titel/Logo, Stationsliste fuer das Informationssystem, Chart, Stil.
 * Version : 2.4.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("tent", "Zelt (Name wie in der Integration, z.B. gross)"),
  SEL.text("title", "Titel (optional)"),
  SEL.text("logo", "Logo-URL (z.B. /local/growctrl/logo.png)"),
  SEL.bool("show_chart", "VPD-Chart anzeigen"),
  SEL.num("hours", "Chart-Zeitraum (h)", 1, 168),
];
const ROW = [SEL.text("station", "Station (z.B. main1)"), SEL.text("name", "Label (optional)")];

export class GrowctrlHeroEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "stations", rowSchema: ROW, title: "Stationen (Informationssystem)",
        addLabel: "Station hinzuf\u00fcgen", newItem: () => ({ station: "" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-hero-editor", GrowctrlHeroEditor);

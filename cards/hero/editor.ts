/*==============================================================================
 * GROWCTRL – growctrl-hero-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Zelt, Titel/Logo, Stationsliste fuer das Informationssystem, Chart, Stil.
 * Version : 2.4.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "Titel (optional)"),
  SEL.text("logo", "Logo-URL (z.B. /local/growctrl/logo.png)"),
  SEL.bool("show_chart", "24h-Chart zus\u00e4tzlich zum Zonen-Balken anzeigen"),
  SEL.num("hours", "Chart-Zeitraum (h)", 1, 168),
];
export class GrowctrlHeroEditor extends GrowctrlEditorBase {
  render() {
    const row = [this.stationSelect(this._config?.tent), SEL.text("name", "Label (optional)")];
    return html`${this.form([this.tentSelect(), ...MAIN])}
      ${this.list({ key: "stations", rowSchema: row, title: "Stationen (Informationssystem)",
        addLabel: "Station hinzuf\u00fcgen", newItem: () => ({ station: "" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-hero-editor", GrowctrlHeroEditor);

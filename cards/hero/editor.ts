/*==============================================================================
 * GROWCTRL – growctrl-hero-card Editor
 * Zweck   : GUI-Editor: Zelt, Titel/Logo, Stationsliste (Informationssystem),
 *           Chart, Stil. Mit Icons + Hilfetext + Anzeigenamen.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "\ud83c\udff7\ufe0f Titel (optional)"),
  SEL.text("logo", "\ud83d\uddbc\ufe0f Logo-URL (z.B. /local/growctrl/logo.png)"),
  SEL.bool("show_chart", "\ud83d\udcc8 24h-Chart zus\u00e4tzlich zum Zonen-Balken"),
  SEL.num("hours", "\u23f1\ufe0f Chart-Zeitraum (h)", 1, 168),
];
export class GrowctrlHeroEditor extends GrowctrlEditorBase {
  render() {
    const row = [this.stationSelect(this._config?.tent), SEL.text("name", "\u270f\ufe0f Anzeigename (optional)")];
    return html`${this.form([this.tentSelect("tent", "\ud83c\udfd5\ufe0f Zelt"), ...MAIN])}
      ${this.list({ key: "stations", rowSchema: row, title: "\ud83c\udf31 Stationen (Informationssystem)",
        addLabel: "Station hinzuf\u00fcgen", newItem: () => ({ station: "" }) })}
      ${this.styleSection()}
      <div class="hint">Die Hero-Karte ist die Zelt-\u00dcbersicht: Klima-Werte, VPD-Skala und das
        Informationssystem. Die gelisteten <b>Stationen</b> liefern die Ereigniszeilen darunter.</div>`;
  }
}
customElements.define("growctrl-hero-editor", GrowctrlHeroEditor);

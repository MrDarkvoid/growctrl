/*==============================================================================
 * GROWCTRL – growctrl-history-card Editor
 * Zweck   : GUI-Editor: Zeitraum/Hoehe + Sensor-Serien (Entity, Anzeigename, Farbe).
 *           Mit Icons + Hilfetext.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "\ud83c\udff7\ufe0f Titel"),
  SEL.num("hours", "\u23f1\ufe0f Zeitraum (h)", 1, 168),
  SEL.num("height", "\ud83d\udccf Diagrammh\u00f6he (px)", 80, 300),
];
const ROW = [
  SEL.entity("entity", "\ud83d\udcc8 Sensor", "sensor"),
  SEL.text("name", "\u270f\ufe0f Anzeigename (optional)"),
  SEL.text("color", "\ud83c\udfa8 Farbe (optional, z.B. #FF9F5A)"),
];

export class GrowctrlHistoryEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "sensors", rowSchema: ROW, title: "\ud83d\udcc9 Serien",
        addLabel: "Sensor hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.styleSection()}
      <div class="hint">Mehrere Serien werden in ein Diagramm gezeichnet (z.B. Temperatur + Luftfeuchte).
        <b>Farbe</b> als Hex-Wert; ohne Angabe automatisch.</div>`;
  }
}
customElements.define("growctrl-history-editor", GrowctrlHistoryEditor);

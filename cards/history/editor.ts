/*==============================================================================
 * GROWCTRL – growctrl-history-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor der History-Karte: Zeitraum/Hoehe + Sensor-Serien mit Farbe, Stil.
 * Version : 2.2.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "Titel"),
  SEL.num("hours", "Zeitraum (h)", 1, 168),
  SEL.num("height", "Diagrammh\u00f6he (px)", 80, 300),
];
const ROW = [
  SEL.entity("entity", "Sensor", "sensor"),
  SEL.text("name", "Name (optional)"), SEL.text("color", "Farbe (optional, z.B. #FF9F5A)"),
];

export class GrowctrlHistoryEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "sensors", rowSchema: ROW, title: "Serien",
        addLabel: "Sensor hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-history-editor", GrowctrlHistoryEditor);

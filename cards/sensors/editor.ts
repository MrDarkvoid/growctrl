/*==============================================================================
 * GROWCTRL – growctrl-sensors-card Editor
 * Zweck   : GUI-Editor: Titel/Spalten + Sensor-Liste (Entity, Anzeigename,
 *           Sollbereich, Akzentfarbe). Mit Icons + Hilfetext.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [SEL.text("title", "\ud83c\udff7\ufe0f Titel"), SEL.num("columns", "\u25a6 Spalten", 1, 6)];
const ROW = [
  SEL.entity("entity", "\ud83d\udcc8 Sensor", "sensor"),
  SEL.text("name", "\u270f\ufe0f Anzeigename (optional)"),
  SEL.num("min", "Sollbereich Min (optional)"), SEL.num("max", "Sollbereich Max (optional)"),
  SEL.select("accent", "\ud83c\udfa8 Akzentfarbe (optional)", [
    { value: "temp", label: "Temperatur (orange)" },
    { value: "hum", label: "Feuchte (blau)" },
    { value: "vpd", label: "VPD (Akzent)" }]),
];

export class GrowctrlSensorsEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "sensors", rowSchema: ROW, title: "\ud83d\udcc8 Sensoren",
        addLabel: "Sensor hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.styleSection()}
      <div class="hint">Jede Kachel zeigt den aktuellen Wert. <b>Anzeigename</b> \u00fcberschreibt den
        Entity-Namen. <b>Sollbereich</b> (Min/Max) blendet einen kleinen Soll-Hinweis ein.
        <b>Akzentfarbe</b> f\u00e4rbt den Wert passend ein.</div>`;
  }
}
customElements.define("growctrl-sensors-editor", GrowctrlSensorsEditor);

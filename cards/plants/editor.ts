/*==============================================================================
 * GROWCTRL – growctrl-plants-card Editor
 * Zweck   : GUI-Editor: Kalender/Spalten + Pflanzen-Liste (Name, Sorte, Keimdatum,
 *           Kamera/Bild) mit verschachtelter Sensor-Liste je Pflanze (mit Namen).
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "\ud83c\udff7\ufe0f Titel"), SEL.num("columns", "\u25a6 Spalten", 1, 4),
  SEL.entity("calendar", "\ud83d\udcc5 Kalender (optional)", "calendar"),
];
const ROW = [
  SEL.text("name", "\ud83c\udf31 Pflanzenname"),
  SEL.text("strain", "\ud83e\uddec Sorte / Genetik (optional)"),
  SEL.entity("germination_helper", "\ud83d\udcc5 Keimdatum-Helper (optional)", ["input_datetime", "date", "datetime"]),
  SEL.entity("camera", "\ud83d\udcf7 Kamera (Live-Bild, optional)", "camera"),
  SEL.text("image", "\ud83d\uddbc\ufe0f Bild-URL (optional, statt Kamera)"),
];
const SENSOR_CHILD = {
  key: "sensors", title: "\ud83d\udcc8 Sensoren der Pflanze (jeder mit Namen)",
  rowSchema: [SEL.entity("entity", "\ud83d\udcc8 Sensor", "sensor"), SEL.text("name", "\u270f\ufe0f Anzeigename (optional)")],
  addLabel: "Sensor hinzuf\u00fcgen", newItem: () => ({ entity: "" }),
};

export class GrowctrlPlantsEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "plants", rowSchema: ROW, title: "\ud83c\udf31 Pflanzen", child: SENSOR_CHILD,
        addLabel: "Pflanze hinzuf\u00fcgen", newItem: () => ({ name: "Pflanze" }) })}
      ${this.styleSection()}
      <div class="hint">Jede Pflanze ist eine Karte mit Sensoren. <b>Anzeigename</b> je Sensor m\u00f6glich.
        <b>Keimdatum-Helper</b> liefert das Alter (\u201eX Tage\u201c).</div>`;
  }
}
customElements.define("growctrl-plants-editor", GrowctrlPlantsEditor);

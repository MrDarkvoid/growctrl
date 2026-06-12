/*==============================================================================
 * GROWCTRL – growctrl-plants-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Kalender/Spalten + Pflanzen-Liste (Name, Sorte, Keimdatum, Sensoren-Mehrfachauswahl).
 * Version : 2.0.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "Titel"), SEL.num("columns", "Spalten", 1, 4),
  SEL.entity("calendar", "Kalender (optional)", "calendar"),
];
const ROW = [
  SEL.text("name", "Pflanzenname"),
  SEL.text("strain", "Sorte (optional)"),
  SEL.entity("germination_helper", "Keimdatum-Helper (optional)", ["input_datetime", "date", "datetime"]),
  SEL.entities("sensors", "Sensoren der Pflanze (optional)", "sensor"),
  SEL.entity("camera", "Kamera (Live-Bild, optional)", "camera"),
  SEL.text("image", "Bild-URL (optional, statt Kamera)"),
];

export class GrowctrlPlantsEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.list({ key: "plants", rowSchema: ROW, title: "Pflanzen",
        addLabel: "Pflanze hinzuf\u00fcgen", newItem: () => ({ name: "Pflanze" }) })}
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-plants-editor", GrowctrlPlantsEditor);

/*==============================================================================
 * GROWCTRL – growctrl-tank-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor der Tank-Karte: Fuellstand-Sensor, Mindeststand, Volumen, Stil.
 * Version : 2.2.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "Titel"),
  SEL.entity("entity", "F\u00fcllstand-Sensor (%) (Pflicht)", "sensor"),
  SEL.num("min", "Mindeststand (%)", 0, 100),
  SEL.num("volume_l", "Tankvolumen (Liter, optional)", 0, 2000),
];

export class GrowctrlTankEditor extends GrowctrlEditorBase {
  render() { return html`${this.form(MAIN)}${this.styleSection()}`; }
}
customElements.define("growctrl-tank-editor", GrowctrlTankEditor);

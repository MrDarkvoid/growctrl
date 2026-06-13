/*==============================================================================
 * GROWCTRL – growctrl-tank-card Editor
 * Zweck   : GUI-Editor der Tank-Karte: Fuellstand-Sensor, Mindeststand, Volumen,
 *           Stil. Mit Icons + Hilfetext.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "\ud83c\udff7\ufe0f Titel"),
  SEL.entity("entity", "\ud83d\udca7 F\u00fcllstand-Sensor (%) (Pflicht)", "sensor"),
  SEL.num("min", "\u26a0\ufe0f Mindeststand (%)", 0, 100),
  SEL.num("volume_l", "\ud83e\udea3 Tankvolumen (Liter, optional)", 0, 2000),
];

export class GrowctrlTankEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}${this.styleSection()}
      <div class="hint">Der <b>F\u00fcllstand-Sensor</b> liefert Prozent. Unter dem <b>Mindeststand</b> wird der
        Tank rot. Mit <b>Tankvolumen</b> zeigt die Karte zus\u00e4tzlich die ungef\u00e4hren Liter an.</div>`;
  }
}
customElements.define("growctrl-tank-editor", GrowctrlTankEditor);

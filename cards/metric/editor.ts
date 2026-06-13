/*==============================================================================
 * GROWCTRL – growctrl-metric-card Editor
 * Zweck   : GUI-Editor der Metric-Karte (EC/pH/...): Sensor, Sollbereich,
 *           Nachkommastellen, Chart, Stil. Mit Icons + Hilfetext.
 * Version : 3.3.1  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "\ud83c\udff7\ufe0f Titel"),
  SEL.entity("entity", "\ud83d\udcc8 Sensor (Pflicht)", "sensor"),
  SEL.text("name", "\u270f\ufe0f Anzeigename (optional)"),
  SEL.num("min", "Sollbereich Min"), SEL.num("max", "Sollbereich Max"),
  SEL.num("decimals", "\ud83d\udd22 Nachkommastellen", 0, 4),
  SEL.num("hours", "\u23f1\ufe0f Chart-Zeitraum (h)", 1, 168),
  SEL.num("height", "\ud83d\udccf Diagrammh\u00f6he (px)", 80, 300),
];

export class GrowctrlMetricEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}${this.styleSection()}
      <div class="hint">Zeigt einen Messwert gro\u00df mit Sollbereich und Verlauf. Ideal f\u00fcr <b>EC</b> oder
        <b>pH</b>. Liegt der Wert au\u00dferhalb von Min/Max, f\u00e4rbt sich die Anzeige als Warnung.</div>`;
  }
}
customElements.define("growctrl-metric-editor", GrowctrlMetricEditor);

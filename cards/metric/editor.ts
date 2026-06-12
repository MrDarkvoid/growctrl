/*==============================================================================
 * GROWCTRL – growctrl-metric-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor der Metric-Karte (EC/pH/...): Sensor, Sollbereich, Nachkommastellen, Chart, Stil.
 * Version : 2.2.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("title", "Titel"),
  SEL.entity("entity", "Sensor (Pflicht)", "sensor"),
  SEL.text("name", "Anzeigename (optional)"),
  SEL.num("min", "Sollbereich Min"), SEL.num("max", "Sollbereich Max"),
  SEL.num("decimals", "Nachkommastellen", 0, 4),
  SEL.num("hours", "Chart-Zeitraum (h)", 1, 168),
  SEL.num("height", "Diagrammh\u00f6he (px)", 80, 300),
];

export class GrowctrlMetricEditor extends GrowctrlEditorBase {
  render() { return html`${this.form(MAIN)}${this.styleSection()}`; }
}
customElements.define("growctrl-metric-editor", GrowctrlMetricEditor);

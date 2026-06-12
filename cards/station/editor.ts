/*==============================================================================
 * GROWCTRL – growctrl-station-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Zelt + Station (wie in der Integration), Anzeigename, Einstellungen-Zahnrad, Stil. Entity-Abweichungen via overrides (YAML).
 * Version : 2.4.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [
  SEL.text("tent", "Zelt (Name wie in der Integration, z.B. gross)"),
  SEL.text("station", "Station (z.B. main1)"),
  SEL.text("name", "Anzeigename (optional)"),
  SEL.bool("show_settings", "Einstellungen-Zahnrad anzeigen"),
];

export class GrowctrlStationEditor extends GrowctrlEditorBase {
  render() {
    return html`${this.form(MAIN)}
      ${this.styleSection()}
      <div class="hint">Entity-IDs werden automatisch abgeleitet
        (z.B. <code>switch.growctrl_gross_main1_automatik</code>). Abweichende IDs
        per YAML: <code>overrides: { automatik: switch.mein_schalter }</code></div>`;
  }
}
customElements.define("growctrl-station-editor", GrowctrlStationEditor);

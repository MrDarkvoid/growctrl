/*==============================================================================
 * GROWCTRL – growctrl-station-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Zelt + Station (wie in der Integration), Anzeigename, Einstellungen-Zahnrad, Stil. Entity-Abweichungen via overrides (YAML).
 * Version : 2.4.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

export class GrowctrlStationEditor extends GrowctrlEditorBase {
  render() {
    const main = [
      this.tentSelect(),
      this.stationSelect(this._config?.tent),
      SEL.text("name", "Anzeigename (optional)"),
      SEL.bool("show_settings", "Einstellungen-Zahnrad anzeigen"),
      SEL.bool("show_event", "Ereignisfeld am Kartenfuss (Standard an)"),
      SEL.entity("tank_entity", "Stations-Tank F\u00fcllstand % (optional)", "sensor"),
      SEL.num("tank_min", "Tank-Mindeststand %", 0, 100),
      SEL.num("tank_volume", "Tank-Volumen in Litern (optional)", 1, 10000),
    ];
    const plantRow = [
      SEL.text("name", "Name"),
      SEL.text("strain", "Sorte (optional)"),
      SEL.entity("germination_helper", "Keimstart-Entity (date, optional)", "date"),
      SEL.entities("sensors", "Sensoren dieser Pflanze (optional)", "sensor"),
      SEL.text("image", "Bild-URL (optional)"),
      SEL.entity("tank_entity", "Tank-F\u00fcllstand in % (optional)", "sensor"),
      SEL.num("tank_min", "Tank-Mindeststand % (Standard 30)", 0, 100),
    ];
    return html`${this.form(main)}
      ${this.list({ key: "plants", rowSchema: plantRow, title: "Pflanzen (Tabs in der Karte)",
        addLabel: "Pflanze hinzuf\u00fcgen", newItem: () => ({ name: "" }) })}
      ${this.styleSection()}
      <div class="hint">Entity-IDs werden automatisch abgeleitet
        (z.B. <code>switch.growctrl_gross_main1_automatik</code>). Abweichende IDs
        per YAML: <code>overrides: { automatik: switch.mein_schalter }</code></div>`;
  }
}
customElements.define("growctrl-station-editor", GrowctrlStationEditor);

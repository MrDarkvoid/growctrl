/*==============================================================================
 * GROWCTRL – growctrl-station-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Zelt + Station, Anzeigename, Stations-Tank, Aktoren und
 *           Pflanzen-Tabs mit DEDIZIERTEN Feldern fuer Temperatur, Feuchtigkeit,
 *           pH und EC (jede Domain waehlbar -> number/input_number = setzbar).
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
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
    // Aktor-Kacheln (4 nebeneinander): Schalter direkt in der Station
    const actuatorRow = [
      SEL.entity("entity", "Schalter", ["switch", "input_boolean", "light", "fan"]),
      SEL.text("name", "Name (optional)"),
      SEL.select("kind", "Art (Farbe/Icon)", [
        { value: "light", label: "Licht" }, { value: "pump", label: "Pumpe" },
        { value: "o2", label: "O\u2082" }, { value: "fan", label: "L\u00fcfter" },
        { value: "heat", label: "Heizmatte" }, { value: "water", label: "Befeuchter" },
      ]),
      SEL.bool("confirm", "Vor dem Schalten best\u00e4tigen"),
    ];
    // Pflanze: dedizierte Messwerte. Entity ohne Domain-Filter -> sensor ODER
    // number/input_number waehlbar; number/input_number werden in der Karte setzbar.
    const plantRow = [
      SEL.text("name", "Name"),
      SEL.text("strain", "Sorte (optional)"),
      SEL.entity("germination_helper", "Keimstart-Datum (date, optional)", "date"),
      SEL.text("image", "Bild-URL (optional)"),
      SEL.entity("temp_entity", "\ud83c\udf21\ufe0f Temperatur (Sensor / input_number)"),
      SEL.entity("humidity_entity", "\ud83d\udca7 Feuchtigkeit (Sensor / input_number)"),
      SEL.entity("ph_entity", "\u2697\ufe0f pH (Sensor / input_number)"),
      SEL.entity("ec_entity", "\u26a1 EC (Sensor / input_number)"),
      SEL.entity("tank_entity", "Tank-F\u00fcllstand % (optional)", "sensor"),
      SEL.num("tank_min", "Tank-Mindeststand % (Standard 30)", 0, 100),
    ];
    const plantSensorChild = {
      key: "sensors", title: "\u2795 Weitere Sensoren (als Felder, jeder mit Namen)",
      rowSchema: [SEL.entity("entity", "Sensor / input_number"), SEL.text("name", "Anzeigename (optional)")],
      addLabel: "Sensor hinzuf\u00fcgen", newItem: () => ({ entity: "" }),
    };
    return html`${this.form(main)}
      ${this.list({ key: "actuators", rowSchema: actuatorRow, title: "Aktoren (Kacheln, 4 nebeneinander)",
        addLabel: "Aktor hinzuf\u00fcgen", newItem: () => ({ entity: "" }) })}
      ${this.list({ key: "plants", rowSchema: plantRow, title: "Pflanzen (Tabs in der Karte)", child: plantSensorChild,
        addLabel: "Pflanze hinzuf\u00fcgen", newItem: () => ({ name: "" }) })}
      ${this.styleSection()}
      <div class="hint">
        <b>Temperatur &amp; Feuchtigkeit</b> werden als Mini-Verlauf gezeigt, <b>pH &amp; EC</b> als
        Zonen-Balken (Ideal/akzeptiert/schlecht). W\u00e4hlst du dort ein <code>input_number</code>
        (oder <code>number</code>), erscheint ein <b>\u2212/\uff0b-Stepper</b> zum Setzen \u2013 ideal f\u00fcr
        Handmessungen ohne Sonde.<br>
        Eigene pH/EC-Idealbereiche per YAML:
        <code>ph_ideal: [5.8, 6.3]</code>, <code>ec_ideal: [1.2, 2.2]</code>.<br>
        Entity-IDs werden automatisch abgeleitet
        (z.B. <code>switch.growctrl_gross_main1_automatik</code>); Abweichungen per YAML
        <code>overrides: { automatik: switch.mein_schalter }</code>.
      </div>`;
  }
}
customElements.define("growctrl-station-editor", GrowctrlStationEditor);

/*==============================================================================
 * GROWCTRL – growctrl-status-card Editor
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : GUI-Editor: Log-Liste + Experten-Bereich (Roh-Logs, Experten-Schalter).
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { html } from "lit";
import { GrowctrlEditorBase, SEL } from "../core/editor-base";

const MAIN = [SEL.text("title", "Titel")];
const LOG_ROW = [
  SEL.entity("entity", "Log-Entity", "input_text"),
  SEL.text("name", "Label (optional)"),
  SEL.select("type", "Typ", [
    { value: "station", label: "Station" }, { value: "climate", label: "Klima" }]),
];
const EXP_ROW = [
  SEL.entity("entity", "Schalter", ["input_boolean", "switch"]),
  SEL.text("name", "Name (optional)"),
];

export class GrowctrlStatusEditor extends GrowctrlEditorBase {
  render() {
    const expert = this._config.expert ?? {};
    const setExpert = (patch: any) =>
      this._fire({ ...this._config, expert: { ...expert, ...patch } });
    const controls: any[] = expert.controls ?? [];
    return html`${this.form(MAIN)}
      ${this.list({ key: "logs", rowSchema: LOG_ROW, title: "Logs",
        addLabel: "Log hinzuf\u00fcgen", newItem: () => ({ entity: "", type: "station" }) })}
      <div class="lt">Experten-Bereich</div>
      <ha-form .hass=${this.hass} .data=${{ show_raw: expert.show_raw !== false }}
        .schema=${[SEL.bool("show_raw", "Roh-Logs anzeigen")]}
        .computeLabel=${(s: any) => s.label ?? s.name}
        @value-changed=${(e: CustomEvent) => setExpert({ show_raw: e.detail.value.show_raw })}></ha-form>
      ${controls.map((it, i) => html`<div class="row">
        <ha-form .hass=${this.hass} .data=${it} .schema=${EXP_ROW}
          .computeLabel=${(s: any) => s.label ?? s.name}
          @value-changed=${(e: CustomEvent) => {
            const a = [...controls]; a[i] = { ...e.detail.value }; setExpert({ controls: a }); }}></ha-form>
        <button class="del" @click=${() => setExpert({ controls: controls.filter((_, j) => j !== i) })}>\u2715</button>
      </div>`)}
      <button class="add" @click=${() => setExpert({ controls: [...controls, { entity: "" }] })}>+ Experten-Schalter</button>
      ${this.styleSection()}`;
  }
}
customElements.define("growctrl-status-editor", GrowctrlStatusEditor);

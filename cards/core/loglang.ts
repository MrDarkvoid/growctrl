/*==============================================================================
 * GROWCTRL – core/loglang
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Der EINE Log-Uebersetzer (Station + Klima), portiert aus den Checkup-Karten. Verhalten gemaess docs/log_referenz.md. Loest Issue #6.
 * Version : 2.0.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import type { LogResult } from "./types";

const empty = (raw?: string) => !raw || ["unknown","unavailable",""].includes(raw);
const tsOf = (raw: string) => (raw.length >= 16 ? raw.substring(11,16) : "");

export const translateKlimaLog = (raw?: string): LogResult => {
  if (empty(raw)) return { level: "none", label: "\u2014", ts: "" };
  const r = raw!;
  const ts = tsOf(r);
  if (r.includes("SENSOR INVALID")) return { level:"critical", label:"\u{1F6A8} Sensor ung\u00fcltig \u2014 Befeuchtung gesperrt", ts };
  if (r.includes("MAINTENANCE"))    return { level:"info", label:"\u{1F527} Wartungsmodus aktiv", ts };
  if (r.includes("TESTMODE"))       return { level:"info", label:"\u{1F9EA} Testmodus aktiv", ts };
  if (r.includes("AUTO OFF"))       return { level:"info", label:"\u{1F534} Klima-Automatik deaktiviert", ts };
  const circ = r.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase();
  const humM = r.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase();
  const reqM = r.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();
  if (humM !== undefined) {
    const parts: string[] = [];
    if (circ === "on") parts.push("Umluft AN");
    else if (circ === "manual") parts.push("Umluft Manuell");
    else if (circ === "off") parts.push("Umluft AUS");
    parts.push(humM === "ON" ? "Befeuchtung AN" : "Befeuchtung AUS");
    parts.push(reqM === "ON" ? "Entfeuchtung AN" : "Entfeuchtung AUS");
    if (r.includes("ZENTRAL-BLOCK")) parts.push("(Zentral-Block)");
    return { level:"ok", label: parts.join(" \u00b7 "), ts };
  }
  return { level:"ok", label: r.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/, "").substring(0,45), ts };
};

export const translateStationLog = (raw?: string): LogResult => {
  if (empty(raw)) return { level:"none", label:"\u2014", ts:"" };
  const r = raw!;
  const ts = tsOf(r);
  if (r.includes("FAILSAFE LIGHT")) return { level:"critical", label:"\u{1F6A8} Failsafe: Licht-Zwangsabschaltung \u2014 Auto deaktiviert", ts };
  if (r.includes("FAILSAFE PUMP"))  return { level:"critical", label:"\u{1F6A8} Failsafe: Pumpen-Zwangsabschaltung \u2014 Auto deaktiviert", ts };
  if (r.includes("TIME INVALID"))   return { level:"critical", label:"\u26A0\uFE0F Lichtzeiten nicht konfiguriert", ts };
  if (r.includes("MISMATCH")) {
    const g = (re: RegExp) => r.match(re)?.[1];
    const pairs: Array<[string,string|undefined,string|undefined]> = [
      ["Licht", g(/IST.*?\bL=(\w+)/i),  g(/SOLL.*?\bL=(\w+)/i)],
      ["Pumpe", g(/IST.*?\bP=(\w+)/i),  g(/SOLL.*?\bP=(\w+)/i)],
      ["O\u2082", g(/IST.*?\bO2=(\w+)/i), g(/SOLL.*?\bO2=(\w+)/i)],
    ];
    const issues = pairs.filter(([,i,s]) => i && s && i !== s)
      .map(([n,i,s]) => `${n} (IST ${i!.toUpperCase()} / SOLL ${s!.toUpperCase()})`);
    return { level:"warning", label:"\u26A0\uFE0F Ger\u00e4t antwortet nicht: " + (issues.join(", ") || "Abweichung"), ts };
  }
  if (r.includes("MAINTENANCE")) return { level:"info", label:"\u{1F527} Wartungsmodus aktiv", ts };
  if (r.includes("TESTMODE"))    return { level:"info", label:"\u{1F9EA} Testmodus aktiv", ts };
  const istL = r.match(/IST.*?\bL=(\w+)/i)?.[1];
  const istP = r.match(/IST.*?\bP=(\w+)/i)?.[1];
  const istO = r.match(/IST.*?\bO2=(\w+)/i)?.[1];
  const ovr = r.includes("OVRUNTIL") ? " (Override aktiv)" : "";
  const stateStr = [
    istL && istL !== "n/a" ? (istL === "on" ? "\u{1F4A1} Licht AN" : "\u{1F311} Licht AUS") : null,
    istP && istP !== "n/a" ? (istP === "on" ? "\u{1F4A7} Pumpe AN" : "\u23F8\uFE0F Pumpe AUS") : null,
    istO && istO !== "n/a" ? (istO === "on" ? "\u{1FAE7} O\u2082 AN" : "\u{1FAE7} O\u2082 AUS") : null,
  ].filter(Boolean).join(" \u00b7 ");
  let prefix = "";
  if (r.includes("AUTO ON")) prefix = "\u{1F7E2} Auto gestartet";
  else if (r.includes("AUTO OFF")) prefix = "\u{1F534} Auto gestoppt";
  else if (r.match(/STAGE\s*\u2192/)) prefix = `\u{1F331} Phase: ${r.match(/STAGE\s*\u2192\s*(\w+)/)?.[1] ?? ""}`;
  else if (r.includes("LIGHT \u2192 ON")) prefix = "\u{1F4A1} Licht eingeschaltet";
  else if (r.includes("LIGHT \u2192 OFF")) prefix = "\u{1F311} Licht ausgeschaltet";
  else if (r.includes("PUMP \u2192 ON")) prefix = "\u{1F4A7} Pumpe eingeschaltet";
  else if (r.includes("PUMP \u2192 OFF")) prefix = "\u23F8\uFE0F Pumpe ausgeschaltet";
  else if (r.includes("O2 \u2192 ON")) prefix = "\u{1FAE7} O\u2082 eingeschaltet";
  else if (r.includes("FAN \u2192 ON")) prefix = "\u{1F300} L\u00fcfter eingeschaltet";
  else if (r.includes("MANUAL OVERRIDE")) prefix = "\u270B Manuell \u00fcbersteuert";
  else if (r.includes("OVERRIDE END")) prefix = "\u2705 Override beendet";
  const label = [prefix, stateStr].filter(Boolean).join(" \u2014 ") + ovr;
  return { level:"ok", label: label || r.substring(17,55), ts };
};

/** Pumpenzustand aus IST-Zeile (bis Integrations-Events das ersetzen). */
export const pumpOnFromLog = (raw?: string): boolean =>
  raw?.match(/IST.*?\bP=(\w+)/i)?.[1] === "on";

/*==============================================================================
 * GROWCTRL – core/theme
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Gemeinsames Theme (Checkup-Farbsemantik) + geteilte Styles als Lit-CSS.
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { css } from "lit";

export const THEME = {
  label: "rgba(255,255,255,0.85)", value: "rgba(255,255,255,1.0)",
  muted: "rgba(255,255,255,0.50)", logLabel: "rgba(255,255,255,0.75)",
  logText: "rgba(255,255,255,0.88)",
  ok: "#4DFFC3", warn: "#FFD166", crit: "#FF6B6B", info: "#FFD166",
  tileBg: "rgba(0,0,0,0.20)", rowBg: "rgba(0,0,0,0.18)",
} as const;

export const LOG_BG: Record<string,string> = {
  critical: "rgba(255,107,107,.22)", warning: "rgba(255,209,102,.2)",
  info: "rgba(255,209,102,.15)", ok: THEME.rowBg, none: "rgba(0,0,0,.12)",
};
export const LOG_TX: Record<string,string> = {
  critical: THEME.crit, warning: THEME.warn, info: THEME.info,
  ok: THEME.logText, none: "rgba(255,255,255,.35)",
};
export const STAGE_COLORS: Record<string,{bg:string;color:string}> = {
  Seedling: { bg: "rgba(100,180,255,0.2)",  color: "#7EC8FF" },
  Veg:      { bg: "rgba(100,220,100,0.25)", color: "#7EE87E" },
  Bloom:    { bg: "rgba(255,180,50,0.25)",  color: "#FFB432" },
  Flush:    { bg: "rgba(255,180,50,0.25)",  color: "#FFB432" },
};

export const sharedStyles = css`
  :host { display: block; }
  .card { border-radius: 16px; padding: 16px 18px; color: #fff;
          background: var(--growctrl-bg, linear-gradient(135deg,#1f2733,#141a23));
          font-family: var(--primary-font-family, Roboto, sans-serif); }
  .clickable { cursor: pointer; }
  .hdr { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; flex-wrap: wrap; }
  .title { font-size: 20px; font-weight: 800; letter-spacing: -.3px; }
  .subtitle { font-size: 11px; color: rgba(255,255,255,.75); margin-top: 3px; }
  .badges { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
  .badge { font-size: 10px; font-weight: 700; background: rgba(255,255,255,.2); color: #fff;
           padding: 3px 9px; border-radius: 20px; white-space: nowrap; }
  .badge.warn { background: rgba(255,165,0,.5); }
  .grid { display: grid; gap: 8px; margin-top: 8px; }
  .tile { background: rgba(0,0,0,0.20); border-radius: 12px; padding: 10px 12px; min-width: 0; }
  .tile .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: .7px; color: rgba(255,255,255,0.85); }
  .tile .val { font-size: 24px; font-weight: 800; }
  .tile .val.sm { font-size: 18px; font-weight: 700; }
  .logrow { display: flex; align-items: center; gap: 6px; border-radius: 8px; padding: 6px 10px; min-width: 0; }
  .logrow .txt { font-size: 11px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; }
  .logrow .ts { font-size: 10px; color: rgba(255,255,255,0.5); flex-shrink: 0; }
  .seclbl { font-size: 10px; text-transform: uppercase; letter-spacing: .8px; color: rgba(255,255,255,0.5); margin: 8px 0 4px; }
  .stagebadge { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 9px; }
  .barrow { display: flex; align-items: center; gap: 7px; }
  .barrow .ico { font-size: 12px; flex-shrink: 0; }
  .barrow .track { flex: 1; height: 10px; background: rgba(0,0,0,.3); border-radius: 5px; overflow: hidden; }
  .barrow .fill { height: 100%; border-radius: 5px; }
  .barrow .time { font-size: 11px; min-width: 82px; flex-shrink: 0; text-align: right; }
  button.gc { all: unset; cursor: pointer; }
`;

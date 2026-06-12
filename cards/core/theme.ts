/*==============================================================================
 * GROWCTRL – core/theme
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Modernes Design-System: Status-Ampel auf Kartenebene (Rahmen-Glow), einstellbare Transparenz/Hintergrund/Akzent/Radius/Glas-Effekt, geteilte Styles.
 * Version : 2.1.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { css } from "lit";

export const THEME = {
  label: "rgba(255,255,255,0.55)", value: "rgba(255,255,255,0.97)",
  muted: "rgba(255,255,255,0.45)", logLabel: "rgba(255,255,255,0.70)",
  logText: "rgba(255,255,255,0.88)",
  ok: "#4DFFC3", warn: "#FFD166", crit: "#FF6B6B", info: "#7EC8FF",
  tileBg: "rgba(255,255,255,0.045)", rowBg: "rgba(255,255,255,0.04)",
} as const;

export const LOG_BG: Record<string,string> = {
  critical: "rgba(255,107,107,.16)", warning: "rgba(255,209,102,.14)",
  info: "rgba(126,200,255,.10)", ok: THEME.rowBg, none: "rgba(255,255,255,.025)",
};
export const LOG_TX: Record<string,string> = {
  critical: THEME.crit, warning: THEME.warn, info: THEME.info,
  ok: THEME.logText, none: "rgba(255,255,255,.35)",
};
export const STAGE_COLORS: Record<string,{bg:string;color:string}> = {
  Seedling: { bg: "rgba(126,200,255,0.16)", color: "#7EC8FF" },
  Veg:      { bg: "rgba(126,232,126,0.16)", color: "#7EE87E" },
  Bloom:    { bg: "rgba(255,180,50,0.18)",  color: "#FFB432" },
  Flush:    { bg: "rgba(255,180,50,0.18)",  color: "#FFB432" },
  Trocknung:{ bg: "rgba(201,155,95,0.18)",  color: "#C99B5F" },
};

/** Vom Nutzer einstellbarer Karten-Stil (alle Karten, GUI-Editor-Sektion "Stil"). */
export interface StyleConfig {
  background?: string;   // Farbe, "a,b" (-> Gradient) oder beliebiges CSS-background
  opacity?: number;      // 0..1 Deckkraft der Kartenflaeche
  glass?: boolean;       // Milchglas (backdrop blur)
  accent?: string;       // Akzentfarbe
  radius?: number;       // Eckenradius px
}

/** CSS-Variablen aus StyleConfig (Inline-Style fuer .card). */
export const cardVars = (s?: StyleConfig): string => {
  const p: string[] = [];
  if (s?.background) {
    const v = s.background.trim();
    const bg = v.includes(",") && !/^(linear|radial|conic|rgb|hsl)/i.test(v)
      ? `linear-gradient(160deg, ${v})` : v;
    p.push(`--gc-bg:${bg}`);
  }
  if (s?.opacity !== undefined) p.push(`--gc-opacity:${s.opacity}`);
  if (s?.accent) p.push(`--gc-accent:${s.accent}`);
  if (s?.radius !== undefined) p.push(`--gc-radius:${s.radius}px`);
  return p.join(";");
};

/** Hoechster Schweregrad einer Level-Liste -> Karten-Rahmen-Ampel. */
export const worstLevel = (levels: string[]): "ok"|"info"|"warning"|"critical" => {
  if (levels.includes("critical")) return "critical";
  if (levels.includes("warning")) return "warning";
  if (levels.includes("info")) return "info";
  return "ok";
};

export const sharedStyles = css`
  /* Responsive KPI-Raster: 4 Spalten, auf dem Handy 2; Settings 3 -> 2 */
  .kpis { display:grid; gap:8px; grid-template-columns:repeat(4,minmax(0,1fr)); }
  .kpis.cols-2 { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .kpis.cols-3 { grid-template-columns:repeat(3,minmax(0,1fr)); }
  .settings-grid { display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr)); }
  @media (max-width: 480px) {
    .card { padding: 13px 12px; }
    .kpis { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .kpis.cols-3 { grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px; }
    .settings-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .kpis .tile { padding: 9px 9px; }
    .kpis .val { font-size: 19px; }
    .title { font-size: 15px; }
  }

  :host { display: block; }
  .card {
    position: relative; isolation: isolate;
    border-radius: var(--gc-radius, 20px);
    padding: 18px 18px 16px;
    color: #fff;
    border: 1px solid rgba(255,255,255,.13);
    box-shadow: 0 14px 38px -16px rgba(0,0,0,.75), 0 2px 8px rgba(0,0,0,.35);
    font-family: var(--primary-font-family, "Inter", Roboto, sans-serif);
    overflow: hidden;
  }
  .card::before {
    content: ""; position: absolute; inset: 0; z-index: -1;
    background: var(--gc-bg, linear-gradient(165deg, #1b2230 0%, #12161f 100%));
    opacity: var(--gc-opacity, 1);
  }
  .card.glass { backdrop-filter: blur(14px) saturate(1.25); -webkit-backdrop-filter: blur(14px) saturate(1.25); }
  /* Status-Ampel auf Kartenebene: einmal raufgucken */
  .card[data-level="warning"] {
    border-color: rgba(255,209,102,.45);
    box-shadow: 0 0 0 1px rgba(255,209,102,.25), 0 12px 32px -16px rgba(255,209,102,.3);
  }
  .card[data-level="critical"] {
    border-color: rgba(255,107,107,.55);
    box-shadow: 0 0 0 1px rgba(255,107,107,.3), 0 12px 36px -14px rgba(255,107,107,.4);
  }
  .clickable { cursor: pointer; }
  .hdr { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
  .title { font-size: 19px; font-weight: 800; letter-spacing: -.3px; line-height: 1.15; }
  .subtitle { font-size: 11px; color: rgba(255,255,255,.55); margin-top: 2px; font-weight: 500; }
  .badges { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; align-items: center; }
  .badge { font-size: 10px; font-weight: 700; background: rgba(255,255,255,.08);
           border: 1px solid rgba(255,255,255,.10); color: rgba(255,255,255,.85);
           padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
  .badge.warn { background: rgba(255,165,0,.18); border-color: rgba(255,165,0,.35); color: #FFD166; }
  /* Grosses Status-Pill (Ampel) */
  .status-pill { display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 800; padding: 6px 13px; border-radius: 20px; white-space: nowrap; }
  .status-pill .dot { width: 8px; height: 8px; border-radius: 50%; box-shadow: 0 0 8px currentColor; }
  .grid { display: grid; gap: 8px; margin-top: 10px; }
  .tile { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09);
          border-radius: 14px; padding: 11px 13px; min-width: 0; transition: background .15s; }
  button.tile:hover { background: rgba(255,255,255,.08); }
  .tile .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: .8px;
               color: rgba(255,255,255,.5); font-weight: 600; }
  .tile .val { font-size: 25px; font-weight: 800; margin-top: 2px; letter-spacing: -.5px; }
  .tile .val.sm { font-size: 17px; font-weight: 700; }
  .tile .unit { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.45); margin-left: 3px; }
  .logrow { display: flex; align-items: center; gap: 8px; border-radius: 10px;
            padding: 7px 11px; min-width: 0; }
  .logrow .txt { font-size: 11.5px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; }
  .logrow .ts { font-size: 10px; color: rgba(255,255,255,.4); flex-shrink: 0; font-variant-numeric: tabular-nums; }
  .seclbl { font-size: 10px; text-transform: uppercase; letter-spacing: 1px;
            color: rgba(255,255,255,.4); margin: 12px 0 6px; font-weight: 700; }
  .stagebadge { font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 9px; }
  .barrow { display: flex; align-items: center; gap: 8px; }
  .barrow .ico { font-size: 13px; flex-shrink: 0; width: 18px; text-align: center; }
  .barrow .track { flex: 1; height: 8px; background: rgba(0,0,0,.35); border-radius: 4px; overflow: hidden; }
  .barrow .fill { height: 100%; border-radius: 4px; transition: width .4s; }
  .barrow .time { font-size: 11px; min-width: 78px; flex-shrink: 0; text-align: right;
                  font-variant-numeric: tabular-nums; }
  button.gc { all: unset; cursor: pointer; }
`;

export const STATUS_PILL: Record<string, { bg: string; color: string; label: string }> = {
  ok:       { bg: "rgba(77,255,195,.14)",  color: THEME.ok,   label: "Alles OK" },
  info:     { bg: "rgba(126,200,255,.14)", color: THEME.info, label: "Info" },
  warning:  { bg: "rgba(255,209,102,.16)", color: THEME.warn, label: "Warnung" },
  critical: { bg: "rgba(255,107,107,.18)", color: THEME.crit, label: "Fehler" },
};

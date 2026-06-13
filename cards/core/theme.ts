/*==============================================================================
 * GROWCTRL – core/theme
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Design-System "Soft Garden" – warmes Schwarzgruen, EIN einstellbarer
 *           Akzent je Zelt (--gc-accent), runde Radien, weiche Schatten, geteilte
 *           Komponenten-Styles (Versorgungszeilen, Phasen-Dropdown, Aktor-Raster,
 *           Pflanzen-Panel, Zonen) fuer alle Karten. Status-Ampel auf Kartenebene.
 * Version : 3.0.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { css } from "lit";

/* Semantische Farben – "Soft Garden". Status (ok/warn/crit/info) ist
 * zelt-uebergreifend gleich; die Zelt-Identitaet faerbt den Akzent (--gc-accent). */
export const THEME = {
  label: "rgba(242,247,243,0.56)", value: "rgba(242,247,243,0.97)",
  muted: "rgba(242,247,243,0.46)", logLabel: "rgba(242,247,243,0.72)",
  logText: "rgba(242,247,243,0.90)",
  ok: "#7BE8A8", warn: "#FFCE7A", crit: "#FF9D9D", info: "#9AC8FF",
  water: "#7CC8F0", light: "#FFDC8A", temp: "#FFB98A", heat: "#FFB35C",
  tileBg: "rgba(255,255,255,0.04)", rowBg: "rgba(255,255,255,0.035)",
} as const;

export const LOG_BG: Record<string,string> = {
  critical: "rgba(255,157,157,.14)", warning: "rgba(255,206,122,.12)",
  info: "rgba(154,200,255,.10)", ok: THEME.rowBg, none: "rgba(255,255,255,.022)",
};
export const LOG_TX: Record<string,string> = {
  critical: THEME.crit, warning: THEME.warn, info: THEME.info,
  ok: THEME.logText, none: "rgba(242,247,243,.36)",
};

/* Phasen-Farben (Dropdown-Punkte, Badges). */
export const STAGE_COLORS: Record<string,{bg:string;color:string}> = {
  Seedling: { bg: "rgba(154,200,255,0.16)", color: "#9AC8FF" },
  Veg:      { bg: "rgba(123,232,168,0.16)", color: "#7BE8A8" },
  Bloom:    { bg: "rgba(255,185,138,0.18)", color: "#FFB98A" },
  Flush:    { bg: "rgba(195,171,245,0.18)", color: "#C3ABF5" },
  Trocknung:{ bg: "rgba(211,168,120,0.18)", color: "#D3A878" },
};

/** Vom Nutzer einstellbarer Karten-Stil (GUI-Editor-Sektion "Stil"). */
export interface StyleConfig {
  background?: string;   // Farbe, "a,b" (-> Gradient) oder beliebiges CSS-background
  opacity?: number;      // 0..1 Deckkraft der Kartenflaeche
  glass?: boolean;       // Milchglas (backdrop blur)
  accent?: string;       // Akzentfarbe (Zelt-Theme): Klein gruen, Mittel weinrot, Gross violett
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
  :host {
    display: block;
    --gc-accent: #7BE8A8;                 /* Standard: Klein/gruen. Mittel/Gross via style.accent */
    --gc-line: #2E3D34;
    --gc-line-soft: #27342C;
    --f-ui: "Nunito", "Quicksand", var(--primary-font-family, "Inter"), system-ui, sans-serif;
    --f-num: "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
  }

  /* Responsive KPI-Raster */
  .kpis { display:grid; gap:8px; grid-template-columns:repeat(4,minmax(0,1fr)); align-items:stretch; }
  .kpis .tile { display:flex; flex-direction:column; justify-content:center; min-height:64px; }
  .kpis.cols-2 { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .kpis.cols-3 { grid-template-columns:repeat(3,minmax(0,1fr)); }
  .settings-grid { display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr)); }
  @media (max-width: 480px) {
    .card { padding: 15px 14px; }
    .kpis { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .kpis.cols-3 { grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px; }
    .settings-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .kpis .val { font-size: 20px; }
    .title { font-size: 16px; }
  }

  .card {
    position: relative; isolation: isolate;
    border-radius: var(--gc-radius, 22px);
    padding: 18px;
    color: #F2F7F3;
    border: 1px solid var(--gc-line-soft);
    box-shadow: 0 10px 30px -12px rgba(0,0,0,.45);
    font-family: var(--f-ui);
    overflow: hidden;
  }
  .card::before {
    content: ""; position: absolute; inset: 0; z-index: -1;
    background: var(--gc-bg, linear-gradient(180deg, #202C25 0%, #1B2620 30%));
    opacity: var(--gc-opacity, 1);
  }
  .card.glass { backdrop-filter: blur(14px) saturate(1.2); -webkit-backdrop-filter: blur(14px) saturate(1.2); }
  .card[data-level="warning"] {
    border-color: rgba(255,206,122,.4);
    box-shadow: 0 0 0 1px rgba(255,206,122,.18), 0 12px 30px -14px rgba(255,206,122,.28);
  }
  .card[data-level="critical"] {
    border-color: rgba(255,157,157,.5);
    box-shadow: 0 0 0 1px rgba(255,157,157,.24), 0 12px 32px -14px rgba(255,157,157,.34);
  }

  .clickable, button.gc { cursor: pointer; }
  button.gc { all: unset; cursor: pointer; touch-action: manipulation; }
  :focus-visible { outline: 2.5px solid var(--gc-accent); outline-offset: 2px; border-radius: 8px; }
  button { transition: transform .16s cubic-bezier(.2,.9,.3,1.2), border-color .16s, background .16s, color .16s; }
  button:active { transform: scale(.975); }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; } }

  /* Kopfzeile */
  .hdr { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
  .title { font-size: 17.5px; font-weight: 900; letter-spacing: -.3px; line-height: 1.15; }
  .subtitle { font-size: 12px; color: var(--label, rgba(242,247,243,.58)); margin-top: 2px; font-weight: 700; }
  .badges { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; align-items: center; }
  .badge { font-size: 11px; font-weight: 800; background: rgba(255,255,255,.06);
           border: 1px solid var(--gc-line); color: rgba(242,247,243,.85);
           padding: 5px 11px; border-radius: 999px; white-space: nowrap; }
  .badge.warn { background: rgba(255,206,122,.12); border-color: rgba(255,206,122,.32); color: #FFCE7A; }

  /* Status-Pille */
  .status-pill { display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 800; padding: 7px 14px; border-radius: 999px; white-space: nowrap; }
  .status-pill .dot { width: 7px; height: 7px; border-radius: 50%; box-shadow: 0 0 8px currentColor; }

  /* Kacheln */
  .grid { display: grid; gap: 8px; margin-top: 10px; }
  .tile { background: var(--card-2, #222F28); border: 1px solid transparent;
          border-radius: 15px; padding: 12px 13px; min-width: 0; transition: background .15s, border-color .15s; }
  button.tile:hover { background: #27362E; border-color: color-mix(in srgb, var(--gc-accent) 35%, transparent); }
  .tile .lbl { font-size: 10.5px; text-transform: uppercase; letter-spacing: 1.1px;
               color: rgba(242,247,243,.62); font-weight: 800; }
  .tile .val { font-size: 25px; font-weight: 800; margin-top: 2px; letter-spacing: -.5px;
               font-family: var(--f-num); font-variant-numeric: tabular-nums; }
  .tile .val.sm { font-size: 17px; font-weight: 700; }
  .tile .unit { font-size: 12px; font-weight: 600; color: rgba(242,247,243,.58); margin-left: 3px; font-family: var(--f-num); }

  .seclbl { font-size: 10.5px; text-transform: uppercase; letter-spacing: 1.3px;
            color: rgba(242,247,243,.42); margin: 14px 0 8px; font-weight: 800; }
  .stagebadge { font-size: 10.5px; font-weight: 800; padding: 4px 11px; border-radius: 999px; }

  .logrow { display: flex; align-items: center; gap: 9px; border-radius: 11px; padding: 9px 12px; min-width: 0; }
  .logrow .txt { font-size: 12.5px; font-weight: 700; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; }
  .logrow .ts { font-size: 10.5px; color: rgba(242,247,243,.42); flex-shrink: 0; font-family: var(--f-num); font-variant-numeric: tabular-nums; }

  /* Balkenzeile (Legacy-kompatibel) */
  .barrow { display: flex; align-items: center; gap: 8px; }
  .barrow .ico { font-size: 13px; flex-shrink: 0; width: 18px; text-align: center; }
  .barrow .track { flex: 1; height: 10px; background: #17211B; border-radius: 6px; overflow: hidden; }
  .barrow .fill { height: 100%; border-radius: 6px; transition: width .4s; }
  .barrow .time { font-size: 11px; min-width: 78px; flex-shrink: 0; text-align: right;
                  font-family: var(--f-num); font-variant-numeric: tabular-nums; }

  /* ── Versorgungszeile (Licht / Pumpe / DLI / Tank) – volle Breite, einheitlich ── */
  .supply { display:block; width:100%; background:var(--card-2,#222F28); border:1px solid transparent;
    border-radius:15px; padding:12px 16px; cursor:pointer; text-align:left; color:inherit; margin-top:8px; }
  .supply:hover { border-color: color-mix(in srgb, var(--gc-accent) 35%, transparent); }
  .supply .shd { display:flex; align-items:center; gap:11px; }
  .supply .sic { font-size:20px; display:grid; place-items:center; width:26px; flex-shrink:0; }
  .supply .stt { font-size:14px; font-weight:800; flex:1; min-width:0; }
  .supply .stm { font-family:var(--f-num); font-weight:700; font-size:14px; font-variant-numeric:tabular-nums; flex-shrink:0; }
  .supply .sbar { height:10px; border-radius:6px; background:#17211B; overflow:hidden; position:relative; display:block; margin-top:9px; }
  .supply .sbar > i { display:block; height:100%; border-radius:6px; transition:width .5s; }
  .supply .sbar .min { position:absolute; top:-1px; bottom:-1px; width:2.5px; background:rgba(255,255,255,.45); }
  .supply .sft { display:flex; justify-content:space-between; margin-top:6px; font-size:10.5px; font-weight:700; color:rgba(242,247,243,.5); }

  /* ── Phasen-Dropdown – volle Breite ── */
  .dd { position:relative; display:block; width:100%; margin-top:12px; }
  .dd-btn { display:flex; align-items:center; gap:11px; width:100%; min-height:46px; padding:0 18px;
    font:800 13px var(--f-ui); color:#F2F7F3; cursor:pointer; border-radius:14px; background:var(--card-2,#222F28); border:1px solid var(--gc-line); }
  .dd-btn:hover { border-color: rgba(133,153,140,.7); }
  .dd-btn .pdot { width:10px; height:10px; border-radius:50%; box-shadow:0 0 8px currentColor; flex-shrink:0; }
  .dd-btn .hint { margin-left:auto; font:700 11px var(--f-num); color:rgba(242,247,243,.5); }
  .dd-menu { margin-top:7px; background:#222F28; border:1px solid var(--gc-line); border-radius:16px; padding:7px;
    box-shadow:0 18px 40px -12px rgba(0,0,0,.6); }
  .dd-it { display:flex; align-items:center; gap:12px; width:100%; min-height:44px; padding:0 13px;
    font:800 13px var(--f-ui); color:rgba(242,247,243,.7); cursor:pointer; border-radius:11px; background:transparent; border:none; text-align:left; }
  .dd-it:hover { background:#17211B; color:#F2F7F3; }
  .dd-it[aria-selected="true"] { color:var(--gc-accent); background:color-mix(in srgb, var(--gc-accent) 14%, transparent); }
  .dd-it .pdot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
  .dd-it .hint { margin-left:auto; font:700 10px var(--f-num); color:rgba(242,247,243,.5); }

  /* ── Aktor-Raster: fest 4 nebeneinander ── */
  .acts { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
  .act { background:var(--card-2,#222F28); border:1px solid transparent; border-radius:15px; cursor:pointer;
    padding:8px 4px; text-align:center; color:rgba(242,247,243,.55); min-height:62px; }
  .act:hover { border-color: rgba(133,153,140,.6); }
  .act .aic { font-size:18px; display:flex; align-items:center; justify-content:center; margin:0 auto 4px; }
  .act .anm { font:800 10px var(--f-ui); color:rgba(242,247,243,.75); display:block; line-height:1.15; }
  .act .ast { font:700 8.5px var(--f-num); letter-spacing:.8px; margin-top:2px; display:block; }
  .act.on { border-color: color-mix(in srgb, var(--gc-accent) 45%, transparent); color:var(--gc-accent);
    background: linear-gradient(160deg, color-mix(in srgb, var(--gc-accent) 14%, transparent), var(--card-2,#222F28)); }
  .act.on .anm { color:#F2F7F3; }
  .act.on.light { border-color:rgba(255,220,138,.5); color:#FFDC8A; background:linear-gradient(160deg, rgba(255,220,138,.13), var(--card-2,#222F28)); }
  .act.on.heat  { border-color:rgba(255,179,92,.5);  color:#FFB35C; background:linear-gradient(160deg, rgba(255,179,92,.14), var(--card-2,#222F28)); }
  .act.on.water { border-color:rgba(124,200,240,.5); color:#7CC8F0; background:linear-gradient(160deg, rgba(124,200,240,.14), var(--card-2,#222F28)); }

  /* ── Pflanzen-Tabs + Panel ── */
  .ptabs { display:flex; gap:7px; flex-wrap:wrap; margin-top:14px; }
  .ptab { display:inline-flex; align-items:center; gap:8px; font:800 12px var(--f-ui); min-height:40px; padding:0 15px;
    border-radius:999px; cursor:pointer; border:1.5px solid var(--gc-line); background:transparent; color:rgba(242,247,243,.6); }
  .ptab[aria-selected="true"] { color:var(--gc-accent); border-color:color-mix(in srgb, var(--gc-accent) 50%, transparent);
    background:color-mix(in srgb, var(--gc-accent) 14%, transparent); }
  .plant { background:linear-gradient(150deg, color-mix(in srgb, var(--gc-accent) 7%, transparent), var(--card-2,#222F28) 45%);
    border:1px solid var(--gc-line-soft); border-radius:15px; padding:16px; margin-top:8px; }
  .plant .phd { display:flex; gap:12px; align-items:center; }
  .plant .pimg { width:58px; height:58px; border-radius:17px; display:grid; place-items:center; flex-shrink:0; font-size:25px;
    background:linear-gradient(135deg, color-mix(in srgb, var(--gc-accent) 22%, transparent), transparent);
    border:1.5px solid color-mix(in srgb, var(--gc-accent) 30%, transparent); color:var(--gc-accent); object-fit:cover; }
  .plant .pname { font-size:16px; font-weight:900; letter-spacing:-.2px; }
  .plant .pstrain { font-size:12px; color:rgba(242,247,243,.65); font-weight:700; margin-top:1px; }
  .agechip { display:inline-block; margin-top:5px; font:800 11px var(--f-num); color:var(--gc-accent);
    background:color-mix(in srgb, var(--gc-accent) 14%, transparent);
    border:1px solid color-mix(in srgb, var(--gc-accent) 30%, transparent); border-radius:8px; padding:3px 10px; }

  /* Sensor-Indikator im Pflanzen-Panel */
  .ind { background:#17211B; border:1px solid var(--gc-line-soft); border-radius:15px; padding:12px; margin-top:10px;
    cursor:pointer; width:100%; text-align:left; color:inherit; }
  .ind:hover { border-color: color-mix(in srgb, var(--gc-accent) 35%, transparent); }
  .ind .ihd { display:flex; justify-content:space-between; align-items:baseline; }
  .ind .ilbl { font:800 11px var(--f-ui); letter-spacing:1.1px; text-transform:uppercase; display:inline-flex; align-items:center; gap:7px; }
  .ind .ival { font:700 19px var(--f-num); font-variant-numeric:tabular-nums; }
  .ind .ival .u { font-size:11px; color:rgba(242,247,243,.6); }
  /* setzbare Werte (number / input_number): −/＋-Stepper */
  .setrow { display:inline-flex; align-items:center; gap:9px; }
  .stepbtn { width:32px; height:32px; border-radius:10px; display:grid; place-items:center; cursor:pointer;
    color:var(--gc-accent); background:color-mix(in srgb, var(--gc-accent) 14%, transparent);
    border:1px solid color-mix(in srgb, var(--gc-accent) 35%, transparent); }
  .stepbtn:hover { background:color-mix(in srgb, var(--gc-accent) 24%, transparent); }
  .setval { font:700 19px var(--f-num); font-variant-numeric:tabular-nums; min-width:58px; text-align:center; }
  .setval .u { font-size:11px; color:rgba(242,247,243,.6); margin-left:1px; }

  /* Ereignisfeld */
  .event { display:flex; align-items:center; gap:11px; border-radius:15px; cursor:pointer; width:100%; text-align:left; color:inherit;
    background:#17211B; border:1px dashed var(--gc-line); padding:12px; min-height:46px; margin-top:14px; }
  .event:hover { border-color: color-mix(in srgb, var(--gc-accent) 40%, transparent); }
  .event .edot { width:8px; height:8px; border-radius:50%; background:rgba(242,247,243,.4); flex-shrink:0; }
  .event .ebody { flex:1; min-width:0; }
  .event .elbl { display:block; font:800 9.5px var(--f-ui); text-transform:uppercase; letter-spacing:.8px; color:rgba(242,247,243,.45); }
  .event .etx { display:block; font-size:12.5px; font-weight:700; color:rgba(242,247,243,.85); overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }

  /* Diagnose-Badges */
  .pbadge { display:inline-flex; align-items:center; gap:6px; font:800 10px var(--f-ui); padding:5px 10px; border-radius:9px; letter-spacing:.3px; }
  .pbadge.warn { color:#FFCE7A; background:rgba(255,206,122,.12); border:1px solid rgba(255,206,122,.3); }
  .pbadge.crit { color:#FF9D9D; background:rgba(255,157,157,.12); border:1px solid rgba(255,157,157,.35); }
`;

export const STATUS_PILL: Record<string, { bg: string; color: string; label: string }> = {
  ok:       { bg: "rgba(123,232,168,.14)", color: THEME.ok,   label: "Alles OK" },
  info:     { bg: "rgba(154,200,255,.14)", color: THEME.info, label: "Info" },
  warning:  { bg: "rgba(255,206,122,.14)", color: THEME.warn, label: "Warnung" },
  critical: { bg: "rgba(255,157,157,.16)", color: THEME.crit, label: "Kritisch" },
};

/*==============================================================================
 * GROWCTRL – core/theme
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Design-System "Soft Garden" v6 – exakt portiertes Preview-CSS:
 *           warmes Schwarzgruen, EIN einstellbarer Akzent je Zelt (--gc-accent),
 *           runde Radien, weiche Schatten, geteilte Komponenten (Hero/Station/
 *           Checkup-Matrix/Log/Tank/Metric/Sensors/Tent). Status-Ampel (ok/warn/
 *           crit) ist zelt-UNABHAENGIG; nur der Akzent traegt die Zelt-Identitaet.
 * Version : 3.3.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import { css } from "lit";

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

export const STAGE_COLORS: Record<string,{bg:string;color:string}> = {
  Seedling: { bg: "rgba(154,200,255,0.16)", color: "#9AC8FF" },
  Veg:      { bg: "rgba(123,232,168,0.16)", color: "#7BE8A8" },
  Bloom:    { bg: "rgba(255,185,138,0.18)", color: "#FFB98A" },
  Flush:    { bg: "rgba(195,171,245,0.18)", color: "#C3ABF5" },
  Trocknung:{ bg: "rgba(211,168,120,0.18)", color: "#D3A878" },
};

/** Vom Nutzer einstellbarer Karten-Stil (GUI-Editor-Sektion "Stil"). */
export interface StyleConfig {
  background?: string; opacity?: number; glass?: boolean; accent?: string; radius?: number;
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

export const worstLevel = (levels: string[]): "ok"|"info"|"warning"|"critical" => {
  if (levels.includes("critical")) return "critical";
  if (levels.includes("warning")) return "warning";
  if (levels.includes("info")) return "info";
  return "ok";
};

/** Schweregrad -> CSS-Klasse fuer .pill / Punkte. */
export const pillClass = (level: string): string =>
  ({ ok: "ok", info: "info", warning: "warn", critical: "crit", none: "none" } as Record<string,string>)[level] ?? "ok";

export const sharedStyles = css`
  :host {
    display:block;
    /* Akzent je Zelt (Klein gruen / Mittel weinrot / Gross violett) */
    --acc: var(--gc-accent, #7BE8A8);
    --acc-soft: color-mix(in srgb, var(--acc) 13%, transparent);
    --bg:#141B17; --card:#1B2620; --card-2:#222F28; --card-3:#17211B;
    --line:#2E3D34; --line-soft:#27342C;
    --tx:#F2F7F3; --tx-2:#B9CCC0; --tx-3:#85998C;
    --warn:#FFCE7A; --crit:#FF9D9D; --info:#9AC8FF;
    --water:#7CC8F0; --light:#FFDC8A; --temp:#FFB98A; --heat:#FFB35C;
    --r:22px; --r-s:15px; --u:4px;
    --f-ui:"Nunito","Quicksand",var(--primary-font-family,"Inter"),system-ui,sans-serif;
    --f-num:"IBM Plex Mono",ui-monospace,"SF Mono",Menlo,monospace;
    --press:cubic-bezier(.2,.9,.3,1.2);
  }
  *{box-sizing:border-box}      /* verhindert Out-of-Bounds durch Padding+Breite */

  .gc{all:unset; cursor:pointer; touch-action:manipulation; box-sizing:border-box;}
  .clickable{cursor:pointer}
  :focus-visible{outline:2.5px solid var(--acc); outline-offset:2px; border-radius:8px}
  button{transition:transform .16s var(--press), border-color .16s, background .16s, color .16s, box-shadow .16s}
  button:active{transform:scale(.975)}
  ha-icon{display:inline-flex; align-items:center; justify-content:center}
  @media (prefers-reduced-motion: reduce){*,*::before,*::after{transition:none!important; animation:none!important}}

  /* ── Karte ── */
  .card{position:relative; background:var(--gc-bg, linear-gradient(180deg,#202C25,var(--card) 30%));
    border:1px solid var(--line-soft); border-radius:var(--gc-radius,22px); padding:20px;
    box-shadow:0 10px 30px -12px rgba(0,0,0,.45); container-type:inline-size; container-name:gccard}
  .card.glass{backdrop-filter:blur(14px) saturate(1.2); -webkit-backdrop-filter:blur(14px) saturate(1.2)}
  .card[data-level="warning"]{border-color:color-mix(in srgb, var(--warn) 35%, var(--line-soft))}
  .card[data-level="critical"]{border-color:color-mix(in srgb, var(--crit) 42%, var(--line-soft))}

  /* ── Kopfzeile ── */
  .hd{display:flex; align-items:center; gap:12px; margin-bottom:16px}
  .hd .ttl{font-size:17.5px; font-weight:900; letter-spacing:-.2px; line-height:1.15}
  .hd .sub{font-size:12.5px; color:var(--tx-2); margin-top:1px; font-weight:700}
  .hd .grow{flex:1; min-width:0}
  .badge-ic{width:46px; height:46px; border-radius:16px; display:grid; place-items:center; flex-shrink:0;
    background:linear-gradient(135deg, var(--acc-soft), rgba(123,232,168,.04));
    border:1px solid color-mix(in srgb, var(--acc) 30%, transparent); color:var(--acc); font-size:22px}

  /* ── Status-Pille (zelt-UNABHAENGIGE Farben) ── */
  .pill{display:inline-flex; align-items:center; gap:7px; font:800 11.5px var(--f-ui);
    padding:7px 14px; border-radius:999px; letter-spacing:.2px; white-space:nowrap}
  .pill::before{content:""; width:7px; height:7px; border-radius:50%; background:currentColor; box-shadow:0 0 8px currentColor}
  .pill.ok{color:#7BE8A8; background:rgba(123,232,168,.14)}
  .pill.info{color:#9AC8FF; background:rgba(154,200,255,.14)}
  .pill.warn{color:#FFCE7A; background:rgba(255,206,122,.14)}
  .pill.crit{color:#FF9D9D; background:rgba(255,157,157,.16)}
  .pill.none{color:#85998C; background:rgba(133,153,140,.14)}
  .mlbl{font:800 10.5px var(--f-ui); letter-spacing:1.3px; text-transform:uppercase; color:var(--tx-3)}

  /* ── Toggle-Schalter ── */
  .tgl{display:inline-flex; align-items:center; gap:9px; font:800 12.5px var(--f-ui); cursor:pointer;
    min-height:44px; padding:0 16px; border-radius:999px; border:1px solid var(--line);
    background:var(--card-2); color:var(--tx-2)}
  .tgl.on{color:var(--acc); border-color:color-mix(in srgb, var(--acc) 45%, transparent); background:var(--acc-soft)}
  .tgl .sw{width:30px; height:17px; border-radius:999px; background:var(--line); position:relative; transition:.2s; flex-shrink:0}
  .tgl .sw::after{content:""; position:absolute; top:2px; left:2px; width:13px; height:13px; border-radius:50%; background:var(--tx-2); transition:.2s}
  .tgl.on .sw{background:color-mix(in srgb, var(--acc) 35%, transparent)}
  .tgl.on .sw::after{left:15px; background:var(--acc); box-shadow:0 0 7px var(--acc)}

  /* ── KPI-Kacheln ── */
  .kpis{display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr))}
  .kpis.cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
  .kpis.cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
  .kpi{background:var(--card-2); border:1px solid transparent; border-radius:var(--r-s);
    padding:12px; text-align:left; cursor:pointer; width:100%; color:inherit; min-height:44px}
  .kpi:hover{border-color:color-mix(in srgb, var(--acc) 40%, transparent); background:#27362E}
  .kpi .mlbl{display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:9.5px; letter-spacing:.5px}
  .kpi .v{font:700 26px/1.05 var(--f-num); letter-spacing:-1px; margin-top:5px; font-variant-numeric:tabular-nums; display:block}
  .kpi .u{font:600 12px var(--f-num); color:var(--tx-2); margin-left:6px; letter-spacing:0}
  .kpi.c-temp .v{color:var(--temp)} .kpi.c-hum .v{color:var(--water)} .kpi.c-vpd .v{color:var(--acc)}

  /* ── Zonen-Balken (VPD / pH / EC) ── */
  .zones{position:relative; height:11px; border-radius:7px; display:flex; overflow:hidden; box-shadow:inset 0 1px 3px rgba(0,0,0,.4)}
  .zones>i{display:block; height:100%}
  .z-cold{background:#6E97DE} .z-low{background:#E5B567} .z-ok{background:#4CB87E} .z-high{background:#E5B567} .z-bad{background:#D4726F}
  .zmark{position:absolute; top:-3px; bottom:-3px; width:3.5px; margin-left:-1.75px; border-radius:3px; background:#fff; box-shadow:0 0 8px rgba(255,255,255,.9)}
  .zband{position:absolute; top:-2px; bottom:-2px; border:1.5px solid rgba(255,255,255,.85); border-radius:5px; pointer-events:none}
  .zlbl{display:flex; margin-top:6px; font:700 9.5px var(--f-ui); color:var(--tx-3)}
  .zlbl span{text-align:center; overflow:hidden; white-space:nowrap}

  /* ── Balken ── */
  .bar{height:10px; border-radius:6px; background:var(--card-3); overflow:hidden; position:relative; display:block}
  .bar>i{display:block; height:100%; border-radius:6px; transition:width .5s}
  .bar .min{position:absolute; top:-1px; bottom:-1px; width:2.5px; background:rgba(255,255,255,.45)}

  /* ── Versorgungszeile (Licht/Pumpe/DLI/Tank) volle Breite ── */
  .supply{display:block; width:100%; background:var(--card-2); border:1px solid transparent;
    border-radius:var(--r-s); padding:12px 16px; cursor:pointer; text-align:left; color:inherit}
  .supply:hover{border-color:color-mix(in srgb, var(--acc) 35%, transparent)}
  .supply .shd{display:flex; align-items:center; gap:11px}
  .supply .sic{font-size:20px; display:grid; place-items:center; width:26px; flex-shrink:0}
  .supply .stt{font-size:14px; font-weight:800; flex:1; min-width:0}
  .supply .stm{font:700 14px var(--f-num); font-variant-numeric:tabular-nums; flex-shrink:0}
  .supply .bar{margin-top:9px}
  .supply .sft{display:flex; justify-content:space-between; gap:10px; margin-top:6px; font:700 10.5px var(--f-ui); color:var(--tx-3); letter-spacing:.3px}
  .supply .sft span{overflow:hidden; white-space:nowrap; text-overflow:ellipsis}

  /* ── DLI-Statleiste ── */
  .stats{display:grid; grid-template-columns:repeat(3,1fr); gap:8px}
  .stat{background:var(--card-3); border:1px solid var(--line-soft); border-radius:var(--r-s); padding:8px 12px; text-align:center; cursor:pointer; color:inherit; min-height:44px}
  .stat:hover{border-color:color-mix(in srgb, var(--acc) 35%, transparent)}
  .stat .sv{font:700 16px var(--f-num); font-variant-numeric:tabular-nums; color:var(--light); display:block}
  .stat .sl{font:800 9px var(--f-ui); letter-spacing:1.1px; text-transform:uppercase; color:var(--tx-3); margin-top:2px; display:block}

  /* ── Phasen-Dropdown ── */
  .dd{position:relative; display:block; width:100%}
  .dd-btn{display:flex; align-items:center; gap:11px; width:100%; min-height:48px; padding:0 18px;
    font:800 13.5px var(--f-ui); color:var(--tx); cursor:pointer; border-radius:14px; background:var(--card-2); border:1px solid var(--line)}
  .dd-btn:hover{border-color:var(--tx-3)}
  .dd-btn .pdot{width:10px; height:10px; border-radius:50%; background:var(--acc); box-shadow:0 0 8px currentColor; flex-shrink:0}
  .dd-btn .hint{margin-left:auto; font:700 11px var(--f-num); color:var(--tx-3); overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .dd-menu{position:absolute; top:calc(100% + 7px); left:0; right:0; z-index:20;
    background:#222F28; border:1px solid var(--line); border-radius:16px; padding:7px; box-shadow:0 18px 44px -10px rgba(0,0,0,.6)}
  .dd-it{display:flex; align-items:center; gap:12px; width:100%; min-height:46px; padding:0 13px;
    font:800 13px var(--f-ui); color:var(--tx-2); cursor:pointer; border-radius:11px; background:transparent; border:none; text-align:left}
  .dd-it:hover{background:var(--card-3); color:var(--tx)}
  .dd-it[aria-selected="true"]{color:var(--acc); background:var(--acc-soft)}
  .dd-it .pdot{width:10px; height:10px; border-radius:50%; flex-shrink:0}
  .dd-it .hint{margin-left:auto; font:700 10.5px var(--f-num); color:var(--tx-3)}
  .pd-seed{background:var(--info)} .pd-veg{background:var(--acc)} .pd-bloom{background:var(--temp)} .pd-flush{background:#C3ABF5} .pd-dry{background:#D3A878}

  /* ── Aktor-Raster (4 nebeneinander) ── */
  .acts{display:grid; grid-template-columns:repeat(4,1fr); gap:8px}
  .act{background:var(--card-2); border:1px solid transparent; border-radius:var(--r-s); cursor:pointer; padding:8px 4px; text-align:center; color:var(--tx-3); min-height:62px}
  .act:hover{border-color:var(--tx-3)}
  .act .aic{font-size:18px; display:block; margin:0 auto 4px}
  .act .anm{font:800 10px var(--f-ui); color:var(--tx-2); display:block; line-height:1.15}
  .act .ast{font:700 8.5px var(--f-num); letter-spacing:.8px; margin-top:2px; display:block}
  .act.on{border-color:color-mix(in srgb, var(--acc) 45%, transparent); color:var(--acc); background:linear-gradient(160deg, var(--acc-soft), var(--card-2))}
  .act.on .anm{color:var(--tx)}
  .act.on.light{border-color:rgba(255,220,138,.5); color:var(--light); background:linear-gradient(160deg, rgba(255,220,138,.13), var(--card-2))}
  .act.on.heat{border-color:rgba(255,179,92,.5); color:var(--heat); background:linear-gradient(160deg, rgba(255,179,92,.14), var(--card-2))}
  .act.on.water{border-color:rgba(124,200,240,.5); color:var(--water); background:linear-gradient(160deg, rgba(124,200,240,.14), var(--card-2))}

  /* ── Buttons im Kopf ── */
  .chip-auto{font:900 12px var(--f-ui); letter-spacing:.5px; min-height:42px; padding:0 18px; border-radius:999px; cursor:pointer; color:#0D1812; background:var(--acc); border:none; box-shadow:0 4px 16px -4px var(--acc); white-space:nowrap}
  .chip-auto.off{color:var(--tx-3); background:var(--card-2); border:1px solid var(--line); box-shadow:none}
  .icbtn{width:42px; height:42px; border-radius:13px; display:grid; place-items:center; cursor:pointer; background:var(--card-2); border:1px solid var(--line); color:var(--tx-2); font-size:16px; flex-shrink:0}
  .icbtn:hover{color:var(--tx); border-color:var(--tx-3)}
  .icbtn.on{color:var(--warn); border-color:color-mix(in srgb, var(--warn) 50%, transparent); background:rgba(255,206,122,.14)}

  /* ── Pflanzen-Tabs + Panel ── */
  .ptabs{display:flex; gap:7px; flex-wrap:wrap}
  .ptab{display:inline-flex; align-items:center; gap:8px; font:800 12.5px var(--f-ui); min-height:42px; padding:0 16px; border-radius:999px; cursor:pointer; border:1.5px solid var(--line); background:transparent; color:var(--tx-2)}
  .ptab[aria-selected="true"]{color:var(--acc); border-color:color-mix(in srgb, var(--acc) 50%, transparent); background:var(--acc-soft)}
  .plant{background:linear-gradient(150deg, var(--acc-soft), var(--card-2) 45%); border:1px solid var(--line-soft); border-radius:var(--r-s); padding:16px; margin-top:8px}
  .plant .phd{display:flex; gap:12px; align-items:center}
  .plant .pimg{width:60px; height:60px; border-radius:18px; display:grid; place-items:center; flex-shrink:0; font-size:27px;
    background:linear-gradient(135deg, var(--acc-soft), transparent); border:1.5px solid color-mix(in srgb, var(--acc) 30%, transparent); color:var(--acc); object-fit:cover}
  .plant .pname{font-size:16.5px; font-weight:900; letter-spacing:-.2px}
  .plant .pstrain{font-size:12.5px; color:var(--tx-2); font-weight:700; margin-top:1px}
  .agechip{display:inline-block; margin-top:5px; font:800 11px var(--f-num); color:var(--acc); background:var(--acc-soft); border:1px solid color-mix(in srgb, var(--acc) 30%, transparent); border-radius:8px; padding:3px 10px}

  /* ── Indikator-Block (Sensor) ── */
  .ind{background:var(--card-3); border:1px solid var(--line-soft); border-radius:var(--r-s); padding:12px; margin-top:10px; cursor:pointer; width:100%; text-align:left; color:inherit}
  .ind:hover{border-color:color-mix(in srgb, var(--acc) 35%, transparent)}
  .ind .ihd{display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:12px}
  .ind .ilbl{font:800 11px var(--f-ui); letter-spacing:1.1px; text-transform:uppercase; display:inline-flex; align-items:center; gap:7px; min-width:0}
  .ind .ival{font:700 19px var(--f-num); font-variant-numeric:tabular-nums; flex-shrink:0; white-space:nowrap}
  .ind .ival .u{font-size:11px; color:var(--tx-2); margin-left:5px; letter-spacing:0}
  .spark{display:block; width:100%; height:38px; margin-top:6px}

  /* setzbare Werte (number/input_number): −/＋-Stepper */
  .setrow{display:inline-flex; align-items:center; gap:9px; flex-shrink:0}
  .stepbtn{width:32px; height:32px; border-radius:10px; display:grid; place-items:center; cursor:pointer; color:var(--acc); background:var(--acc-soft); border:1px solid color-mix(in srgb, var(--acc) 35%, transparent)}
  .stepbtn:hover{background:color-mix(in srgb, var(--acc) 24%, transparent)}
  .setval{font:700 19px var(--f-num); font-variant-numeric:tabular-nums; min-width:58px; text-align:center}
  .setval .u{font-size:11px; color:var(--tx-2); margin-left:5px; letter-spacing:0}

  /* ── Ereignisfeld ── */
  .event{display:flex; align-items:center; gap:12px; border-radius:var(--r-s); cursor:pointer; width:100%; text-align:left; color:inherit; background:var(--card-3); border:1px dashed var(--line); padding:12px; min-height:46px}
  .event:hover{border-color:color-mix(in srgb, var(--acc) 40%, transparent)}
  .event .edot{width:8px; height:8px; border-radius:50%; background:var(--tx-3); flex-shrink:0}
  .event .etx{flex:1; min-width:0; font-size:12.5px; font-weight:800; color:var(--tx-2); overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .event .etm{font:700 10.5px var(--f-num); color:var(--tx-3); flex-shrink:0}

  /* ── Ereignisprotokoll ── */
  .log{display:flex; flex-direction:column; gap:3px}
  .lrow{display:flex; align-items:center; gap:12px; padding:10px 13px; border-radius:12px; cursor:pointer; width:100%; text-align:left; color:inherit; background:transparent; border:none; min-height:44px}
  .lrow:hover{background:var(--card-2)}
  .lrow .tm{font:700 11px var(--f-num); color:var(--tx-3); width:42px; flex-shrink:0}
  .lrow .who{font:800 11px var(--f-ui); color:var(--tx-2); width:104px; flex-shrink:0; overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .lrow .what{font-size:12.5px; font-weight:700; color:var(--tx); flex:1; min-width:0; overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .lrow.w{background:rgba(255,206,122,.08)} .lrow.w .what{color:var(--warn)}
  .lrow.c{background:rgba(255,157,157,.09)} .lrow.c .what{color:var(--crit)}
  .lrow.i .what{color:var(--tx)}

  /* ── Checkup-Matrix ── */
  .matrix{display:grid; grid-template-columns:1fr repeat(4,52px); gap:3px; font-size:12px}
  .matrix.m4{grid-template-columns:1fr repeat(4,minmax(0,52px))}
  .matrix.m5{grid-template-columns:1fr repeat(5,minmax(0,46px))}
  .matrix .mh{font:800 9.5px var(--f-ui); letter-spacing:.8px; text-transform:uppercase; color:var(--tx-3); text-align:center; padding:6px 2px}
  .matrix .mn{padding:12px 11px; background:var(--card-2); border-radius:12px 0 0 12px; font-weight:800; display:flex; align-items:center; overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .matrix .mc{display:grid; place-items:center; background:var(--card-2); cursor:pointer; border:none; min-height:46px; color:inherit}
  .matrix .mc:hover{background:#27362E}
  .matrix .mc:last-child{border-radius:0 12px 12px 0}
  .dot{width:11px; height:11px; border-radius:50%}
  .dot.ok{background:var(--acc); box-shadow:0 0 8px color-mix(in srgb, var(--acc) 70%, transparent)}
  .dot.warn{background:var(--warn); box-shadow:0 0 8px rgba(255,206,122,.7)}
  .dot.crit{background:var(--crit); box-shadow:0 0 8px rgba(255,157,157,.7)}
  .dot.info{background:var(--info); box-shadow:0 0 8px rgba(154,200,255,.6)}
  .dot.off{background:var(--line)}

  /* ── Tank vertikal ── */
  .tankv{width:76px; height:98px; border-radius:18px; border:1.5px solid var(--line); position:relative; overflow:hidden; background:var(--card-3); flex-shrink:0}
  .tankv .fill{position:absolute; left:0; right:0; bottom:0; background:linear-gradient(180deg, rgba(124,200,240,.85), rgba(124,200,240,.5)); border-top:2px solid rgba(255,255,255,.5); transition:height .8s}
  .tankv .minl{position:absolute; left:0; right:0; height:1.5px; background:rgba(255,255,255,.35)}

  /* ── Chart + Legende ── */
  .chart{display:block; width:100%}
  .legend{display:flex; gap:14px; flex-wrap:wrap; margin-top:8px; font:800 11.5px var(--f-ui); color:var(--tx-2)}
  .legend i{display:inline-block; width:14px; height:3.5px; border-radius:2px; margin-right:6px; vertical-align:middle}

  /* ── Diagnose-Badges + Sektionslabel + Settings ── */
  .seclbl{font:800 10.5px var(--f-ui); text-transform:uppercase; letter-spacing:1.3px; color:var(--tx-3); margin:14px 0 8px}
  .pbadge{display:inline-flex; align-items:center; gap:6px; font:800 10px var(--f-ui); padding:5px 10px; border-radius:9px; letter-spacing:.3px}
  .pbadge.warn{color:var(--warn); background:rgba(255,206,122,.12); border:1px solid rgba(255,206,122,.3)}
  .pbadge.crit{color:var(--crit); background:rgba(255,157,157,.12); border:1px solid rgba(255,157,157,.35)}
  .settings-grid{display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr))}
  .settings-grid .skv{background:var(--card-2); border:1px solid transparent; border-radius:var(--r-s); padding:11px 13px; text-align:left; cursor:pointer; color:inherit; min-width:0}
  .settings-grid .skv:hover{border-color:color-mix(in srgb, var(--acc) 35%, transparent)}
  .settings-grid .skv .k{font:800 10px var(--f-ui); letter-spacing:.8px; text-transform:uppercase; color:var(--tx-3)}
  .settings-grid .skv .vv{font:800 14px var(--f-num); color:var(--tx); margin-top:3px}

  /* ── Dynamische Skalierung: groessere Schrift in breiten Karten (PC/Tablet) ── */
  @container gccard (min-width: 460px){
    .hd .ttl{font-size:20px} .hd .sub{font-size:14px}
    .badge-ic{width:52px; height:52px; font-size:25px}
    .pill{font-size:13px; padding:8px 16px}
    .mlbl{font-size:12px}
    .tgl{font-size:14px; min-height:48px} .tgl .sw{width:34px; height:19px}
    .tgl .sw::after{width:15px; height:15px} .tgl.on .sw::after{left:17px}
    .kpi .mlbl{font-size:11px} .kpi .v{font-size:31px} .kpi .u{font-size:14px}
    .zones{height:13px} .zlbl{font-size:11.5px}
    .bar{height:12px}
    .supply .sic{font-size:23px; width:30px} .supply .stt{font-size:16px} .supply .stm{font-size:16px} .supply .sft{font-size:12px}
    .ind .ilbl{font-size:12.5px} .ind .ival{font-size:22px} .ind .ival .u{font-size:13px}
    .setval{font-size:22px} .setval .u{font-size:13px} .stepbtn{width:36px; height:36px}
    .dd-btn{font-size:15.5px; min-height:52px} .dd-it{font-size:15px; min-height:50px}
    .dd-btn .hint, .dd-it .hint{font-size:12px}
    .lrow .tm{font-size:12.5px; width:48px} .lrow .who{font-size:12.5px; width:128px} .lrow .what{font-size:14px}
    .matrix .mh{font-size:11px} .matrix .mn{font-size:14px} .dot{width:13px; height:13px}
    .seclbl{font-size:12px} .legend{font-size:13px}
    .ptab{font-size:14px; min-height:46px} .chip-auto{font-size:14px; min-height:46px}
    .agechip{font-size:12.5px}
    .plant .pname{font-size:19px} .plant .pstrain{font-size:14px}
    .plant .pimg{width:68px; height:68px; font-size:31px}
    .event .etx{font-size:14px} .event .etm{font-size:12px}
    .settings-grid .skv .k{font-size:11.5px} .settings-grid .skv .vv{font-size:16px}
    .stat .sv{font-size:18px} .stat .sl{font-size:10.5px}
    .act .aic{font-size:21px} .act .anm{font-size:11.5px} .act .ast{font-size:9.5px}
  }
  @container gccard (min-width: 680px){
    .hd .ttl{font-size:22px} .kpi .v{font-size:34px} .kpi .u{font-size:15px}
    .ind .ival{font-size:24px} .setval{font-size:24px}
    .supply .stt{font-size:17px} .supply .stm{font-size:17px}
    .lrow .what{font-size:15px} .plant .pname{font-size:21px}
  }

  @media (max-width: 480px){
    .card{padding:15px 14px}
    .kpis{grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px}
    .kpi .v{font-size:21px}
    .settings-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .matrix{grid-template-columns:1fr repeat(4,44px)}
    .matrix.m4{grid-template-columns:1fr repeat(4,40px)}
    .matrix.m5{grid-template-columns:1fr repeat(5,33px)}
    .lrow .who{width:84px}
  }
`;

export const STATUS_PILL: Record<string, { bg: string; color: string; label: string }> = {
  ok:       { bg: "rgba(123,232,168,.14)", color: THEME.ok,   label: "Alles OK" },
  info:     { bg: "rgba(154,200,255,.14)", color: THEME.info, label: "Info" },
  warning:  { bg: "rgba(255,206,122,.14)", color: THEME.warn, label: "Warnung" },
  critical: { bg: "rgba(255,157,157,.16)", color: THEME.crit, label: "Kritisch" },
  none:     { bg: "rgba(133,153,140,.14)", color: "#85998C", label: "Inaktiv" },
};

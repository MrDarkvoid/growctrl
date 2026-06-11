/*==============================================================================
 * GROWCTRL – bundle
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Bundle-Einstieg: registriert alle GROWCTRL-Karten. Build-Ziel: dist/growctrl-cards.js (HACS Dashboard-Repo).
 * Version : 2.2.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import "./tent/card";
import "./station/card";
import "./controls/card";
import "./sensors/card";
import "./plants/card";
import "./status/card";
import "./hero/card";
import "./checkup/card";
import "./tank/card";
import "./history/card";
import "./metric/card";

const VERSION = "2.2.0";
const CARDS = [
  { type: "growctrl-tent-card",     name: "GROWCTRL Tent",     description: "Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel" },
  { type: "growctrl-station-card",  name: "GROWCTRL Station",  description: "Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration" },
  { type: "growctrl-controls-card", name: "GROWCTRL Controls", description: "Aktoren-Raster mit Gruppen und Bestaetigung" },
  { type: "growctrl-sensors-card",  name: "GROWCTRL Sensors",  description: "Sensor-Kacheln mit Sparklines" },
  { type: "growctrl-plants-card",   name: "GROWCTRL Plants",   description: "Pflanzen, Keimdatum, Kalender" },
  { type: "growctrl-status-card",   name: "GROWCTRL Status",   description: "Uebersetzte Logs, Ampel, Experten-Modus" },
  { type: "growctrl-hero-card",     name: "GROWCTRL Hero",     description: "Globale Steuerung, Klima-KPIs, VPD-Chart, Informationssystem" },
  { type: "growctrl-checkup-card",  name: "GROWCTRL Checkup",  description: "Ampel-Uebersicht aller Zelte/Stationen mit Auswertung" },
  { type: "growctrl-tank-card",     name: "GROWCTRL Tank",     description: "DWC-Fuellstand mit Animation und Warnstufe" },
  { type: "growctrl-history-card",  name: "GROWCTRL History",  description: "24h-Diagramm (z.B. Temperatur + Luftfeuchte)" },
  { type: "growctrl-metric-card",   name: "GROWCTRL Metric",   description: "EC/pH gross mit Chart und Sollbereich" },
];

declare global { interface Window { customCards?: any[] } }
window.customCards = window.customCards ?? [];
CARDS.forEach(c => window.customCards!.push({ ...c, preview: false, documentationURL: "https://github.com/MrDarkvoid/growctrl" }));

// eslint-disable-next-line no-console
console.info(`%c GROWCTRL Cards %c v${VERSION} `, "background:#1D9E75;color:#fff;font-weight:700", "background:#0F6E56;color:#fff");

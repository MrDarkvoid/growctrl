/*==============================================================================
 * GROWCTRL – bundle
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Bundle-Einstieg: registriert alle GROWCTRL-Karten. Build-Ziel: dist/growctrl-cards.js (HACS Dashboard-Repo).
 * Version : 2.0.0  |  Lizenz: MIT
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

import "./tent/card";
import "./station/card";
import "./controls/card";
import "./sensors/card";
import "./plants/card";
import "./status/card";

const VERSION = "2.0.0";
const CARDS = [
  { type: "growctrl-tent-card",     name: "GROWCTRL Tent",     description: "Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel" },
  { type: "growctrl-station-card",  name: "GROWCTRL Station",  description: "Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration" },
  { type: "growctrl-controls-card", name: "GROWCTRL Controls", description: "Aktoren-Raster mit Gruppen und Bestaetigung" },
  { type: "growctrl-sensors-card",  name: "GROWCTRL Sensors",  description: "Sensor-Kacheln mit Sparklines" },
  { type: "growctrl-plants-card",   name: "GROWCTRL Plants",   description: "Pflanzen, Keimdatum, Kalender" },
  { type: "growctrl-status-card",   name: "GROWCTRL Status",   description: "Uebersetzte Logs, Ampel, Experten-Modus" },
];

declare global { interface Window { customCards?: any[] } }
window.customCards = window.customCards ?? [];
CARDS.forEach(c => window.customCards!.push({ ...c, preview: false, documentationURL: "https://github.com/MrDarkvoid/growctrl" }));

// eslint-disable-next-line no-console
console.info(`%c GROWCTRL Cards %c v${VERSION} `, "background:#1D9E75;color:#fff;font-weight:700", "background:#0F6E56;color:#fff");

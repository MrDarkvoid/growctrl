/*==============================================================================
 * GROWCTRL – core/vpd
 * Projekt : GROWCTRL – Home-Assistant-Gesamtsystem fuer Growzelte
 * Zweck   : Die EINE VPD-Implementierung (Magnus) inkl. Blattoffset und Zonen. Loest Issue #5.
 * Version : 2.0.0  |  Lizenz: GC-SAL 1.0 (siehe LICENSE)
 * Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
 *============================================================================*/

/** Saettigungsdampfdruck (kPa), Magnus-Formel. */
export const svp = (tC: number): number => 0.61078 * Math.exp((17.27 * tC) / (tC + 237.3));

/** VPD in kPa. leafOffset: Blatttemperatur = Lufttemperatur + offset (typ. -1..-2K). */
export const vpd = (tC: number, rh: number, leafOffset = 0): number => {
  const leaf = tC + leafOffset;
  return svp(leaf) - svp(tC) * (rh / 100);
};

export interface VpdZone { max: number; label: string; color: string; }
/** Zonen fuer die Skala (kPa). */
export const VPD_ZONES: VpdZone[] = [
  { max: 0.4, label: "Zu feucht",   color: "#4FC3F7" },
  { max: 0.8, label: "Seedling",    color: "#7EC8FF" },
  { max: 1.2, label: "Veg",         color: "#7EE87E" },
  { max: 1.6, label: "Bloom",       color: "#FFB432" },
  { max: 9.9, label: "Zu trocken",  color: "#FF6B6B" },
];
export const vpdZone = (v: number): VpdZone => VPD_ZONES.find(z => v <= z.max) ?? VPD_ZONES[VPD_ZONES.length-1];

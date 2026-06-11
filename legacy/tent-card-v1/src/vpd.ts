/* VPD-Berechnung und Zonen-Skala */

/** Sättigungsdampfdruck in kPa (Magnus-Formel) */
export function svp(tempC: number): number {
  return 0.61078 * Math.exp((17.27 * tempC) / (tempC + 237.3));
}

/**
 * Blatt-VPD in kPa.
 * @param airTemp Lufttemperatur °C
 * @param rh relative Feuchte %
 * @param leafOffset Blatttemperatur-Offset in K (typisch -2)
 */
export function calcVpd(airTemp: number, rh: number, leafOffset = -2): number {
  const vpd = svp(airTemp + leafOffset) - svp(airTemp) * (rh / 100);
  return Math.max(0, Math.round(vpd * 100) / 100);
}

export interface VpdZone {
  /** Obergrenze der Zone in kPa */
  max: number;
  label: string;
  color: string;
}

/** Zonen für die Skala. Feste Ampelfarben, bewusst Theme-unabhängig lesbar. */
export const VPD_ZONES: VpdZone[] = [
  { max: 0.4, label: 'Zu niedrig', color: '#4f7cd1' },
  { max: 0.8, label: 'Steckling',  color: '#5db17a' },
  { max: 1.2, label: 'Vegetativ',  color: '#3e9d52' },
  { max: 1.6, label: 'Blüte',      color: '#d9a13b' },
  { max: 2.4, label: 'Zu hoch',    color: '#cf5b4c' },
];

export const VPD_SCALE_MAX = 2.4;

export function vpdZone(vpd: number): VpdZone {
  for (const z of VPD_ZONES) if (vpd <= z.max) return z;
  return VPD_ZONES[VPD_ZONES.length - 1];
}

/* Übersetzung der GROWCTRL-Rohlogs (input_text) in menschenlesbare Zeilen
 * mit Schweregrad. Portiert aus der bisherigen button-card-Logik. */

export type LogLevel = 'critical' | 'warning' | 'info' | 'ok' | 'none';

export interface LogLine {
  level: LogLevel;
  label: string;
  ts: string;
}

const isEmpty = (raw?: string): boolean =>
  !raw || ['unknown', 'unavailable', ''].includes(raw);

const tsOf = (raw: string): string => (raw.length >= 16 ? raw.substring(11, 16) : '');

/** Klima-Log: "IST CIRC=on HUM=OFF REQ=ON", SENSOR INVALID, MAINTENANCE ... */
export function translateClimateLog(raw?: string): LogLine {
  if (isEmpty(raw)) return { level: 'none', label: '—', ts: '' };
  const r = raw as string;
  const ts = tsOf(r);
  if (r.includes('SENSOR INVALID'))
    return { level: 'critical', label: '🚨 Sensor ungültig — Befeuchtung gesperrt', ts };
  if (r.includes('MAINTENANCE')) return { level: 'info', label: '🔧 Wartungsmodus aktiv', ts };
  if (r.includes('TESTMODE')) return { level: 'info', label: '🧪 Testmodus aktiv', ts };
  if (r.includes('AUTO OFF'))
    return { level: 'info', label: '🔴 Klima-Automatik deaktiviert', ts };

  const circ = r.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase();
  const humM = r.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase();
  const reqM = r.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();
  if (humM !== undefined) {
    const parts: string[] = [];
    if (circ === 'on') parts.push('Umluft AN');
    else if (circ === 'manual') parts.push('Umluft Manuell');
    else if (circ === 'off') parts.push('Umluft AUS');
    parts.push(humM === 'ON' ? 'Befeuchtung AN' : 'Befeuchtung AUS');
    parts.push(reqM === 'ON' ? 'Entfeuchtung AN' : 'Entfeuchtung AUS');
    if (r.includes('ZENTRAL-BLOCK')) parts.push('(Zentral-Block)');
    return { level: 'ok', label: parts.join(' · '), ts };
  }
  return {
    level: 'ok',
    label: r.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/, '').substring(0, 45),
    ts,
  };
}

/** Stations-Log: FAILSAFE, MISMATCH (IST/SOLL), LIGHT/PUMP/O2/FAN-Events, STAGE → ... */
export function translateStationLog(raw?: string): LogLine {
  if (isEmpty(raw)) return { level: 'none', label: '—', ts: '' };
  const r = raw as string;
  const ts = tsOf(r);
  if (r.includes('FAILSAFE LIGHT'))
    return {
      level: 'critical',
      label: '🚨 Failsafe: Licht-Zwangsabschaltung — Auto deaktiviert',
      ts,
    };
  if (r.includes('FAILSAFE PUMP'))
    return {
      level: 'critical',
      label: '🚨 Failsafe: Pumpen-Zwangsabschaltung — Auto deaktiviert',
      ts,
    };
  if (r.includes('TIME INVALID'))
    return { level: 'critical', label: '⚠️ Lichtzeiten nicht konfiguriert', ts };

  if (r.includes('MISMATCH')) {
    const istL = r.match(/IST.*?\bL=(\w+)/i)?.[1];
    const sollL = r.match(/SOLL.*?\bL=(\w+)/i)?.[1];
    const istP = r.match(/IST.*?\bP=(\w+)/i)?.[1];
    const sollP = r.match(/SOLL.*?\bP=(\w+)/i)?.[1];
    const istO2 = r.match(/IST.*?\bO2=(\w+)/i)?.[1];
    const sollO2 = r.match(/SOLL.*?\bO2=(\w+)/i)?.[1];
    const issues: string[] = [];
    if (istL && sollL && istL !== sollL)
      issues.push(`Licht (IST ${istL.toUpperCase()} / SOLL ${sollL.toUpperCase()})`);
    if (istP && sollP && istP !== sollP)
      issues.push(`Pumpe (IST ${istP.toUpperCase()} / SOLL ${sollP.toUpperCase()})`);
    if (istO2 && sollO2 && istO2 !== sollO2)
      issues.push(`O₂ (IST ${istO2.toUpperCase()} / SOLL ${sollO2.toUpperCase()})`);
    return {
      level: 'warning',
      label: '⚠️ Gerät antwortet nicht: ' + (issues.join(', ') || 'Abweichung'),
      ts,
    };
  }
  if (r.includes('MAINTENANCE')) return { level: 'info', label: '🔧 Wartungsmodus aktiv', ts };
  if (r.includes('TESTMODE')) return { level: 'info', label: '🧪 Testmodus aktiv', ts };

  const istL = r.match(/IST.*?\bL=(\w+)/i)?.[1];
  const istP = r.match(/IST.*?\bP=(\w+)/i)?.[1];
  const istO2 = r.match(/IST.*?\bO2=(\w+)/i)?.[1];
  const ovr = r.includes('OVRUNTIL') ? ' (Override aktiv)' : '';
  const stateStr = [
    istL && istL !== 'n/a' ? (istL === 'on' ? '💡 Licht AN' : '🌑 Licht AUS') : null,
    istP && istP !== 'n/a' ? (istP === 'on' ? '💧 Pumpe AN' : '⏸️ Pumpe AUS') : null,
    istO2 && istO2 !== 'n/a' ? (istO2 === 'on' ? '🫧 O₂ AN' : '🫧 O₂ AUS') : null,
  ]
    .filter(Boolean)
    .join(' · ');

  let prefix = '';
  if (r.includes('AUTO ON')) prefix = '🟢 Auto gestartet';
  else if (r.includes('AUTO OFF')) prefix = '🔴 Auto gestoppt';
  else if (r.match(/STAGE\s*→/)) {
    const s = r.match(/STAGE\s*→\s*(\w+)/)?.[1];
    prefix = `🌱 Phase: ${s || ''}`;
  } else if (r.includes('LIGHT → ON')) prefix = '💡 Licht eingeschaltet';
  else if (r.includes('LIGHT → OFF')) prefix = '🌑 Licht ausgeschaltet';
  else if (r.includes('PUMP → ON')) prefix = '💧 Pumpe eingeschaltet';
  else if (r.includes('PUMP → OFF')) prefix = '⏸️ Pumpe ausgeschaltet';
  else if (r.includes('O2 → ON')) prefix = '🫧 O₂ eingeschaltet';
  else if (r.includes('FAN → ON')) prefix = '🌀 Lüfter eingeschaltet';
  else if (r.includes('MANUAL OVERRIDE')) prefix = '✋ Manuell übersteuert';
  else if (r.includes('OVERRIDE END')) prefix = '✅ Override beendet';

  const label = [prefix, stateStr].filter(Boolean).join(' — ') + ovr;
  return { level: 'ok', label: label || r.substring(17, 55), ts };
}

/** Unbekanntes Format: nur Datums-Präfix abschneiden */
export function translateRawLog(raw?: string): LogLine {
  if (isEmpty(raw)) return { level: 'none', label: '—', ts: '' };
  const r = raw as string;
  return {
    level: 'ok',
    label: r.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?\s*/, '').substring(0, 60),
    ts: tsOf(r),
  };
}

/** Pumpen-Status aus dem Stations-Log (IST ... P=on) */
export function pumpOnFromLog(raw?: string): boolean | undefined {
  if (isEmpty(raw)) return undefined;
  const m = (raw as string).match(/IST.*?\bP=(\w+)/i);
  return m ? m[1].toLowerCase() === 'on' : undefined;
}

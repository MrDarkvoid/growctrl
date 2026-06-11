import './card';
import './editor';

declare global {
  interface Window {
    customCards?: any[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'growctrl-tent-card',
  name: 'GROWCTRL Tent Card',
  description:
    'Growzelt-Übersicht: Klima & VPD-Zone, Sensoren mit Sparklines, Steuerung, Grow-Phasen und Pflanzen (DWC & Erde).',
  preview: true,
  documentationURL: 'https://github.com/your-user/growctrl-tent-card',
});

console.info(
  '%c GROWCTRL-TENT-CARD %c v1.3.0 ',
  'background:#3e9d52;color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px',
  'background:#444;color:#fff;border-radius:0 4px 4px 0;padding:2px 6px'
);

# Mitwirken an GROWCTRL

Danke für dein Interesse! Ein paar Regeln halten das Projekt konsistent:

1. **Sprache:** Doku und Kommentare auf Deutsch, technische Bezeichner (Entity-IDs, Code) auf Englisch/ASCII.
2. **Keine duplizierte Logik:** Gemeinsames gehört nach `cards/core` (TS) bzw. in die Integration (Python).
3. **Kopfblock:** Jede neue Datei erhält den GROWCTRL-Kopfblock (Vorlage: beliebige Datei in `legacy/`).
4. **Legacy ist eingefroren:** In `legacy/` nur kritische Fixes – Weiterentwicklung findet in
   `cards/` und `custom_components/growctrl/` statt.
5. **Keine privaten Daten:** Keine Tokens, IPs, Standorte, Klarnamen. Secrets ausschließlich via `!secret`.
6. **Issues:** Bekannte Probleme sind in `docs/phase0_bestandsaufnahme.md` nummeriert – bitte referenzieren.

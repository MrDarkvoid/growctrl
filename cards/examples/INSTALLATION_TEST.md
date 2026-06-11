# Karten testen (manuell, ohne HACS)
1. `cards/dist/growctrl-cards.js` nach `/config/www/growctrl-cards.js` kopieren.
2. HA: Einstellungen → Dashboards → ⋮ → **Ressourcen** → Hinzufügen:
   URL `/local/growctrl-cards.js`, Typ **JavaScript-Modul**.
3. Browser-Cache leeren (Strg+F5). In der Browser-Konsole erscheint `GROWCTRL Cards v2.0.0`.
4. Beispiel-Views aus diesem Ordner in ein Dashboard (Raw-Editor) einfügen.

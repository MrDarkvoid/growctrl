# GROWCTRL – Logo & Branding

## Logo im Repo
- `assets/logo/GrowCTRL-Logo.svg` – Vektor-Original
- `assets/logo/logo.png` – PNG (687×687)

## Integrations-Logo in Home Assistant (wichtig zu wissen)
HA lädt Integrations-Logos **nicht aus dem eigenen Repo**, sondern zentral von
`brands.home-assistant.io`. Damit GROWCTRL dort mit Logo erscheint, ist ein
**Pull Request ins Repo [home-assistant/brands](https://github.com/home-assistant/brands)** nötig:

1. Fork von `home-assistant/brands`
2. Ordner `custom_integrations/growctrl/` anlegen
3. Die fertig erzeugten Dateien aus diesem Repo (`docs/brands/custom_integrations/growctrl/`)
   hineinkopieren: `icon.png` (256×256), `icon@2x.png` (512×512), `logo.png`, `logo@2x.png`
4. PR stellen — nach dem Merge zeigt HA das Logo automatisch bei der Integration an.

Bis dahin zeigt HA einen Platzhalter. Das ist normal und kein Fehler der Integration.

## Logo in den Karten (sofort nutzbar)
Die **Hero-Karte** hat ein `logo:`-Feld. Datei nach `/config/www/growctrl/logo.png`
kopieren und konfigurieren:

```yaml
type: custom:growctrl-hero-card
logo: /local/growctrl/logo.png
```

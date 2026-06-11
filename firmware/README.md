# Optionale GROWCTRL-Hardware (ESPHome)
Relay Board v4 (ESP32, 8 Relais, RS485-Addon-System mit MQTT Discovery) und Sensor Node v4
(ESP32-C3, AHT21+ENS160, TSL2591, 2x DS18B20). HA steuert – die Hardware ist der verlängerte Arm.

Benötigte `secrets.yaml` (Beispiel, Werte ersetzen):
```yaml
wifi_ssid: "DEIN_WLAN"
wifi_password: "CHANGE_ME"
api_encryption_key: "CHANGE_ME"
ota_password: "CHANGE_ME"
mqtt_broker: "homeassistant.local"
mqtt_user: "CHANGE_ME"
mqtt_password: "CHANGE_ME"
ap_fallback_password: "CHANGE_ME"
```

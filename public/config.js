// En el computador local se usa el broker incluido en server.js.
// En GitHub Pages se usa MQTT público seguro: no requiere PowerShell ni servidor propio.
// No pongas aquí claves privadas: este archivo se publica junto al sitio.
const tactoLocal = /^(localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+)$/.test(location.hostname);
window.TACTO_CONFIG = tactoLocal ? {} : {
  broker: 'wss://broker.emqx.io:8084/mqtt',
};

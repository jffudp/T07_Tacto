# NEON SALVAGE

Juego audiovisual original de plataformas futuristas para computador controlado desde un teléfono mediante MQTT y Tacto. El computador muestra el mundo del juego; el teléfono es una extensión física del mando.

## Cómo jugar

1. Para prueba local, ejecuta `node server.js`.
2. En el PC abre `https://localhost:8443/` y acepta el certificado local.
3. Escanea el QR con el S24, acepta el certificado, escribe tu nombre y presiona **Conectar**.
4. En el teléfono activa **Giro**, **Micrófono** y **Cámara**; concede los permisos cuando Android los pida.
5. En el PC pulsa **SONIDO: OFF** para activar audio.

El servidor local incorpora el broker MQTT. Ambos dispositivos quedan sincronizados por el código de sala que el QR agrega automáticamente a la URL del teléfono.

## Publicar sin PowerShell: GitHub Pages

La carpeta `public/` ya es una web estática y el flujo `.github/workflows/pages.yml` la publica automáticamente. En GitHub Pages no se ejecuta `server.js`: la aplicación cambia sola a un broker MQTT público con WebSocket seguro, por lo que PC y S24 funcionan desde Internet.

1. Crea un repositorio en GitHub y sube esta carpeta.
2. En **Settings → Pages**, selecciona **GitHub Actions** como fuente de publicación.
3. Envía los cambios a la rama `main`.
4. Abre `https://TU-USUARIO.github.io/TU-REPOSITORIO/` en el PC.
5. Escanea el QR desde iOS o Android; también puedes usar **COPIAR ENLACE DEL S24** si prefieres enviarlo por mensaje. Ambos usarán la misma sala.

En GitHub Pages el QR se genera desde un servicio web y el botón de copia queda como alternativa. La sala se crea con 12 caracteres para evitar cruces accidentales en el broker público.

### Archivos para subir a GitHub

Sube la carpeta del proyecto completa, **excepto** `node_modules/`, `.cert/`, `_v1/`, archivos `.zip` y la carpeta `.git/`. Ya están excluidos por `.gitignore`.

Estos son los archivos y carpetas que debe tener el repositorio:

- `.github/workflows/pages.yml` — publica automáticamente el sitio.
- `.gitignore`, `README.md`, `package.json`, `package-lock.json` y `server.js` — permiten conservar y ejecutar la versión local.
- La carpeta completa `public/` — contiene el juego, el mando, estilos, scripts, icono y MQTT para el navegador.

No subas certificados locales ni `node_modules`: GitHub Pages no los necesita y el repositorio se mantiene liviano.

### iOS y Android

GitHub Pages usa HTTPS, requisito para cámara, micrófono y movimiento. En ambos sistemas abre el enlace en Safari o Chrome y acepta cada permiso cuando la interfaz lo solicite. En iOS, el botón **Giro / Salto** solicita el permiso de movimiento de forma explícita; en Android se activa directamente. Si se usa la versión local con certificado autofirmado, hay que aceptar primero el aviso de seguridad en el teléfono.

## Controles del teléfono

| Sensor / gesto | Acción en Neon Salvage |
|---|---|
| Toque X | Mueve al recolector a izquierda y derecha. |
| Toque sostenido o sacudida de giro | Salta; mayor presión aplica más turbo. |
| Dos o más dedos o una voz fuerte | Activa escudo eléctrico temporal. |
| Giro lateral | Ajusta la dirección de manera fina. |
| Micrófono | Expande un anillo sónico alrededor del personaje. |
| Movimiento de cámara | Dispara un EMP que desactiva drones. |
| Brillo de cámara | Disponible en la señal para futuras variantes del nivel. |

## Progresión

Hay cinco sectores. Cada sector exige más núcleos y activa más drones. Tras terminar el sector 5 aparece **El Archivista**, un jefe de tres fases: sus proyectiles y velocidad aumentan a medida que pierde energía. Acércate con el escudo activo para dañarlo o usa el movimiento de cámara para lanzar un EMP más fuerte.

Sin teléfono, usa ratón sobre la pantalla de juego o `A` / `D` + espacio.

## Diseño

El juego toma como referencia general la tensión vertical y los obstáculos móviles de los arcades de plataformas, pero emplea personajes, mundos, mecánicas, código y gráfica propios. No incluye personajes, niveles, imágenes, audio ni nombres de Mario o Donkey Kong.

La gráfica se dibuja por canvas y el sonido se genera con Web Audio API; no utiliza samples externos.

## Archivos

- `public/index.html`: pantalla de juego del PC.
- `public/exp.js`: mecánicas, gráficos, sonido y conexión MQTT.
- `public/mando.html`: mando/sensores del teléfono.
- `public/tacto.js`: librería MQTT compartida.
- `server.js`: servidor HTTPS y broker MQTT local.

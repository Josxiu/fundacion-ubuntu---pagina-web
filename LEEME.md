# Sitio web FUNUDEH

Sitio institucional de la Fundación Afrocolombiana Ubuntu Dejando Huella, hecho en HTML, CSS y JavaScript puros (sin instalar nada).

- **Ver el sitio:** abre `index.html` con doble clic.
- **Cambiar textos, datos, fotos o enlaces:** edita solo `contenido.js`. Las instrucciones están al inicio de ese archivo.
- **Fotos:** van en la carpeta `imagenes/`, preferiblemente en formato `.webp`.

## Antes de publicar

1. **Vista previa al compartir (WhatsApp y Facebook).** En los 5 archivos `.html` (`index`, `quienes-somos`, `proyectos`, `galeria`, `contacto`), cambia estas etiquetas a direcciones completas con el dominio real:
   - `og:image`: de `imagenes/og-funudeh.jpg` a `https://www.DOMINIO.org/imagenes/og-funudeh.jpg`
   - `og:url`: quita el comentario `<!-- -->` y pon la dirección de esa página, por ejemplo `https://www.DOMINIO.org/contacto.html`

   Con rutas relativas, WhatsApp y Facebook no encuentran la foto y la vista previa sale sin imagen. Estas etiquetas no se pueden manejar desde `contenido.js`, porque esas aplicaciones no ejecutan JavaScript. Después de publicar, se puede revisar la vista previa en https://developers.facebook.com/tools/debug/.

2. **Pasarela de pagos.** Cuando tengan el enlace de Wompi o PayU, pégalo en `contenido.js` → `donaciones.pasarela.enlace`.

3. **Foto principal.** Si cambias la foto del hero en `contenido.js`, cambia también la línea `preload` de `index.html` (está marcada con un comentario).

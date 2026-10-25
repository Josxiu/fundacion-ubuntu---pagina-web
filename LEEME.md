# Sitio web FUNUDEH

Sitio institucional de la Fundación Afrocolombiana Ubuntu Dejando Huella, hecho en HTML, CSS y JavaScript puros (sin instalar nada).

- **Ver el sitio:** abre `index.html` con doble clic.
- **Cambiar textos, datos, fotos o enlaces:** edita solo `contenido.js`. Las instrucciones están al inicio de ese archivo.
- **Fotos:** van en la carpeta `imagenes/`, preferiblemente en formato `.webp`.

## Publicación

- **Dirección principal:** https://fundacionubuntudejandohuella.org. El dominio corto `funudeh.org` lleva a la principal.
- **Dónde está publicado:** Cloudflare Pages, proyecto `funudeh`, en la cuenta de Cloudflare de la fundación. Los dominios también están comprados en esa cuenta y se renuevan solos cada año.
- **Cómo se actualiza:** cada cambio que se sube a la rama `main` de GitHub se publica solo en uno o dos minutos. No hay que entrar a Cloudflare.
- **Vistas previas para probar algo:** sube los cambios a una rama distinta de `main` (por ejemplo `prueba-galeria`). Cloudflare la publica sola en `https://prueba-galeria.funudeh.pages.dev`, sin tocar el sitio real, y ese enlace se puede compartir. Google no indexa las vistas previas. Si se aprueba, se une la rama a `main` y queda publicada en el sitio real.
- **Direcciones de las páginas:** Cloudflare quita el `.html`, así que Contacto queda en `/contacto`. Los enlaces con `.html` siguen funcionando.

## Al cambiar cosas

1. **Vista previa al compartir (WhatsApp y Facebook).** Los 5 archivos `.html` (`index`, `quienes-somos`, `proyectos`, `galeria`, `contacto`) tienen en `og:image`, `og:url` y `canonical` la dirección completa con el dominio principal. Si algún día cambia el dominio principal, hay que cambiarlo en esas tres etiquetas de las 5 páginas.

   Tienen que ser direcciones completas (`https://...`): con rutas relativas, WhatsApp y Facebook no encuentran la foto y la vista previa sale sin imagen. Estas etiquetas no se pueden manejar desde `contenido.js`, porque esas aplicaciones no ejecutan JavaScript. Después de publicar, se puede revisar la vista previa en https://developers.facebook.com/tools/debug/.

2. **Pasarela de pagos.** Cuando tengan el enlace de Wompi o PayU, pégalo en `contenido.js` → `donaciones.pasarela.enlace`.

3. **Foto principal.** Si cambias la foto del hero en `contenido.js`, cambia también la línea `preload` de `index.html` (está marcada con un comentario).

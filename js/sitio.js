/* =====================================================================
   FUNUDEH · Construye cada página a partir de contenido.js
   No hace falta editar este archivo para cambiar textos o datos.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.CONTENIDO;
  var pagina = document.body.getAttribute("data-pagina") || "inicio";

  /* ---------- Utilidades ---------- */
  function esc(texto) {
    return String(texto == null ? "" : texto)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

  var ICONOS = {
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    cerrar: '<path d="M6 6l12 12M18 6L6 18"/>',
    izquierda: '<path d="M15 5l-7 7 7 7"/>',
    derecha: '<path d="M9 5l7 7-7 7"/>',
    tarjeta: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
    banco: '<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
    candado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    whatsapp: '<path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 8.6c.2 3.2 3.2 6.2 6.4 6.4l.9-1.6-2-1-.9.8c-1-.4-2.2-1.6-2.6-2.6l.8-.9-1-2z"/>',
    ubicacion: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    telefono: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    correo: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    copiar: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
    listo: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    reproducir: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>'
  };
  function icono(nombre, tam) {
    tam = tam || 20;
    return '<svg width="' + tam + '" height="' + tam + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONOS[nombre] || "") + "</svg>";
  }
  function bandaTurbante() {
    return '<div class="banda-turbante" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>';
  }
  function enlaceWhatsApp(linea, mensaje) {
    var url = "https://wa.me/" + linea.internacional;
    if (mensaje) url += "?text=" + encodeURIComponent(mensaje);
    return url;
  }
  /* Envuelve en <em> la parte "enfasis" de un título */
  function resaltar(texto, enfasis) {
    var t = esc(texto);
    return enfasis && texto.indexOf(enfasis) > -1 ? t.replace(esc(enfasis), "<em>" + esc(enfasis) + "</em>") : t;
  }
  /* Correo con un punto de corte después de la @, para que en pantallas
     angostas se parta en "nombre@" / "dominio.com" y no a mitad de palabra */
  function correoVisible(correo) {
    var partes = String(correo).split("@");
    return partes.length === 2 ? esc(partes[0]) + "@<wbr>" + esc(partes[1]) : esc(correo);
  }
  function esExterno(url) { return /^https?:\/\//.test(url); }
  function atribExterno(url) { return esExterno(url) ? ' target="_blank" rel="noopener noreferrer"' : ""; }
  var AVISO_PESTANA = '<span class="visualmente-oculto"> (se abre en una pestaña nueva)</span>';

  /* Imagen con tamaños responsivos y carga diferida */
  function imagen(img, opciones) {
    opciones = opciones || {};
    var srcset = "";
    if (img.variantes) {
      srcset = img.variantes.map(function (v) { return v.archivo + " " + v.ancho + "w"; }).join(", ");
    } else if (img.pequena) {
      var anchoPeq = parseInt((img.pequena.match(/-(\d+)\.webp$/) || [])[1], 10) || Math.round(img.ancho / 2);
      srcset = img.pequena + " " + anchoPeq + "w, " + img.archivo + " " + img.ancho + "w";
    }
    var estilo = opciones.estilo || (img.enfoque ? "object-position:" + img.enfoque : "");
    var prioridad = opciones.prioridad
      ? ' fetchpriority="high" loading="eager"'
      : ' loading="lazy"';
    return '<img src="' + esc(img.archivo) + '"' +
      (srcset ? ' srcset="' + esc(srcset) + '" sizes="' + esc(opciones.sizes || "100vw") + '"' : "") +
      ' width="' + (img.ancho || "") + '" height="' + (img.alto || "") + '"' +
      ' alt="' + esc(opciones.alt != null ? opciones.alt : img.alt) + '"' +
      prioridad + ' decoding="async"' +
      (estilo ? ' style="' + esc(estilo) + '"' : "") + ">";
  }

  /* ---------- Encabezado ---------- */
  function encabezado() {
    var wa = C.contacto.whatsapp.principal;
    var items = C.menu.map(function (m) {
      var actual = m.id === pagina ? ' aria-current="page"' : "";
      return '<li><a href="' + esc(m.enlace) + '"' + actual + ">" + esc(m.texto) + "</a></li>";
    }).join("");
    items += '<li><a class="boton boton--terracota" href="' + esc(C.botonApoyo.enlace) + '">' + esc(C.botonApoyo.texto) + "</a></li>";

    return '' +
      '<div class="franja-superior"><div class="contenedor">' +
        "<span>" + esc(C.contacto.ciudad) + " · NIT " + esc(C.sitio.nit) + "</span>" +
        '<span><a href="mailto:' + esc(C.contacto.correo) + '">' + correoVisible(C.contacto.correo) + "</a> · " +
        '<a href="tel:+' + esc(wa.internacional) + '">(+57) ' + esc(wa.numero) + "</a></span>" +
      "</div></div>" +
      '<header class="encabezado"><div class="contenedor">' +
        '<a class="logo-enlace" href="index.html"><img src="' + esc(C.sitio.logo.archivo) + '" width="' + C.sitio.logo.ancho + '" height="' + C.sitio.logo.alto + '" alt="' + esc(C.sitio.nombre) + ' — ir al inicio"></a>' +
        '<button class="boton-menu" type="button" aria-expanded="false" aria-controls="menu-principal">' +
          '<span class="visualmente-oculto">Abrir menú</span>' + icono("menu", 22) +
        "</button>" +
        '<nav class="nav-principal" id="menu-principal" aria-label="Principal"><ul>' + items + "</ul></nav>" +
      "</div></header>" + bandaTurbante();
  }

  /* ---------- Pie de página ---------- */
  function pieDePagina() {
    var c = C.contacto;
    var telefonos = c.telefonos.map(function (t) {
      return '<a href="tel:' + esc(t.marcar) + '">' + esc(t.numero) + "</a>";
    }).join(" / ");
    var enlaces = C.menu.map(function (m) {
      return '<li><a href="' + esc(m.enlace) + '">' + esc(m.texto) + "</a></li>";
    }).join("") + '<li><a href="' + esc(C.botonApoyo.enlace) + '">' + esc(C.botonApoyo.texto) + "</a></li>";
    var redes = C.redes.map(function (r) {
      return '<li><a href="' + esc(r.enlace) + '"' + atribExterno(r.enlace) + ">" + icono(r.red) + esc(r.nombre) +
        (r.usuario ? ' <span class="usuario">' + esc(r.usuario) + "</span>" : "") + AVISO_PESTANA + "</a></li>";
    }).join("");

    return '' +
      '<footer class="pie" id="pie">' +
        '<div class="contenedor pie__rejilla">' +
          '<div class="pie__marca">' +
            '<div class="pie__emblema"><img src="' + esc(C.sitio.emblema.archivo) + '" width="' + C.sitio.emblema.ancho + '" height="' + C.sitio.emblema.alto + '" alt="" loading="lazy"></div>' +
            '<p class="pie__lema">«' + esc(C.sitio.lema) + '»</p>' +
            '<p class="pie__legal">' + esc(C.sitio.nombre) + " (" + esc(C.sitio.sigla) + ") · NIT " + esc(C.sitio.nit) + "</p>" +
          "</div>" +
          "<div>" +
            "<h2>Contacto</h2>" +
            '<ul class="pie__contacto">' +
              "<li>" + icono("ubicacion") + '<a href="' + esc(c.mapa) + '"' + atribExterno(c.mapa) + ">" + esc(c.direccion) + ", " + esc(c.ciudad) + AVISO_PESTANA + "</a></li>" +
              "<li>" + icono("telefono") + "<span>(+57) " + telefonos + "</span></li>" +
              "<li>" + icono("correo") + '<a href="mailto:' + esc(c.correo) + '">' + correoVisible(c.correo) + "</a></li>" +
            "</ul>" +
          "</div>" +
          '<nav aria-label="Sitio"><h2>Sitio</h2><ul class="pie__enlaces">' + enlaces + "</ul></nav>" +
          '<div><h2>Redes</h2><ul class="pie__redes">' + redes + "</ul></div>" +
        "</div>" +
        bandaTurbante() +
        '<div class="pie__base"><div class="contenedor">' +
          "<span>© " + new Date().getFullYear() + " " + esc(C.pie.derechos) + "</span>" +
          "<span>NIT " + esc(C.sitio.nit) + "</span>" +
        "</div></div>" +
      "</footer>";
  }

  function whatsappFlotante() {
    var wa = C.contacto.whatsapp.principal;
    return '<a class="whatsapp-flotante" href="' + esc(enlaceWhatsApp(wa, C.contacto.whatsapp.mensaje)) + '" target="_blank" rel="noopener noreferrer">' +
      icono("whatsapp", 28) + '<span class="texto">WhatsApp</span>' +
      '<span class="visualmente-oculto"> — escríbenos al ' + esc(wa.numero) + " (se abre en una pestaña nueva)</span></a>";
  }

  function bandaApoyo() {
    var b = C.bandaApoyo;
    return '<section class="banda-apoyo" aria-labelledby="titulo-apoyo"><div class="contenedor">' +
      '<div><h2 id="titulo-apoyo">' + esc(b.titulo) + "</h2><p>" + esc(b.texto) + "</p></div>" +
      '<a class="boton boton--ocre" href="' + esc(b.boton.enlace) + '">' + esc(b.boton.texto) + icono("flecha") + "</a>" +
      "</div></section>";
  }

  function cabeceraPagina(datos) {
    return '<section class="cabecera-pagina"><div class="contenedor">' +
      '<p class="antetitulo">' + esc(datos.antetitulo) + "</p>" +
      "<h1>" + esc(datos.titulo) + "</h1>" +
      (datos.intro ? '<p class="intro">' + esc(datos.intro) + "</p>" : "") +
      "</div></section>";
  }

  /* ---------- Sección Dona (Inicio) ---------- */
  function seccionDona() {
    var d = C.donaciones, p = d.pasarela, t = d.transferencia, w = d.whatsapp;
    var wa = C.contacto.whatsapp;
    var tieneEnlace = !!(p.enlace && p.enlace.trim());

    var botonPasarela = tieneEnlace
      ? '<a class="boton boton--terracota boton--bloque" href="' + esc(p.enlace) + '" target="_blank" rel="noopener noreferrer">' + icono("candado", 18) + esc(p.boton) + AVISO_PESTANA + "</a>"
      : '<button class="boton boton--terracota boton--bloque" type="button" id="boton-pasarela" aria-describedby="aviso-pasarela" aria-controls="mensaje-pasarela" aria-expanded="false">' + icono("candado", 18) + esc(p.boton) + "</button>" +
        '<p class="aviso-pendiente" id="aviso-pasarela">' + esc(p.avisoPendiente) + "</p>" +
        '<p class="mensaje-pendiente" id="mensaje-pasarela" role="status" hidden>' + esc(p.mensajePendiente) + "</p>";

    function botonCopiar(valor, etiqueta) {
      return '<button type="button" class="boton-copiar" data-copiar="' + esc(valor) + '" aria-label="Copiar ' + esc(etiqueta) + '">' + icono("copiar", 16) + '<span aria-hidden="true">Copiar</span></button>';
    }

    return '' +
      '<section class="seccion seccion--arena" id="dona" aria-labelledby="titulo-dona"><div class="contenedor">' +
        '<div class="dona__cabecera">' +
          '<div><p class="antetitulo">' + esc(d.antetitulo) + '</p><h2 id="titulo-dona">' + resaltar(d.titulo, d.enfasis) + "</h2></div>" +
          "<p>" + esc(d.intro) + "</p>" +
        "</div>" +
        '<div class="dona__opciones">' +
          /* 1 · Pasarela */
          '<article class="opcion-dona" aria-labelledby="dona-1">' +
            '<div class="opcion-dona__num"><span aria-hidden="true">1</span>' + icono("tarjeta", 32) + "</div>" +
            '<h3 id="dona-1">' + esc(p.titulo) + "</h3>" +
            "<p>" + esc(p.texto) + "</p>" +
            '<ul class="chips" aria-label="Medios de pago">' + p.medios.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ul>" +
            '<div class="opcion-dona__relleno"></div>' + botonPasarela +
          "</article>" +
          /* 2 · Transferencia */
          '<article class="opcion-dona" aria-labelledby="dona-2">' +
            '<div class="opcion-dona__num"><span aria-hidden="true">2</span>' + icono("banco", 32) + "</div>" +
            '<h3 id="dona-2">' + esc(t.titulo) + "</h3>" +
            '<dl class="datos-banco">' +
              '<div class="dato-completo"><dt>Titular</dt><dd>' + esc(t.titular) + "</dd></div>" +
              "<div><dt>NIT</dt><dd>" + esc(t.nit) + botonCopiar(t.nit.replace(/[^\d-]/g, ""), "NIT") + "</dd></div>" +
              "<div><dt>Banco</dt><dd>" + esc(t.banco) + "</dd></div>" +
              "<div><dt>Tipo de cuenta</dt><dd>" + esc(t.tipoCuenta) + "</dd></div>" +
              '<div><dt>N.° de cuenta</dt><dd><span class="numero-cuenta">' + esc(t.numeroCuenta) + "</span>" + botonCopiar(t.numeroCuenta, "número de cuenta") + "</dd></div>" +
              "<div><dt>" + esc(t.billeteras.nombre) + "</dt><dd>" + esc(t.billeteras.numero) + botonCopiar(t.billeteras.numero.replace(/\s/g, ""), "número de " + t.billeteras.nombre) + "</dd></div>" +
            "</dl>" +
            '<p class="nota-soporte">' + esc(t.nota) + ' <a href="mailto:' + esc(C.contacto.correo) + '?subject=' + encodeURIComponent("Soporte de donación") + '">' + correoVisible(C.contacto.correo) + "</a> · " +
              '<a href="' + esc(enlaceWhatsApp(wa.principal, "Hola, FUNUDEH. Envío el soporte de mi donación.")) + '" target="_blank" rel="noopener noreferrer">WhatsApp ' + esc(wa.principal.numero) + AVISO_PESTANA + "</a></p>" +
            '<p role="status" class="visualmente-oculto" id="estado-copiado"></p>' +
          "</article>" +
          /* 3 · WhatsApp */
          '<article class="opcion-dona opcion-dona--oscura sobre-oscuro" aria-labelledby="dona-3">' +
            '<div class="opcion-dona__num"><span aria-hidden="true">3</span>' + icono("whatsapp", 32) + "</div>" +
            '<h3 id="dona-3">' + esc(w.titulo) + "</h3>" +
            "<p>" + esc(w.texto) + "</p>" +
            '<ul class="lista-temas">' + w.temas.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ul>" +
            '<div class="opcion-dona__relleno"></div>' +
            '<a class="boton boton--ocre boton--bloque" href="' + esc(enlaceWhatsApp(wa.principal, wa.mensaje)) + '" target="_blank" rel="noopener noreferrer">' + icono("whatsapp") + esc(w.boton) + " · " + esc(wa.principal.numero) + AVISO_PESTANA + "</a>" +
            '<p class="whatsapp-alterno">o al <a href="' + esc(enlaceWhatsApp(wa.alterno, wa.mensaje)) + '" target="_blank" rel="noopener noreferrer">' + esc(wa.alterno.numero) + AVISO_PESTANA + "</a></p>" +
          "</article>" +
        "</div>" +
      "</div></section>";
  }

  /* =====================================================================
     PÁGINAS
     ===================================================================== */
  var paginas = {};

  paginas.inicio = function () {
    var h = C.inicio.hero, u = C.inicio.ubuntu;
    var titulo = resaltar(h.titulo, h.enfasis);
    var principios = C.quienesSomos.principios.map(function (p) { return "<li>" + esc(p.nombre) + "</li>"; }).join("");
    var alianzas = C.alianzas.map(function (a) {
      var marca = a.logo ? '<img src="' + esc(a.logo) + '" alt="" loading="lazy" width="88" height="64">' : '<span class="alianzas__marca" aria-hidden="true"></span>';
      return "<li>" + marca + "<span>" + esc(a.nombre) + "</span></li>";
    }).join("");

    var pr = C.proyectos;
    function tarjeta(p, i, grande) {
      var n = parseInt(p.fotoInicio, 10);
      var img = p.imagenes[(n >= 1 && n <= p.imagenes.length) ? n - 1 : 0];
      return '<article class="tarjeta-proyecto' + (grande ? " tarjeta-proyecto--grande" : "") + '">' +
        '<div class="tarjeta-proyecto__foto">' + imagen(img, { sizes: grande ? "(max-width: 900px) 100vw, 700px" : "(max-width: 900px) 100vw, 480px" }) + "</div>" +
        '<p class="antetitulo">' + String(i + 1).padStart(2, "0") + " · " + esc(p.aliados) + "</p>" +
        '<h3><a href="proyectos.html#' + esc(p.id) + '">' + esc(p.nombre) + "</a></h3>" +
        "<p>" + esc(grande ? p.resumen + (p.nota ? " " + p.nota : "") : p.resumen) + "</p>" +
        "</article>";
    }

    return '' +
      '<section class="hero" aria-labelledby="titulo-hero">' +
        '<div class="hero__foto">' + imagen(h.imagen, { prioridad: true, sizes: "100vw", estilo: "object-position:" + (h.imagen.enfoque || "center") }) + "</div>" +
        '<div class="contenedor"><div class="hero__texto">' +
          '<p class="antetitulo">' + esc(h.antetitulo) + "</p>" +
          '<h1 id="titulo-hero">' + titulo + "</h1>" +
          '<p class="hero__sub">' + esc(h.subtitulo) + "</p>" +
          '<div class="hero__botones">' +
            '<a class="boton boton--ocre" href="' + esc(h.botonProyectos.enlace) + '">' + esc(h.botonProyectos.texto) + icono("flecha") + "</a>" +
            '<a class="boton boton--contorno-claro" href="' + esc(h.botonDona.enlace) + '">' + esc(h.botonDona.texto) + "</a>" +
          "</div>" +
        "</div></div>" +
        (h.imagen.pie ? '<p class="hero__pie" aria-hidden="true">' + esc(h.imagen.pie) + "</p>" : "") +
      "</section>" +

      '<section class="seccion seccion--arena" aria-labelledby="titulo-ubuntu"><div class="contenedor">' +
        '<div class="ubuntu__lema"><p class="antetitulo">' + esc(u.antetitulo) + '</p><p class="lema-grande">«' + esc(C.sitio.lema) + "»</p></div>" +
        '<div class="ubuntu__cuerpo">' +
          '<div><h2 id="titulo-ubuntu">' + esc(u.titulo) + "</h2><p>" + esc(u.texto) + "</p>" +
            '<a class="enlace-flecha" href="' + esc(u.enlace.enlace) + '">' + esc(u.enlace.texto) + icono("flecha", 18) + "</a></div>" +
          '<div><h3 class="subtitulo-lista">Principios y valores</h3><ol class="lista-principios">' + principios + "</ol></div>" +
        "</div>" +
      "</div></section>" +

      '<section class="seccion" aria-labelledby="titulo-alianzas"><div class="contenedor">' +
        '<div class="cabecera-seccion"><h2 class="titulo-seccion" id="titulo-alianzas">' + esc(C.inicio.alianzasTitulo) + '</h2><p class="antetitulo">' + esc(C.inicio.alianzasAntetitulo) + "</p></div>" +
        '<ul class="alianzas">' + alianzas + "</ul>" +
      "</div></section>" +

      '<section class="seccion" style="padding-top:0" aria-labelledby="titulo-destacados"><div class="contenedor">' +
        '<div class="cabecera-seccion"><h2 class="titulo-seccion" id="titulo-destacados">' + esc(C.inicio.proyectosTitulo) + "</h2>" +
          '<a class="enlace-flecha" href="' + esc(C.inicio.proyectosEnlace.enlace) + '">' + esc(C.inicio.proyectosEnlace.texto) + icono("flecha", 18) + "</a></div>" +
        '<div class="destacados">' +
          (pr[0] ? tarjeta(pr[0], 0, true) : "") +
          '<div class="destacados__lateral">' + pr.slice(1, 3).map(function (p, i) { return tarjeta(p, i + 1, false); }).join("") + "</div>" +
        "</div>" +
      "</div></section>" +

      seccionDona();
  };

  paginas["quienes-somos"] = function () {
    var q = C.quienesSomos;
    var colores = ["var(--logo-rojo)", "var(--logo-amarillo)", "var(--logo-naranja)", "var(--logo-verde)", "var(--logo-morado)"];
    var principios = q.principios.map(function (p, i) {
      return '<li><span class="marca" style="background:' + colores[i % colores.length] + '" aria-hidden="true"></span><h3>' + esc(p.nombre) + "</h3><p>" + esc(p.texto) + "</p></li>";
    }).join("");
    var consejo = q.equipo.consejo.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("");

    return cabeceraPagina({ antetitulo: q.antetitulo, titulo: q.titulo, intro: "«" + C.sitio.lema + "» · " + C.sitio.lemaFuente }) +
      '<section class="seccion"><div class="contenedor">' +
        '<div class="bloque-dos"><h2 id="historia">Nuestra historia</h2><div><p class="texto-largo">' + esc(q.historia) + "</p></div></div>" +
        '<div class="bloque-dos"><h2 id="objeto-social">Objeto social</h2><div><p class="texto-largo">' + esc(q.objetoSocial) + "</p></div></div>" +
      "</div></section>" +
      '<section class="seccion seccion--arena" aria-label="Misión y visión"><div class="contenedor"><div class="mision-vision">' +
        '<article><p class="antetitulo">Misión</p><h2>Nuestra Misión</h2><p>' + esc(q.mision) + "</p></article>" +
        '<article><p class="antetitulo">Visión</p><h2>Nuestra Visión</h2><p>' + esc(q.vision) + "</p></article>" +
      "</div></div></section>" +
      '<section class="seccion" aria-labelledby="titulo-principios"><div class="contenedor">' +
        '<div class="cabecera-seccion"><h2 class="titulo-seccion" id="titulo-principios">Nuestros Principios y Valores</h2></div>' +
        '<ul class="principios-detalle">' + principios + "</ul>" +
      "</div></section>" +
      '<section class="seccion" style="padding-top:0" aria-labelledby="titulo-equipo"><div class="contenedor">' +
        '<div class="cabecera-seccion"><h2 class="titulo-seccion" id="titulo-equipo">' + esc(q.equipo.titulo) + "</h2></div>" +
        '<div class="equipo">' +
          '<div class="tarjeta-equipo"><p class="cargo">' + esc(q.equipo.representante.cargo) + '</p><p class="nombre">' + esc(q.equipo.representante.nombre) + "</p></div>" +
          '<div class="tarjeta-equipo"><p class="cargo">' + esc(q.equipo.consejoTitulo) + '</p><ul class="lista-consejo">' + consejo + "</ul></div>" +
        "</div>" +
      "</div></section>" +
      '<section class="seccion seccion--arena" aria-labelledby="titulo-datos"><div class="contenedor">' +
        '<div class="cabecera-seccion"><h2 class="titulo-seccion" id="titulo-datos">Datos institucionales</h2></div>' +
        '<dl class="datos-institucionales">' +
          "<div><dt>Razón social</dt><dd>" + esc(C.sitio.nombre) + "</dd></div>" +
          "<div><dt>Sigla</dt><dd>" + esc(C.sitio.sigla) + "</dd></div>" +
          "<div><dt>NIT</dt><dd>" + esc(C.sitio.nit) + "</dd></div>" +
          "<div><dt>Ubicación</dt><dd>" + esc(C.sitio.ubicacion) + "</dd></div>" +
        "</dl>" +
      "</div></section>" +
      bandaApoyo();
  };

  paginas.proyectos = function () {
    var bloques = C.proyectos.map(function (p, i) {
      var fotos = p.imagenes.slice(0, 2).map(function (img) {
        return '<figure class="foto-con-pie"><div class="marco">' + imagen(img, { sizes: "(max-width: 900px) 100vw, 420px" }) + "</div>" +
          (img.pie ? "<figcaption>" + esc(img.pie) + "</figcaption>" : "") + "</figure>";
      }).join("");
      return '<article class="proyecto" id="' + esc(p.id) + '" aria-labelledby="titulo-' + esc(p.id) + '">' +
        '<div class="proyecto__texto">' +
          '<span class="proyecto__num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<h2 id="titulo-' + esc(p.id) + '">' + esc(p.nombre) + "</h2>" +
          '<p class="proyecto__aliados"><span>Aliados</span><strong>' + esc(p.aliados) + "</strong></p>" +
          '<p class="proyecto__enfoque"><strong>Enfoque:</strong> ' + esc(p.enfoque) + "</p>" +
          '<div><h3 class="subtitulo-lista">Componentes</h3><ul class="lista-componentes">' +
            p.componentes.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></div>" +
          (p.nota ? '<p class="proyecto__nota">' + esc(p.nota) + "</p>" : "") +
          (p.logo ? imagen(p.logo, { estilo: "width:120px;height:auto" }).replace('<img ', '<img class="proyecto__logo" ') : "") +
        "</div>" +
        '<div class="proyecto__fotos">' + fotos + "</div>" +
        "</article>";
    }).join("");
    return cabeceraPagina(C.proyectosPagina) +
      '<section class="seccion"><div class="contenedor">' + bloques + "</div></section>" +
      bandaApoyo();
  };

  paginas.galeria = function () {
    var g = C.galeria;
    var filtros = g.grupos.map(function (gr, i) {
      return '<button type="button" class="filtro" data-grupo="' + esc(gr.id) + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' + esc(gr.nombre) + "</button>";
    }).join("");
    var fotos = g.fotos.map(function (f, i) {
      return '<li data-grupo="' + esc(f.grupo) + '"><button type="button" class="miniatura" data-indice="' + i + '" aria-label="Ampliar foto: ' + esc(f.pie || f.alt) + '">' +
        imagen({ archivo: f.pequena || f.archivo, ancho: f.ancho, alto: f.alto }, { alt: f.alt, sizes: "(max-width: 600px) 100vw, 400px" }) +
        (f.pie ? '<span class="miniatura__pie" aria-hidden="true">' + esc(f.pie) + "</span>" : "") +
        "</button></li>";
    }).join("");

    var videos = "";
    if (g.videos && g.videos.length) {
      videos = '<div class="videos">' + g.videos.map(function (v) {
        return '<figure class="video"><div class="video__marco" data-video="' + esc(v.id) + '">' +
          '<button type="button" class="video__boton" aria-label="Reproducir video: ' + esc(v.titulo) + '">' +
            '<img src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">' +
            '<span class="reproducir">' + icono("reproducir", 30) + "</span></button></div>" +
          "<figcaption>" + esc(v.titulo) + "</figcaption></figure>";
      }).join("") + "</div>";
    }

    return cabeceraPagina(g) +
      '<section class="seccion" aria-labelledby="titulo-fotos"><div class="contenedor">' +
        '<h2 class="visualmente-oculto" id="titulo-fotos">Fotos</h2>' +
        '<div class="filtros" role="group" aria-label="Filtrar fotos por proyecto">' + filtros + "</div>" +
        '<p class="visualmente-oculto" role="status" id="estado-filtro"></p>' +
        '<ul class="rejilla-galeria">' + fotos + "</ul>" +
      "</div></section>" +
      '<section class="seccion" style="padding-top:0" aria-labelledby="titulo-videos"><div class="contenedor">' +
        '<div class="bloque-youtube sobre-oscuro">' +
          '<div><h2 id="titulo-videos">' + esc(g.youtube.titulo) + "</h2><p>" + esc(g.youtube.texto) + "</p></div>" +
          '<a class="boton boton--ocre" href="' + esc(g.youtube.enlace) + '" target="_blank" rel="noopener noreferrer">' + icono("youtube") + esc(g.youtube.boton) + AVISO_PESTANA + "</a>" +
        "</div>" + videos +
      "</div></section>" +
      '<dialog class="visor" aria-label="Visor de fotos">' +
        '<div class="visor__contenido">' +
          '<p class="visor__contador" aria-live="polite"></p>' +
          '<button type="button" class="visor__boton visor__cerrar" aria-label="Cerrar visor">' + icono("cerrar", 22) + "</button>" +
          '<button type="button" class="visor__boton visor__anterior" aria-label="Foto anterior">' + icono("izquierda", 22) + "</button>" +
          '<figure><img src="" alt=""><figcaption></figcaption></figure>' +
          '<button type="button" class="visor__boton visor__siguiente" aria-label="Foto siguiente">' + icono("derecha", 22) + "</button>" +
        "</div>" +
      "</dialog>" +
      bandaApoyo();
  };

  paginas.contacto = function () {
    var c = C.contacto, cp = C.contactoPagina, wa = c.whatsapp;
    var telefonos = c.telefonos.map(function (t) { return '<a href="tel:' + esc(t.marcar) + '">' + esc(t.numero) + "</a>"; }).join(" · ");
    var redes = C.redes.map(function (r) {
      return '<li><a href="' + esc(r.enlace) + '"' + atribExterno(r.enlace) + ">" + icono(r.red) + esc(r.nombre) + (r.usuario ? " · " + esc(r.usuario) : "") + AVISO_PESTANA + "</a></li>";
    }).join("");
    function lineaWa(l) {
      return '<a class="boton boton--whatsapp boton--bloque" href="' + esc(enlaceWhatsApp(l, wa.mensaje)) + '" target="_blank" rel="noopener noreferrer">' + icono("whatsapp") + esc(l.numero) + AVISO_PESTANA + "</a>" +
        '<p class="etiqueta-linea">' + esc(l.etiqueta) + "</p>";
    }

    return cabeceraPagina(cp) +
      '<section class="seccion"><div class="contenedor contacto-rejilla">' +
        '<form class="formulario" id="formulario-contacto" novalidate aria-labelledby="titulo-formulario">' +
          '<h2 id="titulo-formulario">' + esc(cp.formularioTitulo) + "</h2>" +
          '<p style="color:var(--tinta-suave);font-size:.9375rem">Los campos marcados con * son obligatorios.</p>' +
          '<div class="campos-dos">' +
            '<div class="campo"><label for="f-nombre">Nombre *</label><input id="f-nombre" name="nombre" type="text" autocomplete="name" required aria-describedby="e-nombre"><p class="error" id="e-nombre"></p></div>' +
            '<div class="campo"><label for="f-telefono">Teléfono <span class="opcional">(opcional)</span></label><input id="f-telefono" name="telefono" type="tel" autocomplete="tel" inputmode="tel"></div>' +
          "</div>" +
          '<div class="campo"><label for="f-correo">Correo *</label><input id="f-correo" name="correo" type="email" autocomplete="email" required aria-describedby="e-correo"><p class="error" id="e-correo"></p></div>' +
          '<div class="campo"><label for="f-mensaje">Mensaje *</label><textarea id="f-mensaje" name="mensaje" required aria-describedby="e-mensaje"></textarea><p class="error" id="e-mensaje"></p></div>' +
          '<div class="trampa" aria-hidden="true"><label for="f-web">No llenar</label><input id="f-web" name="web" type="text" tabindex="-1" autocomplete="off"></div>' +
          '<button class="boton boton--terracota" type="submit">Enviar mensaje' + icono("flecha") + "</button>" +
          '<p class="estado-formulario" id="estado-formulario" role="status" aria-live="polite"></p>' +
        "</form>" +
        '<div class="info-contacto">' +
          '<div><h2>Información institucional</h2></div>' +
          '<ul class="info-lista">' +
            "<li>" + icono("ubicacion", 22) + '<div><span class="etiqueta">Dirección</span>' + esc(c.direccion) + ", " + esc(c.ciudad) + '<br><a href="' + esc(c.mapa) + '" target="_blank" rel="noopener noreferrer">Ver en Google Maps' + AVISO_PESTANA + "</a></div></li>" +
            "<li>" + icono("telefono", 22) + '<div><span class="etiqueta">Teléfonos</span>(+57) ' + telefonos + "</div></li>" +
            "<li>" + icono("correo", 22) + '<div><span class="etiqueta">Correo electrónico</span><a href="mailto:' + esc(c.correo) + '">' + correoVisible(c.correo) + "</a></div></li>" +
          "</ul>" +
          '<div class="tarjeta-whatsapp sobre-oscuro">' +
            "<h2>WhatsApp</h2>" +
            "<p>" + esc(C.donaciones.whatsapp.texto) + "</p>" +
            lineaWa(wa.principal) + lineaWa(wa.alterno) +
          "</div>" +
          '<div><h2 style="margin-bottom:14px">Redes sociales</h2><ul class="redes-lista">' + redes + "</ul></div>" +
        "</div>" +
      "</div></section>" +
      bandaApoyo();
  };

  /* =====================================================================
     INTERACCIONES
     ===================================================================== */
  function activarMenu() {
    var boton = $(".boton-menu"), nav = $("#menu-principal");
    if (!boton || !nav) return;
    var etiqueta = $(".visualmente-oculto", boton);
    function poner(abierto) {
      nav.classList.toggle("abierto", abierto);
      boton.setAttribute("aria-expanded", String(abierto));
      etiqueta.textContent = abierto ? "Cerrar menú" : "Abrir menú";
      boton.innerHTML = boton.innerHTML.replace(/<svg[\s\S]*<\/svg>/, icono(abierto ? "cerrar" : "menu", 22));
    }
    boton.addEventListener("click", function () { poner(!nav.classList.contains("abierto")); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("abierto")) { poner(false); boton.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) poner(false); });
  }

  function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(texto);
    return new Promise(function (ok, mal) {
      var t = document.createElement("textarea");
      t.value = texto; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy") ? ok() : mal(); } catch (err) { mal(err); }
      document.body.removeChild(t);
    });
  }

  function activarDona() {
    $$("[data-copiar]").forEach(function (b) {
      var original = b.innerHTML;
      b.addEventListener("click", function () {
        copiarTexto(b.getAttribute("data-copiar")).then(function () {
          b.innerHTML = icono("listo", 16) + '<span aria-hidden="true">Copiado</span>';
          var estado = $("#estado-copiado");
          if (estado) estado.textContent = "Copiado: " + b.getAttribute("data-copiar");
          setTimeout(function () { b.innerHTML = original; }, 2000);
        }).catch(function () {});
      });
    });
    var pasarela = $("#boton-pasarela");
    if (pasarela) {
      pasarela.addEventListener("click", function () {
        var msj = $("#mensaje-pasarela");
        msj.hidden = !msj.hidden;
        pasarela.setAttribute("aria-expanded", String(!msj.hidden));
      });
    }
  }

  function activarGaleria() {
    var botones = $$(".filtro"), items = $$(".rejilla-galeria li"), estado = $("#estado-filtro");
    botones.forEach(function (b) {
      b.addEventListener("click", function () {
        var grupo = b.getAttribute("data-grupo"), visibles = 0;
        botones.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        items.forEach(function (li) {
          var mostrar = grupo === "todos" || li.getAttribute("data-grupo") === grupo;
          li.hidden = !mostrar;
          if (mostrar) visibles++;
        });
        if (estado) estado.textContent = visibles + (visibles === 1 ? " foto visible" : " fotos visibles");
      });
    });

    var visor = $(".visor");
    if (!visor || typeof visor.showModal !== "function") return;
    var fotos = C.galeria.fotos, actual = 0;
    var img = $("img", visor), pie = $("figcaption", visor), contador = $(".visor__contador", visor);

    function visiblesIdx() {
      return items.filter(function (li) { return !li.hidden; }).map(function (li) {
        return parseInt($(".miniatura", li).getAttribute("data-indice"), 10);
      });
    }
    function mostrar(i) {
      var f = fotos[i];
      actual = i;
      img.src = f.archivo; img.alt = f.alt; img.width = f.ancho; img.height = f.alto;
      pie.textContent = f.pie || "";
      var lista = visiblesIdx();
      contador.textContent = "Foto " + (lista.indexOf(i) + 1) + " de " + lista.length;
    }
    function mover(paso) {
      var lista = visiblesIdx(), pos = lista.indexOf(actual);
      mostrar(lista[(pos + paso + lista.length) % lista.length]);
    }
    $$(".miniatura").forEach(function (m) {
      m.addEventListener("click", function () {
        mostrar(parseInt(m.getAttribute("data-indice"), 10));
        visor.showModal();
        $(".visor__cerrar", visor).focus();
      });
    });
    $(".visor__cerrar", visor).addEventListener("click", function () { visor.close(); });
    $(".visor__anterior", visor).addEventListener("click", function () { mover(-1); });
    $(".visor__siguiente", visor).addEventListener("click", function () { mover(1); });
    visor.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); mover(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
    });
    visor.addEventListener("click", function (e) { if (e.target === visor || e.target.classList.contains("visor__contenido")) visor.close(); });
    visor.addEventListener("close", function () {
      var m = $('.miniatura[data-indice="' + actual + '"]');
      if (m) m.focus();
    });

    $$(".video__marco").forEach(function (marco) {
      var b = $(".video__boton", marco);
      b.addEventListener("click", function () {
        var id = marco.getAttribute("data-video");
        var titulo = b.getAttribute("aria-label").replace("Reproducir video: ", "");
        marco.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1" title="' + esc(titulo) + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        $("iframe", marco).focus();
      });
    });
  }

  function activarFormulario() {
    var form = $("#formulario-contacto");
    if (!form) return;
    var estado = $("#estado-formulario");
    var reglas = {
      nombre: function (v) { return v.trim() ? "" : "Escribe tu nombre."; },
      correo: function (v) {
        if (!v.trim()) return "Escribe tu correo electrónico.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Revisa el correo: debe tener el formato nombre@dominio.com.";
      },
      mensaje: function (v) { return v.trim() ? "" : "Escribe tu mensaje."; }
    };
    function validar(campo) {
      var regla = reglas[campo.name];
      if (!regla) return true;
      var error = regla(campo.value);
      campo.setAttribute("aria-invalid", error ? "true" : "false");
      $("#e-" + campo.name).textContent = error;
      return !error;
    }
    Object.keys(reglas).forEach(function (n) {
      var campo = form.elements[n];
      campo.addEventListener("blur", function () { if (campo.value) validar(campo); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      estado.className = "estado-formulario";
      estado.textContent = "";
      var primero = null;
      Object.keys(reglas).forEach(function (n) {
        var campo = form.elements[n];
        if (!validar(campo) && !primero) primero = campo;
      });
      if (primero) { primero.focus(); return; }
      if (form.elements.web.value) return; /* trampa anti-spam */

      var datos = {
        nombre: form.elements.nombre.value.trim(),
        correo: form.elements.correo.value.trim(),
        telefono: form.elements.telefono.value.trim(),
        mensaje: form.elements.mensaje.value.trim()
      };
      var cp = C.contactoPagina;

      if (cp.formularioAccion) {
        var boton = $('button[type="submit"]', form);
        boton.disabled = true;
        fetch(cp.formularioAccion, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        }).then(function (r) {
          if (!r.ok) throw new Error("Error " + r.status);
          form.reset();
          estado.textContent = cp.exito;
        }).catch(function () {
          estado.className = "estado-formulario estado-formulario--error";
          estado.innerHTML = "No pudimos enviar el mensaje. Escríbenos directamente a " +
            '<a href="mailto:' + esc(C.contacto.correo) + '">' + correoVisible(C.contacto.correo) + "</a>.";
        }).then(function () { boton.disabled = false; });
        return;
      }

      var cuerpo = "Nombre: " + datos.nombre + "\nCorreo: " + datos.correo +
        (datos.telefono ? "\nTeléfono: " + datos.telefono : "") + "\n\n" + datos.mensaje;
      window.location.href = "mailto:" + C.contacto.correo +
        "?subject=" + encodeURIComponent(cp.asunto) + "&body=" + encodeURIComponent(cuerpo);
      estado.innerHTML = esc(cp.exitoCorreo) + ' <a href="mailto:' + esc(C.contacto.correo) + '">' + correoVisible(C.contacto.correo) + "</a>.";
    });
  }

  /* =====================================================================
     ARMADO
     ===================================================================== */
  function iniciar() {
    if (!C) return;
    if (C.paginas[pagina]) document.title = C.paginas[pagina].titulo;

    $("#encabezado").innerHTML = encabezado();
    $("#principal").innerHTML = (paginas[pagina] || paginas.inicio)();
    $("#pie-pagina").innerHTML = pieDePagina() + whatsappFlotante();

    activarMenu();
    activarDona();
    activarGaleria();
    activarFormulario();

    /* Si se llegó con un ancla (p. ej. index.html#dona), ir a esa sección ya construida */
    if (location.hash) {
      var destino = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (destino) destino.scrollIntoView();
    }
  }

  iniciar();
})();

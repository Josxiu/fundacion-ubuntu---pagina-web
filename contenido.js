/* =====================================================================
   CONTENIDO DEL SITIO — Fundación Afrocolombiana Ubuntu Dejando Huella
   =====================================================================

   Este es el ÚNICO archivo que hay que tocar para cambiar textos, datos
   de contacto, cuentas, proyectos, fotos de la galería o enlaces.

   Cómo editar sin romper nada:
   - Cambia solo lo que está entre comillas "así".
   - No borres las comas al final de cada línea ni las llaves { } [ ].
   - Para agregar una foto: cópiala en la carpeta imagenes/ (mejor en
     formato .webp) y agrega un bloque nuevo en galeria.fotos copiando
     uno existente.
   - "ancho" y "alto" son las medidas en píxeles de la foto grande; se
     usan para que la página no "salte" mientras carga.
   - Si un campo de enlace queda vacío "", el sitio muestra el aviso de
     pendiente en lugar del botón (por ejemplo, la pasarela de pagos).
   ===================================================================== */

window.CONTENIDO = {

  /* ---------- Datos generales ---------- */
  sitio: {
    nombre: "Fundación Afrocolombiana Ubuntu Dejando Huella",
    sigla: "FUNUDEH",
    nit: "901.704.630-0",
    lema: "Yo soy porque nosotros somos",
    lemaFuente: "Filosofía Ubuntu",
    ubicacion: "Tuluá, Valle del Cauca, Colombia",
    logo: { archivo: "imagenes/logo-funudeh.webp", ancho: 520, alto: 452 },
    emblema: { archivo: "imagenes/emblema-funudeh.webp", ancho: 184, alto: 240 }
  },

  /* ---------- Menú principal (el orden aquí es el orden en pantalla) ---------- */
  menu: [
    { id: "inicio", texto: "Inicio", enlace: "index.html" },
    { id: "quienes-somos", texto: "Quiénes Somos", enlace: "quienes-somos.html" },
    { id: "proyectos", texto: "Proyectos e Impacto", enlace: "proyectos.html" },
    { id: "galeria", texto: "Galería", enlace: "galeria.html" },
    { id: "contacto", texto: "Contacto", enlace: "contacto.html" }
  ],
  botonApoyo: { texto: "Apóyanos", enlace: "index.html#dona" },

  /* ---------- Títulos de cada página (pestaña del navegador y buscadores) ---------- */
  paginas: {
    "inicio": { titulo: "FUNUDEH · Fundación Afrocolombiana Ubuntu Dejando Huella · Tuluá" },
    "quienes-somos": { titulo: "Quiénes Somos · FUNUDEH" },
    "proyectos": { titulo: "Proyectos e Impacto · FUNUDEH" },
    "galeria": { titulo: "Galería y Multimedia · FUNUDEH" },
    "contacto": { titulo: "Contacto · FUNUDEH" }
  },

  /* ---------- Contacto ---------- */
  contacto: {
    direccion: "Calle 22 # 16-12, Piso 2, Barrio Rojas",
    ciudad: "Tuluá, Valle del Cauca",
    mapa: "https://www.google.com/maps/search/?api=1&query=Calle+22+%2316-12+Barrio+Rojas+Tulu%C3%A1+Valle+del+Cauca",
    correo: "fundacionubuntudejandohuella@gmail.com",
    telefonos: [
      { numero: "301 7142146", marcar: "+573017142146" },
      { numero: "321 8931591", marcar: "+573218931591" },
      { numero: "602 2349467", marcar: "+576022349467" }
    ],
    /* WhatsApp: "principal" es el del botón flotante que aparece en todas las páginas. */
    whatsapp: {
      principal: { etiqueta: "Línea institucional", numero: "301 7142146", internacional: "573017142146" },
      alterno: { etiqueta: "Línea alterna", numero: "321 8931591", internacional: "573218931591" },
      mensaje: "Hola, FUNUDEH. Quiero información sobre donaciones, alianzas o voluntariado."
    }
  },

  /* ---------- Redes sociales ---------- */
  redes: [
    { red: "facebook", nombre: "Facebook", usuario: "", enlace: "https://www.facebook.com/share/19Cpngi7Ai/" },
    { red: "instagram", nombre: "Instagram", usuario: "@ubuntudejandohuella", enlace: "https://www.instagram.com/ubuntudejandohuella/" },
    { red: "youtube", nombre: "YouTube", usuario: "@ubuntudejandohuella", enlace: "https://www.youtube.com/@ubuntudejandohuella" }
  ],

  /* =================================================================
     PÁGINA 1 · INICIO
     ================================================================= */
  inicio: {
    hero: {
      antetitulo: "Fundación Afrocolombiana Ubuntu Dejando Huella",
      titulo: "Tejiendo identidad, arte y paz desde las raíces del Pacífico en Tuluá.",
      enfasis: "raíces del Pacífico", /* parte del título que va resaltada */
      subtitulo: "Reivindicamos los derechos, la cultura y la salud emocional de nuestra comunidad afrocolombiana, transformando vidas a través del principio de Ubuntu.",
      botonProyectos: { texto: "Conoce Nuestros Proyectos", enlace: "proyectos.html" },
      botonDona: { texto: "Súmate / Dona", enlace: "#dona" },
      /* Si cambias esta foto, actualiza también la línea "preload" en index.html */
      imagen: {
        archivo: "imagenes/inicio-hero.webp",
        variantes: [
          { archivo: "imagenes/inicio-hero-600.webp", ancho: 600 },
          { archivo: "imagenes/inicio-hero-900.webp", ancho: 900 },
          { archivo: "imagenes/inicio-hero-1200.webp", ancho: 1200 },
          { archivo: "imagenes/inicio-hero-1600.webp", ancho: 1600 },
          { archivo: "imagenes/inicio-hero.webp", ancho: 1920 }
        ],
        ancho: 1920, alto: 1486,
        alt: "Mujer afrocolombiana con turbante naranja y vestido tradicional habla al público con un micrófono durante EXPO AFRO 2026 en Tuluá.",
        pie: "EXPO AFRO 2026 · Tuluá",
        enfoque: "62% 30%" /* qué parte de la foto se prioriza al recortarse en pantallas pequeñas */
      }
    },
    ubuntu: {
      antetitulo: "Filosofía Ubuntu",
      titulo: "Bienvenidos",
      texto: "La filosofía fundacional se basa en el principio africano Ubuntu («Yo soy porque nosotros somos»), concibiendo a la Fundación como un espacio de transformación social que integra saberes ancestrales con herramientas artísticas, pedagógicas y terapéuticas. Su metodología promueve activamente el desarrollo del ser, el hacer y el tener, fomentando la inclusión, el cuidado colectivo y la reconciliación en el territorio.",
      enlace: { texto: "Conoce quiénes somos", enlace: "quienes-somos.html" }
    },
    alianzasTitulo: "Alianzas e Instituciones Aliadas",
    alianzasAntetitulo: "Gestión institucional",
    proyectosTitulo: "Proyectos destacados",
    proyectosEnlace: { texto: "Ver proyectos e impacto", enlace: "proyectos.html" }
  },

  /* ---------- Alianzas (logo: deja "" hasta tener el archivo del logo) ---------- */
  alianzas: [
    { nombre: "Ministerio de las Culturas, las Artes y los Saberes", logo: "" },
    { nombre: "Ministerio del Interior y Findeter (Banco de Iniciativas)", logo: "" },
    { nombre: "Instituto Colombiano de Bienestar Familiar (ICBF)", logo: "" },
    { nombre: "Gobernación del Valle del Cauca (Programa Parches en Paz)", logo: "" },
    { nombre: "Alcaldía de Tuluá y Casa de la Cultura", logo: "" },
    { nombre: "Cámara de Comercio de Tuluá", logo: "" }
  ],

  /* =================================================================
     APÓYANOS / DONA A NUESTRA CAUSA  (aparece en Inicio)
     ================================================================= */
  donaciones: {
    antetitulo: "Donaciones y aportes",
    titulo: "Apóyanos / Dona a Nuestra Causa",
    enfasis: "Dona a Nuestra Causa", /* parte del título que va resaltada */
    intro: "Personas naturales y jurídicas pueden apoyar con aportes económicos o en especie. Elige la alternativa que prefieras.",

    pasarela: {
      titulo: "Dona en línea",
      texto: "Aportes económicos seguros mediante tarjeta de crédito, débito PSE o billeteras integradas.",
      medios: ["Tarjeta de crédito", "Débito PSE", "Billeteras digitales"],
      boton: "Donar con pasarela",
      /* Pega aquí el enlace de pago de Wompi o PayU cuando lo tengan. Mientras esté vacío se muestra el aviso. */
      enlace: "",
      avisoPendiente: "[Enlace de pago por definir]",
      mensajePendiente: "La donación en línea estará disponible muy pronto. Mientras tanto puedes donar por transferencia, Nequi / Daviplata o escribirnos por WhatsApp."
    },

    transferencia: {
      titulo: "Transferencia bancaria (ESAL)",
      titular: "Fundación Afrocolombiana Ubuntu Dejando Huella (FUNUDEH)",
      nit: "901.704.630-0",
      banco: "Banco Caja Social",
      tipoCuenta: "Cuenta de Ahorros",
      numeroCuenta: "24140250545",
      billeteras: { nombre: "Nequi / Daviplata", numero: "301 7142146", nota: "Línea institucional autorizada" },
      nota: "Envía tu soporte de pago al correo o por WhatsApp para recibir tu certificado de donación."
    },

    whatsapp: {
      titulo: "Escríbenos por WhatsApp",
      texto: "Coordina con el equipo de la fundación donaciones en especie, alianzas estratégicas o voluntariado.",
      temas: ["Donaciones en especie", "Alianzas estratégicas", "Voluntariado"],
      boton: "Abrir WhatsApp"
    }
  },

  /* Franja de apoyo que aparece al final de las páginas internas */
  bandaApoyo: {
    titulo: "Súmate a nuestra causa",
    texto: "Tu aporte, económico o en especie, fortalece el trabajo con la comunidad afrocolombiana de Tuluá.",
    boton: { texto: "Ver formas de donar", enlace: "index.html#dona" }
  },

  /* =================================================================
     PÁGINA 2 · QUIÉNES SOMOS
     ================================================================= */
  quienesSomos: {
    antetitulo: "Quiénes Somos",
    titulo: "Una fundación que nace de la comunidad",
    historia: "La Fundación Afrocolombiana Ubuntu Dejando Huella tiene su origen en el municipio de Tuluá, Valle del Cauca. Nació como una iniciativa comunitaria, liderada por las Hermanas Urrutia, junto a familiares y personas cercanas, con la misión de impulsar el bienestar integral y la protección de los derechos humanos de las comunidades negras.",
    objetoSocial: "La Fundación Afrocolombiana Ubuntu Dejando Huella (FUNUDEH) tiene como objeto social reivindicar, fortalecer, promover, apoyar y rescatar con amor, empatía, solidaridad, reconciliación, perdón, unidad y paz los derechos humanos, territoriales, sociales, económicos, culturales y políticos de las comunidades afrocolombianas, negras, raizales y palenqueras. Trabajamos para el desarrollo integral de la población afrocolombiana, apoyando la promoción del desarrollo y liderazgo integral del ser, la inteligencia emocional y el bienestar psicológico de las comunidades, abordando los diferentes traumas psicológicos que pueden afectarles mediante actividades de promoción de la salud, prevención de la enfermedad y recuperación.",
    mision: "Reivindicar los derechos de la comunidad afrocolombiana, promoviendo el desarrollo integral desde el ser, el hacer y el tener. Trabajamos para fortalecer la identidad cultural, el liderazgo comunitario y el bienestar emocional, brindando herramientas prácticas y acompañamiento personalizado para el crecimiento individual y colectivo.",
    vision: "Consolidarnos como una organización de referencia en la promoción de la cultura afrocolombiana, el fortalecimiento de los valores ancestrales y la construcción de comunidades empoderadas, resilientes y conscientes de su identidad. Buscamos ser líderes en la transformación social y cultural, fomentando el respeto, la inclusión y la dignidad de las comunidades afrodescendientes en el territorio nacional.",
    principios: [
      { nombre: "Amor y Empatía", texto: "Construimos desde el respeto y la comprensión de las necesidades individuales y colectivas." },
      { nombre: "Solidaridad y Unidad", texto: "Promovemos la cooperación comunitaria para enfrentar los desafíos juntos bajo la filosofía Ubuntu." },
      { nombre: "Reconciliación y Perdón", texto: "Sanamos las heridas colectivas a través del diálogo y el reconocimiento de la historia." },
      { nombre: "Identidad y Orgullo Cultural", texto: "Valoramos y promovemos la herencia afrocolombiana como fuente de empoderamiento." },
      { nombre: "Justicia y Equidad", texto: "Luchamos contra el racismo y la discriminación en todas sus formas." }
    ],
    equipo: {
      titulo: "Equipo Directivo y Fundadoras",
      representante: { cargo: "Representante Legal", nombre: "Sandra Milena Urrutia Amaya" },
      consejoTitulo: "Consejo Directivo e integrantes",
      consejo: [
        "Juan José Vásquez Urrutia",
        "Ernestina Urrutia Amaya",
        "Martha Cecilia Rodríguez Saa",
        "Celia Malis Ibarguen Urrutia"
      ]
    }
  },

  /* =================================================================
     PÁGINA 3 · PROYECTOS E IMPACTO
     (los 3 primeros también se muestran en Inicio)
     ================================================================= */
  proyectosPagina: {
    antetitulo: "Proyectos e Impacto",
    titulo: "Arte, memoria y sanación para la comunidad",
    intro: "Programas que desarrollamos en Tuluá con el apoyo de instituciones aliadas."
  },
  proyectos: [
    {
      id: "uparu",
      nombre: "Laboratorio Cultural UPARU",
      aliados: "MinInterior – Findeter & Gobernación del Valle",
      enfoque: "Escuela intergeneracional de encuentros para jóvenes (14-28 años) en Tuluá.",
      componentes: [
        "Círculos de juntanza (sanación ancestral)",
        "Formación en marimba de chonta",
        "Fotografía documental («Galería de Memoria Viva»)"
      ],
      nota: "Fortalecido por el programa Parches en Paz de la Gobernación del Valle.",
      resumen: "Escuela intergeneracional de encuentros para jóvenes (14-28 años) en Tuluá: círculos de juntanza (sanación ancestral), formación en marimba de chonta y fotografía documental («Galería de Memoria Viva»).",
      logo: { archivo: "imagenes/logo-uparu.webp", ancho: 360, alto: 331, alt: "Logo del Laboratorio Cultural UPARU" },
      imagenes: [
        {
          archivo: "imagenes/proyecto-uparu.webp", pequena: "imagenes/proyecto-uparu-800.webp",
          ancho: 1600, alto: 646,
          alt: "Jóvenes sentados en círculo alrededor de marimbas de chonta y un tambor durante una sesión del Laboratorio Cultural UPARU.",
          pie: "Formación en marimba de chonta"
        },
        {
          archivo: "imagenes/proyecto-uparu-2.webp", pequena: "imagenes/proyecto-uparu-2-600.webp",
          ancho: 960, alto: 1280,
          alt: "Un formador con camiseta de la Fundación Ubuntu enseña a dos jóvenes a tocar el tambor.",
          pie: "Práctica de percusión"
        }
      ]
    },
    {
      id: "expo-afro",
      nombre: "EXPO AFRO – Trenzas, Turbantes y Saberes Ancestrales",
      aliados: "MinCultura – Programa Nacional de Concertación Cultural 2025 y 2026",
      enfoque: "Evento cultural de tres días enfocado en la transmisión de saberes estéticos, pasarelas culturales, conversatorios con sabedores de San Basilio de Palenque y visibilización de emprendimientos NARP locales.",
      componentes: [
        "Transmisión de saberes estéticos",
        "Pasarelas culturales",
        "Conversatorios con sabedores de San Basilio de Palenque",
        "Visibilización de emprendimientos NARP locales"
      ],
      nota: "",
      resumen: "Evento cultural de tres días: saberes estéticos, pasarelas culturales, conversatorios con sabedores de San Basilio de Palenque y emprendimientos NARP locales.",
      logo: null,
      imagenes: [
        {
          archivo: "imagenes/proyecto-expoafro.webp", pequena: "imagenes/proyecto-expoafro-800.webp",
          ancho: 1600, alto: 1546,
          alt: "Sabedoras con turbantes y vestidos tradicionales conversan con micrófonos bajo una carpa de colores en EXPO AFRO 2026.",
          pie: "Conversatorio · EXPO AFRO 2026"
        },
        {
          archivo: "imagenes/proyecto-expoafro-2.webp", pequena: "imagenes/proyecto-expoafro-2-600.webp",
          ancho: 1200, alto: 1692,
          alt: "Tres mujeres afrocolombianas sonríen luciendo turbantes estampados en EXPO AFRO 2026.",
          pie: "Turbantes · EXPO AFRO 2026"
        }
      ]
    },
    {
      id: "crearte",
      nombre: "Programa CreArte Comunitario – Modalidad Atrapasueños",
      aliados: "ICBF",
      enfoque: "Arte-terapia, murales comunitarios, cuentoterapia y percusión para promover la reconciliación y prevenir violencias en la niñez y juventud.",
      componentes: [
        "Arte-terapia",
        "Murales comunitarios",
        "Cuentoterapia",
        "Percusión"
      ],
      nota: "",
      resumen: "Arte-terapia, murales comunitarios, cuentoterapia y percusión para promover la reconciliación y prevenir violencias en la niñez y juventud.",
      logo: null,
      imagenes: [
        {
          archivo: "imagenes/proyecto-crearte.webp", pequena: "imagenes/proyecto-crearte-800.webp",
          ancho: 1600, alto: 720,
          alt: "Niñas y niños sentados en el piso escuchan un cuento mientras un joven toca marimba, en una sesión de CreArte Comunitario.",
          pie: "Cuentoterapia con marimba"
        },
        {
          archivo: "imagenes/proyecto-crearte-2.webp", pequena: "imagenes/proyecto-crearte-2-600.webp",
          ancho: 1200, alto: 1500,
          alt: "Vista desde arriba de niñas y niños con camisetas blancas sembrando una planta en el pasto.",
          pie: "Siembra comunitaria"
        }
      ]
    }
  ],

  /* =================================================================
     PÁGINA 4 · GALERÍA Y MULTIMEDIA
     ================================================================= */
  galeria: {
    antetitulo: "Galería y Multimedia",
    titulo: "Memoria viva de nuestros procesos",
    intro: "Talleres, muestras artísticas y encuentros comunitarios.",
    /* Filtros: el "id" debe coincidir con el campo "grupo" de cada foto */
    grupos: [
      { id: "todos", nombre: "Todas" },
      { id: "uparu", nombre: "Laboratorio UPARU" },
      { id: "parches", nombre: "UPARU · Parches en Paz" },
      { id: "expo-afro", nombre: "EXPO AFRO" },
      { id: "crearte", nombre: "CreArte Comunitario" }
    ],
    fotos: [
      { grupo: "uparu", archivo: "imagenes/proyecto-uparu.webp", pequena: "imagenes/proyecto-uparu-800.webp", ancho: 1600, alto: 646,
        alt: "Jóvenes sentados en círculo alrededor de marimbas de chonta y un tambor.", pie: "Formación en marimba de chonta · Laboratorio Cultural UPARU" },
      { grupo: "uparu", archivo: "imagenes/proyecto-uparu-2.webp", pequena: "imagenes/proyecto-uparu-2-600.webp", ancho: 960, alto: 1280,
        alt: "Un formador enseña a dos jóvenes a tocar el tambor.", pie: "Práctica de percusión · Laboratorio Cultural UPARU" },
      { grupo: "parches", archivo: "imagenes/galeria-parches-circulo.webp", pequena: "imagenes/galeria-parches-circulo-800.webp", ancho: 1600, alto: 1200,
        alt: "Estudiantes de pie en círculo aplauden junto a un facilitador.", pie: "Encuentro con estudiantes · UPARU – Parches en Paz" },
      { grupo: "parches", archivo: "imagenes/galeria-parches-exposicion.webp", pequena: "imagenes/galeria-parches-exposicion-800.webp", ancho: 1600, alto: 900,
        alt: "Pinturas y dibujos en caballetes de la exposición «El arte salva vidas».", pie: "Exposición «El arte salva vidas» · UPARU – Parches en Paz" },
      { grupo: "expo-afro", archivo: "imagenes/proyecto-expoafro.webp", pequena: "imagenes/proyecto-expoafro-800.webp", ancho: 1600, alto: 1546,
        alt: "Sabedoras con turbantes conversan con micrófonos bajo una carpa de colores.", pie: "Conversatorio · EXPO AFRO 2026" },
      { grupo: "expo-afro", archivo: "imagenes/proyecto-expoafro-2.webp", pequena: "imagenes/proyecto-expoafro-2-600.webp", ancho: 1200, alto: 1692,
        alt: "Tres mujeres afrocolombianas sonríen luciendo turbantes estampados.", pie: "Turbantes · EXPO AFRO 2026" },
      { grupo: "expo-afro", archivo: "imagenes/inicio-hero-1200.webp", pequena: "imagenes/inicio-hero-600.webp", ancho: 1200, alto: 929,
        alt: "Mujer con turbante naranja habla al público con un micrófono junto a obras de arte expuestas.", pie: "Palabra y memoria · EXPO AFRO 2026" },
      { grupo: "crearte", archivo: "imagenes/proyecto-crearte.webp", pequena: "imagenes/proyecto-crearte-800.webp", ancho: 1600, alto: 720,
        alt: "Niñas y niños escuchan un cuento mientras un joven toca marimba.", pie: "Cuentoterapia con marimba · CreArte Comunitario" },
      { grupo: "crearte", archivo: "imagenes/proyecto-crearte-2.webp", pequena: "imagenes/proyecto-crearte-2-600.webp", ancho: 1200, alto: 1500,
        alt: "Niñas y niños sembrando una planta en el pasto, vistos desde arriba.", pie: "Siembra comunitaria · CreArte Comunitario" }
    ],
    youtube: {
      titulo: "Videos",
      texto: "Mira los videos de nuestros talleres, muestras artísticas y mingas en el canal oficial de la fundación.",
      boton: "Ir al canal de YouTube",
      enlace: "https://www.youtube.com/@ubuntudejandohuella"
    },
    /* Para mostrar un video aquí, agrega su código de YouTube (lo que va después de "v=" en el enlace).
       Ejemplo: { id: "abc123XYZ", titulo: "Muestra de marimba de chonta" } */
    videos: []
  },

  /* =================================================================
     PÁGINA 5 · CONTACTO
     ================================================================= */
  contactoPagina: {
    antetitulo: "Contacto",
    titulo: "Hablemos",
    intro: "Escríbenos para alianzas, voluntariado, donaciones o información sobre nuestros procesos.",
    formularioTitulo: "Envíanos un mensaje",
    /* Si más adelante contratan un servicio de formularios (p. ej. Formspree),
       pega aquí la dirección que les den. Vacío = el mensaje se abre en el correo de la persona. */
    formularioAccion: "",
    asunto: "Mensaje desde el sitio web de FUNUDEH",
    exito: "¡Gracias! Recibimos tu mensaje y te responderemos pronto.",
    exitoCorreo: "Se abrió tu aplicación de correo con el mensaje listo. Solo falta que presiones «Enviar». Si no se abrió, escríbenos a"
  },

  pie: {
    derechos: "Fundación Afrocolombiana Ubuntu Dejando Huella · Tuluá, Valle del Cauca, Colombia"
  }
};

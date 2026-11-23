/* ==========================================================================
   ✨ AQUÍ EDITAS TÚ EL CALENDARIO ✨

   Cambia los mensajes y, sobre todo, los regalos por los tuyos.
   Cada día tiene esta forma:

     {
       dia: 1,
       mensaje: "Frase bonita para ese día.",
       regalo: {
         emoji: "🎁",
         nombre: "Nombre del regalo",
         descripcion: "Una pista o detalle (déjalo vacío si no quieres).",
         enlace: ""   // URL opcional: una canción, una foto, una carta...
       }
     }

   Campos opcionales para un día especial (por ejemplo, un cumpleaños):
     especial: "cumple",
     etiquetaEspecial: "🎂 ¡Cumpleaños!"

   El día marcado como "cumple" se ve distinto (cinta dorada, brillo) y al
   abrirlo lanza confeti. Ahora está puesto en el día 19.

   Si pones un enlace, aparecerá un botón "Ver regalo →" en la puerta.
   Los regalos de abajo son IDEAS DE EJEMPLO: cámbialos por los reales. 💌
   ========================================================================== */

const CONTENIDO = {
  anio: 2026,                       // Año del adviento
  nombre: "mi amor",                // Cómo llamarla al avisarle de una puerta cerrada
  titulo: "Calendario de Adviento",
  subtitulo: "24 días, 24 razones para quererte",
  mensajeFinal:
    "La Navidad es una fecha, pero contigo es una costumbre que quiero repetir todos los años. " +
    "Gracias por ser mi casa, mi calma y mi regalo favorito. " +
    "Feliz Navidad, mi amor. Te quiero hoy y siempre. ❤️",

  dias: [
    {
      dia: 1,
      mensaje: "Hoy empieza mi parte favorita del año: contar los días para verte sonreír.",
      regalo: { emoji: "💋", nombre: "Un beso robado", descripcion: "Cámbialo por tu primer regalo.", enlace: "" }
    },
    {
      dia: 2,
      mensaje: "Si tuviera que elegir un lugar para estar ahora mismo, sería siempre a tu lado.",
      regalo: { emoji: "🥐", nombre: "Desayuno en la cama", descripcion: "Café, tostadas y cero prisas.", enlace: "" }
    },
    {
      dia: 3,
      mensaje: "Me gusta cómo el mundo se vuelve más pequeño cuando estoy contigo.",
      regalo: { emoji: "🎵", nombre: "Una canción para los dos", descripcion: "Ponle el enlace de vuestra canción.", enlace: "" }
    },
    {
      dia: 4,
      mensaje: "Eres mi notificación favorita, incluso cuando no dices nada.",
      regalo: { emoji: "💆", nombre: "Diez minutos de mimos", descripcion: "Tú eliges dónde y cuándo.", enlace: "" }
    },
    {
      dia: 5,
      mensaje: "Gracias por hacer que lo ordinario se sienta extraordinario.",
      regalo: { emoji: "🍫", nombre: "Tu chocolate favorito", descripcion: "Escondido en su sitio de siempre.", enlace: "" }
    },
    {
      dia: 6,
      mensaje: "Hay personas que iluminan una habitación. Tú la iluminas enterita.",
      regalo: { emoji: "✉️", nombre: "Una carta escrita a mano", descripcion: "Las palabras se leen mejor en papel.", enlace: "" }
    },
    {
      dia: 7,
      mensaje: "Cada día contigo es un regalo que no supe que necesitaba.",
      regalo: { emoji: "🎬", nombre: "La peli que tú quieras", descripcion: "Mandas tú, yo hago el palomitas.", enlace: "" }
    },
    {
      dia: 8,
      mensaje: "Tu risa es mi sonido favorito, sin competencia.",
      regalo: { emoji: "☕", nombre: "Un café con tu nombre", descripcion: "Y con doble de cariño.", enlace: "" }
    },
    {
      dia: 9,
      mensaje: "Si hoy fuera un mal día, tu nombre aún lo arreglaría.",
      regalo: { emoji: "📵", nombre: "Media hora sin móviles", descripcion: "Solo tú y yo, sin distracciones.", enlace: "" }
    },
    {
      dia: 10,
      mensaje: "No necesito un mapa cuando tengo tu mano.",
      regalo: { emoji: "🚶", nombre: "Un paseo sin rumbo", descripcion: "Agarrados de la mano, como siempre.", enlace: "" }
    },
    {
      dia: 11,
      mensaje: "Eres la razón por la que me gusta diciembre.",
      regalo: { emoji: "🍰", nombre: "Tu postre favorito", descripcion: "Guardado con mucho cuidado.", enlace: "" }
    },
    {
      dia: 12,
      mensaje: "Te quiero con la calma de quien ya encontró su casa.",
      regalo: { emoji: "📸", nombre: "Una foto nuestra", descripcion: "Imprímela y ponla donde la veas cada día.", enlace: "" }
    },
    {
      dia: 13,
      mensaje: "En medio del ruido, tú eres mi silencio favorito.",
      regalo: { emoji: "🕯️", nombre: "Una vela encendida", descripcion: "Y la luz bajita, como te gusta.", enlace: "" }
    },
    {
      dia: 14,
      mensaje: "Me encanta mirarte y saber que estás ahí, simplemente.",
      regalo: { emoji: "🧦", nombre: "Tus calcetines favoritos", descripcion: "Porque el frío no va contigo.", enlace: "" }
    },
    {
      dia: 15,
      mensaje: "Contigo, hasta esperar se siente como llegar.",
      regalo: { emoji: "🎁", nombre: "Un detalle pequeño", descripcion: "De esos que solo tú te das cuenta.", enlace: "" }
    },
    {
      dia: 16,
      mensaje: "Eres mi plan favorito, incluso cuando el plan es no hacer nada.",
      regalo: { emoji: "🫶", nombre: "Un abrazo largo", descripcion: "De los que no se sueltan pronto.", enlace: "" }
    },
    {
      dia: 17,
      mensaje: "Gracias por quedarte, por volver, por elegirme otra vez.",
      regalo: { emoji: "📖", nombre: "Un cuento antes de dormir", descripcion: "Lo leo yo, tú solo escuchas.", enlace: "" }
    },
    {
      dia: 18,
      mensaje: "Hay un antes y un después de ti, y yo me quedo con el después.",
      regalo: { emoji: "🍓", nombre: "Fresas con crema", descripcion: "Tu capricho de hoy.", enlace: "" }
    },
    {
      dia: 19,
      especial: "cumple",
      etiquetaEspecial: "🎂 ¡Cumpleaños!",
      mensaje: "Hoy el calendario se detiene para celebrarte: nació la persona que le puso luz a todos mis días.",
      regalo: { emoji: "🎂", nombre: "Muchos regalos", descripcion: "Hoy no hay uno: hay un montón. Prepárate para soplar las velas.", enlace: "" }
    },
    {
      dia: 20,
      mensaje: "Si la Navidad tiene magia, tú la trajiste contigo.",
      regalo: { emoji: "💌", nombre: "Un mensaje guardado", descripcion: "Escrito para el día que lo necesites.", enlace: "" }
    },
    {
      dia: 21,
      mensaje: "Cada mañana me despierto agradecido de que existas.",
      regalo: { emoji: "🎀", nombre: "Algo que te queda bien", descripcion: "Aunque ya te queda todo.", enlace: "" }
    },
    {
      dia: 22,
      mensaje: "No hay distancia que aguante las ganas de verte.",
      regalo: { emoji: "🌟", nombre: "Una estrella pedida", descripcion: "Pide lo que quieras; yo ya lo pedí.", enlace: "" }
    },
    {
      dia: 23,
      mensaje: "Mañana será Navidad, pero a tu lado ya lo es todo.",
      regalo: { emoji: "🥂", nombre: "Un brindis por nosotros", descripcion: "Por todo lo que viene.", enlace: "" }
    },
    {
      dia: 24,
      mensaje: "Feliz Navidad, mi amor. Gracias por ser mi regalo favorito, todos los días del año.",
      regalo: { emoji: "💍", nombre: "El regalo final", descripcion: "Escribe aquí tu gran detalle...", enlace: "" }
    }
  ]
};

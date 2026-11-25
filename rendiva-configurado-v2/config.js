/* ==========================================================================
   CONFIGURACIÓN — es el único archivo que tienes que editar para ponerlo a
   funcionar con tus datos.
   ========================================================================== */
window.APP_CONFIG = {
  // Nombre de tu marca (se muestra en el logo y el título de los mensajes).
  brand: "Rendiva",

  // ---- UMAMI (analítica) -------------------------------------------------
  // 1) Crea una cuenta en https://cloud.umami.is (o usa tu propio servidor).
  // 2) Agrega un sitio con tu dominio y copia su "Website ID".
  // 3) Pégalo aquí. Mientras esté vacío, no se envía nada.
  umami: {
    src: "https://cloud.umami.is/script.js", // si tienes Umami propio: "https://tu-umami.com/script.js"
    websiteId: "08ff85c7-a219-49f9-8801-6441ef995d63", // Website ID de tu sitio en Umami
    domains: "rendiva.netlify.app"    // solo cuenta visitas de tu dominio (si agregas otro dominio, sepáralos con coma)
  },

  // ---- CORREOS -----------------------------------------------------------
  // URL que recibirá los correos (método POST con JSON: {email, feature, source, brand, date}).
  // Opción fácil: crea un formulario en https://formspree.io y pega su URL aquí
  // (algo como "https://formspree.io/f/xxxxxxx").
  // Mientras esté vacío, el correo NO se guarda en ningún servidor.
  emailEndpoint: "https://formspree.io/f/xqpqgwwj",

  // Página con tu aviso de privacidad (edita privacidad.html).
  privacyUrl: "privacidad.html",

  // Descuento que prometes a quienes dejen su correo (solo texto en pantalla).
  couponPercent: 50,

  // ---- ANUNCIOS --------------------------------------------------------------
  // Pantalla de anuncio al tocar "Continuar" tras completar una lección, una vez cada `every` lecciones.
  // "Quitar anuncios" es una función Pro (puerta falsa): se mide en Umami como pro-click · sin-anuncios.
  // Mientras `sponsors` esté vacío se muestran anuncios propios (funciones Pro que vienen).
  // Para poner anuncios de un patrocinador o de afiliados, agrégalos aquí (solo enlaces http/https):
  //   sponsors: [{ icon: "🏦", title: "Nombre", text: "Frase corta", button: "Ver oferta", url: "https://…" }]
  ads: {
    enabled: true,   // false = sin anuncios para todos
    every: 2,        // un anuncio cada 2 lecciones completadas
    seconds: 5,      // segundos antes de poder continuar (0 = se puede continuar de inmediato)
    sponsors: []
  },

  // ---- LÍMITES DEL PLAN GRATIS ---------------------------------------------
  hearts: { max: 5, refillMinutes: 25 },          // vidas
  limits: {
    errorSessionsPerDay: 1,   // sesiones de "Mis errores" al día
    errorQuestions: 5,        // preguntas por sesión de "Mis errores"
    dailyQuestions: 5         // preguntas del reto diario
  },

  // ---- MONEDAS (economía virtual) ------------------------------------------
  rewards: { lesson: 5, perfect: 3, daily: 10, errors: 5, badge: 10 },   // lo que se gana
  shop: { heartsRefill: 40, streakFreeze: 60, xpBoost: 30, maxFreezes: 2 }, // lo que cuesta
  quests: { xp: 10, lessons: 15, daily: 10 },      // premio de cada misión diaria

  // ---- MASCOTA (Capi) ------------------------------------------------------
  // El nivel de la app es el nivel de Capi. levelXp = XP total para llegar a cada nivel (6 niveles).
  // Ventajas que desbloquea: nivel 2 monedas extra por lección · nivel 3 vidas más rápidas ·
  // nivel 4 escudo de racha semanal · nivel 5 XP extra · nivel 6 monedas extra en el reto diario.
  mascot: {
    name: "Capi",
    levelXp: [0, 60, 160, 320, 560, 900],
    perks: { lessonCoins: 1, heartMinutes: 20, shieldDays: 7, xpPercent: 10, dailyCoins: 5 }
  }
};

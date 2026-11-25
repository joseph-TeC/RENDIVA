/* ==========================================================================
   CONTENIDO COMPLEMENTARIO
   - FEATURES / PRO_LIST / PROMO_ROTATION: funciones Pro (puertas falsas) y sus textos
   - GLOSSARY: glosario
   - RISK_TEST / RISK_PROFILES: test de perfil de riesgo
   - BADGES: logros
   (Las lecciones están en lecciones-gratis.js y lecciones-pro.js)
   ========================================================================== */

/* --------------------------------------------------------------------------
   Funciones Pro (fake doors). Cada clic se mide en Umami con el evento
   "pro-click" y la propiedad "feature" = la clave de este objeto.
   -------------------------------------------------------------------------- */
window.FEATURES = {
  "simulador": {
    icon: "📈",
    title: "Simulador de inversiones",
    short: "Practica con dinero virtual, sin arriesgar nada.",
    long: "Arma un portafolio con saldo virtual y mira cómo reacciona ante subidas, caídas y distintos plazos."
  },
  "asistente-ia": {
    icon: "🤖",
    title: "Asistente de inversiones con IA",
    short: "Pregunta lo que quieras y recibe respuestas claras.",
    long: "Un asistente que te explica conceptos, resuelve dudas y te ayuda a entender cada decisión, a tu ritmo."
  },
  "plan-personalizado": {
    icon: "🧭",
    title: "Plan personalizado",
    short: "Una ruta de estudio hecha para tus metas.",
    long: "Cuéntanos tu meta, tu plazo y tu nivel de comodidad con el riesgo, y armamos tu ruta de lecciones y ejercicios."
  },
  "repaso-inteligente": {
    icon: "🔄",
    title: "Repaso inteligente ilimitado",
    short: "Practica justo lo que más se te olvida, sin límite diario.",
    long: "Repetimos tus errores en el momento adecuado para que los conceptos se queden contigo a largo plazo."
  },
  "ligas-amigos": {
    icon: "🏆",
    title: "Ligas y retos con amigos",
    short: "Aprende en compañía y sin perder la racha.",
    long: "Compite en ligas semanales, reta a tus amigos y mantengan juntos el hábito de aprender."
  },
  "noticias-simples": {
    icon: "📰",
    title: "Noticias explicadas fácil",
    short: "Entiende qué pasa en los mercados en 1 minuto.",
    long: "Resúmenes sin jerga de lo que mueve a los mercados y por qué te importa."
  },
  "portafolio-sugerido": {
    icon: "🥧",
    title: "Portafolio de ejemplo para tu perfil",
    short: "Mira cómo se vería un portafolio educativo según tu perfil.",
    long: "Con base en tu test de perfil de riesgo, te mostramos ejemplos de portafolios, qué tipos de activos incluyen y por qué."
  },
  "escenarios-historicos": {
    icon: "⏪",
    title: "Escenarios históricos",
    short: "¿Qué habría pasado en una crisis? Revívela sin arriesgar nada.",
    long: "Prueba tu portafolio virtual en momentos como crisis, recuperaciones y años de euforia, y aprende cómo reaccionaron los mercados."
  },
  "calc-avanzadas": {
    icon: "🧮",
    title: "Calculadoras avanzadas",
    short: "Compara escenarios, impuestos e inflación variable.",
    long: "Compara varios escenarios lado a lado, agrega comisiones e impuestos y guarda tus resultados."
  },
  "metas-recordatorios": {
    icon: "⏰",
    title: "Metas con recordatorios",
    short: "Guarda tus metas y recibe recordatorios para cumplirlas.",
    long: "Convierte el resultado de tus calculadoras en una meta y recibe recordatorios amables para aportar y no perder el ritmo."
  },
  "certificados": {
    icon: "🎓",
    title: "Certificados de finalización",
    short: "Un certificado al terminar cada unidad.",
    long: "Obtén un certificado con tu nombre al completar cada unidad, para compartirlo o guardarlo."
  },
  "resumenes-pdf": {
    icon: "📄",
    title: "Resúmenes y fichas en PDF",
    short: "Descarga fichas de estudio de cada lección.",
    long: "Fichas de una página con lo esencial de cada lección, para repasar sin conexión o imprimir."
  },
  "sin-anuncios": {
    icon: "🚫",
    title: "Sin anuncios",
    short: "Aprende sin interrupciones entre lecciones.",
    long: "Con Pro ya no verás anuncios al terminar tus lecciones: entras, aprendes y sigues con tu racha."
  },
  "cursos-avanzados": {
    icon: "🔓",
    title: "Lecciones avanzadas",
    short: "Más lecciones en cada unidad: tasas, ETFs, correlación, flujo de efectivo y más.",
    long: "Desbloquea las lecciones avanzadas que hay al final de cada unidad, con temas como la regla del 72, bonos y tasas, correlación, costo promedio y fraudes en redes."
  },
  "vidas-ilimitadas": {
    icon: "❤️",
    title: "Vidas ilimitadas",
    short: "Practica sin esperar a que se recarguen.",
    long: "Sigue aprendiendo sin límites aunque falles, porque equivocarse también enseña."
  },
  "racha-protegida": {
    icon: "🧊",
    title: "Congelaciones de racha ilimitadas",
    short: "Protege tu racha sin gastar monedas.",
    long: "Tu racha se mantiene aunque te pierdas un día. Sin monedas, sin estrés."
  },
  "mascota-trajes": {
    icon: "👕",
    title: "Trajes y accesorios para Capi",
    short: "Viste a tu toro con trajes, gorras y fondos exclusivos.",
    long: "Personaliza a Capi con trajes de ejecutivo, gorras, lentes y fondos que se desbloquean con tu racha. Es la tienda de estilo de tu mascota."
  },
  "lecciones-audio": {
    icon: "🎧",
    title: "Lecciones en audio",
    short: "Escucha las lecciones mientras caminas o viajas.",
    long: "Cada lección narrada en español, con velocidad ajustable. Aprende a invertir sin mirar la pantalla."
  },
  "lecciones-offline": {
    icon: "📥",
    title: "Lecciones sin conexión",
    short: "Descarga unidades para estudiar sin internet.",
    long: "Baja las unidades que quieras y sigue tu racha aunque no tengas datos ni Wi-Fi. Tu avance se sincroniza al volver a conectarte."
  },
  "capi-recordatorios": {
    icon: "⏰",
    title: "Recordatorios de Capi",
    short: "Capi te avisa antes de que pierdas tu racha.",
    long: "Elige la hora y recibe un aviso amistoso de Capi para practicar justo a tiempo. Por correo o notificación."
  },
  "estadisticas-avanzadas": {
    icon: "📊",
    title: "Estadísticas avanzadas",
    short: "Tu avance y precisión por tema, con consejos de qué repasar.",
    long: "Mira en qué temas fallas más, cuánto mejoras cada semana y qué conviene repasar primero."
  },
  "temas-colores": {
    icon: "🎨",
    title: "Temas y colores",
    short: "Elige paleta, fondos y tipografía para tu app.",
    long: "Cambia los colores de la app y de Capi: modo bosque, atardecer, medianoche y más."
  },
  "pro-general": {
    icon: "💎",
    title: "Rendiva Pro",
    short: "Todo lo que viene en la versión Pro.",
    long: "Sin anuncios, lecciones avanzadas, simulador, asistente con IA, plan personalizado, repaso inteligente, ligas, noticias y mucho más."
  }
};

/* Funciones que se muestran en la pestaña "Pro", en este orden */
window.PRO_LIST = [
  "sin-anuncios",
  "cursos-avanzados",
  "simulador",
  "asistente-ia",
  "plan-personalizado",
  "repaso-inteligente",
  "escenarios-historicos",
  "portafolio-sugerido",
  "calc-avanzadas",
  "metas-recordatorios",
  "mascota-trajes",
  "ligas-amigos",
  "noticias-simples",
  "certificados",
  "resumenes-pdf"
];

/* Funciones que se ofrecen (rotando) al terminar una lección */
window.PROMO_ROTATION = ["simulador", "asistente-ia", "plan-personalizado", "escenarios-historicos", "ligas-amigos", "noticias-simples"];

/* --------------------------------------------------------------------------
   Glosario. c = categoría: basico | mercado | riesgo | dinero | fraude
   -------------------------------------------------------------------------- */
window.GLOSSARY_CATS = [
  { id: "basico", label: "Básicos" },
  { id: "dinero", label: "Dinero y deudas" },
  { id: "mercado", label: "Mercado" },
  { id: "riesgo", label: "Riesgo" },
  { id: "fraude", label: "Fraudes" }
];

window.GLOSSARY = [
  { t: "Acción", c: "mercado", d: "Una parte de la propiedad de una empresa. Si la empresa gana, puedes recibir dividendos o ver subir el precio de tu acción." },
  { t: "Activo", c: "basico", d: "Algo que posees y que tiene valor, como efectivo, acciones, bonos o un inmueble." },
  { t: "Afore", c: "dinero", d: "En México, la administradora que gestiona tu cuenta individual de ahorro para el retiro." },
  { t: "Aportación", c: "basico", d: "Dinero que agregas a tu inversión de forma periódica o extraordinaria." },
  { t: "Asignación de activos", c: "mercado", d: "Cómo repartes tu dinero entre tipos de activos: acciones, bonos, efectivo, inmuebles, etc." },
  { t: "Aversión a la pérdida", c: "riesgo", d: "Tendencia a sentir más el dolor de perder que la alegría de ganar lo mismo, lo que puede llevar a malas decisiones." },
  { t: "Bolsa de valores", c: "mercado", d: "Mercado organizado donde se compran y venden acciones, bonos y otros valores." },
  { t: "Bono", c: "mercado", d: "Un préstamo que haces a un gobierno o empresa. A cambio recibes intereses y, al vencimiento, tu capital." },
  { t: "Broker (casa de bolsa)", c: "mercado", d: "Intermediario autorizado que te permite comprar y vender valores en el mercado." },
  { t: "Burbuja", c: "riesgo", d: "Situación en la que los precios suben muy por encima de su valor, impulsados por euforia, y luego pueden caer con fuerza." },
  { t: "CAT", c: "dinero", d: "Costo Anual Total de un crédito: incluye intereses, comisiones y otros gastos. Sirve para comparar créditos." },
  { t: "Capital", c: "basico", d: "El dinero inicial con el que empiezas a invertir." },
  { t: "CETES", c: "mercado", d: "Certificados de la Tesorería de la Federación: títulos de deuda que emite el gobierno de México." },
  { t: "Comisión", c: "dinero", d: "Cobro por un servicio, como administrar un fondo, mantener una cuenta o ejecutar una compra." },
  { t: "Corrección", c: "mercado", d: "Caída moderada de precios después de una racha de alzas." },
  { t: "Cupón", c: "mercado", d: "Pago periódico de intereses que hace un bono." },
  { t: "Deuda", c: "dinero", d: "Dinero que debes y que normalmente genera intereses hasta que lo pagas." },
  { t: "Diversificación", c: "riesgo", d: "Repartir tu dinero en varios activos para que una sola caída no afecte todo tu portafolio." },
  { t: "Dividendo", c: "mercado", d: "Parte de las utilidades de una empresa que se reparte entre sus accionistas." },
  { t: "Efecto manada", c: "riesgo", d: "Imitar lo que hace la mayoría sin analizarlo, por ejemplo comprar algo solo porque todos lo compran." },
  { t: "Emisor", c: "mercado", d: "Quien emite un bono u otro valor, es decir, quien pide prestado el dinero." },
  { t: "ETF", c: "mercado", d: "Fondo cotizado en bolsa que agrupa muchos activos y se compra y vende como una acción." },
  { t: "FIBRA", c: "mercado", d: "Vehículo que cotiza en bolsa e invierte en inmuebles que generan renta." },
  { t: "Fondo de emergencia", c: "dinero", d: "Dinero fácil de disponer para imprevistos, normalmente de 3 a 6 meses de gastos esenciales." },
  { t: "Fondo de inversión", c: "mercado", d: "Vehículo que junta dinero de muchas personas para invertir en una canasta de activos." },
  { t: "Ganancia de capital", c: "dinero", d: "Ganancia que obtienes al vender un activo por más de lo que pagaste." },
  { t: "GAT", c: "dinero", d: "Ganancia Anual Total: indica el rendimiento anual de un producto de ahorro o inversión." },
  { t: "Gestión activa", c: "mercado", d: "Estrategia en la que un administrador elige activos buscando superar al mercado." },
  { t: "Gestión pasiva", c: "mercado", d: "Estrategia que busca replicar un índice, con pocos cambios y costos bajos." },
  { t: "Horizonte de inversión", c: "basico", d: "Tiempo que planeas mantener tu dinero invertido antes de necesitarlo." },
  { t: "Índice", c: "mercado", d: "Medida que sigue el comportamiento de un grupo de activos, como las acciones más grandes de un país." },
  { t: "Inflación", c: "basico", d: "Aumento general de los precios con el tiempo. Hace que tu dinero compre menos." },
  { t: "Interés compuesto", c: "basico", d: "Intereses que generan más intereses porque se suman al capital." },
  { t: "Interés simple", c: "basico", d: "Intereses calculados solo sobre el capital inicial, sin sumar los intereses anteriores." },
  { t: "Liquidez", c: "basico", d: "Qué tan rápido puedes convertir un activo en efectivo sin perder valor." },
  { t: "Mercado alcista", c: "mercado", d: "Periodo prolongado en el que los precios tienden a subir." },
  { t: "Mercado bajista", c: "mercado", d: "Periodo prolongado en el que los precios tienden a bajar." },
  { t: "Orden limitada", c: "mercado", d: "Orden de compra o venta que solo se ejecuta si el mercado llega al precio que fijaste." },
  { t: "Orden de mercado", c: "mercado", d: "Orden que se ejecuta de inmediato al mejor precio disponible." },
  { t: "P/U (precio/utilidad)", c: "mercado", d: "Precio de una acción dividido entre la utilidad por acción. Ayuda a comparar qué tan cara o barata parece." },
  { t: "Patrimonio", c: "dinero", d: "Todo lo que tienes menos todo lo que debes." },
  { t: "Phishing", c: "fraude", d: "Engaño, por correo, mensaje o página falsa, para robar tus datos o contraseñas." },
  { t: "Plazo", c: "basico", d: "Tiempo que dejas tu dinero en una inversión o que tarda en vencer un crédito." },
  { t: "Poder adquisitivo", c: "basico", d: "Cantidad de bienes y servicios que puedes comprar con tu dinero." },
  { t: "Ponzi", c: "fraude", d: "Esquema que paga rendimientos a los primeros con el dinero de los nuevos inversionistas, hasta que se acaba." },
  { t: "Portafolio", c: "mercado", d: "El conjunto de todas tus inversiones." },
  { t: "Pump and dump", c: "fraude", d: "Inflar el precio de un activo con publicidad engañosa para vender caro y dejar pérdidas a quienes compraron después." },
  { t: "Rebalancear", c: "riesgo", d: "Ajustar tu portafolio para volver a la distribución que habías planeado." },
  { t: "Rendimiento", c: "basico", d: "Ganancia que genera una inversión, normalmente expresada en porcentaje." },
  { t: "Rendimiento real", c: "basico", d: "Rendimiento después de descontar la inflación." },
  { t: "Renta fija", c: "mercado", d: "Inversiones de deuda, como bonos, que prometen pagos de intereses definidos." },
  { t: "Renta variable", c: "mercado", d: "Inversiones cuyo resultado no está definido de antemano, como las acciones." },
  { t: "Riesgo", c: "riesgo", d: "Posibilidad de que el resultado de una inversión sea menor al esperado, incluso una pérdida." },
  { t: "Tasa nominal", c: "dinero", d: "Tasa anunciada, sin descontar la inflación." },
  { t: "Tipo de cambio", c: "dinero", d: "Precio de una moneda expresado en otra." },
  { t: "Valor nominal", c: "mercado", d: "Monto que paga un bono a su vencimiento." },
  { t: "Volatilidad", c: "riesgo", d: "Qué tanto y qué tan rápido suben y bajan los precios de un activo." }
];

/* --------------------------------------------------------------------------
   Test de perfil de riesgo. Cada opción vale de 1 a 4 puntos.
   -------------------------------------------------------------------------- */
window.RISK_TEST = [
  {
    q: "¿Cuándo necesitarás este dinero?",
    o: ["En menos de 1 año", "En 1 a 3 años", "En 3 a 10 años", "En más de 10 años"]
  },
  {
    q: "Tu inversión cae 20% en un mes. ¿Qué harías?",
    o: ["Vendería todo para no perder más", "Vendería una parte", "Esperaría a que se recupere", "Aprovecharía para comprar más"]
  },
  {
    q: "¿Qué experiencia tienes invirtiendo?",
    o: ["Ninguna", "Un poco", "Algo de experiencia", "Mucha experiencia"]
  },
  {
    q: "¿Qué tan estables son tus ingresos?",
    o: ["Muy variables", "Algo variables", "Estables", "Muy estables y con otras fuentes"]
  },
  {
    q: "¿Tienes un fondo de emergencia de 3 a 6 meses de gastos?",
    o: ["No", "Tengo una parte", "Sí", "Sí, y con margen extra"]
  },
  {
    q: "¿Con cuál de estas ideas te sientes más cómodo?",
    o: [
      "Cero pérdidas, aunque gane poco",
      "Pérdidas pequeñas posibles para ganar algo más",
      "Pérdidas moderadas para buscar más crecimiento",
      "Pérdidas grandes temporales para buscar el mayor crecimiento"
    ]
  },
  {
    q: "¿Qué describe mejor tu objetivo?",
    o: ["Conservar mi dinero", "Ganarle un poco a la inflación", "Crecer de forma constante", "Maximizar el crecimiento a largo plazo"]
  }
];

/* Rangos de puntaje (7 a 28) y ejemplos educativos de distribución (en %) */
window.RISK_PROFILES = [
  {
    id: "conservador", max: 12, icon: "🐢", title: "Conservador",
    desc: "Prefieres la estabilidad. Te importa más cuidar tu dinero que obtener el mayor rendimiento posible.",
    mix: [["Renta fija y efectivo", 75], ["Acciones y fondos de acciones", 20], ["Otros (inmuebles, oro)", 5]]
  },
  {
    id: "moderado", max: 20, icon: "🚲", title: "Moderado",
    desc: "Buscas un equilibrio: aceptas cierta volatilidad a cambio de un crecimiento razonable.",
    mix: [["Renta fija y efectivo", 50], ["Acciones y fondos de acciones", 40], ["Otros (inmuebles, oro)", 10]]
  },
  {
    id: "crecimiento", max: 28, icon: "🚀", title: "De crecimiento",
    desc: "Tienes tiempo y tolerancia a las caídas, así que priorizas crecer a largo plazo aunque haya altibajos.",
    mix: [["Renta fija y efectivo", 20], ["Acciones y fondos de acciones", 70], ["Otros (inmuebles, oro)", 10]]
  }
];

/* --------------------------------------------------------------------------
   Logros. rule.k = métrica; rule.v = valor mínimo.
   Métricas: lessons, streak, xp, perfect, daily, units, free, risk, calc,
             gloss, purchases, email, errfix
   -------------------------------------------------------------------------- */
window.BADGES = [
  { id: "primer-paso", icon: "🌱", title: "Primer paso", desc: "Completa tu primera lección", rule: { k: "lessons", v: 1 } },
  { id: "en-marcha", icon: "🚶", title: "En marcha", desc: "Completa 5 lecciones", rule: { k: "lessons", v: 5 } },
  { id: "constante", icon: "💪", title: "Constante", desc: "Completa 10 lecciones", rule: { k: "lessons", v: 10 } },
  { id: "imparable", icon: "🚀", title: "Imparable", desc: "Completa 20 lecciones", rule: { k: "lessons", v: 20 } },
  { id: "cimientos", icon: "🧱", title: "Cimientos", desc: "Termina una unidad completa", rule: { k: "units", v: 1 } },
  { id: "graduado", icon: "🎓", title: "Graduado gratis", desc: "Termina todas las lecciones gratis", rule: { k: "free", v: 1 } },
  { id: "racha-3", icon: "🔥", title: "Racha de 3", desc: "Aprende 3 días seguidos", rule: { k: "streak", v: 3 } },
  { id: "racha-7", icon: "📆", title: "Semana completa", desc: "Aprende 7 días seguidos", rule: { k: "streak", v: 7 } },
  { id: "racha-30", icon: "🏔️", title: "Mes de hierro", desc: "Aprende 30 días seguidos", rule: { k: "streak", v: 30 } },
  { id: "sin-errores", icon: "🎯", title: "Sin errores", desc: "Completa una lección sin fallar", rule: { k: "perfect", v: 1 } },
  { id: "precision", icon: "🏹", title: "Precisión", desc: "Completa 5 lecciones sin fallar", rule: { k: "perfect", v: 5 } },
  { id: "xp-100", icon: "⭐", title: "100 XP", desc: "Llega a 100 XP", rule: { k: "xp", v: 100 } },
  { id: "xp-500", icon: "🌟", title: "500 XP", desc: "Llega a 500 XP", rule: { k: "xp", v: 500 } },
  { id: "xp-1000", icon: "💫", title: "1,000 XP", desc: "Llega a 1,000 XP", rule: { k: "xp", v: 1000 } },
  { id: "retador", icon: "⚡", title: "Retador", desc: "Completa tu primer reto diario", rule: { k: "daily", v: 1 } },
  { id: "retador-7", icon: "🏅", title: "Retador constante", desc: "Completa 7 retos diarios", rule: { k: "daily", v: 7 } },
  { id: "te-conoces", icon: "🧠", title: "Te conoces", desc: "Haz el test de perfil de riesgo", rule: { k: "risk", v: 1 } },
  { id: "calculista", icon: "🧮", title: "Calculista", desc: "Usa una calculadora", rule: { k: "calc", v: 1 } },
  { id: "ingeniero", icon: "📐", title: "Ingeniero financiero", desc: "Usa las 3 calculadoras", rule: { k: "calc", v: 3 } },
  { id: "curioso", icon: "🔎", title: "Curioso", desc: "Abre el glosario", rule: { k: "gloss", v: 1 } },
  { id: "errores", icon: "🩹", title: "Aprendiendo de errores", desc: "Corrige 5 preguntas en Mis errores", rule: { k: "errfix", v: 5 } },
  { id: "comprador", icon: "🛍️", title: "Primera compra", desc: "Compra algo en la tienda", rule: { k: "purchases", v: 1 } },
  { id: "en-lista", icon: "💎", title: "En la lista Pro", desc: "Únete a la lista de espera Pro", rule: { k: "email", v: 1 } },
  { id: "capi-3", icon: "🐂", title: "Entrenador de Capi", desc: "Lleva a Capi al nivel 3", rule: { k: "capi", v: 3 } },
  { id: "capi-6", icon: "👑", title: "Leyenda de Capi", desc: "Lleva a Capi al nivel 6", rule: { k: "capi", v: 6 } }
];

/* ==========================================================================
   LECCIONES GRATIS — Unidades 1 a 4
   Tipos de pregunta:
     choice -> opción múltiple  { q, options[4], a (índice correcto), exp }
     tf     -> verdadero/falso  { q, a (true|false), exp }
     match  -> unir pares       { q, pairs[[término, definición],...], exp }  (definiciones distintas entre sí)
     num    -> respuesta numérica { q, a, tol?, prefix?, suffix?, exp }
     order  -> ordenar pasos    { q, items[...en el orden correcto], exp }  (la app los mezcla)
   Cada lección debe tener exactamente 5 preguntas.
   ========================================================================== */

window.COURSE = [
  /* ------------------------------ UNIDAD 1 ------------------------------ */
  {
    id: "u1",
    title: "Dinero y tiempo",
    desc: "Los cimientos: ahorro, inflación, interés compuesto, presupuesto y deudas.",
    color: "#22b45a",
    dark: "#178a43",
    lessons: [
      {
        id: "u1l1",
        title: "¿Qué es invertir?",
        icon: "🌱",
        questions: [
          {
            t: "choice",
            q: "¿Qué significa invertir?",
            options: [
              "Guardar el dinero debajo del colchón",
              "Poner tu dinero a trabajar para que crezca con el tiempo",
              "Gastar en cosas que te hacen feliz",
              "Prestar dinero sin esperar nada a cambio"
            ],
            a: 1,
            exp: "Invertir es destinar dinero a un activo con la expectativa de obtener un rendimiento en el futuro."
          },
          {
            t: "tf",
            q: "Ahorrar e invertir es exactamente lo mismo.",
            a: false,
            exp: "Ahorrar es guardar dinero con poco o ningún riesgo. Invertir implica asumir algo de riesgo a cambio de buscar más crecimiento."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Ahorrar", "Guardar dinero con poco riesgo"],
              ["Invertir", "Buscar que tu dinero crezca asumiendo riesgo"],
              ["Rendimiento", "Ganancia que genera una inversión"],
              ["Riesgo", "Posibilidad de ganar menos de lo esperado o perder"]
            ],
            exp: "Estos cuatro conceptos aparecen en todas las decisiones de inversión."
          },
          {
            t: "choice",
            q: "Tienes $1,000 que no necesitarás en 10 años. ¿Qué ventaja tiene invertirlos frente a dejarlos en efectivo?",
            options: [
              "Pueden crecer y ayudar a conservar su poder de compra",
              "Seguro duplicarán su valor",
              "No tienen ningún riesgo",
              "Así no tienes que pensar en ellos nunca más"
            ],
            a: 0,
            exp: "Invertir no garantiza ganancias, pero da la oportunidad de que el dinero crezca más que los precios."
          },
          {
            t: "choice",
            q: "¿Por qué conviene empezar a invertir temprano?",
            options: [
              "Porque hay que tener mucho dinero",
              "Porque tu dinero tiene más tiempo para crecer",
              "Porque el mercado siempre sube al principio",
              "Porque después ya no se puede"
            ],
            a: 1,
            exp: "El tiempo es el mejor aliado: aunque empieces con poco, más años significan más oportunidad de crecimiento."
          }
        ]
      },
      {
        id: "u1l2",
        title: "Inflación",
        icon: "🎈",
        questions: [
          {
            t: "choice",
            q: "¿Qué es la inflación?",
            options: [
              "La caída general de los precios",
              "El aumento general de los precios con el tiempo",
              "Un impuesto sobre el ahorro",
              "La ganancia de una inversión"
            ],
            a: 1,
            exp: "Con inflación, cada año necesitas más dinero para comprar lo mismo."
          },
          {
            t: "choice",
            q: "Si la inflación es de 5% anual y tu dinero rinde 0%, ¿qué pasa con tu poder de compra?",
            options: ["Aumenta", "Se mantiene igual", "Disminuye", "Se duplica"],
            a: 2,
            exp: "Los precios suben pero tu dinero no crece: con la misma cantidad compras cada vez menos."
          },
          {
            t: "num",
            q: "Algo cuesta $100 y los precios suben 10%. ¿Cuánto cuesta ahora?",
            a: 110,
            prefix: "$",
            exp: "100 × 1.10 = 110."
          },
          {
            t: "tf",
            q: "Si guardas efectivo, la inflación no lo afecta.",
            a: false,
            exp: "El efectivo guardado pierde poder de compra con el paso del tiempo cuando hay inflación."
          },
          {
            t: "num",
            q: "Tu inversión rinde 8% al año y la inflación es de 5%. ¿Cuál es tu rendimiento real aproximado?",
            a: 3,
            suffix: "%",
            exp: "Rendimiento real ≈ rendimiento nominal − inflación = 8% − 5% = 3%."
          }
        ]
      },
      {
        id: "u1l3",
        title: "Interés compuesto",
        icon: "❄️",
        questions: [
          {
            t: "choice",
            q: "¿Qué es el interés compuesto?",
            options: [
              "Intereses que generan más intereses",
              "Un interés que solo paga el banco",
              "Un interés que baja cada año",
              "Una comisión por invertir"
            ],
            a: 0,
            exp: "Ganas intereses sobre tu capital y también sobre los intereses acumulados."
          },
          {
            t: "num",
            q: "Inviertes $1,000 al 10% anual con interés compuesto. ¿Cuánto tendrás después de 2 años?",
            a: 1210,
            prefix: "$",
            exp: "Año 1: 1,000 × 1.10 = 1,100. Año 2: 1,100 × 1.10 = 1,210."
          },
          {
            t: "choice",
            q: "¿Qué factor potencia más el interés compuesto?",
            options: ["La suerte", "El tiempo", "Revisar el precio todos los días", "Cambiar de inversión cada mes"],
            a: 1,
            exp: "Mientras más tiempo permanece invertido el dinero, más crece el efecto de los intereses sobre intereses."
          },
          {
            t: "tf",
            q: "Con interés simple, los intereses se calculan solo sobre el capital inicial.",
            a: true,
            exp: "Esa es la diferencia con el compuesto, donde los intereses también generan intereses."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Capital", "Dinero inicial que inviertes"],
              ["Tasa", "Porcentaje de ganancia por periodo"],
              ["Plazo", "Tiempo que mantienes la inversión"],
              ["Aportación", "Dinero extra que sumas de forma periódica"]
            ],
            exp: "Capital, tasa, plazo y aportaciones son las cuatro palancas del crecimiento."
          }
        ]
      },
      {
        id: "u1l4",
        title: "Tu presupuesto",
        icon: "📒",
        questions: [
          {
            t: "choice",
            q: "¿Qué es un presupuesto?",
            options: [
              "Un plan que reparte tu ingreso entre gastos, ahorro y metas",
              "Una lista de cosas que quieres comprar algún día",
              "Un tipo de inversión de bajo riesgo",
              "Un préstamo que da el banco"
            ],
            a: 0,
            exp: "Un presupuesto te dice a dónde va tu dinero antes de que se gaste, y deja espacio para ahorrar e invertir."
          },
          {
            t: "choice",
            q: "En la regla 50/30/20, ¿a qué se destina el 20%?",
            options: [
              "A gustos y entretenimiento",
              "A necesidades básicas",
              "A ahorro y pago de deudas",
              "A impuestos"
            ],
            a: 2,
            exp: "La regla sugiere 50% para necesidades, 30% para gustos y 20% para ahorro y pago de deudas. Es una guía, no una ley."
          },
          {
            t: "match",
            q: "Une cada concepto con su significado",
            pairs: [
              ["Necesidades", "Gastos básicos como renta, comida y transporte"],
              ["Gustos", "Gastos opcionales como salidas y entretenimiento"],
              ["Ahorro", "Dinero que apartas para metas e imprevistos"],
              ["Gastos hormiga", "Compras pequeñas y frecuentes que casi no notas"]
            ],
            exp: "Los gastos hormiga parecen pequeños, pero sumados al mes pueden ser una cantidad importante."
          },
          {
            t: "tf",
            q: "“Pagarte primero” significa apartar tu ahorro apenas recibes tu ingreso, antes de gastar.",
            a: true,
            exp: "Si ahorras primero y gastas lo que sobra, es mucho más fácil cumplir tu meta."
          },
          {
            t: "order",
            q: "Ordena los pasos para armar tu presupuesto",
            items: [
              "Anota tus ingresos mensuales",
              "Registra tus gastos",
              "Clasifica necesidades, gustos y ahorro",
              "Ajusta y revisa cada mes"
            ],
            exp: "Primero sabes cuánto entra, luego a dónde se va, después lo ordenas y finalmente lo mejoras mes a mes."
          }
        ]
      },
      {
        id: "u1l5",
        title: "Deudas que cuestan",
        icon: "💳",
        questions: [
          {
            t: "choice",
            q: "¿Cuál suele ser una de las deudas más caras?",
            options: [
              "Una tarjeta de crédito que no pagas completa cada mes",
              "Una hipoteca con tasa baja",
              "Pagar tus compras de contado",
              "Un préstamo sin intereses de un familiar"
            ],
            a: 0,
            exp: "Las tarjetas de crédito suelen tener tasas muy altas cuando se arrastra saldo."
          },
          {
            t: "choice",
            q: "Si solo pagas el mínimo de tu tarjeta cada mes, ¿qué suele pasar?",
            options: [
              "Liquidas la deuda más rápido",
              "Pagas muchos intereses y tardas mucho en salir de la deuda",
              "Dejas de pagar intereses",
              "Baja tu tasa automáticamente"
            ],
            a: 1,
            exp: "El pago mínimo cubre sobre todo intereses, así que el saldo baja muy despacio."
          },
          {
            t: "num",
            q: "Debes $10,000 en una tarjeta con 3% de interés mensual. Si no pagas nada, ¿cuánto interés se suma en un mes?",
            a: 300,
            prefix: "$",
            exp: "10,000 × 0.03 = 300."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Tasa de interés", "Costo de pedir dinero prestado, en porcentaje"],
              ["CAT", "Costo total anual de un crédito, con comisiones"],
              ["Avalancha", "Pagar primero la deuda con la tasa más alta"],
              ["Bola de nieve", "Pagar primero la deuda más pequeña"]
            ],
            exp: "Compara siempre el costo total del crédito, no solo la tasa anunciada."
          },
          {
            t: "choice",
            q: "Tienes una deuda al 40% anual y una inversión que podría rendir 8% anual. ¿Qué suele convenir primero?",
            options: [
              "Invertir todo y dejar la deuda para después",
              "Pagar la deuda cara",
              "Pedir otro crédito para invertir más",
              "Ignorar los intereses"
            ],
            a: 1,
            exp: "Pagar una deuda al 40% equivale a ahorrarte un 40% seguro, algo muy difícil de lograr invirtiendo."
          }
        ]
      }
    ]
  },

  /* ------------------------------ UNIDAD 2 ------------------------------ */
  {
    id: "u2",
    title: "Tus primeras inversiones",
    desc: "Renta fija, acciones, fondos, riesgo y cómo comprar en la bolsa.",
    color: "#1d9bf0",
    dark: "#1273b4",
    lessons: [
      {
        id: "u2l1",
        title: "Renta fija",
        icon: "🏦",
        questions: [
          {
            t: "choice",
            q: "¿Qué son los CETES?",
            options: [
              "Acciones de empresas mexicanas",
              "Deuda del gobierno federal de México a corto plazo",
              "Una criptomoneda",
              "Un seguro de vida"
            ],
            a: 1,
            exp: "Los Certificados de la Tesorería (CETES) son títulos de deuda que emite el gobierno federal."
          },
          {
            t: "choice",
            q: "Cuando compras un bono, en realidad estás…",
            options: [
              "Comprando una parte de la empresa",
              "Prestando dinero a quien lo emite",
              "Pagando un seguro",
              "Apostando al tipo de cambio"
            ],
            a: 1,
            exp: "El emisor te pide prestado, te paga intereses y te devuelve el capital al vencimiento."
          },
          {
            t: "tf",
            q: "La renta fija garantiza que nunca perderás dinero.",
            a: false,
            exp: "Aunque suele ser menos volátil, tiene riesgos: que el emisor no pague, que la inflación le gane o que cambien las tasas."
          },
          {
            t: "choice",
            q: "¿Cuál suele tener menor riesgo de impago?",
            options: [
              "Un préstamo a una empresa nueva sin historial",
              "Un bono emitido por un gobierno solvente en su propia moneda",
              "Una promesa de pago de un desconocido",
              "Una criptomoneda recién lanzada"
            ],
            a: 1,
            exp: "Los gobiernos solventes que emiten en su propia moneda suelen ser vistos como los emisores de menor riesgo de crédito."
          },
          {
            t: "match",
            q: "Une cada término de los bonos con su significado",
            pairs: [
              ["Emisor", "Quien pide prestado el dinero"],
              ["Cupón", "Pago periódico de intereses"],
              ["Vencimiento", "Fecha en que se devuelve el capital"],
              ["Valor nominal", "Monto que se paga al vencimiento"]
            ],
            exp: "Con estos cuatro términos ya puedes leer la ficha de casi cualquier bono."
          }
        ]
      },
      {
        id: "u2l2",
        title: "Acciones y ETFs",
        icon: "📊",
        questions: [
          {
            t: "choice",
            q: "¿Qué es una acción?",
            options: [
              "Un préstamo a una empresa",
              "Una parte de la propiedad de una empresa",
              "Un cupón de descuento",
              "Un tipo de cuenta bancaria"
            ],
            a: 1,
            exp: "Al comprar una acción te vuelves dueño de una pequeña parte de la empresa."
          },
          {
            t: "choice",
            q: "¿Qué es un ETF?",
            options: [
              "Un fondo que cotiza en bolsa y agrupa muchos activos",
              "Un impuesto a las inversiones",
              "Una acción de una sola empresa",
              "Un tipo de préstamo bancario"
            ],
            a: 0,
            exp: "ETF significa fondo cotizado en bolsa. Con una sola compra accedes a una canasta de activos."
          },
          {
            t: "choice",
            q: "¿Cuál es la ventaja principal de un ETF que sigue a un índice amplio?",
            options: [
              "Garantiza ganancias",
              "Diversificación con una sola compra",
              "No tiene ningún riesgo",
              "Siempre es gratis"
            ],
            a: 1,
            exp: "Reparte tu dinero entre muchas empresas, lo que reduce el riesgo de depender de una sola."
          },
          {
            t: "tf",
            q: "El precio de una acción siempre sube con el tiempo.",
            a: false,
            exp: "Las acciones suben y bajan, y algunas empresas pueden quebrar. Por eso importa diversificar."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Acción", "Pedazo de propiedad de una empresa"],
              ["Dividendo", "Parte de las utilidades que se reparte"],
              ["ETF", "Canasta de activos que cotiza en bolsa"],
              ["Índice", "Medida que sigue a un grupo de acciones"]
            ],
            exp: "Son las piezas básicas del mercado de acciones."
          }
        ]
      },
      {
        id: "u2l3",
        title: "Riesgo y rendimiento",
        icon: "⚖️",
        questions: [
          {
            t: "choice",
            q: "¿Cuál es la relación general entre riesgo y rendimiento esperado?",
            options: [
              "A mayor rendimiento potencial, mayor riesgo",
              "A mayor riesgo, siempre mayor ganancia",
              "No hay ninguna relación",
              "A menor riesgo, mayor rendimiento"
            ],
            a: 0,
            exp: "Para esperar más rendimiento hay que aceptar más posibilidad de pérdida. Pero más riesgo no garantiza más ganancia."
          },
          {
            t: "tf",
            q: "Una inversión que promete rendimientos altos y garantizados debe ponerte en alerta.",
            a: true,
            exp: "Si algo promete mucho y sin riesgo, probablemente no sea real. Es una señal clásica de fraude."
          },
          {
            t: "choice",
            q: "¿Qué es la volatilidad?",
            options: [
              "Qué tanto suben y bajan los precios de un activo",
              "La comisión que cobra un broker",
              "El plazo de una inversión",
              "El dinero que tienes disponible"
            ],
            a: 0,
            exp: "Un activo muy volátil tiene cambios de precio grandes y frecuentes."
          },
          {
            t: "order",
            q: "Ordena de menor a mayor riesgo típico",
            items: [
              "Ahorro bancario",
              "Bonos de gobierno",
              "Acciones",
              "Una criptomoneda nueva"
            ],
            exp: "En general, el ahorro y la deuda del gobierno son más estables. Las acciones son más volátiles y las criptomonedas nuevas, más especulativas."
          },
          {
            t: "choice",
            q: "Un conocido te ofrece duplicar tu dinero en un mes con una inversión “segura”. ¿Qué haces?",
            options: [
              "Deposito todo lo que pueda rápido",
              "Desconfío y verifico quién lo regula",
              "Le pido que lo invierta por mí sin papeles",
              "Convenzo a mis amigos de entrar"
            ],
            a: 1,
            exp: "Verifica siempre que quien ofrece la inversión esté autorizado por la autoridad financiera de tu país."
          }
        ]
      },
      {
        id: "u2l4",
        title: "Fondos de inversión",
        icon: "🗂️",
        questions: [
          {
            t: "choice",
            q: "¿Qué es un fondo de inversión?",
            options: [
              "Un vehículo que junta el dinero de muchas personas para invertir en una canasta de activos",
              "Una cuenta de cheques con tarjeta",
              "Un préstamo entre amigos",
              "Un seguro contra pérdidas"
            ],
            a: 0,
            exp: "Al unir dinero de muchos inversionistas, el fondo puede comprar muchos activos distintos."
          },
          {
            t: "choice",
            q: "¿Qué hace un fondo de gestión activa?",
            options: [
              "Copia un índice sin cambios",
              "Un administrador elige activos buscando superar al mercado",
              "Garantiza un rendimiento fijo",
              "No cobra comisiones"
            ],
            a: 1,
            exp: "La gestión activa intenta superar al mercado, pero normalmente cobra más comisiones."
          },
          {
            t: "choice",
            q: "¿Qué busca un fondo indexado o pasivo?",
            options: [
              "Replicar el rendimiento de un índice",
              "Vender todo cuando el mercado baja",
              "Predecir la próxima crisis",
              "Invertir solo en una empresa"
            ],
            a: 0,
            exp: "Al seguir un índice, suele tener menos movimientos y costos más bajos."
          },
          {
            t: "tf",
            q: "Las comisiones de un fondo reducen el rendimiento que recibes, aunque no las veas como un cobro aparte.",
            a: true,
            exp: "Normalmente se descuentan del valor del fondo, por eso conviene comparar costos antes de elegir."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Gestión activa", "Intenta superar al mercado eligiendo activos"],
              ["Gestión pasiva", "Replica un índice con pocos cambios"],
              ["Comisión de administración", "Porcentaje anual que cobra el fondo"],
              ["Precio del fondo", "Valor al que compras o vendes una parte del fondo"]
            ],
            exp: "Con estos términos ya puedes leer la ficha de casi cualquier fondo."
          }
        ]
      },
      {
        id: "u2l5",
        title: "Bolsa y brokers",
        icon: "🖥️",
        questions: [
          {
            t: "choice",
            q: "¿Qué es un broker o casa de bolsa?",
            options: [
              "Un intermediario autorizado que te permite comprar y vender valores",
              "Una empresa que garantiza tus ganancias",
              "Un impuesto sobre la bolsa",
              "Un tipo de acción"
            ],
            a: 0,
            exp: "Es el puente entre tú y el mercado. Conviene usar solo intermediarios autorizados."
          },
          {
            t: "choice",
            q: "Una orden de compra “a mercado” se ejecuta…",
            options: [
              "Solo si el precio llega al que tú fijaste",
              "Al mejor precio disponible en ese momento",
              "Al cierre del año",
              "Siempre al precio de ayer"
            ],
            a: 1,
            exp: "La orden de mercado prioriza la rapidez: se ejecuta de inmediato al precio disponible."
          },
          {
            t: "choice",
            q: "Una orden limitada te permite…",
            options: [
              "Fijar el precio máximo al que comprarás o el mínimo al que venderás",
              "Comprar sin pagar comisión",
              "Garantizar ganancias",
              "Operar fuera del horario de la bolsa siempre"
            ],
            a: 0,
            exp: "Con una orden limitada controlas el precio, aunque puede no ejecutarse si el mercado nunca llega a él."
          },
          {
            t: "tf",
            q: "Las plataformas de inversión pueden cobrar comisiones al comprar y vender, además de otros cargos.",
            a: true,
            exp: "Antes de elegir una plataforma, revisa su tabla de comisiones y cargos."
          },
          {
            t: "order",
            q: "Ordena los pasos para tu primera compra en una plataforma regulada",
            items: [
              "Verifica que la plataforma esté autorizada",
              "Abre tu cuenta y valida tu identidad",
              "Deposita dinero que no necesitarás a corto plazo",
              "Elige el instrumento y revisa costos y riesgos",
              "Coloca la orden de compra"
            ],
            exp: "Primero la seguridad, después el dinero y al final la compra, con los costos y riesgos claros."
          }
        ]
      }
    ]
  },

  /* ------------------------------ UNIDAD 3 ------------------------------ */
  {
    id: "u3",
    title: "Dónde poner tu dinero",
    desc: "Cuentas, tasas reales, fondo de emergencia y retiro.",
    color: "#0fb5a6",
    dark: "#0b8a7e",
    lessons: [
      {
        id: "u3l1",
        title: "Cuentas y depósitos",
        icon: "🏧",
        questions: [
          {
            t: "choice",
            q: "¿Qué indica el GAT de un producto de ahorro o inversión?",
            options: [
              "El rendimiento anual total del producto",
              "El nombre del banco",
              "La cantidad mínima para abrir la cuenta",
              "La fecha de vencimiento"
            ],
            a: 0,
            exp: "El GAT (Ganancia Anual Total) te ayuda a comparar productos. Revisa también si es nominal o real."
          },
          {
            t: "tf",
            q: "Todos los lugares donde puedes guardar dinero tienen la misma protección si la entidad quiebra.",
            a: false,
            exp: "Las reglas de protección cambian según el tipo de entidad y el país. Averigua cuál aplica antes de depositar."
          },
          {
            t: "choice",
            q: "¿Para qué sirve una cuenta de ahorro con rendimiento?",
            options: [
              "Para dinero que quieres tener disponible y que gane algo mientras tanto",
              "Para invertir a 30 años en acciones",
              "Para pedir un préstamo más barato",
              "Para pagar impuestos"
            ],
            a: 0,
            exp: "Es útil para metas cercanas y fondos de emergencia, donde importa la disponibilidad."
          },
          {
            t: "choice",
            q: "Antes de elegir dónde guardar dinero que necesitarás pronto, ¿qué conviene comparar?",
            options: [
              "Solo el nombre del banco",
              "Rendimiento neto, disponibilidad y protección",
              "El color de la tarjeta",
              "La publicidad que hacen"
            ],
            a: 1,
            exp: "Un rendimiento alto no sirve si no puedes retirar tu dinero cuando lo necesitas."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Liquidez", "Qué tan rápido puedes disponer de tu dinero"],
              ["Plazo", "Tiempo que dejas el dinero invertido"],
              ["GAT", "Rendimiento anual total del producto"],
              ["Comisión", "Costo por mantener o usar la cuenta"]
            ],
            exp: "Estos términos aparecen en cualquier contrato o ficha de producto."
          }
        ]
      },
      {
        id: "u3l2",
        title: "Tasas y rendimiento real",
        icon: "🔢",
        questions: [
          {
            t: "choice",
            q: "La tasa nominal es…",
            options: [
              "La tasa anunciada, sin descontar la inflación",
              "La tasa después de impuestos y comisiones",
              "La tasa de inflación",
              "La tasa más baja del mercado"
            ],
            a: 0,
            exp: "La tasa nominal es el número que ves en la publicidad. El rendimiento real descuenta la inflación."
          },
          {
            t: "num",
            q: "Un producto rinde 11% anual y la inflación es de 4%. ¿Cuál es el rendimiento real aproximado?",
            a: 7,
            suffix: "%",
            exp: "11% − 4% = 7% aproximado."
          },
          {
            t: "tf",
            q: "Un rendimiento nominal positivo siempre significa que ganaste poder de compra.",
            a: false,
            exp: "Si la inflación es mayor que tu rendimiento, tu dinero compra menos aunque haya crecido en pesos."
          },
          {
            t: "choice",
            q: "Dos productos rinden 8% anual. Uno reinvierte los intereses cada mes y el otro paga todo al final del año. ¿Cuál termina con más dinero?",
            options: [
              "El que reinvierte cada mes",
              "El que paga al final del año",
              "Terminan exactamente igual",
              "Depende del color del contrato"
            ],
            a: 0,
            exp: "Al reinvertir antes, los intereses empiezan a generar más intereses durante el año."
          },
          {
            t: "num",
            q: "Inviertes $2,000 al 5% anual con interés simple durante 3 años. ¿Cuánto interés ganas en total?",
            a: 300,
            prefix: "$",
            exp: "2,000 × 0.05 × 3 = 300."
          }
        ]
      },
      {
        id: "u3l3",
        title: "Fondo de emergencia",
        icon: "🛟",
        questions: [
          {
            t: "choice",
            q: "¿Qué es un fondo de emergencia?",
            options: [
              "Dinero líquido para imprevistos, de unos 3 a 6 meses de gastos",
              "Una inversión en acciones",
              "Un préstamo bancario",
              "Un seguro de auto"
            ],
            a: 0,
            exp: "Evita que tengas que vender inversiones en mal momento o endeudarte cuando surge un imprevisto."
          },
          {
            t: "choice",
            q: "¿Dónde conviene guardar tu fondo de emergencia?",
            options: [
              "Donde puedas disponer de él rápido y con poco riesgo",
              "En acciones de una sola empresa",
              "En una criptomoneda reciente",
              "En un terreno"
            ],
            a: 0,
            exp: "Aquí importa la disponibilidad y la seguridad, no el máximo rendimiento."
          },
          {
            t: "num",
            q: "Tus gastos esenciales son $12,000 al mes. ¿Cuánto necesitas para cubrir 3 meses?",
            a: 36000,
            prefix: "$",
            exp: "12,000 × 3 = 36,000."
          },
          {
            t: "tf",
            q: "Usar el fondo de emergencia para unas vacaciones es un buen uso.",
            a: false,
            exp: "El fondo es para imprevistos reales, como una emergencia médica o perder un ingreso."
          },
          {
            t: "order",
            q: "Ordena tus prioridades financieras",
            items: [
              "Cubre tus gastos básicos",
              "Forma un fondo de emergencia",
              "Paga las deudas caras",
              "Invierte a largo plazo"
            ],
            exp: "Es un orden común: primero lo urgente y la protección, luego el crecimiento."
          }
        ]
      },
      {
        id: "u3l4",
        title: "Retiro y pensión",
        icon: "🏖️",
        questions: [
          {
            t: "choice",
            q: "¿Por qué conviene pensar en el retiro desde joven?",
            options: [
              "Porque el tiempo hace crecer más las aportaciones pequeñas",
              "Porque después ya no se puede ahorrar",
              "Porque el gobierno lo exige a los 20 años",
              "Porque el retiro es siempre barato"
            ],
            a: 0,
            exp: "Con décadas por delante, el interés compuesto trabaja a tu favor."
          },
          {
            t: "choice",
            q: "En México, ¿qué es una Afore?",
            options: [
              "Una administradora que gestiona tus ahorros para el retiro",
              "Un tipo de tarjeta de crédito",
              "Una acción de una empresa",
              "Un seguro de gastos médicos"
            ],
            a: 0,
            exp: "Las Afores administran tu cuenta individual de ahorro para el retiro. Revisa sus comisiones y rendimientos."
          },
          {
            t: "tf",
            q: "Las aportaciones voluntarias para el retiro pueden complementar tu pensión.",
            a: true,
            exp: "Aportar extra, aunque sea poco, puede mejorar mucho el monto con los años."
          },
          {
            t: "choice",
            q: "Si tu retiro está a 35 años, ¿qué enfoque suele ser razonable?",
            options: [
              "Todo en efectivo desde hoy",
              "Aceptar más volatilidad hoy y reducirla conforme te acercas",
              "Cambiar de estrategia cada mes",
              "No ahorrar hasta los 50"
            ],
            a: 1,
            exp: "Con mucho tiempo puedes tolerar altibajos, y vas reduciendo el riesgo a medida que se acerca la meta."
          },
          {
            t: "num",
            q: "Aportas $1,000 al mes durante 20 años, sin contar rendimientos. ¿Cuánto habrás aportado?",
            a: 240000,
            prefix: "$",
            exp: "1,000 × 12 meses × 20 años = 240,000."
          }
        ]
      }
    ]
  },

  /* ------------------------------ UNIDAD 4 ------------------------------ */
  {
    id: "u4",
    title: "Más activos para conocer",
    desc: "Inmuebles, divisas, materias primas y criptomonedas, con los pies en la tierra.",
    color: "#e04f5f",
    dark: "#b73645",
    lessons: [
      {
        id: "u4l1",
        title: "Inmuebles y FIBRAs",
        icon: "🏢",
        questions: [
          {
            t: "choice",
            q: "¿Qué es una FIBRA?",
            options: [
              "Un vehículo que cotiza en bolsa e invierte en inmuebles que generan renta",
              "Un tipo de cuenta de ahorro",
              "Un crédito hipotecario",
              "Un impuesto a las propiedades"
            ],
            a: 0,
            exp: "Las FIBRAs permiten invertir en inmuebles sin comprar un edificio completo."
          },
          {
            t: "choice",
            q: "Una ventaja de una FIBRA frente a comprar un inmueble completo es…",
            options: [
              "Puedes empezar con montos menores y vender con más facilidad",
              "Siempre rinde más",
              "No tiene ningún riesgo",
              "No paga ningún impuesto"
            ],
            a: 0,
            exp: "Al cotizar en bolsa, es más fácil entrar y salir que con un inmueble físico, aunque su precio también cambia."
          },
          {
            t: "tf",
            q: "Los inmuebles siempre suben de valor.",
            a: false,
            exp: "Pueden subir, bajar o quedarse igual según la zona, la economía y las tasas de interés."
          },
          {
            t: "order",
            q: "Ordena de más líquido a menos líquido",
            items: [
              "Efectivo",
              "Acciones que cotizan en bolsa",
              "Un inmueble físico"
            ],
            exp: "El efectivo está disponible al instante. Vender una acción toma pocos días y un inmueble puede tardar meses."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Renta", "Ingreso periódico que genera un inmueble arrendado"],
              ["Plusvalía", "Aumento del valor de un inmueble con el tiempo"],
              ["Hipoteca", "Crédito para comprar un inmueble, garantizado por él"],
              ["FIBRA", "Inversión en inmuebles que cotiza en bolsa"]
            ],
            exp: "La rentabilidad de un inmueble viene de la renta y de la plusvalía."
          }
        ]
      },
      {
        id: "u4l2",
        title: "Divisas y tipo de cambio",
        icon: "💱",
        questions: [
          {
            t: "choice",
            q: "¿Qué es el tipo de cambio?",
            options: [
              "El precio de una moneda expresado en otra",
              "La comisión de un banco",
              "La tasa de inflación",
              "El interés de un préstamo"
            ],
            a: 0,
            exp: "Por ejemplo, cuántos pesos necesitas para comprar un dólar."
          },
          {
            t: "choice",
            q: "Si el dólar sube frente al peso, ¿qué pasa con lo que compras en dólares?",
            options: [
              "Te cuesta más pesos",
              "Te cuesta menos pesos",
              "Cuesta exactamente lo mismo",
              "Deja de existir"
            ],
            a: 0,
            exp: "Necesitas más pesos por cada dólar que compras."
          },
          {
            t: "tf",
            q: "Invertir en activos de otra moneda agrega riesgo cambiario.",
            a: true,
            exp: "Aunque el activo suba, el tipo de cambio puede mover tu resultado a favor o en contra."
          },
          {
            t: "choice",
            q: "Que una moneda se deprecie significa que…",
            options: [
              "Pierde valor frente a otra moneda",
              "Gana valor frente a otra moneda",
              "Deja de usarse",
              "Se imprime con otro color"
            ],
            a: 0,
            exp: "Con una moneda depreciada, importar y viajar suelen costar más."
          },
          {
            t: "num",
            q: "Si 1 dólar equivale a 18 pesos, ¿cuántos pesos necesitas para comprar 50 dólares?",
            a: 900,
            prefix: "$",
            exp: "50 × 18 = 900. (Cifras de ejemplo.)"
          }
        ]
      },
      {
        id: "u4l3",
        title: "Oro y materias primas",
        icon: "🥇",
        questions: [
          {
            t: "choice",
            q: "¿Qué son las materias primas (commodities)?",
            options: [
              "Bienes básicos como petróleo, oro o granos que se compran y venden",
              "Acciones de empresas pequeñas",
              "Préstamos entre bancos",
              "Productos de lujo"
            ],
            a: 0,
            exp: "Son insumos básicos de la economía, y su precio se mueve por oferta y demanda."
          },
          {
            t: "choice",
            q: "¿Por qué el oro suele llamarse activo “refugio”?",
            options: [
              "Muchos inversionistas lo buscan en momentos de incertidumbre",
              "Porque su precio nunca baja",
              "Porque paga altos dividendos",
              "Porque lo respalda el gobierno"
            ],
            a: 0,
            exp: "Es una fama histórica: aun así, su precio sube y baja y no hay garantías."
          },
          {
            t: "tf",
            q: "El oro, por sí solo, no genera intereses ni dividendos.",
            a: true,
            exp: "Su ganancia depende de que su precio suba."
          },
          {
            t: "choice",
            q: "Los precios de las materias primas suelen ser…",
            options: [
              "Volátiles, porque dependen de oferta, demanda, clima y política",
              "Fijos durante todo el año",
              "Iguales en todo el mundo siempre",
              "Decididos por cada inversionista"
            ],
            a: 0,
            exp: "Una sequía o un conflicto pueden mover el precio de forma brusca."
          },
          {
            t: "match",
            q: "Une cada materia prima con su descripción",
            pairs: [
              ["Petróleo", "Materia prima energética"],
              ["Oro", "Metal que muchos ven como refugio"],
              ["Maíz", "Grano agrícola"],
              ["ETF de materias primas", "Fondo cotizado que sigue su precio"]
            ],
            exp: "Un ETF permite exponerte a materias primas sin guardarlas físicamente."
          }
        ]
      },
      {
        id: "u4l4",
        title: "Cripto con cautela",
        icon: "🔐",
        questions: [
          {
            t: "choice",
            q: "¿Qué es una criptomoneda?",
            options: [
              "Un activo digital que usa criptografía y redes descentralizadas",
              "Una moneda respaldada por un banco central",
              "Una acción de tecnología",
              "Un bono del gobierno"
            ],
            a: 0,
            exp: "Funcionan en redes digitales y, en general, no las respalda un banco central."
          },
          {
            t: "choice",
            q: "¿Cómo se considera normalmente el riesgo de las criptomonedas?",
            options: [
              "Alto: sus precios pueden cambiar muchísimo en poco tiempo",
              "Nulo: siempre suben",
              "Bajo, como el ahorro",
              "Igual que los CETES"
            ],
            a: 0,
            exp: "Su volatilidad es muy alta y pueden perder gran parte de su valor."
          },
          {
            t: "tf",
            q: "Una criptomoneda que promete ganancias garantizadas es una señal de alerta.",
            a: true,
            exp: "Nadie puede garantizar rendimientos en activos tan volátiles."
          },
          {
            t: "choice",
            q: "Si decides explorar cripto, ¿qué enfoque es más prudente?",
            options: [
              "Destinar solo dinero que puedas perder y nunca pedir prestado",
              "Invertir tus ahorros de emergencia",
              "Pedir un crédito para comprar más",
              "Seguir a quien prometa duplicar tu dinero"
            ],
            a: 0,
            exp: "Si la inversión sale mal, no debería poner en riesgo tu estabilidad."
          },
          {
            t: "choice",
            q: "Al usar plataformas de cripto, ¿qué debes proteger con más cuidado?",
            options: [
              "Tus contraseñas y claves de acceso",
              "Tu color favorito",
              "El nombre de tu mascota",
              "Tu foto de perfil"
            ],
            a: 0,
            exp: "Si alguien obtiene tus claves, puede mover tus fondos y es difícil recuperarlos."
          }
        ]
      }
    ]
  }
];

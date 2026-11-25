/* ==========================================================================
   LECCIONES SOLO PRO — 2 por unidad (16 en total)
   Mismo formato que lecciones-gratis.js. Cada lección se agrega al FINAL de su
   unidad y queda marcada como Pro (pro: true): en la ruta aparece con candado y
   borde morado, y al tocarla se abre la puerta Pro con captura de correo.
   Para agregar otra: añádela al arreglo de su unidad (u1…u8) con un id nuevo.
   Cada lección debe tener exactamente 5 preguntas.
   ========================================================================== */
(function () {
  "use strict";

  var PRO = {
    /* ------------------------------ UNIDAD 1 ------------------------------ */
    u1: [
      {
        id: "u1l6",
        title: "Regla del 72",
        icon: "⏱️",
        questions: [
          {
            t: "choice",
            q: "¿Para qué sirve la regla del 72?",
            options: [
              "Para estimar cuántos años tarda en duplicarse tu dinero",
              "Para calcular cuántos impuestos pagarás",
              "Para saber cuántos meses tiene un plazo",
              "Para elegir la mejor acción del año"
            ],
            a: 0,
            exp: "Divides 72 entre la tasa anual (en %) y obtienes los años aproximados que tarda en duplicarse una inversión con interés compuesto."
          },
          {
            t: "num",
            q: "Tu inversión rinde 8% anual con interés compuesto. Según la regla del 72, ¿en cuántos años se duplica?",
            a: 9,
            suffix: "años",
            exp: "72 ÷ 8 = 9 años."
          },
          {
            t: "num",
            q: "Si la inflación es de 4% anual, ¿en cuántos años se duplican aproximadamente los precios?",
            a: 18,
            suffix: "años",
            exp: "72 ÷ 4 = 18. La regla también funciona con la inflación: tu dinero parado compra la mitad en unos 18 años."
          },
          {
            t: "tf",
            q: "La regla del 72 da un resultado aproximado, no exacto.",
            a: true,
            exp: "Es un atajo mental muy útil, pero el cálculo exacto da una cifra ligeramente distinta."
          },
          {
            t: "choice",
            q: "Quieres que tu dinero se duplique en 10 años. ¿Qué rendimiento anual necesitas, aproximadamente?",
            options: ["3.6%", "5%", "7.2%", "10%"],
            a: 2,
            exp: "72 ÷ 10 = 7.2%. Es una forma rápida de saber si una meta es realista."
          }
        ]
      },
      {
        id: "u1l7",
        title: "Valor del dinero en el tiempo",
        icon: "⏳",
        questions: [
          {
            t: "choice",
            q: "¿Qué significa que el dinero tiene valor en el tiempo?",
            options: [
              "El dinero siempre vale lo mismo, sin importar cuándo lo recibas",
              "Una cantidad hoy vale más que la misma cantidad en el futuro",
              "Los billetes antiguos valen más",
              "Solo importa el valor de la moneda"
            ],
            a: 1,
            exp: "Si recibes dinero hoy puedes invertirlo o usarlo antes, y además la inflación le quita poder de compra a lo que llega después."
          },
          {
            t: "num",
            q: "Tienes $1,000 hoy y los inviertes al 10% anual. ¿Cuánto tendrás dentro de 1 año?",
            a: 1100,
            prefix: "$",
            exp: "1,000 × 1.10 = 1,100. A esto se le llama valor futuro."
          },
          {
            t: "num",
            q: "Te prometen $1,100 dentro de un año y la tasa es de 10% anual. ¿Cuánto vale ese pago hoy (valor presente)?",
            a: 1000,
            prefix: "$",
            exp: "1,100 ÷ 1.10 = 1,000. Es el camino inverso: traer al presente un dinero que llegará después."
          },
          {
            t: "choice",
            q: "¿Qué conviene más: recibir $10,000 hoy o $10,000 dentro de 3 años?",
            options: [
              "Hoy, porque puedo invertirlos y en 3 años tendría más",
              "En 3 años, porque es más seguro",
              "Es exactamente igual",
              "Depende del color del billete"
            ],
            a: 0,
            exp: "La misma cantidad vale más hoy porque tienes tiempo de hacerla crecer."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Valor presente", "Cuánto vale hoy un dinero que recibirás más adelante"],
              ["Valor futuro", "Cuánto tendrás más adelante por lo que inviertes hoy"],
              ["Tasa de descuento", "Tasa que se usa para traer un pago futuro al presente"],
              ["Plazo", "Tiempo entre hoy y el momento del pago"]
            ],
            exp: "Con estos cuatro conceptos puedes comparar dinero de momentos distintos."
          }
        ]
      }
    ],

    /* ------------------------------ UNIDAD 2 ------------------------------ */
    u2: [
      {
        id: "u2l6",
        title: "Bonos y tasas de interés",
        icon: "📉",
        questions: [
          {
            t: "choice",
            q: "Si las tasas de interés suben, ¿qué suele pasar con el precio de un bono ya emitido con tasa fija?",
            options: ["Sube", "Baja", "Se mantiene siempre igual", "Se vuelve cero"],
            a: 1,
            exp: "Los bonos nuevos pagan más, así que el bono viejo, que paga menos, vale menos si quieres venderlo antes del vencimiento."
          },
          {
            t: "tf",
            q: "Los bonos con vencimientos más largos suelen ser más sensibles a los cambios en las tasas.",
            a: true,
            exp: "Mientras más tiempo falta para cobrar, más pesa un cambio en las tasas sobre el precio del bono."
          },
          {
            t: "num",
            q: "Un bono con valor nominal de $1,000 paga un cupón de 5% anual. ¿Cuántos pesos recibes de cupón en un año?",
            a: 50,
            prefix: "$",
            exp: "1,000 × 0.05 = 50."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Tasa fija", "Paga el mismo interés durante toda la vida del bono"],
              ["Tasa variable", "El interés cambia según una tasa de referencia"],
              ["Rendimiento al vencimiento", "Rendimiento total esperado si lo conservas hasta el final"],
              ["Riesgo de crédito", "Posibilidad de que el emisor no pague"]
            ],
            exp: "Estos conceptos explican por qué dos bonos con el mismo plazo pueden rendir distinto."
          },
          {
            t: "choice",
            q: "Compraste un bono a tasa fija y lo conservarás hasta el vencimiento. Si las tasas suben, ¿qué pasa con lo que cobrarás?",
            options: [
              "Los cupones suben solos",
              "Pierdes tu capital seguro",
              "El bono se cancela",
              "Cobras los cupones prometidos y el valor nominal, si el emisor paga"
            ],
            a: 3,
            exp: "El precio de mercado puede bajar, pero si lo conservas hasta el final recibes lo pactado, siempre que el emisor cumpla."
          }
        ]
      },
      {
        id: "u2l7",
        title: "Cómo leer un ETF",
        icon: "🔬",
        questions: [
          {
            t: "choice",
            q: "¿Qué es la razón de gastos (comisión anual) de un ETF?",
            options: [
              "Un pago único al comprarlo",
              "El porcentaje anual del dinero invertido que se cobra por administrarlo",
              "La ganancia que promete el ETF",
              "Un impuesto sobre los dividendos"
            ],
            a: 1,
            exp: "Se descuenta poco a poco del valor del ETF, así que no la ves como un cobro aparte."
          },
          {
            t: "num",
            q: "Un ETF cobra 0.2% anual y tienes $50,000 invertidos. ¿Cuánto pagas al año en comisión?",
            a: 100,
            prefix: "$",
            exp: "50,000 × 0.002 = 100."
          },
          {
            t: "choice",
            q: "¿Qué es el error de seguimiento (tracking error)?",
            options: [
              "La diferencia entre el rendimiento del ETF y el del índice que busca replicar",
              "Un error al colocar una orden",
              "La comisión del broker",
              "El precio máximo del ETF en el año"
            ],
            a: 0,
            exp: "Un error de seguimiento pequeño indica que el ETF replica bien a su índice."
          },
          {
            t: "tf",
            q: "Dos ETF que siguen el mismo índice pueden dar resultados ligeramente distintos por sus costos.",
            a: true,
            exp: "Aunque sigan el mismo índice, la comisión y la forma de replicarlo hacen que difieran un poco."
          },
          {
            t: "order",
            q: "Ordena los pasos para analizar un ETF antes de comprarlo",
            items: [
              "Identifica qué índice sigue",
              "Revisa qué activos y países contiene",
              "Compara su comisión anual con la de otros ETF similares",
              "Decide si encaja con tu plan y tu horizonte"
            ],
            exp: "Primero entiendes qué compras, luego lo comparas y al final decides según tu plan."
          }
        ]
      }
    ],

    /* ------------------------------ UNIDAD 3 ------------------------------ */
    u3: [
      {
        id: "u3l5",
        title: "Escalera de inversión",
        icon: "🪜",
        questions: [
          {
            t: "choice",
            q: "¿En qué consiste una escalera de inversión?",
            options: [
              "Poner todo el dinero en una sola fecha de vencimiento",
              "Cambiar de instrumento cada semana",
              "Repartir tu dinero en instrumentos con vencimientos escalonados",
              "Invertir solo en acciones"
            ],
            a: 2,
            exp: "Por ejemplo, partes tu dinero en plazos de 28 días, 6 meses, 1 año y 2 años."
          },
          {
            t: "num",
            q: "Divides $12,000 en partes iguales para 4 vencimientos distintos. ¿Cuánto va en cada uno?",
            a: 3000,
            prefix: "$",
            exp: "12,000 ÷ 4 = 3,000."
          },
          {
            t: "choice",
            q: "¿Qué ventaja da una escalera de inversión?",
            options: [
              "Tienes dinero que vence con regularidad y no dependes de una sola fecha ni de una sola tasa",
              "Garantiza la tasa más alta del mercado",
              "Elimina cualquier riesgo",
              "Evita pagar impuestos"
            ],
            a: 0,
            exp: "Cada vez que vence un tramo puedes usarlo o reinvertirlo, según lo que necesites en ese momento."
          },
          {
            t: "tf",
            q: "Una escalera de inversión garantiza que siempre obtendrás la tasa más alta del mercado.",
            a: false,
            exp: "Reparte el riesgo de tasas y de liquidez, pero no promete la mejor tasa en cada momento."
          },
          {
            t: "order",
            q: "Ordena de vencimiento más corto a más largo",
            items: [
              "Un instrumento a 28 días",
              "Uno a 6 meses",
              "Uno a 2 años",
              "Uno a 10 años"
            ],
            exp: "Los vencimientos cortos dan más liquidez; los largos suelen pagar más pero te atan por más tiempo."
          }
        ]
      },
      {
        id: "u3l6",
        title: "Rendimiento real neto",
        icon: "🧮",
        questions: [
          {
            t: "choice",
            q: "¿Qué debes descontar al rendimiento anunciado para saber cuánto crece realmente tu poder de compra?",
            options: [
              "Solo la inflación",
              "Solo las comisiones",
              "Nada, el número anunciado es el real",
              "Comisiones, impuestos e inflación"
            ],
            a: 3,
            exp: "El rendimiento real neto es lo que te queda después de costos, impuestos y aumento de precios."
          },
          {
            t: "num",
            q: "Tu inversión rinde 10%, las comisiones e impuestos restan 1 punto y la inflación es de 4%. ¿Cuál es tu rendimiento real neto aproximado?",
            a: 5,
            suffix: "%",
            exp: "10% − 1% − 4% = 5% aproximado."
          },
          {
            t: "num",
            q: "Un producto paga 6% y la inflación es de 7%. ¿Cuál es el rendimiento real aproximado? (Si es negativo, escribe el signo menos.)",
            a: -1,
            suffix: "%",
            exp: "6% − 7% = −1%. Aunque ganaste pesos, tu dinero compra un poco menos."
          },
          {
            t: "tf",
            q: "Un producto que anuncia 6% siempre te deja más que uno que anuncia 4%.",
            a: false,
            exp: "Después de comisiones e impuestos el resultado puede cambiar. Compara siempre el rendimiento neto."
          },
          {
            t: "choice",
            q: "Dos productos anuncian 8%. Uno cobra 2% de comisión anual y el otro 0.5%. ¿Cuál te deja más, en igualdad de condiciones?",
            options: [
              "El de 2% de comisión",
              "El de 0.5% de comisión",
              "Los dos igual",
              "No se puede saber nunca"
            ],
            a: 1,
            exp: "Menos comisión significa más rendimiento neto para ti: 7.5% frente a 6%."
          }
        ]
      }
    ],

    /* ------------------------------ UNIDAD 4 ------------------------------ */
    u4: [
      {
        id: "u4l5",
        title: "Invertir en otras monedas",
        icon: "🌍",
        questions: [
          {
            t: "choice",
            q: "¿Qué es el riesgo cambiario?",
            options: [
              "Que cambie la tasa de interés de un bono",
              "Que el tipo de cambio se mueva en contra y cambie lo que recibes en tu moneda",
              "Que una empresa deje de pagar dividendos",
              "Que suba la inflación"
            ],
            a: 1,
            exp: "Si inviertes en otra moneda, el tipo de cambio puede sumar o restar a tu resultado final."
          },
          {
            t: "num",
            q: "Tienes 100 dólares y 1 dólar vale 18 pesos. Si el dólar sube a 20 pesos, ¿cuántos pesos valen tus 100 dólares?",
            a: 2000,
            prefix: "$",
            exp: "100 × 20 = 2,000 pesos (antes eran 1,800). Si el dólar bajara, ocurriría lo contrario."
          },
          {
            t: "tf",
            q: "Si el dólar baja frente al peso, una inversión en dólares vale menos pesos aunque su precio en dólares no cambie.",
            a: true,
            exp: "Tu inversión sigue valiendo lo mismo en dólares, pero cada dólar compra menos pesos."
          },
          {
            t: "choice",
            q: "¿Por qué algunas personas invierten en activos de otros países?",
            options: [
              "Porque está garantizado que rinden más",
              "Para diversificar y no depender solo de la economía de un país",
              "Porque no pagan comisiones",
              "Porque no tienen riesgo"
            ],
            a: 1,
            exp: "Repartir tu dinero entre varias economías puede reducir el riesgo, aunque agrega el riesgo cambiario."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Apreciación", "Una moneda gana valor frente a otra"],
              ["Depreciación", "Una moneda pierde valor frente a otra"],
              ["Cobertura cambiaria", "Estrategia para reducir el efecto del tipo de cambio"],
              ["Diversificación geográfica", "Repartir inversiones entre varios países"]
            ],
            exp: "Son los conceptos básicos para entender cómo influye el tipo de cambio en tu portafolio."
          }
        ]
      },
      {
        id: "u4l6",
        title: "Cuánto rinde un inmueble",
        icon: "🏘️",
        questions: [
          {
            t: "choice",
            q: "¿Cómo se calcula el rendimiento bruto por renta de un inmueble?",
            options: [
              "Precio entre renta anual",
              "Renta anual entre el precio del inmueble",
              "Renta mensual por el precio",
              "Precio menos el enganche"
            ],
            a: 1,
            exp: "Se llama “bruto” porque todavía no restas los gastos del inmueble."
          },
          {
            t: "num",
            q: "Un departamento cuesta $1,000,000 y se renta en $8,000 al mes. ¿Qué rendimiento bruto anual por renta tiene?",
            a: 9.6,
            suffix: "%",
            exp: "8,000 × 12 = 96,000 al año. 96,000 ÷ 1,000,000 = 0.096, es decir, 9.6%."
          },
          {
            t: "choice",
            q: "¿Qué gastos reducen lo que realmente te queda de un inmueble en renta?",
            options: [
              "Ninguno, la renta es ganancia pura",
              "Solo el color de las paredes",
              "Mantenimiento, predial, seguros y meses sin inquilino",
              "Únicamente la comisión del banco"
            ],
            a: 2,
            exp: "Estos costos bajan el rendimiento neto, que es el que realmente cuenta."
          },
          {
            t: "tf",
            q: "El rendimiento bruto por renta ya incluye todos los gastos del inmueble.",
            a: false,
            exp: "Por eso el rendimiento neto casi siempre es menor que el bruto."
          },
          {
            t: "order",
            q: "Ordena los pasos para evaluar un inmueble que comprarías para rentar",
            items: [
              "Calcula la renta anual esperada",
              "Resta mantenimiento, impuestos y meses vacíos",
              "Divide lo que te queda entre el precio",
              "Compara el resultado con otras alternativas"
            ],
            exp: "Así obtienes un rendimiento neto que sí puedes comparar con otras inversiones."
          }
        ]
      }
    ],

    /* ------------------------------ UNIDAD 5 ------------------------------ */
    u5: [
      {
        id: "u5l5",
        title: "Correlación",
        icon: "🔗",
        questions: [
          {
            t: "choice",
            q: "¿Qué mide la correlación entre dos activos?",
            options: [
              "Cuál de los dos es más caro",
              "Qué tan parecido es el movimiento de sus precios",
              "Cuánta comisión cobran",
              "Cuántos años llevan en el mercado"
            ],
            a: 1,
            exp: "Va de −1 a +1 e indica si los activos suelen subir y bajar juntos o no."
          },
          {
            t: "choice",
            q: "Para diversificar mejor, ¿qué combinación suele ayudar más?",
            options: [
              "Activos que se mueven siempre igual",
              "Cinco acciones de la misma empresa",
              "Activos que no siempre se mueven en la misma dirección",
              "Solo activos muy volátiles"
            ],
            a: 2,
            exp: "Cuando uno cae, el otro puede sostenerse, y tu portafolio se mueve con menos sobresaltos."
          },
          {
            t: "tf",
            q: "Dos acciones del mismo sector suelen estar más correlacionadas que una acción y un bono de gobierno.",
            a: true,
            exp: "Las empresas de un mismo sector enfrentan condiciones parecidas, así que tienden a moverse juntas."
          },
          {
            t: "match",
            q: "Une cada valor de correlación con su significado",
            pairs: [
              ["+1", "Se mueven siempre juntos y en la misma dirección"],
              ["0", "No hay relación clara entre sus movimientos"],
              ["−1", "Se mueven en direcciones opuestas"],
              ["Diversificar", "Combinar activos para reducir el riesgo del conjunto"]
            ],
            exp: "En la práctica casi nunca es exactamente +1, 0 o −1, pero sirven de referencia."
          },
          {
            t: "choice",
            q: "En una crisis fuerte, ¿qué suele pasar con la correlación entre muchos activos de riesgo?",
            options: [
              "Siempre baja a cero",
              "Desaparece",
              "Puede aumentar: caen juntos y la diversificación protege menos de lo esperado",
              "Se vuelve negativa en todos"
            ],
            a: 2,
            exp: "Por eso conviene incluir activos de naturaleza distinta, como renta fija y efectivo, y no solo muchas acciones."
          }
        ]
      },
      {
        id: "u5l6",
        title: "Portafolios de ejemplo",
        icon: "🥧",
        questions: [
          {
            t: "choice",
            q: "¿Cuál es un portafolio de ejemplo más conservador?",
            options: [
              "100% en una sola acción",
              "90% en criptomonedas y 10% en efectivo",
              "80% en acciones de tecnología y 20% en criptomonedas",
              "70% en renta fija, 20% en acciones y 10% en efectivo"
            ],
            a: 3,
            exp: "Un perfil conservador pone el peso en activos más estables, aunque su crecimiento esperado sea menor."
          },
          {
            t: "num",
            q: "Una regla práctica sugiere restar tu edad a 100 para estimar el porcentaje en acciones. Si tienes 30 años, ¿qué porcentaje sería?",
            a: 70,
            suffix: "%",
            exp: "100 − 30 = 70%. Es solo un punto de partida, no una recomendación personal."
          },
          {
            t: "tf",
            q: "Una regla práctica como “100 menos tu edad” sirve como punto de partida, no como recomendación personalizada.",
            a: true,
            exp: "Tu mezcla ideal también depende de tus metas, tu plazo, tus ingresos y tu tolerancia a las caídas."
          },
          {
            t: "choice",
            q: "Tu meta está a 2 años. ¿Qué mezcla suele tener más sentido?",
            options: [
              "Más renta fija y liquidez",
              "Todo en acciones de una sola empresa",
              "Todo en criptomonedas",
              "Pedir prestado para invertir más"
            ],
            a: 0,
            exp: "Con plazos cortos, una caída fuerte puede no darte tiempo de recuperarte."
          },
          {
            t: "order",
            q: "Ordena estos portafolios de menor a mayor porcentaje típico en acciones",
            items: [
              "Conservador",
              "Moderado",
              "De crecimiento",
              "Muy agresivo"
            ],
            exp: "A más porcentaje en acciones, más potencial de crecimiento y también más volatilidad."
          }
        ]
      }
    ],

    /* ------------------------------ UNIDAD 6 ------------------------------ */
    u6: [
      {
        id: "u6l5",
        title: "El peso de las comisiones",
        icon: "⚖️",
        questions: [
          {
            t: "num",
            q: "Pagas 1% de comisión anual sobre $200,000. ¿Cuánto pagas en un año?",
            a: 2000,
            prefix: "$",
            exp: "200,000 × 0.01 = 2,000, y se cobra año tras año."
          },
          {
            t: "choice",
            q: "¿Por qué una comisión de 1% anual pesa más a largo plazo de lo que parece?",
            options: [
              "Porque se cobra solo una vez",
              "Porque solo se cobra cuando ganas",
              "Porque la paga el gobierno",
              "Porque se cobra cada año sobre todo tu saldo y le resta crecimiento compuesto"
            ],
            a: 3,
            exp: "Lo que se va en comisiones ya no genera rendimientos en los años siguientes."
          },
          {
            t: "tf",
            q: "Las comisiones de administración se cobran solo cuando el fondo gana.",
            a: false,
            exp: "Normalmente se cobran aunque el fondo pierda. Revísalo en la ficha del producto."
          },
          {
            t: "choice",
            q: "Dos fondos rinden igual antes de costos. Uno cobra 0.3% y otro 1.8% al año. ¿Cuál te deja más?",
            options: [
              "El de 1.8%, porque cobra más",
              "El de 0.3%",
              "Los dos igual",
              "Ninguno"
            ],
            a: 1,
            exp: "Con el mismo rendimiento antes de costos, quien cobra menos te deja más dinero."
          },
          {
            t: "match",
            q: "Une cada costo con su significado",
            pairs: [
              ["Comisión de administración", "Porcentaje anual sobre tu saldo"],
              ["Comisión por operar", "Cobro cada vez que compras o vendes"],
              ["Cuota de custodia", "Cobro por mantener tus valores guardados en la plataforma"],
              ["Costo total", "Suma de todas las comisiones y gastos que pagas"]
            ],
            exp: "Antes de elegir un producto, suma todos los costos y no te quedes solo con el más visible."
          }
        ]
      },
      {
        id: "u6l6",
        title: "Costo promedio",
        icon: "📊",
        questions: [
          {
            t: "choice",
            q: "¿Qué es el costo promedio de compra?",
            options: [
              "El precio más bajo que viste en el año",
              "El precio al que quieres vender",
              "El precio promedio al que compraste todos tus títulos",
              "La comisión del broker"
            ],
            a: 2,
            exp: "Se calcula dividiendo todo lo que invertiste entre el total de títulos que compraste."
          },
          {
            t: "num",
            q: "Compras $1,000 cuando el título cuesta $10 (100 títulos) y otros $1,000 cuando cuesta $40 (25 títulos). ¿Cuál es tu costo promedio por título?",
            a: 16,
            prefix: "$",
            exp: "Invertiste 2,000 y compraste 125 títulos. 2,000 ÷ 125 = 16."
          },
          {
            t: "choice",
            q: "En ese ejemplo el promedio simple de los dos precios sería $25. ¿Por qué tu costo promedio fue menor?",
            options: [
              "Porque con el precio bajo compraste más títulos",
              "Porque el broker te hizo un descuento",
              "Porque el precio nunca cambió",
              "Porque compraste en domingo"
            ],
            a: 0,
            exp: "Invertir el mismo monto compra más títulos cuando están baratos, y eso baja tu costo promedio."
          },
          {
            t: "tf",
            q: "Con aportaciones periódicas, comprar más títulos cuando el precio baja ayuda a reducir tu costo promedio.",
            a: true,
            exp: "Por eso el método periódico reduce la presión de adivinar el mejor momento."
          },
          {
            t: "num",
            q: "Inviertes $600 cuando el título cuesta $3 y otros $600 cuando cuesta $12. ¿Cuántos títulos compraste en total?",
            a: 250,
            exp: "600 ÷ 3 = 200 títulos y 600 ÷ 12 = 50 títulos. En total, 250."
          }
        ]
      }
    ],

    /* ------------------------------ UNIDAD 7 ------------------------------ */
    u7: [
      {
        id: "u7l5",
        title: "Reglas contra el pánico",
        icon: "📜",
        questions: [
          {
            t: "choice",
            q: "¿Qué es una regla de “enfriamiento” antes de invertir?",
            options: [
              "Comprar lo más rápido posible",
              "Esperar un tiempo definido, por ejemplo 24 horas, antes de una decisión impulsiva",
              "Guardar el dinero en un refrigerador",
              "Vender cuando el mercado baja"
            ],
            a: 1,
            exp: "La pausa le da tiempo a la emoción de bajar y a tu criterio de volver."
          },
          {
            t: "choice",
            q: "¿Qué ayuda a no vender por pánico durante una caída?",
            options: [
              "Revisar el precio cada minuto",
              "Seguir a quien grita más en redes",
              "Tener por escrito tu plan y por qué invertiste",
              "Decidir según cómo amaneciste"
            ],
            a: 2,
            exp: "Releer tu plan te recuerda tu meta y tu plazo justo cuando la emoción empuja en sentido contrario."
          },
          {
            t: "tf",
            q: "Las decisiones tomadas con mucha emoción suelen ser mejores que las decisiones planeadas.",
            a: false,
            exp: "El miedo y la euforia empujan a comprar caro y vender barato. Un plan ayuda a evitarlo."
          },
          {
            t: "order",
            q: "Ordena qué hacer cuando tu portafolio cae con fuerza",
            items: [
              "Respira y no actúes de inmediato",
              "Revisa tu plan, tu meta y tu plazo",
              "Verifica si cambió tu situación personal",
              "Decide con calma si necesitas ajustar algo"
            ],
            exp: "Primero calmas la reacción y después decides con información, no con susto."
          },
          {
            t: "match",
            q: "Une cada herramienta con su función",
            pairs: [
              ["Plan de inversión", "Documento con metas, plazo y reglas para decidir"],
              ["Regla de enfriamiento", "Pausa antes de decidir algo impulsivo"],
              ["Límite de revisión", "Mirar tu portafolio solo con cierta frecuencia"],
              ["Aportación automática", "Inversión programada que no depende de tu ánimo"]
            ],
            exp: "Son hábitos que protegen tus decisiones de tus emociones."
          }
        ]
      },
      {
        id: "u7l6",
        title: "Fraudes en redes y apps",
        icon: "📱",
        questions: [
          {
            t: "choice",
            q: "Un video muestra a un famoso recomendando una plataforma que duplica tu dinero. ¿Qué haces?",
            options: [
              "Deposito rápido antes de que se acabe",
              "Lo comparto con mis amigos",
              "Desconfío: puede ser un anuncio falso o un video manipulado, y verifico que la plataforma esté autorizada",
              "Pido un préstamo para invertir más"
            ],
            a: 2,
            exp: "Los fraudes usan rostros conocidos, incluso videos alterados, para generar confianza."
          },
          {
            t: "tf",
            q: "Un grupo de mensajería que envía “señales” con ganancias garantizadas es una fuente confiable.",
            a: false,
            exp: "Nadie puede garantizar ganancias. Estos grupos suelen ser un gancho para estafas o esquemas de pump and dump."
          },
          {
            t: "choice",
            q: "¿Dónde conviene verificar si una entidad financiera está autorizada en México?",
            options: [
              "En los comentarios de sus videos",
              "Preguntándole a la misma plataforma",
              "Viendo cuántos seguidores tiene",
              "En los registros oficiales de la CNBV y de la Condusef"
            ],
            a: 3,
            exp: "Las autoridades financieras publican registros de las entidades autorizadas. Revísalos antes de depositar dinero."
          },
          {
            t: "match",
            q: "Une cada táctica de fraude con su descripción",
            pairs: [
              ["Suplantación", "Hacerse pasar por una entidad o persona real"],
              ["Urgencia falsa", "Presionarte para decidir sin pensar"],
              ["Retiro bloqueado", "Pedirte pagos extra para dejarte sacar tu dinero"],
              ["Ganancia garantizada", "Prometer rendimientos seguros y altos"]
            ],
            exp: "Si ves una de estas señales, detente y verifica por tu cuenta."
          },
          {
            t: "choice",
            q: "Te escriben y te piden tu contraseña o un código de verificación para “activar” tu inversión. ¿Qué haces?",
            options: [
              "Los comparto, es un trámite normal",
              "No los comparto: ninguna entidad legítima te los pide",
              "Solo comparto la contraseña, no el código",
              "Los comparto si me dicen que es urgente"
            ],
            a: 1,
            exp: "Tus claves y códigos son personales. Quien los pide quiere entrar a tu cuenta."
          }
        ]
      }
    ],

    /* ------------------------------ UNIDAD 8 ------------------------------ */
    u8: [
      {
        id: "u8l5",
        title: "ROE y nivel de deuda",
        icon: "🔬",
        questions: [
          {
            t: "choice",
            q: "¿Qué mide el ROE (retorno sobre el capital)?",
            options: [
              "La utilidad neta que genera una empresa por cada peso de capital contable",
              "El precio de la acción entre su dividendo",
              "La inflación del país",
              "El número de empleados"
            ],
            a: 0,
            exp: "Un ROE mayor indica que la empresa aprovecha mejor el capital de sus accionistas."
          },
          {
            t: "num",
            q: "Una empresa gana $20 de utilidad neta y tiene $100 de capital contable. ¿Cuál es su ROE?",
            a: 20,
            suffix: "%",
            exp: "20 ÷ 100 = 0.20, es decir, 20%."
          },
          {
            t: "num",
            q: "Una empresa tiene pasivos por $300 y capital contable de $150. ¿Cuántas veces su deuda es mayor que su capital?",
            a: 2,
            suffix: "veces",
            exp: "300 ÷ 150 = 2. Entre más alta la razón, más depende la empresa de deuda."
          },
          {
            t: "tf",
            q: "Una empresa con mucha deuda puede mostrar un ROE alto, pero también tiene más riesgo.",
            a: true,
            exp: "La deuda puede inflar el ROE, pero aumenta el riesgo si bajan las ventas o suben las tasas."
          },
          {
            t: "match",
            q: "Une cada razón con su fórmula",
            pairs: [
              ["ROE", "Utilidad neta entre capital contable"],
              ["Deuda / capital", "Pasivos entre capital contable"],
              ["Margen neto", "Utilidad neta entre ventas"],
              ["P/U", "Precio de la acción entre utilidad por acción"]
            ],
            exp: "Ninguna razón cuenta toda la historia: úsalas juntas y compáralas con empresas similares."
          }
        ]
      },
      {
        id: "u8l6",
        title: "Flujo de efectivo",
        icon: "💧",
        questions: [
          {
            t: "choice",
            q: "¿Qué muestra el estado de flujos de efectivo?",
            options: [
              "El precio de la acción",
              "Los sueldos de los directivos",
              "El dinero que entra y sale de la empresa en un periodo",
              "La lista de sus competidores"
            ],
            a: 2,
            exp: "Te dice cuánto efectivo real generó o consumió el negocio."
          },
          {
            t: "tf",
            q: "Una empresa puede tener utilidad contable y aun así quedarse sin efectivo.",
            a: true,
            exp: "Por ejemplo, si vende a crédito y todavía no cobra, o si paga muchas deudas o inversiones."
          },
          {
            t: "num",
            q: "En un mes una empresa cobra $500 en efectivo y paga $350 de gastos. ¿Cuál es su flujo de efectivo neto?",
            a: 150,
            prefix: "$",
            exp: "500 − 350 = 150."
          },
          {
            t: "match",
            q: "Une cada tipo de flujo con su significado",
            pairs: [
              ["Operación", "Dinero de las ventas y los gastos del negocio diario"],
              ["Inversión", "Compra o venta de equipos, edificios y otros activos"],
              ["Financiamiento", "Préstamos, aportaciones de socios y pago de dividendos"],
              ["Flujo libre", "Lo que queda del flujo operativo después de invertir"]
            ],
            exp: "El estado de flujos de efectivo suele organizarse en estas tres actividades."
          },
          {
            t: "choice",
            q: "¿Por qué es útil revisar el flujo de efectivo además de la utilidad?",
            options: [
              "Porque muestra si el negocio genera dinero real para operar y pagar deudas",
              "Porque siempre es igual a la utilidad",
              "Porque sustituye al balance general",
              "Porque no hace falta revisar nada más"
            ],
            a: 0,
            exp: "Una empresa sana suele generar efectivo de forma constante, no solo utilidades en papel."
          }
        ]
      }
    ]
  };

  /* Agrega cada lección Pro al final de su unidad y la marca como Pro */
  (window.COURSE || []).forEach(function (u) {
    (PRO[u.id] || []).forEach(function (l) { l.pro = true; u.lessons.push(l); });
  });
})();

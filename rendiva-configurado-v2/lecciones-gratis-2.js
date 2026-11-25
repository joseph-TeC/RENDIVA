/* ==========================================================================
   LECCIONES GRATIS — Unidades 5 a 8
   Mismo formato que lecciones-gratis.js. Se agregan a la ruta después de las
   unidades 1 a 4. Todas son gratis; las lecciones solo Pro están en lecciones-pro.js.
   ========================================================================== */

window.COURSE = (window.COURSE || []).concat([
  /* ------------------------------ UNIDAD 5 ------------------------------ */
  {
    id: "u5",
    title: "Arma tu portafolio",
    desc: "Diversificación, horizonte, asignación de activos y rebalanceo.",
    color: "#7c5cff",
    dark: "#5a3fd6",
    lessons: [
      {
        id: "u5l1",
        title: "Diversificación",
        icon: "🧺",
        questions: [
          {
            t: "choice",
            q: "“No pongas todos los huevos en la misma canasta” ilustra…",
            options: ["Inflación", "Diversificación", "Interés simple", "Liquidez"],
            a: 1,
            exp: "Repartir tu dinero entre varios activos reduce el impacto si uno de ellos falla."
          },
          {
            t: "tf",
            q: "Comprar 10 acciones del mismo sector es una diversificación completa.",
            a: false,
            exp: "Si todo el sector sufre, todas tus acciones caerán juntas. Conviene diversificar entre sectores, tipos de activo y países."
          },
          {
            t: "choice",
            q: "¿Qué reduce principalmente la diversificación?",
            options: [
              "El riesgo propio de un solo activo",
              "Las comisiones",
              "Los impuestos",
              "La inflación"
            ],
            a: 0,
            exp: "Reduce el riesgo específico, aunque no elimina el riesgo general del mercado."
          },
          {
            t: "match",
            q: "Une cada concepto con su significado",
            pairs: [
              ["Renta variable", "Acciones y fondos de acciones"],
              ["Renta fija", "Bonos y otros instrumentos de deuda"],
              ["Liquidez", "Qué tan rápido conviertes algo en efectivo"],
              ["Efectivo", "Dinero disponible de inmediato, con poco rendimiento"]
            ],
            exp: "Un portafolio sólido suele combinar varios de estos componentes."
          },
          {
            t: "choice",
            q: "Un portafolio con 100% de una sola acción es…",
            options: [
              "Muy concentrado y arriesgado",
              "El más seguro",
              "Perfectamente diversificado",
              "Igual que un ETF"
            ],
            a: 0,
            exp: "Si esa empresa tiene problemas, todo tu portafolio se afecta."
          }
        ]
      },
      {
        id: "u5l2",
        title: "Metas y horizonte",
        icon: "🎯",
        questions: [
          {
            t: "choice",
            q: "Necesitas el dinero en 6 meses para un viaje. ¿Qué conviene priorizar?",
            options: [
              "Estabilidad y liquidez",
              "El máximo rendimiento posible",
              "Acciones de una sola empresa",
              "Activos muy especulativos"
            ],
            a: 0,
            exp: "Con plazos cortos, una caída fuerte puede no darte tiempo de recuperarte."
          },
          {
            t: "choice",
            q: "Para una meta a 30 años, como el retiro, ¿qué enfoque tiene más sentido?",
            options: [
              "Todo en efectivo",
              "Más crecimiento, aceptando volatilidad en el camino",
              "Cambiar de inversión cada semana",
              "No invertir nada"
            ],
            a: 1,
            exp: "Con plazos largos puedes tolerar altibajos, porque hay tiempo para recuperarse."
          },
          {
            t: "tf",
            q: "Tu perfil de riesgo depende solo de cuánto dinero tienes.",
            a: false,
            exp: "También cuentan tus metas, tu plazo, la estabilidad de tus ingresos y qué tan cómodo te sientes con las caídas."
          },
          {
            t: "choice",
            q: "¿Qué es el horizonte de inversión?",
            options: [
              "El tiempo que planeas mantener tu dinero invertido antes de necesitarlo",
              "La ganancia que esperas cada mes",
              "El máximo que puedes perder",
              "La fecha de un impuesto"
            ],
            a: 0,
            exp: "Es una de las primeras cosas que debes definir, porque decide cuánto riesgo tiene sentido asumir."
          },
          {
            t: "order",
            q: "Ordena estas metas de menor a mayor plazo",
            items: [
              "Pagar un viaje en 6 meses",
              "Dar el enganche de un auto en 2 años",
              "Comprar una casa en 8 años",
              "Retirarte en 30 años"
            ],
            exp: "Mientras más corto es el plazo, más importa la estabilidad."
          }
        ]
      },
      {
        id: "u5l3",
        title: "Asignación de activos",
        icon: "🥧",
        questions: [
          {
            t: "choice",
            q: "¿Qué es la asignación de activos?",
            options: [
              "Decidir qué porcentaje de tu dinero va a cada tipo de activo",
              "Elegir la mejor acción del año",
              "Pagar impuestos por tus inversiones",
              "Cambiar de broker"
            ],
            a: 0,
            exp: "Esta decisión suele explicar gran parte de cómo se comporta tu portafolio."
          },
          {
            t: "choice",
            q: "Un portafolio “60/40” normalmente significa…",
            options: [
              "60% en acciones y 40% en bonos",
              "60% en efectivo y 40% en cripto",
              "60 meses y 40 meses de plazo",
              "60% de ganancia y 40% de pérdida"
            ],
            a: 0,
            exp: "Es una mezcla clásica que busca equilibrar crecimiento y estabilidad."
          },
          {
            t: "choice",
            q: "Si quieres menos volatilidad, ¿qué suele pasar con tu porcentaje en renta fija?",
            options: ["Aumenta", "Se vuelve cero", "No cambia nunca", "Se reemplaza por una sola acción"],
            a: 0,
            exp: "La renta fija suele moverse menos que las acciones."
          },
          {
            t: "tf",
            q: "Tu asignación ideal puede cambiar con tus metas y con tu edad.",
            a: true,
            exp: "Por eso conviene revisar tu plan cuando cambia tu situación."
          },
          {
            t: "match",
            q: "Une cada tipo de activo con su característica",
            pairs: [
              ["Acciones", "Mayor potencial de crecimiento y más volatilidad"],
              ["Bonos", "Ingresos más estables y menor volatilidad típica"],
              ["Efectivo", "Liquidez inmediata y poco rendimiento"],
              ["Inmuebles", "Rentas y plusvalía, pero menos liquidez"]
            ],
            exp: "Cada activo aporta algo distinto a tu portafolio."
          }
        ]
      },
      {
        id: "u5l4",
        title: "Rebalanceo y revisión",
        icon: "🔧",
        questions: [
          {
            t: "choice",
            q: "¿Qué es rebalancear?",
            options: [
              "Ajustar tu portafolio para volver a tu distribución objetivo",
              "Vender todo y empezar de cero",
              "Comprar solo lo que más subió",
              "Pagar una comisión extra"
            ],
            a: 0,
            exp: "Si una parte creció mucho, puedes ajustarla para no asumir más riesgo del que querías."
          },
          {
            t: "choice",
            q: "Tu meta era 60% acciones y 40% bonos, pero las acciones subieron y ahora son 75%. ¿Qué puedes hacer?",
            options: [
              "Ajustar para volver cerca de 60/40",
              "Ignorarlo para siempre",
              "Vender los bonos y comprar más acciones",
              "Cambiar tu meta cada mes"
            ],
            a: 0,
            exp: "Rebalancear evita que tu portafolio se vuelva más arriesgado sin que lo decidas."
          },
          {
            t: "tf",
            q: "Rebalancear cada hora es necesario para tener buenos resultados.",
            a: false,
            exp: "Hacerlo con mucha frecuencia suele aumentar costos y decisiones impulsivas."
          },
          {
            t: "choice",
            q: "¿Cada cuánto suele ser razonable revisar tu portafolio?",
            options: [
              "Una o dos veces al año, o cuando cambie tu situación",
              "Cada hora",
              "Nunca",
              "Solo cuando el mercado cae"
            ],
            a: 0,
            exp: "Una revisión periódica mantiene el plan sin caer en el estrés de mirar precios todo el día."
          },
          {
            t: "num",
            q: "Tienes $10,000 y tu meta es 70% en acciones. ¿Cuántos pesos deben estar en acciones?",
            a: 7000,
            prefix: "$",
            exp: "10,000 × 0.70 = 7,000."
          }
        ]
      }
    ]
  },

  /* ------------------------------ UNIDAD 6 ------------------------------ */
  {
    id: "u6",
    title: "Costos, impuestos y estrategia",
    desc: "Lo que reduce tu rendimiento y cómo invertir con método.",
    color: "#d9730d",
    dark: "#a95608",
    lessons: [
      {
        id: "u6l1",
        title: "Costos y comisiones",
        icon: "🧾",
        questions: [
          {
            t: "choice",
            q: "¿Por qué importan las comisiones pequeñas?",
            options: [
              "No importan",
              "Se acumulan y reducen tu rendimiento con los años",
              "Solo afectan a quienes invierten poco",
              "Las paga el gobierno"
            ],
            a: 1,
            exp: "Un 1% o 2% extra al año parece poco, pero el efecto compuesto lo vuelve grande en el largo plazo."
          },
          {
            t: "num",
            q: "Una inversión rinde 7% al año y cobra 2% de comisión anual. ¿Cuál es tu rendimiento neto aproximado?",
            a: 5,
            suffix: "%",
            exp: "7% − 2% = 5%."
          },
          {
            t: "tf",
            q: "Un fondo con comisiones más altas siempre rinde más.",
            a: false,
            exp: "Pagar más no garantiza mejores resultados. Compara costos antes de elegir."
          },
          {
            t: "choice",
            q: "¿Qué conviene revisar antes de invertir en una plataforma?",
            options: [
              "Solo el diseño de la app",
              "Comisiones, impuestos y si está regulada",
              "Cuántos seguidores tiene en redes",
              "Qué color tiene el logo"
            ],
            a: 1,
            exp: "Los costos, la forma en que se gravan tus rendimientos y la regulación cambian mucho tu resultado real."
          },
          {
            t: "num",
            q: "Pagas 1.5% de comisión anual sobre $20,000 invertidos. ¿Cuántos pesos pagas en un año?",
            a: 300,
            prefix: "$",
            exp: "20,000 × 0.015 = 300."
          }
        ]
      },
      {
        id: "u6l2",
        title: "Impuestos",
        icon: "🏛️",
        questions: [
          {
            t: "choice",
            q: "¿Qué es una ganancia de capital?",
            options: [
              "La ganancia al vender un activo por más de lo que costó",
              "El dinero que ahorras de tu sueldo",
              "La comisión del broker",
              "Un descuento en tu tarjeta"
            ],
            a: 0,
            exp: "Es la diferencia positiva entre el precio de venta y el de compra."
          },
          {
            t: "tf",
            q: "Los rendimientos de tus inversiones pueden generar impuestos.",
            a: true,
            exp: "Las reglas dependen de tu país y del tipo de instrumento, así que conviene revisarlas."
          },
          {
            t: "choice",
            q: "Antes de invertir, ¿qué conviene revisar sobre impuestos?",
            options: [
              "Cómo se gravan los rendimientos del instrumento en tu país",
              "Nada, los impuestos no cambian el resultado",
              "Solo el nombre del broker",
              "Cuántos amigos invierten igual"
            ],
            a: 0,
            exp: "Dos inversiones con el mismo rendimiento pueden dejar resultados distintos después de impuestos."
          },
          {
            t: "num",
            q: "Una inversión rinde 10% y los impuestos le restan 2 puntos porcentuales. ¿Cuál es el rendimiento aproximado después de impuestos?",
            a: 8,
            suffix: "%",
            exp: "10% − 2% = 8%."
          },
          {
            t: "choice",
            q: "Guardar tus estados de cuenta y comprobantes de inversión sirve para…",
            options: [
              "Comprobar tus operaciones y declarar si te lo piden",
              "Que suba el rendimiento",
              "Evitar la inflación",
              "Cambiar de broker más rápido"
            ],
            a: 0,
            exp: "Tener tu historial ordenado te ahorra problemas al cumplir con tus obligaciones fiscales."
          }
        ]
      },
      {
        id: "u6l3",
        title: "Invertir de forma periódica",
        icon: "📅",
        questions: [
          {
            t: "choice",
            q: "¿En qué consiste invertir de forma periódica?",
            options: [
              "Invertir montos fijos cada cierto tiempo sin intentar adivinar el mejor momento",
              "Invertir todo cuando creo que el mercado va a subir",
              "Vender cada vez que baja",
              "Invertir solo en diciembre"
            ],
            a: 0,
            exp: "Reduce la presión de adivinar el momento perfecto y crea el hábito de invertir."
          },
          {
            t: "choice",
            q: "¿Qué ventaja ofrece invertir de forma periódica?",
            options: [
              "Evita depender de acertar el mejor momento y forma el hábito",
              "Garantiza ganancias",
              "Elimina el riesgo",
              "Evita pagar comisiones"
            ],
            a: 0,
            exp: "No elimina el riesgo, pero hace más fácil mantener un plan."
          },
          {
            t: "num",
            q: "Inviertes $1,000 cuando el título cuesta $10 y otros $1,000 cuando cuesta $20. ¿Cuántos títulos compraste en total?",
            a: 150,
            exp: "1,000 ÷ 10 = 100 títulos y 1,000 ÷ 20 = 50 títulos. En total, 150."
          },
          {
            t: "tf",
            q: "Invertir de forma periódica garantiza que nunca perderás dinero.",
            a: false,
            exp: "Si los precios bajan y no se recuperan, puedes perder. Es un método, no una garantía."
          },
          {
            t: "choice",
            q: "Si el mercado baja mientras inviertes periódicamente, tus próximas compras…",
            options: [
              "Compran más títulos con el mismo dinero",
              "Compran menos títulos",
              "Se cancelan solas",
              "Cuestan más comisión"
            ],
            a: 0,
            exp: "Con precios más bajos, el mismo monto alcanza para más títulos."
          }
        ]
      },
      {
        id: "u6l4",
        title: "Pasiva vs. activa",
        icon: "🎛️",
        questions: [
          {
            t: "choice",
            q: "¿Qué busca la inversión pasiva?",
            options: [
              "Replicar el mercado con bajos costos y pocos movimientos",
              "Adivinar la próxima acción ganadora",
              "Operar todos los días",
              "Evitar cualquier riesgo"
            ],
            a: 0,
            exp: "La idea es capturar el rendimiento del mercado sin pagar de más por intentar superarlo."
          },
          {
            t: "choice",
            q: "¿Qué suele pasar con muchos fondos activos a largo plazo?",
            options: [
              "Una parte importante no supera a su índice después de comisiones",
              "Todos superan al mercado",
              "Nunca cobran comisiones",
              "Siempre pierden dinero"
            ],
            a: 0,
            exp: "Las comisiones y la dificultad de acertar hacen que superar al mercado de forma constante sea muy difícil."
          },
          {
            t: "tf",
            q: "Una estrategia pasiva significa no tener ningún riesgo.",
            a: false,
            exp: "Replicar el mercado también implica asumir sus subidas y caídas."
          },
          {
            t: "choice",
            q: "¿Cuál es una característica de la estrategia activa?",
            options: [
              "Mayores costos y más decisiones de compra y venta",
              "No requiere ningún análisis",
              "Garantiza vencer al mercado",
              "Es siempre gratis"
            ],
            a: 0,
            exp: "Más decisiones y análisis suelen traducirse en más costos."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Índice", "Medida del comportamiento de un grupo de activos"],
              ["ETF indexado", "Fondo que busca replicar un índice"],
              ["Gestor activo", "Profesional que elige activos buscando superar al mercado"],
              ["Costo total", "Comisiones y gastos que reducen tu rendimiento"]
            ],
            exp: "Conocer estos términos te ayuda a comparar estrategias con criterio."
          }
        ]
      }
    ]
  },

  /* ------------------------------ UNIDAD 7 ------------------------------ */
  {
    id: "u7",
    title: "Mente de inversionista",
    desc: "Emociones, sesgos, fraudes y hábitos que se sostienen.",
    color: "#d6458a",
    dark: "#a8316b",
    lessons: [
      {
        id: "u7l1",
        title: "Emociones y mercado",
        icon: "🧠",
        questions: [
          {
            t: "choice",
            q: "¿Qué es el FOMO al invertir?",
            options: [
              "Miedo a perderse una oportunidad que lleva a decidir por impulso",
              "Una comisión de la bolsa",
              "Un tipo de bono",
              "Un índice de acciones"
            ],
            a: 0,
            exp: "Comprar solo porque “todos están ganando” suele terminar en malas decisiones."
          },
          {
            t: "choice",
            q: "El mercado cae 15% y tu meta está a 20 años. ¿Qué es lo más sensato?",
            options: [
              "Revisar mi plan y evitar vender por pánico",
              "Vender todo ya",
              "Pedir un préstamo para comprar más",
              "Dejar de pensar en mi meta"
            ],
            a: 0,
            exp: "Las caídas son normales. Decidir por miedo suele convertir una pérdida temporal en una real."
          },
          {
            t: "tf",
            q: "Vender todo cuando el mercado baja suele ayudar a tus resultados a largo plazo.",
            a: false,
            exp: "Muchas veces fija la pérdida y te hace perder la recuperación."
          },
          {
            t: "tf",
            q: "Acertar de forma constante los mejores momentos para comprar y vender es muy difícil.",
            a: true,
            exp: "Hasta los profesionales fallan seguido. Por eso un plan y la constancia importan más."
          },
          {
            t: "choice",
            q: "¿Qué ayuda a decidir con calma?",
            options: [
              "Un plan escrito con metas y reglas",
              "Revisar las noticias cada minuto",
              "Seguir lo que dicen los foros",
              "Decidir según mi estado de ánimo"
            ],
            a: 0,
            exp: "Cuando ya definiste qué harás y por qué, es más fácil no reaccionar por impulso."
          }
        ]
      },
      {
        id: "u7l2",
        title: "Sesgos que cuestan",
        icon: "🧩",
        questions: [
          {
            t: "choice",
            q: "¿Qué es la aversión a las pérdidas?",
            options: [
              "Sentir más dolor por perder una cantidad que alegría por ganar la misma",
              "No querer pagar comisiones",
              "Evitar todas las inversiones",
              "Querer perder para aprender"
            ],
            a: 0,
            exp: "Puede llevarte a aferrarte a inversiones que van mal solo por no aceptar la pérdida."
          },
          {
            t: "choice",
            q: "Solo lees noticias que confirman lo que ya piensas. Esto se llama…",
            options: [
              "Sesgo de confirmación",
              "Diversificación",
              "Rebalanceo",
              "Interés compuesto"
            ],
            a: 0,
            exp: "Buscar también argumentos en contra te ayuda a decidir mejor."
          },
          {
            t: "choice",
            q: "Comprar algo solo porque “todo el mundo lo está comprando” es…",
            options: [
              "Efecto manada",
              "Análisis fundamental",
              "Diversificación",
              "Planeación fiscal"
            ],
            a: 0,
            exp: "Seguir a la multitud suele hacer que compres caro y vendas barato."
          },
          {
            t: "tf",
            q: "El exceso de confianza puede llevarte a operar demasiado.",
            a: true,
            exp: "Operar más suele aumentar costos sin mejorar los resultados."
          },
          {
            t: "match",
            q: "Une cada sesgo con su descripción",
            pairs: [
              ["Sesgo de confirmación", "Buscar solo información que apoya tu opinión"],
              ["Efecto manada", "Imitar lo que hace la mayoría"],
              ["Anclaje", "Aferrarte a un precio de referencia"],
              ["Aversión a la pérdida", "Evitar vender con pérdida aunque convenga"]
            ],
            exp: "Reconocerlos es el primer paso para que no decidan por ti."
          }
        ]
      },
      {
        id: "u7l3",
        title: "Evita fraudes",
        icon: "🛡️",
        questions: [
          {
            t: "choice",
            q: "¿Cuál es una señal clásica de esquema Ponzi?",
            options: [
              "Promete rendimientos altos y constantes con casi nada de riesgo",
              "Muestra su regulación claramente",
              "Explica los riesgos con detalle",
              "Te deja retirar tu dinero cuando quieres"
            ],
            a: 0,
            exp: "Esos esquemas pagan a unos con el dinero de los nuevos, hasta que dejan de entrar inversionistas."
          },
          {
            t: "choice",
            q: "Antes de invertir en una plataforma, ¿qué debes verificar?",
            options: [
              "Que esté regulada y autorizada por la autoridad financiera de tu país",
              "Que tenga muchos anuncios",
              "Que un influencer la recomiende",
              "Que prometa mucho"
            ],
            a: 0,
            exp: "En México, por ejemplo, conviene revisar los registros de las autoridades como la CNBV."
          },
          {
            t: "tf",
            q: "Si un influencer lo recomienda, no necesito investigar.",
            a: false,
            exp: "Muchos reciben pagos por promocionar productos y no asumen ninguna responsabilidad por tus pérdidas."
          },
          {
            t: "choice",
            q: "Te piden depositar dinero extra “para desbloquear tus ganancias”. Esto es…",
            options: [
              "Un trámite normal",
              "Una señal fuerte de fraude",
              "Un impuesto obligatorio siempre",
              "Una promoción"
            ],
            a: 1,
            exp: "Las plataformas legítimas no te piden pagos para poder retirar lo que ya es tuyo."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Ponzi", "Paga a unos con dinero de nuevos inversionistas"],
              ["Phishing", "Engaño para robar tus datos o contraseñas"],
              ["Pump and dump", "Inflar un precio para vender caro y dejar pérdidas a otros"],
              ["Regulador", "Autoridad que vigila a las entidades financieras"]
            ],
            exp: "Conocer estos nombres te ayuda a reconocer el fraude a tiempo."
          }
        ]
      },
      {
        id: "u7l4",
        title: "Hábitos que crecen",
        icon: "🔁",
        questions: [
          {
            t: "choice",
            q: "¿Qué hábito ayuda más a crecer tu patrimonio?",
            options: [
              "Invertir de forma constante a largo plazo",
              "Cambiar de estrategia cada semana",
              "Esperar al momento perfecto",
              "Invertir solo cuando sobra dinero"
            ],
            a: 0,
            exp: "La constancia pesa más que acertar el momento exacto."
          },
          {
            t: "num",
            q: "Si inviertes $500 al mes durante 12 meses (sin contar rendimientos), ¿cuánto habrás aportado?",
            a: 6000,
            prefix: "$",
            exp: "500 × 12 = 6,000."
          },
          {
            t: "tf",
            q: "Revisar tu portafolio cada hora te ayuda a decidir mejor.",
            a: false,
            exp: "Mirar los precios todo el tiempo aumenta la ansiedad y las decisiones impulsivas."
          },
          {
            t: "choice",
            q: "¿Qué ayuda a mantener el hábito de invertir?",
            options: [
              "Automatizar tus aportaciones periódicas",
              "Depender de tu estado de ánimo",
              "Esperar a que el mercado esté en su punto más bajo",
              "Invertir solo cuando recibes un bono"
            ],
            a: 0,
            exp: "Lo automático no depende de tu motivación del día."
          },
          {
            t: "choice",
            q: "¿Cuál es un buen primer paso hoy?",
            options: [
              "Definir una meta, un plazo y cuánto puedo aportar",
              "Invertir todo en lo que está de moda",
              "Pedir un préstamo para invertir",
              "Esperar a tener mucho dinero"
            ],
            a: 0,
            exp: "Con meta, plazo y monto claros, ya puedes elegir instrumentos con criterio."
          }
        ]
      }
    ]
  },

  /* ------------------------------ UNIDAD 8 ------------------------------ */
  {
    id: "u8",
    title: "Análisis básico",
    desc: "Lee una empresa, entiende los ciclos del mercado y arma tu plan.",
    color: "#4f5bd5",
    dark: "#3a43a8",
    lessons: [
      {
        id: "u8l1",
        title: "Estados financieros",
        icon: "📑",
        questions: [
          {
            t: "choice",
            q: "¿Qué muestra el estado de resultados de una empresa?",
            options: [
              "Sus ingresos, costos y utilidad en un periodo",
              "Lo que tiene y debe en una fecha",
              "La lista de sus accionistas",
              "El precio de su acción hoy"
            ],
            a: 0,
            exp: "Te dice si la empresa ganó o perdió dinero durante un periodo."
          },
          {
            t: "choice",
            q: "¿Qué muestra el balance general?",
            options: [
              "Lo que la empresa tiene, lo que debe y su capital en una fecha",
              "Solo las ventas del año",
              "El sueldo de los directivos",
              "El precio de sus productos"
            ],
            a: 0,
            exp: "Es una “foto” de la situación de la empresa en un momento específico."
          },
          {
            t: "tf",
            q: "Una empresa con ventas altas siempre tiene utilidades.",
            a: false,
            exp: "Si sus costos y gastos son mayores que sus ventas, puede perder dinero aunque venda mucho."
          },
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Activos", "Lo que la empresa posee"],
              ["Pasivos", "Lo que la empresa debe"],
              ["Capital contable", "Activos menos pasivos"],
              ["Utilidad neta", "Ganancia después de costos, gastos e impuestos"]
            ],
            exp: "Con estos conceptos puedes empezar a leer los reportes de cualquier empresa."
          },
          {
            t: "num",
            q: "Una empresa tiene activos por $500 y pasivos por $300. ¿Cuál es su capital contable?",
            a: 200,
            prefix: "$",
            exp: "500 − 300 = 200."
          }
        ]
      },
      {
        id: "u8l2",
        title: "Razones básicas",
        icon: "🔍",
        questions: [
          {
            t: "choice",
            q: "¿Qué es la razón precio/utilidad (P/U)?",
            options: [
              "El precio de la acción dividido entre la utilidad por acción",
              "La comisión dividida entre el plazo",
              "El dividendo dividido entre la inflación",
              "El capital dividido entre las deudas"
            ],
            a: 0,
            exp: "Indica cuántos años de utilidades actuales estás pagando por la acción."
          },
          {
            t: "num",
            q: "Una acción cuesta $100 y la empresa gana $5 por acción al año. ¿Cuál es su P/U?",
            a: 20,
            exp: "100 ÷ 5 = 20."
          },
          {
            t: "choice",
            q: "¿Qué es el rendimiento por dividendo?",
            options: [
              "El dividendo anual entre el precio de la acción",
              "La utilidad entre el capital",
              "El precio entre la utilidad",
              "La inflación menos la tasa"
            ],
            a: 0,
            exp: "Mide qué porcentaje del precio recibes cada año en dividendos."
          },
          {
            t: "num",
            q: "Una acción cuesta $50 y paga $2 de dividendo al año. ¿Qué rendimiento por dividendo tiene?",
            a: 4,
            suffix: "%",
            exp: "2 ÷ 50 = 0.04, es decir, 4%."
          },
          {
            t: "tf",
            q: "Un P/U bajo siempre significa que la acción es una ganga.",
            a: false,
            exp: "Puede ser barata, o puede estar baja porque la empresa tiene problemas. Una razón nunca cuenta toda la historia."
          }
        ]
      },
      {
        id: "u8l3",
        title: "Alzas, caídas y burbujas",
        icon: "🫧",
        questions: [
          {
            t: "match",
            q: "Une cada término con su significado",
            pairs: [
              ["Mercado alcista", "Periodo prolongado de alzas"],
              ["Mercado bajista", "Caídas prolongadas de precios"],
              ["Corrección", "Caída moderada tras una racha de alzas"],
              ["Burbuja", "Precios muy por encima de su valor, impulsados por euforia"]
            ],
            exp: "Los mercados pasan por ciclos. Conocerlos te ayuda a no sorprenderte."
          },
          {
            t: "choice",
            q: "Una señal típica de burbuja es…",
            options: [
              "Euforia generalizada y gente comprando solo porque el precio sube",
              "Precios estables durante años",
              "Poco interés del público",
              "Comisiones muy bajas"
            ],
            a: 0,
            exp: "Cuando la razón para comprar es “seguro seguirá subiendo”, conviene frenar y revisar."
          },
          {
            t: "tf",
            q: "Después de una caída fuerte, los mercados siempre se recuperan en pocos meses.",
            a: false,
            exp: "Históricamente se han recuperado, pero a veces tarda años y no hay garantías."
          },
          {
            t: "choice",
            q: "¿Por qué es tan difícil predecir el mejor momento para comprar?",
            options: [
              "Porque los mercados reaccionan a información que nadie conoce de antemano",
              "Porque está prohibido predecir",
              "Porque los precios no cambian",
              "Porque siempre suben en diciembre"
            ],
            a: 0,
            exp: "Las noticias nuevas cambian los precios de forma imprevisible."
          },
          {
            t: "choice",
            q: "¿Qué ayuda más a atravesar caídas del mercado?",
            options: [
              "Un plan, diversificación y un horizonte largo",
              "Revisar el precio cada minuto",
              "Vender todo al primer susto",
              "Pedir un préstamo para invertir más"
            ],
            a: 0,
            exp: "Con un plan definido es más fácil mantener la calma."
          }
        ]
      },
      {
        id: "u8l4",
        title: "Tu plan de inversión",
        icon: "📝",
        questions: [
          {
            t: "order",
            q: "Ordena los pasos para crear tu plan de inversión",
            items: [
              "Define tu meta y tu plazo",
              "Calcula cuánto puedes aportar",
              "Elige tu asignación según tu perfil de riesgo",
              "Selecciona instrumentos con costos bajos",
              "Revisa y rebalancea periódicamente"
            ],
            exp: "Un buen plan va de lo que quieres lograr hacia las herramientas, no al revés."
          },
          {
            t: "choice",
            q: "¿Qué debe incluir un buen plan de inversión?",
            options: [
              "Metas, plazo, aportaciones y reglas para tomar decisiones",
              "Solo el nombre de la acción favorita",
              "Una promesa de ganancia",
              "Las recomendaciones de un grupo de chat"
            ],
            a: 0,
            exp: "Las reglas por escrito te ayudan a no decidir por impulso."
          },
          {
            t: "choice",
            q: "Antes de ejecutar tu plan, ¿qué deberías tener resuelto?",
            options: [
              "Un fondo de emergencia y las deudas caras bajo control",
              "Un préstamo para invertir",
              "Una cuenta en cada plataforma",
              "Nada, solo empezar"
            ],
            a: 0,
            exp: "Así evitas vender inversiones en mal momento por una urgencia."
          },
          {
            t: "tf",
            q: "Tu plan puede ajustarse cuando cambian tus metas o tu situación.",
            a: true,
            exp: "Un plan útil se revisa; no se escribe una vez y se olvida."
          },
          {
            t: "choice",
            q: "¿Qué haces si no entiendes un producto financiero?",
            options: [
              "No invierto hasta entenderlo y consulto a un profesional si lo necesito",
              "Invierto un poco para ver qué pasa",
              "Confío en quien me lo ofreció",
              "Invierto más para compensar"
            ],
            a: 0,
            exp: "Si no puedes explicarlo con tus palabras, todavía no es momento de invertir en él."
          }
        ]
      }
    ]
  }
]);

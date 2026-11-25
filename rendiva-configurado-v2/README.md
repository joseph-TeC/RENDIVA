# Rendiva — app para aprender a invertir (estilo Duolingo)

> **Sobre el nombre:** "Rendiva" es inventado. En mis búsquedas en la web no encontré ninguna empresa, app ni marca con ese nombre exacto, pero **eso no garantiza que esté libre**. Antes de comprar el dominio y publicar, revisa tú: (1) el dominio en tu registrador, (2) la marca en el buscador de marcas del IMPI (marcia.impi.gob.mx) y (3) las tiendas de apps. Para cambiar el nombre solo edita `brand` en `config.js` y el `<title>` de `index.html`.

Sitio estático: no necesita servidor, base de datos ni instalación. Son archivos que subes a cualquier hosting.

## Qué incluye

**Aprendizaje**
- **8 unidades · 50 lecciones · 250 preguntas.** Tipos de pregunta: opción múltiple, verdadero/falso, unir pares, respuesta numérica y **ordenar pasos**.
- **34 lecciones gratis**, todas las unidades abiertas: Dinero y tiempo · Tus primeras inversiones · Dónde poner tu dinero · Más activos para conocer · Arma tu portafolio · Costos, impuestos y estrategia · Mente de inversionista · Análisis básico.
- **16 lecciones solo Pro (2 al final de cada unidad)**: se ven como nodos con candado y anillo morado, **sin** la palabra Pro. Al tocarlas sale el aviso de la versión Pro (puerta falsa `cursos-avanzados`). No bloquean el avance de las lecciones gratis.
- XP, racha, meta diaria, vidas (5, se recupera 1 cada 25 min).

**Capi, la mascota de tu racha 🐂**
- Capi es un toro verde (el "mercado alcista") dibujado en SVG propio. **El nivel de la app es el nivel de Capi**: sube con tu XP y evoluciona en 6 etapas (Cría → Ahorrador → Aprendiz → Inversionista → Experto → Leyenda), con nuevos accesorios en cada una.
- Su cara cambia con tu racha: contento si practicaste hoy, preocupado si la racha corre peligro, dormido si la perdiste.
- **Sirve para algo:** cada nivel desbloquea una ventaja real: nivel 2 +1 🪙 por lección · nivel 3 vidas cada 20 min · nivel 4 escudo de racha (salva 1 día perdido cada 7 días) · nivel 5 +10 % de XP · nivel 6 +5 🪙 en el reto diario.
- Página propia en *Mi mascota* (`#/capi`) y tarjeta en *Aprender*. Al subir de nivel sale una pantalla de evolución.
- XP necesario y ventajas se configuran en `config.js` → `mascot`.

**Funciones gratis**
- **Reto diario** (5 preguntas mezcladas, sin gastar vidas, 1 por día).
- **Mis errores**: repasa las preguntas que fallaste (1 sesión gratis al día).
- **3 calculadoras**: interés compuesto, inflación y meta de ahorro.
- **Glosario** de 57 términos con búsqueda y categorías.
- **Test de perfil de riesgo** (7 preguntas) con distribución de ejemplo.
- **Monedas 🪙 y tienda**: recargar vidas, congelar racha, impulso de XP ×2.
- **Misiones diarias** (XP, lecciones, reto) y **25 insignias** (dos son de Capi).
- **Perfil** con estadísticas, gráfica semanal, meta diaria y tema claro/oscuro/automático.

**Anuncios (y "Sin anuncios" como función Pro)**
- Cada **2 lecciones completadas**, al tocar *Continuar* en la pantalla de resultados aparece un anuncio (con etiqueta "ANUNCIO"). El reto diario y "Mis errores" no cuentan ni muestran anuncios.
- El botón *Continuar* se activa tras 5 segundos. Debajo hay un botón de borde morado "🚫 Quitar anuncios" que abre la puerta falsa `sin-anuncios` (la primera función de la lista Pro).
- **Por defecto los anuncios son propios**: rotan las funciones Pro que vienen (simulador, asistente, etc.) y miden el interés. Si quieres anuncios de patrocinadores o afiliados, agrégalos en `config.js` → `ads.sponsors` (solo enlaces `http/https`; se abren en pestaña nueva con `rel="sponsored"`).
- Se configura en `config.js` → `ads`: `enabled` (false = sin anuncios para todos), `every` (cada cuántas lecciones), `seconds` (espera) y `sponsors`.
- **No incluí Google AdSense** a propósito: sus políticas limitan anuncios con espera obligatoria o junto a botones de navegación, y exigiría cookies y un aviso de consentimiento. Si algún día lo quieres, hay que revisarlo con calma.

**Funciones Pro (fake doors): 15 en la pestaña Pro + puertas dentro de las herramientas**
**Sin anuncios** · **Lecciones avanzadas** · Simulador de inversiones · Asistente con IA · Plan personalizado · Repaso inteligente · Escenarios históricos · Portafolio de ejemplo · Calculadoras avanzadas · Metas con recordatorios · **Trajes y accesorios para Capi** · Ligas y retos con amigos · Noticias explicadas fácil · Certificados · Resúmenes en PDF.
Además: Vidas ilimitadas y Racha protegida.
**Simulador** y **Asistente IA** aparecen en el menú con borde morado (sin etiqueta "PRO").

**Medición y legal**: Umami (visitas, correos, clics Pro) y plantilla de aviso de privacidad (`privacidad.html`).

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Página principal |
| `config.js` | **Lo que debes editar:** marca, Umami, destino de correos, anuncios, límites y precios en monedas |
| `lecciones-gratis.js` | Unidades 1–4 (lecciones gratis). Aquí editas o agregas lecciones |
| `lecciones-gratis-2.js` | Unidades 5–8 (lecciones gratis) |
| `lecciones-pro.js` | Las 16 lecciones solo Pro (2 por unidad); se agregan al final de cada unidad |
| `content.js` | Textos de las funciones Pro, glosario, test de riesgo e insignias |
| `app.js` | Núcleo: ruta, lecciones, vidas, racha, anuncios, Umami, aviso Pro |
| `mascota.js` | Dibujo de Capi (SVG), tarjeta, página *Mi mascota* y pantalla de evolución |
| `extras.js` | Reto diario, errores, calculadoras, glosario, test, tienda, logros, perfil |
| `styles.css` | Diseño (claro y oscuro) |
| `privacidad.html` | Aviso de privacidad (ya con tus datos y la mención de anuncios) |

## ¿La página sale en blanco?

Casi siempre es porque `index.html` se abrió **sin los demás archivos** (desde dentro del .zip, o desde la vista previa de archivos de un celular). Haz esto:

1. **Descomprime** el .zip completo.
2. Abre `index.html` desde la carpeta descomprimida (con todos los archivos juntos), o súbela a un hosting (sección 2).
3. En el celular no se pueden abrir archivos HTML sueltos de forma confiable: usa un hosting o la liga publicada.

Si aun así algo falla, la página muestra un aviso con el detalle técnico en vez de quedar vacía.

## 1. Probarlo en tu computadora

Desde la carpeta ejecuta `python3 -m http.server 8000` y entra a `http://localhost:8000`. (También funciona con doble clic en `index.html`.)
Mientras Umami esté sin configurar, los eventos se muestran en la consola del navegador (F12) con el prefijo `[umami:apagado]`, para que compruebes que todo se dispara.

## 2. Ponerle tu dominio

No puedo comprar ni conectar el dominio por ti; estos son los pasos:

1. **Compra el dominio** (Cloudflare Registrar, Namecheap, GoDaddy o NIC México para `.mx`).
2. **Sube la carpeta** a un hosting estático gratuito: Cloudflare Pages, Netlify o Vercel (en Netlify basta con arrastrar la carpeta completa).
3. **Agrega tu dominio** en el panel del hosting (*Custom domain*). Te indicará qué registros DNS crear; el HTTPS se activa solo.

## 3. Activar Umami (visitas, correos y clics)

1. Crea una cuenta en [cloud.umami.is](https://cloud.umami.is) (o usa tu propio servidor).
2. Agrega un sitio con tu dominio y copia su **Website ID**.
3. Pégalo en `config.js` → `umami.websiteId`. Si usas Umami propio, cambia también `umami.src`. Opcional: `umami.domains` para contar solo tu dominio.

**Qué verás y dónde**

| Pregunta | Dónde verla en Umami |
|---|---|
| ¿Cuánta gente visita el sitio? | *Overview* y *Pages* (`/aprender`, `/explorar`, `/calc/interes`, `/glosario`, `/tienda`, `/logros`, `/pro`, `/simulador`, `/asistente`, `/perfil`) |
| ¿Cuántos correos se registraron? | *Events* → `email-registrado` (solo el conteo; el correo **no** se manda a Umami) |
| ¿Qué opción Pro tuvo más clics? | *Events* → `pro-click` → propiedad `feature` |
| ¿Desde dónde hicieron clic? | *Events* → `pro-click` → propiedad `origen` (por ejemplo `pagina-pro`, `sin-vidas`, `limite-errores`, `leccion-u1l6`, `test-riesgo`, `calc-interes`) |
| ¿Cuánta gente vio cada aviso Pro? | *Events* → `pro-vista` → propiedad `feature` |
| ¿Qué función convierte mejor? | `email-registrado` ÷ `pro-click`, por `feature` |
| ¿Cuánta gente quiere quitar los anuncios? | *Events* → `pro-click` con `feature` = `sin-anuncios` (y `origen` = `anuncio`) |
| ¿Cuántos anuncios se ven y se tocan? | *Events* → `anuncio-visto` y `anuncio-click` → propiedad `tipo` (`propio` o `patrocinador`) |

Otros eventos: `anuncio-visto`, `anuncio-click`, `capi-evoluciona` (propiedad `nivel`), `leccion-iniciada`, `leccion-completada`, `sin-vidas`, `reto-diario-completado`, `repaso-errores-completado`, `herramienta-usada` (propiedad `tool`), `test-riesgo-completado`, `compra-tienda`, `insignia`.

Valores de `feature`: `simulador`, `asistente-ia`, `plan-personalizado`, `repaso-inteligente`, `escenarios-historicos`, `portafolio-sugerido`, `calc-avanzadas`, `metas-recordatorios`, `mascota-trajes`, `lecciones-audio`, `lecciones-offline`, `capi-recordatorios`, `estadisticas-avanzadas`, `temas-colores`, `ligas-amigos`, `noticias-simples`, `certificados`, `resumenes-pdf`, `cursos-avanzados`, `sin-anuncios`, `vidas-ilimitadas`, `racha-protegida` y `pro-general`.

## 4. Guardar los correos

Umami solo cuenta; no guarda correos. Para recibirlos:

1. Crea un formulario en [Formspree](https://formspree.io) (u otro servicio que acepte POST con JSON).
2. Pega su URL en `config.js` → `emailEndpoint` (algo como `https://formspree.io/f/xxxxxxx`).

Cada registro llega con `email`, `feature`, `source`, `brand` y `date`.
**Mientras `emailEndpoint` esté vacío, el correo no se guarda en ningún lado** (la persona vería el mensaje de éxito, así que configúralo antes de publicar).

## 5. Las puertas Pro (fake doors)

Todas abren el mismo aviso: dicen con claridad que la función **todavía no existe**, piden el correo (con casilla de consentimiento y enlace al aviso de privacidad) y prometen el cupón del 50 % (`couponPercent`).

| Dónde aparece | Qué abre |
|---|---|
| Pestaña *Simulador* (y sus escenarios históricos) | Simulador / Escenarios históricos |
| Pestaña *Asistente* | Asistente con IA |
| Pestaña *Pro* (15 tarjetas) | Cada función |
| Tocar una lección con candado y anillo morado | Lecciones avanzadas (`origen` = `leccion-<id>`) |
| Pantalla de anuncio → "🚫 Quitar anuncios" | Sin anuncios (`origen` = `anuncio`) |
| Pantalla de anuncio propio → "Conocer más" | La función anunciada (`origen` = `anuncio-propio`) |
| Quedarte sin vidas | Vidas ilimitadas |
| Segunda sesión de *Mis errores* en el día | Repaso inteligente |
| Resultado del test de riesgo | Portafolio de ejemplo / Plan personalizado |
| Calculadoras | Calculadoras avanzadas / Metas con recordatorios |
| Glosario | Resúmenes en PDF |
| Tienda | Vidas ilimitadas / Racha protegida |
| Logros y Perfil | Certificados / Ligas y retos |
| Al terminar lecciones y retos (rotación) | Simulador, Asistente, Plan, Escenarios, Ligas, Noticias |

**Las 6 puertas "silenciosas"** (borde morado, **sin** la palabra Pro; al tocarlas sale el aviso):

| Dónde | Función (`feature`) | `origen` en Umami |
|---|---|---|
| Tarjeta y página de Capi | `mascota-trajes` | `capi-tarjeta`, `capi-pagina` |
| *Aprender* → botón "Escuchar" | `lecciones-audio` | `aprender-audio` |
| *Aprender* → botón "Sin conexión" | `lecciones-offline` | `aprender-offline` |
| *Perfil* → "Estadísticas por tema" | `estadisticas-avanzadas` | `perfil-estadisticas` |
| *Perfil* → "Recordatorio diario" | `capi-recordatorios` | `perfil-recordatorios` |
| *Perfil* → apariencia "Más temas" | `temas-colores` | `perfil-temas` |

**Importante:** si prometes un cupón del 50 %, cúmplelo cuando lances la versión Pro.

## 6. Personalizar

- **Límites y precios**: `config.js` (vidas, minutos de recarga, sesiones de errores por día, monedas ganadas, costos de la tienda y la mascota Capi).
- **Lecciones**: edita `lecciones-gratis.js`, `lecciones-gratis-2.js` o `lecciones-pro.js`. Cada lección lleva 5 preguntas; tipos: `choice`, `tf`, `match`, `num`, `order`.
- **Qué es gratis y qué es Pro**: una lección es Pro si está en `lecciones-pro.js` (ahí se marca sola con `pro: true`). Para pasar una lección de Pro a gratis, muévela a su unidad en los otros archivos y quítale `pro: true`.
- **Anuncios**: `config.js` → `ads` (ver arriba). Para apagarlos todos: `enabled: false`.
- **Reiniciar tu progreso**: Perfil → *Reiniciar progreso*.
- El progreso se guarda en el navegador de cada persona (`localStorage`); no hay cuentas ni servidor. Si alguien tenía progreso guardado con el nombre anterior de la app, se conserva.

## Aviso

Es contenido **educativo**, no asesoría financiera. Los ejemplos del simulador y del asistente son ilustrativos y están marcados como tales en pantalla. `privacidad.html` ya tiene los datos del responsable; pide a un profesional que lo revise (por ejemplo, si la ley exige un domicilio completo) antes de promocionar el sitio.

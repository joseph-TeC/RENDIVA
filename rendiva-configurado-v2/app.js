/* ==========================================================================
   Rendiva — núcleo de la app (sin dependencias, sin build).
   Secciones: configuración · utilidades · analítica Umami · estado ·
              navegación · vistas base · sesiones de preguntas · modal Pro ·
              acciones y eventos · arranque
   Las funciones extra (explorar, calculadoras, glosario, tienda, logros,
   perfil…) viven en extras.js y se conectan por window.Rendiva.
   ========================================================================== */
(() => {
  "use strict";

  /* ------------------------------ Configuración ------------------------------ */
  const CFG = Object.assign(
    { brand: "Rendiva", umami: {}, emailEndpoint: "", privacyUrl: "privacidad.html", couponPercent: 50 },
    window.APP_CONFIG || {}
  );
  CFG.hearts = Object.assign({ max: 5, refillMinutes: 25 }, CFG.hearts || {});
  CFG.limits = Object.assign({ errorSessionsPerDay: 1, errorQuestions: 5, dailyQuestions: 5 }, CFG.limits || {});
  CFG.rewards = Object.assign({ lesson: 5, perfect: 3, daily: 10, errors: 5, badge: 10 }, CFG.rewards || {});
  CFG.shop = Object.assign({ heartsRefill: 40, streakFreeze: 60, xpBoost: 30, maxFreezes: 2 }, CFG.shop || {});
  CFG.quests = Object.assign({ xp: 10, lessons: 15, daily: 10 }, CFG.quests || {});
  CFG.ads = Object.assign({ enabled: true, every: 2, seconds: 5, sponsors: [] }, CFG.ads || {});
  CFG.ads.every = Math.max(1, CFG.ads.every | 0 || 2);
  const MCU = CFG.mascot || {};
  CFG.mascot = Object.assign({ name: "Capi", levelXp: [0, 60, 160, 320, 560, 900] }, MCU);
  CFG.mascot.perks = Object.assign({ lessonCoins: 1, heartMinutes: 20, shieldDays: 7, xpPercent: 10, dailyCoins: 5 }, MCU.perks || {});

  const COURSE = window.COURSE || [];
  const FEAT = window.FEATURES || {};
  const PRO_LIST = window.PRO_LIST || [];
  const MAX = CFG.hearts.max;
  const PCT = CFG.couponPercent;

  /* Índices de preguntas y lecciones (a cada pregunta se le asigna un id estable) */
  const QMAP = {};
  const LMAP = {};
  COURSE.forEach((u) => u.lessons.forEach((l) => {
    LMAP[l.id] = { lesson: l, unit: u };
    l.questions.forEach((q, i) => { q.id = l.id + "#" + (i + 1); QMAP[q.id] = { q, lesson: l, unit: u }; });
  }));

  /* ------------------------------ Utilidades ------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const rnd = (a) => a[Math.floor(Math.random() * a.length)];
  const money = (n) => "$" + Math.round(n).toLocaleString("es-MX");
  const fmtTime = (ms) => { const s = Math.ceil(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  function parseNum(s) {
    s = String(s).replace(/[$%\s]/g, "");
    if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, "");
    else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
    else s = s.replace(",", ".");
    const n = Number(s);
    return isFinite(n) ? n : NaN;
  }

  /* ------------------------------ Umami ------------------------------
     Eventos que se envían (el correo NUNCA se envía a Umami):
       pageview              cada vista (/aprender, /explorar, /calc/interes, /pro…)
       pro-vista             {feature}  alguien abrió una pantalla Pro
       pro-click             {feature, origen}  alguien intentó usar una función Pro
       email-registrado      {feature}  alguien dejó su correo
       leccion-iniciada / leccion-completada / sin-vidas
       reto-diario-completado, herramienta-usada {tool}, test-riesgo-completado {perfil},
       compra-tienda {item}, insignia {id}, capi-evoluciona {nivel}
       anuncio-visto {tipo}  se mostró el anuncio de cada 2 lecciones (tipo: propio | patrocinador)
       anuncio-click {tipo, anuncio}  tocaron un anuncio de patrocinador
       (quitar anuncios = pro-click con feature "sin-anuncios", origen "anuncio")
  ------------------------------------------------------------------------ */
  let umamiOn = false;
  const umQueue = [];
  const isLocal = /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname) || location.protocol === "file:";

  function umSend(job) {
    const u = window.umami;
    if (u && typeof u.track === "function") {
      try {
        if (job.k === "pv") u.track((p) => Object.assign({}, p, { url: job.path, title: job.title }));
        else u.track(job.name, job.data);
      } catch (e) { /* la analítica nunca debe romper la app */ }
      return true;
    }
    return false;
  }
  function emitUm(job) {
    if (isLocal) console.debug("[umami" + (umamiOn ? "" : ":apagado") + "]", job.k === "pv" ? "pageview " + job.path : job.name, job.data ? JSON.stringify(job.data) : "");
    if (!umamiOn) return;
    if (!umSend(job)) umQueue.push(job);
  }
  const track = (name, data) => emitUm({ k: "ev", name, data });
  const pageview = (path, title) => emitUm({ k: "pv", path, title });

  function loadUmami() {
    const u = CFG.umami || {};
    if (!u.websiteId) { console.info("[Rendiva] Umami apagado: falta websiteId en config.js"); return; }
    const s = document.createElement("script");
    s.defer = true;
    s.src = u.src || "https://cloud.umami.is/script.js";
    s.setAttribute("data-website-id", u.websiteId);
    s.setAttribute("data-auto-track", "false"); // las vistas las mandamos nosotros (la app usa #hash)
    if (u.domains) s.setAttribute("data-domains", u.domains);
    s.onload = () => { umQueue.splice(0).forEach(umSend); };
    document.head.appendChild(s);
    umamiOn = true;
  }

  /* ------------------------------ Estado ------------------------------ */
  const KEY = "rendiva:v1", OLD_KEY = "semilla:v2"; // OLD_KEY: migra el progreso guardado con el nombre anterior
  const DEF = {
    xp: 0, streak: 0, best: 0, last: null, hearts: MAX, heartBase: null,
    done: {}, days: {}, goal: 20, email: false, lessons: 0, perfect: 0,
    answered: 0, correct: 0, coins: 0, freezes: 0, freezeUsed: 0, boost: false,
    errors: [], errFixed: 0, dailyCount: 0, badges: {}, risk: null,
    calcSeen: {}, gloss: false, purchases: 0, theme: "auto", shieldAt: 0, shieldUsed: 0, adTick: 0, adShown: 0,
    today: { d: null, lessons: 0, daily: false, errors: 0, claimed: {} }
  };
  const fresh = () => JSON.parse(JSON.stringify(DEF));
  const S = Object.assign(fresh(), (() => { try { return JSON.parse(localStorage.getItem(KEY) || localStorage.getItem(OLD_KEY) || "{}"); } catch (e) { return {}; } })());
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* modo privado */ } }
  function resetState() {
    const keep = { email: S.email, theme: S.theme };
    Object.keys(S).forEach((k) => delete S[k]);
    Object.assign(S, fresh(), keep);
    save();
  }

  const dkey = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const today = () => dkey(new Date());
  const yest = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dkey(d); };
  const dayNum = (k) => { const p = k.split("-").map(Number); return Math.round(Date.UTC(p[0], p[1] - 1, p[2]) / 864e5); };
  const todayXp = () => S.days[today()] || 0;
  /* Capi: el nivel de la app es el nivel de la mascota */
  const PERK_LV = { coins: 2, heart: 3, shield: 4, xp: 5, daily: 6 }; // nivel en el que se desbloquea cada ventaja
  const mLevel = (xp) => { xp = xp == null ? S.xp : xp; const t = CFG.mascot.levelXp; let l = 1; for (let i = 1; i < t.length; i++) if (xp >= t[i]) l = i + 1; return l; };
  const level = () => mLevel();
  const hasPerk = (k) => mLevel() >= PERK_LV[k];
  const refillMin = () => (hasPerk("heart") ? Math.min(CFG.hearts.refillMinutes, CFG.mascot.perks.heartMinutes) : CFG.hearts.refillMinutes);
  const refillMs = () => refillMin() * 60000;
  const shieldReady = () => hasPerk("shield") && dayNum(today()) - (S.shieldAt || 0) >= CFG.mascot.perks.shieldDays;
  const shieldIn = () => Math.max(0, (S.shieldAt || 0) + CFG.mascot.perks.shieldDays - dayNum(today()));
  function mood() { if (S.last === today()) return "happy"; if (streakNow() > 0) return "worried"; return S.lessons > 0 ? "sleepy" : "happy"; }
  const streakNow = () => (S.last === today() || S.last === yest() ? S.streak : 0);

  function ensureToday() {
    if (!S.today || S.today.d !== today()) S.today = { d: today(), lessons: 0, daily: false, errors: 0, claimed: {} };
  }
  /* Si te perdiste días, las congelaciones de racha cubren los días faltantes */
  function syncStreak() {
    if (!S.last || !S.streak) return;
    const gap = dayNum(today()) - dayNum(S.last);
    if (gap <= 1) return;
    const missed = gap - 1;
    const useShield = shieldReady();                 // Capi cubre 1 día (nivel 4+, 1 vez por semana)
    const need = missed - (useShield ? 1 : 0);
    if (S.freezes >= need) {
      S.freezes -= need; S.freezeUsed += need;
      if (useShield) { S.shieldAt = dayNum(today()); S.shieldUsed = (S.shieldUsed || 0) + 1; S.shieldNote = true; }
      S.last = yest(); save();
    } else { S.streak = 0; save(); }
  }

  /* Vidas (límite del plan gratis) */
  function syncHearts() {
    if (S.hearts >= MAX) { S.heartBase = null; return false; }
    if (!S.heartBase) { S.heartBase = Date.now(); return false; }
    const gained = Math.floor((Date.now() - S.heartBase) / refillMs());
    if (gained > 0) {
      S.hearts = Math.min(MAX, S.hearts + gained);
      S.heartBase = S.hearts >= MAX ? null : S.heartBase + gained * refillMs();
      save();
      return true;
    }
    return false;
  }
  function loseHeart() { if (S.hearts >= MAX) S.heartBase = Date.now(); S.hearts = Math.max(0, S.hearts - 1); save(); }
  const nextHeartIn = () => (S.hearts >= MAX || !S.heartBase ? 0 : Math.max(0, S.heartBase + refillMs() - Date.now()));
  function refillHearts() { S.hearts = MAX; S.heartBase = null; save(); }

  function applyTheme() {
    const el = document.documentElement;
    if (S.theme === "light" || S.theme === "dark") el.setAttribute("data-theme", S.theme);
    else el.removeAttribute("data-theme");
  }

  /* ------------------------------ API pública (para extras.js) ------------------------------ */
  const listeners = {};
  const API = (window.Rendiva = {
    CFG, COURSE, FEAT, QMAP, LMAP, S, PCT, MAX,
    $, $$, esc, shuffle, rnd, money, fmtTime, parseNum,
    save, track, resetState, today, yest, todayXp, level, mLevel, hasPerk, shieldReady, shieldIn, mood, refillMin, streakNow, syncStreak, ensureToday,
    syncHearts, refillHearts, nextHeartIn, applyTheme,
    views: {},      // id -> { title(sub), html(sub), mount?(sub) }
    actions: {},    // data-action -> fn(el, event)
    evaluate() {},  // lo reemplaza extras.js (logros y misiones)
    takeNew() { return { badges: [], quests: [] }; },
    questsHTML() { return ""; },
    on(evt, fn) { (listeners[evt] = listeners[evt] || []).push(fn); },
    emit(evt, data) { (listeners[evt] || []).forEach((fn) => { try { fn(data); } catch (e) { console.error(e); } }); }
  });

  /* ------------------------------ Navegación ------------------------------ */
  const NAV = [
    { id: "aprender", label: "Aprender", short: "Aprender", ico: "🏠" },
    { id: "explorar", label: "Explorar", short: "Explorar", ico: "🧭", group: ["explorar", "calc", "glosario"] },
    { id: "capi", label: "Mi mascota", ico: "🐂" },
    { id: "simulador", label: "Simulador", short: "Simulador", ico: "📈", pb: true },   // pb = solo borde morado, sin etiqueta
    { id: "asistente", label: "Asistente IA", short: "Asistente", ico: "🤖", pb: true },
    { id: "tienda", label: "Tienda", ico: "🛍️" },
    { id: "logros", label: "Logros", ico: "🏅" },
    { id: "pro", label: "Pro", ico: "💎" },
    { id: "perfil", label: "Perfil", short: "Perfil", ico: "👤" }
  ];
  const isActive = (n, v) => n.id === v || (n.group || []).indexOf(v) >= 0;

  function route() {
    const parts = (location.hash || "").replace(/^#\/?/, "").split("/").filter(Boolean);
    const id = parts[0] && API.views[parts[0]] ? parts[0] : "aprender";
    return { id, sub: parts[1] || "" };
  }
  const go = (h) => { location.hash = h; };
  API.go = go;

  /* ------------------------------ Piezas comunes ------------------------------ */
  function statsHTML(compact) {
    return `<div class="stats">
      <span class="stat fire ${streakNow() ? "" : "off"}" title="Racha de días">🔥 ${streakNow()}</span>
      ${compact ? "" : `<span class="stat xp" title="XP total">⭐ ${S.xp}</span>`}
      <a class="stat coin" href="#/tienda" title="Monedas: ve a la tienda">🪙 ${S.coins}</a>
      <span class="stat heart" title="Vidas">❤️ ${S.hearts}</span>
    </div>`;
  }
  const navIco = (n) => (n.id === "capi" && window.CapiArt ? window.CapiArt(API.mLevel(), API.mood(), { size: 34, crop: "head", label: CFG.mascot.name }) : n.ico);
  const logoHTML = (n) => (window.CapiArt ? window.CapiArt(1, "happy", { size: n, crop: "head", label: CFG.brand }) : "🌱");
  function sidebarHTML(v) {
    return `<a class="logo" href="#/aprender"><span class="lg">${logoHTML(30)}</span>${esc(CFG.brand.toLowerCase())}</a>` +
      NAV.map((n) => `<a class="nav-item ${n.pb ? "pbn " : ""}${isActive(n, v) ? "on" : ""}" href="#/${n.id}"><span class="ico">${navIco(n)}</span><span class="label">${n.label}</span></a>`).join("");
  }
  function bottomHTML(v) {
    return NAV.filter((n) => n.short).map((n) => `<a class="bn-item ${n.pb ? "pbn " : ""}${isActive(n, v) ? "on" : ""}" href="#/${n.id}"${isActive(n, v) ? ' aria-current="page"' : ""}><span class="ico">${n.ico}</span>${n.short}</a>`).join("");
  }
  function railHTML() {
    const td = todayXp(), pct = Math.min(100, Math.round((td / S.goal) * 100));
    return statsHTML(false) + (API.mascot ? API.mascot.cardHTML("rail") : "") +
      `<div class="card"><h3>Meta diaria</h3>
        <div class="goal-row"><div class="ring" style="--p:${pct}" data-label="${Math.min(td, S.goal)}/${S.goal}"></div>
        <p style="margin:0">${pct >= 100 ? "¡Meta cumplida! 🎉" : "Gana " + S.goal + " XP hoy para mantener tu ritmo."}</p></div></div>` +
      API.questsHTML() +
      (S.hearts < MAX
        ? `<div class="card"><h3>❤️ Vidas ${S.hearts}/${MAX}</h3><p>Próxima vida en <b data-countdown>${fmtTime(nextHeartIn())}</b></p>
           <div class="stack-sm mt"><button class="btn block" data-action="buy" data-item="hearts">Recargar · ${CFG.shop.heartsRefill} 🪙</button>
           <button class="btn pro block" data-action="pro" data-feature="vidas-ilimitadas" data-origin="rail">Vidas ilimitadas</button></div></div>`
        : "") +
      `<div class="card pro-card"><h3>💎 ${esc(CFG.brand)} Pro</h3>
        <p>Estamos preparando el simulador, el asistente con IA y más. Únete a la lista de espera y recibe ${PCT}% de descuento.</p>
        <button class="btn pro block mt" data-action="pro" data-feature="pro-general" data-origin="rail">Quiero mi ${PCT}%</button></div>`;
  }
  const topbarHTML = () => `<div class="topbar"><a class="brand" href="#/aprender"><span class="lg">${logoHTML(26)}</span>${esc(CFG.brand.toLowerCase())}</a>${statsHTML(true)}<a class="pro-pill" href="#/pro">💎 PRO</a></div>`;

  /* ------------------------------ Vista: Aprender ------------------------------ */
  function learnHTML() {
    const td = todayXp(), pct = Math.min(100, Math.round((td / S.goal) * 100));
    let out = (API.mascot ? API.mascot.learnTopHTML() : "") + `<div class="card goal-mini mobile-only"><div class="gm-row"><span>Meta diaria</span><span>${Math.min(td, S.goal)}/${S.goal} XP</span></div>
      <div class="bar"><i style="width:${pct}%;background:var(--gold)"></i></div></div>`;
    let prevDone = true;
    COURSE.forEach((u, ui) => {
      const free = u.lessons.filter((l) => !l.pro);
      const doneN = free.filter((l) => S.done[l.id]).length;
      out += `<section class="unit" style="--u:${u.color};--ud:${u.dark}">
        <div class="unit-head"><div><div class="kick">UNIDAD ${ui + 1} · ${doneN}/${free.length}</div><h2>${esc(u.title)}</h2><p>${esc(u.desc)}</p></div></div>
        <div class="nodes">`;
      u.lessons.forEach((l, li) => {
        const done = !!S.done[l.id];
        let st;
        if (l.pro) st = "pro";                 // lección solo Pro: candado + borde morado, sin etiqueta
        else if (done) st = "done";
        else if (prevDone) st = "current";
        else st = "locked";
        if (!l.pro) prevDone = done;           // las lecciones Pro no bloquean el avance gratis
        const x = [0, 34, 52, 34, 0, -34, -52, -34][li % 8];
        const locked = st === "locked" || st === "pro";
        out += `<div class="node-wrap" style="--x:${x}">
          ${st === "current" ? '<div class="start-bubble">EMPEZAR</div>' : ""}
          <button class="node ${st}" data-action="lesson" data-id="${l.id}" data-unit="${u.id}" data-state="${st}" aria-label="${esc(l.title)}${locked ? " (bloqueada)" : ""}">${locked ? "🔒" : l.icon}</button>
          <div class="node-label">${esc(l.title)}</div></div>`;
      });
      out += `</div></section>`;
    });
    out += `<p class="legal">Contenido educativo. No es asesoría financiera, fiscal ni legal. Invertir implica riesgos y puedes perder dinero.</p>`;
    return out;
  }

  /* ------------------------------ Vista: Simulador (puerta Pro) ------------------------------ */
  function simHTML() {
    const assets = [
      { i: "🏛️", n: "Bono de gobierno a corto plazo", m: "Renta fija", r: "low", rt: "Riesgo bajo" },
      { i: "🌎", n: "Fondo indexado global", m: "ETF", r: "mid", rt: "Riesgo medio" },
      { i: "💻", n: "Acciones de tecnología", m: "Acciones", r: "high", rt: "Riesgo alto" },
      { i: "🏢", n: "FIBRA de oficinas", m: "Inmuebles", r: "mid", rt: "Riesgo medio" }
    ];
    const scen = ["Crisis financiera global", "Caída por una pandemia", "Recuperación tras una crisis", "Años de inflación alta"];
    return `<div class="page-head"><h1>Simulador</h1><span class="tag-pb">VISTA PREVIA</span></div>
      <p class="lead">Practica con dinero virtual, sin arriesgar nada. Así se verá el simulador que estamos preparando.</p>
      <div class="stack">
        <div class="card">
          <div class="sim-balance"><div><div class="sub">Saldo virtual de ejemplo</div><div class="amt">$100,000.00</div></div><div class="sub">Ejemplo ilustrativo</div></div>
          <svg class="spark" viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70 C30 60 50 66 80 50 S130 55 160 38 S220 44 250 24 S285 20 300 12" fill="none" stroke="var(--brand)" stroke-width="4" stroke-linecap="round"/></svg>
        </div>
        <div class="card"><h3>Escenarios históricos</h3><p>Prueba tu portafolio en momentos clave de los mercados.</p>
          <div class="chips mt">${scen.map((s) => `<button class="chip" data-action="pro" data-feature="escenarios-historicos" data-origin="simulador-escenario">${esc(s)}</button>`).join("")}</div></div>
        ${assets.map((a) => `<div class="asset"><div class="ai">${a.i}</div><div class="info"><div class="nm">${a.n}</div><div class="meta">${a.m}<span class="risk ${a.r}">${a.rt}</span></div></div>
          <button class="btn blue" data-action="pro" data-feature="simulador" data-origin="comprar">Comprar</button></div>`).join("")}
        <div class="sim-actions">
          <button class="btn" data-action="pro" data-feature="simulador" data-origin="historial">Mi historial</button>
          <button class="btn" data-action="pro" data-feature="simulador" data-origin="reiniciar">Reiniciar</button>
        </div>
        <button class="btn pro block" data-action="pro" data-feature="simulador" data-origin="cta-principal">Probar el simulador</button>
      </div>`;
  }

  /* ------------------------------ Vista: Asistente IA (puerta Pro) ------------------------------ */
  function chatHTML() {
    const chips = ["¿Cómo empiezo con $500?", "Explícame los CETES", "¿Cuánto debería ahorrar?", "¿Qué es el riesgo?"];
    return `<div class="page-head"><h1>Asistente</h1><span class="tag-pb">PRÓXIMAMENTE</span></div>
      <p class="lead">Pregunta lo que quieras sobre inversiones y recibe respuestas claras, a tu ritmo.</p>
      <p class="sample-label">Ejemplo de cómo responderá</p>
      <div class="chat">
        <div class="bubble user">¿Qué es un ETF y por qué todos hablan de ellos?</div>
        <div class="bot-row"><span class="bot-av">🤖</span><div class="bubble bot">Un ETF es un fondo que cotiza en bolsa y agrupa muchos activos. Con una sola compra te expones a muchas empresas a la vez, lo que ayuda a diversificar. Eso sí: también sube y baja con el mercado.</div></div>
        <div class="chips">${chips.map((c) => `<button class="chip" data-action="pro" data-feature="asistente-ia" data-origin="sugerencia">${esc(c)}</button>`).join("")}</div>
        <button class="fake-input" data-action="pro" data-feature="asistente-ia" data-origin="escribir"><span>Escribe tu pregunta…</span><span class="send">Enviar</span></button>
      </div>
      <p class="legal">El asistente explicará conceptos con fines educativos. No ofrecerá asesoría financiera personalizada.</p>`;
  }

  /* ------------------------------ Vista: Pro ------------------------------ */
  function proHTML() {
    const cnt = (pro) => COURSE.reduce((a, u) => a + u.lessons.filter((l) => !!l.pro === pro).length, 0);
    const freeL = cnt(false), proL = cnt(true);
    return `<div class="page-head"><h1>${esc(CFG.brand)} Pro</h1></div>
      <div class="hero-pro"><h1>Estamos preparando la versión Pro</h1>
        <p>Únete a la lista de espera: te avisamos cuando salga y recibes un cupón de ${PCT}% de descuento.</p>
        <button class="btn block" data-action="pro" data-feature="pro-general" data-origin="hero">Quiero mi ${PCT}%</button></div>
      <h3 class="sec-title">¿Qué función quieres primero?</h3>
      <div class="stack">${PRO_LIST.map((id) => { const f = FEAT[id]; if (!f) return ""; return `<button class="feat" data-action="pro" data-feature="${id}" data-origin="pagina-pro"><span class="fi">${f.icon}</span><span><b>${esc(f.title)}</b><span>${esc(f.short)}</span></span><span class="go">Me interesa</span></button>`; }).join("")}</div>
      <h3 class="sec-title">Gratis y Pro</h3>
      <div class="compare">
        <div class="card"><h3>Gratis, siempre</h3><ul class="ticks">
          <li>${freeL} lecciones en ${COURSE.length} unidades</li><li>Reto diario y misiones</li><li>3 calculadoras</li><li>Glosario de ${(window.GLOSSARY || []).length} términos</li><li>Test de perfil de riesgo</li><li>Logros, monedas y tienda</li><li>${MAX} vidas que se recargan solas</li>${CFG.ads.enabled ? `<li>Un anuncio cada ${CFG.ads.every} lecciones</li>` : ""}</ul></div>
        <div class="card pro-card"><h3>Pro (próximamente)</h3><ul class="ticks">
          ${CFG.ads.enabled ? "<li>Sin anuncios</li>" : ""}<li>${proL} lecciones avanzadas (${Math.round(proL / COURSE.length)} por unidad)</li><li>Simulador y escenarios históricos</li><li>Asistente con IA</li><li>Plan personalizado</li><li>Repaso inteligente ilimitado</li><li>Vidas y congelaciones ilimitadas</li><li>Certificados y fichas en PDF</li></ul></div>
      </div>
      <button class="btn pro block mt-lg" data-action="pro" data-feature="pro-general" data-origin="pagina-pro-final">Avísenme y quiero mi ${PCT}%</button>`;
  }

  API.views.aprender = { title: () => "Aprender", html: learnHTML };
  API.views.simulador = { title: () => "Simulador", html: simHTML };
  API.views.asistente = { title: () => "Asistente", html: chatHTML };
  API.views.pro = { title: () => "Pro", html: proHTML };

  /* ------------------------------ Render y ruteo ------------------------------ */
  let scrolledOnce = false;
  function render() {
    syncHearts();
    const { id, sub } = route();
    const v = API.views[id];
    $("#sidebar").innerHTML = sidebarHTML(id);
    $("#bottomnav").innerHTML = bottomHTML(id);
    $("#rail").innerHTML = railHTML();
    $("#main").innerHTML = topbarHTML() + v.html(sub);
    if (v.mount) v.mount(sub);
  }
  API.render = render;

  function onRoute() {
    const { id, sub } = route();
    const v = API.views[id];
    window.scrollTo(0, 0);
    render();
    document.title = v.title(sub) + " · " + CFG.brand;
    pageview("/" + id + (sub ? "/" + sub : ""), document.title);
    if (id === "simulador") track("pro-vista", { feature: "simulador" });
    if (id === "asistente") track("pro-vista", { feature: "asistente-ia" });
    if (id === "pro") track("pro-vista", { feature: "pagina-pro" });
    if (id === "aprender" && !scrolledOnce) {
      scrolledOnce = true;
      const n = $(".node.current");
      if (n && S.lessons > 0) n.scrollIntoView({ block: "center" });
    }
    API.emit("route", { id, sub });
  }

  /* ------------------------------ Sesiones de preguntas ------------------------------
     kind: "lesson" (cuesta vidas) · "daily" (reto diario) · "errors" (repaso de errores)
  ------------------------------------------------------------------------------------ */
  let sess = null;
  let noHeartsOpen = false;

  function startSession(o) {
    sess = {
      kind: o.kind, title: o.title, lessonId: o.lessonId || null, noHearts: !!o.noHearts,
      queue: o.questions.map((q) => ({ q, retry: false, failed: false })),
      total: o.questions.length, right: 0, mistakes: 0, phase: "ask", cur: null, sel: null, lock: false
    };
    const el = $("#session");
    el.hidden = false;
    document.body.classList.add("noscroll");
    el.innerHTML = `<div class="s-top"><button class="s-x" data-action="quit" aria-label="Salir">✕</button>
      <div class="bar"><i id="sBar"></i></div>${sess.noHearts ? '<span class="s-tag">Práctica</span>' : '<span class="s-hearts">❤️ <span id="sHearts"></span></span>'}</div>
      <div class="s-body" id="sBody"></div><div class="s-foot" id="sFoot"></div>`;
    nextQ();
  }
  API.startSession = startSession;

  function startLesson(id) {
    syncHearts();
    if (S.hearts <= 0) { showNoHearts(); return; }
    const L = LMAP[id];
    if (!L) return;
    track("leccion-iniciada", { leccion: id });
    startSession({ kind: "lesson", lessonId: id, title: L.lesson.title, questions: L.lesson.questions });
  }

  function nextQ() {
    if (!sess.queue.length) { finish(); return; }
    const item = sess.queue.shift();
    sess.cur = item; sess.phase = "ask"; sess.sel = null; sess.ok = false; sess.numVal = ""; sess.matchMistake = false; sess.lock = false;
    const q = item.q;
    if (q.t === "choice") sess.opts = shuffle(q.options.map((t, i) => ({ t, ok: i === q.a })));
    else if (q.t === "tf") sess.opts = [{ t: "Verdadero", ok: q.a === true }, { t: "Falso", ok: q.a === false }];
    else if (q.t === "match") {
      sess.mLeft = shuffle(q.pairs.map((p, i) => ({ t: p[0], i })));
      sess.mRight = shuffle(q.pairs.map((p, i) => ({ t: p[1], i })));
      sess.matched = new Set(); sess.pickL = null; sess.pickR = null;
    } else if (q.t === "order") {
      let pool;
      do { pool = shuffle(q.items.map((t, i) => ({ t, i }))); } while (pool.length > 1 && pool.every((p, i) => p.i === i));
      sess.pool = pool; sess.placed = [];
    }
    paintQ();
  }

  function optsHTML() {
    return `<div class="opts" role="radiogroup">` + sess.opts.map((o, i) => {
      let cls = "opt";
      if (sess.phase === "ask" && sess.sel === i) cls += " sel";
      if (sess.phase === "fb") { if (o.ok) cls += " ok"; else if (sess.sel === i) cls += " bad"; }
      return `<button class="${cls}" data-action="pick" data-i="${i}" role="radio" aria-checked="${sess.sel === i}" ${sess.phase === "fb" ? "disabled" : ""}><span class="k">${i + 1}</span><span>${esc(o.t)}</span></button>`;
    }).join("") + `</div>`;
  }
  function matchHTML() {
    const col = (arr, side) => arr.map((it) => {
      let c = "m-item";
      if (sess.matched.has(it.i)) c += " done"; else if (sess["pick" + side] === it.i) c += " sel";
      return `<button class="${c}" data-action="m${side}" data-i="${it.i}">${esc(it.t)}</button>`;
    }).join("");
    return `<p class="q-hint">Toca un término y luego su pareja</p><div class="match"><div class="col">${col(sess.mLeft, "L")}</div><div class="col">${col(sess.mRight, "R")}</div></div>`;
  }
  function numHTML(q) {
    const ro = sess.phase === "fb" ? "readonly" : "";
    return `<div class="num-wrap">${q.prefix ? `<span>${esc(q.prefix)}</span>` : ""}<input id="numIn" type="text" inputmode="decimal" autocomplete="off" aria-label="Tu respuesta" placeholder="Tu respuesta" value="${esc(sess.numVal)}" ${ro}>${q.suffix ? `<span>${esc(q.suffix)}</span>` : ""}</div>`;
  }
  function orderHTML(q) {
    const fb = sess.phase === "fb";
    const n = q.items.length;
    let slots = "";
    for (let pos = 0; pos < n; pos++) {
      if (pos < sess.placed.length) {
        const idx = sess.placed[pos];
        const cls = fb ? (idx === pos ? " ok" : " bad") : "";
        slots += `<button class="ord-item${cls}" data-action="oUn" data-pos="${pos}" ${fb ? "disabled" : ""}><span class="n">${pos + 1}</span><span>${esc(q.items[idx])}</span></button>`;
      } else {
        slots += `<div class="ord-slot"><span class="n">${pos + 1}</span></div>`;
      }
    }
    const pool = sess.pool.filter((p) => sess.placed.indexOf(p.i) < 0)
      .map((p) => `<button class="ord-chip" data-action="oPick" data-i="${p.i}" ${fb ? "disabled" : ""}>${esc(p.t)}</button>`).join("");
    return `<p class="q-hint">Toca los elementos en el orden correcto</p><div class="ord-list">${slots}</div><div class="ord-pool">${pool}</div>`;
  }

  function paintTop() {
    const pct = Math.round((sess.right / sess.total) * 100);
    const bar = $("#sBar"); if (bar) bar.style.width = pct + "%";
    const h = $("#sHearts"); if (h) h.textContent = S.hearts;
  }
  function paintQ() {
    const q = sess.cur.q;
    let html = `<h1 class="q-title">${esc(q.q)}</h1>`;
    if (q.t === "choice" || q.t === "tf") html += optsHTML();
    else if (q.t === "num") html += numHTML(q);
    else if (q.t === "match") html += matchHTML();
    else if (q.t === "order") html += orderHTML(q);
    $("#sBody").innerHTML = html;
    paintFoot();
    paintTop();
    if (q.t === "num" && sess.phase === "ask") setTimeout(() => { const i = $("#numIn"); if (i) i.focus(); }, 40);
  }
  function correctText() {
    const q = sess.cur.q;
    if (q.t === "num") return (q.prefix || "") + q.a.toLocaleString("es-MX") + (q.suffix || "");
    if (q.t === "order") return q.items.map((t, i) => (i + 1) + ". " + t).join("\n");
    const o = sess.opts && sess.opts.find((x) => x.ok);
    return o ? o.t : "";
  }
  function paintFoot() {
    const f = $("#sFoot"); const q = sess.cur.q;
    if (sess.phase === "ask") {
      f.className = "s-foot";
      let ready;
      if (q.t === "match") ready = false;
      else if (q.t === "num") ready = ($("#numIn") && $("#numIn").value.trim()) !== "";
      else if (q.t === "order") ready = sess.placed.length === q.items.length;
      else ready = sess.sel !== null;
      f.innerHTML = `<div class="in"><span></span><button class="btn primary" id="checkBtn" data-action="check" ${ready ? "" : "disabled"}>Comprobar</button></div>`;
    } else {
      f.className = "s-foot " + (sess.ok ? "ok" : "bad");
      let head, detail;
      if (sess.ok) { head = rnd(["¡Correcto!", "¡Muy bien!", "¡Exacto!"]); detail = esc(q.exp); }
      else if (q.t === "match") { head = "¡Lo lograste!"; detail = "Con algunos intentos. " + esc(q.exp); }
      else { head = q.t === "order" ? "Este es el orden correcto" : "Respuesta correcta"; detail = `<strong>${esc(correctText()).replace(/\n/g, "<br>")}</strong><br>${esc(q.exp)}`; }
      f.innerHTML = `<div class="in"><div class="fb" role="status"><b>${head}</b><span>${detail}</span></div><button class="btn" id="contBtn" data-action="continue">Continuar</button></div>`;
    }
  }

  function noteError(id) {
    if (!id || S.errors.indexOf(id) >= 0) return;
    S.errors.push(id);
    if (S.errors.length > 40) S.errors.shift();
  }
  function clearError(id) { const i = S.errors.indexOf(id); if (i >= 0) S.errors.splice(i, 1); }

  function pick(i) {
    if (!sess || sess.phase !== "ask") return;
    const q = sess.cur.q;
    if (q.t !== "choice" && q.t !== "tf") return;
    if (i < 0 || i >= sess.opts.length) return;
    sess.sel = i;
    paintQ();
  }
  function check() {
    if (!sess || sess.phase !== "ask") return;
    const q = sess.cur.q;
    let ok = false;
    if (q.t === "choice" || q.t === "tf") { if (sess.sel === null) return; ok = sess.opts[sess.sel].ok; }
    else if (q.t === "num") {
      const inp = $("#numIn"); if (!inp || !inp.value.trim()) return;
      sess.numVal = inp.value;
      ok = Math.abs(parseNum(inp.value) - q.a) <= (q.tol || 0.01);
    } else if (q.t === "order") {
      if (sess.placed.length !== q.items.length) return;
      ok = sess.placed.every((idx, pos) => idx === pos);
    } else return;
    settle(ok);
  }
  function settle(ok) {
    const item = sess.cur, q = item.q;
    sess.phase = "fb"; sess.ok = ok;
    S.answered++; if (ok) S.correct++;
    if (q.t === "match") {
      sess.right++;
      if (!ok) { sess.mistakes++; if (!sess.noHearts) loseHeart(); if (sess.kind !== "errors") noteError(q.id); }
      else if (sess.kind === "errors" && !item.failed) { clearError(q.id); S.errFixed++; }
    } else if (ok) {
      sess.right++;
      if (sess.kind === "errors" && !item.failed) { clearError(q.id); S.errFixed++; }
    } else {
      sess.mistakes++;
      if (!sess.noHearts) loseHeart();
      if (sess.kind !== "errors") noteError(q.id);
      if (!item.retry) sess.queue.push({ q, retry: true, failed: true });
    }
    save();
    paintQ();
  }
  function matchPick(side, i) {
    if (!sess || sess.phase !== "ask" || sess.lock) return;
    const q = sess.cur.q;
    sess["pick" + side] = sess["pick" + side] === i ? null : i;
    if (sess.pickL !== null && sess.pickR !== null) {
      if (sess.pickL === sess.pickR) {
        sess.matched.add(sess.pickL); sess.pickL = null; sess.pickR = null;
        paintQ();
        if (sess.matched.size === q.pairs.length) { sess.lock = true; setTimeout(() => { if (sess) settle(!sess.matchMistake); }, 350); }
      } else {
        sess.matchMistake = true; sess.lock = true;
        const a = $(`[data-action="mL"][data-i="${sess.pickL}"]`), b = $(`[data-action="mR"][data-i="${sess.pickR}"]`);
        if (a) a.classList.add("bad");
        if (b) b.classList.add("bad");
        setTimeout(() => { if (!sess) return; sess.pickL = null; sess.pickR = null; sess.lock = false; paintQ(); }, 450);
      }
    } else {
      paintQ();
    }
  }
  function orderPick(i) {
    if (!sess || sess.phase !== "ask" || sess.cur.q.t !== "order") return;
    if (sess.placed.indexOf(i) >= 0) return;
    sess.placed.push(i);
    paintQ();
  }
  function orderUn(pos) {
    if (!sess || sess.phase !== "ask" || sess.cur.q.t !== "order") return;
    sess.placed.splice(pos, 1);
    paintQ();
  }
  function cont() {
    if (!sess || sess.phase !== "fb") return;
    if (!sess.noHearts && S.hearts <= 0) { track("sin-vidas", { leccion: sess.lessonId }); showNoHearts(); return; }
    nextQ();
  }

  function finish() {
    const s = sess;
    const t = today();
    ensureToday(); syncStreak();
    const perfect = s.mistakes === 0;
    const lvBefore = mLevel();
    let xp, coins;
    if (s.kind === "lesson") {
      xp = S.done[s.lessonId] ? 5 : 10; if (perfect) xp += 5;
      coins = CFG.rewards.lesson + (perfect ? CFG.rewards.perfect : 0);
    } else if (s.kind === "daily") {
      xp = 10 + (perfect ? 5 : 0); coins = CFG.rewards.daily;
    } else { xp = 5; coins = CFG.rewards.errors; }
    let boosted = false;
    if (s.kind === "lesson" && S.boost) { xp *= 2; S.boost = false; boosted = true; }
    let capiXp = 0, capiCoins = 0;                    // ventajas de la mascota
    if (hasPerk("xp")) { capiXp = Math.max(1, Math.round((xp * CFG.mascot.perks.xpPercent) / 100)); xp += capiXp; }
    if (s.kind === "lesson" && hasPerk("coins")) capiCoins += CFG.mascot.perks.lessonCoins;
    if (s.kind === "daily" && hasPerk("daily")) capiCoins += CFG.mascot.perks.dailyCoins;
    coins += capiCoins;
    const acc = Math.max(0, Math.round(((s.total - Math.min(s.mistakes, s.total)) / s.total) * 100));

    if (S.last !== t) { S.streak = S.last === yest() ? S.streak + 1 : 1; S.last = t; }
    S.best = Math.max(S.best || 0, S.streak);
    S.xp += xp; S.days[t] = (S.days[t] || 0) + xp; S.coins += coins;
    const lvAfter = mLevel();
    if (lvAfter > lvBefore) track("capi-evoluciona", { nivel: lvAfter });
    if (s.kind === "lesson") {
      S.done[s.lessonId] = { n: ((S.done[s.lessonId] && S.done[s.lessonId].n) || 0) + 1 };
      S.lessons++; S.today.lessons++; if (perfect) S.perfect++;
    } else if (s.kind === "daily") { S.today.daily = true; S.dailyCount++; }
    else { S.today.errors++; }
    let adDue = false;                                // anuncio cada N lecciones completadas
    if (s.kind === "lesson" && CFG.ads.enabled) {
      S.adTick = (S.adTick || 0) + 1;
      if (S.adTick >= CFG.ads.every) { S.adTick = 0; adDue = true; }
    }
    adPending = adDue;
    save();

    if (s.kind === "lesson") track("leccion-completada", { leccion: s.lessonId, errores: s.mistakes });
    else if (s.kind === "daily") track("reto-diario-completado", { errores: s.mistakes });
    else track("repaso-errores-completado", { errores: s.mistakes });

    API.evaluate();
    const fresh2 = API.takeNew();

    let promo = "";
    if (!adDue && !S.email && ((s.kind === "lesson" && S.lessons % 2 === 0) || s.kind === "daily")) {
      const rot = window.PROMO_ROTATION || ["simulador"];
      const fid = s.kind === "daily" ? "ligas-amigos" : rot[(S.lessons / 2 - 1 + rot.length * 4) % rot.length];
      const f = FEAT[fid] || FEAT["pro-general"];
      promo = `<div class="card pro-card"><h3>${f.icon} ${esc(f.title)}</h3><p>${esc(f.short)} Déjanos tu correo y recibe ${PCT}% de descuento cuando salga.</p>
        <button class="btn pro block mt" data-action="pro" data-feature="${FEAT[fid] ? fid : "pro-general"}" data-origin="fin-${s.kind}">Quiero saber más</button></div>`;
    }
    const titles = { lesson: ["🎉", "¡Lección completada!"], daily: ["⚡", "¡Reto diario completado!"], errors: ["🩹", "¡Buen repaso!"] }[s.kind];
    const extra = [];
    if (lvAfter > lvBefore && API.mascot) extra.push(API.mascot.evolveHTML(lvAfter));
    extra.push(`<div class="reward-row"><span class="pill coin">+${coins} 🪙</span>${boosted ? '<span class="pill xp">⚡ XP x2</span>' : ""}${capiXp || capiCoins ? `<span class="pill capi">🐂 ${esc(CFG.mascot.name)}: ${capiXp ? "+" + capiXp + " XP" : ""}${capiXp && capiCoins ? " · " : ""}${capiCoins ? "+" + capiCoins + " 🪙" : ""}</span>` : ""}</div>`);
    fresh2.badges.forEach((b) => extra.push(`<div class="reward-card"><span class="ri">${b.icon}</span><span><b>Nueva insignia: ${esc(b.title)}</b><span>${esc(b.desc)} · +${CFG.rewards.badge} 🪙</span></span></div>`));
    fresh2.quests.forEach((qq) => extra.push(`<div class="reward-card"><span class="ri">🎯</span><span><b>Misión cumplida</b><span>${esc(qq.title)} · +${qq.reward} 🪙</span></span></div>`));
    $("#session").innerHTML = `<div class="center-screen">
      <div class="big">${titles[0]}</div><h1>${titles[1]}</h1><p>${esc(s.title)}</p>
      <div class="res"><div class="tile x"><b>+${xp}</b><span>XP</span></div><div class="tile p"><b>${acc}%</b><span>Precisión</span></div><div class="tile s"><b>${streakNow()}</b><span>Racha 🔥</span></div></div>
      ${extra.join("")}
      ${promo}
      <div class="actions"><button class="btn primary block" data-action="finish-session">Continuar</button></div></div>`;
    sess = null;
  }

  /* ------------------------------ Anuncios (cada N lecciones) ------------------------------
     Se muestran al pulsar "Continuar" en la pantalla de lección completada, una vez cada
     CFG.ads.every lecciones. Si en config.js hay patrocinadores (ads.sponsors) se muestran
     esos; si no, se muestran anuncios propios de funciones Pro. "Quitar anuncios" abre
     la puerta Pro "sin-anuncios".
  ------------------------------------------------------------------------------------------ */
  let adPending = false;
  let adTimer = null;

  function pickAd() {
    const n = S.adShown || 0;
    const sp = (CFG.ads.sponsors || []).filter((a) => a && a.title && /^https?:\/\//i.test(a.url || ""));
    if (sp.length) {
      const a = sp[n % sp.length];
      return {
        kind: "patrocinador", name: a.title,
        html: `<div class="ad-house"><div class="ad-ico">${esc(a.icon || "📣")}</div><h2>${esc(a.title)}</h2>${a.text ? `<p>${esc(a.text)}</p>` : ""}
          <a class="btn blue" href="${esc(a.url)}" target="_blank" rel="sponsored noopener noreferrer" data-action="ad-click" data-ad="${esc(a.title)}">${esc(a.button || "Ver más")}</a></div>`
      };
    }
    const rot = (window.PROMO_ROTATION || []).filter((id) => FEAT[id]);
    const fid = rot.length ? rot[n % rot.length] : "pro-general";
    const f = FEAT[fid] || FEAT["pro-general"];
    return {
      kind: "propio", name: fid,
      html: `<div class="ad-house"><div class="ad-ico">${f.icon}</div><h2>${esc(f.title)}</h2><p>${esc(f.short)}</p>
        <button class="pb" data-action="pro" data-feature="${esc(fid)}" data-origin="anuncio-propio">Conocer más</button></div>`
    };
  }

  function showAd() {
    const ad = pickAd();
    S.adShown = (S.adShown || 0) + 1; save();
    track("anuncio-visto", { tipo: ad.kind });
    let secs = Math.max(0, CFG.ads.seconds | 0);
    const el = $("#session");
    el.hidden = false;
    document.body.classList.add("noscroll");
    el.innerHTML = `<div class="center-screen ad-screen">
      <span class="ad-tag">ANUNCIO</span>
      <div class="ad-slot">${ad.html}</div>
      <button class="pb block ad-noads" data-action="pro" data-feature="sin-anuncios" data-origin="anuncio">🚫 Quitar anuncios</button>
      <button class="btn primary block" id="adGo" data-action="close-session" ${secs ? "disabled" : ""}>${secs ? "Continuar en " + secs : "Continuar"}</button></div>`;
    clearInterval(adTimer);
    if (secs) {
      adTimer = setInterval(() => {
        const b = $("#adGo");
        secs--;
        if (!b) { clearInterval(adTimer); return; }
        if (secs <= 0) { clearInterval(adTimer); b.disabled = false; b.textContent = "Continuar"; }
        else b.textContent = "Continuar en " + secs;
      }, 1000);
    }
  }

  function showNoHearts() {
    noHeartsOpen = true;
    const el = $("#session");
    el.hidden = false;
    document.body.classList.add("noscroll");
    const canBuy = S.coins >= CFG.shop.heartsRefill;
    el.innerHTML = `<div class="center-screen"><div class="big">💔</div><h1>Te quedaste sin vidas</h1>
      <p>Recuperas 1 vida cada ${refillMin()} minutos${hasPerk("heart") ? " (ventaja de " + CFG.mascot.name + ")" : ""}. La próxima llega en <b data-countdown>${fmtTime(nextHeartIn())}</b>.</p>
      <div class="actions">
        <button class="btn ${canBuy ? "primary" : ""} block" data-action="buy" data-item="hearts" ${canBuy ? "" : "disabled"}>Recargar vidas · ${CFG.shop.heartsRefill} 🪙${canBuy ? "" : " (tienes " + S.coins + ")"}</button>
        <button class="btn pro block" data-action="pro" data-feature="vidas-ilimitadas" data-origin="sin-vidas">Vidas ilimitadas · Pro</button>
        <button class="btn block" data-action="close-session">Salir y esperar</button></div></div>`;
    sess = null;
  }
  API.showNoHearts = showNoHearts;

  function closeSession() {
    const el = $("#session");
    el.hidden = true; el.innerHTML = "";
    document.body.classList.remove("noscroll");
    sess = null; noHeartsOpen = false; adPending = false;
    clearInterval(adTimer);
    render();
  }
  API.closeSession = closeSession;
  API.sessionOpen = () => !$("#session").hidden;

  /* ------------------------------ Modal Pro (fake door) ------------------------------ */
  let modalFeature = "pro-general";
  let lastFocus = null;

  function openPro(fid, origin) {
    const f = FEAT[fid] || FEAT["pro-general"];
    modalFeature = FEAT[fid] ? fid : "pro-general";
    track("pro-click", { feature: modalFeature, origen: origin || "directo" });
    lastFocus = document.activeElement;
    const registered = S.email;
    $("#modal").innerHTML = `<div class="modal-back" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt">
      <div class="m-ico">${f.icon}</div>
      <div class="tagrow"><span class="pro-tag">💎 PRO · PRÓXIMAMENTE</span></div>
      <h2 id="mt">${esc(f.title)}</h2>
      <p>${esc(f.long)}</p>
      ${registered
        ? `<p><b>Ya estás en la lista de espera.</b> Te avisaremos en cuanto salga la versión Pro y recibirás tu cupón de ${PCT}% de descuento.</p>
           <button class="btn pro block" data-action="close-modal">Entendido</button>`
        : `<p>Estamos trabajando en la versión Pro, así que esta función todavía no está disponible. Déjanos tu correo y <b>te avisamos cuando salga</b>, con un <b>cupón de ${PCT}% de descuento</b>.</p>
           <form id="leadForm" novalidate>
             <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
             <label class="sr" for="em">Correo electrónico</label>
             <input id="em" type="email" inputmode="email" autocomplete="email" placeholder="tu@correo.com" required>
             <label class="check"><input type="checkbox" id="consent"><span>Acepto que me avisen cuando salga la versión Pro y el <a href="${esc(CFG.privacyUrl)}" target="_blank" rel="noopener">aviso de privacidad</a>.</span></label>
             <div class="form-err" id="formErr" role="alert"></div>
             <button class="btn pro block" type="submit">Avísenme y quiero mi ${PCT}%</button>
           </form>
           <button class="btn ghost block" data-action="close-modal">Ahora no</button>`}
    </div></div>`;
    const em = $("#em"); if (em) setTimeout(() => em.focus(), 60);
  }
  API.openPro = openPro;
  function closeModal() {
    $("#modal").innerHTML = "";
    if (lastFocus && document.body.contains(lastFocus) && lastFocus.focus) lastFocus.focus();
  }
  function showThanks() {
    const f = FEAT[modalFeature] || FEAT["pro-general"];
    $(".modal").innerHTML = `<div class="m-ico">🎉</div><h2 id="mt">¡Listo, estás en la lista!</h2>
      <p>Te escribiremos en cuanto salga la versión Pro. Ahí mismo recibirás tu cupón de ${PCT}% de descuento.</p>
      <div class="coupon">Cupón de ${PCT}% reservado para ti</div>
      <p>Tomamos nota de que te interesa: <b>${esc(f.title)}</b>.</p>
      <button class="btn primary block" data-action="close-modal">Seguir aprendiendo</button>`;
    render();
  }
  async function sendLead(email, feature) {
    const ep = CFG.emailEndpoint;
    if (!ep) { console.warn("[Rendiva] emailEndpoint vacío en config.js: el correo NO se guardó en ningún servidor."); return true; }
    try {
      const r = await fetch(ep, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, feature, source: "fake-door", brand: CFG.brand, date: new Date().toISOString() })
      });
      return r.ok;
    } catch (e) { return false; }
  }

  /* ------------------------------ Toast ------------------------------ */
  let toastT = null;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2400);
  }
  API.toast = toast;

  /* ------------------------------ Acciones (data-action) ------------------------------ */
  const A = API.actions;
  A.lesson = (el) => {
    const st = el.dataset.state;
    if (st === "pro") openPro("cursos-avanzados", "leccion-" + (el.dataset.id || "pro"));
    else if (st === "locked") {
      toast("Completa la lección anterior para desbloquear esta.");
      const w = el.closest(".node-wrap"); w.classList.add("shake"); setTimeout(() => w.classList.remove("shake"), 400);
    } else startLesson(el.dataset.id);
  };
  A.pro = (el) => openPro(el.dataset.feature, el.dataset.origin);
  A["close-modal"] = () => closeModal();
  A.pick = (el) => pick(+el.dataset.i);
  A.check = () => check();
  A.continue = () => cont();
  A.mL = (el) => matchPick("L", +el.dataset.i);
  A.mR = (el) => matchPick("R", +el.dataset.i);
  A.oPick = (el) => orderPick(+el.dataset.i);
  A.oUn = (el) => orderUn(+el.dataset.pos);
  /* Confirmación dentro de la página (confirm() no funciona en vistas incrustadas) */
  let confirmCb = null;
  function askConfirm(title, text, yesLabel, cb) {
    confirmCb = cb;
    lastFocus = document.activeElement;
    $("#modal").innerHTML = `<div class="modal-back" data-action="close-modal"><div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="ct">
      <h2 id="ct">${esc(title)}</h2><p>${esc(text)}</p>
      <button class="btn danger block" data-action="confirm-yes">${esc(yesLabel)}</button>
      <button class="btn block" data-action="close-modal">Cancelar</button></div></div>`;
  }
  API.confirm = askConfirm;
  A["confirm-yes"] = () => { const cb = confirmCb; confirmCb = null; $("#modal").innerHTML = ""; if (cb) cb(); };
  A.quit = () => askConfirm("¿Salir de la sesión?", "Perderás el avance de esta sesión.", "Salir", () => closeSession());
  A["close-session"] = () => closeSession();
  A["finish-session"] = () => { if (adPending) { adPending = false; showAd(); } else closeSession(); };
  A["ad-click"] = (el) => track("anuncio-click", { tipo: "patrocinador", anuncio: el.dataset.ad || "" });
  A.goal = (el) => { S.goal = +el.dataset.v; save(); render(); };

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const act = el.dataset.action;
    if (act === "close-modal" && el.classList.contains("modal-back") && e.target !== el) return;
    const fn = A[act];
    if (fn) fn(el, e);
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "numIn") { const b = $("#checkBtn"); if (b) b.disabled = e.target.value.trim() === ""; }
  });

  document.addEventListener("submit", async (e) => {
    if (e.target.id !== "leadForm") return;
    e.preventDefault();
    const f = e.target, err = $("#formErr", f), btn = $("button[type=submit]", f);
    if ($("[name=website]", f).value) return; // trampa para bots
    const email = $("#em", f).value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { err.textContent = "Escribe un correo válido, por ejemplo nombre@correo.com."; $("#em", f).focus(); return; }
    if (!$("#consent", f).checked) { err.textContent = "Marca la casilla para poder avisarte."; return; }
    err.textContent = "";
    const label = btn.textContent;
    btn.disabled = true; btn.textContent = "Guardando…";
    const ok = await sendLead(email, modalFeature);
    if (!ok) { err.textContent = "No pudimos guardar tu correo. Revisa tu conexión e inténtalo de nuevo."; btn.disabled = false; btn.textContent = label; return; }
    S.email = true; save();
    track("email-registrado", { feature: modalFeature });
    API.evaluate(true);
    showThanks();
  });

  document.addEventListener("keydown", (e) => {
    if ($("#modal").firstChild) { if (e.key === "Escape") closeModal(); return; }
    if (!sess || $("#session").hidden) return;
    if (e.key === "Enter") {
      if (e.target.closest && e.target.closest("button")) return; // deja que el botón actúe solo
      if (sess.phase === "fb") { e.preventDefault(); cont(); }
      else if (sess.phase === "ask") { const b = $("#checkBtn"); if (b && !b.disabled) { e.preventDefault(); check(); } }
      return;
    }
    const q = sess.cur && sess.cur.q;
    if (sess.phase === "ask" && q && (q.t === "choice" || q.t === "tf") && /^[1-4]$/.test(e.key)) pick(+e.key - 1);
  });

  window.addEventListener("hashchange", onRoute);

  /* ------------------------------ Arranque ------------------------------ */
  function tick() {
    const d = today();
    if (tick.day && tick.day !== d) { syncStreak(); ensureToday(); if (!API.sessionOpen()) render(); }
    tick.day = d;
    if (syncHearts()) {
      if (noHeartsOpen) { closeSession(); toast("¡Ya tienes una vida! Puedes seguir aprendiendo."); }
      else if (!API.sessionOpen()) render();
    }
    $$("[data-countdown]").forEach((n) => { n.textContent = fmtTime(nextHeartIn()); });
  }

  function start() {
    loadUmami();
    applyTheme();
    syncStreak();
    ensureToday();
    save();
    tick.day = today();
    onRoute();
    if (S.shieldNote) { delete S.shieldNote; save(); setTimeout(() => toast("🐂 " + CFG.mascot.name + " usó su escudo y salvó tu racha"), 600); }
    setInterval(tick, 1000);
    API.started = true;
  }
  // extras.js se carga después de este archivo y registra sus vistas antes de DOMContentLoaded
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else setTimeout(start, 0);
})();

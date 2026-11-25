/* ==========================================================================
   Rendiva — funciones extra (se conectan al núcleo por window.Rendiva)
   Incluye: Explorar · reto diario · misiones · Mis errores · calculadoras ·
            glosario · test de perfil de riesgo · tienda · logros · perfil
   ========================================================================== */
(() => {
  "use strict";
  const API = window.Rendiva;
  if (!API) { console.error("[Rendiva] extras.js debe cargarse después de app.js"); return; }

  const { CFG, COURSE, FEAT, QMAP, S, $, $$, esc, shuffle, money, parseNum, save, track, toast } = API;
  const A = API.actions;
  const BADGES = window.BADGES || [];
  const GLOSSARY = window.GLOSSARY || [];
  const GCATS = window.GLOSSARY_CATS || [];
  const RISK_TEST = window.RISK_TEST || [];
  const RISK_PROFILES = window.RISK_PROFILES || [];

  const dat = (o) => Object.keys(o).map((k) => ` data-${k}="${esc(o[k])}"`).join("");
  const dkey = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const num = (n, d) => Number(n).toLocaleString("es-MX", { maximumFractionDigits: d == null ? 0 : d });

  /* Tarjetas de herramienta (enlace o botón) */
  const toolLink = (href, icon, title, desc, tag) =>
    `<a class="tool" href="${href}"><span class="ti">${icon}</span><span class="tt"><b>${esc(title)}</b><span>${esc(desc)}</span></span>${tag ? `<span class="tg">${tag}</span>` : ""}</a>`;
  const toolBtn = (action, data, icon, title, desc, tag, extraCls) =>
    `<button class="tool ${extraCls || ""}" data-action="${action}"${dat(data || {})}><span class="ti">${icon}</span><span class="tt"><b>${esc(title)}</b><span>${esc(desc)}</span></span>${tag ? `<span class="tg">${tag}</span>` : ""}</button>`;
  const proTool = (fid, origin, desc) => {
    const f = FEAT[fid];
    return toolBtn("pro", { feature: fid, origin }, f.icon, f.title, desc || f.short, '<span class="mini-pro">PRO</span>', "is-pro");
  };

  /* ============================================================
     Logros y misiones
     ============================================================ */
  function metric(k) {
    switch (k) {
      case "lessons": return S.lessons;
      case "streak": return Math.max(S.best || 0, API.streakNow());
      case "xp": return S.xp;
      case "perfect": return S.perfect;
      case "daily": return S.dailyCount;
      case "units": return COURSE.filter((u) => u.lessons.filter((l) => !l.pro).every((l) => S.done[l.id])).length;
      case "free": return COURSE.every((u) => u.lessons.filter((l) => !l.pro).every((l) => S.done[l.id])) ? 1 : 0;
      case "risk": return S.risk ? 1 : 0;
      case "calc": return Object.keys(S.calcSeen).length;
      case "gloss": return S.gloss ? 1 : 0;
      case "purchases": return S.purchases;
      case "email": return S.email ? 1 : 0;
      case "errfix": return S.errFixed;
      case "capi": return API.mLevel();
      default: return 0;
    }
  }

  function questProgress() {
    API.ensureToday();
    return [
      { id: "xp", title: "Gana " + S.goal + " XP", cur: Math.min(API.todayXp(), S.goal), goal: S.goal, reward: CFG.quests.xp },
      { id: "lessons", title: "Completa 2 lecciones", cur: Math.min(S.today.lessons, 2), goal: 2, reward: CFG.quests.lessons },
      { id: "daily", title: "Haz el reto diario", cur: S.today.daily ? 1 : 0, goal: 1, reward: CFG.quests.daily }
    ];
  }

  const pending = { badges: [], quests: [] };
  API.evaluate = function (live) {
    API.ensureToday();
    BADGES.forEach((b) => {
      if (!S.badges[b.id] && metric(b.rule.k) >= b.rule.v) {
        S.badges[b.id] = Date.now();
        S.coins += CFG.rewards.badge;
        pending.badges.push(b);
        track("insignia", { id: b.id });
      }
    });
    questProgress().forEach((q) => {
      if (q.cur >= q.goal && !S.today.claimed[q.id]) {
        S.today.claimed[q.id] = true;
        S.coins += q.reward;
        pending.quests.push(q);
      }
    });
    save();
    if (live) {
      const r = API.takeNew();
      const msgs = [];
      r.badges.forEach((b) => msgs.push("🏅 Nueva insignia: " + b.title + " (+" + CFG.rewards.badge + " 🪙)"));
      r.quests.forEach((q) => msgs.push("🎯 Misión cumplida: " + q.title + " (+" + q.reward + " 🪙)"));
      if (msgs.length) toast(msgs[0] + (msgs.length > 1 ? " y " + (msgs.length - 1) + " más" : ""));
      refreshCoins();
      return r;
    }
    return null;
  };
  API.takeNew = function () {
    const r = { badges: pending.badges.slice(), quests: pending.quests.slice() };
    pending.badges.length = 0; pending.quests.length = 0;
    return r;
  };
  function refreshCoins() { $$(".stat.coin").forEach((n) => { n.textContent = "🪙 " + S.coins; }); }

  API.questsHTML = function () {
    const qs = questProgress();
    return `<div class="card quests"><h3>Misiones de hoy</h3>${qs.map((q) => {
      const done = !!S.today.claimed[q.id] || q.cur >= q.goal;
      const pct = Math.round((q.cur / q.goal) * 100);
      return `<div class="quest ${done ? "done" : ""}"><div class="q-top"><span>${done ? "✅ " : ""}${esc(q.title)}</span><span class="q-rw">🪙 ${q.reward}</span></div>
        <div class="bar thin"><i style="width:${pct}%;background:${done ? "var(--brand)" : "var(--gold)"}"></i></div></div>`;
    }).join("")}</div>`;
  };

  /* ============================================================
     Explorar
     ============================================================ */
  function poolQuestions() {
    const out = [];
    COURSE.forEach((u) => u.lessons.forEach((l) => { if (!l.pro && S.done[l.id]) l.questions.forEach((q) => out.push(q)); }));
    return out;
  }

  function exploreHTML() {
    API.ensureToday();
    const pool = poolQuestions().length;
    const errN = S.errors.length;
    const limit = CFG.limits.errorSessionsPerDay;
    const errLeft = Math.max(0, limit - S.today.errors);

    let daily;
    if (S.today.daily) daily = toolBtn("daily", {}, "✅", "Reto diario completado", "Vuelve mañana por uno nuevo.", "", "is-done");
    else if (!pool) daily = toolBtn("daily", {}, "⚡", "Reto diario", "Completa una lección para desbloquearlo.", "🔒");
    else daily = toolBtn("daily", {}, "⚡", "Reto diario", CFG.limits.dailyQuestions + " preguntas de lo que ya aprendiste · +" + CFG.rewards.daily + " 🪙", '<span class="tg-go">Jugar</span>', "is-hot");

    let errs;
    if (!errN) errs = toolBtn("errors", {}, "🩹", "Mis errores", "Aquí aparecen las preguntas que fallas. ¡Todavía no hay ninguna!", "");
    else if (!errLeft) errs = toolBtn("errors", {}, "🩹", "Mis errores (" + errN + ")", "Ya usaste tu sesión gratis de hoy. Pro la quita.", '<span class="mini-pro">PRO</span>');
    else errs = toolBtn("errors", {}, "🩹", "Mis errores (" + errN + ")", "Repasa hasta " + CFG.limits.errorQuestions + " preguntas. " + errLeft + " sesión gratis hoy.", '<span class="tg-go">Repasar</span>');

    const riskDesc = S.risk ? "Tu perfil: " + (RISK_PROFILES.find((p) => p.id === S.risk.id) || {}).title + ". Toca para repetirlo." : "7 preguntas para conocer cuánto riesgo te acomoda.";

    return `<div class="page-head"><h1>Explorar</h1></div>
      <p class="lead">Practica, calcula y aprende más allá de las lecciones.</p>
      <h3 class="sec-title first">Hoy</h3>
      <div class="stack">${daily}${errs}</div>
      <div class="mt-lg mobile-only">${API.questsHTML()}</div>
      <h3 class="sec-title">Herramientas gratis</h3>
      <div class="stack">
        ${toolLink("#/calc/interes", "❄️", "Calculadora de interés compuesto", "Mira cuánto puede crecer tu dinero con aportaciones.")}
        ${toolLink("#/calc/inflacion", "🎈", "Calculadora de inflación", "Cuánto costará mañana lo de hoy.")}
        ${toolLink("#/calc/meta", "🎯", "Calculadora de metas", "Cuánto aportar al mes para llegar a tu meta.")}
        ${toolLink("#/glosario", "📖", "Glosario", GLOSSARY.length + " términos explicados sin jerga.")}
        ${toolBtn("risk", {}, "🧠", "Test de perfil de riesgo", riskDesc, S.risk ? "✅" : "")}
      </div>
      <h3 class="sec-title">Tu progreso</h3>
      <div class="stack">
        ${toolLink("#/logros", "🏅", "Logros", Object.keys(S.badges).length + " de " + BADGES.length + " insignias conseguidas.")}
        ${toolLink("#/tienda", "🛍️", "Tienda", "Gasta tus monedas en vidas, congelaciones de racha e impulsos.")}
      </div>
      <h3 class="sec-title">Próximamente en Pro</h3>
      <div class="stack">
        ${proTool("noticias-simples", "explorar")}
        ${proTool("ligas-amigos", "explorar")}
        ${proTool("plan-personalizado", "explorar")}
      </div>`;
  }
  API.views.explorar = { title: () => "Explorar", html: exploreHTML };

  A.daily = () => {
    API.ensureToday();
    if (S.today.daily) { toast("Ya hiciste el reto de hoy. ¡Vuelve mañana!"); return; }
    const pool = poolQuestions();
    if (!pool.length) { toast("Completa una lección para desbloquear el reto diario."); return; }
    API.startSession({ kind: "daily", title: "Reto diario", questions: shuffle(pool).slice(0, CFG.limits.dailyQuestions), noHearts: true });
  };
  A.errors = () => {
    API.ensureToday();
    const ids = S.errors.filter((id) => QMAP[id]);
    if (!ids.length) { toast("No tienes errores guardados. ¡Sigue así!"); return; }
    if (S.today.errors >= CFG.limits.errorSessionsPerDay) { API.openPro("repaso-inteligente", "limite-errores"); return; }
    API.startSession({ kind: "errors", title: "Mis errores", questions: ids.slice(0, CFG.limits.errorQuestions).map((id) => QMAP[id].q), noHearts: true });
  };

  /* ============================================================
     Calculadoras
     ============================================================ */
  const SERIES_NOTE = "Resultado ilustrativo, no una promesa de rendimiento. Los rendimientos reales cambian y pueden ser negativos.";

  function growth(P, pmt, rate, years) {
    const r = rate / 100 / 12, n = Math.round(years * 12);
    let bal = P;
    const yearly = [P];
    for (let m = 1; m <= n; m++) { bal = bal * (1 + r) + pmt; if (m % 12 === 0) yearly.push(bal); }
    return { final: bal, yearly, months: n };
  }

  function barsHTML(P, pmt, g, years) {
    const Y = Math.floor(years);
    if (Y < 1) return "";
    const step = Math.max(1, Math.ceil(Y / 30));
    const ys = [];
    for (let y = step; y <= Y; y += step) ys.push(y);
    if (ys[ys.length - 1] !== Y) ys.push(Y);
    const max = Math.max.apply(null, ys.map((y) => g.yearly[y]).concat([1]));
    const cols = ys.map((y) => {
      const bal = Math.max(0, g.yearly[y]);
      const contrib = Math.min(bal, P + pmt * 12 * y);
      const gain = Math.max(0, bal - contrib);
      return `<div class="yb" title="Año ${y}: ${money(bal)}"><i class="g" style="height:${(gain / max) * 100}%"></i><i class="c" style="height:${(contrib / max) * 100}%"></i></div>`;
    }).join("");
    return `<div class="bars" role="img" aria-label="Crecimiento de tu dinero año por año">${cols}</div>
      <div class="legend"><span><i class="c"></i>Lo que aportas</span><span><i class="g"></i>Intereses</span><span class="ax">Año 1 → año ${Y}</span></div>`;
  }

  const CALCS = {
    interes: {
      title: "Interés compuesto", icon: "❄️",
      intro: "Mira cuánto puede crecer tu dinero con el tiempo y con aportaciones mensuales.",
      fields: [
        { k: "p", label: "Capital inicial", pre: "$", v: 10000 },
        { k: "m", label: "Aportación mensual", pre: "$", v: 1000 },
        { k: "r", label: "Rendimiento anual", suf: "%", v: 10 },
        { k: "y", label: "Años", suf: "años", v: 10 }
      ],
      run(v) {
        if (v.y < 1 || v.y > 60) return "Escribe entre 1 y 60 años.";
        if (v.r < -50 || v.r > 100) return "Escribe un rendimiento entre -50% y 100%.";
        if (v.p < 0 || v.m < 0) return "Los montos no pueden ser negativos.";
        const g = growth(v.p, v.m, v.r, v.y);
        const put = v.p + v.m * g.months;
        return `<div class="kpis"><div class="kpi main"><span>Monto final estimado</span><b>${money(g.final)}</b></div>
          <div class="kpi"><span>Total aportado</span><b>${money(put)}</b></div>
          <div class="kpi"><span>${g.final - put >= 0 ? "Intereses ganados" : "Resultado de rendimientos"}</span><b>${money(g.final - put)}</b></div></div>
          ${barsHTML(v.p, v.m, g, v.y)}
          <p class="calc-note">Capitalización mensual, con aportaciones al final de cada mes. ${SERIES_NOTE}</p>
          <div class="stack-sm mt"><button class="btn block" data-action="pro" data-feature="calc-avanzadas" data-origin="calc-interes">Agregar comisiones e impuestos <span class="mini-pro">PRO</span></button></div>`;
      }
    },
    inflacion: {
      title: "Inflación", icon: "🎈",
      intro: "Descubre cuánto costará mañana lo que hoy compras, y cuánto valdrá tu dinero.",
      fields: [
        { k: "a", label: "Monto de hoy", pre: "$", v: 10000 },
        { k: "i", label: "Inflación anual", suf: "%", v: 4.5 },
        { k: "y", label: "Años", suf: "años", v: 10 }
      ],
      run(v) {
        if (v.y < 1 || v.y > 60) return "Escribe entre 1 y 60 años.";
        if (v.i < -10 || v.i > 100) return "Escribe una inflación entre -10% y 100%.";
        if (v.a < 0) return "El monto no puede ser negativo.";
        const f = Math.pow(1 + v.i / 100, v.y);
        const lost = (1 - 1 / f) * 100;
        return `<div class="kpis"><div class="kpi main"><span>Lo que hoy cuesta ${money(v.a)} costaría en ${num(v.y, 1)} años</span><b>${money(v.a * f)}</b></div>
          <div class="kpi"><span>Tus ${money(v.a)} de hoy comprarían lo que hoy compran…</span><b>${money(v.a / f)}</b></div>
          <div class="kpi"><span>Poder de compra perdido</span><b>${num(lost, 1)}%</b></div></div>
          <p class="calc-note">Por eso importa que tu dinero rinda más que la inflación. ${SERIES_NOTE}</p>`;
      }
    },
    meta: {
      title: "Meta de ahorro", icon: "🎯",
      intro: "Calcula cuánto necesitas aportar cada mes para llegar a tu meta.",
      fields: [
        { k: "g", label: "Tu meta", pre: "$", v: 500000 },
        { k: "y", label: "Años para lograrla", suf: "años", v: 10 },
        { k: "r", label: "Rendimiento anual esperado", suf: "%", v: 8 },
        { k: "p", label: "Lo que ya tienes", pre: "$", v: 0 }
      ],
      run(v) {
        if (v.y < 1 || v.y > 60) return "Escribe entre 1 y 60 años.";
        if (v.r < -50 || v.r > 100) return "Escribe un rendimiento entre -50% y 100%.";
        if (v.g <= 0 || v.p < 0) return "Escribe una meta mayor a cero y un monto inicial válido.";
        const r = v.r / 100 / 12, n = Math.round(v.y * 12), gr = Math.pow(1 + r, n);
        let pmt = r === 0 ? (v.g - v.p) / n : ((v.g - v.p * gr) * r) / (gr - 1);
        if (pmt <= 0) {
          return `<div class="kpis"><div class="kpi main"><span>Aportación mensual necesaria</span><b>$0</b></div></div>
            <p class="calc-note">¡Con lo que ya tienes y ese rendimiento llegarías a tu meta sin aportar más! ${SERIES_NOTE}</p>`;
        }
        const put = v.p + pmt * n;
        return `<div class="kpis"><div class="kpi main"><span>Aportación mensual necesaria</span><b>${money(pmt)}</b></div>
          <div class="kpi"><span>Total que aportarías</span><b>${money(put)}</b></div>
          <div class="kpi"><span>Lo que ponen los intereses</span><b>${money(v.g - put)}</b></div></div>
          <p class="calc-note">${SERIES_NOTE}</p>
          <div class="stack-sm mt">
            <button class="btn pro block" data-action="pro" data-feature="metas-recordatorios" data-origin="calc-meta">Guardar meta y recibir recordatorios</button>
            <button class="btn block" data-action="pro" data-feature="calc-avanzadas" data-origin="calc-meta">Comparar escenarios <span class="mini-pro">PRO</span></button></div>`;
      }
    }
  };

  function calcFormHTML(id) {
    const c = CALCS[id];
    return c.fields.map((f) => `<label class="field"><span>${esc(f.label)}</span>
      <div class="inp">${f.pre ? `<b>${f.pre}</b>` : ""}<input data-k="${f.k}" type="text" inputmode="decimal" autocomplete="off" value="${f.v}" aria-label="${esc(f.label)}">${f.suf ? `<b>${f.suf}</b>` : ""}</div></label>`).join("");
  }
  function calcRun(id) {
    const root = $("#calc");
    if (!root) return;
    const c = CALCS[id];
    const vals = {};
    let bad = false;
    $$("input[data-k]", root).forEach((i) => { const n = parseNum(i.value); vals[i.dataset.k] = n; if (!isFinite(n)) bad = true; });
    const out = $("#calcOut");
    out.innerHTML = bad ? `<p class="calc-err">Escribe solo números, por ejemplo 10000 o 10,000.</p>` : (function () {
      const r = c.run(vals);
      return /^</.test(r) ? r : `<p class="calc-err">${esc(r)}</p>`;
    })();
  }

  let calcUsed = {};
  API.views.calc = {
    title: (sub) => "Calculadora · " + ((CALCS[sub] || CALCS.interes).title),
    html: (sub) => {
      const id = CALCS[sub] ? sub : "interes";
      const c = CALCS[id];
      return `<div class="page-head"><a class="back" href="#/explorar" aria-label="Volver a Explorar">←</a><h1>Calculadoras</h1></div>
        <div class="tabs">${Object.keys(CALCS).map((k) => `<a class="tab ${k === id ? "on" : ""}" href="#/calc/${k}">${CALCS[k].icon} ${CALCS[k].title}</a>`).join("")}</div>
        <p class="lead">${esc(c.intro)}</p>
        <div class="card" id="calc" data-id="${id}"><div class="calc-form">${calcFormHTML(id)}</div></div>
        <div id="calcOut" class="calc-out"></div>`;
    },
    mount: (sub) => calcRun(CALCS[sub] ? sub : "interes")
  };
  document.addEventListener("input", (e) => {
    const form = e.target.closest && e.target.closest("#calc");
    if (form) {
      const id = form.dataset.id;
      calcRun(id);
      if (!calcUsed[id]) {
        calcUsed[id] = true;
        S.calcSeen[id] = 1; save();
        track("herramienta-usada", { tool: "calc-" + id });
        API.evaluate(true);
      }
    }
    if (e.target.id === "glossQ") { glossQ = e.target.value; paintGloss(); }
  });

  /* ============================================================
     Glosario
     ============================================================ */
  let glossQ = "";
  let glossCat = "all";
  function glossListHTML() {
    const q = norm(glossQ.trim());
    const list = GLOSSARY.filter((g) => (glossCat === "all" || g.c === glossCat) && (!q || norm(g.t).indexOf(q) >= 0 || norm(g.d).indexOf(q) >= 0))
      .sort((a, b) => a.t.localeCompare(b.t, "es"));
    if (!list.length) return `<p class="empty">No encontramos ese término. Prueba con otra palabra o cambia de categoría.</p>`;
    return `<p class="count">${list.length} ${list.length === 1 ? "término" : "términos"}</p>` + list.map((g) => `<div class="term"><b>${esc(g.t)}</b><span class="tag-c">${esc((GCATS.find((c) => c.id === g.c) || {}).label || "")}</span><p>${esc(g.d)}</p></div>`).join("");
  }
  function paintGloss() { const el = $("#glossList"); if (el) el.innerHTML = glossListHTML(); }
  API.views.glosario = {
    title: () => "Glosario",
    html: () => `<div class="page-head"><a class="back" href="#/explorar" aria-label="Volver a Explorar">←</a><h1>Glosario</h1></div>
      <p class="lead">Los términos de las lecciones, explicados sin jerga.</p>
      <input id="glossQ" class="search" type="search" placeholder="Buscar un término…" value="${esc(glossQ)}" aria-label="Buscar un término" autocomplete="off">
      <div class="chips cats" id="glossCats">${[{ id: "all", label: "Todos" }].concat(GCATS).map((c) => `<button class="chip ${glossCat === c.id ? "on" : ""}" data-action="gcat" data-c="${c.id}">${esc(c.label)}</button>`).join("")}</div>
      <div id="glossList">${glossListHTML()}</div>
      <div class="stack-sm mt-lg"><button class="btn block" data-action="pro" data-feature="resumenes-pdf" data-origin="glosario">Descargar fichas en PDF <span class="mini-pro">PRO</span></button></div>`,
    mount: () => {
      if (!S.gloss) { S.gloss = true; save(); track("herramienta-usada", { tool: "glosario" }); API.evaluate(true); }
    }
  };
  A.gcat = (el) => {
    glossCat = el.dataset.c;
    $$("#glossCats .chip").forEach((b) => b.classList.toggle("on", b.dataset.c === glossCat));
    paintGloss();
  };

  /* ============================================================
     Test de perfil de riesgo (pantalla completa)
     ============================================================ */
  let rk = null;
  function openOverlay() { const el = $("#session"); el.hidden = false; document.body.classList.add("noscroll"); return el; }
  A.risk = () => { rk = { i: 0, score: 0 }; paintRisk(); };
  function paintRisk() {
    const el = openOverlay();
    const n = RISK_TEST.length, q = RISK_TEST[rk.i];
    el.innerHTML = `<div class="s-top"><button class="s-x" data-action="close-session" aria-label="Cerrar el test">✕</button>
      <div class="bar"><i style="width:${Math.round((rk.i / n) * 100)}%"></i></div><span class="s-tag">${rk.i + 1}/${n}</span></div>
      <div class="s-body"><h1 class="q-title">${esc(q.q)}</h1><div class="opts">${q.o.map((t, i) => `<button class="opt" data-action="rPick" data-i="${i}"><span class="k">${i + 1}</span><span>${esc(t)}</span></button>`).join("")}</div></div>`;
  }
  A.rPick = (el) => {
    if (!rk) return;
    rk.score += +el.dataset.i + 1;
    rk.i++;
    if (rk.i >= RISK_TEST.length) finishRisk(); else paintRisk();
  };
  function finishRisk() {
    const p = RISK_PROFILES.find((x) => rk.score <= x.max) || RISK_PROFILES[RISK_PROFILES.length - 1];
    S.risk = { score: rk.score, id: p.id, date: API.today() };
    save();
    track("test-riesgo-completado", { perfil: p.id });
    API.evaluate();
    const nw = API.takeNew();
    const colors = ["var(--blue)", "var(--brand)", "var(--gold)"];
    $("#session").innerHTML = `<div class="s-top"><button class="s-x" data-action="close-session" aria-label="Cerrar">✕</button><div class="bar"><i style="width:100%"></i></div><span class="s-tag">Listo</span></div>
      <div class="s-body risk-res"><div class="center-screen" style="padding-top:8px">
        <div class="big">${p.icon}</div><h1>Tu perfil: ${esc(p.title)}</h1><p>${esc(p.desc)}</p>
        <div class="card" style="text-align:left"><h3>Ejemplo de distribución para este perfil</h3>
          <div class="alloc">${p.mix.map((m, i) => `<span style="width:${m[1]}%;background:${colors[i]}">${m[1]}%</span>`).join("")}</div>
          <ul class="alloc-leg">${p.mix.map((m, i) => `<li><i style="background:${colors[i]}"></i>${esc(m[0])}</li>`).join("")}</ul>
          <p class="calc-note">Es un ejemplo educativo de cómo suelen verse portafolios de este perfil. No es una recomendación personalizada de inversión.</p></div>
        ${nw.badges.map((b) => `<div class="reward-card"><span class="ri">${b.icon}</span><span><b>Nueva insignia: ${esc(b.title)}</b><span>${esc(b.desc)} · +${CFG.rewards.badge} 🪙</span></span></div>`).join("")}
        <div class="actions">
          <button class="btn pro block" data-action="pro" data-feature="portafolio-sugerido" data-origin="test-riesgo">Ver portafolios de ejemplo para mi perfil</button>
          <button class="btn block" data-action="pro" data-feature="plan-personalizado" data-origin="test-riesgo">Armar mi plan personalizado <span class="mini-pro">PRO</span></button>
          <button class="btn primary block" data-action="close-session">Listo</button>
          <button class="btn ghost block" data-action="risk">Repetir el test</button></div>
      </div></div>`;
    rk = null;
  }

  /* ============================================================
     Tienda
     ============================================================ */
  function shopItem(id, icon, title, desc, cost, state) {
    const dis = state.disabled ? "disabled" : "";
    return `<div class="shop-item"><span class="si">${icon}</span><span class="st"><b>${esc(title)}</b><span>${esc(desc)}</span>${state.note ? `<em>${esc(state.note)}</em>` : ""}</span>
      <button class="btn ${state.disabled ? "" : "blue"}" data-action="buy" data-item="${id}" ${dis}>${cost} 🪙</button></div>`;
  }
  API.views.tienda = {
    title: () => "Tienda",
    html: () => {
      const sh = CFG.shop;
      return `<div class="page-head"><h1>Tienda</h1></div>
        <div class="card wallet"><div><div class="sub">Tus monedas</div><div class="amt">🪙 ${S.coins}</div></div>
          <p>Gana monedas con lecciones, retos, misiones y logros.</p></div>
        <h3 class="sec-title">Canjear</h3>
        <div class="stack">
          ${shopItem("hearts", "❤️", "Recargar vidas", "Vuelve a tener todas tus vidas.", sh.heartsRefill, { disabled: S.hearts >= API.MAX || S.coins < sh.heartsRefill, note: S.hearts >= API.MAX ? "Ya tienes todas tus vidas" : "Tienes " + S.hearts + " de " + API.MAX })}
          ${shopItem("freeze", "🧊", "Congelar racha", "Protege tu racha si te pierdes un día.", sh.streakFreeze, { disabled: S.freezes >= sh.maxFreezes || S.coins < sh.streakFreeze, note: "Tienes " + S.freezes + " de " + sh.maxFreezes })}
          ${shopItem("boost", "⚡", "Impulso de XP", "Tu próxima lección da el doble de XP.", sh.xpBoost, { disabled: S.boost || S.coins < sh.xpBoost, note: S.boost ? "Ya está activo" : "" })}
        </div>
        <h3 class="sec-title">Sin límites con Pro</h3>
        <div class="stack">${proTool("vidas-ilimitadas", "tienda")}${proTool("racha-protegida", "tienda")}</div>`;
    }
  };
  A.buy = (el) => {
    const item = el.dataset.item, sh = CFG.shop;
    let msg = "";
    if (item === "hearts") {
      if (S.hearts >= API.MAX) { toast("Ya tienes todas tus vidas."); return; }
      if (S.coins < sh.heartsRefill) { toast("Te faltan monedas."); return; }
      S.coins -= sh.heartsRefill; API.refillHearts(); msg = "❤️ ¡Vidas recargadas!";
    } else if (item === "freeze") {
      if (S.freezes >= sh.maxFreezes) { toast("Ya tienes el máximo de congelaciones."); return; }
      if (S.coins < sh.streakFreeze) { toast("Te faltan monedas."); return; }
      S.coins -= sh.streakFreeze; S.freezes++; msg = "🧊 Congelación de racha lista.";
    } else if (item === "boost") {
      if (S.boost) { toast("Tu impulso ya está activo."); return; }
      if (S.coins < sh.xpBoost) { toast("Te faltan monedas."); return; }
      S.coins -= sh.xpBoost; S.boost = true; msg = "⚡ Tu próxima lección dará el doble de XP.";
    } else return;
    S.purchases++;
    save();
    track("compra-tienda", { item });
    const r = API.evaluate(true);
    if (!r || !r.badges.length) toast(msg);
    if (API.sessionOpen() && item === "hearts") API.closeSession();
    else API.render();
  };

  /* ============================================================
     Logros
     ============================================================ */
  API.views.logros = {
    title: () => "Logros",
    html: () => {
      const got = Object.keys(S.badges).length;
      return `<div class="page-head"><h1>Logros</h1></div>
        <p class="lead">${got} de ${BADGES.length} insignias. Cada una te da +${CFG.rewards.badge} 🪙.</p>
        <div class="badges">${BADGES.map((b) => {
          const has = !!S.badges[b.id];
          const cur = Math.min(metric(b.rule.k), b.rule.v);
          return `<div class="badge ${has ? "got" : ""}"><span class="b-ico">${b.icon}</span><b>${esc(b.title)}</b><span class="b-desc">${esc(b.desc)}</span>
            ${has ? '<span class="b-ok">Conseguida</span>' : `<div class="bar thin"><i style="width:${Math.round((cur / b.rule.v) * 100)}%;background:var(--blue)"></i></div><span class="b-prog">${num(cur)}/${num(b.rule.v)}</span>`}</div>`;
        }).join("")}</div>
        <h3 class="sec-title">Próximamente en Pro</h3>
        <div class="stack">${proTool("certificados", "logros")}${proTool("ligas-amigos", "logros")}</div>`;
    }
  };

  /* ============================================================
     Perfil
     ============================================================ */
  function weekHTML() {
    const names = ["D", "L", "M", "M", "J", "V", "S"];
    const days = [];
    for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push({ k: dkey(d), n: names[d.getDay()], today: i === 0 }); }
    const vals = days.map((d) => S.days[d.k] || 0);
    const max = Math.max.apply(null, vals.concat([S.goal]));
    const total = vals.reduce((a, b) => a + b, 0);
    return `<div class="card"><div class="wk-head"><h3>Tu semana</h3><span>${num(total)} XP</span></div>
      <div class="week" role="img" aria-label="XP de los últimos 7 días">${days.map((d, i) => `<div class="wd ${d.today ? "today" : ""}"><div class="col"><i class="${vals[i] >= S.goal ? "hit" : ""}" style="height:${Math.max(vals[i] ? 6 : 0, (vals[i] / max) * 100)}%"></i></div><span>${d.n}</span></div>`).join("")}</div>
      <p class="calc-note" style="margin-top:8px">Las barras verdes alcanzaron tu meta diaria de ${S.goal} XP.</p></div>`;
  }
  API.views.perfil = {
    title: () => "Perfil",
    html: () => {
      const done = Object.keys(S.done).length;
      const acc = S.answered ? Math.round((S.correct / S.answered) * 100) + "%" : "—";
      const prof = S.risk ? RISK_PROFILES.find((p) => p.id === S.risk.id) : null;
      const ci = API.mascot.info();
      return `<div class="profile-top"><a class="avatar capi-av" href="#/capi" aria-label="Ver a ${esc(CFG.mascot.name)}">${window.CapiArt(ci.lvl, API.mood(), { size: 70, crop: "head" })}</a><div><h1>Nivel ${ci.lvl} · ${esc(ci.full)}</h1><p>${S.xp} XP · <a href="#/capi">Ver mi mascota</a></p></div></div>
        <div class="grid-stats">
          <div class="tile"><b>🔥 ${API.streakNow()}</b><span>Racha de días</span></div>
          <div class="tile"><b>🏆 ${S.best || 0}</b><span>Mejor racha</span></div>
          <div class="tile"><b>📘 ${done}</b><span>Lecciones completadas</span></div>
          <div class="tile"><b>🎯 ${acc}</b><span>Precisión total</span></div>
          <div class="tile"><b>🪙 ${S.coins}</b><span>Monedas</span></div>
          <div class="tile"><b>🧊 ${S.freezes}</b><span>Congelaciones de racha</span></div>
        </div>
        ${weekHTML()}
        <div class="stack-sm" style="margin-top:14px">${toolBtn("pro", { feature: "estadisticas-avanzadas", origin: "perfil-estadisticas" }, "📊", "Estadísticas por tema", "Dónde aciertas más y qué conviene repasar", "", "pb")}
          ${toolBtn("pro", { feature: "capi-recordatorios", origin: "perfil-recordatorios" }, "⏰", "Recordatorio diario", CFG.mascot.name + " te avisa antes de que pierdas tu racha", "", "pb")}</div>
        <div class="card" style="margin-top:14px"><h3>Meta diaria</h3><p>¿Cuántos XP quieres ganar cada día?</p>
          <div class="seg">${[10, 20, 30, 50].map((g) => `<button class="${S.goal === g ? "on" : ""}" data-action="goal" data-v="${g}">${g} XP</button>`).join("")}</div></div>
        <div class="card" style="margin-top:14px"><h3>Apariencia</h3><p>Elige cómo quieres ver la app.</p>
          <div class="seg">${[["auto", "Automático"], ["light", "Claro"], ["dark", "Oscuro"]].map((t) => `<button class="${S.theme === t[0] ? "on" : ""}" data-action="theme" data-v="${t[0]}">${t[1]}</button>`).join("")}${API.pb("temas-colores", "perfil-temas", "🎨 Más temas")}</div></div>
        <div class="card" style="margin-top:14px"><h3>Tu perfil de riesgo</h3>
          ${prof ? `<p>${prof.icon} <b>${esc(prof.title)}</b>. ${esc(prof.desc)}</p>` : `<p>Aún no lo sabes. Son 7 preguntas y tardas un minuto.</p>`}
          <button class="btn mt" data-action="risk">${prof ? "Repetir el test" : "Hacer el test"}</button></div>
        <div class="stack mt-lg">${proTool("certificados", "perfil")}</div>
        <div class="card" style="margin-top:14px"><h3>Tu progreso</h3><p>Se guarda en este dispositivo. Si borras los datos del navegador, empezarás de cero.</p>
          <button class="btn danger mt" data-action="reset">Reiniciar progreso</button></div>
        <p class="legal">Contenido educativo. No es asesoría financiera, fiscal ni legal. Invertir implica riesgos y puedes perder dinero.<br>
          <a href="${esc(CFG.privacyUrl)}" target="_blank" rel="noopener">Aviso de privacidad</a></p>`;
    }
  };
  A.theme = (el) => { S.theme = el.dataset.v; save(); API.applyTheme(); API.render(); };
  A.reset = () => {
    API.confirm("¿Borrar tu progreso?", "Se borrará todo el avance de este dispositivo: lecciones, XP, racha, monedas y a tu mascota. No se puede deshacer.", "Sí, borrar todo", () => { API.resetState(); API.applyTheme(); API.render(); toast("Progreso reiniciado"); });
  };
})();

/* ==========================================================================
   Rendiva — la mascota Capi
   Parte 1: el dibujo (SVG propio, sin imágenes externas).
   Parte 2: pantalla de la mascota, tarjetas y evolución (se conecta a window.Rendiva).
   ========================================================================== */

/* ---------- Parte 1: arte ---------- */
(function () {
  "use strict";
  var C = {
    body: "#2FBF71", bodyD: "#1E9A58", bodyL: "#6BDFA0",
    cream: "#FFF3D1", creamD: "#E8CC8A", gold: "#FFC83D", goldD: "#D9981A",
    ear: "#FFB4A8", ink: "#1D2B33", blush: "#FF8FA3", nose: "#B5694A",
    suit: "#2F4858", suitD: "#243947", tie: "#1CB0F6", tieD: "#1273B4", scarf: "#FF9F1C", scarfD: "#E88A0B"
  };
  var uid = 0;

  function star(x, y, r, fill) {
    var a = r * 0.28;
    return '<path d="M' + x + " " + (y - r) + " L" + (x + a) + " " + (y - a) + " L" + (x + r) + " " + y + " L" + (x + a) + " " + (y + a) +
      " L" + x + " " + (y + r) + " L" + (x - a) + " " + (y + a) + " L" + (x - r) + " " + y + " L" + (x - a) + " " + (y - a) + ' Z" fill="' + fill + '"/>';
  }

  /* level 1..6 · mood: "happy" | "worried" | "sleepy" · o: {size, crop, cls, label} */
  window.CapiArt = function (level, mood, o) {
    o = o || {};
    level = Math.max(1, Math.min(6, level | 0 || 1));
    mood = mood || "happy";
    var id = "capi" + ++uid;
    var gold = level >= 5;
    var hornFill = gold ? C.gold : C.cream, hornEdge = gold ? C.goldD : C.creamD;
    var tipX = level === 1 ? 40 : level >= 4 ? 27 : 31;
    var tipY = level === 1 ? 40 : level >= 4 ? 16 : 24;
    var s = "";

    if (level >= 6) {
      s += '<defs><radialGradient id="' + id + 'a" cx="50%" cy="50%" r="50%"><stop offset="55%" stop-color="#FFE08A" stop-opacity=".0"/><stop offset="85%" stop-color="#FFD54F" stop-opacity=".55"/><stop offset="100%" stop-color="#FFD54F" stop-opacity="0"/></radialGradient></defs>';
      s += '<circle cx="100" cy="100" r="98" fill="url(#' + id + 'a)"/>';
      s += star(24, 44, 9, C.gold) + star(178, 58, 7, C.gold) + star(170, 150, 8, "#FFE08A") + star(30, 140, 6, "#FFE08A");
    }

    /* cuerpo */
    s += '<path d="M28 202 C28 162 62 142 100 142 C138 142 172 162 172 202 Z" fill="' + (level >= 4 ? C.suit : C.body) + '"/>';
    if (level >= 4) {
      s += '<path d="M28 202 C28 168 50 150 72 146 L90 202 Z" fill="' + C.suitD + '"/><path d="M172 202 C172 168 150 150 128 146 L110 202 Z" fill="' + C.suitD + '"/>';
      s += '<path d="M72 146 L100 200 L128 146 Q100 160 72 146 Z" fill="#fff"/>';
      s += '<path d="M80 146 L102 170 L74 168 Z" fill="#fff" stroke="#D6E2E8" stroke-width="2" stroke-linejoin="round"/><path d="M120 146 L98 170 L126 168 Z" fill="#fff" stroke="#D6E2E8" stroke-width="2" stroke-linejoin="round"/>';
      s += '<path d="M93 166 L107 166 L104 174 L96 174 Z" fill="' + C.tieD + '"/><path d="M95 174 L105 174 L109 200 L100 206 L91 200 Z" fill="' + C.tie + '"/>';
    }
    if (level >= 5) s += '<circle cx="70" cy="184" r="7" fill="' + C.gold + '" stroke="' + C.goldD + '" stroke-width="2.5"/><path d="M70 180 L70 188 M67.5 182 Q70 180.5 72.5 182 Q67.5 184.5 72.5 186 Q70 187.5 67.5 186" fill="none" stroke="' + C.goldD + '" stroke-width="1.6" stroke-linecap="round"/>';

    /* orejas */
    s += '<ellipse cx="44" cy="84" rx="20" ry="11" transform="rotate(-18 44 84)" fill="' + C.bodyD + '"/><ellipse cx="46" cy="85" rx="11" ry="5.5" transform="rotate(-18 46 85)" fill="' + C.ear + '"/>';
    s += '<ellipse cx="156" cy="84" rx="20" ry="11" transform="rotate(18 156 84)" fill="' + C.bodyD + '"/><ellipse cx="154" cy="85" rx="11" ry="5.5" transform="rotate(18 154 85)" fill="' + C.ear + '"/>';

    /* cuernos */
    var hl = "M64 58 C46 55 " + (tipX + 4) + " " + (tipY + 18) + " " + tipX + " " + tipY;
    var hr = "M136 58 C154 55 " + (200 - tipX - 4) + " " + (tipY + 18) + " " + (200 - tipX) + " " + tipY;
    [hl, hr].forEach(function (d) {
      s += '<path d="' + d + '" fill="none" stroke="' + hornEdge + '" stroke-width="16" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="' + hornFill + '" stroke-width="10" stroke-linecap="round"/>';
    });

    /* cabeza */
    s += '<ellipse cx="100" cy="92" rx="56" ry="52" fill="' + C.body + '"/>';
    s += '<path d="M52 108 C54 138 78 148 100 148 C122 148 146 138 148 108 C140 128 120 138 100 138 C80 138 60 128 52 108 Z" fill="' + C.bodyD + '" opacity=".35"/>';
    s += '<ellipse cx="76" cy="60" rx="17" ry="9" transform="rotate(-25 76 60)" fill="' + C.bodyL + '" opacity=".55"/>';
    if (level < 6) s += '<path d="M90 42 C86 28 102 24 106 35 C110 26 122 31 114 44 C108 40 98 40 90 42 Z" fill="' + C.bodyD + '"/>';

    /* bufanda (niveles 2-3) */
    if (level === 2 || level === 3) {
      s += '<path d="M58 138 Q100 164 142 138 L146 156 Q100 182 54 156 Z" fill="' + C.scarf + '"/><path d="M68 150 Q100 170 132 150" fill="none" stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"/>';
      s += '<path d="M122 164 L136 198 L114 194 L108 170 Z" fill="' + C.scarfD + '"/>';
    }

    /* hocico */
    s += '<ellipse cx="100" cy="118" rx="33" ry="25" fill="' + C.cream + '" stroke="' + C.creamD + '" stroke-width="2"/>';
    s += '<ellipse cx="89" cy="115" rx="4" ry="5.5" fill="' + C.nose + '"/><ellipse cx="111" cy="115" rx="4" ry="5.5" fill="' + C.nose + '"/>';
    s += '<ellipse cx="62" cy="106" rx="9" ry="6" fill="#FFA7B5" opacity=".8"/><ellipse cx="138" cy="106" rx="9" ry="6" fill="#FFA7B5" opacity=".8"/>';

    /* boca */
    if (mood === "happy") s += '<path d="M87 127 Q100 147 113 127 Q100 132 87 127 Z" fill="#7A2F3A" stroke="#7A2F3A" stroke-width="2" stroke-linejoin="round"/><path d="M94 137 Q100 142 106 137 Q100 134 94 137 Z" fill="' + C.blush + '"/>';
    else if (mood === "worried") s += '<path d="M90 133 Q100 125 110 133" fill="none" stroke="#7A4A35" stroke-width="3.5" stroke-linecap="round"/>';
    else s += '<ellipse cx="100" cy="132" rx="5" ry="4" fill="#7A4A35"/>';

    /* ojos */
    if (mood === "sleepy") {
      s += '<path d="M64 88 Q76 98 88 88" fill="none" stroke="' + C.ink + '" stroke-width="4.5" stroke-linecap="round"/><path d="M112 88 Q124 98 136 88" fill="none" stroke="' + C.ink + '" stroke-width="4.5" stroke-linecap="round"/>';
      s += '<text x="164" y="140" font-family="Nunito,system-ui,sans-serif" font-weight="900" font-size="24" fill="#7DA0B0">z</text><text x="178" y="118" font-family="Nunito,system-ui,sans-serif" font-weight="900" font-size="16" fill="#7DA0B0">z</text>';
    } else {
      [76, 124].forEach(function (cx, i) {
        var dx = i === 0 ? 2 : -2;
        s += '<ellipse cx="' + cx + '" cy="86" rx="12" ry="14" fill="#fff" stroke="' + C.bodyD + '" stroke-width="1.5"/>';
        s += '<circle cx="' + (cx + dx) + '" cy="' + (mood === "worried" ? 90 : 88) + '" r="' + (mood === "worried" ? 6 : 7.5) + '" fill="' + C.ink + '"/>';
        s += '<circle cx="' + (cx + dx + 2.5) + '" cy="' + (mood === "worried" ? 87 : 84.5) + '" r="2.6" fill="#fff"/>';
      });
      if (mood === "worried") {
        s += '<path d="M62 72 Q76 62 90 62" fill="none" stroke="' + C.bodyD + '" stroke-width="5" stroke-linecap="round"/><path d="M138 72 Q124 62 110 62" fill="none" stroke="' + C.bodyD + '" stroke-width="5" stroke-linecap="round"/>';
        s += '<path d="M152 62 Q158 72 152 78 Q146 72 152 62 Z" fill="#7CCBFF"/>';
      }
    }

    /* lentes (nivel 3+) */
    if (level >= 3) {
      s += '<circle cx="76" cy="86" r="17.5" fill="#fff" fill-opacity=".14" stroke="' + C.ink + '" stroke-width="4"/><circle cx="124" cy="86" r="17.5" fill="#fff" fill-opacity=".14" stroke="' + C.ink + '" stroke-width="4"/>';
      s += '<path d="M93 84 Q100 79 107 84" fill="none" stroke="' + C.ink + '" stroke-width="4" stroke-linecap="round"/>';
    }

    /* corona (nivel 6) */
    if (level >= 6) {
      s += '<path d="M72 48 L78 20 L91 35 L100 14 L109 35 L122 20 L128 48 Z" fill="' + C.gold + '" stroke="' + C.goldD + '" stroke-width="3.5" stroke-linejoin="round"/>';
      s += '<rect x="72" y="45" width="56" height="9" rx="3.5" fill="#FFD966" stroke="' + C.goldD + '" stroke-width="3.5"/>';
      s += '<circle cx="100" cy="33" r="3.8" fill="#FF4B4B"/><circle cx="82" cy="49.5" r="2.4" fill="#1CB0F6"/><circle cx="118" cy="49.5" r="2.4" fill="#1CB0F6"/>';
    }

    var size = o.size || 120;
    var vb = o.crop === "head" ? "24 8 152 146" : "0 0 200 200";
    var label = o.label || "Capi, tu toro de inversión, nivel " + level;
    return '<svg class="capi' + (o.cls ? " " + o.cls : "") + '" viewBox="' + vb + '" width="' + size + '" height="' + size + '" role="img" aria-label="' + label + '" focusable="false">' + s + "</svg>";
  };
})();

/* ---------- Parte 2: mascota en la app ---------- */
(function () {
  "use strict";
  var API = window.Rendiva;
  if (!API || !window.CapiArt) return;

  var CFG = API.CFG, S = API.S, esc = API.esc, A = API.actions;
  var NAME = CFG.mascot.name || "Capi";
  var P = CFG.mascot.perks;
  var STAGES = ["Cría", "Ahorrador", "Aprendiz", "Inversionista", "Experto", "Leyenda"];
  var MAXL = CFG.mascot.levelXp.length;
  var num = function (n) { return Number(n).toLocaleString("es-MX"); };

  var PERKS = [
    { lvl: 2, ico: "🪙", title: "Ojo de ahorrador", desc: "+" + P.lessonCoins + " 🪙 extra en cada lección." },
    { lvl: 3, ico: "⏳", title: "Paciencia de toro", desc: "Tus vidas se recuperan cada " + P.heartMinutes + " min en lugar de " + CFG.hearts.refillMinutes + "." },
    { lvl: 4, ico: "🛡️", title: "Escudo de racha", desc: "Salva 1 día perdido cada " + P.shieldDays + " días, gratis y sin gastar congelaciones." },
    { lvl: 5, ico: "⚡", title: "Olfato de mercado", desc: "+" + P.xpPercent + "% de XP en todo lo que haces." },
    { lvl: 6, ico: "👑", title: "Rey del reto", desc: "+" + P.dailyCoins + " 🪙 extra en el reto diario." }
  ];

  var stageName = function (l) { return NAME + " " + STAGES[Math.min(l, MAXL) - 1]; };

  function info() {
    var t = CFG.mascot.levelXp, l = API.mLevel(), max = l >= MAXL;
    var from = t[l - 1], to = max ? t[l - 1] : t[l];
    var cur = S.xp - from, span = Math.max(1, to - from);
    return { lvl: l, max: max, cur: cur, span: span, pct: max ? 100 : Math.min(100, Math.round((cur / span) * 100)), toNext: max ? 0 : to - S.xp, stage: STAGES[l - 1], full: stageName(l) };
  }

  function message() {
    var m = API.mood(), n = API.streakNow();
    if (m === "worried") return "¡Practica hoy para no perder tu racha de " + n + (n === 1 ? " día" : " días") + "!";
    if (m === "sleepy") return NAME + " se quedó dormido. Haz una lección y empieza una nueva racha.";
    if (!S.lessons) return "¡Hola! Soy " + NAME + ". Completa una lección y crezco contigo.";
    return "¡Hoy ya practicaste! " + NAME + " está feliz.";
  }

  /* Botón con borde morado y sin etiqueta: abre el aviso de la versión Pro */
  API.pb = function (fid, origin, html, cls) {
    return '<button class="pb ' + (cls || "") + '" data-action="pro" data-feature="' + esc(fid) + '" data-origin="' + esc(origin) + '">' + html + "</button>";
  };

  API.mascot = {
    info: info,
    stageName: stageName,

    /* Tarjeta compacta (Aprender en móvil y panel lateral en escritorio) */
    cardHTML: function (where) {
      var i = info();
      return '<div class="card capi-card" data-where="' + where + '">' +
        '<a class="capi-link" href="#/capi" aria-label="Ver a ' + esc(NAME) + '">' +
        '<span class="capi-art">' + window.CapiArt(i.lvl, API.mood(), { size: 88 }) + "</span>" +
        '<span class="capi-info"><span class="capi-top"><b>' + esc(NAME) + '</b><span class="lvl">Nivel ' + i.lvl + "</span></span>" +
        '<span class="capi-stage">' + esc(i.stage) + "</span>" +
        '<span class="bar thin"><i style="width:' + i.pct + '%;background:var(--gold)"></i></span>' +
        '<span class="capi-sub">' + (i.max ? "Nivel máximo · " + num(S.xp) + " XP" : num(i.cur) + "/" + num(i.span) + " XP para evolucionar") + "</span></span></a>" +
        '<p class="capi-msg">' + esc(message()) + "</p>" +
        API.pb("mascota-trajes", "capi-tarjeta", "👕 Trajes de " + esc(NAME), "capi-dress") + "</div>";
    },

    /* Parte de arriba de "Aprender": mascota (móvil) + dos atajos con borde morado */
    learnTopHTML: function () {
      return '<div class="mobile-only">' + this.cardHTML("aprender") + "</div>" +
        '<div class="pb-row">' + API.pb("lecciones-audio", "aprender-audio", "🎧 Escuchar") + API.pb("lecciones-offline", "aprender-offline", "📥 Sin conexión") + "</div>";
    },

    /* Pantalla de evolución (al terminar una lección y subir de nivel) */
    evolveHTML: function (lvl) {
      var perk = PERKS.filter(function (p) { return p.lvl === lvl; })[0];
      return '<div class="card evo"><div class="evo-art">' + window.CapiArt(lvl, "happy", { size: 150 }) + "</div>" +
        "<h2>¡" + esc(NAME) + " evolucionó!</h2><p><b>" + esc(stageName(lvl)) + "</b> · Nivel " + lvl + "</p>" +
        (perk ? '<div class="reward-card"><span class="ri">' + perk.ico + "</span><span><b>Nueva ventaja: " + esc(perk.title) + "</b><span>" + esc(perk.desc) + "</span></span></div>" : "") + "</div>";
    }
  };

  /* Vista "Mi mascota" */
  function shieldText() {
    if (!API.hasPerk("shield")) return "Se desbloquea en el nivel 4";
    if (API.shieldReady()) return "Listo para usarse";
    var d = API.shieldIn();
    return "Disponible en " + d + (d === 1 ? " día" : " días");
  }
  API.views.capi = {
    title: function () { return "Mi mascota"; },
    html: function () {
      var i = info(), t = CFG.mascot.levelXp;
      var perks = PERKS.map(function (p) {
        var on = i.lvl >= p.lvl;
        return '<div class="perk ' + (on ? "on" : "off") + '"><span class="pi">' + (on ? p.ico : "🔒") + '</span><span class="pt"><b>' + esc(p.title) + "</b><span>" + esc(p.desc) + "</span></span>" +
          '<span class="pl">' + (on ? "Activa" : "Nivel " + p.lvl) + "</span></div>";
      }).join("");
      var evo = STAGES.map(function (s, k) {
        var l = k + 1, got = i.lvl >= l;
        return '<div class="evo-item ' + (got ? "got" : "locked") + (l === i.lvl ? " now" : "") + '">' +
          window.CapiArt(l, "happy", { size: 84, cls: got ? "" : "capi-locked", label: stageName(l) + (got ? "" : " (bloqueado)") }) +
          "<b>" + esc(s) + "</b><span>" + (l === 1 ? "Al empezar" : num(t[l - 1]) + " XP") + "</span></div>";
      }).join("");
      return '<div class="page-head"><h1>Mi mascota</h1></div>' +
        '<div class="card capi-hero"><div class="capi-big">' + window.CapiArt(i.lvl, API.mood(), { size: 190 }) + "</div>" +
        '<div class="bubble-capi">' + esc(message()) + "</div>" +
        '<h2 class="capi-name">' + esc(i.full) + ' <span class="lvl">Nivel ' + i.lvl + "</span></h2>" +
        '<div class="bar"><i style="width:' + i.pct + '%;background:var(--gold)"></i></div>' +
        '<p class="capi-sub">' + (i.max ? "Nivel máximo. Capi ya es una leyenda. " + num(S.xp) + " XP en total." : "Te faltan <b>" + num(i.toNext) + " XP</b> para que " + esc(NAME) + " evolucione.") + "</p>" +
        '<p class="capi-how">Capi crece con tu XP: lecciones, retos diarios y repasos. Si practicas cada día, está contento; si tu racha corre peligro, se preocupa.</p>' +
        API.pb("mascota-trajes", "capi-pagina", "👕 Trajes y accesorios", "block") + "</div>" +
        '<div class="grid-stats"><div class="tile"><b>🔥 ' + API.streakNow() + '</b><span>Racha de días</span></div><div class="tile"><b>🛡️</b><span>Escudo: ' + esc(shieldText()) + "</span></div></div>" +
        '<h3 class="sec-title first">Ventajas de ' + esc(NAME) + '</h3><div class="stack-sm">' + perks + "</div>" +
        '<h3 class="sec-title">Evolución</h3><div class="evo-grid">' + evo + "</div>";
    }
  };
})();

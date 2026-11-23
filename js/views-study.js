/* VIEWS · Panel, Resumen, Flashcards, Práctica intercalada */
(function () {
  const { h } = U, D = DATA, S = Store;

  /* ---------- Pools de contenido ---------- */
  const Pool = {};
  Pool.cards = [
    ...D.verbs.map(v => ({ id: "v:" + v[0], unit: 5, kind: "verb", inf: v[0], past: v[1], pp: v[2], es: v[3] })),
    ...D.events.map((e, i) => ({ id: "e:" + i, unit: 5, kind: "event", en: e[0], past: e[1], es: e[2], ex: e[3] })),
    ...D.travel.map((t, i) => ({ id: "t:" + i, unit: 6, kind: "travel", en: t[0], es: t[1], ex: t[2] }))
  ];
  const mkVerbQ = (v, k) => ({
    id: (k === 1 ? "vp:" : "vpp:") + v[0], unit: k === 1 ? 5 : 6, sec: "v", topic: "verbs", type: "fill",
    q: (k === 1 ? "Past simple of “" : "Past participle of “") + v[0] + "” (" + v[3] + "):",
    ans: v[k].split("/"), why: v[0] + " → " + v[1] + " → " + v[2] + (k === 1 ? " (pasado simple)." : " (participio, para el present perfect).")
  });
  Pool.gen = D.verbs.flatMap(v => [mkVerbQ(v, 1), mkVerbQ(v, 2)]);
  Pool.ex = D.ex;
  Pool.practice = [...D.ex, ...Pool.gen];
  Pool.byUnit = u => (u === "all" || !u) ? Pool.practice : Pool.practice.filter(x => String(x.unit) === String(u));
  Pool.trackable = unit => [...Pool.cards, ...D.ex, ...D.oral].filter(x => x.unit === unit);
  Pool.unitProgress = unit => { const t = Pool.trackable(unit); return U.pct(t.filter(x => S.mastered(x.id)).length, t.length); };
  Pool.overall = () => {
    const u = [5, 6, 7].map(Pool.unitProgress);
    const w = S.state.writingPct || 0;
    return Math.round((u[0] + u[1] + u[2] + w) / 4);
  };
  window.Pool = Pool;

  const V = window.Views = {};

  /* ---------- Panel ---------- */
  V.dashboard = function (root) {
    const st = S.state, day = Math.min(6, S.dayNumber());
    const weak = Pool.practice.concat(Pool.cards).filter(x => S.isWeak(x.id)).length;
    const lastExam = st.exams[st.exams.length - 1];

    // Timer de Sprint 60 minutos
    let timerSecs = 60 * 60, timerId = null, running = false;
    const clockEl = h("div", { class: "sprint-clock" }, "60:00");
    const toggleBtn = h("button", { class: "btn primary", type: "button" }, "▶ Iniciar Sprint (60 min)");
    const resetTimerBtn = h("button", { class: "btn ghost small", type: "button" }, "↻ Reiniciar");

    const fmtT = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
    function updateClock() {
      clockEl.textContent = fmtT(timerSecs);
      clockEl.classList.toggle("running", running && timerSecs > 300);
      clockEl.classList.toggle("alert", timerSecs <= 300 && timerSecs > 0);
    }
    toggleBtn.onclick = () => {
      if (running) {
        clearInterval(timerId); running = false; toggleBtn.textContent = "▶ Reanudar";
      } else {
        running = true; toggleBtn.textContent = "⏸ Pausar";
        timerId = setInterval(() => {
          if (timerSecs > 0) { timerSecs--; updateClock(); }
          else { clearInterval(timerId); running = false; toggleBtn.textContent = "¡Tiempo cumplido!"; U.toast("⏰ ¡Se completaron los 60 minutos del Sprint!"); }
        }, 1000);
      }
      updateClock();
    };
    resetTimerBtn.onclick = () => { clearInterval(timerId); running = false; timerSecs = 60 * 60; toggleBtn.textContent = "▶ Iniciar Sprint (60 min)"; updateClock(); };
    (V._leave = V._leave || []).push(() => clearInterval(timerId));

    // Bloques del sprint
    const sprintSteps = h("div", { class: "sprint-steps" },
      D.sprint.steps.map(s => h("div", { class: "sstep" },
        h("div", { class: "sstep-head" }, h("span", { class: "sstep-num" }, s.num), h("span", { class: "sstep-time" }, s.min)),
        h("h3", {}, s.title),
        h("p", {}, s.desc),
        h("a", { class: "btn small primary", href: s.link }, "Ir a este bloque →"))));

    // Tarjetas de Trampas Clave (Cheat Sheet)
    const trapsList = h("div", { class: "traps-container", id: "traps" },
      h("h2", { style: "margin:24px 0 10px;" }, "🎯 Las 8 Reglas & Trampas Clave de Examen"),
      h("p", { class: "muted" }, "Repasá estas 8 tarjetas en 15 minutos. Cubren las trampas donde más se pierden puntos en Grammar y Vocabulary."),
      D.sprint.traps.map(t => h("details", { class: "trap-card", open: t.num === 1 || t.num === 2 },
        h("summary", {}, h("span", { class: "badge" }, "Regla " + t.num), h("span", {}, t.title)),
        h("div", { class: "trap-body" },
          h("p", { style: "font-weight:600;margin:4px 0 10px;" }, t.rule),
          h("div", { class: "trap-grid" },
            h("div", { class: "trap-bad" }, h("b", {}, "❌ Error común en examen:"), t.bad),
            h("div", { class: "trap-ok" }, h("b", {}, "✅ Forma correcta:"), t.ok)),
          h("div", { class: "trap-tip" }, t.tip)))));

    // Tarjetas de Plantillas de Writing
    const tplList = h("div", { class: "templates-container" },
      h("h2", { style: "margin:24px 0 10px;" }, "📝 3 Plantillas Salvavidas de Writing (First-Time Experience)"),
      h("p", { class: "muted" }, "Elegí una, tocala para cargarla en el editor interactivo y memorizá la estructura y los conectores."),
      h("div", { class: "grid" },
        D.sprint.templates.map(tpl => h("div", { class: "tpl-box" },
          h("h4", {}, h("span", {}, tpl.name), h("span", { class: "pill" }, tpl.tag)),
          h("p", { class: "muted" }, tpl.desc),
          h("div", { class: "tpl-quote" }, "“" + tpl.intro + " " + tpl.body.slice(0, 90) + "…”"),
          h("div", { class: "row end" },
            h("a", { class: "btn small primary", href: "#/writing?tpl=" + tpl.id }, "📋 Cargar y practicar esta plantilla →"))))));

    root.replaceChildren(
      // Hero de Sprint
      h("section", { class: "sprint-hero card" },
        h("span", { class: "badge" }, "⚡ SPRINT 60 MINUTOS · RINDO MAÑANA"),
        h("h1", {}, "Plan de Choque: Examen Escrito"),
        h("p", {}, "Diseñado para prepararte en 1 hora con máxima efectividad. Dominá las 8 trampas de Grammar, las 30 preguntas fijas y asegurá tu Writing con una plantilla aprobada.")),

      // Timer widget
      h("section", { class: "sprint-timer-card" },
        h("div", {},
          h("h3", { style: "margin:0 0 4px;" }, "⏱ Cronómetro de Estudio (1 Hora)"),
          h("p", { class: "muted", style: "margin:0;" }, "Activá el reloj para medir tus 60 minutos de repaso intensivo.")),
        clockEl,
        h("div", { class: "row" }, toggleBtn, resetTimerBtn)),

      // 4 Bloques del Sprint
      h("section", { class: "card" },
        h("h2", {}, "🚀 Tu Ruta de 60 Minutos"),
        h("p", { class: "muted" }, "Seguí estos 4 pasos en orden estricto:"),
        sprintSteps),

      // Cheat sheet de trampas
      trapsList,

      // Plantillas salvavidas
      tplList,

      // Accesos rápidos y estadísticas
      h("section", { class: "card", style: "margin-top:24px;" },
        h("h2", {}, "📊 Estado de Preparación General"),
        h("div", { class: "grid stats", style: "margin:14px 0;" },
          stat("🔥", S.streak(), "días seguidos"), stat("🔁", weak, "ítems débiles"),
          stat("📝", st.exams.length, "simulacros"), stat("🏆", lastExam ? lastExam.total + "/100" : "—", "último puntaje")),
        h("div", { class: "cta" },
          h("a", { class: "btn primary", href: "#/practice?sprint=1" }, "⚡ 30 Preguntas Top Examen"),
          h("a", { class: "btn", href: "#/exam?quick=1" }, "⏱ Mini-Simulacro (15 min)"),
          h("a", { class: "btn", href: "#/writing" }, "📝 Taller de Writing")),
        h("div", { class: "unitrow", style: "margin-top:16px;" },
          h("div", { class: "ulabel" }, h("span", { class: "badge u5" }, "U5"), "Past simple, wh-, time phrases, life events", h("b", {}, Pool.unitProgress(5) + "%")), U.progress(Pool.unitProgress(5))),
        h("div", { class: "unitrow" },
          h("div", { class: "ulabel" }, h("span", { class: "badge u6" }, "U6"), "Present perfect, comparatives, travel phrases", h("b", {}, Pool.unitProgress(6) + "%")), U.progress(Pool.unitProgress(6))),
        h("div", { class: "unitrow" },
          h("div", { class: "ulabel" }, h("span", { class: "badge u7" }, "U7"), "Futuro + indefinite pronouns", h("b", {}, Pool.unitProgress(7) + "%")), U.progress(Pool.unitProgress(7))),
        h("div", { class: "unitrow" },
          h("div", { class: "ulabel" }, h("span", { class: "badge uw" }, "W"), "Writing · first-time experience", h("b", {}, (st.writingPct || 0) + "%")), U.progress(st.writingPct || 0))));

    function stat(i, n, l) { return h("div", { class: "card stat" }, h("div", { class: "ico" }, i), h("b", {}, n), h("span", { class: "muted" }, l)); }
  };

  /* ---------- Resumen de reglas ---------- */
  V.ref = function (root) {
    root.replaceChildren(h("h1", {}, "Resumen de reglas"), h("p", { class: "muted" }, "Basado en las Grammar Bank y Vocabulary Bank del libro Speak Out A2."),
      D.rules.map(r => h("details", { class: "card rule", open: r.unit === 5 && r === D.rules[0] },
        h("summary", {}, h("span", { class: "badge u" + r.unit }, "U" + r.unit), r.title), h("div", { class: "rbody", html: r.html }),
        r.unit !== 5 || r.title.startsWith("U5") ? h("a", { class: "btn small", href: "#/practice?unit=" + r.unit }, "Practicar U" + r.unit) : null)),
      h("section", { class: "card" }, h("h2", {}, "Tabla de verbos irregulares"),
        h("div", { class: "tablewrap" }, h("table", { class: "mini" }, h("tr", {}, ["Infinitive", "Past", "Participle", "Español"].map(x => h("th", {}, x))),
          D.verbs.map(v => h("tr", {}, v.map((c, i) => h("td", {}, i === 3 ? c : h("button", { class: "linkbtn", onclick: () => U.speak(c.split("/")[0]) }, c)))))))));
  };

  /* ---------- Flashcards ---------- */
  V.cards = function (root) {
    const q = U.query();
    const decks = { verbs: "Verbos irregulares", events: "Life events", travel: "Travel phrases", all: "Todo", weak: "Mis errores" };
    let deck = q.deck && decks[q.deck] ? q.deck : "verbs", typing = false;

    function setup() {
      root.replaceChildren(h("h1", {}, "Flashcards · Active recall"),
        h("p", { class: "muted" }, "Intentá recordar ANTES de dar vuelta la tarjeta. Las que fallás vuelven más seguido."),
        h("section", { class: "card" },
          h("div", { class: "chips" }, Object.entries(decks).map(([k, l]) => h("button", { class: "chip" + (k === deck ? " on" : ""), onclick: () => { deck = k; setup(); } }, l + " (" + cardsFor(k).length + ")"))),
          deck === "verbs" ? h("label", { class: "task" }, h("input", { type: "checkbox", checked: typing, onchange: e => { typing = e.target.checked; } }), "Modo escribir (infinitivo → escribo pasado y participio)") : null,
          h("button", { class: "btn primary big", onclick: start }, "Empezar sesión")));
    }
    function cardsFor(k) {
      const m = { verbs: "verb", events: "event", travel: "travel" };
      if (k === "all") return Pool.cards;
      if (k === "weak") return Pool.cards.filter(c => S.isWeak(c.id));
      return Pool.cards.filter(c => c.kind === m[k]);
    }
    function start() {
      let list = cardsFor(deck);
      if (!list.length) { U.toast("No tenés tarjetas débiles todavía. ¡Bien!"); return; }
      const session = S.pick(list, Math.min(15, list.length));
      let i = 0, known = 0;
      const show = () => {
        if (i >= session.length) return end();
        const c = session[i], revealed = { v: false };
        const front = c.kind === "verb" ? [h("div", { class: "cw" }, c.inf), h("div", { class: "muted" }, c.es)] : [h("div", { class: "cw sm" }, c.es), h("div", { class: "muted" }, "¿Cómo se dice en inglés?")];
        const backBody = c.kind === "verb"
          ? [h("div", { class: "forms" }, h("div", {}, h("small", {}, "PAST"), h("b", {}, c.past)), h("div", {}, h("small", {}, "PARTICIPLE"), h("b", {}, c.pp)))]
          : [h("div", { class: "cw sm" }, c.en), c.past ? h("div", { class: "muted" }, "Past: " + c.past) : null, h("p", { class: "ex" }, c.ex)];
        const speakText = c.kind === "verb" ? c.inf + ", " + c.past.split("/")[0] + ", " + c.pp.split("/")[0] : c.ex || c.en;
        const card = h("div", { class: "flash", tabindex: "0", role: "button", "aria-label": "Dar vuelta la tarjeta" },
          h("div", { class: "face front" }, front), h("div", { class: "face back" }, backBody));
        const grade = ok => { S.grade(c.id, ok); if (ok) known++; i++; show(); };
        const flip = () => { card.classList.add("flipped"); revealed.v = true; actions.hidden = false; flipBtn && (flipBtn.hidden = true); };
        let actions = h("div", { class: "row center", hidden: true }, h("button", { class: "btn bad", onclick: () => grade(false) }, "✗ No la sabía"), h("button", { class: "btn good", onclick: () => grade(true) }, "✓ La sabía"));
        let flipBtn = null, typed = null;
        if (typing && c.kind === "verb") {
          const a = h("input", { class: "fillin", placeholder: "past simple", autocomplete: "off", autocapitalize: "off" }), b = h("input", { class: "fillin", placeholder: "past participle", autocomplete: "off", autocapitalize: "off" });
          const chk = h("button", { class: "btn primary", onclick: () => {
            const ok = f => (f === "past" ? c.past : c.pp).split("/").some(x => U.norm(x) === U.norm((f === "past" ? a : b).value));
            const okA = ok("past"), okB = ok("pp");
            a.classList.add(okA ? "right" : "wrong"); b.classList.add(okB ? "right" : "wrong");
            a.disabled = b.disabled = chk.disabled = true; flip(); actions.hidden = true;
            setTimeout(() => grade(okA && okB), 1800);
          } }, "Comprobar");
          typed = h("div", { class: "row center" }, a, b, chk);
        } else {
          flipBtn = h("button", { class: "btn primary", onclick: flip }, "Mostrar respuesta");
          card.onclick = flip; card.onkeydown = e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } };
        }
        root.replaceChildren(
          h("div", { class: "row between" }, h("b", {}, (i + 1) + " / " + session.length), h("button", { class: "btn ghost small", onclick: setup }, "Salir")),
          U.progress(U.pct(i, session.length)), card,
          h("div", { class: "row center" }, h("button", { class: "btn ghost small", onclick: () => U.speak(speakText) }, "🔊 Escuchar"), h("button", { class: "btn ghost small", onclick: () => U.speak(speakText, 0.6) }, "🐢 Lento")),
          typed, h("div", { class: "row center" }, flipBtn), actions);
        card.focus && card.focus();
      };
      const end = () => root.replaceChildren(h("section", { class: "card center" }, h("h2", {}, "¡Sesión completa!"),
        h("p", { class: "big" }, known + " / " + session.length + " recordadas"), h("p", { class: "muted" }, "Lo que fallaste volverá a aparecer pronto."),
        h("div", { class: "row center" }, h("button", { class: "btn primary", onclick: start }, "Otra sesión"), h("button", { class: "btn", onclick: setup }, "Elegir mazo"), h("a", { class: "btn", href: "#/" }, "Panel"))));
      show();
    }
    setup();
  };

  /* ---------- Práctica intercalada ---------- */
  V.practice = function (root) {
    const q = U.query();
    const isSprint = q.sprint === "1";
    let unit = ["5", "6", "7", "all"].includes(q.unit) ? q.unit : "all", weakOnly = q.weak === "1", size = isSprint ? 30 : 10;

    function setup() {
      const pool = isSprint ? D.ex.filter(x => D.sprint.highYieldIds.includes(x.id)) : Pool.byUnit(unit);
      const weakN = pool.filter(x => S.isWeak(x.id)).length;
      root.replaceChildren(
        h("div", { class: "row between" },
          h("h1", {}, isSprint ? "⚡ Entrenamiento de Alto Impacto (30 Preguntas)" : "Práctica intercalada"),
          isSprint ? h("span", { class: "pill" }, "Modo Sprint 60'") : null),
        h("p", { class: "muted" }, isSprint
          ? "Las 30 preguntas clave de Grammar y Vocabulary más probables de salir en el examen escrito. Feedback y explicación inmediata."
          : "Ejercicios mezclados (completar, elegir, ordenar, detectar errores) con feedback inmediato. Lo que fallás vuelve con más frecuencia."),
        h("section", { class: "card" },
          !isSprint ? h("div", {},
            h("h3", {}, "Unidad"),
            h("div", { class: "chips" }, [["all", "Todas (mezcla)"], ["5", "U5 Past simple"], ["6", "U6 Perfect / Comp."], ["7", "U7 Futuro / Pronombres"]].map(([k, l]) =>
              h("button", { class: "chip" + (k === unit ? " on" : ""), onclick: () => { unit = k; setup(); } }, l))),
            h("h3", {}, "Cantidad"),
            h("div", { class: "chips" }, [10, 20, 30].map(n => h("button", { class: "chip" + (n === size ? " on" : ""), onclick: () => { size = n; setup(); } }, n + " preguntas"))),
            h("label", { class: "task" }, h("input", { type: "checkbox", checked: weakOnly, onchange: e => { weakOnly = e.target.checked; } }), "Solo mis puntos débiles (" + weakN + ")")
          ) : h("div", { style: "margin-bottom:12px;" },
            h("p", {}, "🎯 30 preguntas equilibradas que cubren Past Simple, Present Perfect vs Past, Comparativos/Superlativos, Futuros, Indefinite Pronouns y Travel Phrases.")),
          h("button", { class: "btn primary big", onclick: start }, isSprint ? "Iniciar Entrenamiento (30 Preguntas)" : "Empezar")));
    }
    function start() {
      let pool = isSprint ? D.ex.filter(x => D.sprint.highYieldIds.includes(x.id)) : Pool.byUnit(unit);
      if (!pool.length) pool = Pool.practice;
      if (weakOnly) { const w = pool.filter(x => S.isWeak(x.id)); if (w.length) pool = w; else U.toast("Sin puntos débiles: practicamos todo"); }
      const session = S.pick(pool, Math.min(size, pool.length));
      let i = 0; const results = [];
      const next = () => {
        if (i >= session.length) return end();
        const item = session[i];
        const nextBtn = h("button", { class: "btn primary", hidden: true, onclick: () => { i++; next(); } }, i === session.length - 1 ? "Ver resultados" : "Siguiente →");
        const qEl = U.question(item, { feedback: true, onDone: ok => { S.grade(item.id, ok); results.push({ item, ok }); nextBtn.hidden = false; nextBtn.focus(); } });
        root.replaceChildren(h("div", { class: "row between" }, h("b", {}, (i + 1) + " / " + session.length + " · ✓ " + results.filter(r => r.ok).length), h("button", { class: "btn ghost small", onclick: setup }, "Salir")),
          U.progress(U.pct(i, session.length)), h("section", { class: "card" }, qEl), h("div", { class: "row end" }, nextBtn));
      };
      const end = () => {
        const ok = results.filter(r => r.ok).length, bad = results.filter(r => !r.ok);
        root.replaceChildren(h("section", { class: "card center" }, h("h2", {}, ok + " / " + session.length + " correctas (" + U.pct(ok, session.length) + "%)"),
          bad.length ? h("div", { class: "review" }, h("h3", {}, "A repasar"), bad.map(r => h("div", { class: "revitem" }, h("p", {}, r.item.type === "err" ? r.item.q : r.item.q), h("p", {}, "→ ", h("b", {}, U.answerText(r.item))), h("p", { class: "muted" }, "💡 " + r.item.why)))) : h("p", {}, "🎉 ¡Sin errores!"),
          h("div", { class: "row center" }, h("button", { class: "btn primary", onclick: start }, "Otra ronda"), h("button", { class: "btn", onclick: setup }, "Cambiar opciones"), h("a", { class: "btn", href: "#/" }, "Panel"))));
      };
      next();
    }
    setup();
  };
})();


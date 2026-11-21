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
    const taskPct = ph => { const t = D.tasks.filter(x => x.phase === ph); return U.pct(t.filter(x => st.tasks[x.id]).length, t.length); };

    const phaseCard = (ph, title, sub, days) => {
      const card = h("section", { class: "card phase p" + ph },
        h("div", { class: "phead" }, h("div", {}, h("h2", {}, title), h("p", { class: "muted" }, sub)), h("div", { class: "big" }, taskPct(ph) + "%")),
        U.progress(taskPct(ph)));
      days.forEach(d => {
        const tasks = D.tasks.filter(t => t.phase === ph && t.day === d);
        card.append(h("div", { class: "day" + (d === day ? " today" : "") },
          h("h3", {}, "Día " + d, d === day ? h("span", { class: "pill" }, "hoy") : null),
          tasks.map(t => h("label", { class: "task" },
            h("input", { type: "checkbox", checked: !!st.tasks[t.id], onchange: e => { st.tasks[t.id] = e.target.checked; S.save(); V.dashboard(root); } }),
            h("a", { href: t.link }, t.text)))));
      });
      return card;
    };

    root.replaceChildren(
      h("section", { class: "hero card" },
        h("div", {}, h("h1", {}, "Examen ADULTS A2 II"), h("p", { class: "muted" }, "Speak Mendoza · Hoy es el Día " + day + " de 6. Dominado = caja 3 o más del sistema Leitner.")),
        h("div", { class: "ring", style: "--p:" + Pool.overall() }, h("span", {}, Pool.overall() + "%"), h("small", {}, "progreso"))),
      h("div", { class: "grid stats" },
        stat("🔥", S.streak(), "días seguidos"), stat("🔁", weak, "ítems por repasar"),
        stat("📝", st.exams.length, "simulacros"), stat("🏆", lastExam ? lastExam.total + "/100" : "—", "último simulacro")),
      h("div", { class: "cta" },
        h("a", { class: "btn primary", href: "#/practice?unit=all&weak=1" }, weak ? "Repasar mis errores (" + weak + ")" : "Práctica intercalada"),
        h("a", { class: "btn", href: "#/exam" }, "Simulacro escrito"),
        h("a", { class: "btn", href: "#/oral" }, "Entrenador oral")),
      h("section", { class: "card" }, h("h2", {}, "Progreso por unidad"),
        [[5, "U5 · Past simple, wh-, time phrases, life events"], [6, "U6 · Present perfect, comparatives, travel phrases"], [7, "U7 · Futuro + indefinite pronouns"]].map(([u, l]) =>
          h("div", { class: "unitrow" }, h("div", { class: "ulabel" }, h("span", { class: "badge u" + u }, "U" + u), l, h("b", {}, Pool.unitProgress(u) + "%")), U.progress(Pool.unitProgress(u)))),
        h("div", { class: "unitrow" }, h("div", { class: "ulabel" }, h("span", { class: "badge uw" }, "W"), "Writing · first-time experience", h("b", {}, (st.writingPct || 0) + "%")), U.progress(st.writingPct || 0))),
      h("div", { class: "grid two" },
        phaseCard(1, "Fase 1 · Examen escrito", "Prioridad máxima · Días 1-2", [1, 2]),
        phaseCard(2, "Fase 2 · Examen oral", "Fluidez y pronunciación · Días 3-6", [3, 4, 5, 6])),
      h("div", { class: "row end" },
        h("button", { class: "btn ghost", onclick: () => { if (confirm("¿Reiniciar el cronograma? Hoy será el Día 1 (tu progreso se mantiene).")) { S.restartPlan(); V.dashboard(root); } } }, "Hoy = Día 1"),
        h("button", { class: "btn ghost danger", onclick: () => { if (confirm("Esto borra TODO tu progreso guardado. ¿Seguro?")) { S.reset(); V.dashboard(root); } } }, "Borrar progreso")));
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
    let unit = ["5", "6", "7", "all"].includes(q.unit) ? q.unit : "all", weakOnly = q.weak === "1", size = 10;

    function setup() {
      const pool = Pool.byUnit(unit), weakN = pool.filter(x => S.isWeak(x.id)).length;
      root.replaceChildren(h("h1", {}, "Práctica intercalada"),
        h("p", { class: "muted" }, "Ejercicios mezclados (completar, elegir, ordenar, detectar errores) con feedback inmediato. Lo que fallás vuelve con más frecuencia."),
        h("section", { class: "card" },
          h("h3", {}, "Unidad"),
          h("div", { class: "chips" }, [["all", "Todas (mezcla)"], ["5", "U5 Past simple"], ["6", "U6 Perfect / Comp."], ["7", "U7 Futuro / Pronombres"]].map(([k, l]) =>
            h("button", { class: "chip" + (k === unit ? " on" : ""), onclick: () => { unit = k; setup(); } }, l))),
          h("h3", {}, "Cantidad"),
          h("div", { class: "chips" }, [10, 20, 30].map(n => h("button", { class: "chip" + (n === size ? " on" : ""), onclick: () => { size = n; setup(); } }, n + " preguntas"))),
          h("label", { class: "task" }, h("input", { type: "checkbox", checked: weakOnly, onchange: e => { weakOnly = e.target.checked; } }), "Solo mis puntos débiles (" + weakN + ")"),
          h("button", { class: "btn primary big", onclick: start }, "Empezar")));
    }
    function start() {
      let pool = Pool.byUnit(unit);
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


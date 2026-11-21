/* VIEWS · Writing, Simulacro escrito, Entrenador oral */
(function () {
  const { h } = U, D = DATA, S = Store, V = window.Views;
  const leave = fn => (V._leave = V._leave || []).push(fn);

  /* ---------- Análisis de texto (writing) ---------- */
  const pastSet = new Set(D.verbs.flatMap(v => v[1].split("/")).filter(w => !["read", "put", "cost", "come", "run"].includes(w)));
  const ppSet = new Set(D.verbs.flatMap(v => v[2].split("/")));
  const notVerbs = new Set(["need", "red", "bed", "speed", "hundred", "indeed", "weekend", "friend", "kind", "bored", "tired", "excited", "scared", "interested", "worried", "married"]);
  const LINK_RE = D.linkerFlat.concat(["after that", "at first", "in the end", "for example", "one day"]);
  function analyze(text) {
    const lower = text.toLowerCase().replace(/[’]/g, "'");
    const words = (lower.match(/[a-z']+/g) || []);
    const past = new Set(words.filter(w => (pastSet.has(w) || (/\w{3,}ed$/.test(w) && !notVerbs.has(w)))));
    let perfect = false;
    words.forEach((w, i) => {
      if (/^(have|has|'ve|ve|haven't|hasn't)$/.test(w) || /'ve$/.test(w)) {
        for (let k = 1; k <= 3 && i + k < words.length; k++) { const n = words[i + k]; if (ppSet.has(n) || /\w{3,}ed$/.test(n)) { perfect = true; break; } }
      }
    });
    const links = new Set(); const uniq = [...new Set(LINK_RE)];
    uniq.forEach(l => { if (new RegExp("(^|[^a-z])" + l.replace(/ /g, "\\s+") + "([^a-z]|$)").test(lower)) links.add(l); });
    const future = /going to|'ll|will/.test(lower);
    const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length;
    return { words: words.length, past: [...past], perfect, future, links: [...links], sentences };
  }

  /* ---------- Taller de writing ---------- */
  V.writing = function (root) {
    const W = D.writing, st = S.state.writing;
    st.checks = st.checks || {};
    let focus = null;
    const areas = {};
    const stats = h("div", { class: "wstats" }), checklist = h("div", { class: "checklist" }), modelBox = h("div", { class: "card", hidden: true });

    const full = () => [st.intro, st.body, st.end].filter(Boolean).join("\n\n");
    const count = t => (t.trim().match(/[A-Za-z']+/g) || []).length;

    function insert(txt) {
      const ta = focus || areas.body; if (!ta) return;
      const s = ta.selectionStart ?? ta.value.length, e = ta.selectionEnd ?? s;
      const before = ta.value.slice(0, s), after = ta.value.slice(e);
      const pre = before && !/\s$/.test(before) ? " " : "";
      const ins = pre + txt + (/[,:]$/.test(txt) || true ? " " : "");
      ta.value = before + ins + after; ta.focus();
      ta.selectionStart = ta.selectionEnd = (before + ins).length;
      ta.dispatchEvent(new Event("input"));
    }

    const AUTO = [
      ["words", "Al menos 60 palabras", a => a.words >= 60],
      ["past", "Usé pasado simple (3+ verbos)", a => a.past.length >= 3],
      ["perfect", "Usé present perfect o ever/never (I have never…)", a => a.perfect],
      ["links", "Usé 4+ conectores distintos", a => a.links.length >= 4],
      ["parts", "Completé las 3 partes (intro, desarrollo, conclusión)", () => st.intro.trim() && st.body.trim() && st.end.trim()]
    ];
    const MANUAL = [["spell", "Revisé la ortografía (palabras difíciles y verbos irregulares)"], ["punct", "Mayúsculas al inicio y punto final en cada oración"], ["read", "Lo leí en voz alta una vez"]];

    function refresh() {
      const a = analyze(full()), total = count(full());
      stats.replaceChildren(
        h("div", { class: "pillbox" }, h("b", { class: total >= 60 ? "okc" : "" }, total), " palabras ", h("span", { class: "muted" }, "(objetivo 60–90)")),
        h("div", { class: "pillbox" }, "Verbos en pasado: ", h("b", {}, a.past.length), a.past.length ? h("span", { class: "muted" }, " (" + a.past.slice(0, 6).join(", ") + ")") : null),
        h("div", { class: "pillbox" }, "Conectores: ", h("b", {}, a.links.length), a.links.length ? h("span", { class: "muted" }, " (" + a.links.slice(0, 6).join(", ") + ")") : null));
      let ok = 0;
      checklist.replaceChildren(h("h3", {}, "Checklist de autoevaluación"),
        AUTO.map(([k, l, f]) => { const v = !!f(a); if (v) ok++; return h("div", { class: "check auto " + (v ? "done" : "") }, h("span", { class: "tick" }, v ? "✓" : "○"), l); }),
        MANUAL.map(([k, l]) => { const v = !!st.checks[k]; if (v) ok++; return h("label", { class: "check" }, h("input", { type: "checkbox", checked: v, onchange: e => { st.checks[k] = e.target.checked; S.save(); refresh(); } }), l); }));
      S.state.writingPct = Math.round(100 * ok / (AUTO.length + MANUAL.length)); S.save();
    }

    const stepEls = W.steps.map(step => {
      const ta = h("textarea", { rows: 5, placeholder: "Escribí acá…", "aria-label": step.title, spellcheck: "true" });
      ta.value = st[step.key] || ""; areas[step.key] = ta;
      ta.addEventListener("focus", () => focus = ta);
      ta.addEventListener("input", () => { st[step.key] = ta.value; S.touch && S.touch(); S.save(); refresh(); });
      return h("section", { class: "card step" }, h("h3", {}, step.title), h("p", { class: "muted" }, step.hint),
        h("div", { class: "chips" }, step.starters.map(s => h("button", { class: "chip ghost", type: "button", onclick: () => { focus = ta; insert(s); } }, s))), ta);
    });
    focus = areas.body;

    const bank = h("section", { class: "card sticky" }, h("h3", {}, "Banco de linking words"), h("p", { class: "muted" }, "Tocá para insertar en el cuadro activo."),
      D.linkers.map(([g, ws]) => h("div", { class: "lgroup" }, h("small", {}, g), h("div", { class: "chips" }, ws.map(w => h("button", { class: "chip link", type: "button", onclick: () => insert(w) }, w))))));

    const M = W.model;
    const hl = t => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\b(First|Then|Next|After that|At first|Suddenly|However|Finally|but|because|so|and)\b/g, "<mark>$1</mark>");
    modelBox.append(h("h3", {}, M.title), h("p", { html: hl(M.intro) }), h("p", { html: hl(M.body) }), h("p", { html: hl(M.end) }),
      h("table", { class: "mini" }, M.notes.map(n => h("tr", {}, h("th", {}, n[0]), h("td", {}, n[1])))),
      h("button", { class: "btn small", onclick: () => U.speak([M.intro, M.body, M.end].join(" "), 0.9) }, "🔊 Escuchar el modelo"));

    root.replaceChildren(h("h1", {}, "Taller de writing · A first-time experience"),
      h("p", { class: "muted" }, "Estructura guiada, conectores clickeables y autoevaluación. Se guarda automáticamente."),
      h("div", { class: "row" }, h("button", { class: "btn", onclick: () => { modelBox.hidden = !modelBox.hidden; } }, "📖 Ver / ocultar ejemplo modelo"),
        h("button", { class: "btn ghost", onclick: () => { navigator.clipboard && navigator.clipboard.writeText(full()).then(() => U.toast("Texto copiado")); } }, "Copiar texto"),
        h("button", { class: "btn ghost danger", onclick: () => { if (confirm("¿Borrar tu texto?")) { st.intro = st.body = st.end = ""; Object.values(areas).forEach(a => a.value = ""); S.save(); refresh(); } } }, "Limpiar")),
      modelBox,
      h("div", { class: "writelayout" }, h("div", {}, stepEls, stats, checklist), bank),
      h("button", { class: "fab", type: "button", "aria-label": "Abrir banco de conectores", onclick: () => bank.classList.toggle("open") }, "🔗 Conectores"));
    bank.prepend(h("button", { class: "btn small sheetclose", type: "button", onclick: () => bank.classList.remove("open") }, "Cerrar ✕"));
    refresh();
  };

  /* ---------- Simulacro escrito ---------- */
  V.exam = function (root) {
    let minutes = 60;
    const hist = S.state.exams;
    function setup() {
      root.replaceChildren(h("h1", {}, "Simulacro de examen escrito"),
        h("section", { class: "card" },
          h("ul", { class: "plain" }, h("li", {}, h("b", {}, "Grammar (20): "), "Past simple + wh-, Present perfect vs past, comparatives/superlatives, futuro."),
            h("li", {}, h("b", {}, "Vocabulary (14): "), "verbos irregulares, life events, travel phrases, indefinite pronouns."),
            h("li", {}, h("b", {}, "Writing: "), "a first-time experience (80 puntos objetivos + 20 de writing = 100).")),
          h("p", { class: "muted" }, "Sin pistas ni feedback hasta el final. Si se acaba el tiempo, se entrega solo."),
          h("div", { class: "chips" }, [45, 60, 90].map(m => h("button", { class: "chip" + (m === minutes ? " on" : ""), onclick: () => { minutes = m; setup(); } }, m + " min"))),
          h("button", { class: "btn primary big", onclick: start }, "Comenzar examen")),
        hist.length ? h("section", { class: "card" }, h("h3", {}, "Historial"), h("table", { class: "mini" }, h("tr", {}, ["Fecha", "Grammar", "Vocab", "Writing", "Total"].map(x => h("th", {}, x))),
          hist.slice().reverse().slice(0, 8).map(e => h("tr", {}, [new Date(e.date).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }), e.g + "/20", e.v + "/14", e.w + "/20", h("b", {}, e.total + "/100")].map(c => h("td", {}, c)))))) : null);
    }

    function build() {
      const by = (pred, n) => U.shuffle(D.ex.filter(pred)).slice(0, n);
      const g = U.shuffle([...by(x => x.sec === "g" && x.unit === 5, 6), ...by(x => x.topic === "pp" || x.topic === "contrast", 5), ...by(x => x.topic === "comp", 4), ...by(x => x.topic === "future", 5)]);
      const verbQ = U.shuffle(Pool.gen);
      const v = U.shuffle([...verbQ.filter(x => x.id.startsWith("vp:")).slice(0, 2), ...verbQ.filter(x => x.id.startsWith("vpp:")).slice(0, 2),
        ...by(x => x.topic === "events", 3), ...by(x => x.topic === "travel", 3), ...by(x => x.topic === "pronouns", 4)]);
      return { g, v };
    }

    function start() {
      const { g, v } = build(); const qs = [...g.map(x => ({ item: x, sec: "Grammar" })), ...v.map(x => ({ item: x, sec: "Vocabulary" }))];
      const answers = []; let i = 0, left = minutes * 60, finished = false;
      const clock = h("span", { class: "clock" }), secEl = h("span", { class: "tag" });
      const body = h("div");
      const fmt = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
      const tick = () => { left--; clock.textContent = "⏱ " + fmt(Math.max(0, left)); clock.classList.toggle("warn", left < 300); if (left <= 0) finish(); };
      const timer = setInterval(tick, 1000); leave(() => clearInterval(timer)); clock.textContent = "⏱ " + fmt(left);

      root.replaceChildren(h("div", { class: "examhead" }, h("div", {}, secEl, " ", h("b", { class: "qn" })), clock), U.progress(0), h("section", { class: "card" }, body));
      const bar = root.querySelector(".bar span"), qn = root.querySelector(".qn");

      function showQ() {
        if (i >= qs.length) return showWriting();
        const { item, sec } = qs[i]; secEl.textContent = sec; qn.textContent = "Pregunta " + (i + 1) + " / " + qs.length; bar.style.width = U.pct(i, qs.length + 1) + "%";
        let answered = false;
        const nextBtn = h("button", { class: "btn primary", onclick: () => { if (!answered) answers.push({ item, ans: null, ok: false, sec }); i++; showQ(); } }, "Siguiente →");
        const qEl = U.question(item, { feedback: false, onDone: (ok, ans) => { answered = true; answers.push({ item, ans, ok, sec }); } });
        body.replaceChildren(qEl, h("div", { class: "row end" }, h("small", { class: "muted" }, "Podés avanzar sin responder."), nextBtn));
      }
      function showWriting() {
        secEl.textContent = "Writing"; qn.textContent = ""; bar.style.width = "95%";
        const ta = h("textarea", { rows: 10, placeholder: "Write here…", spellcheck: "false" }), wc = h("b", {}, "0");
        ta.oninput = () => { wc.textContent = analyze(ta.value).words; };
        body.replaceChildren(h("h2", {}, "Writing"), h("p", {}, D.writing.prompt), ta, h("div", { class: "row between" }, h("span", {}, "Palabras: ", wc, " / 60-90"), h("button", { class: "btn primary", onclick: () => finish(ta.value) }, "Entregar examen")));
        body._ta = ta; writingBox = ta;
      }
      let writingBox = null;
      function finish(text) {
        if (finished) return; finished = true; clearInterval(timer);
        text = typeof text === "string" ? text : (writingBox ? writingBox.value : "");
        const used = minutes * 60 - Math.max(0, left);
        qs.slice(answers.length).forEach(q => answers.push({ item: q.item, ans: null, ok: false, sec: q.sec }));
        answers.forEach(a => S.grade(a.item.id, a.ok));
        report(answers, text, used);
      }
      showQ();
    }

    function rate(text) {
      const a = analyze(text); const pts = []; let w = 0;
      const add = (n, max, msg) => { w += n; pts.push([n, max, msg]); };
      add(a.words >= 60 ? 6 : a.words >= 40 ? 3 : a.words >= 20 ? 1 : 0, 6, "Extensión: " + a.words + " palabras (meta 60+)");
      add(a.links.length >= 4 ? 5 : a.links.length >= 2 ? 2 : 0, 5, "Conectores: " + (a.links.join(", ") || "ninguno") + " (meta 4+)");
      add(a.past.length >= 3 ? 4 : a.past.length >= 1 ? 2 : 0, 4, "Pasado simple: " + a.past.length + " verbos detectados");
      add(a.perfect || a.future ? 2 : 0, 2, "Present perfect / futuro (I have never…, going to)");
      add(a.sentences >= 5 ? 3 : a.sentences >= 3 ? 1 : 0, 3, "Orden y puntuación: " + a.sentences + " oraciones completas");
      return { w, pts };
    }

    function report(answers, text, secs) {
      const gA = answers.filter(a => a.sec === "Grammar"), vA = answers.filter(a => a.sec === "Vocabulary");
      const gOk = gA.filter(a => a.ok).length, vOk = vA.filter(a => a.ok).length;
      const wr = rate(text), obj = Math.round(80 * (gOk + vOk) / answers.length), total = obj + wr.w;
      S.state.exams.push({ date: Date.now(), g: gOk, v: vOk, w: wr.w, total, secs }); S.save();
      const show = a => a.ans == null ? "(sin responder)" : a.item.type === "err" ? U.errTokens(a.item)[a.ans] : a.ans;
      const wrong = answers.filter(a => !a.ok);
      root.replaceChildren(
        h("section", { class: "card center" }, h("div", { class: "ring big", style: "--p:" + total }, h("span", {}, total), h("small", {}, "/ 100")),
          h("h2", {}, total >= 80 ? "¡Excelente!" : total >= 60 ? "Bien, ¡a pulir los errores!" : "Hay que repasar, vamos por buen camino"),
          h("p", { class: "muted" }, "Tiempo usado: " + Math.floor(secs / 60) + " min " + (secs % 60) + " s"),
          h("div", { class: "grid stats" }, [["Grammar", gOk + "/" + gA.length], ["Vocabulary", vOk + "/" + vA.length], ["Writing (estimado)", wr.w + "/20"]].map(([l, v]) => h("div", { class: "card stat" }, h("b", {}, v), h("span", { class: "muted" }, l))))),
        h("section", { class: "card" }, h("h3", {}, "Writing: cómo se evaluó"), wr.pts.map(p => h("div", { class: "check auto " + (p[0] >= p[1] ? "done" : "") }, h("span", { class: "tick" }, p[0] + "/" + p[1]), p[2])),
          h("p", { class: "muted" }, "La nota de writing es una estimación automática; tu profesor puede evaluar distinto.")),
        h("section", { class: "card" }, h("h3", {}, "Revisión detallada de errores (" + wrong.length + ")"),
          wrong.length ? wrong.map(a => h("div", { class: "revitem" }, h("span", { class: "badge u" + a.item.unit }, "U" + a.item.unit), h("p", {}, a.item.type === "err" ? "Error en: " + a.item.q : a.item.q),
            h("p", { class: "bad" }, "Tu respuesta: " + show(a)), h("p", { class: "good" }, "Correcta: " + U.answerText(a.item)), h("p", { class: "muted" }, "💡 " + a.item.why))) : h("p", {}, "🎉 Sin errores objetivos.")),
        h("div", { class: "row center" }, h("button", { class: "btn primary", onclick: setup }, "Nuevo simulacro"), h("a", { class: "btn", href: "#/practice?unit=all&weak=1" }, "Practicar mis errores"), h("a", { class: "btn", href: "#/" }, "Panel")));
    }
    setup();
  };

  /* ---------- Entrenador oral ---------- */
  const TARGETS = {
    past: [/\b(\w{3,}ed|was|were|went|had|got|did|didn't|made|took|saw|ate|drove|left|met|learnt|said|came|bought|born)\b/i, "Pasado simple"],
    perfect: [/\b(have|has|haven't|hasn't|'ve)\b|\b(never|ever)\b/i, "Present perfect / never / ever"],
    comp: [/(\w+er than|the \w+est|more \w+|the most|\bbetter\b|\bbest\b|\bworse\b|\bworst\b|\bbigger\b|\bsmaller\b)/i, "Comparativo / superlativo"],
    future: [/(going to|'ll|\bwill\b|\bshall\b|\b(am|are|is|'m|'re)\s+\w+ing\b)/i, "Futuro (going to / will / continuous)"]
  };
  V.oral = function (root) {
    const q = U.query(); let tab = "train", unit = ["5", "6", "7"].includes(q.unit) ? q.unit : "all", secs = 45, mode = q.mode === "sim" ? "sim" : "cards";
    const stopAll = () => { U.hasTTS && speechSynthesis.cancel(); };
    leave(stopAll);

    function frame(content) {
      root.replaceChildren(h("h1", {}, "Entrenador de examen oral"),
        h("div", { class: "tabs" }, [["train", "🎤 Preguntas"], ["fill", "💬 Frases útiles"], ["pron", "🔊 Pronunciación"]].map(([k, l]) => h("button", { class: "tab" + (tab === k ? " on" : ""), onclick: () => { stopAll(); tab = k; render(); } }, l))), content);
    }
    function render() { ({ train: setupTrain, fill: fillers, pron: pron })[tab](); }

    function setupTrain() {
      frame(h("section", { class: "card" },
        h("h3", {}, "Unidad"), h("div", { class: "chips" }, [["all", "Todas"], ["5", "U5 Pasado"], ["6", "U6 Experiencias"], ["7", "U7 Planes"]].map(([k, l]) => h("button", { class: "chip" + (k === unit ? " on" : ""), onclick: () => { unit = k; setupTrain(); } }, l))),
        h("h3", {}, "Tiempo para responder"), h("div", { class: "chips" }, [30, 45, 60].map(s => h("button", { class: "chip" + (s === secs ? " on" : ""), onclick: () => { secs = s; setupTrain(); } }, s + " s"))),
        h("h3", {}, "Modo"), h("div", { class: "chips" }, [["cards", "Tarjetas aleatorias"], ["sim", "Simulacro (6 preguntas mezcladas)"]].map(([k, l]) => h("button", { class: "chip" + (k === mode ? " on" : ""), onclick: () => { mode = k; setupTrain(); } }, l))),
        h("button", { class: "btn primary big", onclick: runTrain }, "Empezar"),
        U.SR ? null : h("p", { class: "muted" }, "ℹ️ Tu navegador no tiene reconocimiento de voz: podés escuchar y practicar en voz alta igual. Para el micrófono usá Chrome o Edge.")));
    }

    function runTrain() {
      let list = D.oral.filter(o => unit === "all" || String(o.unit) === unit);
      let session;
      if (mode === "sim") session = U.shuffle([5, 6, 7].flatMap(u => U.shuffle(D.oral.filter(o => o.unit === u)).slice(0, 2)));
      else session = S.pick(list, Math.min(10, list.length));
      let i = 0;
      const next = () => { if (i >= session.length) return done(); card(session[i]); };
      const done = () => frame(h("section", { class: "card center" }, h("h2", {}, "¡Ronda completa!"), h("p", {}, "Practicaste " + session.length + " preguntas. Repetí las que te costaron."),
        h("div", { class: "row center" }, h("button", { class: "btn primary", onclick: runTrain }, "Otra ronda"), h("button", { class: "btn", onclick: setupTrain }, "Opciones"), h("a", { class: "btn", href: "#/" }, "Panel"))));

      function card(o) {
        let left = secs, timer = null, rec = null, transcript = "";
        const clock = h("div", { class: "oclock" }, secs), tr = h("div", { class: "transcript", "aria-live": "polite" }, "Tu respuesta aparecerá acá cuando hables…"), analysis = h("div", { class: "chips" });
        const modelBox = h("div", { class: "card inner", hidden: true }, h("p", {}, o.model), h("div", { class: "row" }, h("button", { class: "btn small", onclick: () => U.speak(o.model) }, "🔊 Escuchar"), h("button", { class: "btn small", onclick: () => U.speak(o.model, 0.65) }, "🐢 Lento")));
        const hints = h("div", { class: "card inner", hidden: true }, D.structure.map(s => h("p", {}, h("b", {}, s[0] + ": "), s[1])), h("p", { class: "muted" }, "Pista: empezá con “" + o.model.split(/(?<=[.!?])\s/)[0].split(" ").slice(0, 4).join(" ") + "…”"));
        const grade = h("div", { class: "row center", hidden: true }, h("button", { class: "btn bad", onclick: () => rate(false) }, "✗ Repetir más tarde"), h("button", { class: "btn good", onclick: () => rate(true) }, "✓ Lo dije bien"));
        const rate = ok => { S.grade(o.id, ok); i++; cleanup(); next(); };
        const cleanup = () => { clearInterval(timer); rec && rec.stop && rec.stop(); stopAll(); };
        leave(cleanup);
        const startBtn = h("button", { class: "btn primary", onclick: () => {
          clearInterval(timer); left = secs; clock.textContent = left; clock.classList.remove("warn"); startBtn.textContent = "↻ Reiniciar tiempo";
          timer = setInterval(() => { left--; clock.textContent = Math.max(left, 0); clock.classList.toggle("warn", left <= 10); if (left <= 0) { clearInterval(timer); clock.textContent = "⏰"; grade.hidden = false; modelBox.hidden = false; } }, 1000);
        } }, "▶ Empezar a responder");
        const micBtn = h("button", { class: "btn", onclick: () => {
          if (rec) { rec.stop(); rec = null; micBtn.textContent = "🎤 Hablar"; micBtn.classList.remove("rec"); return; }
          transcript = ""; micBtn.textContent = "⏹ Parar"; micBtn.classList.add("rec");
          rec = U.listen(t => { transcript = t; tr.textContent = t; }, t => { micBtn.textContent = "🎤 Hablar"; micBtn.classList.remove("rec"); rec = null; analyse(t || transcript); });
          if (!rec) { micBtn.textContent = "🎤 Hablar"; micBtn.classList.remove("rec"); }
          else if (left === secs) startBtn.click();
        } }, "🎤 Hablar");
        function analyse(t) {
          if (!t) return;
          const a = analyze(t), [re, label] = TARGETS[o.target];
          analysis.replaceChildren(h("span", { class: "chip static " + (re.test(t) ? "right" : "wrong") }, (re.test(t) ? "✓ " : "✗ ") + label),
            h("span", { class: "chip static " + (a.words >= 25 ? "right" : "wrong") }, a.words + " palabras (meta 25+)"),
            h("span", { class: "chip static " + (a.links.length >= 2 ? "right" : "wrong") }, a.links.length + " conectores"));
          grade.hidden = false;
        }
        frame(h("div", {},
          h("div", { class: "row between" }, h("b", {}, (i + 1) + " / " + session.length), h("span", { class: "badge u" + o.unit }, "U" + o.unit), h("button", { class: "btn ghost small", onclick: () => { cleanup(); setupTrain(); } }, "Salir")),
          U.progress(U.pct(i, session.length)),
          h("section", { class: "card center oralcard" }, h("p", { class: "oq" }, o.q), clock,
            h("div", { class: "row center" }, h("button", { class: "btn small", onclick: () => U.speak(o.q) }, "🔊 Escuchar pregunta"), startBtn, micBtn)),
          tr, analysis,
          h("div", { class: "row center" }, h("button", { class: "btn ghost small", onclick: () => { hints.hidden = !hints.hidden; } }, "💡 Pistas"), h("button", { class: "btn ghost small", onclick: () => { modelBox.hidden = !modelBox.hidden; } }, "👁 Respuesta modelo")),
          hints, modelBox, grade,
          h("div", { class: "row end" }, h("button", { class: "btn ghost small", onclick: () => { cleanup(); i++; next(); } }, "Saltar →"))));
        if (mode === "sim") startBtn.click();
      }
      next();
    }

    function fillers() {
      frame(h("div", {},
        h("section", { class: "card" }, h("h3", {}, "Fillers y frases útiles"), h("p", { class: "muted" }, "Tocá una frase para escucharla y repetila en voz alta."),
          h("div", { class: "fgrid" }, D.fillers.map(f => h("button", { class: "filler", onclick: () => U.speak(f[0].replace("…", "")) }, h("b", {}, f[0]), h("small", {}, f[1]))))),
        h("section", { class: "card" }, h("h3", {}, "Estructura de una respuesta"), D.structure.map(s => h("p", {}, h("b", {}, s[0] + ": "), s[1])),
          h("p", { class: "muted" }, "Conectores para hablar: First, then, after that, because, but, however, finally.")),
        h("section", { class: "card" }, h("h3", {}, "Ejemplo completo"), h("p", {}, "“" + D.oral[10].q + "”"), h("p", {}, D.oral[10].model), h("button", { class: "btn small", onclick: () => U.speak(D.oral[10].model) }, "🔊 Escuchar"))));
    }

    function pron() {
      const group = (title, arr) => h("section", { class: "card" }, h("h3", {}, title), arr.map(([snd, words]) => h("div", { class: "pgroup" }, h("b", { class: "snd" }, snd), h("div", { class: "chips" }, words.map(w => h("button", { class: "chip", onclick: () => U.speak(w, 0.8) }, "🔊 " + w))))));
      const sentList = h("div");
      D.pron.sentences.forEach(s => {
        const res = h("span", { class: "muted" }); let rec = null;
        const mic = h("button", { class: "btn small", onclick: () => {
          if (rec) { rec.stop(); return; }
          mic.textContent = "⏹"; mic.classList.add("rec");
          rec = U.listen(() => {}, t => {
            mic.textContent = "🎤 Repetir"; mic.classList.remove("rec"); rec = null;
            const target = U.norm(s).split(" "), said = U.norm(t).split(" ");
            const hit = target.filter(w => said.includes(w)).length, p = U.pct(hit, target.length);
            res.textContent = t ? p + "% (" + hit + "/" + target.length + " palabras) · dijiste: “" + t + "”" : "No te escuché, probá de nuevo";
            res.className = p >= 80 ? "okc" : "bad";
          });
          if (!rec) { mic.textContent = "🎤 Repetir"; mic.classList.remove("rec"); }
        } }, "🎤 Repetir");
        sentList.append(h("div", { class: "sentrow" }, h("div", { class: "row" }, h("button", { class: "btn small", onclick: () => U.speak(s) }, "🔊"), h("button", { class: "btn small", onclick: () => U.speak(s, 0.6) }, "🐢"), mic, h("b", {}, s)), res));
      });
      frame(h("div", {}, group("Terminaciones -ed del pasado", D.pron.ed), group("Sonidos de participios irregulares", D.pron.pp), h("section", { class: "card" }, h("h3", {}, "Frases clave: escuchá, repetí y compará"), sentList)));
    }
    if (mode === "sim" && q.mode === "sim") runTrain(); else render();
  };
})();


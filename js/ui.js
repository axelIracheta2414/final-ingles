/* UI · helpers, renderizador de preguntas, voz (Web Speech API) */
(function () {
  const U = {};

  U.h = function (tag, props, ...kids) {
    const e = document.createElement(tag);
    for (const k in props || {}) {
      const v = props[k];
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) e.setAttribute(k, v === true ? "" : v);
    }
    kids.flat(Infinity).forEach(c => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); });
    return e;
  };
  const h = U.h;

  U.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  U.query = () => { const q = location.hash.split("?")[1] || ""; return Object.fromEntries(new URLSearchParams(q)); };
  U.pct = (a, b) => b ? Math.round(100 * a / b) : 0;

  U.norm = function (s) {
    s = String(s).toLowerCase().replace(/[’‘`]/g, "'");
    s = s.replace(/won't/g, "will not").replace(/can't/g, "cannot").replace(/n't/g, " not")
      .replace(/'ve/g, " have").replace(/'m/g, " am").replace(/'re/g, " are").replace(/'ll/g, " will");
    return s.replace(/[.?!,;:"“”]/g, " ").replace(/\s+/g, " ").trim();
  };

  U.progress = (value, label) => h("div", { class: "bar", title: label || "" }, h("span", { style: "width:" + Math.min(100, value) + "%" }));

  U.toast = function (msg) {
    const t = h("div", { class: "toast" }, msg);
    document.body.append(t); setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 1800);
  };

  /* ---------- Voz ---------- */
  U.hasTTS = "speechSynthesis" in window;
  let voices = [];
  if (U.hasTTS) { const load = () => { voices = speechSynthesis.getVoices(); }; load(); speechSynthesis.onvoiceschanged = load; }
  U.speak = function (text, rate) {
    if (!U.hasTTS) { U.toast("Tu navegador no soporta síntesis de voz"); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[“”]/g, '"'));
    u.lang = "en-US"; u.rate = rate || 0.95;
    const v = voices.find(v => /en[-_]US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  };
  U.SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  // Devuelve {stop} o null. onText(texto, esFinal)
  U.listen = function (onText, onEnd) {
    if (!U.SR) { U.toast("Reconocimiento de voz no disponible (usá Chrome o Edge)"); return null; }
    const r = new U.SR();
    r.lang = "en-US"; r.interimResults = true; r.continuous = true;
    let finalText = "";
    r.onresult = ev => {
      let interim = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const t = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) finalText += t + " "; else interim += t;
      }
      onText((finalText + interim).trim());
    };
    r.onerror = e => { if (e.error === "not-allowed") U.toast("Permití el micrófono para practicar hablando"); };
    r.onend = () => onEnd && onEnd(finalText.trim());
    try { r.start(); } catch (e) { return null; }
    return r;
  };

  /* ---------- Preguntas ---------- */
  U.stripTok = t => t.replace(/[.,!?()“”"]/g, "");
  U.errTokens = item => item.q.split(" ");
  U.badIndex = item => U.errTokens(item).findIndex(t => U.stripTok(t).toLowerCase() === item.bad.toLowerCase());

  U.judge = function (item, a) {
    if (item.type === "mc") return a === item.ans;
    if (item.type === "fill") return item.ans.some(x => U.norm(x) === U.norm(a));
    if (item.type === "ord") return U.norm(a) === U.norm(item.ans);
    if (item.type === "err") return a === U.badIndex(item);
    return false;
  };
  U.answerText = item => item.type === "fill" ? item.ans[0] : item.ans;
  U.typeLabel = { mc: "Elegí", fill: "Completá", ord: "Ordená", err: "Encontrá el error" };

  /* opts: {feedback:true, onDone(ok, answer)} */
  U.question = function (item, opts) {
    opts = opts || {};
    const fb = h("div", { class: "feedback", "aria-live": "polite" });
    const body = h("div", { class: "qbody" });
    let done = false;
    const finish = (answer, mark) => {
      if (done) return; done = true;
      const ok = U.judge(item, answer);
      if (mark) mark(ok);
      if (opts.feedback !== false) {
        fb.className = "feedback " + (ok ? "ok" : "bad");
        fb.innerHTML = "";
        fb.append(h("b", {}, ok ? "✓ ¡Correcto!" : "✗ Incorrecto"),
          !ok ? h("div", {}, "Respuesta correcta: ", h("b", {}, U.answerText(item))) : null,
          h("div", { class: "why" }, "💡 " + item.why));
      } else { fb.className = "feedback saved"; fb.textContent = "Respuesta guardada."; }
      opts.onDone && opts.onDone(ok, answer);
    };

    if (item.type === "mc") {
      const list = U.shuffle(item.opts);
      list.forEach(o => {
        const b = h("button", { class: "opt", type: "button" }, o);
        b.onclick = () => finish(o, ok => {
          if (opts.feedback === false) { b.classList.add("picked"); }
          else { b.classList.add(ok ? "right" : "wrong"); if (!ok) body.querySelectorAll(".opt").forEach(x => { if (x.textContent === item.ans) x.classList.add("right"); }); }
          body.querySelectorAll(".opt").forEach(x => x.disabled = true);
        });
        body.append(b);
      });
    } else if (item.type === "fill") {
      const inp = h("input", { type: "text", class: "fillin", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: "Escribí tu respuesta…", "aria-label": "Respuesta" });
      const btn = h("button", { class: "btn primary", type: "button" }, "Comprobar");
      const go = () => { if (!inp.value.trim()) { inp.focus(); return; } finish(inp.value, ok => { inp.disabled = true; btn.disabled = true; if (opts.feedback !== false) inp.classList.add(ok ? "right" : "wrong"); }); };
      btn.onclick = go; inp.onkeydown = e => { if (e.key === "Enter") go(); };
      body.append(h("div", { class: "row" }, inp, btn));
      // En celular no abrimos el teclado solos (tapa la pregunta); en PC sí.
      if (matchMedia("(pointer:fine)").matches) setTimeout(() => inp.focus(), 50);
      inp.addEventListener("focus", () => setTimeout(() => inp.scrollIntoView({ block: "center", behavior: "smooth" }), 300));
    } else if (item.type === "ord") {
      const words = item.ans.split(" ").map(w => w.replace(/^[A-Z](?=[a-z']+$)/, c => (w === "I" || /^I['’]/.test(w)) ? c : c.toLowerCase()));
      let shuffled = U.shuffle(words);
      if (shuffled.join(" ") === words.join(" ") && words.length > 1) shuffled.reverse();
      const pool = h("div", { class: "chips pool" }), line = h("div", { class: "chips line", "aria-label": "Tu oración" });
      const placed = [];
      const draw = () => {
        pool.innerHTML = ""; line.innerHTML = "";
        shuffled.forEach((w, i) => { if (!placed.includes(i)) pool.append(h("button", { class: "chip", type: "button", onclick: () => { if (done) return; placed.push(i); draw(); } }, w)); });
        placed.forEach((i, k) => line.append(h("button", { class: "chip on", type: "button", onclick: () => { if (done) return; placed.splice(k, 1); draw(); } }, shuffled[i])));
      };
      draw();
      const btn = h("button", { class: "btn primary", type: "button" }, "Comprobar");
      const reset = h("button", { class: "btn ghost", type: "button", onclick: () => { if (!done) { placed.length = 0; draw(); } } }, "Reiniciar");
      btn.onclick = () => { if (!placed.length) return; const ans = placed.map(i => shuffled[i]).join(" "); finish(ans, ok => { btn.disabled = true; reset.disabled = true; if (opts.feedback !== false) line.classList.add(ok ? "right" : "wrong"); }); };
      body.append(line, pool, h("div", { class: "row" }, btn, reset));
    } else if (item.type === "err") {
      const bad = U.badIndex(item);
      const line = h("div", { class: "chips sent" });
      U.errTokens(item).forEach((t, i) => {
        const b = h("button", { class: "chip word", type: "button" }, t);
        b.onclick = () => finish(i, ok => {
          line.querySelectorAll(".chip").forEach(x => x.disabled = true);
          if (opts.feedback === false) b.classList.add("picked");
          else { b.classList.add(ok ? "right" : "wrong"); if (!ok) line.children[bad] && line.children[bad].classList.add("right"); }
        });
        line.append(b);
      });
      body.append(line);
    }

    const prompt = item.type === "err" ? "Tocá la palabra incorrecta de la oración:" : item.q;
    return h("div", { class: "question" },
      h("div", { class: "qmeta" }, h("span", { class: "badge u" + item.unit }, "U" + item.unit), h("span", { class: "tag" }, U.typeLabel[item.type])),
      h("p", { class: "qtext" }, prompt), body, fb);
  };

  window.U = U;
})();


/* STORE · localStorage + sistema Leitner (5 cajas) */
(function () {
  const KEY = "a2speak.v1";
  const MIN = 60e3, HOUR = 60 * MIN, DAY = 24 * HOUR;
  // Intervalos por caja (1..5). Pensado para un plazo corto de 6 días.
  const INTERVALS = [0, 10 * MIN, 4 * HOUR, DAY, 2 * DAY];

  const defaults = () => ({ theme: null, start: Date.now(), items: {}, tasks: {}, exams: [], days: [],
    writing: { intro: "", body: "", end: "", checks: {} }, oralDone: {} });

  let state;
  try { state = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || "{}")); }
  catch (e) { state = defaults(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage lleno o bloqueado */ } };

  const today = () => new Date().toISOString().slice(0, 10);
  function touch() {
    const t = today();
    if (!state.days.includes(t)) state.days.push(t);
  }

  const Store = {
    get state() { return state; },
    save,
    touch() { touch(); },
    item(id) { return state.items[id] || { box: 0, due: 0, wrong: 0, right: 0 }; },
    grade(id, ok) {
      const it = Store.item(id);
      if (ok) { it.box = Math.min(5, (it.box || 0) + 1); it.right++; }
      else { it.box = 1; it.wrong++; }
      it.due = Date.now() + INTERVALS[it.box - 1];
      it.last = Date.now();
      state.items[id] = it;
      touch(); save();
      return it;
    },
    mastered(id) { return Store.item(id).box >= 3; },
    isWeak(id) { const it = Store.item(id); return it.box > 0 && it.box <= 2 && it.wrong > 0; },
    weight(id) {
      const it = Store.item(id);
      let w = [4, 8, 4, 2, 1, 0.5][it.box] || 4;         // sin ver = 4, caja1 = 8 ...
      if (it.box > 0 && it.due > Date.now()) w *= 0.35;   // todavía no vence
      return w;
    },
    // Muestreo ponderado sin reposición → más peso a lo que fallás (SRS) y mezcla (interleaving)
    pick(items, n) {
      const pool = items.slice(), out = [];
      while (out.length < n && pool.length) {
        const ws = pool.map(x => Store.weight(x.id));
        let r = Math.random() * ws.reduce((a, b) => a + b, 0), i = 0;
        for (; i < pool.length - 1; i++) { r -= ws[i]; if (r <= 0) break; }
        out.push(pool.splice(i, 1)[0]);
      }
      return out;
    },
    streak() {
      let s = 0; const d = new Date();
      for (;;) {
        const k = d.toISOString().slice(0, 10);
        if (state.days.includes(k)) { s++; d.setDate(d.getDate() - 1); }
        else if (s === 0 && k === today()) { d.setDate(d.getDate() - 1); }
        else break;
      }
      return s;
    },
    dayNumber() { return Math.floor((Date.now() - state.start) / DAY) + 1; },
    reset() { state = defaults(); save(); },
    restartPlan() { state.start = Date.now(); save(); }
  };
  window.Store = Store;
})();

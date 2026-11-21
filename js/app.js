/* APP · router, tema, navegación */
(function () {
  const root = document.getElementById("view");
  const routes = { "": "dashboard", ref: "ref", cards: "cards", practice: "practice", writing: "writing", exam: "exam", oral: "oral" };

  function route() {
    (Views._leave || []).forEach(f => { try { f(); } catch (e) { /* noop */ } });
    Views._leave = [];
    const name = (location.hash.replace(/^#\/?/, "").split("?")[0]) || "";
    const key = routes[name] ? routes[name] : "dashboard";
    document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === name));
    root.innerHTML = "";
    try { Views[key](root); }
    catch (e) { console.error(e); root.textContent = "Ocurrió un error al cargar esta sección. Recargá la página."; }
    window.scrollTo(0, 0);
    root.focus({ preventScroll: true });
  }

  /* Tema claro / oscuro */
  const btn = document.getElementById("themeBtn");
  function applyTheme() {
    const t = Store.state.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = t;
    btn.textContent = t === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-label", t === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }
  btn.onclick = () => { Store.state.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; Store.save(); applyTheme(); };
  applyTheme();

  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register("sw.js").catch(() => {});
  addEventListener("hashchange", route);
  route();
})();


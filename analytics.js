/* ==========================================================================
   PairX · Analítica (Google Analytics 4) con consentimiento previo.

   ► PARA ACTIVARLA: pega tu ID de medición de GA4 abajo (formato "G-XXXXXXXXXX")
     y vuelve a publicar. Mientras esté vacío NO se carga nada, no se usan
     cookies y no aparece ningún aviso.

   Con un ID:
   - GA4 solo se carga si el visitante acepta (Consent Mode v2, denegado por defecto).
   - Muestra un aviso discreto con el estilo de la web; la decisión se recuerda
     en este navegador y se puede cambiar desde "Preferencias de cookies".
   ========================================================================== */
(function () {
  "use strict";
  var GA4_ID = ""; // ← ej.: "G-ABC123XYZ9"

  window.PairXConsent = { open: function () {} };
  if (!/^G-[A-Z0-9]{4,}$/.test(GA4_ID)) return;

  var KEY = "pairx-consent-v1";
  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var loaded = false;
  function loadGA() {
    if (loaded) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, { anonymize_ip: true });
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
    document.head.appendChild(s);
  }

  var css = ".pxc{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:400;width:min(420px,calc(100% - 32px));padding:18px 18px 16px;border-radius:16px;background:rgba(18,15,14,.96);color:#f2ece5;font:400 .92rem/1.5 'IBM Plex Sans',system-ui,sans-serif;box-shadow:inset 0 0 0 1px rgba(255,255,255,.09),0 24px 50px -18px rgba(0,0,0,.8);transform:translateY(16px);opacity:0;transition:transform .45s cubic-bezier(.23,1,.32,1),opacity .3s ease}" +
    ".pxc.in{transform:none;opacity:1}.pxc b{display:block;margin-bottom:4px;font-weight:600;font-size:1rem}.pxc p{margin:0;color:#b0a69c}.pxc a{color:#f2ece5}" +
    ".pxc .r{display:flex;gap:8px;margin-top:14px}.pxc button{flex:1;min-height:44px;border:0;border-radius:999px;font:600 .9rem/1 inherit;font-family:inherit;cursor:pointer;touch-action:manipulation}" +
    ".pxc .y{background:#B0122C;color:#fff}.pxc .n{background:transparent;color:#f2ece5;box-shadow:inset 0 0 0 1.5px #4a423c}.pxc button:focus-visible{outline:2px solid #E0263F;outline-offset:2px}" +
    "@media (prefers-reduced-motion:reduce){.pxc{transition:none}}@media (max-width:600px){.pxc{left:12px;bottom:calc(84px + env(safe-area-inset-bottom,0px))}}";

  function banner() {
    if (document.getElementById("pxc")) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var root = location.pathname.split("/").filter(Boolean).length;
    var up = root ? new Array(root + 1).join("../") : "";
    var el = document.createElement("div");
    el.className = "pxc"; el.id = "pxc"; el.setAttribute("role", "dialog"); el.setAttribute("aria-live", "polite"); el.setAttribute("aria-label", "Preferencias de cookies");
    el.innerHTML = "<b>¿Nos ayudas a mejorar?</b><p>Usamos Google Analytics para saber qué partes de la web se usan más. Solo se activa si aceptas. <a href='" + up + "legal/cookies/'>Más información</a>.</p><div class='r'><button type='button' class='n'>Solo necesarias</button><button type='button' class='y'>Aceptar</button></div>";
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("in"); });
    el.querySelector(".y").addEventListener("click", function () { setChoice("granted"); close(); loadGA(); });
    el.querySelector(".n").addEventListener("click", function () { setChoice("denied"); close(); });
    function close() { el.classList.remove("in"); setTimeout(function () { el.remove(); }, 300); }
  }

  window.PairXConsent.open = banner;
  var c = getChoice();
  if (c === "granted") loadGA();
  else if (c !== "denied") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(banner, 1500); });
    else setTimeout(banner, 1500);
  }
  // Enlaces "Preferencias de cookies" en el pie: solo visibles cuando la analítica está activa
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-consent]").forEach(function (a) { a.hidden = false; a.addEventListener("click", function (e) { e.preventDefault(); banner(); }); });
  });
})();

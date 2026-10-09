/* PairX — utilidades comunes de las demos del portafolio.
   - Barra honesta: "Concepto de PairX · negocio ficticio" + botón a WhatsApp.
   - Revelado suave al hacer scroll (respeta reduced-motion; sin JS todo es visible). */
(function () {
  var WHATSAPP = '573218596840';
  var niche = document.documentElement.getAttribute('data-niche') || 'tu negocio';

  var preview = /[?&]preview(?:=|&|$)/.test(location.search);
  if (preview) { document.documentElement.classList.add('is-preview'); return; }
  var bar = document.createElement('aside');
  bar.className = 'pairx-bar';
  bar.setAttribute('aria-label', 'Aviso de PairX');
  var msg = encodeURIComponent('Hola PairX, vi la demo de ' + niche + ' en tu portafolio y quiero una web así para mi negocio.');
  bar.innerHTML =
    '<a class="pairx-bar__back" href="../">← Portafolio PairX</a>' +
    '<span class="pairx-bar__note">Concepto de demostración · negocio ficticio</span>' +
    '<a class="pairx-bar__cta" href="https://wa.me/' + WHATSAPP + '?text=' + msg + '" target="_blank" rel="noopener">Quiero una web así</a>';
  document.body.appendChild(bar);

  var css = document.createElement('style');
  css.textContent =
    '.pairx-bar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:999;display:flex;gap:14px;align-items:center;' +
    'padding:8px 8px 8px 16px;border-radius:999px;background:rgba(10,9,9,.88);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);' +
    'color:#EFEAE3;font:500 13px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35);max-width:calc(100vw - 24px)}' +
    '.pairx-bar a{color:inherit;text-decoration:none}.pairx-bar__back{opacity:.8;white-space:nowrap}.pairx-bar__note{opacity:.65}' +
    '.pairx-bar__cta{background:#B0122C;color:#fff!important;padding:9px 14px;border-radius:999px;font-weight:600;white-space:nowrap;transition:transform 140ms cubic-bezier(.23,1,.32,1)}' +
    '.pairx-bar__cta:active{transform:scale(.97)}.pairx-bar a:focus-visible{outline:2px solid #E0263F;outline-offset:3px;border-radius:999px}' +
    '@media (max-width:640px){.pairx-bar__note{display:none}}' +
    '.js [data-reveal]{opacity:0;transform:translateY(10px);transition:opacity 280ms cubic-bezier(.23,1,.32,1),transform 280ms cubic-bezier(.23,1,.32,1);transition-delay:calc(var(--i,0)*45ms)}' +
    '.js [data-reveal].is-in{opacity:1;transform:none}' +
    '@media (prefers-reduced-motion:reduce){.js [data-reveal]{opacity:1;transform:none;transition:none}}';
  document.head.appendChild(css);

  document.documentElement.classList.add('js');
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  var ticking = false;
  function check() {
    ticking = false;
    var limit = window.innerHeight * 0.94;
    items = items.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) { el.classList.add('is-in'); return false; }
      return true;
    });
    if (!items.length) { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(check); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  requestAnimationFrame(check);
  setTimeout(check, 400);
})();

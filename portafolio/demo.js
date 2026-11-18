/* ==========================================================================
   PairX · Portafolio — motor de los conceptos por giro.
   Cada página define window.SITE y este archivo arma el sitio completo:
   navegación, hero (según data-layout), catálogo con pedido, historia,
   galería, opiniones, horario en vivo, mapa, preguntas y llamado final.
   Todo negocio es ficticio: los botones de pedido muestran qué haría
   la página real y llevan al WhatsApp de PairX.
   ========================================================================== */
(function () {
  "use strict";
  var PAIRX_WA = "573218596840";
  var S = window.SITE;
  if (!S) return;
  var root = document.documentElement;
  var preview = /[?&]preview(?:=|&|$)/.test(location.search);
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  root.classList.add("js");
  if (preview) root.classList.add("is-preview");
  if (S.dark) root.classList.add("is-dark");
  root.setAttribute("data-layout", S.layout);

  /* ---------------- Ilustraciones (viewBox 0 0 100 100) ---------------- */
  var I = {
    camisa: '<ellipse cx="50" cy="92" rx="30" ry="4" fill="#000" opacity=".15"/><path d="M36 16l-22 12 8 18 10-5v45h36V41l10 5 8-18-22-12c-2 7-7 11-14 11s-12-4-14-11z" fill="#b8442b"/><path d="M36 16c2 7 7 11 14 11s12-4 14-11" fill="none" stroke="#7d2c1b" stroke-width="3"/><path d="M50 27v59" stroke="#7d2c1b" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/>',
    vestido: '<ellipse cx="50" cy="93" rx="32" ry="4" fill="#000" opacity=".15"/><path d="M40 10v12M60 10v12" stroke="#171412" stroke-width="3" stroke-linecap="round"/><path d="M38 22h24l-2 18 22 48H18l22-48z" fill="#d97a5b"/><path d="M38 40h24" stroke="#171412" stroke-width="4"/><path d="M30 64l-4 24M50 44v44M70 64l4 24" stroke="#b8442b" stroke-width="2" opacity=".6"/>',
    gancho: '<path d="M50 30a8 8 0 1 1 8-8" fill="none" stroke="#6a6058" stroke-width="4" stroke-linecap="round"/><path d="M50 30v6L12 62q-5 5 3 6h70q8-1 3-6L50 36" fill="none" stroke="#171412" stroke-width="5" stroke-linejoin="round"/><rect x="22" y="70" width="56" height="20" rx="3" fill="#e9d8c4"/><path d="M22 76h56" stroke="#b8442b" stroke-width="3"/>',
    tenis: '<ellipse cx="50" cy="86" rx="40" ry="4" fill="#000" opacity=".15"/><path d="M10 72c0-12 4-26 12-34l12 4c6 10 18 14 30 14 16 0 26 6 28 16z" fill="#fbf8f3" stroke="#171412" stroke-width="3" stroke-linejoin="round"/><rect x="8" y="72" width="86" height="10" rx="5" fill="#171412"/><path d="M34 46l8-4M38 52l8-4M42 58l8-4" stroke="#b8442b" stroke-width="3" stroke-linecap="round"/>',
    pan: '<ellipse cx="50" cy="80" rx="40" ry="5" fill="#000" opacity=".15"/><path d="M12 70c0-24 20-38 38-38s38 14 38 38c0 7-76 7-76 0z" fill="#d99a4e"/><path d="M12 70c0-24 20-38 38-38s38 14 38 38" fill="none" stroke="#8a4a1a" stroke-width="2.5"/><path d="M32 50l7 13M48 43l7 15M64 46l7 13" stroke="#f6dcae" stroke-width="5" stroke-linecap="round"/>',
    concha: '<ellipse cx="50" cy="82" rx="34" ry="5" fill="#000" opacity=".15"/><path d="M16 74a34 34 0 0 1 68 0z" fill="#f3d9a8" stroke="#c9915a" stroke-width="2.5"/><path d="M50 42v32M34 47l10 27M66 47l-10 27M22 62h56M28 52h44" stroke="#c9915a" stroke-width="2.4" opacity=".7"/><rect x="14" y="72" width="72" height="9" rx="4" fill="#d99a4e"/>',
    croissant: '<ellipse cx="50" cy="80" rx="38" ry="5" fill="#000" opacity=".15"/><path d="M10 66c6-22 24-34 40-34s34 12 40 34c-9-7-17-7-21-2-3-11-10-15-19-15s-16 4-19 15c-4-5-12-5-21 2z" fill="#e2a656" stroke="#9a5a22" stroke-width="2.5" stroke-linejoin="round"/><path d="M38 40l4 22M62 40l-4 22M50 34v26" stroke="#9a5a22" stroke-width="2" opacity=".6"/>',
    torta: '<ellipse cx="50" cy="86" rx="38" ry="5" fill="#000" opacity=".15"/><rect x="18" y="48" width="64" height="36" rx="5" fill="#f6e3cf"/><path d="M18 56q8 8 16 0t16 0 16 0 16 0v-6q0-2-2-2H20q-2 0-2 2z" fill="#c2577a"/><rect x="18" y="66" width="64" height="5" fill="#e8b4c4"/><rect x="47" y="28" width="6" height="20" rx="2" fill="#f2b33d"/><path d="M50 18c4 4 4 8 0 10-4-2-4-6 0-10z" fill="#f05a28"/>',
    rosa: '<path d="M50 52c-2 16 1 28 0 40" stroke="#3f6b4a" stroke-width="4" fill="none"/><ellipse cx="38" cy="74" rx="11" ry="5" fill="#4f8a5c" transform="rotate(-30 38 74)"/><circle cx="50" cy="38" r="22" fill="#c8335a"/><path d="M50 22c10 2 14 10 10 18-6 6-16 4-18-4 0-6 4-10 8-10" fill="none" stroke="#8d1e3c" stroke-width="2.5"/><path d="M34 32c2 12 10 20 22 20" fill="none" stroke="#8d1e3c" stroke-width="2.5"/>',
    ramo: '<path d="M30 54l20 40 20-40z" fill="#f2d9b8" stroke="#c9a77c" stroke-width="2"/><path d="M42 60l8 16 8-16" fill="none" stroke="#c9a77c" stroke-width="2"/><circle cx="36" cy="40" r="12" fill="#e46a8a"/><circle cx="62" cy="38" r="12" fill="#f4a9bb"/><circle cx="50" cy="26" r="12" fill="#c8335a"/><circle cx="50" cy="48" r="10" fill="#f7c948"/><ellipse cx="26" cy="54" rx="9" ry="4" fill="#4f8a5c" transform="rotate(-35 26 54)"/><ellipse cx="74" cy="52" rx="9" ry="4" fill="#4f8a5c" transform="rotate(35 74 52)"/>',
    maceta: '<path d="M30 62h40l-6 28H36z" fill="#c8693a"/><rect x="26" y="56" width="48" height="9" rx="3" fill="#a9532b"/><path d="M50 56V30" stroke="#3f6b4a" stroke-width="4"/><ellipse cx="38" cy="38" rx="14" ry="7" fill="#4f8a5c" transform="rotate(-30 38 38)"/><ellipse cx="62" cy="30" rx="14" ry="7" fill="#5fa06c" transform="rotate(25 62 30)"/><ellipse cx="44" cy="20" rx="10" ry="5" fill="#4f8a5c" transform="rotate(-60 44 20)"/>',
    girasol: '<path d="M50 56v38" stroke="#3f6b4a" stroke-width="4"/><g transform="translate(50 38)">' + [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(function (r) { return '<ellipse rx="6" ry="15" cy="-17" fill="#f7c948" transform="rotate(' + r + ')"/>'; }).join("") + '<circle r="13" fill="#6b3a1f"/><circle r="13" fill="none" stroke="#4a2612" stroke-width="2" stroke-dasharray="2 3"/></g>',
    tijeras: '<g transform="rotate(-30 50 50)"><circle cx="22" cy="40" r="11" fill="none" stroke="#d6a54a" stroke-width="6"/><circle cx="22" cy="62" r="11" fill="none" stroke="#d6a54a" stroke-width="6"/><path d="M32 44l56 14M32 58l56-14" stroke="#e8e8ea" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="51" r="3.5" fill="#333"/></g>',
    navaja: '<g transform="rotate(-25 50 50)"><rect x="14" y="44" width="46" height="12" rx="6" fill="#2b3038"/><rect x="18" y="47" width="38" height="2" fill="#d6a54a"/><path d="M58 44h28c2 0 3 2 2 4l-6 8H58z" fill="#e8e8ea" stroke="#a9adb4" stroke-width="1.5"/></g>',
    poste: '<rect x="38" y="10" width="24" height="80" rx="12" fill="#f1ece4"/><clipPath id="pp"><rect x="38" y="10" width="24" height="80" rx="12"/></clipPath><g clip-path="url(#pp)" stroke="#c0392b" stroke-width="7"><path d="M30 22l40-18M30 40l40-18M30 58l40-18M30 76l40-18M30 94l40-18"/></g><rect x="34" y="6" width="32" height="8" rx="4" fill="#d6a54a"/><rect x="34" y="86" width="32" height="8" rx="4" fill="#d6a54a"/>',
    peine: '<g transform="rotate(-20 50 50)"><rect x="14" y="40" width="72" height="12" rx="4" fill="#2b3038"/>' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (k) { return '<rect x="' + (17 + k * 5.6) + '" y="50" width="2.6" height="' + (k < 5 ? 18 : 12) + '" fill="#2b3038"/>'; }).join("") + '</g>',
    barra: '<rect x="8" y="47" width="84" height="6" rx="3" fill="#9aa0a8"/><rect x="16" y="28" width="10" height="44" rx="3" fill="#1b1d21"/><rect x="74" y="28" width="10" height="44" rx="3" fill="#1b1d21"/><rect x="27" y="34" width="7" height="32" rx="2" fill="#d4ff3a"/><rect x="66" y="34" width="7" height="32" rx="2" fill="#d4ff3a"/>',
    kettle: '<path d="M34 40a16 14 0 0 1 32 0" fill="none" stroke="#1b1d21" stroke-width="8"/><circle cx="50" cy="62" r="26" fill="#1b1d21"/><circle cx="50" cy="62" r="26" fill="none" stroke="#d4ff3a" stroke-width="3" stroke-dasharray="6 6"/><text x="50" y="69" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="18" fill="#d4ff3a">16</text>',
    mancuerna: '<g transform="rotate(-20 50 50)"><rect x="26" y="46" width="48" height="8" rx="3" fill="#9aa0a8"/><rect x="14" y="34" width="14" height="32" rx="4" fill="#1b1d21"/><rect x="72" y="34" width="14" height="32" rx="4" fill="#1b1d21"/><rect x="28" y="38" width="6" height="24" rx="2" fill="#d4ff3a"/><rect x="66" y="38" width="6" height="24" rx="2" fill="#d4ff3a"/></g>',
    crono: '<circle cx="50" cy="56" r="30" fill="#1b1d21"/><circle cx="50" cy="56" r="24" fill="#f4f4f0"/><rect x="44" y="16" width="12" height="8" rx="2" fill="#1b1d21"/><path d="M50 56V38" stroke="#1b1d21" stroke-width="4" stroke-linecap="round"/><path d="M50 56l12 8" stroke="#d4ff3a" stroke-width="4" stroke-linecap="round"/><path d="M50 32a24 24 0 0 1 22 14" fill="none" stroke="#d4ff3a" stroke-width="5"/>',
    diente: '<path d="M30 22c8-6 14 0 20 0s12-6 20 0c10 8 6 26 2 36-3 8-3 30-10 30-6 0-6-20-12-20s-6 20-12 20c-7 0-7-22-10-30-4-10-8-28 2-36z" fill="#fff" stroke="#9fd3d6" stroke-width="3"/><path d="M38 32c4-2 8-2 10 2" stroke="#9fd3d6" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M78 16l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#1aa3a8"/>',
    cepillo: '<g transform="rotate(-35 50 50)"><rect x="10" y="46" width="62" height="10" rx="5" fill="#1aa3a8"/><rect x="66" y="40" width="24" height="8" rx="2" fill="#e8f6f6"/>' + [0, 1, 2, 3, 4].map(function (k) { return '<rect x="' + (67 + k * 4.6) + '" y="28" width="3" height="13" rx="1.5" fill="#9fd3d6"/>'; }).join("") + '</g>',
    sonrisa: '<circle cx="50" cy="50" r="34" fill="#e8f6f6"/><path d="M30 50q20 22 40 0" fill="#fff" stroke="#1aa3a8" stroke-width="4" stroke-linejoin="round"/><path d="M34 52h32" stroke="#9fd3d6" stroke-width="2"/><path d="M80 18l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#1aa3a8"/><path d="M18 70l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2z" fill="#1aa3a8"/>',
    agenda: '<rect x="18" y="24" width="64" height="58" rx="8" fill="#fff" stroke="#9fd3d6" stroke-width="3"/><rect x="18" y="24" width="64" height="16" rx="8" fill="#1aa3a8"/><rect x="30" y="16" width="5" height="14" rx="2.5" fill="#0d5e62"/><rect x="65" y="16" width="5" height="14" rx="2.5" fill="#0d5e62"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (k) { return '<rect x="' + (27 + (k % 4) * 13) + '" y="' + (48 + Math.floor(k / 4) * 13) + '" width="8" height="8" rx="2" fill="' + (k === 5 ? "#1aa3a8" : "#d6eeee") + '"/>'; }).join(""),
    secador: '<path d="M18 30h44a22 22 0 0 1 0 44H18z" fill="#7a3b5e"/><circle cx="62" cy="52" r="12" fill="#f4d9e4"/><rect x="26" y="64" width="14" height="30" rx="5" fill="#5a2a44"/><path d="M80 44h10M80 52h12M80 60h10" stroke="#c7a2b6" stroke-width="3" stroke-linecap="round"/>',
    espejo: '<circle cx="50" cy="40" r="28" fill="#f4d9e4" stroke="#b8860b" stroke-width="5"/><path d="M38 28c6-6 14-6 18-2" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/><rect x="45" y="66" width="10" height="26" rx="4" fill="#b8860b"/>',
    esmalte: '<rect x="30" y="44" width="40" height="44" rx="10" fill="#c43c6c"/><rect x="36" y="50" width="8" height="30" rx="4" fill="#fff" opacity=".35"/><rect x="40" y="14" width="20" height="32" rx="4" fill="#1d1916"/>',
    ondas: '<path d="M20 30c10-12 30-12 40 0s20 12 30 0M14 50c10-12 30-12 40 0s20 12 30 0M20 70c10-12 30-12 40 0s20 12 30 0" fill="none" stroke="#7a3b5e" stroke-width="6" stroke-linecap="round"/>',
    burger: '<ellipse cx="50" cy="90" rx="36" ry="4" fill="#000" opacity=".25"/><path d="M14 44c0-18 16-26 36-26s36 8 36 26z" fill="#e8a33a"/><g fill="#fbe3b0"><ellipse cx="36" cy="30" rx="2.5" ry="1.4"/><ellipse cx="50" cy="25" rx="2.5" ry="1.4"/><ellipse cx="62" cy="31" rx="2.5" ry="1.4"/><ellipse cx="44" cy="36" rx="2.5" ry="1.4"/></g><path d="M10 50q5-5 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0" stroke="#5fae3c" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M14 56h72l-8 8H22z" fill="#f7c948"/><rect x="12" y="60" width="76" height="11" rx="5.5" fill="#5a2a14"/><path d="M14 74h72c0 9-8 13-36 13s-36-4-36-13z" fill="#e8a33a"/>',
    papas: '<path d="M30 40l4 50h32l4-50z" fill="#e2412a"/>' + [0, 1, 2, 3, 4, 5].map(function (k) { return '<rect x="' + (31 + k * 6.4) + '" y="' + (16 + (k % 3) * 6) + '" width="5" height="34" rx="2" fill="#f7c948" transform="rotate(' + (k * 3 - 8) + ' 50 40)"/>'; }).join("") + '<path d="M30 40l4 50h32l4-50z" fill="#e2412a"/><path d="M40 56h20" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
    perro: '<rect x="10" y="44" width="80" height="20" rx="10" fill="#e8a33a"/><rect x="14" y="48" width="72" height="12" rx="6" fill="#a8432a"/><path d="M18 50q6-4 12 0t12 0 12 0 12 0 12 0" stroke="#f7c948" stroke-width="3" fill="none"/><rect x="12" y="58" width="76" height="12" rx="6" fill="#d98a2b"/>',
    bebida: '<path d="M30 30h40l-5 60H35z" fill="#f4f1ea" opacity=".9"/><path d="M32 46h36l-3 44H35z" fill="#5a2a14"/><rect x="26" y="24" width="48" height="8" rx="3" fill="#e2412a"/><path d="M58 24l8-16" stroke="#e2412a" stroke-width="4" stroke-linecap="round"/><circle cx="44" cy="60" r="2" fill="#fff" opacity=".5"/><circle cx="52" cy="72" r="1.6" fill="#fff" opacity=".5"/>',
    huevos: '<path d="M14 62h72l-6 22H20z" fill="#c9a26b"/>' + [0, 1, 2].map(function (k) { return '<ellipse cx="' + (32 + k * 18) + '" cy="52" rx="9" ry="12" fill="#fbf2e3" stroke="#e5d3b3" stroke-width="2"/>'; }).join("") + '<path d="M20 70h60" stroke="#a8844f" stroke-width="2"/>',
    botella: '<rect x="40" y="10" width="20" height="10" rx="2" fill="#e2412a"/><path d="M42 20h16v10c8 4 12 10 12 18v38q0 6-6 6H36q-6 0-6-6V48c0-8 4-14 12-18z" fill="#2a7a4a"/><rect x="30" y="50" width="40" height="20" fill="#f7c948"/><path d="M38 60h24" stroke="#2a7a4a" stroke-width="3"/>',
    canasta: '<path d="M16 46h68l-8 40H24z" fill="#c9a26b"/><path d="M22 56h56M24 66h52M26 76h48" stroke="#a8844f" stroke-width="2"/><path d="M30 46c0-22 40-22 40 0" fill="none" stroke="#a8844f" stroke-width="5"/><circle cx="38" cy="42" r="8" fill="#e2412a"/><ellipse cx="58" cy="40" rx="8" ry="10" fill="#f7c948"/><path d="M48 30c4-6 10-6 12 0" stroke="#2a7a4a" stroke-width="4" fill="none"/>',
    tienda: '<rect x="14" y="40" width="72" height="50" fill="#f6efe2"/><path d="M10 26h80l-4 16H14z" fill="#2a7a4a"/>' + [0, 1, 2, 3, 4].map(function (k) { return '<path d="M' + (14 + k * 14.4) + ' 42a7.2 7.2 0 0 0 14.4 0" fill="' + (k % 2 ? "#f7c948" : "#2a7a4a") + '"/>'; }).join("") + '<rect x="22" y="56" width="22" height="34" fill="#5a3a22"/><rect x="52" y="56" width="26" height="20" fill="#bfe0ef"/><path d="M52 66h26M65 56v20" stroke="#fff" stroke-width="2"/>',
    engrane: '<circle cx="50" cy="50" r="30" fill="none" stroke="#e09a1a" stroke-width="12" stroke-dasharray="9.4 6.3"/><circle cx="50" cy="50" r="25" fill="#e09a1a"/><circle cx="50" cy="50" r="9" fill="#12263a"/>',
    llave: '<g transform="rotate(40 50 50)"><rect x="44" y="34" width="12" height="58" rx="6" fill="#c9d3dd"/><path d="M32 22a18 18 0 1 0 36 0h-8v10H40V22z" fill="#c9d3dd"/></g>',
    carro: '<path d="M10 62l6-16q3-8 12-9l12-1 10-12h22q6 0 10 6l8 14q8 2 8 10v8H10z" fill="#d23b2a"/><path d="M42 36l8-10h20l6 10z" fill="#bfe0ef"/><rect x="10" y="62" width="84" height="6" fill="#9e2a1d"/><circle cx="30" cy="70" r="11" fill="#1b1d21"/><circle cx="30" cy="70" r="4" fill="#c9d3dd"/><circle cx="74" cy="70" r="11" fill="#1b1d21"/><circle cx="74" cy="70" r="4" fill="#c9d3dd"/>',
    aceite: '<path d="M26 40h40v46H26z" fill="#12263a"/><path d="M66 48l18-10v8l-14 10z" fill="#12263a"/><rect x="40" y="30" width="12" height="10" fill="#e09a1a"/><rect x="30" y="52" width="32" height="20" rx="2" fill="#e09a1a"/><path d="M86 52c0 6-3 8-5 8s-5-2-5-8 5-12 5-12 5 6 5 12z" fill="#e09a1a"/>',
    martillo: '<g transform="rotate(-35 50 50)"><rect x="46" y="30" width="9" height="62" rx="4" fill="#a9532b"/><path d="M22 18h46q8 0 8 8v4H58v8H42v-8H26q-6 0-8-6z" fill="#3a3f46"/></g>',
    destornillador: '<g transform="rotate(35 50 50)"><rect x="42" y="8" width="16" height="38" rx="6" fill="#f26a1b"/><rect x="42" y="16" width="16" height="4" fill="#c4500f"/><rect x="47" y="46" width="6" height="40" fill="#b7bcc3"/><path d="M47 86h6l-3 8z" fill="#b7bcc3"/></g>',
    tuerca: '<path d="M50 14l31 18v36L50 86 19 68V32z" fill="#b7bcc3" stroke="#7d838b" stroke-width="3"/><circle cx="50" cy="50" r="15" fill="#2b2f35"/><circle cx="50" cy="50" r="15" fill="none" stroke="#7d838b" stroke-width="2" stroke-dasharray="3 3"/>',
    pintura: '<path d="M22 34h56v48q0 8-8 8H30q-8 0-8-8z" fill="#c9cdd2"/><ellipse cx="50" cy="34" rx="28" ry="7" fill="#f26a1b"/><path d="M60 34c0 14 6 16 6 24" stroke="#f26a1b" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="28" y="50" width="44" height="22" rx="3" fill="#f26a1b"/><path d="M22 34c0-14 56-14 56 0" fill="none" stroke="#7d838b" stroke-width="3"/>',
    can: '<ellipse cx="50" cy="88" rx="30" ry="4" fill="#000" opacity=".15"/><path d="M26 36q-14-6-12 14 2 10 12 6M74 36q14-6 12 14-2 10-12 6" fill="#b5783f"/><ellipse cx="50" cy="56" rx="28" ry="30" fill="#e3a964"/><ellipse cx="50" cy="70" rx="15" ry="11" fill="#f6dfc0"/><ellipse cx="50" cy="63" rx="6" ry="4.5" fill="#2b1d14"/><circle cx="38" cy="50" r="4" fill="#2b1d14"/><circle cx="62" cy="50" r="4" fill="#2b1d14"/><path d="M44 74q6 5 12 0" stroke="#2b1d14" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    gato: '<path d="M24 40L28 14l18 18M76 40L72 14 54 32" fill="#5b5f66"/><ellipse cx="50" cy="56" rx="30" ry="28" fill="#6b7078"/><path d="M28 18l6 14M72 18l-6 14" stroke="#f4a9bb" stroke-width="4"/><ellipse cx="38" cy="52" rx="5" ry="6" fill="#d8f0a8"/><ellipse cx="62" cy="52" rx="5" ry="6" fill="#d8f0a8"/><ellipse cx="38" cy="52" rx="1.6" ry="5" fill="#1d1916"/><ellipse cx="62" cy="52" rx="1.6" ry="5" fill="#1d1916"/><path d="M47 64h6l-3 3z" fill="#f4a9bb"/><path d="M28 66l-14-2M28 70l-14 4M72 66l14-2M72 70l14 4" stroke="#d6d8dc" stroke-width="1.8"/>',
    huella: '<ellipse cx="50" cy="64" rx="18" ry="15" fill="#ef7b6a"/><ellipse cx="28" cy="44" rx="7" ry="9" fill="#ef7b6a"/><ellipse cx="42" cy="32" rx="7" ry="9" fill="#ef7b6a"/><ellipse cx="58" cy="32" rx="7" ry="9" fill="#ef7b6a"/><ellipse cx="72" cy="44" rx="7" ry="9" fill="#ef7b6a"/>',
    hueso: '<g transform="rotate(-25 50 50)"><rect x="24" y="44" width="52" height="12" fill="#fbf2e3"/><circle cx="22" cy="42" r="9" fill="#fbf2e3"/><circle cx="22" cy="58" r="9" fill="#fbf2e3"/><circle cx="78" cy="42" r="9" fill="#fbf2e3"/><circle cx="78" cy="58" r="9" fill="#fbf2e3"/></g>',
    lapiz: '<g transform="rotate(-40 50 50)"><rect x="14" y="42" width="56" height="16" fill="#f7c948"/><path d="M14 42h56M14 50h56M14 58h56" stroke="#e0a82e" stroke-width="1.5"/><rect x="8" y="42" width="8" height="16" fill="#e46a8a"/><rect x="15" y="42" width="4" height="16" fill="#c9cdd2"/><path d="M70 42l18 8-18 8z" fill="#f2d9b8"/><path d="M82 47l6 3-6 3z" fill="#1d1916"/></g>',
    cuaderno: '<rect x="22" y="14" width="58" height="74" rx="4" fill="#3b6fd8"/><rect x="30" y="14" width="50" height="74" rx="3" fill="#4d82ea"/><rect x="40" y="30" width="32" height="14" rx="2" fill="#fbf7ef"/><path d="M44 36h24" stroke="#3b6fd8" stroke-width="2"/>' + [0, 1, 2, 3, 4, 5].map(function (k) { return '<circle cx="26" cy="' + (22 + k * 12) + '" r="3" fill="none" stroke="#c9cdd2" stroke-width="2.5"/>'; }).join(""),
    regla: '<g transform="rotate(-20 50 50)"><rect x="8" y="38" width="84" height="22" rx="3" fill="#7bc8a4"/>' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(function (k) { return '<rect x="' + (12 + k * 5) + '" y="38" width="1.6" height="' + (k % 2 ? 6 : 11) + '" fill="#2a6a4f"/>'; }).join("") + '</g>',
    clip: '<path d="M40 82V28a10 10 0 0 1 20 0v46a6 6 0 0 1-12 0V34" fill="none" stroke="#e46a8a" stroke-width="5" stroke-linecap="round"/><path d="M60 30v44" stroke="#e46a8a" stroke-width="5"/>'
  };
  function icon(k, extra) { return '<svg viewBox="0 0 100 100" aria-hidden="true" ' + (extra || "") + '>' + (I[k] || "") + "</svg>"; }

  /* Composición grande del hero: tres piezas del giro, con profundidad */
  function heroArt(keys) {
    var a = keys[0], b = keys[1], c = keys[2];
    return '<svg viewBox="0 0 400 320" aria-hidden="true">' +
      '<circle cx="200" cy="160" r="128" fill="rgba(255,255,255,.16)"/>' +
      '<circle cx="200" cy="160" r="92" fill="rgba(255,255,255,.12)"/>' +
      '<g class="pz" data-d="18"><svg x="20" y="120" width="150" height="150" viewBox="0 0 100 100">' + I[b] + "</svg></g>" +
      '<g class="pz" data-d="30"><svg x="110" y="40" width="210" height="210" viewBox="0 0 100 100">' + I[a] + "</svg></g>" +
      '<g class="pz" data-d="10"><svg x="250" y="168" width="130" height="130" viewBox="0 0 100 100">' + I[c] + "</svg></g>" +
      '<path d="M60 70l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="rgba(255,255,255,.75)"/><path d="M340 60l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="rgba(255,255,255,.6)"/>' +
      "</svg>";
  }

  var MAP = '<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="600" height="400" style="fill:var(--map-bg,#e9e4da)"/>' +
    '<path d="M-20 300C120 260 200 330 330 280S520 210 640 240" style="stroke:var(--map-water,#bcd6e6)" stroke-width="34" fill="none"/>' +
    '<rect x="60" y="40" width="130" height="90" rx="10" style="fill:var(--map-park,#cfe3c4)"/>' +
    '<g style="stroke:var(--map-road,#fff)" stroke-width="16" fill="none" stroke-linecap="round"><path d="M0 170H600M230 0V400M420 0V400M0 70L600 120"/></g>' +
    '<g style="stroke:var(--map-road,#fff)" stroke-width="7" fill="none" opacity=".9"><path d="M120 0V400M330 0V400M520 0V400M0 230H600M0 360H600"/></g>' +
    '<g style="fill:var(--map-block,#ddd6ca)" opacity=".7"><rect x="250" y="185" width="60" height="30" rx="4"/><rect x="345" y="185" width="60" height="30" rx="4"/><rect x="250" y="245" width="60" height="30" rx="4"/><rect x="440" y="140" width="60" height="22" rx="4"/><rect x="140" y="185" width="70" height="30" rx="4"/></g></svg>';

  /* ---------------- Utilidades ---------------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lines(html) { // divide el h1 por " / " en líneas con máscara
    return html.split(" / ").map(function (l, i) { return '<span class="in-l"><span style="--i:' + i + '">' + l + "</span></span>"; }).join(" ");
  }
  var DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  function openState() {
    var d = new Date(), w = d.getDay(), slot = S.sched[w];
    if (!slot) return { open: false, txt: "Cerrado hoy" };
    if (slot === "24h") return { open: true, txt: "Abierto ahora · 24 horas" };
    var p = slot.split("-"), m = d.getHours() * 60 + d.getMinutes();
    var t = function (s) { var x = s.split(":"); return +x[0] * 60 + +x[1]; };
    var fmt = function (s) { var h = +s.split(":")[0], mm = s.split(":")[1]; var ap = h >= 12 ? "p. m." : "a. m."; h = h % 12 || 12; return h + ":" + mm + " " + ap; };
    if (m >= t(p[0]) && m < t(p[1])) return { open: true, txt: "Abierto ahora · cierra " + fmt(p[1]) };
    if (m < t(p[0])) return { open: false, txt: "Cerrado · abre a las " + fmt(p[0]) };
    return { open: false, txt: "Cerrado · abre mañana" };
  }
  var wa = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4 5.2 5.2 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>';

  /* ---------------- Armado del sitio ---------------- */
  var st = openState();
  var openChip = '<span class="open-now' + (st.open ? "" : " closed") + '"><i></i>' + st.txt + "</span>";
  var cta1 = '<a class="d-btn pri" href="#catalogo">' + esc(S.hero.cta1) + ' <span aria-hidden="true">→</span></a>';
  var cta2 = '<button class="d-btn out" type="button" data-wa="hola">' + wa + esc(S.hero.cta2 || "Escríbenos") + "</button>";
  var chips = (S.hero.chips || []).map(function (c, i) { return '<span class="chip-f float-chip ' + (i ? "b" : "a") + '"><b>' + c[0] + "</b> " + c[1] + "</span>"; }).join("");
  var art = '<div class="hero-art par" data-par="1"><div class="art-card">' + heroArt(S.art) + "</div>" + (S.layout === "split" ? chips : "") +
    (S.layout === "playful" ? '<span class="sticker" style="left:2%;top:8%">' + esc(S.hero.stickers[0]) + '</span><span class="sticker b" style="right:2%;bottom:10%">' + esc(S.hero.stickers[1]) + "</span>" : "") + "</div>";
  var head = '<p class="kick in-a" style="--i:0">' + esc(S.hero.kicker) + "</p>" +
    '<h1 class="d-display">' + lines(S.hero.h1) + "</h1>" +
    '<p class="sub in-a" style="--i:3">' + esc(S.hero.sub) + "</p>";
  var ctas = '<div class="ctas in-a" style="--i:4">' + cta1 + cta2 + "</div>";
  var meta = '<div class="meta in-a" style="--i:5">' + openChip + (S.layout !== "split" ? (S.hero.chips || []).map(function (c) { return '<span class="chip-f"><b>' + c[0] + "</b> " + c[1] + "</span>"; }).join("") : "") + "</div>";
  var first = S.catalog.tabs[0].items;
  var hero;
  if (S.layout === "poster") {
    hero = '<div class="wrap">' + art + '<p class="kick in-a" style="--i:0">' + esc(S.hero.kicker) + '</p><h1 class="d-display">' + lines(S.hero.h1) + '</h1><div class="poster-row"><div><p class="sub in-a" style="--i:3">' + esc(S.hero.sub) + "</p>" + meta + "</div>" + ctas + "</div></div>";
  } else if (S.layout === "editorial") {
    hero = '<div class="wrap">' + head + ctas + meta + art + "</div>";
  } else if (S.layout === "board") {
    hero = '<div class="wrap hero-g"><div>' + head + ctas + meta + '</div><div class="par in-a" data-par="1" style="--i:3"><div class="ticket"><div class="art-mini">' + icon(S.art[0]) + "</div><h3>" + esc(S.hero.ticket || "Recomendado de hoy") + '</h3><p class="sm">' + esc(S.name) + " · " + esc(S.barrio) + "</p><ul>" + first.slice(0, 4).map(function (it) { return "<li><span>" + esc(it[0]) + "</span><b>" + esc(it[2]) + "</b></li>"; }).join("") + "</ul></div></div></div>";
  } else if (S.layout === "industrial") {
    hero = '<div class="wrap hero-g"><div><p class="tag-mono in-a" style="--i:0">[01] ' + esc(S.niche.toUpperCase()) + " · " + esc(S.barrio.toUpperCase()) + "</p>" + head.replace('<p class="kick in-a" style="--i:0">' + esc(S.hero.kicker) + "</p>", "") + ctas + meta + '</div><div class="spec par in-a" data-par="1" style="--i:3"><div class="hd"><span>' + esc(S.hero.ticket || "Tarifas") + "</span><span>" + esc(S.name) + '</span></div><div class="art-mini">' + heroArt(S.art) + "</div><ul>" + first.slice(0, 4).map(function (it, k) { return "<li><span>0" + (k + 1) + "</span><span>" + esc(it[0]) + "</span><b>" + esc(it[2]) + "</b></li>"; }).join("") + "</ul></div></div>";
  } else {
    hero = '<div class="wrap hero-g"><div>' + head + ctas + meta + "</div>" + art + "</div>" + (S.layout === "playful" ? '<span class="blob-bg" style="width:380px;height:380px;left:-120px;top:40px;background:var(--acc-2)"></span><span class="blob-bg" style="width:260px;height:260px;right:-80px;bottom:-60px;background:var(--acc)"></span>' : "");
  }

  /* ---------------- Personalidad: banner, nota del dueño y sección propia ---------------- */
  if (S.banner || S.owner || S.special) {
    var hf = document.createElement("link");
    hf.rel = "stylesheet"; hf.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap";
    document.head.appendChild(hf);
  }
  if (S.css) { var sx = document.createElement("style"); sx.textContent = S.css; document.head.appendChild(sx); }
  var B = S.banner, bannerHTML = "";
  if (B) {
    if (B.style === "ticker") {
      var parts = B.text.split(" · "), run = parts.concat(parts, parts, parts);
      bannerHTML = '<div class="d-banner b-ticker" role="note"><div class="tk" aria-hidden="true">' + run.map(function (p) { return "<span>" + esc(p) + "</span>"; }).join("") + '</div><span class="sr" style="position:absolute;left:-9999px">' + esc(B.text) + "</span></div>";
    } else {
      bannerHTML = '<div class="d-banner b-' + (B.style || "bar") + '" role="note"><div class="wrap">' + (B.tag ? "<b>" + esc(B.tag) + "</b>" : "") + "<span>" + esc(B.text) + "</span></div></div>";
    }
  }
  var O = S.owner, ownerHTML = "";
  if (O) {
    var ini = O.name.replace(/^(Don|Doña|Dra\.|Dr\.)\s+/, "").split(/\s+y\s+|\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join("");
    ownerHTML = '<section class="sec owner o-' + (O.style || "letter") + '" id="dueno"><div class="wrap own-g">' +
      '<figure class="own-pic" data-r><div class="ph">' + icon(O.art || S.art[0]) + '<span class="ini" aria-hidden="true">' + esc(ini) + "</span></div><figcaption><b>" + esc(O.name) + "</b>" + esc(O.role) + "</figcaption></figure>" +
      '<div class="own-note" data-r style="--i:1"><div class="card"><p class="kick">' + esc(O.kicker || "Del dueño") + '</p><p class="own-text">“' + esc(O.note) + '”</p><p class="own-sign hand">' + esc(O.sign) + "</p></div></div></div></section>";
  }
  var X = S.special, specialHTML = "";
  if (X) {
    var xh = '<div class="spc-h"><p class="kick" data-r>' + esc(X.kicker) + '</p><h2 class="d-display" data-r>' + X.title + "</h2>" + (X.text ? '<p class="t" data-r>' + esc(X.text) + "</p>" : "") + "</div>";
    var xcta = X.cta ? '<div class="cta-row" data-r><button class="d-btn pri" type="button" data-wa="hola">' + wa + esc(X.cta) + "</button></div>" : "";
    var body = "";
    if (X.type === "promo") {
      body = '<div class="promo" data-r><div><p class="kick">' + esc(X.kicker) + '</p><h2 class="d-display">' + X.title + "</h2><p>" + esc(X.text) + '</p><button class="d-btn" type="button" data-wa="hola">' + wa + esc(X.cta) + '</button></div><div class="pa">' + icon(X.art || S.art[0]) + (X.badge ? '<span class="badge">' + esc(X.badge) + "</span>" : "") + "</div></div>";
    } else if (X.type === "chalk") {
      body = '<div class="chalk" data-r>' + (X.badge ? '<span class="stamp">' + esc(X.badge) + "</span>" : "") + '<p class="ttl hand">' + esc(X.board || X.kicker) + "</p><ul>" + X.items.map(function (it) { return '<li class="hand"><span>' + esc(it[0]) + "</span><i></i><b>" + esc(it[1]) + "</b></li>"; }).join("") + "</ul></div>";
      body = xh + body + xcta;
    } else if (X.type === "notebook") {
      body = xh + '<ul class="notebook" data-r>' + X.items.map(function (it) { return '<li class="hand"><i aria-hidden="true">✓</i>' + esc(it) + "</li>"; }).join("") + "</ul>" + xcta;
    } else if (X.type === "dates") {
      body = xh + '<div class="dates">' + X.items.map(function (it, i) { return '<div class="date" data-r style="--i:' + i + '"><span class="d">' + esc(it[0]) + "</span><h3>" + esc(it[1]) + "</h3><p>" + esc(it[2]) + "</p></div>"; }).join("") + "</div>" + xcta;
    } else if (X.type === "steps") {
      body = xh + '<div class="steps">' + X.items.map(function (it, i) { return '<div class="stp" data-r style="--i:' + i + '"><span class="n">' + (i + 1) + "</span><h3>" + esc(it[0]) + "</h3><p>" + esc(it[1]) + "</p></div>"; }).join("") + "</div>" + xcta;
    } else if (X.type === "team") {
      body = xh + '<div class="team">' + X.items.map(function (it, i) { return '<div class="mem" data-r style="--i:' + i + '"><span class="av" style="--art-bg:' + (it[3] || "var(--art-bg)") + '">' + esc(it[0][0]) + "</span><h3>" + esc(it[0]) + "</h3><small>" + esc(it[1]) + '</small><p class="hand">' + esc(it[2]) + "</p></div>"; }).join("") + "</div>" + xcta;
    } else if (X.type === "spotlight") {
      body = '<div class="spot"><div class="sp-art" data-r>' + icon(X.art || S.art[0]) + (X.badge ? '<span class="badge">' + esc(X.badge) + "</span>" : "") + '</div><div><p class="kick" data-r>' + esc(X.kicker) + '</p><h2 class="d-display" data-r>' + X.title + '</h2><p class="t" data-r>' + esc(X.text) + "</p><ul data-r>" + X.items.map(function (it) { return "<li><span>" + esc(it[0]) + "</span><b>" + esc(it[1]) + "</b></li>"; }).join("") + "</ul>" + (X.cta ? '<button class="d-btn pri" type="button" data-wa="hola" data-r>' + wa + esc(X.cta) + "</button>" : "") + "</div></div>";
    } else if (X.type === "progress") {
      body = xh + '<div class="prog" data-r>' + X.items.map(function (it) { return '<div class="bar-r"><span>' + esc(it[0]) + '</span><span class="tr"><i style="--w:' + it[2] + '%"></i></span><small>' + esc(it[1]) + "</small></div>"; }).join("") + "</div>" + (X.badge ? '<span class="prog-badge" data-r>' + esc(X.badge) + "</span>" : "") + xcta;
    }
    specialHTML = '<section class="sec spc alt" id="especial"><div class="wrap">' + body + "</div></section>";
  }

  var tabs = S.catalog.tabs;
  var html = bannerHTML +
    '<a class="sr" href="#catalogo" style="position:absolute;left:-9999px">Saltar al catálogo</a>' +
    '<header class="d-nav" id="nav"><div class="wrap"><a class="d-logo" href="#"><i>' + esc(S.mono) + "</i>" + esc(S.name) + '</a><nav class="d-links" aria-label="Secciones"><a href="#catalogo">' + esc(S.catalog.navLabel || "Catálogo") + '</a><a href="#nosotros">Nosotros</a><a href="#visitanos">Horario</a><a href="#preguntas">Preguntas</a></nav><button class="d-btn pri" type="button" data-wa="hola">' + wa + '<span class="l">' + esc(S.navCta || "Escríbenos") + "</span></button></div></header>" +
    "<main>" +
    '<section class="d-hero">' + hero + "</section>" +
    '<div class="d-strip" aria-hidden="true"><div class="track">' + (S.strip.concat(S.strip)).map(function (w) { return "<span>" + esc(w) + "</span>"; }).join("") + (S.strip.concat(S.strip)).map(function (w) { return "<span>" + esc(w) + "</span>"; }).join("") + "</div></div>" +
    '<section class="sec" id="catalogo"><div class="wrap"><div class="sec-h"><div><p class="kick" data-r>' + esc(S.catalog.kicker) + '</p><h2 class="d-display" data-r>' + S.catalog.title + '</h2></div><p data-r style="--i:2">' + esc(S.catalog.sub) + "</p></div>" +
    (tabs.length > 1 ? '<div class="tabs" role="tablist" aria-label="Categorías" data-r><span class="ind" aria-hidden="true"></span>' + tabs.map(function (t, i) { return '<button role="tab" aria-selected="' + (i === 0) + '" data-t="' + i + '">' + esc(t.name) + "</button>"; }).join("") + "</div>" : "") +
    '<div class="items" id="items" role="tabpanel"></div></div></section>' +
    specialHTML + ownerHTML +
    '<section class="sec alt"><div class="wrap"><div class="feats">' + S.feats.map(function (f, i) { return '<div class="feat" data-r style="--i:' + i + '"><span class="n">0' + (i + 1) + "</span><h3>" + esc(f[0]) + "</h3><p>" + esc(f[1]) + "</p></div>"; }).join("") + "</div></div></section>" +
    '<section class="sec" id="nosotros"><div class="wrap about"><div class="art-card par" data-par="1" data-r style="--art-bg:' + S.about.bg + '">' + heroArt([S.art[1], S.art[2], S.art[0]]) + '</div><div><p class="kick" data-r>' + esc(S.about.kicker) + '</p><blockquote class="d-display" data-r style="margin-top:18px">' + S.about.quote + '</blockquote><p class="sig" data-r>' + esc(S.about.sig) + '</p><div class="facts" data-r>' + S.about.facts.map(function (f) { return "<div><b>" + esc(f[0]) + "</b><span>" + esc(f[1]) + "</span></div>"; }).join("") + "</div></div></div></section>" +
    '<section class="sec alt"><div class="wrap"><div class="sec-h"><div><p class="kick" data-r>Galería</p><h2 class="d-display" data-r>' + S.galleryTitle + '</h2></div></div><div class="gal">' + S.gallery.map(function (g, i) { return '<figure class="tile ' + (g[3] || "") + '" data-r style="--i:' + i + ";--t-bg:" + g[2] + '">' + icon(g[0]) + "<figcaption>" + esc(g[1]) + "</figcaption></figure>"; }).join("") + "</div></div></section>" +
    '<section class="sec"><div class="wrap"><div class="sec-h"><div><p class="kick" data-r>Opiniones</p><h2 class="d-display" data-r>' + S.reviewsTitle + '</h2></div><p data-r style="--i:2">Reseñas de ejemplo para este concepto.</p></div><div class="revs">' + S.reviews.map(function (r, i) { return '<div class="rev" data-r style="--i:' + i + '"><span class="st" aria-label="5 de 5 estrellas">★★★★★</span><p>“' + esc(r[0]) + "”</p><b>" + esc(r[1]) + "</b><small>" + esc(r[2]) + "</small></div>"; }).join("") + "</div></div></section>" +
    '<section class="sec alt" id="visitanos"><div class="wrap"><div class="sec-h"><div><p class="kick" data-r>Visítanos</p><h2 class="d-display" data-r>' + S.visitTitle + '</h2></div></div><div class="visit"><div class="hours" data-r>' + openChip + '<ul style="margin-top:16px">' + S.hours.map(function (h) { var today = h[2] && h[2].indexOf(new Date().getDay()) > -1; return '<li class="' + (today ? "today" : "") + '"><span>' + esc(h[0]) + (today ? " · hoy" : "") + "</span><span>" + esc(h[1]) + "</span></li>"; }).join("") + '</ul><p class="addr"><b>' + esc(S.address) + "</b>" + esc(S.barrio) + ", " + esc(S.city) + '</p></div><div class="map" data-r style="--i:1">' + MAP + '<div class="pin"><i></i><span>' + esc(S.name) + "</span></div></div></div></div></section>" +
    '<section class="sec" id="preguntas"><div class="wrap"><div class="sec-h"><div><p class="kick" data-r>Preguntas</p><h2 class="d-display" data-r>Antes de venir</h2></div></div><div class="faq">' + S.faq.map(function (q, i) { return '<div class="qa" data-r><button aria-expanded="false" aria-controls="fa' + i + '">' + esc(q[0]) + '<span class="pm" aria-hidden="true"></span></button><div class="a" id="fa' + i + '" role="region"><div><p>' + esc(q[1]) + "</p></div></div></div>"; }).join("") + "</div></div></section>" +
    '<section class="final"><span class="ghost" aria-hidden="true">' + esc(S.name) + '</span><div class="wrap"><h2 class="d-display" data-r>' + S.final.h2 + '</h2><p data-r>' + esc(S.final.p) + '</p><div class="ctas" data-r><button class="d-btn pri" type="button" data-wa="hola">' + wa + esc(S.final.cta) + '</button><a class="d-btn out" href="#visitanos">Cómo llegar</a></div></div></section>' +
    "</main>" +
    '<footer class="d-foot"><div class="wrap"><span>© ' + new Date().getFullYear() + " " + esc(S.name) + " · " + esc(S.city) + "</span><span>Concepto diseñado por PairX · negocio ficticio · <a href='../../legal/privacidad/' style='color:inherit'>Privacidad</a> · <a href='../../legal/terminos/' style='color:inherit'>Términos</a></span></div></footer>" +
    '<button class="order" type="button" id="order" data-wa="pedido">' + wa + '<span id="orderTxt">' + esc(S.orderLabel || "Ver pedido") + '</span><span class="n" id="orderN">0</span></button>' +
    '<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mt"><div class="box"><h3 id="mt"></h3><pre id="mm"></pre><p>Esto es un concepto de PairX: en la página real de tu negocio, este botón abriría tu WhatsApp con el mensaje listo.</p><div class="acts"><a id="mPairx" target="_blank" rel="noopener" href="#">Quiero una página así</a><button type="button" id="mClose">Seguir viendo</button></div></div></div>';
  document.body.innerHTML = html;

  if (!preview) {
    var bar = document.createElement("aside");
    bar.className = "pairx-bar"; bar.setAttribute("aria-label", "Aviso de PairX");
    var msg = encodeURIComponent("Hola PairX, vi el concepto de " + S.niche.toLowerCase() + " (" + S.name + ") en tu portafolio y quiero una página así para mi negocio.");
    bar.innerHTML = '<a class="pb-back" href="../"><i aria-hidden="true"></i>Portafolio PairX</a><span class="pb-note">Concepto · negocio ficticio</span><a class="pb-cta" href="https://wa.me/' + PAIRX_WA + "?text=" + msg + '" target="_blank" rel="noopener">Quiero una así</a>';
    document.body.appendChild(bar);
  }

  /* ---------------- Catálogo con pedido ---------------- */
  var itemsEl = document.getElementById("items"), cart = [];
  function renderItems(t) {
    itemsEl.innerHTML = tabs[t].items.map(function (it, i) {
      return '<article class="item enter" style="--i:' + i + '"><span class="ic" style="--art-bg:' + (it[4] || "var(--art-bg)") + '">' + icon(it[3] || S.art[i % 3]) + "</span><div><h3>" + esc(it[0]) + "</h3><p>" + esc(it[1]) + '</p><div class="row"><span class="pr">' + esc(it[2]) + '</span><button class="add" type="button" aria-label="Agregar ' + esc(it[0]) + '" data-add="' + esc(it[0]) + "|" + esc(it[2]) + '">+</button></div></div></article>';
    }).join("");
  }
  renderItems(0);
  var tabsEl = document.querySelector(".tabs");
  function placeInd() {
    if (!tabsEl) return;
    var b = tabsEl.querySelector('[aria-selected="true"]'), ind = tabsEl.querySelector(".ind");
    ind.style.width = b.offsetWidth + "px"; ind.style.transform = "translate(" + (b.offsetLeft - 5) + "px," + (b.offsetTop - 5) + "px)";
  }
  if (tabsEl) {
    tabsEl.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      tabsEl.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-selected", x === b); });
      placeInd(); renderItems(+b.dataset.t);
    });
    addEventListener("resize", placeInd);
    if (document.fonts) document.fonts.ready.then(placeInd);
    setTimeout(placeInd, 60);
  }
  var orderBtn = document.getElementById("order"), orderN = document.getElementById("orderN");
  itemsEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]"); if (!b) return;
    cart.push(b.dataset.add.split("|"));
    b.classList.add("ok"); b.textContent = "✓";
    setTimeout(function () { b.classList.remove("ok"); b.textContent = "+"; }, 900);
    orderN.textContent = cart.length;
    orderBtn.classList.add("show");
    orderBtn.classList.remove("bump"); void orderBtn.offsetWidth; orderBtn.classList.add("bump");
  });

  /* ---------------- Modal de WhatsApp (demostración) ---------------- */
  var modal = document.getElementById("modal"), lastFocus = null;
  function openModal(kind) {
    var text;
    if (kind === "pedido" && cart.length) {
      text = "Hola " + S.name + ", quiero pedir:\n" + cart.map(function (c) { return "· " + c[0] + " (" + c[1] + ")"; }).join("\n") + "\n\n¿Me confirman disponibilidad?";
      document.getElementById("mt").textContent = "Así llegaría el pedido a tu WhatsApp";
    } else {
      text = S.waText || ("Hola " + S.name + ", vi su página y quiero más información.");
      document.getElementById("mt").textContent = "Así te escribirían tus clientes";
    }
    document.getElementById("mm").textContent = text;
    document.getElementById("mPairx").href = "https://wa.me/" + PAIRX_WA + "?text=" + encodeURIComponent("Hola PairX, vi el concepto de " + S.niche.toLowerCase() + " (" + S.name + ") y quiero una página así para mi negocio.");
    lastFocus = document.activeElement;
    modal.classList.add("open");
    document.getElementById("mClose").focus();
  }
  function closeModal() { modal.classList.remove("open"); if (lastFocus) lastFocus.focus(); }
  document.addEventListener("click", function (e) { var b = e.target.closest("[data-wa]"); if (b) openModal(b.dataset.wa); });
  document.getElementById("mClose").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  addEventListener("keydown", function (e) { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  /* ---------------- Preguntas ---------------- */
  document.querySelectorAll(".qa button").forEach(function (b) {
    b.addEventListener("click", function () { var q = b.parentNode, o = !q.classList.contains("open"); q.classList.toggle("open", o); b.setAttribute("aria-expanded", o); });
  });

  /* ---------------- Navegación y revelado ---------------- */
  var nav = document.getElementById("nav");
  addEventListener("scroll", function () { nav.classList.toggle("scrolled", scrollY > 8); }, { passive: true });
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: "0px 0px -5% 0px" });
  document.querySelectorAll("[data-r]").forEach(function (el) { io.observe(el); });
  if (preview) document.querySelectorAll("[data-r]").forEach(function (el) { el.classList.add("in"); });

  /* ---------------- Paralaje del hero y galería ---------------- */
  if (fine && !reduce && !preview) {
    var pieces = document.querySelectorAll(".d-hero .pz"), par = document.querySelectorAll(".d-hero [data-par]");
    var heroEl = document.querySelector(".d-hero");
    heroEl.addEventListener("pointermove", function (e) {
      var r = heroEl.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      par.forEach(function (p) { p.style.transform = "translate3d(" + (nx * -14) + "px," + (ny * -10) + "px,0) rotateX(" + (ny * -3) + "deg) rotateY(" + (nx * 4) + "deg)"; });
      pieces.forEach(function (p) { var d = +p.getAttribute("data-d"); p.setAttribute("transform", "translate(" + (nx * d).toFixed(1) + " " + (ny * d * .7).toFixed(1) + ")"); });
    });
    heroEl.addEventListener("pointerleave", function () { par.forEach(function (p) { p.style.transform = ""; }); pieces.forEach(function (p) { p.setAttribute("transform", ""); }); });
    document.querySelectorAll(".tile").forEach(function (t) {
      t.addEventListener("pointermove", function (e) { var r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; t.style.transform = "perspective(700px) rotateX(" + (y * -8) + "deg) rotateY(" + (x * 10) + "deg) scale(1.02)"; });
      t.addEventListener("pointerleave", function () { t.style.transform = ""; });
    });
  }
})();

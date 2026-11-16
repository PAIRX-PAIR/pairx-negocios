/* PairX · Video 3D. Una sola escena a pantalla completa; el scroll es la línea de tiempo y la cámara viaja por planos:
   hero → qué hacemos → 3 pasos → planes → portafolio → cierre. Todo procedural salvo las capturas del portafolio.
   Se pausa fuera de pantalla o con la pestaña oculta. */
import * as THREE from "./vendor/three.module.min.js";

export function start({ works = [], state = {} }) {
  const canvas = document.getElementById("gl");
  const shotsEl = [...document.querySelectorAll(".film .shot")];
  if (!canvas || shotsEl.length < 6) throw new Error("faltan elementos de la escena");
  const mobile = matchMedia("(max-width: 860px), (pointer: coarse)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0c0a0a, 0.1);
  scene.background = scene.fog.color;
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);

  /* ---------- utilidades ---------- */
  let seed = 573187;
  const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const rr = (a, b) => a + (b - a) * rnd();
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const mix = (a, b, t) => a + (b - a) * t;
  const C = { night: 0x0c0a0a, crimson: 0xB0122C, fresh: 0xE0263F, deep: 0x7d0d0d, cream: 0xf2ece5 };
  const rrect = (w, h, r) => { const s = new THREE.Shape(), x = -w / 2, y = -h / 2; s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s; };
  const fitUV = (g, w, h) => { const p = g.attributes.position, u = g.attributes.uv; for (let i = 0; i < p.count; i++) u.setXY(i, p.getX(i) / w + 0.5, p.getY(i) / h + 0.5); return g; };

  /* ---------- luz y reflejos (entorno generado, sin HDR) ---------- */
  {
    const env = new THREE.Scene();
    env.add(new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({ color: 0x0a0707, side: THREE.BackSide })));
    const panel = (color, w, h, p) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })); m.position.copy(p); m.lookAt(0, 0, 0); env.add(m); };
    panel(0xfff1e2, 14, 8, V(0, 16, 4)); panel(0xff3b55, 9, 14, V(-16, 2, -2)); panel(0xffffff, 3, 12, V(15, 3, 8)); panel(0xB0122C, 16, 6, V(4, -14, 6)); panel(0xffd9cc, 6, 4, V(2, 4, 18));
    const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(env, 0.03).texture; pm.dispose();
  }
  scene.add(new THREE.HemisphereLight(0xf2ece5, 0x1a0508, 0.5));
  const key = new THREE.DirectionalLight(0xfff0e0, 1.6); key.position.set(4, 7, 8); scene.add(key, key.target);
  const redA = new THREE.PointLight(C.fresh, 60, 30, 1.6), redB = new THREE.PointLight(C.fresh, 50, 30, 1.6); scene.add(redA, redB);
  const glowTex = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 128; const x = c.getContext("2d");
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.25, "rgba(255,255,255,.5)"); g.addColorStop(0.6, "rgba(255,255,255,.1)"); g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g; x.fillRect(0, 0, 128, 128); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  function glow(color, size, opacity, parent = scene) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    s.scale.set(size, size, 1); parent.add(s); return s;
  }

  /* ---------- la X de PairX ---------- */
  const X = new THREE.Group(); scene.add(X);
  const xMat = new THREE.MeshPhysicalMaterial({ color: C.crimson, metalness: 0.35, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.12, emissive: 0x3a0510, emissiveIntensity: 0.6 });
  const barGeo = new THREE.ExtrudeGeometry(rrect(4.0, 0.92, 0.2), { depth: 0.8, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.07, bevelSegments: mobile ? 3 : 6, curveSegments: mobile ? 6 : 12 });
  barGeo.translate(0, 0, -0.4);
  /* X de una sola pieza: evita que las dos barras se peleen en el cruce (se veía de dos colores) */
  const xShape = (() => { const h = 0.46, L = 2.0, r = 0.2, p = new THREE.Shape();
    p.moveTo(-h, h); p.lineTo(-h, L - r); p.quadraticCurveTo(-h, L, -h + r, L); p.lineTo(h - r, L); p.quadraticCurveTo(h, L, h, L - r);
    p.lineTo(h, h); p.lineTo(L - r, h); p.quadraticCurveTo(L, h, L, h - r); p.lineTo(L, -h + r); p.quadraticCurveTo(L, -h, L - r, -h);
    p.lineTo(h, -h); p.lineTo(h, -L + r); p.quadraticCurveTo(h, -L, h - r, -L); p.lineTo(-h + r, -L); p.quadraticCurveTo(-h, -L, -h, -L + r);
    p.lineTo(-h, -h); p.lineTo(-L + r, -h); p.quadraticCurveTo(-L, -h, -L, -h + r); p.lineTo(-L, h - r); p.quadraticCurveTo(-L, h, -L + r, h); p.lineTo(-h, h); return p; })();
  const xGeo = new THREE.ExtrudeGeometry(xShape, { depth: 0.8, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.07, bevelSegments: mobile ? 3 : 6, curveSegments: mobile ? 6 : 12 });
  xGeo.translate(0, 0, -0.4); xGeo.rotateZ(Math.PI / 4);
  const xSolid = new THREE.Mesh(xGeo, xMat); xSolid.visible = false; X.add(xSolid);
  const bars = [1, -1].map(s => { const pivot = new THREE.Group(), m = new THREE.Mesh(barGeo, xMat); pivot.rotation.z = s * Math.PI / 4; pivot.add(m); X.add(pivot); return { pivot, m, s }; });
  const xGlow = glow(C.fresh, 11, 0.4); const xGlow2 = glow(0xff8a98, 4.5, 0.25);

  /* ---------- pantallas: celulares y portátil ---------- */
  const loader = new THREE.TextureLoader(), tex = {}, waiting = {};
  const colorOf = slug => { const w = works.find(x => x.slug === slug); return new THREE.Color(w && w.colors ? w.colors[0] : "#222").multiplyScalar(0.45); };
  function useTex(mat, slug) {
    mat.userData.slug = slug;
    if (tex[slug]) { mat.map = tex[slug]; mat.color.set(0xffffff); mat.needsUpdate = true; return; }
    mat.map = null; mat.color.copy(colorOf(slug)); mat.needsUpdate = true; (waiting[slug] = waiting[slug] || []).push(mat);
  }
  function loadTex(slug, file, done) {
    loader.load("assets/3d/" + (file || slug) + ".jpg", t => {
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); tex[slug] = t;
      (waiting[slug] || []).forEach(m => { if (m.userData.slug === slug) { m.map = t; m.color.set(0xffffff); m.needsUpdate = true; } }); waiting[slug] = [];
      done && done();
    }, undefined, () => done && done());
  }
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x171312, metalness: 0.75, roughness: 0.32 });
  const PW = 1.1, PH = 2.38;
  const phoneBody = new THREE.ExtrudeGeometry(rrect(PW + 0.1, PH + 0.1, 0.19), { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2, curveSegments: mobile ? 4 : 8 });
  phoneBody.translate(0, 0, -0.04);
  const phoneScr = fitUV(new THREE.ShapeGeometry(rrect(PW, PH, 0.13), mobile ? 4 : 8), PW, PH);
  function phone(slug) {
    const g = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ toneMapped: false });
    const scr = new THREE.Mesh(phoneScr, mat); scr.position.z = 0.063;
    g.add(new THREE.Mesh(phoneBody, bodyMat), scr); useTex(mat, slug); g.userData = { mat, scr };
    return g;
  }
  const phA = phone(state.biz || "panaderia"), phB = phone("restaurante"), phC = phone("gimnasio");
  const laptop = new THREE.Group();
  {
    const base = new THREE.ExtrudeGeometry(rrect(3.3, 2.2, 0.14), { depth: 0.08, bevelEnabled: false }); base.rotateX(-Math.PI / 2);
    laptop.add(new THREE.Mesh(base, bodyMat));
    const lid = new THREE.Group(); lid.position.set(0, 0.08, -1.08); lid.rotation.x = -0.22;
    const lidGeo = new THREE.ExtrudeGeometry(rrect(3.3, 2.14, 0.12), { depth: 0.06, bevelEnabled: false }); lidGeo.translate(0, 1.07, -0.06);
    const sMat = new THREE.MeshBasicMaterial({ toneMapped: false }); useTex(sMat, "desk");
    const scr = new THREE.Mesh(fitUV(new THREE.PlaneGeometry(3.08, 1.925), 3.08, 1.925), sMat); scr.position.set(0, 1.07, 0.004);
    lid.add(new THREE.Mesh(lidGeo, bodyMat), scr); laptop.add(lid);
  }
  scene.add(phA, phB, phC, laptop);
  addEventListener("pairx:biz", e => { if (tex[e.detail] || works.some(w => w.slug === e.detail)) useTex(phA.userData.mat, e.detail); });

  /* ---------- podios de los planes ---------- */
  const PLAN_IDS = ["vitrina", "local", "tienda"], PX = [-2.7, 0, 2.7], PHt = [0.5, 1.0, 1.5], PBASE = -1.9;
  const pods = new THREE.Group(); scene.add(pods);
  const podMats = PX.map((x, i) => {
    const m = new THREE.MeshStandardMaterial({ color: 0x1b1513, metalness: 0.5, roughness: 0.4, emissive: C.crimson, emissiveIntensity: 0.05 });
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.0, PHt[i], mobile ? 24 : 48), m); b.position.set(x, PBASE + PHt[i] / 2, 0); pods.add(b);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.96, 0.025, 6, mobile ? 32 : 64), new THREE.MeshBasicMaterial({ color: C.fresh, toneMapped: false })); ring.rotation.x = Math.PI / 2; ring.position.set(x, PBASE + PHt[i] + 0.01, 0); pods.add(ring);
    return { m, b, ring, lit: 0 };
  });

  /* ---------- polvo ---------- */
  const dustN = mobile ? 240 : 650;
  const dust = (() => {
    const p = new Float32Array(dustN * 3), c = new Float32Array(dustN * 3), col = new THREE.Color();
    for (let i = 0; i < dustN; i++) {
      p[i * 3] = rr(-16, 16); p[i * 3 + 1] = rr(-8, 9); p[i * 3 + 2] = rr(-52, 12);
      col.set(rnd() < 0.6 ? C.fresh : 0xffe6d8).multiplyScalar(rr(0.3, 1)); c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b;
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(p, 3)); g.setAttribute("color", new THREE.BufferAttribute(c, 3));
    const m = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.14, map: glowTex, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
    m.frustumCulled = false; scene.add(m); return m;
  })();

  /* ---------- anillo del portafolio (alrededor de la X) ---------- */
  const N = works.length || 1, STEP = Math.PI * 2 / N, RING_R = 4.4, RC = V(0, 0, -40);
  const ring = new THREE.Group(); ring.position.copy(RC); scene.add(ring);
  const panels = works.map((w, i) => {
    const g = phone(w.slug), a = i * STEP; g.position.set(Math.sin(a) * RING_R, 0, Math.cos(a) * RING_R); g.rotation.y = a; g.userData.scr.userData.i = i; ring.add(g);
    return { g, scr: g.userData.scr, w };
  });
  function loadAll() {
    const order = [state.biz || "panaderia", "restaurante", "gimnasio", ...works.map(w => w.slug)].filter((s, i, a) => a.indexOf(s) === i);
    let k = 0; const next = () => { const s = order[k++]; if (s) loadTex(s, null, next); else loadTex("desk", "desk-panaderia"); }; next();
  }

  /* ---------- interfaz del anillo ---------- */
  const $ = s => document.querySelector(s);
  const hit = $("#ringHit"), linkEl = $("#ringLink"), nameEl = $("#ringName"), countEl = $("#reelCount");
  const rs = { idx: 0, offset: 0, cur: -1, drag: null, p: 0 };
  const pad = n => String(n).padStart(2, "0");
  function setCur(i) {
    if (i === rs.cur || !works[i]) return; rs.cur = i; const w = works[i];
    if (linkEl) { linkEl.href = "portafolio/" + w.slug + "/"; linkEl.setAttribute("aria-label", "Ver la página de ejemplo de " + w.name + " (" + w.niche + ")"); }
    if (nameEl) nameEl.textContent = "Ver " + w.name + " · " + w.niche;
    if (countEl) countEl.textContent = pad(i + 1) + " / " + pad(N);
  }
  setCur(0);
  const nudge = d => { rs.offset = Math.round(rs.p * (N - 1) + rs.offset) + d - rs.p * (N - 1); };
  const prevB = $("#reelPrev"), nextB = $("#reelNext");
  if (prevB) prevB.addEventListener("click", () => nudge(-1));
  if (nextB) nextB.addEventListener("click", () => nudge(1));
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  if (hit) {
    hit.addEventListener("pointerdown", e => { rs.drag = { x: e.clientX, o: rs.offset, moved: false }; hit.classList.add("dragging"); });
    addEventListener("pointermove", e => {
      if (!rs.drag) return; const dx = e.clientX - rs.drag.x;
      if (Math.abs(dx) > 6) rs.drag.moved = true;
      if (rs.drag.moved) rs.offset = rs.drag.o - dx / (Math.min(innerWidth, 900) * 0.3);
    }, { passive: true });
    const end = e => {
      if (!rs.drag) return; const d = rs.drag; rs.drag = null; hit.classList.remove("dragging");
      if (d.moved || e.type === "pointercancel") return;
      const r = canvas.getBoundingClientRect();
      ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const h = ray.intersectObjects(panels.map(p => p.scr), false)[0];
      if (!h) return; const i = h.object.userData.i;
      if (i === rs.cur) { location.href = "portafolio/" + works[i].slug + "/"; return; }
      let diff = i - rs.cur; if (diff > N / 2) diff -= N; if (diff < -N / 2) diff += N; nudge(diff);
    };
    addEventListener("pointerup", end); addEventListener("pointercancel", end);
  }

  /* ---------- planos: cámara [posición, objetivo] y poses [x,y,z, rx,ry,rz, escala] ---------- */
  const CZ = RC.z;
  const CAM = [
    [V(0.6, 0.4, 11.5), V(0, 0, 0)], [V(5.6, 0.7, 6.4), V(1.7, 0, 1.3)], [V(-1.8, 2.7, 12.8), V(0.2, -0.2, 2.2)], [V(-4.6, 2.2, 11), V(0, -0.1, 0)],
    [V(0, 0.3, CZ + RING_R + 6.4), V(0, 0, CZ + RING_R)], [V(3.2, 0.8, CZ + 9.6), V(0, 0, CZ)], [V(-3, 3.5, CZ + 23), V(0, 0, CZ)]
  ];
  const KM = [1.75, 1.6, 1.7, 1.7, 1.2, 1.9, 1.5];     /* en vertical la cámara se aleja */
  const FOG = [[0x0c0a0a, 0.034], [0x0c0a0a, 0.04], [0x0d0a0a, 0.03], [0x0f0909, 0.03], [0x26070e, 0.036], [0x360a13, 0.032], [0x0c0a0a, 0.02]];
  const OUT = [0, 0, CZ + 5, 0, 0, 0, 0.001];
  const P = {
    X: [[0, 0, 0, 0.12, -0.4, 0, 1], [-1.7, 0.9, -3.4, 0.3, 0.9, 0.2, 0.9], [0, 2.0, -1.6, 0.15, 0.1, 0, 0.8], [0, 2.35, 0, 0, 0.5, 0, 0.36], [0, 0, CZ, 0, 0, 0, 0.72], [0, 0, CZ, 0.16, 0.35, 0, 1.25], [0, 0, CZ, 0.1, -0.3, 0, 1.25]],
    A: [[2.6, 0.1, 1.4, -0.08, -0.5, 0.08, 0.8], [2.1, 0, 1.7, 0, 0.62, 0, 1.12], [-2.2, 0, 2.4, 0, 0.18, 0, 0.9], [PX[0], PBASE + PHt[0] + 0.78, 0, 0, -0.25, 0, 0.6], OUT, OUT, OUT],
    B: [[-2.4, 1.4, -1.0, 0.1, 0.5, -0.1, 0.6], [0.5, 0.2, 0.5, 0, 0.9, -0.05, 0.9], [0, 0.2, 0.4, 0, 0, 0, 0.001], [PX[1], PBASE + PHt[1] + 0.97, 0, 0, -0.3, 0, 0.75], OUT, OUT, OUT],
    C: [[1.5, -1.6, 0.7, 0.2, -0.3, 0.2, 0.5], [3.9, -0.1, 0.6, 0, 0.3, 0.05, 0.92], [2.9, 0, 2.4, 0, -0.18, 0, 0.9], [0, 3.4, -2, 0, 0, 0, 0.001], OUT, OUT, OUT],
    L: [[-2.0, -1.7, 0.9, 0.1, 0.5, 0, 0.72], [-0.9, -1.4, -1.4, 0, 0.9, 0, 0.7], [0.4, -0.95, 2.4, 0.06, 0, 0, 0.74], [PX[2], PBASE + PHt[2], 0, 0, -0.5, 0, 0.56], OUT, OUT, OUT]
  };
  const SPREAD = { 2: 0.5, 3: 0.56 };                    /* en vertical las filas se juntan */
  const MOBILE_DEVICES = [["A", "B"], ["A", "B"], ["A", "L"], ["B", "L"], [], [], []];
  const OBJ = { X, A: phA, B: phB, C: phC, L: laptop };
  const q = k => new THREE.Quaternion().setFromEuler(new THREE.Euler(k[3], k[4], k[5]));
  const Q = {}; for (const n in P) Q[n] = P[n].map(q);
  const PODY = [-9, -9, -9, 0, -9, -9, -9];

  /* ---------- estado ---------- */
  let planIdx = Math.max(0, PLAN_IDS.indexOf(state.plan)), planX = PX[planIdx];
  addEventListener("pairx:plan", e => { planIdx = Math.max(0, PLAN_IDS.indexOf(e.detail)); });
  const ptr = { x: 0, y: 0, sx: 0, sy: 0 };
  addEventListener("pointermove", e => { if (e.pointerType === "mouse") { ptr.x = e.clientX / innerWidth - 0.5; ptr.y = e.clientY / innerHeight - 0.5; } }, { passive: true });
  addEventListener("deviceorientation", e => { if (e.gamma == null) return; ptr.x = clamp(e.gamma / 50, -0.5, 0.5); ptr.y = clamp((e.beta - 45) / 60, -0.5, 0.5); }, { passive: true });
  let lastSY = scrollY, spin = 0, spinV = 0;

  const shots = shotsEl.map(el => ({ el, inEl: el.querySelector(".shot-in"), o: -1 }));
  let W = 1, H = 1, portrait = false;
  function resize() {
    W = canvas.clientWidth || innerWidth; H = canvas.clientHeight || innerHeight; portrait = W / H < 0.9;
    renderer.setSize(W, H, false); camera.aspect = W / H;
    if (mobile) camera.setViewOffset(W, H, 0, Math.round(H * 0.2), W, H); else camera.setViewOffset(W, H, -Math.round(W * 0.32), 0, W, H);
    camera.updateProjectionMatrix();
  }
  resize(); let rsT = 0; addEventListener("resize", () => { clearTimeout(rsT); rsT = setTimeout(resize, 120); });

  /* T: posición en la línea de tiempo (plano i centrado en i + 0.5); de paso, los títulos entran y salen */
  let Tsm = 0.3, first = true;
  function timeline() {
    const vh = innerHeight; let T = 0;
    for (let i = 0; i < shots.length; i++) {
      const s = shots[i], r = s.el.getBoundingClientRect();
      /* El tramo animado es el que el hijo sticky permanece fijado, no el alto total del plano. */
      const travel = Math.max(1, r.height - vh), local = clamp(-r.top / travel, 0, 1);
      if (r.top <= 0 && (r.bottom > 0 || i === shots.length - 1)) T = i + local;
      const oin = i === 0 ? 1 : sstep(0, 1, 1 - r.top / (vh * 0.3)), oout = sstep(0, 1, (r.bottom - vh * 0.7) / (vh * 0.3));
      const o = Math.round(oin * oout * 100) / 100;
      if (o !== s.o) {
        s.o = o; s.inEl.style.setProperty("--o", o); s.inEl.style.setProperty("--ty", ((1 - oin) * 36 - (1 - oout) * 36).toFixed(1) + "px");
        s.inEl.classList.toggle("off", o < 0.4);
      }
      if (i === 4) rs.p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
    }
    return T;
  }

  const t0 = performance.now(); let intro = 0, last = t0;
  const fogA = new THREE.Color(), fogB = new THREE.Color(), cp = V(0, 0, 0), ct = V(0, 0, 0), va = V(0, 0, 0), vb = V(0, 0, 0), qa = new THREE.Quaternion();
  function frame(now) { raf = requestAnimationFrame(frame); tick(now); }
  function tick(now) {
    const dt = clamp((now - last) / 1000, 0, 0.05), t = now / 1000; last = now;
    const T = timeline();
    Tsm = first ? T : Tsm + (T - Tsm) * (1 - Math.exp(-dt * 3.2)); first = false;
    /* intro: la X se arma y la cámara se acerca; el scroll la salta */
    intro = Math.min(1, intro + dt / (scrollY > 30 ? 0.45 : 2.7));
    const ik = 1 - Math.pow(1 - intro, 3);

    const u = clamp(Tsm - 0.5, 0, 5.9999), i = Math.floor(u), f = sstep(0.2, 0.8, u - i), j = i + 1;
    ptr.sx += (ptr.x - ptr.sx) * (1 - Math.exp(-dt * 3)); ptr.sy += (ptr.y - ptr.sy) * (1 - Math.exp(-dt * 3));
    const km = portrait ? mix(KM[i], KM[j], f) : (i === 4 || j === 4 ? mix(i === 4 ? 1 : 1.1, j === 4 ? 1 : 1.1, f) : 1.1);

    /* cámara: dolly/órbita suave entre planos + paralaje del puntero */
    ct.copy(CAM[i][1]).lerp(CAM[j][1], f);
    va.copy(CAM[i][0]).sub(CAM[i][1]); vb.copy(CAM[j][0]).sub(CAM[j][1]);
    const dist = mix(va.length(), vb.length(), f) * km + (1 - ik) * 10;
    cp.copy(va.normalize()).lerp(vb.normalize(), f).normalize().multiplyScalar(dist).add(ct);
    cp.y += Math.sin(Math.PI * f) * 0.8 * (i === 3 ? 2.2 : 1) + Math.sin(t * 0.23) * 0.07;
    camera.position.copy(cp); camera.lookAt(ct);
    camera.translateX(ptr.sx * 0.9); camera.translateY(-ptr.sy * 0.55); camera.lookAt(ct);
    camera.rotation.z += Math.sin(Math.PI * f) * 0.035 * (i % 2 ? 1 : -1);

    fogA.setHex(FOG[i][0]); fogB.setHex(FOG[j][0]); scene.fog.color.copy(fogA).lerp(fogB, f);
    scene.fog.density = mix(FOG[i][1], FOG[j][1], f) / Math.pow(km, 0.8) + (1 - ik) * 0.06;

    /* objetos: cada uno viaja entre sus poses */
    planX += (PX[planIdx] - planX) * (1 - Math.exp(-dt * 5));
    const sa = portrait && SPREAD[i] ? SPREAD[i] : 1, sb = portrait && SPREAD[j] ? SPREAD[j] : 1;
    const stageX = mobile ? 0 : 1.35;
    const mobileShot = Math.min(MOBILE_DEVICES.length - 1, Math.round(i + f));
    const mobileDevices = MOBILE_DEVICES[mobileShot];
    const grow = sstep(0.35, 1, intro);
    for (const n in OBJ) {
      const o = OBJ[n], a = P[n][i], b = P[n][j];
      let ax = a[0] * sa, bx = b[0] * sb;
      if (n === "X") { if (i === 3) ax = planX * sa; if (j === 3) bx = planX * sb; }
      const stageY = mobile ? (n === "X" ? 0.3 : 0.55) : 0;
      o.position.set(mix(ax, bx, f) + stageX, mix(a[1], b[1], f) + stageY, mix(a[2], b[2], f));
      o.quaternion.copy(Q[n][i]).slerp(Q[n][j], f);
      const mobileScale = mobile ? (n === "X" ? 0.72 : 0.58) : 1;
      const s = mix(a[6], b[6], f) * (n === "X" ? 1 : grow) * mobileScale * (portrait && n !== "X" && (i < 2 || j < 2) ? mix(i < 2 ? 0.8 : 1, j < 2 ? 0.8 : 1, f) : 1);
      o.scale.setScalar(s); o.visible = s > 0.004 && (!mobile || n === "X" || mobileDevices.includes(n));
      if (n !== "X") { o.position.y += Math.sin(t * 0.8 + o.id) * 0.06; o.rotateY(Math.sin(t * 0.5 + o.id) * 0.05 + ptr.sx * 0.12); }
    }
    /* la X: gira con el tiempo y con la velocidad del scroll; al cargar, sus dos barras se encuentran */
    const sv = clamp((scrollY - lastSY) / Math.max(dt, 0.001) / 1400, -3, 3); lastSY = scrollY;
    spinV += (sv - spinV) * (1 - Math.exp(-dt * 4)); spin += dt * (0.25 + spinV * 1.6);
    const turn = mix(i >= 3 ? 1 : 0.25, j >= 3 ? 1 : 0.25, f);
    X.rotateY(Math.sin(t * 0.4) * 0.18 * (1 - turn) + spin * turn + ptr.sx * 0.25); X.rotateX(-ptr.sy * 0.2);
    X.position.y += Math.sin(t * 0.7) * 0.07;
    bars.forEach(b => { b.m.position.set(b.s * (1 - ik) * 9, 0, b.s * (1 - ik) * -3); b.pivot.rotation.z = b.s * (Math.PI / 4 + (1 - ik) * 2.6); b.m.rotation.x = (1 - ik) * 3 * b.s; });
    { const whole = ik > 0.999; xSolid.visible = whole; bars.forEach(b => { b.m.visible = !whole; }); }
    xGlow.position.copy(X.position); xGlow2.position.copy(X.position);
    const xs = X.scale.x; xGlow.scale.setScalar(11 * xs + 2); xGlow2.scale.setScalar(4.5 * xs);
    xGlow.material.opacity = (0.3 + 0.08 * Math.sin(t * 1.3)) * ik; xGlow2.material.opacity = 0.2 * ik;
    xMat.emissiveIntensity = 0.5 + 0.5 * sstep(4.3, 5.2, Tsm);
    redA.position.set(X.position.x + Math.sin(t * 0.5) * 4, X.position.y + 2, X.position.z + 3 + Math.cos(t * 0.5) * 2);
    redB.position.set(X.position.x - 4 + ptr.sx * 6, X.position.y - 2 - ptr.sy * 4, X.position.z + 4);
    key.position.set(ct.x + 4, ct.y + 7, ct.z + 8); key.target.position.copy(ct); key.target.updateMatrixWorld();

    /* podios: suben en el plano de planes; el elegido se enciende */
    const podY = mix(PODY[i], PODY[j], f);
    pods.position.set(stageX, podY + (mobile ? 0.25 : 0), 0); pods.visible = podY > -8.5;
    const ps = mix(sa, sb, f);
    podMats.forEach((p, k) => {
      p.lit += ((k === planIdx ? 1 : 0) - p.lit) * (1 - Math.exp(-dt * 5));
      p.m.emissiveIntensity = 0.04 + 0.7 * p.lit; p.b.position.x = p.ring.position.x = PX[k] * ps;
      p.b.scale.set(ps < 1 ? 0.78 : 1, 1, ps < 1 ? 0.78 : 1); p.ring.scale.setScalar((ps < 1 ? 0.78 : 1) * (1 + 0.04 * p.lit * Math.sin(t * 3)));
      p.b.visible = p.ring.visible = !mobile || k === planIdx;
    });
    dust.rotation.z = Math.sin(t * 0.05) * 0.05; dust.position.y = Math.sin(t * 0.11) * 0.5;

    /* anillo: gira con el scroll, con el arrastre y con las flechas */
    const tgt = rs.p * (N - 1) + rs.offset, snap = rs.drag ? tgt : mix(tgt, Math.round(tgt), 0.8);
    rs.idx += (snap - rs.idx) * (1 - Math.exp(-dt * 5));
    ring.rotation.y = -rs.idx * STEP;
    setCur(((Math.round(rs.idx) % N) + N) % N);
    const show = sstep(3.3, 3.95, Tsm), away = sstep(4.55, 5.3, Tsm);
    ring.scale.setScalar((mobile ? 0.64 : 1) * (0.25 + 0.75 * show)); ring.visible = show > 0.01 && away < 0.995;
    ring.position.set(stageX, RC.y + (mobile ? 0.45 : 0) + (1 - show) * -3 - away * away * 12, RC.z);
    panels.forEach((p, k) => {
      const distance = Math.abs(k - rs.cur), wrapped = Math.min(distance, N - distance);
      p.g.position.y = Math.sin(t * 0.7 + k * 1.7) * 0.07 + (k % 2 ? 0.14 : -0.14);
      p.g.scale.setScalar((mobile ? 0.68 : 1) * (k === rs.cur ? 1.08 : 0.92));
      p.g.visible = !mobile || wrapped <= 1;
    });

    renderer.render(scene, camera);
    if (!shown) { shown = true; canvas.style.opacity = 1; setTimeout(loadAll, 300); }
  }

  /* ---------- solo se dibuja cuando se ve ---------- */
  let raf = 0, shown = false; const vis = new Set();
  canvas.style.opacity = 0; canvas.style.transition = "opacity 1s ease";
  const run = () => { const on = vis.size > 0 && !document.hidden; if (on && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } else if (!on && raf) { cancelAnimationFrame(raf); raf = 0; } };
  const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); run(); }, { rootMargin: "80px" });
  [document.getElementById("film"), document.querySelector(".faq"), document.querySelector(".foot")].forEach(el => el && io.observe(el));
  document.addEventListener("visibilitychange", run);
  window.PAIRX3D = { snap(n = 1) { first = true; intro = 1; let t = performance.now(); for (let k = 0; k < n; k++) tick(t += 50); } }; /* para pruebas */
  canvas.addEventListener("webglcontextlost", e => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; });
  canvas.addEventListener("webglcontextrestored", () => location.reload());
}

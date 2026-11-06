/* Logo de PairX impreso en puntos de semitono al pie de la página.
   Los puntos se apartan del cursor con resortes y un clic lanza una onda.
   Adaptado a JS sin dependencias del componente Halftone Wordmark Footer. */
(function () {
  "use strict";
  var root = document.getElementById("hwf");
  if (!root) return;
  var canvas = root.querySelector("canvas"), ctx = canvas.getContext("2d");
  if (!ctx) return;

  var CREAM = [244, 239, 230], CRIMSON = [224, 38, 63];
  var FONT = '700 100px "IBM Plex Sans", system-ui, sans-serif';
  var CROP = 0.2, RADIUS = 80, STRIDE = 8; /* x, y, vx, vy, hx, hy, r, esX */
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var w = 0, h = 0, dpr = 1, px = -1e5, py = -1e5, raf = 0, visible = true, awake = true;
  var ring = { x: 0, y: 0, t: -1 }, dots = new Float32Array(0), count = 0;

  function layout() {
    var rect = root.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    var mask = document.createElement("canvas");
    mask.width = w; mask.height = h;
    var m = mask.getContext("2d", { willReadFrequently: true });
    m.font = FONT;
    var fit = (w * 0.98 / m.measureText("PairX").width) * 100;
    m.font = FONT.replace("100px", fit + "px");
    var box = m.measureText("PairX"), cap = box.actualBoundingBoxAscent || fit * 0.72;
    var left = (w - box.width) / 2, splitX = left + m.measureText("Pair").width;
    m.textBaseline = "alphabetic";
    m.fillText("PairX", left, h + cap * CROP);
    var img = m.getImageData(0, 0, w, h).data;

    var gap = w < 720 ? 4 : 6, cols = Math.ceil(w / gap), rows = Math.ceil(h / gap), tmp = [];
    for (var gy = 0; gy < rows; gy++) {
      for (var gx = 0; gx < cols; gx++) {
        var sum = 0;
        for (var sy = 0; sy < 3; sy++) for (var sx = 0; sx < 3; sx++) {
          var x = Math.min(w - 1, Math.floor(gx * gap + (sx + 0.5) * gap / 3));
          var y = Math.min(h - 1, Math.floor(gy * gap + (sy + 0.5) * gap / 3));
          sum += img[(y * w + x) * 4 + 3];
        }
        var cov = sum / (9 * 255);
        if (cov < 0.06) continue;
        var hx = gx * gap + gap / 2, hy = gy * gap + gap / 2;
        tmp.push(hx, hy, 0, 0, hx, hy, Math.sqrt(cov) * gap * 0.56, hx >= splitX ? 1 : 0);
      }
    }
    dots = new Float32Array(tmp);
    count = tmp.length / STRIDE;
    awake = true;
  }

  function mix(a, b, k) {
    return "rgb(" + Math.round(a[0] + (b[0] - a[0]) * k) + "," + Math.round(a[1] + (b[1] - a[1]) * k) + "," + Math.round(a[2] + (b[2] - a[2]) * k) + ")";
  }

  function draw(now) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var age = ring.t < 0 ? 1e9 : now - ring.t, ringR = age * 0.9, moving = false;
    for (var i = 0; i < count; i++) {
      var j = i * STRIDE, x = dots[j], y = dots[j + 1], vx = dots[j + 2], vy = dots[j + 3], hx = dots[j + 4], hy = dots[j + 5];
      if (!reduced) {
        if (age < 900) {
          var rx = hx - ring.x, ry = hy - ring.y, rd = Math.sqrt(rx * rx + ry * ry) + 0.001;
          var band = 1 - Math.min(1, Math.abs(rd - ringR) / 26);
          if (band > 0) { var rf = band * 3.2 * (1 - age / 900); vx += rx / rd * rf; vy += ry / rd * rf; }
        }
        var dx = x - px, dy = y - py, d2 = dx * dx + dy * dy;
        if (d2 < RADIUS * RADIUS) {
          var d = Math.sqrt(d2) + 0.001, f = (1 - d / RADIUS) * 2.6;
          vx += dx / d * f; vy += dy / d * f;
        }
        vx = (vx + (hx - x) * 0.05) * 0.84;
        vy = (vy + (hy - y) * 0.05) * 0.84;
        x += vx; y += vy;
        if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) moving = true;
        else { x = hx; y = hy; vx = 0; vy = 0; }
        dots[j] = x; dots[j + 1] = y; dots[j + 2] = vx; dots[j + 3] = vy;
      }
      var k = Math.min(1, Math.hypot(x - hx, y - hy) / 28), isX = dots[j + 7];
      ctx.fillStyle = mix(isX ? CRIMSON : CREAM, isX ? CREAM : CRIMSON, k);
      ctx.beginPath();
      ctx.arc(x, y, dots[j + 6], 0, 6.2832);
      ctx.fill();
    }
    awake = moving || age < 900 || px > -1e4;
  }

  function loop(now) {
    raf = 0;
    if (!visible) return;
    draw(now);
    if (awake) raf = requestAnimationFrame(loop);
  }
  function wake() { awake = true; if (!raf && visible) raf = requestAnimationFrame(loop); }
  function local(e) { var b = canvas.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; }

  layout();
  draw(performance.now());
  root.addEventListener("pointermove", function (e) { var p = local(e); px = p[0]; py = p[1]; wake(); });
  root.addEventListener("pointerleave", function () { px = py = -1e5; wake(); });
  root.addEventListener("pointerdown", function (e) {
    if (reduced) return;
    var p = local(e);
    ring = { x: p[0], y: p[1], t: performance.now() };
    wake();
  });
  new ResizeObserver(function () { layout(); wake(); }).observe(root);
  new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) wake(); }).observe(root);
  if (document.fonts && document.fonts.load) {
    document.fonts.load(FONT).then(function () { layout(); wake(); });
  }
})();

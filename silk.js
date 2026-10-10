/* Fondo animado "Silk" (21st.dev Shader Builder) con la paleta de PairX: negro → vinotinto → carmesí.
   WebGL1 puro, triángulo a pantalla completa, sin librerías. Se pausa con la pestaña oculta,
   queda quieto con "reducir movimiento" y baja resolución en pantallas táctiles. */
(function () {
  "use strict";
  var canvas = document.getElementById("silk-bg");
  if (!canvas) return;
  var gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "low-power", preserveDrawingBuffer: false });
  if (!gl) { canvas.remove(); return; }

  var VERT = "attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.0,1.0);}";
  var FRAG = [
    "#ifdef GL_FRAGMENT_PRECISION_HIGH",
    "precision highp float;",
    "#else",
    "precision mediump float;",
    "#endif",
    "uniform vec3 u_colors[8];",
    "uniform vec4 u_scene;",
    "uniform vec4 u_shape;",
    "uniform vec4 u_surface;",
    "uniform vec4 u_finish;",
    "uniform vec4 u_transform;",
    "uniform vec4 u_space;",
    "uniform vec4 u_cursor;",
    "#define u_resolution u_scene.xy",
    "#define u_time u_scene.z",
    "#define u_colorCount u_scene.w",
    "#define u_scale u_shape.x",
    "#define u_intensity u_shape.y",
    "#define u_paramA u_shape.z",
    "#define u_warp u_shape.w",
    "#define u_detail u_surface.x",
    "#define u_contrast u_surface.y",
    "#define u_brightness u_surface.z",
    "#define u_saturation u_surface.w",
    "#define u_hue u_finish.x",
    "#define u_vignette u_finish.y",
    "#define u_blur u_finish.z",
    "#define u_grain u_finish.w",
    "#ifdef GL_FRAGMENT_PRECISION_HIGH",
    "#define u_seed u_transform.x",
    "#else",
    "#define u_seed mod(u_transform.x, 31.0)",
    "#endif",
    "#define u_rotate u_transform.y",
    "#define u_drift u_transform.z",
    "#define u_oklab u_transform.w",
    "#define u_offset u_space.xy",
    "#define u_mouse u_space.zw",
    "#define u_cursorPresence u_cursor.x",
    "#define u_cursorEffect u_cursor.y",
    "#define u_cursorStrength u_cursor.z",
    "#define u_cursorRadius u_cursor.w",
    "float hash21(vec2 p) {",
    "#ifndef GL_FRAGMENT_PRECISION_HIGH",
    "  p = mod(p, 31.0);",
    "#endif",
    "  p = fract(p * vec2(234.34, 435.345));",
    "  p += dot(p, p + 34.23);",
    "  return fract(p.x * p.y);",
    "}",
    "float grainHash(vec2 p) {",
    "  vec3 p3 = fract(vec3(p.xyx) * 0.1031);",
    "  p3 += dot(p3, p3.yzx + 33.33);",
    "  return fract((p3.x + p3.y) * p3.z);",
    "}",
    "vec2 hash22(vec2 p) {",
    "#ifndef GL_FRAGMENT_PRECISION_HIGH",
    "  p = mod(p, 31.0);",
    "#endif",
    "  float n = sin(dot(p, vec2(41.0, 289.0)));",
    "  return fract(vec2(15731.743, 7892.321) * n);",
    "}",
    "float noise(vec2 p) {",
    "  vec2 i = floor(p);",
    "  vec2 f = fract(p);",
    "  vec2 u = f * f * (3.0 - 2.0 * f);",
    "  return mix(",
    "    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),",
    "    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),",
    "    u.y);",
    "}",
    "float fbm(vec2 p) {",
    "  float v = 0.0;",
    "  float a = 0.5;",
    "  for (int i = 0; i < 5; i++) {",
    "    v += a * noise(p);",
    "    p = p * 2.03 + vec2(17.0, 9.2);",
    "    a *= 0.5;",
    "  }",
    "  return v;",
    "}",
    "vec3 srgbToLinear(vec3 c) {",
    "  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)),",
    "    step(0.04045, c));",
    "}",
    "vec3 linearToSrgb(vec3 c) {",
    "  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,",
    "    step(0.0031308, c));",
    "}",
    "vec3 linToOklab(vec3 c) {",
    "  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;",
    "  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;",
    "  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;",
    "  l = pow(max(l, 0.0), 1.0 / 3.0);",
    "  m = pow(max(m, 0.0), 1.0 / 3.0);",
    "  s = pow(max(s, 0.0), 1.0 / 3.0);",
    "  return vec3(",
    "    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,",
    "    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,",
    "    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);",
    "}",
    "vec3 oklabToLin(vec3 c) {",
    "  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;",
    "  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;",
    "  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;",
    "  l = l * l * l; m = m * m * m; s = s * s * s;",
    "  return vec3(",
    "    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,",
    "    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,",
    "    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);",
    "}",
    "vec3 mixColour(vec3 a, vec3 b, float t) {",
    "  if (u_oklab > 0.5) {",
    "    vec3 la = linToOklab(srgbToLinear(a));",
    "    vec3 lb = linToOklab(srgbToLinear(b));",
    "    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);",
    "  }",
    "  return mix(a, b, t);",
    "}",
    "vec3 palette(float x) {",
    "  float n = max(u_colorCount - 1.0, 1.0);",
    "  float f = clamp(x, 0.0, 1.0) * n;",
    "  vec3 col = u_colors[0];",
    "  for (int i = 0; i < 7; i++) {",
    "    if (float(i) < n)",
    "      col = mixColour(col, u_colors[i + 1],",
    "        smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));",
    "  }",
    "  return col;",
    "}",
    "vec3 hueRotate(vec3 col, float a) {",
    "  const mat3 toYIQ = mat3(0.299, 0.596, 0.211,",
    "                          0.587, -0.274, -0.523,",
    "                          0.114, -0.322, 0.312);",
    "  const mat3 toRGB = mat3(1.0, 1.0, 1.0,",
    "                          0.956, -0.272, -1.106,",
    "                          0.621, -0.647, 1.703);",
    "  vec3 yiq = toYIQ * col;",
    "  float ca = cos(a), sa = sin(a);",
    "  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);",
    "  return toRGB * yiq;",
    "}",
    "vec3 shade(vec2 uv, vec2 p, float t) {",
    "  vec2 q = p * 1.6;",
    "  float amp = 0.25 + u_intensity * 0.85;",
    "  for (float i = 1.0; i < 5.0; i += 1.0) {",
    "    q.x += amp / i * cos(i * 2.4 * q.y + t * 0.8 + u_seed);",
    "    q.y += amp / i * cos(i * 1.7 * q.x + t * 0.6);",
    "  }",
    "  return palette(0.5 + 0.5 * sin(q.x + q.y));",
    "}",
    "void main() {",
    "  vec2 uv = gl_FragCoord.xy / u_resolution.xy;",
    "  vec2 screenUv = uv;",
    "  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)",
    "    / min(u_resolution.x, u_resolution.y);",
    "  float cursorMask = 0.0;",
    "  if (u_cursorPresence > 0.001) {",
    "    vec2 cursor = (0.5 * u_mouse * u_resolution.xy)",
    "      / min(u_resolution.x, u_resolution.y);",
    "    vec2 cursorDelta = p - cursor;",
    "    if (u_cursorEffect < 0.5) {",
    "      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;",
    "    } else {",
    "      float cursorDistance = length(cursorDelta);",
    "      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);",
    "      cursorMask = u_cursorPresence",
    "        * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));",
    "      if (u_cursorEffect < 1.5) {",
    "        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;",
    "      } else if (u_cursorEffect < 2.5) {",
    "        float cursorAngle = cursorMask * u_cursorStrength * 2.2;",
    "        float cc = cos(cursorAngle), cs = sin(cursorAngle);",
    "        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;",
    "      } else if (u_cursorEffect < 3.5) {",
    "        float ripple = sin(",
    "          cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);",
    "        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;",
    "      }",
    "    }",
    "  }",
    "  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;",
    "  p *= u_scale;",
    "  if (abs(u_rotate) > 0.0001) {",
    "    float cr = cos(u_rotate), sr = sin(u_rotate);",
    "    p = mat2(cr, -sr, sr, cr) * p;",
    "  }",
    "  p += u_offset;",
    "  if (u_drift > 0.0001)",
    "    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));",
    "  if (u_warp > 0.0) {",
    "    p += u_warp * (vec2(",
    "      fbm(p * u_detail + u_seed),",
    "      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);",
    "  }",
    "  vec3 col;",
    "  if (u_blur > 0.0) {",
    "    float e = u_blur;",
    "    float pe = e * u_scale;",
    "    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;",
    "    col  = shade(uv, p, u_time) * 0.36;",
    "    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;",
    "    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;",
    "    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;",
    "    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;",
    "  } else {",
    "    col = shade(uv, p, u_time);",
    "  }",
    "  if (abs(u_contrast - 1.0) > 0.0001)",
    "    col = (col - 0.5) * u_contrast + 0.5;",
    "  if (abs(u_saturation - 1.0) > 0.0001) {",
    "    float luma = dot(col, vec3(0.299, 0.587, 0.114));",
    "    col = mix(vec3(luma), col, u_saturation);",
    "  }",
    "  if (abs(u_hue) > 0.0001)",
    "    col = hueRotate(col, u_hue);",
    "  if (abs(u_brightness) > 0.0001)",
    "    col += u_brightness;",
    "  if (u_vignette > 0.0001) {",
    "    float vd = length(screenUv - 0.5) * 1.41421356;",
    "    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);",
    "  }",
    "  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)",
    "    col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;",
    "  if (u_grain > 0.0001)",
    "    col += (grainHash(",
    "      gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;",
    "  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);",
    "}"
  ].join("\n");

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn("silk:", gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  var vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) { canvas.remove(); return; }
  var prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.remove(); return; }
  gl.useProgram(prog);

  // Triángulo que cubre toda la pantalla
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var U = {};
  ["u_colors", "u_scene", "u_shape", "u_surface", "u_finish", "u_transform", "u_space", "u_cursor"].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });

  // Paleta PairX (bajo → alto): negro, vinotinto oscuro, vinotinto, carmesí
  var hex = ["#0C0A0A", "#160A0C", "#3E0A13", "#741021"];
  var cols = new Float32Array(24);
  hex.forEach(function (h, i) { for (var k = 0; k < 3; k++) cols[i * 3 + k] = parseInt(h.substr(1 + k * 2, 2), 16) / 255; });
  gl.uniform3fv(U.u_colors, cols);
  gl.uniform4f(U.u_shape, 1.26, 0.28, 0.50, 0.00);
  gl.uniform4f(U.u_surface, 2.40, 1.11, 0.00, 1.00);
  gl.uniform4f(U.u_finish, 0.00, 0.00, 0.000, 0.05);
  gl.uniform4f(U.u_transform, 1581.0, 0.00, 0.00, 0.0);
  gl.uniform4f(U.u_space, 0.00, 0.00, 0.0, 0.0);
  gl.uniform4f(U.u_cursor, 0.0, 2.0, 0.65, 0.46); // cursor apagado

  // Rendimiento: el patrón es una seda suave, así que se dibuja a baja resolución y el navegador la escala
  // (50 % en escritorio, 40 % en táctiles), a máximo 30 cuadros por segundo, y solo mientras se ve.
  var coarse = matchMedia("(pointer: coarse)").matches;
  // En celulares y equipos modestos la seda se dibuja una sola vez (imagen fija): misma estética, cero trabajo continuo.
  var softGL = (function () { try { var e = gl.getExtension("WEBGL_debug_renderer_info"); var r = e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : ""; return /swiftshader|llvmpipe|software|basic render/i.test(r); } catch (_) { return false; } })();
  var lowPower = softGL || coarse || (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || lowPower;
  var SCALE = coarse ? 0.5 : 0.5, STEP = 1000 / 30;
  var W = 0, H = 0;
  function resize() {
    var w = Math.max(1, Math.round(canvas.clientWidth * SCALE)), h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
    if (w !== W || h !== H) { W = canvas.width = w; H = canvas.height = h; gl.viewport(0, 0, W, H); }
  }

  var t0 = performance.now(), raf = 0, offset = 0, pausedAt = 0, last = -1e9, visible = true, onScreen = 0;
  function draw(now) {
    resize();
    gl.uniform4f(U.u_scene, W, H, (now - t0 - offset) / 1000 * 0.76, 4.0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  // Si en los primeros cuadros el equipo no da abasto (más de 45 ms por cuadro), la seda se queda fija.
  var probe = [], prevT = 0;
  function frame(now) {
    raf = 0;
    if (now - last >= STEP - 2) {
      var t1 = performance.now(); last = now; draw(now); gl.finish();
      if (probe.length < 20) { probe.push(performance.now() - t1 + (prevT && now - prevT > 120 ? 50 : 0)); prevT = now;
        if (probe.length === 20) { var avg = probe.reduce(function (a, b) { return a + b; }, 0) / 20; if (avg > 45) { reduce = true; return; } } }
    }
    if (!reduce && !scrolling && visible && onScreen > 0) raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf && !reduce && !scrolling && visible && onScreen > 0) raf = requestAnimationFrame(frame); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

  // Solo animar cuando alguna sección oscura (donde se ve el fondo) está en pantalla
  var darks = document.querySelectorAll("section.s-dark, footer.s-dark");
  // Revisa qué hay realmente en pantalla (3 puntos) cada 400 ms: más fiable que medir cajas, y casi gratis.
  function check() {
    var h = window.innerHeight, x = window.innerWidth / 2, any = 0;
    [0.15, 0.5, 0.85].forEach(function (f) {
      var el = document.elementFromPoint(x, h * f), sec = el && el.closest("section, footer");
      if (sec && sec.classList.contains("s-dark")) any = 1;
    });
    if (any !== onScreen) { onScreen = any; if (onScreen) start(); else stop(); }
  }
  onScreen = darks.length ? 1 : 0;
  setInterval(function () { if (visible) check(); }, 400);
  // Mientras se hace scroll, la animación se pausa para que el desplazamiento vaya fluido
  var scrolling = 0, scrollT = 0;
  window.addEventListener("scroll", function () {
    scrolling = 1; stop(); clearTimeout(scrollT);
    scrollT = setTimeout(function () { scrolling = 0; check(); start(); }, 180);
  }, { passive: true });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { visible = false; pausedAt = performance.now(); stop(); }
    else { visible = true; if (pausedAt) offset += performance.now() - pausedAt; pausedAt = 0; start(); }
  });
  window.addEventListener("resize", function () { if (reduce) draw(performance.now()); });
  canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); stop(); });
  canvas.addEventListener("webglcontextrestored", function () { location.reload(); });

  draw(performance.now());
  start();
  document.documentElement.classList.add("has-silk");
})();

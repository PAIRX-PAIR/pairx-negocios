// Genera las páginas legales de PairX (centro legal, privacidad, términos, cookies).
// uso: node legal/gen-legal.mjs   (desde la raíz del sitio)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const here = path.dirname(fileURLToPath(import.meta.url));
const UPDATED = "10 de octubre de 2026";
const WA = "573218596840";
const ID = `<ul class="idl">
  <li><b>Responsable:</b> PairX (nombre comercial), estudio de diseño y desarrollo de páginas web.</li>
  <li><b>País:</b> Colombia.</li>
  <li><b>Canal de atención:</b> WhatsApp <a href="https://wa.me/${WA}" target="_blank" rel="noopener">+57 321 859 6840</a>.</li>
  <li><b>Sitio web:</b> pairx-web.vercel.app</li>
</ul>`;

const PAGES = {
  index: {
    title: "Centro legal", kicker: "Legal · PairX",
    h1: "Todo lo legal, <em>en claro</em>.",
    lead: "Aquí están las reglas de juego de PairX: cómo cuidamos tus datos, cómo trabajamos contigo y qué derechos tienes. Escrito en palabras normales, sin letra pequeña escondida.",
    body: `
<div class="cards">
  <a class="lc" href="privacidad/"><span class="n">01</span><h2>Tratamiento de datos personales</h2><p>Qué datos usamos, para qué, por cuánto tiempo y cómo ejercer tus derechos (Ley 1581 de 2012).</p><span class="ar">→</span></a>
  <a class="lc" href="terminos/"><span class="n">02</span><h2>Términos y condiciones</h2><p>Cómo cotizamos, entregamos, cobramos y mantenemos tu página; garantías y derechos como consumidor.</p><span class="ar">→</span></a>
  <a class="lc" href="cookies/"><span class="n">03</span><h2>Cookies y servicios de terceros</h2><p>Qué guarda (y qué no) tu navegador cuando visitas este sitio.</p><span class="ar">→</span></a>
</div>
<section>
  <h2>Peticiones, quejas y reclamos (PQR)</h2>
  <p>Si tienes una pregunta, una queja o quieres ejercer tus derechos sobre tus datos, escríbenos por WhatsApp indicando: tu nombre, cómo contactarte, qué solicitas y, si aplica, los documentos que lo soporten. Te confirmamos que recibimos tu solicitud y te respondemos dentro de los plazos de ley.</p>
  <p><a class="btn" href="https://wa.me/${WA}?text=${encodeURIComponent("Hola PairX, quiero radicar una petición, queja o reclamo:")}" target="_blank" rel="noopener">Radicar una PQR por WhatsApp →</a></p>
  <p class="muted">Si consideras que no atendimos bien tu solicitud sobre datos personales o como consumidor, puedes acudir a la Superintendencia de Industria y Comercio (SIC), www.sic.gov.co.</p>
</section>
<section>
  <h2>Quién es el responsable</h2>
  ${ID}
</section>`
  },

  privacidad: {
    title: "Política de tratamiento de datos personales", kicker: "Legal · Datos personales",
    h1: "Política de tratamiento de <em>datos personales</em>.",
    lead: "En PairX tratamos tus datos con respeto y solo para lo que nos pediste. Esta política cumple la Ley 1581 de 2012, el Decreto 1074 de 2015 (que compila el Decreto 1377 de 2013) y el artículo 15 de la Constitución Política de Colombia.",
    body: `
<section><h2>1. Responsable del tratamiento</h2>${ID}</section>

<section><h2>2. Qué datos recogemos</h2>
<p>Solo los que tú nos das voluntariamente cuando nos escribes:</p>
<ul>
  <li><b>Datos de contacto:</b> nombre, número de WhatsApp o teléfono y, si lo compartes, correo electrónico.</li>
  <li><b>Datos de tu negocio:</b> nombre, tipo de negocio, barrio y ciudad, horarios, productos, precios, fotos, logos y textos que nos envíes para hacer tu página.</li>
  <li><b>Datos de la conversación:</b> lo que nos cuentes por WhatsApp sobre el proyecto, cotizaciones y acuerdos.</li>
</ul>
<p><b>Este sitio no guarda los datos que escribes en el formulario ni en el cotizador.</b> Al dar "Enviar", tu navegador abre WhatsApp con el mensaje listo; solo nos llega si tú decides enviarlo. No usamos formularios que almacenen información en nuestros servidores.</p>
<p>No recogemos datos sensibles (salud, orientación, creencias, biometría, etc.) ni los pedimos. Si por alguna razón nos los envías, no estás obligado a hacerlo y los eliminaremos si no son necesarios.</p>
</section>

<section><h2>3. Para qué los usamos (finalidades)</h2>
<ul>
  <li>Responder tus mensajes, preguntas y solicitudes de cotización.</li>
  <li>Preparar, enviar y hacer seguimiento a cotizaciones y propuestas.</li>
  <li>Diseñar, construir, publicar y mantener tu página web cuando nos contratas.</li>
  <li>Coordinar pagos, facturación y obligaciones contables y tributarias.</li>
  <li>Prestar soporte técnico y atender garantías, peticiones, quejas y reclamos.</li>
  <li>Avisarte de cambios importantes en el servicio que contrataste.</li>
  <li>Enviarte novedades u ofertas de PairX <b>solo si nos autorizas expresamente</b>; puedes pedir que paremos en cualquier momento.</li>
  <li>Mostrar tu página en nuestro portafolio <b>solo con tu autorización previa</b>.</li>
</ul>
<p>No vendemos, alquilamos ni cedemos tus datos a terceros para publicidad.</p>
</section>

<section><h2>4. Autorización</h2>
<p>Al escribirnos por WhatsApp o enviarnos tus datos por cualquier canal, nos autorizas de forma previa, expresa e informada a tratarlos según esta política (artículo 9 de la Ley 1581 de 2012). Conservamos prueba de esa autorización (por ejemplo, la conversación en la que nos contactaste). Puedes revocarla cuando quieras, salvo que exista un deber legal o contractual que nos obligue a conservar los datos.</p>
</section>

<section><h2>5. Tus derechos como titular</h2>
<p>Según el artículo 8 de la Ley 1581 de 2012, tienes derecho a:</p>
<ul>
  <li>Conocer, actualizar y rectificar tus datos.</li>
  <li>Pedir prueba de la autorización que nos diste.</li>
  <li>Ser informado sobre el uso que les hemos dado.</li>
  <li>Revocar la autorización y pedir que suprimamos tus datos, cuando no exista un deber legal o contractual de conservarlos.</li>
  <li>Acceder gratis a tus datos personales.</li>
  <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC), después de haber hecho tu consulta o reclamo ante nosotros.</li>
</ul>
</section>

<section><h2>6. Cómo ejercer tus derechos</h2>
<p>Escríbenos por WhatsApp al <a href="https://wa.me/${WA}" target="_blank" rel="noopener">+57 321 859 6840</a> con tu nombre, un medio de contacto, la descripción de lo que pides y, si aplica, los documentos que lo soporten.</p>
<ul>
  <li><b>Consultas</b> (saber qué datos tenemos y cómo los usamos): respondemos en máximo <b>10 días hábiles</b> desde que la recibimos. Si no alcanzamos, te avisamos el motivo y respondemos dentro de los <b>5 días hábiles</b> siguientes.</li>
  <li><b>Reclamos</b> (corregir, actualizar, suprimir o revocar): respondemos en máximo <b>15 días hábiles</b>. Si no alcanzamos, te avisamos y respondemos dentro de los <b>8 días hábiles</b> siguientes. Si al reclamo le falta información, te la pedimos en los 5 días siguientes; si no la recibimos en 2 meses, entenderemos que desististe.</li>
</ul>
</section>

<section><h2>7. Con quién compartimos datos</h2>
<p>Para prestar el servicio usamos proveedores que pueden tratar datos por cuenta nuestra o recibirlos de forma técnica, algunos fuera de Colombia:</p>
<ul>
  <li><b>WhatsApp (Meta Platforms):</b> canal por el que conversamos contigo.</li>
  <li><b>Vercel:</b> alojamiento de este sitio y, cuando aplica, de las páginas que hacemos.</li>
  <li><b>Google Fonts:</b> tipografías del sitio; tu navegador se conecta a Google para descargarlas.</li>
  <li><b>Proveedores de dominio, correo o pagos</b> que tú elijas o que sean necesarios para tu proyecto.</li>
</ul>
<p>Estas transferencias y transmisiones se hacen para cumplir las finalidades de esta política, con proveedores que ofrecen medidas de seguridad adecuadas, de acuerdo con los artículos 26 de la Ley 1581 de 2012 y las normas que la reglamentan. También entregaremos datos a autoridades cuando una ley o una orden judicial lo exija.</p>
</section>

<section><h2>8. Datos de los clientes de tu página</h2>
<p>Cuando hacemos y mantenemos la página de tu negocio, los datos de <b>tus</b> clientes (por ejemplo, pedidos o mensajes que te lleguen) son tuyos: tú eres el responsable de su tratamiento y PairX actúa como <b>encargado</b>, siguiendo tus instrucciones y solo para operar la página. Te recomendamos tener tu propia política de datos; si la necesitas, podemos ayudarte a publicarla en tu página.</p>
</section>

<section><h2>9. Cuánto tiempo los guardamos</h2>
<p>Conservamos tus datos mientras haya una relación contigo (conversación, cotización o servicio activo) y después, durante el tiempo que exijan las normas contables, tributarias o de garantía. Cuando ya no los necesitemos, los eliminamos o anonimizamos.</p>
</section>

<section><h2>10. Seguridad</h2>
<p>Aplicamos medidas razonables para proteger tus datos: acceso restringido, contraseñas seguras, conexiones cifradas (https) y proveedores reconocidos. Ningún sistema es 100 % infalible; si ocurriera un incidente que afecte tus datos, te informaremos y lo reportaremos a la SIC cuando la ley lo exija.</p>
</section>

<section><h2>11. Menores de edad</h2>
<p>Nuestros servicios están dirigidos a negocios y personas mayores de edad. No recogemos a sabiendas datos de niños, niñas o adolescentes. Si eres padre, madre o representante y crees que un menor nos dio datos, escríbenos y los eliminamos.</p>
</section>

<section><h2>12. Cambios a esta política</h2>
<p>Si cambiamos esta política de forma importante, lo publicaremos en esta página con la nueva fecha y, si tenemos una relación activa contigo, te avisaremos por WhatsApp.</p>
</section>`
  },

  terminos: {
    title: "Términos y condiciones", kicker: "Legal · Términos",
    h1: "Términos y <em>condiciones</em>.",
    lead: "Estas son las reglas para usar este sitio y para contratar una página web con PairX. Al usar el sitio o aceptar una cotización, aceptas estos términos. Si algo no está claro, pregúntanos antes de contratar.",
    body: `
<section><h2>1. Quiénes somos</h2>${ID}</section>

<section><h2>2. Uso de este sitio</h2>
<ul>
  <li>El contenido de este sitio es informativo. Los negocios, nombres, reseñas, precios y datos que aparecen en el portafolio y en los ejemplos son <b>ficticios</b>: muestran cómo podría verse una página, no clientes reales.</li>
  <li>Puedes navegar y compartir el sitio libremente. No está permitido copiar los diseños, textos o código para revenderlos o hacerlos pasar como propios.</li>
  <li>No debes usar el sitio para actividades ilegales, para intentar vulnerar su seguridad o para enviar mensajes engañosos o abusivos.</li>
</ul>
</section>

<section><h2>3. Cotizaciones y precios</h2>
<ul>
  <li>No manejamos precios fijos: <b>cada página se cotiza según lo que necesites</b>. Los planes (Vitrina, Local, Tienda y A medida) y las "tallas" del sitio son guías para orientarte, no ofertas con precio.</li>
  <li>El cotizador y el test "¿Cuál es tu talla?" no generan una obligación de compra ni un precio definitivo; solo preparan un mensaje para que hablemos.</li>
  <li>El precio, lo que incluye, los plazos y la forma de pago quedan en una <b>cotización escrita</b> (por WhatsApp o documento) que te enviamos. La cotización indica su vigencia y solo te obliga cuando la aceptas expresamente.</li>
  <li>Los precios se expresan en pesos colombianos (COP) e indican si incluyen impuestos.</li>
</ul>
</section>

<section><h2>4. Cómo trabajamos</h2>
<ol>
  <li><b>Charla:</b> nos cuentas de tu negocio y lo que necesitas.</li>
  <li><b>Cotización:</b> te enviamos la propuesta escrita con precio, alcance y tiempos.</li>
  <li><b>Diseño:</b> armamos tu página con tus fotos, colores y textos; la ves completa antes de publicarla.</li>
  <li><b>Ajustes:</b> hacemos las rondas de cambios incluidas en tu cotización. Cambios fuera del alcance acordado se cotizan aparte.</li>
  <li><b>Publicación:</b> la subimos a internet y te enseñamos a usarla.</li>
</ol>
<p>Los tiempos de entrega dependen de que nos envíes a tiempo la información, fotos y aprobaciones. Si se demoran, la fecha de entrega se corre en el mismo tiempo.</p>
</section>

<section><h2>5. Tus responsabilidades</h2>
<ul>
  <li>Enviar información veraz y tener los derechos sobre las fotos, logos, textos y marcas que nos pides publicar.</li>
  <li>Revisar y aprobar la página antes de publicarla.</li>
  <li>Cumplir las normas que apliquen a tu negocio (por ejemplo, información de precios, condiciones de venta, garantías y tu propia política de datos si recibes datos de clientes).</li>
</ul>
<p>Si el material que nos entregas infringe derechos de terceros, la responsabilidad es tuya y podremos retirarlo de la página.</p>
</section>

<section><h2>6. Pagos</h2>
<ul>
  <li>La forma de pago (de contado, por partes o en cuotas) y las fechas quedan en la cotización.</li>
  <li>El mantenimiento mensual, si lo contratas, se paga mes a mes según lo acordado.</li>
  <li>Si un pago no se hace a tiempo, podemos pausar el trabajo o, en el caso del mantenimiento, suspender el servicio después de avisarte, hasta que se ponga al día.</li>
</ul>
</section>

<section><h2>7. Dominio, hosting y mantenimiento</h2>
<ul>
  <li><b>El dominio propio es opcional.</b> Si lo quieres (por ejemplo, tunegocio.co), te ayudamos a registrarlo; se registra <b>a tu nombre</b> siempre que sea posible y su renovación anual depende del proveedor.</li>
  <li>Si no tienes dominio propio, tu página se publica en una dirección gratuita que te damos nosotros.</li>
  <li>El mantenimiento incluye lo que diga tu cotización (por ejemplo, hosting, copias de seguridad, actualizaciones de seguridad, cambios pequeños y soporte por WhatsApp).</li>
  <li>Dependemos de proveedores externos (hosting, dominios, WhatsApp). Hacemos lo razonable para que tu página esté siempre en línea, pero no podemos garantizar disponibilidad del 100 % ni responder por fallas de esos proveedores.</li>
</ul>
</section>

<section><h2>8. Propiedad intelectual</h2>
<ul>
  <li>Tus contenidos (fotos, logo, textos, marca) siguen siendo tuyos.</li>
  <li>Una vez pagada la totalidad del proyecto, puedes usar el diseño de tu página para tu negocio sin límite de tiempo. Las condiciones sobre entrega del código fuente se acuerdan en la cotización.</li>
  <li>PairX conserva los derechos sobre sus herramientas, plantillas, componentes y conocimientos generales, que puede seguir usando en otros proyectos.</li>
  <li>Solo mostraremos tu página en nuestro portafolio si nos autorizas.</li>
</ul>
</section>

<section><h2>9. Garantía</h2>
<p>De acuerdo con el Estatuto del Consumidor (Ley 1480 de 2011), respondemos por la calidad e idoneidad del servicio: si la página entregada no funciona como se acordó en la cotización, la corregimos sin costo. La garantía no cubre cambios que hagan terceros o tú mismo en la página, fallas de proveedores externos ni funciones que no estaban en lo acordado.</p>
</section>

<section><h2>10. Derecho de retracto y reversión del pago</h2>
<ul>
  <li>Cuando la contratación se hace a distancia, tienes el <b>derecho de retracto</b> dentro de los <b>5 días hábiles</b> siguientes a la aceptación de la cotización (artículo 47 de la Ley 1480 de 2011). Te devolvemos lo pagado en un máximo de 30 días calendario.</li>
  <li>Según la misma ley, el retracto no aplica a servicios cuya prestación ya comenzó con tu acuerdo, ni a productos o servicios hechos según tus especificaciones o claramente personalizados. Por eso, antes de empezar el diseño te confirmaremos que inicia el trabajo.</li>
  <li>Si pagaste con tarjeta u otro medio electrónico, puedes solicitar la <b>reversión del pago</b> en los casos del artículo 51 de la Ley 1480 de 2011 (por ejemplo, fraude u operación no solicitada).</li>
</ul>
</section>

<section><h2>11. Terminación</h2>
<p>Puedes cancelar el mantenimiento cuando quieras avisándonos con anticipación; no se reembolsan los meses ya prestados. Si terminas el proyecto antes de entregarlo, se paga el trabajo hecho hasta ese momento según la cotización. Si cancelas el mantenimiento, te ayudamos a trasladar tu página y tu dominio a otro proveedor.</p>
</section>

<section><h2>12. Limitación de responsabilidad</h2>
<p>Nos esforzamos para que tu página ayude a tu negocio, pero no garantizamos resultados comerciales específicos (ventas, clientes) ni una posición determinada en Google u otros buscadores. Nuestra responsabilidad se limita, en lo que permita la ley, al valor pagado por el servicio afectado. Nada en estos términos limita tus derechos como consumidor.</p>
</section>

<section><h2>13. Comunicaciones</h2>
<p>Aceptas que nos comuniquemos contigo por WhatsApp y otros medios electrónicos. Las conversaciones, cotizaciones y aceptaciones por estos medios tienen validez como mensajes de datos (Ley 527 de 1999).</p>
</section>

<section><h2>14. Ley aplicable y PQR</h2>
<p>Estos términos se rigen por las leyes de Colombia. Si tienes una petición, queja o reclamo, escríbenos primero por WhatsApp y buscamos una solución directa. También puedes acudir a la Superintendencia de Industria y Comercio (www.sic.gov.co).</p>
</section>

<section><h2>15. Cambios a estos términos</h2>
<p>Podemos actualizar estos términos; la versión vigente es la publicada aquí con su fecha. Los cambios no afectan cotizaciones ya aceptadas, que se rigen por lo pactado.</p>
</section>`
  },

  cookies: {
    title: "Política de cookies", kicker: "Legal · Cookies",
    h1: "Cookies y <em>servicios de terceros</em>.",
    lead: "Corto y claro: este sitio no usa cookies propias de seguimiento, ni publicidad, ni herramientas de analítica. Aquí te contamos qué pasa técnicamente cuando lo visitas.",
    body: `
<section><h2>1. ¿Qué son las cookies?</h2>
<p>Son pequeños archivos que un sitio guarda en tu navegador para recordar cosas (por ejemplo, una sesión) o para medir visitas y mostrar publicidad.</p>
</section>

<section><h2>2. Lo que usa este sitio</h2>
<ul>
  <li><b>Cookies propias:</b> ninguna.</li>
  <li><b>Analítica o publicidad</b> (Google Analytics, Meta Pixel u otros): ninguna.</li>
  <li><b>Almacenamiento local:</b> no guardamos lo que escribes en el formulario, el cotizador ni el test de talla.</li>
</ul>
</section>

<section><h2>3. Servicios de terceros</h2>
<ul>
  <li><b>Google Fonts:</b> para mostrar las tipografías, tu navegador descarga archivos desde servidores de Google, que recibe datos técnicos como tu dirección IP. Más información en la política de privacidad de Google.</li>
  <li><b>Vercel (alojamiento):</b> como cualquier servidor, registra datos técnicos de la visita (IP, navegador, fecha) para entregar la página y protegerla de abusos.</li>
  <li><b>WhatsApp:</b> solo si haces clic en un botón de WhatsApp, se abre ese servicio, que aplica sus propias políticas.</li>
  <li><b>Páginas de ejemplo del portafolio:</b> usan los mismos servicios anteriores.</li>
</ul>
</section>

<section><h2>4. Cómo controlarlas</h2>
<p>Puedes bloquear o borrar cookies y datos de sitios desde la configuración de tu navegador. Como este sitio no depende de cookies, seguirá funcionando igual.</p>
</section>

<section><h2>5. Cambios</h2>
<p>Si algún día agregamos analítica u otras cookies, actualizaremos esta página y, cuando la ley lo exija, te pediremos tu consentimiento antes de activarlas.</p>
</section>`
  }
};

const CSS = `:root{--night:#0c0a0a;--night-2:#151312;--night-line:#36302c;--cream:#f2ece5;--cream-muted:#b0a69c;--paper:#f6f3ed;--surface:#fffdf9;--line:#ddd6ca;--ink:#1d1916;--ink-muted:#5e554e;--crimson:#B0122C;--crimson-fresh:#E0263F;--sans:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;--mono:"IBM Plex Mono",ui-monospace,Menlo,monospace;--serif:"IBM Plex Serif",Georgia,serif}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--paper);color:var(--ink);font:400 1.02rem/1.7 var(--sans);-webkit-font-smoothing:antialiased}
a{color:var(--crimson)}
:focus-visible{outline:2px solid var(--crimson);outline-offset:3px;border-radius:4px}
.wrap{width:min(880px,100%);margin-inline:auto;padding-inline:clamp(16px,4vw,40px)}
.top{position:sticky;top:0;z-index:5;background:rgba(12,10,10,.92);backdrop-filter:blur(10px);color:var(--cream);border-bottom:1px solid var(--night-line)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:64px}
.brand{display:inline-flex;align-items:center;gap:10px;color:var(--cream);text-decoration:none;font-weight:700;letter-spacing:-.02em;font-size:1.1rem}
.brand i{width:22px;height:22px;border-radius:5px;background:var(--crimson);box-shadow:inset 0 0 0 4px var(--night),inset 0 0 0 5px var(--crimson)}
.top nav{display:flex;gap:18px;flex-wrap:wrap;font-size:.9rem}
.top nav a{color:var(--cream-muted);text-decoration:none}
.top nav a[aria-current="page"],.top nav a:hover{color:var(--cream)}
.hero{background:var(--night);color:var(--cream);padding:clamp(48px,8vw,96px) 0 clamp(40px,6vw,72px)}
.kick{font:500 .74rem/1 var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--cream-muted)}
h1{margin:16px 0 0;font:700 clamp(2.2rem,1.4rem + 4vw,4rem)/1 var(--sans);letter-spacing:-.04em}
h1 em{font-family:var(--serif);font-style:italic;font-weight:500;color:var(--crimson-fresh)}
.lead{margin:20px 0 0;max-width:62ch;color:var(--cream-muted);font-size:1.08rem}
.upd{margin-top:22px;font:500 .78rem/1 var(--mono);letter-spacing:.06em;color:var(--cream-muted)}
main{padding:clamp(36px,6vw,72px) 0 80px}
section{padding:26px 0;border-top:1px solid var(--line)}
section:first-child{border-top:0;padding-top:0}
h2{margin:0 0 12px;font:600 1.3rem/1.25 var(--sans);letter-spacing:-.02em}
p{margin:0 0 12px}
ul,ol{margin:0 0 12px;padding-left:1.2em}
li{margin:6px 0}
li::marker{color:var(--crimson)}
.idl{list-style:none;padding:16px 18px;border-radius:10px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
.muted{color:var(--ink-muted);font-size:.95rem}
.btn{display:inline-flex;align-items:center;min-height:48px;padding:0 20px;border-radius:999px;background:var(--crimson);color:#fff;font-weight:600;text-decoration:none}
.btn:hover{background:#94101f}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:28px}
.lc{position:relative;display:block;padding:22px 20px 46px;border-radius:12px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);color:var(--ink);text-decoration:none;transition:box-shadow .2s ease,transform .2s ease}
.lc:hover{box-shadow:inset 0 0 0 1.5px var(--crimson);transform:translateY(-2px)}
.lc .n{font:500 .74rem/1 var(--mono);color:var(--crimson)}
.lc h2{margin:10px 0 8px;font-size:1.12rem}
.lc p{color:var(--ink-muted);font-size:.93rem;line-height:1.5;margin:0}
.lc .ar{position:absolute;right:18px;bottom:16px;color:var(--crimson);font-weight:600}
.foot{background:var(--night);color:var(--cream-muted);font-size:.85rem;padding:28px 0}
.foot .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px}
.foot a{color:var(--cream)}
@media (max-width:600px){.top .wrap{flex-wrap:wrap;gap:6px 16px;padding-block:10px}.top nav{width:100%;gap:6px 16px;font-size:.84rem}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.lc{transition:none}}`;

const NAV = [["index", "Centro legal"], ["privacidad", "Datos personales"], ["terminos", "Términos"], ["cookies", "Cookies"]];
fs.writeFileSync(path.join(here, "legal.css"), CSS + "\n");
for (const [key, p] of Object.entries(PAGES)) {
  const depth = key === "index" ? "" : "../";
  const link = (k) => (k === "index" ? depth || "./" : (key === "index" ? "" : "../") + k + "/");
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${p.title} — PairX</title>
<meta name="description" content="${p.lead.replace(/<[^>]+>/g, "").replace(/"/g, "&quot;").slice(0, 155)}">
<meta name="theme-color" content="#0c0a0a">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230c0a0a'/%3E%3Crect x='4' y='4' width='24' height='24' rx='4' fill='%23B0122C'/%3E%3Ctext x='16' y='22.5' font-family='Arial,sans-serif' font-weight='700' font-size='17' text-anchor='middle' fill='%23fffdf9'%3EP%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@400;600;700&family=IBM+Plex+Serif:ital,wght@1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${depth}legal.css">
</head>
<body>
<header class="top"><div class="wrap"><a class="brand" href="${depth}../"><i aria-hidden="true"></i>PairX</a><nav aria-label="Legal">${NAV.map(([k, l]) => `<a href="${link(k)}"${k === key ? ' aria-current="page"' : ""}>${l}</a>`).join("")}</nav></div></header>
<div class="hero"><div class="wrap"><p class="kick">${p.kicker}</p><h1>${p.h1}</h1><p class="lead">${p.lead}</p><p class="upd">Última actualización: ${UPDATED}</p></div></div>
<main><div class="wrap">${p.body}
</div></main>
<footer class="foot"><div class="wrap"><span>© 2026 PairX · Páginas web para negocios y emprendedores</span><a href="${depth}../">Volver al sitio →</a></div></footer>
</body>
</html>
`;
  const dir = key === "index" ? here : path.join(here, key);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log("escrito", key);
}

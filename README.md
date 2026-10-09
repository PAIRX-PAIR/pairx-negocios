# PairX · Negocios locales

Landing de PairX para vender páginas web a negocios de barrio: planes, cotizador y contacto por WhatsApp.

- Un solo archivo: `index.html` (HTML + CSS + JS, sin build).
- Base visual: sistema de diseño PairX (Claude Design) con la paleta de marca negro + carmesí.
- Sitio principal: https://pairx-web.vercel.app

## Antes de publicar

Edita el bloque `CONFIG` al inicio del `<script>` en `index.html`:

- `whatsapp`: número con código de país, solo dígitos.
- `plans` y `addons`: los precios actuales son **de referencia** (COP) y se muestran como "por confirmar".

## Ver en local

```bash
npx --yes http-server@14.1.1 . -p 5180 -c-1
```

# Devanada — Portafolio de festival de cómic

Sitio estático (HTML + CSS + JS, sin frameworks ni librerías externas),
listo para publicarse en GitHub Pages.

## Estructura

```
/
├── index.html                  → página principal
├── styles.css                  → ÚNICA hoja de estilos (compartida por todo el sitio)
├── script.js                   → ÚNICO script (compartido por todo el sitio)
├── .nojekyll                   → evita que GitHub Pages procese el sitio con Jekyll
│
├── galeria-stickers/
│   └── index.html               → galería de pegatinas
│
├── galeria-fanzines/
│   └── index.html               → galería de fanzines
│
└── otras-actividades/
    └── index.html               → caricaturas, tablón colaborativo, etc.
```

`styles.css` y `script.js` viven solo en la raíz. Todas las páginas los
enlazan por ruta relativa (`styles.css` desde la raíz, `../styles.css`
desde cada subcarpeta), así que **nunca hace falta copiarlos ni
mantener varias versiones**.

## Dónde colocar las imágenes y el vídeo

Cada archivo multimedia va en la **misma carpeta que el `index.html`
que lo usa**:

| Carpeta | Archivos que debes añadir |
|---|---|
| `/` (raíz) | `DEVANADA.webp`, `sticker_aglutinado.webp`, `sticker_expandido.webp`, `fanzine_aglutinado.webp`, `fanzine_expandido.webp`, `pizarra.webp` |
| `/galeria-stickers/` | `sticker01.webp`, `sticker02.webp`, … (uno por pegatina) |
| `/galeria-fanzines/` | `sonic.mp4` + `fanzine01.webp` … `fanzine20.webp` |
| `/otras-actividades/` | `caricatura01.webp` … `caricatura05.webp`, `tablon.webp` |

## Cómo añadir o quitar imágenes

No toques el HTML. Abre `script.js` y edita el array correspondiente:

```js
const STICKERS = [
  'sticker01.webp',
  'sticker02.webp',
  // añade o borra líneas aquí
];
```

Lo mismo aplica a `FANZINE_PAGES` (el distintivo "n/total" se
recalcula solo según el número de elementos del array) y a
`CARICATURAS`.

## Cómo funciona el "hover" de Pegatinas y Fanzines en el index

Es **CSS puro** (dos `<img>` superpuestas con una transición de
opacidad), sin JavaScript: más robusto y con mejor rendimiento.

## Publicar en GitHub Pages

1. Sube todo el contenido de esta carpeta a la raíz de tu repositorio
   (o a la rama/carpeta que uses para Pages).
2. En **Settings → Pages**, selecciona la rama y la carpeta raíz (`/`).
3. Guarda los cambios; la URL pública tardará uno o dos minutos en
   activarse.

No se requiere ningún paso de compilación (build): es HTML/CSS/JS
servido tal cual.

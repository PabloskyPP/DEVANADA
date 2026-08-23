'use strict';

/* ============================================================
   DEVANADA — script.js
   Script ÚNICO y compartido por todas las páginas del sitio.
   Enlázalo siempre con ruta relativa ("script.js" desde la
   raíz, "../script.js" desde las subcarpetas).

   Cada función "init..." comprueba primero si los elementos
   que necesita existen en la página actual (document.getElementById).
   Si no existen, la función termina de inmediato sin hacer nada.
   Gracias a esto, este mismo archivo puede incluirse en
   index.html y en las cuatro subpáginas sin generar errores ni
   código duplicado.
   ============================================================ */


/* ------------------------------------------------------------
   1. ARRAYS DE IMÁGENES — EDITA AQUÍ PARA AÑADIR/QUITAR ARCHIVOS
   ------------------------------------------------------------
   Solo hace falta escribir el nombre del archivo .webp: cada
   imagen debe colocarse físicamente en la misma carpeta que el
   index.html que la muestra (no hace falta indicar la ruta de
   carpeta, el navegador ya está en esa carpeta).
   ------------------------------------------------------------ */

// galeria-stickers/  → una entrada por cada pegatina individual
const STICKERS = [
  'sticker000.jpg',
  'sticker00.png',
  'sticker01.png',
  'sticker02.png',
  'sticker03.png',
  'sticker04.png',
  'sticker05.png',
  'sticker06.png',
  'sticker07.png',
  'sticker08.png',
  'sticker09.png',
  'sticker10.png',
  'sticker11.png',
  'sticker12.png',
  'sticker13.png',
  'sticker14.png',
  'sticker15.png',
  'sticker16.png',
  'sticker17.png',
  'sticker18.png',
  'sticker19.png',
  'sticker20.png',
  'sticker21.png',
  'sticker22.png',
  'sticker23.png',
  'sticker24.png',
  'sticker25.png',
  'sticker26.png',
  'sticker27.png',
  'sticker28.png',
  'sticker29.png',
  'sticker30.png',
  'sticker31.png',
  'sticker32.png',
  'sticker33.jpg',
  'sticker34.jpg',
  'sticker35.jpg',
  'sticker36.jpg',
  'sticker37.jpg',
  'sticker38.jpg',
  'sticker39.jpg',
  'sticker40.jpg',
  'sticker41.jpg',
  // Añade aquí más pegatinas, p. ej.: 'sticker09.webp',
];

// galeria-fanzines/  → páginas interiores del fanzine, EN ORDEN
const FANZINE_PAGES = [
  'fanzine01.png', 'fanzine02.png', 'fanzine03.png', 'fanzine04.png',
  'fanzine05.jpg', 'fanzine06.jpg', 'fanzine07.png', 'fanzine08.jpg',
  'fanzine09.png', 'fanzine10.png', 'fanzine11.png', 'fanzine12.png',
  'fanzine13.png', 'fanzine14.jpg', 'fanzine15.png', 'fanzine16.png',
  'fanzine17.png', 'fanzine18.png', 'fanzine19.png', 'fanzine20.png',
  'fanzine21.png', 'fanzine22.jpg', 'fanzine23.jpg', 'fanzine24.png',
  'fanzine25.jpg',
  // Si el fanzine tiene más o menos páginas, añade/quita líneas aquí.
  // La numeración "n/total" del badge se recalcula sola.
];

// galeria-prints/  → se muestran en orden y disposición vertical los prints
const PRINTS = [
  'print1.jpg',
  'print2.jpg',
  'print3.jpg',
  'print4.jpg',
];

// otras-actividades/  → caricaturas digitales, se muestran en fila
const CARICATURAS = [
  'caricatura01.png',
  'caricatura02.png',
  'caricatura03.png',
  'caricatura04.png',
  'caricatura05.png',
  'caricatura06.png',
  'caricatura07.png',
];


/* ------------------------------------------------------------
   2. UTILIDADES DE CREACIÓN DE ELEMENTOS
   ------------------------------------------------------------ */

/**
 * Crea un <img> con los atributos comunes del sitio
 * (carga diferida obligatoria en todas las imágenes).
 * @param {string} src   - nombre de archivo (ruta relativa a la página actual)
 * @param {string} alt   - texto alternativo descriptivo
 * @returns {HTMLImageElement}
 */
function createLazyImage(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  return img;
}


/* ------------------------------------------------------------
   3. GALERÍA DE PEGATINAS
   Se activa solo si existe #stickers-grid en la página
   (galeria-stickers/index.html).
   ------------------------------------------------------------ */
function initStickersGallery() {
  const grid = document.getElementById('stickers-grid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  STICKERS.forEach((file, index) => {
    const img = createLazyImage(file, `Pegatina ${index + 1} de Devanada`);

    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openFanzineModal(img));

    fragment.appendChild(img);
  });

  grid.appendChild(fragment);
}


/* ------------------------------------------------------------
   4. GALERÍA DE FANZINES
   Se activa solo si existe #fanzine-grid en la página
   (galeria-fanzines/index.html). Cada imagen lleva encima un
   distintivo "n/total" generado automáticamente.
   ------------------------------------------------------------ */
function initFanzinesGallery() {
  const grid = document.getElementById('fanzine-grid');
  if (!grid) return;

  const total = FANZINE_PAGES.length;
  const fragment = document.createDocumentFragment();

  FANZINE_PAGES.forEach((file, index) => {
    const pageNumber = index + 1;

    const figure = document.createElement('figure');
    figure.className = 'fanzine-page';

    const img = createLazyImage(file, `Página ${pageNumber} de ${total} del fanzine`);

    const badge = document.createElement('span');
    badge.className = 'fanzine-page__badge';
    badge.textContent = `${pageNumber}/${total}`;

    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openFanzineModal(img));

    figure.appendChild(img);
    figure.appendChild(badge);
    fragment.appendChild(figure);
  });

  grid.appendChild(fragment);
}


/**
 * Abre un modal expandido al clicar en una página del fanzine
 * @param {HTMLImageElement} img - la imagen clickeada
 */
function openFanzineModal(img) {
  const modal = document.createElement('div');
  modal.className = 'fanzine-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
  `;

  const expandedImg = document.createElement('img');
  expandedImg.src = img.src;
  expandedImg.alt = img.alt;
  expandedImg.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  `;

  modal.appendChild(expandedImg);
  document.body.appendChild(modal);

  modal.addEventListener('click', () => {
    modal.remove();
  });

  expandedImg.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}


/* ------------------------------------------------------------
   5. GALERÍA DE PRINTS
   Se activa solo si existe #prints-grid en la página
   (galeria-prints/index.html). Cada imagen lleva encima un
   distintivo "n/total" generado automáticamente.
   ------------------------------------------------------------ */
function initPrintsGallery() {
  const grid = document.getElementById('prints-grid');
  if (!grid) return;

  const total = PRINTS.length;
  const fragment = document.createDocumentFragment();

  PRINTS.forEach((file, index) => {
    const pageNumber = index + 1;

    const figure = document.createElement('figure');
    figure.className = 'print-page';

    const img = createLazyImage(file, `Print ${pageNumber} de ${total} del Devanada`);

    const badge = document.createElement('span');
    badge.className = 'print__badge';
    badge.textContent = `${pageNumber}/${total}`;

    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openPrintModal(img));

    figure.appendChild(img);
    figure.appendChild(badge);
    fragment.appendChild(figure);
  });

  grid.appendChild(fragment);
}


/**
 * Abre un modal expandido al clicar en una página del fanzine
 * @param {HTMLImageElement} img - la imagen clickeada
 */
function openPrintModal(img) {
  const modal = document.createElement('div');
  modal.className = 'print-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
  `;

  const expandedImg = document.createElement('img');
  expandedImg.src = img.src;
  expandedImg.alt = img.alt;
  expandedImg.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  `;

  modal.appendChild(expandedImg);
  document.body.appendChild(modal);

  modal.addEventListener('click', () => {
    modal.remove();
  });

  expandedImg.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

/* ------------------------------------------------------------
   6. CARICATURAS DIGITALES (otras-actividades)
   Se activa solo si existe #caricaturas-row en la página
   (otras-actividades/index.html).
   ------------------------------------------------------------ */
function initCaricaturasRow() {
  const row = document.getElementById('caricaturas-row');
  if (!row) return;

  const fragment = document.createDocumentFragment();

  CARICATURAS.forEach((file, index) => {
    const img = createLazyImage(file, `Caricatura digital ${index + 1}`);
    fragment.appendChild(img);
  });

  row.appendChild(fragment);
}


/* ------------------------------------------------------------
   7. INICIALIZACIÓN GENERAL
   Se ejecuta en TODAS las páginas. Cada función decide por sí
   misma si tiene trabajo que hacer.
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  initStickersGallery();
  initFanzinesGallery();
  initPrintsGallery();
  initCaricaturasRow();
});

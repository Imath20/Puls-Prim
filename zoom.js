// Configurație globală
let currentScale = 1; // Nivelul curent de zoom
let currentX = 0, currentY = 0; // Poziția curentă pentru translație
const zoomStep = 0.1; // Pas pentru zoom
const minZoom = 0.1; // Zoom minim
const maxZoom = 3; // Zoom maxim

// Selectarea elementului SVG și butoanelor
const svg = document.querySelector("svg");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");

// Funcție pentru aplicarea transformării (zoom + translație)
function applyTransform() {
  svg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
}

// Funcție pentru zoom in
function zoomIn() {
  if (currentScale < maxZoom) {
    currentScale = Math.min(currentScale + zoomStep, maxZoom);
    applyTransform();
  }
}

// Funcție pentru zoom out
function zoomOut() {
  if (currentScale > minZoom) {
    currentScale = Math.max(currentScale - zoomStep, minZoom);
    applyTransform();
  }
}

// Gestionare zoom cu rotița mouse-ului
svg.addEventListener("wheel", function (event) {
  event.preventDefault(); // Previne scroll-ul paginii
  const zoomDirection = event.deltaY > 0 ? -1 : 1;
  const zoomAmount = zoomDirection * zoomStep;

  // Actualizează nivelul de zoom
  const newScale = Math.min(maxZoom, Math.max(minZoom, currentScale + zoomAmount));
  if (newScale !== currentScale) {
    currentScale = newScale;
    applyTransform();
  }
}, { passive: false });

// Evenimente pentru butoane
zoomInButton.addEventListener("click", zoomIn);
zoomOutButton.addEventListener("click", zoomOut);

// Funcție pentru translație (dragging)
let isDragging = false;
let startX, startY;

svg.addEventListener("mousedown", function (event) {
  event.preventDefault(); // Previne comportamentul implicit
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
});

svg.addEventListener("mousemove", function (event) {
  if (isDragging) {
    event.preventDefault(); // Previne comportamentul implicit

    // Calculăm distanța deplasată
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    currentX += dx;
    currentY += dy;

    applyTransform();

    // Actualizează pozițiile de start pentru următorul frame
    startX = event.clientX;
    startY = event.clientY;
  }
});

svg.addEventListener("mouseup", function () {
  isDragging = false; // Încheiem operația de dragging
});

svg.addEventListener("mouseleave", function () {
  isDragging = false; // Oprim dragging-ul dacă mouse-ul părăsește SVG-ul
});

// Prevenirea scroll-ului global pe `wheel`
document.addEventListener("scroll", function (event) {
  event.preventDefault();
}, { passive: false });

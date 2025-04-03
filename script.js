const majorSpacing = 50; // Distanța dintre liniile groase
const minorSpacing = 10; // Distanța dintre liniile subțiri
const gridExtent = 100000; // Dimensiunea maximă a grilei (în ambele direcții)

let currentX = 0; // Poziția inițială X
let currentY = 0; // Poziția inițială Y

// SVG-ul principal
const svg = d3.select("body")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .style("background-color", "#E0E0E0");

// const imgs = svg.selectAll("image").data([0]);
// imgs.enter()
  // .append("svg:image", '/res/coca-cola-christmas.png');

/*svg.append("image")
  .attr("xlink:href", "/res/coca-cola-christmas3.png")
  .attr("width", "100vw")
  .attr("height", "100%");*/

// Grup pentru grilă
const gridGroup = svg.append("g")
  .attr("transform", `translate(${window.innerWidth / 2}, ${window.innerHeight / 2})`);

// Adaugă grila mare
function drawGrid() {
  // Linii subțiri (minore)
  for (let x = -gridExtent; x <= gridExtent; x += minorSpacing) {
    gridGroup.append("line")
      .attr("x1", x)
      .attr("y1", -gridExtent)
      .attr("x2", x)
      .attr("y2", gridExtent)
      .attr("stroke", "#404040")
      .attr("stroke-width", 0.5);
  }

  for (let y = -gridExtent; y <= gridExtent; y += minorSpacing) {
    gridGroup.append("line")
      .attr("x1", -gridExtent)
      .attr("y1", y)
      .attr("x2", gridExtent)
      .attr("y2", y)
      .attr("stroke", "#404040")
      .attr("stroke-width", 0.5);
  }

  // Linii groase (majore)
  for (let x = -gridExtent; x <= gridExtent; x += majorSpacing) {
    gridGroup.append("line")
      .attr("x1", x)
      .attr("y1", -gridExtent)
      .attr("x2", x)
      .attr("y2", gridExtent)
      .attr("stroke", "#404040")
      .attr("stroke-width", 1);
  }

  for (let y = -gridExtent; y <= gridExtent; y += majorSpacing) {
    gridGroup.append("line")
      .attr("x1", -gridExtent)
      .attr("y1", y)
      .attr("x2", gridExtent)
      .attr("y2", y)
      .attr("stroke", "#404040")
      .attr("stroke-width", 1);
  }
}

// Adaugă axele principale
gridGroup.append("line")
  .attr("x1", -gridExtent)
  .attr("y1", 0)
  .attr("x2", gridExtent)
  .attr("y2", 0)
  .attr("stroke", "#404040")
  .attr("stroke-width", 5);

gridGroup.append("line")
  .attr("x1", 0)
  .attr("y1", -gridExtent)
  .attr("x2", 0)
  .attr("y2", gridExtent)
  .attr("stroke", "#404040")
  .attr("stroke-width", 5);

// Apel funcție pentru desenarea grilei
drawGrid();

// Variabile pentru dragging
let isDragging = false;
let startX, startY;

// Funcții pentru dragging cu "debounce"
let lastMove = 0;
const debounceDelay = 10; // Milisecunde pentru debounce

function dragMove(event) {
  if (isDragging) {
    const now = Date.now();
    if (now - lastMove < debounceDelay) return; // Ignoră evenimentele prea dese
    lastMove = now;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    currentX += dx;
    currentY += dy;

    gridGroup.transition().duration(50) // Tranziție smooth
      .attr("transform", `translate(${currentX}, ${currentY})`);

    startX = event.clientX;
    startY = event.clientY;
  }
}

function dragStart(event) {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;

  // Elimină tranzițiile pe durata dragging-ului
  gridGroup.interrupt();
}

function dragEnd() {
  isDragging = false;
}

// Adaugă evenimentele pentru dragging
svg.on("mousedown", dragStart)
   .on("mousemove", dragMove)
   .on("mouseup", dragEnd)
   .on("mouseleave", dragEnd);

// Centrează la `(0, 0)` inițial
gridGroup.attr("transform", `translate(${window.innerWidth / 2}, ${window.innerHeight / 2})`);

const points = [];

// Adaugă punctul O(0, 0)
gridGroup.append("circle")
  .attr("cx", 0) // Coordonata X
  .attr("cy", 0) // Coordonata Y
  .attr("r", 7) // Raza cercului
  .style("fill", "grey"); // Culoarea punctului

// Adaugă eticheta pentru punctul O(0, 0)
gridGroup.append("text")
  .attr("x", 10) // Plasat ușor în dreapta punctului
  .attr("y", -10) // Plasat ușor deasupra punctului
  .text("O(0, 0)")
  .style("font-size", "12px")
  .style("fill", "black");
// Convertim gradele în radiani pentru funcția sin
const degreesToRadians = angle => (Math.PI / 180) * angle;

// Valoarea lui t
const t = 3;

// Funcțiile pentru coordonatele x și y (unități din grilă)
const x = 10 * Math.sin(3 * t); // x în funcție de t
const y = 10 * Math.sin(6 * t + 90); // y în funcție de t

// Adăugăm punctul A pe grilă
points.push({x: x, y: y});
gridGroup.append("circle")
  .attr("cx", x * minorSpacing) // x în raport cu unitățile grilei
  .attr("cy", -y * minorSpacing) // y inversat (coordonatele SVG au origine inversată pe verticală)
  .attr("r", 4) // Dimensiunea punctului
  .style("fill", "blue"); // Culoarea punctului

// Adăugăm eticheta "A" lângă punct, cu coordonate formatate
gridGroup.append("text")
  .attr("x", x * minorSpacing + 10) // Lângă punct pe axa X
  .attr("y", -y * minorSpacing - 10) // Deasupra punctului pe axa Y
  .text(`A (${x.toFixed(2)}, ${y.toFixed(2)})`) // Numele punctului cu coordonate formatate
  .style("font-size", "12px")
  .style("fill", "black");


// Valoarea lui t pentru noul punct
const t2 = 6; // Noul t

// Funcțiile pentru coordonatele x și y ale punctului
const x2 = 10 * Math.sin(3 * t2); // x în funcție de t2
const y2 = 10 * Math.sin(6 * t2 + 90); // y în funcție de t2

points.push({x: x2, y: y2});
// Adăugăm noul punct pe grilă
gridGroup.append("circle")
  .attr("cx", x2 * minorSpacing) // Coordonata x a punctului
  .attr("cy", -y2 * minorSpacing) // Coordonata y a punctului (SVG are coordonate inversate pe verticală)
  .attr("r", 4) // Dimensiunea punctului
  .style("fill", "green"); // Culoarea punctului (verde)

// Adăugăm eticheta noului punct
gridGroup.append("text")
  .attr("x", x2 * minorSpacing - 50) // Lângă punct pe axa X
  .attr("y", -y2 * minorSpacing -10 ) // Deasupra punctului pe axa Y
  .text(`B (${x2.toFixed(2)}, ${y2.toFixed(2)})`) // Numele punctului cu coordonate formatate
  .style("font-size", "12px")
  .style("fill", "black");
// Valoarea lui t pentru noul punct
const t3 = 9; // Noul t

// Funcțiile pentru coordonatele x și y ale punctului
const x3 = 10 * Math.sin(3 * t3); // x în funcție de t2
const y3 = 10 * Math.sin(6 * t3 + 90); // y în funcție de t2

points.push({x: x3, y: y3});
// Adăugăm noul punct pe grilă
gridGroup.append("circle")
  .attr("cx", x3 * minorSpacing) // Coordonata x a punctului
  .attr("cy", -y3 * minorSpacing) // Coordonata y a punctului (SVG are coordonate inversate pe verticală)
  .attr("r", 4) // Dimensiunea punctului
  .style("fill", "red"); // Culoarea punctului (verde)

// Adăugăm eticheta noului punct
gridGroup.append("text")
  .attr("x", x3 * minorSpacing - 10) // Lângă punct pe axa X
  .attr("y", -y3 * minorSpacing -10 ) // Deasupra punctului pe axa Y
  .text(`C (${x3.toFixed(2)}, ${y3.toFixed(2)})`) // Numele punctului cu coordonate formatate
  .style("font-size", "12px")
  .style("fill", "black");
  // Valoarea lui t pentru noul punct
const t4 = 12; // Noul t

// Funcțiile pentru coordonatele x și y ale punctului
const x4 = 10 * Math.sin(3 * t4); // x în funcție de t2
const y4 = 10 * Math.sin(6 * t4 + 90); // y în funcție de t2

points.push({x: x4, y: y4});
// Adăugăm noul punct pe grilă
gridGroup.append("circle")
  .attr("cx", x4 * minorSpacing) // Coordonata x a punctului
  .attr("cy", -y4 * minorSpacing) // Coordonata y a punctului (SVG are coordonate inversate pe verticală)
  .attr("r", 4) // Dimensiunea punctului
  .style("fill", "orange"); // Culoarea punctului (verde)

// Adăugăm eticheta noului punct
gridGroup.append("text")
  .attr("x", x4 * minorSpacing - 50) // Lângă punct pe axa X
  .attr("y", -y4 * minorSpacing -10 ) // Deasupra punctului pe axa Y
  .text(`D (${x4.toFixed(2)}, ${y4.toFixed(2)})`) // Numele punctului cu coordonate formatate
  .style("font-size", "12px")
  .style("fill", "black");
  // Valoarea lui t pentru noul punct
  const t5 = 0; // Noul t

  // Funcțiile pentru coordonatele x și y ale punctului
  const x5 = 10 * Math.sin(3 * t5); // x în funcție de t2
  const y5 = 10 * Math.sin(6 * t5 + 90); // y în funcție de t2
  
  // Adăugăm noul punct pe grilă
  gridGroup.append("circle")
    .attr("cx", x5 * minorSpacing) // Coordonata x a punctului
    .attr("cy", -y5 * minorSpacing) // Coordonata y a punctului (SVG are coordonate inversate pe verticală)
    .attr("r", 4) // Dimensiunea punctului
    .style("fill", "#4CBB17"); // Culoarea punctului (verde)

  // Adăugăm eticheta noului punct
  gridGroup.append("text")
    .attr("x", x5 * minorSpacing - 80) // Lângă punct pe axa X
    .attr("y", -y5 * minorSpacing -10 ) // Deasupra punctului pe axa Y
    .text(`O (${x5.toFixed(2)}, ${y5.toFixed(2)})`) // Numele punctului cu coordonate formatate
    .style("font-size", "12px")
    .style("fill", "black");
  //linii

// // Adaugă o linie între punctele A și O
// gridGroup.append("line")
// .attr("x1", x * minorSpacing) // Coordonata X a punctului A
// .attr("y1", -y * minorSpacing) // Coordonata Y a punctului A
// .attr("x2", x5 * minorSpacing) // Coordonata X a punctului O
// .attr("y2", -y5 * minorSpacing) // Coordonata Y a punctului O
// .attr("stroke", "#008B8B") // Culoarea liniei
// .attr("stroke-width", 2); // Grosimea liniei

// // Adaugă o linie între punctele A și B
// gridGroup.append("line")
//   .attr("x1", x * minorSpacing) // Coordonata X a punctului A
//   .attr("y1", -y * minorSpacing) // Coordonata Y a punctului A
//   .attr("x2", x2 * minorSpacing) // Coordonata X a punctului B
//   .attr("y2", -y2 * minorSpacing) // Coordonata Y a punctului B
//   .attr("stroke", "turquoise") // Culoarea liniei
//   .attr("stroke-width", 2); // Grosimea liniei

//   // Adaugă o linie între punctele A și c
// gridGroup.append("line")
// .attr("x1", x2 * minorSpacing) // Coordonata X a punctului A
// .attr("y1", -y2 * minorSpacing) // Coordonata Y a punctului A
// .attr("x2", x3 * minorSpacing) // Coordonata X a punctului c
// .attr("y2", -y3 * minorSpacing) // Coordonata Y a punctului c
// .attr("stroke", "brown") // Culoarea liniei
// .attr("stroke-width", 2); // Grosimea liniei

//  // Adaugă o linie între punctele A și D
//  gridGroup.append("line")
//  .attr("x1", x3 * minorSpacing) // Coordonata X a punctului A
//  .attr("y1", -y3 * minorSpacing) // Coordonata Y a punctului A
//  .attr("x2", x4 * minorSpacing) // Coordonata X a punctului D
//  .attr("y2", -y4 * minorSpacing) // Coordonata Y a punctului D
//  .attr("stroke", "#CC7722") // Culoarea liniei
//  .attr("stroke-width", 2); // Grosimea liniei

 
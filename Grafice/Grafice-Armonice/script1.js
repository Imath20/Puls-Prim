
const majorSpacing = 50;
const minorSpacing = 10;
const gridExtent = 100000;

let currentX = 0;
let currentY = 0;

const svg = d3.select("body")
  .append("svg")
  .attr("width", "1000%")
  .attr("height", "1000%")
  .style("background-color", "#E0E0E0");

const gridGroup = svg.append("g")
  .attr("transform", `translate(${window.innerWidth / 2}, ${window.innerHeight / 2})`);

function drawGrid() {
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

drawGrid();


gridGroup.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 7)
  .style("fill", "grey");

gridGroup.append("text")
  .attr("x", 10)
  .attr("y", -10)
  .text("O(0, 0)")
  .style("font-size", "12px")
  .style("fill", "black");

const degreesToRadians = angle => (Math.PI / 180) * angle;

/* ---------------- Points Section ---------------- */
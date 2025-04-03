
let isDragging = false;
let startX, startY;

let lastMove = 0;
const debounceDelay = 10;

function dragMove(event) {
  if (isDragging) {
    const now = Date.now();
    if (now - lastMove < debounceDelay) return;
    lastMove = now;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    currentX += dx;
    currentY += dy;

    gridGroup.transition().duration(50)
      .attr("transform", `translate(${currentX}, ${currentY})`);

    startX = event.clientX;
    startY = event.clientY;
  }
}

function dragStart(event) {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
  gridGroup.interrupt();
}

function dragEnd() {
  isDragging = false;
}

// Disable dragging for the time being
svg.on("mousedown", dragStart)
   .on("mousemove", dragMove)
   .on("mouseup", dragEnd)
   .on("mouseleave", dragEnd);

gridGroup.attr("transform", `translate(${window.innerWidth / 2}, ${window.innerHeight / 2})`);
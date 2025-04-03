// Elemente din DOM
const deletePopup = document.getElementById('delete-point-line-popup');
const openDeletePopupBtn = document.getElementById('open-delete-popup-btn');
const closeDeletePopupBtn = document.getElementById('close-delete-popup-btn');
const deletePointBtnPopup = document.getElementById('delete-point-btn-popup');
const deleteLineBtnPopup = document.getElementById('delete-line-btn-popup');
const deletePointIndexInput = document.getElementById('deletePointIndex');
const deleteLinePointAInput = document.getElementById('deleteLinePointA');
const deleteLinePointBInput = document.getElementById('deleteLinePointB');

// Funcția pentru ștergerea unui punct
const deletePoint = (pointIndex) => {
    const point = createdPoints[pointIndex];
    createdPoints.splice(pointIndex, 1); // Eliminăm punctul din array

    // Ștergem punctul din SVG
    d3.selectAll("circle")
        .filter(function () {
            return this.getAttribute("cx") === (point.x * minorSpacing).toString() &&
                   this.getAttribute("cy") === (-point.y * minorSpacing).toString();
        })
        .remove();

    d3.selectAll("text")
        .filter(function () {
            return this.textContent.includes(point.name);
        })
        .remove();

    addLog(`Punctul ${point.name} a fost șters.`);
};

// Funcția pentru ștergerea unei linii
const deleteLine = (pointAIndex, pointBIndex) => {
    const pointA = createdPoints[pointAIndex];
    const pointB = createdPoints[pointBIndex];

    // Ștergem linia din SVG
    d3.selectAll("line")
        .filter(function () {
            return (this.getAttribute("x1") === (pointA.x * minorSpacing).toString() &&
                    this.getAttribute("y1") === (-pointA.y * minorSpacing).toString() &&
                    this.getAttribute("x2") === (pointB.x * minorSpacing).toString() &&
                    this.getAttribute("y2") === (-pointB.y * minorSpacing).toString()) ||
                   (this.getAttribute("x1") === (pointB.x * minorSpacing).toString() &&
                    this.getAttribute("y1") === (-pointB.y * minorSpacing).toString() &&
                    this.getAttribute("x2") === (pointA.x * minorSpacing).toString() &&
                    this.getAttribute("y2") === (-pointA.y * minorSpacing).toString());
        })
        .remove();

    addLog(`Linia dintre punctele ${pointA.name} și ${pointB.name} a fost ștearsă.`);
};

// Evenimente pentru popup
openDeletePopupBtn.addEventListener('click', () => {
  deletePopup.style.display = 'flex';
});

closeDeletePopupBtn.addEventListener('click', () => {
  deletePopup.style.display = 'none';
});

deletePointBtnPopup.addEventListener('click', () => {
  const pointIndex = parseInt(deletePointIndexInput.value, 10);
  if (isNaN(pointIndex) || pointIndex < 0 || pointIndex >= createdPoints.length) {
    addLog("Index invalid. Te rog să încerci din nou.");
    return;
  }
  deletePoint(pointIndex); // Apelăm funcția pentru ștergerea punctului
  deletePopup.style.display = 'none';
});

deleteLineBtnPopup.addEventListener('click', () => {
  const pointAIndex = parseInt(deleteLinePointAInput.value, 10);
  const pointBIndex = parseInt(deleteLinePointBInput.value, 10);
  if (isNaN(pointAIndex) || isNaN(pointBIndex) ||
      pointAIndex < 0 || pointAIndex >= createdPoints.length ||
      pointBIndex < 0 || pointBIndex >= createdPoints.length) {
    addLog("Indexuri invalide. Te rog să încerci din nou.");
    return;
  }
  deleteLine(pointAIndex, pointBIndex); // Apelăm funcția pentru ștergerea liniei
  deletePopup.style.display = 'none';
});


/*// Selectăm lista de puncte și linia dorită pentru ștergere
const deletePointButton = document.getElementById('delete-point-btn'); // Buton pentru ștergerea unui punct
const deleteLineButton = document.getElementById('delete-line-btn');   // Buton pentru ștergerea unei linii

// Funcția pentru ștergerea unui punct
const deletePoint = () => {
    const pointIndex = parseInt(prompt("Introdu indexul punctului de șters:"), 10);
    if (isNaN(pointIndex) || pointIndex < 0 || pointIndex >= createdPoints.length) {
        addLog("Index invalid. Te rog să încerci din nou.");
        return;
    }

    const point = createdPoints[pointIndex];
    createdPoints.splice(pointIndex, 1); // Eliminăm punctul din array

    // Ștergem punctul din SVG
    d3.selectAll("circle")
        .filter(function () {
            return this.getAttribute("cx") === (point.x * minorSpacing).toString() &&
                   this.getAttribute("cy") === (-point.y * minorSpacing).toString();
        })
        .remove();

    d3.selectAll("text")
        .filter(function () {
            return this.textContent.includes(point.name);
        })
        .remove();

    addLog(Punctul ${point.name} a fost șters.);
};

// Funcția pentru ștergerea unei linii
const deleteLine = () => {
    const pointAIndex = parseInt(prompt("Introdu indexul punctului A al liniei:"), 10);
    const pointBIndex = parseInt(prompt("Introdu indexul punctului B al liniei:"), 10);

    if (isNaN(pointAIndex) || isNaN(pointBIndex) ||
        pointAIndex < 0 || pointAIndex >= createdPoints.length ||
        pointBIndex < 0 || pointBIndex >= createdPoints.length) {
        addLog("Indexuri invalide. Te rog să încerci din nou.");
        return;
    }

    const pointA = createdPoints[pointAIndex];
    const pointB = createdPoints[pointBIndex];

    // Ștergem linia din SVG
    d3.selectAll("line")
        .filter(function () {
            return (this.getAttribute("x1") === (pointA.x * minorSpacing).toString() &&
                    this.getAttribute("y1") === (-pointA.y * minorSpacing).toString() &&
                    this.getAttribute("x2") === (pointB.x * minorSpacing).toString() &&
                    this.getAttribute("y2") === (-pointB.y * minorSpacing).toString()) ||
                   (this.getAttribute("x1") === (pointB.x * minorSpacing).toString() &&
                    this.getAttribute("y1") === (-pointB.y * minorSpacing).toString() &&
                    this.getAttribute("x2") === (pointA.x * minorSpacing).toString() &&
                    this.getAttribute("y2") === (-pointA.y * minorSpacing).toString());
        })
        .remove();

    addLog(Linia dintre punctele ${pointA.name} și ${pointB.name} a fost ștearsă.);
};

// Event listeners pentru butoane
deletePointButton.onclick = deletePoint;
deleteLineButton.onclick = deleteLine;*/
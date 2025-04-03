
const createTriangleButton = document.getElementById('create-triangle-btn');
const point1Input = document.getElementById('point1Input');
const point2Input = document.getElementById('point2Input');
const point3Input = document.getElementById('point3Input');
const triangleColorInput = document.getElementById('triangleColorInput');

// Funcția pentru crearea unui triunghi folosind linii
const createTriangle = () => {
    const point1Index = parseInt(point1Input.value, 10);
    const point2Index = parseInt(point2Input.value, 10);
    const point3Index = parseInt(point3Input.value, 10);
    const triangleColor = triangleColorInput.value;

    // Validări pentru indexurile punctelor
    if (
        isNaN(point1Index) || isNaN(point2Index) || isNaN(point3Index) ||
        point1Index < 0 || point1Index >= createdPoints.length ||
        point2Index < 0 || point2Index >= createdPoints.length ||
        point3Index < 0 || point3Index >= createdPoints.length
    ) {
        addLog("Indexurile punctelor introduse nu sunt valide.");
        return;
    }

    // Verificăm să nu fie puncte duplicate
    if (point1Index === point2Index || point1Index === point3Index || point2Index === point3Index) {
        addLog("Punctele trebuie să fie diferite!");
        return;
    }

    // Obținem coordonatele punctelor
    const point1 = createdPoints[point1Index];
    const point2 = createdPoints[point2Index];
    const point3 = createdPoints[point3Index];

    // Creăm linii pentru fiecare latură a triunghiului
    gridGroup.append("line")
        .attr("x1", point1.x * minorSpacing)
        .attr("y1", -point1.y * minorSpacing)
        .attr("x2", point2.x * minorSpacing)
        .attr("y2", -point2.y * minorSpacing)
        .attr("stroke", triangleColor)
        .attr("stroke-width", 2);

    gridGroup.append("line")
        .attr("x1", point2.x * minorSpacing)
        .attr("y1", -point2.y * minorSpacing)
        .attr("x2", point3.x * minorSpacing)
        .attr("y2", -point3.y * minorSpacing)
        .attr("stroke", triangleColor)
        .attr("stroke-width", 2);

    gridGroup.append("line")
        .attr("x1", point3.x * minorSpacing)
        .attr("y1", -point3.y * minorSpacing)
        .attr("x2", point1.x * minorSpacing)
        .attr("y2", -point1.y * minorSpacing)
        .attr("stroke", triangleColor)
        .attr("stroke-width", 2);

    addLog(`Triunghi format între punctele ${point1.name}, ${point2.name}, și ${point3.name}.`);
    hideDialog();
};

// Legăm butonul de funcție
createTriangleButton.onclick = createTriangle;

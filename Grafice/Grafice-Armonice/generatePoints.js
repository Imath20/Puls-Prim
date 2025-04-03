
let isDialogOpen = false;
const popup = document.getElementById('generate-points-popup');
const overlay = document.getElementById('overlay');
const showPopupButton = document.getElementById('show-popup-button');
const closePopupButton = document.getElementById('close-popup-btn');
const generatePointsButton = document.getElementById('generate-points-btn');
const interval1Input = document.getElementById('interval1Input');
const interval2Input = document.getElementById('interval2Input');
const intervalInputs = document.getElementsByClassName('intervalInput');
const amplitudeInput = document.getElementById('amplitudeInput');
const omegaInput = document.getElementById('omegaInput');
const phaseInput = document.getElementById('phaseInput');
const colorInput = document.getElementById('colorInput');

const openDialog = () => {
    isDialogOpen = true;
    console.log('opened popup');
    popup.style.display = 'flex';
    // letterInput.focus();
    interval1Input.focus();
    overlay.style.display = 'block';
    interval1Input.style.borderColor = 'white';
    interval2Input.style.borderColor = 'white';
    // console.log('Overlay: ', overlay);
}

const hideDialog = () => {
    isDialogOpen = false;
    console.log('closed popup');
    popup.style.display = 'none';
    overlay.style.display = 'none';
    resetValues();
}

const resetValues = () => {
    interval1Input.value = '';
    interval2Input.value = '';
    amplitudeInput.value = '';
    omegaInput.value = '';
    phaseInput.value = '';
    colorInput.value = '#ff0000';
}

const degToRadian = deg => {
    return deg * (Math.PI / 180);
}

// function enforceMinMax(el) {
//     console.log('On change', el);
//     if (el.value != '') {
//         if (parseInt(el.value) < parseInt(el.min)) {
//             el.value = el.min;
//         }
//         if (parseInt(el.value) > parseInt(el.max)) {
//             el.value = el.max;
//         }
//     }
// }

// Ensure the input values don't go out of bounds
const enforceMinMax = el => {
    if (el.value === '')
        return;

    let value = parseInt(el.value);
    const min = parseInt(el.min);
    const max = parseInt(el.max);

    while (value > max) {
        el.value = Math.floor(value / 10);
        value = el.value;
    }

    if (value < min)
        el.value = min;
}

interval1Input.onchange = el => enforceMinMax(el.srcElement);
interval2Input.onchange = el => enforceMinMax(el.srcElement);

const validateValues = () => {
    // Still check if user somehow managed to type out of bounds
    let ok = true;
    for (const input of intervalInputs) {
        if (input.value === '') {
            input.style.borderColor = 'red';
            ok = false;
            continue;
        }
        if (parseInt(input.value) > parseInt(input.max)) {
            alert(`Valoarea ${input.value} este mai mare decat maximul (${input.max})`);
            input.style.borderColor = 'red';
            ok = false;
            continue;
        }
        if (parseInt(input.value) < parseInt(input.min)) {
            alert(`Valoarea ${input.value} este mai mica decat minimul (${input.min})`);
            input.style.borderColor = 'red';
            ok = false;
            continue;
        }
    }

    if (parseInt(intervalInputs[0].value) > parseInt(intervalInputs[1].value)) {
        alert(`Valoarea ${intervalInputs[0].value} este mai mare decat ${intervalInputs[1].value}`);
        input.style.borderColor = 'red';
        ok = false;
    }

    if (amplitudeInput.value === '') {
        amplitudeInput.style.borderColor = 'red';
        ok = false;
    }
    if (omegaInput.value === '') {
        omegaInput.style.borderColor = 'red';
        ok = false;
    }
    if (phaseInput.value === '') {
        phaseInput.style.borderColor = 'red';
        ok = false;
    }

    if(parseInt(phaseInput.value) > 90)
    {
        alert(`ϕ0 nu poate sa fie mai mare decat 90°`);
        phaseInput.style.borderColor = 'red';
        ok = false;
    }
    else if(parseInt(phaseInput.value) < 0)
    {
        alert(`ϕ0 nu poate sa fie negativ`);
        phaseInput.style.borderColor = 'red';
        ok = false;
    }

    if (amplitudeInput.value === '' || omegaInput.value === '' || phaseInput.value === ''
        || intervalInputs[0].value === '' || intervalInputs[1].value === '')
        alert(`Te rog sa completezi toate campurile`);

    return ok;
}

// for (const intervalInput of intervalInputs) {
//     intervalInput.addEventListener('input', function() {
//         const val = parseFloat(this.value);
//         if (this.value && (val < this.min || val > this.max)) {
//           this.style.borderColor = 'red';
//         } else {
//           this.style.borderColor = '';
//         }
//       });
// }

const generatePoints = () => {
    if (!validateValues())
        return;
    // Get all values
    const t0 = parseInt(interval1Input.value);
    const t = parseInt(interval2Input.value);
    const A = parseInt(amplitudeInput.value);
    const w = parseInt(omegaInput.value);
    const f0 = parseInt(phaseInput.value);
    const color = colorInput.value;
    console.log('Trying to generate points...');
    hideDialog();

    // Go from t0 to t
    const spacing = 1;
    const graphPoints = [];
    const extremumPoints = [];
    const timePoints = [];
    const graphThickness = 3;
    const pointThickness = 4;
    for (let ti = t0; ti <= t; ti += spacing)
    {
        // console.log('ti: ', ti);
        const y = A * Math.sin(degToRadian(w * ti) + degToRadian(f0));
        console.log('Value: ', y);

        graphPoints.push({x: ti, y: y * minorSpacing});
        // gridGroup.append("circle")
        //     .attr("cx", ti)
        //     .attr("cy", y * minorSpacing)
        //     .attr("r", 3)
        //     .style("fill", color);

        if (y == A || y == -A)
        {
            // gridGroup.append("circle")
            //     .attr("cx", ti)
            //     .attr("cy", y * minorSpacing)
            //     .attr("r", 4)
            //     .style("fill", "#000000");

            extremumPoints.push({x: ti, y: y * minorSpacing});
            timePoints.push(ti);
        }
    }

    // Draw graph line
    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveBasis);
    
    gridGroup.append("path")
        .attr("d", line(graphPoints))
        .attr("fill", "none")
        .attr("stroke-width", graphThickness)
        .attr("stroke", color);
    
    // Draw extremum points
    for(const point of extremumPoints)
    {
        gridGroup.append("circle")
            .attr("cx", point.x)
            .attr("cy", point.y)
            .attr("r", pointThickness)
            .style("fill", "#000000");
    }

    // Draw A
    gridGroup.append("text")
        .attr("x", 5)
        .attr("y", -A * minorSpacing)
        .text(`A`)
        .style("font-size", "20px")
        .style("fill", "black");
    gridGroup.append("text")
        .attr("x", 2.5)
        .attr("y", A * minorSpacing + 30)
        .text(`-A`)
        .style("font-size", "20px")
        .style("fill", "black");
    
    // Draw A line
    gridGroup.append("line")
        .attr("x1", t0)
        .attr("y1", -A * minorSpacing)
        .attr("x2", t)
        .attr("y2", -A * minorSpacing)
        .attr("fill", "none")
        .attr("stroke", "#292929")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5, 5");
    gridGroup.append("line")
        .attr("x1", t0)
        .attr("y1", A * minorSpacing)
        .attr("x2", t)
        .attr("y2", A * minorSpacing)
        .attr("fill", "none")
        .attr("stroke", "#292929")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5, 5");
    
    // Draw time points
    for(let i = 0; i < timePoints.length; i++)
    {
        const ti = timePoints[i];
        const y = extremumPoints[i].y;
        gridGroup.append("text")
            .attr("x", ti - 10)
            .attr("y", y - 10)
            .text(`t = ${ti}`)
            .style("font-size", "10px")
            .style("fill", "black");
    }

    // gridGroup.append("path")
    //     .attr("d", line([{t0, A}, {t, A}]))
    //     .style("stroke-dasharray", ("3, 3"))
    //     .attr("fill", "none")
    //     .attr("stroke", "gray")


    // const f0 = 90;
    // const t = time;
    // const w1 = omega1;
    // const w2 = omega2;
    // const A = amplitudine;
    // const x = A * Math.sin(w1 * t);
    // const y = A * Math.sin(w2 * t + f0);

    // gridGroup.append("circle")
    // .attr("cx", x * minorSpacing)
    //     .attr("cy", -y * minorSpacing)
    //     .attr("r", 4)
    //     .style("fill", color);

    // gridGroup.append("text")
    //     .attr("x", x * minorSpacing - 10)
    //     .attr("y", -y * minorSpacing - 10)
    //     .text(`D (${x.toFixed(2)}, ${y.toFixed(2)})`)
    //     .style("font-size", "12px")
    //     .style("fill", color);
}

showPopupButton.onclick = openDialog;
closePopupButton.onclick = hideDialog;
generatePointsButton.onclick = generatePoints;

window.onload = () => {
    hideDialog();
}

overlay.onclick = e => {
    hideDialog();
}

document.addEventListener('keydown', e => {
    if (isDialogOpen && e.key === 'Escape')
        hideDialog();
})
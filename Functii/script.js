const initialDate = Date.now();

let mouseX = 0, mouseY = 0;

document.onmousemove = (e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

let func = "sin(x)";

const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan, tg = tan;
const cot = x => 1 / Math.tan(x), ctg = cot;
const asin = Math.asin, arcsin = asin;
const acos = Math.acos, arccos = acos;
const atan = Math.atan, arctg = atan;
const arcctg = x => Math.PI / 2 - atan(x), acot = arcctg;
const PI = Math.PI, pi = PI;

const evalFunc = () => {
    f = x => {
        const funcText = func.replace('x', x);
        const result = eval(funcText);
        return result * graph.amp;
    }
};

let f = x => { };

const graph = {
    size: 0,
    posX: 0,
    posY: 0,
    centerX: 0,
    centerY: 0,
    endX: 0,
    endY: 0,
    svg: null,
    data: [],
    amp: 1,
    lineThickness: 5,
    step: 5,
    init: () => {
        const screenWidth = document.body.clientWidth;
        const screenHeight = document.body.clientHeight;
        graph.size = Math.max(screenWidth, screenHeight);
        graph.centerX = screenWidth / 2;
        graph.centerY = screenHeight / 2;
        graph.endX = graph.centerX + graph.size;
        graph.endY = graph.centerY - graph.size;
        graph.lineSize = Math.min(screenWidth - 80, screenHeight - 80);
        graph.amp = 8;
        graph.lineThickness = 3;
        graph.graphThickness = 3;
        graph.step = 5;
        graph.svgScale = 1;
        graph.data = [];
    },
    clear: () => {
        if (graph.svg) graph.svg.remove();
    },
    getCenterX: () => graph.centerX,
    getCenterY: () => graph.centerY,
    renderBody: () => {
        graph.svg = d3.select("body")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("background-color", "black");

        graph.currentTransform = d3.zoomIdentity;

        const zoomed = e => {
            graph.currentTransform = e.transform;
            graph.redrawGraph();
        };

        graph.zoom = d3.zoom().on("zoom", zoomed);
        graph.svg.call(graph.zoom);
    },
    drawLines: () => {
        graph.svg.append("line")
            .attr("x1", graph.centerX - graph.lineSize / 2)
            .attr("y1", graph.centerY)
            .attr("x2", graph.centerX + graph.lineSize / 2)
            .attr("y2", graph.centerY)
            .attr("stroke", "white")
            .attr("stroke-width", graph.lineThickness)
            .attr("class", "x-axis");

        graph.svg.append("line")
            .attr("x1", graph.centerX)
            .attr("y1", graph.centerY + graph.lineSize / 2)
            .attr("x2", graph.centerX)
            .attr("y2", graph.centerY - graph.lineSize / 2)
            .attr("stroke", "white")
            .attr("stroke-width", graph.lineThickness)
            .attr("class", "y-axis");
    },
    drawGraph: () => {
        graph.data = [];
        const beginX = graph.centerX - graph.lineSize / 2;
        const beginY = graph.centerY + graph.lineSize / 2;
        const endX = graph.centerX + graph.lineSize / 2;
        const endY = graph.centerY - graph.lineSize / 2;


        let yCoord = beginY;
        for (let xCoord = beginX; xCoord <= endX; xCoord += graph.step, yCoord -= graph.step) {
            let a = -(yCoord - graph.centerY);
            let yPos = graph.centerY - f(a);
            const transformedPoint = graph.currentTransform.apply([xCoord, yPos]);
            graph.data.push({ x: transformedPoint[0], y: transformedPoint[1] });
        }

        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasis);

        graph.svg.append("path")
            .attr("d", line(graph.data))
            .attr("fill", "none")
            .attr("stroke-width", graph.graphThickness)
            .attr("stroke", "red");
    },
    getZoom: () => graph.zoom,
    getSVG: () => graph.svg,
    redrawGraph: () => {
        graph.clear();
        graph.renderBody();
        graph.drawLines();
        graph.drawGraph();
    }
};

const zoomIn = () => {
    // graph.svg.transition().duration(200)
    //     .call(graph.zoom.scaleBy, 1.5);

    graph.lineSize *= 1.5;
    graph.amp += 5;
    // graph.graphThickness /= 1.2;
    // graph.lineThickness /= 1.2;
    graph.step += 2;
    console.log('Zoomed in', graph.lineSize);
    graph.redrawGraph();
    // console.log('Zoomed in', graph.amp);
    // graph.getZoom().scaleBy(graph.getSVG(), 2);

};

const zoomOut = () => {
    // graph.svg.transition().duration(200)
    //     .call(graph.zoom.scaleBy, 0.67);
    
    graph.lineSize /= 1.5;
    graph.amp -= 5;
    // graph.graphThickness *= 1.2;
    // graph.lineThickness *= 1.2;
    graph.step -= 2;
    console.log('Zoomed out', graph.lineSize);
    graph.redrawGraph();
    // graph.getZoom().scaleBy(graph.getSVG(), 0.5);
};

const update = (timestamp) => {
    const now = Date.now();
    const time = new Date(now - initialDate);
};

const redrawGraphAndInit = () => {
    graph.clear();
    graph.init();
    graph.redrawGraph();
};

window.onload = () => {
    evalFunc();
    graph.init();
    graph.redrawGraph();
    insertFunctionPopup.init();
};

window.onresize = () => {
    redrawGraphAndInit();
};

const insertFunctionPopup = {
    showing: false,
    htmlElement: document.getElementById('insert-function-div'),
    inputElement: document.getElementById('insert-function-input'),
    isShowing: () => this.showing,
    init: () => {
        showing = false;
        htmlElement = document.getElementById('insert-function-div');
        inputElement = document.getElementById('insert-function-input');
    },
    open: () => {
        showing = true;
        htmlElement.style.display = 'flex';
        inputElement.focus();
    },
    close: () => {
        showing = false;
        htmlElement.style.display = 'none';
        inputElement.value = '';
    },
    getText: () => inputElement.value
};

const keys = {};

window.onkeydown = e => {
    keys[e.key] = true;

    if (e.key === 'f') {
        insertFunctionPopup.open();
        e.preventDefault();
    } else if (e.key === 'Enter' && insertFunctionPopup.isShowing()) {
        if (insertFunctionPopup.inputElement.value !== '') {
            func = insertFunctionPopup.getText();
            console.log('Function is ', func);
            evalFunc();
            redrawGraphAndInit();
            insertFunctionPopup.close();
        }
    } else if (e.key === 'Escape' && insertFunctionPopup.isShowing()) {
        insertFunctionPopup.close();
    }

    if (keys['Control']) {
        if(keys['='])
        {
            e.preventDefault();
            zoomIn();
        }
        else if(keys['-'])
        {
            e.preventDefault();
            zoomOut();
        }
    }
    if (e.key === 'Control' && e.key === '-') {
        e.preventDefault();
        zoomOut();
    }
};

window.onkeyup = e => {
    keys[e.key] = false;
};

window.onclick = e => { };

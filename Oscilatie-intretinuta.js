
let isPaused = false;
let isStopped = true;
let amplitude = 0.3;
// let amplitude = parseFloat(document.getElementById("amplitude").value);
let speed = parseFloat(document.getElementById("speed").value);
let angle = 0;
let direction = 1;
let beta = parseFloat(document.getElementById("beta").value);
//let b = 0.05
let minTheta = 0.01;
// let length = parseFloat(document.getElementById("lengthSlider").value) || 1.5;
// const length = 1.5;
let length = parseFloat(document.getElementById("lengthSlider").value) || 1.5; 

const mass = 1.5;
let pendulumInterval;
let measuringActive = false;

const gravity = 9.81;
// const omega = Math.sqrt(gravity / length);
let time = 0;
const timeStep = 0.02;
const ctx = document.getElementById("pendulumChart").getContext("2d");

const pendulumChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 50 }, (_, i) => i),
        datasets: [{
            label: 'Deplasare (m)',
            data: [], 
            borderColor: 'blue',
            borderWidth: 2,
            pointRadius: 0,
        }]
    },
    options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom', // Mută legenda sub grafic
                labels: {
                    boxWidth: 10, // Face pătratele mai mici
                    font: {
                        size: 10 // Text mai mic
                    }
                }
            }
        },
        scales: {
            y: {
                grid: { display: true, color: "#ddd" },
                ticks: { font: { size: 10 } }
            },
            x: {
                grid: { display: true, color: "#ddd" },
                ticks: { font: { size: 8 } }
            }
        }
    }
});



function updatePendulum() {
    let omega = Math.sqrt(gravity / length);
    beta = parseFloat(document.getElementById("beta").value) * 0.01;
    let dampingFactor = Math.exp(-beta * time);
    let displacement = amplitude * Math.sin(omega * time)* dampingFactor;
    // let velocity = (amplitude * omega * dampingFactor* Math.cos(omega * time)) / 100; // v(t)
    // let acceleration = (-amplitude * dampingFactor* omega ** 2 * Math.sin(omega * time)) / 100; // a(t)
    
   

    pendulumChart.data.labels.push(time.toFixed(2));
    pendulumChart.data.datasets[0].data.push(displacement);
    // pendulumChart.data.datasets[1].data.push(velocity);
    // pendulumChart.data.datasets[2].data.push(acceleration);

 if (pendulumChart.data.labels.length > 300) {
    pendulumChart.data.labels.shift();
    pendulumChart.data.datasets.forEach(dataset => dataset.data.shift());
   }
    pendulumChart.update();
    let pendulum = document.getElementById("string");
    // let shadow = document.getElementById("shadow");
    let theta = 5 * dampingFactor * Math.sin(omega * time);
    //pentru un pendul care nu are aceleasi formule
    // let theta = amplitude * Math.sin(omega * time);
    // theta = Math.max(-5, Math.min(5, theta));
    pendulum.style.transform = `rotate(${theta}deg)`;
    let elong = length * Math.tan(theta);
    //  let shadowOffset = Math.sin(theta * Math.PI / 180) * 50; 
    // shadow.style.transform = `translateX(${shadowOffset}px)`;
    
    time += timeStep;
    if (Math.abs(5 * dampingFactor * Math.sin(omega * time)) < minTheta) {
        clearInterval(animationInterval); // Oprește animația
        isStopped = true;
        return;
    }
    if (measuringActive) {
        document.getElementById("measured-amplitude").textContent = (elong).toFixed(2) + "cm";
        document.getElementById("measured-time").textContent = time.toFixed(2) + "s";
        document.getElementById("measured-speed").textContent = speed.toFixed(2) + "x";
        document.getElementById("measured-angle").textContent = theta.toFixed(2) + "°";
        document.getElementById("measured-angular-velocity").textContent = omega.toFixed(2) + "rad/s";
        document.getElementById("measured-x").textContent = (amplitude * Math.sin(omega * time + theta)/ 100).toFixed(2) + "m";
        document.getElementById("measured-velocity").textContent = (amplitude * omega * Math.cos(omega * time + theta)/ 100).toFixed(2) + "m/s";
        document.getElementById("measured-acceleration").textContent = (-amplitude * omega ** 2 * Math.sin(omega * time + theta)/ 100).toFixed(2) + "m/s²";
        document.getElementById("measured-kineticenergy").textContent = (mass * velocity * velocity * 0.5).toFixed(2) + "J";
    }
}

function startOscillation() {
    if (!isStopped) return;
    isStopped = false;
    isPaused = false;
    time = 0;
    speed = parseFloat(document.getElementById("speed").value);
    length = parseFloat(document.getElementById("lengthSlider").value) / 100;
    beta = parseFloat(document.getElementById("beta").value) / 100;
    let omega = Math.sqrt(gravity / length);
    pendulumChart.data.labels = [];
    pendulumChart.data.datasets.forEach(dataset => dataset.data = []);
    pendulumChart.update();
    if (pendulumInterval) {
        clearInterval(pendulumInterval);
    }
    pendulumInterval = setInterval(updatePendulum, 100 / speed);
    resetMeasuringData();
    document.getElementById("measured-amplitude").textContent = "0";
    document.getElementById("measured-speed").textContent = "0";
    document.getElementById("measured-time").textContent = "0";
    document.getElementById("measured-x").textContent = "0";
    document.getElementById("measured-angle").textContent = "0°";
    document.getElementById("measured-angular-velocity").textContent = "0";
    document.getElementById("measured-velocity").textContent = "0";
    document.getElementById("measured-acceleration").textContent = "0";
    document.getElementById("measured-kineticenergy").textContent = "0";
    document.getElementById("pauseResumeBtn").textContent = "Pauză";
}

function togglePauseResume() {
    let button = document.getElementById("pauseResumeBtn");
    if (isPaused) {
        speed = parseFloat(document.getElementById("speed").value);
        clearInterval(pendulumInterval); 
        pendulumInterval = setInterval(updatePendulum, 100 / speed);
        button.textContent = "Pauză";
    } else {
        clearInterval(pendulumInterval);
        button.textContent = "Rezumă";
    }
    isPaused = !isPaused;
}

function stopOscillation() {
    clearInterval(pendulumInterval);
    isStopped = true;
    isPaused = false;
    angle = 0;
    time = 0;
    document.getElementById("string").style.transform = `rotate(0deg)`;
    document.getElementById("measured-amplitude").textContent = "0";
    document.getElementById("measured-speed").textContent = "0";
    document.getElementById("measured-time").textContent = "0";
    document.getElementById("measured-x").textContent = "0";
    document.getElementById("measured-angle").textContent = "0°";
    document.getElementById("measured-angular-velocity").textContent = "0";
    document.getElementById("measured-velocity").textContent = "0";
    document.getElementById("measured-acceleration").textContent = "0";
    document.getElementById("measured-kineticenergy").textContent = "0";
    document.getElementById("string").style.transform = `rotate(0deg)`;
    document.getElementById("pauseResumeBtn").textContent = "Pauză";
}
// document.getElementById("amplitude").addEventListener("input", function () {
//     this.value = 10;
//     amplitude = 10;
//     document.getElementById("amplitude-value").textContent = amplitude + "cm";
// });

const betaInput = document.getElementById("beta");
betaInput.addEventListener('input', () => {
    beta = parseFloat(betaInput.value) * 0.01;
    document.getElementById("beta-value").textContent = beta.toFixed(2) + " s^-1";
    document.getElementById("measured-beta").textContent = beta.toFixed(2) + " s^-1";
})

document.getElementById("speed").addEventListener("input", function () {
    speed = parseFloat(this.value);
    document.getElementById("speed-value").textContent = speed + "x";

    if (!isStopped) {
        clearInterval(pendulumInterval);
        if (!isPaused) {
            pendulumInterval = setInterval(updatePendulum, 100 / speed);
        }
    }
});
document.getElementById("lengthSlider").addEventListener("input", function () {
    length = parseFloat(this.value) / 100;
    document.getElementById("lengthValue").textContent = length.toFixed(2);
    document.getElementById("measured-length").textContent = length.toFixed(2) + "m";
    time = 0; // Resetăm timpul pentru a evita erori de fază
    if (!isStopped) {
        clearInterval(pendulumInterval);
        pendulumInterval = setInterval(updatePendulum, 100 / speed);
    }
});

function toggleMeasuringTool() {
    measuringActive = !measuringActive;
    document.body.style.cursor = measuringActive ? "crosshair" : "default";
}

// document.getElementById("ball").addEventListener("mousemove", function() {
//     if (!measuringActive) return;
//     document.getElementById("measured-amplitude").textContent = amplitude + "cm";
//     document.getElementById("measured-speed").textContent = speed + "m/s";
//     document.getElementById("measured-angle").textContent = angle.toFixed(2) + "°";
//     document.getElementById("measured-angular-velocity").textContent = (angle * 0.1).toFixed(2) + "rad/s";
//     document.getElementById("measured-velocity").textContent = (speed * 0.1 * amplitude).toFixed(2) + "m/s";
//     document.getElementById("measured-acceleration").textContent = (-gravity * Math.sin(angle * Math.PI / 180)).toFixed(2) + "m/s²";
// });

document.getElementById("toggleSidebar").addEventListener("click", function() {
    let sidebar = document.querySelector(".sidebar");
    let screenWidth = window.innerWidth;
    sidebar.classList.toggle("hidden");
    if(screenWidth < 2350)
    {
    if (sidebar.classList.contains("hidden")) {
        this.style.right = "-6px";  // Butonul se lipește de marginea paginii
        this.textContent = "<";    // Simbol săgeată dreapta
    } else {
        this.style.right = "313px"; // Butonul revine lângă meniu
        this.textContent = ">";    // Simbol meniului
    }
    }
    else {
            if (sidebar.classList.contains("hidden")) {
                this.style.right = "-6px";  // Butonul se lipește de marginea paginii
                this.textContent = "<";    // Simbol săgeată dreapta
            } else {
                this.style.right = "510px"; // Butonul revine lângă meniu
                this.textContent = ">";    // Simbol meniului
            }
    }
});

document.getElementById("toggleUniformbar").addEventListener("click", function() {
    let uniformbar = document.querySelector(".unitform-container");
    uniformbar.classList.toggle("hidden");
    let screenWidth = window.innerWidth;
    if(screenWidth < 2350)
    {
    if (uniformbar.classList.contains("hidden")) {
        this.style.left = "-6px";  // Butonul se lipește de marginea paginii
        this.textContent = ">";    // Simbol săgeată dreapta
    } else {
        this.style.left = "333px"; // Butonul revine lângă meniu
        this.textContent = "<";    // Simbol meniului
    }
    }
    else 
    {
        if (uniformbar.classList.contains("hidden")) {
            this.style.left = "-6px";  // Butonul se lipește de marginea paginii
            this.textContent = ">";    // Simbol săgeată dreapta
        } else {
            this.style.left = "520px"; // Butonul revine lângă meniu
            this.textContent = "<";    // Simbol meniului
        }
    }
    
});
document.addEventListener("DOMContentLoaded", function () {
    const lengthSlider = document.getElementById("lengthSlider");
    const lengthValue = document.getElementById("lengthValue");
    const measuredLength = document.getElementById("measured-length");
    const betaSlider = document.getElementById("beta");
    const betavalue = document.getElementById("beta-value");
    const measuredbeta = document.getElementById("measured-beta");
 
    if (!lengthSlider || !lengthValue || !measuredLength) {
        console.error("Unul dintre elemente lipsește!");
        return;
    }

    let length = parseFloat(lengthSlider.value) / 100 || 1.5;
    let beta = parseFloat(betaSlider.value) / 100 || 1.5;
    lengthValue.textContent = length.toFixed(2) + "m";
    measuredLength.textContent = length.toFixed(2) + "m";
    betavalue.textContent = beta.toFixed(2) + "s^-1";
    measuredbeta.textContent = beta.toFixed(2) + "s^-1";
    function updatePendulumLength() {
        let newLength = parseFloat(lengthSlider.value) / 100 || 1.5;
        lengthValue.textContent = newLength.toFixed(2) + "m";
        measuredLength.textContent = newLength.toFixed(2) + "m";
        string.style.height = `${newLength * 100}px`;

        ball.style.top = `${newLength * 100}px`;
    }

    lengthSlider.addEventListener("input", updatePendulumLength);
});
window.onload = function() {
    let initialBeta = parseFloat(document.getElementById("beta").value) * 0.01;
    document.getElementById("beta-value").textContent = initialBeta.toFixed(2) + " s^-1";
    document.getElementById("measured-beta").textContent = initialBeta.toFixed(2) + " s^-1";
};
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const unitformBar = document.getElementById("unitformbar");
    const toggleSidebar = document.getElementById("toggleSidebar");
    const toggleUnitformBar = document.getElementById("toggleUnitformbar");

    toggleSidebar.addEventListener("click", function () {
        sidebar.classList.toggle("visible");
    });

    toggleUnitformBar.addEventListener("click", function () {
        unitformBar.classList.toggle("visible");
    });
});

function updateDistance() {
    const distInput = parseFloat(document.getElementById('dist').value) || 3;
    if (!isNaN(distInput)) {
        referencePoint.position.x = distInput;
        resetThreshold = distInput * 1.5;
        referenceText.position.x = distInput;
    }
}

// Calculează și afișează rezultatele
document.getElementById('calculateBtn').addEventListener('click', function () {
    updateSpeeds();
    const vp = parseFloat(document.getElementById('vp').value);
    const vs = parseFloat(document.getElementById('vs').value);
    const dist = parseFloat(document.getElementById('dist').value);
    // Verificăm dacă valorile sunt valide
    if (isNaN(vp) || isNaN(vs) || isNaN(dist)) {
        alert("Te rog completează toate câmpurile!");
        return;
    }
    if (vp <= vs) {
        alert("Viteza P (vp) trebuie să fie mai mare decât viteza S (vs).");
        return;
    }
    if (vp < 5 || vp > 10) {
        alert("Viteza P poate lua valori doar din intervalul 5 - 10 km/s.");
        return;
    }
    
    if (vs < 2 || vs > 5) {
        alert("Viteza S poate lua valori doar din intervalul 2 - 5 km/s.");
        return;
    }
    if(dist >= 10){
        alert("D nu ia valori mai mari de 10 km, pe desenul dat.");
        return;
    }
    // Afișăm rezultatele
    // document.getElementById('resultVp').textContent = vp + " m/s";
    // document.getElementById('resultVs').textContent = vs + " m/s";

    // document.getElementById('resultDist').textContent = dists + " km";

      // Calculăm timpii
      let t1 = dist / vp;
      let t2 = dist / vs;
      let dt = (dist * (vp - vs)) / (vp * vs);
      // Afișăm timpii calculați
      document.getElementById('t1output').textContent = t1.toFixed(2) + " secunde";
      document.getElementById('t2output').textContent = t2.toFixed(2) + " secunde";
      document.getElementById('dtoutput').textContent = dt.toFixed(2) + " secunde";
});

document.getElementById('dist').addEventListener('input', updateDistance);
// Inițializare scenă

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // Fundal alb
document.getElementById("scene-container").appendChild(renderer.domElement);

// Actualizare dimensiune la redimensionarea ferestrei
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
let referenceText;
// Functie pentru a adăuga text
function addText(text, position) {
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: 0.3,
            height: 0.001,
            curveSegments: 25,
        });

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Culoare text
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        textMesh.position.set(position.x, position.y, position.z); // Plasăm textul la poziția dată
        scene.add(textMesh);

        if (text === "Punct de Referinta") {
            referenceText = textMesh; 
        }
    });
}

addText("Epicentru", new THREE.Vector3(-0.1, -4.5, 1.4));  
addText("Hipocentru", new THREE.Vector3(0, -8, 0));  
addText("Punct de Referinta", new THREE.Vector3(3, -4.5, 0));  

// Dezactivăm scroll-ul implicit
document.body.style.overflow = "hidden";

// Plan (jumătatea de jos a ecranului)
const groundGeometry = new THREE.PlaneGeometry(20, 10); // Planul mai mare
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x74b72e, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -5; // Lăsăm planul mai jos
ground.rotation.x = -Math.PI / 2; // Plan orizontal
scene.add(ground);

// Plan de fundal (puțin mai jos)
const backgroundGroundGeometry = new THREE.PlaneGeometry(20, 10, 10, 10); // Dimensiuni plan
const backgroundGroundMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513, side: THREE.DoubleSide }); // Culoare maro
const backgroundGround = new THREE.Mesh(backgroundGroundGeometry, backgroundGroundMaterial);
backgroundGround.position.y = -8; // Plasăm planul de fundal mai jos decât primul
backgroundGround.rotation.x = -Math.PI / 2; // Asigurăm că este orizontal
scene.add(backgroundGround);

// Hipocentru (sub plan)
const hypocenter = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
hypocenter.position.set(0, -7, 0); // Plasăm hipocentrul mai jos
scene.add(hypocenter);

// Epicentru (deasupra planului)
const epicenter = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
epicenter.position.set(0, -4.9, 0); // Plasăm epicentrul mai sus
scene.add(epicenter);

// Punct de referință (fix deasupra planului)
const referencePoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial({ color : 0x060000})
);
referencePoint.position.set(3, -4.9, 0);
scene.add(referencePoint);

// Unda P (paralelă cu planul)
const waveP = new THREE.Mesh(
    new THREE.RingGeometry(0.2, 0.3, 32),
    new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide })
);
waveP.rotation.x = -Math.PI / 2; // Așezăm inelul paralel cu planul
scene.add(waveP);

// Unda S (pe verticală, rotită 90° corect)
const waveS = new THREE.Mesh(
    new THREE.RingGeometry(0.2, 0.3, 32),
    new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide })
);
waveS.rotation.z = Math.PI / 2; // Corectăm rotația
scene.add(waveS);

// Setăm camera
camera.position.set(0, 2, 10); // Camera este mai jos pentru a privi sub plan
camera.lookAt(new THREE.Vector3(0, -8, 0));

// Variabile pentru unde
let wavePRadius = 0.2;
let waveSRadius = 0.2;
let resetThreshold = 3;
let vitezap = 0.01; 
let vitezas = 0.007;

function animate() {
    requestAnimationFrame(animate);

    // Propagare undă P (orizontală)
    wavePRadius += vitezap;
    if (wavePRadius >= referencePoint.position.x) wavePRadius = 0.2;
    waveP.geometry.dispose();
    waveP.geometry = new THREE.RingGeometry(wavePRadius, wavePRadius + 0.1, 32);
    waveP.position.set(0, -4.9, 0);

    // Propagare undă S (verticală, cu rotație corectă)
    waveSRadius += vitezas;
    if (waveSRadius >=  referencePoint.position.x) waveSRadius = 0.2;
    waveS.geometry.dispose();
    waveS.geometry = new THREE.RingGeometry(waveSRadius, waveSRadius + 0.1, 32);
    waveS.position.set(0, -4.9, 0);
    waveS.rotation.z = Math.PI / 2; // Corectăm rotația

    renderer.render(scene, camera);
}
function updateSpeeds() {
    const vpInput = parseFloat(document.getElementById('vp').value);
    const vsInput = parseFloat(document.getElementById('vs').value);

    if (!isNaN(vpInput) && vpInput > 0) {
        vitezap = vpInput * 0.002; // Ajustare scalată
    }
    if (!isNaN(vsInput) && vsInput > 0) {
        vitezas = vsInput * 0.002; // Ajustare scalată
    }
}
// let t1 = vitezap / dist;
// let t2 = vitezas / dist;
// function timeUpdate(){
//     const t1output = document.getElementById('t1').value;
//     const t2output = document.getElementById('t2').value;
//     // if(t1output > 0) t1 = t1output * dist;
//     // if(t2output > 0)t2 = t2output * dist;
// }
// document.getElementById('t1output').addEventListener('output', timeUpdate);
// document.getElementById('t2output').addEventListener('output', timeUpdate);
animate();


function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Actualizează ceasul la fiecare secundă
setInterval(updateClock, 1000);

// Afișează ora imediat ce pagina este încărcată
updateClock();

// Funcție pentru a adăuga mesaje în log
function addLog(message) {
  const logElement = document.getElementById("log");
  logElement.value += `${message}\n`; // Adaugă mesajul la sfârșitul logului
  logElement.scrollTop = logElement.scrollHeight; // Derulează automat la ultimul mesaj
}

// Exempel de utilizare a funcției addLog
addLog("In cazul acesta avem:");
addLog("x = A* sin(𝛚1 * t)           ,unde A = 10m, 𝛚1 = 3");
addLog("y = A*sin(𝛚2 * t  + π/2)     ,unde A = 10m, 𝛚2 = 6");
addLog("La A, t = 3, la B , t = 6, la C, t = 9, la D, t = 12 , iar la O, t = 0");

function addLog(message) {
  const logElement = document.getElementById("log");
  if (logElement) {
      logElement.value += `${message}\n`; // Adaugă mesajul la sfârșitul logului
      logElement.scrollTop = logElement.scrollHeight; // Derulează automat la ultimul mesaj
  } else {
      console.error("Elementul cu ID-ul 'log' nu a fost găsit!");
  }
}
createPointButton.addEventListener("click", () => {
    // Capturăm valorile înainte de a crea punctul
    const amplitudine = document.getElementById("amplitudineInput")?.value || "n/a";
    const omega1 = document.getElementById("omega1Input")?.value || "n/a";
    const omega2 = document.getElementById("omega2Input")?.value || "n/a";
    const time = document.getElementById("timeInput")?.value || "n/a";
    const unghiulinitial = document.getElementById("unghiulinitialInput")?.value || "n/a";
    const color = document.getElementById("colorInput")?.value || "#000000";
  
    // Adăugăm logurile înainte de resetare
    // addLog(`Date introduse: A = ${amplitudine} m, 𝛚1 = ${omega1} rad/s, 𝛚2 = ${omega2} rad/s, t = ${time} s, φ0 = ${unghiulinitial}°, culoare = ${color}`);
  
    // try {
    //   // Creăm punctul
    //   createPoint();
    //   addLog("Punct creat cu succes!");
    // } catch (error) {
    //   addLog(`Eroare la crearea punctului: ${error.message}`);
    // }
  });
  

  
  // Exempel de utilizare a funcției addLog
  addLog("In cazul acesta avem:");
  addLog("x = A* sin(𝛚1 * t)           ,unde A = 10m, 𝛚1 = 3");
  addLog("y = A*sin(𝛚2 * t  + π/2)     ,unde A = 10m, 𝛚2 = 6");
  addLog("La A, t = 3, la B , t = 6, la C, t = 9, la D, t = 12 , iar la O, t = 0");
  
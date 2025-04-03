document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    // Verifică dacă tema a fost salvată
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Schimbă tema";
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️ Schimbă tema";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "🌙 Schimbă tema";
            localStorage.setItem("theme", "light");
        }
    });
});

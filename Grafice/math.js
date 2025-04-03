document.addEventListener("DOMContentLoaded", () => {
    const inputFields = [
        "omega1Input",
        "omega2Input",
        "amplitudineInput",
        "timeInput",
        "time2Input",
        "unghiulinitialInput"
    ];

    inputFields.forEach(id => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.addEventListener("input", () => {
                const value = inputElement.value.trim().toLowerCase();
                if (value === "e") {
                    inputElement.value = Math.E.toFixed(2); // 2.71828
                } else if (value === "pi" || value === "π") {
                    inputElement.value = Math.PI.toFixed(2); // 3.14159
                }
                else if(value === "i2"){
                    inputElement.value = -1;
                }
            });
        }
    });
});
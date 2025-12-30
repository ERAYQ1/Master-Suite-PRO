class HealthMod {
    constructor() {
        const calcBtn = document.getElementById('calc-health');
        if (calcBtn) calcBtn.addEventListener('click', () => {
            const h = parseFloat(document.getElementById('h-height').value) / 100;
            const w = parseFloat(document.getElementById('h-weight').value);
            if (!h || !w) return;
            const bmi = w / (h * h);
            const bmiDisp = document.getElementById('h-bmi');
            if (bmiDisp) bmiDisp.innerText = bmi.toFixed(1);
            let s = "Normal", c = "#10b981";
            if (bmi < 18.5) { s = "Underweight"; c = "#38bdf8"; }
            else if (bmi >= 25 && bmi < 30) { s = "Overweight"; c = "#f59e0b"; }
            else if (bmi >= 30) { s = "Obese"; c = "#f43f5e"; }
            const el = document.getElementById('h-status');
            if (el) {
                el.innerText = s;
                el.style.color = c;
            }
        });
    }
}
new HealthMod();

class EquationsMod {
    constructor() {
        const solveBtn = document.getElementById('solve-eq');
        if (solveBtn) solveBtn.addEventListener('click', () => {
            const a = parseFloat(document.getElementById('eq-a').value);
            const b = parseFloat(document.getElementById('eq-b').value);
            const c = parseFloat(document.getElementById('eq-c').value);
            const res = document.getElementById('eq-result');
            if (a === 0) return res.innerHTML = "x = " + (-c / b).toFixed(2);
            const d = b * b - 4 * a * c;
            if (d < 0) res.innerHTML = "No Real Roots Found";
            else if (d === 0) res.innerHTML = "x = " + (-b / (2 * a)).toFixed(2);
            else res.innerHTML = `x1 = ${((-b + Math.sqrt(d)) / (2 * a)).toFixed(2)}<br>x2 = ${((-b - Math.sqrt(d)) / (2 * a)).toFixed(2)}`;
        });
    }
}
new EquationsMod();

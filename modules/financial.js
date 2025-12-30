class FinancialMod {
    constructor() {
        document.getElementById('calc-interest').addEventListener('click', () => {
            const p = parseFloat(document.getElementById('fin-principal').value);
            const r = parseFloat(document.getElementById('fin-rate').value) / 100;
            const y = parseFloat(document.getElementById('fin-years').value);
            if (isNaN(p) || isNaN(r) || isNaN(y)) return;
            const res = p * Math.pow(1 + r, y);
            document.getElementById('fin-total-val').innerText = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(res);
        });
    }
}
new FinancialMod();

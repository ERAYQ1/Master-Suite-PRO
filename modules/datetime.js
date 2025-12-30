class DateMod {
    constructor() {
        const now = new Date().toISOString().split('T')[0];
        const dStart = document.getElementById('date-start');
        const dEnd = document.getElementById('date-end');
        if (dStart) dStart.value = now;
        if (dEnd) dEnd.value = now;
        const calcBtn = document.getElementById('calc-date-diff');
        if (calcBtn) calcBtn.addEventListener('click', () => {
            const d1 = new Date(dStart.value);
            const d2 = new Date(dEnd.value);
            const diff = Math.abs(d2 - d1) / (1000 * 60 * 60 * 24);
            const res = document.getElementById('date-result');
            if (res) res.innerText = `Difference: ${diff} Days`;
        });
    }
}
new DateMod();

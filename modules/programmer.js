class ProgMod {
    constructor() {
        this.rows = document.querySelectorAll('.prog-row input');
        this.init();
    }
    init() {
        this.rows.forEach(r => r.addEventListener('input', e => this.convert(e.target.parentElement.dataset.base, e.target.value)));
    }
    convert(base, val) {
        try {
            const n = BigInt(base === '16' ? '0x' + val : base === '8' ? '0o' + val : base === '2' ? '0b' + val : val);
            this.rows.forEach(r => {
                const b = parseInt(r.parentElement.dataset.base);
                if (b.toString() !== base) r.value = n.toString(b).toUpperCase();
            });
        } catch { }
    }
}
new ProgMod();

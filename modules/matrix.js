class MatrixModule {
    constructor() {
        this.size = 2;
        this.container = document.getElementById('matrix-inputs');
        this.resBox = document.getElementById('matrix-result');
        this.init();
    }
    init() {
        const sizeSel = document.getElementById('matrix-size');
        if (sizeSel) sizeSel.addEventListener('change', (e) => {
            this.size = parseInt(e.target.value);
            this.render();
        });
        const calcDet = document.getElementById('calc-matrix-det');
        if (calcDet) calcDet.addEventListener('click', () => this.calculate('det'));
        const calcInv = document.getElementById('calc-matrix-inv');
        if (calcInv) calcInv.addEventListener('click', () => this.calculate('inv'));
        this.render();
    }
    render() {
        if (!this.container) return;
        this.container.innerHTML = "";
        this.container.className = `matrix-grid-input grid-${this.size}x${this.size}`;
        for (let i = 0; i < this.size * this.size; i++) {
            const input = document.createElement('input');
            input.type = "number"; input.value = "0";
            this.container.appendChild(input);
        }
    }
    getValues() {
        const inputs = this.container.querySelectorAll('input');
        const vals = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const matrix = [];
        for (let i = 0; i < this.size; i++) matrix.push(vals.slice(i * this.size, (i + 1) * this.size));
        return matrix;
    }
    calculate(type) {
        const m = this.getValues();
        let res = "";
        if (type === 'det') {
            const det = this.size === 2 ? (m[0][0] * m[1][1] - m[0][1] * m[1][0]) : this.det3x3(m);
            res = `Determinant: ${det}`;
        } else {
            const inv = this.size === 2 ? this.inv2x2(m) : this.inv3x3(m);
            res = typeof inv === 'string' ? inv : this.formatMatrix(inv);
        }
        if (this.resBox) this.resBox.innerHTML = res;
    }
    det3x3(m) {
        return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    }
    inv2x2(m) {
        const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
        if (det === 0) return "No Inverse Exists";
        return [[m[1][1] / det, -m[0][1] / det], [-m[1][0] / det, m[0][0] / det]];
    }
    inv3x3(m) {
        const det = this.det3x3(m);
        if (det === 0) return "No Inverse Exists";
        const adj = [];
        for (let i = 0; i < 3; i++) {
            adj[i] = [];
            for (let j = 0; j < 3; j++) {
                const sub = [];
                for (let r = 0; r < 3; r++) if (r !== i) sub.push(m[r].filter((_, c) => c !== j));
                adj[i][j] = ((i + j) % 2 === 0 ? 1 : -1) * (sub[0][0] * sub[1][1] - sub[0][1] * sub[1][0]);
            }
        }
        const res = [[], [], []];
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) res[i][j] = adj[j][i] / det;
        return res;
    }
    formatMatrix(m) {
        let h = '<div class="matrix-grid-input grid-' + this.size + 'x' + this.size + '">';
        m.forEach(row => row.forEach(v => h += `<span>${v.toFixed(2)}</span>`));
        return h + '</div>';
    }
}
new MatrixModule();

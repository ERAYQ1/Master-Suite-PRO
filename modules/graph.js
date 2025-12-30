class GraphPlotter {
    constructor() {
        this.canvas = document.getElementById('graph-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.input = document.getElementById('graph-expr');
        this.scale = 40; this.offX = 0; this.offY = 0;
        this.init();
    }
    init() {
        window.addEventListener('resize', () => this.resize());
        document.getElementById('draw-graph').addEventListener('click', () => this.draw());
        document.getElementById('export-graph').addEventListener('click', () => {
            const l = document.createElement('a'); l.download = 'graph.png'; l.href = this.canvas.toDataURL(); l.click();
        });
        this.canvas.addEventListener('mousedown', e => { this.drag = true; this.lx = e.clientX; this.ly = e.clientY; });
        window.addEventListener('mousemove', e => {
            if (!this.drag) return;
            this.offX += e.clientX - this.lx; this.offY += e.clientY - this.ly;
            this.lx = e.clientX; this.ly = e.clientY; this.draw();
        });
        window.addEventListener('mouseup', () => this.drag = false);
        this.canvas.addEventListener('wheel', e => {
            e.preventDefault(); const d = e.deltaY > 0 ? 0.9 : 1.1; this.scale *= d;
            this.scale = Math.max(5, Math.min(this.scale, 2000));
            document.getElementById('zoom-val').innerText = Math.round(this.scale / 40 * 100) + "%";
            this.draw();
        });
        this.resize();
    }
    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        if (!this.offX) { this.offX = this.canvas.width / 2; this.offY = this.canvas.height / 2; }
        this.draw();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        const expr = this.input.value; if (!expr) return;
        this.ctx.strokeStyle = '#38bdf8'; this.ctx.lineWidth = 2.5; this.ctx.beginPath();
        let first = true;
        for (let i = 0; i < this.canvas.width; i++) {
            const x = (i - this.offX) / this.scale;
            try {
                const s = expr.replace(/sin|cos|tan|log|sqrt|abs/g, m => `Math.${m}${m === 'log' ? '10' : ''}`).replace(/\^/g, '**');
                const y = new Function('x', `return ${s}`)(x);
                if (!Number.isFinite(y)) { first = true; continue; }
                const cy = this.offY - (y * this.scale);
                if (first) { this.ctx.moveTo(i, cy); first = false; } else this.ctx.lineTo(i, cy);
            } catch { first = true; }
        }
        this.ctx.stroke();
    }
    drawGrid() {
        const s = this.scale; this.ctx.strokeStyle = '#1e293b'; this.ctx.lineWidth = 1;
        for (let x = this.offX % s; x < this.canvas.width; x += s) { this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.canvas.height); this.ctx.stroke(); }
        for (let y = this.offY % s; y < this.canvas.height; y += s) { this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.canvas.width, y); this.ctx.stroke(); }
        this.ctx.strokeStyle = '#475569'; this.ctx.lineWidth = 1.5;
        this.ctx.beginPath(); this.ctx.moveTo(0, this.offY); this.ctx.lineTo(this.canvas.width, this.offY); this.ctx.stroke();
        this.ctx.beginPath(); this.ctx.moveTo(this.offX, 0); this.ctx.lineTo(this.offX, this.canvas.height); this.ctx.stroke();
    }
}
window.graphModule = new GraphPlotter();

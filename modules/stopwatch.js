class ChronoMod {
    constructor() {
        this.time = 0; this.timer = null;
        this.disp = document.getElementById('stopwatch-display');
        this.laps = document.getElementById('sw-laps');
        this.init();
    }
    init() {
        document.getElementById('sw-start').addEventListener('click', e => this.toggle(e.target));
        document.getElementById('sw-lap').addEventListener('click', () => this.addLap());
        document.getElementById('sw-reset').addEventListener('click', () => this.reset());
    }
    toggle(btn) {
        if (this.timer) { clearInterval(this.timer); this.timer = null; btn.innerText = "Start"; document.getElementById('sw-lap').disabled = true; }
        else {
            btn.innerText = "Pause"; document.getElementById('sw-lap').disabled = false;
            this.timer = setInterval(() => { this.time += 10; this.update(); }, 10);
        }
    }
    reset() {
        clearInterval(this.timer); this.timer = null; this.time = 0; this.update();
        this.laps.innerHTML = ""; document.getElementById('sw-start').innerText = "Start";
    }
    update() {
        const ms = this.time % 1000, s = Math.floor(this.time / 1000) % 60, m = Math.floor(this.time / 60000) % 60, h = Math.floor(this.time / 3600000);
        const f = (n, l = 2) => String(n).padStart(l, '0');
        this.disp.innerHTML = `${f(h)}:${f(m)}:${f(s)}.<small>${f(ms, 3)}</small>`;
    }
    addLap() {
        const div = document.createElement('div'); div.className = 'lap-item';
        div.innerHTML = `<span>Lap ${this.laps.children.length + 1}</span> <b>${this.disp.innerText}</b>`;
        this.laps.prepend(div);
    }
}
new ChronoMod();

/**
 * Master Suite v3.9 - Titanium Logic Engine
 * Focused on rock-solid stability and zero-latency execution.
 */
class AppController {
    constructor() {
        this.activeMode = 'calculator';
        this.init();
    }

    init() {
        // High-priority component binding
        this.calculator = new window.CalculatorModule(this);
        this.bindGlobalEvents();
        this.setupKeyboard();
    }

    bindGlobalEvents() {
        // Mode switch triggers
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => this.switchMode(item.dataset.mode));
        });

        // Global Action Center
        const actions = {
            'theme-quick-toggle': () => this.toggleTheme(),
            'copy-btn': () => this.copyResult(),
            'unit-toggle': () => this.toggleUnit(),
            'full-screen-btn': () => this.toggleFullScreen()
        };

        Object.entries(actions).forEach(([id, fn]) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', fn);
        });
    }

    switchMode(mode) {
        if (this.activeMode === mode) return;
        this.activeMode = mode;

        // UI Reflection
        document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.mode === mode));
        document.querySelectorAll('.mode-container').forEach(c => c.classList.toggle('active', c.id === `mode-${mode}`));

        // Header Update Logic
        const meta = {
            'calculator': ['Calculator', 'Scientific motor active.'],
            'converter': ['Converter', 'Universal unit scaling.'],
            'financial': ['Financial', 'Investment projection tool.'],
            'graph': ['Grapher', 'Real-time function plotting.'],
            'matrix': ['Matrix Solver', 'High-speed linear algebra.'],
            'equations': ['Equations', 'Quadratic root discovery.'],
            'programmer': ['Programmer', 'Multi-base integer conversion.'],
            'stopwatch': ['Stopwatch', 'Precise timing & intervals.'],
            'password': ['Security', 'Entropy-based key generation.'],
            'health': ['Health Profile', 'Vitals and BMI analysis.'],
            'datetime': ['Span Calculator', 'Chronological difference.'],
            'settings': ['Customization', 'Aesthetic parameters.']
        };

        const [title, desc] = meta[mode] || [mode, ''];
        document.getElementById('current-mode-title').innerText = title;
        document.getElementById('mode-description').innerText = desc;

        // Force Refresh for Canvas Modules
        if (mode === 'graph' && window.graphModule) {
            setTimeout(() => window.graphModule.resize(), 30);
        }

        this.feedback();
    }

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        const icon = document.querySelector('#theme-quick-toggle i');
        icon.className = document.body.classList.contains('light-mode') ? 'fas fa-sun' : 'fas fa-moon';
        this.feedback();
    }

    toggleUnit() {
        this.calculator.engine.isRadian = !this.calculator.engine.isRadian;
        document.getElementById('unit-toggle').innerText = this.calculator.engine.isRadian ? 'RAD' : 'DEG';
        this.feedback();
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    }

    feedback() {
        const sound = document.getElementById('click-sound');
        if (sound) { sound.currentTime = 0; sound.play().catch(() => { }); }
    }

    copyResult() {
        let val = "";
        const m = this.activeMode;
        if (m === 'calculator') val = this.calculator.currentInput;
        else if (m === 'converter') val = document.getElementById('convert-to-val').value;
        else if (m === 'password') val = document.getElementById('pass-val').value;

        if (val) {
            navigator.clipboard.writeText(val);
            const t = document.getElementById('toast');
            t.classList.add('show');
            setTimeout(() => t.classList.remove('show'), 1500);
        }
    }

    setupKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (this.activeMode !== 'calculator') return;
            const k = e.key;
            if (/[0-9]/.test(k)) this.calculator.appendNum(k);
            if (k === '.') this.calculator.appendNum('.');
            if (['+', '-', '*', '/'].includes(k)) this.calculator.addOperator(k);
            if (k === 'Enter') this.calculator.calculate();
            if (k === 'Backspace') this.calculator.deleteLast();
        });
    }
}
document.addEventListener('DOMContentLoaded', () => { window.app = new AppController(); });

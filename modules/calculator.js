class CalculatorEngine {
    constructor() { this.isRadian = false; }
    evaluate(expression) {
        try {
            let expr = expression.replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E').replace(/\^/g, '**');
            const fnExpr = expr.replace(/sin|cos|tan|log|sqrt|abs/g, m => `Math.${m}${m === 'log' ? '10' : ''}`);
            const result = new Function(`return ${fnExpr}`)();
            return Number.isFinite(result) ? result : "Error";
        } catch { return "Error"; }
    }
}
class CalculatorModule {
    constructor(controller) {
        this.controller = controller;
        this.engine = new CalculatorEngine();
        this.currentInput = "0";
        this.prevOp = "";
        this.memory = 0;
        this.init();
    }
    init() {
        document.querySelectorAll('.btn.num').forEach(b => b.addEventListener('click', () => this.appendNum(b.dataset.num)));
        document.querySelectorAll('.btn.operator').forEach(b => b.addEventListener('click', () => this.addOperator(b.dataset.op)));
        document.querySelectorAll('.btn.scientific').forEach(b => b.addEventListener('click', () => this.addScientific(b.dataset.sci)));
        document.querySelectorAll('.btn.memory').forEach(b => b.addEventListener('click', () => this.handleMemory(b.dataset.mem)));
        document.querySelectorAll('.btn.func').forEach(b => b.addEventListener('click', () => {
            const act = b.dataset.action;
            if (act === 'clear-all') this.clearAll();
            if (act === 'delete') this.deleteLast();
        }));
        document.querySelector('.btn.equals').addEventListener('click', () => this.calculate());
        document.querySelectorAll('.const-btn').forEach(b => b.addEventListener('click', () => {
            this.currentInput = b.dataset.val;
            this.updateDisplay();
        }));
        const clearHist = document.getElementById('clear-history');
        if (clearHist) clearHist.addEventListener('click', () => {
            document.getElementById('history-list').innerHTML = "";
        });
    }
    appendNum(n) {
        if (this.currentInput === "0" && n !== ".") this.currentInput = n;
        else if (!(n === "." && this.currentInput.includes("."))) this.currentInput += n;
        this.updateDisplay();
    }
    addOperator(op) {
        const last = this.currentInput.slice(-1);
        if (['+', '-', '*', '/'].includes(last)) this.currentInput = this.currentInput.slice(0, -1);
        this.currentInput += op;
        this.updateDisplay();
    }
    addScientific(type) {
        try {
            const val = parseFloat(this.currentInput);
            let res;
            const r = this.engine.isRadian ? 1 : Math.PI / 180;
            switch (type) {
                case 'sin': res = Math.sin(val * r); break;
                case 'cos': res = Math.cos(val * r); break;
                case 'tan': res = Math.tan(val * r); break;
                case 'sqrt': res = Math.sqrt(val); break;
                case 'abs': res = Math.abs(val); break;
                case 'log': res = Math.log10(val); break;
                case 'inv': res = 1 / val; break;
                case 'fact': res = this.factorial(val); break;
                case 'pi': this.currentInput = Math.PI.toString(); this.updateDisplay(); return;
                case 'rnd': this.currentInput = Math.random().toFixed(4); this.updateDisplay(); return;
                case 'pow': this.currentInput += "^"; this.updateDisplay(); return;
                case 'bracket-open': this.currentInput = (this.currentInput === "0") ? "(" : this.currentInput + "("; this.updateDisplay(); return;
                case 'bracket-close': this.currentInput += ")"; this.updateDisplay(); return;
            }
            if (res !== undefined) this.currentInput = res.toString();
        } catch { this.currentInput = "Error"; }
        this.updateDisplay();
    }
    factorial(n) { if (n < 0) return "Error"; if (n === 0) return 1; let res = 1; for (let i = 2; i <= n; i++) res *= i; return res; }
    handleMemory(act) {
        const val = parseFloat(this.currentInput);
        if (act === 'mc') this.memory = 0;
        if (act === 'mr') this.currentInput = this.memory.toString();
        if (act === 'ms') this.memory = val;
        if (act === 'm-plus') this.memory += val;
        const mi = document.getElementById('mem-indicator');
        if (mi) mi.classList.toggle('active', this.memory !== 0);
        this.updateDisplay();
    }
    calculate() {
        const res = this.engine.evaluate(this.currentInput);
        this.addToHistory(this.currentInput, res);
        this.currentInput = res.toString();
        this.updateDisplay();
    }
    addToHistory(expr, res) {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `<span>${expr}</span><b>${res}</b>`;
        const list = document.getElementById('history-list');
        if (list) {
            list.prepend(item);
            if (list.children.length > 20) list.lastChild.remove();
        }
    }
    clearAll() { this.currentInput = "0"; this.updateDisplay(); }
    deleteLast() { this.currentInput = this.currentInput.length > 1 ? this.currentInput.slice(0, -1) : "0"; this.updateDisplay(); }
    updateDisplay() {
        const display = document.getElementById('current-display');
        if (display) display.innerText = this.currentInput;
    }
}
window.CalculatorModule = CalculatorModule;

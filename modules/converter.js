class UnitConverter {
    constructor() {
        this.units = {
            length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, inch: 0.0254, ft: 0.3048, mile: 1609.34 },
            weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495, ton: 1000 },
            temp: 'special',
            currency: { TRY: 1, USD: 0.034, EUR: 0.031, GBP: 0.026, JPY: 5.1 },
            area: { sq_m: 1, sq_km: 1e6, sq_cm: 1e-4, acre: 4046.86, hectare: 10000 },
            volume: { liter: 1, ml: 0.001, cubic_m: 1000, gallon: 3.78541 }
        };
        this.init();
    }
    init() {
        this.els = {
            type: document.getElementById('converter-type'),
            fromU: document.getElementById('convert-from-unit'),
            toU: document.getElementById('convert-to-unit'),
            fromV: document.getElementById('convert-from-val'),
            toV: document.getElementById('convert-to-val')
        };
        this.els.type.addEventListener('change', () => this.updateUnits());
        this.els.fromV.addEventListener('input', () => this.convert());
        this.els.fromU.addEventListener('change', () => this.convert());
        this.els.toU.addEventListener('change', () => this.convert());
        this.updateUnits();
    }
    updateUnits() {
        const type = this.els.type.value;
        const options = (type === 'temp') ? ['Celsius', 'Fahrenheit', 'Kelvin'] : Object.keys(this.units[type]);
        this.els.fromU.innerHTML = this.els.toU.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
        this.convert();
    }
    convert() {
        const type = this.els.type.value;
        const from = this.els.fromU.value;
        const to = this.els.toU.value;
        const val = parseFloat(this.els.fromV.value);
        if (isNaN(val)) return this.els.toV.value = "";
        let res;
        if (type === 'temp') res = this.convertTemp(val, from, to);
        else res = (val * this.units[type][from]) / this.units[type][to];
        this.els.toV.value = res < 0.0001 ? res.toExponential(4) : res.toFixed(6).replace(/\.?0+$/, '');
    }
    convertTemp(v, f, t) {
        let c = f === 'Celsius' ? v : f === 'Fahrenheit' ? (v - 32) * 5 / 9 : v - 273.15;
        return t === 'Celsius' ? c : t === 'Fahrenheit' ? c * 9 / 5 + 32 : c + 273.15;
    }
}
new UnitConverter();

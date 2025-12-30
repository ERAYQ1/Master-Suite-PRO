class PasswordMod {
    constructor() {
        this.val = document.getElementById('pass-val');
        this.len = document.getElementById('pass-len');
        this.init();
    }
    init() {
        document.getElementById('gen-pass').addEventListener('click', () => this.generate());
        this.len.addEventListener('input', e => document.getElementById('pass-len-val').innerText = e.target.value);
        document.getElementById('copy-pass').addEventListener('click', () => {
            navigator.clipboard.writeText(this.val.value);
        });
    }
    generate() {
        const c = {
            u: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", l: "abcdefghijklmnopqrstuvwxyz",
            n: "0123456789", s: "!@#$%^&*()_+-=[]{}|;:,.<>?"
        };
        let pool = "";
        if (document.getElementById('pass-upper').checked) pool += c.u;
        if (document.getElementById('pass-lower').checked) pool += c.l;
        if (document.getElementById('pass-num').checked) pool += c.n;
        if (document.getElementById('pass-sym').checked) pool += c.s;
        if (!pool) return this.val.value = "Seçim Yapın";
        let res = "";
        for (let i = 0; i < this.len.value; i++) res += pool[Math.floor(Math.random() * pool.length)];
        this.val.value = res;
    }
}
new PasswordMod();

class SettingsMod {
    constructor() {
        this.root = document.documentElement;
        this.init();
    }
    init() {
        document.getElementById('set-accent').addEventListener('input', e => {
            this.root.style.setProperty('--accent-color', e.target.value);
            this.root.style.setProperty('--accent-glow', e.target.value + '66'); // 40% opacity in hex
        });
        document.getElementById('set-blur').addEventListener('input', e => {
            this.root.style.setProperty('--glass-blur', e.target.value + 'px');
        });
        document.getElementById('set-opacity').addEventListener('input', e => {
            this.root.style.setProperty('--card-bg', `rgba(13, 17, 23, ${e.target.value})`);
        });
        document.getElementById('reset-settings').addEventListener('click', () => {
            this.root.style.removeProperty('--accent-color');
            this.root.style.removeProperty('--accent-glow');
            this.root.style.removeProperty('--glass-blur');
            this.root.style.removeProperty('--card-bg');
        });
    }
}
new SettingsMod();

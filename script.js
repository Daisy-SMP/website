const html = document.documentElement;
const icon = document.getElementById('theme-icon');

const sunPath = 'M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16.7.7M1 12h2m18 0h2M4.22 19.78l.7-.7M18.36 5.64l.7-.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z';
const moonPath = 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z';

function toggleTheme() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? '' : 'dark');
    icon.setAttribute('d', isDark ? moonPath : sunPath);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

if (localStorage.getItem('theme') === 'dark') {
    html.setAttribute('data-theme', 'dark');
    icon.setAttribute('d', sunPath);
}

function copyIni() {
    const text = document.getElementById('ini-content').textContent;

    navigator.clipboard.writeText(text)
        .then(() => flash('ini'))
        .catch(err => {
            console.error('Clipboard failed:', err);
        });
}

function copyArg() {
    const text = document.getElementById('java-arg').textContent.trim();
    navigator.clipboard.writeText(text).then(() => flash('arg'));
}

function flash(target) {
    const btns = document.querySelectorAll('.copy-btn');
    btns.forEach(b => {
        if ((target === 'ini' && b.getAttribute('onclick').includes('Ini')) ||
            (target === 'arg' && b.getAttribute('onclick').includes('Arg'))) {
            const orig = b.textContent;
            b.textContent = 'Copied!';
            setTimeout(() => b.textContent = orig, 1500);
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
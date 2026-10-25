document.getElementById('reset-btn').addEventListener('click', resetTheme);
function resetTheme() {
    localStorage.removeItem("theme");
    document.documentElement.removeAttribute('data-theme');

}

const themeOptions = [...document.getElementsByClassName("theme-option")];

let isChangingTheme = false;

themeOptions.forEach(themeOption => {
    themeOption.addEventListener('click', async () => {
        const theme = themeOption.dataset.themeContent;

        if (
            isChangingTheme ||
            document.documentElement.dataset.theme === theme
        ) {
            return;
        }

        isChangingTheme = true;

        try {
            await playThemeTransition(theme);
        } finally {
            isChangingTheme = false;
        }
    });
});

function playThemeTransition(theme, duration = 600) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');

        Object.assign(overlay.style, {
            position: 'fixed',
            inset: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffeded',
            zIndex: '99998',
            pointerEvents: 'none',
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: '0'
        });

        document.body.appendChild(overlay);

        // Force reflow so the initial opacity is registered
        void overlay.offsetWidth;

        // Fade in to cover the current theme
        overlay.style.opacity = '1';

        setTimeout(() => {
            // Change the theme while the screen is covered
            document.documentElement.dataset.theme = theme;
            localStorage.setItem('theme', theme);

            // Fade out to reveal the new theme
            overlay.style.opacity = '0';

            setTimeout(() => {
                overlay.remove();
                resolve();
            }, duration);
        }, duration);
    });
}
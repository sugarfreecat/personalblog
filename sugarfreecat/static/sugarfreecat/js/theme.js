import buttons from '/static/sugarfreecat/config/theme/buttons.json' with { type: 'json' };
import cursorList from '/static/sugarfreecat/config/theme/cursors.json' with { type: 'json' };
import backgroundList from '/static/sugarfreecat/config/theme/backgrounds.json' with { type: 'json' };
import borders from '/static/sugarfreecat/config/theme/borders.json' with { type: 'json' };
import defaults from '/static/sugarfreecat/config/theme/defaults.json' with { type: 'json' };
import configs from '/static/sugarfreecat/config/theme/configList.json' with { type: 'json' };

const galleries = [
    {
        property: 'cursor',
        items: cursorList,
    },
    {
        property: 'background',
        items: backgroundList,
    },
    {
        property: 'button',
        items: buttons,
        getValue: button => button.src,
        onSelect: button => applyPropertyStyle('button', button.attributes),
    },
    {
        property: 'border',
        items: borders,
        getValue: border => border.src,
        onSelect: border => applyPropertyStyle('border', border.attributes),
    }
];

galleries.forEach(config => {
    const gallery = document.getElementById(`${config.property}-gallery`);

    renderGallery({
        ...config,
        gallery,
    });
});

function renderGallery({
    property, 
    items, 
    gallery, 
    getValue = item => item, 
    onSelect = () => {} 
}) {
    if (!items || !gallery) return;

    items.forEach((item, index) => {
        const img = document.createElement('img');

        img.src = `/static/sugarfreecat/images/${getValue(item)}`;
        img.alt = `${property} option ${index + 1}`;
        img.classList.add(`${property}-option`);

        img.addEventListener('click', () => {
            document.body.style.setProperty(`--custom-${property}`, `url('${img.src}')`);
            localStorage.setItem(`--custom-${property}`, `url('${img.src}')`);
            onSelect(item);
        });

        gallery.appendChild(img);
    });
}

function applyPropertyStyle(property, configs) {
    const DEFAULTS = { ...defaults[property] };

    if (configs) {
        Object.assign(DEFAULTS, configs);
    }

    for (const [key, value] of Object.entries(DEFAULTS)) {
        document.body.style.setProperty(key, value);
        localStorage.setItem(key, value);
    }

}

document.getElementById('reset-btn').addEventListener('click', resetTheme);
function resetTheme() {
    // configs.forEach(property => {
    //     document.body.style.removeProperty(property);
    //     localStorage.removeItem(property);
    // });
    localStorage.removeItem("theme");
    document.documentElement.removeAttribute('data-theme');

}


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

// NEW THEME ADDITION


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

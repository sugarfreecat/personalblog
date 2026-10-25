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

// NEW THEME ADDITION

const themeOptions = [...document.getElementsByClassName("theme-option")];

themeOptions.forEach(themeOption => {
    themeOption.addEventListener('click', () => {
        document.documentElement.dataset.theme = themeOption.dataset.themeContent;
        localStorage.setItem("theme", themeOption.dataset.themeContent);
    })
})
const configs = {
    "--custom-cursor": "--custom-cursor",
    "--custom-background": "--custom-background",
    "--custom-button": "--custom-button",
    "--tab-text-padding-right": "--tab-text-padding-right",
    "--tab-text-padding-bottom": "--tab-text-padding-bottom",
    "--tab-justify-content": "--tab-justify-content",
    "--tab-text-padding-top": "--tab-text-padding-top",
    "--tab-text-padding-left": "--tab-text-padding-left",
    "--tab-button-width": "--tab-button-width"
}

const imageConfigs = [
    "--custom-cursor",
    "--custom-background",
    "--custom-button"
];

for (const [key, cssVariable] of Object.entries(configs)) {
const storedValue = localStorage.getItem(key);

    if (storedValue) {
        const value = imageConfigs.includes(key)
            ? `url('${storedValue}')`
            : storedValue;
            
        document.body.style.setProperty(cssVariable, value);
    }
}
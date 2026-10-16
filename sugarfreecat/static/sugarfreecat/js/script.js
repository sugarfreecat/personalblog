import configs from '/static/sugarfreecat/config/theme/configList.json' with { type: 'json' };

for (const config of configs) {
    const storedValue = localStorage.getItem(config);
    console.log(config, storedValue);

    if (storedValue) {
        document.body.style.setProperty(config, storedValue);
    }
}
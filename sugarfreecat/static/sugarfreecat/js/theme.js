// criar arquivos json com as listas e/ou objetos

const cursorList = [
    'cursor.png',
    'cursor2.webp',
    'cursor3.webp',
    'cursor4.webp',
    'cursor5.png',
    'cursor6.webp',
    'cursor7.webp',
    'cursor8.webp',
    'cursor9.webp',
    'cursor10.png',
    'cursor11.png',
    'cursor12.webp',
    'cursor13.png',
    'cursor14.webp',
    'cursor15.webp',
    'cursor16.webp',
    'cursor17.webp',
    'cursor18.gif',
    'cursor19.gif',
    'cursor20.gif',
    'cursor21.gif',
    'cursor22.png',
    'cursor23.gif',
    'cursor24.gif',
    'cursor25.png',
    'cursor26.png',
    'cursor27.png',
    'cursor28.png',
    'cursor29.gif',
    'cursor30.gif',
    'cursor31.png',
]

const cursorGallery = document.getElementById('cursor-gallery');

cursorList.forEach((cursorSrc, index) => {
    changeProperty('cursor', cursorSrc, index, cursorGallery);
});

const backgroundList = [
    'background.png',
    'background2.png',
    'background3.png',
    'background4.png',
    'background5.png',
    'background6.png',
    'background7.png',
    'background8.png',
    'background9.png',
    'background10.png',
    'background11.png',
    'background12.png',
    'background13.png',
    'background14.png',
    'background15.png',
    'background16.png',
    'background17.png',
    'background18.png',
]
const backgroundGallery = document.getElementById('background-gallery');
backgroundList.forEach((backgroundSrc, index) => {
    changeProperty('background', backgroundSrc, index, backgroundGallery);
});

function changeProperty(property, value, index, parentElement, buttonConfigs = null) {
    const img = document.createElement('img');

    img.src = `/static/sugarfreecat/images/${value}`;
    img.alt = `${property} option ${index + 1}`;
    img.classList.add(`${property}-option`);

    img.addEventListener('click', () => {
        document.body.style.setProperty(`--custom-${property}`, `url('${img.src}')`);
        localStorage.setItem(`--custom-${property}`, img.src);
        if (property === 'button') checkButton(buttonConfigs);
    });

    parentElement.appendChild(img);
}

const buttons = [
    { src: 'button.png', attributes: { '--tab-text-padding-bottom': '10px', '--tab-button-width': '110px' } },
    { src: 'button2.gif', attributes: { '--tab-text-padding-right': '12px', '--tab-justify-content': 'flex-end' } },
    { src: 'button3.gif', attributes: { '--tab-text-padding-top': '8px' } },
    { src: 'button4.gif', attributes: { '--tab-text-padding-top': '5px' } },
    { src: 'button5.png' },
    { src: 'button6.png' },
    { src: 'button7.gif', attributes: { '--tab-justify-content': 'flex-end', '--tab-text-padding-right': '6px' } },
    { src: 'button8.png', attributes: { '--tab-text-padding-left': '20px' } },
    { src: 'button9.gif' },
    { src: 'button10.gif', attributes: { '--tab-button-width': '100px', '--tab-text-padding-bottom': '5px' } },
    { src: 'button11.png', attributes: { '--tab-button-width': '110px' } },
    { src: 'button12.gif', attributes: { '--tab-text-padding-left': '20px' } },
    { src: 'button13.png', attributes: { '--tab-text-padding-left': '20px' } },
    { src: 'button14.png' },
    { src: 'button15.gif', attributes: { '--tab-text-padding-right': '15px' } },
    { src: 'button16.gif', attributes: { '--tab-text-padding-right': '20px', '--tab-text-padding-bottom': '5px' } },
    { src: 'button17.png' },
    { src: 'button18.gif', attributes: { '--tab-text-padding-bottom': '5px', '--tab-text-padding-top': '5px' } },
    { src: 'button19.gif', attributes: { '--tab-button-width': '110px' } },
];

const buttonGallery = document.getElementById('button-gallery');
buttons.forEach((button, index) => {
    changeProperty('button', button.src, index, buttonGallery, button.attributes);
});

function checkButton(buttonConfigs) {
    let configs = {
        "--tab-text-padding-right": "0",
        "--tab-text-padding-top": "0",
        "--tab-justify-content": "center",
        "--tab-text-padding-bottom": "0",
        "--tab-text-padding-left": "0",
        "--tab-button-width": "90px"
    }

    if (buttonConfigs) {
        Object.assign(configs, buttonConfigs);
    }

    for (const [key, value] of Object.entries(configs)) {
        document.body.style.setProperty(key, value);
        localStorage.setItem(key, value);
    }
}
// criar arquivos json com as listas e/ou objetos

cursorList = [
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

function changeProperty(property, value, index, parentElement) {
    const img = document.createElement('img');

    img.src = `/static/sugarfreecat/images/${value}`;
    img.alt = `${property} option ${index + 1}`;
    img.classList.add(`${property}-option`);

    img.addEventListener('click', () => {
        document.body.style.setProperty(`--custom-${property}`, `url('${img.src}')`);
        localStorage.setItem(`--custom-${property}`, img.src);
        if (property === 'button') checkButton(value);
    });

    parentElement.appendChild(img);
}

const buttonList = [
    'button.png',
    'button2.gif',
    'button3.gif',
    'button4.gif',
    'button5.png',
    'button6.png',
    'button7.gif',
    'button8.png',
    'button9.gif',
    'button10.gif',
    'button11.png',
    'button12.gif',
    'button13.png',
    'button14.png',
    'button15.gif',
    'button16.gif',
    'button17.png',
    'button18.gif',
    'button19.gif',
]

// mudar buttonList para o formato a seguir
// const buttons = [
//     {"src": "button.png", "attributes": {"--tab-text-padding-bottom": "10px"}},
// ]

const buttonGallery = document.getElementById('button-gallery');
buttonList.forEach((buttonSrc, index) => {
    changeProperty('button', buttonSrc, index, buttonGallery);
});

function checkButton(buttonSrc) {
    let configs = {
        "--tab-text-padding-right": "0",
        "--tab-text-padding-top": "0",
        "--tab-justify-content": "center",
        "--tab-text-padding-bottom": "0",
        "--tab-text-padding-left": "0",
        "--tab-button-width": "90px"
    }

    // checar se attributes tem itens
    // se tiver, iterar por todos e aplicar as propriedades ao objeto configs
    // const button = buttons.find(b => b.src === buttonSrc);
    // if (button && button.attributes) {
    //     for (const [key, value] of Object.entries(button.attributes)) {
    //         configs[key] = value;
    //     }
    // }

    if (buttonSrc === 'button2.gif') {
        configs['--tab-text-padding-right'] = '12px';
        configs['--tab-justify-content'] = 'flex-end';
    } else if (buttonSrc === 'button3.gif') {
        configs['--tab-text-padding-top'] = '8px';

    } else if (buttonSrc === 'button.png') {
        configs['--tab-text-padding-bottom'] = '10px';
    } else if (buttonSrc === 'button4.gif') {
        configs['--tab-text-padding-top'] = '5px';
    } else if (buttonSrc === 'button7.gif') {
        configs['--tab-justify-content'] = 'flex-end';
        configs['--tab-text-padding-right'] = '6px';
    } else if (buttonSrc === 'button8.png') {
        configs['--tab-text-padding-left'] = '20px';
    } else if (buttonSrc === 'button10.gif') {
        configs['--tab-button-width'] = '100px';
        configs['--tab-text-padding-bottom'] = '5px';
    } else if (buttonSrc === 'button11.png') {
        configs['--tab-button-width'] = '110px';
    }

    for (const [key, value] of Object.entries(configs)) {
        document.body.style.setProperty(key, value);
        localStorage.setItem(key, value);
    }
}
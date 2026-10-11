cursorList = [
    'sugarfreecat/images/cursor.png',
    'sugarfreecat/images/cursor2.webp',
    'sugarfreecat/images/cursor3.webp',
    'sugarfreecat/images/cursor4.webp',
    'sugarfreecat/images/cursor5.png',
    'sugarfreecat/images/cursor6.webp',
    'sugarfreecat/images/cursor7.webp',
    'sugarfreecat/images/cursor8.webp',
    'sugarfreecat/images/cursor9.webp',
    'sugarfreecat/images/cursor10.png',
    'sugarfreecat/images/cursor11.png',
    'sugarfreecat/images/cursor12.webp',
    'sugarfreecat/images/cursor13.png',
    'sugarfreecat/images/cursor14.webp',
    'sugarfreecat/images/cursor15.webp',
    'sugarfreecat/images/cursor16.webp',
    'sugarfreecat/images/cursor17.webp',
    'sugarfreecat/images/cursor18.gif',
    'sugarfreecat/images/cursor19.gif',
    'sugarfreecat/images/cursor20.gif',
    'sugarfreecat/images/cursor21.gif',
    'sugarfreecat/images/cursor22.png',
    'sugarfreecat/images/cursor23.gif',
    'sugarfreecat/images/cursor24.gif',
    'sugarfreecat/images/cursor25.png',
    'sugarfreecat/images/cursor26.png',
    'sugarfreecat/images/cursor27.png',
    'sugarfreecat/images/cursor28.png',
    'sugarfreecat/images/cursor29.gif',
    'sugarfreecat/images/cursor30.gif',
    'sugarfreecat/images/cursor31.png',
]

const cursorGallery = document.getElementById('cursor-gallery');

cursorList.forEach((cursorSrc, index) => {
    const img = document.createElement('img');

    img.src = `/static/${cursorSrc}`;
    img.alt = `cursor option ${index + 1}`;
    img.classList.add('cursor-option');

    img.addEventListener('click', () => {
        document.body.style.setProperty('--custom-cursor', `url('${img.src}')`);
        localStorage.setItem('selectedCursor', img.src);
    });

    cursorGallery.appendChild(img);
});
const selectedCursor = localStorage.getItem('selectedCursor');
if (selectedCursor) {
    document.body.style.setProperty('--custom-cursor', `url('${selectedCursor}')`);
}
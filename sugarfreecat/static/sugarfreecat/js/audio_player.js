const audioPlayer = document.getElementById("audio-player");
const slider = document.getElementById("progress-slider");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

let isSeeking = false;

// Helper function to format seconds into MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Play button logic
document.getElementById("play-button").addEventListener("click", function() {
    document.getElementById("play-button").style.display = "none";
    document.getElementById("pause-button").style.display = "block";
    audioPlayer.play();
});

// Pause button logic
document.getElementById("pause-button").addEventListener("click", function() {
    document.getElementById("play-button").style.display = "block";
    document.getElementById("pause-button").style.display = "none";
    audioPlayer.pause();
});

// Repeat logic
document.getElementById("repeat-button").addEventListener("click", function() {
    document.getElementById("repeat-button").style.display = "none";
    document.getElementById("repeat-toggled-button").style.display = "block";
    audioPlayer.loop = true; // Loop enabled
});

document.getElementById("repeat-toggled-button").addEventListener("click", function() {
    document.getElementById("repeat-button").style.display = "block";
    document.getElementById("repeat-toggled-button").style.display = "none";
    audioPlayer.loop = false; // Loop disabled
});

// Function to visually update the slider's gradient progress track
function updateSliderVisuals(value) {
    slider.style.background = `linear-gradient(to right, rgb(113, 17, 60) 0%, rgb(113, 17, 60) ${value}%, rgb(174, 111, 149) ${value}%, rgb(174, 111, 149) 100%)`;
}

// Load track metadata (gets correct total track time)
audioPlayer.addEventListener("loadedmetadata", () => {
    slider.max = Math.floor(audioPlayer.duration);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});

// Handle track playing progress update
audioPlayer.addEventListener("timeupdate", () => {
    if (!isSeeking) {
        slider.value = Math.floor(audioPlayer.currentTime);
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        
        // Calculate percentage for visual fill
        const pct = (slider.value / slider.max) * 100 || 0;
        updateSliderVisuals(pct);
    }
});

slider.addEventListener("input", () => {
    isSeeking = true;

    const value = Number(slider.value);
    currentTimeDisplay.textContent = formatTime(value);

    const pct = (value / Number(slider.max)) * 100 || 0;
    updateSliderVisuals(pct);
});

slider.addEventListener("change", () => {
    const targetTime = Number(slider.value);

    try {
        audioPlayer.currentTime = targetTime;
    } catch (error) {
        console.error("Seek error:", error);
    }
});
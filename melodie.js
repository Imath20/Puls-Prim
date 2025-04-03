function toggleAudio() {
    const audio = document.querySelector('audio');
    const button = document.querySelector('.audio-toggle-button');
    const icon = document.querySelector('#audio-icon'); // Găsește elementul <img>
    if (audio.paused) {
        audio.play();
        icon.src = "res/Speaker.png";
    } else {
        audio.pause();
        icon.src = "res/no-sound.png";
    }
}

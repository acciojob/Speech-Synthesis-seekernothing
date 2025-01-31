// Your script here.
msg.text = document.querySelector('[name="text"]').value;

// Function to populate voices dropdown
function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

// Function to set the voice
function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

// Function to toggle speech
function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        msg.text = document.querySelector('[name="text"]').value;
        speechSynthesis.speak(msg);
    }
}

// Function to set option
function setOption() {
    msg[this.name] = this.value;
    toggle();
}

// Event Listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
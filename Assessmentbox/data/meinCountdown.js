class MeinCountdown extends HTMLElement {
  constructor() {
    super();
    this.interval;
    this.initialZeit = parseInt(this.getAttribute("zeit")) || 20;
    this.zeit = this.initialZeit;
    this.soundDauer = parseFloat(this.getAttribute("sound-dauer")) || 0.5; // Standardmäßig 0.5 Sekunden

    // Erzeugen Sie einen AudioContext
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

    this.playing = false;
  }

  connectedCallback() {
    this.innerHTML = `
        <div>
          <input id="countdownAnzeige" value="${this.zeit}" readonly></input>
          <button id="startStop">Start</button>
        </div>
      `;

    this.startStopButton = this.querySelector("#startStop");
    this.countdownAnzeige = this.querySelector("#countdownAnzeige");

    this.startStopButton.addEventListener("click", () => this.toggleCountdown());
  }

  disconnectedCallback() {
    this.startStopButton.removeEventListener("click", () => this.toggleCountdown());
  
    // Stoppen Sie den Countdown, wenn das Element entfernt wird
    if (this.playing) {
      this.stopCountdown();
    }
  }

  toggleCountdown() {
    if (this.playing) {
      this.stopCountdown();
    } else {
      this.startCountdown();
    }
  }

  startCountdown() {
    this.startStopButton.textContent = "Stop";
    this.zeit = this.initialZeit;
    this.countdownAnzeige.value = this.zeit;
    this.buzzerSource = this.createBuzzerSound(); // Erstellen Sie eine neue Instanz für den nächsten Countdown
    this.playing = true;
    if (this.audioContext.state === 'suspended') this.audioContext.resume();
  
    this.interval = setInterval(() => {
      this.zeit--;
      this.countdownAnzeige.value = this.zeit;
  
      if (this.zeit <= 0) {
          this.buzzerSource.start();
          this.buzzerSource.stop(this.audioContext.currentTime + this.soundDauer);
          this.stopCountdown();
      }
    }, 1000);
  }
  

  stopCountdown() {
    clearInterval(this.interval);
    this.interval = null;
    this.startStopButton.textContent = "Start";
    this.countdownAnzeige.value = this.initialZeit;
    this.playing = false;
  }
  

  createBuzzerSound() {
    const sampleRate = this.audioContext.sampleRate;
    const duration = this.soundDauer; // Dauer des Buzzer-Sounds in Sekunden
    const frequency = 1000; // Frequenz des Buzzer-Sounds in Hz
  
    const frameCount = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);
  
    // Füllen Sie den Puffer mit dem Buzzer-Sound
    for (let i = 0; i < frameCount; i++) {
      data[i] = Math.sin((2 * Math.PI * frequency * i) / sampleRate);
    }
  
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
  
    return source;
  }
  
}

window.customElements.define("mein-countdown", MeinCountdown);

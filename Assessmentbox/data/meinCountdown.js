class MeinCountdown extends HTMLElement {
  constructor() {
    super();
    this.interval;
    this.initialZeit = parseInt(this.getAttribute("zeit")) || 20;
    this.zeit = this.initialZeit;
    this.soundDauer = parseFloat(this.getAttribute("sound-dauer")) || 0.5; // Standardmäßig 0.5 Sekunden
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
    
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  
    this.startStopButton.textContent = "Stop";
    this.zielZeit = Date.now() + this.initialZeit * 1000;
    
    this.buzzerSource = this.audioContext.createOscillator();
    this.buzzerSource.type = "sine";
    this.buzzerSource.frequency.setValueAtTime(1000, this.audioContext.currentTime); // Frequenz des Buzzers
    
    this.buzzerSource.connect(this.audioContext.destination);
  
    this.playing = true;
    if (this.audioContext.state === 'suspended') this.audioContext.resume();
  
    this.interval = setInterval(() => {
      let jetzt = Date.now();
      let verbleibendeZeit = this.zielZeit - jetzt;
  
      if (verbleibendeZeit <= 0) {
          this.buzzerSource.start();
          this.buzzerSource.stop(this.audioContext.currentTime + this.soundDauer);
          this.stopCountdown();
      } else {
          this.zeit = Math.ceil(verbleibendeZeit / 1000);
          this.countdownAnzeige.value = this.zeit;
      }
    }, 100); // Intervall auf 100 Millisekunden setzen
  }
  
  
  

  stopCountdown() {
    clearInterval(this.interval);
    this.interval = null;
    this.startStopButton.textContent = "Start";
    this.countdownAnzeige.value = this.initialZeit;
    this.playing = false;
  }
  
}

window.customElements.define("mein-countdown", MeinCountdown);

class MeinMetronom extends HTMLElement {
  constructor() {
    super();
    this.audioContext = null;
    this.oscillator = null;
    this.isRunning = false;
    this.takt = parseInt(this.getAttribute("takt")) || 1000; // Standardintervall in Millisekunden (1 Sekunde)
    this.handleStartStopClick = this.toggleMetronom.bind(this);
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <button id="startStop">Metronom Start</button>
      </div>
    `;

    this.startStopButton = this.querySelector("#startStop");
    this.startStopButton.addEventListener("click", this.handleStartStopClick);
  }

  disconnectedCallback() {
    this.startStopButton.removeEventListener("click", this.handleStartStopClick);
    this.stopMetronom();
  }

  toggleMetronom() {
    if (this.isRunning) {
      this.stopMetronom();
    } else {
      this.startMetronom();
    }
  }

  startMetronom() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Hier wird die Audioausgabe aktiviert, auch im Stummschaltungsmodus
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    this.startStopButton.textContent = "Metronom Stop";

    this.interval = setInterval(() => {
      this.oscillator = this.audioContext.createOscillator();
      this.oscillator.type = "sine";
      this.oscillator.frequency.value = 1000;
      this.oscillator.connect(this.audioContext.destination);
      this.oscillator.start();
      this.oscillator.stop(this.audioContext.currentTime + 0.05); // Stoppen Sie den Klick-Sound nach 50 ms
    }, this.takt);
  
    this.isRunning = true;
  }
  

  stopMetronom() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    clearInterval(this.interval);
    this.isRunning = false;
    this.startStopButton.textContent = "Metronom Start";
  }
} 

window.customElements.define("mein-metronom", MeinMetronom);

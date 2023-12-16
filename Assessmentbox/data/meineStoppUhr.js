class MeineStoppUhr extends HTMLElement {
  constructor() {
    super();
    this.interval;
    this.laeuft = false;
    this.startZeit = 0;
    this.zeit = 0;
    this.handleStartStopClick = this.startOderStop.bind(this);
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        .stoppUhr {
          /* Stilisierung der Stoppuhr */
        }
        .stoppUhr button {
          /* Stilisierung des Buttons */
        }
      </style>
      <div class="stoppUhr">
        <input class="zeitAnzeige" value="00:00:0" readonly></input>
        <button class="startStopp">Start</button>
      </div>
    `;

    this.startStoppButton = this.querySelector(".startStopp");
    this.zeitAnzeige = this.querySelector(".zeitAnzeige");
    this.startStoppButton.addEventListener("click", this.handleStartStopClick);
  }

  disconnectedCallback() {
    if (this.laeuft) {
      this.stop();
    }
    this.startStoppButton.removeEventListener("click", this.handleStartStopClick);
  }

  startOderStop() {
    if (!this.laeuft) {
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    this.laeuft = true;
    this.startZeit = Date.now();
    this.zeit = 0;
    this.startStoppButton.textContent = "Stop";
    this.interval = setInterval(() => {
      this.zeit = Date.now() - this.startZeit; 
      this.aktualisiereAnzeige();
    }, 100); // Das Intervall beträgt 100 Millisekunden
  }  

  stop() {
    this.laeuft = false;
    clearInterval(this.interval);
    this.zeit = Math.floor((Date.now() - this.startZeit));
    this.startStoppButton.textContent = "Neustart";
    this.aktualisiereAnzeige();
  }

  aktualisiereAnzeige() {
    const minuten = Math.floor(this.zeit / 60000);
    const sekunden = Math.floor((this.zeit % 60000) / 1000);
    const zehntel = Math.floor((this.zeit % 1000) / 100); 
    this.zeitAnzeige.value = `${minuten.toString().padStart(2, "0")}:${sekunden.toString().padStart(2, "0")}:${zehntel.toString().padStart(1, "0")}`;
  }
  

  getZeit() {
    console.log(this.zeit);
    return this.zeit;
  }
}

window.customElements.define("meine-stoppuhr", MeineStoppUhr);

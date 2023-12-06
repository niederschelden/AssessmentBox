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
        <input class="zeitAnzeige" value="00:00:00" readonly></input>
        <button class="startStopp">Start</button>
      </div>
    `;

    this.startStoppButton = this.querySelector(".startStopp");
    this.zeitAnzeige = this.querySelector(".zeitAnzeige");
    this.startStoppButton.addEventListener("click", this.handleStartStopClick);
  }

  disconnectedCallback() {
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
      this.zeit++;
      this.aktualisiereAnzeige();
    }, 10);
  }

  stop() {
    this.laeuft = false;
    clearInterval(this.interval);
    this.zeit = Math.floor((Date.now() - this.startZeit) / 10);
    this.startStoppButton.textContent = "Start";
    this.aktualisiereAnzeige();
  }

  aktualisiereAnzeige() {
    const minuten = Math.floor(this.zeit / 6000);
    const sekunden = Math.floor((this.zeit % 6000) / 100);
    const hundertstel = this.zeit % 100;
    this.zeitAnzeige.value = `${minuten.toString().padStart(2, "0")}:${sekunden.toString().padStart(2, "0")}:${hundertstel.toString().padStart(2, "0")}`;
  }

  getZeit() {
    return this.zeit;
  }
}

window.customElements.define("meine-stoppuhr", MeineStoppUhr);

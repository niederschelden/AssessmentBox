class MeineStoppUhr extends HTMLElement {
    constructor() {
        super();
        this.interval;
        this.laeuft = false;
        this.startZeit = 0;
        this.zeit = 0;
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
          <input class="zeitAnzeige" value="00:00:00"></input>
          <button class="startStopp">Start</button>
        </div>
      `;

        this.startStoppButton = this.querySelector('.startStopp');
        this.zeitAnzeige = this.querySelector('.zeitAnzeige');

        this.startStoppButton.addEventListener('click', () => this.startOderStop());
    }

    getZeit() {
        return this.zeit;
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
        this.zeit = 0;
        this.startZeit = Date.now();
        this.aktualisiereAnzeige();
        this.startStoppButton.textContent = 'Stop'; // Verwende die Klassenvariable
        this.interval = setInterval(() => {
            this.zeit++;
            this.aktualisiereAnzeige();
        }, 10);
    }

    stop() {
        this.laeuft = false;
        clearInterval(this.interval);
        this.zeit = Math.floor((Date.now() - this.startZeit) / 10);
        this.startStoppButton.textContent = 'Start'; // Verwende die Klassenvariable
        this.aktualisiereAnzeige();
    }


    aktualisiereAnzeige() {
        const minuten = Math.floor(this.zeit / 6000);
        const sekunden = Math.floor((this.zeit % 6000) / 100);
        const hundertstel = this.zeit % 100;
        this.zeitAnzeige.value = `${minuten.toString().padStart(2, '0')}:${sekunden.toString().padStart(2, '0')}:${hundertstel.toString().padStart(2, '0')}`;
    }
}

window.customElements.define('meine-stoppuhr', MeineStoppUhr);
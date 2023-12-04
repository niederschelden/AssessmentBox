
class MeineStoppUhr extends HTMLElement {
    constructor() {
        super();
        this.interval;
        this.laeuft = false;
        this.zeit = 0;
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
          .stoppUhr {
          }
          .stoppUhr button {
          }
        </style>
        <div class="stoppUhr">
          <input id="zeitAnzeige" value="00:00:00"></input><button id="startStopp">Start</button>
        </div>
      `;

        this.querySelector('#startStopp').addEventListener('click', () => this.startOderStop());
        this.zeitAnzeige = this.querySelector('#zeitAnzeige');
    }

    // Methode, um die aktuelle Zeit zu erhalten
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
        this.aktualisiereAnzeige();
        this.querySelector('#startStopp').textContent = 'Stop';
        this.interval = setInterval(() => {
            this.zeit++;
            this.aktualisiereAnzeige();
        }, 10);
    }

    stop() {
        this.laeuft = false;
        this.querySelector('#startStopp').textContent = 'Start';
        clearInterval(this.interval);
    }

    aktualisiereAnzeige() {
        const minuten = Math.floor(this.zeit / 6000); // 6000 Hundertstel pro Minute
        const sekunden = Math.floor((this.zeit % 6000) / 100); // 100 Hundertstel pro Sekunde
        const hundertstel = this.zeit % 100;
        this.zeitAnzeige.value = `${minuten.toString().padStart(2, '0')}:${sekunden.toString().padStart(2, '0')}:${hundertstel.toString().padStart(2, '0')}`;
    }
}

window.customElements.define('meine-stoppuhr', MeineStoppUhr);


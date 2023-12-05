class MeinMetronom extends HTMLElement {
  constructor() {
    super();
    this.interval;
    this.takt = parseInt(this.getAttribute("takt")) || 1000; // Standardintervall in Millisekunden (1 Sekunde)
    var audioDataURL =
      "data:audio/wav;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFtQCzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Oz//////////////////////////////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABUgJAOBQQABzAAABbVeBCHiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vAxAAABvgDV/QQAAO5My8/NYJAaMc0MydbWHiqRg+XPsD6gQcJAwifDHLg++IAf/wfeoEHVAgceH5D//DH+H+Xf//rD5dQYLnxOH+/tqqlmNpeXNodXKKQ0IQEpC3YqCCBhgDpnzZWDFSCCAyA4HCzOHniKwBi2YHRiIKYUIArxI8EBxwtFTp5ELJWuEQPLXCyFlK25P04j9yh8Eh2lVJqAVi6bg0x+I2mKjGtV1X0jlVv13fWXYyB5K0rWm50uZGpe4EjiNuHbstd+L5Zv5Sv3Wl9HSahuad3LfNTNS3n9PnX5KJyWd1LqGMQqHLGGf17mMxG7Wf0kjmIpP///3Oni8gnrX//yOir16SrZv2NVP/WH18mbx+1avRd++7vWptqDX1gGVOC3KejkNPf3lS3lrOmu8pe6xvbEpVnN3Z3ZViFvui+JoLAgFQERAgUA0uTa8wDlRj4kWeBoBXMaH2wmBmQcHqql4SyqSiigEK3VapdVJ4HFYM1rJ9nWYXKoi/8YrFylKXhZKwKkcGIT77MuaTFZ+PP0+tC7r7SuifWUR5QJnrmtZqVtWqu6XtbPGrgqZp0apWlRbVzCmmbstlXcs8ccMtfyl5KpVL3J1TZ9xuatVcv5v8tdxlMppefWuXZTrf461lvL9atb5lruO+Za6+0qnqXk8+tWHd9uPtctVfxray//xx13LHHfMtdx3+Wu475V////5YiEwEqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+3DE0AAcZZth+bwAwAAAP8OAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"; // Vollständige Base64-Daten
    this.audio = new Audio(audioDataURL);
  }

  connectedCallback() {
    this.innerHTML = `
        <div>
          <button id="startStop">Metronom Start</button>
        </div>
      `;

    this.startStopButton = this.querySelector("#startStop");
    this.startStopButton.addEventListener("click", () => this.toggleMetronom());
  }

  connectedCallback() {
    this.startStopButton.removeEventListener("click", () => this.toggleMetronom());
  }

  toggleMetronom() {
    if (this.interval) {
      this.stopMetronom();
    } else {
      this.startMetronom();
    }
  }

  startMetronom() {
    this.startStopButton.textContent = "Metronom Stop";
    this.interval = setInterval(() => {
      this.playSound();
    }, this.takt);
  }

  stopMetronom() {
    clearInterval(this.interval);
    this.interval = null;
    this.startStopButton.textContent = "Metronom Start";
  }

  playSound() {
    if (BrowserCheck.isIOSorSafari()) {
      this.audio.play().catch((error) => console.error("Fehler beim Abspielen des Sounds:", error));
    } else {
      let clonedAudio = this.audio.cloneNode();
      clonedAudio.play().catch((error) => console.error("Fehler beim Abspielen des Sounds:", error));
    }
  }
}

window.customElements.define("mein-metronom", MeinMetronom);

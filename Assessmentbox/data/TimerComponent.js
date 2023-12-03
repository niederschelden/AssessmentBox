class TimerComponent extends HTMLElement {
  constructor() {
    super();

    // Create a shadow DOM and append the template content
    const shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("timer-template");
    const templateContent = template.content.cloneNode(true);
    shadow.appendChild(templateContent);

    // Initialize state variables
    this.startTime = 0;
    this.timerInterval = null;
  }

  // Lifecycle callback when the element is connected to the DOM
  connectedCallback() {
    this.startButton = this.shadowRoot.getElementById("startBtn");
    this.stopButton = this.shadowRoot.getElementById("stopBtn");
    this.timerOutput = this.shadowRoot.getElementById("timer");

    this.startButton.addEventListener("click", () => this.startTimer());
    this.stopButton.addEventListener("click", () => this.stopTimer());
  }

  // Lifecycle callback when the element is removed from the DOM
  disconnectedCallback() {
    this.startButton.removeEventListener("click", () => this.startTimer());
    this.stopButton.removeEventListener("click", () => this.stopTimer());

    console.log("Timer component disconnected from the DOM");
    this.stopTimer(); // Make sure to stop the timer when the component is removed
  }

  // Custom method to format time
  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  // Custom method to start the timer
  startTimer() {
    this.startTime = Math.floor(Date.now() / 1000);
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
  }

  // Custom method to stop the timer
  stopTimer() {
    clearInterval(this.timerInterval);
  }

  // Custom method to update the timer display
  updateTimer() {
    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedTime = currentTime - this.startTime;
    const formattedTime = this.formatTime(elapsedTime);
    this.timerOutput.textContent = formattedTime;
  }
}

customElements.define("timer-component", TimerComponent);

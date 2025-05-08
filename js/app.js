import EventLogger from './components/EventLogger.js';
import InputBlocker from './components/InputBlocker.js';

class App {
    constructor() {
        this.eventLogger = new EventLogger();
        this.inputBlocker = new InputBlocker(this.eventLogger);
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Keyboard shortcut for toggling blocking
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'X') {
                this.inputBlocker.toggleBlocking();
            }
        });

        // Mouse events
        const mouseEvents = ['mousedown', 'mouseup', 'click', 'dblclick', 'mousemove'];
        mouseEvents.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                if (this.inputBlocker.handleEvent(e)) {
                    this.eventLogger.logEvent(e);
                }
            });
        });

        // Keyboard events
        const keyboardEvents = ['keydown', 'keyup', 'keypress'];
        keyboardEvents.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                if (this.inputBlocker.handleEvent(e)) {
                    this.eventLogger.logEvent(e);
                }
            });
        });

        // Prevent leaving page
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = 'Are you sure you want to leave?';
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 
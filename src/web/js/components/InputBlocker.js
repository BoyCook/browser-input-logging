class InputBlocker {
    constructor(eventLogger) {
        this.eventLogger = eventLogger;
        this.isBlocking = false;
        this.status = document.getElementById('status');
        this.blocker = document.getElementById('blocker');
        this.setupBlocker();
    }

    setupBlocker() {
        const blockerDoc = this.blocker.contentDocument || this.blocker.contentWindow.document;
        blockerDoc.body.style.margin = '0';
        blockerDoc.body.style.padding = '0';
        blockerDoc.body.style.width = '100%';
        blockerDoc.body.style.height = '100%';
        blockerDoc.body.style.backgroundColor = 'transparent';
    }

    toggleBlocking() {
        this.isBlocking = !this.isBlocking;
        this.updateUI();
        this.updateBlocker();
    }

    updateUI() {
        this.status.textContent = this.isBlocking ? 'Blocking Active' : 'Blocking Inactive';
        this.status.className = this.isBlocking ? 'blocking-active' : '';
        document.body.style.cursor = this.isBlocking ? 'not-allowed' : 'default';
    }

    updateBlocker() {
        this.blocker.style.display = this.isBlocking ? 'block' : 'none';
        if (this.isBlocking) {
            const blockerDoc = this.blocker.contentDocument || this.blocker.contentWindow.document;
            blockerDoc.body.style.cursor = 'not-allowed';
        }
    }

    handleEvent(event) {
        if (this.isBlocking) {
            event.preventDefault();
            event.stopPropagation();
            this.eventLogger.logBlockedEvent(event);
            return false;
        }
        return true;
    }
}

export default InputBlocker; 
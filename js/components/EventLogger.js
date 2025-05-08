class EventLogger {
    constructor() {
        this.eventDisplay = document.getElementById('event-display');
        this.eventCounts = {
            mouse: 0,
            keyboard: 0,
            blocked: 0
        };
    }

    logEvent(event) {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        
        const eventType = event.type.startsWith('mouse') ? 'mouse-event' : 'keyboard-event';
        eventItem.classList.add(eventType);
        
        const timestamp = new Date().toLocaleTimeString();
        const details = this.getEventDetails(event);
        
        eventItem.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="event-type">${event.type}</span>
            <span class="event-details">${details}</span>
        `;
        
        this.eventDisplay.insertBefore(eventItem, this.eventDisplay.firstChild);
        this.updateEventCount(eventType);
    }

    getEventDetails(event) {
        if (event.type.startsWith('mouse')) {
            return `x: ${event.clientX}, y: ${event.clientY}`;
        } else if (event.type.startsWith('key')) {
            return `key: ${event.key}, code: ${event.code}`;
        }
        return '';
    }

    updateEventCount(eventType) {
        if (eventType === 'mouse-event') {
            this.eventCounts.mouse++;
        } else if (eventType === 'keyboard-event') {
            this.eventCounts.keyboard++;
        }
    }

    logBlockedEvent(event) {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item blocked-event';
        
        const timestamp = new Date().toLocaleTimeString();
        eventItem.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="event-type">${event.type}</span>
            <span class="event-details">(Blocked)</span>
        `;
        
        this.eventDisplay.insertBefore(eventItem, this.eventDisplay.firstChild);
        this.eventCounts.blocked++;
    }

    clearEvents() {
        this.eventDisplay.innerHTML = '';
        this.eventCounts = {
            mouse: 0,
            keyboard: 0,
            blocked: 0
        };
    }
}

export default EventLogger; 
type EventCallback = (data: unknown) => void;

export class EventService {

    private events: Map<string, EventCallback[]> = new Map();

    on(
        event: string,
        callback: EventCallback
    ): void {

        if (!this.events.has(event)) {
            this.events.set(event, []);
        }

        this.events.get(event)?.push(callback);

    }

    emit(
        event: string,
        data: unknown
    ): void {

        const callbacks = this.events.get(event);

        if (!callbacks) {
            return;
        }

        callbacks.forEach(callback => callback(data));

    }

}
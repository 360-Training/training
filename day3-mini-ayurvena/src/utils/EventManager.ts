type EventHandler = (data: any) => void;
export class EventManager {
    private events: Map<string, EventHandler[]> = new Map();
    subscribe(event: string, handler: EventHandler): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(handler);
    }
    emit(event: string, data: any): void {
        const handlers = this.events.get(event);
        if (!handlers) return;
        handlers.forEach(h => h(data));
    }
}
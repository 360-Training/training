import { EventManager } from "../utils/EventManager";
import { AuditLogger } from "../utils/AuditLogger";

export class AppEvents {
    public eventBus = new EventManager();
    public audit = new AuditLogger();
    constructor() {
        this.register();
    }
    private register(): void {
        this.eventBus.subscribe("appointment:booked", (data) => {
            this.audit.log(
                "APPOINTMENT_BOOKED",
                `Appointment booked: ${JSON.stringify(data)}`
            );
        });
        this.eventBus.subscribe("payment:completed", (data) => {
            this.audit.log(
                "PAYMENT_COMPLETED",
                `Payment completed: ${JSON.stringify(data)}`
            );
        });
        this.eventBus.subscribe("queue:updated", (data) => {
            this.audit.log(
                "QUEUE_UPDATED",
                `Queue updated: ${JSON.stringify(data)}`
            );
        });
    }
}
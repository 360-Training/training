export type AuditAction =
  | "APPOINTMENT_BOOKED"
  | "PAYMENT_COMPLETED"
  | "QUEUE_UPDATED";
export interface AuditLog {
    id: number;
    action: AuditAction;
    message: string;
    timestamp: Date;
    user?: string | undefined;
}
export class AuditLogger {
    private logs: AuditLog[] = [];
    private id = 1;
    log(action: AuditAction, message: string): void {
        const entry: AuditLog = {
            id: this.id++,
            action,
            message,
            timestamp: new Date(),
            user: undefined
        };
        this.logs.push(entry);
        console.log("[AUDIT]", action, message);
    }
    getLogs() {
        return this.logs;
    }
}
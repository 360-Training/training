import { BaseService } from "./BaseService.js";
import type { IQueue } from "../types/interfaces.js";
import { QueueStatus } from "../types/enums.js";

export class QueueService extends BaseService<IQueue> {
    findByDoctor(doctorId: number): IQueue[] {
        return this.items.filter(queue =>
            queue.doctorId === doctorId
        );
    }
    findByPatient(patientId: number): IQueue | undefined {
        return this.items.find(queue =>
            queue.patientId === patientId
        );
    }
    findByStatus(status: QueueStatus): IQueue[] {
        return this.items.filter(queue =>
            queue.status === status
        );
    }
}
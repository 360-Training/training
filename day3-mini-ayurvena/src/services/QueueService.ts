export class QueueService {
    private queue: number[] = [];
    addPatient(patientId: number): void {
        this.queue.push(patientId);
    }
    getNextPatient(): number | undefined {
        return this.queue.shift();
    }
    viewQueue(): number[] {
        return this.queue;
    }
    queueLength(): number {
        return this.queue.length;
    }
    clearQueue(): void {
        this.queue = [];
    }
}
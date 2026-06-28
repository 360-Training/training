export class QueueService {

    private queue: number[] = [];

    addPatient(
        patientId: number
    ): void {

        this.queue.push(patientId);

    }

    nextPatient():
        number | undefined {

        return this.queue.shift();

    }

    getQueue():
        number[] {

        return this.queue;

    }

}
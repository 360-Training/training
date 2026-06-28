import {IQueue} from"../types/interfaces";

export class QueueService {
    private queue: IQueue[]= [];

    add(patientId: number): void {
        this.queue.push({
            patientId,
            token: this.queue.length+1
        });
    }
    next(): IQueue | undefined {
        return this.queue.shift();
    }
    getQueue(): IQueue[]{
        return this.queue;
    }
}
export class QueueService {
  private queue: number[] = [];
  enqueue(patientId: number) {
    this.queue.push(patientId);
  }
  dequeue(): number | undefined {
    return this.queue.shift();
  }
  getQueue(): number[] {
    return this.queue;
  }
}
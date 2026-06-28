export class QueueService {
    private waitingList: number[] = [];
    addPatient(patientId: number) {
        this.waitingList.push(patientId);
        console.log("Patient added to queue.");
    }
    nextPatient() {
        if (this.waitingList.length === 0) {
            console.log("Queue is empty.");
            return;
        }
        const patient = this.waitingList.shift();
        console.log("Now checking patient :", patient);
    }
    showQueue() {
        console.log("Waiting Queue");
        this.waitingList.forEach(id => {
            console.log(id);
        });
    }
}
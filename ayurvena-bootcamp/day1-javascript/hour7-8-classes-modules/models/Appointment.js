export class Appointment {
    constructor(id, patient, doctor, date, time) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
        this.status = "scheduled";
        this.payment = "pending";
    }
    cancel() {
    this.status = "cancelled";
    const day = new Date(this.date).toLocaleDateString(
        "en-US",
        { weekday: "long" }
    );
    const daySlots = this.doctor.schedule[day];
    const slot = daySlots.find(
        s => s.time === this.time
    );
    if (slot) {
        slot.isBooked = false;
    }
}
complete() {
    this.status = "completed";
}
generateReceipt() {
    return `
Receipt
------------------------
Appointment ID: ${this.id}
Patient: ${this.patient.name}
Doctor: ${this.doctor.name}
Date: ${this.date}
Time: ${this.time}
Fee: ₹${this.doctor.fee}
Payment: ${this.payment}
Status: ${this.status}
`;
}
}
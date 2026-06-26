// -------------------------------
// Appointment Class
// -------------------------------

class Appointment {

    constructor(id, patient, doctor, date, time) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
        this.status = "scheduled";
        this.payment = doctor.fee;
    }

    // Cancel appointment
    cancel() {
        this.status = "cancelled";

        if (this.doctor.freeSlot) {
            this.doctor.freeSlot("Monday", this.time);
        }

        return "Appointment cancelled";
    }

    // Complete appointment
    complete() {
        this.status = "completed";
        return "Appointment completed";
    }

    // Generate receipt
    generateReceipt() {
        return `
------------- RECEIPT -------------
Appointment ID : ${this.id}
Patient         : ${this.patient.name}
Doctor          : ${this.doctor.name}
Specialization  : ${this.doctor.specialization}
Date            : ${this.date}
Time            : ${this.time}
Status          : ${this.status}
Amount Paid     : ₹${this.payment}
-----------------------------------
`;
    }

}

// --------------------------------------
// Sample Patient Object
// --------------------------------------

const patient = {
    id: 1,
    name: "Rahul Kumar"
};

console.log("\n--- TEST 1: Patient ---");
console.log(patient);

// --------------------------------------
// Sample Doctor Object
// --------------------------------------

const doctor = {
    id: 1,
    name: "Dr. Kumar",
    specialization: "Cardiology",
    fee: 500,

    freeSlot(day, time) {
        console.log(`Slot ${time} on ${day} is now available`);
    }
};

console.log("\n--- TEST 2: Doctor ---");
console.log(doctor);

// --------------------------------------
// Create Appointment
// --------------------------------------

const appointment = new Appointment(
    1,
    patient,
    doctor,
    "2026-07-01",
    "09:00"
);

console.log("\n--- TEST 3: Appointment Created ---");
console.log(appointment);

// --------------------------------------
// Cancel Appointment
// --------------------------------------

console.log("\n--- TEST 4: Cancel Appointment ---");
console.log(appointment.cancel());
console.log("Current Status:", appointment.status);

// --------------------------------------
// Complete Appointment
// --------------------------------------

console.log("\n--- TEST 5: Complete Appointment ---");
console.log(appointment.complete());
console.log("Current Status:", appointment.status);

// --------------------------------------
// Generate Receipt
// --------------------------------------

console.log("\n--- TEST 6: Receipt ---");
console.log(appointment.generateReceipt());

module.exports = Appointment;
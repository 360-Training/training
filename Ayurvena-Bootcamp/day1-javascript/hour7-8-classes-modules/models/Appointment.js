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

    const day = new Date(this.date).toLocaleDateString("en-US", {
      weekday: "long"
    });

    if (this.doctor.schedule[day]) {
      const slot = this.doctor.schedule[day].find(
        slot => slot.time === this.time
      );

      if (slot) {
        slot.isBooked = false;
      }
    }
  }

  // Complete appointment
  complete() {
    this.status = "completed";
  }

  // Generate receipt
  generateReceipt() {
    return `
    Appointment ID : ${this.id}
    Patient        : ${this.patient.name}
    Doctor         : ${this.doctor.name}
    Specialization : ${this.doctor.specialization}
    Date           : ${this.date}
    Time           : ${this.time}
    Status         : ${this.status}
    Amount Paid    : ₹${this.payment}
    `;
  }
}

module.exports = Appointment;

// ---------------- TESTS ----------------
const Patient = require("./Patient");
const Doctor = require("./Doctor");

const patient = new Patient(
    1,
    "Priya Sharma",
    32,
    "9708922701",
    "O+"
);

const doctor = new Doctor(
    1,
    "Dr. Kumar",
    "Cardiology",
    500
);

const appointment = new Appointment(
    1,
    patient,
    doctor,
    "2026-07-01",
    "09:00"
);

console.log("\n--- TEST 1: Appointment Created ---");
console.log(appointment);

console.log("\n--- TEST 2: Generate Receipt ---");
console.log(appointment.generateReceipt());

console.log("\n--- TEST 3: Complete Appointment ---");
appointment.complete();
console.log(appointment.status);

console.log("\n--- TEST 4: Cancel Appointment ---");
appointment.cancel();
console.log(appointment.status);

console.log("\n--- TEST 5: Receipt After Cancellation ---");
console.log(appointment.generateReceipt());
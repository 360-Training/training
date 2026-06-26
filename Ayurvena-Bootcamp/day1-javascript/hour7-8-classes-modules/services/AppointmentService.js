const Appointment = require("../models/Appointment");

class AppointmentService {
  constructor() {
    this.appointments = [];
    this.currentId = 1;
  }

  // Book Appointment
  bookAppointment(patient, doctor, day, time) {

    if (!patient) {
      console.log("Patient not found");
      return null;
    }

    if (!doctor) {
      console.log("Doctor not found");
      return null;
    }

    if (!doctor.isAvailable(day, time)) {
      console.log("Slot not available");
      return null;
    }

    doctor.bookSlot(day, time);

    const appointment = new Appointment(
      this.currentId++,
      patient,
      doctor,
      day,
      time,
      "scheduled",
      doctor.fee
    );

    this.appointments.push(appointment);

    return appointment;
  }

  // Cancel Appointment
  cancelAppointment(id) {

    const appointment = this.appointments.find(
      appointment => appointment.id === id
    );

    if (!appointment) {
      return null;
    }

    appointment.cancel();

    return appointment;
  }

  // Patient History
  getPatientHistory(patientId) {

    return this.appointments.filter(
      appointment => appointment.patient.id === patientId
    );

  }

  // Doctor Appointments
  getDoctorAppointments(doctorId) {

    return this.appointments.filter(
      appointment => appointment.doctor.id === doctorId
    );

  }

  // Get All Appointments
  getAllAppointments() {
    return this.appointments;
  }

  // Appointment Count
  getAppointmentCount() {
    return this.appointments.length;
  }
}

module.exports = AppointmentService;


// ---------------- TESTS ----------------

const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

const appointmentService = new AppointmentService();

const patient = new Patient(
  1,
  "Rahul Sharma",
  30,
  "9876543210",
  "O+"
);

const doctor = new Doctor(
  1,
  "Dr. Kumar",
  "Cardiology",
  500,
);

console.log("\n--- TEST 1: Book Appointment ---");

const appointment = appointmentService.bookAppointment(
  patient,
  doctor,
  "2026-07-01",
  "09:00"
);

console.log("Schedule:", doctor.schedule);
console.log("Available:", doctor.isAvailable("2026-07-01", "09:00"));

console.log(appointment);

console.log("\n--- TEST 2: Patient History ---");

console.log(
  appointmentService.getPatientHistory(1)
);

console.log("\n--- TEST 3: Doctor Appointments ---");

console.log(
  appointmentService.getDoctorAppointments(1)
);

console.log("\n--- TEST 4: Cancel Appointment ---");

console.log(
  appointmentService.cancelAppointment(1)
);

console.log("\n--- TEST 5: All Appointments ---");

console.log(
  appointmentService.getAllAppointments()
);

console.log("\n--- TEST 6: Appointment Count ---");

console.log(
  appointmentService.getAppointmentCount()
);
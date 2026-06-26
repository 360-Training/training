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
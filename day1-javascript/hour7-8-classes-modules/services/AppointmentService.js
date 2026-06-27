import { Appointment } from "../models/Appointment.js";
export class AppointmentService {
  constructor() {
    this.appointments = [];
  }
  bookAppointment(id, patient, doctor) {
    const appointment = new Appointment(id, patient, doctor);
    this.appointments.push(appointment);
    return appointment;
  }
getAllAppointments() {
    return this.appointments;
  }
}
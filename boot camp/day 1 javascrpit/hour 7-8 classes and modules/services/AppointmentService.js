import { Appointment } from "../models/Appointment.js";
import { NotFoundError, ValidationError, ConflictError } from "../utils/errors.js";

export class AppointmentService {
  constructor(patientService, doctorService) {
    this.patientService = patientService;
    this.doctorService = doctorService;
    this.appointments = [];
  }

  book(patientId, doctorId, date, time) {
    if (!time || !/^\d{2}:\d{2}$/.test(time)) {
      throw new ValidationError("bad time format, use HH:MM");
    }

    const patient = this.patientService.findById(patientId);
    const doctor = this.doctorService.findById(doctorId);

    if (!doctor.isAvailable(date, time)) {
      throw new ConflictError(doctor.name + " is already booked at " + date + " " + time);
    }

    doctor.bookSlot(date, time);
    const appt = new Appointment({ patient, doctor, date, time });
    this.appointments.push(appt);
    return appt;
  }

  findById(id) {
    const a = this.appointments.find(a => a.id === id);
    if (!a) throw new NotFoundError("appointment not found: " + id);
    return a;
  }

  cancel(id) {
    const a = this.findById(id);
    a.cancel();
    return a;
  }

  complete(id) {
    const a = this.findById(id);
    a.complete();
    return a;
  }

  getHistory(patientId) {
    this.patientService.findById(patientId); // throws if missing
    return this.appointments
      .filter(a => a.patient.id === patientId)
      .map(a => ({
        id: a.id,
        date: a.date,
        time: a.time,
        status: a.status,
        doctor: a.doctor.name,
        payment: a.payment
      }));
  }

  getDoctorSchedule(doctorId, date) {
    return this.appointments.filter(a => a.doctor.id === doctorId && a.date === date);
  }

  getAll() {
    return this.appointments;
  }
}
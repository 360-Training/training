import { Appointment } from "../models/Appointment.js";

export class AppointmentService {
    constructor() {
        this.appointments = [];
    }
    bookAppointment(patient, doctor, date, time) {
        const appointment = new Appointment(
            this.appointments.length + 1,
            patient,
            doctor,
            date,
            time
        );
        this.appointments.push(appointment);
        return appointment;
    }
    cancelAppointment(id) {
        const appointment = this.appointments.find(
            a => a.id === id
        );
        if (appointment) {
            appointment.cancel();
        }
        return appointment;
    }
    getPatientHistory(patientId) {
        return this.appointments.filter(
            a => a.patient.id === patientId
        );
    }
}
import { Appointment } from '../models/appointment';
export class AppointmentService {
  private appointments: Appointment[] = [];
  book(patientId: number, doctorId: number): Appointment {
    const appointment = new Appointment(patientId, doctorId);
    this.appointments.push(appointment);
    return appointment;
  }
  cancel(id: number): boolean {
    const before = this.appointments.length;
    this.appointments = this.appointments.filter(a => a.id !== id);
    return this.appointments.length < before;
  }
  getAll(): Appointment[] {
    return this.appointments;
  }
}
import { BaseService } from "./BaseService";
import { Appointment } from "../models/Appointment";
import { AppointmentStatus } from "../types/enums";
export class AppointmentService extends BaseService<Appointment> {
    bookAppointment(
        patientId: number,
        doctorId: number,
        appointmentDate: Date,
        tokenNumber: number
    ): Appointment {
        const appointment = new Appointment(
            this.currentId++,
            patientId,
            doctorId,
            appointmentDate,
            AppointmentStatus.BOOKED,
            tokenNumber
        );
        return this.create(appointment);
    }
    getAppointmentsByDoctor(doctorId: number): Appointment[] {
        return this.items.filter(
            appointment => appointment.doctorId === doctorId
        );
    }
    getAppointmentsByPatient(patientId: number): Appointment[] {
        return this.items.filter(
            appointment => appointment.patientId === patientId
        );
    }
    updateStatus(
        appointmentId: number,
        status: AppointmentStatus
    ): Appointment | undefined {
        const appointment = this.findById(appointmentId);
        if (!appointment) {
            return undefined;
        }
        appointment.status = status;
        appointment.updatedAt = new Date();
        return appointment;
    }
    cancelAppointment(id: number): boolean {
        const appointment = this.findById(id);
        if (!appointment) {
            return false;
        }
        appointment.status = AppointmentStatus.CANCELLED;
        appointment.updatedAt = new Date();
        return true;
    }
}
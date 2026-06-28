import { BaseService } from "./baseService";
import { Appointment } from "../models/appointment";
import { AppointmentStatus } from "../types/enums";

export class AppointmentService extends BaseService<Appointment> {
    bookAppointment(appointment: Appointment) {
        this.add(appointment);
        console.log("Appointment booked.");
    }
    completeAppointment(id: number) {
        const appointment = this.getById(id);
        if (!appointment) {
            console.log("Appointment not found.");
            return;
        }
        appointment.status = AppointmentStatus.Completed;
        console.log("Appointment completed.");
    }
    cancelAppointment(id: number) {
        const appointment = this.getById(id);
        if (!appointment) {
            console.log("Appointment not found.");
            return;
        }
        appointment.status = AppointmentStatus.Cancelled;
        console.log("Appointment cancelled.");
    }
    showAppointments() {
        if (this.data.length === 0) {
            console.log("No appointments.");
            return;
        }
        this.data.forEach(item => {
            console.log(
                item.id,
                item.patientId,
                item.doctorId,
                item.date,
                item.status
            );
        });
    }
}
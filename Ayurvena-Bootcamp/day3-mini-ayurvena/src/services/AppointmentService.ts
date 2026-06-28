import { BaseService } from "./BaseService.js";
import type { IAppointment } from "../types/interfaces.js";
import { AppointmentStatus } from "../types/enums.js";

export class AppointmentService extends BaseService<IAppointment> {

    findByPatient(patientId: number): IAppointment[] {
        return this.items.filter(
            appointment => appointment.patientId === patientId
        );
    }

    findByDoctor(doctorId: number): IAppointment[] {
        return this.items.filter(
            appointment => appointment.doctorId === doctorId
        );
    }

    findByStatus(status: AppointmentStatus): IAppointment[] {
        return this.items.filter(
            appointment => appointment.status === status
        );
    }
}
import { BaseService } from "./BaseService.js";
import type { IAppontiment } from "../types/models.js";
import { AppointmentStatus } from "../types/enums.js";

export class AppointmentService
    extends BaseService<IAppontiment> {

    cancelAppointment(
        id: number
    ): boolean {

        const appointment =
            this.findById(id);

        if (!appointment) {
            return false;
        }

        appointment.status =
            AppointmentStatus.CANCELLED;

        return true;

    }

}
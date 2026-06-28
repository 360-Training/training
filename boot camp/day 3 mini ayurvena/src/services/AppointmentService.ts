import { BaseService } from "./BaseService";
import { IAppointment } from "../types/interfaces";
import { AppointmentStatus } from "../types/enums";

export class AppointmentService extends BaseService<IAppointment> {
    cancelAppointment(id: number): boolean {
        const appointment = this.getById(id);
        
        if(!appointment){
            return false;
        }
        appointment.status= AppointmentStatus.Cancelled;
        appointment.updatedAt = new Date();

        return true;
    }
}
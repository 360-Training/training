import { IAppointment}  from "../types/interfaces";
import { AppointmentStatus } from "../types/enums";

export class Appointment implements IAppointment {
    constructor(
        public id: number,
        public patientId: number,
        public doctorId: number,
        public status: AppointmentStatus,
        public createdAt: Date= new Date(),
        public updatedAt: Date= new Date()
    ) {}
}
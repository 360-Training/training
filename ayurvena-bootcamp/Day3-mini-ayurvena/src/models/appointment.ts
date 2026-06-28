import { BaseEntity } from "./baseEntity";
import { AppointmentStatus } from "../types/enums";

export class Appointment extends BaseEntity {
    constructor(
        id: number,
        public patientId: number,
        public doctorId: number,
        public date: string,
        public status: AppointmentStatus
    ) {
        super(id);
    }
    showAppointment() {
        console.log(
            `Appointment : ${this.id} Date : ${this.date}`
        );
    }

}
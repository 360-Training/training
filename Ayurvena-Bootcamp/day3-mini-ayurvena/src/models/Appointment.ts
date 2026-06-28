import type { IAppointment } from "../types/interfaces.js";
import { AppointmentStatus } from "../types/enums.js";


export class Appointment implements IAppointment {
    constructor (
        public id : number,
        public hospitalId : number,
        public patientId : number,
        public doctorId : number,
        public date : string,
        public time : string,
        public status : AppointmentStatus,
        public createdAt : Date = new Date(),
        public updatedAt : Date = new Date()
    ){}
}
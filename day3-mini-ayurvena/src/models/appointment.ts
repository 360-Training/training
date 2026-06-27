import { BaseEntity } from './baseEntity'
export class Appointment extends BaseEntity {
  patientId: number;
  doctorId: number;
  status: string;
  constructor(patientId: number, doctorId: number) {
    super();
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.status = "PENDING";
 
}
}
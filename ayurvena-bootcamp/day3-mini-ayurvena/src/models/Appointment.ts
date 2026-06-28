import { AppointmentStatus } from "../types/enums.js";
import type { IAppontiment } from "../types/models.js";
export class Appointment implements IAppontiment{
  id!:number;
  createdAt!:Date;
  updatedAt!:Date;
  patientId!:number;
  doctorId!:number;
  date!:string;
  time!:string;
  status!:AppointmentStatus;
  constructor(data:IAppontiment){
    Object.assign(this,data);
  }
}
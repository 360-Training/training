import {
    UserRole,
    Department,
    AppointmentStatus,
    PaymentStatus,
    PaymentMethod
} from "./enums";

export interface IBaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser extends IBaseEntity {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
}

export interface IPatient extends IUser {
    bloodGroup: string;
    age: number;
    gender: string;
    allergies: string[];
}

export interface IDoctor extends IUser {
    specialization: string;
    department: Department;
    fee: number;
}

export interface IAppontiment extends IBaseEntity{
  patientId:number;
  doctorId:number;
  date:string;
  time:string;
  status:AppointmentStatus;
}
export interface IConsultation extends IBaseEntity{
  appointmentId:number;
  diagonsis:string;
  notes:string;
}
export interface IPrescription extends IBaseEntity {
    consultationId: number;
    medicines: string[];
    instructions: string;
}
export interface IPayment extends IBaseEntity {
    appointmentId: number;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
}
export interface IAdmission extends IBaseEntity{
  patientID:number;
  roomNumber:string;
  admittedAt:Date;
  dischargedAt?:Date;
}
export interface ILabOrder extends IBaseEntity {
    patientId: number;
    testName: string;
    status: string;
    result?: string;
}
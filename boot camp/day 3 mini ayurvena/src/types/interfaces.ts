import {
  Gender,
  Department,
  AppointmentStatus,
  PaymentStatus
} from "./enums";

export interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPatient extends IBaseEntity {
  name: string;
  age: number;
  gender: Gender;
}

export interface IDoctor extends IBaseEntity {
  name : string;
  department: Department;
}

export interface IAppointment extends IBaseEntity {
  patientId: number;
  doctorId: number;
  status: AppointmentStatus;
}

export interface IPayment extends IBaseEntity {
  appointmentId: number;
  amount: number;
  status: PaymentStatus;
}

export interface IQueue {
  patientId: number;
  token: number;
}
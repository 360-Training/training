import {
  UserRole,
  Department,
  AppointmentStatus,
  PaymentStatus,
  PaymentMethod,
  QueueStatus
} from "./enums.js";

export interface IEntity {
  id: number;
  createdAt : Date;
  updatedAt : Date;
}

export interface IUser extends IEntity {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}

export interface IPatient extends IEntity {
  name: string;
  age: number;
  phone: string;
  bloodGroup: string;
}

export interface IDoctor extends IEntity {
  name: string;
  department: Department;
  specialization: string;
  consultationFee: number;
}

export interface IAppointment extends IEntity {
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  status: AppointmentStatus;
}

export interface IPayment extends IEntity {
  appointmentId: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
}

export interface IQueue extends IEntity {
    patientId : number;
    doctorId : number;
    token : number;
    status : QueueStatus;
}
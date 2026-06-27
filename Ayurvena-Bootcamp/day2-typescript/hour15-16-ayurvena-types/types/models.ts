import { Gender, AppointmentStatus, PaymentStatus } from "./enums";
export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: Gender;
}
export interface Doctor {
  id: number;
  name: string;
  specialization: string;
}
export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  status: AppointmentStatus;
  payment: PaymentStatus;
}
import { Gender, Department, AppointmentStatus, PaymentStatus } from "./enums";

export interface PatientModel {
    id: number;
    name: string;
    age: number;
    gender: Gender;
    phone: string;
}
export interface DoctorModel {
    id: number;
    name: string;
    department: Department;
    experience: number;
}
export interface AppointmentModel {
    id: number;
    patientId: number;
    doctorId: number;
    date: string;
    status: AppointmentStatus;
}
export interface PaymentModel {
    appointmentId: number;
    amount: number;
    status: PaymentStatus;
}
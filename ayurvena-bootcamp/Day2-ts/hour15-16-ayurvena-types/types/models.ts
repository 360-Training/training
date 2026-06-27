import { AppointmentStatus, Department, PatientStatus } from "./enums";

export interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    phone: string;
    status: PatientStatus;
}
export interface Doctor {
    id: number;
    name: string;
    department: Department;
    experience: number;
}
export interface Appointment {
    id: number;
    patient: Patient;
    doctor: Doctor;
    date: string;
    status: AppointmentStatus;
}
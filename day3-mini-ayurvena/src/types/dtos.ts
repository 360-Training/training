import { Gender } from "./enums";
export interface CreatePatientDTO {
  name: string;
  age: number;
  gender: Gender;
}
export interface CreateDoctorDTO {
  name: string;
  specialization: string;
}
export interface BookAppointmentDTO {
  patientId: number;
  doctorId: number;
}
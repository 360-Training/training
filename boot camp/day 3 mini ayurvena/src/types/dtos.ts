import {
  IPatient,
  IDoctor,
  IAppointment
} from "./interfaces";

export type CreatePatientDto= Omit<
IPatient,
"id" | "createdAt" | "updatedAt"
>;

export type CreateDoctorDto=Omit<
IDoctor,
"id" | "createdAt" | "updatedAt"
>;

export type CreateAppointmentDto= Omit<
IAppointment,
"id" | "createdAt" | "updated"
>;
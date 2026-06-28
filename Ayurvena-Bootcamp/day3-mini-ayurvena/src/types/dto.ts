import type {
  IUser,
  IPatient,
  IDoctor,
  IAppointment,
  IPayment
} from "./interfaces.js";

export type CreateUserDto = Omit<
  IUser,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateUserDto = Partial<CreateUserDto>;

export type UserPreview = Pick<
  IUser,
  "id" | "name" | "email" | "role"
>;

export type CreatePatientDto = Omit<
  IPatient,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdatePatientDto = Partial<CreatePatientDto>;

export type PatientPreview = Pick<
  IPatient,
  "id" | "name" | "phone" | "bloodGroup"
>;

export type CreateDoctorDto = Omit<
  IDoctor,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateDoctorDto = Partial<CreateDoctorDto>;

export type DoctorPreview = Pick<
  IDoctor,
  "id" | "name" | "department"
>;

export type CreateAppointmentDto = Omit<
  IAppointment,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateAppointmentDto = Partial<CreateAppointmentDto>;

export type CreatePaymentDto = Omit<
  IPayment,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdatePaymentDto = Partial<CreatePaymentDto>;


import type {
  IUser,
  IPatient,
  IDoctor,
  IAppointment
} from "./models";

export type CreateUserDto = Omit<IUser, "id" | "createdAt" | "updatedAt">;
export type UpdateUserDto = Partial<CreateUserDto>;

export type CreatePatientDto = Omit<IPatient, "id" | "createdAt" | "updatedAt">;
export type UpdatePatientDto = Partial<CreatePatientDto>;

export type CreateDoctorDto = Omit<IDoctor, "id" | "createdAt" | "updatedAt">;
export type UpdateDoctorDto = Partial<CreateDoctorDto>;

export type CreateAppointmentDto = Omit<IAppointment, "id" | "createdAt" | "updatedAt">;
export type UpdateAppointmentDto = Partial<CreateAppointmentDto>;

export type PatientBasic = Pick<IPatient, "id" | "name">;
export type DoctorBasic = Pick<IDoctor, "id" | "name">;
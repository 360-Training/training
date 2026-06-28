import {
    IPatient,
    IDoctor,
    IAppointment,
    IUser
} from "./models";

export type CreatePatientDto =
Omit<IPatient, "id" | "createdAt" | "updatedAt">;

export type UpdatePatientDto =
Partial<CreatePatientDto>;

export type PatientSummary =
Pick<IPatient, "name" | "phone">;

export type CreateDoctorDto =
Omit<IDoctor, "id" | "createdAt" | "updatedAt">;

export type UpdateDoctorDto =
Partial<CreateDoctorDto>;

export type CreateAppointmentDto =
Omit<IAppointment, "id" | "createdAt" | "updatedAt">;

export type UpdateAppointmentDto =
Partial<CreateAppointmentDto>;

export type CreateUserDto =
Omit<IUser, "id" | "createdAt" | "updatedAt">;

export type UpdateUserDto =
Partial<CreateUserDto>;
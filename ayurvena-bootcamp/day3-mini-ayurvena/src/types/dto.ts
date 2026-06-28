import type {
  IAdmission,
  IAppontiment,
  ILabOrder,
  IPatient,
  IPayment,
  IPrescription,
  Idoctor
} from "./models.js";

export type CreatePatientDto=Omit<
IPatient,
"id"|"createdAt"|"updatedAt">;
export type UpdatePatientDto=Partial<CreatePatientDto>;
export type PatientPreview=Pick<
IPatient,
"id"|"name"|"phone"|"bloodGroup">;
export type CreateDoctorDto = Omit<
    Idoctor,
    "id" | "createdAt" | "updatedAt">;
export type UpdateDoctorDto =Partial<CreateDoctorDto>;
    export type CreateAppointmentDto = Omit<
    IAppontiment,
    "id" | "createdAt" | "updatedAt">;
export type UpdateAppointmentDto =Partial<CreateAppointmentDto>;
export type CreatePaymentDto=Omit<IPayment,
"id"|"createdAt"|"updatedAt">;
export type UpdatePaymentDto=Partial<CreatePaymentDto>;
export type CreatePrescriptionDto = Omit<
    IPrescription,
    "id" | "createdAt" | "updatedAt">;
export type UpdatePrescriptionDto =Partial<CreatePrescriptionDto>;
export type CreateAdmissionDto=Omit<
IAdmission,
"id"|"createdAt"|"updatedAt">;
export type UpdatedAdmissionDto=Partial<CreateAdmissionDto>;
export type CreateLabOrderDto=Omit<
ILabOrder,
"id"|"createdAt"|"updatedAt">;
export type UpdateLAbOrderDto=Partial<CreateLabOrderDto>;
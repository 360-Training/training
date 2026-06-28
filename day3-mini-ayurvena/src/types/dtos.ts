import {
    IPatient,
    IDoctor,
    IAppointment,
    IPayment,
    IConsultation,
    IPrescription,
    IAdmission,
    ILabOrder
} from "./models";

//----Generic DTOs----

export type CreateDto<T> =
Omit<T, "id" | "createdAt" | "updatedAt">;
export type UpdateDto<T> =
Partial<CreateDto<T>>;

//----Patient DTOs----

export type CreatePatientDto =
CreateDto<IPatient>;
export type UpdatePatientDto =
UpdateDto<IPatient>;

//----Doctor DTOs----

export type CreateDoctorDto =
CreateDto<IDoctor>;
export type UpdateDoctorDto =
UpdateDto<IDoctor>;

//----Appointment DTOs----

export type CreateAppointmentDto =
CreateDto<IAppointment>;
export type UpdateAppointmentDto =
UpdateDto<IAppointment>;

//----Payment DTOs----

export type CreatePaymentDto =
CreateDto<IPayment>;
export type UpdatePaymentDto =
UpdateDto<IPayment>;

//----Consultation DTOs----

export type CreateConsultationDto =
CreateDto<IConsultation>;
export type UpdateConsultationDto =
UpdateDto<IConsultation>;

//----Prescription DTOs----

export type CreatePrescriptionDto =
CreateDto<IPrescription>;
export type UpdatePrescriptionDto =
UpdateDto<IPrescription>;

//----Admission DTOs----

export type CreateAdmissionDto =
CreateDto<IAdmission>;
export type UpdateAdmissionDto =
UpdateDto<IAdmission>;

//----Lab DTOs----

export type CreateLabOrderDto =
CreateDto<ILabOrder>;
export type UpdateLabOrderDto =
UpdateDto<ILabOrder>;
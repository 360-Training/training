//----Extends BaseEntity----
import {
    BloodGroup,
    Gender,
    Department,
    AppointmentStatus,
    PaymentStatus,
    UserRole
} from "./enums";
export interface IBaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUser extends IBaseEntity {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
}
export interface IPatient extends IBaseEntity {
    name: string;
    age: number;
    gender: Gender;
    phone: string;
    bloodGroup: BloodGroup;
}
export interface IDoctor extends IBaseEntity {
    name: string;
    department: Department;
    experience: number;
}
export interface IAppointment extends IBaseEntity {
    patientId: number;
    doctorId: number;
    appointmentDate: Date;
    status: AppointmentStatus;
}
export interface IConsultation extends IBaseEntity {
    appointmentId: number;
    diagnosis: string;
    notes: string;
}
export interface IPrescription extends IBaseEntity {
    consultationId: number;
    medicines: string[];
}
export interface IPayment extends IBaseEntity {
    appointmentId: number;
    amount: number;
    status: PaymentStatus;
}
export interface IAdmission extends IBaseEntity {
    patientId: number;
    roomNumber: string;
    admittedDate: Date;
}
export interface ILabOrder extends IBaseEntity {
    patientId: number;
    testName: string;
    result: string;
}
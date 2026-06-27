import {
    BloodGroup,
    Department,
    AppointmentStatus,
    PaymentMethod,
    PaymentStatus,
    Gender,
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

export interface IPatient extends IUser {
    age: number;
    gender: Gender;
    bloodGroup: BloodGroup;
    allergies: string[];
}

export interface IDoctor extends IUser {
    specialization: string;
    department: Department;
    fee: number;
}

export interface IPayment extends IBaseEntity {
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId: string;
}

export interface IAppointment extends IBaseEntity {
    patientId: number;
    doctorId: number;
    date: string;
    time: string;
    status: AppointmentStatus;
    payment?: IPayment;
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

export interface IAdmission extends IBaseEntity {
    patientId: number;
    roomNumber: string;
    admittedOn: Date;
}

export interface ILabOrder extends IBaseEntity {
    patientId: number;
    testName: string;
    status: string;
}
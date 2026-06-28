import {
    UserRole,
    Department,
    BloodGroup,
    AppointmentStatus,
    PaymentStatus,
    Gender
} from "./enums";

//----Base Interface----

export interface IBaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

//----User Interface----

export interface IUser extends IBaseEntity {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
}

//----Patient Interface----

export interface IPatient extends IBaseEntity {
    name: string;
    age: number;
    gender: Gender;
    phone: string;
    bloodGroup: BloodGroup;
}

//----Doctor Interface----

export interface IDoctor extends IBaseEntity {
    name: string;
    department: Department;
    specialization: string;
    experience: number;
    consultationFee: number;
}

//----Appointment Interface----

export interface IAppointment extends IBaseEntity {
    patientId: number;
    doctorId: number;
    appointmentDate: Date;
    status: AppointmentStatus;
    tokenNumber: number;
}

//----Consultation Interface----

export interface IConsultation extends IBaseEntity {
    appointmentId: number;
    diagnosis: string;
    prescription: string;
    notes: string;
}

//----Prescription Interface----

export interface IPrescription extends IBaseEntity {
    consultationId: number;
    medicines: string[];
    advice: string;
}

//----Payment Interface----

export interface IPayment extends IBaseEntity {
    appointmentId: number;
    amount: number;
    status: PaymentStatus;
    paymentMethod: string;
}

//----Admission Interface----

export interface IAdmission extends IBaseEntity {
    patientId: number;
    ward: string;
    roomNumber: string;
    admittedDate: Date;
    dischargeDate?: Date;
}

//----Lab Order Interface----

export interface ILabOrder extends IBaseEntity {
    patientId: number;
    doctorId: number;
    testName: string;
    status: string;
}
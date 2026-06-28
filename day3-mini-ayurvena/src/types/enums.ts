//----User Roles----

export enum UserRole {
    ADMIN = "Admin",
    DOCTOR = "Doctor",
    RECEPTIONIST = "Receptionist",
    PATIENT = "Patient"
}

//----Hospital Departments----

export enum Department {
    CARDIOLOGY = "Cardiology",
    NEUROLOGY = "Neurology",
    ORTHOPEDICS = "Orthopedics",
    PEDIATRICS = "Pediatrics",
    GENERAL = "General Medicine"
}

//----Blood Groups----

export enum BloodGroup {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-"
}

//----Appointment Status----

export enum AppointmentStatus {
    BOOKED = "Booked",
    CONFIRMED = "Confirmed",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled"
}

//----Payment Status----

export enum PaymentStatus {
    PENDING = "Pending",
    PAID = "Paid",
    REFUNDED = "Refunded"
}

//----Gender----

export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}
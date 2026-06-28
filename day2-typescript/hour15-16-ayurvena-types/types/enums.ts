//----Export ENUMS----

export enum UserRole {
    ADMIN = "ADMIN",
    DOCTOR = "DOCTOR",
    RECEPTIONIST = "RECEPTIONIST",
    PATIENT = "PATIENT",
    LAB_TECHNICIAN = "LAB_TECHNICIAN"
}
export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}
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
export enum Department {
    GENERAL = "General",
    CARDIOLOGY = "Cardiology",
    ORTHOPEDICS = "Orthopedics",
    DERMATOLOGY = "Dermatology",
    AYURVEDA = "Ayurveda",
    PEDIATRICS = "Pediatrics"
}
export enum AppointmentStatus {
    SCHEDULED = "Scheduled",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled"
}
export enum PaymentStatus {
    PENDING = "Pending",
    PAID = "Paid",
    FAILED = "Failed"
}
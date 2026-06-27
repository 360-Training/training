export enum UserRole {
    Patient = "patient",
    Doctor = "doctor",
    Receptionist = "receptionis",
    Nurse = "nurse",
    Admin = "admin",
    SuperAdmin = "superAdmin"
}
export enum Department {
    General = "general",
    Cardiology = "cardiology",
    Neurology = "neurology",
    Orthopedics = "orthopedics",
    Pediatrics = "pediatrics",
    Emergency = "emergency"
}
export enum AppointmentStatus {
    Scheduled = "scheduled",
    Completed = "completed",
    Cancelled = "cancelled",
    NoShow = "no_show"
}

export enum PaymentStatus {
    Pending = "pending",
    Paid = "paid",
    Failed = "failed",
    Refunded = "refunded"
}

export enum PaymentMethod {
    Cash = "cash",
    Card = "card",
    UPI = "upi",
    Insurance = "insurance"
}
export enum BloodGroup {
    APositive = "O+",
    ANegative = "O-",
    BPositive = "AB+",
    BNegative = "AB-",
    ABPositive = "B+",
    ABNegative = "B-",
    OPositive = "A+",
    ONegative = "A-"
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

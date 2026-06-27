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
    OPositive = "O+",
    ONegative = "O-",
    ABPositive = "AB+",
    ABNegative = "AB-",
    BPositive = "B+",
    BNegative = "B-",
    APositive = "A+",
    ANegative = "A-"
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export enum PatientStatus {
    Active = "Active",
    Admitted = "Admitted",
    Discharged = "Discharged"
}


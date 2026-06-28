export enum UserRole{
  PATIENT="patient",
  DOCTOR="doctor",
  RECEPTIONIST="receptionist",
  NURSE="nurse",
  ADMIN="admin",
  SUPER_ADMIN='super_admin'
}
export enum Department {
    CARDIOLOGY="cardiology",
    NEUROLOGY="neurology",
    ORTHOPEDICS="orthopedics",
    GENERAL="general",
    EMERGENCY="emergency",
    ICU="icu"
}
export enum AppointmentStatus {
    SCHEDULED = "Scheduled",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled"
}
export enum PaymentStatus {
    PENDING = "Pending",
    PAID ="Paid",
    FAILED = "Failed",
    REFUNDED = "Refunded"
}
export enum PaymentMethod{
  CASH="cash",
  CARD="card",
  UPI="upi",
  INSURANCE="insurance"
}
export enum QueueStatus{
    WAITING = "waiting",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
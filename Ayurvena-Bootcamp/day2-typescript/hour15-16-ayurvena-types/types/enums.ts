export enum UserRole{
  PATIENT="patient",
  DOCTOR="doctor",
  RECEPTIONIST="receptionist",
  NURSE="nurse",
  ADMIN="admin",
  SUPER_ADMIN='super_admin'
}
export enum Department{
  CARDIOLOGY="cardiology",
  NEUROLOGY="neurology",
  ORTHOPEDICS="orthopedics",
  GENERAL="general",
  EMERGENCY="emergency",
  ICU="icu"
 }
export enum AppointmentStatus{
  SCHEDULED="scheduled",
  COMPLETED="completed",
  CANCELLED="cancelled",
  NO_SHOW="no_show"
 }
export enum PaymentStatus{
  PENDING="pending",
  PAID="paid",
  FAILED="failed",
  REFUNDED="refunded"
 }
export enum PaymentMethod{
  CASH="cash",
  CARD="card",
UPI="upi",
INSURANCE="insurance"
 }
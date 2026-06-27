export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}
export enum AppointmentStatus {
  Booked = "Booked",
  Completed = "Completed",
  Cancelled = "Cancelled"
}
export enum PaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Failed = "Failed"
}
console.log(Gender.Male);
console.log(AppointmentStatus.Booked);
console.log(PaymentStatus.Paid);
export class Appointment {
  constructor(id, patient, doctor) {
    this.id = id;
    this.patient = patient;
    this.doctor = doctor;
    this.status = "scheduled";
  }
  cancel() {
    this.status = "cancelled";
  }
}
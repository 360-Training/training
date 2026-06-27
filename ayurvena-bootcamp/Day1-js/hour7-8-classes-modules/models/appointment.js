class Appointment {
  constructor(id, patientName, doctorName, time) {
    this.id = id;
    this.patientName = patientName;
    this.doctorName = doctorName;
    this.time = time;
  }
}
module.exports = Appointment;
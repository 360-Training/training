const Appointment = require("../models/Appointment");

let appointments = [];
function bookAppointment(patientName, doctorName, time) {
  let appointment = new Appointment(
    appointments.length + 1,
    patientName,
    doctorName,
    time
  );
  appointments.push(appointment);
  return appointment;
}
function getAppointments() {
  return appointments;
}
module.exports = { bookAppointment, getAppointments };
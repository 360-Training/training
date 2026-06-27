const { getPatients } = require("./PatientService");
const { getDoctors } = require("./DoctorService");
const { getAppointments } = require("./AppointmentService");

function showDashboard() {
  console.log("\n HOSPITAL DASHBOARD ");
  console.log("Patients:", getPatients().length);
  console.log("Doctors:", getDoctors().length);
  console.log("Appointments:", getAppointments().length);
}
module.exports = { showDashboard };
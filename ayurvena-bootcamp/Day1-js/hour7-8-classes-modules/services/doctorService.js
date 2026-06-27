const Doctor = require("../models/Doctor");
let doctors = [];
function addDoctor(name, specialization) {
  let doctor = new Doctor(
    doctors.length + 1,
    name,
    specialization
  );
  doctors.push(doctor);
  return doctor;
}
function getDoctors() {
  return doctors;
}
module.exports = { addDoctor, getDoctors };
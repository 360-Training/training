const Patient = require("../models/Patient");
let patients = [];
function addPatient(name, age, gender, disease) {
  let patient = new Patient(
    patients.length + 1,
    name,
    age,
    gender,
    disease
  );
  patients.push(patient);
  return patient;
}
function getPatients() {
  return patients;
}
module.exports = { addPatient, getPatients };
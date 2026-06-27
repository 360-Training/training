const { addPatient } = require("../services/PatientService");
const { addDoctor } = require("../services/DoctorService");

function seedData() {
  addPatient("Ravi", 25, "Male", "Fever");
  addPatient("Sita", 30, "Female", "Cold");
  addDoctor("Dr. Kumar", "General");
  addDoctor("Dr. Priya", "Ortho");
  console.log("Seed data added");
}
module.exports = seedData;
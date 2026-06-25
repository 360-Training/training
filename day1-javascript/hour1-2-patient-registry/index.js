const patients = [
  {
    id: 1,
    name: "Rahul",
    age: 25,
    phone: "9876543210",
    bloodGroup: "O+",
    allergies: [],
    isActive: true
  }
];

function registerPatient(name, age, phone, bloodGroup) {
    
  const patient = {
    id: patients.length + 1,
    name,
    age,
    phone,
    bloodGroup,
    allergies: [],
    isActive: true
  };

  patients.push(patient);
  return patient;
}

function findPatientByPhone(phone) {
  return patients.find(patient => patient.phone === phone);
}
function listActivePatients() {
  return patients.filter(patient => patient.isActive);
}
 function deactivatePatient(id) {
  const patient = patients.find(patient => patient.id === id);

  if (patient) {
    patient.isActive = false;
  }
}
const newPatient = registerPatient(
  "Soumya",
  22,
  "9999999999",
  "B+"
);

console.log(newPatient);
console.log(findPatientByPhone("9999999999"));
console.log(listActivePatients());
deactivatePatient(1);
console.log(listActivePatients());
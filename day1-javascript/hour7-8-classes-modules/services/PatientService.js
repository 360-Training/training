const Patient = require("../models/Patient");

class PatientService {

    constructor() {
        this.patients = [];
        this.currentId = 1;
    }

    registerPatient(data) {

        const patient = new Patient(
            this.currentId++,
            data.name,
            data.age,
            data.phone,
            data.bloodGroup
        );

        this.patients.push(patient);

        return patient;
    }

    findPatient(id) {
        return this.patients.find(patient => patient.id === id);
    }

    searchPatient(name) {

        return this.patients.filter(patient =>
            patient.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    deactivatePatient(id) {

        const patient = this.findPatient(id);

        if (patient) {
            patient.deactivate();
            return patient;
        }

        return "Patient Not Found";
    }

    getAllPatients() {
        return this.patients;
    }

}

module.exports = PatientService;


// ---------------- TESTS ----------------

const patientService = new PatientService();

console.log("\n--- TEST 1: Register Patient ---");

const patient1 = patientService.registerPatient({
    name: "Rahul Kumar",
    age: 32,
    phone: "8889998888",
    bloodGroup: "O+"
});

console.log(patient1);

console.log("\n--- TEST 2: Register Another Patient ---");

const patient2 = patientService.registerPatient({
    name: "Priya Sharma",
    age: 28,
    phone: "7778889999",
    bloodGroup: "B+"
});

console.log(patient2);

console.log("\n--- TEST 3: Find Patient ---");

console.log(patientService.findPatient(1));

console.log("\n--- TEST 4: Search Patient ---");

console.log(patientService.searchPatient("rah"));

console.log("\n--- TEST 5: Get All Patients ---");

console.log(patientService.getAllPatients());

console.log("\n--- TEST 6: Deactivate Patient ---");

console.log(patientService.deactivatePatient(1));

console.log("\n--- TEST 7: All Patients After Deactivation ---");

console.log(patientService.getAllPatients());
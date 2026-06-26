const Patient = require("../models/Patient");

class PatientService {
  constructor() {
    this.patients = [];
    this.currentId = 1;
  }

  // Register Patient
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

  // Get All Patients
  getAllPatients() {
    return this.patients;
  }

  // Find Patient by ID
  findPatient(id) {
    return this.patients.find(patient => patient.id === id);
  }

  // Search Patient by Name
  searchPatients(name) {
    return this.patients.filter(patient =>
      patient.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Update Patient
  updatePatient(id, updatedData) {
    const patient = this.findPatient(id);

    if (!patient) {
      return null;
    }

    if (updatedData.name) {
      patient.name = updatedData.name;
    }

    if (updatedData.age) {
      patient.age = updatedData.age;
    }

    if (updatedData.phone) {
      patient.phone = updatedData.phone;
    }

    if (updatedData.bloodGroup) {
      patient.bloodGroup = updatedData.bloodGroup;
    }

    return patient;
  }
  // Add Allergy
  addPatientAllergy(id, allergy) {
    const patient = this.findPatient(id);
    if (!patient) {
        return null;
    }
    patient.addAllergy(allergy);
    return patient;
  }

// Remove Allergy
    removePatientAllergy(id, allergy) {
        const patient = this.findPatient(id);
        if (!patient) {
            return null;
        }
        patient.removeAllergy(allergy);
        return patient;
    }

// Deactivate Patient
   deactivatePatient(id) {
    const patient = this.findPatient(id);
    if (!patient) {
        return null;
    }
    patient.deactivate();
    return patient;
  }

// Delete Patient
  deletePatient(id) {
    const index = this.patients.findIndex(
        patient => patient.id === id
    );
    if (index === -1) {
        return false;
    }
    this.patients.splice(index, 1);
    return true;
   }

   // Total Patients
    getPatientCount() {
        return this.patients.length;
    }

}
module.exports = PatientService;

// ---------------- TESTS ----------------

const patientService = new PatientService();

console.log("\n--- TEST 1: Register Patient ---");

const patient1 = patientService.registerPatient({
    name: "Priya Sharma",
    age: 32,
    phone: "9708922701",
    bloodGroup: "O+"
});

console.log(patient1);

console.log("\n--- TEST 2: Register Another Patient ---");

const patient2 = patientService.registerPatient({
    name: "Rahul Sharma",
    age: 28,
    phone: "9876543211",
    bloodGroup: "B+"
});

console.log(patient2);

console.log("\n--- TEST 3: Find Patient ---");

console.log(patientService.findPatient(1));

console.log("\n--- TEST 4: Search Patient ---");

console.log(patientService.searchPatients("rah"));

console.log("\n--- TEST 5: Get All Patients ---");

console.log(patientService.getAllPatients());

console.log("\n--- TEST 6: Deactivate Patient ---");

console.log(patientService.deactivatePatient(1));

console.log("\n--- TEST 7: All Patients After Deactivation ---");

console.log(patientService.getAllPatients());
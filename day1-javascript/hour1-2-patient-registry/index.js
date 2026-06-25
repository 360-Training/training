// ---Array to store patient data---
let patients = [];

// ---Auto-incrementing ID generator---
let currentID = 1;

//---create patient data---

patients = [
    {
        id: currentID++,
        name: "Rahul",
        age: 32,
        phone: "8889998888",
        bloodGroup: "A+",
        allergies: ["Dust"],
        isActive: true
    },
    {
        id: currentID++,
        name: "Priya",
        age:28,
        phone: "7778889999",
        bloodGroup: "B+",
        allergies: ["Pollen"],
        isActive: true
    },
    {
        id: currentID++,
        name: "Amit",
        age: 45,
        phone: "9998887777",
        bloodGroup: "O-",
        allergies: [],
        isActive: true
    },
    {
        id: currentID++,
        name: "Sneha",
        age: 22,
        phone: "6667778888",
        bloodGroup: "AB+",
        allergies: ["Pollen"],
        isActive: true
    },
    {
        id: currentID++,
        name: "Vikram",
        age: 38,
        phone: "5556667777",
        bloodGroup: "A-",
        allergies: ["Penicillin"],
        isActive: true
    }

];
console.log("Initial Patient Data:", patients);

// ---Function to register a new patient---

function registerPatient(name, age, phone, bloodGroup, allergies=[]) {
    const newPatient = {
        id: currentID++,
        name: name,
        age: age,
        phone: phone,
        bloodGroup: bloodGroup,
        allergies: allergies,
        isActive: true
    };
    patients.push(newPatient);
    return newPatient;
}

// ---Function to find patient by Phone---

function findPatientByPhone(phone) {
    const patient = patients.find(p => p.phone === phone);
    return patient ? patient : "Not Found";
}

// ---Function to list all active patients---

function listActivePatients() {
    return patients.filter(p => p.isActive === true);
}

// ---Function to deactivate a patient---

function deactivatePatient(id) {
    const patient = patients.find(p => p.id === id);

    if (patient) {
        patient.isActive = false;
        return patient;
    }
    return "Patient not found";
}

// ---Testing the System---

console.log("Register:", registerPatient("Meena", 30, "4445556666", "O+"));
console.log("Find:", findPatientByPhone("5556667777"));
console.log("Find Invalid:", findPatientByPhone("000"));
console.log("Active Patients:", listActivePatients());
console.log("Deactivate:", deactivatePatient(1));
console.log("Active After Deactivation:", listActivePatients());

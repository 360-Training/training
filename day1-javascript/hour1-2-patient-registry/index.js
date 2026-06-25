//----Patient Registry System----//
const patients = [
    {
        id: 1,
        name: "Rahul Kumar",
        age: 32,
        phone: "9876543210",
        bloodGroup: "O+",
        allergies: ["Penicillin"],
        isActive: true
    },
    {
        id: 2,
        name: "Priya Sharma",
        age: 28,
        phone: "9876543211",
        bloodGroup: "B+",
        allergies: [],
        isActive: true
    },
    {
        id: 3,
        name: "Amit Verma",
        age: 45,
        phone: "9876543212",
        bloodGroup: "A+",
        allergies: ["Dust"],
        isActive: false
    },
    {
        id: 4,
        name: "Sneha Reddy",
        age: 24,
        phone: "9876543213",
        bloodGroup: "AB+",
        allergies: [],
        isActive: true
    },
    {
        id: 5,
        name: "Kiran Patel",
        age: 38,
        phone: "9876543214",
        bloodGroup: "O-",
        allergies: ["Peanuts"],
        isActive: true
    }
];
console.log(patients);
//----Function to register a new patient----//
function registerPatient(name, age, phone, bloodGroup) {

    const newPatient = {
        id: patients.length + 1,
        name: name,
        age: age,
        phone: phone,
        bloodGroup: bloodGroup,
        allergies: [],
        isActive: true
    };

    patients.push(newPatient);

    return newPatient;
}
console.log("===Register Patient Test===");

const patient = registerPatient("Harsha", 22, "9898989899", "o+");
    console.log(patient);
    console.log("Total Patients: ", patients.length);

//----Function to find a patient by phone number----//
function findPatientByPhone(phone) {

    const patient = patients.find(p => p.phone === phone);

    if (patient) {
        return patient;
    }

    return "Not found";
}

console.log("\n=== Find Existing Patient ===");
console.log(findPatientByPhone("9876543210"));

console.log("\n=== Find Non Existing Patient ===");
console.log(findPatientByPhone("1111111111"));

function listActivePatients() {
    return patients.filter(patient => patient.isActive === true);
}

console.log("\n=== Active Patients ===");
console.log(listActivePatients());
// ----Function to Deactivate a patient by ID---- //
function deactivatePatient(id) {
    const patient = patients.find(patient => patient.id === id);

    if (patient) {
        patient.isActive = false;
        return patient;
    }

    return "Patient not found";
}

console.log("\n=== Deactivate Patient Test ===");
console.log(deactivatePatient(2));

console.log("\n=== Active Patients After Deactivation ===");
console.log(listActivePatients());
// Patient Registry System
// ---- Patient Database ----
let patients = [];
let currentID = 1;

// ---- Initial Patients ----
patients = [
    {
        id: currentID++,
        name: "Rahul Kumar",
        age: 32,
        phone: "8889998888",
        bloodGroup: "A+",
        allergies: ["Dust"],
        isActive: true
    },
    {
        id: currentID++,
        name: "Priya Sharma",
        age: 28,
        phone: "7778889999",
        bloodGroup: "B+",
        allergies: ["Pollen"],
        isActive: true
    },
    {
        id: currentID++,
        name: "Amit Singh",
        age: 45,
        phone: "9998887777",
        bloodGroup: "O+",
        allergies: [],
        isActive: true
    },
    {
        id: currentID++,
        name: "Sneha Reddy",
        age: 22,
        phone: "6667778888",
        bloodGroup: "AB+",
        allergies: ["Pollen"],
        isActive: true
    },
    {
        id: currentID++,
        name: "Vikram Rao",
        age: 38,
        phone: "5556667777",
        bloodGroup: "A-",
        allergies: ["Penicillin"],
        isActive: true
    }
];

console.log("Initial Patient Data:", patients);

// ---- Register a new patient ----
function registerPatient(name, age, phone, bloodGroup, allergies = []) {
    const newPatient = {
        id: currentID++,
        name,
        age,
        phone,
        bloodGroup,
        allergies,
        isActive: true
    };

    patients.push(newPatient);
    return newPatient;
}

// ---- Find Patient By Phone Number ----
function findPatientByPhone(phone) {
    const patient = patients.find(p => p.phone === phone);
    return patient || "Not Found";
}


// ---- Active Patients ----

function listActivePatients() {
    return patients.filter(p => p.isActive);
}

// ----Deactivate a patient ----

function deactivatePatient(id) {
    const patient = patients.find(p => p.id === id);
    if (!patient) return "Patient not found";

    patient.isActive = false;
    return patient;
}

// ---- Search, Filter, Stats, Sort, Summary ----

function searchPatients(query) {
    return patients.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );
}

// ---- FILTER BY BLOOD Group ----
function filterByBloodGroup(group) {
    return patients.filter(p => p.bloodGroup === group);
}

// ---- Patient Statistics----
function getPatientStats() {
    const total = patients.length;
    const active = patients.filter(p => p.isActive).length;

    const avgAge =
        patients.reduce((sum, p) => sum + p.age, 0) / total;

    const bloodGroups = patients.reduce((acc, p) => {
        acc[p.bloodGroup] = (acc[p.bloodGroup] || 0) + 1;
        return acc;
    }, {});

    return {
        total,
        active,
        avgAge: Number(avgAge.toFixed(1)),
        bloodGroups
    };
}

// ---- Sort Patients ----
function sortPatients(field, order = "asc") {
    return [...patients].sort((a, b) => {
        if (order === "asc") return a[field] > b[field] ? 1 : -1;
        else return a[field] < b[field] ? 1 : -1;
    });
}

// ---- Patient Summary ----
function getPatientSummary(id) {
    const p = patients.find(p => p.id === id);
    if (!p) return "Patient not found";

    const allergies =
        p.allergies.length > 0 ? p.allergies.join(", ") : "None";

    return `${p.name} | Age: ${p.age} | Blood: ${p.bloodGroup} | Allergies: ${allergies}`;
}

// ---- Testing ----

console.log("\n--- REGISTER TEST ---");
console.log(registerPatient("Meena Joshi", 30, "4445556666", "O+"));

console.log("\n--- SEARCH TEST ---");
console.log(searchPatients("rah"));

console.log("\n--- BLOOD GROUP FILTER ---");
console.log(filterByBloodGroup("O+"));

console.log("\n--- STATS ---");
console.log(getPatientStats());

console.log("\n--- SORT BY AGE DESC ---");
console.log(sortPatients("age", "desc"));

console.log("\n--- SUMMARY ---");
console.log(getPatientSummary(1));

console.log("\n--- DEACTIVATE ---");
console.log(deactivatePatient(1));

console.log("\n--- ACTIVE PATIENTS ---");
console.log(listActivePatients());
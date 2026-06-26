//1-2 paitent Registry
const patients = [
    {
        id: 1,
        name: "Krishna",
        age: 30,
        phone: "9654123760",
        bloodGroup: "O-",
        allergies: ["Peanuts"],
        isActive: true
    },
    {
        id: 2,
        name: "Priya",
        age: 32,
        phone: "9876543211",
        bloodGroup: "A+",
        allergies: ["Dust"],
        isActive: false
    },
    {
        id: 3,
        name: "Rohan",
        age: 40,
        phone: "9654112597",
        bloodGroup: "O+",
        allergies: [],
        isActive: true
    },
    {
    id: 4,
    name: "Sneha",
    age: 27,
    phone: "9001122334",
    bloodGroup: "AB+",
    allergies: ["Milk"],
    isActive: true 
    },
    {
    id: 5,
    name: "Arjun",
    age: 35,
    phone: "9556677889",
    bloodGroup: "B-",
    allergies: ["Seafood"],
    isActive: true
    }
];

function registerPatient(name,age,phone,bloodGroup){
    let newPatient = {
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
};
  function findPatientByPhone(phone) {

    for (let i = 0; i < patients.length; i++) {

        if (patients[i].phone === phone) {
            return patients[i];
        }

    }

    return "Not found";
}
    function listActivePatients(){
        let activePatients = [];
    for(let i=0; i<patients.length; i++){
        if(patients[i].isActive === true){
            activePatients.push(patients[i]);
        }
    }
    return activePatients;
}
function deactivatePatient(id){
    for(let i=0; i<patients.length; i++){
        if(patients[i].id === id){
            patients[i].isActive = false;
            return patients[i];
        }
    }
    return "Patient not found."
}
//patient search engine
function searchPatients(query) {

    return patients.filter(function(patient) {
        return patient.name.toLowerCase().includes(query.toLowerCase());
    });

}

// Filter by Blood Group
function filterByBloodGroup(group) {

    return patients.filter(function(patient) {
        return patient.bloodGroup === group;
    });

}

// Patient Statistics
function getPatientStats() {

    let totalAge = 0;

    for (let i = 0; i < patients.length; i++) {
        totalAge += patients[i].age;
    }

    let activePatients = patients.filter(function(patient) {
        return patient.isActive;
    });

    let bloodGroups = patients.reduce(function(result, patient) {

        if (result[patient.bloodGroup]) {
            result[patient.bloodGroup]++;
        } else {
            result[patient.bloodGroup] = 1;
        }

        return result;

    }, {});

    return {
        total: patients.length,
        active: activePatients.length,
        avgAge: totalAge / patients.length,
        bloodGroups: bloodGroups
    };
}

// Sort Patients
function sortPatients(field, order) {

    let sortedPatients = [...patients];

    sortedPatients.sort(function(a, b) {

        if (order === "asc") {

            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
            return 0;

        } else {

            if (a[field] < b[field]) return 1;
            if (a[field] > b[field]) return -1;
            return 0;

        }

    });

    return sortedPatients;
}

// Patient Summary
function getPatientSummary(id) {

    let patient = patients.find(function(patient) {
        return patient.id === id;
    });

    if (!patient) {
        return "Patient not found";
    }

    let allergyText;

    if (patient.allergies.length === 0) {
        allergyText = "None";
    } else {
        allergyText = patient.allergies.join(", ");
    }

    return `${patient.name} | Age: ${patient.age} | Blood: ${patient.bloodGroup} | Allergies: ${allergyText}`;
}


console.log(registerPatient("Anjali", 28, "9876543210", "B+"));
console.log(findPatientByPhone("9654123760"));//exsting paient
console.log(findPatientByPhone("1111111111"));//non existing patient
console.log(listActivePatients());//list all active patients
console.log(deactivatePatient(2));//deactivate existing patient
console.log(searchPatients("roh"));//search by name
console.log(searchPatients("ROH"));
console.log(filterByBloodGroup("O+"));//filter by blood group
console.log(filterByBloodGroup("A+"));
console.log(getPatientStats());//get patient statistics
console.log(getPatientStats());
console.log(sortPatients("age", "desc"));//sort by age in descending order
console.log(sortPatients("name", "asc"));//sort by name in ascending order
console.log(getPatientSummary(1));//summmary of existing patient
console.log(getPatientSummary(3));

console.log(
    patients.map(function(patient) {
    return patient.name;
})
);
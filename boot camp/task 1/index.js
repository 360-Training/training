const patients= [
    {
    id: 1,
    name: "Rohan",
    age: 20,
    phone: "9874565681",
    bloodGroup: "A+",
    isActive: true
    },
    {
    id: 2,
    name: "Abhi",
    age: 25,
    phone: "987456321",
    bloodGroup: "B+",
    isActive: false
    },
    {
    id: 3,
    name: "Nipun",
    age: 22,
    phone: "987465321",
    bloodGroup: "O-",
    isActive: true
    },
    {
    id: 4,
    name: "Venkat",
    age: 30,
    phone: "984756321",
    bloodGroup: "AB-",
    isActive: false
    },
    {
    id: 5,
    name: "Madhavi",
    age: 36,
    phone: "978456321",
    bloodGroup: "A+",
    isActive: false
    },
];
function getActivePatientNames(patients){
    return patients
    .filter(patient =>
        patient.isActive)
        .map(patient => patient.name)
        .join(",");
}

function findByPhone(patients,phone){
    return patients.find(patient =>
        patient.phone === phone)  ||
        "Patient not found";
}

function getAverageAge(patients) {
    const activePatients =
    patients.filter(patient =>
        patient.isActive);
    
        if(activePatients.length === 0){
            return 0;
        }
        const totalAge= 
        activePatients.reduce((sum,
        patient) => sum+patient.age,0);
            return totalAge/
        activePatients.length;
}

function groupByBloodGroup(patients) {
    return patients.reduce((groups,patient) =>{
        if(!
            groups[patient.bloodGroup]) {
                groups[patient.bloodGroup]=
                [];
            }
            groups[patient.bloodGroup].push(patient.name);
            return groups;
        },{} );
    }

function searchAndsort(patients,query){
    return patients.filter(patient =>
        patient.name.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a,b) =>a.age - b.age);
}
console.log("Active Patients:",getActivePatientNames(patients));
console.log("Find By phone:",findByPhone(patients,"9874563120"));
console.log("Average Age:",getAverageAge(patients));
console.log("Grouped By BloodGroup:",groupByBloodGroup(patients));
console.log("Search & Sort:",searchAndsort(patients, "a"));


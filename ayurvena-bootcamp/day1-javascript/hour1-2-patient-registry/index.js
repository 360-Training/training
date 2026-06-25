const patients = [
  {
    id: 1,
    name: "Rahul Kumar",
    age: 32,
    phone: "9876543210",
    bloodGroup: "O+",
    allergies: ["Dust"],
    isActive: true
  },
  {
    id: 2,
    name: "thanvi",
    age: 20,
    phone: "9876543211",
    bloodGroup: "B+",
    allergies: ["Pollen"],
    isActive: true
  },
  {
    id: 3,
    name: "Amit",
    age: 15,
    phone: "9876543212",
    bloodGroup: "A+",
    allergies: [],
    isActive: true
  },
  {
    id: 4,
    name: "thanmai Reddy",
    age: 35,
    phone: "9876543213",
    bloodGroup: "O+",
    allergies: ["Peanuts"],
    isActive: false
  },
  {
    id: 5,
    name: "Harini",
    age: 20,
    phone: "9876543214",
    bloodGroup: "O-",
    allergies: [],
    isActive: true
  }
];


function registerPatient(name, age, phone, bloodGroup) {
  const newPatient = {
    id: patients.length + 1,
    name,
    age,
    phone,
    bloodGroup,
    allergies: [],
    isActive: true
  };

  patients.push(newPatient);
  return newPatient;
}


function findPatientByPhone(phone) {
  const patient = patients.find(function(p) {
    return p.phone === phone;
  });

  if (patient) {
    return patient;
  } else {
    return "Not found";
  }
}


function listActivePatients() {
  let activePatients = [];

  for (const patient of patients) {
    if (patient.isActive === true) {
      activePatients.push(patient);
    }
  }

  return activePatients;
}


console.log("Register Patient:");
console.log(registerPatient("Manu", 21, "9876543299", "B+"));

console.log("\nFind Existing Patient:");
console.log(findPatientByPhone("9876543210"));

console.log("\nFind Non Existing Patient:");
console.log(findPatientByPhone("1111111111"));

console.log("\nActive Patients:");
console.log(listActivePatients());


//Patient Search Engine

function searchPatients(patientName) {
  const searchResults = patients.filter(function(patient) {
    return patient.name.toLowerCase().includes(patientName.toLowerCase());
  });
  return searchResults;
}

function filterByBloodGroup(bloodGroup) {
  const filteredPatients = patients.filter(p=>p.bloodGroup === bloodGroup);
  return filteredPatients;
}


function getPatientStats(){
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.isActive).length;
  const avgAge = patients.reduce((sum, p) => sum + p.age, 0) / totalPatients;
  const bloodGroupCounts = patients.reduce((counts, p) => {
    counts[p.bloodGroup] = (counts[p.bloodGroup] || 0) + 1;
    return counts;
  }, {});

  return {
    totalPatients,
    activePatients,
    avgAge,
    bloodGroupCounts
  };
}


function sortPatients(field, order){
  const sortedPatients = [...patients].sort((a, b) => {
    if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sortedPatients;
}


function getPatientSummary(id){
  const patient = patients.find(p => p.id === id);
  if (!patient) {
        return "Patient not found";
  }
let allergies;
  if (patient.allergies.length === 0){
    allergies = "None";
  }else{
    allergies = patient.allergies.join(", ");
  }
  return `${patient.name} | Age: ${patient.age} | Blood: ${patient.bloodGroup} | Allergies: ${allergies}`;
}



console.log("\nSearch Patients:");
console.log(searchPatients("rah"));
console.log("\nFilter by Blood Group:");
console.log(filterByBloodGroup("O+"));
console.log("\nPatient Statistics:");
console.log(getPatientStats());
console.log("\nSort Patients by Age (Ascending):");
console.log(sortPatients("age", "asc"));
console.log("\nPatient Summary:");
console.log(getPatientSummary(2));
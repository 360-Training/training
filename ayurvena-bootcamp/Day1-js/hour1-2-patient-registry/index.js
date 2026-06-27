

let patients = [
  {
    id: 1,
    name: "Ravi Kumar",
    age: 28,
    gender: "Male",
    disease: "Fever",
    mobile: "9876543210"
  },
  {
    id: 2,
    name: "Priya Reddy",
    age: 24,
    gender: "Female",
    disease: "Cold",
    mobile: "9876501234"
  },
  {
    id: 3,
    name: "Suresh",
    age: 40,
    gender: "Male",
    disease: "Diabetes",
    mobile: "9988776655"
  }
];

function showPatients() {
  console.log("\n------ Patient List ------");

  if (patients.length === 0) {
    console.log("No patients available.");
    return;
  }

  patients.forEach(function (patient) {
    console.log(
      "ID:", patient.id,
      "Name:", patient.name,
      "Age:", patient.age,
      "Disease:", patient.disease
    );
  });
}

function addPatient(id, name, age, gender, disease, mobile) {
  let patient = {
    id: id,
    name: name,
    age: age,
    gender: gender,
    disease: disease,
    mobile: mobile
  };

  patients.push(patient);
  console.log(name + " added successfully.");
}

function findPatient(id) {
  let patient = patients.find(function (item) {
    return item.id === id;
  });

  if (patient) {
    console.log("\nPatient Found");
    console.log(patient);
  } else {
    console.log("Patient not found.");
  }
}

function updateDisease(id, newDisease) {
  let patient = patients.find(function (item) {
    return item.id === id;
  });

  if (patient) {
    patient.disease = newDisease;
    console.log("Disease updated.");
  } else {
    console.log("Patient not found.");
  }
}

function deletePatient(id) {
  let index = patients.findIndex(function (item) {
    return item.id === id;
  });

  if (index !== -1) {
    console.log(patients[index].name + " removed.");
    patients.splice(index, 1);
  } else {
    console.log("Patient not found.");
  }
}

function totalPatients() {
  console.log("\nTotal Patients:", patients.length);
}

function patientsAboveAge(age) {
  console.log("\nPatients above age " + age);

  let result = patients.filter(function (item) {
    return item.age > age;
  });

  result.forEach(function (item) {
    console.log(item.name + " - " + item.age);
  });
}



showPatients();

addPatient(
  4,
  "Lakshmi",
  31,
  "Female",
  "Headache",
  "9123456789"
);

addPatient(
  5,
  "Ramesh",
  36,
  "Male",
  "Back Pain",
  "9000012345"
);

showPatients();
findPatient(3);
updateDisease(2, "Viral Fever");
deletePatient(1);
showPatients();
patientsAboveAge(30);
totalPatients();
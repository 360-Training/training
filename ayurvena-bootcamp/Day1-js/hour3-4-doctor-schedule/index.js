
let doctors = [
    {
        id: 1,
        name: "Dr. Ramesh",
        specialization: "General Physician",
        availableTime: "09:00 AM - 01:00 PM"
    },
    {
        id: 2,
        name: "Dr. Kavya",
        specialization: "Dentist",
        availableTime: "10:00 AM - 02:00 PM"
    },
    {
        id: 3,
        name: "Dr. Anil",
        specialization: "Cardiologist",
        availableTime: "02:00 PM - 06:00 PM"
    }
];

function showDoctors() {
    console.log("\nDoctor Schedule");
    doctors.forEach(function (doctor) {
        console.log(
            "ID:", doctor.id,
            "Name:", doctor.name,
            "Department:", doctor.specialization,
            "Time:", doctor.availableTime
        );
    });
}
function addDoctor(id, name, specialization, availableTime) {
    let doctor = {
        id: id,
        name: name,
        specialization: specialization,
        availableTime: availableTime
    };
    doctors.push(doctor);
    console.log(name + " added successfully.");
}
function findDoctor(id) {
    let doctor = doctors.find(function (item) {
        return item.id === id;
    });
    if (doctor) {
        console.log("\nDoctor Details");
        console.log(doctor);
    } else {
        console.log("Doctor not found.");
    }
}

function updateTime(id, newTime) {

    let doctor = doctors.find(function (item) {
        return item.id === id;
    });
    if (doctor) {
        doctor.availableTime = newTime;
        console.log("Doctor timing updated.");
    } else {
        console.log("Doctor not found.");
    }
}
function searchByDepartment(department) {
    console.log("\nDoctors in " + department);
    let result = doctors.filter(function (item) {
        return item.specialization.toLowerCase() === department.toLowerCase();
    });
    if (result.length === 0) {
        console.log("No doctors available.");
        return;
    }
    result.forEach(function (item) {
        console.log(item.name + " - " + item.availableTime);
    });
}
function totalDoctors() {
    console.log("\nTotal Doctors:", doctors.length);
}

showDoctors();
addDoctor(
    4,
    "Dr. Priya",
    "Skin Specialist",
    "11:00 AM - 03:00 PM"
);

showDoctors();
findDoctor(2);
updateTime(
    3,
    "03:00 PM - 07:00 PM"
);

searchByDepartment("Dentist");
totalDoctors();
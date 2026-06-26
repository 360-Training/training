const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const names =  [
    "Priyanka Reddy",
    "Rahul Sharma",
    "Amit Verma",
    "Sneha Reddy",
    "Arjun Singh",
    "Pooja Verma",
    "Kiran Reddy",
    "Anjali Gupta",
    "Rohit Yadav",
    "Neha Sharma",
    "Suresh Kumar",
    "Deepika Rao",
    "Vikram Reddy",
    "Meera Joshi",
    "Abhay Kumar",
    "Nisha Singh",
    "Harish Patel",
    "Kavya Reddy",
    "Manoj Verma",
    "Divya Sharma"

];

const bloodgroups = [
    "A+",
    "O+",
    "O-",
    "A-",
    "AB+",
    "B-",
    "AB-",
    "B+"
]

const patient = [];

for (let j = 0; j < 20; j++){
    const age = Math.floor(Math.random()*43) + 18;
    const phone = "9" + Math.floor(100000000 + Math.random() * 900000000);
    patient.push(
        new Patient(
            j+1,
            names[j],
            age,
            phone,
            bloodgroups[Math.floor(Math.random()*bloodgroups.length)]
        )
    );
}

const doctors = [
    new Doctor(1, "Dr. Kumar", "Cardiology", 500),
    new Doctor(2, "Dr. Sharma", "Dermatology", 800),
    new Doctor(3, "Dr. Reddy", "Neurology", 1000),
    new Doctor(4, "Dr. Verma", "Gynachelogy", 900),
    new Doctor(5, "Dr. Mehta", "Orthopedics", 700)
];

const appointments = []

const statuses = [
    "scheduled",
    "completed",
    "cancelled"
];

for (let j = 0; j <10; j++){
    const doctor = doctors[j % doctors.length];
    const patients = patient[j];
    const times = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00"
    ];
    const appointment = new Appointment(
        j+1,
        patients,
        doctor,
        "2026-07-01",
        times[j % times.length]
    );
    appointments.status = statuses[j % statuses.length];
    appointments.push(appointment);
}
    appointments[0].complete();
    appointments[1].cancel();
    appointments[2].complete();
    appointments[3].cancel();
    appointments[4].complete();

module.exports = {
    patient,
    doctors,
    appointments
};
// total patients
console.log(patient.length);
// first patient
console.log(patient[0]);
//total doctors
console.log(doctors.length);
// all doctors
console.log(doctors);
// totak appointments
console.log(appointments.length)
// first appointment
console.log(appointments[0]);

const scheduled = appointments.filter(a => a.status === "scheduled").length;
const completed = appointments.filter(a => a.status === "completed").length;
const cancelled = appointments.filter(a => a.status === "cancelled").length;

console.log("Scheduled :", scheduled);
console.log("Completed :", completed);
console.log("Cancelled :", cancelled);
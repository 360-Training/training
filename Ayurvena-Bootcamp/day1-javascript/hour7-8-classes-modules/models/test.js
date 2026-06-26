/*const Hospital = require("./Hospital");
const hospital = new Hospital("Ayurvena Hospital");

const Patient = require("./Patient");
const patient = hospital.registerPatient({
  name: "Rahul",
  age: 32,
  phone: "9876543210",
  bloodGroup: "O+"
});


const doctor = hospital.addDoctor({
  name: "Dr. Kumar",
  specialization: "Cardiology",
  fee: 500,
  schedule: {
    Tuesday: [
      { time: "09:00", isBooked: false },
      { time: "09:30", isBooked: false }
    ]
  }
});

const appointment = hospital.bookAppointment(
  patient.id,
  doctor.id,
  "2026-07-07",
  "09:00"
);*/

const Patient = require("./Patient");
const Doctor = require("./Doctor");
const Appointment = require("./Appointment");
const Hospital = require("./Hospital");

const hospital = new Hospital("Ayurvena Hospital");

const patient = hospital.registerPatient({
  name: "Rahul Sharma",
  age: 32,
  phone: "9876543210",
  bloodGroup: "O+"
});

const doctor = hospital.addDoctor({
  name: "Dr. Kumar",
  specialization: "Cardiology",
  fee: 500
});

const appointment1 = hospital.bookAppointment(
  patient.id,
  doctor.id,
  "2026-07-01",
  "09:00"
);

console.log("Dashboard Before Completion");
console.log(hospital.getDashboard());

appointment.complete();

console.log("\nDashboard After Completion");
console.log(hospital.getDashboard());

const patient1 = new Patient(1, "Rahul", 32, "9876543210", "O+");
const doctor1 = new Doctor(1, "Dr. Kumar", "Cardiology", 500);

doctor1.bookSlot("2026-07-01", "09:00");

const appointment = new Appointment(
  1,
  patient1,
  doctor1,
  "2026-07-01",
  "09:00",
  doctor1.fee
);

console.log(appointment.generateReceipt());
console.log("Dashboard Before Completion");
console.log(hospital.getDashboard());

appointment.complete();

console.log("\nDashboard After Completion");
console.log(hospital.getDashboard());

console.log("\nReceipt");
console.log(appointment.generateReceipt());

console.log("\nPatient History");
console.log(hospital.getPatientHistory(patient.id));

console.log("\nDoctor Schedule");
console.log(hospital.getDoctorSchedule(doctor.id, "2026-07-07"));

console.log("\nCancel Appointment");
hospital.cancelAppointment(appointment.id);

console.log(appointment);
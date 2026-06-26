const {
    seedPatients,
    seedDoctors,
    seedAppointments
} = require("./data/seed");

const DashboardService = require("./services/DashboardService");
const AppointmentService = require("./services/AppointmentService");

// ----------------------
// STEP 1: SEED DATA
// ----------------------

const patients = seedPatients();
const doctors = seedDoctors();
const appointments = seedAppointments(patients, doctors);

// ----------------------
// STEP 2: INIT SERVICES (IMPORTANT FIX)
// ----------------------

const dashboard = new DashboardService();
const appointmentService = new AppointmentService();

// ----------------------
// STEP 3: INITIAL DASHBOARD
// ----------------------

console.log("\n===== INITIAL DASHBOARD =====");

console.log(
    dashboard.getDashboard(patients, doctors, appointments)
);

// ----------------------
// STEP 4: BOOK NEW APPOINTMENT
// ----------------------

console.log("\n===== NEW BOOKING =====");

const newAppointment = appointmentService.bookAppointment(
    patients[0].id,
    doctors[0].id,
    "2026-07-03",
    "09:00"
);

appointments.push(newAppointment);

console.log(newAppointment);

// ----------------------
// STEP 5: UPDATED DASHBOARD
// ----------------------

console.log("\n===== UPDATED DASHBOARD =====");

console.log(
    dashboard.getDashboard(patients, doctors, appointments)
);

// ----------------------
// STEP 6: FINAL SUMMARY
// ----------------------

console.log("\n===== SYSTEM RUN SUCCESSFUL =====");

console.log("Patients:", patients.length);
console.log("Doctors:", doctors.length);
console.log("Appointments:", appointments.length);
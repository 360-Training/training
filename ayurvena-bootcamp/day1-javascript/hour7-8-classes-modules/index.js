import { PatientService } from "./services/PatientService.js";
import { DoctorService } from "./services/DoctorService.js";
import { AppointmentService } from "./services/AppointmentService.js";
import { DashboardService } from "./services/DashboardService.js";

// Create Services
const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();

// Register Patient
const patient = patientService.register({
    name: "Rahul",
    age: 32,
    phone: "9876543210",
    bloodGroup: "O+"
});

console.log("Patient:");
console.log(patient);

// Add Doctor
const doctor = doctorService.addDoctor({
    name: "Dr. Kumar",
    specialization: "Cardiology",
    fee: 500
});

console.log("Doctor:");
console.log(doctor);

// Book Doctor Slot
doctor.bookSlot("Monday", "09:00");

// Book Appointment
const appointment = appointmentService.bookAppointment(
    patient,
    doctor,
    "2026-07-01",
    "09:00"
);

console.log("Appointment:");
console.log(appointment);

console.log("Receipt:");
console.log(appointment.generateReceipt());

// Dashboard
console.log("Dashboard:");
console.log(
    DashboardService.getDashboard(
        patientService,
        doctorService,
        appointmentService
    )
);
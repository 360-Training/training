import { PatientService } from "./services/PatientService";
import { DoctorService } from "./services/DoctorService";
import { AppointmentService } from "./services/AppointmentService";
import { PaymentService } from "./services/PaymentService";
import { QueueService } from "./services/QueueService";
import { DashboardService } from "./services/DashboardService";

import {
    seedPatients,
    seedDoctors,
    seedAppointments
} from "./data/seed";

console.log("=================================");
console.log(" MINI AYURVENA HOSPITAL SYSTEM");
console.log("=================================");

//----Initialize Services----

const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();
const paymentService = new PaymentService();
const queueService = new QueueService();

//----Load Seed Data----

const patients = seedPatients();
const doctors = seedDoctors();
const appointments = seedAppointments();

patients.forEach(patient => patientService.create(patient));
doctors.forEach(doctor => doctorService.create(doctor));
appointments.forEach(appointment => appointmentService.create(appointment));

console.log("\nPatients Loaded:", patientService.getAll().length);
console.log("Doctors Loaded:", doctorService.getAll().length);
console.log("Appointments Loaded:", appointmentService.getAll().length);

//----Book Appointment----

const appointment = appointmentService.bookAppointment(
    1,
    1,
    new Date("2026-07-10"),
    3
);

console.log("\nAppointment Booked");
appointment.displayDetails();

//----Payment----

console.log("\nProcessing Payment...");
const payment = paymentService.processPayment(
    appointment.id,
    500
);
console.log(payment);

//----Queue----

console.log("\nQueue");

queueService.addPatient(1);
queueService.addPatient(2);
queueService.addPatient(3);

console.log("Current Queue:");
console.log(queueService.viewQueue());
console.log("\nNext Patient:");
console.log(queueService.getNextPatient());
console.log("\nQueue After Next Patient:");
console.log(queueService.viewQueue());

//----Dashboard----

const dashboard = new DashboardService(
    patientService,
    doctorService,
    appointmentService
);
console.log("\nAdmin Dashboard");
console.log(dashboard.getAdminDashboard());
console.log("\nSystem Completed Successfully.");
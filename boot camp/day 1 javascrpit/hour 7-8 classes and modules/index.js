import { PatientService } from "./services/PatientService.js";
import { DoctorService } from "./services/DoctorService.js";
import { AppointmentService } from "./services/AppointmentService.js";
import { DashboardService } from "./services/DashboardService.js";
import { seedAll } from "./data/seed.js";

const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService(patientService, doctorService);
const dashboardService = new DashboardService(patientService, doctorService, appointmentService);

const { patients, doctors, appointments } = seedAll({ patientService, doctorService, appointmentService });
console.log("seeded", patients.length, "patients,", doctors.length, "doctors,", appointments.length, "appointments");

const newPatient = patientService.register({
  name: "Rahul Sharma",
  age: 32,
  phone: "9876543210",
  bloodGroup: "O+"
});
console.log("new patient:", newPatient.getProfile());

try {
  patientService.register({ name: "bad", age: 40, phone: "123", bloodGroup: "A+" });
} catch (err) {
  console.log("expected error:", err.message);
}

const doctor = doctors[0];
const appt = appointmentService.book(newPatient.id, doctor.id, "2026-07-01", "09:00");
console.log("booked:", appt.id, "with", doctor.name);

try {
  appointmentService.book(newPatient.id, doctor.id, "2026-07-01", "09:00");
} catch (err) {
  console.log("expected error:", err.message);
}

appt.complete();
console.log(appt.generateReceipt());

console.log("dashboard:", dashboardService.getStats());
console.log("breakdown:", dashboardService.getStatusBreakdown());

console.log("history for", newPatient.name + ":", appointmentService.getHistory(newPatient.id));
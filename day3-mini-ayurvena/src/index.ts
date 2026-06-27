import { PatientService } from "./services/patientsservice";
import { DoctorService } from "./services/DoctorService";
import { AppointmentService } from "./services/AppointmentService";
import { PaymentService } from "./services/PaymentService";
import { QueueService } from "./services/QueueService";
import { DashboardService } from "./services/DashboardService";
import { Patient } from "./models/patient";
import { Doctor } from "./models/doctor";
//servicesinit
const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();
const paymentService = new PaymentService();
const queueService = new QueueService();
//dashboard
const dashboardService = new DashboardService(
  patientService,
  doctorService,
  appointmentService
);
//add patients
const p1 = new Patient("John", 30, "MALE");
const p2 = new Patient("Sara", 25, "FEMALE");
patientService.add(p1);
patientService.add(p2);
//add doctors
const d1 = new Doctor("Dr. Rao", "Cardiology", 10);
const d2 = new Doctor("Dr. Meena", "Dermatology", 5);
doctorService.add(d1);
doctorService.add(d2);
//queue system
queueService.enqueue(p1.id);
queueService.enqueue(p2.id);
//appointment book
const appointment1 = appointmentService.book(p1.id, d1.id);
const appointment2 = appointmentService.book(p2.id, d2.id);
console.log("Appointments Created:");
console.log(appointment1);
console.log(appointment2);
//paymentflow
const payment1 = paymentService.pay(500);
console.log("Payment Done:", payment1);
//nextpatient in queue
const nextPatient = queueService.dequeue();
console.log("Next Patient in Queue:", nextPatient);
//dashboard
const stats = dashboardService.getStats();
console.log("Dashboard Stats:");
console.log(stats);
//final state
console.log("All Patients:", patientService.getAll());
console.log("All Doctors:", doctorService.getAll());
console.log("All Appointments:", appointmentService.getAll());
console.log("Queue:", queueService.getQueue());
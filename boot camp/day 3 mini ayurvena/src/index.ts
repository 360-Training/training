import { Patient } from "./models/Patient";
import { Appointment } from "./models/Appointment";
import { seedPatients, seedDoctors } from "./data/seed";

import { PatientService } from "./services/PatientService";
import { DoctorService } from "./services/DoctorService";
import { AppointmentService } from "./services/AppointmentService";
import { PaymentService } from "./services/PaymentService";
import { QueueService } from "./services/QueueService";
import { DashboardService } from "./services/DashboardService";

import {
  Gender,
  Department,
  AppointmentStatus,
  PaymentStatus
} from "./types/enums";

const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();
const paymentService = new PaymentService();
const queueService = new QueueService();
const dashboardService = new DashboardService();

try {
  seedPatients().forEach(p => patientService.create(p));
  seedDoctors().forEach(d => doctorService.create(d));

  const patient = new Patient(21, "Abhi", 22, Gender.Female);
  patientService.create(patient);

  const doctor = doctorService.findByDepartment(Department.Cardiology)[0]!;

  const appointment = new Appointment(
    1,
    patient.id,
    doctor.id,
    AppointmentStatus.Booked
  );

  appointmentService.create(appointment);

  paymentService.create({
    id: 1,
    appointmentId: 1,
    amount: 500,
    status: PaymentStatus.Pending,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  paymentService.pay(1);

  console.log("Consultation Started");
  console.log("Diagnosis: Fever");
  console.log("Prescription: Medicine");

  for (let i = 1; i <= 5; i++) {
    queueService.add(i);
  }

  console.log(queueService.next());

  dashboardService.admin(
    patientService.getAll(),
    doctorService.getAll(),
    appointmentService.getAll()
  );

  dashboardService.doctor(
    doctor,
    appointmentService.getAll()
  );

  appointmentService.cancelAppointment(1);
  paymentService.refund(1);

  console.log("Done");
} catch (error) {
  console.log(error);
}
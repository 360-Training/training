import { PatientService } from "./src/services/patientService";
import { DoctorService } from "./src/services/doctorService";
import { AppointmentService } from "./src/services/appointmentService";
import { DashboardService } from "./src/services/DashboardService";
import { PaymentService } from  "./src/services/paymentService";
import { QueueService } from "./src/services/QueueService";

import { patientData, doctorData, appointmentData } from "./src/data/seed"
import { heading } from "./src/utils/helpers";
const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();
const paymentService = new PaymentService();
const queueService = new QueueService();
patientData.forEach(patient => {
    patientService.addPatient(patient);
});
doctorData.forEach(doctor => {
    doctorService.addDoctor(doctor);
});
appointmentData.forEach(appointment => {
    appointmentService.bookAppointment(appointment);
});
heading("Patients");
patientService.showPatients();
heading("Doctors");
doctorService.showDoctors();
heading("Appointments");
appointmentService.showAppointments();
queueService.addPatient(1);
queueService.addPatient(2);
heading("Queue");
queueService.showQueue();
paymentService.payBill({
    appointmentId: 1,
    amount: 500
});
heading("Payment");
paymentService.checkPayment(1);
const dashboard = new DashboardService(
    patientService,
    doctorService,
    appointmentService
);
heading("Dashboard");
dashboard.showDashboard();
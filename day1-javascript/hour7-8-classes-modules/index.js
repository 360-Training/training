// import { Patient } from "./models/Patient.js";
// import { Doctor } from "./models/Doctor.js";
// import { Appointment } from "./models/Appointment.js";

// const patient = new Patient(1, "Soumya", 22);
// const doctor = new Doctor(1, "Dr Kumar", "Cardiology", 500);
// const appointment = new Appointment(1, patient, doctor);

// console.log(patient.getProfile());
// console.log(doctor);
// console.log(appointment);

import { PatientService } from "./services/PatientService.js";
import { DoctorService } from "./services/DoctorService.js";
import { AppointmentService } from "./services/AppointmentService.js";
import { DashboardService } from "./services/DashboardService.js";
const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();
const patient = patientService.registerPatient(
  1,
  "Soumya",
  22
);
const doctor = doctorService.addDoctor(
  1,
  "Dr Kumar",
  "Cardiology",
  500
);
appointmentService.bookAppointment(
  1,
  patient,
  doctor
);
console.log(
  DashboardService.getDashboard(
    patientService.getAllPatients(),
    doctorService.getAllDoctors(),
    appointmentService.getAllAppointments()
  )
);
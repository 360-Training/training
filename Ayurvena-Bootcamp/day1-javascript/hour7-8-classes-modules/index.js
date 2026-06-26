
const PatientService = require("./services/PatientService");
const DoctorService = require("./services/DoctorService");
const DashboardService = require("./services/DashboardService");
const AppointmentService = require("./services/AppointmentService");

const {
    patient,
    doctors,
    appointments
}= require("./data/seed");

const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();

// -----SEED DATA----
patientService.patient = patient;
patientService.currentId = patient.length + 1;

doctorService.doctors = doctors;
doctorService.currentId = doctors.length+1;

appointmentService.appointments = appointments;
appointmentService.currentId = appointments.length+1;

console.log("\n Successfully Loaded into Seed Data");

//   REGISTER NEW PATIENT

const newpatient = patientService.registerPatient({
    name : "Sai Harshitha",
    age : 25,
    phone :"7702497715",
    bloodgroup : "O-"
});
console.log(newpatient);

// BOOK AN APPOINTMENT

const doctor = doctorService.findDoctor(1);
const newappointment = appointmentService.bookAppointment(
   newpatient,
   doctor,
   "2026-07-01",
   "10:30"
);
console.log(newappointment);

// PROCESS PAYMENT

if(newappointment){
    newappointment.complete();
    console.log("Successfully completed Payment");
    console.log("Amount Paid: ₹" + newappointment.payment);
}

// VIEW DASHBOARD

const dashboard = new DashboardService(
    patientService,
    doctorService,
    appointmentService
);
dashboard.showDashboard();
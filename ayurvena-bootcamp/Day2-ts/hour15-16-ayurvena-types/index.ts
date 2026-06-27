import { PatientStatus, Department, AppointmentStatus } from "./types/enums";
import { Patient, Doctor, Appointment } from "./types/models";
// import { AddPatientDto } from "./types/dtos";

const patient: Patient = {
    id: 1,
    name: "Raj Kumar",
    age: 28,
    gender: "Male",
    phone: "9876543210",
    status: PatientStatus.Active
};
const doctor: Doctor = {
    id: 101,
    name: "Dr. saritha",
    department: Department.General,
    experience: 8
};
const appointment: Appointment = {
    id: 1001,
    patient,
    doctor,
    date: "28-06-2026",
    status: AppointmentStatus.Confirmed
};
console.log(patient);
console.log(doctor);
console.log(appointment);
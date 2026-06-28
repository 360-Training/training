import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { Appointment } from "../models/appointment";
import { Gender, Department, AppointmentStatus } from "../types/enums";

export const patientData = [
    new Patient(
        1,
        "rama",
        25,
        Gender.Male,
        "9876543210"
    ),
    new Patient(
        2,
        "Sita",
        32,
        Gender.Female,
        "9876501234"
    ),
    new Patient(
        3,
        "Mahesh",
        29,
        Gender.Male,
        "9123456789"
    )
];
export const doctorData = [
    new Doctor(
        1,
        "Dr. Ravi kanth",
        Department.General,
        8
    ),
    new Doctor(
        2,
        "Dr. sowmya",
        Department.Ayurveda,
        12
    ),
    new Doctor(
        3,
        "Dr. vignesh",
        Department.Ortho,
        10
    )
];
export const appointmentData = [
    new Appointment(
        1,
        1,
        1,
        "29-06-2026",
        AppointmentStatus.Booked
    ),
    new Appointment(
        2,
        2,
        2,
        "30-06-2026",
        AppointmentStatus.Booked
    )

];
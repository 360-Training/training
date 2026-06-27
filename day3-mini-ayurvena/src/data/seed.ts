import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { Appointment } from "../models/appointment";
export const seedPatients: Patient[] = [
  new Patient("John Doe", 30, "MALE"),
  new Patient("Sara Khan", 25, "FEMALE"),
  new Patient("Amit Sharma", 40, "MALE")
];
export const seedDoctors: Doctor[] = [
  new Doctor("Dr. Rao", "Cardiology", 10),
  new Doctor("Dr. Meena", "Dermatology", 5),
  new Doctor("Dr. Joseph", "Neurology", 12)
];
export const seedAppointments: Appointment[] = [
  new Appointment(seedPatients[0].id, seedDoctors[0].id),
  new Appointment(seedPatients[1].id, seedDoctors[1].id)
];
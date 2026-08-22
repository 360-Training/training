type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
type Gender = "male" | "female" | "other";

enum AppointmentStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

interface IPatient {
  id: number;
  name: string;
  age: number;
  phone: string;
  bloodGroup: BloodGroup;
  gender: Gender;
  isActive: boolean;
}

interface IAppointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  status: AppointmentStatus;
}

type CreatePatientDto = Omit<IPatient, "id" | "isActive">;
type PatientPreview = Pick<IPatient, "id" | "name" | "bloodGroup">;

function getPatientName(patients: IPatient[], id: number): string {
  const patient = patients.find(p => p.id === id);
  return patient ? patient.name : "Unknown";
}

function filterByStatus(appointments: IAppointment[], status: AppointmentStatus): IAppointment[] {
  return appointments.filter(a => a.status === status);
}

// Tests
const patientsList: IPatient[] = [
  { id: 1, name: "Rahul", age: 30, phone: "9876543210", bloodGroup: "A+", gender: "male", isActive: true },
  { id: 2, name: "Priya", age: 25, phone: "9876543211", bloodGroup: "B+", gender: "female", isActive: true },
];

const appointmentsList: IAppointment[] = [
  { id: 1, patientId: 1, doctorId: 1, date: "2026-07-01", status: AppointmentStatus.SCHEDULED },
  { id: 2, patientId: 2, doctorId: 1, date: "2026-07-02", status: AppointmentStatus.COMPLETED },
];

console.log("Patient name:", getPatientName(patientsList, 1));
console.log("Unknown:", getPatientName(patientsList, 99));
console.log("Filtered:", filterByStatus(appointmentsList, AppointmentStatus.COMPLETED));

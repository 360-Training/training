type PatientId = string | number;
let patientId: PatientId = "P101";
console.log("Patient ID:", patientId);
patientId = 101;
console.log("Patient ID:", patientId);

function findPatient(id: string | number): void {
    console.log("Searching patient:", id);
}
findPatient("P102");
findPatient(102);

type VisitStatus =
    | "Pending"
    | "Confirmed"
    | "Completed"
    | "Cancelled";
let visit: VisitStatus = "Confirmed";
console.log("Visit Status:", visit);

// Readonly Property
interface Doctor {
    readonly id: number;
    name: string;
    department: string;
}
const doctor: Doctor = {
    id: 101,
    name: "Dr.kiran",
    department: "General Medicine"
};
console.log(doctor);

interface Person {
    id: number;
    name: string;
}
interface Staff {
    department: string;
}
type HospitalStaff = Person & Staff;

const nurse: HospitalStaff = {
    id: 10,
    name: "Lakshmi",
    department: "Nursing"
};
console.log(nurse);
enum UserRole {
    Admin = "Admin",
    Doctor = "Doctor",
    Patient = "Patient"
}
console.log(UserRole.Doctor);

let hospital: unknown = "Ayurvena Hospital";
let totalLetters = (hospital as string).length;
console.log(totalLetters);

interface Medicine {
    id: number;
    name: string;
    price: number;
}
const medicine: Partial<Medicine> = {
    name: "Paracetamol"
};
console.log(medicine);

interface Room {
    id?: number;
    roomNumber?: string;
}
const room: Required<Room> = {
    id: 201,
    roomNumber: "A-201"
}
console.log(room);

interface PatientDetails {
    id: number;
    name: string;
    age: number;
    phone: string;
}
type PatientBasic = Pick<PatientDetails, "id" | "name">;
const basicPatient: PatientBasic = {
    id: 2,
    name: "Suresh"
};
console.log(basicPatient);

// Omit Utility Type
type PatientWithoutPhone = Omit<PatientDetails, "phone">;
const patientInfo: PatientWithoutPhone = {
    id: 3,
    name: "Anjali",
    age: 30
};
console.log(patientInfo);

let hospitalName: string | null = null;
console.log(hospitalName ?? "Ayurvena Hospital");

const doctors: Record<number, string> = {
    101: "Dr. Kavya",
    102: "Dr. Ramesh",
    103: "Dr. Priya"
};

console.log(doctors);
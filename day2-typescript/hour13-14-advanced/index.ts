// //union
type PatientID = number | string;
let id1: PatientID = 101;
let id2: PatientID = "p102";
console.log("Patient ID 1:", id1);
console.log("Patient ID 2:", id2);
// //literal
type UserRole = "Admin" | "Doctor" | "Patient";
let role: UserRole = "Admin";
console.log("Role:", role);
//tuple
let patientRecord: [number, string, number] = [
  1,
  "Soumya",
  22
];

console.log(patientRecord);
//readonly
interface Doctor {
  readonly id: number;
  name: string;
  specialization: string;
}
const doctor: Doctor = {
  id: 1,
  name: "Dr Kumar",
  specialization: "Cardiology"
};
console.log("Doctor:", doctor);
//type assertion
let value: any = "next360";
let hospitalName = value as string;
console.log("Hospital:", hospitalName);
//type guard
function printID(id: number | string) {
  if (typeof id === "string") {
    console.log("String ID:", id.toUpperCase());
  } else {
    console.log("Number ID:", id + 100);
  }
}
printID("P001");
printID(10);
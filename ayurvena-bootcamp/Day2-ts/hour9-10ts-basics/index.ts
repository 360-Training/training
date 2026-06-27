
let patientName: string = "Ravi";
let age: number = 25;
let isAdmitted: boolean = true;
console.log(patientName);
console.log(age);
console.log(isAdmitted);

// arrays
let medicines: string[] = ["Paracetamol", "Dolo", "Vitamin C"];
let roomNumbers: number[] = [101, 102, 103];
console.log(medicines);
console.log(roomNumbers);

// Tuple
let patientInfo: [number, string] = [1, "Ravi"];
console.log(patientInfo);


enum Status {
    Pending,
    Approved,
    Rejected
}
let patientStatus = Status.Approved;
console.log(patientStatus);

// String Enum
enum Role {
    Doctor = "Doctor",
    Patient = "Patient",
    Admin = "Admin"
}
let userRole = Role.Doctor;
console.log(userRole);

// Function
function addBill(a: number, b: number): number {
    return a + b;
}
console.log(addBill(500, 200));

// Arrow Function
const multiply = (a: number, b: number): number => {
    return a * b;
};
console.log(multiply(5, 10));

// Unknown
let value: unknown = "Hospital";
if (typeof value === "string") {
    console.log(value.toUpperCase());
}
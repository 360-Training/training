// // Primitive Types
// let patientName: string = "Soumya";
// let patientAge: number = 22;
// let isActive: boolean = true;

// console.log(patientName);
// console.log(patientAge);
// console.log(isActive);
// // Array
// let allergies: string[] = ["Dust", "Pollen"];
// console.log(allergies);
//object
type Patient = {
  id: number;
  name: string;
  age: number;
};

const patient: Patient = {
  id: 1,
  name: "papp",
  age: 22
};
// Function
function registerPatient(name: string, age: number): Patient {
  return {
    id: 2,
    name,
    age
  };
}

console.log(registerPatient("Rahul", 25));
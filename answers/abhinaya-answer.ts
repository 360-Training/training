interface IPatient {
  id: number;
  name: string;
  age: number;
  phone: string;
  bloodGroup: string;
  isActive: boolean;
}

const patients: IPatient[] = [
  { id: 1, name: "Rahul", age: 30, phone: "9876543210", bloodGroup: "A+", isActive: true },
  { id: 2, name: "Priya", age: 25, phone: "9876543211", bloodGroup: "B+", isActive: true },
  { id: 3, name: "Amit", age: 35, phone: "9876543212", bloodGroup: "O+", isActive: false },
  { id: 4, name: "Sneha", age: 28, phone: "9876543213", bloodGroup: "A+", isActive: true },
  { id: 5, name: "Vikram", age: 40, phone: "9876543214", bloodGroup: "AB-", isActive: false },
];

function getActivePatientNames(patients: IPatient[]): string {
  return patients.filter(p => p.isActive).map(p => p.name).join(", ");
}

function findByPhone(patients: IPatient[], phone: string): IPatient | string {
  const patient = patients.find(p => p.phone === phone);
  return patient || "Patient not found";
}

function getAverageAge(patients: IPatient[]): number {
  const active = patients.filter(p => p.isActive);
  const total = active.reduce((sum, p) => sum + p.age, 0);
  return active.length > 0 ? total / active.length : 0;
}

function groupByBloodGroup(patients: IPatient[]): Record<string, string[]> {
  return patients.reduce<Record<string, string[]>>((groups, p) => {
    const key = p.bloodGroup;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p.name);
    return groups;
  }, {});
}

function searchAndSort(patients: IPatient[], query: string): IPatient[] {
  return patients
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.age - b.age);
}

// Tests
console.log("Active patients:", getActivePatientNames(patients));
console.log("Find by phone:", findByPhone(patients, "9876543210"));
console.log("Find by phone (not found):", findByPhone(patients, "0000000000"));
console.log("Average age:", getAverageAge(patients));
console.log("By blood group:", groupByBloodGroup(patients));
console.log("Search & sort:", searchAndSort(patients, "a"));

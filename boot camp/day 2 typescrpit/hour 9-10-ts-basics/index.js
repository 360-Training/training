"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRole;
(function (UserRole) {
    UserRole["Patient"] = "patient";
    UserRole["Doctor"] = "doctor";
    UserRole["Receptionist"] = "receptionist";
    UserRole["Nurse"] = "nurse";
    UserRole["Admin"] = "admin";
    UserRole["SuperAdmin"] = "super-admin";
})(UserRole || (UserRole = {}));
var Department;
(function (Department) {
    Department["Cardiology"] = "cardiology";
    Department["Neurology"] = "neurology";
    Department["Orthopedics"] = "orthopedics";
    Department["Pediatrics"] = "pediatrics";
    Department["General"] = "general";
    Department["Emergency"] = "emergency";
    Department["ICU"] = "icu";
})(Department || (Department = {}));
var TriageLevel;
(function (TriageLevel) {
    TriageLevel[TriageLevel["One"] = 1] = "One";
    TriageLevel[TriageLevel["Two"] = 2] = "Two";
    TriageLevel[TriageLevel["Three"] = 3] = "Three";
    TriageLevel[TriageLevel["Four"] = 4] = "Four";
    TriageLevel[TriageLevel["Five"] = 5] = "Five";
})(TriageLevel || (TriageLevel = {}));
class Patient {
    id;
    name;
    age;
    phone;
    gender;
    bloodGroup;
    allergies;
    isActive;
    createdAt;
    constructor(id, name, age, phone, gender, bloodGroup) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.allergies = [];
        this.isActive = true;
        this.createdAt = new Date();
    }
    addAllergy(allergy) {
        this.allergies.push(allergy);
    }
    getProfile() {
        return this;
    }
}
class PatientService {
    patients = [];
    register(data) {
        const patient = new Patient(this.patients.length + 1, data.name, data.age, data.phone, data.gender, data.bloodGroup);
        patient.allergies = data.allergies;
        this.patients.push(patient);
        return patient;
    }
    findById(id) {
        return this.patients.find(patient => patient.id === id);
    }
    search(query) {
        return this.patients.filter(patient => patient.name.toLowerCase().includes(query.toLowerCase()));
    }
}
const service = new PatientService();
const patient = service.register({
    name: "John Doe",
    age: 30,
    phone: "1234567890",
    gender: "male",
    bloodGroup: "O+",
    allergies: ["Dust"]
});
patient.addAllergy("Peanuts");
console.log(patient.getProfile());
console.log(service.findById(1));
console.log(service.search("rah"));
//# sourceMappingURL=index.js.map
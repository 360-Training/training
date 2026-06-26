import { Patient } from "../models/Patient.js";

export class PatientService {
    constructor() {
        this.patients = [];
    }
    register(data) {
        const patient = new Patient(
            this.patients.length + 1,
            data.name,
            data.age,
            data.phone,
            data.bloodGroup
        );
        this.patients.push(patient);
        return patient;
    }
    findById(id) {
        return this.patients.find(
            patient => patient.id === id
        );
    }
}
import { Patient } from "../models/Patient.js";

export class PatientService {
  constructor() {
    this.patients = [];
  }

  registerPatient(id, name, age) {
    const patient = new Patient(id, name, age);
    this.patients.push(patient);
    return patient;
  }

  getAllPatients() {
    return this.patients;
  }
}
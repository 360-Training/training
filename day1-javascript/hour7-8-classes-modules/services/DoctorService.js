import { Doctor } from "../models/Doctor.js";
export class DoctorService {
  constructor() {
    this.doctors = [];
  }
  addDoctor(id, name, specialization, fee) {
    const doctor = new Doctor(id, name, specialization, fee);
    this.doctors.push(doctor);
    return doctor;
  }
  getAllDoctors() {
    return this.doctors;
  }
}
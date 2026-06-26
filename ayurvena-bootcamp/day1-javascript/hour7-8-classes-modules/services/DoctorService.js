import { Doctor } from "../models/Doctor.js";

export class DoctorService {
    constructor() {
        this.doctors = [];
    }
    addDoctor(data) {
        const doctor = new Doctor(
            this.doctors.length + 1,
            data.name,
            data.specialization,
            data.fee
        );
        this.doctors.push(doctor);
        return doctor;
    }
    findById(id) {
        return this.doctors.find(
            doctor => doctor.id === id
        );
    }
    getAvailableDoctors(day) {
        return this.doctors.filter(
            doctor => doctor.schedule[day]
        );
    }
}
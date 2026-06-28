import { BaseService } from "./baseService";
import { Doctor } from "../models/doctor";

export class DoctorService extends BaseService<Doctor> {
    addDoctor(doctor: Doctor) {
        this.add(doctor);
        console.log("Doctor added successfully.");
    }
    showDoctors() {
        if (this.data.length === 0) {
            console.log("No doctors available.");
            return;
        }
        this.data.forEach(doctor => {
            console.log(
                doctor.id,
                doctor.name,
                doctor.department,
                doctor.experience + " Years"
            );
        });
    }
}
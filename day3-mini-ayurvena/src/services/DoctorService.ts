import { BaseService } from "./BaseService";
import { Doctor } from "../models/Doctor";
import { Department } from "../types/enums";
export class DoctorService extends BaseService<Doctor> {
    registerDoctor(
        name: string,
        specialization: string,
        department: Department,
        phone: string,
        experience: number,
        consultationFee: number
    ): Doctor {
        const doctor = new Doctor(
            this.currentId++,
            name,
            specialization,
            department,
            phone,
            experience,
            consultationFee
        );
        return this.create(doctor);
    }
    searchByDepartment(department: Department): Doctor[] {
        return this.items.filter(
            doctor => doctor.department === department
        );
    }
    searchBySpecialization(specialization: string): Doctor[] {
        return this.items.filter(
            doctor =>
                doctor.specialization.toLowerCase() ===
                specialization.toLowerCase()
        );
    }
}
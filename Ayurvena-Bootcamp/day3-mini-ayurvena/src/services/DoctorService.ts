import { BaseService } from "./BaseService.js";
import type { IDoctor } from "../types/interfaces.js";
import { Department } from "../types/enums.js";

export class DoctorService extends BaseService<IDoctor> {
    findByDepartment(department : Department) : IDoctor[] {
        return this.items.filter(doctor =>
            doctor.department === department
        );
    }

    findBySpecialization(specialization : string) : IDoctor[] {
        return this.items.filter(doctor => 
            doctor.specialization
                .toLowerCase()
                .includes(specialization.toLowerCase())
        );
    }
}
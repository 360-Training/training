import { BaseService } from "./BaseService";
import { IDoctor } from "../types/interfaces";
import { Department } from "../types/enums";

export class DoctorService extends BaseService<IDoctor> {
    findByDepartment(department:Department): IDoctor[] {
        return this.items.filter(
            doctor => doctor.department ===department 
        );
    }
}
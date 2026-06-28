import { BaseService } from "./BaseService.js";
import type { Idoctor } from "../types/models.js";
import { Department } from "../types/enums.js";

export class DoctorService
    extends BaseService<Idoctor> {

    findByDepartment(
        department: Department
    ): Idoctor[] {

        return this.items.filter(
            doctor =>
                doctor.department === department
        );

    }

}
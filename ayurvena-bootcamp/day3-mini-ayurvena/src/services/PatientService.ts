import { BaseService } from "./BaseService.js";
import type { IPatient } from "../types/models.js";

export class PatientService
    extends BaseService<IPatient> {
    searchByName(
        name: string
    ): IPatient[] {

        return this.items.filter(
            patient =>
                patient.name
                    .toLowerCase()
                    .includes(name.toLowerCase())
        );

    }

}
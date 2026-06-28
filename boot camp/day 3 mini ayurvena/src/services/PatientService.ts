import { BaseService } from "./BaseService";
import { IPatient } from "../types/interfaces";

export class PatientService extends BaseService<IPatient> {
    findByName(name: string): IPatient[] {
        return this.items.filter(patient=>
            patient.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        );
    }
}
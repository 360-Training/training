import { BaseService } from "./BaseService.js";
import { Patient } from "../models/Patient.js";
export class PatientService extends BaseService<Patient> {
    findByBloodGroup(bloodGroup: string): Patient[] {
        return this.items.filter(patient =>
            patient.bloodGroup === bloodGroup
        );
    }
    findByAge(age: number): Patient[]{
        return this.items.filter(patient =>
            patient.age === age
        );
    }
}
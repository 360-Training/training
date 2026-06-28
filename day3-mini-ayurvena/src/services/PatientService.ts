import { BaseService } from "./BaseService";
import { Patient } from "../models/Patient";
import { BloodGroup, Gender } from "../types/enums";
export class PatientService extends BaseService<Patient> {
    registerPatient(
        name: string,
        age: number,
        gender: Gender,
        phone: string,
        bloodGroup: BloodGroup
    ): Patient {
        const patient = new Patient(
            this.currentId++,
            name,
            age,
            gender,
            phone,
            bloodGroup
        );
        return this.create(patient);
    }
    searchByBloodGroup(bloodGroup: BloodGroup): Patient[] {
        return this.items.filter(
            patient => patient.bloodGroup === bloodGroup
        );
    }
    searchByPhone(phone: string): Patient | undefined {
        return this.items.find(
            patient => patient.phone === phone
        );
    }
}
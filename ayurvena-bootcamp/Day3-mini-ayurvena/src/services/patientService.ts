import { BaseService } from "./baseService";
import { Patient } from "../models/patient";

export class PatientService extends BaseService<Patient> {
    addPatient(patient: Patient) {
        this.add(patient);
        console.log("Patient added successfully.");
    }
    showPatients() {
        if (this.data.length === 0) {
            console.log("No patients found.");
            return;
        }
        this.data.forEach(patient => {
            console.log(
                patient.id,
                patient.name,
                patient.age,
                patient.gender,
                patient.phone
            );
        });
    }
}
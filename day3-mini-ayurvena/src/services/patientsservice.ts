import { BaseService } from './baseservice';
import { Patient } from '../models/patient';
export class PatientService extends BaseService<Patient> {
  updatePatient(id: number, data: Partial<Patient>) {
    const patient = this.findById(id);
    if (!patient) return;
    Object.assign(patient, data);
  }
}
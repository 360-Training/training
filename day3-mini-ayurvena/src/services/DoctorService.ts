import { BaseService } from './baseservice';
import { Doctor } from '../models/doctor';
export class DoctorService extends BaseService<Doctor> {
  findBySpecialization(spec: string): Doctor[] {
    return this.items.filter(d => d.specialization === spec);
  }
  
}
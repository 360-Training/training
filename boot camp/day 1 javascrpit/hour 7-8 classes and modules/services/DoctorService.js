import { Doctor } from "../models/Doctor.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";

export class DoctorService {
  constructor() {
    this.doctors = [];
  }

  add(data) {
    if (!data.name || !data.specialization) {
      throw new ValidationError("name and specialization required");
    }
    const doc = new Doctor(data);
    this.doctors.push(doc);
    return doc;
  }

  findById(id) {
    const d = this.doctors.find(d => d.id === id);
    if (!d) throw new NotFoundError("doctor not found: " + id);
    return d;
  }

  search(q) {
    q = (q || "").toLowerCase();
    return this.doctors.filter(d =>
      d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q)
    );
  }

  getAvailable(day, time) {
    return this.doctors.filter(d => d.isAvailable(day, time));
  }

  getAll() {
    return this.doctors;
  }
}
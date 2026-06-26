import { Patient } from "../models/Patient.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";
import { validatePhone } from "../utils/validators.js";

export class PatientService {
  constructor() {
    this.patients = [];
  }

  register(data) {
    if (!data.name) throw new ValidationError("name is required");

    const phoneCheck = validatePhone(data.phone);
    if (!phoneCheck.valid) throw new ValidationError(phoneCheck.error);

    const p = new Patient(data);
    this.patients.push(p);
    return p;
  }

  findById(id) {
    const p = this.patients.find(p => p.id === id);
    if (!p) throw new NotFoundError("patient not found: " + id);
    return p;
  }

  search(q) {
    q = (q || "").toLowerCase();
    return this.patients.filter(p =>
      p.name.toLowerCase().includes(q) || p.phone.includes(q)
    );
  }

  update(id, updates) {
    const p = this.findById(id);
    for (let key in updates) {
      if (["name", "age", "phone", "bloodGroup"].includes(key)) {
        p[key] = updates[key];
      }
    }
    return p;
  }

  getAll() {
    return this.patients;
  }
}
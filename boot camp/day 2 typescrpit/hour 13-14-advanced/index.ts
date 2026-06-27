type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IPatient extends IBaseEntity {
  name: string;
  age: number;
  phone: string;
  bloodGroup: BloodGroup;
}

interface IDoctor extends IBaseEntity {
  name: string;
  speciality: string;
}

interface IAppointment extends IBaseEntity {
  patientId: number;
  doctorId: number;
  date: string;
}

type CreatePatientDto = Omit<IPatient, "id" | "createdAt" | "updatedAt">;
type CreateAppointmentDto = Omit<IAppointment, "id" | "createdAt" | "updatedAt">;

interface ValidationError {
  field: string;
  message: string;
}

class Validator {
  static isPhone(phone: string) {
    return /^[6-9]\d{9}$/.test(phone);
  }

  static isEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static isFutureDate(date: string) {
    return new Date(date) > new Date();
  }

  static isBloodGroup(bg: string): bg is BloodGroup {
    return ["A+","A-","B+","B-","AB+","AB-","O+","O-"].includes(bg);
  }

  static validateCreatePatient(data: unknown): CreatePatientDto | ValidationError[] {
    const p = data as CreatePatientDto;
    const errors: ValidationError[] = [];

    if (!p.name) errors.push({ field: "name", message: "Name required" });
    if (!this.isPhone(p.phone)) errors.push({ field: "phone", message: "Invalid phone" });
    if (!this.isBloodGroup(p.bloodGroup)) errors.push({ field: "bloodGroup", message: "Invalid blood group" });

    return errors.length ? errors : p;
  }

  static validateCreateAppointment(data: unknown): CreateAppointmentDto | ValidationError[] {
    const a = data as CreateAppointmentDto;
    const errors: ValidationError[] = [];

    if (!this.isFutureDate(a.date))
      errors.push({ field: "date", message: "Date must be in future" });

    return errors.length ? errors : a;
  }
}

class BaseService<T extends IBaseEntity> {
  protected items: T[] = [];

  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): T {
    const item = {
      ...data,
      id: this.items.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    } as T;

    this.items.push(item);
    return item;
  }

  findById(id: number) {
    return this.items.find(i => i.id === id);
  }

  findAll(filter?: Partial<T>) {
    if (!filter) return this.items;
    return this.items.filter(item => {
  for (const key in filter) {
    if (item[key as keyof T] !== filter[key as keyof T]) {
      return false;
    }
  }
  return true;
});
  }

  update(id: number, data: Partial<T>) {
    const item = this.findById(id);
    if (!item) throw new Error("Not found");
    Object.assign(item, data, { updatedAt: new Date() });
    return item;
  }

  delete(id: number) {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}

class PatientService extends BaseService<IPatient> {
  createPatient(data: unknown) {
    const result = Validator.validateCreatePatient(data);
    if (Array.isArray(result)) return result;
    return this.create(result);
  }
}

class DoctorService extends BaseService<IDoctor> {}

class AppointmentService extends BaseService<IAppointment> {
  createAppointment(data: unknown) {
    const result = Validator.validateCreateAppointment(data);
    if (Array.isArray(result)) return result;
    return this.create(result);
  }
}

class Hospital {
  patients = new PatientService();
  doctors = new DoctorService();
  appointments = new AppointmentService();
}

const hospital = new Hospital();

console.log(
  hospital.patients.createPatient({
    name: "Rahul",
    age: 25,
    phone: "9876543210",
    bloodGroup: "O+"
  })
);

console.log(
  hospital.patients.createPatient({
    name: "",
    age: 22,
    phone: "12345",
    bloodGroup: "X"
  })
);
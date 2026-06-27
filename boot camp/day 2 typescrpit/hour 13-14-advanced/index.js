"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    static isPhone(phone) {
        return /^[6-9]\d{9}$/.test(phone);
    }
    static isEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    static isFutureDate(date) {
        return new Date(date) > new Date();
    }
    static isBloodGroup(bg) {
        return ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bg);
    }
    static validateCreatePatient(data) {
        const p = data;
        const errors = [];
        if (!p.name)
            errors.push({ field: "name", message: "Name required" });
        if (!this.isPhone(p.phone))
            errors.push({ field: "phone", message: "Invalid phone" });
        if (!this.isBloodGroup(p.bloodGroup))
            errors.push({ field: "bloodGroup", message: "Invalid blood group" });
        return errors.length ? errors : p;
    }
    static validateCreateAppointment(data) {
        const a = data;
        const errors = [];
        if (!this.isFutureDate(a.date))
            errors.push({ field: "date", message: "Date must be in future" });
        return errors.length ? errors : a;
    }
}
class BaseService {
    items = [];
    create(data) {
        const item = {
            ...data,
            id: this.items.length + 1,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.items.push(item);
        return item;
    }
    findById(id) {
        return this.items.find(i => i.id === id);
    }
    findAll(filter) {
        if (!filter)
            return this.items;
        return this.items.filter(item => {
            for (const key in filter) {
                if (item[key] !== filter[key]) {
                    return false;
                }
            }
            return true;
        });
    }
    update(id, data) {
        const item = this.findById(id);
        if (!item)
            throw new Error("Not found");
        Object.assign(item, data, { updatedAt: new Date() });
        return item;
    }
    delete(id) {
        const index = this.items.findIndex(i => i.id === id);
        if (index === -1)
            return false;
        this.items.splice(index, 1);
        return true;
    }
}
class PatientService extends BaseService {
    createPatient(data) {
        const result = Validator.validateCreatePatient(data);
        if (Array.isArray(result))
            return result;
        return this.create(result);
    }
}
class DoctorService extends BaseService {
}
class AppointmentService extends BaseService {
    createAppointment(data) {
        const result = Validator.validateCreateAppointment(data);
        if (Array.isArray(result))
            return result;
        return this.create(result);
    }
}
class Hospital {
    patients = new PatientService();
    doctors = new DoctorService();
    appointments = new AppointmentService();
}
const hospital = new Hospital();
console.log(hospital.patients.createPatient({
    name: "Rahul",
    age: 25,
    phone: "9876543210",
    bloodGroup: "O+"
}));
console.log(hospital.patients.createPatient({
    name: "",
    age: 22,
    phone: "12345",
    bloodGroup: "X"
}));
//# sourceMappingURL=index.js.map
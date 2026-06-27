type BloodGroup = "O+" | "O-" | "AB+" | "AB-" | "B+" | "B-" | "A+" | "A-";
type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show";

enum Department {
    Cardiology = "cardiology",
    Neurology = "neurology",
    Orthopedics = "orthopedics",
    Pediatrics = "pediatrics",
    General = "general",
    Emergency = "emergency",
    ICU = "icu"
}

interface IBaseEntity {
    id : number;
    createdAt : Date;
    updatedAt : Date;
}
interface ValidationError{
    field : string;
    message : string;
}
interface IPatient extends IBaseEntity{
    name : string;
    age : number;
    phone : string;
    bloodGroup : BloodGroup;
}
interface IDoctor extends IBaseEntity {
    name : string;
    specialization : string;
    department : Department;
    fee : number;
}
interface IAppointment extends IBaseEntity {
    patientId : number;
    doctorId : number;
    date : string;
    time : string;
    status : AppointmentStatus;
}
// DTO TYPES
type CreatePatientDto = Omit<
    IPatient,
    "id" | "createdAt" | "updatedAt"
>;
type CreateAppointmentDto = Omit<
    IAppointment,
    "id" | "createdAt" | "updatedAt"
>;    

class BaseService<T extends IBaseEntity> {
    protected items: T[] = [];
    create(
        data: Omit<T, "id" | "createdAt" | "updatedAt">
    ): T {
        const item = {
            id : this.items.length + 1,
            ...data,
            createdAt : new Date(),
            updatedAt : new Date(),
        }as T;
        this.items.push(item);
        return item;
    }
    findById(
        id: number
    ): T | undefined {
        return this.items.find(
            item => item.id === id
        );
    }
    findAll(
        filter?: Partial<T>
    ): T[] {
        if(!filter){
            return this.items;
        }
        return this.items.filter(item =>
            Object.entries(filter).every(
                ([key, value]) =>
                    item[key as keyof T] === value
            )
        );
    }
    update(
        id: number,
        data: Partial<T>
    ): T {
        const item = this.findById(id);
        if (!item){
            throw new Error("Item not found");
        }
        Object.assign(item, data);
        item.updatedAt = new Date();
        return item;
    }
    delete(
        id: number
    ): boolean {
        const length = this.items.length;
        this.items = this.items.filter(
            item => item.id !== id
        );
        return this.items.length < length;
    }
}
//patient service
class PatientService extends BaseService<IPatient> {}
//doctor service
class DoctorService extends BaseService <IDoctor> {}
//appointment service
class AppointmentService extends BaseService<IAppointment> {}

class Hospital {
    patientService = new PatientService();
    doctorService = new DoctorService();
    appointmentService = new AppointmentService();
}

// VALIDATOR

class Validator {
    static isPatient(
        obj: unknown
    ): obj is CreatePatientDto {
        const patient = obj as CreatePatientDto;
        return(
            typeof patient.name === "string" &&
            typeof patient.age ==="number" &&
            typeof patient.phone === "string" &&
            [
                "O+",
                "O-",
                "AB+",
                "AB-",
                "B+",
                "B-",
                "A+",
                "A-"
            ].includes(patient.bloodGroup)
        );
    }
    static isPhone(phone : string): boolean {
        return /^[6-9]\d{9}$/.test(phone);
    }
    static isEmail(email : string): boolean{
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    static isFutureDate(date : string): boolean {
        return new Date(date) > new Date();
    }
    static isBloodGroup(bg : string): bg is BloodGroup {
        return [
            "O+",
                "O-",
                "AB+",
                "AB-",
                "B+",
                "B-",
                "A+",
                "A-"
        ].includes(bg as BloodGroup);
    }
}

// PATIENT VALIDATION

function validateCreatePatient(
    data : unknown
): CreatePatientDto | ValidationError[] {
    const patient = data as CreatePatientDto;

    const errors: ValidationError[] = [];

    if (!patient.name) {
        errors.push({
            field: "name",
            message: "Name is required"
        });
    }

    if (!Validator.isPhone(patient.phone)) {
        errors.push({
            field: "phone",
            message: "Invalid phone number"
        });
    }

    if (!Validator.isBloodGroup(patient.bloodGroup)) {
        errors.push({
            field: "bloodGroup",
            message: "Invalid blood group"
        });
    }

    if (errors.length > 0) {
        return errors;
    }

    return patient;
}

// APPOINTMENT VALIDATION 

function validateCreateAppointment(
    data: unknown
): CreateAppointmentDto | ValidationError[] {

    const appointment = data as CreateAppointmentDto;

    const errors: ValidationError[] = [];

    if (appointment.patientId <= 0) {
        errors.push({
            field: "patientId",
            message: "Invalid Patient Id"
        });
    }

    if (appointment.doctorId <= 0) {
        errors.push({
            field: "doctorId",
            message: "Invalid Doctor Id"
        });
    }

    if (!Validator.isFutureDate(appointment.date)) {
        errors.push({
            field: "date",
            message: "Appointment must be a future date"
        });
    }

    if (!appointment.time) {
        errors.push({
            field: "time",
            message: "Appointment time is required"
        });
    }

    if (errors.length > 0) {
        return errors;
    }

    return appointment;
}



const input : unknown = {
    name : "Rahul",
    age : 30,
    phone : "9876543210",
    bloodGroup : "O+"
};

const hospital = new Hospital();

// validate -> dto -> service

if (Validator.isPatient(input)){
    const patient = hospital.patientService.create(input);
    console.log(patient);
    console.log(
        hospital.patientService.findById(1)
    );
    console.log(
        hospital.patientService.update(
            1,
            {
                age: 23
            }
        )
    );
    console.log(
        hospital.patientService.delete(1)
    );
}
else{
    console.log("Patient Data is Invalid");
}

// TEST PATIENT

const patientInput: unknown = {
    name: "Sreenitha",
    phone: "9815291471",
    bloodGroup: "O"
};

const patientResult = validateCreatePatient(patientInput);

if (Array.isArray(patientResult)) {
    console.log("Patient Validation Failed");
    console.log(patientResult);
} else {
    const patient = hospital.patientService.create(patientResult);
    console.log("Patient Created");
    console.log(patient);
}

// ================= TEST APPOINTMENT =================

const appointmentInput: unknown = {
    patientId: 1,
    doctorId: 1,
    date: "2030-01-01",
    time: "10:00",
    status: "scheduled"
};

const appointmentResult =
    validateCreateAppointment(appointmentInput);

if (Array.isArray(appointmentResult)) {
    console.log("Appointment Validation Failed");
    console.log(appointmentResult);
} else {
    const appointment =
        hospital.appointmentService.create(appointmentResult);

    console.log("Appointment Created");
    console.log(appointment);
}

// INVALID PATIENT TEST 

const invalidPatient: unknown = {
    name: "",
    phone: "12345",
    bloodGroup: "X+"
};

console.log("\nInvalid Patient Test");
console.log(validateCreatePatient(invalidPatient));

//  INVALID APPOINTMENT TEST

const invalidAppointment: unknown = {
    patientId: -1,
    doctorId: 0,
    date: "2020-01-01",
    time: ""
};

console.log("\nInvalid Appointment Test");
console.log(validateCreateAppointment(invalidAppointment));
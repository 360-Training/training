//Type Aliases 
type BloodGroup =
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "O+"
    | "O-"
    | "AB+"
    | "AB-";

type Gender =
    | "male"
    | "female"
    | "other";

type AppointmentStatus =
    | "scheduled"
    | "completed"
    | "cancelled"
    | "no-show";

type PaymentMethod =
    | "cash"
    | "card"
    | "upi"
    | "insurance";

type PaymentStatus =
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

enum UserRole {
    PATIENT = "patient",
    DOCTOR = "doctor",
    RECEPTIONIST = "receptionist",
    NURSE = "nurse",
    ADMIN = "admin",
    SUPER_ADMIN = "superAdmin"
}

enum Department {
    CARDIOLOGY = "cardiology",
    NEUROLOGY = "neurology",
    ORTHOPEDICS = "orthopedics",
    PEDIATRICS = "pediatrics",
    GENERAL = "general",
    EMERGENCY = "emergency",
    ICU = "icu"
}

enum TriageLevel {
    CRITICAL = 1,
    EMERGENCY = 2,
    URGENT = 3,
    LESS_URGENT = 4,
    NON_URGENT = 5
}


interface IPatient {
    id: number;
    name: string;
    age: number;
    phone: string;
    bloodGroup: BloodGroup;
    gender: Gender;
    allergies: string[];
    isActive: boolean;
    createdAt: Date;
}
interface IDoctor {
    id: number;
    name: string;
    specialization: string;
    department: Department;
    fee: number;
    availableDays: string[];
    slots: ISlot[];
}
interface IPayment {
    amount: number;
    method: PaymentMethod;
    transactionId: string;
    status: PaymentStatus;
    paidAt: Date;
}
interface ISlot {
    time: string;
    isBooked: boolean;
}
interface IAppointment {
    id: number;
    patientId: number;
    doctorId: number;
    date: string;
    time: string;
    status: AppointmentStatus;
    payment?: IPayment;
}

class Patient implements IPatient {
    id: number;
    name: string;
    age: number;
    phone: string;
    bloodGroup: BloodGroup;
    gender: Gender;
    allergies: string[];
    isActive: boolean;
    createdAt: Date;

    constructor(
    id: number,
    name: string,
    age: number,
    phone: string,
    bloodGroup: BloodGroup,
    gender: Gender
) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.bloodGroup = bloodGroup;
    this.gender = gender;
    this.allergies = [];
    this.isActive = true;
    this.createdAt = new Date();
}
addAllergy(allergy: string): void {
    this.allergies.push(allergy);
}
removeAllergy(allergy: string): void {
    this.allergies = this.allergies.filter(
        item => item !== allergy
    );
}
getProfile(): IPatient {
    return {
        id: this.id,
        name: this.name,
        age: this.age,
        phone: this.phone,
        bloodGroup: this.bloodGroup,
        gender: this.gender,
        allergies: this.allergies,
        isActive: this.isActive,
        createdAt: this.createdAt
    };
}
deactivate(): void { //void method to deactivate the patient
    this.isActive = false;
}
}

//PatientService

class PatientService {
    patients: Patient[] = [];
    register(
        data: Omit<
        // Omit the properties that are not required for registration
            IPatient,
            "id" | "createdAt" | "isActive"
        >
    ): Patient {
        const patient = new Patient(
            this.patients.length + 1,
            data.name,
            data.age,
            data.phone,
            data.bloodGroup,
            data.gender
        );
        patient.allergies = data.allergies;
        this.patients.push(patient);
        return patient;
    }
    findById(id: number): Patient | undefined {
        return this.patients.find(
            patient => patient.id === id
        );
    }
    search(query: string): Patient[] {
        return this.patients.filter(
            patient =>
                patient.name
                    .toLowerCase()
                    .includes(query.toLowerCase())
        );
    }
}

const patientService = new PatientService();
const patient = patientService.register({
    name: "Rahul",
    age: 32,
    phone: "9876543210",
    bloodGroup: "O+",
    gender: "male",
    allergies: ["Dust"]
});
console.log(patient);

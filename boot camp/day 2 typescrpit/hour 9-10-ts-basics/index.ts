type BloodGroup ="A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

type Gender = "male" | "female" | "other";

type AppoimentStatus = "scheduled" | "completed" | "cancelled" | "no-show";

type PaymentMethod = "cash" | "card" | "upi" | "insurance";

type PaymentStatus ="pending" |"paid" | "failed" | "refunded";

enum UserRole {
    Patient ="patient",
    Doctor = "doctor",
    Receptionist = "receptionist",
    Nurse = "nurse",
    Admin = "admin",
    SuperAdmin = "super-admin"
}

enum Department {
    Cardiology = "cardiology",
    Neurology = "neurology",
    Orthopedics = "orthopedics",
    Pediatrics = "pediatrics", 
    General = "general",
    Emergency = "emergency",
    ICU = "icu",
}

enum TriageLevel {
    One =1,
    Two ,
    Three,
    Four,
    Five
}

interface ISlot {
    time: string;
    isBooked: boolean;
}

interface Ipayment {
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId: string;
    paidAt: Date;
}

interface IDoctor {
    id: number;
    name: string;
    specialization: Department;
    fee: number;
    department: Department;
    availableDays: string[];
    availableSlots: ISlot[];
}
interface IAppointment {
    id: number;
    patientId: number;
    doctorId: number;
    date: string;
    time: string;
    status: AppoimentStatus;
    payment?: Ipayment;
}

interface IPatient {
    id: number;
    name: string;
    age: number;
    phone: string;
    gender: Gender;
    bloodGroup: BloodGroup;
    allergies: string[];
    isActive: boolean;
    createdAt: Date;
}

class Patient implements IPatient {
    id: number;
    name: string;
    age: number;
    phone: string;
    gender: Gender;
    bloodGroup: BloodGroup;
    allergies: string[];
    isActive: boolean;
    createdAt: Date;

    constructor(
      id: number, 
      name: string,
      age: number, 
      phone: string, 
      gender: Gender,
     bloodGroup: BloodGroup
    ) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.allergies = [];
        this.isActive = true;
        this.createdAt = new Date();
    }
    addAllergy(allergy: string): void {
        this.allergies.push(allergy);
    }
    getProfile(): IPatient {
        return this;
    }
}

class PatientService {
    patients: Patient[] = [];

    register(
        data: Omit<IPatient, "id" | "isActive" | "createdAt">

    ): Patient {
        const patient = new Patient(
            this.patients.length + 1,
            data.name,
            data.age,
            data.phone,
            data.gender,
            data.bloodGroup
        );
         
        patient.allergies = data.allergies ;
        this.patients.push(patient);
        return patient;
    }
    findById(id: number): Patient | undefined {
        return this.patients.find(patient => patient.id === id);
    }

    search(query: string): Patient[] {
        return this.patients.filter(patient => 
            patient.name.toLowerCase().includes(query.toLowerCase()) 
        );
    }
}

const service = new PatientService();

const patient = service.register({
    name: "John Doe",
    age: 30,
    phone: "1234567890", 
    gender: "male",
    bloodGroup: "O+",
    allergies: ["Dust"]
});

patient.addAllergy("Peanuts");

console.log(patient.getProfile());
console.log(service.findById(1));
console.log(service.search("rah"));
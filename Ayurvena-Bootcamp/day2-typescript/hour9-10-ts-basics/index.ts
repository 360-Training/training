type BloodGroup = "O+" | "O-" | "AB+" | "AB-" | "B+" | "B-" | "A+" | "A-";
type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show";
type PaymentMethod = "cash" | "card" | "upi" | "insurance";
type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
type Gender = "female" | "male" | "other";

enum UserRole {
    Patient = "patient",
    Doctor = "doctor",
    Recepitionist = "recipitionist",
    Nurse = "nurse",
    Admin = "admin",
    SuperAdmin = "superAdmin"
}
enum Depatrment{
    Cardiology = "cardiology",
    Neurology = "neurology",
    Orthopedics = "orthopedics",
    Pediatrics = "pediactrics",
    General = "general",
    Emergency = "emergency",
    ICU = "icu"
}
enum TriageLevel  {
    Level1 = 1,
    Level2,
    Level3,
    Level4,
    Level5   
}
interface IPatient{
    id : number;
    name : string;
    age : number;
    phone : string;
    bloodGroup : string;
    gender : Gender;
    allergies : string[];
    isActive : boolean;
    createdAt : Date;
}
interface IDoctor{
    id : number;
    name : string;
    specialization : string;
    department : Depatrment;
    fee : number;
    availableDays: string[];
    slots : ISlot[];
}
interface IAppointment{
    id : number;
    patientId : number;
    doctorId : number;
    date : string;
    time : string;
    status : string;
    payment? : IPayment;
}
interface ISlot{
    time : string;
    isBooked : boolean;
}
interface IPayment{
    amount : number;
    method : string;
    transcationId : string;
    status : string;
    paidAt : Date;
}

class Patient implements IPatient{
    id: number; 
    name: string;
    age: number;
    phone: string;
    bloodGroup: string;
    gender: Gender;
    allergies: string[];
    isActive: boolean;
    createdAt: Date;

    constructor (
        id : number,
        name : string,
        age : number,
        phone: string,
        bloodGroup : string,
        gender : Gender
    ){
        this.id = id;
        this.name =name;
        this.age = age;
        this.phone = phone;
        this.bloodGroup = bloodGroup;
        this.gender = gender
        this.allergies = [];
        this.isActive = true;
        this.createdAt = new Date();
    }
    addAllergy(allergy: string): void{
        this.allergies.push(allergy);
    }
    removeAllergy(allergy: string): void{
        this.allergies = this.allergies.filter(
            item => item !== allergy
        );
    }
    deactivate(): void {
        this.isActive = false;
    }
    getProfile() : IPatient {
        return {
            id : this.id,
            name : this.name,
            age : this.age,
            phone : this.phone,
            bloodGroup : this.bloodGroup,
            gender : this.gender,
            allergies : this.allergies,
            isActive : this.isActive,
            createdAt : this.createdAt
        };
    }
}

class PatientService {
    private patients: Patient[] = [];
    private currentId: number = 1;
    register(
        data: Omit<IPatient, "id" | "createdAt" | "isActive">
    ): Patient {
        const patient = new Patient( 
            this.currentId++,
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
    findById(id : number): Patient | undefined {
        return this.patients.find(patient => patient.id === id);
    }
    search(query: string): Patient[]{
        return this.patients.filter((patient : Patient) =>
            patient.name.toLowerCase().includes(query.toLowerCase())
        );
    }
    getAllPatients() : Patient[]{
        return this.patients;
    }
}

// TESTING

const patientService = new PatientService();
const patient = patientService.register({
    name : "Srinitha",
    age : 28,
    phone : "9723587201",
    bloodGroup : "O+",
    allergies : ["Dust"],
    gender : "female"
});

console.log(patient);
patient.addAllergy("Penicillin");
console.log(patient.getProfile());
console.log(patientService.findById(1));
console.log(patientService.search("sri"));
console.log(patientService.getAllPatients());
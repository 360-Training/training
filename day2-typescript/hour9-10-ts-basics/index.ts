interface Patient {
    id: number;
    name: string;
    age: number;
    phone: string;
    bloodGroup: string;
    allergies: string[];
    isActive: boolean;
    createdAt: Date;
}

// ----Patient Service Class----

class PatientService {
    private patients: Patient[] = [];
    private currentId: number = 1;

    registerPatient(data: Omit<Patient, "id" | "createdAt" | "isActive">): Patient {
        const newPatient: Patient = {
            id: this.currentId++,
            ...data,
            isActive: true,
            createdAt: new Date()
        };

        this.patients.push(newPatient);
        return newPatient;
    }

    findPatient(id: number): Patient | undefined {
        return this.patients.find(p => p.id === id);
    }

    getAllPatients(): Patient[] {
        return this.patients;
    }

    deactivatePatient(id: number): boolean {
        const patient = this.findPatient(id);
        if (!patient) return false;

        patient.isActive = false;
        return true;
    }
}
// ----Testing the Patient Service----

const service = new PatientService();

const p1 = service.registerPatient({
    name: "Rahul Kumar",
    age: 32,
    phone: "9876543210",
    bloodGroup: "O+",
    allergies: ["Dust"]
});

const p2 = service.registerPatient({
    name: "Anjali",
    age: 28,
    phone: "9998887777",
    bloodGroup: "A+",
    allergies: []
});

console.log("All Patients:", service.getAllPatients());
console.log("Find Patient:", service.findPatient(1));
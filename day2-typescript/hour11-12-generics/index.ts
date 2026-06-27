//----Interface----

interface Patient {
    id: number;
    name: string;
    age: number;
    phone: string;
    bloodGroup: string;
}

//----Generic Class----

class BaseService<T extends { id: number }> {

    private items: T[] = [];
    add(item: T): void {
        this.items.push(item);
    }
    getAll(): T[] {
        return this.items;
    }
    findByIndex(index: number): T | undefined {
        return this.items[index];
    }
    findById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }
}

//----Generic Function Example----

function identity<T>(value: T): T {
    return value;
}

console.log("Generic Function:");
console.log(identity<number>(100));
console.log(identity<string>("Harshitha"));
console.log(identity<boolean>(true));

//----Generic Interface Example----

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
const patientResponse: ApiResponse<Patient> = {
    success: true,
    message: "Patient fetched successfully",
    data: {
        id: 1,
        name: "Supriya",
        age: 30,
        phone: "9876543210",
        bloodGroup: "O+"
    }
};

console.log("\nAPI Response:");
console.log(patientResponse);

//----Generic Class Example----

const patientService = new BaseService<Patient>();
patientService.add({
    id: 1,
    name: "Supriya",
    age: 30,
    phone: "9876543210",
    bloodGroup: "O+"
});
patientService.add({
    id: 2,
    name: "Jyothi",
    age: 25,
    phone: "9998887777",
    bloodGroup: "A+"
});

console.log("\nAll Patients:");
console.log(patientService.getAll());

console.log("\nPatient By Index:");
console.log(patientService.findByIndex(0));

console.log("\nPatient By ID:");
console.log(patientService.findById(2));

console.log("\nPatient Not Found:");
console.log(patientService.findById(10));

//----Utility Types----

//----Partial----

type PatientUpdate = Partial<Patient>;
const updateData: PatientUpdate = {
    phone: "8888888888"
};

console.log("\nPartial:");
console.log(updateData);

//----Pick----

type PatientBasicInfo = Pick<Patient, "name" | "bloodGroup">;
const basicInfo: PatientBasicInfo = {
    name: "Anju",
    bloodGroup: "B+"
};

console.log("\nPick:");
console.log(basicInfo);

//----Omit----

type PatientWithoutId = Omit<Patient, "id">;
const newPatient: PatientWithoutId = {
    name: "Anjali",
    age: 22,
    phone: "7777777777",
    bloodGroup: "AB+"
};

console.log("\nOmit:");
console.log(newPatient);

//----Readonnly----

const readOnlyPatient: Readonly<Patient> = {
    id: 100,
    name: "Ravi",
    age: 40,
    phone: "6666666666",
    bloodGroup: "O-"
};
console.log("\nReadonly:");
console.log(readOnlyPatient);

//---Record----

type PatientDirectory = Record<number, string>;
const patientNames: PatientDirectory = {
    1: "Supriya",
    2: "Jyothi",
    3: "Anju",
};
console.log("\nRecord:");
console.log(patientNames);

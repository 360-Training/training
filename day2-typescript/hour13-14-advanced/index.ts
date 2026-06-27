//----Hour 13-14 Advanced TS----
//----Hospital Module System----
//----Type Aliases----

type BloodGroup =
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-";

//----Interface of Base---

interface IBaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

//----Models----
interface IPatient extends IBaseEntity {
    name: string;
    phone: string;
    bloodGroup: BloodGroup;
}
interface IDoctor extends IBaseEntity {
    name: string;
    specialization: string;
}
interface IAppointment extends IBaseEntity {
    patientId: number;
    doctorId: number;
    date: string;
}

//----DTO Types----

type CreatePatientDto = Omit<
    IPatient,
    "id" | "createdAt" | "updatedAt"
>;
type UpdatePatientDto = Partial<CreatePatientDto>;

//----Response Type----

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

//----BaseService----

class BaseService<T extends IBaseEntity> {
    protected items: T[] = [];
    create(item: T): void {
        this.items.push(item);
    }
    findById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }
    findAll(filter?: Partial<T>): T[] {
        if (!filter) {
            return this.items;
        }
        return this.items.filter(item =>
            Object.entries(filter).every(
                ([key, value]) =>
                    item[key as keyof T] === value
            )
        );
    }

    update(id: number, data: Partial<T>): T | undefined {
        const item = this.findById(id);
        if (item) {
            Object.assign(item, data);
        }
        return item;
    }

    delete(id: number): boolean {
        const index = this.items.findIndex(
            item => item.id === id
        );
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);
        return true;
    }
}

//----Services----

class PatientService extends BaseService<IPatient> {}
class DoctorService extends BaseService<IDoctor> {}
class AppointmentService extends BaseService<IAppointment> {}

//----Validator----

class Validator {
    static isPhone(phone: string): boolean {
        return /^[6-9]\d{9}$/.test(phone);
    }

    static isBloodGroup(
        bg: string
    ): bg is BloodGroup {

        return [
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        ].includes(bg);

    }

}

//----Validation----

function validateCreatePatient(
    data: unknown
): CreatePatientDto | string[] {

    const errors: string[] = [];
    if (
        typeof data !== "object" ||
        data === null
    ) {
        return ["Invalid object"];
    }
    const patient =
        data as Record<string, unknown>;
    if (
        typeof patient.name !== "string"
    ) {
        errors.push("Invalid name");
    }
    if (
        typeof patient.phone !== "string" ||
        !Validator.isPhone(patient.phone)
    ) {
        errors.push("Invalid phone");
    }
    if (
        typeof patient.bloodGroup !==
            "string" ||
        !Validator.isBloodGroup(
            patient.bloodGroup
        )
    ) {
        errors.push("Invalid blood group");
    }
    if (errors.length > 0) {
        return errors;
    }
    return patient as CreatePatientDto;
}

//---Hospital Class----

class Hospital {

    patientService =
        new PatientService();

    doctorService =
        new DoctorService();

    appointmentService =
        new AppointmentService();

}

//----Testing----

const hospital = new Hospital();
const patient1: IPatient = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Harshitha",
    phone: "9876543210",
    bloodGroup: "O+"
};
const patient2: IPatient = {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Ramya",
    phone: "9999999999",
    bloodGroup: "A+"
};
hospital.patientService.create(patient1);
hospital.patientService.create(patient2);
console.log("All Patients");
console.log(
    hospital.patientService.findAll()
);
console.log("\nFind By ID");
console.log(
    hospital.patientService.findById(2)
);
console.log("\nUpdate");
hospital.patientService.update(
    2,
    {
        phone: "8888888888"
    }
);
console.log(
    hospital.patientService.findById(2)
);
console.log("\nDelete");
hospital.patientService.delete(1);
console.log(
    hospital.patientService.findAll()
);
console.log("\nValidation Success");
const result =
    validateCreatePatient({
        name: "Anjali",
        phone: "9876543210",
        bloodGroup: "B+"
    });

console.log(result);
console.log("\nValidation Failure");
console.log(
    validateCreatePatient({
        name: "Anjali",
        phone: "12345",
        bloodGroup: "X+"
    })
);
const response: ApiResponse<IPatient> = {
    success: true,
    message: "Patient Created",
    data: patient2
};
console.log("\nAPI Response");
console.log(response);
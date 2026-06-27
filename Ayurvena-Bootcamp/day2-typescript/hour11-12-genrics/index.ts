type BloodGroup = "O+" | "O-" | "AB+" | "AB-" | "B+" | "B-" | "A+" | "A-";
type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show";
type PaymentMethod = "cash" | "card" | "upi" | "insurance";
type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
type Gender = "female" | "male" | "other";

//ENUMS

enum UserRole {
    Patient = "patient",
    Doctor = "doctor",
    Recepitionist = "recipitionist",
    Nurse = "nurse",
    Admin = "admin",
    SuperAdmin = "superAdmin"
}
enum Department {
    Cardiology = "cardiology",
    Neurology = "neurology",
    Orthopedics = "orthopedics",
    Pediatrics = "pediatrics",
    General = "general",
    Emergency = "emergency",
    ICU = "icu"
}
enum TriageLevel{
    Level1 = 1,
    Level2,
    Level3,
    Level4,
    Level5
}
//INTERFACES

interface IPatient {
    id : number;
    name : string;
    age : number;
    gender : Gender;
    phone : string;
    bloodGroup : BloodGroup;
    allergies : string[];
    isActive : boolean;
    createdAt : Date; 
}
interface IDoctor {
    id : number;
    name : string;
    specialization : string;
    department : Department;
    fee : number;
}
interface IPayment {
    amount : number;
    method : PaymentMethod;
    transcationId : string;
    status : PaymentStatus;
    paidAt : Date;
}
interface IAppointment {
    id : number;
    patientId : number;
    doctorId : number;
    date : string;
    time : string;
    status : AppointmentStatus;
    payment?: IPayment;
}
// GENERIC API TYPES
interface ApiResponse<T> {
    success : boolean;
    data : T;
    message : string;
    statusCode : number;
}

interface ApiError {
    success : false;
    error : string;
    message : string;
    statusCode : number; 
}

interface PaginatedResponse <T>{
    success : boolean;
    data : T[];
    pagination : {
        page : number;
        limit : number;
        total : number;
        totalPages : number;
    }
}

// HELPER FUNCTIONS

function successResponse<T> (
    data : T,
    message: string = "Success"
): ApiResponse<T> {
    return {
        success : true,
        data,
        message,
        statusCode : 300
    };
}

function errorResponse (
    statusCode : number,
    message : string
): ApiError {
    return {
        success : false,
        error : "API Error",
        message,
        statusCode
    };
}

function paginatedResponse<T> (
    data : T[],
    page : number,
    limit : number,
    total : number
): PaginatedResponse<T> {
    return {
        success : true,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}
// DTO TYPES

type CreatePatientDto = Omit<IPatient, "id" | "createdAt" | "isActive">;
type UpdatePatientDto = Partial<CreatePatientDto>;
type PatientPreview = Pick<IPatient, "id" | "name" | "bloodGroup" | "phone">;
type CreateAppointmentDto = Omit<IAppointment, "id" | "status" | "payment">;
type DoctorWithAppointments = 
    IDoctor & {
        appointments: IAppointment[];

}

//  SERVICE

class PatientSerivce {
    private patients: IPatient[] = [];
    private currentId = 1;
    createPatient(
        data : CreatePatientDto
    ): ApiResponse<IPatient>{
        const patient: IPatient = {
            id : this.currentId++,
            ...data,
            isActive: true,
            createdAt : new Date()
        };
        this.patients.push(patient);
        return successResponse(patient, "Created a Patient");
    }
    getPatients(
        page : number,
        limit : number
    ): PaginatedResponse<PatientPreview> {
        const start = (page - 1) * limit;
        const data = this.patients
            . slice(start, start + limit)
            .map(patient => ({
                id : patient.id,
                name : patient.name,
                bloodGroup : patient.bloodGroup,
                phone : patient.phone
            }));
        return paginatedResponse(
            data,
            page,
            limit,
            this.patients.length
        );
    }
    getPatientById(
        id : number
    ): ApiResponse<IPatient> {

        const patient = this.patients.find(
            patient => patient.id === id
        );
        if(!patient) {
            throw new Error("Patient is Not Found");
        }
        return successResponse(patient);
    }
    updatePatient(
        id : number,
        data : UpdatePatientDto
    ): ApiResponse<IPatient> {
        const patient = this.patients.find(
            patient => patient.id === id
        );
        if(!patient) {
            throw new Error("Patient is Not Found");
        }
        Object.assign(patient, data);
        return successResponse(
            patient,
            "Patient is Updated"
        );
    }
    deletePatient(
        id : number
    ): ApiResponse<{deleted : boolean }> {
        this.patients = this.patients.filter(
            patient => patient.id !==id
        );
        return successResponse(
            {deleted : true },
            "Patient is Deleted"
        );
    }
}
// TEST CASES

const service = new PatientSerivce();

service.createPatient({
    name : "Harshitha Reddy",
    age : 25,
    gender : "female",
    phone : "9551294117",
    bloodGroup : "B+",
    allergies : []
});
service.createPatient({
    name : "Priyansh",
    age : 30,
    gender : "male",
    phone : "9707498002",
    bloodGroup : "O+",
    allergies : ["Pencilin"]
});
// create patient
console.log(service.getPatientById(1));
// all patients
console.log(service.getPatients(1,10));
// update patient
console.log(
    service.updatePatient(1, {
        age : 28
    })
);
// delete patient
console.log(service.deletePatient(2));
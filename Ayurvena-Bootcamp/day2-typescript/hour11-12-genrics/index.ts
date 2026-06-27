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
        statusCode : 200
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

const doctors : IDoctor[] = [
    {
        id : 1,
        name : "Dr. Kumar",
        specialization : "Cardiologyist",
        department : Department.Cardiology,
        fee : 500
    },
    {
        id : 2,
        name : "Dr. Priya",
        specialization: "Neurologist",
        department: Department.Neurology,
        fee: 700
    }
];

const appointments: IAppointment[] = [];

//Booking Result

interface BookingSuccess {
    type : "success";
    appointment : IAppointment;
    payment : IPayment;
    receipt : string;
}
interface BookingSlotUnavailable {
    type : "slot_unavailable";
    doctor : string;
    suggestedSlots : string[];
}
interface BookingPaymentFailed{
    type : "payment_failed";
    appointment : IAppointment;
    error : string;
    retryable : boolean;
}
interface BookingValidationError {
    type : "validation_error";
    errors: {
        field : string;
        message : string;
    }[]; 
}
type BookingResult = 
    | BookingSuccess
    | BookingSlotUnavailable
    | BookingPaymentFailed 
    | BookingValidationError;

// BOOKING FLOW

async function bookAppointmentFlow(
    data: CreateAppointmentDto
): Promise<BookingResult>{
    const errors = [];
    if(!data.patientId)
        errors.push({
            field : "patientId",
            message : "Patient is Required"
        });
    if(!data.doctorId)
        errors.push({
            field : "doctorId",
            message : "Doctor is required"
        });
    if(!data.date)
        errors.push({
            field : "date",
            message: "Date is required"
        });
    if(!data.time)
        errors.push({
            field : "time",
            message : "Time is required"
        });
    if(errors.length > 0){
        return {
            type : "validation_error",
            errors
        };
    }
    const doctor = doctors.find(d => d.id === data.doctorId)!;
    const exists = appointments.find(
        a => 
            a.doctorId === data.doctorId &&
            a.date === data.date && 
            a.time === data.time
    );
    if (exists){
        return {
            type : "slot_unavailable",
            doctor : doctor.name,
            suggestedSlots: [
                "10:00",
                "10:30",
                "11:00"
            ]
        };
    }
    const paymentSuccess = Math.random() > 0.5;
    const payment : IPayment = {
        amount : doctor.fee,
        method : "upi",
        transcationId : "TXN" + Date.now(),
        status : paymentSuccess ? "paid" : "failed",
        paidAt : new Date()
    };
    const appointment : IAppointment = {
        id : appointments.length+1,
        patientId : data.patientId,
        doctorId : data.doctorId,
        date : data.date,
        time : data.time,
        status : "scheduled",
        payment
    };
    appointments.push(appointment);
    if(!paymentSuccess){
        return {
            type: "payment_failed",
            appointment,
            error : "Payment Failed",
            retryable : true
        };
    }   
    return {
        type : "success",
        appointment,
        payment,
        receipt : "REC-" + appointment.id
    };
}
function handleBookingResult(result : BookingResult) : string {
    switch (result.type){
        case "success":
            return `Booking confirmed! Appointment #${result.appointment.id} with Doctor ${result.appointment.doctorId} as %{result.appointment.time}`;
        case "slot_unavailable":
            return `Slot taken. Try : ${result.suggestedSlots.join(",")}`;
        case "payment_failed" :
            return result.retryable ? "Payment Failed. Retrying......" : "Contact Support.";
        case "validation_error" :
            return "Fix these: " +
                result.errors
                    .map(e => `${e.field} ${e.message}`)
                    .join(", ");
        default :
            const exhaustive : never = result;
            return exhaustive;
    }
}

// TESTING
(async () => {
    console.log("\n SUCCESS TEST");
    const result =await bookAppointmentFlow({
        patientId : 1,
        doctorId : 1,
        date : "2026-07-01",
        time : "09:00"
    });
    console.log(handleBookingResult(result));
})();

(async () => {
    console.log("\n VALIDATION TEST");
    const result = await bookAppointmentFlow({
        patientId: 0,
        doctorId : 0,
        date : "",
        time : ""
    });
    console.log(handleBookingResult(result));
})();

appointments.push({
    id : 100,
    patientId : 1,
    doctorId : 1,
    date : "2025-10-06",
    time : "11:00",
    status : "scheduled"
});
(async () => {
    console.log("\n SLOT UNAVAIABLE TEST");
    const result = await bookAppointmentFlow({
        patientId : 2,
        doctorId : 1,
        date : "2025-10-06",
        time : "11:00"
    });
    console.log(handleBookingResult(result));
})();

(async () => {
    console.log ("\n PAYMENT FAILED");
    const result = await bookAppointmentFlow({
        patientId : 1,
        doctorId : 2,
        date : "2026-07-21",
        time : "10:00"
    });
    console.log(handleBookingResult(result));
})();

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

/// TypeScript Error Test cases

// Passing wrong field names
/*
service.createPatient({
    fullname: "Harshitha Reddy",
    age : 25,
    gender: "female",
    phone: "9551294117",
    bloodGroup: "B+",
    allergies: []
});
*/

// Passing wrong data types
/*
service.createPatient({
    name: "Harshitha Reddy",
    age : "twenty five",
    gender : "female",
    phone : "9551294117",
    bloodGroup: "B+",
    allergies: []
});
*/

// Accessing a field that doesn't exiost on the response
/*
const response = service.getPatientById(1);
console.log(response.data.address);
*/
//wrong update type
/*
service.updatePatient(1,{
    age : "Thirty"
});
*/
// wrong propert in update
/*
service.updatePatient(1,{
    salary: 50000
});
*/
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
    name: "ramesh",
    age: 29,
    phone: "9876543210",
    bloodGroup: "B+",
    gender: "male",
    allergies: ["Dust"]
});
console.log(patient);




interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

interface ApiError{
  success: boolean;
  error: string;
  message: string;
  statusCode: number;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function successResponse<T>(
  data: T,
  message: string = "Success"
): ApiResponse<T> {

  return {
    success: true,
    data,
    message,
    statusCode: 200,
  };    
}


function errorResponse(
  statusCode: number,
  message: string,
): ApiError {
  return {
    success: false,
    error: "Error",
    message,
    statusCode
  };


}

function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> {

  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}


type CreatePatientDto = Omit<
IPatient,
"id"|"createdAt"|"isActive"
>;

type UpdatePatientDto = Partial<CreatePatientDto>; 

type PatientPreview= Pick<IPatient, "id" | "name" | "phone" | "bloodGroup" 
>;

type CreateAppointmentDto = Omit<IAppointment, "id" | "status" | "payment">;

type DoctorWithAppointments = IDoctor & { appointments: IAppointment[] };


function getPatients(
    page: number,
    limit: number
): PaginatedResponse<PatientPreview> {
    const patients: PatientPreview[] = [];
    return paginatedResponse(
        patients,
        page,
        limit,
        patients.length
    );
}


function getPatientById(
  id: number
): ApiResponse<IPatient> {
  const patient = patientService.findById(id)!;
  return successResponse(
    patient,
    "Patient found"
  );
}

function createPatient(
    data: CreatePatientDto
): ApiResponse<IPatient> {
    const patient = patientService.register(data);
    return successResponse(
        patient,
        "Patient Created"
    );
}


function updatePatient(
    id: number,
    data: UpdatePatientDto
): ApiResponse<IPatient> {
    const patient = patientService.findById(id)!;
    Object.assign(patient, data);
    return successResponse(
        patient,
        "Patient Updated"
    );
}

function deletePatient(
    id: number
): ApiResponse<{ deleted: boolean }> {
    return successResponse(
        { deleted: true },
        "Patient Deleted"
    );
}


interface BookingSuccess{
    type:"success";
    appointment:IAppointment;
    payment:IPayment;
    receipt:string;
}

interface BookingSlotUnavailable{
    type:"slot_unavailable";
    doctor:string;
    suggestedSlots:string[];
}

interface BookingPaymentFailed{
    type:"payment_failed";
    appointment:IAppointment;
    error:string;
    retryable:boolean;
}

interface BookingValidationError{
    type:"validation_error";
    errors:{
        field:string;
        message:string;
    }[];
}

type BookingResult =
    | BookingSuccess
    | BookingSlotUnavailable
    | BookingPaymentFailed
    | BookingValidationError;


async function bookAppointmentFlow(
    data: CreateAppointmentDto
): Promise<BookingResult> {
  if (
    !data.patientId ||
    !data.doctorId
) {
    return {
        type: "validation_error",
        errors: [
            {
                field: "patientId",
                message: "Patient or Doctor is missing"
            }
        ]
    };
}
const slotAvailable = true;
if (!slotAvailable) {
    return {
        type: "slot_unavailable",
        doctor: "Dr. Kumar",
        suggestedSlots: [
            "10:00",
            "10:30",
            "11:00"
        ]
    };
}
const paymentSuccess = true;
if (!paymentSuccess) {
    return {
        type: "payment_failed",
        appointment: {} as IAppointment,
        error: "Payment Declined",
        retryable: true
    };
}
return {

    type: "success",
    appointment: {} as IAppointment,
    payment: {} as IPayment,
    receipt: "Booking Successful"

};
}

function handleBookingResult(
    result: BookingResult
): string {
    switch (result.type) {
        case "success":
            return `Booking confirmed! ${result.receipt}`;
        case "slot_unavailable":
            return `Slot unavailable. Try: ${result.suggestedSlots.join(", ")}`;
        case "payment_failed":
            return `Payment failed: ${result.error}`;
        case "validation_error":
            return result.errors
                .map(error => `${error.field}: ${error.message}`)
                .join(", ");
        default:
            return "Unknown Result";
    }
}
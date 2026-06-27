import {
    UserRole,
    Department,
    AppointmentStatus,
    PaymentMethod,
    PaymentStatus,
    BloodGroup,
    Gender
} from "./types/enums";

import {
    IUser,
    IPatient,
    IDoctor,
    IAppointment,
    IPayment,
    IConsultation,
    IPrescription,
    IAdmission,
    ILabOrder,
    IAdminDashboard,
    IDoctorDashboard,
    IReceptionDashboard
} from "./types/models";

import {
    CreatePatientDto,
    UpdatePatientDto,
    PatientPreview,
    CreateAppointmentDto
} from "./types/dtos";

import {
    ApiResponse,
    PaginatedResponse
} from "./types/responses";

// ---------------- USER ----------------

const user: IUser = {
    id: 1,
    name: "Admin User",
    email: "admin@ayurvena.com",
    role: UserRole.Admin,
    createdAt: new Date(),
    updatedAt: new Date()
};

// ---------------- PATIENT ----------------

const patient: IPatient = {
    id: 101,
    name: "Rahul Sharma",
    age: 28,
    gender: Gender.Male,
    phone: "9876543210",
    bloodGroup: BloodGroup.OPositive,
    allergies: ["Dust"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
};

// ---------------- DOCTOR ----------------

const doctor: IDoctor = {
    id: 201,
    name: "Dr. Kumar",
    specialization: "Cardiology",
    department: Department.Cardiology,
    fee: 700,
    createdAt: new Date(),
    updatedAt: new Date()
};

// ---------------- PAYMENT ----------------

const payment: IPayment = {
    amount: 700,
    method: PaymentMethod.UPI,
    transactionId: "TXN1001",
    status: PaymentStatus.Paid,
    paidAt: new Date()
};

// ---------------- APPOINTMENT ----------------

const appointment: IAppointment = {
    id: 301,
    patientId: patient.id,
    doctorId: doctor.id,
    date: "2026-07-10",
    time: "10:30",
    status: AppointmentStatus.Scheduled,
    payment,
    createdAt: new Date(),
    updatedAt: new Date()
};

// ---------------- CONSULTATION ----------------

const consultation: IConsultation = {
    id: 401,
    appointmentId: appointment.id,
    diagnosis: "Viral Fever",
    notes: "Drink plenty of water",
    createdAt: new Date(),
    updatedAt: new Date()
};

// ---------------- PRESCRIPTION ----------------

const prescription: IPrescription = {
    id: 501,
    consultationId: consultation.id,
    medicines: ["Paracetamol", "Vitamin C"],
    createdAt: new Date(),
    updatedAt: new Date()
};

// ---------------- ADMISSION ----------------

const admission: IAdmission = {
    id: 601,
    patientId: patient.id,
    ward: "General Ward",
    roomNumber: "G12",
    admittedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
};

// ---------------- LAB ORDER ----------------

const labOrder: ILabOrder = {
    id: 701,
    patientId: patient.id,
    testName: "Blood Test",
    status: "Pending",
    createdAt: new Date(),
    updatedAt: new Date()
};

// ---------------- DTO ----------------

const createPatient: CreatePatientDto = {
    name: "Priya",
    age: 25,
    gender: Gender.Female,
    phone: "9988776655",
    bloodGroup: BloodGroup.BPositive,
    allergies: []
};

const updatePatient: UpdatePatientDto = {
    phone: "9000000000"
};

const preview: PatientPreview = {
    id: patient.id,
    name: patient.name,
    phone: patient.phone,
    bloodGroup: patient.bloodGroup
};

const createAppointment: CreateAppointmentDto = {
    patientId: patient.id,
    doctorId: doctor.id,
    date: "2026-08-15",
    time: "11:00"
};

// ---------------- API RESPONSE ----------------

const patientResponse: ApiResponse<IPatient> = {
    success: true,
    data: patient,
    message: "Patient Found",
    statusCode: 200
};

const patientList: PaginatedResponse<PatientPreview> = {
    success: true,
    data: [preview],
    pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1
    }
};

// ---------------- DASHBOARD ----------------

const adminDashboard: IAdminDashboard = {
    totalPatients: 120,
    totalDoctors: 18,
    totalAppointments: 95,
    totalRevenue: 500000
};

const doctorDashboard: IDoctorDashboard = {
    doctorId: doctor.id,
    todayAppointments: 10,
    completedAppointments: 8,
    pendingAppointments: 2
};

const receptionDashboard: IReceptionDashboard = {
    todayRegistrations: 12,
    waitingPatients: 6,
    todaysAppointments: 18
};

// ---------------- OUTPUT ----------------

console.log(user);
console.log(patient);
console.log(doctor);
console.log(payment);
console.log(appointment);
console.log(consultation);
console.log(prescription);
console.log(admission);
console.log(labOrder);

console.log(createPatient);
console.log(updatePatient);
console.log(createAppointment);

console.log(patientResponse);
console.log(patientList);

console.log(adminDashboard);
console.log(doctorDashboard);
console.log(receptionDashboard);
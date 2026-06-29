import { patients, doctors, appointments, payments, queues } from "./data/seed.js";

import { Patient } from "./models/Patient.js";

import { PatientService } from "./services/PatientService.js";
import { DoctorService } from "./services/DoctorService.js";
import { AppointmentService } from "./services/AppointmentService.js";
import { PaymentService } from "./services/PaymentService.js";
import { QueueService } from "./services/QueueService.js";
import { DashboardService } from "./services/DashboardService.js";

import {
    Department,
    AppointmentStatus,
    PaymentMethod,
    PaymentStatus,
    QueueStatus
} from "./types/enums.js";

import type {
    ApiResponse
} from "./types/responses.js";

import type {
    IAppointment
} from "./types/interfaces.js";

const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();
const paymentService = new PaymentService();
const queueService = new QueueService();
const dashboardService = new DashboardService();



try {

    console.log("=========== AYURVENA HOSPITAL DEMO ===========");

    // ---------------- Seed Data ----------------

    patients.forEach(patient => patientService.create(patient));
    doctors.forEach(doctor => doctorService.create(doctor));
    appointments.forEach(appointment => appointmentService.create(appointment));
    payments.forEach(payment => paymentService.create(payment));
    queues.forEach(queue => queueService.create(queue));

    console.log("\nSeed data loaded successfully.");

    console.log(`Patients : ${patientService.getAll().length}`);
    console.log(`Doctors  : ${doctorService.getAll().length}`);

    // ---------------- Register Patient ----------------

    const newPatient = new Patient(
        21,
        "Srinitha Reddy",
        22,
        "9876543200",
        "B+"
    );

    patientService.create(newPatient);

    console.log("\nNew Patient Registered");
    console.log(newPatient);

    /*const eventBus = new EventEmitter();
    const auditLogs: string[] = [];
    function audit(action: string, user: string) {
        const log =
            `${new Date().toLocaleString()} | ${user} | ${action}`;
        auditLogs.push(log);
       console.log("[AUDIT]", log);
    }*/

    // ---------------- Search Cardiologist ----------------

   // ---------------------------------------------------
// 3. Search Cardiologist
// ---------------------------------------------------

console.log("\nSearching Cardiologists");

const cardiologists =
    doctorService.findByDepartment(Department.CARDIOLOGY);

console.log(cardiologists);

if (cardiologists.length === 0) {
    throw new Error("No Cardiologist Found");
}

// Tell TypeScript this doctor definitely exists
const doctor = cardiologists[0]!;

    // ---------------- Book Appointment ----------------

    const appointment = {
        id: 100,
        patientId: newPatient.id,
        doctorId: doctor.id,
        date: "2026-07-10",
        time: "10:00 AM",
        status: AppointmentStatus.SCHEDULED,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    appointmentService.create(appointment);

    console.log("\nAppointment Booked");

    // ---------------- Payment ----------------

    paymentService.create({
        id: 100,
        appointmentId: appointment.id,
        amount: doctor.consultationFee,
        method: PaymentMethod.UPI,
        status: PaymentStatus.PAID,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    console.log("Payment Successful");
    console.log("Appointment Confirmed");

    // ---------------- Consultation ----------------

    appointment.status = AppointmentStatus.COMPLETED;

    console.log("\nConsultation Started");

    console.log("Diagnosis : Viral Fever");

    console.log("Prescription");
    console.log("- Paracetamol");
    console.log("- Vitamin C");
    console.log("- Drink Water");

    // ---------------- Queue ----------------

    console.log("\nQueue");

    queueService.getAll().forEach(queue => {
        console.log(
            `Token ${queue.token} -> ${queue.status}`
        );
    });

    const firstQueue = queueService.getAll()[0];

    if (firstQueue) {
        firstQueue.status = QueueStatus.COMPLETED;
        console.log("Queue Advanced");
    }

    // ---------------- Admin Dashboard ----------------

    console.log("\nAdmin Dashboard");

    console.log(
        dashboardService.getDashboard(
            patientService.getAll(),
            doctorService.getAll(),
            appointmentService.getAll(),
            paymentService.getAll()
        )
    );

    // ---------------- Doctor Dashboard ----------------

    console.log("\nDoctor Dashboard");

    console.log(doctor);

    console.log(
        appointmentService
            .getAll()
            .filter((a: IAppointment) => a.doctorId === doctor.id)
    );

    // ---------------- Cancel Appointment ----------------

    console.log("\nCancelling Appointment");

    appointment.status = AppointmentStatus.CANCELLED;

    paymentService.create({
        id: 101,
        appointmentId: appointment.id,
        amount: doctor.consultationFee,
        method: PaymentMethod.UPI,
        status: PaymentStatus.REFUNDED,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    console.log("Refund Processed");

    // ---------------- Typed Response ----------------

    const response: ApiResponse<string> = {
        success: true,
        message: "Demo completed successfully.",
        statusCode: 200,
        data: "Hospital Workflow Completed"
    };

    console.log("\nFinal Response");
    console.log(response);

} catch (error) {

    console.error("Application Error");
    console.error(error);

}
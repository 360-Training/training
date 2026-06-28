import { AppointmentService } from "./services/AppointmentService.js";
import { DashboardService } from "./services/DashboardService.js";
import { DoctorService } from "./services/DoctorService.js";
import { PatientService } from "./services/PatientService.js";
import { PaymentService } from "./services/PaymentService.js";
import { QueueService } from "./services/QueueService.js";

import { seedData } from "./data/seed.js";

import {
  UserRole,
  AppointmentStatus,
  Department,
  PaymentMethod
} from "./types/enums.js";
const patientService = new PatientService();

const doctorService = new DoctorService();

const appointmentService = new AppointmentService();

const paymentService = new PaymentService();

const queueService = new QueueService();
seedData(
    patientService,
    doctorService
);

console.log("Seed Data Created");
const patient =
    patientService.create({

        name: "Rahul",

        email: "rahul@gmail.com",

        phone: "9876543210",

        role: UserRole.PATIENT,

        bloodGroup: "O+",

        age: 22,

        gender: "Male",

        allergies: []

    });

console.log(patient);
const cardiologists =
    doctorService.findByDepartment(
        Department.CARDIOLOGY
    );

console.log(cardiologists);
const appointment =
    appointmentService.create({

        patientId: patient.id,

        doctorId:
            cardiologists[0].id,

        date: "2030-01-01",

        time: "09:00",

        status:
            AppointmentStatus.SCHEDULED

    });

console.log(appointment);
const payment =
    paymentService.processPayment(

        appointment.id,

        500,

        PaymentMethod.UPI

    );

console.log(payment);
queueService.addPatient(
    patient.id
);

console.log(
    queueService.getQueue()
);

console.log(
    queueService.nextPatient()
);
const dashboard =
    DashboardService.getAdminDashboard(

        patientService.findAll(),

        doctorService.findAll(),

        appointmentService.findAll(),

        paymentService.findAll()

    );

console.log(dashboard);
appointmentService.cancelAppointment(
    appointment.id
);

console.log(
    appointmentService.findById(
        appointment.id
    )
);
paymentService.refundPayment(
    payment.id
);

console.log(
    paymentService.findById(
        payment.id
    )
);


import { EventService } from "./services/EventService.js";
const eventService = new EventService();
eventService.on(
    "appointment:booked",
    data => {
        console.log("Appointment Booked");
        console.log(data);
    }
);

eventService.on(
    "payment:completed",
    data => {
        console.log("Payment Completed");
        console.log(data);
    }
);

eventService.on(
    "queue:advanced",
    data => {
        console.log("Next Patient");
        console.log(data);
    }
);

eventService.emit(
    "appointment:booked",
    appointment
);
eventService.emit(
    "payment:completed",
    payment
);
const nextPatient =
    queueService.nextPatient();

eventService.emit(
    "queue:advanced",
    nextPatient
);


import { AuditLogger } from "./services/AuditLogger.js";
const logger = new AuditLogger();
logger.log(
    "Receptionist",
    "Register Patient",
    `Patient ${patient.name} registered`
);
logger.log(
    "Receptionist",
    "Book Appointment",
    `Appointment ${appointment.id} booked`
);
logger.log(
    "Cashier",
    "Payment",
    `₹${payment.amount} received`
);
logger.log(
    "Receptionist",
    "Queue",
    "Next patient called"
);
logger.log(
    "Admin",
    "Refund",
    `Refunded payment ${payment.id}`
);


const patient1 =
    patientService.create({

        name: "Rahul",

        email: "rahul@gmail.com",

        phone: "9876543210",

        role: UserRole.PATIENT,

        bloodGroup: "O+",

        age: 25,

        gender: "Male",

        allergies: []

    });

patient1.hospitalId = 1;




import { Patient } from "../models/Patient.js";
import { Doctor } from "../models/Doctor.js";
import { Appointment } from "../models/Appointment.js";

import { Department, AppointmentStatus, PaymentMethod, PaymentStatus, QueueStatus } from "../types/enums.js";
import type { IPayment, IQueue } from "../types/interfaces.js";

export const patients = [
  new Patient(1, "Teena", 28, "9077498002", "O+"),
  new Patient(2, "Anitha Reddy", 24, "9876534210", "A+"),
  new Patient(3, "Srinivas Kumar", 35, "9876543212", "B+"),
  new Patient(4, "Tharun Patel", 30, "7702945516", "AB+"),
  new Patient(5, "Rohan Reddy", 42, "9876543214", "O-")
];

export const doctors = [
    new Doctor(
    1,
    "Dr. Kumar",
    Department.CARDIOLOGY,
    "Cardiologist",
    800
  ),

  new Doctor(
    2,
    "Dr. Reddy",
    Department.NEUROLOGY,
    "Neurologist",
    1000
  ),

  new Doctor(
    3,
    "Dr. Sharma",
    Department.ORTHOPEDICS,
    "Orthopedic",
    700
  )   
];

export const appointments = [
  new Appointment(
    1,
    1,
    1,
    "2026-05-10",
    "09:00",
    AppointmentStatus.COMPLETED
  ),

  new Appointment(
    2,
    2,
    2,
    "2026-05-01",
    "10:00",
    AppointmentStatus.SCHEDULED
  ),

  new Appointment(
    3,
    3,
    1,
    "2026-05-12",
    "11:00",
    AppointmentStatus.CANCELLED
  )
];

export const payments : IPayment[] = [
    {
        id: 1,
        appointmentId: 1,
        amount: 800,
        method: PaymentMethod.UPI,
        status: PaymentStatus.PAID,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        appointmentId: 2,
        amount: 1000,
        method: PaymentMethod.CARD,
        status: PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

export const queues : IQueue[] = [
    {
        id : 1,
        patientId : 1,
        doctorId : 1,
        token : 101,
        status : QueueStatus.WAITING,
        createdAt : new Date(),
        updatedAt : new Date()
    },
    {
        id : 2,
        patientId : 2,
        doctorId : 2,
        token : 102,
        status : QueueStatus.WAITING,
        createdAt : new Date(),
        updatedAt : new Date()
    }
];
import { Patient } from "../models/Patient";
import { Doctor } from "../models/Doctor";
import { Appointment } from "../models/Appointment";

import {
    BloodGroup,
    Gender,
    Department,
    AppointmentStatus
} from "../types/enums";

export function seedPatients(): Patient[] {
    return [
        new Patient(
            1,
            "Rahul",
            25,
            Gender.MALE,
            "9876543210",
            BloodGroup.O_POSITIVE
        ),
        new Patient(
            2,
            "Priya",
            30,
            Gender.FEMALE,
            "9876501234",
            BloodGroup.A_POSITIVE
        ),
        new Patient(
            3,
            "Kiran",
            40,
            Gender.MALE,
            "9123456789",
            BloodGroup.B_POSITIVE
        )
    ];
}

export function seedDoctors(): Doctor[] {
    return [
        new Doctor(
            1,
            "Dr. Kumar",
            "Cardiologist",
            Department.CARDIOLOGY,
            "9991111111",
            12,
            500
        ),
        new Doctor(
            2,
            "Dr. Meena",
            "Neurologist",
            Department.NEUROLOGY,
            "9992222222",
            10,
            700
        ),
        new Doctor(
            3,
            "Dr. Ravi",
            "Orthopedic",
            Department.ORTHOPEDICS,
            "9993333333",
            8,
            600
        )
    ];
}

export function seedAppointments(): Appointment[] {
    return [
        new Appointment(
            1,
            1,
            1,
            new Date("2026-07-01"),
            AppointmentStatus.BOOKED,
            1
        ),
        new Appointment(
            2,
            2,
            2,
            new Date("2026-07-02"),
            AppointmentStatus.COMPLETED,
            2
        )
    ];
}
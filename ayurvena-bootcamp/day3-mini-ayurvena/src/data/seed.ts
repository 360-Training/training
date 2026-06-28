import {
    PatientService
} from "../services/PatientService.js";

import {
    DoctorService
} from "../services/DoctorService.js";

import {
    UserRole,
    Department
} from "../types/enums.js";


export function seedPatients(
    patientService: PatientService
): void {

    for (let i = 1; i <= 20; i++) {

        patientService.create({

            name: `Patient ${i}`,

            email: `patient${i}@gmail.com`,

            phone: `98765432${String(i).padStart(2, "0")}`,

            role: UserRole.PATIENT,

            bloodGroup: "O+",

            age: 20 + i,

            gender: "Male",

            allergies: []

        });

    }

}

export function seedDoctors(
    doctorService: DoctorService
): void {

    const departments = [

        Department.CARDIOLOGY,

        Department.NEUROLOGY,

        Department.GENERAL

    ];

    for (let i = 1; i <= 5; i++) {

        doctorService.create({

            name: `Doctor ${i}`,

            email: `doctor${i}@gmail.com`,

            phone: `99999999${String(i).padStart(2, "0")}`,

            role: UserRole.DOCTOR,

            specialization: "Specialist",

            department:
                departments[i % 3],

            fee: 500

        });

    }

}

export function seedData(

    patientService: PatientService,

    doctorService: DoctorService

): void {

    seedPatients(patientService);

    seedDoctors(doctorService);

}






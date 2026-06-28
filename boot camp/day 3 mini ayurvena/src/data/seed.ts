import { Patient } from "../models/Patient";
import { Doctor } from "../models/Doctor";
import { Gender,Department } from "../types/enums";

export function seedPatients(): Patient[] {
    const patients: Patient[]= [];

    for(let i=1;i<=20;i++){
        patients.push(
            new Patient(
                i,
                'Patient ${i}',
                20 + i,
                i%2 === 0 ? Gender.Male : Gender.Female
            )
        );
    }
        return patients;
    }
    export function seedDoctors(): Doctor[]{
        return[
            new Doctor(1, "Dr.Ravi", Department.Cardiology),
            new Doctor(2, "Dr.Priya", Department.Neurology),
            new Doctor(3, "Dr.Krian", Department.Orthopedics),
            new Doctor(4, "Dr.Meena", Department.Cardiology),
            new Doctor(5, "Dr.Arun", Department.Neurology)
        ];
    }

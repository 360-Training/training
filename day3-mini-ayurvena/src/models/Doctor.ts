import { BaseEntity } from "./BaseEntity";
import { IDoctor } from "../types/models";
import { Department } from "../types/enums";

export class Doctor extends BaseEntity implements IDoctor {

    public name: string;
    public specialization: string;
    public department: Department;
    public phone: string;
    public experience: number;
    public consultationFee: number;

    constructor(
        id: number,
        name: string,
        specialization: string,
        department: Department,
        phone: string,
        experience: number,
        consultationFee: number
    ) {

        super(id);

        this.name = name;
        this.specialization = specialization;
        this.department = department;
        this.phone = phone;
        this.experience = experience;
        this.consultationFee = consultationFee;
    }

    displayDetails(): void {

        console.log("----- Doctor Details -----");
        console.log("ID:", this.id);
        console.log("Name:", this.name);
        console.log("Specialization:", this.specialization);
        console.log("Department:", this.department);
        console.log("Phone:", this.phone);
        console.log("Experience:", this.experience);
        console.log("Consultation Fee:", this.consultationFee);
    }
}
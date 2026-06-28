import { BaseEntity } from "./BaseEntity";
import { IPatient } from "../types/models";
import { BloodGroup, Gender } from "../types/enums";

export class Patient extends BaseEntity implements IPatient {

    public name: string;
    public age: number;
    public gender: Gender;
    public phone: string;
    public bloodGroup: BloodGroup;

    constructor(
        id: number,
        name: string,
        age: number,
        gender: Gender,
        phone: string,
        bloodGroup: BloodGroup
    ) {

        super(id);

        this.name = name;
        this.age = age;
        this.gender = gender;
        this.phone = phone;
        this.bloodGroup = bloodGroup;
    }

    displayDetails(): void {

        console.log("----- Patient Details -----");
        console.log("ID:", this.id);
        console.log("Name:", this.name);
        console.log("Age:", this.age);
        console.log("Gender:", this.gender);
        console.log("Phone:", this.phone);
        console.log("Blood Group:", this.bloodGroup);
    }
}
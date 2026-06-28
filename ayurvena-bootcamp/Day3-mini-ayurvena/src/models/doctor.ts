import { BaseEntity } from "./baseEntity";
import { Department } from "../types/enums";

export class Doctor extends BaseEntity {
    constructor(
        id: number,
        public name: string,
        public department: Department,
        public experience: number
    ) {
        super(id);
    }
    showDoctor() {
        console.log(
            `${this.name} - ${this.department}`
        );
    }

}
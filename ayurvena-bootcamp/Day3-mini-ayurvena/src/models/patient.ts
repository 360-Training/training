import { BaseEntity } from "./baseEntity";
import { Gender } from "../types/enums";

export class Patient extends BaseEntity {
    constructor(
        id: number,
        public name: string,
        public age: number,
        public gender: Gender,
        public phone: string
    ) {
        super(id);
    }
    showPatient() {
        console.log(
            `${this.id} - ${this.name} - ${this.age} - ${this.gender}`
        );
    }

}
import {IDoctor} from "../types/interfaces";
import {Department} from "../types/enums";

export class Doctor implements IDoctor {
    constructor(
        public id: number,
        public name: string,
        public department: Department,
        public createdAt: Date= new Date(),
        public updatedAt: Date= new Date()
    ) {}
}
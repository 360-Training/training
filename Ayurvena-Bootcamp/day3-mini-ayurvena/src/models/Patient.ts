import type { IPatient } from "../types/interfaces.js";
export class Patient implements IPatient {
    constructor (
        public id : number,
        public hospitalId : number,
        public name : string,
        public age : number,
        public phone : string,
        public bloodGroup : string,
        public createdAt : Date = new Date(),
        public updatedAt : Date = new Date()
    ){}
}

import type { IDoctor } from "../types/interfaces.js";
import type { Department } from "../types/enums.js";
export class Doctor implements IDoctor {
    constructor (
        public id : number,
        public hospitalId : number,
        public name : string,
        public department : Department,
        public specialization : string,
        public consultationFee : number,
        public createdAt : Date = new Date(),
        public updatedAt : Date = new Date()
    ){}
}

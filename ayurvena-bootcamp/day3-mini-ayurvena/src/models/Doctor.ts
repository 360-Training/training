import type { Idoctor } from "../types/models.js";
import {
    UserRole,
    Department
} from "../types/enums.js";

export class Doctor implements Idoctor {

    id!:number;
    createdAt!:Date;
    updatedAt!:Date;

    name!:string;
    email!:string;
    phone!:string;
    role!:UserRole;
    specialization!:string;
    department!:Department;
    fee!:number;

    constructor(data:Idoctor){
        Object.assign(this,data);
    }
}
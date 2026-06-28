import type { IPatient } from "../types/models.js";

export class Patient implements IPatient{
  id:number;
  createdAt:Date;
  updatedAt:Date;

  name:string;
  emial:string;
  phone:string;
  role;
  bloodGroup:string;
  age:number;
  gender:string;
  allergies:string[];

  constructor(data: IPatient){
    this.id=data.id;
    this.createdAt=data.createdAt;
    this.updatedAt=data.updatedAt;
    this.name=data.name;
    this.emial=data.email;
    this.phone=data.phone;
    this.role=data.role;
    this.bloodGroup=data.bloodGroup;
    this.age=data.age;
    this.gender=data.gender;
    this.allergies=data.allergies;
  }
  addAllergy(allergy:string):void{
    this.allergies.push(allergy);
  }
  removeAllergy(allergy:string): void{
    this.allergies=this.allergies.filter(
      item=>item!==allergy
    );
  }
}




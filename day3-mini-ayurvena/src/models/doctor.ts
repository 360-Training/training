import { BaseEntity } from './baseEntity';
export class Doctor extends BaseEntity {
  name: string;
  specialization: string;
  experience: number;
  constructor(name: string, specialization: string, experience: number) {
    super();
    this.name = name;
    this.specialization = specialization;
    this.experience = experience;
  }
}
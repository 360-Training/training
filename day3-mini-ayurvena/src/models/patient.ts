import { BaseEntity } from './baseEntity';
export class Patient extends BaseEntity {
  name: string;
  age: number;
  gender: string;
  constructor(name: string, age: number, gender: string) {
    super();
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}
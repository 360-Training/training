import { IPatient } from "../types/interfaces";
import { Gender } from "../types/enums";

export class Patient implements IPatient {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public gender: Gender,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
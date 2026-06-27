import { Gender } from "./enums";
export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: Gender;
}
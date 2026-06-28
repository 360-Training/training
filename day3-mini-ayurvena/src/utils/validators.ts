import { BloodGroup } from "../types/enums";
export class Validator {
    static isPhone(phone: string): boolean {
        return /^[6-9]\d{9}$/.test(phone);
    }
    static isEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    static isFutureDate(date: Date): boolean {
        return date.getTime() > Date.now();
    }
    static isBloodGroup(value: string): value is BloodGroup {
        return Object.values(BloodGroup).includes(value as BloodGroup);
    }
}
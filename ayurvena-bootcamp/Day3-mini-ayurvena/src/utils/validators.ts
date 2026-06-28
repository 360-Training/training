export function checkPhone(phone: string): boolean {

    return phone.length === 10;

}

export function checkAge(age: number): boolean {

    return age > 0 && age < 120;

}

export function checkExperience(years: number): boolean {

    return years >= 0;

}
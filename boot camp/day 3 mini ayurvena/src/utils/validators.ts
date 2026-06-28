export function validateName(name: string): boolean {
    return name.trim().length>0;
}

export function validateAge(age: number): boolean {
    return age>0;
}
export function validatePhone(phone : string) : boolean {
    return /^[6-9]\d{9}$/.test(phone);
}
export function validateEmail(email : string) : boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function validateDate(date : string) : boolean {
    return !isNaN(Date.parse(date));
}
export function validateAmount(amount : number):boolean {
    return amount > 0;
}
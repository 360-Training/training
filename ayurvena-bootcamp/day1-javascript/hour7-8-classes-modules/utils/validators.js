export function validatePhone(phone) {
    if (phone.length === 10) {
        return { valid: true };
    }
    return {
        valid: false,
        error: "Invalid phone number"
    };
}

export function validateDate(date) {

    if (!isNaN(Date.parse(date))) {
        return { valid: true };
    }
    return {
        valid: false,
        error: "Invalid date"
    };
}

export function validateEmail(email) {

    if (email.includes("@") && email.includes(".")) {
        return { valid: true };
    }
    return {
        valid: false,
        error: "Invalid email"
    };
}
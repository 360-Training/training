// Validate Phone
function validatePhone(phone) {

    const phoneRegex = /^[0-9]{10}$/;

    if (phoneRegex.test(phone)) {
        return { valid: true };
    }

    return {
        valid: false,
        error: "Phone number must contain exactly 10 digits"
    };
}

// Validate Date
function validateDate(date) {

    const d = new Date(date);

    if (!isNaN(d.getTime())) {
        return { valid: true };
    }

    return {
        valid: false,
        error: "Invalid date"
    };
}

// Validate Email
function validateEmail(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        return { valid: true };
    }

    return {
        valid: false,
        error: "Invalid email address"
    };
}

module.exports = {
    validatePhone,
    validateDate,
    validateEmail
};


// --------------------
// TESTS
// --------------------

console.log("\n--- PHONE TESTS ---");

console.log(validatePhone("9876543210"));
console.log(validatePhone("12345"));

console.log("\n--- DATE TESTS ---");

console.log(validateDate("2026-07-01"));
console.log(validateDate("abcd"));

console.log("\n--- EMAIL TESTS ---");

console.log(validateEmail("rahul@gmail.com"));
console.log(validateEmail("rahulgmail.com"));
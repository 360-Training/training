// Custom Error Classes

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class BookingError extends Error {
    constructor(message) {
        super(message);
        this.name = "BookingError";
    }
}

module.exports = {
    NotFoundError,
    ValidationError,
    BookingError
};


// --------------------
// TESTS
// --------------------

console.log("\n--- TEST 1: NotFoundError ---");

try {
    throw new NotFoundError("Patient not found");
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}

console.log("\n--- TEST 2: ValidationError ---");

try {
    throw new ValidationError("Invalid phone number");
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}

console.log("\n--- TEST 3: BookingError ---");

try {
    throw new BookingError("Doctor slot already booked");
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}
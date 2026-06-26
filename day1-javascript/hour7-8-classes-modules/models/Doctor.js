// Doctor Class

class Doctor {
    constructor(id, name, specialization, fee, schedule = {}) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.fee = fee;
        this.schedule = schedule;
        this.earnings = 0;
    }
    isAvailable(day, time) {
    if (!this.schedule[day]) {
        return false;
    }

    return this.schedule[day][time] === "available";
}
bookSlot(day, time) {
    if (this.isAvailable(day, time)) {
        this.schedule[day][time] = "booked";
        this.earnings += this.fee;
        return "Slot booked successfully";
    }

    return "Slot not available";
    }
freeSlot(day, time) {
    if (this.schedule[day] && this.schedule[day][time]) {
        this.schedule[day][time] = "available";
        return "Slot is now available";
    }

    return "Invalid slot";
}
getEarnings() {
    return this.earnings;
}
}
// --------------------
// TEST 1
// --------------------

const doctor1 = new Doctor(
    1,
    "Dr. Kumar",
    "Cardiology",
    500,
    {
        Monday: {
            "09:00": "available",
            "10:00": "available"
        }
    }
);

console.log("\n--- TEST 1: Doctor Object ---");
console.log(doctor1);

// --------------------
// TEST 2
// --------------------

console.log("\n--- TEST 2: Check Availability ---");

console.log(doctor1.isAvailable("Monday", "09:00"));
console.log(doctor1.isAvailable("Monday", "10:00"));
console.log(doctor1.isAvailable("Tuesday", "09:00"));

// --------------------
// TEST 3
// --------------------

console.log("\n--- TEST 3: Book Slot ---");

console.log(doctor1.bookSlot("Monday", "09:00"));

// --------------------
// TEST 4
// --------------------

console.log("\n--- TEST 4: Check After Booking ---");

console.log(doctor1.isAvailable("Monday", "09:00"));

// --------------------
// TEST 5
// --------------------

console.log("\n--- TEST 5: Earnings ---");

console.log(doctor1.earnings);

// --------------------
// TEST 6
// --------------------

console.log("\n--- TEST 6: Free Slot ---");

console.log(doctor1.freeSlot("Monday", "09:00"));

// --------------------
// TEST 7
// --------------------

console.log("\n--- TEST 7: Availability After Freeing ---");

console.log(doctor1.isAvailable("Monday", "09:00"));

// --------------------
// TEST 8
// --------------------

console.log("\n--- TEST 8: Total Earnings ---");

console.log(doctor1.getEarnings());

module.exports = Doctor;
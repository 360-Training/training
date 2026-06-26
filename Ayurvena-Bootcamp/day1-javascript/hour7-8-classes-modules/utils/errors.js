class ValidationError extends Error{
    constructor(message){
        super(message);
        this.name = "ValidationError";
    }
}

class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "NotFoundError";
    }
}

class AppointmentError extends Error{
    constructor(message){
        super(message);
        this.name = "AppointmentError";
    }
}



module.exports = {
    ValidationError,
    NotFoundError,
    AppointmentError
} ;
console.log("--1. ValidationError--");
try{ 
    throw new ValidationError("Invalid phone number");
}catch(error){
    console.log(error.name);
    console.log(error.message);
}

console.log("\n-- 2. NotFoundError--");

try{
    throw new NotFoundError("Patient not found");
}catch(error){
    console.log(error.name);
    console.log(error.message);
}

console.log("\n--3. AppointmentError--");

try{
    throw new AppointmentError("Appointment booking failed");
}catch(error){
    console.log(error.name);
    console.log(error.message);
}
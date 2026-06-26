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

try{ 
    throw new ValidationError("Invalid phone number");
}catch(error){
    console.log(error.name);
    console.log(error.message);
}

try{
    throw new NotFoundError("Patient not found");
}catch(error){
    console.log(error.name);
    console.log(error.message);
}

try{
    throw new AppointmentError("Appointment booking failed");
}catch(error){
    console.log(error.name);
    console.log(error.message);
}
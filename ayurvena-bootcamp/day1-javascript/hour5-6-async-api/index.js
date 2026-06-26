function fetchPatient(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const patient = patients.find(p => p.id === id);
            if (patient) {
                resolve(patient);
            } else {
                reject(new Error("Patient not found"));
            }
        }, 500);
    });
}

function fetchDoctor(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const doctor = doctors.find(d => d.id === id);

            if (doctor) {
                resolve(doctor);
            } else {
                reject(new Error("Doctor not found"));
            }
        }, 500);
    });
}

function fetchAppointments(patientId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = appointments.filter(
                a => a.patientId === patientId
            );
            resolve(result);
        }, 500);
    });
}

function createAppointment(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const appointment = {
                id: appointments.length + 1,
                ...data,
                status: "scheduled"
            };
            appointments.push(appointment);
            resolve(appointment);
        }, 500);
    });
}


async function getPatientDashboard(patientId) {
    try {
        const patient = await fetchPatient(patientId);
        const patientAppointments = await fetchAppointments(patientId);
        const appointmentDetails = [];
        for (const appointment of patientAppointments) {
            const doctor = await fetchDoctor(appointment.doctorId);
            appointmentDetails.push({
                date: appointment.date,
                time: appointment.time,
                doctor: {
                    name: doctor.name,
                    specialization: doctor.specialization
                },
                status: appointment.status
            });
        }
        return {
            patient: {
                name: patient.name,
                phone: patient.phone
            },
            appointments: appointmentDetails,
            stats: {
                total: appointmentDetails.length,
                upcoming: appointmentDetails.filter(
                    a => a.status === "scheduled"
                ).length,
                completed: appointmentDetails.filter(
                    a => a.status === "completed"
                ).length
            }
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}


async function bookAndConfirm(patientId, doctorId, date, time) {
    try {
        await fetchPatient(patientId);
        await fetchDoctor(doctorId);
        const doctor = doctors.find(d => d.id === doctorId);
        const slot = doctor.slots.find(s => s.time === time);
        if (!slot || slot.isBooked) {
            throw new Error("Slot not available");
        }
        slot.isBooked = true;
        const appointment = await createAppointment({
            patientId,
            doctorId,
            date,
            time
        });
        return {
            message: "Appointment Confirmed",
            appointment
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}


async function getDashboardForMultiplePatients(patientIds) {
    try {
        const dashboards = await Promise.all(
            patientIds.map(id => getPatientDashboard(id))
        );
        return dashboards;
    } catch (error) {
        return {
            error: error.message
        };
    }
}


fetchPatient(1)
.then(data => console.log(data))
.catch(err => console.log(err.message));

fetchPatient(100)
.catch(err => console.log(err.message));

bookAndConfirm(1,1,"2026-07-10","09:00")
.then(data => console.log(data));

bookAndConfirm(50,1,"2026-07-10","09:00")
.then(data => console.log(data));

getDashboardForMultiplePatients([1,2,3])
.then(data => console.log(data));



class NotFoundError extends Error {
    constructor(resource,id){
        super(`${resource} with id ${id} not found`);
        this.name="NotFoundError";
        this.statusCode=404;
    }
}
class ValidationError extends Error{
    constructor(message){
        super(message);
        this.name="ValidationError";
        this.statusCode=400;
    }
}
class ConflictError extends Error{
    constructor(message){
        super(message);
        this.name="ConflictError";
        this.statusCode=409;
    }
}
class UnauthorizedError extends Error{
    constructor(message){
        super(message);
        this.name="UnauthorizedError";
        this.statusCode=401;
    }
}
class PaymentError extends Error{
    constructor(message){
        super(message);
        this.name="PaymentError";
        this.statusCode=402;
    }
}


async function bookAppointment(patientId,doctorId,date,time){
    if(!patientId){
        throw new ValidationError("Patient ID is required");
    }
    if(!doctorId){
        throw new ValidationError("Doctor ID is required");
    }
    const patient=patients.find(p=>p.id===patientId);
    if(!patient){
        throw new NotFoundError("Patient",patientId);
    }
    const doctor=doctors.find(d=>d.id===doctorId);
    if(!doctor){
        throw new NotFoundError("Doctor",doctorId);
    }
    const slot=doctor.slots.find(s=>s.time===time);
    if(!slot || slot.isBooked){
        throw new ConflictError(`Slot ${time} is already booked`);
    }
    if(new Date(date)<new Date()){
        throw new ValidationError("Cannot book appointments in the past");
    }
    slot.isBooked=true;
    const appointment={
        id:appointments.length+1,
        patientId,
        doctorId,
        date,
        time,
        status:"scheduled"
    };
    appointments.push(appointment);
    return appointment;
}


async function processPayment(appointmentId,amount,method){
    let attempts=0;
    while(attempts<2){
        attempts++;
        if(Math.random()<0.7){
            return{
                status:"paid",
                transactionId:"TXN-"+Date.now()
            };
        }
    }
    throw new PaymentError("Payment declined");
}



async function completeBookingFlow(patientId,doctorId,date,time,paymentMethod){
    try{
        const appointment=await bookAppointment(
            patientId,
            doctorId,
            date,
            time
        );
        const payment=await processPayment(
            appointment.id,
            500,
            paymentMethod
        );
        return{
            appointment,
            payment,
            message:"Booking Successful"
        };
    }
    catch(error){
        return{
            error:error.message
        };
    }
}

completeBookingFlow(1,1,"2026-12-01","09:00","UPI")
.then(console.log);

completeBookingFlow(50,1,"2026-12-01","09:00","UPI")
.then(console.log);

completeBookingFlow(1,1,"2026-12-01","09:00","CARD")
.then(console.log);
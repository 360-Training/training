const Appointment = require("../models/Appointment");

class AppointmentService {
    constructor() {
        this.appointments = [];
        this.currentId = 1;
    }

    bookAppointment(patient, doctor, date, time) {
        const appointment = new Appointment(
            this.currentId++,
            patient,
            doctor,
            date,
            time
        );

        this.appointments.push(appointment);

        return appointment;
    }

    findAppointment(id) {
        return this.appointments.find(app => app.id === id);
    }

    cancelAppointment(id) {
        const appointment = this.findAppointment(id);

        if (!appointment) {
            return "Appointment not found";
        }

        appointment.cancel();
        return appointment;
    }

    completeAppointment(id) {
        const appointment = this.findAppointment(id);

        if (!appointment) {
            return "Appointment not found";
        }

        appointment.complete();
        return appointment;
    }

    getAllAppointments() {
        return this.appointments;
    }
}

module.exports = AppointmentService;


// ----------------------
// TESTS
// ----------------------

const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

const patient = new Patient(
    1,
    "Rahul Kumar",
    32,
    "8889998888",
    "O+"
);

const doctor = new Doctor(
    1,
    "Dr. Kumar",
    "Cardiology",
    500,
    {
        Monday: {
            "09:00": false
        }
    }
);

const appointmentService = new AppointmentService();

console.log("\n--- TEST 1: Book Appointment ---");

const appointment = appointmentService.bookAppointment(
    patient,
    doctor,
    "2026-07-01",
    "09:00"
);

console.log(appointment);

console.log("\n--- TEST 2: Complete Appointment ---");

console.log(appointmentService.completeAppointment(1));

console.log("\n--- TEST 3: Cancel Appointment ---");

console.log(appointmentService.cancelAppointment(1));

console.log("\n--- TEST 4: All Appointments ---");

console.log(appointmentService.getAllAppointments());
const PatientService = require("../services/PatientService");
const DoctorService = require("../services/DoctorService");
const AppointmentService = require("../services/AppointmentService");

// --------------------
// CREATE SERVICE INSTANCES
// --------------------
const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();

// --------------------
// SEED PATIENTS
// --------------------
function seedPatients() {
    const patients = [];

    patients.push(patientService.registerPatient({
        name: "Rahul Kumar",
        age: 32,
        phone: "8889998888",
        bloodGroup: "O+"
    }));

    patients.push(patientService.registerPatient({
        name: "Priya Sharma",
        age: 28,
        phone: "7778889999",
        bloodGroup: "B+"
    }));

    patients.push(patientService.registerPatient({
        name: "Amit Singh",
        age: 45,
        phone: "9998887777",
        bloodGroup: "O+"
    }));

    patients.push(patientService.registerPatient({
        name: "Sneha Reddy",
        age: 22,
        phone: "6667778888",
        bloodGroup: "AB+"
    }));

    patients.push(patientService.registerPatient({
        name: "Vikram Rao",
        age: 38,
        phone: "5556667777",
        bloodGroup: "A-"
    }));

    return patients;
}

// --------------------
// SEED DOCTORS
// --------------------
function seedDoctors() {
    const doctors = [];

    doctors.push(doctorService.addDoctor({
        name: "Dr. Kumar",
        specialization: "Cardiology",
        fee: 500
    }));

    doctors.push(doctorService.addDoctor({
        name: "Dr. Mehta",
        specialization: "Neurology",
        fee: 800
    }));

    return doctors;
}

// --------------------
// SEED APPOINTMENTS
// --------------------
function seedAppointments(patients, doctors) {
    const appointments = [];

    appointments.push(
        appointmentService.bookAppointment(
            patients[0].id,
            doctors[0].id,
            "2026-07-01",
            "09:00"
        )
    );

    appointments.push(
        appointmentService.bookAppointment(
            patients[1].id,
            doctors[1].id,
            "2026-07-01",
            "10:00"
        )
    );

    return appointments;
}

// --------------------
// EXPORT
// --------------------
module.exports = {
    seedPatients,
    seedDoctors,
    seedAppointments
};
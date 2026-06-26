const Doctor = require("../models/Doctor");

class DoctorService {

    constructor() {
        this.doctors = [];
        this.currentId = 1;
    }

    // -------------------------
    // Add Doctor
    // -------------------------
    addDoctor(data) {

        const doctor = new Doctor(
            this.currentId++,
            data.name,
            data.specialization,
            data.fee,
            data.schedule || this.createDefaultSchedule()
        );

        this.doctors.push(doctor);
        return doctor;
    }

    // -------------------------
    // Find Doctor by ID
    // -------------------------
    findDoctor(id) {
        return this.doctors.find(doc => doc.id === id);
    }

    // -------------------------
    // Get All Doctors
    // -------------------------
    getAllDoctors() {
        return this.doctors;
    }

    // -------------------------
    // Create default schedule
    // -------------------------
    createDefaultSchedule() {

        return {
            Monday: {
                "09:00": "available",
                "10:00": "available",
                "11:00": "available"
            },
            Tuesday: {
                "09:00": "available",
                "10:00": "available",
                "11:00": "available"
            },
            Wednesday: {
                "09:00": "available",
                "10:00": "available",
                "11:00": "available"
            },
            Thursday: {
                "09:00": "available",
                "10:00": "available",
                "11:00": "available"
            },
            Friday: {
                "09:00": "available",
                "10:00": "available",
                "11:00": "available"
            }
        };
    }
}

module.exports = DoctorService;
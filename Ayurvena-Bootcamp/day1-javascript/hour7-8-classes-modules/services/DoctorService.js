const Doctor = require("../models/Doctor");

class DoctorService {
  constructor() {
    this.doctors = [];
    this.currentId = 1;
  }

  // Add Doctor
  addDoctor(data) {
    const doctor = new Doctor(
      this.currentId++,
      data.name,
      data.specialization,
      data.fee,
      data.schedule
    );

    this.doctors.push(doctor);

    return doctor;
  }

  // Get All Doctors
  getAllDoctors() {
    return this.doctors;
  }

  // Find Doctor by ID
  findDoctor(id) {
    return this.doctors.find(doctor => doctor.id === id);
  }

  // Search Doctor by Name
  searchDoctors(name) {
    return this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Get Available Doctors
  getAvailableDoctors(day, time) {
    return this.doctors.filter(doctor =>
      doctor.isAvailable(day, time)
    );
  }

  // Delete Doctor
  deleteDoctor(id) {
    const index = this.doctors.findIndex(
      doctor => doctor.id === id
    );

    if (index === -1) {
      return false;
    }

    this.doctors.splice(index, 1);

    return true;
  }

  // Total Doctors
  getDoctorCount() {
    return this.doctors.length;
  }
}

module.exports = DoctorService;


// ---------------- TESTS ----------------

const doctorService = new DoctorService();

console.log("\n--- TEST 1: Add Doctor ---");

const doctor1 = doctorService.addDoctor({
  name: "Dr. Kumar",
  specialization: "Cardiology",
  fee: 500,
  schedule: {
    Monday: [
      { time: "09:00", booked: false },
      { time: "09:30", booked: false }
    ],
    Wednesday: [
      { time: "10:00", booked: false }
    ]
  }
});

console.log(doctor1);

console.log("\n--- TEST 2: Add Another Doctor ---");

const doctor2 = doctorService.addDoctor({
  name: "Dr. Sharma",
  specialization: "Dermatology",
  fee: 700,
  schedule: {
    Tuesday: [
      { time: "11:00", booked: false },
      { time: "11:30", booked: false }
    ]
  }
});

console.log(doctor2);

console.log("\n--- TEST 3: Find Doctor ---");
console.log(doctorService.findDoctor(1));

console.log("\n--- TEST 4: Search Doctor ---");
console.log(doctorService.searchDoctors("kumar"));

console.log("\n--- TEST 5: Get Available Doctors ---");
console.log(doctorService.getAvailableDoctors("Monday", "09:00"));

console.log("\n--- TEST 6: Get All Doctors ---");
console.log(doctorService.getAllDoctors());

console.log("\n--- TEST 7: Doctor Count ---");
console.log(doctorService.getDoctorCount());

console.log("\n--- TEST 8: Delete Doctor ---");
console.log(doctorService.deleteDoctor(2));

console.log("\n--- TEST 9: Doctors After Deletion ---");
console.log(doctorService.getAllDoctors());
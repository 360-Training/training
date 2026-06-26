console.log("Doctor Schedule System Started");

// ---- DOCTORS DATA ----
const doctors = [
  {
    id: 1,
    name: "Dr. Kumar",
    specialization: "Cardiology",
    hospital: "City Hospital",
    fee: 500,
    availableDays: ["Monday", "Wednesday", "Friday"],
    slots: [
      { time: "09:00", isBooked: false },
      { time: "09:30", isBooked: false },
      { time: "10:00", isBooked: false }
    ]
  },
  {
    id: 2,
    name: "Dr. Sharma",
    specialization: "Dermatology",
    hospital: "City Hospital",
    fee: 400,
    availableDays: ["Tuesday", "Thursday"],
    slots: [
      { time: "10:00", isBooked: false },
      { time: "10:30", isBooked: false }
    ]
  },
  {
    id: 3,
    name: "Dr. Mehta",
    specialization: "General",
    hospital: "City Hospital",
    fee: 300,
    availableDays: ["Monday", "Thursday"],
    slots: [
      { time: "09:00", isBooked: false },
      { time: "09:30", isBooked: false }
    ]
  }
];

// ---- PATIENTS DATA ----
const patients = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Amit" }
];

// ---- APPOINTMENTS ----
let appointments = [];

//---- Function to get available doctors for a specific day ----

function getAvailableDoctors(day) {
  return doctors.filter(doc => doc.availableDays.includes(day));
}

// ---- Function to book an appointment ----

function bookAppointment(patientId, doctorId, date, time) {

  const patient = patients.find(p => p.id === patientId);
  if (!patient) return { error: "Patient not found" };

  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return { error: "Doctor not found" };

  // check if doctor is available that day
  const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

  if (!doctor.availableDays.includes(dayName)) {
    return { error: "Doctor not available on this day" };
  }

  // find slot
  const slot = doctor.slots.find(s => s.time === time);
  if (!slot) return { error: "Slot not found" };

  if (slot.isBooked) return { error: "Slot already booked" };

  // book slot
  slot.isBooked = true;

  const appointment = {
    id: appointments.length + 1,
    patientId,
    patientName: patient.name,
    doctorId,
    doctorName: doctor.name,
    date,
    time,
    status: "scheduled"
  };

  appointments.push(appointment);

  return appointment;
}

console.log(getAvailableDoctors("Monday"));

console.log(bookAppointment(1, 1, "2026-06-26", "09:00"));
console.log(bookAppointment(2, 1, "2026-06-26", "09:00")); // should fail

console.log("Appointments:", appointments);

// ---- Function to cancel an appointment ----

function cancelAppointment(appointmentId) {

  const appointment = appointments.find(a => a.id === appointmentId);

  if (!appointment) {
    return { error: "Appointment not found" };
  }

  appointment.status = "cancelled";

  const doctor = doctors.find(d => d.id === appointment.doctorId);

  if (doctor) {
    const slot = doctor.slots.find(s => s.time === appointment.time);
    if (slot) {
      slot.isBooked = false;
    }
  }

  return appointment;
}

console.log(cancelAppointment(1));
console.log("After cancel:", appointments);

// ---- Function to get Patient Appointments ----

function getPatientAppointments(patientId) {
  return appointments.filter(a => a.patientId === patientId);
}

// ---- Function to get Doctor Appointments ----

function getDoctorAppointments(doctorId) {
  return appointments.filter(a => a.doctorId === doctorId);
}

// ---- Function to get Appointment Summary ----

function getAppointmentSummary() {

  const total = appointments.length;
  const scheduled = appointments.filter(a => a.status === "scheduled").length;
  const cancelled = appointments.filter(a => a.status === "cancelled").length;

  const revenueTotal = appointments
    .filter(a => a.status === "scheduled")
    .reduce((sum, a) => {
      const doctor = doctors.find(d => d.id === a.doctorId);
      return sum + (doctor ? doctor.fee : 0);
    }, 0);

  return {
    total,
    scheduled,
    cancelled,
    revenueTotal
  };
}

bookAppointment(1, 1, "2026-06-26", "10:00");
bookAppointment(2, 1, "2026-06-26", "10:30");
bookAppointment(3, 3, "2026-06-26", "09:00");

console.log(getPatientAppointments(1));
console.log(getDoctorAppointments(1));
console.log(getAppointmentSummary());
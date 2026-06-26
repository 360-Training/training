//Doctor Scheldule
const doctors = [
    {
        id: 1,
        name: "Dr. John",
        specialization: "Cardiology",
        hospital: "City Hospital",
        fee: 500,
        availableDays: ["Monday", "Wednesday", "Friday"],
        slots: [
            { time: "09:00", isBooked: false },
            { time: "10:00", isBooked: false },
            { time: "11:00", isBooked: false },
            { time: "12:00", isBooked: false }
        ]
    },
    {
        id: 2,
        name: "Dr. Mohan",
        specialization: "Dermatology",  
        hospital: "Apollo Hospital",
        fee: 700,
        availableDays: ["Monday", "Tuesday", "Thursday"],
        slots: [
            { time: "09:00", isBooked: false },
            { time: "10:00", isBooked: false },
            { time: "11:00", isBooked: false },
            { time: "12:00", isBooked: false }
        ]
    },
    {
        id: 3,
        name: "Dr.Rekha",
        specialization: "Orthopedics",
        hospital: "care Hospital",
        fee: 600,
        availableDays: ["Wednesday", "Friday", "Saturday"],
        slots: [
            { time: "09:00", isBooked: false },
            { time: "10:00", isBooked: false },
            { time: "11:00", isBooked: false },
            { time: "12:00", isBooked: false }
        ]
    }
];
let bookingId = 1;

function getAvailableDoctors(day) {
    return doctors.filter((({ availableDays }) =>
       availableDays.includes(day))
    );
}

function getAvailableSlots(doctorId, day) {
    const doctor = doctors.find(doc => doc.id === doctorId);
    if (!doctor || !doctor.availableDays.includes(day)) {
        return [];
    }   
return doctor.slots
    .filter(slot => !slot.isBooked)
    .map(slot => ({
        time:slot.time,
        doctor: doctor.name
    }));
}   

function bookSlot(doctorId, time,patientName="Unknown") {
    const doctor = doctors.find(doc => doc.id === doctorId);
    if (!doctor) {
        return { error: "Doctor not found." };
    }
    const slot = doctor?.slots.find(slot => slot.time === time);
    if (!slot || slot.isBooked) {
        return { error: "Slot not available." };
    }
    slot.isBooked = true;

    return {
        bookingId: bookingId++,
        doctor: doctor.name,    
        patient: patientName,
        time,
        fee:doctor.fee
    };
}

function getDoctorEarnings(doctorId) {
    const doctor = doctors.find(doc => doc.id === doctorId);
    if (!doctor) {
        return 0;
    }
    
const bookedSlots = doctor.slots.filter(slot => slot.isBooked).length;
    return bookedSlots * doctor.fee;
}

//Appoinmtment Booking Engine
const patients = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Amit" },
    { id: 3, name: "Ravi" }
];

const appointments = [];

let appointmentId = 1;

function bookAppointment(patientId, doctorId, date, time) {

    const patient = patients.find(p => p.id === patientId);

    if(!patient) {
        return { error: "Patient not found." };
    }

    const doctor = doctors.find(d => d.id === doctorId);
    
    if(!doctor) {
        return { error: "Doctor not found." };
    }

    const slot = doctor.slots.find(s => s.time === time);

    if(!slot || slot.isBooked) {
        return { error: "Slot not available." };
    }

    slot.isBooked = true;

    const appointment = {
        id: appointmentId++,
        patientId,
        doctorId,
        date,
        time,
        status:"scheduled"
    };

    appointments.push(appointment);

    return appointment;
}

function getPatientAppointments(patientId) {
    return appointments
        .filter(a => a.patientId === patientId)
        .map(a => {
            const doctor = doctors.find(d => d.id === a.doctorId);
            return {
                ...a,
                doctorName: doctor?.name ,
                specialization: doctor?.specialization,
            };
        });
}

function getDoctorAppointments(doctorId, date) {
    return appointments.filter(appointment =>
        appointment.doctorId === doctorId &&
        appointment.date === date
    );
}

function cancelAppointment(id) {
    const appointment = appointments.find(a => a.id === id);

    if(!appointment){
        return { error: "Appointment not found" };
    }
   appointment.status = "cancelled";
   
    const doctor = doctors.find(d => d.id === appointment.doctorId);

    const slot = doctor?.slots.find(s => s.time === appointment.time);

    if (slot) {
        slot.isBooked = false;
    }
    return appointment;
}

function getAppointmentSummary() {
    const total= appointments.length;

    const scheduled= appointments.filter(a => a.status === "scheduled").length;

    const cancelled= appointments.filter(a => a.status === "cancelled").length;

    const today="2026-07-01";

    const todayCount= appointments.filter(a => a.date === today).length;

    const revenueTotal = appointments
    .filter(a => a.status === "scheduled")
    .reduce((sum, appointment) => {
        const doctor = doctors.find(d => d.id === appointment.doctorId);
        return sum + doctor.fee;
    }, 0);

        return {
            total,
            scheduled,
            cancelled,
            todayCount,
            revenueTotal
        };
}
console.log(getAvailableDoctors("Monday"));//Available doctors on Monday
console.log(getAvailableSlots(1, "Monday"));//Available Slots
console.log(bookSlot(1, "09:00", "John Doe"));//Book Slot
console.log(bookSlot(1, "09:00", "Amit"));//Book Same Slot Again
console.log(bookSlot(10, "10:00", "Ravi"));//Doctor Not Found
console.log(getAvailableSlots(1, "Sunday"));//Doctor Not Available
console.log(getDoctorEarnings(1));//Doctor Earnings
console.log(getDoctorEarnings(2));//Doctor with no booking
console.log(bookAppointment(1, 2, "2026-07-01", "09:00"));//appointment test
console.log(bookAppointment(2, 2, "2026-07-01", "10:00"));
console.log(bookAppointment(3, 3, "2026-07-01", "09:00"));
console.log(getPatientAppointments(1));//get patient appointments
console.log(getPatientAppointments(2,"2026-07-01"));//get patient appointments
console.log(cancelAppointment(2));//cancel appointment
console.log(getAppointmentSummary());
console.log(bookAppointment(1, 2, "2026-07-01", "09:00"));//already booked
console.log(bookAppointment(10, 2, "2026-07-01", "11:00"));//patient not found
console.log(getAvailableSlots(1, "Sunday"));//Doctor not available
console.log(getDoctorEarnings(3));//Earnings after booking
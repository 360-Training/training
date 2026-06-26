const doctors=[
  {
     id: 1,
     name: "Dr. Kumar",
     specialization: "Cardiology",
     hospital: "City Hospital",
     fee: 500,
     availableDays: ["Monday", "Wednesday", "Friday"],
     slots: [
       { time: "09:00", isBooked: false },
       { time: "09:30", isBooked: true },
       { time: "10:00", isBooked: false },
       { time: "10:30", isBooked: true },
       { time: "11:00", isBooked: false }
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
        { time: "09:00", isBooked: false },
        { time: "09:30", isBooked: false },
        { time: "10:00", isBooked: false },
        { time: "10:30", isBooked: false },
        { time: "11:00", isBooked: false }
      ]
   },
   {
    id: 3,
    name: "Dr. Manu",
    specialization: "Pediatrics",
    hospital: "City Hospital",
    fee: 300,
    availableDays: ["Monday", "Wednesday", "Friday"],
    slots: [
      { time: "09:00", isBooked: false },
      { time: "09:30", isBooked: false },
      { time: "10:00", isBooked: false },
      { time: "10:30", isBooked: false },
      { time: "11:00", isBooked: false }
    ]
   }
]


function getAvailableDoctors(day){
  return doctors.filter(doc => doc.availableDays.includes(day));
}

//with destruction
function getAvailableDoctors(day){
  return doctors.filter(({availableDays}) => availableDays.includes(day));
}


function getAvailableSlots(doctorId, day){
  const doctor = doctors.find(doc => doc.id === doctorId);
  if(!doctor || !doctor.availableDays.includes(day)){
    return [];
  }
  return doctor.slots.filter(slot => !slot.isBooked);
}


function bookSlot(doctorId, time, patientName){
  const doctor = doctors.find(doc => doc.id === doctorId);
  if(!doctor){
    return "Doctor not found";
  }
  const slot = doctor.slots.find(slot => slot.time === time);
  if(!slot){
    return "Slot not found";
  }
  if(slot.isBooked){
    return "Slot already booked";
  }
  slot.isBooked = true;
  slot.patientName = patientName;
  return "Slot booked successfully";
}


function getDoctorEarnings(doctorId){
  const doctor = doctors.find(doc => doc.id === doctorId);
  if(!doctor){
    return 0;
  }
  const bookedSlots = doctor.slots.filter(slot => slot.isBooked);
  return bookedSlots.length * doctor.fee;
  }


console.log("Available Doctors on Monday:");
console.log(getAvailableDoctors("Monday"));

console.log("Available Doctors on Sunday:");
console.log(getAvailableDoctors("Sunday"));
console.log("Available Slots:");
console.log(getAvailableSlots(1, "Monday"));
console.log(getAvailableSlots(1, "Tuesday"));
console.log(bookSlot(1, "09:00", "Rahul"));
console.log(bookSlot(1, "09:00", "Priya"));
console.log(bookSlot(10, "09:00", "Rahul"));
console.log(getDoctorEarnings(1));
console.log(getDoctorEarnings(2));



//APPOINTMENT SCHEDULER

const appointments = [];

function bookAppointment(patientId, doctorId, date, time){
  const patient = patients.find(p => p.id === patientId);
  if(!patient){
    return "Patient not found";
  }
  const doctor = doctors.find(d => d.id === doctorId);
  if(!doctor){
    return "Doctor not found";
  }
  const slot = doctor.slots.find(s => s.time === time);
  if(!slot){
    return "Slot not found";
  }
  if(slot.isBooked){
    return "Slot already booked";
  }
  slot.isBooked = true;
  const appointment = {
    id: appointments.length + 1,
    PatientID:patientId,
    DoctorID: doctorId,
    Date:date,
    Time:time,
    status: "scheduled"
  };
  appointments.push(appointment);
  return appointment;
}


function getPatientAppointments(patientId){
  const patientAppointments = appointments.filter(app => app.PatientID === patientId);
  return patientAppointments.map(appointment => {
    const doctor = doctors.find(d => d.id === appointment.DoctorID);
    return {
      ...appointment,
      DoctorName:doctor.name,
      Specialization:doctor.specialization,
    };
  });
}


function getDoctorAppointments(doctorId, date) {
    const doctorAppointments = appointments.filter(appointment =>
        appointment.doctorId === doctorId &&
        appointment.date === date
    );
    return doctorAppointments;
}


function cancelAppointment(appointmentId) {
    const appointment = appointments.find(
        app => app.id === appointmentId
    );
    if (!appointment) {
        return {
            error: "Appointment not found"
        };
    }
    appointment.status = "cancelled";
    const doctor = doctors.find(
        doc => doc.id === appointment.doctorId
    );
    const slot = doctor.slots.find(
        s => s.time === appointment.time
    );
    if (slot) {
        slot.isBooked = false;
    }
    return {
        message: "Appointment cancelled successfully"
    };
}

function getAppointmentSummary() {

    const total = appointments.length;

    const scheduled = appointments.filter(
        app => app.status === "scheduled"
    ).length;

    const cancelled = appointments.filter(
        app => app.status === "cancelled"
    ).length;

    const today = new Date().toISOString().split("T")[0];

    const todayCount = appointments.filter(
        app => app.date === today
    ).length;

    const revenueTotal = appointments.reduce((total, appointment) => {

        if (appointment.status === "scheduled") {

            const doctor = doctors.find(
                doc => doc.id === appointment.doctorId
            );

            return total + doctor.fee;
        }

        return total;

    }, 0);

    return {

        total,

        scheduled,

        cancelled,

        todayCount,

        revenueTotal

    };

}
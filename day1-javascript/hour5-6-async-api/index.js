console.log("System Started");

// Fake DB
const patients = [
    { id: 1, name: "Rahul", phone: "8889998888" }
];

const doctors = [
    { id: 1, name: "Dr. Kumar", specialization: "Cardiology" }
];

const appointments = [];
let appointmentId = 1;

// simulate API delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
console.log("Patient Sample:", patients[0]);
console.log("Doctor Sample:", doctors[0]);

async function fetchPatient(id) {
    await delay(500);
    const patient = patients.find(p => p.id === id);
    if (!patient) throw new Error("Patient not found");
    return patient;
}

async function fetchDoctor(id) {
    await delay(500);
    const doctor = doctors.find(d => d.id === id);
    if (!doctor) throw new Error("Doctor not found");
    return doctor;
}
(async () => {
    console.log("\n--- TEST 2: Fetch ---");
    console.log(await fetchPatient(1));
    console.log(await fetchDoctor(1));
})();

async function createAppointment(data) {
    await delay(500);

    const appointment = {
        id: appointmentId++,
        ...data,
        status: "scheduled"
    };

    appointments.push(appointment);
    return appointment;
}
(async () => {
    console.log("\n--- TEST 3: Create Appointment ---");

    const result = await createAppointment({
        patientId: 1,
        doctorId: 1,
        patientName: "Rahul",
        doctorName: "Dr. Kumar",
        date: "2026-06-26",
        time: "09:00"
    });

    console.log("Created:", result);
})();

async function fetchAppointments(patientId) {
    await delay(500);
    return appointments.filter(a => a.patientId === patientId);
}
(async () => {
    console.log("\n--- TEST 4: Appointments ---");
    console.log(await fetchAppointments(1));
})();

async function getDashboard(patientId) {

    const patient = await fetchPatient(patientId);
    const allAppointments = await fetchAppointments(patientId);

    const enrichedAppointments = await Promise.all(
        allAppointments.map(async (a) => {
            const doctor = await fetchDoctor(a.doctorId);

            return {
                date: a.date,
                time: a.time,
                status: a.status,
                doctor: {
                    name: doctor.name,
                    specialization: doctor.specialization
                }
            };
        })
    );

    return {
        patient: {
            name: patient.name,
            phone: patient.phone
        },
        appointments: enrichedAppointments,
        stats: {
            total: enrichedAppointments.length,
            upcoming: enrichedAppointments.filter(a => a.status === "scheduled").length,
            completed: 0
        }
    };
}

(async () => {
    console.log("\n--- TEST 5: Dashboard ---");
    const dashboard = await getDashboard(1);
    console.log(JSON.stringify(dashboard, null, 2));
})();
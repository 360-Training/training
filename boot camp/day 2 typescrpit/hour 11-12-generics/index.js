"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function successResponse(data, message = "Success") {
    return {
        success: true,
        data,
        message,
        statusCode: 200,
    };
}
function errorResponse(statusCode, message) {
    return {
        success: false,
        error: "Error",
        message,
        statusCode,
    };
}
function paginatedResponse(data, page, limit, total) {
    return {
        success: true,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}
let patients = [
    {
        id: 1,
        name: "Rahul",
        age: 25,
        gender: "Male",
        bloodGroup: "A+",
        phone: "9876543210",
        createdAt: new Date(),
        isActive: true,
    },
    {
        id: 2,
        name: "priya",
        age: 22,
        gender: "Female",
        bloodGroup: "B+",
        phone: "9876501234",
        createdAt: new Date(),
        isActive: true,
    },
];
const doctors = [
    {
        id: 1,
        name: "Dr.kumar",
        specialization: "cardiology",
    },
];
let appointments = [];
function getPatients(page, limit) {
    const start = (page - 1) * limit;
    const data = patients
        .slice(start, start + limit)
        .map(patient => ({
        id: patient.id,
        name: patient.name,
        bloodGroup: patient.bloodGroup,
        phone: patient.phone
    }));
    return paginatedResponse(data, page, limit, patients.length);
}
function getPatientById(id) {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error("Patient not found");
    }
    return successResponse(patient, "Patient Found");
}
function createPatient(data) {
    const newPatient = {
        id: patients.length + 1,
        createdAt: new Date(),
        isActive: true,
        ...data
    };
    patients.push(newPatient);
    return successResponse(newPatient, "Patient Created");
}
function updatePatient(id, data) {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error("Patient not found");
    }
    Object.assign(patient, data);
    return successResponse(patient, "Patient Updated");
}
function deletePatient(id) {
    patients = patients.filter(p => p.id !== id);
    return successResponse({ deleted: true }, "Patient Deleted");
}
async function bookAppointmentFlow(data) {
    const errors = [];
    if (!data.patientId) {
        errors.push({
            field: "patientId",
            message: "Patient is required"
        });
    }
    if (!data.doctorId) {
        errors.push({
            field: "doctorId",
            message: "Doctor is required"
        });
    }
    if (!data.time) {
        errors.push({
            field: "time",
            message: "Time is required"
        });
    }
    if (errors.length > 0) {
        return {
            type: "validation_error",
            errors
        };
    }
    if (data.time === "09:00") {
        return {
            type: "slot_unavailable",
            doctor: "Dr. Kumar",
            suggestedSlots: [
                "10:00",
                "10:30",
                "11:00"
            ]
        };
    }
    const payment = {
        id: 1,
        amount: 500,
        status: data.time === "12:00"
            ? "failed"
            : "paid"
    };
    const appointment = {
        id: appointments.length + 1,
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        status: "scheduled",
        payment
    };
    appointments.push(appointment);
    if (payment.status === "failed") {
        return {
            type: "payment_failed",
            appointment,
            error: "Payment Failed",
            retryable: true
        };
    }
    return {
        type: "success",
        appointment,
        payment,
        receipt: `Receipt-${appointment.id}`
    };
}
function handleBookingResult(result) {
    switch (result.type) {
        case "success":
            return `Booking confirmed! Appointment #${result.appointment.id} with Dr. Kumar at ${result.appointment.time}`;
        case "slot_unavailable":
            return `Slot taken. Try: ${result.suggestedSlots.join(", ")}`;
        case "payment_failed":
            if (result.retryable) {
                return "Payment failed. Retrying...";
            }
            return "Contact support.";
        case "validation_error":
            return "Fix these: " +
                result.errors
                    .map(error => `${error.field} ${error.message}`)
                    .join(", ");
        default:
            const check = result;
            return check;
    }
}
console.log(getPatients(1, 2));
console.log(getPatientById(1));
const newPatient = createPatient({
    name: "Anjali",
    age: 24,
    gender: "Female",
    bloodGroup: "O+",
    phone: "9999999999"
});
console.log(newPatient);
console.log(updatePatient(1, {
    phone: "8888888888"
}));
console.log("\n----- DELETE PATIENT -----");
console.log(deletePatient(2));
async function testBooking() {
    const success = await bookAppointmentFlow({
        patientId: 1,
        doctorId: 1,
        date: "2026-06-30",
        time: "10:00"
    });
    console.log(handleBookingResult(success));
    const slot = await bookAppointmentFlow({
        patientId: 1,
        doctorId: 1,
        date: "2026-06-30",
        time: "09:00"
    });
    console.log(handleBookingResult(slot));
    const payment = await bookAppointmentFlow({
        patientId: 1,
        doctorId: 1,
        date: "2026-06-30",
        time: "12:00"
    });
    console.log(handleBookingResult(payment));
    const validation = await bookAppointmentFlow({
        patientId: 0,
        doctorId: 0,
        date: "",
        time: ""
    });
    console.log(handleBookingResult(validation));
}
testBooking();
//# sourceMappingURL=index.js.map
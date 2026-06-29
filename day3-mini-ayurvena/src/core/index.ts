import { AppEvents } from "./core/AppEvents";
import { AppointmentService } from "./services/AppointmentService";
const appEvents = new AppEvents();
const appointmentService = new AppointmentService(appEvents);
console.log("System started");
const appt = appointmentService.bookAppointment(1, 101);
console.log("Created:", appt);
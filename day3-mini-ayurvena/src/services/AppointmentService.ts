import { AppEvents } from "../core/AppEvents";
export class AppointmentService {
    private events: AppEvents;
    private appointments: any[] = [];
    private id = 1;
    constructor(events: AppEvents) {
        this.events = events;
    }
    bookAppointment(patientId: number, doctorId: number) {
        const appointment = {
            id: this.id++,
            patientId,
            doctorId,
            status: "BOOKED"
        };
        this.appointments.push(appointment);
        this.events.eventBus.emit("appointment:booked", appointment);
        return appointment;
    }
}
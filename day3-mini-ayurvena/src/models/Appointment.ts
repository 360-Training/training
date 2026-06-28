import { BaseEntity } from "./BaseEntity";
import { IAppointment } from "../types/models";
import { AppointmentStatus } from "../types/enums";
export class Appointment extends BaseEntity implements IAppointment {
    public patientId: number;
    public doctorId: number;
    public appointmentDate: Date;
    public status: AppointmentStatus;
    public tokenNumber: number;
    constructor(
        id: number,
        patientId: number,
        doctorId: number,
        appointmentDate: Date,
        status: AppointmentStatus,
        tokenNumber: number
    ) {
        super(id);
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.tokenNumber = tokenNumber;
    }
    displayDetails(): void {
        console.log("----- Appointment Details -----");
        console.log("Appointment ID:", this.id);
        console.log("Patient ID:", this.patientId);
        console.log("Doctor ID:", this.doctorId);
        console.log("Date:", this.appointmentDate);
        console.log("Status:", this.status);
        console.log("Token Number:", this.tokenNumber);
    }
    updateStatus(status: AppointmentStatus): void {
        this.status = status;
        this.updateTimestamp();
    }
}
import {
    IAppointment,
    IDoctor,
    IPatient
} from "../types/interfaces";

export class DashboardService {
    admin(
        patients:IPatient[],
        doctors: IDoctor[],
        appointments: IAppointment[]
    ): void {
        console.log("Admin Dashboard");
        console.log("Patients:",patients.length);
        console.log("Doctors:",doctors.length);
        console.log("Appointments:",appointments.length);
    }

    doctor(
        doctor: IDoctor,
        appointment: IAppointment[]
    ): void {
        const total =appointment.filter(
            a => a.doctorId === doctor.id
        ).length;
        console.log("Doctor:",doctor.name);
        console.log("Department:",doctor.department);
        console.log("Appointment:",total);
    }
}
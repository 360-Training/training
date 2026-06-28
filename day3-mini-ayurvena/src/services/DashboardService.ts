import { PatientService } from "./PatientService";
import { DoctorService } from "./DoctorService";
import { AppointmentService } from "./AppointmentService";
export class DashboardService {
    constructor(
        private patientService: PatientService,
        private doctorService: DoctorService,
        private appointmentService: AppointmentService
    ) {}
    getAdminDashboard() {
        return {
            totalPatients: this.patientService.getAll().length,
            totalDoctors: this.doctorService.getAll().length,
            totalAppointments: this.appointmentService.getAll().length
        };
    }
    getDoctorDashboard(doctorId: number) {
        const appointments =
            this.appointmentService.getAppointmentsByDoctor(doctorId);
        return {
            doctorId,
            totalAppointments: appointments.length,
            appointments
        };
    }
}
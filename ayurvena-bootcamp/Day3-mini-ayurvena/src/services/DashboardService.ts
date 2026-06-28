import { PatientService } from "./patientService";
import { DoctorService } from "./doctorService";
import { AppointmentService } from "./appointmentService";

export class DashboardService {
    constructor(
        private patientService: PatientService,
        private doctorService: DoctorService,
        private appointmentService: AppointmentService
    ) {}
    showDashboard() {
        console.log("Ayurvena Dashboard");
        console.log(
            "Patients :",
            this.patientService.getAll().length
        );
        console.log(
            "Doctors :",
            this.doctorService.getAll().length
        );
        console.log(
            "Appointments :",
            this.appointmentService.getAll().length
        );
    }
}
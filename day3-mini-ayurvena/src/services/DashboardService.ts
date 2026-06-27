import { PatientService } from "./patientsservice";
import { DoctorService } from "./DoctorService";
import { AppointmentService } from "./AppointmentService";
export class DashboardService {
  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}
  getStats() {return {
      totalPatients: this.patientService.getAll().length,
      totalDoctors: this.doctorService.getAll().length,
      totalAppointments: this.appointmentService.getAll().length
    };
  }
}
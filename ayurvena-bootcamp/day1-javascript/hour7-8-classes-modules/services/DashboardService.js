export class DashboardService {
    static getDashboard(patientService, doctorService, appointmentService) {
        return {
            totalPatients: patientService.patients.length,
            totalDoctors: doctorService.doctors.length,
            totalAppointments: appointmentService.appointments.length,
            revenue: doctorService.doctors.reduce(
                (total, doctor) => total + doctor.getEarnings(),
                0
            )
        };
    }
}
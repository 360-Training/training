export class DashboardService {
  static getDashboard(patients, doctors, appointments) {
    return {
      totalPatients: patients.length,
      totalDoctors: doctors.length,
      totalAppointments: appointments.length
    };
  }
}
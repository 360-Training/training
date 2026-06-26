export class DashboardService {
  constructor(patientService, doctorService, appointmentService) {
    this.patientService = patientService;
    this.doctorService = doctorService;
    this.appointmentService = appointmentService;
  }

  getStats() {
    const today = new Date().toISOString().slice(0, 10);
    const all = this.appointmentService.getAll();

    const revenue = all
      .filter(a => a.status === "completed" && a.payment.paid)
      .reduce((sum, a) => sum + a.payment.amount, 0);

    return {
      totalPatients: this.patientService.getAll().length,
      totalDoctors: this.doctorService.getAll().length,
      todayAppointments: all.filter(a => a.date === today).length,
      revenue
    };
  }

  getStatusBreakdown() {
    const all = this.appointmentService.getAll();
    return {
      scheduled: all.filter(a => a.status === "scheduled").length,
      completed: all.filter(a => a.status === "completed").length,
      cancelled: all.filter(a => a.status === "cancelled").length
    };
  }
}
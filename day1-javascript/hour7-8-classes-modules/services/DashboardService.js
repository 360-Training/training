class DashboardService {
    getDashboard(patients, doctors, appointments) {

        const totalPatients = patients.length;
        const totalDoctors = doctors.length;

        const scheduled = appointments.filter(
            app => app.status === "scheduled"
        ).length;

        const completed = appointments.filter(
            app => app.status === "completed"
        ).length;

        const cancelled = appointments.filter(
            app => app.status === "cancelled"
        ).length;

        const revenue = appointments
            .filter(app => app.status === "completed")
            .reduce((sum, app) => sum + app.payment, 0);

        return {
            totalPatients,
            totalDoctors,
            scheduledAppointments: scheduled,
            completedAppointments: completed,
            cancelledAppointments: cancelled,
            revenue
        };
    }
}

module.exports = DashboardService;


// ----------------------
// TEST
// ----------------------

const dashboard = new DashboardService();

const patients = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
];

const doctors = [
    { id: 1 },
    { id: 2 }
];

const appointments = [
    {
        status: "completed",
        payment: 500
    },
    {
        status: "scheduled",
        payment: 500
    },
    {
        status: "cancelled",
        payment: 500
    },
    {
        status: "completed",
        payment: 700
    }
];

console.log("\n--- DASHBOARD ---");

console.log(
    dashboard.getDashboard(
        patients,
        doctors,
        appointments
    )
);
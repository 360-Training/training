const seedData = require("./data/seed");
const { showDashboard } = require("./services/DashboardService");
const { addPatient } = require("./services/PatientService");
const { bookAppointment } = require("./services/AppointmentService");

seedData();
addPatient("Anil", 40, "Male", "Back Pain");
bookAppointment("Anil", "Dr. Kumar", "10:00 AM");
showDashboard();
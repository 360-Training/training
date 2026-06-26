class DashboardService{
    constructor(patientService, doctorService,appointmentService){
        this.patientService = patientService;
        this.doctorService = doctorService;
        this.appointmentService = appointmentService;
    }
    getstats(){
        return {
            totalPatients : this.patientService.getAllPatients().length,
            totalDoctors : this.doctorService.getAllDoctors().length,
            totalAppointments : this.appointmentService.getAppointmentCount(),
            completedAppointments : this.appointmentService
                .getAllAppointments()
                .filter(appointment => appointment.status === "completed").length,
            cancelledAppointments : this.appointmentService
                 .getAllAppointments()
                 .filter(appointment => appointment.status === "cancelled").length
        };
    }
    getRevenue(){
        let revenue = 0;
        this.appointmentService.getAllAppointments().forEach(appointment => {
            if (appointment.status === "completed"){
                revenue += appointment.payment;
            }
        });
        return revenue;
    }
    getCount(){
        return {
            Patients : this.patientService.getAllPatients().length,
            Doctors : this.doctorService.getAllDoctors().length,
            Appointments : this.appointmentService.getAppointmentCount()
        };
    }
    showDashboard(){
        console.log("\n HOSPITAL DASHBOARD ");
        console.log("\n statistics:");
        console.log(this.getstats());
        console.log("\nRevenue:");
        console.log("₹" + this.getRevenue());
        console.log("\n Counts:");
        console.log(this.getCount());
    }
}

module.exports = DashboardService;

const PatientService = require("./PatientService");
const DoctorService = require("./DoctorService");
const AppointmentService = require("./AppointmentService");

const patientService = new PatientService();
const doctorService = new DoctorService();
const appointmentService = new AppointmentService();

const patient = patientService.registerPatient({
    name: "Priya Sharma",
    age: 32,
    phone: "9876543210",
    bloodGroup: "O+"
});

const doctor =  doctorService.addDoctor({
    name: "Dr. Kumar",
    specialization: "Cardiology",
    fee: 500
});

const appointment = appointmentService.bookAppointment(
    patient,
    doctor,
    "2026-07-01",
    "09:00"
);

if(appointment){
    appointment.complete();
} 

const dashboard = new DashboardService(
    patientService,
    doctorService,
    appointmentService
);

console.log("\n dashboard stats");
console.log(dashboard.getstats());

console.log("\n dashboard revenue");
console.log(dashboard.getRevenue());

console.log("\n dashboard counts");
console.log(dashboard.getCount());

console.log("\n full dashboard");
dashboard.showDashboard();
import { BaseService } from "./BaseService.js";
import type { IPatient, IDoctor, IAppointment, IPayment} from "../types/interfaces.js";
import { AppointmentStatus, PaymentStatus} from "../types/enums.js";

export class DashboardService extends BaseService<IPayment> {
    getDashboard(
        patients : IPatient[],
        doctors : IDoctor[],
        appointments : IAppointment[],
        payments : IPayment[]
    ){
        return {
            totalPatients : patients.length,
            totalDoctors : doctors.length,
            totalAppointments : appointments.length,
            completedAppointments : appointments.filter(
                (appointment) =>
                    appointment.status === AppointmentStatus.COMPLETED
            ).length,
            totalRevenue: payments
                .filter(
                    (payment) =>
                    payment.status === PaymentStatus.PAID
                )
                .reduce(
                    (total, payment) => total + payment.amount,
                    0
                )
        };
    }
}
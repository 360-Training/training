import type {
    IPatient,
    Idoctor,
    IAppontiment,
    IPayment
} from "../types/models.js";

export class DashboardService {

    static getAdminDashboard(

        patients: IPatient[],

        doctors: Idoctor[],

        appointments: IAppontiment[],

        payments: IPayment[]

    ) {

        const revenue =
            payments.reduce(

                (sum, payment) =>
                    sum + payment.amount,

                0

            );

        return {

            totalPatients:
                patients.length,

            totalDoctors:
                doctors.length,

            totalAppointments:
                appointments.length,

            revenue

        };

    }

}
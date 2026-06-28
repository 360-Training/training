import { PaymentStatus } from "../types/enums";
export interface Payment {
    appointmentId: number;
    amount: number;
    status: PaymentStatus;
    paidAt: Date;
}
export class PaymentService {
    private payments: Payment[] = [];
    processPayment(
        appointmentId: number,
        amount: number
    ): Payment {
        const payment: Payment = {
            appointmentId,
            amount,
            status: PaymentStatus.PAID,
            paidAt: new Date()
        };
        this.payments.push(payment);
        return payment;
    }
    getPayment(
        appointmentId: number
    ): Payment | undefined {
        return this.payments.find(
            payment =>
                payment.appointmentId === appointmentId
        );
    }
    refundPayment(
        appointmentId: number
    ): boolean {
        const payment = this.getPayment(
            appointmentId
        );
        if (!payment) {
            return false;
        }
        payment.status = PaymentStatus.REFUNDED;
        return true;
    }
    getAllPayments(): Payment[] {
        return this.payments;
    }
}
import { PaymentStatus } from "../types/enums";
import { PaymentDto } from "../types/dtos";

export class PaymentService {
    private payments: PaymentDto[] = [];
    payBill(payment: PaymentDto) {
        this.payments.push(payment);
        console.log("Payment completed.");
    }
    getPayments() {
        return this.payments;
    }
    checkPayment(id: number) {
        const bill = this.payments.find(item => item.appointmentId === id);
        if (!bill) {
            console.log("Payment pending.");
            return;
        }
        console.log("Amount :", bill.amount);
        console.log("Status :", PaymentStatus.Paid);
    }
}
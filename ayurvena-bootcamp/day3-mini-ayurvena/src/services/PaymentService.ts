import { BaseService } from "./BaseService.js";
import type { IPayment } from "../types/models.js";
import {
    PaymentStatus,
    PaymentMethod
} from "../types/enums.js";

export class PaymentService
    extends BaseService<IPayment> {

    processPayment(
        appointmentId: number,
        amount: number,
        method: PaymentMethod
    ): IPayment {

        return this.create({

            appointmentId,

            amount,

            method,

            status: PaymentStatus.PAID

        });

    }

    refundPayment(
        paymentId: number
    ): boolean {

        const payment =
            this.findById(paymentId);

        if (!payment) {

            return false;

        }

        payment.status =
            PaymentStatus.REFUNDED;

        return true;

    }

}
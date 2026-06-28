import { BaseService } from "./BaseService.js";
import type { IPayment } from "../types/interfaces.js";
import { PaymentStatus } from "../types/enums.js";

export class PaymentService extends BaseService<IPayment> {

    findByStatus(status: PaymentStatus): IPayment[] {
        return this.items.filter(
            payment => payment.status === status
        );
    }

    getTotalRevenue(): number {
        return this.items
            .filter(payment => payment.status === PaymentStatus.PAID)
            .reduce(
                (total, payment) => total + payment.amount,
                0
            );
    }
}
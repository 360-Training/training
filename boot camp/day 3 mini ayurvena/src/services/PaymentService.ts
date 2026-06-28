import { PaymentStatus } from "../types/enums";
import { IPayment } from "../types/interfaces";
import { BaseService } from "./BaseService";

export class PaymentService extends BaseService<IPayment> {
    pay(id: number): boolean {
        const payment= this.getById(id);
    
    if(!payment){
        return false;
    }
    payment.status=PaymentStatus.Paid;
    payment.updatedAt= new Date();
    
    return true;
}

refund(id: number): boolean {
    const payment= this.getById(id);

if(!payment){
    return false;
}

payment.status=PaymentStatus.Refunded;
payment.updatedAt= new Date();

return true;
}
}
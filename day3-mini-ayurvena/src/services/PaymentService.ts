export class PaymentService {
  pay(amount: number) {
    return {
      status: "SUCCESS",
      transactionId: Date.now(),
      amount

    };
  }
}

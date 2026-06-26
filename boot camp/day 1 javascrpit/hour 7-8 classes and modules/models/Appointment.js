let aCount = 1;

export class Appointment {
  constructor(data) {
    this.id = "A" + String(aCount++).padStart(4, "0");
    this.patient = data.patient;
    this.doctor = data.doctor;
    this.date = data.date;
    this.time = data.time;
    this.status = "scheduled";
    this.payment = { amount: data.doctor.fee, paid: false };
  }

  cancel() {
    if (this.status == "completed") throw new Error("can't cancel a completed appointment");
    this.status = "cancelled";
    this.doctor.freeSlot(this.date, this.time);
  }

  complete() {
    if (this.status == "cancelled") throw new Error("can't complete a cancelled appointment");
    this.status = "completed";
    this.payment.paid = true;
  }

  // not super clean but works for now
  generateReceipt() {
    let r = "Receipt: " + this.id + "\n";
    r += "Patient: " + this.patient.name + " (" + this.patient.id + ")\n";
    r += "Doctor: " + this.doctor.name + " - " + this.doctor.specialization + "\n";
    r += "When: " + this.date + " " + this.time + "\n";
    r += "Status: " + this.status + "\n";
    r += "Fee: Rs." + this.payment.amount + " | Paid: " + (this.payment.paid ? "yes" : "no");
    return r;
  }
}
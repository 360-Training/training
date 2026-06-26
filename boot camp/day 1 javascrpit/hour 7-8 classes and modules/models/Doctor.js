let dCount = 1;

export class Doctor {
  constructor(data) {
    this.id = "D" + String(dCount++).padStart(4, "0");
    this.name = data.name;
    this.specialization = data.specialization;
    this.fee = data.fee;
    this.schedule = data.schedule || {};
    this.bookedSlots = 0;
  }

  isAvailable(day, time) {
    if (!this.schedule[day]) return true;
    if (!this.schedule[day][time]) return true;
    return this.schedule[day][time] === "free";
  }

  bookSlot(day, time) {
    if (!this.schedule[day]) this.schedule[day] = {};
    if (this.schedule[day][time] === "booked") return false;
    this.schedule[day][time] = "booked";
    this.bookedSlots++;
    return true;
  }

  freeSlot(day, time) {
    if (this.schedule[day] && this.schedule[day][time] === "booked") {
      this.schedule[day][time] = "free";
      this.bookedSlots--;
    }
  }

  getEarnings() {
    return this.bookedSlots * this.fee;
  }
}
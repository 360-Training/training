export class Doctor {
    constructor(id, name, specialization, fee) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.fee = fee;
        this.schedule = {
            Monday: [
                { time: "09:00", isBooked: false },
                { time: "09:30", isBooked: false },
                { time: "10:00", isBooked: false }
            ],
            Wednesday: [
                { time: "09:00", isBooked: false },
                { time: "09:30", isBooked: false },
                { time: "10:00", isBooked: false }
            ],
            Friday: [
                { time: "09:00", isBooked: false },
                { time: "09:30", isBooked: false },
                { time: "10:00", isBooked: false }
            ]
        };
    }
isAvailable(day, time) {
  const daySlots = this.schedule[day];
  const slot = daySlots.find(
      s => s.time === time
  );
  return slot && !slot.isBooked;
}
bookSlot(day, time) {
    const daySlots = this.schedule[day];
    const slot = daySlots.find(
        s => s.time === time
    );
    if (slot && !slot.isBooked) {
        slot.isBooked = true;
        return true;
    }
    return false;
}
getEarnings() {
    let bookedSlots = 0;
    for (const day in this.schedule) {
        for (const slot of this.schedule[day]) {
            if (slot.isBooked) {
                bookedSlots++;
            }
        }
    }
    return bookedSlots * this.fee;
}
}
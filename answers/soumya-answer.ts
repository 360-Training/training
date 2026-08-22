interface DoctorUnavailable {
  type: "doctor_unavailable";
  doctorId: number;
  reason: string;
}

interface SlotUnavailable {
  type: "slot_unavailable";
  time: string;
  suggestedSlots: string[];
}

interface PaymentFailed {
  type: "payment_failed";
  appointmentId: number;
  reason: string;
  isRetryable: boolean;
}

interface InvalidTime {
  type: "invalid_time";
  time: string;
  reason: string;
}

interface BookingConfirmed {
  type: "confirmed";
  appointmentId: number;
  doctor: string;
  time: string;
  fee: number;
  transactionId: string;
}

type BookingResult = DoctorUnavailable | SlotUnavailable | PaymentFailed | InvalidTime | BookingConfirmed;

const doctors = [
  { id: 1, name: "Dr. Sharma", specialization: "Cardiologist", fee: 500, isAvailable: true },
  { id: 2, name: "Dr. Gupta", specialization: "Pediatrician", fee: 400, isAvailable: true },
];

const slots = [
  { time: "09:00", isBooked: false, patientId: null },
  { time: "10:00", isBooked: false, patientId: null },
  { time: "11:00", isBooked: false, patientId: null },
  { time: "14:00", isBooked: false, patientId: null },
  { time: "15:00", isBooked: false, patientId: null },
];

function checkDoctorAvailability(doctorId: number): Promise<boolean> {
  return new Promise(resolve => setTimeout(() => resolve(Math.random() > 0.2), 300));
}

function checkSlotAvailability(time: string): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      const slot = slots.find(s => s.time === time);
      resolve(slot ? !slot.isBooked : true);
    }, 200);
  });
}

function processPayment(amount: number): Promise<{ success: boolean; transactionId: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const success = Math.random() < 0.7;
      resolve({ success, transactionId: success ? "TXN-" + Date.now() : "" });
    }, 400);
  });
}

function bookSlot(doctorId: number, time: string): Promise<{ appointmentId: number }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const slot = slots.find(s => s.time === time);
      if (slot) slot.isBooked = true;
      resolve({ appointmentId: Date.now() });
    }, 300);
  });
}

async function bookAppointmentPipeline(doctorId: number, time: string, patientId: number): Promise<BookingResult> {
  const hour = parseInt(time.split(":")[0]);
  if (hour < 9 || hour >= 17) {
    return { type: "invalid_time", time, reason: "Time must be between 09:00 and 17:00" };
  }

  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) {
    return { type: "doctor_unavailable", doctorId, reason: "Doctor not found" };
  }
  const doctorAvailable = await checkDoctorAvailability(doctorId);
  if (!doctorAvailable) {
    return { type: "doctor_unavailable", doctorId, reason: "Doctor is currently unavailable" };
  }

  const slotAvailable = await checkSlotAvailability(time);
  if (!slotAvailable) {
    const freeSlots = slots.filter(s => !s.isBooked).map(s => s.time);
    return { type: "slot_unavailable", time, suggestedSlots: freeSlots };
  }

  const { appointmentId } = await bookSlot(doctorId, time);

  const payment = await processPayment(doctor.fee);
  if (!payment.success) {
    const retryPayment = await processPayment(doctor.fee);
    if (!retryPayment.success) {
      const slot = slots.find(s => s.time === time);
      if (slot) slot.isBooked = false;
      return { type: "payment_failed", appointmentId, reason: "Payment declined after retry", isRetryable: false };
    }
    return { type: "confirmed", appointmentId, doctor: doctor.name, time, fee: doctor.fee, transactionId: retryPayment.transactionId };
  }

  return { type: "confirmed", appointmentId, doctor: doctor.name, time, fee: doctor.fee, transactionId: payment.transactionId };
}

function formatBookingResult(result: BookingResult): string {
  switch (result.type) {
    case "confirmed":
      return `Confirmed! Appointment #${result.appointmentId} with ${result.doctor} at ${result.time}. Fee: Rs.${result.fee} (Txn: ${result.transactionId})`;
    case "slot_unavailable":
      return `Slot ${result.time} unavailable. Available: ${result.suggestedSlots.join(", ")}`;
    case "doctor_unavailable":
      return `Doctor #${result.doctorId} unavailable: ${result.reason}`;
    case "invalid_time":
      return `Invalid time ${result.time}: ${result.reason}`;
    case "payment_failed":
      return `Payment failed for Appointment #${result.appointmentId}: ${result.reason}`;
  }
}

// Tests
bookAppointmentPipeline(1, "10:00", 101).then(r => console.log(formatBookingResult(r)));
bookAppointmentPipeline(1, "18:00", 102).then(r => console.log(formatBookingResult(r)));
bookAppointmentPipeline(99, "10:00", 103).then(r => console.log(formatBookingResult(r)));

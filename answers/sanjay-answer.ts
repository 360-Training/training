interface ISlot {
  time: string;
  isBooked: boolean;
  patientName: string | null;
}

interface IDoctor {
  id: number;
  name: string;
  specialization: string;
  fee: number;
  availableDays: string[];
  slots: ISlot[];
  weekSchedule?: Record<string, ISlot[]>;
}

interface IWaitlistEntry {
  doctorId: number;
  day: string;
  time: string;
  patientName: string;
  addedAt: number;
}

const doctors: IDoctor[] = [
  { id: 1, name: "Dr. Sharma", specialization: "Cardiologist", fee: 500, availableDays: ["Monday", "Wednesday", "Friday"], slots: [] },
  { id: 2, name: "Dr. Verma", specialization: "Cardiologist", fee: 600, availableDays: ["Tuesday", "Thursday", "Saturday"], slots: [] },
  { id: 3, name: "Dr. Gupta", specialization: "Pediatrician", fee: 400, availableDays: ["Monday", "Tuesday", "Thursday"], slots: [] },
];

function getDoctorsByDay(doctors: IDoctor[], day: string): string[] {
  return doctors.filter(d => d.availableDays.includes(day)).map(d => d.name);
}

function generateWeekSlots(doctors: IDoctor[]): IDoctor[] {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00"];
  return doctors.map(d => ({
    ...d,
    weekSchedule: Object.fromEntries(days.map(day => [
      day,
      d.availableDays.includes(day)
        ? times.map(t => ({ time: t, isBooked: false, patientName: null }))
        : []
    ]))
  }));
}

function getPatientAllAppointments(doctors: IDoctor[], name: string) {
  const all: { doctorId: number; day: string; time: string }[] = [];
  doctors.forEach(d =>
    Object.entries(d.weekSchedule ?? {}).forEach(([day, slots]) =>
      slots.forEach(s => { if (s.patientName === name) all.push({ doctorId: d.id, day, time: s.time }); })
    )
  );
  return all;
}

function bookSlot(doctors: IDoctor[], doctorId: number, day: string, time: string, patientName = "Unknown"): string {
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return "Error: Doctor not found";
  const daySlots = doctor.weekSchedule?.[day];
  if (!daySlots?.length) return `Error: Doctor not available on ${day}`;

  for (const d of doctors)
    if (getPatientAllAppointments([d], patientName).some(a => a.day === day && a.time === time))
      return `Error: Patient ${patientName} already has an appointment at ${time} on ${day}`;

  const slot = daySlots.find(s => s.time === time);
  if (!slot) return "Error: Invalid time slot";
  if (slot.isBooked) return `Error: Slot ${time} on ${day} is already booked`;

  slot.isBooked = true;
  slot.patientName = patientName;
  return `${doctor.name}: Slot ${time} on ${day} booked for ${patientName}`;
}

function rescheduleAppointment(doctors: IDoctor[], doctorId: number, oldDay: string, oldTime: string, newDay: string, newTime: string, patientName: string): string {
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return "Error: Doctor not found";
  const newDaySlots = doctor.weekSchedule?.[newDay];
  if (!newDaySlots?.length) return `Error: Doctor not available on ${newDay}`;
  const newSlot = newDaySlots.find(s => s.time === newTime);
  if (!newSlot) return "Error: Invalid new time slot";
  if (newSlot.isBooked) return `Error: New slot ${newTime} on ${newDay} is already booked`;

  const oldSlot = doctor.weekSchedule?.[oldDay]?.find(s => s.time === oldTime);
  if (!oldSlot?.isBooked) return "Error: Original appointment not found";
  if (oldSlot.patientName !== patientName) return "Error: Appointment belongs to a different patient";

  oldSlot.isBooked = false; oldSlot.patientName = null;
  newSlot.isBooked = true; newSlot.patientName = patientName;
  return `Rescheduled: ${doctor.name} ${oldDay} ${oldTime} \u2192 ${newDay} ${newTime} for ${patientName}`;
}

function addToWaitlist(waitlist: IWaitlistEntry[], doctorId: number, day: string, time: string, patientName: string): { position: number } {
  waitlist.push({ doctorId, day, time, patientName, addedAt: Date.now() });
  return { position: waitlist.filter(w => w.doctorId === doctorId && w.day === day && w.time === time).length };
}

function processWaitlist(waitlist: IWaitlistEntry[], doctors: IDoctor[], doctorId: number, day: string, time: string): string {
  const idx = waitlist.findIndex(w => w.doctorId === doctorId && w.day === day && w.time === time);
  if (idx === -1) return "No one waiting";
  const next = waitlist.splice(idx, 1)[0];
  const slot = doctors.find(d => d.id === doctorId)?.weekSchedule?.[day]?.find(s => s.time === time);
  if (slot) { slot.isBooked = true; slot.patientName = next.patientName; }
  return `Auto-booked ${next.patientName} from waitlist`;
}

// Tests
const scheduled = generateWeekSlots(doctors);
const waitlist: IWaitlistEntry[] = [];
console.log(bookSlot(scheduled, 1, "Monday", "09:00", "Rahul"));
console.log(bookSlot(scheduled, 1, "Monday", "09:00", "Priya"));
console.log(bookSlot(scheduled, 2, "Tuesday", "10:00", "Rahul"));
console.log(rescheduleAppointment(scheduled, 1, "Monday", "09:00", "Wednesday", "09:00", "Rahul"));
console.log(addToWaitlist(waitlist, 1, "Monday", "09:00", "Sneha"));
console.log(processWaitlist(waitlist, scheduled, 1, "Monday", "09:00"));

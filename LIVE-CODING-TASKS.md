# 🎯 Live Coding Assessment — JS/TS Bootcamp

> **For the Manager:** 6 medium-level tasks (1 per team member).
> Give each person **15–20 minutes** to code live in front of you.
> They start from a **blank file** — no starter code, no test harness.
> **All tasks are TypeScript-first.** If someone can't finish in TS, they can fallback to JS.
> No internet. No AI. Just them, VS Code, and their knowledge.

---

## Random Assignment

Cut these slips and pick randomly:

| Person | Task # | Topic |
|--------|--------|-------|
| Abhinaya Reddy | **Task 1** | Patient Registry — Array Methods |
| Sanjay Kumar | **Task 2** | Doctor Appointment Scheduler |
| Srinitha Mulagundla | **Task 3** | Async Hospital API + Error Handling |
| Sangepu Manaswini | **Task 4** | TypeScript Patient System |
| Mekala Harshitha | **Task 5** | Generic Service Layer |
| Soumya | **Task 6** | Complete Booking Flow |

---

## Task 1 — Patient Registry

**For:** Abhinaya Reddy
**Language:** TypeScript (`task1.ts`). Fallback to JavaScript (`task1.js`) if stuck.
**Duration:** 15 minutes

### Task

Create a patient registry system.

1. First, define an **interface** `IPatient` with fields: `id` (number), `name` (string), `age` (number), `phone` (string), `bloodGroup` (string), `isActive` (boolean).

2. Create an array of 5 patients using that interface.

3. Write these typed functions:

   - `getActivePatientNames(patients: IPatient[]): string` — returns a comma-separated string of active patient names only. Use `filter`, `map`, `join`.

   - `findByPhone(patients: IPatient[], phone: string): IPatient | string` — searches by phone. Returns the patient object or `"Patient not found"`. Use `find`.

   - `getAverageAge(patients: IPatient[]): number` — returns the average age of **active** patients only. Use `filter` + `reduce`.

   - `groupByBloodGroup(patients: IPatient[]): Record<string, string[]>` — returns an object where keys are blood groups and values are arrays of patient names. Use `reduce`.

   - `searchAndSort(patients: IPatient[], query: string): IPatient[]` — case-insensitive partial name search, results sorted by age youngest first. Use `filter` + `sort`.

4. **Test your code** — call each function and `console.log` the results to verify.

5. **Fallback:** If TypeScript is causing too much trouble, drop the interface and types and write in plain JS.

---

## Task 2 — Doctor Appointment Scheduler *(Harder)*

**For:** Sanjay Kumar
**Language:** TypeScript (`task2.ts`). Fallback to JavaScript (`task2.js`) if stuck.
**Duration:** 15 minutes

### Task

Build a full doctor appointment system with conflict detection, waitlist, and rescheduling.

1. Define interfaces:
   - `IDoctor` — `id`, `name`, `specialization`, `fee`, `availableDays`, `slots`, `weekSchedule?`
   - `ISlot` — `time`, `isBooked`, `patientName`
   - `IWaitlistEntry` — `doctorId`, `day`, `time`, `patientName`, `addedAt`

2. Create **3 doctors** as `IDoctor[]`. Include at least **2 cardiologists** and **1 pediatrician**, with different schedules.

3. Write these functions:

   - `getDoctorsByDay(doctors: IDoctor[], day: string): string[]`

   - `generateWeekSlots(doctors: IDoctor[]): IDoctor[]` — generates a **full week of slots** (Mon–Sat) based on `availableDays`. Each day gets base slots (09:00, 09:30, 10:00, 10:30, 11:00). Adds `weekSchedule` to each doctor.

   - `bookSlot(doctors: IDoctor[], doctorId: number, day: string, time: string, patientName?: string): string` — checks for **cross-doctor conflicts** (same patient can't be booked at same day/time with any doctor). Use default `"Unknown"` for `patientName`.

   - `rescheduleAppointment(doctors: IDoctor[], doctorId: number, oldDay: string, oldTime: string, newDay: string, newTime: string, patientName: string): string` — **atomic**: only free old slot after confirming new one.

   - `addToWaitlist(waitlist: IWaitlistEntry[], doctorId: number, day: string, time: string, patientName: string): { position: number }`

   - `processWaitlist(waitlist: IWaitlistEntry[], doctors: IDoctor[], doctorId: number, day: string, time: string): string`

4. **Test thoroughly:** Generate week schedules, double-book detection, reschedule, waitlist processing, edge cases.

5. **Fallback:** If stuck on types, drop interfaces and write in plain JS.

---

## Task 3 — Async Hospital API + Error Handling

**For:** Srinitha Mulagundla
**Language:** TypeScript (`task3.ts`). Fallback to JavaScript (`task3.js`) if stuck.
**Duration:** 15 minutes

### Task

Build an async API layer with proper error handling.

1. Create interfaces:
   - `IPatient` — `id`, `name`, `age`
   - `IAppointment` — `id`, `patientId`, `doctorId`, `date`, `status`

2. Create sample typed data:
   - `patients: IPatient[]` with 2 patients
   - `appointments: IAppointment[]` with 2 appointments

3. Create **custom error classes**:
   - `NotFoundError extends Error` — sets `this.statusCode = 404`
   - `ValidationError extends Error` — sets `this.statusCode = 400`

4. Write async **API simulation functions** using Promises + `setTimeout` (500ms delay):
   - `fetchPatient(id: number): Promise<IPatient>` — resolves with patient if found, rejects with `NotFoundError` if not
   - `fetchAppointments(patientId: number): Promise<IAppointment[]>` — resolves with filtered appointments, rejects with `NotFoundError` if none

5. Write `getPatientDashboard(patientId: number): Promise<{ patient: IPatient; appointments: IAppointment[]; stats: { total: number; completed: number } }>` using **async/await**

6. Write `getMultiPatientDashboard(patientIds: number[]): Promise<{ patient: IPatient; appointments: IAppointment[]; stats: ... }[]>` using **Promise.allSettled** — handles partial failures gracefully

7. **Test** — fetch a valid dashboard, try fetching a non-existent patient (should catch error), fetch multiple.

8. **Fallback:** If stuck on types, drop interfaces and write in plain JS.

---

## Task 4 — TypeScript Patient System

**For:** Sangepu Manaswini
**Language:** TypeScript (`task4.ts`). Fallback to JavaScript if stuck.
**Duration:** 15 minutes

### Task

Build a fully typed patient and appointment system in `task4.ts`.

1. Define:
   - `BloodGroup` type — union of 8 blood groups (`"A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-"`)
   - `Gender` type — `"male" | "female" | "other"`
   - `AppointmentStatus` enum — `SCHEDULED = "scheduled"`, `COMPLETED = "completed"`, `CANCELLED = "cancelled"`

2. Define interfaces:
   - `IPatient` — `id`, `name`, `age`, `phone`, `bloodGroup` (typed), `gender` (typed), `isActive`
   - `IAppointment` — `id`, `patientId`, `doctorId`, `date`, `status` (typed)

3. Create utility types:
   - `CreatePatientDto` — use `Omit` to exclude `id` and `isActive`
   - `PatientPreview` — use `Pick` to get only `id`, `name`, `bloodGroup`

4. Write typed functions:
   - `getPatientName(patients: IPatient[], id: number): string` — returns name or `"Unknown"`
   - `filterByStatus(appointments: IAppointment[], status: AppointmentStatus): IAppointment[]`

5. **Test** — create typed patient and appointment data, call both functions, verify TypeScript catches type errors.

---

## Task 5 — Generic Service Layer

**For:** Mekala Harshitha
**Language:** TypeScript (`task5.ts`). Fallback to JavaScript if stuck.
**Duration:** 15 minutes

### Task

Build a reusable generic service layer in `task5.ts`.

1. Define `IBaseEntity` interface: `id` (number), `createdAt` (Date), `updatedAt` (Date)

2. Build a **generic** `BaseService<T extends IBaseEntity>` class:
   - `protected items: T[]` — internal storage
   - `create(data: Omit<T, keyof IBaseEntity>): T` — adds item with auto-generated id, createdAt, updatedAt
   - `findById(id: number): T | undefined`
   - `findAll(): T[]`
   - `update(id: number, data: Partial<T>): T | undefined`
   - `delete(id: number): boolean`

3. Define `IPatient` extending `IBaseEntity`: `name`, `age`, `phone`, `bloodGroup`, `isActive`

4. Create `PatientService extends BaseService<IPatient>` with a custom method:
   - `findByPhone(phone: string): IPatient | undefined`

5. **Test** — create 3 patients, find by id, update a patient's age, delete one, find by phone, verify the count.

---

## Task 6 — Complete Booking Flow (Discriminated Unions) *(Harder)*

**For:** Soumya
**Language:** TypeScript (`task6.ts`). Fallback to JavaScript if stuck.
**Duration:** 15 minutes

### Task

Build an **async** booking pipeline using discriminated unions, with validation, payment simulation, and retry logic in `task6.ts`.

1. Create sample data:
   - `doctors` array with 2 doctors: `{ id, name, specialization, fee, isAvailable: boolean }`
   - `slots` array with 5 time slots: `{ time, isBooked, patientId: number | null }`

2. Define **discriminated union types** for the booking pipeline:
   - `DoctorUnavailable` — `type: "doctor_unavailable"`, `doctorId`, `reason`
   - `SlotUnavailable` — `type: "slot_unavailable"`, `time`, `suggestedSlots: string[]`
   - `PaymentFailed` — `type: "payment_failed"`, `appointmentId`, `reason`, `isRetryable: boolean`
   - `InvalidTime` — `type: "invalid_time"`, `time`, `reason` (e.g. "Time must be between 09:00 and 17:00")
   - `BookingConfirmed` — `type: "confirmed"`, `appointmentId`, `doctor`, `time`, `fee`, `transactionId`
   
   `BookingResult` — union of all five

3. All API functions must be **async** (simulate with `setTimeout` wrapped in Promise):
   - `checkDoctorAvailability(doctorId: number): Promise<boolean>` — 300ms delay, 80% chance available
   - `checkSlotAvailability(time: string): Promise<boolean>` — 200ms delay
   - `processPayment(amount: number): Promise<{ success: boolean; transactionId: string }>` — 400ms delay, 70% success
   - `bookSlot(doctorId: number, time: string): Promise<{ appointmentId: number }>` — 300ms delay

4. Write `async function bookAppointmentPipeline(doctorId: number, time: string, patientId: number): Promise<BookingResult>`:
   - **Step 1:** Validate time is between 09:00–17:00 → return `InvalidTime` if not
   - **Step 2:** Check doctor is available → return `DoctorUnavailable` if not
   - **Step 3:** Check slot availability → return `SlotUnavailable` with alternatives if not
   - **Step 4:** Book the slot
   - **Step 5:** Process payment. If it fails and `isRetryable`, **retry once**. If it fails again → cancel the booking and return `PaymentFailed` with `isRetryable: false`
   - **Step 6:** Return `BookingConfirmed`

5. Write `function formatBookingResult(result: BookingResult): string` with **exhaustive type narrowing** (switch on `result.type`). Each case returns a different formatted message. TypeScript should error if you forget a case.

6. **Test:**
   - Book a valid slot → should confirm
   - Try booking at 18:00 → should get InvalidTime
   - Try booking with an unavailable doctor → DoctorUnavailable
   - Test payment failure scenario (may need multiple runs due to randomness)

---

# 🟢 ANSWER KEY (For Manager Only)

<details>
<summary>Click to expand answers</summary>

## Task 1 — Answer

### TypeScript (preferred)

```typescript
interface IPatient {
  id: number;
  name: string;
  age: number;
  phone: string;
  bloodGroup: string;
  isActive: boolean;
}

function getActivePatientNames(patients: IPatient[]): string {
  return patients
    .filter(p => p.isActive)
    .map(p => p.name)
    .join(", ");
}

function findByPhone(patients: IPatient[], phone: string): IPatient | string {
  const patient = patients.find(p => p.phone === phone);
  return patient || "Patient not found";
}

function getAverageAge(patients: IPatient[]): number {
  const active = patients.filter(p => p.isActive);
  const total = active.reduce((sum, p) => sum + p.age, 0);
  return active.length > 0 ? total / active.length : 0;
}

function groupByBloodGroup(patients: IPatient[]): Record<string, string[]> {
  return patients.reduce<Record<string, string[]>>((groups, p) => {
    const key = p.bloodGroup;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p.name);
    return groups;
  }, {});
}

function searchAndSort(patients: IPatient[], query: string): IPatient[] {
  return patients
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.age - b.age);
}
```

### JavaScript (fallback)

```javascript
function getActivePatientNames(patients) {
  return patients.filter(p => p.isActive).map(p => p.name).join(", ");
}
function findByPhone(patients, phone) {
  const p = patients.find(p => p.phone === phone);
  return p || "Patient not found";
}
function getAverageAge(patients) {
  const active = patients.filter(p => p.isActive);
  return active.length ? active.reduce((s, p) => s + p.age, 0) / active.length : 0;
}
function groupByBloodGroup(patients) {
  return patients.reduce((g, p) => { (g[p.bloodGroup] ??= []).push(p.name); return g; }, {});
}
function searchAndSort(patients, query) {
  return patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a.age - b.age);
}
```

## Task 2 — Answer *(Harder)*

### TypeScript (preferred)

```typescript
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

function getDoctorsByDay(doctors: IDoctor[], day: string): string[] {
  return doctors.filter(d => d.availableDays.includes(day)).map(d => d.name);
}

function generateWeekSlots(doctors: IDoctor[]): IDoctor[] {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const times = ["09:00","09:30","10:00","10:30","11:00"];
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
  return `Rescheduled: ${doctor.name} ${oldDay} ${oldTime} → ${newDay} ${newTime} for ${patientName}`;
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
```

### JavaScript (fallback)

```javascript
function getDoctorsByDay(doctors, day) {
  return doctors.filter(d => d.availableDays.includes(day)).map(d => d.name);
}
function generateWeekSlots(doctors) {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const times = ["09:00","09:30","10:00","10:30","11:00"];
  return doctors.map(d => ({ ...d, weekSchedule: Object.fromEntries(days.map(day => [day, d.availableDays.includes(day) ? times.map(t => ({ time: t, isBooked: false, patientName: null })) : []])) }));
}
function getPatientAllAppointments(doctors, name) {
  const all = [];
  doctors.forEach(d => Object.entries(d.weekSchedule || {}).forEach(([day, slots]) => slots.forEach(s => { if (s.patientName === name) all.push({ doctorId: d.id, day, time: s.time }); })));
  return all;
}
function bookSlot(doctors, doctorId, day, time, patientName = "Unknown") {
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return "Error: Doctor not found";
  const daySlots = doctor.weekSchedule?.[day];
  if (!daySlots?.length) return `Error: Doctor not available on ${day}`;
  for (const d of doctors) if (getPatientAllAppointments([d], patientName).some(a => a.day === day && a.time === time)) return `Error: Patient ${patientName} already has an appointment`;
  const slot = daySlots.find(s => s.time === time);
  if (!slot) return "Error: Invalid time slot";
  if (slot.isBooked) return `Error: Slot ${time} on ${day} is already booked`;
  slot.isBooked = true; slot.patientName = patientName;
  return `${doctor.name}: Slot ${time} on ${day} booked for ${patientName}`;
}
function rescheduleAppointment(doctors, doctorId, oldDay, oldTime, newDay, newTime, patientName) {
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return "Error: Doctor not found";
  const newSlot = doctor.weekSchedule?.[newDay]?.find(s => s.time === newTime);
  if (!newSlot) return "Error: Invalid new slot";
  if (newSlot.isBooked) return "Error: New slot already booked";
  const oldSlot = doctor.weekSchedule?.[oldDay]?.find(s => s.time === oldTime);
  if (!oldSlot?.isBooked || oldSlot.patientName !== patientName) return "Error: Original appointment not found";
  oldSlot.isBooked = false; oldSlot.patientName = null;
  newSlot.isBooked = true; newSlot.patientName = patientName;
  return `Rescheduled: ${doctor.name} ${oldDay} ${oldTime} → ${newDay} ${newTime}`;
}
function addToWaitlist(waitlist, doctorId, day, time, patientName) {
  waitlist.push({ doctorId, day, time, patientName, addedAt: Date.now() });
  return { position: waitlist.filter(w => w.doctorId === doctorId && w.day === day && w.time === time).length };
}
function processWaitlist(waitlist, doctors, doctorId, day, time) {
  const idx = waitlist.findIndex(w => w.doctorId === doctorId && w.day === day && w.time === time);
  if (idx === -1) return "No one waiting";
  const next = waitlist.splice(idx, 1)[0];
  const slot = doctors.find(d => d.id === doctorId)?.weekSchedule?.[day]?.find(s => s.time === time);
  if (slot) { slot.isBooked = true; slot.patientName = next.patientName; }
  return `Auto-booked ${next.patientName} from waitlist`;
}
```

## Task 3 — Answer

### TypeScript (preferred)

```typescript
interface IPatient {
  id: number;
  name: string;
  age: number;
}

interface IAppointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  status: string;
}

class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

// Sample data
const patients: IPatient[] = [
  { id: 1, name: "Rahul", age: 32 },
  { id: 2, name: "Priya", age: 28 }
];

const appointments: IAppointment[] = [
  { id: 1, patientId: 1, doctorId: 1, date: "2026-07-01", status: "scheduled" },
  { id: 2, patientId: 2, doctorId: 1, date: "2026-07-02", status: "completed" }
];

function fetchPatient(id: number): Promise<IPatient> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const patient = patients.find(p => p.id === id);
      if (patient) resolve(patient);
      else reject(new NotFoundError(`Patient with id ${id} not found`));
    }, 500);
  });
}

function fetchAppointments(patientId: number): Promise<IAppointment[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = appointments.filter(a => a.patientId === patientId);
      if (result.length) resolve(result);
      else reject(new NotFoundError(`No appointments for patient ${patientId}`));
    }, 500);
  });
}

async function getPatientDashboard(patientId: number): Promise<{
  patient: IPatient;
  appointments: IAppointment[];
  stats: { total: number; completed: number };
}> {
  const [patient, patientApps] = await Promise.all([
    fetchPatient(patientId),
    fetchAppointments(patientId)
  ]);
  return {
    patient,
    appointments: patientApps,
    stats: {
      total: patientApps.length,
      completed: patientApps.filter(a => a.status === "completed").length
    }
  };
}

async function getMultiPatientDashboard(patientIds: number[]): Promise<{ patient: IPatient; appointments: IAppointment[]; stats: { total: number; completed: number } }[]> {
  const results = await Promise.allSettled(
    patientIds.map(id => getPatientDashboard(id))
  );
  return results.filter(r => r.status === "fulfilled").map(r => (r as PromiseFulfilledResult<any>).value);
}
```

### JavaScript (fallback)

```javascript
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}
class ValidationError extends Error {
  constructor(message) { super(message); this.name = "ValidationError"; this.statusCode = 400; }
}
function fetchPatient(id) {
  return new Promise((res, rej) => setTimeout(() => { const p = patients.find(p => p.id === id); p ? res(p) : rej(new NotFoundError(`Patient ${id} not found`)); }, 500));
}
function fetchAppointments(patientId) {
  return new Promise((res, rej) => setTimeout(() => { const a = appointments.filter(a => a.patientId === patientId); a.length ? res(a) : rej(new NotFoundError(`No appointments for ${patientId}`)); }, 500));
}
async function getPatientDashboard(patientId) {
  const [patient, apps] = await Promise.all([fetchPatient(patientId), fetchAppointments(patientId)]);
  return { patient, appointments: apps, stats: { total: apps.length, completed: apps.filter(a => a.status === "completed").length } };
}
async function getMultiPatientDashboard(ids) {
  const r = await Promise.allSettled(ids.map(id => getPatientDashboard(id)));
  return r.filter(x => x.status === "fulfilled").map(x => x.value);
}
```

## Task 4 — Answer

```typescript
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
type Gender = "male" | "female" | "other";

enum AppointmentStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

interface IPatient {
  id: number;
  name: string;
  age: number;
  phone: string;
  bloodGroup: BloodGroup;
  gender: Gender;
  isActive: boolean;
}

interface IAppointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  status: AppointmentStatus;
}

type CreatePatientDto = Omit<IPatient, "id" | "isActive">;
type PatientPreview = Pick<IPatient, "id" | "name" | "bloodGroup">;

function getPatientName(patients: IPatient[], id: number): string {
  const patient = patients.find(p => p.id === id);
  return patient ? patient.name : "Unknown";
}

function filterByStatus(appointments: IAppointment[], status: AppointmentStatus): IAppointment[] {
  return appointments.filter(a => a.status === status);
}
```

## Task 5 — Answer

```typescript
interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

class BaseService<T extends IBaseEntity> {
  protected items: T[] = [];

  create(data: Omit<T, keyof IBaseEntity>): T {
    const now = new Date();
    const newItem = { ...data, id: this.items.length + 1, createdAt: now, updatedAt: now } as unknown as T;
    this.items.push(newItem);
    return newItem;
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  findAll(): T[] {
    return [...this.items];
  }

  update(id: number, data: Partial<T>): T | undefined {
    const item = this.findById(id);
    if (!item) return undefined;
    Object.assign(item, data, { updatedAt: new Date() });
    return item;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}

interface IPatient extends IBaseEntity {
  name: string;
  age: number;
  phone: string;
  bloodGroup: string;
  isActive: boolean;
}

class PatientService extends BaseService<IPatient> {
  findByPhone(phone: string): IPatient | undefined {
    return this.items.find(p => p.phone === phone);
  }
}
```

## Task 6 — Answer *(Harder)*

```typescript
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

// ---- Async API helpers ----
function checkDoctorAvailability(doctorId: number): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => resolve(Math.random() > 0.2), 300);
  });
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

// ---- Pipeline ----
let appointmentCounter = 0;

async function bookAppointmentPipeline(doctorId: number, time: string, patientId: number): Promise<BookingResult> {
  // Step 1: Validate time
  const hour = parseInt(time.split(":")[0]);
  if (hour < 9 || hour >= 17) {
    return { type: "invalid_time", time, reason: "Time must be between 09:00 and 17:00" };
  }

  // Step 2: Check doctor availability
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) {
    return { type: "doctor_unavailable", doctorId, reason: "Doctor not found" };
  }
  const doctorAvailable = await checkDoctorAvailability(doctorId);
  if (!doctorAvailable) {
    return { type: "doctor_unavailable", doctorId, reason: "Doctor is currently unavailable" };
  }

  // Step 3: Check slot
  const slotAvailable = await checkSlotAvailability(time);
  if (!slotAvailable) {
    const freeSlots = slots.filter(s => !s.isBooked).map(s => s.time);
    return { type: "slot_unavailable", time, suggestedSlots: freeSlots };
  }

  // Step 4: Book slot
  const { appointmentId } = await bookSlot(doctorId, time);
  appointmentCounter++;

  // Step 5: Process payment with retry
  const payment = await processPayment(doctor.fee);
  if (!payment.success) {
    // Retry once
    const retryPayment = await processPayment(doctor.fee);
    if (!retryPayment.success) {
      // Cancel booking — free the slot
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
      return `✅ Confirmed! Appointment #${result.appointmentId} with ${result.doctor} at ${result.time}. Fee: ₹${result.fee} (Txn: ${result.transactionId})`;
    case "slot_unavailable":
      return `❌ Slot ${result.time} unavailable. Available: ${result.suggestedSlots.join(", ")}`;
    case "doctor_unavailable":
      return `❌ Doctor #${result.doctorId} unavailable: ${result.reason}`;
    case "invalid_time":
      return `❌ Invalid time ${result.time}: ${result.reason}`;
    case "payment_failed":
      return `❌ Payment failed for Appointment #${result.appointmentId}: ${result.reason}`;
  }
}
```

</details>

---

# 📋 Manager's Grading Sheet

```
TASK #: ____     PERSON: _____

[ ] 1. Code runs without errors (node/ts-node)
[ ] 2. All requirements implemented correctly
[ ] 3. Output matches expected behavior
[ ] 4. No syntax errors or crashes
[ ] 5. Code is clean (good variable names, proper indentation)
[ ] 6. Uses correct concepts (e.g. array methods instead of for-loops)
[ ] 7. Edge cases handled (empty arrays, missing data)

SCORE: ___/7

NOTES:
- What they did well:
- What to improve:
```

---

Good luck with the live coding session! 🚀

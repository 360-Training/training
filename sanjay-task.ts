// ============================================================
// Doctor Appointment Scheduler — Live Coding Assessment
// ============================================================
// Candidate : Sanjay Kumar
// Duration  : 15 minutes
// ============================================================

// --- Task ---

// 1. Define interfaces:
//    IDoctor, ISlot, IWaitlistEntry
//    (id, name, specialization, fee, availableDays, slots, etc.)

// 2. Create 3 doctors as an array
//    - At least 2 cardiologists, 1 pediatrician
//    - Different available days

// 3. Write these functions:
//
//    a) getDoctorsByDay(doctors, day)
//       - Returns names of doctors available on that day
//
//    b) generateWeekSlots(doctors)
//       - Generate Mon–Sat slots (09:00, 09:30, 10:00, 10:30, 11:00)
//       - Only for days the doctor is available
//       - Add as weekSchedule to each doctor
//
//    c) bookSlot(doctors, doctorId, day, time, patientName?)
//       - Check doctor exists, available on that day
//       - Check cross-doctor conflicts (same patient same day/time)
//       - Check slot not already booked
//       - patientName defaults to "Unknown"
//
//    d) rescheduleAppointment(doctors, doctorId, oldDay, oldTime,
//                             newDay, newTime, patientName)
//       - Only free old slot AFTER confirming new slot is available
//
//    e) addToWaitlist(waitlist, doctorId, day, time, patientName)
//       - Add to waitlist, return position in queue
//
//    f) processWaitlist(waitlist, doctors, doctorId, day, time)
//       - Take next waiting patient and auto-book them

// 4. Test everything:
//    generate schedules, book, double-book detection,
//    reschedule, waitlist, edge cases

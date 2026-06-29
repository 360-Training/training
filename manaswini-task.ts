// ============================================================
// TypeScript Patient System — Live Coding Assessment
// ============================================================
// Candidate : Sangepu Manaswini
// Duration  : 15 minutes
// ============================================================

// --- Task ---

// 1. Define:
//
//    BloodGroup type
//      "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-"
//
//    Gender type
//      "male" | "female" | "other"
//
//    AppointmentStatus enum
//      SCHEDULED = "scheduled"
//      COMPLETED = "completed"
//      CANCELLED = "cancelled"

// 2. Define interfaces:
//    IPatient — id, name, age, phone,
//               bloodGroup (typed), gender (typed), isActive
//    IAppointment — id, patientId, doctorId, date,
//                   status (typed)

// 3. Create utility types:
//    CreatePatientDto — Omit id and isActive from IPatient
//    PatientPreview — Pick only id, name, bloodGroup from IPatient

// 4. Write functions:
//
//    a) getPatientName(patients, id)
//       - Returns name or "Unknown"
//
//    b) filterByStatus(appointments, status)
//       - Filters appointments by the given status

// 5. Test:
//    Create sample data, call both functions, console.log results

// 6. Bonus:
//    Try assigning an invalid blood group or gender
//    TypeScript should show a type error

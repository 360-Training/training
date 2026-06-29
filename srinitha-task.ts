// ============================================================
// Async Hospital API + Error Handling — Live Coding Assessment
// ============================================================
// Candidate : Srinitha Mulagundla
// Duration  : 15 minutes
// ============================================================

// --- Task ---

// 1. Define interfaces:
//    IPatient — id, name, age
//    IAppointment — id, patientId, doctorId, date, status

// 2. Sample data:
//    patients array with 2 patients
//    appointments array with 2 appointments

// 3. Create custom error classes:
//    NotFoundError extends Error (statusCode = 404)
//    ValidationError extends Error (statusCode = 400)

// 4. Write async functions (Promise + setTimeout, 500ms delay):
//
//    a) fetchPatient(id)
//       - Resolves with patient if found
//       - Rejects with NotFoundError if not found
//
//    b) fetchAppointments(patientId)
//       - Resolves with filtered appointments
//       - Rejects with NotFoundError if none

// 5. Write getPatientDashboard(patientId) using async/await
//    - Fetch patient + appointments with Promise.all
//    - Return { patient, appointments, stats: { total, completed } }

// 6. Write getMultiPatientDashboard(patientIds) using Promise.allSettled
//    - Return only successful results, skip failures

// 7. Test:
//    - Fetch valid dashboard
//    - Try non-existent patient (should catch error)
//    - Fetch multiple (mix of valid + invalid)

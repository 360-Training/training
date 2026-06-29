// ============================================================
// Patient Registry System — Live Coding Assessment
// ============================================================
// Candidate : Abhinaya Reddy
// Duration  : 15 minutes
// ============================================================

// --- Task ---

// 1. Define an interface IPatient with:
//    id, name, age, phone, bloodGroup, isActive

// 2. Create an array of 5 patients using that interface

// 3. Write these functions:
//
//    a) getActivePatientNames(patients)
//       - Returns comma-separated string of active patient names
//       - Use filter, map, join
//
//    b) findByPhone(patients, phone)
//       - Returns patient object or "Patient not found"
//       - Use find
//
//    c) getAverageAge(patients)
//       - Returns average age of active patients only
//       - Use filter + reduce
//
//    d) groupByBloodGroup(patients)
//       - Groups patient names by blood group
//       - Returns { "A+": ["name1", ...], ... }
//       - Use reduce
//
//    e) searchAndSort(patients, query)
//       - Case-insensitive name search
//       - Results sorted youngest first
//       - Use filter + sort

// 4. Call each function and console.log the results to verify

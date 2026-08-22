# Training Audit Report — Ayurvena JS/TS Bootcamp
**Audit Date:** 2026-06-26  
**Auditor:** Shivaganesh (Manager)  
**Repo:** 360-Training/training  
**Branches Audited:** abhi · harshitha · manaswini · soumya · srinitha  

---

## Scoring Rubric (100 pts total)

| Category | Max Points | What It Measures |
|----------|-----------|-----------------|
| Task Completion | 25 | How many exercises were attempted and submitted |
| Code Understanding | 25 | Does the code show conceptual understanding or just copy-paste output? |
| Hands-On Evidence | 25 | Signs of genuine writing: bugs, personal test data, experimentation, typos |
| Git Discipline | 25 | Proper commit messages, one commit per exercise, CLI workflow |

**AI Risk Levels:** LOW / MEDIUM / HIGH / CONFIRMED

---

## OVERALL SCORECARD

| Student | Completion | Understanding | Hands-On | Git | TOTAL | AI Risk |
|---------|-----------|---------------|----------|-----|-------|---------|
| Abhinaya | 5/25 | 12/25 | 10/25 | 3/25 | **30/100** | HIGH |
| Harshitha | 22/25 | 18/25 | 14/25 | 23/25 | **77/100** | MEDIUM-HIGH |
| Manaswini | 22/25 | 16/25 | 20/25 | 18/25 | **76/100** | MEDIUM |
| Soumya | 12/25 | 13/25 | 18/25 | 7/25 | **50/100** | CONFIRMED |
| Srinitha | 22/25 | 20/25 | 8/25 | 8/25 | **58/100** | HIGH |

---

## DETAILED ASSESSMENT

---

### 1. ABHINAYA (Branch: `abhi`)
**Score: 30/100 — CRITICAL FAIL**

#### What Was Submitted
- **Hour 1-2 (Patient Registry):** Code exists in git history but was DELETED by the student
- **Hours 3-4, 5-6, 7-8:** Not submitted at all
- **Day 2 TypeScript:** Not attempted

#### Commit History Red Flags
```
e6347ad  Delete patient registry index.js       ← WHY DELETE YOUR OWN WORK?
163a689  Add files via upload                   ← UPLOADED VIA GITHUB WEB UI
7def1bd  patient registry                       ← Created via terminal (empty/symlink)
```

**The `Add files via upload` commit is the most damaging finding.** This means:
- Abhinaya did NOT write the code in VS Code and push via terminal
- She wrote/generated the code SOMEWHERE ELSE (possibly AI tool, phone, ChatGPT)
- Then uploaded it through GitHub's web browser file upload
- This completely bypasses the hands-on git workflow that is the point of training
- Then she DELETED the file — suggesting she realized this was detectable or the file didn't work

#### Code Quality (Recovered from git history)
The recovered code uses old-style `for` loops and `function` keywords, which is somewhat consistent with a beginner. However:
- The `getPatientStats()` uses `reduce()` which is an advanced method
- Comments have typos: `//paitent Registry`, `//existing paient` — these are oddly authentic
- The code is actually functional and complete for Hour 1-2

#### Scoring Breakdown
| Category | Score | Reason |
|----------|-------|--------|
| Task Completion | 5/25 | Only 1 exercise out of 4, and she deleted it |
| Code Understanding | 12/25 | Recovered code shows some understanding; for-loops are beginner-appropriate |
| Hands-On Evidence | 10/25 | Typos and for-loops suggest some genuine work, but web upload nullifies this |
| Git Discipline | 3/25 | Web upload is not a valid git workflow; deleted own submission |

#### Action Required
- Must redo all 4 exercises FROM THE TERMINAL — no web uploads allowed
- Must explain why she deleted her own file
- Cannot progress to Day 2 without completing Day 1 properly

---

### 2. HARSHITHA (Branch: `harshitha`)
**Score: 77/100 — PASSING WITH CONCERNS**

#### What Was Submitted
- ✅ Hour 1-2: Patient Registry — Complete
- ✅ Hour 3-4: Doctor Schedule — Complete
- ✅ Hour 5-6: Async API — Complete (advanced patterns)
- ✅ Hour 7-8: Classes & Modules — Complete (full service architecture)

#### Commit History (Clean)
```
ab890fb  completed hour7-8 classes modules hospital system
509a7e5  upgraded patient registry with search engine and stats
3eb48f3  completed hour 5-6 async hospital api simulator
1357dd6  completed 3-4 Doctor Schedule System
85d70e2  completed hour 1-2 patient registry system
```
One commit per exercise. Meaningful messages. This is the correct workflow. ✅

#### Code Analysis — Exercise by Exercise

**Hour 1-2:**
- Comments have inconsistent capitalization: `// ---- Filter BY BLOOD Group ----` — this is a HUMAN signal
- Uses both arrow functions and regular functions — natural learning mix
- Personal test data (different phone numbers like `8889998888`) — good sign
- Missing the `deactivatePatient` function in the extended section — minor gap

**Hour 3-4:**
- Checks doctor availability by converting date to day name using `new Date(date).toLocaleDateString("en-US", { weekday: "long" })` — this is a very sophisticated API call. Beginners rarely know this on day 1.
- The appointment summary with revenue calculation is beyond what most beginners produce
- Generally solid but this level of sophistication is unusual for someone new to JS

**Hour 5-6 — Concern Zone:**
- Uses `Promise.all()` with `.map(async (a) => ...)` for parallel fetch — this is intermediate JavaScript
- The full `getDashboard` function is well-structured and complete
- This is too polished for someone in their 5th-6th hour of JavaScript

**Hour 7-8 — Concern Zone:**
- Full `require/module.exports` CommonJS module system — correctly used
- `DashboardService` class is professional-grade
- Proper seeding pattern — matches exactly what production code looks like
- Code has zero bugs and zero rough edges — unusual for a first attempt at classes

#### AI Suspicion Indicators
- Hours 1-4: MEDIUM suspicion — some human signals present
- Hours 5-6 and 7-8: HIGH suspicion — too clean, too advanced, zero struggle visible
- The jump in sophistication from Hour 1-4 to Hour 5-8 is steep and sudden

#### Scoring Breakdown
| Category | Score | Reason |
|----------|-------|--------|
| Task Completion | 22/25 | All 4 done; minor gap in hour1-2 bonus function |
| Code Understanding | 18/25 | Understands the concepts but some patterns are too advanced |
| Hands-On Evidence | 14/25 | Good commit hygiene, comment inconsistencies are human signs, but no visible struggle in hours 5-8 |
| Git Discipline | 23/25 | Excellent — one commit per exercise, descriptive messages |

#### Recommendation
- Strong candidate but must be questioned on Hours 5-8 specifically
- Ask her: "Explain how `Promise.all` works and why you used it here"
- Ask her: "What does `module.exports` do and why is it needed?"
- If she can explain confidently, the score stands. If not, flag for AI use.

---

### 3. MANASWINI (Branch: `manaswini`)
**Score: 76/100 — PASSING (Most Genuine Work)**

#### What Was Submitted
- ✅ Hour 1-2: Patient Registry — Complete (with visible bugs)
- ✅ Hour 3-4: Doctor Schedule — Complete (with bugs)
- ✅ Hour 5-6: Async API — Complete (partially advanced)
- ✅ Hour 7-8: Classes & Modules — Complete (ES Modules style)

#### Commit History
```
020e9f7  :wqMerge branch 'manaswini' of ...     ← VIM ESCAPE ACCIDENT
d3f0b98  day1: hour 7-8 classes and modules
6acebd3  Delete test.txt
2fc2791  completed hour 5-6 : async-api
a6e4404  completed hour 3-4: Doctor Schedule System
4f71f4b  completed hour 1-2: patient registry
5e3cee6  Testing repository access
```

**THE STRONGEST HUMAN SIGNAL IN THIS ENTIRE AUDIT:**  
The commit message `:wqMerge branch 'manaswini'...` means Manaswini was in her terminal's vim editor writing a commit message, got confused, typed `:wq` (the vim command to save and quit), and accidentally included it in her commit message. **This is impossible to fake and is proof she was doing hands-on git work in a real terminal.**

#### Code Analysis — Exercise by Exercise

**Hour 1-2:**
- Uses personal names: `thanvi`, `thanmai Reddy`, `Harini` — these are local/personal names, not generic "John Doe" — excellent human signal
- Uses traditional `for...of` loop for `listActivePatients` — beginner-appropriate
- `registerPatient` doesn't accept allergies parameter — genuine beginner oversight

**Hour 3-4 — Bug Found (GOOD SIGN):**
```js
// bookAppointment uses `patients` but that variable is not defined in this file!
const patient = patients.find(p => p.id === patientId);
```
The `patients` array is referenced but never declared — this is a real bug a beginner makes. AI-generated code rarely has bugs like this. ✅ Human signal.

**Also in Hour 3-4 — Duplicate Function (EXCELLENT HUMAN SIGNAL):**
```js
// She defined getAvailableDoctors TWICE
function getAvailableDoctors(day) { ... }  // first version
// with destruction
function getAvailableDoctors(day) { ... }  // second version (with destructuring)
```
She was learning destructuring and tried two versions. This is exactly what hands-on practice looks like. ✅

**Hour 5-6 — Concern Zone:**
The base fetch functions are written using `new Promise()` (beginner-appropriate). But then:
```js
class NotFoundError extends Error { constructor(resource,id) { ... this.statusCode=404; } }
class ValidationError extends Error { ... }
class ConflictError extends Error { ... }
class UnauthorizedError extends Error { ... }
class PaymentError extends Error { ... }
```
Five custom error classes with HTTP status codes. This is an **advanced professional pattern** that does NOT belong in Hour 5-6 of a beginner's training. The rest of her code shows beginner patterns, but these error classes are expert-level. **This section was almost certainly AI-assisted.**

**Hour 7-8:**
- Uses ES Modules (`import/export`) while everyone else uses CommonJS (`require`)
- This inconsistency might come from googling "JavaScript classes modules" and landing on modern examples
- Code is well-structured but simpler than Harshitha/Srinitha

#### Scoring Breakdown
| Category | Score | Reason |
|----------|-------|--------|
| Task Completion | 22/25 | All 4 done; bugs don't disqualify |
| Code Understanding | 16/25 | Shows real understanding in hours 1-4; suspect in hours 5-6 |
| Hands-On Evidence | 20/25 | vim accident, personal names, real bugs, duplicate functions — strongest human evidence of any student |
| Git Discipline | 18/25 | Good commits, but merge mess shows real git confusion (which is authentic) |

#### Recommendation
- **Best overall performer from a genuine learning perspective**
- The bugs and vim accident are EXACTLY what you want to see from a trainee
- Must explain the custom error classes — where did those come from?
- Hour 5-6 error handling section warrants a direct conversation

---

### 4. SOUMYA (Branch: `soumya`)
**Score: 50/100 — FAIL — AI Tool Confirmed**

#### What Was Submitted
- ⚠️ Hour 1-2: Basic implementation only (3 functions, 1 test patient)
- ⚠️ Hour 3-4: Partial (no appointment booking, just doctor registration)
- ⚠️ Hour 5-6: Very basic (just one `fetchPatient` example)
- ✅ Day 2 TypeScript Basics: Done
- ✅ Day 2 Generics: Done

#### DIRECT AI TOOL EVIDENCE — `.refact` Directory
Soumya committed an entire AI tool's configuration directory to her branch:

```
.refact/buddy/settings.json
.refact/buddy/state.json
.refact/buddy/memory_ops.jsonl
.refact/buddy/chats/workflows/buddy_docs_gardener.json
.refact/buddy/chats/workflows/buddy_refactor_hunter.json
.refact/buddy/chats/workflows/buddy_setup_coach.json
.refact/buddy/chats/workflows/refact_self_critic.json
```

**Refact.ai** is an AI coding assistant (similar to GitHub Copilot) that runs inside VS Code. The settings file reveals it was running with:
```json
{
  "enabled": true,
  "autonomous_chats_enabled": true,
  "proactive_enabled": true,
  "message_observation_enabled": true,
  "autonomy_level": "suggest"
}
```

The `proactive_enabled: true` means the AI was **automatically offering suggestions** while she typed. The `message_observation_enabled: true` means it was reading her code and chat. The `memory_ops.jsonl` file shows it was actively analyzing git history and tracking code hotspots.

**This is not an accusation — this is a confirmed fact from git history. An AI tool was active during her coding sessions.**

#### Commit History Problems
```
35715479  Completed Day 2 TypeScript Basics and Generics
21070c2d  day1 completed exercises                ← ALL OF DAY 1 IN ONE COMMIT
725d0af7  completed patient registry functions
```
Committing "day1 completed exercises" in one go means she did NOT commit after each exercise as instructed. This is a workflow failure.

#### Code Analysis

**Hour 1-2 — Incomplete:**
- Only 1 patient in the initial data
- Only 3 functions: `registerPatient`, `findPatientByPhone`, `listActivePatients`
- Missing: `searchPatients`, `filterByBloodGroup`, `getPatientStats`, `sortPatients`, `getPatientSummary`
- This is a partial completion

**Hour 3-4 — Very Incomplete:**
- Only registered 3 doctors and found by specialization
- NO appointment booking system at all
- Missing: `getAvailableDoctors`, `bookAppointment`, `cancelAppointment`, `getAppointmentSummary`
- This is a quarter-completion at best

**Hour 5-6 — Barely Started:**
- The file starts with 10+ lines of commented-out code — shows learning/experimentation ✅ (human signal)
- Only one `fetchPatient` function and one async wrapper
- Missing: `fetchDoctor`, `createAppointment`, `getDashboard`, `Promise.all` usage

**Day 2 TypeScript — Actually Done Properly:**
- Basic types, arrays, objects — done
- Generic function, generic interface, generic class — done
- This looks genuine and complete

#### The Paradox
Soumya has a confirmed AI tool and still produced the least complete work. This suggests she may have set up Refact.ai as her VS Code extension but didn't heavily use it for code generation. The incomplete implementations and commented-out code suggest genuine learning. However, the presence of an active AI tool means we cannot confirm the work as entirely hand-written.

#### Scoring Breakdown
| Category | Score | Reason |
|----------|-------|--------|
| Task Completion | 12/25 | Day 1 exercises incomplete; jumped to Day 2 without finishing Day 1 |
| Code Understanding | 13/25 | Shows understanding of basics; TypeScript section is solid |
| Hands-On Evidence | 18/25 | Commented-out experiments, personal name in tests, simple code is authentic |
| Git Discipline | 7/25 | AI tool committed to repo; bulk commit for all day1; workflow not followed |

#### Action Required
- Must disable/uninstall Refact.ai or GitHub Copilot during training sessions
- Must complete all of Day 1 hour 1-2 and hour 3-4 from scratch without AI assistance
- The `.refact` directory must not appear in any future commits

---

### 5. SRINITHA (Branch: `srinitha`)
**Score: 58/100 — SUSPICIOUS — HIGH AI RISK**

#### What Was Submitted
- ✅ Hour 1-2: Patient Registry — Complete with PASS/FAIL test cases
- ✅ Hour 3-4: Doctor Schedule — Comprehensive
- ✅ Hour 5-6: Async API — Complete
- ✅ Hour 7-8: Classes & Modules — Complete (but tests all commented out)

#### Commit History — PRIMARY RED FLAG
```
be6f878  Update classes-modules     ← Identical message
1206a82  Update classes-modules     ← Identical message  
1ce6607  Update classes-modules     ← Identical message
0d1a3fb  Update classes-modules     ← Identical message
5e1c807  Update classes-modules     ← Identical message
83da1dd  Remove Hospital.js
9c1229e  Update classes-modules     ← Identical message
26f3bc1  completed hour 1-2: patient registry
```

**7 commits with the identical message "Update classes-modules" is a strong AI usage pattern.**  
This is exactly what happens when someone asks an AI to generate code, copies it, and commits without thinking about the message. Each "Update" likely corresponds to "ask AI → get code → paste → commit."  
A genuine learner working through a problem would write different messages or commit once.

#### Code Analysis — Exercise by Exercise

**Hour 1-2:**
- Creates PASS/FAIL test assertions: `found.name === "Rahul Sharma" ? "PASS" : "FAIL"` — this is a mature testing pattern a beginner doesn't invent
- The code is very complete and methodical
- Two separate search tests (case-sensitive and case-insensitive) — this level of test coverage from a beginner is unusual

**Hour 3-4:**
- Uses optional chaining: `doctor?.availableDays.includes(day)` — this is modern ES2020 syntax
- Uses parameter destructuring: `function getAvailableDoctors(day = "")` with `({ availableDays })` — advanced
- `addDoctor(newDoctor)` using spread operator: `{ ...newDoctor }` — correct but too polished for a beginner
- Has a hardcoded date `const today = "2026-07-03"` in `getAppointmentSummary` — this IS a beginner mistake ✅ (one of the few human signals)

**Hour 5-6:**
- The formatting is EXTREMELY consistent — every function block has identical blank line spacing
- Look at the `getPatientDashboard` return object — the properties are each on their own line with identical indentation
- This formatting style is characteristic of AI-generated code
- Uses `Promise.all` correctly on first attempt

**Hour 7-8 — Most Suspicious:**
- The Doctor class has a complex date-based schedule structure that's different from what others did
- Patient, Doctor, Appointment classes are all well-designed
- Service classes (PatientService, DoctorService, AppointmentService) are complete
- **ALL TESTS ARE COMMENTED OUT:**
  ```js
  // const patient1 = new Patient(...)
  // console.log(patient1.getProfile())
  ```
  Why would you write tests and then comment them ALL out? This suggests either:
  1. The code was generated and the tests were part of the generation, but she couldn't run them
  2. She tried to run the code, it failed, and she commented out everything

#### Advanced Patterns Used Immediately (No Learning Curve Visible)
- Optional chaining `?.` — first exercise
- Destructuring in function parameters
- Spread operator
- Promise.all
- Static class methods
- Full service architecture
- Custom schedule data structures

A genuine beginner learns one pattern at a time with visible struggle. Here, all advanced patterns appear simultaneously and correctly.

#### Scoring Breakdown
| Category | Score | Reason |
|----------|-------|--------|
| Task Completion | 22/25 | All 4 exercises present |
| Code Understanding | 20/25 | The code is correct and well-structured |
| Hands-On Evidence | 8/25 | 7 identical commits, no visible learning curve, tests commented out, too-perfect formatting |
| Git Discipline | 8/25 | 7 generic "Update" messages is a critical git practice failure |

#### Action Required
- Must explain every class she wrote in Hour 7-8 in a verbal walkthrough
- Must re-explain what optional chaining is and when to use it
- Must write new tests for Hour 7-8 and actually run them
- Future commits must have descriptive messages — "Update X" is not acceptable

---

## CROSS-STUDENT COMPARISON

### Code Similarity Analysis
All students used similar data structures (patients array with id/name/age/phone/bloodGroup/allergies/isActive). This is expected since they share the same training material. No direct copy-paste between students was detected.

### Progression Signals
| Student | Early Exercises | Late Exercises | Jump in Quality |
|---------|----------------|----------------|-----------------|
| Abhinaya | N/A (submitted 1) | N/A | N/A |
| Harshitha | Moderate | Very High | Suspicious |
| Manaswini | Beginner | Moderate-High | Expected with AI spike |
| Soumya | Beginner | Beginner | Consistent (Day 2 TS is better) |
| Srinitha | High | Very High | No beginner phase visible |

---

## AI USAGE EVIDENCE SUMMARY

| Student | Evidence Type | Specific Finding | Verdict |
|---------|--------------|------------------|---------|
| **Abhinaya** | Behavioral | File uploaded via GitHub web UI, not git CLI | HIGH suspicion |
| **Abhinaya** | Behavioral | Deleted her own submission after uploading | HIGH suspicion |
| **Harshitha** | Code | Hours 5-8 too polished; `Promise.all` + Dashboard on first try | MEDIUM-HIGH suspicion |
| **Manaswini** | Code | Custom error classes with HTTP status codes in Hour 5-6 — out of level | MEDIUM suspicion |
| **Soumya** | DIRECT PROOF | `.refact` AI tool committed to branch; settings show `proactive_enabled: true` | CONFIRMED |
| **Srinitha** | Behavioral | 7 identical "Update classes-modules" commit messages | HIGH suspicion |
| **Srinitha** | Code | All test cases commented out in Hour 7-8 | HIGH suspicion |
| **Srinitha** | Code | Advanced patterns (optional chaining, destructuring, spread) used immediately and correctly | HIGH suspicion |

---

## WHERE EACH STUDENT IS STRUGGLING

### Abhinaya
- Git workflow fundamentals — does not understand how to commit and push properly
- Did not complete 75% of the exercises
- Deleted her own work — concerning behavior

### Harshitha
- Git is great; code is great — the concern is **authenticity**
- If she did use AI, she needs to rebuild the understanding from scratch
- Key gap to test: async/await and module system understanding

### Manaswini
- Has a real bug in Hour 3-4 (undefined `patients` variable) — **this must be fixed**
- Used ES Modules (import/export) when CommonJS was appropriate — needs clarification
- The custom error classes in Hour 5-6 are above her current level — came from somewhere external

### Soumya
- Did not complete Day 1 before moving to Day 2
- Hour 3-4 appointment booking system is entirely missing
- Must remove AI tools from her coding environment during training

### Srinitha
- Tests are commented out — she may not be able to actually run her code
- The 7 identical commits suggest copy-paste behavior, not learning
- Must do a live verbal walkthrough of her Hour 7-8 code

---

## RECOMMENDATIONS

### Immediate Actions

1. **Abhinaya** — Assigned to redo Day 1 completely, all exercises from terminal, one commit per function. Explain the web upload incident in person.

2. **Soumya** — Must uninstall/disable Refact.ai. Must complete Hour 3-4 and Hour 5-6 before any further training.

3. **Srinitha** — Schedule a live code review session. She will explain every class and function verbally. Uncomment all tests and run them in front of the trainer.

### Verbal Verification (All Students)

The following questions should be asked to each student individually without code in front of them:

| Question | Tests |
|----------|-------|
| "What is the difference between `filter()` and `find()`?" | Hour 1-2 understanding |
| "What happens if you forget `await` before a Promise?" | Hour 5-6 understanding |
| "What does `module.exports` do?" | Hour 7-8 understanding |
| "What is the difference between a class and a function?" | Hour 7-8 understanding |
| "Write a function on paper that finds a patient by phone number" | Can they write without IDE |

### Going Forward

- **Rule:** All code must be written in VS Code locally and pushed via CLI — no GitHub web uploads
- **Rule:** No AI coding assistants (Copilot, Refact.ai, Cursor, ChatGPT) during training sessions
- **Rule:** Commit messages must describe WHAT was added — "Add registerPatient function" not "Update"
- **Rule:** Commit after each function, not after completing an entire exercise
- **Verification:** Trainers should spot-check one function per student per day by asking them to explain it line by line

---

## FINAL RANKINGS

| Rank | Student | Score | Status |
|------|---------|-------|--------|
| 1 | Manaswini | 76/100 | Pass — Most genuine learner |
| 2 | Harshitha | 77/100 | Pass — But needs verification on Hours 5-8 |
| 3 | Srinitha | 58/100 | Conditional — Live walkthrough required |
| 4 | Soumya | 50/100 | Fail — Incomplete + AI tool confirmed |
| 5 | Abhinaya | 30/100 | Fail — Must redo all exercises |

> **Note on Harshitha vs Manaswini ranking:** Harshitha scores slightly higher on raw points due to better git practice, but Manaswini shows more authentic learning evidence. If verification confirms Harshitha's understanding is genuine, she is the strongest overall performer.

---

*Generated from direct git history and source code analysis of the 360-Training/training repository.*

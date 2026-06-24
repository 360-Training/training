# Ayurvena — 24-Hour JavaScript + TypeScript Bootcamp

> **Read this FULLY before you start coding. This is your guide for the next 3 days.**

---

## What is This?

This is a 24-hour hands-on training program. You will learn JavaScript and TypeScript by building a mini version of our hospital project (Ayurvena). Every exercise in here is based on real features you'll build in the actual project.

**Format:** 3 days x 8 hours each (or 2 days x 12 hours — your manager will decide)

**Who is this for?** All 6 team members:
- Abhinaya Reddy
- Sanjay Kumar
- Srinitha Mulagundla
- Sangepu Manaswini
- Mekala Harshitha
- Soumya

**What you'll build:** A console-based hospital management system — patients, doctors, appointments, payments, queues — all using JavaScript first, then TypeScript.

---

## Before You Start — Setup Your Computer

You need these installed. If you don't have them, install them NOW (before Day 1).

### 1. Install Node.js

Node.js lets you run JavaScript outside the browser (on your computer).

- Go to: https://nodejs.org
- Download the **LTS** version (the green button)
- Install it (just click Next → Next → Finish)
- Open your terminal (Command Prompt or PowerShell) and type:
  ```
  node --version
  ```
  You should see something like `v20.x.x`. If you see this, Node.js is installed.

### 2. Install VS Code

This is the code editor everyone on the team will use.

- Go to: https://code.visualstudio.com
- Download and install
- Open VS Code and install these extensions (click the Extensions icon on the left sidebar):
  - **ESLint** — catches code mistakes
  - **Prettier** — auto-formats your code
  - **Error Lens** — shows errors right on the line (very helpful for TypeScript)
  - **TypeScript Hero** — helps with imports

### 3. Install Git

Git is how we share code with each other. Think of it like Google Docs but for code — everyone has their own copy, and you can merge changes together.

- Go to: https://git-scm.com
- Download and install (use all default options)
- Open terminal and type:
  ```
  git --version
  ```
  You should see something like `git version 2.x.x`.

- Set your name and email (use your REAL name):
  ```
  git config --global user.name "Your Full Name"
  git config --global user.email "your.email@example.com"
  ```

### 4. Create a GitHub Account (If You Don't Have One)

- Go to: https://github.com
- Sign up with your email
- Send your GitHub username to the manager so you can be added to the team repo

---

## How Git & GitHub Works (Read This Carefully)

### What is Git?

Imagine you're writing a document. Every time you make a significant change, you save a snapshot. If something goes wrong, you can go back to any previous snapshot. That's Git.

- **Repository (repo)** = Your project folder tracked by Git
- **Commit** = A snapshot of your code at a point in time (like "Save" in a game)
- **Branch** = Your own copy of the code where you work without affecting others
- **Push** = Upload your commits to GitHub (so others can see your work)
- **Pull** = Download the latest changes from GitHub
- **Pull Request (PR)** = Asking the team to review and merge your code

### How Our Team Will Use Git

```
GitHub Repo: ayurvena-bootcamp
    │
    ├── main branch (don't touch this — this is the clean copy)
    │
    ├── abhinaya branch (Abhinaya's work goes here)
    ├── sanjay branch (Sanjay's work goes here)
    ├── srinitha branch (Srinitha's work goes here)
    ├── manaswini branch (Manaswini's work goes here)
    ├── harshitha branch (Harshitha's work goes here)
    └── soumya branch (Soumya's work goes here)
```

**Each person works on their OWN branch. You NEVER push to the `main` branch directly.**

### Step-by-Step: Getting Started with Git

**Step 1 — Clone the repo (do this ONCE at the start)**

The manager will create the repo and share the link. Then you run:
```bash
git clone https://github.com/YOUR-ORG/ayurvena-bootcamp.git
cd ayurvena-bootcamp
```

This downloads the project to your computer.

**Step 2 — Create your branch**
```bash
git checkout -b your-name
```
Replace `your-name` with your actual name in lowercase. Examples:
```bash
git checkout -b abhinaya
git checkout -b sanjay
git checkout -b harshitha
git checkout -b manaswini
git checkout -b soumya
git checkout -b srinitha
```

This creates YOUR branch and switches to it. Everything you do now only affects YOUR branch.

**Step 3 — Check which branch you're on (do this often)**
```bash
git branch
```
You should see your name with a `*` next to it:
```
  main
* abhinaya
```
The `*` means you're on the `abhinaya` branch. Good.

**Step 4 — After you finish an exercise, save your work**
```bash
git add .
git commit -m "completed hour 1-2: patient registry"
```

What this does:
- `git add .` — stages ALL your changes (the `.` means "everything")
- `git commit -m "message"` — creates a snapshot with a description

**Write clear commit messages!** Bad: "done". Good: "completed hour 1-2: patient registry with search and filter"

**Step 5 — Push your work to GitHub**
```bash
git push origin your-name
```
Example:
```bash
git push origin abhinaya
```

First time pushing, you might see a message asking you to set upstream. Just run:
```bash
git push --set-upstream origin your-name
```

After this, `git push` alone will work.

**Step 6 — Push after EVERY exercise (not just at the end of the day)**

Your schedule should be:
1. Finish an exercise
2. `git add .`
3. `git commit -m "completed hour X: description"`
4. `git push`
5. Start next exercise

**This way the manager can check your progress anytime by looking at GitHub.**

### Common Git Problems and Solutions

| Problem | Solution |
|---------|----------|
| "I'm on the wrong branch!" | `git checkout your-name` |
| "I made changes on main by mistake!" | `git stash` then `git checkout your-name` then `git stash pop` |
| "git push says rejected!" | `git pull origin your-name` first, then `git push` |
| "I want to see what I changed" | `git status` (shows changed files) or `git diff` (shows actual changes) |
| "I want to undo my last commit" | `git reset --soft HEAD~1` (keeps your changes, removes the commit) |
| "I messed everything up" | Don't panic. Ask the manager. Git has undo for everything. |

### Git Cheat Sheet (Print This)

```
git clone <url>              — Download the repo (once)
git checkout -b your-name    — Create your branch (once)
git branch                   — Check which branch you're on
git status                   — See what changed
git add .                    — Stage all changes
git commit -m "message"      — Save a snapshot
git push                     — Upload to GitHub
git pull                     — Download latest changes
git log --oneline            — See your commit history
```

---

## Project Folder Structure

Everyone will create this SAME structure. This is what your project should look like by the end of the 3 days:

```
ayurvena-bootcamp/
│
├── day1-javascript/
│   ├── hour1-2-patient-registry/
│   │   └── index.js
│   ├── hour3-4-doctor-schedule/
│   │   └── index.js
│   ├── hour5-6-async-api/
│   │   └── index.js
│   └── hour7-8-classes-modules/
│       ├── models/
│       │   ├── Patient.js
│       │   ├── Doctor.js
│       │   └── Appointment.js
│       ├── services/
│       │   ├── PatientService.js
│       │   ├── DoctorService.js
│       │   ├── AppointmentService.js
│       │   └── DashboardService.js
│       ├── utils/
│       │   ├── errors.js
│       │   └── validators.js
│       ├── data/
│       │   └── seed.js
│       └── index.js
│
├── day2-typescript/
│   ├── hour9-10-ts-basics/
│   │   └── index.ts
│   ├── hour11-12-generics/
│   │   └── index.ts
│   ├── hour13-14-advanced/
│   │   └── index.ts
│   └── hour15-16-ayurvena-types/
│       └── types/
│           ├── enums.ts
│           ├── models.ts
│           ├── dtos.ts
│           └── responses.ts
│
├── day3-mini-ayurvena/
│   ├── src/
│   │   ├── types/
│   │   │   ├── enums.ts
│   │   │   ├── models.ts
│   │   │   ├── dtos.ts
│   │   │   └── responses.ts
│   │   ├── models/
│   │   │   ├── BaseEntity.ts
│   │   │   ├── Patient.ts
│   │   │   ├── Doctor.ts
│   │   │   └── Appointment.ts
│   │   ├── services/
│   │   │   ├── BaseService.ts
│   │   │   ├── PatientService.ts
│   │   │   ├── DoctorService.ts
│   │   │   ├── AppointmentService.ts
│   │   │   ├── PaymentService.ts
│   │   │   ├── QueueService.ts
│   │   │   └── DashboardService.ts
│   │   ├── utils/
│   │   │   ├── errors.ts
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   ├── data/
│   │   │   └── seed.ts
│   │   └── index.ts
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

**Create folders as you go. Don't create everything upfront — build as you reach each exercise.**

---

## How to Run Your Code

### JavaScript (Day 1)
```bash
# Navigate to the exercise folder
cd day1-javascript/hour1-2-patient-registry

# Run your code
node index.js
```

You should see output in the terminal. If you see an error, read the error message carefully — it tells you the file name and line number where the problem is.

### TypeScript (Day 2 and Day 3)

TypeScript needs to be set up first. Do this ONCE at the start of Day 2:

```bash
# Go to the day2 folder
cd day2-typescript

# Initialize a Node.js project
npm init -y

# Install TypeScript and ts-node
npm install typescript ts-node @types/node

# Create TypeScript config
npx tsc --init
```

Now to run TypeScript files:
```bash
# Run a TypeScript file directly
npx ts-node hour9-10-ts-basics/index.ts
```

To check if your code has type errors WITHOUT running it:
```bash
npx tsc --noEmit
```
If this shows nothing, your code is clean. If it shows errors, fix them.

For Day 3 (mini-ayurvena), do the same setup:
```bash
cd day3-mini-ayurvena
npm init -y
npm install typescript ts-node @types/node
npx tsc --init
```

---

## How to Test Your Code (Very Important)

"Testing" means checking that your code actually works correctly. Here's how to test at every stage:

### Method 1 — Console.log Testing (Use This for Every Exercise)

After writing a function, add test cases at the bottom of your file:

```javascript
// ===== TESTS =====
// Test 1: Register a patient
const patient1 = registerPatient("Rahul Kumar", 32, "9876543210", "O+");
console.log("Test 1 - Register Patient:");
console.log("  Expected: Object with name 'Rahul Kumar'");
console.log("  Got:", patient1.name === "Rahul Kumar" ? "PASS" : "FAIL", patient1);

// Test 2: Find patient by phone
const found = findPatientByPhone("9876543210");
console.log("\nTest 2 - Find by Phone:");
console.log("  Expected: Rahul Kumar");
console.log("  Got:", found?.name === "Rahul Kumar" ? "PASS" : "FAIL", found?.name);

// Test 3: Search should be case-insensitive
const results = searchPatients("rahul");
console.log("\nTest 3 - Case-insensitive Search:");
console.log("  Expected: 1 result");
console.log("  Got:", results.length === 1 ? "PASS" : "FAIL", results.length, "results");

// Test 4: Filter by blood group
const oPositive = filterByBloodGroup("O+");
console.log("\nTest 4 - Filter O+ Blood Group:");
console.log("  Expected: at least 1 patient");
console.log("  Got:", oPositive.length > 0 ? "PASS" : "FAIL", oPositive.length, "patients");

// Test 5: Edge case — search for non-existent patient
const notFound = findPatientByPhone("0000000000");
console.log("\nTest 5 - Patient Not Found:");
console.log("  Expected: undefined or 'Not found'");
console.log("  Got:", !notFound ? "PASS" : "FAIL", notFound);
```

When you run this, you should see:
```
Test 1 - Register Patient:
  Expected: Object with name 'Rahul Kumar'
  Got: PASS { id: 1, name: 'Rahul Kumar', ... }

Test 2 - Find by Phone:
  Expected: Rahul Kumar
  Got: PASS Rahul Kumar

Test 3 - Case-insensitive Search:
  Expected: 1 result
  Got: PASS 1 results

Test 4 - Filter O+ Blood Group:
  Expected: at least 1 patient
  Got: PASS 2 patients

Test 5 - Patient Not Found:
  Expected: undefined or 'Not found'
  Got: PASS undefined
```

**If you see FAIL anywhere, your code has a bug. Fix it before moving on.**

### Method 2 — Test Checklist (Copy This for Every Exercise)

At the top of every exercise file, add this comment block:

```javascript
/*
 * EXERCISE: Hour 1-2 — Patient Registry
 * NAME: [Your Name]
 * DATE: [Today's Date]
 *
 * TEST CHECKLIST:
 * [ ] registerPatient creates a patient with auto-incremented ID
 * [ ] registerPatient adds patient to the array
 * [ ] findPatientByPhone returns correct patient
 * [ ] findPatientByPhone returns "Not found" for unknown phone
 * [ ] listActivePatients only returns active patients
 * [ ] deactivatePatient changes isActive to false
 * [ ] All functions handle edge cases (empty input, wrong type)
 * [ ] Code runs without errors: node index.js
 */
```

Check off each box as you verify it works. **Don't move to the next exercise until ALL boxes are checked.**

### Method 3 — Break It on Purpose (Debugging Practice)

After your code works, try to break it:

```javascript
// Does it crash with bad input?
registerPatient("", -5, "not-a-phone", "Z+");

// Does it handle null/undefined?
findPatientByPhone(null);
findPatientByPhone(undefined);

// Does it handle empty arrays?
const stats = getPatientStats(); // when there are 0 patients

// Does it handle duplicate data?
registerPatient("Rahul", 32, "9876543210", "O+");
registerPatient("Rahul", 32, "9876543210", "O+"); // same patient twice
```

If your code crashes, that's a bug you need to fix. In a real hospital system, bad data WILL come in — your code must handle it gracefully.

---

## How to Review Each Other's Code

At the end of Day 3 (Hour 23), you'll review someone else's code. Here's how:

### Step 1 — Switch to Their Branch
```bash
# First, save your own work
git add .
git commit -m "my work is done"
git push

# Now switch to the other person's branch
git fetch origin
git checkout sanjay    # replace with the person you're reviewing
```

### Step 2 — Run Their Code
```bash
cd day3-mini-ayurvena
npm install
npx ts-node src/index.ts
```

Does it run? Does it show the expected output? Write down what you see.

### Step 3 — Read Their Code File by File

Open the project in VS Code. Go through each file and check:

### Code Review Checklist

Give a score of 0 (not done), 1 (partially done), or 2 (fully done) for each item:

```
REVIEWER: ____________     REVIEWING: ____________'s code

DOES IT WORK?
[ /2 ] Code runs without errors (node/ts-node)
[ /2 ] All test cases pass
[ /2 ] Edge cases handled (null, empty, wrong input)
[ /2 ] No crashes with bad data

CODE QUALITY
[ /2 ] Variable names are clear (patient not p, doctorName not dn)
[ /2 ] Functions do ONE thing (not 50-line functions that do everything)
[ /2 ] No duplicate code (if same logic appears twice, it should be a function)
[ /2 ] Files are organized correctly (models/, services/, utils/)
[ /2 ] Each file has the test checklist comment at the top

JAVASCRIPT SPECIFIC (Day 1)
[ /2 ] Uses const/let, not var
[ /2 ] Uses === not ==
[ /2 ] Uses arrow functions where appropriate
[ /2 ] Uses array methods (map, filter, find, reduce) not for-loops for everything
[ /2 ] Uses async/await not .then() chains
[ /2 ] Uses destructuring where it makes code cleaner
[ /2 ] Error handling with try/catch

TYPESCRIPT SPECIFIC (Day 2-3)
[ /2 ] No 'any' type anywhere
[ /2 ] All functions have parameter types AND return types
[ /2 ] Interfaces defined for all data structures
[ /2 ] Uses enums or type aliases for fixed values (blood groups, status)
[ /2 ] Uses Omit/Partial/Pick for DTOs
[ /2 ] Code compiles: npx tsc --noEmit shows ZERO errors

TOTAL: ___/52

COMMENTS (be specific — line numbers and file names):
What they did well:
1.
2.
3.

What they should improve:
1.
2.
3.
```

### Step 4 — Go Back to Your Branch
```bash
git checkout your-name
```

### How to Give Good Feedback

**Bad feedback:** "Your code is bad" or "This is wrong"
**Good feedback:** "In PatientService.ts line 23, the findById function doesn't handle the case where the patient doesn't exist. It should return undefined instead of crashing. Try adding an if-check."

**Bad feedback:** "Nice code"
**Good feedback:** "I liked how you used a generic BaseService in BaseService.ts — it made all other services much shorter. I'm going to use this pattern too."

Be specific. Mention the file name and line number. Say what the problem is AND how to fix it.

---

## Commit Schedule (When to Save and Push)

Follow this EXACTLY. Don't wait until end of day to push.

### Day 1 — JavaScript

| When | Git commands | Commit message |
|------|-------------|----------------|
| After Hour 1–2 | `git add . && git commit -m "day1: hour 1-2 patient registry" && git push` | day1: hour 1-2 patient registry |
| After Hour 3–4 | `git add . && git commit -m "day1: hour 3-4 doctor schedule" && git push` | day1: hour 3-4 doctor schedule |
| After Hour 5–6 | `git add . && git commit -m "day1: hour 5-6 async api simulator" && git push` | day1: hour 5-6 async api simulator |
| After Hour 7–8 | `git add . && git commit -m "day1: hour 7-8 classes and modules" && git push` | day1: hour 7-8 classes and modules |

### Day 2 — TypeScript

| When | Git commands | Commit message |
|------|-------------|----------------|
| After Hour 9–10 | `git add . && git commit -m "day2: hour 9-10 typescript basics" && git push` | day2: hour 9-10 typescript basics |
| After Hour 11–12 | `git add . && git commit -m "day2: hour 11-12 generics and utility types" && git push` | day2: hour 11-12 generics and utility types |
| After Hour 13–14 | `git add . && git commit -m "day2: hour 13-14 advanced patterns" && git push` | day2: hour 13-14 advanced patterns |
| After Hour 15–16 | `git add . && git commit -m "day2: hour 15-16 ayurvena types" && git push` | day2: hour 15-16 ayurvena types |

### Day 3 — Mini Ayurvena

| When | Git commands | Commit message |
|------|-------------|----------------|
| After Hour 17–18 | `git add . && git commit -m "day3: hour 17-18 mini ayurvena core" && git push` | day3: hour 17-18 mini ayurvena core |
| After Hour 19–20 | `git add . && git commit -m "day3: hour 19-20 mini ayurvena complete" && git push` | day3: hour 19-20 mini ayurvena complete |
| After Hour 21–22 | `git add . && git commit -m "day3: hour 21-22 advanced features" && git push` | day3: hour 21-22 advanced features |
| After review | `git add . && git commit -m "day3: final cleanup after review" && git push` | day3: final cleanup after review |

---

## Manager's View — How to Check Everyone's Progress

The manager can check progress anytime on GitHub:

1. Go to the repo on GitHub
2. Click **Branches** dropdown
3. Select each person's branch
4. Check their latest commits — are they on schedule?
5. Click into files to read their code

Or from terminal:
```bash
# See all branches and latest commit on each
git fetch --all
git branch -r -v

# Check a specific person's latest code
git log origin/abhinaya --oneline -5
git log origin/sanjay --oneline -5
```

---

## Rules for the 24 Hours

1. **No copy-pasting from ChatGPT or the internet.** Type every line yourself. You need muscle memory, not clipboard memory.
2. **If stuck for 10 minutes** — ask your buddy, not Google. (Buddy system is below.)
3. **Every build task must run without errors.** `node index.js` or `npx ts-node index.ts` with zero errors before you commit.
4. **Everyone builds their OWN version.** Don't share code until review time on Day 3.
5. **Push after every exercise.** Manager checks GitHub to track progress.
6. **Write tests for every function.** If you can't prove it works, it doesn't count.
7. **Add the test checklist comment** at the top of every file.

## Buddy System — Who Helps Whom

If you're stuck, ask your buddy FIRST before asking the group:

| Person | Your buddy (ask them first) |
|--------|---------------------------|
| Abhinaya | Sanjay |
| Sanjay | Soumya |
| Harshitha | Sanjay |
| Manaswini | Soumya |
| Soumya | Sanjay |
| Srinitha | Abhinaya |

## Code Review Pairs — Who Reviews Whom (Day 3, Hour 23)

| Reviewer | Reviews |
|----------|---------|
| Abhinaya | Sanjay's code |
| Sanjay | Harshitha's code |
| Harshitha | Manaswini's code |
| Manaswini | Soumya's code |
| Soumya | Srinitha's code |
| Srinitha | Abhinaya's code |

---

## Pre-Bootcamp Homework (Before Day 1)

Watch the YouTube videos shared by the manager. You should come to Day 1 knowing:
- What is a variable (let, const)
- What are data types (string, number, boolean, array, object)
- How to write a function
- What is an if/else
- What is a for loop

**You don't need to be an expert. You just need to not be seeing these for the first time on Day 1.**

---
---

# DAY 1 — JavaScript (8 Hours)

---

## Hour 1–2: JS Fundamentals — Build a Patient Registry (Console App)

### Learn (15 min)
```javascript
// Variables — containers that hold values
// Think of them like labeled boxes

let patientName = "Rahul Kumar";     // let = can change later
const hospitalId = 1;                // const = cannot change (constant)
var isActive = true;                 // var = OLD way, don't use this

// Why not var? var has weird scoping rules that cause bugs.
// RULE: Always use const. Only use let if the value needs to change.

// Data types — the KINDS of values JavaScript understands
let age = 32;                        // number (no quotes)
let name = "Priya";                  // string (with quotes)
let isAdmitted = false;              // boolean (true or false)
let allergies = ["Penicillin"];      // array (list of items)
let address = null;                  // null (intentionally empty)
let middleName = undefined;          // undefined (not set yet)
let patient = {                      // object (group of related data)
    name: "Rahul",
    age: 32,
    phone: "9876543210"
};

// Template literals — embed variables inside strings
// Use backticks ` ` instead of quotes, and ${} to insert variables
let greeting = `Patient ${name} is ${age} years old`;
// Result: "Patient Priya is 32 years old"

// Without template literals (old way — messy):
let greeting2 = "Patient " + name + " is " + age + " years old";

// Comparison — checking if two things are equal
console.log(1 == "1");   // true  (loose check — JavaScript converts "1" to 1)
console.log(1 === "1");  // false (strict check — different types, so NOT equal)

// RULE: ALWAYS use === (triple equals) in our project. Never use ==.
// Why? Because == can give you unexpected results. === is predictable.
```

### Build (45 min) — Patient Registry

**What you're building:** A system to register patients, search them by phone, and list active patients. This is exactly what our Reception module will do.

```
Task: Build a console-based patient registration system

Requirements:
1. Create 5 patient objects with these fields:
   - id (number)
   - name (string)
   - age (number)
   - phone (string)
   - bloodGroup (string)
   - allergies (array of strings)
   - isActive (boolean)

   Store all 5 in an array called `patients`

2. Write a function `registerPatient(name, age, phone, bloodGroup)` that:
   - Auto-generates an id (1, 2, 3, 4... incrementing)
   - Sets isActive to true
   - Sets allergies to empty array []
   - Adds the patient to the patients array
   - Returns the new patient object

3. Write a function `findPatientByPhone(phone)` that:
   - Searches the patients array for matching phone number
   - Returns the patient object if found
   - Returns "Not found" if no match

4. Write a function `listActivePatients()` that:
   - Returns ONLY patients where isActive is true

5. Add tests at the bottom (see "How to Test Your Code" section above)
   - Test registering a patient
   - Test finding by phone (existing and non-existing)
   - Test listing active patients

6. Run it: node index.js

Bonus: Add a `deactivatePatient(id)` function that sets isActive to false
```

### Learn (15 min)
```javascript
// Array methods — the most important tools in JavaScript
// You will use these EVERY SINGLE DAY in the project

const patients = [
    { id: 1, name: "Rahul", age: 32, bloodGroup: "O+" },
    { id: 2, name: "Priya", age: 28, bloodGroup: "B+" },
    { id: 3, name: "Amit", age: 45, bloodGroup: "O+" },
];

// find — get ONE item that matches a condition
// "Give me the patient whose id is 2"
const patient = patients.find(p => p.id === 2);
// Returns: { id: 2, name: "Priya", age: 28, bloodGroup: "B+" }
// Returns undefined if nothing matches

// filter — get ALL items that match a condition
// "Give me all patients with blood group O+"
const oPositive = patients.filter(p => p.bloodGroup === "O+");
// Returns: [{ id: 1, name: "Rahul"... }, { id: 3, name: "Amit"... }]

// map — transform each item into something else
// "Give me just the names of all patients"
const names = patients.map(p => p.name);
// Returns: ["Rahul", "Priya", "Amit"]

// forEach — do something with each item (no return value)
patients.forEach(p => console.log(p.name));
// Prints: Rahul, Priya, Amit (one per line)

// some — check if ANY item matches (returns true/false)
// "Is there any patient under 18?"
const hasMinor = patients.some(p => p.age < 18);
// Returns: false

// every — check if ALL items match (returns true/false)
// "Are all patients adults?"
const allAdult = patients.every(p => p.age >= 18);
// Returns: true

// reduce — combine all items into a single value
// "What's the total of all patient ages?"
const totalAge = patients.reduce((sum, p) => sum + p.age, 0);
// Returns: 105 (32 + 28 + 45)

// sort — put items in order
const byAge = [...patients].sort((a, b) => a.age - b.age);
// Returns: youngest first. (We use [...patients] to avoid modifying the original)

// spread operator (...) — copy an array or object
const copy = [...patients];              // copy the array
const updated = { ...patient, name: "Rahul K" }; // copy object and change name
```

### Build (45 min) — Patient Search Engine

**What you're building:** Search and analytics functions — like the search bar and dashboard stats in our hospital admin panel.

```
Task: Build search and filter functions for the patient registry

Using the patients array from the previous exercise:

1. `searchPatients(query)` — search by name (case-insensitive, partial match)
   Example: searchPatients("rah") should find "Rahul"
   Example: searchPatients("RAH") should ALSO find "Rahul"
   Hint: use .filter() and .toLowerCase() and .includes()

2. `filterByBloodGroup(group)` — return all patients with that blood group
   Example: filterByBloodGroup("O+") should return 2 patients

3. `getPatientStats()` — return an object with these stats:
   {
     total: 5,              // total number of patients
     active: 4,             // number of active patients
     avgAge: 35,            // average age (total age / number of patients)
     bloodGroups: {         // count per blood group
       "O+": 2,
       "B+": 1,
       "A-": 1,
       "AB+": 1
     }
   }
   Hint: use .reduce() for the bloodGroups count

4. `sortPatients(field, order)` — sort by any field, "asc" or "desc"
   Example: sortPatients("age", "desc") → oldest first
   Example: sortPatients("name", "asc") → alphabetical
   Hint: return a NEW sorted array, don't modify the original

5. `getPatientSummary(id)` — return a formatted string:
   "Rahul Kumar | Age: 32 | Blood: O+ | Allergies: Penicillin, Dust"
   If patient has no allergies: "Rahul Kumar | Age: 32 | Blood: O+ | Allergies: None"

6. Add tests for EVERY function. At least 2 tests each.

Use: find, filter, map, reduce, sort, template literals
```

---

## Hour 3–4: Functions, Objects, Destructuring — Build a Doctor Schedule System

### Learn (15 min)
```javascript
// Destructuring — pulling values out of objects and arrays
// Instead of writing doctor.name, doctor.specialization every time:

const doctor = {
    name: "Dr. Kumar",
    specialization: "Cardiology",
    hospital: { name: "City Hospital", city: "Hyderabad" }
};

// Object destructuring — extract properties into variables
const { name, specialization } = doctor;
// Now: name = "Dr. Kumar", specialization = "Cardiology"

// Nested destructuring
const { hospital: { city } } = doctor;
// Now: city = "Hyderabad"

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Default parameters — values that are used if nothing is passed
function createAppointment(patientId, doctorId, date = new Date(), status = "scheduled") {
    return { patientId, doctorId, date, status };
}
// createAppointment(1, 5) works — date and status get default values
// createAppointment(1, 5, "2026-07-01", "confirmed") also works — overrides defaults

// Rest parameters — accept any number of arguments
function logAll(...args) {
    args.forEach(a => console.log(a));
}
logAll("a", "b", "c"); // prints all three

// Shorthand object creation — when variable name matches property name
const id = 1;
const patientName = "Rahul";
const patient = { id, patientName };
// Same as: { id: id, patientName: patientName }

// Optional chaining — safely access nested properties
// Without it: if doctor has no hospital, doctor.hospital.city CRASHES
// With it:
const city2 = doctor?.hospital?.city;
// If hospital is null/undefined, returns undefined instead of crashing

// Nullish coalescing — provide a fallback for null/undefined
const phone = patient.phone ?? "No phone";
// If patient.phone is null or undefined → uses "No phone"
// If patient.phone is "9876543210" → uses "9876543210"
// NOTE: 0 and "" are NOT null, so they won't be replaced (unlike || which replaces them)
```

### Build (45 min) — Doctor Schedule System

**What you're building:** The doctor availability and slot booking system. In Ayurvena, patients pick a doctor, see available slots, and book one.

```
Task: Build a doctor scheduling system

1. Create a `doctors` array with 3 doctors, each having:
   {
     id: 1,
     name: "Dr. Kumar",
     specialization: "Cardiology",
     hospital: "City Hospital",
     fee: 500,
     availableDays: ["Monday", "Wednesday", "Friday"],
     slots: [
       { time: "09:00", isBooked: false },
       { time: "09:30", isBooked: false },
       { time: "10:00", isBooked: false },
       { time: "10:30", isBooked: false },
       { time: "11:00", isBooked: false }
     ]
   }

2. `getAvailableDoctors(day)` — return doctors available on that day
   Use destructuring in the function.
   Example: getAvailableDoctors("Monday") → returns Dr. Kumar and Dr. Sharma

3. `getAvailableSlots(doctorId, day)` — return unbooked slots for a doctor
   Return format: [{ time: "09:00", doctor: "Dr. Kumar" }, ...]
   If doctor not available on that day, return empty array

4. `bookSlot(doctorId, time, patientName)` — book a slot
   - Find the doctor
   - Find the slot with matching time
   - If slot exists and not booked: mark as booked, return confirmation:
     { bookingId: 1, doctor: "Dr. Kumar", patient: "Rahul", time: "09:00", fee: 500 }
   - If slot already taken: return { error: "Slot not available" }
   - If doctor not found: return { error: "Doctor not found" }

5. `getDoctorEarnings(doctorId)` — calculate total from booked slots
   (count booked slots × doctor fee)

6. Test ALL functions. Include edge cases:
   - Book a slot that's already booked
   - Get slots for a doctor on a day they're not available
   - Get earnings for a doctor with 0 bookings

Use: destructuring, optional chaining, default params, spread operator
```

### Learn (15 min)
```javascript
// Higher-order functions — functions that take or return other functions
// This is a powerful pattern used heavily in our project

// A function that CREATES another function
function createFilter(field, value) {
    return function(items) {
        return items.filter(item => item[field] === value);
    };
}

// Now you can create reusable filters:
const filterCardiology = createFilter("specialization", "Cardiology");
const filterPediatrics = createFilter("specialization", "Pediatrics");

const cardiologists = filterCardiology(doctors);
const pediatricians = filterPediatrics(doctors);

// Arrow function shorthand — shorter way to write functions
const double = x => x * 2;                     // one param, one line
const add = (a, b) => a + b;                   // two params, one line
const getPatient = id => patients.find(p => p.id === id);  // one param, returns directly

// Multi-line arrow function (needs {} and return)
const getFullName = (first, last) => {
    const full = `${first} ${last}`;
    return full.trim();
};

// Method chaining — calling multiple array methods in a row
// "Get names of active patients, sorted alphabetically, as a comma-separated string"
const result = patients
    .filter(p => p.isActive)        // step 1: keep only active
    .map(p => p.name)               // step 2: extract names
    .sort()                         // step 3: sort alphabetically
    .join(", ");                    // step 4: join with commas
// Result: "Amit, Priya, Rahul"
```

### Build (45 min) — Appointment Booking Engine

**What you're building:** The core booking flow. This is the heart of Ayurvena — patient books appointment → sees confirmation.

```
Task: Combine patients + doctors into an appointment system

1. Create an `appointments` array (starts empty)

2. `bookAppointment(patientId, doctorId, date, time)` — creates appointment
   - Validate: patient exists (search patients array)
   - Validate: doctor exists (search doctors array)
   - Validate: slot is available
   - If all good: create appointment object with auto-generated ID, status "scheduled"
   - Add to appointments array
   - Return the appointment

3. `getPatientAppointments(patientId)` — return all appointments for a patient
   Include doctor name and specialization (combine data from doctors array)
   Use map to add doctor info to each appointment

4. `getDoctorAppointments(doctorId, date)` — return doctor's appointments for a date

5. `cancelAppointment(appointmentId)` — change status to "cancelled"
   Also free up the doctor's slot (set isBooked back to false)

6. `getAppointmentSummary()` — return:
   {
     total: 10,
     scheduled: 7,
     cancelled: 3,
     todayCount: 4,
     revenueTotal: 15000
   }

7. Tests:
   - Book 3 appointments
   - Cancel 1
   - Verify summary counts are correct
   - Try booking an already-booked slot (should fail)
   - Try booking with a non-existent patient (should fail)

Use: method chaining, higher-order functions, arrow functions
```

---

## Hour 5–6: Async JavaScript — Build a Hospital API Simulator

### Learn (20 min)
```javascript
// ASYNC JAVASCRIPT — the most important concept for our project
//
// Problem: In a real app, getting data takes TIME.
// When you ask a database for a patient's records, it doesn't happen instantly.
// It might take 100ms, or 500ms, or 2 seconds.
//
// JavaScript doesn't wait around. It keeps running other code while waiting.
// This is called ASYNCHRONOUS programming.

// === CALLBACKS (old way — understand it, but we won't use this) ===
function getPatient(id, callback) {
    // setTimeout simulates a database call that takes 1 second
    setTimeout(() => {
        const patient = patients.find(p => p.id === id);
        callback(patient);  // call the function that was passed in
    }, 1000);
}
// Usage: pass a function that runs AFTER the data arrives
getPatient(1, (patient) => console.log(patient));
// Problem: if you need to chain multiple calls, it gets messy ("callback hell")

// === PROMISES (better) ===
// A Promise is like a receipt. "I promise to give you the data eventually."
// It can either RESOLVE (success) or REJECT (failure).
function getPatientPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const patient = patients.find(p => p.id === id);
            if (patient) {
                resolve(patient);   // success — here's the data
            } else {
                reject(new Error("Patient not found"));  // failure
            }
        }, 1000);
    });
}
// Usage:
getPatientPromise(1)
    .then(patient => console.log(patient))   // runs on success
    .catch(err => console.log(err.message));  // runs on failure

// === ASYNC/AWAIT (best — THIS IS WHAT WE USE) ===
// async/await is just a cleaner way to write Promises
// It makes async code LOOK like normal code
async function fetchPatient(id) {
    try {
        const patient = await getPatientPromise(id);
        // "await" pauses HERE until the Promise resolves
        // then continues with the result
        console.log(patient);
    } catch (error) {
        // if the Promise rejects, we land here
        console.log(error.message);
    }
}

// RULE: In our project, ALWAYS use async/await. Never use .then() chains.

// === PROMISE.ALL — run multiple things at the same time ===
// "Fetch 3 patients at once, don't wait for each one"
async function getMultiplePatients(ids) {
    const patients = await Promise.all(
        ids.map(id => getPatientPromise(id))
    );
    return patients;  // all 3 results arrive together
}

// === REAL WORLD: fetch from an API ===
async function fetchDoctors() {
    try {
        const response = await fetch("https://api.example.com/doctors");
        const data = await response.json();  // convert response to JavaScript object
        return data;
    } catch (error) {
        console.log("Failed to fetch:", error.message);
    }
}
```

### Build (40 min) — Hospital API Simulator

**What you're building:** Simulating how our frontend will talk to the backend. Every button click on our web app will make an async API call.

```
Task: Simulate backend API calls using Promises + async/await

1. Create these fake "API" functions (each uses setTimeout with 500ms delay):

   - `fetchPatient(id)` → resolves with patient object, rejects if not found
   - `fetchDoctor(id)` → resolves with doctor object, rejects if not found
   - `fetchAppointments(patientId)` → resolves with array of appointments
   - `createAppointment(data)` → resolves with new appointment after "saving"

2. Build `getPatientDashboard(patientId)` using async/await:
   - Fetch patient data
   - Fetch their appointments
   - For each appointment, fetch the doctor details
   - Return a complete dashboard:
     {
       patient: { name, phone },
       appointments: [
         { date, time, doctor: { name, specialization }, status }
       ],
       stats: { total, upcoming, completed }
     }

3. Build `bookAndConfirm(patientId, doctorId, date, time)`:
   - Fetch patient (verify exists)
   - Fetch doctor (verify exists)
   - Check slot availability
   - Create appointment
   - Return confirmation
   - Handle ALL errors with try/catch

4. Build `getDashboardForMultiplePatients(patientIds)`:
   - Use Promise.all to fetch all dashboards in parallel
   - Return array of dashboards

5. Tests:
   - Fetch an existing patient (should work)
   - Fetch a non-existing patient (should handle error)
   - Book and confirm (happy path)
   - Book with bad data (should catch and report error)
   - Fetch multiple dashboards at once

Use: async/await, try/catch, Promise.all, error handling
```

### Learn (15 min)
```javascript
// Custom error classes — different types of errors for different problems
// In a hospital system, "patient not found" is different from "invalid phone number"
// We want to handle them differently

class NotFoundError extends Error {
    constructor(resource, id) {
        super(`${resource} with id ${id} not found`);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
        this.statusCode = 409;
    }
}

// Using custom errors
async function getPatient(id) {
    const patient = await fetchPatient(id);
    if (!patient) throw new NotFoundError("Patient", id);
    return patient;
}

async function bookAppointment(data) {
    if (!data.patientId) throw new ValidationError("Patient ID is required");
    if (!data.doctorId) throw new ValidationError("Doctor ID is required");
    // ... book it
}

// Catching specific error types
try {
    await bookAppointment({ patientId: 1 });
} catch (error) {
    if (error instanceof ValidationError) {
        console.log("Bad input:", error.message);     // show to user
    } else if (error instanceof NotFoundError) {
        console.log("Not found:", error.message);      // show to user
    } else if (error instanceof ConflictError) {
        console.log("Conflict:", error.message);       // slot taken
    } else {
        console.log("Server error:", error.message);   // log, don't show to user
    }
}
```

### Build (45 min) — Error-Safe Hospital System

**What you're building:** Proper error handling for the booking flow. In a hospital, we can't just crash if something goes wrong — we need to give clear messages.

```
Task: Add proper error handling to everything you've built

1. Create custom error classes:
   - NotFoundError (statusCode: 404) — resource doesn't exist
   - ValidationError (statusCode: 400) — bad input data
   - ConflictError (statusCode: 409) — double-booking, duplicate data
   - UnauthorizedError (statusCode: 401) — not logged in
   - PaymentError (statusCode: 402) — payment failed

2. Update `bookAppointment` with full validation:
   - No patientId → ValidationError("Patient ID is required")
   - Patient doesn't exist → NotFoundError("Patient", patientId)
   - Doctor doesn't exist → NotFoundError("Doctor", doctorId)
   - Slot already booked → ConflictError("Slot 09:00 is already booked")
   - Date is in the past → ValidationError("Cannot book appointments in the past")
   - All required fields missing → ValidationError with list of missing fields

3. Build `processPayment(appointmentId, amount, method)`:
   - Simulate: 70% success, 30% failure (use Math.random())
   - On success: return { status: "paid", transactionId: "TXN-" + Date.now() }
   - On failure: throw PaymentError("Payment declined")
   - Add retry: if first attempt fails, try ONCE more before giving up

4. Build `completeBookingFlow(patientId, doctorId, date, time, paymentMethod)`:
   - Step 1: Book appointment
   - Step 2: Process payment
   - If payment fails: automatically cancel the appointment
   - Return final result with clear status message
   - Wrap EVERYTHING in try/catch

5. Tests:
   - Happy path: book + pay + success
   - Bad patient ID: should get NotFoundError
   - Already booked slot: should get ConflictError
   - Payment failure: appointment should be cancelled
   - Run completeBookingFlow 5 times — some should succeed, some should fail

This mirrors the REAL booking flow in Ayurvena.
```

---

## Hour 7–8: Classes, Modules, Modern JS — Build a Mini Hospital Backend

### Learn (15 min)
```javascript
// Classes — blueprints for creating objects
// Think of a class like a cookie cutter — you define the shape once,
// then stamp out as many cookies (objects) as you want

class Patient {
    // Private field — can ONLY be accessed inside this class
    #medicalRecords = [];

    // Constructor — runs when you create a new Patient
    constructor(id, name, phone, bloodGroup) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.bloodGroup = bloodGroup;
        this.isActive = true;
        this.createdAt = new Date();
    }

    // Methods — functions that belong to this class
    addMedicalRecord(record) {
        this.#medicalRecords.push({ ...record, date: new Date() });
    }

    getMedicalRecords() {
        return [...this.#medicalRecords]; // return a COPY, not the original
    }

    deactivate() {
        this.isActive = false;
    }

    toString() {
        return `${this.name} | ${this.bloodGroup} | ${this.isActive ? "Active" : "Inactive"}`;
    }
}

// Creating objects from the class
const rahul = new Patient(1, "Rahul", "9876543210", "O+");
const priya = new Patient(2, "Priya", "9876543211", "B+");

rahul.addMedicalRecord({ diagnosis: "Fever", treatment: "Paracetamol" });
console.log(rahul.toString());  // "Rahul | O+ | Active"

// Inheritance — creating a specialized version of a class
class EmergencyPatient extends Patient {
    constructor(id, name, phone, bloodGroup, triageLevel) {
        super(id, name, phone, bloodGroup);  // call parent's constructor
        this.triageLevel = triageLevel;       // 1 = critical, 5 = non-urgent
        this.isEmergency = true;
    }

    escalate() {
        if (this.triageLevel > 1) this.triageLevel--;
    }
}

const emergency = new EmergencyPatient(3, "Amit", "9876543212", "A+", 3);
emergency.escalate();  // triageLevel goes from 3 to 2

// Static methods — methods on the CLASS itself, not on objects
class PatientService {
    static patients = [];

    static register(name, phone, bloodGroup) {
        const id = this.patients.length + 1;
        const patient = new Patient(id, name, phone, bloodGroup);
        this.patients.push(patient);
        return patient;
    }

    static findById(id) {
        return this.patients.find(p => p.id === id);
    }
}

// Usage: call on the class, not on an object
PatientService.register("Rahul", "9876543210", "O+");
const found = PatientService.findById(1);
```

### Build (45 min) — Object-Oriented Hospital System

**What you're building:** The same hospital system, but organized using classes. This is how NestJS structures code — classes with methods.

```
Task: Rebuild the hospital system using classes

1. Class `Patient`
   Properties: id, name, age, phone, bloodGroup, allergies[], isActive
   Methods:
   - addAllergy(allergy) — add to allergies array
   - removeAllergy(allergy) — remove from allergies array
   - getProfile() — return a clean profile object
   - deactivate() — set isActive to false

2. Class `Doctor`
   Properties: id, name, specialization, fee, schedule (object with days and slots)
   Methods:
   - isAvailable(day, time) — check if a specific slot is free
   - bookSlot(day, time) — mark a slot as booked
   - getEarnings() — total from booked slots

3. Class `Appointment`
   Properties: id, patient (Patient object), doctor (Doctor object), date, time, status, payment
   Methods:
   - cancel() — change status to "cancelled", free the doctor's slot
   - complete() — change status to "completed"
   - generateReceipt() — return a formatted receipt string

4. Class `Hospital` — the MAIN class that uses all others
   Properties: name, patients[], doctors[], appointments[]
   Methods:
   - registerPatient(data) → creates and returns a Patient
   - addDoctor(data) → creates and returns a Doctor
   - bookAppointment(patientId, doctorId, date, time) → creates Appointment
   - cancelAppointment(appointmentId) → cancels it
   - getPatientHistory(patientId) → all appointments with doctor info
   - getDoctorSchedule(doctorId, date) → day's appointments
   - getDashboard() → { totalPatients, totalDoctors, todayAppointments, revenue }

5. Test the FULL flow:
   const hospital = new Hospital("Ayurvena Hospital");
   const patient = hospital.registerPatient({ name: "Rahul", age: 32, phone: "9876543210", bloodGroup: "O+" });
   const doctor = hospital.addDoctor({ name: "Dr. Kumar", specialization: "Cardiology", fee: 500 });
   const appointment = hospital.bookAppointment(patient.id, doctor.id, "2026-07-01", "09:00");
   console.log(hospital.getDashboard());
   appointment.complete();
   console.log(hospital.getDashboard()); // revenue should update
```

### Learn (15 min)
```javascript
// Modules — splitting code into separate files
// In a real project, you don't put everything in one giant file.
// Each file does ONE thing and exports it.

// ---- file: models/Patient.js ----
export class Patient {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
// "export" makes it available to other files

// ---- file: services/PatientService.js ----
import { Patient } from '../models/Patient.js';
// "import" brings it in from another file

export class PatientService {
    static register(name) {
        return new Patient(Date.now(), name);
    }
}

// ---- file: index.js ----
import { PatientService } from './services/PatientService.js';
const patient = PatientService.register("Rahul");

// Two types of exports:
export const MAX_PATIENTS = 1000;        // named export — import { MAX_PATIENTS }
export default class Hospital { }        // default export — import Hospital (no braces)

// Map — like an object but better for key-value pairs
const patientMap = new Map();
patientMap.set(1, { name: "Rahul" });     // add
patientMap.get(1);                        // get → { name: "Rahul" }
patientMap.has(1);                        // check → true
patientMap.delete(1);                     // remove
patientMap.size;                          // count

// Set — like an array but no duplicates
const bloodGroups = new Set(["O+", "B+", "O+", "A-"]);
// Set has 3 items: "O+", "B+", "A-" (duplicate "O+" removed)
bloodGroups.add("AB+");
bloodGroups.has("O+");  // true
```

### Build (45 min) — Modular Hospital System

**What you're building:** Splitting everything into separate files. This is how EVERY professional project is organized — and exactly how our NestJS backend will look.

```
Task: Split the Hospital class system into separate files

Create this folder structure:
hospital-practice/
├── models/
│   ├── Patient.js
│   ├── Doctor.js
│   └── Appointment.js
├── services/
│   ├── PatientService.js      — register, search, find, update
│   ├── DoctorService.js       — add, search, getAvailable
│   ├── AppointmentService.js  — book, cancel, getHistory
│   └── DashboardService.js    — stats, revenue, counts
├── utils/
│   ├── errors.js              — NotFoundError, ValidationError, etc.
│   └── validators.js          — validatePhone, validateDate, validateEmail
├── data/
│   └── seed.js                — generate 20 patients, 5 doctors, 10 appointments
└── index.js                   — import everything, run the full demo

Requirements:
1. Each file exports ONE class or set of related functions
2. index.js imports from all files and wires everything together
3. seed.js creates realistic data:
   - 20 patients with Indian names, random ages, phone numbers, blood groups
   - 5 doctors with different specializations
   - 10 appointments (some scheduled, some completed, some cancelled)
4. validators.js has:
   - validatePhone(phone) — must be 10 digits
   - validateDate(date) — must be a valid date string
   - validateEmail(email) — must have @ and .
   - Each returns { valid: true } or { valid: false, error: "message" }
5. Run the full flow in index.js:
   - Seed data
   - Register a new patient
   - Book an appointment
   - Process payment
   - View dashboard
   - All with error handling

6. To run with modules, add this to package.json:
   "type": "module"
   Then run: node index.js

This folder structure mirrors EXACTLY what we'll use in NestJS.
```

**After Hour 8: Commit and push!**
```bash
git add .
git commit -m "day1: complete - all JS exercises done"
git push
```

---
---

# DAY 2 — TypeScript (8 Hours)

**Before starting:** Set up TypeScript in a new folder:
```bash
mkdir day2-typescript
cd day2-typescript
npm init -y
npm install typescript ts-node @types/node
npx tsc --init
```

---

## Hour 9–10: TypeScript Basics — Convert the Hospital System

### Learn (20 min)
```typescript
// TypeScript = JavaScript + Types
//
// JavaScript: you can put anything anywhere. No rules.
//   let age = 32;
//   age = "thirty";  // JS says: sure, whatever
//   age = [1,2,3];   // JS says: fine by me
//   // Then your app crashes at 3am and you don't know why.
//
// TypeScript: you declare what TYPE each thing should be.
//   let age: number = 32;
//   age = "thirty";  // TS says: ❌ ERROR. This is a number, not a string.
//   // Bug caught BEFORE you even run the code.
//
// That's it. That's the whole idea. Everything else is details.

// Basic types
let patientName: string = "Rahul";
let age: number = 32;
let isActive: boolean = true;
let allergies: string[] = ["Penicillin", "Dust"];
let id: number | null = null;  // "union type" — can be a number OR null

// TypeScript catches mistakes:
patientName = 123;       // ❌ Type 'number' is not assignable to type 'string'
age = "thirty";          // ❌ Type 'string' is not assignable to type 'number'
allergies.push(42);      // ❌ Argument of type 'number' is not assignable to type 'string'

// Interfaces — define the SHAPE of an object
// "A Patient must have these fields, with these types"
interface Patient {
    id: number;
    name: string;
    age: number;
    phone: string;
    bloodGroup: string;
    allergies: string[];
    isActive: boolean;
    createdAt: Date;
}

// Now TypeScript ENFORCES the shape:
const patient: Patient = {
    id: 1,
    name: "Rahul",
    age: 32,
    phone: "9876543210",
    bloodGroup: "O+",
    allergies: ["Penicillin"],
    isActive: true,
    createdAt: new Date()
};
// ✅ All fields present, all types correct

// This will ERROR:
const bad: Patient = { name: "Rahul" };
// ❌ Missing: id, age, phone, bloodGroup, allergies, isActive, createdAt

// Optional fields — add ? to make a field optional
interface Doctor {
    id: number;
    name: string;
    specialization: string;
    fee: number;
    bio?: string;        // optional — doesn't NEED to be there
    rating?: number;     // optional
}

const doctor: Doctor = { id: 1, name: "Dr. Kumar", specialization: "Cardiology", fee: 500 };
// ✅ Works even though bio and rating are missing

// Function types — what goes IN and what comes OUT
function findPatient(id: number): Patient | undefined {
    return patients.find(p => p.id === id);
}
// This function takes a number, and returns either a Patient or undefined

// Arrow function with types
const getFullName = (first: string, last: string): string => {
    return `${first} ${last}`;
};

// Array of typed objects
const patients: Patient[] = [];

// THIS IS WHY TYPESCRIPT MATTERS:
// JavaScript: patient.naame → no error, returns undefined, breaks something later
// TypeScript: patient.naame → ❌ INSTANT ERROR: Property 'naame' does not exist on type 'Patient'. Did you mean 'name'?
// The bug is caught BEFORE your code runs. Not at 3am in production.
```

### Build (40 min) — Convert Patient System to TypeScript
```
Task: Take the Patient class from Day 1 and rewrite in TypeScript

1. Create interfaces (define the shapes):
   - IPatient { id: number, name: string, age: number, phone: string, bloodGroup: string,
                allergies: string[], isActive: boolean, createdAt: Date }
   - IDoctor { id: number, name: string, specialization: string, fee: number,
               availableDays: string[], slots: ISlot[] }
   - IAppointment { id: number, patientId: number, doctorId: number, date: string,
                    time: string, status: string, payment?: IPayment }
   - ISlot { time: string, isBooked: boolean }
   - IPayment { amount: number, method: string, transactionId: string, status: string, paidAt: Date }

2. Convert the Patient class — every property and method must be typed:
   class Patient implements IPatient {
       id: number;
       name: string;
       // ... all properties with types
       constructor(id: number, name: string, ...) { ... }
       addAllergy(allergy: string): void { ... }
       getProfile(): IPatient { ... }
   }

3. Convert PatientService — all methods typed:
   register(data: Omit<IPatient, 'id' | 'createdAt' | 'isActive'>): Patient
   findById(id: number): Patient | undefined
   search(query: string): Patient[]

4. Verify TypeScript catches these mistakes — try them and see the errors:
   patient.naame               // ❌ typo in property name
   registerPatient({ name: "Rahul" })  // ❌ missing required fields
   patient.age = "thirty"      // ❌ wrong type

5. Run: npx ts-node index.ts
   Check: npx tsc --noEmit (should show 0 errors)
```

### Learn (15 min)
```typescript
// Type aliases — create your own custom types
// "A BloodGroup can ONLY be one of these 8 values"
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show";
type PaymentMethod = "cash" | "card" | "upi" | "insurance";

// Now TypeScript enforces ONLY these values:
let bg: BloodGroup = "O+";     // ✅ Valid
let bg2: BloodGroup = "X+";    // ❌ Type '"X+"' is not assignable to type 'BloodGroup'

let status: AppointmentStatus = "scheduled";  // ✅
let status2: AppointmentStatus = "pending";   // ❌ "pending" is not in the list

// This prevents bugs like: someone types "Completed" instead of "completed"
// or "schedled" (typo) — TypeScript catches it instantly.

// Enums — a named group of constants
// Good for things with a fixed number of options
enum TriageLevel {
    CRITICAL = 1,
    EMERGENCY = 2,
    URGENT = 3,
    LESS_URGENT = 4,
    NON_URGENT = 5
}

enum UserRole {
    PATIENT = "patient",
    DOCTOR = "doctor",
    RECEPTIONIST = "receptionist",
    ADMIN = "admin",
    SUPER_ADMIN = "super_admin"
}

// Usage:
const level = TriageLevel.CRITICAL;  // value is 1
const role = UserRole.DOCTOR;        // value is "doctor"

// In an interface:
interface EmergencyCase {
    patientId: number;
    triageLevel: TriageLevel;
    assignedDoctor?: number;
    status: "active" | "admitted" | "discharged";
}

const emergency: EmergencyCase = {
    patientId: 1,
    triageLevel: TriageLevel.CRITICAL,  // must be a TriageLevel value
    status: "active"
};
```

### Build (45 min) — Typed Hospital Enums & Models
```
Task: Add strict typing to the entire hospital system

1. Create type aliases:
   - BloodGroup — the 8 blood groups
   - AppointmentStatus — scheduled, completed, cancelled, no-show
   - PaymentMethod — cash, card, upi, insurance
   - PaymentStatus — pending, paid, failed, refunded
   - Gender — male, female, other

2. Create enums:
   - UserRole — patient, doctor, receptionist, nurse, admin, superAdmin
   - Department — cardiology, neurology, orthopedics, pediatrics, general, emergency, icu
   - TriageLevel — 1 through 5

3. Update ALL your interfaces to use these types:
   - IPatient.bloodGroup should be BloodGroup (not string)
   - IPatient.gender should be Gender
   - IAppointment.status should be AppointmentStatus
   - IDoctor.department should be Department
   - IPayment.method should be PaymentMethod

4. Test that TypeScript now catches these mistakes:
   new Patient({ bloodGroup: "X+" })    // ❌ Not a valid BloodGroup
   appointment.status = "waiting"        // ❌ Not a valid AppointmentStatus
   doctor.department = "cardio"          // ❌ Must be "cardiology"
   payment.method = "bitcoin"            // ❌ Not a valid PaymentMethod

This is EXACTLY how we define types in the real Ayurvena project.
```

---

## Hour 11–12: Generics, Utility Types — Build a Type-Safe API Layer

### Learn (20 min)
```typescript
// GENERICS — the most powerful TypeScript feature
// "Write a function that works with ANY type"
//
// Problem: you want a findById function that works for patients, doctors,
// appointments — any type that has an id. Without generics, you'd write
// three separate functions. With generics, you write ONE.

// <T> is a placeholder for "some type I'll tell you later"
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}

// When you call it, T becomes the specific type:
const patient = findById<Patient>(patients, 1);   // T = Patient
const doctor = findById<Doctor>(doctors, 3);       // T = Doctor
// TypeScript knows `patient` is a Patient and `doctor` is a Doctor

// Generic interfaces — we use these for ALL API responses in Ayurvena
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    timestamp: Date;
}

interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Usage — T becomes whatever you need:
type PatientResponse = ApiResponse<Patient>;
// { success: boolean, data: Patient, message: string, timestamp: Date }

type DoctorListResponse = PaginatedResponse<Doctor>;
// { success: boolean, data: Doctor[], pagination: { page, limit, total, totalPages } }

// UTILITY TYPES — transform existing types without rewriting them
interface Patient {
    id: number;
    name: string;
    age: number;
    phone: string;
    bloodGroup: BloodGroup;
}

// Partial<T> — makes ALL fields optional
type UpdatePatient = Partial<Patient>;
// { id?: number, name?: string, age?: number, phone?: string, bloodGroup?: BloodGroup }
// Useful for: update operations (change only the fields you want)

// Pick<T, Keys> — select ONLY specific fields
type PatientPreview = Pick<Patient, "id" | "name" | "bloodGroup">;
// { id: number, name: string, bloodGroup: BloodGroup }
// Useful for: list views (show only name and blood group, not everything)

// Omit<T, Keys> — remove specific fields
type CreatePatient = Omit<Patient, "id">;
// { name: string, age: number, phone: string, bloodGroup: BloodGroup }
// Useful for: create operations (id is auto-generated, so don't include it)

// Required<T> — makes ALL fields required (opposite of Partial)
type CompletePatient = Required<Patient>;

// Record<Keys, Value> — create a type with specific keys
type DepartmentCount = Record<Department, number>;
// { cardiology: number, neurology: number, orthopedics: number, ... }

// Readonly<T> — can't change any field after creation
type FrozenPatient = Readonly<Patient>;
const p: FrozenPatient = { id: 1, name: "Rahul", age: 32, phone: "123", bloodGroup: "O+" };
p.name = "New"; // ❌ Cannot assign to 'name' because it is a read-only property
```

### Build (40 min) — Type-Safe API Response System
```
Task: Build a generic API layer — this is the EXACT pattern used in Ayurvena's backend

1. Create generic response types:
   - ApiResponse<T> { success: boolean, data: T, message: string, statusCode: number }
   - ApiError { success: false, error: string, message: string, statusCode: number }
   - PaginatedResponse<T> { success: boolean, data: T[], pagination: { page, limit, total, totalPages } }

2. Create helper functions:
   - successResponse<T>(data: T, message?: string): ApiResponse<T>
   - errorResponse(statusCode: number, message: string): ApiError
   - paginatedResponse<T>(data: T[], page: number, limit: number, total: number): PaginatedResponse<T>

3. Create DTO types using utility types:
   - CreatePatientDto = Omit<IPatient, 'id' | 'createdAt' | 'isActive'>
   - UpdatePatientDto = Partial<CreatePatientDto>
   - PatientPreview = Pick<IPatient, 'id' | 'name' | 'bloodGroup' | 'phone'>
   - CreateAppointmentDto = Omit<IAppointment, 'id' | 'status' | 'payment'>
   - DoctorWithAppointments = IDoctor & { appointments: IAppointment[] }

4. Build typed service functions:
   - getPatients(page: number, limit: number): PaginatedResponse<PatientPreview>
   - getPatientById(id: number): ApiResponse<IPatient>
   - createPatient(data: CreatePatientDto): ApiResponse<IPatient>
   - updatePatient(id: number, data: UpdatePatientDto): ApiResponse<IPatient>
   - deletePatient(id: number): ApiResponse<{ deleted: boolean }>

5. Test that TypeScript prevents:
   - Passing wrong field names
   - Passing wrong types
   - Accessing fields that don't exist on the response

Run: npx ts-node index.ts
Check: npx tsc --noEmit (zero errors)
```

### Learn (15 min)
```typescript
// Async + TypeScript — return types for async functions
async function fetchPatient(id: number): Promise<Patient> {
    const response = await fetch(`/api/patients/${id}`);
    if (!response.ok) throw new Error("Patient not found");
    const data: Patient = await response.json();
    return data;
}
// Return type is Promise<Patient> — it will eventually give you a Patient

// Type guards — check the type at runtime
function isPatient(obj: any): obj is Patient {
    return obj && typeof obj.name === "string" && typeof obj.bloodGroup === "string";
}

if (isPatient(unknownData)) {
    console.log(unknownData.bloodGroup); // TypeScript knows it's a Patient here
}

// Discriminated unions — different shapes based on a "type" field
interface SuccessResult {
    type: "success";
    data: Patient;
}

interface ErrorResult {
    type: "error";
    message: string;
    statusCode: number;
}

type Result = SuccessResult | ErrorResult;

function handleResult(result: Result) {
    if (result.type === "success") {
        // TypeScript KNOWS result.data exists here
        console.log(result.data.name);
    } else {
        // TypeScript KNOWS result.message exists here
        console.log(result.message);
    }
}
// This pattern is used everywhere in our project for handling success/failure.
```

### Build (45 min) — Complete Typed Booking Flow
```
Task: Build the full booking flow with type safety

1. Define discriminated union for booking results:
   - BookingSuccess { type: "success", appointment: IAppointment, payment: IPayment, receipt: string }
   - BookingSlotUnavailable { type: "slot_unavailable", doctor: string, suggestedSlots: string[] }
   - BookingPaymentFailed { type: "payment_failed", appointment: IAppointment, error: string, retryable: boolean }
   - BookingValidationError { type: "validation_error", errors: { field: string, message: string }[] }

   type BookingResult = BookingSuccess | BookingSlotUnavailable | BookingPaymentFailed | BookingValidationError

2. Build: async function bookAppointmentFlow(data: CreateAppointmentDto): Promise<BookingResult>
   - Validate input → return validation_error if bad
   - Check slot → return slot_unavailable with alternatives if taken
   - Create appointment → process payment → return success or payment_failed

3. Build: function handleBookingResult(result: BookingResult): string
   - "success" → "Booking confirmed! Appointment #5 with Dr. Kumar at 09:00"
   - "slot_unavailable" → "Slot taken. Try: 10:00, 10:30, 11:00"
   - "payment_failed" → "Payment failed. Retrying..." or "Contact support."
   - "validation_error" → "Fix these: name is required, phone is invalid"

4. TypeScript should guarantee:
   - You MUST handle all 4 cases (if you forget one, you get an error)
   - You CAN'T access .appointment on a validation_error
   - You CAN'T access .errors on a success result

5. Test all 4 scenarios.
```

---

## Hour 13–14: Interfaces vs Types, Advanced Patterns — Build Hospital Module System

### Learn (15 min)
```typescript
// Interface vs Type — when to use which

// INTERFACE — for objects/classes. Can be extended.
interface IBaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface IPatient extends IBaseEntity {
    name: string;
    phone: string;
    bloodGroup: BloodGroup;
}
// IPatient now has: id, createdAt, updatedAt, name, phone, bloodGroup

// TYPE — for unions, intersections, computed types
type CreateDto<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateDto<T> = Partial<CreateDto<T>>;

type CreatePatientDto = CreateDto<IPatient>;
// { name: string, phone: string, bloodGroup: BloodGroup }

type UpdatePatientDto = UpdateDto<IPatient>;
// { name?: string, phone?: string, bloodGroup?: BloodGroup }

// RULE OF THUMB:
// Use INTERFACE for models/entities (Patient, Doctor, Appointment)
// Use TYPE for everything else (DTOs, responses, unions)
```

### Build (45 min) — Generic Hospital Module System
```
Task: Build a reusable, type-safe module system

1. Create base interfaces:
   - IBaseEntity { id: number, createdAt: Date, updatedAt: Date }

2. Build a generic BaseService class:
   class BaseService<T extends IBaseEntity> {
       protected items: T[] = [];
       create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T
       findById(id: number): T | undefined
       findAll(filter?: Partial<T>): T[]
       update(id: number, data: Partial<T>): T
       delete(id: number): boolean
   }

3. Extend it for specific modules:
   class PatientService extends BaseService<IPatient> { ... }
   class DoctorService extends BaseService<IDoctor> { ... }
   class AppointmentService extends BaseService<IAppointment> { ... }

4. Build Hospital class that uses all services
5. Add a Validator utility with type guards

6. The flow should be:
   Input (unknown) → Validate → DTO (typed) → Service → Entity → Response (typed)

This is EXACTLY how NestJS works.
```

### Build continued (45 min) — Validation Layer
```
Task: Add validation with type guards

1. Validator class with static methods:
   - isPhone(phone: string): boolean — 10-digit Indian number
   - isEmail(email: string): boolean
   - isFutureDate(date: string): boolean
   - isBloodGroup(bg: string): bg is BloodGroup — type guard!

2. Validated DTO functions:
   - validateCreatePatient(data: unknown): CreatePatientDto | ValidationError[]
   - validateCreateAppointment(data: unknown): CreateAppointmentDto | ValidationError[]

3. Services validate before creating. Tests prove invalid data is rejected.
```

---

## Hour 15–16: Build the Ayurvena Type System

### Build (2 hours) — The REAL Type Definitions for Our Project
```
Task: Create the actual types we'll use in Ayurvena

Create: types/enums.ts, types/models.ts, types/dtos.ts, types/responses.ts

Include:
- ALL enums (UserRole, Department, AppointmentStatus, PaymentStatus, etc.)
- ALL model interfaces (IUser, IPatient, IDoctor, IAppointment, IConsultation,
  IPrescription, IPayment, IAdmission, ILabOrder, etc.)
- ALL DTO types using Omit/Partial/Pick
- ALL response types using generics
- Dashboard types (IAdminDashboard, IDoctorDashboard, IReceptionDashboard)

This file becomes the SINGLE SOURCE OF TRUTH for the entire project.
```

**After Hour 16: Commit and push!**
```bash
git add .
git commit -m "day2: complete - all TypeScript exercises done"
git push
```

---
---

# DAY 3 — Build Mini Ayurvena (8 Hours)

**Setup:**
```bash
mkdir day3-mini-ayurvena
cd day3-mini-ayurvena
npm init -y
npm install typescript ts-node @types/node
npx tsc --init
mkdir -p src/types src/models src/services src/utils src/data
```

---

## Hour 17–20: Build the Complete System (4 Hours)

```
Task: Combine EVERYTHING from Day 1 + Day 2 into one TypeScript project

Project structure:
src/
├── types/          — enums, interfaces, DTOs, response types
├── models/         — Patient, Doctor, Appointment classes
├── services/       — PatientService, DoctorService, AppointmentService, PaymentService,
│                     QueueService, DashboardService (all extending BaseService)
├── utils/          — errors, validators, helpers
├── data/           — seed data generator
└── index.ts        — main demo

Rules:
1. ALL TypeScript strict mode, ZERO `any` types
2. Every function has parameter types AND return types
3. Every class implements an interface
4. Error handling with custom typed errors
5. Generic BaseService used by all services
6. Utility types for all DTOs

index.ts demo should run this flow:
1. Seed 20 patients, 5 doctors, 3 departments
2. Register a new patient
3. Search for a cardiologist
4. Book appointment → process payment → get confirmation
5. Start consultation → add diagnosis → write prescription
6. Generate queue with 5 patients → advance queue
7. Print admin dashboard with stats
8. Print doctor dashboard
9. Cancel an appointment → process refund
10. ALL with error handling and typed responses
```

## Hour 21–22: Advanced Features (2 Hours)

```
Task: Add these to mini-ayurvena

1. Event system (simulates WebSocket events):
   - "appointment:booked" → updates queue
   - "payment:completed" → confirms booking
   - "queue:advanced" → notifies next patient

2. Audit logger — logs every action with who/what/when

3. Multi-hospital support:
   - Add hospitalId to every entity
   - Hospital A cannot see Hospital B's data
   - Prove it with a test
```

## Hour 23: Peer Code Review (1 Hour)

```bash
# Save your work first
git add .
git commit -m "day3: mini-ayurvena complete"
git push

# Switch to the person you're reviewing
git fetch origin
git checkout sanjay  # (or whoever you're reviewing)

# Run their code
cd day3-mini-ayurvena
npm install
npx ts-node src/index.ts

# Check for TypeScript errors
npx tsc --noEmit
```

**Use the Code Review Checklist from the "How to Review Each Other's Code" section above.**

**After reviewing, go back to your branch:**
```bash
git checkout your-name
```

## Hour 24: Quiz (1 Hour)

**Everyone answers. Manager grades. Discuss answers together.**

```
Q1:  What's the difference between let, const, and var?

Q2:  What does this return?
     const result = [1,2,3,4,5].filter(n => n > 2).map(n => n * 10);

Q3:  Write an interface for a Lab Test Result with:
     - test name, patient id, values (array of { parameter, value, unit, normalRange })
     - status (pending/completed/cancelled)
     - reportUrl (optional)

Q4:  What's wrong with this code?
     async function getPatient(id: number) {
         const patient = await db.findPatient(id);
         return patient.name;
     }

Q5:  Convert this JavaScript to TypeScript with proper types:
     function processPayment(amount, method, appointmentId) {
         if (amount <= 0) throw new Error("Invalid amount");
         return {
             transactionId: "TXN-" + Date.now(),
             amount, method,
             status: "paid",
             appointmentId,
             paidAt: new Date()
         };
     }

Q6:  What's the difference between `interface` and `type`? When to use which?

Q7:  Write a generic function `paginate<T>(items: T[], page: number, limit: number)`
     that returns { data: T[], pagination: { page, limit, total, totalPages } }

Q8:  What does `Omit<Patient, 'id' | 'createdAt'>` give you? Why is it useful?

Q9:  What's the output?
     const a = [1, 2, 3];
     const b = [...a];
     b.push(4);
     console.log(a.length, b.length);

Q10: Write the type signature for: a function that takes a patient ID (number)
     and returns a Promise that resolves with either a Patient object or null.
```

---

## Final Commit
```bash
git add .
git commit -m "day3: bootcamp complete - all exercises, review, and quiz done"
git push
```

---
---

# After the 24 Hours

## What Everyone Can Do Now

| Skill | Before bootcamp | After bootcamp |
|-------|:-:|:-:|
| JavaScript variables, arrays, objects | Some knew | Everyone confident |
| Array methods (map, filter, reduce, find) | Few knew | Everyone uses comfortably |
| Async/await + Promises | Most didn't know | Everyone can write async code |
| Classes + modules | Basic at best | Everyone can structure a project |
| Error handling (try/catch, custom errors) | Basic | Proper typed error handling |
| TypeScript types + interfaces | Nobody knew | Everyone writes typed code |
| Generics | Nobody knew | Everyone understands and uses them |
| Utility types (Partial, Omit, Pick) | Nobody knew | Everyone uses for DTOs |
| Project structure | Random | Everyone follows the same pattern |
| Git workflow | Some knew basics | Everyone branches, commits, pushes |
| Code review | Never done | Everyone has reviewed real code |
| Testing | Rarely tested | Everyone writes tests for their functions |

## What's Next

This bootcamp covered the **language** (JavaScript + TypeScript). Next you'll learn the **frameworks**:

| Bootcamp | Who | What you'll learn |
|----------|-----|-------------------|
| **Backend Bootcamp (24 hrs)** | Abhinaya, Harshitha, Srinitha | NestJS, Prisma, PostgreSQL, Redis, REST APIs |
| **Frontend Bootcamp (24 hrs)** | Sanjay, Soumya, Manaswini | Next.js, React, Tailwind, shadcn/ui, Framer Motion |

Then we start building the real Ayurvena.

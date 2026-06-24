# Ayurvena -- 24-Hour Backend Bootcamp

> **Read this FULLY before you start coding. Every section builds on the one before it.
> If you skip ahead, you WILL get stuck. Go in order. Read the explanations.
> Type every line of code yourself -- do NOT copy-paste without understanding what it does.
> If something breaks, that is normal. Debugging is where real learning happens.**

---

## What Is This Bootcamp?

You just finished the JavaScript/TypeScript bootcamp where you built a console-based hospital system. You now understand variables, functions, types, interfaces, classes, and basic logic. Good -- that was the foundation.

Now you need the **real backend skills**. This bootcamp teaches you **NestJS** (the framework that organizes your backend code), **PostgreSQL** (the database that stores all your data permanently), **Prisma** (the tool that lets you talk to your database using TypeScript instead of raw SQL), **Redis** (the super-fast in-memory store for caching and real-time features), and **REST APIs** (the way your frontend talks to your backend).

By the end of these 24 hours, you will have built real, working backend APIs for the Ayurvena Hospital Operating System -- the same project you will be contributing to in production.

---

## Format

- **3 Days x 8 Hours = 24 Hours Total**
- Each hour has a **LEARN** section (15-20 minutes of reading and understanding) followed by a **BUILD** task (40-45 minutes of hands-on coding)
- All examples are hospital/medical themed
- You commit your work to Git after every single exercise

---

## Who Is This For?

| Name | Role | Focus Area |
|------|------|------------|
| **Abhinaya** | Database Lead | Owns all database design, migrations, schema decisions |
| **Harshitha** | Module APIs | Owns all NestJS modules, controllers, services, route logic |
| **Srinitha** | QA + Backend Support | Owns all testing, validation, error handling, helps both teams |

Even though you each have a focus area, **everyone completes every exercise**. You all need to understand the full stack. Your focus area just means you go deeper on that topic and become the team expert others come to for help.

---

## What You Will Build

By the end of this bootcamp, you will have:
- A PostgreSQL database with 10+ related tables modeling a real hospital
- A NestJS backend with modules for patients, doctors, appointments, billing, and more
- Prisma ORM integration connecting your TypeScript code to your database
- Redis caching for fast data retrieval
- Full REST API endpoints that can be tested with Postman
- Automated tests covering your API logic

---

## Prerequisites and Setup

### What You Need Installed

You need six tools on your machine. If you already have some from the JS bootcamp, verify they work and move on.

---

### 1. Node.js (You Already Have This)

You installed Node.js during the JavaScript bootcamp. Verify it still works:

```bash
# Open your terminal (PowerShell or Command Prompt) and run:
node --version
# You should see something like: v20.x.x or v22.x.x

npm --version
# You should see something like: 10.x.x
```

If these commands fail, re-download Node.js from https://nodejs.org (use the LTS version).

---

### 2. PostgreSQL

PostgreSQL is the database where all your hospital data lives. Think of it as a permanent, organized storage system that survives even if your app crashes or your computer restarts.

**Step-by-step installation on Windows:**

```
1. Go to https://www.postgresql.org/download/windows/
2. Click "Download the installer" (from EDB)
3. Download the latest version (PostgreSQL 16 or 17)
4. Run the installer:
   a. Click Next through the welcome screen
   b. Leave the installation directory as default
   c. Select all components (PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tools)
   d. Leave the data directory as default
   e. SET THE PASSWORD TO: postgres
      (Remember this! You will use it every time you connect to the database)
   f. Leave the port as 5432 (this is the default)
   g. Leave the locale as default
   h. Click Next and then Install
   i. Uncheck "Launch Stack Builder" at the end -- you do not need it
5. Click Finish
```

**Verify PostgreSQL is installed:**

```bash
# Open a NEW terminal window (important -- old terminals will not have the new PATH)
psql -U postgres
# It will ask for your password. Type: postgres
# You should see something like:
#   psql (16.x)
#   Type "help" for help.
#   postgres=#

# If you see that postgres=# prompt, PostgreSQL is working!
# Type \q to exit:
\q
```

**If `psql` is not recognized**, you need to add PostgreSQL to your PATH:
```
1. Open Windows Settings > System > About > Advanced System Settings
2. Click "Environment Variables"
3. Under "System Variables", find "Path" and click Edit
4. Click New and add: C:\Program Files\PostgreSQL\16\bin
   (Replace 16 with your installed version number)
5. Click OK on all dialogs
6. Close and reopen your terminal
7. Try psql -U postgres again
```

**pgAdmin** is a graphical tool that also got installed. You can open it from your Start menu to visually see your databases, tables, and data. It is useful but optional -- we will use the command line for everything in this bootcamp because that is what you will use in real development.

---

### 3. Redis

Redis is an in-memory data store. It is extremely fast because it keeps data in RAM (your computer's fast memory) instead of on disk. We use it for caching (storing frequently accessed data so we do not hit the database every time) and real-time features.

**Option A: Install via Memurai (Recommended for Windows)**

Memurai is a Windows-compatible Redis alternative that works exactly the same way.

```
1. Go to https://www.memurai.com/get-memurai
2. Download the free Developer edition
3. Run the installer with default settings
4. It will install as a Windows service (runs automatically in background)
```

**Option B: Install via WSL (Windows Subsystem for Linux)**

If you already have WSL set up:

```bash
# In your WSL terminal:
sudo apt update
sudo apt install redis-server
sudo service redis-server start
```

**Verify Redis is working:**

```bash
# In your terminal:
redis-cli ping
# You should see: PONG

# If you see PONG, Redis is working!
```

If `redis-cli` is not recognized with Memurai, try:
```bash
memurai-cli ping
# You should see: PONG
```

---

### 4. Postman

Postman is a tool that lets you test your backend APIs without writing any frontend code. Think of it like a universal remote control for your backend -- you can send any request (GET, POST, PUT, DELETE) to any URL and see exactly what comes back.

```
1. Go to https://www.postman.com/downloads/
2. Download the Windows version
3. Install with default settings
4. Open Postman
5. You can create a free account or click "Skip and go to the app"
6. You should see the Postman workspace with a big "+" button to create new requests
```

**Quick Postman overview:**
- The URL bar at the top is where you type your API address (like `http://localhost:3000/patients`)
- The dropdown next to the URL bar lets you pick the HTTP method (GET, POST, PUT, DELETE)
- The "Body" tab below is where you put data you want to send (like a new patient's information)
- The bottom panel shows the response -- what your server sends back
- You can save requests into Collections (folders) to reuse them

---

### 5. VS Code Extensions

Open VS Code and install these extensions (click the Extensions icon on the left sidebar, or press `Ctrl+Shift+X`):

```
1. Prisma (by Prisma) -- syntax highlighting and autocomplete for Prisma schema files
2. REST Client (by Huachao Mao) -- lets you send HTTP requests directly from VS Code
3. PostgreSQL (by Chris Kolkman) -- browse your database tables inside VS Code
4. Thunder Client (by Ranga Vadhineni) -- alternative to Postman, built into VS Code
```

The **Prisma** extension is required. The others are helpful but optional since you have Postman.

---

### 6. Git (You Already Have This)

Verify Git is working:

```bash
git --version
# You should see: git version 2.x.x
```

---

## Git Workflow

Your training repository is at: **https://github.com/Shivaganesh-dev/Training-.git**

**Initial setup (do this once):**

```bash
# Clone the repository to your local machine
git clone https://github.com/Shivaganesh-dev/Training-.git

# Move into the project folder
cd Training-

# Create your personal branch
# Replace "yourname" with your actual name (lowercase, no spaces)
git checkout -b backend/yourname

# Examples:
# git checkout -b backend/abhinaya
# git checkout -b backend/harshitha
# git checkout -b backend/srinitha

# Push your branch to GitHub so it exists remotely
git push -u origin backend/yourname
```

**After every BUILD task (you will do this many times):**

```bash
# Stage all your changes
git add .

# Commit with a clear message describing what you built
# Follow this format: "Day X Hour Y: description"
git commit -m "Day 1 Hour 1: Create patients, doctors, departments tables"

# Push to your branch on GitHub
git push
```

**Rules:**
- Commit after EVERY build task -- no exceptions
- Write clear commit messages that describe what you did
- Never commit to the `main` branch -- always work on your personal branch
- If you are stuck on a Git issue, ask for help rather than using `--force`

---

## Project Folder Structure

By the end of this bootcamp, your NestJS project will look like this:

```
ayurvena-backend/
|-- src/
|   |-- main.ts                          # Entry point -- starts the server
|   |-- app.module.ts                    # Root module -- imports all other modules
|   |
|   |-- patients/
|   |   |-- patients.module.ts           # Patient module definition
|   |   |-- patients.controller.ts       # Handles HTTP requests for patients
|   |   |-- patients.service.ts          # Business logic for patients
|   |   |-- dto/
|   |   |   |-- create-patient.dto.ts    # Defines shape of data for creating a patient
|   |   |   |-- update-patient.dto.ts    # Defines shape of data for updating a patient
|   |
|   |-- doctors/
|   |   |-- doctors.module.ts
|   |   |-- doctors.controller.ts
|   |   |-- doctors.service.ts
|   |   |-- dto/
|   |       |-- create-doctor.dto.ts
|   |       |-- update-doctor.dto.ts
|   |
|   |-- appointments/
|   |   |-- appointments.module.ts
|   |   |-- appointments.controller.ts
|   |   |-- appointments.service.ts
|   |   |-- dto/
|   |       |-- create-appointment.dto.ts
|   |       |-- update-appointment.dto.ts
|   |
|   |-- billing/
|   |   |-- billing.module.ts
|   |   |-- billing.controller.ts
|   |   |-- billing.service.ts
|   |   |-- dto/
|   |       |-- create-payment.dto.ts
|   |
|   |-- prisma/
|   |   |-- prisma.module.ts             # Prisma database connection module
|   |   |-- prisma.service.ts            # Prisma client wrapper
|   |
|   |-- redis/
|       |-- redis.module.ts              # Redis connection module
|       |-- redis.service.ts             # Redis client wrapper
|
|-- prisma/
|   |-- schema.prisma                    # Database schema (tables, relationships)
|   |-- migrations/                      # Database migration history
|   |-- seed.ts                          # Seed data (pre-populated test data)
|
|-- test/
|   |-- patients.e2e-spec.ts             # End-to-end tests for patient APIs
|   |-- doctors.e2e-spec.ts
|   |-- appointments.e2e-spec.ts
|
|-- .env                                 # Environment variables (database URL, etc.)
|-- package.json                         # Project dependencies
|-- tsconfig.json                        # TypeScript configuration
|-- nest-cli.json                        # NestJS CLI configuration
```

You will not build all of this on Day 1. Day 1 focuses on the database layer (the `prisma/` folder and raw SQL). Days 2 and 3 build the NestJS modules and API layer.

---

## How to Test APIs

Once you have a running NestJS server (starting from Day 2), you will test your APIs in two ways:

**Method 1: Postman (visual, recommended for beginners)**

```
1. Open Postman
2. Click the "+" button to create a new request
3. Select the HTTP method (GET, POST, PUT, DELETE) from the dropdown
4. Type the URL: http://localhost:3000/patients
5. If sending data (POST/PUT), click the "Body" tab, select "raw", select "JSON"
6. Type your JSON data
7. Click "Send"
8. Read the response at the bottom
```

**Method 2: curl (command line, useful for quick tests)**

```bash
# GET request -- fetch all patients
curl http://localhost:3000/patients

# GET request -- fetch one patient by ID
curl http://localhost:3000/patients/1

# POST request -- create a new patient
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Ravi", "lastName": "Kumar", "phone": "9876543210"}'

# PUT request -- update a patient
curl -X PUT http://localhost:3000/patients/1 \
  -H "Content-Type: application/json" \
  -d '{"phone": "9999999999"}'

# DELETE request -- remove a patient
curl -X DELETE http://localhost:3000/patients/1
```

**Method 3: REST Client (VS Code extension)**

Create a file called `requests.http` in your project root:

```http
### Get all patients
GET http://localhost:3000/patients

### Create a patient
POST http://localhost:3000/patients
Content-Type: application/json

{
  "firstName": "Ravi",
  "lastName": "Kumar",
  "phone": "9876543210"
}
```

Click "Send Request" above each request to run it. This is convenient because your test requests live inside your project.

---

## Code Review Process

At the end of each day:

1. Push all your work to your branch on GitHub
2. Create a Pull Request from your branch to `main` (do NOT merge it -- just create it for review)
3. Each person reviews the other two peoples' Pull Requests
4. Leave comments on anything you do not understand -- this helps everyone learn
5. After reviews, update your code based on feedback and push again

---

## Commit Schedule

You will commit after **every single BUILD task**. That means roughly 8 commits per day, 24 commits total. This gives you a complete history of your learning and makes it easy to go back if something breaks.

---

## Rules

1. **No copy-paste without understanding.** If you cannot explain what a line does, you do not understand it. Read the comments. Read the LEARN section. Ask your buddy.
2. **Ask questions.** There are no stupid questions. If you are stuck for more than 10 minutes, ask.
3. **Use the buddy system.** You are not alone. Work with your assigned buddy for each topic area.
4. **Type every line yourself.** Muscle memory matters. Your fingers need to learn the syntax.
5. **Break things on purpose.** After finishing a BUILD task, try changing things to see what breaks. That is how you learn what each piece does.

---

## Buddy System

| Topic Area | Buddy Pair | How It Works |
|------------|------------|--------------|
| Database (schema, migrations, queries) | Abhinaya + Harshitha | Abhinaya leads, Harshitha asks questions and learns |
| APIs (controllers, services, routes) | Harshitha + Srinitha | Harshitha leads, Srinitha asks questions and learns |
| Testing (test cases, validation, QA) | Srinitha + Abhinaya | Srinitha leads, Abhinaya asks questions and learns |

When you are the "lead" in a buddy pair, you are expected to explain concepts to your partner. Teaching is the best way to solidify your own understanding. When you are the "learner," ask every question you have -- your buddy benefits from explaining it.

---
---

# DAY 1 -- PostgreSQL + Prisma

**Goal for today:** Understand how databases work, write SQL by hand, design a complete hospital schema, then connect it to TypeScript using Prisma ORM.

**By the end of Day 1, you will have:**
- A PostgreSQL database with 10+ tables
- Complex relationships between patients, doctors, appointments, billing, and medical records
- Experience writing raw SQL queries
- A Prisma schema that mirrors your database
- Seed data to populate your development database

---

## Hour 1: PostgreSQL Basics (Part 1) -- Tables, Rows, and Your First Queries

### LEARN (20 minutes)

**What is a database?**

Imagine a giant Excel workbook. Each sheet in the workbook is a "table." Each row in a sheet is one record (like one patient). Each column is one piece of information about that record (like the patient's name, phone number, or blood group).

But a database is MUCH smarter than Excel:
- It enforces rules (you cannot enter a phone number where an email should go)
- It handles millions of rows without slowing down
- Multiple people can read and write data at the same time without conflicts
- It keeps your data safe even if the power goes out
- It can find specific data incredibly fast using indexes (more on this later)

**What is PostgreSQL?**

PostgreSQL (pronounced "post-gress-Q-L," often shortened to "Postgres") is one of the most popular databases in the world. It is free, open-source, and used by companies like Instagram, Spotify, and Netflix. When you hear "relational database," it means the database stores data in tables that can relate to each other (a patient relates to their appointments, an appointment relates to a doctor, etc.).

**Core concepts:**

```
TABLE = A structured collection of data (like one Excel sheet)
ROW   = One record in a table (like one patient)
COLUMN = One piece of information (like "first_name" or "phone")
PRIMARY KEY = A unique identifier for each row (like a patient's ID number)
```

**SQL = Structured Query Language**

SQL is the language you use to talk to the database. It reads almost like English:

```sql
-- This is a comment in SQL. It starts with two dashes.
-- Comments are ignored by the database. Use them to explain your code.

-- CREATE TABLE: makes a new table
-- Think of it as creating a new sheet in your Excel workbook
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,   -- SERIAL means auto-incrementing number (1, 2, 3...)
                              -- PRIMARY KEY means this is the unique identifier
    first_name VARCHAR(100),  -- VARCHAR(100) means text up to 100 characters
    last_name VARCHAR(100),
    phone VARCHAR(15)         -- Phone stored as text because it can start with 0 or +
);

-- INSERT INTO: adds a new row to a table
-- Think of it as adding a new row to your Excel sheet
INSERT INTO patients (first_name, last_name, phone)
VALUES ('Ravi', 'Kumar', '9876543210');
-- Notice: we did not provide "id" -- the database auto-generates it because of SERIAL

-- SELECT: reads data from a table
-- Think of it as searching/filtering your Excel sheet
SELECT * FROM patients;
-- The * means "all columns". This returns every column and every row.

-- SELECT with WHERE: filters rows based on a condition
SELECT first_name, last_name FROM patients WHERE phone = '9876543210';
-- This only returns the first_name and last_name of patients whose phone matches
```

**Common SQL data types you will use:**

```
SERIAL          -- Auto-incrementing integer (1, 2, 3...). Perfect for IDs.
INTEGER         -- A whole number (no decimals). Example: floor_number.
VARCHAR(n)      -- Text with a maximum length of n characters. Example: names, emails.
TEXT            -- Text with no length limit. Example: long descriptions, notes.
DATE            -- A date (year-month-day). Example: 2024-03-15
TIMESTAMP       -- Date AND time. Example: 2024-03-15 14:30:00
BOOLEAN         -- true or false. Example: is_active.
DECIMAL(p, s)   -- A number with decimals. p = total digits, s = decimal places.
                -- Example: DECIMAL(10, 2) can store up to 99999999.99
```

---

### BUILD (40 minutes)

**What you are building:** The foundation tables for the Ayurvena hospital database -- patients, doctors, and departments.

**Setup: Create the training database**

Open your terminal and connect to PostgreSQL:

```bash
# Connect to PostgreSQL as the postgres user
psql -U postgres
# Enter your password: postgres
```

Now create the database we will use for all training exercises:

```sql
-- Create a brand new database for our training
-- A database is like a folder that holds all our tables
CREATE DATABASE ayurvena_training;

-- Connect to the new database
-- The \c command switches you to a different database
\c ayurvena_training

-- You should see: "You are now connected to database "ayurvena_training" as user "postgres"."
```

---

**Requirement 1: Create the `patients` table**

```sql
-- Create the patients table
-- This table stores every patient who visits or registers at the hospital
CREATE TABLE patients (
    -- id: unique identifier for each patient
    -- SERIAL: automatically generates the next number (1, 2, 3, ...)
    -- PRIMARY KEY: no two patients can have the same id
    id SERIAL PRIMARY KEY,

    -- first_name: the patient's first name
    -- VARCHAR(100): text that can be up to 100 characters long
    -- NOT NULL: this field is REQUIRED -- you cannot leave it empty
    first_name VARCHAR(100) NOT NULL,

    -- last_name: the patient's last/family name
    last_name VARCHAR(100) NOT NULL,

    -- date_of_birth: when the patient was born
    -- DATE: stores year-month-day (example: 1990-05-15)
    date_of_birth DATE,

    -- gender: male, female, or other
    -- VARCHAR(10): short text field
    gender VARCHAR(10),

    -- blood_group: the patient's blood type (A+, B-, O+, AB+, etc.)
    -- VARCHAR(5): short text since blood groups are only 2-3 characters
    blood_group VARCHAR(5),

    -- phone: the patient's phone number
    -- VARCHAR(15): stored as text because phone numbers can start with + or 0
    phone VARCHAR(15),

    -- email: the patient's email address (optional -- not all patients have email)
    email VARCHAR(100),

    -- address: where the patient lives
    -- TEXT: no length limit because addresses can be long
    address TEXT,

    -- created_at: when this record was first added to the database
    -- TIMESTAMP: stores both date and time
    -- DEFAULT CURRENT_TIMESTAMP: automatically sets to "right now" when the row is created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verify the table was created:
-- \d patients    (shows the table structure)
-- \dt            (lists all tables in the database)
```

Run `\d patients` after creating the table. You should see all the columns listed with their data types.

---

**Requirement 2: Create the `doctors` table**

```sql
-- Create the doctors table
-- This table stores every doctor who works at the hospital
CREATE TABLE doctors (
    -- Same pattern as patients: auto-incrementing unique ID
    id SERIAL PRIMARY KEY,

    -- Doctor's personal information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    -- specialization: what area of medicine the doctor focuses on
    -- Examples: Cardiology, Neurology, Orthopedics, General Medicine
    specialization VARCHAR(100) NOT NULL,

    -- qualification: the doctor's degrees
    -- Examples: MBBS, MD, MS, DM
    qualification VARCHAR(200),

    -- Contact information
    phone VARCHAR(15),
    email VARCHAR(100),

    -- department: which hospital department the doctor belongs to
    -- Examples: Emergency, Surgery, Outpatient
    department VARCHAR(100),

    -- When this doctor record was created in the system
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

**Requirement 3: Create the `departments` table**

```sql
-- Create the departments table
-- This table stores the different departments/sections in the hospital
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,

    -- name: the department's name (must be provided and must be unique)
    -- UNIQUE: no two departments can have the same name
    name VARCHAR(100) NOT NULL UNIQUE,

    -- description: what this department does
    description TEXT,

    -- floor_number: which floor of the hospital building this department is on
    floor_number INTEGER,

    -- When this department was added to the system
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

**Requirement 4: Insert 5 patients, 3 doctors, and 4 departments**

```sql
-- =============================================
-- INSERT PATIENTS
-- =============================================
-- Insert 5 patients into the patients table
-- Notice: we do not provide "id" or "created_at"
-- id is auto-generated (SERIAL), created_at defaults to now (DEFAULT CURRENT_TIMESTAMP)

INSERT INTO patients (first_name, last_name, date_of_birth, gender, blood_group, phone, email, address)
VALUES
    ('Ravi', 'Kumar', '1985-03-15', 'Male', 'B+', '9876543210', 'ravi.kumar@email.com', '42 MG Road, Bangalore'),
    ('Priya', 'Sharma', '1992-07-22', 'Female', 'A+', '9876543211', 'priya.sharma@email.com', '15 Anna Nagar, Chennai'),
    ('Amit', 'Patel', '1978-11-30', 'Male', 'O+', '9876543212', 'amit.patel@email.com', '78 Jubilee Hills, Hyderabad'),
    ('Sunita', 'Reddy', '1990-01-05', 'Female', 'B+', '9876543213', 'sunita.reddy@email.com', '23 Banjara Hills, Hyderabad'),
    ('Vikram', 'Singh', '2000-09-18', 'Male', 'AB-', '9876543214', 'vikram.singh@email.com', '56 Connaught Place, Delhi');

-- Verify: this should show 5 rows
SELECT * FROM patients;

-- =============================================
-- INSERT DOCTORS
-- =============================================
-- Insert 3 doctors into the doctors table

INSERT INTO doctors (first_name, last_name, specialization, qualification, phone, email, department)
VALUES
    ('Anand', 'Krishnan', 'Cardiology', 'MBBS, MD Cardiology', '9988776601', 'dr.anand@hospital.com', 'Cardiology'),
    ('Meera', 'Nair', 'Neurology', 'MBBS, DM Neurology', '9988776602', 'dr.meera@hospital.com', 'Neurology'),
    ('Rajesh', 'Gupta', 'Orthopedics', 'MBBS, MS Orthopedics', '9988776603', 'dr.rajesh@hospital.com', 'Orthopedics');

-- Verify: this should show 3 rows
SELECT * FROM doctors;

-- =============================================
-- INSERT DEPARTMENTS
-- =============================================
-- Insert 4 departments into the departments table

INSERT INTO departments (name, description, floor_number)
VALUES
    ('Cardiology', 'Heart and cardiovascular system diagnosis and treatment', 2),
    ('Neurology', 'Brain, spinal cord, and nervous system disorders', 3),
    ('Orthopedics', 'Bones, joints, muscles, and skeletal system', 1),
    ('Emergency', 'Immediate care for life-threatening conditions and injuries', 0);

-- Verify: this should show 4 rows
SELECT * FROM departments;
```

---

**Requirement 5: Write SELECT queries**

```sql
-- QUERY 1: Get all patients (all columns)
-- The * means "give me every column"
SELECT * FROM patients;
-- Expected: 5 rows, all columns visible

-- QUERY 2: Get only names and blood groups of all patients
-- Instead of *, we list specific columns we want
SELECT first_name, last_name, blood_group FROM patients;
-- Expected: 5 rows, but only 3 columns

-- QUERY 3: Find patients with blood group B+
-- WHERE filters rows based on a condition
SELECT first_name, last_name, phone FROM patients
WHERE blood_group = 'B+';
-- Expected: 2 rows (Ravi Kumar and Sunita Reddy)

-- QUERY 4: Find doctors in Cardiology department
SELECT first_name, last_name, specialization FROM doctors
WHERE department = 'Cardiology';
-- Expected: 1 row (Dr. Anand Krishnan)

-- QUERY 5: Find all departments on floor 2 or above
-- >= means "greater than or equal to"
SELECT name, floor_number FROM departments
WHERE floor_number >= 2;
-- Expected: 2 rows (Cardiology on floor 2, Neurology on floor 3)

-- QUERY 6: Find patients whose last name starts with 'S'
-- LIKE is used for pattern matching
-- 'S%' means "starts with S followed by anything"
SELECT first_name, last_name FROM patients
WHERE last_name LIKE 'S%';
-- Expected: 2 rows (Sharma and Singh)
```

---

**Requirement 6: Test cases**

Run each of these and verify the output matches:

```sql
-- TEST 1: Count total patients
SELECT COUNT(*) FROM patients;
-- Expected result: 5

-- TEST 2: Count patients with blood group B+
SELECT COUNT(*) FROM patients WHERE blood_group = 'B+';
-- Expected result: 2

-- TEST 3: Count total doctors
SELECT COUNT(*) FROM doctors;
-- Expected result: 3

-- TEST 4: Count departments
SELECT COUNT(*) FROM departments;
-- Expected result: 4

-- TEST 5: Verify no patient has a NULL first_name
SELECT COUNT(*) FROM patients WHERE first_name IS NULL;
-- Expected result: 0

-- TEST 6: Verify department names are unique (try inserting a duplicate)
-- This SHOULD fail with a unique constraint violation:
INSERT INTO departments (name, description, floor_number)
VALUES ('Cardiology', 'Duplicate test', 5);
-- Expected: ERROR: duplicate key value violates unique constraint
```

---

**Git commit:**

```bash
# Exit psql first
\q

# Save your SQL work: create a file to store your queries
# Create a folder for Day 1 SQL exercises
mkdir -p sql/day1

# Save your queries in a file (copy your SQL from above into this file)
# You can use VS Code: code sql/day1/hour1-basics.sql

# Stage and commit
git add .
git commit -m "Day 1 Hour 1: Create patients, doctors, departments tables with sample data"
git push
```

Save all your SQL queries into `sql/day1/hour1-basics.sql` so you have a record of everything you wrote. This is important for review and for reference later.

---
---

## Hour 2: PostgreSQL Basics (Part 2) -- Relationships and JOINs

### LEARN (20 minutes)

**What are relationships?**

In the real world, data is connected. A patient has appointments. An appointment is with a specific doctor. A doctor works in a department. These connections are called "relationships."

In a database, we create relationships using **foreign keys**. A foreign key is a column in one table that refers to the primary key (the `id` column) of another table.

Think of it this way:
- The `patients` table has an `id` column (primary key). Each patient gets a unique number.
- The `appointments` table has a `patient_id` column (foreign key). This column stores the `id` of the patient who booked that appointment.
- So if Ravi Kumar has `id = 1` in the patients table, then an appointment for Ravi will have `patient_id = 1` in the appointments table.

**Why not just put the patient's name in the appointments table?**

Because names can change, names can be duplicated (two patients named "Ravi Kumar"), and if you update a patient's phone number, you would have to update it in every table that copied it. By using an ID reference (foreign key), you store the data once in the patients table and just point to it from everywhere else. This principle is called **normalization**.

**What are JOINs?**

When your data is split across multiple tables (patients in one, appointments in another), you need a way to combine them. That is what JOINs do -- they merge rows from two or more tables based on a related column.

```sql
-- Without a JOIN, you can only see appointment IDs and patient IDs:
SELECT * FROM appointments;
-- Result: id=1, patient_id=1, doctor_id=2, date=2024-03-15
-- But who is patient_id 1? Who is doctor_id 2? You cannot tell.

-- With a JOIN, you see the actual names:
SELECT
    a.id AS appointment_id,     -- "a" is a short alias for the appointments table
    p.first_name AS patient,    -- "p" is a short alias for the patients table
    d.first_name AS doctor      -- "d" is a short alias for the doctors table
FROM appointments a
INNER JOIN patients p ON a.patient_id = p.id    -- match appointment's patient_id to patient's id
INNER JOIN doctors d ON a.doctor_id = d.id;     -- match appointment's doctor_id to doctor's id
-- Result: appointment_id=1, patient="Ravi", doctor="Meera"
-- Now you can see the actual names!
```

**Types of JOINs:**

```
INNER JOIN: Only returns rows where there is a match in BOTH tables.
            If a patient has no appointments, they will NOT appear.

LEFT JOIN:  Returns ALL rows from the left table, even if there is no match.
            If a patient has no appointments, they WILL appear with NULL
            in the appointment columns.

RIGHT JOIN: Returns ALL rows from the right table, even if there is no match.
            (Rarely used -- you can usually rewrite it as a LEFT JOIN.)

FULL JOIN:  Returns ALL rows from BOTH tables, matched where possible.
            (Also rarely used.)
```

In practice, you will use **INNER JOIN** and **LEFT JOIN** 99% of the time.

---

### BUILD (40 minutes)

**What you are building:** An appointments table that links patients to doctors, and queries that combine data from multiple tables.

First, connect to your database:

```bash
psql -U postgres
# Password: postgres
\c ayurvena_training
```

---

**Requirement 1: Create the `appointments` table with foreign keys**

```sql
-- Create the appointments table
-- This table stores every appointment between a patient and a doctor
-- It REFERENCES both the patients table and the doctors table using foreign keys
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,

    -- patient_id: which patient this appointment is for
    -- INTEGER: a whole number that matches a patient's id
    -- NOT NULL: every appointment MUST have a patient
    -- REFERENCES patients(id): this is the FOREIGN KEY
    --   It means patient_id must match an existing id in the patients table
    --   If you try to insert patient_id = 999 and no patient with id=999 exists,
    --   the database will reject it with an error
    patient_id INTEGER NOT NULL REFERENCES patients(id),

    -- doctor_id: which doctor this appointment is with
    -- Same concept as patient_id but references the doctors table
    doctor_id INTEGER NOT NULL REFERENCES doctors(id),

    -- appointment_date: when the appointment is scheduled
    -- DATE: stores just the date (no time)
    appointment_date DATE NOT NULL,

    -- appointment_time: what time the appointment starts
    -- TIME: stores just the time (no date)
    appointment_time TIME NOT NULL,

    -- status: current state of the appointment
    -- Examples: 'scheduled', 'completed', 'cancelled', 'no-show'
    status VARCHAR(20) DEFAULT 'scheduled',

    -- reason: why the patient is visiting
    -- TEXT: no length limit because reasons can be long
    reason TEXT,

    -- created_at: when this appointment was booked in the system
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verify the table structure
\d appointments
-- You should see patient_id and doctor_id listed as integer columns
-- and foreign key constraints at the bottom
```

---

**Requirement 2: Insert 10 appointments**

```sql
-- Insert 10 appointments linking real patients to real doctors
-- Remember: patient_id must match an actual id from the patients table (1-5)
--           doctor_id must match an actual id from the doctors table (1-3)

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason)
VALUES
    -- Patient 1 (Ravi) sees Dr. 1 (Anand, Cardiology) -- chest pain
    (1, 1, '2024-03-15', '09:00', 'completed', 'Chest pain and shortness of breath'),

    -- Patient 2 (Priya) sees Dr. 2 (Meera, Neurology) -- headaches
    (2, 2, '2024-03-15', '10:30', 'completed', 'Recurring headaches for 2 weeks'),

    -- Patient 3 (Amit) sees Dr. 3 (Rajesh, Orthopedics) -- knee pain
    (3, 3, '2024-03-16', '11:00', 'completed', 'Knee pain after exercise'),

    -- Patient 1 (Ravi) has a follow-up with Dr. 1 (Anand) -- follow-up
    (1, 1, '2024-03-20', '09:30', 'completed', 'Follow-up for chest pain'),

    -- Patient 4 (Sunita) sees Dr. 1 (Anand, Cardiology) -- heart check
    (4, 1, '2024-03-18', '14:00', 'completed', 'Annual heart checkup'),

    -- Patient 2 (Priya) sees Dr. 3 (Rajesh, Orthopedics) -- back pain
    (2, 3, '2024-03-19', '15:00', 'cancelled', 'Lower back pain'),

    -- Patient 5 (Vikram) sees Dr. 2 (Meera, Neurology) -- dizziness
    (5, 2, '2024-03-20', '10:00', 'scheduled', 'Dizziness and balance issues'),

    -- Patient 3 (Amit) follow-up with Dr. 3 (Rajesh) -- knee follow-up
    (3, 3, '2024-03-22', '11:30', 'scheduled', 'Knee pain follow-up'),

    -- Patient 4 (Sunita) sees Dr. 2 (Meera, Neurology) -- numbness
    (4, 2, CURRENT_DATE, '16:00', 'scheduled', 'Numbness in left hand'),
    -- CURRENT_DATE inserts today's date -- useful for testing "today's appointments"

    -- Patient 5 (Vikram) sees Dr. 1 (Anand, Cardiology) -- chest check
    (5, 1, CURRENT_DATE, '17:00', 'scheduled', 'Preventive cardiac screening');

-- Verify: should show 10 rows
SELECT * FROM appointments;

-- Quick check: try inserting an appointment with a patient_id that does not exist
-- This SHOULD fail because of the foreign key constraint:
-- INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
-- VALUES (999, 1, '2024-04-01', '10:00');
-- Expected: ERROR: insert or update on table "appointments" violates foreign key constraint
```

---

**Requirement 3: INNER JOIN -- Show appointments with patient and doctor names**

```sql
-- INNER JOIN: combine appointments with patient names and doctor names
-- This only shows appointments where both the patient AND doctor exist
-- (which should be all of them since we used foreign keys)

SELECT
    a.id AS appointment_id,                                -- the appointment's unique number
    p.first_name || ' ' || p.last_name AS patient_name,    -- || concatenates strings in PostgreSQL
    d.first_name || ' ' || d.last_name AS doctor_name,     -- combines first and last name
    d.specialization,                                       -- the doctor's specialty
    a.appointment_date,                                     -- when the appointment is
    a.appointment_time,                                     -- what time
    a.status,                                               -- scheduled/completed/cancelled
    a.reason                                                -- why the patient is visiting
FROM appointments a                                         -- "a" is our alias for appointments
INNER JOIN patients p ON a.patient_id = p.id                -- link patient_id to patients.id
INNER JOIN doctors d ON a.doctor_id = d.id                  -- link doctor_id to doctors.id
ORDER BY a.appointment_date, a.appointment_time;            -- sort by date, then by time

-- Expected: 10 rows, each showing the actual patient name and doctor name
-- instead of just ID numbers
```

---

**Requirement 4: LEFT JOIN -- Show ALL patients, even those without appointments**

```sql
-- LEFT JOIN: show every patient, whether or not they have appointments
-- If a patient has NO appointments, the appointment columns will show NULL

-- First, let us add a patient who has NO appointments to test this:
INSERT INTO patients (first_name, last_name, date_of_birth, gender, blood_group, phone, email, address)
VALUES ('Kavitha', 'Menon', '1995-06-10', 'Female', 'O-', '9876543215', 'kavitha.menon@email.com', '12 Marine Drive, Mumbai');
-- Kavitha now has id=6 but zero appointments

-- Now run the LEFT JOIN:
SELECT
    p.first_name || ' ' || p.last_name AS patient_name,
    p.blood_group,
    a.id AS appointment_id,
    a.appointment_date,
    a.status
FROM patients p                                             -- patients is the LEFT table
LEFT JOIN appointments a ON p.id = a.patient_id             -- left join with appointments
ORDER BY p.first_name;

-- Expected: You should see ALL 6 patients
-- Kavitha Menon will appear with NULL for appointment_id, appointment_date, and status
-- Other patients will appear multiple times (once per appointment)

-- BONUS: Find patients who have NEVER booked an appointment:
SELECT
    p.first_name || ' ' || p.last_name AS patient_name,
    p.phone
FROM patients p
LEFT JOIN appointments a ON p.id = a.patient_id
WHERE a.id IS NULL;
-- This works because LEFT JOIN fills in NULL for non-matching rows
-- Then WHERE a.id IS NULL filters to only those with no matches
-- Expected: 1 row (Kavitha Menon)
```

---

**Requirement 5: Count appointments per doctor**

```sql
-- COUNT + GROUP BY: count how many appointments each doctor has
-- GROUP BY groups all rows with the same doctor together
-- COUNT(*) counts how many rows are in each group

SELECT
    d.first_name || ' ' || d.last_name AS doctor_name,
    d.specialization,
    COUNT(*) AS total_appointments           -- count rows in each group
FROM doctors d
INNER JOIN appointments a ON d.id = a.doctor_id
GROUP BY d.id, d.first_name, d.last_name, d.specialization
-- GROUP BY must include all columns that are not inside an aggregate function (COUNT, SUM, etc.)
ORDER BY total_appointments DESC;            -- DESC = descending (highest first)

-- Expected results (may vary based on your data):
-- Dr. Anand Krishnan  | Cardiology  | 4 appointments
-- Dr. Meera Nair      | Neurology   | 3 appointments
-- Dr. Rajesh Gupta    | Orthopedics | 3 appointments
```

---

**Requirement 6: Find patients who have appointments today**

```sql
-- CURRENT_DATE is a PostgreSQL function that returns today's date
-- We use it to find appointments scheduled for today

SELECT
    p.first_name || ' ' || p.last_name AS patient_name,
    p.phone,
    d.first_name || ' ' || d.last_name AS doctor_name,
    a.appointment_time,
    a.reason
FROM appointments a
INNER JOIN patients p ON a.patient_id = p.id
INNER JOIN doctors d ON a.doctor_id = d.id
WHERE a.appointment_date = CURRENT_DATE          -- only today's appointments
ORDER BY a.appointment_time;

-- Expected: 2 rows (the two appointments we inserted with CURRENT_DATE)
-- Sunita Reddy at 16:00 with Dr. Meera Nair
-- Vikram Singh at 17:00 with Dr. Anand Krishnan

-- BONUS: Find appointments for the next 7 days
SELECT
    p.first_name || ' ' || p.last_name AS patient_name,
    d.first_name || ' ' || d.last_name AS doctor_name,
    a.appointment_date,
    a.appointment_time,
    a.status
FROM appointments a
INNER JOIN patients p ON a.patient_id = p.id
INNER JOIN doctors d ON a.doctor_id = d.id
WHERE a.appointment_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
-- BETWEEN checks if a value falls within a range (inclusive on both ends)
-- INTERVAL '7 days' adds 7 days to the current date
ORDER BY a.appointment_date, a.appointment_time;
```

---

**Test cases:**

```sql
-- TEST 1: Total number of appointments
SELECT COUNT(*) FROM appointments;
-- Expected: 10

-- TEST 2: Appointments for patient_id = 1 (Ravi)
SELECT COUNT(*) FROM appointments WHERE patient_id = 1;
-- Expected: 2

-- TEST 3: Foreign key constraint works (this should FAIL)
-- Uncomment and run to test:
-- INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
-- VALUES (999, 1, '2024-04-01', '10:00');
-- Expected: ERROR about foreign key violation

-- TEST 4: LEFT JOIN finds patients with no appointments
SELECT COUNT(*) FROM patients p
LEFT JOIN appointments a ON p.id = a.patient_id
WHERE a.id IS NULL;
-- Expected: 1 (Kavitha Menon)

-- TEST 5: Every appointment has a valid patient
SELECT COUNT(*) FROM appointments a
LEFT JOIN patients p ON a.patient_id = p.id
WHERE p.id IS NULL;
-- Expected: 0 (no orphaned appointments)

-- TEST 6: Every appointment has a valid doctor
SELECT COUNT(*) FROM appointments a
LEFT JOIN doctors d ON a.doctor_id = d.id
WHERE d.id IS NULL;
-- Expected: 0 (no orphaned appointments)
```

---

**Git commit:**

```bash
\q
# Save your SQL queries to a file
# code sql/day1/hour2-relationships.sql

git add .
git commit -m "Day 1 Hour 2: Create appointments table with foreign keys and JOIN queries"
git push
```

---
---

## Hour 3: Advanced SQL -- Indexes, Aggregates, and the Payments Table

### LEARN (15 minutes)

**What are indexes?**

Imagine you have a textbook with 500 pages. If someone asks you "find the section about mitochondria," you have two options:
1. Start from page 1 and read every page until you find it (slow)
2. Look in the index at the back of the book, find "mitochondria -- page 287", and go directly there (fast)

A database index works the same way. Without an index, the database reads every single row in the table to find what you are looking for (called a "full table scan"). With an index, the database can jump directly to the matching rows.

```sql
-- Without an index, this query scans ALL rows in the patients table:
SELECT * FROM patients WHERE phone = '9876543210';
-- If you have 1 million patients, it checks all 1 million rows

-- After creating an index on the phone column:
CREATE INDEX idx_patients_phone ON patients(phone);
-- Now the same query can find the result almost instantly
-- because the database has a "phone number lookup table" (the index)
```

**When to create indexes:**
- On columns you frequently search by (WHERE phone = ...)
- On columns you frequently sort by (ORDER BY appointment_date)
- On foreign key columns (patient_id, doctor_id) -- PostgreSQL does NOT auto-index these!
- Do NOT index every column -- indexes take up disk space and slow down inserts

**Aggregate functions:**

These functions calculate a single result from multiple rows:

```sql
COUNT(*)    -- Count the number of rows
SUM(amount) -- Add up all values in a column
AVG(amount) -- Calculate the average (mean)
MIN(amount) -- Find the smallest value
MAX(amount) -- Find the largest value
```

**GROUP BY and ORDER BY:**

```sql
-- GROUP BY: groups rows that have the same value in a column
-- Used with aggregate functions to get per-group totals

SELECT blood_group, COUNT(*) AS patient_count
FROM patients
GROUP BY blood_group;
-- Groups patients by blood group and counts each group

-- ORDER BY: sorts the results
-- ASC = ascending (smallest first, A-Z) -- this is the default
-- DESC = descending (largest first, Z-A)

-- LIMIT: restricts the number of rows returned
SELECT * FROM patients ORDER BY created_at DESC LIMIT 3;
-- Returns only the 3 most recently added patients
```

---

### BUILD (45 minutes)

Connect to your database:

```bash
psql -U postgres
\c ayurvena_training
```

---

**Requirement 1: Add indexes on frequently searched columns**

```sql
-- Create an index on patients.phone
-- This makes searching by phone number much faster
-- Think: "create a lookup table for phone numbers"
CREATE INDEX idx_patients_phone ON patients(phone);

-- Create an index on doctors.specialization
-- This makes filtering doctors by specialization faster
CREATE INDEX idx_doctors_specialization ON doctors(specialization);

-- Create indexes on foreign key columns in the appointments table
-- PostgreSQL does NOT automatically create indexes on foreign keys
-- Without these, JOIN queries on large tables would be slow
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);

-- Create an index on appointment_date for date-range queries
CREATE INDEX idx_appointments_date ON appointments(appointment_date);

-- Verify indexes were created:
-- \di lists all indexes in the current database
\di

-- You should see your new indexes listed along with the auto-created
-- primary key indexes (like patients_pkey, doctors_pkey, etc.)

-- EXPLAIN shows how the database plans to run a query
-- Use it to verify your index is being used:
EXPLAIN SELECT * FROM patients WHERE phone = '9876543210';
-- You should see "Index Scan" or "Index Cond" in the output
-- instead of "Seq Scan" (sequential/full table scan)
```

---

**Requirement 2: GROUP BY -- Count patients per blood group**

```sql
-- Count how many patients have each blood group
-- GROUP BY creates one group for each unique blood_group value
-- COUNT(*) counts the rows in each group

SELECT
    blood_group,                 -- the grouping column
    COUNT(*) AS patient_count    -- how many patients in this group
FROM patients
WHERE blood_group IS NOT NULL    -- exclude patients with no blood group recorded
GROUP BY blood_group             -- group by this column
ORDER BY patient_count DESC;     -- show the most common blood group first

-- Expected results (based on our 6 patients):
-- B+  | 2
-- A+  | 1
-- O+  | 1
-- AB- | 1
-- O-  | 1

-- BONUS: Find blood groups with more than 1 patient
-- HAVING is like WHERE but for groups (you cannot use WHERE with aggregate functions)
SELECT
    blood_group,
    COUNT(*) AS patient_count
FROM patients
WHERE blood_group IS NOT NULL
GROUP BY blood_group
HAVING COUNT(*) > 1              -- HAVING filters groups, WHERE filters individual rows
ORDER BY patient_count DESC;
-- Expected: B+ | 2
```

---

**Requirement 3: Aggregate query -- Total appointments per department**

```sql
-- Count total appointments per department
-- This requires joining appointments -> doctors (to get the department)

SELECT
    d.department,                            -- the department name (from doctors table)
    COUNT(*) AS total_appointments,          -- total appointments in this department
    COUNT(CASE WHEN a.status = 'completed' THEN 1 END) AS completed,  -- completed only
    COUNT(CASE WHEN a.status = 'scheduled' THEN 1 END) AS scheduled,  -- scheduled only
    COUNT(CASE WHEN a.status = 'cancelled' THEN 1 END) AS cancelled   -- cancelled only
FROM appointments a
INNER JOIN doctors d ON a.doctor_id = d.id
GROUP BY d.department
ORDER BY total_appointments DESC;

-- Expected results:
-- Cardiology  | 4 total | 3 completed | 1 scheduled | 0 cancelled
-- Neurology   | 3 total | 1 completed | 2 scheduled | 0 cancelled
-- Orthopedics | 3 total | 1 completed | 1 scheduled | 1 cancelled

-- EXPLANATION of CASE WHEN:
-- CASE WHEN is like an if-statement inside SQL
-- CASE WHEN a.status = 'completed' THEN 1 END
--   means: "if the status is 'completed', return 1, otherwise return NULL"
-- COUNT ignores NULL values, so it only counts the non-NULL results
-- This gives us a count of only the completed appointments
```

---

**Requirement 4: ORDER BY + LIMIT -- Top 3 doctors by appointment count**

```sql
-- Find the top 3 doctors with the most appointments
-- ORDER BY sorts results, LIMIT restricts how many rows are returned

SELECT
    d.first_name || ' ' || d.last_name AS doctor_name,
    d.specialization,
    d.department,
    COUNT(*) AS appointment_count
FROM doctors d
INNER JOIN appointments a ON d.id = a.doctor_id
GROUP BY d.id, d.first_name, d.last_name, d.specialization, d.department
ORDER BY appointment_count DESC     -- sort by appointment count, highest first
LIMIT 3;                            -- only return the top 3

-- Expected:
-- Dr. Anand Krishnan  | Cardiology  | 4
-- Dr. Meera Nair      | Neurology   | 3
-- Dr. Rajesh Gupta    | Orthopedics | 3

-- BONUS: Find the doctor with the MOST completed appointments
SELECT
    d.first_name || ' ' || d.last_name AS doctor_name,
    COUNT(*) AS completed_appointments
FROM doctors d
INNER JOIN appointments a ON d.id = a.doctor_id
WHERE a.status = 'completed'                       -- only count completed ones
GROUP BY d.id, d.first_name, d.last_name
ORDER BY completed_appointments DESC
LIMIT 1;                                           -- just the top 1
-- Expected: Dr. Anand Krishnan | 3
```

---

**Requirement 5: Create the `payments` table**

```sql
-- Create the payments table
-- This table tracks all financial transactions for appointments
-- Every payment is linked to a specific appointment via foreign key

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,

    -- appointment_id: which appointment this payment is for
    -- REFERENCES appointments(id): foreign key to the appointments table
    appointment_id INTEGER NOT NULL REFERENCES appointments(id),

    -- amount: how much was paid
    -- DECIMAL(10, 2): up to 10 digits total, 2 after the decimal point
    -- This can store values from 0.00 to 99999999.99
    amount DECIMAL(10, 2) NOT NULL,

    -- payment_method: how the patient paid
    -- Examples: 'cash', 'card', 'upi', 'insurance'
    payment_method VARCHAR(20) NOT NULL,

    -- payment_status: current state of this payment
    -- Examples: 'paid', 'pending', 'refunded', 'failed'
    payment_status VARCHAR(20) DEFAULT 'pending',

    -- paid_at: when the payment was actually made
    -- Can be NULL if the payment is still pending
    paid_at TIMESTAMP
);

-- Add an index on appointment_id for faster lookups
CREATE INDEX idx_payments_appointment_id ON payments(appointment_id);

-- Insert payment records for completed appointments
-- Only completed appointments should have payments

INSERT INTO payments (appointment_id, amount, payment_method, payment_status, paid_at)
VALUES
    -- Payment for appointment 1 (Ravi's chest pain visit with Dr. Anand)
    (1, 1500.00, 'card', 'paid', '2024-03-15 09:45:00'),

    -- Payment for appointment 2 (Priya's headache visit with Dr. Meera)
    (2, 1200.00, 'upi', 'paid', '2024-03-15 11:15:00'),

    -- Payment for appointment 3 (Amit's knee pain visit with Dr. Rajesh)
    (3, 2000.00, 'cash', 'paid', '2024-03-16 11:45:00'),

    -- Payment for appointment 4 (Ravi's follow-up with Dr. Anand)
    (4, 800.00, 'upi', 'paid', '2024-03-20 10:00:00'),

    -- Payment for appointment 5 (Sunita's heart checkup with Dr. Anand)
    (5, 3500.00, 'insurance', 'paid', '2024-03-18 14:45:00'),

    -- Payment for appointment 6 (Priya's cancelled appointment -- refunded)
    (6, 1800.00, 'card', 'refunded', '2024-03-19 15:30:00'),

    -- Payment for appointment 7 (Vikram's upcoming appointment -- pending)
    (7, 1200.00, 'upi', 'pending', NULL),

    -- Payment for appointment 8 (Amit's upcoming knee follow-up -- pending)
    (8, 1000.00, 'cash', 'pending', NULL);

-- Verify: should show 8 rows
SELECT * FROM payments;
```

---

**Requirement 6: Revenue queries**

```sql
-- QUERY 1: Total revenue (only from paid payments)
SELECT
    SUM(amount) AS total_revenue     -- SUM adds up all the amounts
FROM payments
WHERE payment_status = 'paid';
-- Expected: 9000.00 (1500 + 1200 + 2000 + 800 + 3500)

-- QUERY 2: Revenue per doctor
-- Join payments -> appointments -> doctors to see which doctor earned what
SELECT
    d.first_name || ' ' || d.last_name AS doctor_name,
    d.specialization,
    COUNT(*) AS paid_appointments,
    SUM(pay.amount) AS total_revenue,
    ROUND(AVG(pay.amount), 2) AS average_payment    -- ROUND limits decimal places
FROM payments pay
INNER JOIN appointments a ON pay.appointment_id = a.id
INNER JOIN doctors d ON a.doctor_id = d.id
WHERE pay.payment_status = 'paid'                    -- only count successful payments
GROUP BY d.id, d.first_name, d.last_name, d.specialization
ORDER BY total_revenue DESC;

-- Expected:
-- Dr. Anand Krishnan  | Cardiology  | 3 | 5800.00 | 1933.33
-- Dr. Rajesh Gupta    | Orthopedics | 1 | 2000.00 | 2000.00
-- Dr. Meera Nair      | Neurology   | 1 | 1200.00 | 1200.00

-- QUERY 3: Revenue per department
SELECT
    d.department,
    SUM(pay.amount) AS department_revenue,
    COUNT(*) AS paid_appointments
FROM payments pay
INNER JOIN appointments a ON pay.appointment_id = a.id
INNER JOIN doctors d ON a.doctor_id = d.id
WHERE pay.payment_status = 'paid'
GROUP BY d.department
ORDER BY department_revenue DESC;

-- Expected:
-- Cardiology  | 5800.00 | 3
-- Orthopedics | 2000.00 | 1
-- Neurology   | 1200.00 | 1

-- QUERY 4: Average payment amount across all paid transactions
SELECT
    ROUND(AVG(amount), 2) AS average_payment,    -- average of all paid amounts
    MIN(amount) AS smallest_payment,              -- the lowest payment
    MAX(amount) AS largest_payment                -- the highest payment
FROM payments
WHERE payment_status = 'paid';
-- Expected: average=1800.00, smallest=800.00, largest=3500.00

-- QUERY 5: Revenue by payment method
SELECT
    payment_method,
    COUNT(*) AS transaction_count,
    SUM(amount) AS total_amount
FROM payments
WHERE payment_status = 'paid'
GROUP BY payment_method
ORDER BY total_amount DESC;

-- Expected:
-- upi       | 2 | 2000.00
-- insurance | 1 | 3500.00
-- cash      | 1 | 2000.00
-- card      | 1 | 1500.00
```

---

**Test cases:**

```sql
-- TEST 1: Total number of payments
SELECT COUNT(*) FROM payments;
-- Expected: 8

-- TEST 2: Total revenue from paid payments
SELECT SUM(amount) FROM payments WHERE payment_status = 'paid';
-- Expected: 9000.00

-- TEST 3: Number of pending payments
SELECT COUNT(*) FROM payments WHERE payment_status = 'pending';
-- Expected: 2

-- TEST 4: Number of refunded payments
SELECT COUNT(*) FROM payments WHERE payment_status = 'refunded';
-- Expected: 1

-- TEST 5: Every payment references a valid appointment
SELECT COUNT(*) FROM payments p
LEFT JOIN appointments a ON p.appointment_id = a.id
WHERE a.id IS NULL;
-- Expected: 0 (no orphaned payments)

-- TEST 6: Verify indexes exist
-- Run \di and confirm you see:
-- idx_patients_phone
-- idx_doctors_specialization
-- idx_appointments_patient_id
-- idx_appointments_doctor_id
-- idx_appointments_date
-- idx_payments_appointment_id
\di
```

---

**Git commit:**

```bash
\q

git add .
git commit -m "Day 1 Hour 3: Add indexes, aggregate queries, and payments table with revenue analysis"
git push
```

---
---

## Hour 4: Hospital Schema Design -- Constraints, ENUMs, and Medical Tables

### LEARN (15 minutes)

**What are constraints?**

Constraints are rules you put on your data to prevent bad data from getting into your database. Think of them as "quality control" checks that happen automatically every time someone inserts or updates data.

```sql
-- NOT NULL: this column cannot be empty
first_name VARCHAR(100) NOT NULL
-- If someone tries to insert a patient without a first_name, the database rejects it

-- UNIQUE: no two rows can have the same value in this column
phone VARCHAR(15) UNIQUE
-- If two patients try to register with the same phone number, the database rejects the second one

-- CHECK: the value must satisfy a condition
amount DECIMAL(10,2) CHECK (amount > 0)
-- If someone tries to insert a payment with amount = -500, the database rejects it

-- DEFAULT: if no value is provided, use this one
status VARCHAR(20) DEFAULT 'scheduled'
-- If you insert an appointment without specifying status, it automatically becomes 'scheduled'

-- FOREIGN KEY (REFERENCES): the value must exist in another table
-- We already used this in Hour 2
patient_id INTEGER REFERENCES patients(id)
```

**What are ENUMs?**

An ENUM is a custom data type that only allows specific values. Instead of using VARCHAR and hoping people type the right thing, you create a list of allowed values and the database enforces it.

```sql
-- Without ENUM (risky):
gender VARCHAR(10)
-- Someone could type 'Male', 'male', 'MALE', 'M', 'boy', 'xyz' -- anything goes!

-- With ENUM (safe):
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
-- Now the column can ONLY contain 'Male', 'Female', or 'Other'
-- Any other value is rejected by the database
```

**Schema design principles:**

1. **Normalize:** Store each piece of data in exactly one place. Do not duplicate data across tables.
2. **Use foreign keys:** Connect tables with references instead of copying data.
3. **Enforce constraints:** Use NOT NULL, UNIQUE, CHECK, and ENUMs to prevent bad data.
4. **Plan for the future:** Think about what queries you will need and design your tables to support them.
5. **Name consistently:** Use snake_case for table and column names. Use plural names for tables (patients, not patient).

---

### BUILD (45 minutes)

Connect to your database:

```bash
psql -U postgres
\c ayurvena_training
```

---

**Requirement 1: Create ENUM types**

```sql
-- Create ENUM types for commonly used categorical data
-- ENUMs ensure only valid values can be stored in these columns

-- Gender: only these three values are allowed
CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Other');

-- Blood group: only valid blood types are allowed
CREATE TYPE blood_group_enum AS ENUM (
    'A+', 'A-',
    'B+', 'B-',
    'AB+', 'AB-',
    'O+', 'O-'
);

-- Appointment status: tracks the lifecycle of an appointment
CREATE TYPE appointment_status_enum AS ENUM (
    'scheduled',    -- appointment is booked but has not happened yet
    'checked-in',   -- patient has arrived at the hospital
    'in-progress',  -- patient is currently with the doctor
    'completed',    -- appointment is done
    'cancelled',    -- appointment was cancelled
    'no-show'       -- patient did not show up
);

-- Payment status: tracks the lifecycle of a payment
CREATE TYPE payment_status_enum AS ENUM (
    'pending',      -- payment has not been made yet
    'paid',         -- payment was successful
    'failed',       -- payment attempt failed
    'refunded',     -- payment was returned to the patient
    'partially-paid' -- only part of the amount was paid
);

-- Payment method: how the patient pays
CREATE TYPE payment_method_enum AS ENUM (
    'cash',         -- physical cash
    'card',         -- credit or debit card
    'upi',          -- UPI (Google Pay, PhonePe, etc.)
    'insurance',    -- health insurance
    'bank-transfer' -- direct bank transfer
);

-- Verify your ENUMs were created:
-- \dT+ lists all custom types
\dT+

-- NOTE: We are NOT going to alter the existing tables to use these ENUMs right now.
-- In a real project, you would use ALTER TABLE to change column types.
-- For this exercise, we will use these ENUMs in the NEW tables we create below.
-- When we move to Prisma (Hours 5-8), we will define everything cleanly from scratch.
```

---

**Requirement 2: Add CHECK constraints**

```sql
-- Add a CHECK constraint to the payments table:
-- Payment amount must be greater than 0 (no zero or negative payments allowed)
ALTER TABLE payments
ADD CONSTRAINT chk_payment_amount_positive CHECK (amount > 0);

-- Test it: try inserting a payment with amount = 0 (should FAIL)
-- INSERT INTO payments (appointment_id, amount, payment_method, payment_status)
-- VALUES (1, 0, 'cash', 'pending');
-- Expected: ERROR: new row violates check constraint "chk_payment_amount_positive"

-- Test it: try inserting a payment with negative amount (should FAIL)
-- INSERT INTO payments (appointment_id, amount, payment_method, payment_status)
-- VALUES (1, -100, 'cash', 'pending');
-- Expected: ERROR: new row violates check constraint "chk_payment_amount_positive"

-- Add a CHECK constraint for valid phone number length
-- Indian phone numbers are 10 digits, but with country code they can be up to 13
ALTER TABLE patients
ADD CONSTRAINT chk_patient_phone_length CHECK (LENGTH(phone) >= 10 AND LENGTH(phone) <= 15);

-- Add a CHECK constraint on doctors for phone number length as well
ALTER TABLE doctors
ADD CONSTRAINT chk_doctor_phone_length CHECK (LENGTH(phone) >= 10 AND LENGTH(phone) <= 15);

-- Verify constraints exist on a table:
\d patients
-- Look at the "Check constraints" section at the bottom
```

---

**Requirement 3: Add UNIQUE constraints**

```sql
-- Add UNIQUE constraint on patient phone numbers
-- No two patients should have the same phone number
ALTER TABLE patients
ADD CONSTRAINT uq_patient_phone UNIQUE (phone);

-- Add UNIQUE constraint on patient email addresses
-- No two patients should have the same email
ALTER TABLE patients
ADD CONSTRAINT uq_patient_email UNIQUE (email);

-- Add UNIQUE constraint on doctor phone numbers
ALTER TABLE doctors
ADD CONSTRAINT uq_doctor_phone UNIQUE (phone);

-- Test: try inserting a patient with a phone number that already exists
-- INSERT INTO patients (first_name, last_name, phone)
-- VALUES ('Test', 'User', '9876543210');
-- Expected: ERROR: duplicate key value violates unique constraint "uq_patient_phone"

-- Verify constraints:
\d patients
-- You should see both UNIQUE and CHECK constraints listed at the bottom

-- NOTE: The departments table already has UNIQUE on the name column
-- (we added it when we created the table in Hour 1)
```

---

**Requirement 4: Create the `consultations` table**

```sql
-- Create the consultations table
-- A consultation is what happens DURING an appointment
-- It records the doctor's findings, diagnosis, and follow-up plan
-- One appointment has exactly one consultation (1:1 relationship)

CREATE TABLE consultations (
    id SERIAL PRIMARY KEY,

    -- appointment_id: which appointment this consultation belongs to
    -- UNIQUE: each appointment can have only ONE consultation
    -- This creates a 1:1 (one-to-one) relationship
    appointment_id INTEGER NOT NULL UNIQUE REFERENCES appointments(id),

    -- diagnosis: what the doctor determined is wrong
    -- TEXT: no length limit because diagnoses can be detailed
    diagnosis TEXT NOT NULL,

    -- notes: additional observations from the doctor
    -- These are the doctor's personal notes about the consultation
    notes TEXT,

    -- symptoms: what the patient reported feeling
    symptoms TEXT,

    -- vitals: recorded vital signs during the visit
    -- Stored as text for simplicity; in production you might use JSONB
    vitals TEXT,

    -- follow_up_date: when the patient should come back
    -- NULL means no follow-up is needed
    follow_up_date DATE,

    -- follow_up_notes: instructions for the follow-up visit
    follow_up_notes TEXT,

    -- created_at: when this consultation record was created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add index for faster lookups
CREATE INDEX idx_consultations_appointment_id ON consultations(appointment_id);

-- Insert consultations for completed appointments
INSERT INTO consultations (appointment_id, diagnosis, notes, symptoms, vitals, follow_up_date, follow_up_notes)
VALUES
    -- Consultation for appointment 1 (Ravi - chest pain)
    (1, 'Mild angina - stable', 
     'Patient reports chest tightness during physical activity. ECG shows minor ST changes.',
     'Chest pain, shortness of breath during exertion, occasional palpitations',
     'BP: 140/90, Pulse: 88, SpO2: 97%, Temp: 98.4F',
     '2024-03-20', 'Follow-up ECG and stress test recommended'),

    -- Consultation for appointment 2 (Priya - headaches)
    (2, 'Tension-type headache',
     'Bilateral headache worsening with stress. No neurological deficits.',
     'Bilateral headache, neck stiffness, sensitivity to light',
     'BP: 120/80, Pulse: 72, SpO2: 99%, Temp: 98.6F',
     NULL, NULL),

    -- Consultation for appointment 3 (Amit - knee pain)
    (3, 'Mild osteoarthritis - right knee',
     'Crepitus on flexion. X-ray shows mild joint space narrowing.',
     'Right knee pain, stiffness in morning, difficulty climbing stairs',
     'BP: 130/85, Pulse: 76, SpO2: 98%, Temp: 98.2F',
     '2024-03-22', 'Physiotherapy referral. Review X-ray in follow-up.'),

    -- Consultation for appointment 4 (Ravi - follow-up)
    (4, 'Angina - improving with medication',
     'Patient reports reduced frequency of chest pain. Continuing medication.',
     'Occasional mild chest discomfort, improved exercise tolerance',
     'BP: 132/86, Pulse: 80, SpO2: 98%, Temp: 98.4F',
     NULL, NULL),

    -- Consultation for appointment 5 (Sunita - heart checkup)
    (5, 'Normal cardiac function',
     'Annual checkup. All cardiac markers within normal limits. Echo normal.',
     'No symptoms - routine checkup',
     'BP: 118/76, Pulse: 68, SpO2: 99%, Temp: 98.6F',
     NULL, NULL);

-- Verify
SELECT * FROM consultations;
```

---

**Requirement 5: Create the `prescriptions` table**

```sql
-- Create the prescriptions table
-- A prescription is a medicine order given during a consultation
-- One consultation can have MULTIPLE prescriptions (1:many relationship)
-- Example: a doctor might prescribe 3 different medicines in one visit

CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,

    -- consultation_id: which consultation this prescription came from
    -- NOT UNIQUE here because one consultation can have many prescriptions
    consultation_id INTEGER NOT NULL REFERENCES consultations(id),

    -- medicine_name: the name of the medicine prescribed
    medicine_name VARCHAR(200) NOT NULL,

    -- dosage: how much to take each time
    -- Examples: '500mg', '10ml', '1 tablet'
    dosage VARCHAR(50) NOT NULL,

    -- frequency: how often to take the medicine
    -- Examples: 'Once daily', 'Twice daily', 'Every 8 hours'
    frequency VARCHAR(100) NOT NULL,

    -- duration: how long to take the medicine
    -- Examples: '7 days', '2 weeks', '1 month'
    duration VARCHAR(50) NOT NULL,

    -- instructions: special instructions for taking the medicine
    -- Examples: 'Take after food', 'Take on empty stomach', 'Avoid dairy'
    instructions TEXT,

    -- is_active: whether this prescription is currently active
    -- A doctor might stop a medicine and mark it as inactive
    is_active BOOLEAN DEFAULT true,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups by consultation
CREATE INDEX idx_prescriptions_consultation_id ON prescriptions(consultation_id);

-- Insert prescriptions for our consultations
INSERT INTO prescriptions (consultation_id, medicine_name, dosage, frequency, duration, instructions)
VALUES
    -- Prescriptions for consultation 1 (Ravi - angina)
    (1, 'Aspirin', '75mg', 'Once daily', '30 days', 'Take after breakfast'),
    (1, 'Atorvastatin', '10mg', 'Once daily at night', '30 days', 'Take at bedtime'),
    (1, 'Sorbitrate', '5mg', 'As needed', '30 days', 'Place under tongue during chest pain'),

    -- Prescriptions for consultation 2 (Priya - headache)
    (2, 'Paracetamol', '500mg', 'Twice daily', '5 days', 'Take after food'),
    (2, 'Amitriptyline', '10mg', 'Once daily at night', '14 days', 'May cause drowsiness'),

    -- Prescriptions for consultation 3 (Amit - knee pain)
    (3, 'Diclofenac', '50mg', 'Twice daily', '7 days', 'Take after food. Avoid on empty stomach.'),
    (3, 'Calcium + Vitamin D3', '500mg', 'Once daily', '30 days', 'Take after lunch'),
    (3, 'Glucosamine', '1500mg', 'Once daily', '60 days', 'Take with food'),

    -- Prescriptions for consultation 4 (Ravi follow-up - continuing meds)
    (4, 'Aspirin', '75mg', 'Once daily', '30 days', 'Continue as before. Take after breakfast.'),
    (4, 'Atorvastatin', '10mg', 'Once daily at night', '30 days', 'Continue. Take at bedtime.'),
    (4, 'Metoprolol', '25mg', 'Once daily', '30 days', 'New addition. Monitor pulse rate.');

    -- Consultation 5 (Sunita - normal checkup) has no prescriptions since everything is normal

-- Verify
SELECT * FROM prescriptions;
-- Expected: 11 rows
```

---

**Requirement 6: Create the `medical_records` table**

```sql
-- Create the medical_records table
-- Medical records store documents, test results, and historical health information
-- One patient can have MANY medical records (1:many)
-- A record can optionally link to the doctor who created it

CREATE TABLE medical_records (
    id SERIAL PRIMARY KEY,

    -- patient_id: which patient this record belongs to
    patient_id INTEGER NOT NULL REFERENCES patients(id),

    -- record_type: what kind of medical record this is
    -- Examples: 'lab_result', 'imaging', 'vaccination', 'surgery_report', 'allergy', 'discharge_summary'
    record_type VARCHAR(50) NOT NULL,

    -- title: a short title for the record
    title VARCHAR(200) NOT NULL,

    -- description: detailed information about this record
    description TEXT,

    -- attachments: file paths or URLs to attached documents (X-rays, PDFs, etc.)
    -- In a production system, this would store cloud storage URLs
    attachments TEXT,

    -- recorded_by: the doctor who created this record (optional)
    -- NULL if the record was created by administrative staff
    recorded_by INTEGER REFERENCES doctors(id),

    -- record_date: when the medical event happened (not when the record was entered)
    record_date DATE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX idx_medical_records_recorded_by ON medical_records(recorded_by);
CREATE INDEX idx_medical_records_record_type ON medical_records(record_type);

-- Insert medical records
INSERT INTO medical_records (patient_id, record_type, title, description, attachments, recorded_by, record_date)
VALUES
    -- Records for Ravi (patient 1)
    (1, 'lab_result', 'Complete Blood Count',
     'Hemoglobin: 14.2 g/dL, WBC: 7500/uL, Platelets: 250000/uL. All values within normal range.',
     '/records/ravi/cbc-2024-03-15.pdf', 1, '2024-03-15'),

    (1, 'imaging', 'ECG Report',
     'Sinus rhythm. Minor ST segment changes in leads V4-V6. No acute ischemia.',
     '/records/ravi/ecg-2024-03-15.pdf', 1, '2024-03-15'),

    (1, 'imaging', 'Chest X-Ray',
     'Heart size normal. Lungs clear. No pleural effusion.',
     '/records/ravi/chest-xray-2024-03-15.pdf', 1, '2024-03-15'),

    -- Records for Priya (patient 2)
    (2, 'lab_result', 'Thyroid Panel',
     'TSH: 3.2 mIU/L (normal), T3: 120 ng/dL (normal), T4: 8.5 ug/dL (normal).',
     '/records/priya/thyroid-2024-03-15.pdf', 2, '2024-03-15'),

    -- Records for Amit (patient 3)
    (3, 'imaging', 'Right Knee X-Ray',
     'Mild joint space narrowing in medial compartment. No fracture or dislocation. Early osteoarthritis.',
     '/records/amit/knee-xray-2024-03-16.pdf', 3, '2024-03-16'),

    -- Vaccination record (no specific doctor)
    (4, 'vaccination', 'COVID-19 Vaccination - Dose 2',
     'Covishield vaccine administered. Batch: ABCD1234. No adverse reactions observed.',
     NULL, NULL, '2021-09-15'),

    -- Allergy record
    (5, 'allergy', 'Drug Allergy - Penicillin',
     'Patient reports severe rash and swelling after penicillin administration in 2019. Confirmed Type I hypersensitivity.',
     NULL, NULL, '2019-06-20');

-- Verify
SELECT * FROM medical_records;
-- Expected: 7 rows
```

---

**Final ER Diagram (ASCII Art)**

This diagram shows all the tables and their relationships:

```
+-------------------+       +--------------------+       +------------------+
|   departments     |       |     patients       |       |    doctors       |
+-------------------+       +--------------------+       +------------------+
| id (PK)           |       | id (PK)            |       | id (PK)          |
| name (UNIQUE)     |       | first_name         |       | first_name       |
| description       |       | last_name          |       | last_name        |
| floor_number      |       | date_of_birth      |       | specialization   |
| created_at        |       | gender             |       | qualification    |
+-------------------+       | blood_group        |       | phone (UNIQUE)   |
                             | phone (UNIQUE)     |       | email            |
                             | email (UNIQUE)     |       | department       |
                             | address            |       | created_at       |
                             | created_at         |       +------------------+
                             +--------------------+            |
                                  |                            |
                                  |  (1:many)                  |  (1:many)
                                  |                            |
                             +----v----------------------------v----+
                             |          appointments                |
                             +--------------------------------------+
                             | id (PK)                              |
                             | patient_id (FK -> patients.id)       |
                             | doctor_id (FK -> doctors.id)         |
                             | appointment_date                     |
                             | appointment_time                     |
                             | status                               |
                             | reason                               |
                             | created_at                           |
                             +--------------------------------------+
                                  |                    |
                                  |  (1:1)             |  (1:many)
                                  |                    |
                             +----v---------+    +-----v-----------+
                             | consultations|    |    payments      |
                             +--------------+    +-----------------+
                             | id (PK)      |    | id (PK)         |
                             | appointment_ |    | appointment_id  |
                             |   id (FK,UQ) |    |   (FK)          |
                             | diagnosis    |    | amount          |
                             | notes        |    |   (CHECK > 0)   |
                             | symptoms     |    | payment_method  |
                             | vitals       |    | payment_status  |
                             | follow_up_   |    | paid_at         |
                             |   date       |    +-----------------+
                             | follow_up_   |
                             |   notes      |
                             | created_at   |
                             +--------------+
                                  |
                                  |  (1:many)
                                  |
                             +----v--------------+
                             |  prescriptions    |
                             +-------------------+
                             | id (PK)           |
                             | consultation_id   |
                             |   (FK)            |
                             | medicine_name     |
                             | dosage            |
                             | frequency         |
                             | duration          |
                             | instructions      |
                             | is_active         |
                             | created_at        |
                             +-------------------+


+--------------------+
| medical_records    |
+--------------------+
| id (PK)            |
| patient_id         |       patient_id  -->  patients.id (FK, 1:many)
|   (FK)             |
| record_type        |       recorded_by -->  doctors.id  (FK, optional)
| title              |
| description        |
| attachments        |
| recorded_by (FK)   |
| record_date        |
| created_at         |
+--------------------+

RELATIONSHIPS SUMMARY:
  patients     ---(1:many)---  appointments    : One patient can have many appointments
  doctors      ---(1:many)---  appointments    : One doctor can have many appointments
  appointments ---(1:1)------  consultations   : One appointment has one consultation
  appointments ---(1:many)---  payments        : One appointment can have multiple payments
  consultations---(1:many)---  prescriptions   : One consultation can have many prescriptions
  patients     ---(1:many)---  medical_records : One patient can have many medical records
  doctors      ---(1:many)---  medical_records : One doctor can record many medical records

ENUM TYPES CREATED:
  gender_enum             : Male, Female, Other
  blood_group_enum        : A+, A-, B+, B-, AB+, AB-, O+, O-
  appointment_status_enum : scheduled, checked-in, in-progress, completed, cancelled, no-show
  payment_status_enum     : pending, paid, failed, refunded, partially-paid
  payment_method_enum     : cash, card, upi, insurance, bank-transfer

CONSTRAINTS APPLIED:
  patients.phone          : UNIQUE, CHECK (length 10-15)
  patients.email          : UNIQUE
  doctors.phone           : UNIQUE, CHECK (length 10-15)
  departments.name        : UNIQUE
  payments.amount         : CHECK (> 0)
  consultations.appt_id   : UNIQUE (enforces 1:1 with appointments)
```

---

**Test cases:**

```sql
-- TEST 1: Verify all ENUM types exist
\dT+
-- Expected: 5 enum types listed (gender_enum, blood_group_enum,
-- appointment_status_enum, payment_status_enum, payment_method_enum)

-- TEST 2: Verify CHECK constraint on payments (should FAIL)
-- INSERT INTO payments (appointment_id, amount, payment_method, payment_status)
-- VALUES (1, -50.00, 'cash', 'pending');
-- Expected: ERROR: violates check constraint "chk_payment_amount_positive"

-- TEST 3: Verify UNIQUE constraint on patient phone (should FAIL)
-- INSERT INTO patients (first_name, last_name, phone)
-- VALUES ('Duplicate', 'Phone', '9876543210');
-- Expected: ERROR: violates unique constraint "uq_patient_phone"

-- TEST 4: Verify consultations 1:1 relationship (should FAIL)
-- INSERT INTO consultations (appointment_id, diagnosis)
-- VALUES (1, 'Duplicate consultation');
-- Expected: ERROR: violates unique constraint (appointment_id is UNIQUE)

-- TEST 5: Count records in new tables
SELECT 'consultations' AS table_name, COUNT(*) AS row_count FROM consultations
UNION ALL
SELECT 'prescriptions', COUNT(*) FROM prescriptions
UNION ALL
SELECT 'medical_records', COUNT(*) FROM medical_records;
-- Expected:
-- consultations  | 5
-- prescriptions  | 11
-- medical_records | 7

-- TEST 6: Verify all foreign keys are valid (no orphaned records)
-- Check consultations -> appointments
SELECT COUNT(*) FROM consultations c
LEFT JOIN appointments a ON c.appointment_id = a.id
WHERE a.id IS NULL;
-- Expected: 0

-- Check prescriptions -> consultations
SELECT COUNT(*) FROM prescriptions p
LEFT JOIN consultations c ON p.consultation_id = c.id
WHERE c.id IS NULL;
-- Expected: 0

-- Check medical_records -> patients
SELECT COUNT(*) FROM medical_records mr
LEFT JOIN patients p ON mr.patient_id = p.id
WHERE p.id IS NULL;
-- Expected: 0

-- BONUS: Full query across all tables -- patient journey
-- This shows a complete patient visit: appointment -> consultation -> prescriptions
SELECT
    p.first_name || ' ' || p.last_name AS patient,
    d.first_name || ' ' || d.last_name AS doctor,
    a.appointment_date,
    c.diagnosis,
    pr.medicine_name,
    pr.dosage,
    pr.frequency,
    pay.amount AS payment,
    pay.payment_status
FROM appointments a
INNER JOIN patients p ON a.patient_id = p.id
INNER JOIN doctors d ON a.doctor_id = d.id
LEFT JOIN consultations c ON a.id = c.appointment_id
LEFT JOIN prescriptions pr ON c.id = pr.consultation_id
LEFT JOIN payments pay ON a.id = pay.appointment_id
WHERE a.status = 'completed'
ORDER BY a.appointment_date, p.last_name, pr.medicine_name;
-- This joins 6 tables together to show the complete picture!
```

---

**Git commit:**

```bash
\q

git add .
git commit -m "Day 1 Hour 4: Hospital schema with ENUMs, constraints, consultations, prescriptions, medical records"
git push
```

---

**End of Day 1, Hours 1-4. You now have a complete hospital database schema with:**
- 7 tables: patients, doctors, departments, appointments, payments, consultations, prescriptions, medical_records
- Foreign key relationships connecting all tables
- ENUM types for standardized values
- CHECK, UNIQUE, and NOT NULL constraints for data integrity
- Indexes for query performance
- Sample data across all tables

**Next up (Hours 5-8): Prisma ORM -- connecting your database to TypeScript.**

---

## Hour 5: Prisma ORM -- Setup & Schema Design

### LEARN (20 minutes)

#### What Is Prisma?

Prisma is an **Object-Relational Mapping (ORM)** tool. ORM means "we write TypeScript, and Prisma converts it to SQL for us." Instead of writing raw SQL queries like:

```sql
SELECT * FROM patients WHERE id = 1;
```

You write TypeScript like:

```typescript
const patient = await prisma.patient.findUnique({ where: { id: 1 } });
```

**Why Prisma instead of raw SQL?**
1. **Type safety**: TypeScript knows the shape of your data
2. **Migrations**: Prisma generates SQL migrations automatically
3. **Relations**: Prisma handles JOINs automatically with `include`
4. **Schema as source of truth**: Everything defined in `schema.prisma`

#### How Prisma Works

```
schema.prisma (model definitions)
  -> prisma generate -> Prisma Client (TypeScript code)
  -> prisma migrate  -> SQL migration files
  -> Your database (PostgreSQL)
```

#### Prisma Schema Anatomy

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Patient {
  id        Int      @id @default(autoincrement())
  firstName String   @map("first_name")
  // @map bridges camelCase (Prisma) to snake_case (database)
}
```

#### Key Prisma Concepts

- **`@id`**: Primary key
- **`@default(autoincrement())`**: SERIAL behavior
- **`@map()`**: Maps Prisma field to database column name
- **`@relation()`**: Defines a relationship between models
- **`@unique`**: UNIQUE constraint
- **`?`**: Optional field (nullable)
- **`@@map("table_name")`**: Maps model to database table name

---

### BUILD (45 minutes)

**Task:** Set up Prisma and create the complete schema.

#### Step 1: Initialize the project

```bash
mkdir ayurvena-backend
cd ayurvena-backend
npm init -y
npm install typescript @types/node tsx --save-dev
npx tsc --init
```

#### Step 2: Install Prisma

```bash
npm install prisma @prisma/client --save
npx prisma init
# Creates: prisma/schema.prisma and .env
```

#### Step 3: Configure database connection

```env
# .env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/ayurvena"

#### Step 4: Write the complete Prisma schema

Open `prisma/schema.prisma` and write this:

```prisma
// prisma/schema.prisma
// Prisma field names are camelCase, db columns are snake_case
// @map() bridges the two naming conventions

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// DEPARTMENT: One department has many doctors
model Department {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  description String?
  floorNumber Int?     @map("floor_number")
  createdAt   DateTime @default(now()) @map("created_at")
  doctors     Doctor[] // Relation: this dept has many doctors
  @@map("departments")
}

// PATIENT: Stores personal info, has many appointments & records
model Patient {
  id          Int             @id @default(autoincrement())
  firstName   String          @map("first_name")
  lastName    String          @map("last_name")
  dateOfBirth DateTime        @map("date_of_birth")
  gender      String?
  bloodGroup  String?         @map("blood_group")
  phone       String          @unique
  email       String?         @unique
  address     String?
  createdAt   DateTime        @default(now()) @map("created_at")
  appointments   Appointment[]
  medicalRecords MedicalRecord[]
  @@map("patients")
}

// DOCTOR: Belongs to one department, has many appointments
model Doctor {
  id             Int      @id @default(autoincrement())
  firstName      String   @map("first_name")
  lastName       String   @map("last_name")
  specialization String
  qualification  String?
  phone          String   @unique
  email          String?
  departmentId   Int      @map("department_id")
  createdAt      DateTime @default(now()) @map("created_at")
  department     Department     @relation(fields: [departmentId], references: [id])
  appointments   Appointment[]
  medicalRecords MedicalRecord[]
  @@map("doctors")
}

// APPOINTMENT: Links a patient to a doctor at a specific time
model Appointment {
  id              Int      @id @default(autoincrement())
  patientId       Int      @map("patient_id")
  doctorId        Int      @map("doctor_id")
  appointmentDate DateTime @map("appointment_date")
  appointmentTime String   @map("appointment_time")
  status          String   @default("scheduled")
  reason          String?
  createdAt       DateTime @default(now()) @map("created_at")
  patient        Patient        @relation(fields: [patientId], references: [id])
  doctor         Doctor         @relation(fields: [doctorId], references: [id])
  consultation   Consultation?
  payments       Payment[]
  @@map("appointments")
}

// CONSULTATION: 1:1 with Appointment, has many prescriptions
model Consultation {
  id             Int       @id @default(autoincrement())
  appointmentId  Int       @unique @map("appointment_id")
  diagnosis      String
  notes          String?
  symptoms       String?
  vitals         String?
  followUpDate   DateTime? @map("follow_up_date")
  followUpNotes  String?   @map("follow_up_notes")
  createdAt      DateTime  @default(now()) @map("created_at")
  appointment    Appointment    @relation(fields: [appointmentId], references: [id])
  prescriptions  Prescription[]
  @@map("consultations")
}

// PRESCRIPTION: Many per consultation
model Prescription {
  id             Int      @id @default(autoincrement())
  consultationId Int      @map("consultation_id")
  medicineName   String   @map("medicine_name")
  dosage         String
  frequency      String
  duration       String
  instructions   String?
  isActive       Boolean  @default(true) @map("is_active")
  createdAt      DateTime @default(now()) @map("created_at")
  consultation   Consultation @relation(fields: [consultationId], references: [id])
  @@map("prescriptions")
}

// PAYMENT: Tracks payments for appointments
model Payment {
  id             Int      @id @default(autoincrement())
  appointmentId  Int      @map("appointment_id")
  amount         Decimal  @db.Decimal(10, 2)
  paymentMethod  String   @default("cash") @map("payment_method")
  paymentStatus  String   @default("pending") @map("payment_status")
  paidAt         DateTime @default(now()) @map("paid_at")
  createdAt      DateTime @default(now()) @map("created_at")
  appointment    Appointment @relation(fields: [appointmentId], references: [id])
  @@map("payments")
}

// MEDICAL RECORD: Lab results, imaging, vaccination records
model MedicalRecord {
  id           Int      @id @default(autoincrement())
  patientId    Int      @map("patient_id")
  recordType   String   @map("record_type")
  title        String
  description  String?
  attachments  String?
  recordedBy   Int?     @map("recorded_by")
  recordDate   DateTime @map("record_date")
  createdAt    DateTime @default(now()) @map("created_at")
  patient      Patient  @relation(fields: [patientId], references: [id])
  doctor       Doctor?  @relation(fields: [recordedBy], references: [id])
  @@map("medical_records")
}
```

#### Step 5: Generate Prisma Client

```bash
npx prisma generate
# Expected: ✔ Generated Prisma Client (v5.x.x) to .\node_modules\.prisma\client
```

#### Step 6: Open Prisma Studio

```bash
npx prisma studio
# Opens http://localhost:5555 - browse your models visually
```

**Key Prisma concepts:**
- `@relation(fields: [localField], references: [remoteField])` defines foreign keys
- Relation fields (like `department`) give you access to related data via `include`
- Scalar fields (like `departmentId`) store the actual integer value
- `@@map` sets the DB table name, `@map` sets the DB column name

#### Step 7: Commit

```bash
git add .
git commit -m "Day 1 Hour 5: Prisma schema with all hospital models and relations"
git push
```

---

## Hour 6: Prisma Migrations & Seed Data

### LEARN (15 minutes)

#### What Is a Migration?

A **migration** is a record of a schema change. Like Git for your database:

- First migration: creates all tables
- Second migration: adds a column
- Third migration: renames a table

**Why migrations?**
1. **Reproducibility**: Anyone runs `npx prisma migrate deploy` and gets the same schema
2. **Version control**: Migration files go in Git alongside your code
3. **Rollbacks**: You can undo a migration
4. **History**: See exactly when each change was made

#### Migration Commands

```bash
npx prisma migrate dev --name init     # Create + apply migration
npx prisma migrate deploy              # Apply pending migrations (production)
npx prisma migrate reset               # Drop + re-apply all migrations
npx prisma migrate status              # Check migration status

---

### BUILD (45 minutes)

**Task:** Create and apply migrations, write a seed script with 20 patients and 5 doctors.

#### Step 1: Create the initial migration

```bash
npx prisma migrate dev --name init

# Look at the generated SQL:
Get-Content -Path "prisma/migrations/*/migration.sql"
```

Prisma generated all CREATE TABLE statements, foreign keys, and indexes from your schema automatically.

#### Step 2: Create the seed script

Create `prisma/seed.ts`:

```typescript
// prisma/seed.ts - Populates database with sample data
// Run: npx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create Departments (8)
  const departments = [
    { name: 'Cardiology', description: 'Heart and cardiovascular system', floorNumber: 1 },
    { name: 'Neurology', description: 'Brain and nervous system', floorNumber: 2 },
    { name: 'Orthopedics', description: 'Bones, joints, and muscles', floorNumber: 3 },
    { name: 'Pediatrics', description: 'Medical care for children', floorNumber: 2 },
    { name: 'General Medicine', description: 'Primary care and internal medicine', floorNumber: 1 },
    { name: 'Dermatology', description: 'Skin, hair, and nails', floorNumber: 3 },
    { name: 'Ophthalmology', description: 'Eye care and vision', floorNumber: 4 },
    { name: 'ENT', description: 'Ear, nose, and throat', floorNumber: 4 },
  ];

  for (const dept of departments) {
    // upsert: if name exists, skip; otherwise create
    await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept,
    });
  }
  console.log(`✅ ${departments.length} departments created`);

  // 2. Create Doctors (5) - need department IDs first
  const cardio = await prisma.department.findUnique({ where: { name: 'Cardiology' } });
  const neuro = await prisma.department.findUnique({ where: { name: 'Neurology' } });
  const ortho = await prisma.department.findUnique({ where: { name: 'Orthopedics' } });
  const pedia = await prisma.department.findUnique({ where: { name: 'Pediatrics' } });
  const general = await prisma.department.findUnique({ where: { name: 'General Medicine' } });

  const doctors = [
    { firstName: 'Dr. Suresh', lastName: 'Iyer', specialization: 'Cardiologist', qualification: 'MBBS, MD, DM Cardiology', phone: '9988776651', email: 'suresh.iyer@ayurvena.com', departmentId: cardio!.id },
    { firstName: 'Dr. Lakshmi', lastName: 'Devi', specialization: 'Neurologist', qualification: 'MBBS, MD, DM Neurology', phone: '9988776652', email: 'lakshmi.devi@ayurvena.com', departmentId: neuro!.id },
    { firstName: 'Dr. Rajesh', lastName: 'Gupta', specialization: 'Orthopedic Surgeon', qualification: 'MBBS, MS Orthopedics', phone: '9988776653', email: 'rajesh.gupta@ayurvena.com', departmentId: ortho!.id },
    { firstName: 'Dr. Ananya', lastName: 'Menon', specialization: 'Pediatrician', qualification: 'MBBS, MD Pediatrics', phone: '9988776654', email: 'ananya.menon@ayurvena.com', departmentId: pedia!.id },
    { firstName: 'Dr. Venkat', lastName: 'Rao', specialization: 'General Physician', qualification: 'MBBS, MD Internal Medicine', phone: '9988776655', email: 'venkat.rao@ayurvena.com', departmentId: general!.id },
  ];

  for (const doc of doctors) {
    await prisma.doctor.upsert({ where: { phone: doc.phone }, update: {}, create: doc });
  }
  console.log(`✅ ${doctors.length} doctors created`);

  // 3. Create Patients (20)
  const patients = [
    { firstName: 'Ravi', lastName: 'Kumar', dateOfBirth: new Date('1985-06-15'), gender: 'Male', bloodGroup: 'O+', phone: '9876543201', email: 'ravi.kumar@email.com', address: '123 Main St, Bangalore' },
    { firstName: 'Priya', lastName: 'Sharma', dateOfBirth: new Date('1992-03-22'), gender: 'Female', bloodGroup: 'A+', phone: '9876543202', email: 'priya.sharma@email.com', address: '456 Park Ave, Bangalore' },
    { firstName: 'Amit', lastName: 'Patel', dateOfBirth: new Date('1978-11-08'), gender: 'Male', bloodGroup: 'B+', phone: '9876543203', email: 'amit.patel@email.com', address: '789 Lake Rd, Bangalore' },
    { firstName: 'Sunita', lastName: 'Reddy', dateOfBirth: new Date('1995-09-30'), gender: 'Female', bloodGroup: 'AB+', phone: '9876543204', email: 'sunita.reddy@email.com', address: '321 Hill View, Bangalore' },
    { firstName: 'Vijay', lastName: 'Singh', dateOfBirth: new Date('1988-02-14'), gender: 'Male', bloodGroup: 'A-', phone: '9876543205', email: 'vijay.singh@email.com', address: '654 River Side, Bangalore' },
    { firstName: 'Neha', lastName: 'Joshi', dateOfBirth: new Date('1990-07-18'), gender: 'Female', bloodGroup: 'B-', phone: '9876543206', email: 'neha.joshi@email.com', address: '789 Garden Ln, Bangalore' },
    { firstName: 'Arun', lastName: 'Nair', dateOfBirth: new Date('1982-12-25'), gender: 'Male', bloodGroup: 'O-', phone: '9876543207', email: 'arun.nair@email.com', address: '159 Beach Rd, Bangalore' },
    { firstName: 'Deepa', lastName: 'Iyer', dateOfBirth: new Date('1998-04-10'), gender: 'Female', bloodGroup: 'AB-', phone: '9876543208', email: 'deepa.iyer@email.com', address: '753 Lake View, Bangalore' },
    { firstName: 'Karthik', lastName: 'Rajan', dateOfBirth: new Date('1975-08-30'), gender: 'Male', bloodGroup: 'A+', phone: '9876543209', email: 'karthik.rajan@email.com', address: '951 Park St, Bangalore' },
    { firstName: 'Meera', lastName: 'Chopra', dateOfBirth: new Date('2000-01-05'), gender: 'Female', bloodGroup: 'B+', phone: '9876543210', email: 'meera.chopra@email.com', address: '357 Mall Rd, Bangalore' },
    { firstName: 'Suresh', lastName: 'Kamath', dateOfBirth: new Date('1986-05-20'), gender: 'Male', bloodGroup: 'O+', phone: '9876543211', email: 'suresh.kamath@email.com', address: '852 Ring Rd, Bangalore' },
    { firstName: 'Anita', lastName: 'Desai', dateOfBirth: new Date('1993-09-12'), gender: 'Female', bloodGroup: 'A-', phone: '9876543212', email: 'anita.desai@email.com', address: '963 Hill Rd, Bangalore' },
    { firstName: 'Rahul', lastName: 'Verma', dateOfBirth: new Date('1980-02-28'), gender: 'Male', bloodGroup: 'AB+', phone: '9876543213', email: 'rahul.verma@email.com', address: '147 MG Rd, Bangalore' },
    { firstName: 'Pooja', lastName: 'Gupta', dateOfBirth: new Date('1996-11-15'), gender: 'Female', bloodGroup: 'B-', phone: '9876543214', email: 'pooja.gupta@email.com', address: '258 Residency Rd, Bangalore' },
    { firstName: 'Manoj', lastName: 'Pillai', dateOfBirth: new Date('1972-06-08'), gender: 'Male', bloodGroup: 'O+', phone: '9876543215', email: 'manoj.pillai@email.com', address: '369 Church St, Bangalore' },
    { firstName: 'Latha', lastName: 'Srinivas', dateOfBirth: new Date('1989-03-25'), gender: 'Female', bloodGroup: 'A+', phone: '9876543216', email: 'latha.srinivas@email.com', address: '741 Brigade Rd, Bangalore' },
    { firstName: 'Ganesh', lastName: 'Murthy', dateOfBirth: new Date('1976-10-02'), gender: 'Male', bloodGroup: 'B+', phone: '9876543217', email: 'ganesh.murthy@email.com', address: '852 Double Rd, Bangalore' },
    { firstName: 'Sneha', lastName: 'Kapoor', dateOfBirth: new Date('1999-07-19'), gender: 'Female', bloodGroup: 'AB-', phone: '9876543218', email: 'sneha.kapoor@email.com', address: '963 Koramangala, Bangalore' },
    { firstName: 'Dinesh', lastName: 'Shetty', dateOfBirth: new Date('1983-12-11'), gender: 'Male', bloodGroup: 'O-', phone: '9876543219', email: 'dinesh.shetty@email.com', address: '159 Indiranagar, Bangalore' },
    { firstName: 'Kavita', lastName: 'Nambiar', dateOfBirth: new Date('1991-08-05'), gender: 'Female', bloodGroup: 'A+', phone: '9876543220', email: 'kavita.nambiar@email.com', address: '357 Whitefield, Bangalore' },
  ];

  for (const p of patients) {
    await prisma.patient.upsert({ where: { phone: p.phone }, update: {}, create: p });
  }
  console.log(`✅ ${patients.length} patients created`);

  // 4. Create Appointments (13)
  const allPatients = await prisma.patient.findMany();
  const allDoctors = await prisma.doctor.findMany();

  const appts = [
    [0, 0, '2024-03-15', '09:00', 'completed', 'Chest pain and shortness of breath'],
    [1, 1, '2024-03-15', '10:00', 'completed', 'Recurring headaches'],
    [2, 2, '2024-03-16', '11:00', 'completed', 'Right knee pain since 2 months'],
    [0, 0, '2024-03-20', '09:00', 'completed', 'Follow-up on chest pain treatment'],
    [3, 4, '2024-03-20', '14:00', 'completed', 'Annual health checkup'],
    [4, 0, '2024-03-22', '09:30', 'scheduled', 'Heart evaluation and ECG'],
    [1, 1, '2024-03-25', '10:00', 'scheduled', 'Follow-up headache assessment'],
    [2, 1, '2024-03-25', '11:30', 'scheduled', 'Nerve pain in left leg'],
    [5, 4, '2024-03-26', '09:00', 'scheduled', 'Fever and cough'],
    [6, 0, '2024-03-26', '10:00', 'scheduled', 'Chest discomfort'],
    [7, 4, '2024-03-27', '11:00', 'scheduled', 'General weakness'],
    [8, 2, '2024-03-27', '14:00', 'scheduled', 'Lower back pain'],
    [9, 4, '2024-03-28', '09:00', 'scheduled', 'Routine checkup'],
  ];

  for (const [pIdx, dIdx, date, time, status, reason] of appts) {
    await prisma.appointment.create({
      data: {
        patientId: allPatients[pIdx].id,
        doctorId: allDoctors[dIdx].id,
        appointmentDate: new Date(date),
        appointmentTime: time,
        status,
        reason,
      },
    });
  }
  console.log(`✅ ${appts.length} appointments created`);

  // 5. Create Consultations & Prescriptions
  const completed = await prisma.appointment.findMany({
    where: { status: 'completed' },
    orderBy: { id: 'asc' },
  });

  const diagnoses = ['Mild angina - stable', 'Tension-type headache', 'Mild osteoarthritis - right knee', 'Angina - improving', 'Normal cardiac function'];
  const notesList = ['ECG shows minor ST changes.', 'No neurological deficits.', 'X-ray shows mild joint space narrowing.', 'Reduced chest pain frequency.', 'All cardiac markers normal.'];
  const symptomsList = ['Chest pain, SOB', 'Bilateral headache', 'Right knee pain, stiffness', 'Occasional chest discomfort', 'No symptoms - routine'];

  for (let i = 0; i < completed.length; i++) {
    const c = await prisma.consultation.create({
      data: {
        appointmentId: completed[i].id,
        diagnosis: diagnoses[i],
        notes: notesList[i],
        symptoms: symptomsList[i],
        vitals: 'BP: 120/80, Pulse: 72',
        followUpDate: i === 0 ? new Date('2024-03-20') : null,
        followUpNotes: i === 0 ? 'Follow-up ECG recommended' : null,
      },
    });

    const meds = [
      [
        { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days', instructions: 'After breakfast' },
        { name: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily at night', duration: '30 days', instructions: 'At bedtime' },
      ],
      [
        { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days', instructions: 'After food' },
      ],
      [
        { name: 'Diclofenac', dosage: '50mg', frequency: 'Twice daily', duration: '7 days', instructions: 'After food' },
        { name: 'Calcium + D3', dosage: '500mg', frequency: 'Once daily', duration: '30 days', instructions: 'After lunch' },
      ],
      [
        { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days', instructions: 'Continue as before' },
        { name: 'Metoprolol', dosage: '25mg', frequency: 'Once daily', duration: '30 days', instructions: 'Monitor pulse' },
      ],
      [],
    ];

    for (const med of meds[i] || []) {
      await prisma.prescription.create({
        data: { consultationId: c.id, ...med },
      });
    }
  }
  console.log(`✅ ${completed.length} consultations with prescriptions created`);

  // 6. Create Payments
  const paymentData = [
    { idx: 0, amount: 500.00, method: 'card' },
    { idx: 1, amount: 350.00, method: 'cash' },
    { idx: 2, amount: 450.00, method: 'upi' },
    { idx: 3, amount: 300.00, method: 'insurance' },
    { idx: 4, amount: 1000.00, method: 'card' },
  ];

  for (const pay of paymentData) {
    await prisma.payment.create({
      data: {
        appointmentId: completed[pay.idx].id,
        amount: pay.amount,
        paymentMethod: pay.method,
        paymentStatus: 'paid',
      },
    });
  }
  console.log(`✅ ${paymentData.length} payments created`);
  console.log('🎉 Seed completed!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
```

#### Step 3: Configure seed command

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

#### Step 4: Run the seed

```bash
npx prisma db seed
# Expected:
# 🌱 Starting seed...
# ✅ 8 departments created
# ✅ 5 doctors created
# ✅ 20 patients created
# ✅ 13 appointments created
# ✅ 5 consultations with prescriptions created
# ✅ 5 payments created
# 🎉 Seed completed!
```

#### Step 5: Verify data

```bash
npx prisma studio
# Opens browser at http://localhost:5555 to browse all data visually
```

Or run a quick verification:

```bash
echo '
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function verify() {
  const counts = {
    departments: await prisma.department.count(),
    doctors: await prisma.doctor.count(),
    patients: await prisma.patient.count(),
    appointments: await prisma.appointment.count(),
    consultations: await prisma.consultation.count(),
    prescriptions: await prisma.prescription.count(),
    payments: await prisma.payment.count(),
  };
  console.table(counts);
  await prisma.$disconnect();
}
verify();
' > prisma/verify.ts && npx tsx prisma/verify.ts
```

#### Step 6: Commit

```bash
git add .
git commit -m "Day 1 Hour 6: Prisma migrations and seed script with 20 patients, 5 doctors"
git push
```

---

## Hour 7: Prisma CRUD Operations

### LEARN (20 minutes)

CRUD = **C**reate, **R**ead, **U**pdate, **D**elete

| Operation | Prisma Method | SQL |
|-----------|--------------|-----|
| Create | `prisma.model.create()` | INSERT INTO |
| Read (one) | `prisma.model.findUnique()` | SELECT ... WHERE id = |
| Read (many) | `prisma.model.findMany()` | SELECT ... |
| Update | `prisma.model.update()` | UPDATE ... SET |
| Delete | `prisma.model.delete()` | DELETE FROM ... |

#### Key Prisma methods

```typescript
// CREATE
await prisma.patient.create({ data: { firstName: 'Test', lastName: 'User', dateOfBirth: new Date(), phone: '9999999999' } });

// READ by ID (fastest)
await prisma.patient.findUnique({ where: { id: 1 } });

// READ with filters
await prisma.patient.findMany({
  where: { bloodGroup: 'O+' },
  orderBy: { lastName: 'asc' },
  take: 10, skip: 0,
});

// UPDATE
await prisma.patient.update({ where: { id: 1 }, data: { phone: '8888888888' } });

// DELETE
await prisma.patient.delete({ where: { id: 99 } });

// UPSERT (create if not exists, update if exists)
await prisma.patient.upsert({
  where: { phone: '9999999999' },
  update: { address: 'New Address' },
  create: { firstName: 'New', lastName: 'Patient', dateOfBirth: new Date(), phone: '9999999999' },
});
```

#### Including relations (JOINs)

```typescript
const patient = await prisma.patient.findUnique({
  where: { id: 1 },
  include: {
    appointments: {           // JOIN to appointments
      include: {
        doctor: {             // Nested JOIN to doctor
          include: { department: true },  // 3 levels deep
        },
        consultation: {
          include: { prescriptions: true },  // 4 levels deep
        },
      },
    },
  },
});
```

#### select vs include

- `include`: Returns ALL fields of related model
- `select`: Returns ONLY specified fields (more efficient)

```typescript
// select: only get what you need
await prisma.patient.findUnique({
  where: { id: 1 },
  select: { firstName: true, lastName: true, phone: true },
});
```

---

### BUILD (45 minutes)

**Task:** Create a CRUD demo script.

Create `prisma/crud-demo.ts`:

```typescript
// prisma/crud-demo.ts - Demonstrates all CRUD operations
// Run: npx tsx prisma/crud-demo.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('PRISMA CRUD DEMO\n');

  // CREATE
  console.log('--- CREATE ---');
  const newPatient = await prisma.patient.create({
    data: {
      firstName: 'New', lastName: 'Patient', dateOfBirth: new Date('1995-05-05'),
      gender: 'Male', bloodGroup: 'O+', phone: '7777777777',
      email: 'new@email.com', address: '100 Test Street',
    },
  });
  console.log('Created patient:', newPatient.id, newPatient.firstName);

  // READ (by ID)
  console.log('\n--- READ ---');
  const patient1 = await prisma.patient.findUnique({ where: { id: 1 } });
  console.log('Patient #1:', patient1?.firstName, patient1?.lastName);

  // READ (by unique field)
  const byPhone = await prisma.patient.findUnique({ where: { phone: '9876543201' } });
  console.log('By phone:', byPhone?.firstName);

  // READ (filtered)
  const males = await prisma.patient.findMany({ where: { gender: 'Male' } });
  console.log('Male patients:', males.length);

  // READ with includes (JOIN)
  const completedAppts = await prisma.appointment.findMany({
    where: { status: 'completed' },
    include: {
      patient: { select: { firstName: true, lastName: true } },
      doctor: { select: { firstName: true, lastName: true } },
    },
    orderBy: { appointmentDate: 'asc' },
  });
  console.log('Completed appts:', completedAppts.length);

  // READ with advanced filtering
  const oPositiveMales = await prisma.patient.findMany({
    where: { bloodGroup: 'O+', gender: 'Male' },
  });
  console.log('O+ Males:', oPositiveMales.length);

  const recentAppts = await prisma.appointment.findMany({
    where: { appointmentDate: { gte: new Date('2024-03-20') } },
    orderBy: { appointmentDate: 'asc' },
  });
  console.log('Appts from Mar 20:', recentAppts.length);

  // UPDATE
  console.log('\n--- UPDATE ---');
  const updated = await prisma.patient.update({
    where: { id: newPatient.id },
    data: { phone: '8888888888' },
  });
  console.log('Updated phone:', updated.phone);

  // DELETE
  console.log('\n--- DELETE ---');
  await prisma.patient.delete({ where: { id: newPatient.id } });
  console.log('Deleted test patient');

  // UPSERT
  console.log('\n--- UPSERT ---');
  const dept = await prisma.department.upsert({
    where: { name: 'Emergency' },
    update: { floorNumber: 1 },
    create: { name: 'Emergency', description: 'Emergency care', floorNumber: 1 },
  });
  console.log('Upserted:', dept.name, '(id:', dept.id, ')');

  // Clean up Emergency dept
  await prisma.department.deleteMany({ where: { name: 'Emergency' } });

  console.log('\nCRUD demo complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
```

Run it:

```bash
npx tsx prisma/crud-demo.ts
```

#### Step 2: Commit

```bash
git add .
git commit -m "Day 1 Hour 7: Prisma CRUD operations - create, read, update, delete, upsert"
git push
```

---

## Hour 8: Prisma Advanced Queries

### LEARN (20 minutes)

#### Advanced Features

**1. Pagination**
```typescript
const page1 = await prisma.patient.findMany({ take: 10, skip: 0, orderBy: { lastName: 'asc' } });
const page2 = await prisma.patient.findMany({ take: 10, skip: 10, orderBy: { lastName: 'asc' } });
// Cursor-based (efficient for large datasets)
const page = await prisma.patient.findMany({ take: 10, cursor: { id: 50 }, skip: 1 });
```

**2. Aggregation**
```typescript
const stats = await prisma.payment.aggregate({
  _sum: { amount: true }, _avg: { amount: true },
  _count: true, _max: { amount: true }, _min: { amount: true },
});
```

**3. Group By**
```typescript
const byMethod = await prisma.payment.groupBy({
  by: ['paymentMethod'],
  _sum: { amount: true }, _count: true,
  orderBy: { _sum: { amount: 'desc' } },
});
```

**4. Transactions (atomic operations)**
```typescript
const [appt, payment] = await prisma.$transaction([
  prisma.appointment.create({ data: { ... } }),
  prisma.payment.create({ data: { ... } }),
]);
// Both succeed OR both fail -- no orphaned records
```

---

### BUILD (45 minutes)

**Task:** Write analytical queries using Prisma's advanced features.

Create `prisma/advanced-queries.ts`:

```typescript
// prisma/advanced-queries.ts - Analytics with advanced Prisma features
// Run: npx tsx prisma/advanced-queries.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('ADVANCED PRISMA QUERIES\n');

  // 1. PAGINATION
  console.log('--- PAGINATION ---');
  const page1 = await prisma.patient.findMany({
    take: 5, skip: 0, orderBy: { lastName: 'asc' },
    select: { id: true, firstName: true, lastName: true, phone: true },
  });
  console.log('Page 1:', page1.length, 'patients');

  const page2 = await prisma.patient.findMany({
    take: 5, skip: 5, orderBy: { lastName: 'asc' },
    select: { id: true, firstName: true, lastName: true, phone: true },
  });
  console.log('Page 2:', page2.length, 'patients');

  // 2. AGGREGATION - Revenue stats
  console.log('\n--- REVENUE STATS ---');
  const stats = await prisma.payment.aggregate({
    _sum: { amount: true },
    _avg: { amount: true },
    _count: true,
    _max: { amount: true },
    _min: { amount: true },
  });
  console.log('Total revenue:', stats._sum.amount);
  console.log('Average payment:', Number(stats._avg.amount).toFixed(2));
  console.log('Transactions:', stats._count);

  // 3. GROUP BY - Revenue by method
  console.log('\n--- REVENUE BY METHOD ---');
  const byMethod = await prisma.payment.groupBy({
    by: ['paymentMethod'],
    _sum: { amount: true },
    _count: true,
    orderBy: { _sum: { amount: 'desc' } },
  });
  byMethod.forEach(r => console.log(`  ${r.paymentMethod}: ₹${r._sum.amount} (${r._count} txns)`));

  // 4. GROUP BY - Appointments by status
  console.log('\n--- APPOINTMENTS BY STATUS ---');
  const byStatus = await prisma.appointment.groupBy({
    by: ['status'],
    _count: true,
    orderBy: { _count: { id: 'desc' } },
  });
  byStatus.forEach(a => console.log(`  ${a.status}: ${a._count}`));

  // 5. NESTED INCLUDES - Patient full history
  console.log('\n--- PATIENT FULL HISTORY ---');
  const history = await prisma.patient.findUnique({
    where: { id: 1 }, // Ravi Kumar
    include: {
      appointments: {
        include: {
          doctor: { include: { department: true } },
          consultation: { include: { prescriptions: true } },
          payments: true,
        },
        orderBy: { appointmentDate: 'desc' },
      },
      medicalRecords: { orderBy: { recordDate: 'desc' } },
    },
  });

  console.log(`Patient: ${history?.firstName} ${history?.lastName}`);
  for (const apt of history?.appointments || []) {
    console.log(`  ${apt.appointmentDate.toISOString().split('T')[0]} - Dr. ${apt.doctor.firstName} ${apt.doctor.lastName} (${apt.doctor.department.name})`);
    if (apt.consultation) console.log(`    Diagnosis: ${apt.consultation.diagnosis}`);
    if (apt.payments.length) apt.payments.forEach(p => console.log(`    Paid: ₹${p.amount}`));
  }

  // 6. DOCTOR WORKLOAD
  console.log('\n--- DOCTOR WORKLOAD ---');
  const doctors = await prisma.doctor.findMany({
    include: {
      department: true,
      _count: { select: { appointments: true } },
    },
  });
  doctors.forEach(d => console.log(`  Dr. ${d.firstName} (${d.department.name}): ${d._count.appointments} appointments`));

  // 7. RAW SQL (when Prisma is not enough)
  console.log('\n--- RAW SQL ---');
  const raw = await prisma.$queryRaw`
    SELECT d.first_name || ' ' || d.last_name AS name,
           dep.name AS dept,
           COUNT(a.id) AS appts,
           COALESCE(SUM(pay.amount), 0) AS revenue
    FROM doctors d
    JOIN departments dep ON d.department_id = dep.id
    LEFT JOIN appointments a ON d.id = a.doctor_id
    LEFT JOIN payments pay ON a.id = pay.appointment_id
    GROUP BY d.id, dep.name
    ORDER BY revenue DESC
  `;
  for (const r of raw as any[]) console.log(`  Dr. ${r.name} (${r.dept}): ${r.appts} appts, ₹${r.revenue}`);

  console.log('\nAdvanced queries complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
```

Run it:

```bash
npx tsx prisma/advanced-queries.ts
```

#### Step 2: Commit

```bash
git add .
git commit -m "Day 1 Hour 8: Prisma advanced queries - pagination, aggregation, groupBy, nested includes, raw SQL"
git push
```

---

**End of Day 1. You have completed:**
- Hours 1-4: PostgreSQL database design, SQL fundamentals, relationships, constraints
- Hours 5-6: Prisma ORM setup, schema design, migrations, seed data
- Hours 7-8: Prisma CRUD operations and advanced queries

**Next up (Day 2, Hours 9-16): NestJS -- building REST APIs with controllers, services, DTOs, and Swagger documentation.**

---

# Day 2: NestJS + REST APIs (Hours 9-16)

## Hour 9: NestJS Project Setup & Modules

### LEARN (20 minutes)

#### What Is NestJS?

NestJS is a **framework for building server-side applications** with Node.js. It organizes your backend code into modules, controllers, and services.

**Why NestJS?**
- **Structure**: Forces organization into modules, controllers, services
- **TypeScript**: Built-in support with decorators
- **Dependency Injection**: Automatic object creation and sharing
- **Modular**: Each feature gets its own module

#### NestJS Architecture

```
Module (organizer)
  +-- Controller (handles HTTP requests)
  +-- Service (business logic, talks to database)
```

**Three core concepts:**
1. **Module** (`@Module`): Groups related code together
2. **Controller** (`@Controller`): Handles HTTP requests/responses
3. **Provider/Service** (`@Injectable`): Contains business logic

---

### BUILD (45 minutes)

**Task:** Initialize NestJS project and create module structure.

#### Step 1: Install NestJS CLI

```bash
npm install -g @nestjs/cli
nest --version  # Should be 10.x.x
```

#### Step 2: Create the project

```bash
cd ..
nest new ayurvena-nest
# Choose npm as package manager when prompted
cd ayurvena-nest
```

#### Step 3: Install dependencies

```bash
npm install @prisma/client
npm install prisma --save-dev
npm install class-validator class-transformer
npm install @nestjs/swagger swagger-ui-express

# Copy Prisma schema from the previous setup
# Copy prisma/ folder into this project
# Copy .env with DATABASE_URL
npx prisma generate
npx prisma db seed
```

#### Step 4: Create feature modules

```bash
nest generate module patients
```

Or create manually. Each module file:

```typescript
// src/patients/patients.module.ts
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class PatientsModule {}
```

Create modules for: `patients`, `doctors`, `appointments`, `payments`.

#### Step 5: Register in root module

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [PatientsModule, DoctorsModule, AppointmentsModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

#### Step 6: Verify it compiles

```bash
npm run build
```

#### Step 7: Commit

```bash
git add .
git commit -m "Day 2 Hour 9: NestJS project setup with patients, doctors, appointments, payments modules"
git push
```

---

## Hour 10: Controllers & Routing

### LEARN (15 minutes)

A **controller** handles incoming HTTP requests.

| Decorator | HTTP Method | Use Case |
|-----------|-------------|----------|
| `@Get()` | GET | Fetch data |
| `@Post()` | POST | Create data |
| `@Put()` | PUT | Replace record |
| `@Patch()` | PATCH | Update partially |
| `@Delete()` | DELETE | Remove record |

**Route parameters:** `@Param('id')` extracts `:id` from URL
**Query parameters:** `@Query('page')` extracts `?page=` from URL
**Request body:** `@Body()` extracts JSON body from request

---

### BUILD (45 minutes)

**Task:** Create controllers for all features.

#### Step 1: Patients Controller

```typescript
// src/patients/patients.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

@Controller('patients')  // All routes start with /patients
export class PatientsController {

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return { message: 'Returns all patients', page, limit };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { message: `Returns patient ${id}` };
  }

  @Post()
  create(@Body() body: any) {
    return { message: 'Creates a patient', data: body };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return { message: `Updates patient ${id}`, data: body };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return { message: `Deletes patient ${id}` };
  }
}
```

#### Step 2: Doctors Controller

```typescript
// src/doctors/doctors.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

@Controller('doctors')
export class DoctorsController {

  @Get()
  findAll(@Query('specialization') specialization?: string) {
    return { message: 'Returns all doctors', filter: { specialization } };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { message: `Returns doctor ${id}` };
  }

  @Post()
  create(@Body() body: any) {
    return { message: 'Creates a doctor', data: body };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return { message: `Updates doctor ${id}`, data: body };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return { message: `Deletes doctor ${id}` };
  }
}
```

#### Step 3: Appointments Controller

```typescript
// src/appointments/appointments.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

@Controller('appointments')
export class AppointmentsController {

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('patientId') patientId?: string,
    @Query('doctorId') doctorId?: string,
  ) {
    return { message: 'Returns appointments', filters: { status, patientId, doctorId } };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { message: `Returns appointment ${id}` };
  }

  @Post()
  create(@Body() body: any) {
    return { message: 'Creates appointment', data: body };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return { message: `Updates appointment ${id}`, data: body };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return { message: `Deletes appointment ${id}` };
  }
}
```

#### Step 4: Payments Controller

```typescript
// src/payments/payments.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {

  @Get()
  findAll(
    @Query('appointmentId') appointmentId?: string,
    @Query('paymentMethod') paymentMethod?: string,
  ) {
    return { message: 'Returns payments', filters: { appointmentId, paymentMethod } };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { message: `Returns payment ${id}` };
  }

  @Post()
  create(@Body() body: any) {
    return { message: 'Creates payment', data: body };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return { message: `Updates payment ${id}`, data: body };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return { message: `Deletes payment ${id}` };
  }
}
```

#### Step 5: Register controllers in modules

```typescript
// src/patients/patients.module.ts
import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';

@Module({
  controllers: [PatientsController],
  providers: [],
})
export class PatientsModule {}
```

Do the same for doctors, appointments, payments.

#### Step 6: Test the routes

```bash
npm run start:dev
# Server runs on http://localhost:3000

# Test in another terminal:
curl http://localhost:3000/patients
curl http://localhost:3000/patients/1
curl -X POST http://localhost:3000/patients -H "Content-Type: application/json" -d '{"firstName":"Test","lastName":"User","phone":"9999999999"}'
curl http://localhost:3000/appointments?status=completed
```

#### Step 7: Commit

```bash
git add .
git commit -m "Day 2 Hour 10: Controllers with routing for all features"
git push
```

---

## Hour 11: Services & Dependency Injection

### LEARN (20 minutes)

#### What Is a Service?

A **service** contains business logic. Controllers are thin -- they just route requests. Services do the real work.

**Why separate?**
1. **Separation of concerns**: Controllers handle HTTP, services handle logic
2. **Reusability**: Same service can be used by multiple controllers
3. **Testability**: Test services without HTTP

#### Dependency Injection (DI)

Without DI (bad -- controller creates its own service):
```typescript
class PatientsController {
  private service = new PatientsService(); // Tightly coupled, hard to test
}
```

With DI (good -- NestJS provides the service):
```typescript
class PatientsController {
  constructor(private service: PatientsService) {} // NestJS injects automatically
}
```

---

### BUILD (45 minutes)

**Task:** Create services and inject them into controllers.

#### Step 1: Patients Service

```typescript
// src/patients/patients.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientsService {
  // In-memory storage (will replace with Prisma in Hour 13)
  private patients = [
    { id: 1, firstName: 'Ravi', lastName: 'Kumar', phone: '9876543201' },
    { id: 2, firstName: 'Priya', lastName: 'Sharma', phone: '9876543202' },
  ];
  private nextId = 3;

  findAll(page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const items = this.patients.slice(start, start + limit);
    return {
      data: items,
      meta: { total: this.patients.length, page, limit,
              totalPages: Math.ceil(this.patients.length / limit) },
    };
  }

  findOne(id: number) {
    return this.patients.find(p => p.id === id) || null;
  }

  create(data: any) {
    const patient = { id: this.nextId++, ...data, createdAt: new Date() };
    this.patients.push(patient);
    return patient;
  }

  update(id: number, data: any) {
    const idx = this.patients.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.patients[idx] = { ...this.patients[idx], ...data };
    return this.patients[idx];
  }

  delete(id: number) {
    const idx = this.patients.findIndex(p => p.id === id);
    if (idx === -1) return null;
    return this.patients.splice(idx, 1)[0];
  }
}
```

#### Step 2: Inject service into controller

```typescript
// src/patients/patients.controller.ts (updated)
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  // Dependency Injection: NestJS creates PatientsService and passes it here
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.patientsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = this.patientsService.findOne(id);
    if (!patient) return { statusCode: 404, message: `Patient ${id} not found` };
    return patient;
  }

  @Post()
  create(@Body() body: any) {
    return this.patientsService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const result = this.patientsService.update(id, body);
    if (!result) return { statusCode: 404, message: `Patient ${id} not found` };
    return result;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const result = this.patientsService.delete(id);
    if (!result) return { statusCode: 404, message: `Patient ${id} not found` };
    return { message: 'Deleted', patient: result };
  }
}
```

#### Step 3: Register service in module

```typescript
// src/patients/patients.module.ts
import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],  // Register service for DI
  exports: [PatientsService],    // Allow other modules to use it
})
export class PatientsModule {}
```

#### Step 4: Test the full CRUD flow

```bash
# Server should be running (npm run start:dev)
curl http://localhost:3000/patients
curl http://localhost:3000/patients/1
curl -X POST http://localhost:3000/patients -H "Content-Type: application/json" -d '{"firstName":"New","lastName":"Patient","phone":"8888888888"}'
curl -X PUT http://localhost:3000/patients/1 -H "Content-Type: application/json" -d '{"phone":"7777777777"}'
curl -X DELETE http://localhost:3000/patients/3
curl http://localhost:3000/patients/999  # Should return 404
```

#### Step 5: Commit

```bash
git add .
git commit -m "Day 2 Hour 11: Services with dependency injection"
git push
```

---

## Hour 12: DTOs & Validation

### LEARN (15 minutes)

**DTO** = **D**ata **T**ransfer **O**bject. Defines the shape of data flowing in/out of your API.

**Why DTOs?**
1. **Validation**: Ensure data has correct fields and types
2. **Documentation**: Swagger generates API docs from DTOs
3. **Type safety**: TypeScript knows exact data shapes
4. **Security**: Strips unexpected fields (whitelist)

#### Validation Decorators

```typescript
import { IsString, IsEmail, IsOptional, IsInt, MinLength, MaxLength, IsPositive, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString() @MinLength(2) @MaxLength(50)
  firstName: string;

  @IsEmail() @IsOptional()
  email?: string;

  @IsDateString()
  dateOfBirth: string;
}
```

#### ValidationPipe

```typescript
// In main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,           // Strip unknown properties
  forbidNonWhitelisted: true,// Throw error for unknown props
  transform: true,           // Auto-convert types
}));

---

### BUILD (45 minutes)

**Task:** Create DTOs with validation for all features.

#### Step 1: Enable global validation in main.ts

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  await app.listen(3000);
  console.log('Ayurvena API running on http://localhost:3000');
}
bootstrap();
```

#### Step 2: Create Patient DTOs

```typescript
// src/patients/dto/create-patient.dto.ts
import { IsString, IsEmail, IsOptional, IsDateString, MinLength, MaxLength } from 'class-validator';

export class CreatePatientDto {
  @IsString() @MinLength(2) @MaxLength(50)
  firstName: string;

  @IsString() @MinLength(2) @MaxLength(50)
  lastName: string;

  @IsDateString({}, { message: 'Date of birth must be YYYY-MM-DD' })
  dateOfBirth: string;

  @IsOptional() @IsString()
  gender?: string;

  @IsOptional() @IsString()
  bloodGroup?: string;

  @IsString() @MinLength(10) @MaxLength(15)
  phone: string;

  @IsOptional() @IsEmail()
  email?: string;

  @IsOptional() @IsString()
  address?: string;
}
```

```typescript
// src/patients/dto/update-patient.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';

// PartialType makes ALL fields optional -- perfect for updates
export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
```

#### Step 3: Create Doctor DTOs

```typescript
// src/doctors/dto/create-doctor.dto.ts
import { IsString, IsEmail, IsOptional, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateDoctorDto {
  @IsString() @MinLength(2) @MaxLength(50)
  firstName: string;
  @IsString() @MinLength(2) @MaxLength(50)
  lastName: string;
  @IsString()
  specialization: string;
  @IsOptional() @IsString()
  qualification?: string;
  @IsString() @MinLength(10) @MaxLength(15)
  phone: string;
  @IsOptional() @IsEmail()
  email?: string;
  @IsInt()
  departmentId: number;
}
```

```typescript
// src/doctors/dto/update-doctor.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';
export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
```

#### Step 4: Create Appointment DTOs

```typescript
// src/appointments/dto/create-appointment.dto.ts
import { IsString, IsInt, IsDateString, IsOptional, MinLength } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  patientId: number;
  @IsInt()
  doctorId: number;
  @IsDateString()
  appointmentDate: string;
  @IsString()
  appointmentTime: string;
  @IsOptional() @IsString()
  status?: string;
  @IsOptional() @IsString() @MinLength(3)
  reason?: string;
}
```

```typescript
// src/appointments/dto/update-appointment.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
```

#### Step 5: Create Payment DTOs

```typescript
// src/payments/dto/create-payment.dto.ts
import { IsInt, IsNumber, IsString, IsOptional, IsPositive } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  appointmentId: number;
  @IsNumber() @IsPositive({ message: 'Amount must be > 0' })
  amount: number;
  @IsOptional() @IsString()
  paymentMethod?: string;
  @IsOptional() @IsString()
  paymentStatus?: string;
}
```

```typescript
// src/payments/dto/update-payment.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
```

#### Step 6: Update controllers to use DTOs

```typescript
// src/patients/patients.controller.ts (updated with DTOs)
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.patientsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = this.patientsService.findOne(id);
    if (!patient) return { statusCode: 404, message: `Patient ${id} not found` };
    return patient;
  }

  // @Body() now uses CreatePatientDto -- validation runs automatically
  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
    const result = this.patientsService.update(id, dto);
    if (!result) return { statusCode: 404, message: `Patient ${id} not found` };
    return result;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const result = this.patientsService.delete(id);
    if (!result) return { statusCode: 404, message: `Patient ${id} not found` };
    return { message: 'Deleted', patient: result };
  }
}
```

#### Step 7: Test validation

```bash
# Test: missing required field (should fail)
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test"}'
# Expected: 400 Bad Request with errors about missing lastName, dateOfBirth, phone

# Test: invalid email (should fail)
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","dateOfBirth":"1990-01-01","phone":"9999999999","email":"not-an-email"}'
# Expected: 400 Bad Request, email must be a valid email

# Test: valid data (should succeed)
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Valid","lastName":"User","dateOfBirth":"1990-01-01","phone":"9999999999"}'

# Test: unknown property (should fail - forbidNonWhitelisted)
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","dateOfBirth":"1990-01-01","phone":"9999999999","hack":"malicious"}'
# Expected: 400, property hack should not exist
```

#### Step 8: Commit

```bash
git add .
git commit -m "Day 2 Hour 12: DTOs with class-validator validation for all features"
git push
```

---

## Hour 13: Connecting NestJS to Prisma

### LEARN (15 minutes)

Currently our services use in-memory arrays. Now we connect them to the real PostgreSQL database through Prisma.

**Pattern: PrismaModule + PrismaService**

We create a reusable `PrismaService` that:
1. Connects to the database when the app starts
2. Disconnects when the app shuts down
3. Provides the Prisma client to all services

```
PrismaModule (global module -- available everywhere)
  +-- PrismaService (wraps PrismaClient)
        +-- Injected into PatientsService
        +-- Injected into DoctorsService
        +-- Injected into AppointmentsService
        +-- Injected into PaymentsService

---

### BUILD (45 minutes)

**Task:** Create PrismaModule + PrismaService and use it in feature services.

#### Step 1: Create PrismaService

```typescript
// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to PostgreSQL via Prisma');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Disconnected from PostgreSQL');
  }
}
```

#### Step 2: Create PrismaModule

```typescript
// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()  // GlobalModule -- available in all modules without importing
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

#### Step 3: Register PrismaModule in AppModule

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [PrismaModule, PatientsModule, DoctorsModule, AppointmentsModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

#### Step 4: Create Prisma DTOs for type safety

```typescript
// src/prisma/prisma.types.ts
// Helper types to match Prisma schema shapes
import { Patient, Doctor, Appointment, Payment, Department } from '@prisma/client';

export type PatientResponse = Omit<Patient, 'createdAt' | 'updatedAt'> & {
  createdAt?: string;
};

export type DoctorWithDepartment = Doctor & { department?: Department };

export type AppointmentWithRelations = Appointment & {
  patient?: Patient;
  doctor?: Doctor & { department?: Department };
};

export type PaymentWithAppointment = Payment & { appointment?: Appointment };
```

#### Step 5: Ensure Prisma schema is set up

First ensure the Prisma schema is in the project:

```bash
# Copy Prisma schema and seed from previous project
cp ../ayurvena-server/prisma/schema.prisma ./prisma/schema.prisma
cp ../ayurvena-server/prisma/seed.ts ./prisma/seed.ts
cp ../ayurvena-server/.env ./.env

# Regenerate client
npx prisma generate
npx prisma db seed
```

#### Step 6: Commit

```bash
git add .
git commit -m "Day 2 Hour 13: PrismaModule + PrismaService (global)"
git push
```

---

## Hour 14: Refactoring Services to Use Prisma

### LEARN (10 minutes)

**Goal:** Replace in-memory arrays with Prisma database calls.

**Before (in-memory):**
```typescript
private patients = [{ id: 1, firstName: 'Ravi' }];
findAll() { return this.patients; }
```

**After (Prisma):**
```typescript
findAll() { return this.prisma.patient.findMany(); }
```

Prisma auto-generates CRUD methods for each model: `findMany`, `findUnique`, `create`, `update`, `delete`.

---

### BUILD (50 minutes)

**Task:** Rewrite all services to use Prisma instead of in-memory arrays.

#### Step 1: PatientsService with Prisma

```typescript
// src/patients/patients.service.ts (refactored)
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.patient.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.patient.count(),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) throw new NotFoundException(`Patient ${id} not found`);
    return patient;
  }

  async create(dto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: {
        ...dto,
        dateOfBirth: new Date(dto.dateOfBirth),
      },
    });
  }

  async update(id: number, dto: UpdatePatientDto) {
    try {
      return await this.prisma.patient.update({
        where: { id },
        data: {
          ...dto,
          ...(dto.dateOfBirth && { dateOfBirth: new Date(dto.dateOfBirth) }),
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Patient ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.patient.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Patient ${id} not found`);
      }
      throw error;
    }
  }
}
```

#### Step 2: Update controller to handle async/await

```typescript
// src/patients/patients.controller.ts (async version)
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.patientsService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
    return this.patientsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.delete(id);
  }
}
```

#### Step 3: DoctorsService with Prisma

```typescript
// src/doctors/doctors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(specialization?: string) {
    const where = specialization ? { specialization } : {};
    return this.prisma.doctor.findMany({
      where,
      include: { department: true },
      orderBy: { firstName: 'asc' },
    });
  }

  async findOne(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { department: true, appointments: true },
    });
    if (!doctor) throw new NotFoundException(`Doctor ${id} not found`);
    return doctor;
  }

  async create(dto: CreateDoctorDto) {
    return this.prisma.doctor.create({
      data: dto,
      include: { department: true },
    });
  }

  async update(id: number, dto: UpdateDoctorDto) {
    try {
      return await this.prisma.doctor.update({
        where: { id },
        data: dto,
        include: { department: true },
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Doctor ${id} not found`);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.doctor.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Doctor ${id} not found`);
      throw error;
    }
  }
}
```

#### Step 4: AppointmentsService with Prisma

```typescript
// src/appointments/appointments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: { status?: string; patientId?: number; doctorId?: number }) {
    const where: any = {};
    if (filters.status) where.status = filters.status;
    if (filters.patientId) where.patientId = filters.patientId;
    if (filters.doctorId) where.doctorId = filters.doctorId;

    return this.prisma.appointment.findMany({
      where,
      include: { patient: true, doctor: true, payment: true },
      orderBy: { appointmentDate: 'desc' },
    });
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { patient: true, doctor: { include: { department: true } }, payment: true },
    });
    if (!appointment) throw new NotFoundException(`Appointment ${id} not found`);
    return appointment;
  }

  async create(dto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: {
        ...dto,
        appointmentDate: new Date(dto.appointmentDate),
        status: 'scheduled',
      },
      include: { patient: true, doctor: true },
    });
  }

  async update(id: number, dto: UpdateAppointmentDto) {
    try {
      return await this.prisma.appointment.update({
        where: { id },
        data: {
          ...dto,
          ...(dto.appointmentDate && { appointmentDate: new Date(dto.appointmentDate) }),
        },
        include: { patient: true, doctor: true },
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Appointment ${id} not found`);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.appointment.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Appointment ${id} not found`);
      throw error;
    }
  }
}
```

#### Step 5: PaymentsService with Prisma

```typescript
// src/payments/payments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: { appointmentId?: number; paymentMethod?: string }) {
    const where: any = {};
    if (filters.appointmentId) where.appointmentId = filters.appointmentId;
    if (filters.paymentMethod) where.paymentMethod = filters.paymentMethod;

    return this.prisma.payment.findMany({
      where,
      include: { appointment: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { appointment: { include: { patient: true, doctor: true } } },
    });
    if (!payment) throw new NotFoundException(`Payment ${id} not found`);
    return payment;
  }

  async create(dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        ...dto,
        paymentDate: new Date(),
        paymentStatus: 'completed',
      },
      include: { appointment: true },
    });
  }

  async update(id: number, dto: UpdatePaymentDto) {
    try {
      return await this.prisma.payment.update({
        where: { id },
        data: dto,
        include: { appointment: true },
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Payment ${id} not found`);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.payment.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Payment ${id} not found`);
      throw error;
    }
  }
}
```

#### Step 6: Register services in modules

Update each module file to inject the service:

```typescript
// src/patients/patients.module.ts
import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
```

Repeat for DoctorsModule, AppointmentsModule, PaymentsModule.

#### Step 7: Test the full flow

```bash
# Start fresh -- drop and recreate DB
npx prisma migrate reset --force  # Drops all data, runs migrations, runs seed
npm run start:dev

# Test CRUD
curl http://localhost:3000/patients
curl -X POST http://localhost:3000/patients -H "Content-Type: application/json" -d '{"firstName":"DB","lastName":"Patient","dateOfBirth":"1995-05-15","phone":"1111111111"}'
curl http://localhost:3000/patients/1
curl -X PUT http://localhost:3000/patients/1 -H "Content-Type: application/json" -d '{"phone":"2222222222"}'
curl -X DELETE http://localhost:3000/patients/1
```

#### Step 8: Commit

```bash
git add .
git commit -m "Day 2 Hour 14: Services refactored to use Prisma with database CRUD"
git push
```

---

## Hour 15: Exception Filters & Error Handling

### LEARN (15 minutes)

#### HTTP Exceptions

NestJS provides built-in exceptions:

| Exception | Status Code | Use Case |
|-----------|-------------|----------|
| `BadRequestException` | 400 | Validation errors |
| `NotFoundException` | 404 | Resource not found |
| `ConflictException` | 409 | Duplicate record |
| `UnauthorizedException` | 401 | Not logged in |
| `ForbiddenException` | 403 | No permission |
| `InternalServerErrorException` | 500 | Unexpected error |

#### Exception Filter

A **filter** catches thrown exceptions and returns consistent JSON:

```typescript
// Without filter -- NestJS defaults:
{ "message": "Patient not found", "error": "Not Found", "statusCode": 404 }

// With custom filter -- your format:
{ "success": false, "message": "Patient not found", "statusCode": 404, "timestamp": "2026-01-01T..." }
```

---

### BUILD (45 minutes)

**Task:** Build a global exception filter and update controllers.

#### Step 1: Create a global exception filter

```typescript
// src/common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message || exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(`${request.method} ${request.url} -> ${status}: ${message}`, exception instanceof Error ? exception.stack : '');

    response.status(status).json({
      success: false,
      statusCode: status,
      message: Array.isArray(message) ? message : [message],
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

#### Step 2: Register the filter globally in main.ts

```typescript
// src/main.ts (updated)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
  console.log('Ayurvena API running on http://localhost:3000');
}
bootstrap();
```

#### Step 3: Create pagination and API response helpers

```typescript
// src/common/interceptors/transform.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  meta?: any;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        ...(data?.meta ? { data: data.data, meta: data.meta } : { data }),
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

Register the interceptor in main.ts:

```typescript
// In main.ts
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

// After pipes, before listen
app.useGlobalInterceptors(new TransformInterceptor());
```

#### Step 4: Test error handling

```bash
# Test 404
curl http://localhost:3000/patients/99999
# Expected: { "success": false, "statusCode": 404, "message": ["Patient 99999 not found"], ... }

# Test validation error
curl -X POST http://localhost:3000/patients -H "Content-Type: application/json" -d '{}'
# Expected: { "success": false, "statusCode": 400, "message": ["firstName must be a string", ...], ... }

# Test success with interceptor
curl http://localhost:3000/patients/1
# Expected: { "success": true, "data": { ... }, "timestamp": "..." }
```

#### Step 5: Commit

```bash
git add .
git commit -m "Day 2 Hour 15: Global exception filter, interceptor, consistent API responses"
git push
```

---

## Hour 16: Swagger / OpenAPI Documentation

### LEARN (15 minutes)

#### What Is Swagger?

**Swagger** auto-generates interactive API documentation. Once set up:
- Users can see all endpoints at `/api`
- They can test requests directly from the browser
- DTOs automatically appear as request/response schemas

#### Why Document APIs?

1. **Frontend team** knows exact request/response shapes
2. **Testing** can be done from browser
3. **Auto-generated** -- no manual docs to maintain
4. **Standard** -- OpenAPI is the industry specification

---

### BUILD (45 minutes)

**Task:** Add Swagger documentation to all endpoints.

#### Step 1: Configure Swagger in main.ts

```typescript
// src/main.ts (final version)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  // Error handling
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Ayurvena API')
    .setDescription('Hospital Management System API built with NestJS + Prisma')
    .setVersion('1.0')
    .addTag('Patients', 'Patient management endpoints')
    .addTag('Doctors', 'Doctor management endpoints')
    .addTag('Appointments', 'Appointment scheduling endpoints')
    .addTag('Payments', 'Payment processing endpoints')
    .addBearerAuth()  // For JWT later
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('Swagger documentation at http://localhost:3000/api');

  await app.listen(3000);
  console.log('Ayurvena API running on http://localhost:3000');
}
bootstrap();
```

#### Step 2: Add Swagger decorators to DTOs

```typescript
// src/patients/dto/create-patient.dto.ts
import { IsString, IsEmail, IsOptional, IsDateString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Ravi', description: 'Patient first name' })
  @IsString() @MinLength(2) @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Kumar', description: 'Patient last name' })
  @IsString() @MinLength(2) @MaxLength(50)
  lastName: string;

  @ApiProperty({ example: '1990-01-15', description: 'Date of birth (YYYY-MM-DD)' })
  @IsDateString({}, { message: 'Date of birth must be YYYY-MM-DD' })
  dateOfBirth: string;

  @ApiPropertyOptional({ example: 'Male', description: 'Gender' })
  @IsOptional() @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 'O+', description: 'Blood group' })
  @IsOptional() @IsString()
  bloodGroup?: string;

  @ApiProperty({ example: '9876543210', description: 'Phone number' })
  @IsString() @MinLength(10) @MaxLength(15)
  phone: string;

  @ApiPropertyOptional({ example: 'ravi@example.com', description: 'Email address' })
  @IsOptional() @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '123 Main St, Bangalore', description: 'Address' })
  @IsOptional() @IsString()
  address?: string;
}
```

```typescript
// src/doctors/dto/create-doctor.dto.ts
import { IsString, IsEmail, IsOptional, IsInt, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Dr. Sanjay', description: 'Doctor first name' })
  @IsString() @MinLength(2) @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Patel', description: 'Doctor last name' })
  @IsString() @MinLength(2) @MaxLength(50)
  lastName: string;

  @ApiProperty({ example: 'Cardiologist', description: 'Medical specialization' })
  @IsString()
  specialization: string;

  @ApiPropertyOptional({ example: 'MD, DM Cardiology', description: 'Qualifications' })
  @IsOptional() @IsString()
  qualification?: string;

  @ApiProperty({ example: '9876543210', description: 'Phone number' })
  @IsString() @MinLength(10) @MaxLength(15)
  phone: string;

  @ApiPropertyOptional({ example: 'dr.sanjay@ayurvena.com', description: 'Email address' })
  @IsOptional() @IsEmail()
  email?: string;

  @ApiProperty({ example: 1, description: 'Department ID' })
  @IsInt()
  departmentId: number;
}
```

```typescript
// src/appointments/dto/create-appointment.dto.ts
import { IsString, IsInt, IsDateString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1, description: 'Patient ID' })
  @IsInt()
  patientId: number;

  @ApiProperty({ example: 1, description: 'Doctor ID' })
  @IsInt()
  doctorId: number;

  @ApiProperty({ example: '2026-01-15', description: 'Appointment date (YYYY-MM-DD)' })
  @IsDateString()
  appointmentDate: string;

  @ApiProperty({ example: '10:30', description: 'Appointment time (HH:MM)' })
  @IsString()
  appointmentTime: string;

  @ApiPropertyOptional({ example: 'scheduled', description: 'Status (scheduled, completed, cancelled)' })
  @IsOptional() @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'Annual checkup', description: 'Reason for visit' })
  @IsOptional() @IsString() @MinLength(3)
  reason?: string;
}
```

```typescript
// src/payments/dto/create-payment.dto.ts
import { IsInt, IsNumber, IsString, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'Appointment ID' })
  @IsInt()
  appointmentId: number;

  @ApiProperty({ example: 500, description: 'Payment amount' })
  @IsNumber() @IsPositive({ message: 'Amount must be > 0' })
  amount: number;

  @ApiPropertyOptional({ example: 'cash', description: 'Payment method (cash, card, upi)' })
  @IsOptional() @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({ example: 'completed', description: 'Payment status' })
  @IsOptional() @IsString()
  paymentStatus?: string;
}
```

#### Step 3: Add Swagger decorators to controllers

```typescript
// src/patients/patients.controller.ts (with Swagger decorators)
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@ApiTags('Patients')
@ApiBearerAuth()
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients', description: 'Returns paginated list of patients' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Patients list returned successfully' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.patientsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiParam({ name: 'id', description: 'Patient ID' })
  @ApiResponse({ status: 200, description: 'Patient found' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'Patient created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update patient details' })
  @ApiParam({ name: 'id', description: 'Patient ID' })
  @ApiResponse({ status: 200, description: 'Patient updated' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
    return this.patientsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient' })
  @ApiParam({ name: 'id', description: 'Patient ID' })
  @ApiResponse({ status: 200, description: 'Patient deleted' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.delete(id);
  }
}
```

Apply similar Swagger decorators to DoctorsController, AppointmentsController, PaymentsController.

#### Step 4: View the documentation

```bash
npm run start:dev

# Open in browser:
# http://localhost:3000/api
# You'll see the Swagger UI with all endpoints grouped by tag
# Click "Try it out" to test requests directly
```

#### Step 5: Day 2 recap

**Concepts covered:**

| Concept | What It Does |
|---------|-------------|
| NestJS Modules | Organize code by feature |
| Controllers | Handle HTTP routing |
| Services | Business logic with DI |
| DTOs | Data validation & shape |
| PrismaService | Database access |
| Exception filters | Consistent error responses |
| Interceptors | Transform outgoing data |
| Swagger | Auto-generated API docs |

**Files created:**
```
src/
  main.ts                      # App entry, validation, swagger
  app.module.ts                # Root module
  prisma/
    prisma.service.ts          # DB connection
    prisma.module.ts           # Global module
  common/
    filters/http-exception.filter.ts
    interceptors/transform.interceptor.ts
  patients/
    patients.module.ts
    patients.controller.ts
    patients.service.ts
    dto/create-patient.dto.ts
    dto/update-patient.dto.ts
  doctors/
    doctors.module.ts
    doctors.controller.ts
    doctors.service.ts
    dto/create-doctor.dto.ts
    dto/update-doctor.dto.ts
  appointments/
    appointments.module.ts
    appointments.controller.ts
    appointments.service.ts
    dto/create-appointment.dto.ts
    dto/update-appointment.dto.ts
  payments/
    payments.module.ts
    payments.controller.ts
    payments.service.ts
    dto/create-payment.dto.ts
    dto/update-payment.dto.ts
```

#### Step 6: Commit Day 2 completion

```bash
git add .
git commit -m "Day 2 complete: NestJS REST APIs with CRUD, validation, Prisma, Swagger"
git push
```

---

# Day 3: Advanced Features (Hours 17-24)

## Hour 17: JWT Authentication

### LEARN (20 minutes)

**Why authentication?**
- Protects patient medical data (GDPR compliance)
- Only authorized doctors/nurses/admins can access
- Each user has different permissions

**JWT (JSON Web Token):**
```
Header + Payload + Signature = JWT
```

**Flow:**
1. User sends `email + password` to `/auth/login`
2. Server validates credentials, returns a **JWT token**
3. Client includes token in `Authorization: Bearer <token>` header
4. Server validates token on each protected route

**NestJS Auth Architecture:**
```
AuthModule
  +-- AuthController (login, register)
  +-- AuthService (validate user, generate JWT)
  +-- JwtStrategy (validate token from header)
  +-- JwtAuthGuard (protect routes)
```

---

### BUILD (40 minutes)

**Task:** Implement JWT authentication.

#### Step 1: Install auth dependencies

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install @types/passport-jwt @types/bcrypt --save-dev
```

#### Step 2: Create AuthModule

```bash
nest generate module auth
nest generate controller auth
nest generate service auth
```

#### Step 3: AuthService

```typescript
// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user);
  }

  private generateToken(user: { id: number; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
```

#### Step 4: JwtStrategy

```typescript
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key-change-in-prod',
    });
  }

  async validate(payload: { sub: number; email: string; role: string }) {
    // This gets attached to request.user
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
```

#### Step 5: JwtAuthGuard

```typescript
// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

#### Step 6: AuthController

```typescript
// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

export class RegisterDto {
  email: string;
  password: string;
  name: string;
}

export class LoginDto {
  email: string;
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
```

#### Step 7: Configure AuthModule

```typescript
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key-change-in-prod',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
```

#### Step 8: Protect routes

```typescript
// src/patients/patients.controller.ts (protected)
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)  // All routes in this controller require JWT
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients (authenticated)' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.patientsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID (authenticated)' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create patient (authenticated)' })
  async create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update patient (authenticated)' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
    return this.patientsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient (authenticated)' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.delete(id);
  }
}
```

Apply `@UseGuards(JwtAuthGuard)` to all feature controllers.

#### Step 9: Test auth flow

```bash
# Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ayurvena.com","password":"password123","name":"Admin User"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ayurvena.com","password":"password123"}'
# Returns: { "accessToken": "eyJhbGci...", "user": {...} }

# Access protected route
TOKEN="eyJhbGci..."
curl http://localhost:3000/patients \
  -H "Authorization: Bearer $TOKEN"

# Access without token (should fail 401)
curl http://localhost:3000/patients
# Expected: 401 Unauthorized
```

#### Step 10: Commit

```bash
git add .
git commit -m "Day 3 Hour 17: JWT authentication with register, login, route protection"
git push
```

---

## Hour 18: Database Transactions

### LEARN (15 minutes)

**What is a transaction?**
A group of database operations that run together. Either **all succeed** or **none take effect**.

**Example -- creating an appointment + payment:**
```
1. Create appointment record
2. Create payment record        <- If this fails, the appointment should NOT exist
3. Update doctor availability
```

**Why transactions matter:**
- Without a transaction, step 1 could succeed and step 2 fail
- You'd have an appointment with no payment (orphaned data)
- A transaction ensures atomicity: all or nothing

---

### BUILD (45 minutes)

**Task:** Add transactional operations -- booking appointment with payment.

#### Step 1: AppointmentsService with transaction

```typescript
// src/appointments/appointments.service.ts (with transactions)
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: { status?: string; patientId?: number; doctorId?: number }) {
    const where: any = {};
    if (filters.status) where.status = filters.status;
    if (filters.patientId) where.patientId = filters.patientId;
    if (filters.doctorId) where.doctorId = filters.doctorId;

    return this.prisma.appointment.findMany({
      where,
      include: { patient: true, doctor: true, payment: true },
      orderBy: { appointmentDate: 'desc' },
    });
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { patient: true, doctor: { include: { department: true } }, payment: true },
    });
    if (!appointment) throw new NotFoundException(`Appointment ${id} not found`);
    return appointment;
  }

  async create(dto: CreateAppointmentDto) {
    return this.prisma.$transaction(async (tx) => {
      // Step 1: Verify patient exists
      const patient = await tx.patient.findUnique({ where: { id: dto.patientId } });
      if (!patient) throw new NotFoundException(`Patient ${dto.patientId} not found`);

      // Step 2: Verify doctor exists
      const doctor = await tx.doctor.findUnique({ where: { id: dto.doctorId } });
      if (!doctor) throw new NotFoundException(`Doctor ${dto.doctorId} not found`);

      // Step 3: Check for conflicting appointments
      const conflict = await tx.appointment.findFirst({
        where: {
          doctorId: dto.doctorId,
          appointmentDate: new Date(dto.appointmentDate),
          appointmentTime: dto.appointmentTime,
          status: { notIn: ['cancelled'] },
        },
      });
      if (conflict) throw new BadRequestException('Doctor already has an appointment at this time');

      // Step 4: Create the appointment
      const appointment = await tx.appointment.create({
        data: {
          patientId: dto.patientId,
          doctorId: dto.doctorId,
          appointmentDate: new Date(dto.appointmentDate),
          appointmentTime: dto.appointmentTime,
          reason: dto.reason,
          status: 'scheduled',
        },
        include: { patient: true, doctor: true },
      });

      return appointment;
    });
  }

  async cancel(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const appointment = await tx.appointment.findUnique({ where: { id } });
      if (!appointment) throw new NotFoundException(`Appointment ${id} not found`);
      if (appointment.status === 'cancelled') throw new BadRequestException('Already cancelled');

      await tx.appointment.update({
        where: { id },
        data: { status: 'cancelled' },
      });

      // If payment exists, refund or mark as refunded
      await tx.payment.updateMany({
        where: { appointmentId: id, paymentStatus: 'completed' },
        data: { paymentStatus: 'refunded' },
      });

      return { message: `Appointment ${id} cancelled` };
    });
  }

  async complete(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const appointment = await tx.appointment.findUnique({ where: { id } });
      if (!appointment) throw new NotFoundException(`Appointment ${id} not found`);

      await tx.appointment.update({
        where: { id },
        data: { status: 'completed' },
      });

      return { message: `Appointment ${id} completed` };
    });
  }

  async update(id: number, dto: UpdateAppointmentDto) {
    try {
      return await this.prisma.appointment.update({
        where: { id },
        data: {
          ...dto,
          ...(dto.appointmentDate && { appointmentDate: new Date(dto.appointmentDate) }),
        },
        include: { patient: true, doctor: true },
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Appointment ${id} not found`);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.appointment.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Appointment ${id} not found`);
      throw error;
    }
  }
}
```

#### Step 2: Add cancel/complete routes to controller

```typescript
// src/appointments/appointments.controller.ts (new routes)
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  async findAll(
    @Query('status') status?: string,
    @Query('patientId') patientId?: number,
    @Query('doctorId') doctorId?: number,
  ) {
    return this.appointmentsService.findAll({ status, patientId, doctorId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new appointment (with transaction)' })
  async create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update appointment' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete appointment' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.delete(id);
  }

  // New: Cancel with refund (transactional)
  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel appointment (with refund)' })
  async cancel(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.cancel(id);
  }

  // New: Mark completed
  @Post(':id/complete')
  @ApiOperation({ summary: 'Mark appointment as completed' })
  async complete(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.complete(id);
  }
}
```

#### Step 3: PaymentsService with transaction

```typescript
// src/payments/payments.service.ts (with transaction)
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: { appointmentId?: number; paymentMethod?: string }) {
    const where: any = {};
    if (filters.appointmentId) where.appointmentId = filters.appointmentId;
    if (filters.paymentMethod) where.paymentMethod = filters.paymentMethod;
    return this.prisma.payment.findMany({ where, include: { appointment: true }, orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id }, include: { appointment: { include: { patient: true, doctor: true } } } });
    if (!payment) throw new NotFoundException(`Payment ${id} not found`);
    return payment;
  }

  async create(dto: CreatePaymentDto) {
    return this.prisma.$transaction(async (tx) => {
      const appointment = await tx.appointment.findUnique({ where: { id: dto.appointmentId } });
      if (!appointment) throw new NotFoundException(`Appointment ${dto.appointmentId} not found`);

      if (appointment.status === 'cancelled') throw new BadRequestException('Cannot pay for cancelled appointment');

      const payment = await tx.payment.create({
        data: {
          appointmentId: dto.appointmentId,
          amount: dto.amount,
          paymentMethod: dto.paymentMethod || 'cash',
          paymentDate: new Date(),
          paymentStatus: dto.paymentStatus || 'completed',
        },
        include: { appointment: true },
      });

      await tx.appointment.update({
        where: { id: dto.appointmentId },
        data: { status: 'completed' },
      });

      return payment;
    });
  }

  async update(id: number, dto: UpdatePaymentDto) {
    try {
      return await this.prisma.payment.update({ where: { id }, data: dto, include: { appointment: true } });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Payment ${id} not found`);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.payment.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Payment ${id} not found`);
      throw error;
    }
  }
}
```

#### Step 4: Test transactions

```bash
# Create valid appointment
curl -X POST http://localhost:3000/appointments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"patientId":1,"doctorId":1,"appointmentDate":"2026-02-01","appointmentTime":"10:00","reason":"Checkup"}'

# Cancel appointment (should refund payment atomically)
curl -X POST http://localhost:3000/appointments/1/cancel \
  -H "Authorization: Bearer $TOKEN"

# Create payment (updates appointment status atomically)
curl -X POST http://localhost:3000/payments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"appointmentId":2,"amount":500,"paymentMethod":"card"}'
```

#### Step 5: Commit

```bash
git add .
git commit -m "Day 3 Hour 18: Database transactions for bookings, cancellations, payments"
git push
```

---

## Hour 19: Advanced Prisma Queries

### LEARN (10 minutes)

Prisma supports advanced querying beyond basic CRUD:

| Feature | Purpose |
|---------|---------|
| `include` | Eagerly load related records |
| `select` | Pick specific fields (optimization) |
| `where` | Filter conditions |
| `orderBy` | Sort results |
| `groupBy` | Aggregate data |
| `aggregate` | `count`, `sum`, `avg`, `min`, `max` |
| `raw` | Raw SQL for complex queries |

---

### BUILD (50 minutes)

**Task:** Build a reports/analytics service with advanced queries.

#### Step 1: Create ReportsModule

```bash
nest generate module reports
nest generate service reports
```

#### Step 2: ReportsService with advanced queries

```typescript
// src/reports/reports.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  // Aggregate: doctor workload
  async getDoctorWorkload(startDate: Date, endDate: Date) {
    const appointments = await this.prisma.appointment.groupBy({
      by: ['doctorId'],
      where: {
        appointmentDate: { gte: startDate, lte: endDate },
        status: { notIn: ['cancelled'] },
      },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });

    // Enrich with doctor details
    const doctorIds = appointments.map(a => a.doctorId);
    const doctors = await this.prisma.doctor.findMany({
      where: { id: { in: doctorIds } },
      select: { id: true, firstName: true, lastName: true, specialization: true },
    });

    return appointments.map(a => ({
      doctor: doctors.find(d => d.id === a.doctorId),
      totalAppointments: a._count.id,
    }));
  }

  // Revenue report
  async getRevenueReport(startDate: Date, endDate: Date) {
    const payments = await this.prisma.payment.aggregate({
      where: {
        paymentDate: { gte: startDate, lte: endDate },
        paymentStatus: 'completed',
      },
      _sum: { amount: true },
      _count: { id: true },
      _avg: { amount: true },
    });

    return {
      totalRevenue: payments._sum.amount || 0,
      totalTransactions: payments._count.id,
      averageAmount: payments._avg.amount || 0,
    };
  }

  // Revenue by payment method
  async getRevenueByPaymentMethod(startDate: Date, endDate: Date) {
    return this.prisma.payment.groupBy({
      by: ['paymentMethod'],
      where: {
        paymentDate: { gte: startDate, lte: endDate },
        paymentStatus: 'completed',
      },
      _sum: { amount: true },
      _count: { id: true },
    });
  }

  // Patient demographics
  async getPatientDemographics(departmentId?: number) {
    const where: any = {};
    if (departmentId) {
      where.appointments = {
        some: { doctor: { departmentId } },
      };
    }

    const patients = await this.prisma.patient.findMany({
      where,
      select: { gender: true, bloodGroup: true, dateOfBirth: true },
    });

    const total = patients.length;
    const genderDistribution = this.countBy(patients, 'gender');
    const bloodGroupDistribution = this.countBy(patients, 'bloodGroup');

    return {
      totalPatients: total,
      genderDistribution: this.toPercentages(genderDistribution, total),
      bloodGroupDistribution: this.toPercentages(bloodGroupDistribution, total),
    };
  }

  // Monthly appointment trends
  async getMonthlyTrends(year: number) {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year + 1}-01-01`);

    const appointments = await this.prisma.appointment.groupBy({
      by: ['status'],
      where: { appointmentDate: { gte: startDate, lt: endDate } },
      _count: { id: true },
    });

    const revenue = await this.prisma.payment.aggregate({
      where: { paymentDate: { gte: startDate, lt: endDate }, paymentStatus: 'completed' },
      _sum: { amount: true },
    });

    return {
      year,
      appointmentSummary: appointments.map(a => ({ status: a.status, count: a._count.id })),
      totalRevenue: revenue._sum.amount || 0,
    };
  }

  // Top doctors by revenue
  async getTopDoctorsByRevenue(limit = 5) {
    // Using Prisma raw query for complex joins
    const result = await this.prisma.$queryRaw`
      SELECT d.id, d.first_name, d.last_name, d.specialization,
             COUNT(DISTINCT a.id) as total_appointments,
             COALESCE(SUM(p.amount), 0) as total_revenue
      FROM "Doctor" d
      LEFT JOIN "Appointment" a ON a.doctor_id = d.id
      LEFT JOIN "Payment" p ON p.appointment_id = a.id AND p.payment_status = 'completed'
      GROUP BY d.id
      ORDER BY total_revenue DESC
      LIMIT ${limit}
    `;

    return result;
  }

  // Appointments by hour of day (for capacity planning)
  async getAppointmentTimeSlots(startDate: Date, endDate: Date) {
    const result = await this.prisma.$queryRaw`
      SELECT
        EXTRACT(HOUR FROM CAST(appointment_time AS TIME)) as hour,
        COUNT(*) as count
      FROM "Appointment"
      WHERE appointment_date >= ${startDate}
        AND appointment_date <= ${endDate}
        AND status != 'cancelled'
      GROUP BY hour
      ORDER BY hour
    `;

    return result;
  }

  // Helper methods
  private countBy(items: any[], key: string): Record<string, number> {
    return items.reduce((acc, item) => {
      const val = item[key] || 'unknown';
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private toPercentages(counts: Record<string, number>, total: number): Record<string, string> {
    return Object.entries(counts).reduce((acc, [key, count]) => {
      acc[key] = `${((count / total) * 100).toFixed(1)}%`;
      return acc;
    }, {} as Record<string, string>);
  }
}
```

#### Step 3: ReportsController

```typescript
// src/reports/reports.controller.ts
import { Controller, Get, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('revenue')
  @ApiOperation({ summary: 'Get revenue report for date range' })
  @ApiQuery({ name: 'startDate', example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', example: '2026-12-31' })
  async getRevenue(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportsService.getRevenueReport(new Date(startDate), new Date(endDate));
  }

  @Get('revenue-by-method')
  @ApiOperation({ summary: 'Get revenue grouped by payment method' })
  async getRevenueByMethod(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportsService.getRevenueByPaymentMethod(new Date(startDate), new Date(endDate));
  }

  @Get('doctor-workload')
  @ApiOperation({ summary: 'Get doctor appointment workload' })
  async getDoctorWorkload(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportsService.getDoctorWorkload(new Date(startDate), new Date(endDate));
  }

  @Get('demographics')
  @ApiOperation({ summary: 'Get patient demographics' })
  @ApiQuery({ name: 'departmentId', required: false })
  async getDemographics(@Query('departmentId') departmentId?: number) {
    return this.reportsService.getPatientDemographics(departmentId);
  }

  @Get('monthly-trends')
  @ApiOperation({ summary: 'Get monthly appointment trends' })
  @ApiQuery({ name: 'year', example: 2026 })
  async getMonthlyTrends(@Query('year', ParseIntPipe) year: number) {
    return this.reportsService.getMonthlyTrends(year);
  }

  @Get('top-doctors')
  @ApiOperation({ summary: 'Get top doctors by revenue' })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  async getTopDoctors(@Query('limit') limit = 5) {
    return this.reportsService.getTopDoctorsByRevenue(limit);
  }

  @Get('time-slots')
  @ApiOperation({ summary: 'Get appointment distribution by hour' })
  async getTimeSlots(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportsService.getAppointmentTimeSlots(new Date(startDate), new Date(endDate));
  }
}
```

#### Step 4: Register ReportsModule

```typescript
// src/app.module.ts (add ReportsModule)
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    PrismaModule, AuthModule,
    PatientsModule, DoctorsModule, AppointmentsModule, PaymentsModule,
    ReportsModule,
  ],
})
export class AppModule {}
```

#### Step 5: Test reports

```bash
# Test revenue report
curl "http://localhost:3000/reports/revenue?startDate=2026-01-01&endDate=2026-12-31" \
  -H "Authorization: Bearer $TOKEN"

# Test top doctors
curl "http://localhost:3000/reports/top-doctors?limit=3" \
  -H "Authorization: Bearer $TOKEN"

# Test demographics
curl "http://localhost:3000/reports/demographics" \
  -H "Authorization: Bearer $TOKEN"
```

#### Step 6: Commit

```bash
git add .
git commit -m "Day 3 Hour 19: Advanced Prisma queries with reports, aggregations, raw SQL"
git push
```

---

## Hour 20: Performance Optimization & Indexing

### LEARN (15 minutes)

**Why indexing matters:**
- Without an index, PostgreSQL scans every row (sequential scan)
- With an index, it jumps directly to matching rows
- For a 1M record table: sequential scan = 500ms, index lookup = 1ms

**Prisma schema indexes:**
```prisma
model Appointment {
  id              Int      @id @default(autoincrement())
  patientId       Int
  appointmentDate DateTime

  @@index([patientId])        // Single-column index
  @@index([doctorId, status]) // Composite index
}
```

**N+1 Problem:**
```typescript
// BAD: N+1 queries (1 + N)
const appointments = await prisma.appointment.findMany();
for (const a of appointments) {     // 1 query
  const patient = await prisma.patient.findUnique({ where: { id: a.patientId } });  // N queries
}

// GOOD: Single query with include
const appointments = await prisma.appointment.findMany({
  include: { patient: true, doctor: true },
});
```

---

### BUILD (45 minutes)

**Task:** Audit and optimize Prisma queries, add database indexes.

#### Step 1: Add indexes to Prisma schema

```prisma
// prisma/schema.prisma (add indexes)

model Patient {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  phone     String   @unique
  email     String?
  createdAt DateTime @default(now())

  appointments Appointment[]

  @@index([lastName, firstName])  // For search by name
  @@index([phone])               // For lookup by phone
}

model Doctor {
  id             Int      @id @default(autoincrement())
  specialization String
  firstName      String
  lastName       String
  phone          String   @unique
  email          String?

  appointments Appointment[]
  department   Department  @relation(fields: [departmentId], references: [id])

  @@index([specialization])      // For filtering by specialization
  @@index([departmentId])        // For department-based queries
}

model Appointment {
  id              Int      @id @default(autoincrement())
  patientId       Int
  doctorId        Int
  appointmentDate DateTime
  appointmentTime String
  status          String   @default("scheduled")
  reason          String?
  patient         Patient  @relation(fields: [patientId], references: [id])
  doctor          Doctor   @relation(fields: [doctorId], references: [id])
  payment         Payment?

  @@index([patientId])                         // Lookup patient appointments
  @@index([doctorId])                          // Lookup doctor appointments
  @@index([status])                            // Filter by status
  @@index([appointmentDate])                   // Date range queries
  @@index([doctorId, appointmentDate, status]) // Conflict check composite index
}

model Payment {
  id            Int      @id @default(autoincrement())
  appointmentId Int      @unique
  amount        Float
  paymentDate   DateTime @default(now())
  paymentStatus String   @default("completed")
  paymentMethod String   @default("cash")

  appointment Appointment @relation(fields: [appointmentId], references: [id])

  @@index([paymentDate])     // Revenue report queries
  @@index([paymentMethod])   // Payment method grouping
  @@index([paymentStatus])   // Filter by status
}
```

#### Step 2: Create optimized service methods

```typescript
// src/common/utils/query-optimizer.ts
// Pagination with cursor-based approach (more efficient for large datasets)
export interface CursorPaginationParams {
  cursor?: number;
  take: number;
}

export interface CursorPaginationResponse<T> {
  data: T[];
  nextCursor?: number;
  hasMore: boolean;
}

// For patients service -- cursor-based pagination alternative
export async function paginateWithCursor<T>(
  findMany: (args: any) => Promise<T[]>,
  params: CursorPaginationParams,
  where: any = {},
): Promise<CursorPaginationResponse<T>> {
  const take = params.take + 1; // Fetch one extra to check if more exist
  const data = await findMany({
    where,
    take,
    ...(params.cursor ? { cursor: { id: params.cursor }, skip: 1 } : {}),
    orderBy: { id: 'asc' },
  });

  const hasMore = data.length > params.take;
  if (hasMore) data.pop(); // Remove the extra item

  return {
    data,
    nextCursor: hasMore ? data[data.length - 1].id : undefined,
    hasMore,
  };
}
```

#### Step 3: Add Prisma query logging in development

```typescript
// src/prisma/prisma.service.ts (with query logging)
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: process.env.NODE_ENV === 'development'
        ? [{ emit: 'event', level: 'query' }, { emit: 'stdout', level: 'info' }]
        : [{ emit: 'stdout', level: 'error' }],
    });
  }

  async onModuleInit() {
    // Log slow queries in development
    if (process.env.NODE_ENV === 'development') {
      this.$on<any>('query', (e: any) => {
        if (e.duration > 100) { // Log queries slower than 100ms
          this.logger.warn(`Slow query (${e.duration}ms): ${e.query}`);
        }
      });
    }
    await this.$connect();
    this.logger.log('Connected to PostgreSQL via Prisma');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from PostgreSQL');
  }
}
```

#### Step 4: Batch operations for efficiency

```typescript
// Example: Bulk create appointments (added to AppointmentsService)
async bulkCreate(dtos: CreateAppointmentDto[]) {
  return this.prisma.$transaction(async (tx) => {
    const appointments = [];
    for (const dto of dtos) {
      const appointment = await tx.appointment.create({
        data: {
          ...dto,
          appointmentDate: new Date(dto.appointmentDate),
          status: 'scheduled',
        },
      });
      appointments.push(appointment);
    }
    return appointments;
  });
}
```

#### Step 5: Run migration with indexes

```bash
npx prisma migrate dev --name add-indexes
```

#### Step 6: Commit

```bash
git add .
git commit -m "Day 3 Hour 20: Performance optimization with indexes, query logging, batch ops"
git push
```

---

## Hour 21: Redis Caching

### LEARN (15 minutes)

**Why cache?**
- Frequently accessed data (reports, doctor list) shouldn't hit the DB every time
- Reduces database load by 80-90%
- Responses are 10-100x faster from cache

**Cache Strategy -- Cache-Aside:**
```
1. Check Redis for data
2. If found (cache hit): return immediately
3. If not found (cache miss): query DB, store in Redis, return
4. Set TTL (Time-To-Live) so cache expires automatically
```

**What to cache:**
- Doctor/department lists (rarely change)
- Aggregated reports (expensive to compute)
- Patient lookup (frequently accessed)
- Auth tokens (already handled by JWT)

---

### BUILD (45 minutes)

**Task:** Integrate Redis caching into the API.

#### Step 1: Install dependencies

```bash
npm install @nestjs/cache-manager cache-manager
npm install cache-manager-redis-yet --save-dev
```

#### Step 2: Create CacheModule

```typescript
// src/cache/cache.module.ts
import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-yet';
import { CacheService } from './cache.service';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        ttl: 60,  // Default TTL: 60 seconds
        max: 100, // Maximum number of items in cache
      }),
      isGlobal: true,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}

// src/cache/cache.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }

  buildKey(prefix: string, ...parts: (string | number)[]): string {
    return `${prefix}:${parts.join(':')}`;
  }
}
```

#### Step 3: Apply caching to reports (most expensive queries)

```typescript
// src/reports/reports.service.ts (with caching)
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async getRevenueReport(startDate: Date, endDate: Date) {
    const cacheKey = this.cache.buildKey('reports:revenue', startDate.toISOString(), endDate.toISOString());

    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const payments = await this.prisma.payment.aggregate({
      where: { paymentDate: { gte: startDate, lte: endDate }, paymentStatus: 'completed' },
      _sum: { amount: true },
      _count: { id: true },
      _avg: { amount: true },
    });

    const result = {
      totalRevenue: payments._sum.amount || 0,
      totalTransactions: payments._count.id,
      averageAmount: payments._avg.amount || 0,
    };

    await this.cache.set(cacheKey, result, 300); // Cache for 5 minutes
    return result;
  }

  async getTopDoctorsByRevenue(limit = 5) {
    const cacheKey = this.cache.buildKey('reports:top-doctors', limit);

    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const result = await this.prisma.$queryRaw`
      SELECT d.id, d.first_name, d.last_name, d.specialization,
             COUNT(DISTINCT a.id) as total_appointments,
             COALESCE(SUM(p.amount), 0) as total_revenue
      FROM "Doctor" d
      LEFT JOIN "Appointment" a ON a.doctor_id = d.id
      LEFT JOIN "Payment" p ON p.appointment_id = a.id AND p.payment_status = 'completed'
      GROUP BY d.id
      ORDER BY total_revenue DESC
      LIMIT ${limit}
    `;

    await this.cache.set(cacheKey, result, 300);
    return result;
  }

  async getMonthlyTrends(year: number) {
    const cacheKey = this.cache.buildKey('reports:monthly-trends', year);

    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year + 1}-01-01`);

    const appointments = await this.prisma.appointment.groupBy({
      by: ['status'],
      where: { appointmentDate: { gte: startDate, lt: endDate } },
      _count: { id: true },
    });

    const revenue = await this.prisma.payment.aggregate({
      where: { paymentDate: { gte: startDate, lt: endDate }, paymentStatus: 'completed' },
      _sum: { amount: true },
    });

    const result = {
      year,
      appointmentSummary: appointments.map(a => ({ status: a.status, count: a._count.id })),
      totalRevenue: revenue._sum.amount || 0,
    };

    await this.cache.set(cacheKey, result, 600); // Cache for 10 minutes
    return result;
  }

  // ... other methods unchanged
}
```

#### Step 4: Add cache invalidation on data changes

```typescript
// src/patients/patients.service.ts (add cache invalidation)
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,  // Inject cache
  ) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.patient.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.patient.count(),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) throw new NotFoundException(`Patient ${id} not found`);
    return patient;
  }

  async create(dto: CreatePatientDto) {
    const patient = await this.prisma.patient.create({
      data: { ...dto, dateOfBirth: new Date(dto.dateOfBirth) },
    });
    // Invalidate demographics cache since patient count changed
    await this.cache.del('reports:demographics');
    return patient;
  }

  async update(id: number, dto: UpdatePatientDto) {
    try {
      const patient = await this.prisma.patient.update({
        where: { id },
        data: { ...dto, ...(dto.dateOfBirth && { dateOfBirth: new Date(dto.dateOfBirth) }) },
      });
      await this.cache.del('reports:demographics');
      return patient;
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Patient ${id} not found`);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const patient = await this.prisma.patient.delete({ where: { id } });
      await this.cache.del('reports:demographics');
      return patient;
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(`Patient ${id} not found`);
      throw error;
    }
  }
}
```

#### Step 5: Test caching

```bash
# First request (cache miss -- slow)
curl "http://localhost:3000/reports/revenue?startDate=2026-01-01&endDate=2026-12-31" \
  -H "Authorization: Bearer $TOKEN"
# Takes ~50-100ms

# Second request (cache hit -- fast)
curl "http://localhost:3000/reports/revenue?startDate=2026-01-01&endDate=2026-12-31" \
  -H "Authorization: Bearer $TOKEN"
# Takes ~1-5ms

# After creating a patient, demographics cache is invalidated
curl -X POST http://localhost:3000/patients -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","dateOfBirth":"1990-01-01","phone":"9999999999"}'
# Next demographics request will be a fresh DB query
```

#### Step 6: Commit

```bash
git add .
git commit -m "Day 3 Hour 21: Redis caching with cache-aside pattern and invalidation"
git push
```

---

## Hour 22: Background Jobs with BullMQ

### LEARN (15 minutes)

**Why background jobs?**
Some tasks shouldn't run during the HTTP request:
- Sending emails (appointment confirmation)
- Generating reports (long-running)
- Data export (minutes-long)
- Notifications (push/SMS)

**BullMQ + Redis:**
```
App -> Queue (Redis) -> Worker
```
The app pushes jobs to a Redis queue. Workers (separate processes) pick up and process them.

---

### BUILD (45 minutes)

**Task:** Add email notification background jobs.

#### Step 1: Install BullMQ

```bash
npm install @nestjs/bull bullmq
```

#### Step 2: Create NotificationModule

```typescript
// src/notifications/notifications.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationsProcessor } from './notifications.processor';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  providers: [NotificationsProcessor, NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
```

#### Step 3: NotificationsService (job producer)

```typescript
// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

export interface EmailJob {
  to: string;
  subject: string;
  body: string;
}

export interface SmsJob {
  phone: string;
  message: string;
}

@Injectable()
export class NotificationsService {
  constructor(@InjectQueue('notifications') private notificationsQueue: Queue) {}

  async sendAppointmentConfirmation(patientEmail: string, patientName: string, doctorName: string, date: string, time: string) {
    await this.notificationsQueue.add('send-email', {
      to: patientEmail,
      subject: 'Appointment Confirmed - Ayurvena',
      body: `Dear ${patientName},\n\nYour appointment with ${doctorName} on ${date} at ${time} has been confirmed.\n\nThank you for choosing Ayurvena.`,
    } as EmailJob);
  }

  async sendAppointmentReminder(patientPhone: string, patientName: string, date: string, time: string) {
    await this.notificationsQueue.add('send-sms', {
      phone: patientPhone,
      message: `Reminder: ${patientName}, you have an appointment tomorrow at ${time}. - Ayurvena`,
    } as SmsJob);
  }

  async sendPaymentReceipt(patientEmail: string, patientName: string, amount: number, appointmentId: number) {
    await this.notificationsQueue.add('send-email', {
      to: patientEmail,
      subject: `Payment Receipt - ₹${amount}`,
      body: `Dear ${patientName},\n\nPayment of ₹${amount} for appointment #${appointmentId} has been received.\n\nThank you for choosing Ayurvena.`,
    } as EmailJob);
  }

  async generateMonthlyReport(reportType: string, recipientEmail: string) {
    await this.notificationsQueue.add('generate-report', {
      reportType,
      recipientEmail,
    }, {
      delay: 5000,      // Start after 5 seconds
      attempts: 3,       // Retry up to 3 times on failure
      backoff: { type: 'exponential', delay: 10000 },
    });
  }
}
```

#### Step 4: NotificationsProcessor (job consumer)

```typescript
// src/notifications/notifications.processor.ts
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bull';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { EmailJob, SmsJob } from './notifications.service';

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);

  async process(job: Job, token?: string): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);

    switch (job.name) {
      case 'send-email':
        return this.handleEmail(job.data as EmailJob);
      case 'send-sms':
        return this.handleSms(job.data as SmsJob);
      case 'generate-report':
        return this.handleReportGeneration(job.data);
      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  }

  private async handleEmail(data: EmailJob) {
    this.logger.log(`Sending email to ${data.to}: ${data.subject}`);
    // In production, integrate with SendGrid / AWS SES / Nodemailer
    // await sendGrid.send({ to: data.to, subject: data.subject, text: data.body });
    this.logger.log(`Email sent to ${data.to}`);
    return { delivered: true, to: data.to };
  }

  private async handleSms(data: SmsJob) {
    this.logger.log(`Sending SMS to ${data.phone}: ${data.message}`);
    // In production, integrate with Twilio / AWS SNS
    // await twilio.messages.create({ body: data.message, to: data.phone, from: process.env.TWILIO_PHONE });
    this.logger.log(`SMS sent to ${data.phone}`);
    return { delivered: true, phone: data.phone };
  }

  private async handleReportGeneration(data: any) {
    this.logger.log(`Generating ${data.reportType} report for ${data.recipientEmail}`);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.logger.log(`Report sent to ${data.recipientEmail}`);
    return { generated: true, type: data.reportType };
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Job ${job.id} completed successfully`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} failed: ${error.message}`);
  }
}
```

#### Step 5: Integrate notifications into appointments

```typescript
// src/appointments/appointments.service.ts (with notifications)
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  async create(dto: CreateAppointmentDto) {
    return this.prisma.$transaction(async (tx) => {
      const patient = await tx.patient.findUnique({ where: { id: dto.patientId } });
      if (!patient) throw new NotFoundException(`Patient ${dto.patientId} not found`);

      const doctor = await tx.doctor.findUnique({ where: { id: dto.doctorId } });
      if (!doctor) throw new NotFoundException(`Doctor ${dto.doctorId} not found`);

      const conflict = await tx.appointment.findFirst({
        where: {
          doctorId: dto.doctorId,
          appointmentDate: new Date(dto.appointmentDate),
          appointmentTime: dto.appointmentTime,
          status: { notIn: ['cancelled'] },
        },
      });
      if (conflict) throw new BadRequestException('Doctor already has an appointment at this time');

      const appointment = await tx.appointment.create({
        data: {
          patientId: dto.patientId,
          doctorId: dto.doctorId,
          appointmentDate: new Date(dto.appointmentDate),
          appointmentTime: dto.appointmentTime,
          reason: dto.reason,
          status: 'scheduled',
        },
        include: { patient: true, doctor: true },
      });

      // Queue notifications (runs in background -- doesn't block response)
      if (patient.email) {
        await this.notifications.sendAppointmentConfirmation(
          patient.email,
          `${patient.firstName} ${patient.lastName}`,
          `Dr. ${doctor.firstName} ${doctor.lastName}`,
          dto.appointmentDate,
          dto.appointmentTime,
        );
      }

      if (patient.phone) {
        await this.notifications.sendAppointmentReminder(
          patient.phone,
          patient.firstName,
          dto.appointmentDate,
          dto.appointmentTime,
        );
      }

      return appointment;
    });
  }

  // ... rest of methods unchanged
}
```

#### Step 6: Register BullModule in root

```typescript
// src/app.module.ts (add BullModule)
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    PrismaModule, AuthModule, CacheModule,
    NotificationsModule,
    PatientsModule, DoctorsModule, AppointmentsModule, PaymentsModule,
    ReportsModule,
  ],
})
export class AppModule {}
```

#### Step 7: Test background jobs

```bash
# Start the worker (auto-starts with NestJS)
npm run start:dev

# Create appointment -- background notifications will fire
curl -X POST http://localhost:3000/appointments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"patientId":1,"doctorId":1,"appointmentDate":"2026-02-15","appointmentTime":"14:30","reason":"Follow-up"}'

# Response comes back immediately (notifications queued in background)
# Check server logs to see notifications being processed
```

#### Step 8: Commit

```bash
git add .
git commit -m "Day 3 Hour 22: BullMQ background jobs for notifications, email, SMS"
git push
```

---

## Hour 23: Peer Code Review

### REVIEW (30 minutes)

**Architecture overview:**

```
Client (Mobile App)                         Redis Cache
     |                                          |
     v                                          v
NestJS API (localhost:3000)  <---------->  Prisma ORM  <---------->  PostgreSQL
     |                                          |
     v                                          v
BullMQ Workers (background)               Redis Queue
     |
     v
Email / SMS / Reports
```

**Key decisions and why:**

| Decision | Why |
|----------|-----|
| NestJS modules | Feature-based organization scales well |
| Prisma + PostgreSQL | Type-safe queries, auto-generated client |
| JWT auth | Stateless, mobile-friendly |
| Redis cache | Reduces DB load for reports |
| BullMQ | Durable background job processing |
| Swagger | Auto-documented API for mobile devs |

**API endpoints:**

```
POST   /auth/register          Register new user
POST   /auth/login             Login
GET    /patients               List patients (paginated)
GET    /patients/:id           Get patient
POST   /patients               Create patient
PUT    /patients/:id           Update patient
DELETE /patients/:id           Delete patient
GET    /doctors                List doctors (filter by specialization)
GET    /doctors/:id            Get doctor with department
POST   /doctors                Create doctor
GET    /appointments           List appointments (filter by status/patient/doctor)
GET    /appointments/:id       Get appointment with relations
POST   /appointments           Create appointment (with transaction)
POST   /appointments/:id/cancel    Cancel (with refund, transactional)
POST   /appointments/:id/complete  Mark completed
GET    /payments               List payments
POST   /payments               Create payment (updates appointment)
GET    /reports/revenue        Revenue report
GET    /reports/top-doctors    Top doctors by revenue
GET    /reports/demographics   Patient demographics
GET    /reports/monthly-trends Monthly trends
GET    /reports/time-slots     Slot distribution
```

**Common Mistakes Checklist (review a peer's code for these):**

**API Design:**
- [ ] Are all route names plural? (`/patients` not `/patient`)
- [ ] Is pagination implemented on list endpoints?
- [ ] Are response formats consistent (same shape for success/error)?
- [ ] Are HTTP status codes meaningful (201 for create, 404 for not found)?
- [ ] Is `PUT` vs `PATCH` used correctly?

**Error Handling:**
- [ ] Are there `try/catch` blocks or does NestJS handle it via filters?
- [ ] Are internal error messages hidden from the client?
- [ ] Does every `findUnique` or `findFirst` have a null check + `NotFoundException`?
- [ ] Are validation errors returned with clear messages?

**SQL / Prisma Efficiency:**
- [ ] Are there N+1 queries? Check if `include` or `select` is used properly
- [ ] Are expensive queries paginated?
- [ ] Are indexes created on foreign key columns?
- [ ] Is `select` used instead of `include` when only specific fields are needed?

**Security:**
- [ ] Are sensitive routes protected with `@UseGuards(JwtAuthGuard)`?
- [ ] Is the JWT secret stored in `.env`, not hardcoded?
- [ ] Are passwords hashed (not stored in plain text)?
- [ ] Is `whitelist: true` set on ValidationPipe to strip unknown fields?
- [ ] Are database credentials in environment variables?

**Code Quality:**
- [ ] Are DTOs used for every request body?
- [ ] Are magic strings/numbers replaced with constants or enums?
- [ ] Is business logic in services, not controllers?
- [ ] Are async/await used properly (no forgotten awaits)?
- [ ] Are file names consistent (kebab-case)?

**Review pairs — swap code with your buddy:**
- Abhinaya reviews Harshitha's NestJS controllers
- Harshitha reviews Srinitha's test cases and error handling
- Srinitha reviews Abhinaya's Prisma schema and migrations

---

## Hour 24: Final Quiz & Graduation

### QUIZ (20 minutes)

Test your knowledge across all 24 hours. Each person takes the quiz individually, then compare answers.

**Question 1:** What decorator marks a class as a provider that can be injected into other classes?
- A) `@Controller`
- B) `@Injectable`
- C) `@Module`
- D) `@Inject`

**Question 2:** Which NestJS building block transforms exceptions into consistent error responses?
- A) Guard
- B) Interceptor
- C) Exception Filter
- D) Pipe

**Question 3:** What does `@@index([doctorId, appointmentDate, status])` do in a Prisma schema?
- A) Creates a unique constraint on three columns
- B) Creates a composite index for fast querying on those columns
- C) Creates three separate foreign keys
- D) Enables full-text search on doctor names

**Question 4:** In Prisma, how do you ensure multiple database operations either all succeed or all fail?
- A) `prisma.transaction()`
- B) `prisma.$transaction()`
- C) `prisma.batch()`
- D) `prisma.allOrNothing()`

**Question 5:** In the cache-aside pattern, what happens when data is not in the cache?
- A) Return null to the client immediately
- B) Query the database, store the result in cache with a TTL, then return it
- C) Wait for another request to populate the cache
- D) Return an error saying "cache miss"

**Question 6:** A BullMQ job queue is used instead of a direct function call because:
- A) Queues are faster than direct calls
- B) The job runs in the background without blocking the HTTP response
- C) Queues store data in the filesystem permanently
- D) Queues automatically retry failed operations

**Question 7:** Which of these is the correct way to protect a route with JWT authentication in NestJS?
- A) `@UseGuards(RolesGuard)`
- B) `@UseGuards(JwtAuthGuard)`
- C) `@UseGuards(AuthGuard('jwt'))`
- D) Both B and C are correct

**Question 8:** Why is `@IsDateString()` used on `dateOfBirth` in a DTO instead of `@IsString()`?
- A) `@IsDateString()` validates the format is a proper ISO date like `1990-01-15`
- B) `@IsDateString()` converts the string to a Date object
- C) `@IsDateString()` only works with PostgreSQL
- D) There is no difference — both work the same way

**Question 9:** In a Prisma schema, what does the `?` symbol mean next to a field?
- A) The field is a primary key
- B) The field is optional (nullable in the database)
- C) The field is a foreign key
- D) The field has a default value

**Question 10:** What is the difference between `@Get(':id')` and `@Get()' in a NestJS controller?
- A) `:id` makes the route dynamic (e.g., `/patients/5`), while `@Get()` handles `/patients`
- B) There is no difference
- C) `:id` only works with PostgreSQL
- D) `:id` requires authentication

**Answers:** 1-B, 2-C, 3-B, 4-B, 5-B, 6-B, 7-D, 8-A, 9-B, 10-A

**Scoring:**
- 10/10: You are ready to lead the backend team
- 8-9/10: Review the topics you missed, then you are ready
- 6-7/10: Re-read the bootcamp sections for your weak areas
- Below 6: Pair up with a buddy and go through the exercises again together

---

### After the 24 Hours

**Skills before vs after:**

| Skill | Before Bootcamp | After Bootcamp |
|-------|----------------|----------------|
| PostgreSQL | "A database is where data lives" | Can design schemas with 10+ related tables, write JOIN queries, create indexes, use GROUP BY/HAVING/aggregates |
| Prisma ORM | Never heard of it | Can model entities with relations, run migrations, seed data, write CRUD queries with pagination and filtering |
| NestJS | "It's a Node.js framework" | Can create modules, controllers, services with DI, handle requests/responses with DTOs |
| REST APIs | "Like a URL that returns JSON" | Can design resource endpoints, use HTTP methods correctly, handle status codes |
| Validation | "Check if input is empty" | Can use class-validator decorators, set up global ValidationPipe, create DTOs for every endpoint |
| Error Handling | "Use try/catch" | Can throw proper HTTP exceptions, build exception filters, return consistent error responses |
| JWT Auth | "It's a token thing" | Can implement register/login with bcrypt, protect routes with guards, extract user from token |
| Swagger | Never used it | Can auto-generate API docs, add decorators to DTOs, test endpoints from the browser |
| Redis | "It's a cache thing" | Can set up cache-aside pattern, configure TTL, cache expensive queries |
| BullMQ | Never heard of it | Can create job queues, add workers, schedule background tasks |
| Docker | "Runs containers" | Can write Dockerfile, set up docker-compose with multiple services |
| Code Review | "Look at the code" | Has a systematic checklist for API design, SQL efficiency, security, error handling |

**What each person owns now:**

| Person | Primary Expertise | Can Teach Others |
|--------|-----------------|-----------------|
| **Abhinaya** | PostgreSQL schema design, Prisma models, migrations, indexes, seed data | How relations work, when to index, migration best practices |
| **Harshitha** | NestJS modules, controllers, services, DI, DTOs, Swagger, JWT auth | How NestJS organizes code, route design, auth flow |
| **Srinitha** | Testing, validation, error handling, Postman, code review checklist, API quality | How to break APIs with bad input, error patterns, review process |

---

### Buddy System & Review Pairs

Learning alone is hard. Learning with a partner makes it stick. Here is your permanent buddy system:

**Pair 1: Abhinaya ↔ Harshitha**
- Abhinaya reviews Harshitha's API routes for SQL efficiency
- Harshitha reviews Abhinaya's schema for NestJS compatibility
- Weekly: 30-minute code review session

**Pair 2: Harshitha ↔ Srinitha**
- Harshitha reviews Srinitha's test coverage for edge cases
- Srinitha reviews Harshitha's error handling and validation
- Weekly: Swap Postman collections and run each other's tests

**Pair 3: Srinitha ↔ Abhinaya**
- Srinitha reviews Abhinaya's migrations for data integrity
- Abhinaya reviews Srinitha's DB-related test scenarios
- Weekly: Review seed data quality and edge cases

**When you get stuck:**
1. Ask your buddy first (15-minute rule — spend 15 minutes trying before asking)
2. If your buddy cannot solve it, ask the other pair
3. If still stuck, ask the instructor together

**Review cadence:**
- After every 8 hours (end of each day): 15-minute pair review
- Before merging any PR: both buddies must approve
- Friday afternoons: team retrospective on what broke and what was learned

---

### Congratulations!

You have completed the Ayurvena Backend Bootcamp. 24 hours. 3 days. A full-stack backend.

**What you built:**
- A PostgreSQL database with 8+ related tables modeling a real hospital
- A NestJS REST API with 5 modules (patients, doctors, appointments, payments, reports)
- Full CRUD operations with Prisma ORM
- JWT authentication with bcrypt password hashing
- Database transactions for booking, cancellation, and payment flows
- Redis caching for reports and expensive queries
- BullMQ background jobs for async processing
- Swagger API documentation at `/api`
- Production-ready Docker deployment
- Complete validation and error handling

**What you proved:**
- TypeScript backends are not magic — they are just organized code
- Complex systems are built one module at a time
- You can learn any framework if you understand the patterns
- Debugging is not failure — it is the fastest way to learn

**Next: Move to the Frontend Bootcamp** to build the mobile app that consumes these APIs.

---

### Bonus: Deployment & Production Readiness

> This section is optional reading — complete the quiz and review first. Come back to this when you are ready to deploy.

**Production checklist:**
1. Environment variables for secrets (never hardcode)
2. Database migration runs on deploy (`npx prisma migrate deploy`)
3. CORS configured for your frontend domain
4. Helmet for security headers
5. Rate limiting (`@nestjs/throttler`)
6. Compression (gzip)
7. Logging (structured logs, not console.log)
8. Health check endpoint
9. Docker container for reproducible deployment

#### Step 1: Environment validation

```bash
# .env (production)
DATABASE_URL=postgresql://user:password@host:5432/ayurvena
JWT_SECRET=your-256-bit-secret
REDIS_URL=redis://redis:6379
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://ayurvena.com
```

```typescript
// src/config/env.validation.ts
import { plainToClass } from 'class-transformer';
import { IsString, IsNumber, IsOptional, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsOptional() @IsString()
  REDIS_URL?: string;

  @IsOptional() @IsString()
  NODE_ENV?: string;

  @IsOptional() @IsNumber()
  PORT?: number;

  @IsOptional() @IsString()
  CORS_ORIGIN?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errors.length > 0) throw new Error(errors.toString());
  return validatedConfig;
}
```

#### Step 2: Production main.ts

```typescript
// src/main.ts (production-ready)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Ayurvena API')
      .setDescription('Hospital Management System')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Ayurvena API running on http://localhost:${port}`);
}
bootstrap();
```

#### Step 3: Health check endpoint

```typescript
// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  async check() {
    const dbStatus = await this.prisma.$queryRaw`SELECT 1 as alive`;
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus ? 'connected' : 'disconnected',
      memory: process.memoryUsage(),
    };
  }
}
```

#### Step 4: Docker setup

```dockerfile
# Dockerfile (multi-stage build)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["node", "dist/main"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/ayurvena
      JWT_SECRET: change-in-production
      REDIS_URL: redis://redis:6379
      NODE_ENV: production
    depends_on:
      db: { condition: service_healthy }
      redis: { condition: service_started }

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ayurvena
      POSTGRES_PASSWORD: postgres
    ports: ["5432:5432"]
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

volumes:
  pgdata:
```

#### Step 5: Deploy script

```bash
# scripts/deploy.sh
#!/bin/bash
set -e
echo "Building Docker image..."
docker compose build
echo "Running migrations..."
docker compose run --rm api npx prisma migrate deploy
echo "Starting services..."
docker compose up -d
echo "Health check..."
sleep 5
curl http://localhost:3000/health
echo "Deployment complete!"
```

```bash
git add .
git commit -m "Add production deployment setup (Docker, health check, env validation)"
git push
```

**Final deployment:**
```bash
docker compose up -d
# API: http://localhost:3000
# Swagger: http://localhost:3000/api
# Health: http://localhost:3000/health
```

---

## Hour 23: Peer Code Review (1 Hour)

### Save your work first
```bash
git add .
git commit -m "day3: all exercises complete"
git push
```

### Switch to the person you're reviewing
```bash
git fetch origin
git checkout harshitha    # or whoever you're reviewing
cd day3-nestjs-project
npm install
npx prisma migrate dev
npm run start:dev
```

### Review Pairs

| Reviewer | Reviews |
|----------|---------|
| Abhinaya | Harshitha's code |
| Harshitha | Srinitha's code |
| Srinitha | Abhinaya's code |

### Backend Code Review Checklist

Score 0 (not done), 1 (partial), 2 (fully done):

```
REVIEWER: ____________     REVIEWING: ____________'s code

DOES IT WORK?
[ /2 ] npm run start:dev runs without errors
[ /2 ] All endpoints work in Postman/Swagger
[ /2 ] Database has correct data (check with Prisma Studio)
[ /2 ] Auth flow works (register → login → protected route)

API DESIGN
[ /2 ] RESTful routes (GET /patients, POST /patients, GET /patients/:id)
[ /2 ] Proper HTTP status codes (200, 201, 400, 404, 409, 500)
[ /2 ] Consistent response format ({ success, data, message })
[ /2 ] Pagination on list endpoints (skip/take or page/limit)

CODE QUALITY
[ /2 ] DTOs with validation for every POST/PATCH endpoint
[ /2 ] Services contain business logic, controllers are thin
[ /2 ] PrismaService injected properly (not raw SQL in controllers)
[ /2 ] No hardcoded values (use constants or config)
[ /2 ] Files under 150 lines each

ERROR HANDLING
[ /2 ] NotFoundException when resource doesn't exist
[ /2 ] BadRequestException for invalid input
[ /2 ] ConflictException for duplicates (phone, email)
[ /2 ] Global exception filter catches unexpected errors
[ /2 ] No unhandled promise rejections

DATABASE
[ /2 ] Prisma schema has proper relations (@relation)
[ /2 ] Indexes on frequently queried fields
[ /2 ] Seed script creates realistic data
[ /2 ] Migrations are clean (no manual edits)

SECURITY
[ /2 ] Passwords hashed with bcrypt (never stored plain)
[ /2 ] JWT auth on protected routes
[ /2 ] Input validated before hitting database
[ /2 ] No sensitive data in API responses (no passwordHash)

TOTAL: ___/52

What they did well:
1.
2.

What needs fixing:
1.
2.
```

### Go back to your branch
```bash
git checkout your-name
```

---

## Hour 24: Quiz (1 Hour)

Everyone answers on paper or in a text file. Manager grades. Discuss together.

```
Q1:  What are the 3 main building blocks of NestJS? What does each one do?

Q2:  Write a Prisma schema for a `LabTest` model with:
     - id, testName, patientId (relation to Patient), doctorId (relation to Doctor),
     - status (enum: ORDERED, SAMPLE_COLLECTED, PROCESSING, COMPLETED),
     - results (optional JSON), reportUrl (optional string), createdAt

Q3:  What's wrong with this controller?
     @Post()
     async createPatient(@Body() data: any) {
         return this.prisma.patient.create({ data });
     }

Q4:  Write a NestJS service method that:
     - Takes a doctorId and date
     - Returns all appointments for that doctor on that date
     - Includes patient name and phone
     - Throws NotFoundException if doctor doesn't exist

Q5:  What is the difference between prisma.patient.findUnique()
     and prisma.patient.findFirst()? When would you use each?

Q6:  Explain what a JWT token is and how the auth flow works:
     register → login → access protected route → token expires

Q7:  You have an endpoint GET /patients that returns 10,000 patients.
     It takes 5 seconds. How do you fix this? (Name 3 approaches)

Q8:  What does this Prisma query return?
     const result = await prisma.appointment.groupBy({
         by: ['status'],
         _count: { id: true },
         where: { date: new Date() }
     });

Q9:  Your POST /appointments endpoint should:
     - Check if doctor exists
     - Check if slot is available
     - Create appointment
     - Create payment record
     If payment creation fails, the appointment should NOT exist.
     How do you handle this? Write the approach.

Q10: What is Redis used for in our project? Name 3 specific use cases.
```

---

## After the 24 Hours — What Everyone Can Do Now

| Skill | Before | After |
|-------|:------:|:-----:|
| PostgreSQL (tables, joins, indexes) | Basic SQL | Design hospital schemas with constraints |
| Prisma ORM (schema, migrations, queries) | Never used | Full CRUD + relations + aggregation |
| NestJS (modules, controllers, services) | Never used | Build complete REST API modules |
| DTOs + Validation | Never used | Validate every input with class-validator |
| JWT Authentication | Never used | Register, login, protect routes with guards |
| Error Handling | Basic try/catch | Proper HTTP exceptions + global filters |
| Swagger API Docs | Never used | Auto-generated docs for all endpoints |
| Redis Caching | Never used | Cache queries, rate limiting |
| Testing with Postman | Basic | Full test collections per module |
| Docker | Never used | Containerize the full backend |
| Code Review | Never done | Can review backend PRs with checklist |

## What's Next

You're now ready for the **Wiring Bootcamp** (16 hours) where you'll connect your backend to the frontend team's work and see real data flow through the full system.

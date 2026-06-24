# 16-Hour Wiring Bootcamp — Full-Stack Integration

> **Ayurvena Hospital Management System**
>
> The backend team (NestJS + Prisma + PostgreSQL) and the frontend team (Next.js + Tailwind + shadcn/ui) join forces. In 16 hours, you will connect every page to real APIs, add authentication, real-time updates, file uploads, and analytics — turning two separate codebases into one working application.

---

## What Is This

You have two separate apps right now:
1. **Backend** (NestJS on port 3001) — has APIs, database models, business logic
2. **Frontend** (Next.js on port 3000) — has pages, components, UI

But they don't talk to each other. The frontend shows **fake/mock data**. The backend has **no UI to call it**.

This bootcamp **wires them together**. By the end, every button click in the browser will:
1. Call a real API on the backend
2. Read/write to the real PostgreSQL database
3. Return real data to the UI
4. Update instantly

---

## The Full Team

| Name | Role | Expertise |
|------|------|-----------|
| **Abhinaya** | Database | Prisma schema, PostgreSQL, migrations |
| **Harshitha** | Backend | NestJS APIs, validation, business logic |
| **Srinitha** | QA | Testing, Postman, bug tracking |
| **Sanjay** | Frontend | Next.js pages, API client, UI |
| **Soumya** | Frontend | Forms, state, data fetching (mentor) |
| **Manaswini** | Frontend | Components, styling, animations |

## Buddy Pairs

Each backend person pairs with a frontend person so they learn each other's world:

| Pair | Backend | Frontend |
|------|---------|----------|
| Pair 1 | Harshitha | Sanjay |
| Pair 2 | Abhinaya | Manaswini |
| Mentor | — | Soumya (helps both pairs) |
| QA | Srinitha (tests everything) | |

---

## Prerequisites — What Must Be Running

Before Hour 1, make sure these are all running:

```bash
# 1. PostgreSQL (via Docker)
docker run --name ayurvena-db -e POSTGRES_USER=ayurvena -e POSTGRES_PASSWORD=ayurvena123 -e POSTGRES_DB=ayurvena -p 5432:5432 -d postgres:16

# 2. Redis (for BullMQ queues)
docker run --name ayurvena-redis -p 6379:6379 -d redis:7

# 3. Backend (NestJS on port 3001)
cd backend
npm install
npx prisma migrate dev
npm run start:dev
# Expected: "Nest application successfully started" + "Listening on port 3001"

# 4. Frontend (Next.js on port 3000)
cd frontend
npm install
npm run dev
# Expected: "Ready on http://localhost:3000"
```

### Quick Health Check

Open these in your browser:
- Backend: `http://localhost:3001/api/health` → should show `{ "status": "ok", "timestamp": "..." }`
- Frontend: `http://localhost:3000` → should show the Ayurvena dashboard

If both work, you are ready.

---

## Testing Philosophy

Every feature in this bootcamp is tested THREE ways:

| Method | What | Who |
|--------|------|-----|
| **Browser** | Click buttons, see data appear | Frontend dev |
| **Postman / curl** | Call API directly, check raw response | Backend dev |
| **Database** | Query PostgreSQL, verify data stored | Both |

**The flow for every feature:**

```
Browser ──GET/POST──→ NestJS API ──Prisma──→ PostgreSQL
   ↑                      │
   └──── JSON response ───┘
```

Srinitha (QA) ensures ALL three tests pass before moving to the next hour.

---

# DAY 1 — Connect Everything (Hours 1–8)

> **Goal:** By end of Day 1, all CRUD pages (patients, doctors, appointments) use real backend APIs, and login/logout works with JWT tokens.

---

## Hour 1: CORS — Why Your Frontend Can't Talk to Your Backend

### LEARN

**The Problem:** Your frontend runs on `http://localhost:3000`. Your backend runs on `http://localhost:3001`. They have different **origins** (different port = different origin). Browsers BLOCK requests between different origins by default. This is called the **Same-Origin Policy**.

```
Frontend: http://localhost:3000   ← origin A
Backend:  http://localhost:3001   ← origin B (different port!)

Browser says: "Nope, you can't fetch from a different origin"
```

**CORS (Cross-Origin Resource Sharing)** is the solution. The backend says: "It's okay, I trust this frontend origin." It does this by sending special HTTP headers.

```
Backend response headers:
Access-Control-Allow-Origin: http://localhost:3000   ← "I trust this origin"
Access-Control-Allow-Methods: GET, POST, PUT, DELETE  ← "These methods are allowed"
Access-Control-Allow-Headers: Content-Type, Authorization  ← "These headers are allowed"
```

**In NestJS:** Enable CORS when creating the app.

### BUILD

#### Backend: Enable CORS in NestJS

**`backend/src/main.ts`:**

```tsx
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS — allow frontend (port 3000) to call backend (port 3001)
  app.enableCors({
    origin: "http://localhost:3000",  // Allow only our frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
    credentials: true,                // Allow cookies/auth headers
  });

  await app.listen(3001);
  console.log("Backend running on http://localhost:3001");
}
bootstrap();
```

Restart the backend after this change.

#### Frontend: Test with a simple fetch

Open the browser console on `http://localhost:3000` and type:

```js
fetch("http://localhost:3001/api/health")
  .then(res => res.json())
  .then(data => console.log("Backend says:", data))
  .catch(err => console.error("CORS error?", err));
```

If CORS is correct, you will see `{ status: "ok" }`. If not, you will see a CORS error in the console.

**Commit (Backend):** `git commit -m "feat: enable CORS for frontend origin"`

#### Srinitah's Test (QA):

1. **Browser:** Open frontend, run the fetch in console → see `{ status: "ok" }` ✅
2. **Postman:** GET `http://localhost:3001/api/health` → Status 200 ✅
3. **Check:** Response headers include `Access-Control-Allow-Origin: http://localhost:3000` ✅

---

## Hour 2: Typed API Client — Axios in Next.js

### LEARN

**What is an API Client?** Instead of writing `fetch()` everywhere with raw URLs and error handling, create ONE file that:
- Has the base URL (`http://localhost:3001/api`)
- Adds headers (like Authorization token) automatically
- Handles errors consistently
- Returns typed data

**Axios** is a popular HTTP client for browsers:

```tsx
import axios from "axios";

// Instance with base config
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000, // 10 seconds
});

// Usage
const response = await api.get("/patients");
const data = response.data; // Axios puts response in .data
```

**Why typed?** TypeScript interfaces match the backend DTOs. If the backend changes a field name, TypeScript catches it at compile time.

### BUILD

#### Frontend: Create the API client

**`frontend/src/lib/api-client.ts`:**

```tsx
// src/lib/api-client.ts
// This is the ONE file that talks to the backend
// Every API call goes through this instance

import axios from "axios";

// Create axios instance with default config
export const api = axios.create({
  baseURL: "http://localhost:3001/api", // Backend base URL
  timeout: 15000,                        // 15 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — runs BEFORE every request
// Automatically adds JWT token if user is logged in
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor — runs AFTER every response
// Catches common errors and logs them
api.interceptors.response.use(
  (response) => response, // Success: just return response
  (error) => {
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error: Backend may be down");
    }
    return Promise.reject(error);
  }
);
```

#### Frontend: Create typed patient API

**`frontend/src/lib/patient-api.ts`:**

```tsx
// src/lib/patient-api.ts
// Typed API functions for patient CRUD operations
// Each function returns a typed Promise

import { api } from "./api-client";

// These types MUST match the backend DTOs
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  department: string;
  doctorName: string;
  admissionDate: string;
  status: string;
  bedNumber: string;
}

export interface CreatePatientDto {
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  department: string;
  complaint: string;
}

// GET /patients — fetch all patients
export async function getPatients(): Promise<Patient[]> {
  const response = await api.get("/patients");
  return response.data;
}

// GET /patients/:id — fetch single patient
export async function getPatient(id: string): Promise<Patient> {
  const response = await api.get(`/patients/${id}`);
  return response.data;
}

// POST /patients — create new patient
export async function createPatient(data: CreatePatientDto): Promise<Patient> {
  const response = await api.post("/patients", data);
  return response.data;
}

// DELETE /patients/:id — delete patient
export async function deletePatient(id: string): Promise<void> {
  await api.delete(`/patients/${id}`);
}
```

#### Frontend: Health check component

Create a simple component to verify the connection:

**`frontend/src/components/hospital/api-status.tsx`:**

```tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { Badge } from "@/components/ui/badge";

export function ApiStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");

  useEffect(() => {
    api.get("/health")
      .then(() => setStatus("connected"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span>Backend:</span>
      <Badge variant={status === "connected" ? "default" : "destructive"}>
        {status === "checking" ? "Checking..." : status === "connected" ? "Connected" : "Disconnected"}
      </Badge>
    </div>
  );
}
```

**Commit (Frontend):** `git commit -m "feat: add typed API client with axios"`

#### Srinitah's Test (QA):

1. **Browser:** Add `ApiStatus` to the dashboard → see "Backend: Connected" badge ✅
2. **Postman:** GET `http://localhost:3001/api/patients` → returns JSON array ✅
3. **Error test:** Stop backend, refresh frontend → see "Backend: Disconnected" ✅

---

## Hour 3: Patient CRUD — Full Stack, Real Data

### LEARN

**The data flow for creating a patient:**

```
Browser Form → POST /patients (JSON body)
  → NestJS Controller (validates input)
    → NestJS Service (business logic)
      → Prisma (SQL INSERT)
        → PostgreSQL (stores row)
      ← Prisma returns created patient
    ← Service returns patient
  ← Controller returns 201 + patient JSON
← Browser receives patient, shows success toast, updates table
```

**Key principle:** The frontend NO LONGER uses mock data. It calls real APIs. We will replace the `usePatients()` hook to fetch from the real backend.

### BUILD

#### Step 1: Backend — Ensure Patient CRUD Works

If you followed the backend bootcamp, you already have a patient module. Verify these endpoints exist:

| Method | Endpoint | What it does |
|--------|----------|-------------|
| GET | `/api/patients` | List all patients |
| GET | `/api/patients/:id` | Get one patient |
| POST | `/api/patients` | Create a patient |
| PATCH | `/api/patients/:id` | Update a patient |
| DELETE | `/api/patients/:id` | Delete a patient |

If missing, here is a minimal patient controller:

**`backend/src/patients/patients.controller.ts`:**

```tsx
import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.patientsService.findOne(id);
  }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.patientsService.remove(id);
  }
}
```

**`backend/src/patients/dto/create-patient.dto.ts`:**

```tsx
import { IsString, IsNumber, IsEnum, MinLength, Min, Max } from "class-validator";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export class CreatePatientDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @MinLength(2)
  department: string;

  @IsString()
  @MinLength(5)
  complaint: string;
}
```

#### Step 2: Frontend — Replace Mock Hooks with Real API

**`frontend/src/hooks/use-patients.ts`** (replace with real API):

```tsx
// src/hooks/use-patients.ts
// NOW CALLS REAL BACKEND API — no mock data!

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPatients, getPatient, createPatient, deletePatient, CreatePatientDto } from "@/lib/patient-api";
import { toast } from "sonner";

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,               // ← Calls real GET /api/patients
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: () => getPatient(id),      // ← Calls real GET /api/patients/:id
    enabled: !!id,                       // Don't fetch if no id
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePatientDto) => createPatient(data), // POST /api/patients
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] }); // Refresh list
      toast.success("Patient admitted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to admit patient");
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePatient(id),  // DELETE /api/patients/:id
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient discharged");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to discharge patient");
    },
  });
}
```

#### Step 3: Frontend — Update Admission Form to Call Real API

**`frontend/src/components/patient/admission-form.tsx`** (key changes):

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePatient } from "@/hooks/use-patients";
import { admissionSchema, AdmissionFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdmissionForm() {
  // Use the REAL mutation that calls the backend
  const createMutation = useCreatePatient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
  });

  const onSubmit = (data: AdmissionFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Admit New Patient</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter patient name" {...register("name")} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" {...register("age")} />
              {errors.age && <p className="text-sm text-red-500">{errors.age.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <select className="flex h-10 w-full rounded-md border px-3 py-2 text-sm" {...register("gender")}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" placeholder="e.g., Cardiology" {...register("department")} />
            {errors.department && <p className="text-sm text-red-500">{errors.department.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="complaint">Chief Complaint</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Describe patient's complaint"
              {...register("complaint")}
            />
            {errors.complaint && <p className="text-sm text-red-500">{errors.complaint.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Admitting..." : "Admit Patient"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

**Commit (Frontend):** `git commit -m "feat: connect patient CRUD to real backend API"`

### Full Flow Test

1. **Browser:** Go to `/patients/admit` → fill form → click "Admit Patient"
2. **Browser:** See success toast → redirected to patient list → new patient visible ✅
3. **Postman:** GET `http://localhost:3001/api/patients` → new patient in JSON array ✅
4. **Database:** Open `psql` or pgAdmin:
   ```sql
   SELECT id, name, age, department, status FROM "Patient";
   ```
   → New patient row exists ✅

**Commit:** `git commit -m "feat: connect patient CRUD to real backend API"`

---

## Hour 4: Patient Delete + Status Update — Full Stack

### LEARN

**Delete flow:**
```
Browser "Discharge" click → DELETE /api/patients/:id
  → Backend deletes from DB
  → Frontend refreshes table
  → Toast "Patient discharged"
```

**Update flow:**
```
Browser status change → PATCH /api/patients/:id { status: "Discharged" }
  → Backend updates DB
  → Frontend refreshes table
```

### BUILD

#### Frontend: Add discharge button to patient table

**`frontend/src/components/patient/patient-table.tsx`** (add action column):

```tsx
// Inside the columns array, replace the actions cell:
{
  id: "actions",
  header: "Actions",
  cell: ({ row }) => (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" asChild>
        <a href={`/patients/${row.original.id}`}>View</a>
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          if (confirm(`Discharge ${row.original.name}?`)) {
            deleteMutation.mutate(row.original.id);
          }
        }}
      >
        Discharge
      </Button>
    </div>
  ),
},
```

Make sure `deleteMutation` is available in the component:

```tsx
import { useDeletePatient } from "@/hooks/use-patients";

export function PatientTable({ patients }: PatientTableProps) {
  const deleteMutation = useDeletePatient();
  // ... rest of the component
}
```

#### Backend: Ensure PATCH endpoint exists

**`backend/src/patients/patients.controller.ts`** (add):

```tsx
import { Patch } from "@nestjs/common";

@Patch(":id")
update(
  @Param("id", ParseUUIDPipe) id: string,
  @Body() updatePatientDto: any,
) {
  return this.patientsService.update(id, updatePatientDto);
}
```

### QA Test (Srinitha):

1. **Browser:** Click "Discharge" on a patient → confirm → toast "Patient discharged" → table updates ✅
2. **Postman:** DELETE `http://localhost:3001/api/patients/P-001` → 200 OK ✅
3. **Database:** `SELECT * FROM "Patient" WHERE id = 'P-001'` → row gone ✅
4. **Edge case:** Click "Discharge" on already discharged patient → see error toast ✅

**Commit:** `git commit -m "feat: add discharge/delete with real API"`

---

## Hour 5: Doctor List — Real API, Card Grid

### LEARN

The doctors page currently shows mock data. We will wire it to the real backend.

**Backend doctor endpoints:**
| Method | Endpoint | What it does |
|--------|----------|-------------|
| GET | `/api/doctors` | List all doctors |
| GET | `/api/doctors/:id` | Get one doctor |

### BUILD

#### Backend: Ensure doctor module exists

**`backend/src/doctors/doctors.controller.ts`:**

```tsx
import { Controller, Get, Param } from "@nestjs/common";
import { DoctorsService } from "./doctors.service";

@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(id);
  }
}
```

Seed some doctors in the database for testing:

**`backend/prisma/seed.ts`:**

```tsx
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample doctors
  const doctors = [
    { name: "Dr. Sharma", specialization: "Cardiology", experience: 15, available: true },
    { name: "Dr. Patel", specialization: "Neurology", experience: 10, available: true },
    { name: "Dr. Kumar", specialization: "Orthopedics", experience: 8, available: false },
    { name: "Dr. Gupta", specialization: "General Medicine", experience: 20, available: true },
    { name: "Dr. Verma", specialization: "Pediatrics", experience: 12, available: true },
  ];

  for (const doctor of doctors) {
    await prisma.doctor.create({ data: doctor });
  }

  console.log("Seed data created!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
```

Run the seed: `npx prisma db seed`

#### Frontend: Create doctor API

**`frontend/src/lib/doctor-api.ts`:**

```tsx
import { api } from "./api-client";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  available: boolean;
}

export async function getDoctors(): Promise<Doctor[]> {
  const response = await api.get("/doctors");
  return response.data;
}
```

#### Frontend: Update doctors hook

**`frontend/src/hooks/use-doctors.ts`:**

```tsx
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/lib/doctor-api";

export function useDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
}
```

**Commit:** `git commit -m "feat: connect doctors page to real API"`

---

## Hour 6: Appointment Booking — Real Multi-Step Form

### LEARN

**Multi-step form pattern:** Instead of one big form, break booking into steps:
1. Select doctor
2. Select date & time
3. Enter patient details
4. Confirm & submit

Each step shows/hides based on current step number.

**Postman tip:** Test the POST endpoint BEFORE building the UI:

```bash
curl -X POST http://localhost:3001/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"patientName":"Test Patient","doctorId":"D-001","date":"2024-01-25","time":"10:00","reason":"Checkup"}'
```

### BUILD

#### Backend: Appointment module

**`backend/src/appointments/appointments.controller.ts`:**

```tsx
import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";

@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(dto);
  }
}
```

**`backend/src/appointments/dto/create-appointment.dto.ts`:**

```tsx
import { IsString, IsUUID, MinLength } from "class-validator";

export class CreateAppointmentDto {
  @IsString()
  @MinLength(2)
  patientName: string;

  @IsUUID()
  doctorId: string;

  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  @MinLength(5)
  reason: string;
}
```

#### Frontend: Appointment API

**`frontend/src/lib/appointment-api.ts`:**

```tsx
import { api } from "./api-client";

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

export interface BookAppointmentDto {
  patientName: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
}

export async function getAppointments(): Promise<Appointment[]> {
  const response = await api.get("/appointments");
  return response.data;
}

export async function bookAppointment(data: BookAppointmentDto): Promise<Appointment> {
  const response = await api.post("/appointments", data);
  return response.data;
}
```

#### Frontend: Multi-step booking form

**`frontend/src/components/appointment/booking-form.tsx`:**

```tsx
"use client";

import { useState } from "react";
import { useDoctors } from "@/hooks/use-doctors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookAppointment, BookAppointmentDto } from "@/lib/appointment-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Select Doctor", "Pick Date & Time", "Patient Info", "Confirm"];

export function BookingForm({ onSuccess }: { onSuccess?: () => void }) {
  const [step, setStep] = useState(0);
  const { data: doctors } = useDoctors();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    patientName: "",
    reason: "",
  });

  const bookingMutation = useMutation({
    mutationFn: (data: BookAppointmentDto) => bookAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment booked successfully!");
      setStep(0);
      setForm({ doctorId: "", date: "", time: "", patientName: "", reason: "" });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Booking failed");
    },
  });

  const canNext = () => {
    if (step === 0) return !!form.doctorId;
    if (step === 1) return !!form.date && !!form.time;
    if (step === 2) return !!form.patientName && form.patientName.length >= 2 && !!form.reason && form.reason.length >= 5;
    return true;
  };

  const handleSubmit = () => {
    bookingMutation.mutate(form);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment — Step {step + 1} of 4</CardTitle>
        {/* Step indicators */}
        <div className="flex gap-2 mt-2">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded ${i <= step ? "bg-blue-500" : "bg-gray-200"}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {step === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">Select a doctor</p>
                <div className="grid grid-cols-1 gap-2">
                  {doctors?.filter(d => d.available).map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => setForm({ ...form, doctorId: doctor.id })}
                      className={`p-3 rounded-lg border text-left transition ${
                        form.doctorId === doctor.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-gray-500">{doctor.specialization} • {doctor.experience} yrs</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Patient Name</label>
                  <Input
                    placeholder="Your name"
                    value={form.patientName}
                    onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Reason for Visit</label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="Describe your concern"
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Confirm Booking</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><strong>Doctor:</strong> {doctors?.find(d => d.id === form.doctorId)?.name}</p>
                  <p><strong>Date:</strong> {form.date}</p>
                  <p><strong>Time:</strong> {form.time}</p>
                  <p><strong>Patient:</strong> {form.patientName}</p>
                  <p><strong>Reason:</strong> {form.reason}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
            Back
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={bookingMutation.isPending}>
              {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

**Commit:** `git commit -m "feat: add multi-step appointment booking form connected to API"`

### QA Test (Srinitha):

1. **Double-booking test:** Submit the same doctor/time twice → backend should return 409 Conflict ✅
2. **Database check:** `SELECT * FROM "Appointment"` → new row ✅
3. **Postman:** POST same data again → get error response ✅

---

## Hour 7: Authentication — JWT Login & Register

### LEARN

**JWT (JSON Web Token):** A token that proves who you are. When you log in, the server creates a signed token and sends it to the frontend. The frontend stores it (in localStorage) and sends it with every request.

**Login flow:**

```
Frontend: POST /auth/login { email, password }
  → Backend: Check credentials, generate JWT token
  → Frontend: Store token in localStorage
  → Every subsequent request: Add "Authorization: Bearer <token>" header
```

**Protected routes:** Backend checks the token on every request. If missing or invalid, returns 401 Unauthorized. Frontend redirects to login page.

### BUILD

#### Backend: Auth module

**`backend/src/auth/auth.module.ts`:**

```tsx
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "ayurvena-secret-key-change-in-production", // In production, use env var
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

**`backend/src/auth/auth.controller.ts`:**

```tsx
import { Controller, Post, Body, UseGuards, Get, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  register(@Body() body: { email: string; password: string; name: string }) {
    return this.authService.register(body.email, body.password, body.name);
  }

  @Post("login")
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Req() req: any) {
    return req.user;
  }
}
```

**`backend/src/auth/auth.service.ts`:**

```tsx
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string) {
    // Hash the password before storing (never store plain text!)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
    // Generate token for immediate login after register
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }
}
```

**`backend/src/auth/jwt.strategy.ts`:**

```tsx
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "ayurvena-secret-key-change-in-production",
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
```

**Commit (Backend):** `git commit -m "feat: add JWT auth with register and login"`

#### Frontend: Auth API

**`frontend/src/lib/auth-api.ts`:**

```tsx
import { api } from "./api-client";

export interface AuthResponse {
  token: string;
  user: { id: string; email: string; name: string };
}

export async function register(email: string, password: string, name: string): Promise<AuthResponse> {
  const response = await api.post("/auth/register", { email, password, name });
  return response.data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function getProfile() {
  const response = await api.get("/auth/profile");
  return response.data;
}
```

#### Frontend: Login page

**`frontend/app/login/page.tsx`:**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/auth-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Hospital } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = isRegister ? await register(email, password, name) : await login(email, password);
      // Store token in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      toast.success(`Welcome, ${res.user.name}!`);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, redirect to dashboard
  if (typeof window !== "undefined" && localStorage.getItem("token")) {
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Hospital className="h-12 w-12 text-blue-600 mx-auto mb-2" />
          <CardTitle>{isRegister ? "Create Account" : "Welcome Back"}</CardTitle>
          <CardDescription>
            {isRegister ? "Register for Ayurvena" : "Login to Ayurvena Hospital"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hospital.com" required />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
            </Button>
          </form>
          <p className="text-center text-sm mt-4 text-gray-500">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button className="text-blue-600 hover:underline" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

#### Frontend: Auth context (protect routes)

**`frontend/src/lib/auth-context.tsx`:**

```tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  isLoggedIn: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

Add `AuthProvider` to the dashboard layout so protected pages have access:

**`frontend/app/(dashboard)/layout.tsx`:**

```tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/hospital/sidebar";
import { Header } from "@/components/hospital/header";
import { PageTransition } from "@/components/hospital/page-transition";
import { AuthProvider, useAuth } from "@/lib/auth-context";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null; // Don't flash the dashboard

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedLayout>{children}</ProtectedLayout>
    </AuthProvider>
  );
}
```

**Commit (Frontend):** `git commit -m "feat: add login/register page with JWT auth"`

### QA Test (Srinitha):

1. **Browser:** Go to `/dashboard` while not logged in → redirects to `/login` ✅
2. **Browser:** Register a new account → redirected to dashboard ✅
3. **Browser:** Refresh the page → still logged in (token in localStorage) ✅
4. **Browser:** Click logout → redirected to login, can't access dashboard ✅
5. **Postman:** GET `/api/auth/profile` without token → 401 ✅
6. **Postman:** GET `/api/auth/profile` with token → returns user profile ✅

---

## Hour 8: Protected Routes, Auth Guard on Backend

### LEARN

**Backend auth guard:** Protect specific API endpoints so only logged-in users can call them.

```tsx
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt")) // ← This endpoint needs a valid JWT
@Get("patients")
findAll() { ... }
```

**Frontend route protection:** Wrap dashboard pages with auth check. If no token, redirect to login.

### BUILD

#### Backend: Protect patient endpoints

**`backend/src/patients/patients.controller.ts`** (add guard to all methods):

```tsx
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt")) // Every route in this controller needs auth
@Controller("patients")
export class PatientsController {
  // ... all methods are now protected
}
```

#### Frontend: Add logout button to header

**`frontend/src/components/hospital/header.tsx`** (add):

```tsx
// Inside the header, add after the existing buttons:
import { useAuth } from "@/lib/auth-context";
import { LogOut } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();
  // ... existing code

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* ... existing search */}
      <div className="flex items-center gap-3">
        {/* ... existing buttons */}
        <span className="text-sm text-gray-600">{user?.name}</span>
        <Button variant="ghost" size="icon" onClick={logout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
```

**Commit:** `git commit -m "feat: add backend auth guard and logout button"`

### Day 1 End-to-End Test

Run through the FULL user journey:

1. Open `http://localhost:3000` → redirected to `/login`
2. Register: `admin@ayurvena.com` / `password123` / `Admin`
3. Redirected to dashboard with real stats
4. Click "Patients" → real patient list from API
5. Click "Admit Patient" → fill form → submit → see in table
6. Click "View" on a patient → patient detail page
7. Click "Discharge" → patient removed
8. Click "Doctors" → real doctor cards
9. Book an appointment through multi-step form
10. Click "Appointments" → see booked appointment
11. Refresh page → still logged in
12. Click logout → redirected to login

**Commit:** `git commit -m "feat: complete Day 1 — full-stack wiring"`

---

# DAY 2 — Real-Time + Polish (Hours 9–16)

> **Goal:** By end of Day 2, the app has real-time updates, file uploads, analytics with real data, and Docker deployment.

---

## Hour 9: WebSocket Real-Time — Socket.io

### LEARN

**What are WebSockets?** Unlike HTTP (request-response), WebSockets keep a persistent connection open. The server can PUSH data to the client without the client asking.

**Use case:** When a new appointment is booked, ALL connected browsers should see it immediately without refreshing.

**Socket.io** is a library that makes WebSockets easy. It has two parts:
1. **Server** (NestJS) — emits events when data changes
2. **Client** (frontend) — listens for events and updates UI

### BUILD

#### Backend: Set up Socket.io gateway

Install: `npm install @nestjs/websockets @nestjs/platform-socket.io socket.io`

**`backend/src/events/events.gateway.ts`:**

```tsx
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Track connected clients
  private connectedClients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    this.connectedClients.set(client.id, client);
    console.log(`Client connected: ${client.id} (Total: ${this.connectedClients.size})`);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    console.log(`Client disconnected: ${client.id} (Total: ${this.connectedClients.size})`);
  }

  // Called by services to broadcast events to all clients
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }
}
```

**`backend/src/events/events.module.ts`:**

```tsx
import { Module, Global } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";

@Global() // Make it available everywhere without importing
@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
```

**Modify appointment service to emit events:**

**`backend/src/appointments/appointments.service.ts`:**

```tsx
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EventsGateway } from "../events/events.gateway";

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway, // Inject the gateway
  ) {}

  async create(dto: any) {
    const appointment = await this.prisma.appointment.create({ data: dto });

    // Broadcast to ALL connected clients
    this.eventsGateway.broadcast("appointment:created", appointment);

    return appointment;
  }

  async update(id: string, dto: any) {
    const appointment = await this.prisma.appointment.update({
      where: { id },
      data: dto,
    });

    // Broadcast update event
    this.eventsGateway.broadcast("appointment:updated", appointment);

    return appointment;
  }
}
```

**Commit (Backend):** `git commit -m "feat: add Socket.io events gateway"`

#### Frontend: Listen for real-time events

Install: `npm install socket.io-client`

**`frontend/src/lib/socket.ts`:**

```tsx
// src/lib/socket.ts
// Socket.io client — connects to backend and listens for real-time events

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:3001", {
      transports: ["websocket"], // Use WebSocket directly (no polling)
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
```

**`frontend/src/hooks/use-realtime-appointments.ts`:**

```tsx
// Hook that listens for real-time appointment updates
// When a new appointment is created, refetch the data

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/lib/socket";

export function useRealtimeAppointments() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    // When any appointment changes, refetch appointment list
    const handleEvent = () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    };

    socket.on("appointment:created", handleEvent);
    socket.on("appointment:updated", handleEvent);

    return () => {
      socket.off("appointment:created", handleEvent);
      socket.off("appointment:updated", handleEvent);
    };
  }, [queryClient]);
}
```

Add the hook to the appointments page:

**`frontend/app/(dashboard)/appointments/page.tsx`** (add at top of component):

```tsx
import { useRealtimeAppointments } from "@/hooks/use-realtime-appointments";

export default function AppointmentsPage() {
  useRealtimeAppointments(); // ← Start listening for real-time updates
  // ... rest of the component
}
```

**Commit (Frontend):** `git commit -m "feat: add real-time appointment updates via Socket.io"`

### QA Test (Srinitha):

1. Open TWO browser tabs at `http://localhost:3000/appointments`
2. In Tab 1, book a new appointment
3. Tab 2 updates AUTOMATICALLY without refresh ✅
4. Check server console: "Client connected" appears for each tab ✅
5. Check database: appointment exists ✅

---

## Hour 10: Real-Time Dashboard Stats

### LEARN

**Live dashboard updates:** When a patient is admitted or discharged, the dashboard stats (patient count, bed occupancy) update in real-time on ALL connected browsers.

### BUILD

#### Backend: Emit events from patient service

**`backend/src/patients/patients.service.ts`** (modify create and delete):

```tsx
async create(dto: any) {
  const patient = await this.prisma.patient.create({ data: dto });
  this.eventsGateway.broadcast("stats:updated", await this.getStats());
  return patient;
}

async remove(id: string) {
  await this.prisma.patient.delete({ where: { id } });
  this.eventsGateway.broadcast("stats:updated", await this.getStats());
}

private async getStats() {
  const totalPatients = await this.prisma.patient.count();
  const activeDoctors = await this.prisma.doctor.count({ where: { available: true } });
  const todayAppointments = await this.prisma.appointment.count({
    where: { date: new Date().toISOString().split("T")[0] },
  });
  return { totalPatients, activeDoctors, todayAppointments, bedOccupancy: "78%" };
}
```

#### Frontend: Real-time dashboard hook

**`frontend/src/hooks/use-realtime-stats.ts`:**

```tsx
import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

interface DashboardStats {
  totalPatients: number;
  activeDoctors: number;
  todayAppointments: number;
  bedOccupancy: string;
}

export function useRealtimeStats(initialStats: DashboardStats) {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const socket = getSocket();

    socket.on("stats:updated", (newStats: DashboardStats) => {
      setStats(newStats);
    });

    return () => {
      socket.off("stats:updated");
    };
  }, []);

  return stats;
}
```

**Commit:** `git commit -m "feat: add real-time dashboard stats updates"`

---

## Hour 11: File Upload — Patient Photo

### LEARN

**File upload flow:**

```
Browser: <input type="file" /> → FormData → POST /api/upload
  → NestJS: @UseInterceptors(FileInterceptor) → saves file to disk
  → Returns file URL → Frontend shows image
```

**Multer** is the middleware NestJS uses for file uploads. Install it:
```bash
npm install @nestjs/platform-express multer
```

### BUILD

#### Backend: File upload controller

**`backend/src/upload/upload.controller.ts`:**

```tsx
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("upload")
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads", // Save files to uploads/ folder
        filename: (req, file, callback) => {
          // Generate unique filename: timestamp-random.ext
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname);
          callback(null, `${unique}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Only allow images
        if (!file.mimetype.startsWith("image/")) {
          callback(new BadRequestException("Only image files allowed"), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file uploaded");
    return {
      url: `http://localhost:3001/uploads/${file.filename}`,
      filename: file.filename,
    };
  }
}
```

Serve uploaded files statically in `main.ts`:

```tsx
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve uploaded files
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads",
  });
  // ... rest
}
```

#### Frontend: Image upload component

**`frontend/src/components/hospital/file-upload.tsx`:**

```tsx
"use client";

import { useState, useRef } from "react";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    setPreview(URL.createObjectURL(file));

    // Upload to backend
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUploadComplete(response.data.url);
      toast.success("Photo uploaded");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {preview ? (
        <div className="relative w-32 h-32">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
          />
          <button
            onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = ""; }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <Button variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading}>
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Uploading..." : "Upload Photo"}
        </Button>
      )}
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add file upload for patient photos"`

---

## Hour 12: PDF Prescription Generation

### LEARN

**PDF generation:** The backend generates a PDF prescription and returns it as a file download. The frontend shows a "Download Prescription" button.

**Library:** Use `pdfkit` (Node.js PDF generation library):
```bash
npm install pdfkit
```

### BUILD

#### Backend: Prescription PDF endpoint

**`backend/src/prescriptions/prescriptions.controller.ts`:**

```tsx
import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import * as PDFDocument from "pdfkit";

@Controller("prescriptions")
export class PrescriptionsController {
  @Get(":patientId")
  async generate(@Param("patientId") patientId: string, @Res() res: Response) {
    // Fetch patient data (replace with actual Prisma query)
    const patient = { name: "Ravi Kumar", age: 45, doctor: "Dr. Sharma", date: "2024-01-20" };

    // Create a new PDF document
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=prescription-${patientId}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // --- Build the PDF content ---

    // Header
    doc.fontSize(20).font("Helvetica-Bold").text("Ayurvena Hospital", { align: "center" });
    doc.fontSize(10).font("Helvetica").text("123 Healthcare Street, Medical District", { align: "center" });
    doc.moveDown();

    // Separator line
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown();

    // Patient info
    doc.fontSize(12).font("Helvetica-Bold").text("Prescription");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica");
    doc.text(`Patient: ${patient.name}`);
    doc.text(`Age: ${patient.age}`);
    doc.text(`Doctor: ${patient.doctor}`);
    doc.text(`Date: ${patient.date}`);
    doc.moveDown();

    // Separator
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown();

    // Prescription items
    doc.fontSize(11).font("Helvetica-Bold").text("Medications:");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica");

    const meds = [
      { name: "Amoxicillin 500mg", dosage: "1 capsule 3 times daily", days: 7 },
      { name: "Paracetamol 650mg", dosage: "1 tablet when needed", days: 3 },
      { name: "Vitamin D3 2000IU", dosage: "1 capsule daily", days: 30 },
    ];

    meds.forEach((med, i) => {
      doc.text(`${i + 1}. ${med.name}`);
      doc.text(`   ${med.dosage} — ${med.days} days`);
      doc.moveDown(0.3);
    });

    doc.moveDown();

    // Doctor signature
    doc.fontSize(10).font("Helvetica");
    doc.text("_________________________", { align: "right" });
    doc.text("Doctor's Signature", { align: "right" });

    // Footer
    doc.fontSize(8).text("This is a computer-generated prescription.", { align: "center", color: "gray" });

    // Finalize PDF
    doc.end();
  }
}
```

#### Frontend: Download button

**`frontend/src/components/prescription/download-button.tsx`:**

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api-client";
import { toast } from "sonner";

interface DownloadPrescriptionProps {
  patientId: string;
  patientName: string;
}

export function DownloadPrescription({ patientId, patientName }: DownloadPrescriptionProps) {
  const [loading, setLoading] = useState(false);

  const downloadPdf = async () => {
    setLoading(true);
    try {
      // Fetch PDF as blob (binary data)
      const response = await api.get(`/prescriptions/${patientId}`, {
        responseType: "blob",
      });

      // Create a download link and click it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `prescription-${patientName}.pdf`;
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      toast.success("Prescription downloaded");
    } catch (error) {
      toast.error("Failed to download prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={downloadPdf} disabled={loading} variant="outline">
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <FileText className="h-4 w-4 mr-2" />
      )}
      {loading ? "Generating..." : "Download Prescription"}
    </Button>
  );
}
```

Add the button to the patient detail page:

```tsx
// In app/(dashboard)/patients/[id]/page.tsx, add inside Quick Actions card:
import { DownloadPrescription } from "@/components/prescription/download-button";

<DownloadPrescription patientId={patient.id} patientName={patient.name} />
```

**Commit:** `git commit -m "feat: add PDF prescription generation and download"`

### QA Test (Srinitha):

1. **Browser:** Go to patient detail → click "Download Prescription" → PDF downloads ✅
2. **Open PDF:** Check it has patient info, medications, doctor signature ✅
3. **Postman:** GET `/api/prescriptions/P-001` → response is PDF (check Content-Type) ✅

---

## Hour 13: Dashboard with Real Analytics

### LEARN

**Prisma aggregation:** Instead of returning all rows and counting in JavaScript, use Prisma's built-in aggregation to get counts directly from PostgreSQL — much faster.

```tsx
// Prisma aggregation examples
const totalPatients = await prisma.patient.count();
const patientsByDept = await prisma.patient.groupBy({
  by: ["department"],
  _count: { id: true },
});
const todayAppointments = await prisma.appointment.count({
  where: { date: new Date().toISOString().split("T")[0] },
});
```

### BUILD

#### Backend: Analytics endpoint

**`backend/src/analytics/analytics.controller.ts`:**

```tsx
import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("analytics")
export class AnalyticsController {
  constructor(private prisma: PrismaService) {}

  @Get("dashboard")
  async getDashboardStats() {
    const totalPatients = await this.prisma.patient.count();
    const activeDoctors = await this.prisma.doctor.count({ where: { available: true } });
    const totalBeds = 182;
    const occupiedBeds = await this.prisma.patient.count({
      where: { status: { not: "Discharged" } },
    });

    // Patients by department
    const patientsByDept = await this.prisma.patient.groupBy({
      by: ["department"],
      _count: { id: true },
    });

    // Today's appointments
    const today = new Date().toISOString().split("T")[0];
    const todayAppointments = await this.prisma.appointment.count({
      where: { date: today },
    });

    // Weekly admissions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyAdmissions = await this.prisma.patient.findMany({
      where: { admissionDate: { gte: sevenDaysAgo } },
      select: { admissionDate: true },
    });

    // Count per day
    const dayCount: Record<string, number> = {};
    weeklyAdmissions.forEach((p) => {
      const d = new Date(p.admissionDate).toLocaleDateString("en-US", { weekday: "short" });
      dayCount[d] = (dayCount[d] || 0) + 1;
    });

    return {
      totalPatients,
      activeDoctors,
      todayAppointments,
      bedOccupancy: `${Math.round((occupiedBeds / totalBeds) * 100)}%`,
      patientsByDept: patientsByDept.map((d) => ({
        department: d.department,
        patients: d._count.id,
      })),
      weeklyAdmissions: Object.entries(dayCount).map(([day, admissions]) => ({
        day,
        admissions,
      })),
    };
  }
}
```

#### Frontend: Real analytics hook

**`frontend/src/hooks/use-analytics.ts`:**

```tsx
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface DashboardAnalytics {
  totalPatients: number;
  activeDoctors: number;
  todayAppointments: number;
  bedOccupancy: string;
  patientsByDept: { department: string; patients: number }[];
  weeklyAdmissions: { day: string; admissions: number }[];
}

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics", "dashboard"],
    queryFn: async () => {
      const response = await api.get("/analytics/dashboard");
      return response.data as DashboardAnalytics;
    },
    refetchInterval: 30000, // Refetch every 30 seconds for near-real-time
  });
}
```

Update the dashboard page to use real data:

**`frontend/app/(dashboard)/dashboard/page.tsx`:**

```tsx
"use client";

import { useAnalytics } from "@/hooks/use-analytics";
import { useRealtimeStats } from "@/hooks/use-realtime-stats";
import { DashboardCard } from "@/components/hospital/dashboard-card";
import { DashboardCharts } from "@/components/hospital/dashboard-charts";
import { Users, Stethoscope, CalendarCheck, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: analytics, isLoading } = useAnalytics();
  // Fall back to real-time stats if available
  const realtimeStats = useRealtimeStats(analytics || {
    totalPatients: 0, activeDoctors: 0, todayAppointments: 0, bedOccupancy: "0%",
    patientsByDept: [], weeklyAdmissions: [],
  });

  const stats = analytics || realtimeStats;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
        </div>
        <Skeleton className="h-80" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Hospital overview (auto-refreshes every 30s)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Patients" value={stats.totalPatients} icon={<Users className="h-5 w-5" />} />
        <DashboardCard title="Active Doctors" value={stats.activeDoctors} icon={<Stethoscope className="h-5 w-5" />} />
        <DashboardCard title="Today's Appointments" value={stats.todayAppointments} icon={<CalendarCheck className="h-5 w-5" />} />
        <DashboardCard title="Bed Occupancy" value={stats.bedOccupancy} icon={<Activity className="h-5 w-5" />} />
      </div>

      <DashboardCharts />
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add real analytics dashboard with Prisma aggregation"`

### QA Test (Srinitha):

1. **Browser:** Dashboard shows real numbers ✅
2. **Verify:** Count patients in DB → matches dashboard
   ```sql
   SELECT COUNT(*) FROM "Patient";
   ```
   → Same number as dashboard `totalPatients` ✅
3. **Browser:** Admit a new patient → dashboard count increases (30s refresh or instant via WebSocket) ✅
4. **Postman:** GET `/api/analytics/dashboard` → returns all stats ✅

---

## Hour 14: Dashboard Charts with Real Data

### LEARN

Now we pass the real analytics data (patients by department, weekly admissions) to the Recharts components we built earlier.

### BUILD

Update the DashboardCharts component to accept real data:

**`frontend/src/components/hospital/dashboard-charts.tsx`** (update to accept props):

```tsx
"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
const STATUS_COLORS = { Stable: "#22c55e", Critical: "#ef4444", "Under Observation": "#f59e0b", Discharged: "#6b7280" };

interface DashboardChartsProps {
  patientsByDept?: { department: string; patients: number }[];
  weeklyAdmissions?: { day: string; admissions: number }[];
}

export function DashboardCharts({ patientsByDept = [], weeklyAdmissions = [] }: DashboardChartsProps) {
  // If no real data yet, show empty state
  const hasData = patientsByDept.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patients by Department</CardTitle>
        </CardHeader>
        <CardContent>
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientsByDept}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="department" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="patients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No department data yet
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Status distribution coming soon
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Admissions</CardTitle>
        </CardHeader>
        <CardContent>
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyAdmissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="admissions" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No admission data yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

**Commit:** `git commit -m "feat: wire dashboard charts to real analytics API"`

---

## Hour 15: Full E2E Flow Test — Code Review

### LEARN

**End-to-end (E2E) test** means testing the COMPLETE user journey from start to finish:

1. Register → Login → Dashboard
2. View patients → Admit patient → Verify in DB
3. Book appointment → Verify in DB → Real-time update
4. View doctor list → Download prescription
5. Logout → Try accessing dashboard → Redirected to login

**Cross-review:** Today, backend developers review frontend code and vice versa. Why? Because when you understand the other side, you catch integration bugs faster.

### BUILD

#### Cross-Review Checklist

**Backend reviews Frontend (Harshitha + Abhinaya review Sanjay + Manaswini's code):**

```md
# Backend Team Reviews Frontend

## API Client Check
- [ ] Are all API endpoints called with correct method? (GET/POST/PATCH/DELETE)
- [ ] Are request bodies matching backend DTOs? (field names, types)
- [ ] Is the auth token being sent in headers?
- [ ] Are errors handled gracefully? (toast messages)

## Data Display Check
- [ ] Do table columns match API response fields?
- [ ] Are dates formatted correctly?
- [ ] Are status values mapped to correct badge colors?

## Performance Check
- [ ] Are API calls cached with TanStack Query?
- [ ] Are unnecessary re-renders avoided?
```

**Frontend reviews Backend (Sanjay + Manaswini review Harshitha + Abhinaya's code):**

```md
# Frontend Team Reviews Backend

## API Contract Check
- [ ] Does every endpoint return the expected JSON shape?
- [ ] Are error responses consistent? ({ message, statusCode, error })
- [ ] Are UUIDs returned as strings?
- [ ] Are dates in ISO format?

## Validation Check
- [ ] Does the backend reject invalid data with clear error messages?
- [ ] Are required fields enforced?
- [ ] Are duplicate bookings prevented?

## Auth Check
- [ ] Are protected endpoints returning 401 without token?
- [ ] Does token expiry work?
```

#### Run the Full E2E Test

Srinitha leads the E2E test. Everyone watches and takes notes.

**Test script:**

```bash
echo "=== AYURVENA E2E TEST ==="

echo "1. Health Check"
curl -s http://localhost:3001/api/health | head -c 200
echo ""

echo "2. Register"
curl -s -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123","name":"Test User"}' | head -c 200
echo ""

echo "3. Login"
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
echo "Token: ${TOKEN:0:20}..."

echo "4. Create Patient"
curl -s -X POST http://localhost:3001/api/patients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"E2E Patient","age":30,"gender":"Male","department":"Cardiology","complaint":"Chest pain"}' | head -c 200
echo ""

echo "5. List Patients"
curl -s http://localhost:3001/api/patients \
  -H "Authorization: Bearer $TOKEN" | python3 -c "import sys,json;d=json.load(sys.stdin);print(f'Patients: {len(d)}')"

echo "6. Book Appointment"
curl -s -X POST http://localhost:3001/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"patientName":"E2E Patient","doctorId":"D-001","date":"2024-01-25","time":"10:00","reason":"Checkup"}' | head -c 200
echo ""

echo "7. Dashboard Analytics"
curl -s http://localhost:3001/api/analytics/dashboard \
  -H "Authorization: Bearer $TOKEN" | python3 -c "import sys,json;d=json.load(sys.stdin);print(f'Total: {d[\"totalPatients\"]}, Today: {d[\"todayAppointments\"]}')"

echo "8. Protected Route without Token"
curl -s http://localhost:3001/api/patients | head -c 100
echo ""

echo "=== E2E TEST COMPLETE ==="
```

**Commit:** `git commit -m "test: add E2E test script and cross-review"`

---

## Hour 16: Docker Basics + Deployment Prep

### LEARN

**Why Docker?** Docker packages your app + all its dependencies into a container. Anyone can run it without installing Node.js, PostgreSQL, or Redis. One command = everything runs.

**Docker Compose** runs multiple containers together (frontend + backend + database + redis).

### BUILD

#### Dockerfile for Backend

**`backend/Dockerfile`:**

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Run (smaller image, no dev dependencies)
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
EXPOSE 3001
CMD ["node", "dist/main"]
```

#### Dockerfile for Frontend

**`frontend/Dockerfile`:**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

#### Docker Compose

**`docker-compose.yml`** (project root):

```yaml
version: "3.8"

services:
  # PostgreSQL database
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: ayurvena
      POSTGRES_PASSWORD: ayurvena123
      POSTGRES_DB: ayurvena
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  # Redis for queues
  redis:
    image: redis:7
    ports:
      - "6379:6379"

  # Backend API
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://ayurvena:ayurvena123@db:5432/ayurvena
      REDIS_URL: redis://redis:6379
    depends_on:
      - db
      - redis

  # Frontend app
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001/api
    depends_on:
      - backend

volumes:
  pgdata:
```

#### Run everything with one command:

```bash
docker compose up --build
# Wait a few minutes for the first build
# Open http://localhost:3000
```

**Commit:** `git commit -m "feat: add Dockerfiles and Docker Compose for deployment"`

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| **CORS error in browser** | Backend CORS not configured correctly | Check `main.ts` has `app.enableCors({ origin: "http://localhost:3000" })` |
| **Wrong port** | Frontend calls wrong backend URL | Check `api-client.ts`: `baseURL` should be `http://localhost:3001/api` |
| **404 Not Found** | Endpoint doesn't exist or wrong method | Check controller has the route and method (GET vs POST) |
| **500 Internal Server Error** | Backend code crashed | Check terminal for stack trace. Often a Prisma query issue |
| **JSON Parse Error** | Backend returned HTML instead of JSON | Usually means backend crashed and returned error page |
| **Network Error** | Backend is down | `docker ps` to check containers, `npm run start:dev` to restart |
| **401 Unauthorized** | Token missing or expired | Login again, check `api.interceptors.request` adds token |
| **403 Forbidden** | Token invalid | Token might be malformed or signed with wrong secret |
| **data is undefined** | API response shape doesn't match frontend type | Log `response.data` in browser console, compare with TypeScript interface |
| **Prisma error** | Migration not run or schema mismatch | `npx prisma migrate dev` to sync database |
| **Socket.io not connecting** | Wrong URL or CORS | Check socket URL matches backend, CORS allows frontend origin |
| **File upload fails** | Multer not configured | Check `FileInterceptor` setup and `diskStorage` destination folder exists |
| **PDF not downloading** | Response type wrong | Frontend needs `responseType: "blob"` in axios config |
| **Port already in use** | Another process on same port | `netstat -ano | findstr :3001` to find PID, kill it with `taskkill /PID <id> /F` |

---

## After 16 Hours

### Skills You've Mastered

| Skill | What you did | Level |
|-------|-------------|-------|
| CORS configuration | Enabled cross-origin requests between frontend and backend | ⭐⭐⭐ |
| REST API integration | Connected every page to real backend endpoints | ⭐⭐⭐ |
| JWT Authentication | Login/register with token-based auth | ⭐⭐⭐ |
| Real-time WebSockets | Live updates across browser tabs | ⭐⭐ |
| File uploads | Patient photo upload with Multer | ⭐⭐ |
| PDF generation | Server-side prescription PDF | ⭐⭐ |
| Prisma aggregation | Database-level analytics for dashboards | ⭐⭐ |
| Docker deployment | Containerized full stack with Docker Compose | ⭐⭐ |
| Cross-team code review | Backend reviews frontend, frontend reviews backend | ⭐⭐⭐ |

### Git Log Summary

```
feat: enable CORS for frontend origin
feat: add typed API client with axios
feat: connect patient CRUD to real backend API
feat: add discharge/delete with real API
feat: connect doctors page to real API
feat: add multi-step appointment booking form connected to API
feat: add JWT auth with register and login
feat: add login/register page with JWT auth
feat: add backend auth guard and logout button
feat: add Socket.io events gateway
feat: add real-time appointment updates via Socket.io
feat: add real-time dashboard stats updates
feat: add file upload for patient photos
feat: add PDF prescription generation and download
feat: add real analytics dashboard with Prisma aggregation
feat: wire dashboard charts to real analytics API
test: add E2E test script and cross-review
feat: add Dockerfiles and Docker Compose for deployment
```

---

## Ready for Ayurvena Sprint 1

This bootcamp took two separate codebases and turned them into ONE working application. You now have:

```
┌─────────────┐     HTTP/WebSocket     ┌──────────────┐     Prisma     ┌────────────┐
│  Frontend   │ ◄──────────────────►   │   Backend    │ ◄────────────► │ PostgreSQL │
│  Next.js    │     REST API + JWT     │   NestJS     │                │            │
│  Port 3000  │                        │   Port 3001  │                │  Database  │
└─────────────┘                        └──────────────┘                └────────────┘
       │                                     │
       │                              ┌──────┴──────┐
       │                              │    Redis     │
       │                              │  (BullMQ)   │
       │                              └─────────────┘
       │
  ┌────┴────┐
  │ Browser │
  │  User   │
  └─────────┘
```

### What Sprint 1 Will Build On

| Feature | What's ready | What to add |
|---------|-------------|-------------|
| Patient Management | CRUD, real-time, photos | Search, filters, export CSV |
| Appointments | Booking, real-time, double-booking prevention | Calendar view, reminders |
| Doctors | List, availability grid | Schedule management, leave requests |
| Auth | JWT login/register | Roles (admin, doctor, receptionist) |
| Dashboard | Real analytics from DB | Custom date range, drill-down |
| Prescriptions | PDF download | Digital signature, medicine DB |
| Infrastructure | Docker Compose | CI/CD pipeline, staging env |

### Final Words

> "Two teams. Two codebases. Six developers. Sixteen hours.
> You started with mocks and ended with real data flowing from PostgreSQL through NestJS to Next.js to the browser.
> That's not just coding — that's engineering."
>
> — **The Ayurvena Team**

---

## Appendix: Quick Reference

### Docker Commands

```bash
# Start everything
docker compose up --build

# Start in background
docker compose up -d

# Stop everything
docker compose down

# View logs
docker compose logs -f backend

# Reset database
docker compose down -v && docker compose up -d
```

### Postman Collection

Import these curl commands into Postman:

```bash
# Health
GET http://localhost:3001/api/health

# Auth - Register
POST http://localhost:3001/api/auth/register
Content-Type: application/json
Body: {"email":"test@test.com","password":"pass123","name":"Test"}

# Auth - Login
POST http://localhost:3001/api/auth/login
Content-Type: application/json
Body: {"email":"test@test.com","password":"pass123"}

# Patients - List (use token from login)
GET http://localhost:3001/api/patients
Authorization: Bearer <token>

# Patients - Create
POST http://localhost:3001/api/patients
Authorization: Bearer <token>
Content-Type: application/json
Body: {"name":"New Patient","age":45,"gender":"Male","department":"Cardiology","complaint":"Chest pain"}

# Appointments - Book
POST http://localhost:3001/api/appointments
Authorization: Bearer <token>
Content-Type: application/json
Body: {"patientName":"Test","doctorId":"D-001","date":"2024-01-25","time":"10:00","reason":"Checkup"}

# Analytics
GET http://localhost:3001/api/analytics/dashboard
Authorization: Bearer <token>

# Upload file
POST http://localhost:3001/api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data
File: <select image>
```

### Database Quick Queries

```sql
-- Check all patients
SELECT id, name, age, department, status FROM "Patient";

-- Check all appointments
SELECT id, "patientName", "doctorName", date, time, status FROM "Appointment";

-- Check all doctors
SELECT id, name, specialization, available FROM "Doctor";

-- Count stats
SELECT COUNT(*) as total FROM "Patient";
SELECT COUNT(*) as active FROM "Doctor" WHERE available = true;
SELECT COUNT(*) as today FROM "Appointment" WHERE date = CURRENT_DATE;

-- Group by department
SELECT department, COUNT(*) as patients FROM "Patient" GROUP BY department;
```

---

## Hour 15: Full End-to-End Flow Test (1 Hour)

**Everyone together.** Run through the COMPLETE user journey. One person drives, everyone watches and catches bugs.

### The Flow (Must All Work)

```
Step 1:  Open browser → http://localhost:3000 → see login page
Step 2:  Click "Register" → fill form → submit → account created
Step 3:  Login with credentials → redirected to dashboard
Step 4:  Dashboard shows real stats (patients, appointments, revenue)
Step 5:  Navigate to Doctors → see doctor list from database
Step 6:  Click a doctor → see profile with available slots
Step 7:  Book appointment → select date → select slot → confirm
Step 8:  Payment screen → simulate payment → success
Step 9:  Navigate to My Appointments → see the new appointment
Step 10: Open a second browser tab → login as a different user
Step 11: Book the SAME slot → should get "slot unavailable" error
Step 12: Go back to dashboard → stats should be updated
Step 13: Logout → try accessing dashboard → redirected to login
```

### Bug Tracking

As you test, write down every bug:

```
| # | Screen        | Bug Description                          | Severity | Who Fixes   |
|---|---------------|------------------------------------------|----------|-------------|
| 1 | Login         | No error message on wrong password       | Medium   | Frontend    |
| 2 | Booking       | Slot still shows available after booking  | High     | Backend     |
| 3 | Dashboard     | Revenue shows NaN                        | High     | Backend     |
```

**Fix all HIGH bugs before moving to Hour 16. MEDIUM bugs go to the backlog.**

---

## Hour 16: Cross-Review + Docker + Wrap Up (1 Hour)

### Cross-Review (30 min)

Backend team reviews frontend code. Frontend team reviews backend code. This is how you learn each other's layer.

| Reviewer | Reviews | What to look for |
|----------|---------|-----------------|
| Abhinaya | Frontend API client code | Are API URLs correct? Error handling on failed requests? |
| Harshitha | Frontend form submissions | Does the data format match what the backend expects? |
| Srinitha | Both | Are all error cases handled? What happens with bad data? |
| Sanjay | Backend controllers | Are responses in the format frontend expects? |
| Soumya | Backend auth flow | Does JWT flow match what frontend implements? |
| Manaswini | Prisma schema | Do the relations match what the frontend displays? |

### Docker Compose — Full Stack (20 min)

Run the entire project with one command:

```yaml
# docker-compose.yml (project root)
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: ayurvena
      POSTGRES_PASSWORD: ayurvena123
      POSTGRES_DB: ayurvena
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://ayurvena:ayurvena123@db:5432/ayurvena
      REDIS_URL: redis://redis:6379
      JWT_SECRET: your-secret-key
    depends_on:
      - db
      - redis

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
    depends_on:
      - backend

volumes:
  pgdata:
```

```bash
# Start everything
docker compose up -d

# Check all services are running
docker compose ps

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Stop everything
docker compose down
```

### Final Commit

```bash
git add .
git commit -m "wiring bootcamp complete - full stack connected"
git push
```

---

## Troubleshooting — Common Errors When Connecting Frontend to Backend

| Error | What it means | How to fix |
|-------|--------------|------------|
| `CORS error` / `blocked by CORS policy` | Browser blocks requests to a different port/domain | Enable CORS in NestJS: `app.enableCors({ origin: 'http://localhost:3000' })` |
| `Network Error` / `ERR_CONNECTION_REFUSED` | Backend is not running | Start NestJS: `npm run start:dev`. Check it's on the right port. |
| `404 Not Found` | Wrong API URL | Check the URL. Is it `/api/patients` or `/patients`? Check backend routes. |
| `500 Internal Server Error` | Backend crashed | Check NestJS terminal for the error message. Usually a Prisma query error or null reference. |
| `401 Unauthorized` | Missing or invalid JWT token | Check that you're sending the token in the Authorization header: `Bearer <token>` |
| `400 Bad Request` | Data format doesn't match DTO | Check what fields the backend expects. Compare your frontend payload with the DTO. |
| `JSON parse error` | Response is not JSON | Check if the backend returns JSON. Maybe it's returning HTML (wrong URL). |
| `TypeError: Cannot read properties of undefined` | API returned different data than expected | Console.log the API response. Check if it's `response.data` or `response.data.data`. |
| `Prisma: Record not found` | Querying for an ID that doesn't exist | Seed your database first. Check the ID you're passing matches what's in the DB. |
| `Port already in use` | Another process is using that port | Kill it: `npx kill-port 3000` or `npx kill-port 3001` |

---

## After the 16 Hours — What Everyone Can Do Now

| Skill | Before | After |
|-------|:------:|:-----:|
| Connect frontend to backend API | Never done | Full CRUD working end-to-end |
| CORS configuration | Didn't know what it is | Can set up and debug CORS |
| JWT auth across full stack | Never done | Register → login → protected routes working |
| WebSocket real-time updates | Never done | Live updates across browser tabs |
| File uploads end-to-end | Never done | Upload from browser → store on server |
| PDF generation + download | Never done | Generate and download prescriptions |
| Dashboard with real data | Only mock data | Charts showing real database stats |
| Full flow testing | Tested in isolation | Tested complete user journey end-to-end |
| Cross-layer code reading | Only knew own layer | Can read and review frontend AND backend code |
| Docker deployment | Never used | Full stack running in containers |

---

## Ready for Ayurvena Sprint 1

**Your training is complete.** Here's what the first real sprint looks like:

| Person | Sprint 1 Task | They're ready because... |
|--------|--------------|-------------------------|
| **Abhinaya** | Design `users`, `patients`, `hospitals`, `departments` schema in Prisma | She's done Prisma schema design in 3 bootcamps |
| **Harshitha** | Build auth module + patient CRUD in NestJS | She's built this exact thing in the backend bootcamp |
| **Srinitha** | Set up Postman collections, test auth + patient APIs, seed database | She's done testing in every bootcamp |
| **Sanjay** | Set up NestJS project structure, core backend patterns → then move to frontend | He knows both sides from all bootcamps |
| **Soumya** | Build Next.js project setup, layout, sidebar, auth pages | She built this in the frontend bootcamp |
| **Manaswini** | Build shared component library (tables, forms, cards, modals) | She built reusable components in the frontend bootcamp |

**The training repo becomes your reference.** Whenever you forget how to do something, check your bootcamp code first.

**Now go build Ayurvena.**

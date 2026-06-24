# 24-Hour Frontend Bootcamp — Next.js + Tailwind + shadcn/ui

> **Ayurvena Hospital Management System**
>
> Build a premium, animated web frontend for a hospital management system over 24 hours. You will learn React, Next.js 14+, Tailwind CSS, shadcn/ui, TanStack Query, TanStack Table, React Hook Form, Zod, Framer Motion, Recharts, cmdk, and Sonner — everything you need to build a modern, production-quality web application.

---

## The Team

| Name | Role |
|------|------|
| **Sanjay** | Frontend Developer |
| **Manaswini** | Frontend Developer |
| **Soumya** | Mentor / Senior Frontend Developer |

## Git Workflow (Follow This Every Day)

```bash
# Morning — pull latest, branch off
git checkout main
git pull origin main
git checkout -b frontend/day-1

# After every exercise — commit
git add .
git commit -m "feat: [describe what you built]"

# End of day — push
git push origin frontend/day-1
```

> **Branch naming:** `frontend/day-1`, `frontend/day-2`, `frontend/day-3`

---

## Prerequisites

- Node.js 18+ installed
- VS Code (or any editor)
- Basic JavaScript (variables, functions, arrays, objects)
- Terminal basics (cd, ls, npm)

No prior React or Next.js experience needed — everything is explained from scratch.

---

## Project Setup (Do This Once)

```bash
# Create the Next.js project with TypeScript + Tailwind
npx create-next-app@latest ayurvena-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd ayurvena-web

# Install all dependencies we will use
npm install @tanstack/react-query @tanstack/react-table
npm install react-hook-form @hookform/resolvers zod
npm install framer-motion recharts
npm install cmdk sonner
npm install lucide-react clsx tailwind-merge class-variance-authority

# Install shadcn/ui CLI
npx shadcn-ui@latest init -d

# Add shadcn components
npx shadcn-ui@latest add button card input label select table
npx shadcn-ui@latest add dialog dropdown-menu avatar badge
npx shadcn-ui@latest add toast tabs separator skeleton
npx shadcn-ui@latest add sheet progress slider textarea
```

This installs everything we need across all 24 hours. Let the magic begin.

---

# DAY 1 — Foundations (Hours 1–8)

> **Goal:** By the end of Day 1, you will have a working Next.js app with a beautiful UI library, data fetching with TanStack Query, and your first hospital page.

---

## Hour 1: React Components — The Building Blocks

### LEARN

**What is React?** React is a JavaScript library for building user interfaces. Think of it like Lego blocks — you build small pieces (components) and snap them together to make a complete page.

Every React app is a tree of **components**. A component is a function that returns JSX (HTML-like syntax).

```tsx
// This is a React component
function WelcomeMessage() {
  return <h1>Welcome to Ayurvena Hospital</h1>;
}
```

**JSX rules:** You can write HTML in JavaScript, but with small differences:
- Use `className` instead of `class`
- Use `{expression}` to embed JavaScript values
- Self-closing tags must close: `<img />` not `<img>`

**Props** are how you pass data into a component (like function arguments):

```tsx
// Props = function parameters
function DoctorCard({ name, department }: { name: string; department: string }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{department}</p>
    </div>
  );
}

// Using the component — passing props
<DoctorCard name="Dr. Sharma" department="Cardiology" />
```

### BUILD

Create `src/components/ui/welcome.tsx`:

```tsx
// src/components/ui/welcome.tsx
// This component shows a welcome banner for the hospital dashboard
// Props let us customize the message for different pages

interface WelcomeProps {
  hospitalName: string;
  doctorCount: number;
  patientCount: number;
}

export function WelcomeBanner({ hospitalName, doctorCount, patientCount }: WelcomeProps) {
  return (
    <div>
      <h1>Welcome to {hospitalName}</h1>
      <p>Doctors: {doctorCount} | Patients: {patientCount}</p>
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add WelcomeBanner component with props"`

---

## Hour 2: State & Hooks — Making Components Interactive

### LEARN

**State** is data that changes over time. When state changes, React re-renders the component automatically (like magic).

**`useState`** is a React function that gives a component memory:

```tsx
import { useState } from "react";

function PatientCounter() {
  // useState returns [currentValue, functionToUpdateIt]
  // The argument (0) is the initial value
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Patients checked in: {count}</p>
      {/* onClick runs the function when the button is clicked */}
      <button onClick={() => setCount(count + 1)}>Add Patient</button>
      <button onClick={() => setCount(count - 1)}>Remove Patient</button>
    </div>
  );
}
```

**`useEffect`** runs code when something changes (or once on mount):

```tsx
import { useState, useEffect } from "react";

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  // useEffect runs after the component appears on screen
  // The empty array [] means "run only once" (on mount)
  useEffect(() => {
    // setInterval runs the function every 1000ms (1 second)
    const timer = setInterval(() => setTime(new Date()), 1000);
    // Return a cleanup function — runs when component is removed
    return () => clearInterval(timer);
  }, []);

  return <p>Current time: {time.toLocaleTimeString()}</p>;
}
```

### BUILD

Create `src/components/patient/patient-counter.tsx`:

```tsx
"use client";
// The "use client" directive tells Next.js this runs in the browser
// (needed for useState, useEffect, and any interactivity)

import { useState } from "react";

interface PatientCounterProps {
  department: string;
}

export function PatientCounter({ department }: PatientCounterProps) {
  const [count, setCount] = useState(0);
  const [waitingList, setWaitingList] = useState<string[]>([]);
  const [patientName, setPatientName] = useState("");

  const addPatient = () => {
    if (patientName.trim()) {
      setWaitingList([...waitingList, patientName.trim()]);
      setCount(count + 1);
      setPatientName("");
    }
  };

  const removePatient = (index: number) => {
    const updated = waitingList.filter((_, i) => i !== index);
    setWaitingList(updated);
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{department} — Waiting Room</h2>
      <p>Total patients: {count}</p>

      <div>
        <input
          type="text"
          placeholder="Enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <button onClick={addPatient}>Add Patient</button>
      </div>

      <ul>
        {waitingList.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => removePatient(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add PatientCounter with state management"`

---

## Hour 3: Next.js App Router — Pages & Layouts

### LEARN

**What is Next.js?** A framework built on React that adds:
1. **File-based routing** — each file in `app/` folder becomes a page
2. **Server Components** — components that render on the server (faster!)
3. **Layouts** — shared UI that persists across pages

**File-based routing:** In the `app/` directory, the folder structure IS the URL:

```
app/page.tsx          →  /
app/patients/page.tsx →  /patients
app/doctors/page.tsx  →  /doctors
```

**Layouts** wrap around pages. Create `app/layout.tsx` to share things like headers and sidebars:

```tsx
// app/layout.tsx — wraps every page
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>My Header</header>  {/* shows on every page */}
        {children}                   {/* the page content */}
        <footer>My Footer</footer>  {/* shows on every page */}
      </body>
    </html>
  );
}
```

**Server vs Client Components:**
- **Server Components** (default) — render on server, can't use `useState`/`useEffect`, great for fetching data
- **Client Components** — add `"use client"` at top, can use state/effects, run in browser

Rule of thumb: Start with Server Components, add `"use client"` only when you need interactivity.

### BUILD

Create the hospital layout structure:

**`app/layout.tsx`** (replace existing):

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Load the Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayurvena — Hospital Management",
  description: "Complete hospital management system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

**`app/page.tsx`** (replace existing):

```tsx
// app/page.tsx — this is the homepage (route: /)
// Server Component by default — no "use client" needed

export default function HomePage() {
  return (
    <main>
      <h1>Ayurvena Hospital</h1>
      <p>Your complete hospital management solution</p>
      <nav>
        <a href="/patients">Patients</a>
        <a href="/doctors">Doctors</a>
        <a href="/appointments">Appointments</a>
      </nav>
    </main>
  );
}
```

**`app/patients/page.tsx`:**

```tsx
// app/patients/page.tsx — route: /patients
// This is a Server Component — renders on server

export default function PatientsPage() {
  return (
    <div>
      <h1>Patient Management</h1>
      <p>View and manage all patients</p>
    </div>
  );
}
```

**`app/doctors/page.tsx`:**

```tsx
export default function DoctorsPage() {
  return (
    <div>
      <h1>Doctor Directory</h1>
      <p>View and manage all doctors</p>
    </div>
  );
}
```

**`app/appointments/page.tsx`:**

```tsx
export default function AppointmentsPage() {
  return (
    <div>
      <h1>Appointments</h1>
      <p>Schedule and manage appointments</p>
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add Next.js layout and initial pages"`

---

## Hour 4: Layouts, Loading & Error States

### LEARN

Next.js App Router provides **built-in loading and error handling** — just create special files:

| File | Purpose |
|------|---------|
| `layout.tsx` | Shared layout for a route segment and its children |
| `loading.tsx` | Shows while the page is loading (auto-show skeleton) |
| `error.tsx` | Shows when the page has an error (auto-catch errors) |
| `not-found.tsx` | Shows when a route is not found (404) |

**Nested layouts** let you have a main layout + sub-layout:

```
app/layout.tsx          → applied to ALL pages
app/patients/layout.tsx → applied only to /patients/* pages
```

**`loading.tsx`** is automatically shown by Next.js when a page is fetching data. You just create the file — Next.js handles the rest!

**`error.tsx`** receives an `error` object and a `reset` function to retry:

```tsx
"use client"; // Error boundaries MUST be client components
export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### BUILD

**`app/patients/loading.tsx`:**

```tsx
// app/patients/loading.tsx
// Next.js shows this automatically while /patients is loading
// This creates a skeleton (placeholder) UI

export default function PatientsLoading() {
  return (
    <div>
      <div>Loading patients...</div>
      {/* Skeleton placeholders */}
      <div>──────────────────</div>
      <div>──────────────────</div>
      <div>──────────────────</div>
    </div>
  );
}
```

**`app/patients/error.tsx`:**

```tsx
"use client";
// Error boundaries must be client components

export default function PatientsError({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Failed to load patients</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

**`app/patients/layout.tsx`:**

```tsx
// app/patients/layout.tsx
// This layout wraps ALL pages under /patients/*
// The sidebar and search will appear on every patients sub-page

export default function PatientsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <aside>
        <h3>Patient Menu</h3>
        <nav>
          <a href="/patients">All Patients</a>
          <a href="/patients/admit">Admit Patient</a>
          <a href="/patients/discharge">Discharge</a>
        </nav>
      </aside>
      <main>
        {children}
      </main>
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add loading, error, and layout for patients"`

---

## Hour 5: Tailwind CSS — Utility-First Styling

### LEARN

**What is Tailwind?** Instead of writing separate CSS files, you write classes directly in your HTML/JSX. Each class is one small CSS rule:

```html
<!-- Traditional CSS: define classes in .css file, then use them -->
<div class="card">...</div>

<!-- Tailwind: compose styles directly in HTML -->
<div class="bg-white rounded-lg shadow-md p-6">...</div>
```

**Common Tailwind classes:**

| Class | What it does |
|-------|-------------|
| `p-4` | padding: 1rem (16px) on all sides |
| `px-6` | padding-left + padding-right: 1.5rem |
| `py-3` | padding-top + padding-bottom: 0.75rem |
| `m-4` | margin: 1rem |
| `mx-auto` | margin left+right: auto (centers block) |
| `flex` | display: flex |
| `items-center` | align-items: center |
| `justify-between` | justify-content: space-between |
| `gap-4` | gap between flex items: 1rem |
| `text-lg` | font-size: 1.125rem |
| `font-bold` | font-weight: 700 |
| `text-gray-600` | color: gray-600 |
| `bg-blue-500` | background-color: blue-500 |
| `rounded-lg` | border-radius: 0.5rem |
| `shadow-md` | box-shadow: medium |
| `hover:bg-blue-600` | change bg on hover |

**Colors:** Tailwind uses numbered scales (50 → 900). 50 is lightest, 900 is darkest.

**Responsive:** Prefix with breakpoints:
- `sm:` → 640px+
- `md:` → 768px+
- `lg:` → 1024px+
- `xl:` → 1280px+

Example: `md:flex` means `display: flex` only on screens 768px+.

**Dark mode:** Use `dark:` prefix:
```html
<div class="bg-white dark:bg-gray-800">
```

### BUILD

Style the homepage with Tailwind:

**`app/page.tsx`** (update):

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏥 Ayurvena Hospital
          </h1>
          <p className="text-lg text-gray-600">
            Complete hospital management solution
          </p>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/patients"
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Patients</h2>
            <p className="text-gray-500">View and manage patient records</p>
          </a>

          <a
            href="/doctors"
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Doctors</h2>
            <p className="text-gray-500">Doctor directory and schedules</p>
          </a>

          <a
            href="/appointments"
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Appointments</h2>
            <p className="text-gray-500">Schedule and manage appointments</p>
          </a>
        </div>
      </div>
    </main>
  );
}
```

Now `app/page.tsx` has:
- Gradient background
- Centered layout with `max-w-4xl mx-auto`
- Responsive grid (`grid-cols-1 md:grid-cols-3`)
- Cards with hover effects
- Proper spacing with `p-*`, `gap-*`, `m-*`

**Commit:** `git commit -m "feat: style homepage with Tailwind CSS"`

---

## Hour 6: shadcn/ui — Beautiful Components

### LEARN

**What is shadcn/ui?** A collection of beautifully designed, accessible React components built with Radix UI + Tailwind. Unlike normal component libraries, shadcn/ui components are COPIED into your project — you own the code and can customize everything.

After running the install commands, the components live in `src/components/ui/`.

**Using shadcn components:**

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MyCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Patient Info</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Patient details go here</p>
        <Button>View Details</Button>
      </CardContent>
    </Card>
  );
}
```

**Key shadcn components we'll use:**

| Component | Use |
|-----------|-----|
| `Card` | Group related content in a container |
| `Button` | Clickable action buttons |
| `Input` | Text input fields |
| `Label` | Labels for inputs |
| `Select` | Dropdown select |
| `Table` | Data tables |
| `Dialog` | Modal popups |
| `Badge` | Status labels |
| `Skeleton` | Loading placeholders |
| `Separator` | Horizontal/vertical lines |
| `Avatar` | User avatars |
| `DropdownMenu` | Context menus |
| `Tabs` | Tabbed interfaces |
| `Sheet` | Slide-out panels |
| `Progress` | Progress bars |

**The `cn()` helper:** shadcn includes a `cn()` function that merges Tailwind class names intelligently:

```tsx
import { cn } from "@/lib/utils";

// Merges classes, handles conflicts
<Button className={cn("bg-blue-500", isActive && "bg-blue-700")} />
```

### BUILD

Create a hospital dashboard card using shadcn:

Create `src/components/hospital/dashboard-card.tsx`:

```tsx
// src/components/hospital/dashboard-card.tsx
// A reusable card that shows a hospital metric with icon

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function DashboardCard({ title, value, description, icon, className }: DashboardCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        {icon && <div className="text-gray-400">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
```

Now use it in the homepage:

**`app/page.tsx`** (update):

```tsx
import { DashboardCard } from "@/components/hospital/dashboard-card";
import { Users, Stethoscope, CalendarCheck, Activity } from "lucide-react";

export default function HomePage() {
  // Mock data — we will replace with real API data later
  const dashboardData = {
    totalPatients: 1247,
    activeDoctors: 48,
    todayAppointments: 156,
    bedOccupancy: "78%",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ayurvena Hospital</h1>
          <p className="text-gray-500 mt-1">Dashboard Overview</p>
        </div>

        {/* Dashboard Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Patients"
            value={dashboardData.totalPatients}
            description="Registered patients"
            icon={<Users className="h-5 w-5" />}
          />
          <DashboardCard
            title="Active Doctors"
            value={dashboardData.activeDoctors}
            description="Currently practicing"
            icon={<Stethoscope className="h-5 w-5" />}
          />
          <DashboardCard
            title="Today's Appointments"
            value={dashboardData.todayAppointments}
            description="Scheduled for today"
            icon={<CalendarCheck className="h-5 w-5" />}
          />
          <DashboardCard
            title="Bed Occupancy"
            value={dashboardData.bedOccupancy}
            description="Hospital capacity"
            icon={<Activity className="h-5 w-5" />}
          />
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <a
            href="/patients"
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold mb-2">Patients</h2>
            <p className="text-gray-500">Manage patient records</p>
          </a>
          <a
            href="/doctors"
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold mb-2">Doctors</h2>
            <p className="text-gray-500">Doctor directory</p>
          </a>
          <a
            href="/appointments"
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold mb-2">Appointments</h2>
            <p className="text-gray-500">Schedule management</p>
          </a>
        </div>
      </div>
    </main>
  );
}
```

**Commit:** `git commit -m "feat: add DashboardCard component with shadcn Card"`

---

## Hour 7: TanStack Query — Data Fetching

### LEARN

**What is TanStack Query?** A library that handles all your data fetching — loading states, caching, retrying, refreshing. It removes the need for `useEffect` for API calls.

**Core concepts:**

1. **Query** — fetching data (GET requests)
2. **Mutation** — changing data (POST, PUT, DELETE)
3. **QueryClient** — the central manager that caches and coordinates

**Setting up TanStack Query** requires a provider at the app root:

```tsx
// app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

**useQuery** — fetch data:

```tsx
import { useQuery } from "@tanstack/react-query";

// useQuery needs a unique key (string or array) and a fetch function
const { data, isLoading, error } = useQuery({
  queryKey: ["patients"],     // unique identifier for caching
  queryFn: async () => {      // function that fetches data
    const res = await fetch("/api/patients");
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  },
});

// TanStack Query gives you:
// data       — the response from queryFn
// isLoading  — true while first fetch is happening
// error      — error object if fetch failed
// isFetching — true during ANY fetch (including background refetch)
```

**What useQuery returns:**

| Property | What it tells you |
|----------|------------------|
| `data` | The fetched data (undefined until loaded) |
| `isLoading` | True on first load (no data yet) |
| `isFetching` | True during any fetch (even background refetch) |
| `error` | Error object if request failed |
| `isError` | True if there was an error |
| `isSuccess` | True if data was loaded successfully |
| `refetch` | Function to manually refetch |

### BUILD

Create the providers wrapper:

**`src/app/providers.tsx`:**

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState ensures each user gets their own QueryClient
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute — data is fresh for 1 min
            retry: 1,              // retry once on failure
            refetchOnWindowFocus: false, // don't refetch when tab focuses
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

Update `app/layout.tsx` to use the provider:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers"; // NEW

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayurvena — Hospital Management",
  description: "Complete hospital management system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers> {/* Wrap with Providers */}
      </body>
    </html>
  );
}
```

**Commit:** `git commit -m "feat: add TanStack Query provider with configuration"`

---

## Hour 8: Your First Data-Driven Page

### LEARN

Now we combine everything: components + Tailwind + shadcn + TanStack Query to build a patient list page that fetches data.

**Mock data trick:** Since we don't have a real backend yet, we create a mock data file that returns fake data (same shape as real API). This lets us build the frontend without waiting for the backend.

**Pattern for data-fetching hooks:** Create custom hooks that wrap `useQuery`. This keeps components clean:

```tsx
// src/hooks/use-patients.ts
export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients, // the fetch function
  });
}
```

Then in any component:
```tsx
function PatientList() {
  const { data, isLoading } = usePatients();
  if (isLoading) return <Skeleton />;
  return <div>{data.map(p => <PatientCard key={p.id} patient={p} />)}</div>;
}
```

### BUILD

Create mock data to develop against:

**`src/lib/mock-data.ts`:**

```tsx
// src/lib/mock-data.ts
// Mock data that matches our future API response shape
// This lets us build the frontend without waiting for the backend

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  department: string;
  doctor: string;
  admissionDate: string;
  status: "Stable" | "Critical" | "Discharged" | "Under Observation";
  bedNumber: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  patients: number;
  available: boolean;
}

export const mockPatients: Patient[] = [
  {
    id: "P-001",
    name: "Ravi Kumar",
    age: 45,
    gender: "Male",
    department: "Cardiology",
    doctor: "Dr. Sharma",
    admissionDate: "2024-01-15",
    status: "Stable",
    bedNumber: "A-101",
  },
  {
    id: "P-002",
    name: "Priya Singh",
    age: 32,
    gender: "Female",
    department: "Neurology",
    doctor: "Dr. Patel",
    admissionDate: "2024-01-14",
    status: "Under Observation",
    bedNumber: "B-203",
  },
  {
    id: "P-003",
    name: "Amit Verma",
    age: 60,
    gender: "Male",
    department: "Cardiology",
    doctor: "Dr. Sharma",
    admissionDate: "2024-01-10",
    status: "Critical",
    bedNumber: "ICU-01",
  },
  {
    id: "P-004",
    name: "Sunita Reddy",
    age: 28,
    gender: "Female",
    department: "Orthopedics",
    doctor: "Dr. Kumar",
    admissionDate: "2024-01-12",
    status: "Stable",
    bedNumber: "C-305",
  },
  {
    id: "P-005",
    name: "Vijay Deshmukh",
    age: 55,
    gender: "Male",
    department: "General Medicine",
    doctor: "Dr. Gupta",
    admissionDate: "2024-01-08",
    status: "Discharged",
    bedNumber: "—",
  },
];

export const mockDoctors: Doctor[] = [
  { id: "D-001", name: "Dr. Sharma", specialization: "Cardiology", experience: 15, patients: 12, available: true },
  { id: "D-002", name: "Dr. Patel", specialization: "Neurology", experience: 10, patients: 8, available: false },
  { id: "D-003", name: "Dr. Kumar", specialization: "Orthopedics", experience: 8, patients: 6, available: true },
  { id: "D-004", name: "Dr. Gupta", specialization: "General Medicine", experience: 20, patients: 15, available: true },
  { id: "D-005", name: "Dr. Verma", specialization: "Pediatrics", experience: 12, patients: 10, available: false },
];
```

Create the data hooks:

**`src/hooks/use-patients.ts`:**

```tsx
// src/hooks/use-patients.ts
// Custom hook for fetching patients data
// Wraps useQuery so components don't repeat fetch logic

import { useQuery } from "@tanstack/react-query";
import { Patient, mockPatients } from "@/lib/mock-data";

// Simulate API call with a delay
const fetchPatients = async (): Promise<Patient[]> => {
  // In production, this would be:
  // const res = await fetch("/api/patients");
  // return res.json();

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPatients), 500);
  });
};

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: async () => {
      const patients = await fetchPatients();
      const patient = patients.find((p) => p.id === id);
      if (!patient) throw new Error("Patient not found");
      return patient;
    },
  });
}
```

Build the patient list page with shadcn Table:

**`app/patients/page.tsx`** (replace):

```tsx
"use client";

import { usePatients } from "@/hooks/use-patients";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Map patient status to badge color
const statusColors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
  Stable: "default",
  Critical: "destructive",
  Discharged: "secondary",
  "Under Observation": "outline",
};

export default function PatientsPage() {
  const { data: patients, isLoading, error } = usePatients();

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">Error loading patients</h2>
        <p className="text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all patient records
          </p>
        </div>
        <Button>Add Patient</Button>
      </div>

      {/* Show skeleton table while loading */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients?.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.department}</TableCell>
                  <TableCell>{patient.doctor}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[patient.status] || "outline"}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add patient list page with TanStack Query and shadcn Table"`

---

## End of Day 1 Summary

### What you built:
| Hour | Achievement |
|------|-------------|
| 1 | React components with props |
| 2 | State management with useState |
| 3 | Next.js App Router — pages and layout |
| 4 | Loading, error, and sub-layout files |
| 5 | Tailwind CSS styling |
| 6 | shadcn/ui Card components |
| 7 | TanStack Query setup |
| 8 | Patient list page with data fetching |

### Key concepts learned:
- **Components** = functions that return JSX
- **State** = data that changes over time
- **File-based routing** = folder structure = URL structure
- **Server vs Client components** = server renders default, add "use client" for interactivity
- **Utility-first CSS** = compose styles with classes
- **TanStack Query** = manages loading/error/data states automatically

### Day 1 Git Log
```
feat: add WelcomeBanner component with props
feat: add PatientCounter with state management
feat: add Next.js layout and initial pages
feat: add loading, error, and layout for patients
feat: style homepage with Tailwind CSS
feat: add DashboardCard component with shadcn Card
feat: add TanStack Query provider with configuration
feat: add patient list page with TanStack Query and shadcn Table
```

**Push your branch:** `git push origin frontend/day-1`

---

# DAY 2 — Forms, Tables & Animation (Hours 9–16)

> **Goal:** By the end of Day 2, you will have working forms with validation, sortable/filterable tables, smooth animations, charts, and a premium UI feel.

---

## Hour 9: React Hook Form — Forms Made Easy

### LEARN

**Why React Hook Form?** Managing form state by hand (one `useState` per field) is tedious and error-prone. React Hook Form handles:
- Form state (values, errors, touched)
- Validation (via Zod or Yup)
- Submission handling
- Performance (no unnecessary re-renders)

**Basic usage:**

```tsx
import { useForm } from "react-hook-form";

// 1. Define the form's data shape
interface PatientForm {
  name: string;
  age: number;
  department: string;
}

function PatientForm() {
  // 2. Initialize useForm
  const { register, handleSubmit, formState: { errors } } = useForm<PatientForm>();

  // 3. Define submit handler
  const onSubmit = (data: PatientForm) => {
    console.log(data); // { name: "...", age: ..., department: "..." }
  };

  // 4. Connect register to inputs, handleSubmit to form
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <p>{errors.name.message}</p>}

      <input type="number" {...register("age", { min: 0 })} />

      <select {...register("department")}>
        <option value="Cardiology">Cardiology</option>
        <option value="Neurology">Neurology</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
```

**Key functions:**
- `register(name, options)` — connects an input to the form
- `handleSubmit(onSubmit)` — validates then calls onSubmit
- `formState.errors` — contains validation errors
- `watch("fieldName")` — watch a field's value in real-time
- `setValue("fieldName", value)` — set a field's value programmatically

### BUILD

Create a patient admission form:

**`src/components/patient/admission-form.tsx`:**

```tsx
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the shape of our form data
interface AdmissionFormData {
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  department: string;
  complaint: string;
}

export function AdmissionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdmissionFormData>();

  const onSubmit = (data: AdmissionFormData) => {
    // In production: call API mutation
    console.log("Admitting patient:", data);
    // Show success message (we will add Sonner toast later)
    alert(`Patient ${data.name} admitted successfully!`);
    reset(); // Clear form
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Admit New Patient</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter patient name"
              {...register("name", {
                required: "Patient name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Age and Gender side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 0, message: "Invalid age" },
                  max: { value: 150, message: "Invalid age" },
                })}
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              placeholder="e.g., Cardiology"
              {...register("department", {
                required: "Department is required",
              })}
            />
            {errors.department && (
              <p className="text-sm text-red-500">{errors.department.message}</p>
            )}
          </div>

          {/* Complaint */}
          <div className="space-y-2">
            <Label htmlFor="complaint">Chief Complaint</Label>
            <textarea
              id="complaint"
              className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
              placeholder="Describe the patient's chief complaint"
              {...register("complaint", {
                required: "Complaint is required",
              })}
            />
            {errors.complaint && (
              <p className="text-sm text-red-500">{errors.complaint.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Admit Patient
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

Create `app/patients/admit/page.tsx`:

```tsx
import { AdmissionForm } from "@/components/patient/admission-form";

export default function AdmitPatientPage() {
  return (
    <div className="p-6">
      <AdmissionForm />
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add patient admission form with React Hook Form"`

---

## Hour 10: Zod — Type-Safe Validation

### LEARN

**What is Zod?** A TypeScript-first schema validation library. Instead of writing validation rules inside `register()`, you define a Zod schema that describes your data's shape and rules:

```tsx
import { z } from "zod";

// Define the schema — what valid data looks like
const PatientSchema = z.object({
  name: z.string().min(2, "Name too short"),
  age: z.coerce.number().min(0).max(150),
  email: z.string().email("Invalid email"),
});

// Infer the TypeScript type from the schema
type Patient = z.infer<typeof PatientSchema>;
// Equivalent to: { name: string; age: number; email: string }
```

**Why Zod + React Hook Form?** You write validation rules ONCE (in Zod) and get:
1. Form validation in the browser
2. API validation on the server
3. TypeScript types automatically generated

**Integration via `@hookform/resolvers`:**

```tsx
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(PatientSchema), // ← connect Zod
});
```

**Zod common methods:**

| Method | What it checks |
|--------|---------------|
| `z.string()` | Must be a string |
| `.min(2)` | Minimum 2 characters |
| `.max(100)` | Maximum 100 characters |
| `.email()` | Must be a valid email |
| `.url()` | Must be a valid URL |
| `z.coerce.number()` | Convert string input to number |
| `.positive()` | Must be positive |
| `.int()` | Must be an integer |
| `z.enum(["A", "B"])` | Must be one of the values |
| `z.array(z.string())` | Array of strings |
| `.optional()` | Field can be undefined |

### BUILD

Rewrite the admission form with Zod validation:

**`src/lib/schemas.ts`:**

```tsx
// src/lib/schemas.ts
// Central place for all Zod validation schemas
// Benefits: reuse schemas on frontend AND backend

import { z } from "zod";

// Patient admission form schema
export const admissionSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  age: z.coerce
    .number()
    .positive("Age must be positive")
    .int("Age must be a whole number")
    .max(150, "Age cannot exceed 150"),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  department: z
    .string()
    .min(2, "Department is required"),
  complaint: z
    .string()
    .min(5, "Please describe the complaint in detail")
    .max(500, "Complaint is too long"),
});

// Infer TypeScript type from schema
export type AdmissionFormData = z.infer<typeof admissionSchema>;

// Appointment booking schema
export const appointmentSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  reason: z.string().min(5, "Please provide a reason"),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
```

Update `AdmissionForm` to use Zod:

**`src/components/patient/admission-form.tsx`** (update):

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { admissionSchema, AdmissionFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdmissionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema), // ← Zod handles all validation
  });

  const onSubmit = async (data: AdmissionFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Admitting patient:", data);
    alert(`Patient ${data.name} admitted successfully!`);
    reset();
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
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="Age" {...register("age")} />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                {...register("gender")}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" placeholder="e.g., Cardiology" {...register("department")} />
            {errors.department && (
              <p className="text-sm text-red-500">{errors.department.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="complaint">Chief Complaint</Label>
            <textarea
              id="complaint"
              className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
              placeholder="Describe the patient's chief complaint"
              {...register("complaint")}
            />
            {errors.complaint && (
              <p className="text-sm text-red-500">{errors.complaint.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Admitting..." : "Admit Patient"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

Now your form has:
- Type-safe validation via Zod
- Error messages automatically shown
- Submit button disabled while submitting
- Clean separation of schema and UI

**Commit:** `git commit -m "feat: add Zod schemas and integrate with admission form"`

---

## Hour 11: TanStack Query Mutations — Creating Data

### LEARN

**Mutations** are TanStack Query's way of handling create, update, delete operations. They provide:
- Loading state during the mutation
- Automatic cache updates after success
- Error handling
- Optimistic updates

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddPatientForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPatient) => {
      const res = await fetch("/api/patients", {
        method: "POST",
        body: JSON.stringify(newPatient),
      });
      return res.json();
    },
    onSuccess: () => {
      // Invalidate "patients" query → refetch the list
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "New Patient" })} disabled={mutation.isPending}>
      {mutation.isPending ? "Adding..." : "Add Patient"}
    </button>
  );
}
```

**Key mutation properties:**
- `mutate(data)` — trigger the mutation
- `mutateAsync(data)` — trigger and return a promise
- `isPending` — true while mutation is running
- `isError` — true if mutation failed
- `error` — the error object
- `isSuccess` — true after successful mutation

### BUILD

Create a mutation hook and update the admission form:

**`src/hooks/use-patient-mutations.ts`:**

```tsx
// src/hooks/use-patient-mutations.ts
// Custom hooks for patient mutations (create, update, delete)

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdmissionFormData } from "@/lib/schemas";
import { Patient } from "@/lib/mock-data";

// Simulate API call (replace with real fetch later)
const admitPatient = async (data: AdmissionFormData): Promise<Patient> => {
  // In production: POST to /api/patients
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: `P-${Math.floor(Math.random() * 1000)}`,
    name: data.name,
    age: data.age,
    gender: data.gender,
    department: data.department,
    doctor: "Unassigned",
    admissionDate: new Date().toISOString().split("T")[0],
    status: "Under Observation",
    bedNumber: "Unassigned",
  };
};

export function useAdmitPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: admitPatient,
    onSuccess: (newPatient) => {
      // Update the patients list cache with the new patient
      queryClient.setQueryData<Patient[]>(["patients"], (old = []) => [
        ...old,
        newPatient,
      ]);
      // Also invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}
```

Now update `AdmissionForm` to use the mutation:

```tsx
// Inside AdmissionForm component — replace the onSubmit and isSubmitting

import { useAdmitPatient } from "@/hooks/use-patient-mutations";

export function AdmissionForm() {
  const admitMutation = useAdmitPatient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
  });

  const onSubmit = async (data: AdmissionFormData) => {
    admitMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  // ...rest of the form JSX (same as before, but update button)

  return (
    // ... same JSX, only change the button:
    <Button type="submit" className="w-full" disabled={admitMutation.isPending}>
      {admitMutation.isPending ? "Admitting..." : "Admit Patient"}
    </Button>
  );
}
```

**Commit:** `git commit -m "feat: add patient mutation hook with cache update"`

---

## Hour 12: Sonner Toasts — User Feedback

### LEARN

**What is Sonner?** A beautiful toast notification library. Shows success/error/info messages that slide in from the corner. Built by the same team behind shadcn/ui.

```tsx
import { toast } from "sonner";

// Success toast
toast.success("Patient admitted successfully!");

// Error toast
toast.error("Failed to admit patient");

// Info toast
toast.info("Patient is being transferred");

// Promise toast (auto shows loading → success/error)
toast.promise(
  fetch("/api/patients"), // the promise
  {
    loading: "Adding patient...",
    success: "Patient added!",
    error: "Failed to add patient",
  }
);
```

**Setup:** Add `<Toaster />` in the layout and it's ready.

### BUILD

Update the admission form with Sonner toast notifications:

**`src/components/providers.tsx`** (add Toaster):

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </QueryClientProvider>
  );
}
```

Update `AdmissionForm` to use toast:

```tsx
import { toast } from "sonner";

// Inside component, update onSubmit:
const onSubmit = async (data: AdmissionFormData) => {
  admitMutation.mutate(data, {
    onSuccess: (newPatient) => {
      toast.success(`Patient ${newPatient.name} admitted successfully!`, {
        description: `ID: ${newPatient.id} | Department: ${newPatient.department}`,
      });
      reset();
    },
    onError: (error) => {
      toast.error("Failed to admit patient", {
        description: error.message,
      });
    },
  });
};
```

**Commit:** `git commit -m "feat: add Sonner toasts with success/error notifications"`

---

## Hour 13: TanStack Table — Advanced Data Tables

### LEARN

**What is TanStack Table?** A headless UI library for building powerful tables. It handles sorting, filtering, pagination, row selection — all without dictating how things look. You provide the UI, it provides the logic.

**Key concepts:**
1. **Columns** — define what each column shows (header, accessor, cell renderer)
2. **Data** — your array of items
3. **Table instance** — created by `useReactTable()`, gives you everything

```tsx
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

// 1. Define columns
const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name", // reads from patient.name
    header: "Name",       // column header text
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

// 2. Create table instance
const table = useReactTable({
  data: patients,   // your data array
  columns,           // column definitions
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),   // enables sorting
  getPaginationRowModel: getPaginationRowModel(), // enables pagination
});

// 3. Render table
return (
  <table>
    <thead>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
```

### BUILD

Replace the patient list with a full-featured TanStack Table:

**`src/components/patient/patient-table.tsx`:**

```tsx
"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import { Patient } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

const statusColors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
  Stable: "default",
  Critical: "destructive",
  Discharged: "secondary",
  "Under Observation": "outline",
};

interface PatientTableProps {
  patients: Patient[];
}

export function PatientTable({ patients }: PatientTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Define columns — each column knows how to access and display data
  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    {
      accessorKey: "age",
      header: "Age",
      enableSorting: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      enableSorting: true,
    },
    {
      accessorKey: "doctor",
      header: "Doctor",
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      // Custom cell renderer for the status column
      cell: ({ row }) => (
        <Badge variant={statusColors[row.original.status] || "outline"}>
          {row.original.status}
        </Badge>
      ),
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <Button variant="outline" size="sm">View</Button>
      ),
    },
  ];

  const table = useReactTable({
    data: patients,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search patients..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        className="flex items-center gap-1 hover:text-gray-900"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* Sort icons */}
                        {{
                          asc: <ChevronUp className="h-4 w-4" />,
                          desc: <ChevronDown className="h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          {" to "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            patients.length
          )}
          {" of "} {patients.length} patients
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
```

Update `app/patients/page.tsx` to use `PatientTable`:

```tsx
"use client";

import { usePatients } from "@/hooks/use-patients";
import { PatientTable } from "@/components/patient/patient-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function PatientsPage() {
  const { data: patients, isLoading, error } = usePatients();

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">Error loading patients</h2>
        <p className="text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all patient records</p>
        </div>
        <Button asChild>
          <a href="/patients/admit">+ Admit Patient</a>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <PatientTable patients={patients || []} />
      )}
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add TanStack Table with sorting, search, pagination"`

---

## Hour 14: Framer Motion — Animations

### LEARN

**What is Framer Motion?** An animation library for React. Makes it easy to add smooth animations to your components.

**Core components:**

| Component | What it does |
|-----------|-------------|
| `motion.div` | Animate any HTML element by prefixing with `motion.` |
| `AnimatePresence` | Animate elements when they enter/leave the DOM |
| `motion.div` props | `initial`, `animate`, `exit`, `transition` |

**Basic animation:**

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}     // Start invisible, 20px down
  animate={{ opacity: 1, y: 0 }}      // End visible, at normal position
  transition={{ duration: 0.5 }}      // Take 0.5 seconds
>
  Hello!
</motion.div>
```

**Stagger children** — animate list items one after another:

```tsx
// Parent container
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.name}
    </motion.div>
  ))}
</motion.div>

// Define variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }, // 0.1s between each child
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

### BUILD

Create animated versions of our components:

**`src/components/hospital/animated-card.tsx`:**

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// A card that fades in and slides up when it appears
export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: "easeOut",
      }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
}
```

**`src/components/hospital/stagger-container.tsx`:**

```tsx
"use client";

import { motion } from "framer-motion";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Container that staggers its children animations
export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
```

Update `app/patients/page.tsx` with animations:

```tsx
"use client";

import { motion } from "framer-motion";
import { usePatients } from "@/hooks/use-patients";
import { PatientTable } from "@/components/patient/patient-table";
import { AnimatedCard } from "@/components/hospital/animated-card";
import { StaggerContainer, staggerItemVariants } from "@/components/hospital/stagger-container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function PatientsPage() {
  const { data: patients, isLoading, error } = usePatients();

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 text-center"
      >
        <h2 className="text-xl font-semibold text-red-600">Error loading patients</h2>
        <p className="text-gray-500 mt-2">{error.message}</p>
      </motion.div>
    );
  }

  return (
    <div className="p-6">
      <StaggerContainer>
        <motion.div variants={staggerItemVariants} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all patient records</p>
          </div>
          <Button asChild>
            <a href="/patients/admit">+ Admit Patient</a>
          </Button>
        </motion.div>

        <motion.div variants={staggerItemVariants}>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Skeleton className="h-12 w-full" />
                </motion.div>
              ))}
            </div>
          ) : (
            <AnimatedCard>
              <PatientTable patients={patients || []} />
            </AnimatedCard>
          )}
        </motion.div>
      </StaggerContainer>
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add Framer Motion animations to patient page"`

---

## Hour 15: Recharts — Data Visualization

### LEARN

**What is Recharts?** A composable charting library for React built on D3. It provides chart components that you compose like regular React components.

**Basic chart structure:**

```tsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// 1. Define data
const data = [
  { department: "Cardiology", patients: 45 },
  { department: "Neurology", patients: 30 },
  { department: "Orthopedics", patients: 25 },
];

// 2. Render chart
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="department" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="patients" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
```

**Common chart types:**
- `<BarChart />` — bar chart
- `<LineChart />` — line chart
- `<PieChart />` — pie chart
- `<AreaChart />` — area chart

### BUILD

Create a dashboard page with charts:

**`src/components/hospital/dashboard-charts.tsx`:**

```tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock chart data
const departmentData = [
  { department: "Cardiology", patients: 45, doctors: 8 },
  { department: "Neurology", patients: 30, doctors: 5 },
  { department: "Orthopedics", patients: 25, doctors: 6 },
  { department: "Pediatrics", patients: 35, doctors: 7 },
  { department: "General", patients: 50, doctors: 10 },
];

const statusData = [
  { name: "Stable", value: 45, color: "#22c55e" },
  { name: "Critical", value: 12, color: "#ef4444" },
  { name: "Under Observation", value: 25, color: "#f59e0b" },
  { name: "Discharged", value: 18, color: "#6b7280" },
];

const weeklyAdmissions = [
  { day: "Mon", admissions: 12 },
  { day: "Tue", admissions: 18 },
  { day: "Wed", admissions: 15 },
  { day: "Thu", admissions: 22 },
  { day: "Fri", admissions: 20 },
  { day: "Sat", admissions: 10 },
  { day: "Sun", admissions: 8 },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar chart — patients per department */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patients by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="department" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="patients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie chart — patient status distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line chart — weekly admissions */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Admissions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyAdmissions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="admissions"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
```

Create `app/dashboard/page.tsx`:

```tsx
import { DashboardCharts } from "@/components/hospital/dashboard-charts";
import { DashboardCard } from "@/components/hospital/dashboard-card";
import { Users, Stethoscope, CalendarCheck, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Hospital overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Patients" value={1247} description="+12 this week" icon={<Users className="h-5 w-5" />} />
        <DashboardCard title="Active Doctors" value={48} description="24 available now" icon={<Stethoscope className="h-5 w-5" />} />
        <DashboardCard title="Today's Appointments" value={156} description="42 completed" icon={<CalendarCheck className="h-5 w-5" />} />
        <DashboardCard title="Bed Occupancy" value="78%" description="142 of 182 beds" icon={<Activity className="h-5 w-5" />} />
      </div>

      <DashboardCharts />
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add dashboard with Recharts visualizations"`

---

## Hour 16: Premium UI — cmdk, Sonner Patterns & Micro-interactions

### LEARN

**cmdk** is a command menu component (⌘K menu). It provides a Spotlight/Alfred-like search experience in your app.

```tsx
import { Command } from "cmdk";

<Command>
  <Command.Input placeholder="Search..." />
  <Command.List>
    <Command.Group heading="Pages">
      <Command.Item onSelect={() => router.push("/patients")}>
        Patients
      </Command.Item>
      <Command.Item onSelect={() => router.push("/doctors")}>
        Doctors
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command>
```

**Micro-interactions** are tiny animations that make UI feel alive:
- Button hover scale effect
- Card hover lift
- Skeleton shimmer
- Page transitions
- Staggered list entrance

### BUILD

Create a command palette (⌘K menu) and premium UI primitives:

**`src/components/hospital/command-palette.tsx`:**

```tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText, Users, Stethoscope, Calendar, LayoutDashboard } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Listen for ⌘K (or Ctrl+K) to open/close
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <Command className="rounded-lg border shadow-md">
          <Command.Input
            placeholder="Search pages or type a command..."
            className="border-none px-4 py-3 text-sm outline-none focus:outline-none"
          />
          <Command.List className="max-h-64 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500">
              No results found.
            </Command.Empty>
            <Command.Group heading="Navigation">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/dashboard"))}
                className="flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-gray-100"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/patients"))}
                className="flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-gray-100"
              >
                <Users className="h-4 w-4" />
                Patients
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/doctors"))}
                className="flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-gray-100"
              >
                <Stethoscope className="h-4 w-4" />
                Doctors
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/appointments"))}
                className="flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-gray-100"
              >
                <Calendar className="h-4 w-4" />
                Appointments
              </Command.Item>
            </Command.Group>
            <Command.Group heading="Actions">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/patients/admit"))}
                className="flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-gray-100"
              >
                <FileText className="h-4 w-4" />
                Admit Patient
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
```

Add the command palette to the layout:

**`app/layout.tsx`** (update):

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CommandPalette } from "@/components/hospital/command-palette";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayurvena — Hospital Management",
  description: "Complete hospital management system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
```

**Commit:** `git commit -m "feat: add command palette with cmdk (⌘K)"`

---

## End of Day 2 Summary

### What you built:
| Hour | Achievement |
|------|-------------|
| 9 | React Hook Form with validation |
| 10 | Zod schemas for type-safe validation |
| 11 | TanStack Query mutations |
| 12 | Sonner toast notifications |
| 13 | TanStack Table with sort/search/pagination |
| 14 | Framer Motion animations |
| 15 | Recharts bar/pie/line charts |
| 16 | cmdk command palette + micro-interactions |

### Day 2 Git Log
```
feat: add patient admission form with React Hook Form
feat: add Zod schemas and integrate with admission form
feat: add patient mutation hook with cache update
feat: add Sonner toasts with success/error notifications
feat: add TanStack Table with sorting, search, pagination
feat: add Framer Motion animations to patient page
feat: add dashboard with Recharts visualizations
feat: add command palette with cmdk (⌘K)
```

**Push your branch:** `git push origin frontend/day-2`

---

# DAY 3 — Polish, Pages & Graduation (Hours 17–24)

> **Goal:** By the end of Day 3, you will have a complete multi-page hospital management app with premium UI, responsive layout, and all pages working together.

---

## Hour 17: App Layout — Sidebar, Header & Navigation Shell

### LEARN

**App Shell Pattern:** Every professional web app has a consistent structure — sidebar on the left, header on top, content in the middle. In Next.js, you create ONE shared layout that wraps all pages.

**Structure:**
```
app/
  layout.tsx          ← root layout (providers, fonts)
  (dashboard)/        ← route group (no URL prefix)
    layout.tsx        ← sidebar + header wraps all pages inside
    page.tsx          ← /dashboard
    patients/
      page.tsx        ← /dashboard/patients
    doctors/
      page.tsx        ← /dashboard/doctors
```

**Route Groups:** Folders named `(name)` in parentheses — they group routes without adding to the URL. `app/(dashboard)/patients/page.tsx` → `/patients` (not `/dashboard/patients`).

**State for sidebar:** Use a simple React context to track collapsed/open state.

### BUILD

Create the app shell layout:

**`src/components/hospital/sidebar.tsx`:**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Activity,
  ChevronLeft,
  ChevronRight,
  Hospital,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/reports", label: "Reports", icon: Activity },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-gray-200">
        <Hospital className="h-6 w-6 text-blue-600 shrink-0" />
        {!collapsed && (
          <span className="font-bold text-lg text-gray-900 whitespace-nowrap">
            Ayurvena
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="p-2 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-center"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
```

**`src/components/hospital/header.tsx`:**

```tsx
"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

export function Header() {
  const [dark, setDark] = useState(false);

  // Toggle dark mode by adding/removing class on html element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu button would go here */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-50 border-gray-200 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setDark(!dark)}>
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
```

**`app/(dashboard)/layout.tsx`:**

```tsx
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/hospital/sidebar";
import { Header } from "@/components/hospital/header";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Page content with animation */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Note: The `key={window.location.pathname}` trick in AnimatePresence
// will need a fix for SSR. For now, use a simple wrapper:
"
```

**Fix for the AnimatePresence key issue** — create a simple page transition wrapper:

**`src/components/hospital/page-transition.tsx`:**

```tsx
"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

Update `app/(dashboard)/layout.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/hospital/sidebar";
import { Header } from "@/components/hospital/header";
import { PageTransition } from "@/components/hospital/page-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
```

Move existing pages into the dashboard layout:

**`app/(dashboard)/page.tsx`** (redirect to dashboard):

```tsx
import { redirect } from "next/navigation";

export default function Root() {
  redirect("/dashboard");
  return null;
}
```

Move `app/page.tsx` → `app/(dashboard)/dashboard/page.tsx`:

Create `app/(dashboard)/dashboard/page.tsx`:

```tsx
import { DashboardCharts } from "@/components/hospital/dashboard-charts";
import { DashboardCard } from "@/components/hospital/dashboard-card";
import { Users, Stethoscope, CalendarCheck, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Hospital overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Patients" value={1247} description="+12 this week" icon={<Users className="h-5 w-5" />} />
        <DashboardCard title="Active Doctors" value={48} description="24 available now" icon={<Stethoscope className="h-5 w-5" />} />
        <DashboardCard title="Today's Appointments" value={156} description="42 completed" icon={<CalendarCheck className="h-5 w-5" />} />
        <DashboardCard title="Bed Occupancy" value="78%" description="142 of 182 beds" icon={<Activity className="h-5 w-5" />} />
      </div>

      <DashboardCharts />
    </div>
  );
}
```

Move patient pages:

**`app/(dashboard)/patients/page.tsx`:**

```tsx
"use client";

import { motion } from "framer-motion";
import { usePatients } from "@/hooks/use-patients";
import { PatientTable } from "@/components/patient/patient-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function PatientsPage() {
  const { data: patients, isLoading, error } = usePatients();

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">Error loading patients</h2>
        <p className="text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all patient records</p>
        </div>
        <Button asChild>
          <a href="/patients/admit">+ Admit Patient</a>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <PatientTable patients={patients || []} />
      )}
    </div>
  );
}
```

**`app/(dashboard)/patients/admit/page.tsx`:**

```tsx
import { AdmissionForm } from "@/components/patient/admission-form";

export default function AdmitPatientPage() {
  return (
    <div className="p-6">
      <AdmissionForm />
    </div>
  );
}
```

Now delete the old files:
- `app/page.tsx` (old homepage)
- `app/patients/page.tsx` (old location)
- `app/patients/admit/page.tsx` (old location)
- `app/dashboard/page.tsx` (old location, if exists)

**Commit:** `git commit -m "feat: add app shell with sidebar, header, route groups"`

---

## Hour 18: Appointments Page — Full CRUD

### LEARN

**Full CRUD page pattern:** A typical data management page has:
1. **List view** — show all records in a table
2. **Create** — form to add new record
3. **Filter/Sort** — find records quickly
4. **Actions** — view, edit, delete per record

**Dynamic routes** with `[param]` in the filename:
```
app/appointments/[id]/page.tsx → /appointments/123
```
The `[id]` becomes a parameter you access via `params`:

```tsx
export default function Page({ params }: { params: { id: string } }) {
  // params.id = "123"
}
```

### BUILD

Create appointments mock data:

**`src/lib/mock-data.ts`** (add to existing):

```tsx
export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: "Checkup" | "Follow-up" | "Emergency" | "Surgery";
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
}

export const mockAppointments: Appointment[] = [
  { id: "A-001", patientName: "Ravi Kumar", doctorName: "Dr. Sharma", department: "Cardiology", date: "2024-01-20", time: "09:00", type: "Checkup", status: "Scheduled" },
  { id: "A-002", patientName: "Priya Singh", doctorName: "Dr. Patel", department: "Neurology", date: "2024-01-20", time: "10:30", type: "Follow-up", status: "Scheduled" },
  { id: "A-003", patientName: "Amit Verma", doctorName: "Dr. Sharma", department: "Cardiology", date: "2024-01-20", time: "11:00", type: "Emergency", status: "In Progress" },
  { id: "A-004", patientName: "Sunita Reddy", doctorName: "Dr. Kumar", department: "Orthopedics", date: "2024-01-21", time: "14:00", type: "Checkup", status: "Scheduled" },
  { id: "A-005", patientName: "Vijay Deshmukh", doctorName: "Dr. Gupta", department: "General Medicine", date: "2024-01-19", time: "16:00", type: "Follow-up", status: "Completed" },
];
```

Create appointments hook:

**`src/hooks/use-appointments.ts`:**

```tsx
import { useQuery } from "@tanstack/react-query";
import { Appointment, mockAppointments } from "@/lib/mock-data";

const fetchAppointments = async (): Promise<Appointment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAppointments), 400);
  });
};

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });
}
```

Create appointment schema:

**`src/lib/schemas.ts`** (add):

```tsx
export const appointmentFormSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  doctorName: z.string().min(2, "Doctor name is required"),
  department: z.string().min(2, "Department is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.enum(["Checkup", "Follow-up", "Emergency", "Surgery"]),
});

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;
```

Create the appointments page:

**`app/(dashboard)/appointments/page.tsx`:**

```tsx
"use client";

import { useState } from "react";
import { useAppointments } from "@/hooks/use-appointments";
import { Appointment, AppointmentFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentFormSchema } from "@/lib/schemas";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Calendar } from "lucide-react";

const statusColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Scheduled: "default",
  "In Progress": "outline",
  Completed: "secondary",
  Cancelled: "destructive",
};

const typeColors: Record<string, string> = {
  Checkup: "bg-blue-100 text-blue-800",
  "Follow-up": "bg-green-100 text-green-800",
  Emergency: "bg-red-100 text-red-800",
  Surgery: "bg-purple-100 text-purple-800",
};

export default function AppointmentsPage() {
  const { data: appointments, isLoading } = useAppointments();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
  });

  const filtered = appointments?.filter(
    (a) =>
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  const onSubmit = (data: AppointmentFormData) => {
    toast.success(`Appointment booked for ${data.patientName}`);
    reset();
    setOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 text-sm mt-1">Schedule and manage appointments</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Book Appointment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient Name</label>
                <Input {...register("patientName")} placeholder="Patient name" />
                {errors.patientName && <p className="text-xs text-red-500 mt-1">{errors.patientName.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Doctor Name</label>
                <Input {...register("doctorName")} placeholder="Doctor name" />
                {errors.doctorName && <p className="text-xs text-red-500 mt-1">{errors.doctorName.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Department</label>
                <Input {...register("department")} placeholder="Department" />
                {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" {...register("date")} />
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input type="time" {...register("time")} />
                  {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time.message}</p>}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                  {...register("type")}
                >
                  <option value="Checkup">Checkup</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Surgery">Surgery</option>
                </select>
              </div>
              <Button type="submit" className="w-full">Book Appointment</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search appointments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered?.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.patientName}</TableCell>
                  <TableCell>{apt.doctorName}</TableCell>
                  <TableCell>{apt.department}</TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColors[apt.type] || ""}`}>
                      {apt.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[apt.status] || "outline"}>
                      {apt.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add appointments page with CRUD and search"`

---

## Hour 19: Doctors Page — Grid View

### LEARN

**Card grid layout** is an alternative to tables for displaying people/profiles — it feels more visual and modern.

**Pattern:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

**Status indicators** using Tailwind:
```html
<div class="flex items-center gap-2">
  <span class="h-2 w-2 rounded-full bg-green-500"></span>
  Available
</div>
```

### BUILD

Create doctors data hooks:

**`src/hooks/use-doctors.ts`:**

```tsx
import { useQuery } from "@tanstack/react-query";
import { Doctor, mockDoctors } from "@/lib/mock-data";

const fetchDoctors = async (): Promise<Doctor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDoctors), 300);
  });
};

export function useDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });
}
```

Create the doctors page:

**`app/(dashboard)/doctors/page.tsx`:**

```tsx
"use client";

import { useDoctors } from "@/hooks/use-doctors";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Stethoscope, Clock, Users, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

export default function DoctorsPage() {
  const { data: doctors, isLoading } = useDoctors();

  const bookAppointment = (doctorName: string) => {
    toast.success(`Booking appointment with ${doctorName}`, {
      description: "Redirecting to appointment scheduler...",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Our Doctors</h1>
        <p className="text-gray-500 text-sm mt-1">
          {doctors?.length} doctors available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors?.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Doctor header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {doctor.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                    doctor.available ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      doctor.available ? "bg-green-500" : "bg-red-500"
                    }`} />
                    {doctor.available ? "Available" : "Busy"}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{doctor.experience}</p>
                    <p className="text-xs text-gray-500">Years</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{doctor.patients}</p>
                    <p className="text-xs text-gray-500">Patients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {doctor.available ? "Now" : "—"}
                    </p>
                    <p className="text-xs text-gray-500">Status</p>
                  </div>
                </div>

                {/* Action */}
                <Button
                  className="w-full"
                  variant={doctor.available ? "default" : "outline"}
                  disabled={!doctor.available}
                  onClick={() => bookAppointment(doctor.name)}
                >
                  {doctor.available ? "Book Appointment" : "Currently Unavailable"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add doctors page with card grid layout"`

---

## Hour 20: Patient Detail Page — Dynamic Routes

### LEARN

**Dynamic routes with `[param]`:** Square brackets in folder names create dynamic route parameters.

```
app/patients/[id]/page.tsx → matches /patients/P-001
                              params.id = "P-001"
```

**The `params` prop:** Next.js passes route parameters to the page component:
```tsx
export default function PatientDetail({ params }: { params: { id: string } }) {
  // params.id is the value from the URL
}
```

**Loading state for dynamic routes:** Next.js automatically shows `loading.tsx` in the same folder while the page is loading.

### BUILD

**`app/(dashboard)/patients/[id]/page.tsx`:**

```tsx
"use client";

import { usePatient } from "@/hooks/use-patients";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Stethoscope,
  Hash,
  MapPin,
  Heart,
  Activity,
  Phone,
  Mail,
} from "lucide-react";

const statusColors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
  Stable: "default",
  Critical: "destructive",
  Discharged: "secondary",
  "Under Observation": "outline",
};

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: patient, isLoading, error } = usePatient(params.id as string);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 col-span-2" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">Patient not found</h2>
        <Button className="mt-4" onClick={() => router.push("/patients")}>
          Back to Patients
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Button
          variant="ghost"
          onClick={() => router.push("/patients")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patients
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{patient.name}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {patient.gender}, {patient.age} years old
                  </p>
                </div>
                <Badge variant={statusColors[patient.status] || "outline"} className="text-sm px-3 py-1">
                  {patient.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Patient ID</p>
                    <p className="font-medium">{patient.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Admitted</p>
                    <p className="font-medium">{patient.admissionDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Doctor</p>
                    <p className="font-medium">{patient.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Bed</p>
                    <p className="font-medium">{patient.bedNumber}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-gray-500 mb-1">Department</p>
                <p className="font-medium">{patient.department}</p>
              </div>
            </CardContent>
          </Card>

          {/* Medical history placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                No medical history records found. This section will display
                past diagnoses, treatments, and medications.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                Update Status
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Assign Bed
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </CardContent>
          </Card>

          {/* Vitals placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vitals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                Vital signs will appear here once recorded.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
```

**`app/(dashboard)/patients/[id]/loading.tsx`:**

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function PatientDetailLoading() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-32" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-48" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add patient detail page with dynamic route"`

---

## Hour 21: Premium Polish — Skeleton Loading & Micro-interactions

### LEARN

**Skeleton loading** shows placeholder shapes that mimic the real content while data loads. It feels faster than a spinner because the user can see the layout forming.

**Types of micro-interactions:**
1. **Hover scale** — buttons/cards slightly grow on hover
2. **Stagger entrance** — items appear one after another
3. **Pulse shimmer** — skeleton elements pulse to show activity
4. **Page transitions** — smooth fade between pages
5. **Button loading state** — spinner during async operations
6. **Toast animations** — slide-in notifications

### BUILD

Create premium loading skeletons:

**`src/components/hospital/skeletons.tsx`:**

```tsx
// src/components/hospital/skeletons.tsx
// Collection of skeleton loading components for consistent loading UI

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Skeleton for a single dashboard stat card
export function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  );
}

// Skeleton for a data table
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

// Skeleton for doctor cards grid
export function DoctorCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-y">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center space-y-1">
              <Skeleton className="h-5 w-8 mx-auto" />
              <Skeleton className="h-3 w-12 mx-auto" />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

// Page header skeleton
export function PageHeaderSkeleton() {
  return (
    <div className="mb-6">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
}
```

Create premium animated button:

**`src/components/hospital/animated-button.tsx`:**

```tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

// Button with loading spinner and hover scale animation
export function AnimatedButton({
  children,
  loading,
  disabled,
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Button
        disabled={disabled || loading}
        className={cn("relative", className)}
        {...props}
      >
        {loading && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.span>
        )}
        <span className={cn(loading && "opacity-0")}>{children}</span>
      </Button>
    </motion.div>
  );
}
```

Update the `globals.css` with premium styles:

**`app/globals.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth focus ring */
*:focus-visible {
  outline: none;
  ring: 2px solid #3b82f6;
  ring-offset: 2px;
}

/* Card hover effect */
.card-hover {
  @apply transition-all duration-200;
}
.card-hover:hover {
  @apply -translate-y-1 shadow-lg;
}

/* Skeleton animation override for smoother shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
  background: linear-gradient(
    90deg,
    #f1f5f9 25%,
    #e2e8f0 50%,
    #f1f5f9 75%
  );
  background-size: 200% 100%;
}
```

**Commit:** `git commit -m "feat: add premium skeleton loading and animated button"`

---

## Hour 22: Final Integration — 404 Page, Reports Page & Responsive Check

### LEARN

**Custom 404 page:** Create `app/not-found.tsx` to show when a page doesn't exist.

**Responsive design checks:**
1. Test on mobile (375px), tablet (768px), desktop (1280px)
2. Sidebar collapses automatically on small screens
3. Tables become scrollable on mobile
4. Grids stack on mobile (1 column)

**Final checklist before wrapping up:**
- [ ] All pages load without errors
- [ ] Loading states show skeletons
- [ ] Error states show message + retry button
- [ ] Empty states show helpful message
- [ ] All links/navigation work
- [ ] Forms submit and show toast
- [ ] Animations play smoothly
- [ ] Responsive layout works on mobile
- [ ] Dark mode toggle works

### BUILD

Create a Reports page with a chart:

**`app/(dashboard)/reports/page.tsx`:**

```tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const monthlyData = [
  { month: "Jan", patients: 120, revenue: 45 },
  { month: "Feb", patients: 135, revenue: 52 },
  { month: "Mar", patients: 150, revenue: 58 },
  { month: "Apr", patients: 142, revenue: 55 },
  { month: "May", patients: 165, revenue: 62 },
  { month: "Jun", patients: 180, revenue: 70 },
];

const departmentRevenue = [
  { dept: "Cardiology", revenue: 120 },
  { dept: "Neurology", revenue: 85 },
  { dept: "Orthopedics", revenue: 65 },
  { dept: "Pediatrics", revenue: 45 },
  { dept: "General", revenue: 90 },
];

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Hospital analytics and performance metrics</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="department">By Department</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Admissions (Monthly)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="patients"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue (Lakhs ₹)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={departmentRevenue} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" />
                  <YAxis dataKey="dept" type="category" />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

Create the custom 404 page:

**`app/not-found.tsx`:**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hospital } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <Hospital className="h-16 w-16 text-blue-600 mx-auto" />
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-xl text-gray-600">Page Not Found</h2>
        <p className="text-gray-500 max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
```

**Commit:** `git commit -m "feat: add reports page with tabs, 404 page"`

---

## Hour 23: Peer Code Review

### LEARN

**Why code review matters:** Catching bugs before they reach production. Learning from teammates. Consistent code quality.

**What to look for in a frontend review:**

| Category | What to check |
|----------|---------------|
| **Functionality** | Does the page load? Do forms submit? Do links work? |
| **Loading states** | Does every data-fetching page show a skeleton? |
| **Error states** | What happens when fetch fails? Is there a retry? |
| **Empty states** | What if there is no data? Is there a helpful message? |
| **Responsiveness** | Does it work on mobile? Do grids stack? |
| **Animations** | Are they smooth? Do they respect reduced-motion? |
| **Accessibility** | Are buttons labeled? Is keyboard navigation possible? |
| **Performance** | Are images optimized? Is data cached? |
| **Console errors** | Open DevTools — any red errors? |

### BUILD

**Review Checklist File:** Create a checklist that the buddy pairs use.

Create `CODE-REVIEW-CHECKLIST.md`:

```md
# Frontend Code Review Checklist

## Reviewer fills this during review

### 1. Pages Check
- [ ] Homepage redirects to /dashboard
- [ ] Dashboard shows stats + charts
- [ ] Patients page lists all patients
- [ ] Patient detail page shows individual patient
- [ ] Doctors page shows card grid
- [ ] Appointments page shows table with search
- [ ] Reports page shows charts with tabs
- [ ] /patients/admit form submits successfully
- [ ] 404 page shows for unknown routes

### 2. States Check (for each data-fetching page)
- [ ] Loading state: skeleton shown
- [ ] Error state: error message + retry
- [ ] Success state: data displayed correctly
- [ ] Empty state: helpful message shown

### 3. Interactions Check
- [ ] Sidebar navigation works
- [ ] Sidebar collapse/expand works
- [ ] Command palette opens with ⌘K
- [ ] Dark mode toggle works
- [ ] Search filters results
- [ ] Table sorting works
- [ ] Table pagination works
- [ ] Toasts appear on success/error

### 4. Polish Check
- [ ] Page transitions are smooth
- [ ] Hover effects on cards
- [ ] Consistent spacing/spacing
- [ ] No console errors
- [ ] Responsive on mobile (375px)

### Issues Found
| Page | Issue | Severity (High/Med/Low) |
|------|-------|-------------------------|
|      |       |                         |

### Overall Verdict
- [ ] APPROVED — no issues
- [ ] APPROVED with notes — minor issues
- [ ] CHANGES REQUESTED — must fix before merge
```

**Review pairs:**

| Reviewer | Reviewee |
|----------|----------|
| Sanjay | Manaswini |
| Manaswini | Sanjay |
| Soumya | Both (mentor review) |

**Process:**
1. Reviewer opens the app and goes through the checklist
2. Reviewer fills in the `CODE-REVIEW-CHECKLIST.md`
3. Reviewer discusses findings with reviewee
4. Fix any High/Medium issues found
5. Soumya does final mentor review

**Commit:** `git commit -m "docs: add code review checklist"`

---

## Hour 24: Quiz + Graduation

### LEARN

**Final test of understanding.** These questions cover everything from Day 1 to Day 3. Try to answer without looking at the code first, then check your answers.

### QUIZ (10 Questions)

**Question 1:** What is the difference between a Server Component and a Client Component in Next.js?

**Question 2:** In TanStack Query, what do `isLoading` and `isFetching` mean? When would one be true but not the other?

**Question 3:** What does `z.string().min(2).email()` do in a Zod schema? What type does it expect?

**Question 4:** What is the purpose of `queryClient.invalidateQueries({ queryKey: ["patients"] })` after a mutation?

**Question 5:** How does file-based routing work in Next.js App Router? Give examples for `/patients`, `/patients/admit`, and `/patients/P-001`.

**Question 6:** What is the difference between `<Table>` from shadcn/ui and `<table>` from plain HTML? Why use TanStack Table on top of it?

**Question 7:** In Framer Motion, what does `initial`, `animate`, and `transition` control?

**Question 8:** What is a route group in Next.js (folders with parentheses)? Why would you use `(dashboard)/` as a folder name?

**Question 9:** What does `toast.promise()` do in Sonner? When would you use it instead of `toast.success()`?

**Question 10:** Why do error boundary components (`error.tsx`) need `"use client"` but regular pages do not?

### Answers

**Answer 1:**
- **Server Components** render on the server, can't use hooks (useState, useEffect), great for fetching data and static content. Default in Next.js App Router.
- **Client Components** need `"use client"` directive, render in the browser, can use hooks, event handlers, and browser APIs.

**Answer 2:**
- `isLoading` is true only on the FIRST load when there is NO cached data yet.
- `isFetching` is true during ANY fetch (including background refetches after cached data exists).
- `isLoading = true` but `isFetching = false` would never happen normally (loading implies fetching).
- `isLoading = false` but `isFetching = true` happens when data is already cached but TanStack Query is refetching in the background.

**Answer 3:**
- The schema requires a string that is at least 2 characters long AND is a valid email format.
- It expects a string input. `.email()` validates the format (must contain @ and a domain).

**Answer 4:**
- It tells TanStack Query that the cached "patients" data is now stale and should be refetched. After a mutation (like adding a new patient), you invalidate the list query so the table updates to show the new data.

**Answer 5:**
```
app/patients/page.tsx        → /patients
app/patients/admit/page.tsx  → /patients/admit
app/patients/[id]/page.tsx   → /patients/P-001 (dynamic)
```
Square brackets `[id]` make a dynamic segment. The value is accessed via the `params` prop.

**Answer 6:**
- shadcn `<Table>` is a styled version of HTML `<table>` with consistent design system classes.
- TanStack Table adds logic on top — sorting, filtering, pagination, row selection, column reordering. It uses the shadcn Table for rendering but manages all the state.

**Answer 7:**
- `initial` — the starting state (before animation, e.g., `{ opacity: 0 }`)
- `animate` — the ending state (what it animates to, e.g., `{ opacity: 1 }`)
- `transition` — controls the animation timing (duration, delay, easing)

**Answer 8:**
- Route groups are folders in parentheses that organize routes without affecting the URL path.
- `(dashboard)/patients/page.tsx` maps to `/patients` (not `/dashboard/patients`).
- It helps organize shared layouts without deep URL nesting.

**Answer 9:**
- `toast.promise()` shows a loading toast while a promise is pending, then automatically switches to success/error toast based on the outcome.
- Use it instead of `toast.success()` when you have an async operation that takes time (e.g., API call) — it gives the user real-time feedback.

**Answer 10:**
- Error boundaries need React hooks and lifecycle methods (like `componentDidCatch`) which are only available in Client Components.
- Regular pages in Next.js are Server Components by default — they don't need browser APIs.
- Server Components handle errors differently (through `error.tsx` files at the route level, which DO need to be client components for the interactive retry functionality).

### Scoring

| Score | Grade | Meaning |
|-------|-------|---------|
| 10/10 | 🏆 Outstanding | You are ready to build production apps |
| 8-9/10 | ⭐ Excellent | Strong understanding, minor gaps |
| 6-7/10 | 👍 Good | Solid foundation, review weak areas |
| 4-5/10 | 📚 Needs Review | Revisit the relevant hours |
| 0-3/10 | 🔄 Retake | Go through the bootcamp again |

### YOUR PATH FORWARD

Congratulations on completing the 24-Hour Frontend Bootcamp!

**What you built:**
- A complete hospital management web app
- 6+ pages with routing, layouts, transitions
- Forms with validation
- Data tables with sorting, search, pagination
- Charts and data visualizations
- Premium UI with animations and micro-interactions
- Command palette, dark mode, toast notifications

**Skills you now have:**

| Skill | Where you used it |
|-------|------------------|
| React components + props + state | Hours 1-2 |
| Next.js App Router + layouts | Hours 3-4 |
| Tailwind CSS | Hour 5 |
| shadcn/ui components | Hour 6 |
| TanStack Query (fetch + mutations) | Hours 7-8, 11 |
| React Hook Form + Zod | Hours 9-10 |
| Sonner toasts | Hour 12 |
| TanStack Table (sort/filter/paginate) | Hour 13 |
| Framer Motion animations | Hour 14 |
| Recharts charts | Hour 15, 22 |
| cmdk command palette | Hour 16 |
| App shell + sidebar + header | Hour 17 |
| Dynamic routes `[id]` | Hour 20 |
| Skeleton loading + polish | Hour 21 |
| Code review process | Hour 23 |

### After the 24 Hours — What's Next?

| Area | What to learn next | Why |
|------|-------------------|-----|
| **Backend integration** | Connect to real APIs via NestJS backend | Replace mock data with live data |
| **Authentication** | NextAuth.js / Clerk | Login, roles, protected routes |
| **Testing** | Playwright for E2E, Vitest for unit tests | Ensure quality as app grows |
| **State management** | Zustand for global state | Share state across components |
| **Deployment** | Vercel deployment | Share with real users |
| **Performance** | Lighthouse audits, bundle analysis | Keep app fast |
| **Accessibility** | WCAG 2.2 compliance | Make app usable by everyone |

---

## Final Words From Your Mentor

> "You started this bootcamp not knowing React. 24 hours later, you have built a complete hospital management web app with animations, charts, forms, tables, and a command palette. That is NOT easy. Be proud of what you accomplished.
>
> The key to getting better: build more. Take this app, add features, connect it to a real backend, deploy it. Every line of code you write makes you better.
>
> Remember: every expert was once a beginner who kept going."
> — **Soumya (Mentor)**

---

## After the 24 Hours

### Skills You've Mastered

| Skill | Level | Next Step |
|-------|-------|-----------|
| React Components | ⭐⭐⭐ | Learn composition patterns |
| Next.js Routing | ⭐⭐⭐ | Middleware, intercepting routes |
| Tailwind CSS | ⭐⭐⭐ | Custom theme configuration |
| shadcn/ui | ⭐⭐⭐ | Build your own components |
| TanStack Query | ⭐⭐ | Optimistic updates, paginated queries |
| TanStack Table | ⭐⭐ | Row selection, editable cells |
| React Hook Form + Zod | ⭐⭐ | Nested forms, conditional fields |
| Framer Motion | ⭐⭐ | Layout animations, gesture-based |
| Recharts | ⭐⭐ | Custom shapes, animations |
| cmdk | ⭐⭐ | Custom commands, nested search |

### Git Log Summary (All 3 Days)

```
feat: add WelcomeBanner component with props
feat: add PatientCounter with state management
feat: add Next.js layout and initial pages
feat: add loading, error, and layout for patients
feat: style homepage with Tailwind CSS
feat: add DashboardCard component with shadcn Card
feat: add TanStack Query provider with configuration
feat: add patient list page with TanStack Query and shadcn Table
feat: add patient admission form with React Hook Form
feat: add Zod schemas and integrate with admission form
feat: add patient mutation hook with cache update
feat: add Sonner toasts with success/error notifications
feat: add TanStack Table with sorting, search, pagination
feat: add Framer Motion animations to patient page
feat: add dashboard with Recharts visualizations
feat: add command palette with cmdk (⌘K)
feat: add app shell with sidebar, header, route groups
feat: add appointments page with CRUD and search
feat: add doctors page with card grid layout
feat: add patient detail page with dynamic route
feat: add premium skeleton loading and animated button
feat: add reports page with tabs, 404 page
docs: add code review checklist
```

### Final Step

```bash
# Push Day 3 branch
git add .
git commit -m "feat: complete 24-hour frontend bootcamp"
git push origin frontend/day-3

# Create a PR to merge all days into main
gh pr create --title "24-Hour Frontend Bootcamp Complete" --body "All 24 hours of the Next.js frontend bootcamp."
```

**Congratulations, Frontend Developer! 🎉**


# Ayurvena — Team Module Assignment Sheet
**Date:** June 23, 2026
**Purpose:** Team discussion — everyone picks where they want to work

---

## The Project at a Glance
- **What:** Hospital Operating System — 23 modules, ~290 screens
- **Duration:** 6 months (24 weeks)
- **Team:** 6 developers
- **Tech Stack:** NestJS (backend) | Next.js + React (web) | React Native + Expo (mobile) | PostgreSQL + Prisma (database) | Redis (cache/real-time)

---

## 6 Layers — Pick Your Lane

Every module needs work across multiple layers. You're picking a **layer**, not a module.

| # | Layer | What you'll do | Tech you'll use | Min people needed |
|---|-------|---------------|-----------------|:-----------------:|
| 1 | **Database** | Design all tables, write migrations, optimize queries, seed data | PostgreSQL, Prisma, Redis, SQL | 1 |
| 2 | **Core Backend** | Auth, payments, real-time events, external integrations (Razorpay, HL7, ABDM) | NestJS, TypeScript, WebSocket, Redis | 1 |
| 3 | **Module Backend** | CRUD APIs for all 23 modules (~340 endpoints) | NestJS, TypeScript, Prisma | 1 |
| 4 | **Web Frontend** | 19 staff-facing web panels (~200 screens) | Next.js, React, TypeScript, Tailwind, shadcn/ui | **2 (minimum)** |
| 5 | **Mobile** | Patient App (40 screens) + Doctor App (28 screens) | React Native, Expo, TypeScript | 1 |
| 6 | **QA & Testing** | Test plans, API testing, regression, security checks | Postman, Jest, Playwright, Python scripts | 1 |

---

## What Each Layer Actually Looks Like (Day to Day)

### Layer 1 — Database Engineer
**"You design the foundation everything else runs on."**

- Week starts: you get the list of modules in the sprint
- You design tables, relationships, indexes for those modules
- You write Prisma schema and run migrations
- You create seed data so frontend/mobile devs aren't blocked
- You optimize slow queries flagged by the team
- You maintain the ERD (entity relationship diagram)

**Workload:** ~80 tables across 3 phases
**Complexity:** Medium early, gets complex in Phase 2 (billing, insurance, lab results)
**Good fit if you:** Love SQL, enjoy designing clean data structures, like being the person everyone depends on

---

### Layer 2 — Core Backend (Sr. Backend)
**"You build the hard parts — payments, real-time, integrations."**

- You own authentication (JWT, OTP, role-based access)
- You integrate Razorpay for payments and handle webhooks
- You build the WebSocket server for live queues, bed boards, alerts
- You integrate with external systems: lab machines (HL7), insurance (TPA), ABDM
- You set up push notifications (FCM/APNs)
- You build the multi-tenant isolation logic for SaaS

**Workload:** ~16 major integration tasks across 3 phases
**Complexity:** High — this is the hardest backend role
**Good fit if you:** Like solving complex problems, enjoy integrations, comfortable reading third-party API docs

---

### Layer 3 — Module Backend
**"You build the APIs that power every screen."**

- For each module, you build CRUD endpoints: create, read, update, delete
- You follow patterns set by the Core Backend person
- You write business logic: booking rules, billing calculations, prescription validation
- You generate PDFs (prescriptions, invoices, discharge summaries)
- You handle file uploads (medical images, documents)

**Workload:** ~340 API endpoints across 23 modules
**Complexity:** Medium — repetitive patterns but lots of volume
**Good fit if you:** Like building things systematically, enjoy seeing features come together, comfortable with APIs

---

### Layer 4 — Web Frontend (2 people minimum)
**"You build what hospital staff see and use every day."**

- You build 19 different web panels: Reception, Admin, Lab, Pharmacy, Billing, etc.
- Each panel has dashboards, data tables, forms, and real-time updates
- You connect to backend APIs and display data
- You build charts for analytics dashboards
- You handle role-based views (different staff see different things)

**Workload:** ~200 web screens across 19 panels
**Complexity:** Medium — lots of screens, many follow similar patterns (tables, forms, dashboards)
**Good fit if you:** Like building UIs, enjoy making things look good and work smoothly, comfortable with React

**Why 2 people:** One person doing 200 screens in 6 months = ~1.5 screens/day with no breaks. Two people makes it realistic.

---

### Layer 5 — Mobile Developer
**"You build what patients and doctors use on their phones."**

- You build the Patient App (40 screens): booking, payments, prescriptions, reports
- You build the Doctor App (28 screens): appointments, consultations, prescriptions, schedule
- Both apps work on Android AND iOS (one codebase via React Native)
- You handle in-app payments, push notifications, biometric login
- You submit to App Store and Play Store

**Workload:** 68 mobile screens (2 apps)
**Complexity:** Medium-High — payments, real-time updates, and App Store review process
**Good fit if you:** Like mobile apps, enjoy building smooth user experiences, don't mind dealing with Android/iOS quirks

---

### Layer 6 — QA & Testing
**"You make sure nothing breaks."**

- You write test plans for every module
- You test every API endpoint with Postman
- You test user flows end-to-end (book appointment → pay → consult → get prescription)
- You file bugs with clear reproduction steps
- You run regression tests before every milestone demo
- You help with seed data and database testing
- You do the security audit before launch

**Workload:** Testing all 23 modules across 3 phases
**Complexity:** Medium — requires attention to detail and understanding of all modules
**Good fit if you:** Detail-oriented, like finding edge cases, enjoy breaking things to make them better

---

## The Team — Current Skills Summary

| Person | Strongest Skills | Experience Highlights |
|--------|-----------------|---------------------|
| **Abhinaya Reddy** | SQL, Python, C++, HTML/CSS/JS | DB Developer Intern (Verzeo) — SQL queries, stored procedures, GCP |
| **Sanjay Kumar** | TypeScript, Angular, Node.js, Express, MySQL, REST APIs | Built full websites with backend APIs + database |
| **Srinitha Mulagundla** | Python, SQL, Database design | ML projects, data preprocessing, analytical mindset |
| **Manaswini Sangepu** | HTML, CSS, JS, React.js, Python, SQL | Built React health tracking app, responsive UIs |
| **Harshitha Mekala** | Python, FastAPI, SQL, REST APIs, Backend dev | Built backend systems, interested in backend + scalable apps |
| **Soumya** | React, Angular, Node.js, Express, MongoDB, MySQL, REST APIs | Most deployed projects, full-stack experience, Three.js |

---

## Suggested Mapping (Starting Point for Discussion)

This is a **suggestion only** — team decides together.

| Layer | Suggested Person | Why |
|-------|-----------------|-----|
| Database | **Abhinaya** | Only one with DB internship, strongest SQL background |
| Core Backend | **Sanjay** | Only one with TypeScript + Node.js + Express experience |
| Module Backend | **Harshitha** | FastAPI/REST API experience, wants backend |
| Web Frontend #1 | **Soumya** | Most deployed web projects, knows React + Angular |
| Web Frontend #2 | **Manaswini** | React experience, built responsive UIs |
| QA & Testing | **Srinitha** | Analytical (ML background), Python + SQL for test scripts |

---

## What Everyone Needs to Learn (Week 1)

No matter which layer you pick, there's a learning gap. That's normal and expected.

| Layer | What's new to learn | Estimated ramp-up |
|-------|-------------------|:-----------------:|
| Database | PostgreSQL (from MySQL/general SQL), Prisma ORM | 3 days |
| Core Backend | NestJS (from Express), TypeScript, WebSocket, Razorpay | 4–5 days |
| Module Backend | Node.js + NestJS (from Python/FastAPI), TypeScript | 5–7 days |
| Web Frontend | Next.js (from React/Angular), TypeScript, Tailwind, shadcn/ui | 3–4 days |
| Mobile | React Native + Expo (from React/web), TypeScript | 5–7 days |
| QA & Testing | Postman, Jest, Playwright, Docker basics | 3–4 days |

**Everyone:** TypeScript basics (2 days) — this is the primary language for ALL layers.

---

## Discussion Questions for the Team

1. **Which layer excites you most?** Don't just pick what's easy — pick what you want to get good at.
2. **Are you okay with the learning curve?** Every layer has new tech to learn.
3. **Anyone want to do Mobile?** Currently suggested for Soumya, but if she prefers web, someone else needs to step up.
4. **We NEED 2 people on Web Frontend.** 200 screens is too much for one person. Who's in?
5. **Anyone want to split time?** Example: Srinitha could do QA + help Abhinaya on DB.
6. **Backup plan:** If someone gets stuck, who can help? Think about secondary skills.

---

## Constraints (Non-Negotiable)

- **Minimum 2 frontend developers** — 200 web screens cannot be done by 1 person
- **At least 1 person must learn NestJS** — our entire backend is built on it
- **At least 1 person must learn React Native** — we have 2 mobile apps to ship
- **Database work starts Day 1** — everyone else is blocked without tables

---

## How to Fill This Out

Each person writes their **top 2 preferences** below:

| Person | 1st Choice | 2nd Choice | Notes |
|--------|-----------|-----------|-------|
| Abhinaya | | | |
| Sanjay | | | |
| Srinitha | | | |
| Manaswini | | | |
| Harshitha | | | |
| Soumya | | | |

After everyone fills in, we'll finalize assignments and set up Jira.

---

*Remember: the layer you pick is what you'll be doing for 6 months. Pick something you want to grow in, not just something comfortable.*

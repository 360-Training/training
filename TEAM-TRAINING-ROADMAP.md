# Ayurvena — Learn While Building Plan
**Principle:** No separate training. Learn the stack by building the product. Teach each other daily.

---

## Week 1 — Bootcamp Week (Only Exception)

This is the ONLY week where learning comes before feature work. After this, it's 100% building.

### Day 1–2: TypeScript (Everyone Together)

Nobody writes a single line of code in the project without knowing TS first.

| Time | What | Who teaches |
|------|------|------------|
| 9:00–11:00 | Types, interfaces, enums, type guards | **Sanjay** (only one who knows TS) |
| 11:00–1:00 | Practice: convert 5 JS functions to TS | Everyone does it, Sanjay reviews |
| 2:00–4:00 | Generics, async/await with types, utility types | **Sanjay** |
| 4:00–6:00 | Practice: build a typed to-do app (no framework, just TS) | Everyone does it, Sanjay + Soumya review |

### Day 3: Project Setup (Everyone Watches, Tech Lead Drives)

| Time | What | Who sets up | Everyone else |
|------|------|------------|---------------|
| 9:00–11:00 | NestJS backend — project structure, first module, Prisma connection | **Sanjay** sets up, explains every file | Watch + ask questions |
| 11:00–1:00 | PostgreSQL + Prisma — first schema, first migration, seed | **Abhinaya** sets up with Sanjay | Watch + ask questions |
| 2:00–3:30 | Next.js frontend — project structure, layout, auth page | **Soumya** sets up, explains every file | Watch + ask questions |
| 3:30–5:00 | Expo mobile — project structure, navigation, first screen | **Soumya** sets up | Watch + ask questions |
| 5:00–6:00 | Postman workspace + Git branching strategy | **Srinitha** + you (manager) | Everyone follows along |

**End of Day 3:** Everyone has the full project running locally and understands the folder structure.

### Day 4: Each Person Builds Their First Thing

| Person | Task | Helped by |
|--------|------|-----------|
| **Abhinaya** | Design `users`, `roles`, `hospitals` tables in Prisma schema, run migration | Sanjay (for Prisma syntax) |
| **Sanjay** | Build auth module — register, login, JWT, OTP endpoint | Abhinaya (for schema questions) |
| **Harshitha** | Build her first NestJS CRUD — `departments` module (simple one to learn the pattern) | **Sanjay sits with her** (biggest jump — Python to Node) |
| **Manaswini** | Build login page in Next.js with Tailwind + form | **Soumya sits with her** |
| **Soumya** | Build the Next.js layout — sidebar, header, auth guard | Manaswini (they work side by side) |
| **Srinitha** | Set up Postman collection, test the auth endpoints as Sanjay builds them | Sanjay (gives her the endpoint specs) |

### Day 5: Wire It Together

| Time | What |
|------|------|
| 9:00–12:00 | Connect frontend login page → backend auth API → database. Everyone watches the full flow. |
| 12:00–1:00 | Srinitha tests the flow in Postman, finds bugs, files them |
| 2:00–4:00 | Each person fixes/improves their Day 4 work based on feedback |
| 4:00–6:00 | **First team demo** — show the working login flow end-to-end. Celebrate. |

**End of Week 1:** Working login system. Everyone has written code in the project. Everyone knows the stack basics.

---

## After Week 1 — Daily Rhythm (Runs for 23 Weeks)

### The Daily Schedule

| Time | Activity | Purpose |
|------|----------|---------|
| **9:00–9:15** | Standup — what I did, what I'm doing, where I'm stuck | Alignment |
| **9:15–9:45** | **Teach Session** (see rotation below) | Cross-pollination |
| 9:45–1:00 | **Build** — primary lane work | Delivery |
| 2:00–5:30 | **Build** — primary lane work | Delivery |
| **5:30–5:45** | **Pair Help** — whoever's stuck gets 15 min from whoever can help | Unblocking |
| **5:45–6:00** | Quick sync — any blockers for tomorrow? | Planning |

### Daily Teach Sessions (9:15–9:45, 30 min)

The person who built something yesterday teaches it. **Not slides. Screen share, show code, explain decisions.**

| Day | Who Teaches | What they show | Who benefits most |
|-----|------------|----------------|-------------------|
| **Monday** | Abhinaya | "Here's the schema I designed this week — why these tables, why these relations" | Harshitha, Srinitha (both need DB knowledge) |
| **Tuesday** | Sanjay | "Here's the core API I built — how NestJS works, how auth/payment/websocket works" | Harshitha (learning NestJS), everyone else |
| **Wednesday** | Soumya or Manaswini | "Here's the page I built — how Next.js routing works, how I connected to the API" | Abhinaya, Srinitha, Harshitha (all weak on frontend) |
| **Thursday** | Harshitha | "Here's the module API I built — the pattern I followed from Sanjay's code" | Manaswini (understands what API returns), Srinitha (knows what to test) |
| **Friday** | Srinitha | "Here's what broke this week — bugs I found, how to avoid them" | Everyone |

**Rule:** The person teaching must show REAL code from the project, not theory.

---

## The Buddy System — Who Helps Whom

Each person has a **primary buddy** who helps them when stuck. Based on skill overlap:

| Person | Stuck on... | Ask... | Why |
|--------|------------|--------|-----|
| **Abhinaya** (DB) | Prisma syntax, TypeScript | Sanjay | He knows TS, will learn Prisma alongside |
| **Sanjay** (Core Backend) | DB design questions | Abhinaya | She knows SQL best |
| **Harshitha** (Module Backend) | NestJS anything | **Sanjay** (primary mentor) | She's making the biggest tech jump |
| **Manaswini** (Web Frontend) | Next.js, component patterns | **Soumya** (primary mentor) | Soumya has more deployed web projects |
| **Soumya** (Web + Mobile) | React Native specific issues | Online docs + you escalate | Nobody knows RN — she's the pioneer |
| **Srinitha** (QA) | What to test, how endpoints work | **Harshitha** | Harshitha builds the module APIs Srinitha tests |

### The Mentor Pairs (Ongoing)

| Mentor → Learner | What the mentor teaches while building | When |
|-------------------|---------------------------------------|------|
| **Sanjay → Harshitha** | NestJS patterns. Every new module Harshitha builds, Sanjay reviews within 1 hour. First 2 weeks Sanjay writes the first module, Harshitha copies the pattern. | Ongoing, especially Month 1–2 |
| **Soumya → Manaswini** | Next.js patterns. Soumya builds the first 3 pages, Manaswini follows the pattern for the rest. | Month 1, then Manaswini is independent |
| **Abhinaya → Srinitha** | SQL, database thinking. Srinitha helps Abhinaya with seed data and learns DB in the process. | Ongoing |

---

## How Learning Happens Through Building (Sprint by Sprint)

### Sprint 1 (W1–2) — Foundation

| Person | What they build | What they learn by building it |
|--------|----------------|-------------------------------|
| Abhinaya | `users`, `patients`, `hospitals` schema | PostgreSQL, Prisma schema syntax, migrations |
| Sanjay | Auth module (JWT, OTP, RBAC) | NestJS deep — guards, middleware, services |
| Harshitha | `departments` CRUD module (simple, learning module) | NestJS basics — controllers, services, DTOs |
| Manaswini | Login + Register pages | Next.js App Router, Tailwind, React Hook Form |
| Soumya | Layout system + Expo project setup | Next.js layouts, React Native navigation |
| Srinitha | Postman collections for auth APIs + seed scripts | API testing, Postman, basic Python scripting |

**Sanjay teaches Harshitha:** "Copy my auth module structure. Your departments module should look exactly like this but simpler."
**Soumya teaches Manaswini:** "Copy my layout. Your login page goes inside this structure."

### Sprint 2 (W3–4) — Patients & Doctors

| Person | What they build | What they learn by building it |
|--------|----------------|-------------------------------|
| Abhinaya | `doctors`, `schedules`, `availability` schema | Complex relations, constraints, indexes |
| Sanjay | Patient search API (full-text), file upload service | PostgreSQL full-text search, S3 integration |
| Harshitha | Patient CRUD + Doctor CRUD APIs (follows Sanjay's pattern) | NestJS patterns solidify, Prisma queries |
| Manaswini | Patient search page + Doctor listing page | TanStack Table, data fetching with TanStack Query |
| Soumya | Patient App — auth + home + doctor discovery (16 screens) | React Native components, navigation, API calls |
| Srinitha | Test patient + doctor CRUD, seed 500 test patients | Newman automation, data generation |

### Sprint 3 (W5–6) — Booking + Payment

| Person | What they build | What they learn by building it |
|--------|----------------|-------------------------------|
| Abhinaya | `appointments`, `slots`, `payments` schema | Transaction handling, payment state machines |
| Sanjay | Razorpay integration — orders, webhooks, refunds | Payment gateway integration, webhook security |
| Harshitha | Booking flow APIs — slot check, book, cancel, reschedule | Business logic in NestJS, transaction handling |
| Manaswini | Appointment booking page + billing collection screen | Multi-step forms, payment UI, loading states |
| Soumya | Patient App — booking flow (9 screens including Razorpay) | React Native + Razorpay SDK, payment flows |
| Srinitha | E2E test: search → book → pay → confirm | End-to-end testing patterns, payment testing |

### Sprint 4 (W7–8) — Queue + Real-time

| Person | What they build | What they learn by building it |
|--------|----------------|-------------------------------|
| Abhinaya | `tokens`, `queues`, `notifications` schema + Redis setup | Redis data structures, pub/sub |
| Sanjay | WebSocket server, Redis pub/sub, FCM push | Socket.io, real-time architecture |
| Harshitha | Queue management APIs, token generation | Integrating with WebSocket events |
| Manaswini | Live queue board (updates in real-time) | WebSocket client in React, real-time UI |
| Soumya | Doctor App — dashboard + appointment queue + notifications | React Native + WebSocket + push notifications |
| Srinitha | Test WebSocket events, notification delivery | WebSocket testing, push notification verification |

### Sprint 5–6 (W9–12) — Consultation + MVP Polish

| Person | What they build | What they learn by building it |
|--------|----------------|-------------------------------|
| Abhinaya | `consultations`, `prescriptions`, `diagnoses` schema + optimization | Complex medical data modeling, query optimization |
| Sanjay | Prescription PDF service, clinical data APIs, API hardening | PDF generation, rate limiting, security |
| Harshitha | Consultation flow, prescription, lab order, referral APIs | Complex business flows, multi-step operations |
| Manaswini | Doctor web panel (consultation + prescription UI), polish all Phase 1 pages | Rich text editors, complex forms, UI polish |
| Soumya | Complete Patient App (40) + Doctor App (28), mobile polish | Deep React Native skills, app performance |
| Srinitha | Full MVP regression test, bug triage | Complete testing methodology |

**By Sprint 6 (Week 12):** Everyone has 3 months of hands-on experience with the actual tech stack. No separate training needed — they learned by shipping.

---

## Knowledge Sharing Rules

### 1. No Silos
- Every PR gets reviewed by someone from a DIFFERENT layer
- Abhinaya's schema PRs → reviewed by Sanjay (catches API issues early)
- Sanjay's API PRs → reviewed by Manaswini or Soumya (catches frontend integration issues)
- Harshitha's API PRs → reviewed by Srinitha (catches testability issues)
- Frontend PRs → reviewed by Harshitha (catches API contract mismatches)

### 2. First-Time Pattern Rule
When someone builds a pattern for the first time:
1. **Sanjay builds the first NestJS module** → Harshitha copies the pattern for all future modules
2. **Soumya builds the first Next.js page** → Manaswini copies the pattern for all future pages
3. **Abhinaya designs the first schema** → everyone refers to it for naming conventions
4. **Srinitha writes the first Postman collection** → everyone adds to it

### 3. Stuck? 15-Minute Rule
- Stuck for 15 minutes → ask your buddy
- Buddy can't help → ask in team chat
- Nobody knows → Google/docs together (don't waste 2 hours alone)

### 4. Friday Demo (Non-Negotiable)
Every Friday 4:00–5:00 PM:
- Each person demos what they built that week
- **Show the code, not just the screen** — everyone learns the patterns
- 10 min per person, no slides

---

## The Teaching Chain

As each person gets comfortable, they start teaching the next person:

**Month 1:**
```
Sanjay teaches → Harshitha (NestJS)
Soumya teaches → Manaswini (Next.js)
Abhinaya teaches → Srinitha (SQL/DB)
```

**Month 2:**
```
Harshitha teaches → Abhinaya (NestJS basics — she learned it last month)
Manaswini teaches → Srinitha (React basics — she learned it last month)
Sanjay teaches → Soumya (WebSocket/real-time patterns)
```

**Month 3:**
```
Everyone can explain any module's code to anyone else
New joiner could be onboarded by ANY team member, not just one person
```

---

## Quick Reference — Who Knows What, Who Teaches What

| Topic | Expert (teaches) | Learning (ask them in Month 2+) |
|-------|-----------------|-------------------------------|
| SQL / Database Design | Abhinaya | Srinitha (Month 2), Harshitha (Month 3) |
| TypeScript | Sanjay | Everyone (Month 1) |
| NestJS | Sanjay | Harshitha (Month 2), Abhinaya (Month 3) |
| Prisma | Abhinaya + Sanjay | Harshitha (Month 2) |
| Next.js / React | Soumya | Manaswini (Month 1), Srinitha (Month 3) |
| React Native | Soumya (learning herself) | — |
| Tailwind / UI | Soumya + Manaswini | — |
| API Testing | Srinitha | Harshitha (Month 2) |
| Payments / Razorpay | Sanjay | Soumya (Month 2, mobile payments) |
| WebSocket / Real-time | Sanjay | Manaswini (Month 2, live queue UI) |
| Redis | Abhinaya + Sanjay | — |
| Git Workflow | Sanjay + Soumya | Everyone (Month 1) |

---

## Summary

| Principle | How |
|-----------|-----|
| **No separate training** | Learn by building real features |
| **Teach each other** | 30-min daily teach sessions + buddy system |
| **Copy patterns, don't invent** | First person builds the pattern, everyone follows |
| **Cross-layer PR reviews** | Everyone reads code from other layers |
| **Friday demos** | Show code, not slides — everyone learns |
| **15-minute rule** | Don't suffer alone, ask your buddy |
| **Teaching chain** | Month 1 learner becomes Month 2 teacher |

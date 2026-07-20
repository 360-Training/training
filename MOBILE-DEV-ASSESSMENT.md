# React Native Developer — Assessment Task

**Time Limit:** 2 days
**Stack:** React Native + Expo (managed workflow) + TypeScript
**What we're testing:** Can this person build production-quality mobile screens for a hospital app?

---

## The Brief

You're building a **mini version of a Patient App** for a hospital. The app lets patients find doctors, book appointments, make payments, view prescriptions, and manage their profile.

**You must use:**
- React Native with **Expo** (managed workflow)
- **TypeScript** (strict mode, no `any`)
- **Expo Router** for navigation
- Proper state management (Zustand, Context, or TanStack Query)
- Smooth animations (Reanimated or Moti)
- Clean, production-ready UI (not prototype/rough)

**You must NOT use:**
- Any AI tool to generate the code (we will verify)
- Any pre-built app templates or boilerplates
- JavaScript (TypeScript only)

---

## What to Build — 12 Screens

### Level 1 — Foundation (Day 1)

#### Screen 1: Splash Screen
- Animated logo (fade in + scale)
- Smooth transition to onboarding or home
- Handles "already logged in" → skip to home

#### Screen 2: Onboarding (3-step carousel)
- 3 swipeable slides with illustrations (use placeholder images)
- Slide 1: "Find the Best Doctors"
- Slide 2: "Book Appointments Instantly"
- Slide 3: "Your Health Records in One Place"
- Dot indicators showing current slide
- "Skip" button + "Get Started" button on last slide
- Smooth page transition animation

#### Screen 3: Login
- Phone number input with country code (+91)
- Phone validation (10 digits, numeric only)
- "Send OTP" button — disabled until valid phone entered
- Loading state while "sending OTP"
- Navigate to OTP screen
- "Don't have an account? Register" link

#### Screen 4: OTP Verification
- 6-digit OTP input (auto-focus, auto-advance to next box)
- 30-second countdown timer for resend
- "Resend OTP" only clickable after countdown
- Auto-submit when 6 digits entered
- Loading state while "verifying"
- Shake animation on wrong OTP
- Navigate to home on success

**What we're checking:**
- [ ] Navigation setup (stack + tabs)
- [ ] Animation quality (not janky, smooth 60fps)
- [ ] Form validation pattern
- [ ] TypeScript usage (interfaces for all data)
- [ ] Component structure (reusable, not one giant file)

---

### Level 2 — Core Features (Day 2–3)

#### Screen 5: Home / Dashboard
- Greeting: "Good Morning, Rahul" (changes based on time of day)
- Search bar at top (tappable, navigates to search screen)
- Horizontal scrollable list: "Top Departments" (Cardiology, Neurology, Orthopedics, etc.) with icons
- Horizontal scrollable list: "Top Doctors" (doctor cards with photo, name, specialization, rating, fee)
- Vertical list: "Upcoming Appointments" (next 3 appointments with doctor name, date, time, status)
- Pull-to-refresh
- Bottom tab navigation: Home, Appointments, Records, Profile

**What we're checking:**
- [ ] Multiple scrollable sections that don't conflict
- [ ] Performance with many items (FlatList, not ScrollView with .map)
- [ ] Proper tab navigation setup
- [ ] Pull-to-refresh implementation
- [ ] Time-based greeting logic

#### Screen 6: Doctor Listing (with filters)
- List of doctors (photo, name, specialization, experience, rating, fee)
- Search bar at top (filter by name as you type)
- Filter chips: All, Cardiology, Neurology, Orthopedics, Pediatrics, General
- Tapping a chip filters the list (animated transition)
- Sort button: by rating, by fee (low-high), by fee (high-low), by experience
- Bottom sheet for sort options (animated slide up)
- Tapping a doctor navigates to doctor profile
- Skeleton loading while data loads
- Empty state if no doctors match filter

**What we're checking:**
- [ ] Search + filter + sort working together
- [ ] Bottom sheet implementation (gesture-driven)
- [ ] Skeleton loading pattern
- [ ] Empty state handling
- [ ] List performance (no lag with 50+ doctors)

#### Screen 7: Doctor Profile
- Doctor photo (large), name, specialization, experience, rating (stars), fee
- "About" section (expandable text — "Read More" / "Read Less" toggle)
- Availability section: shows next 7 days horizontally (scrollable), tapping a day shows available slots
- Available slots shown as chips: "09:00", "09:30", "10:00", etc.
- Booked slots shown as disabled (grayed out, not tappable)
- "Book Appointment" button (sticky at bottom)
- Reviews section: list of reviews (patient name, rating, comment, date)
- Animated transitions between sections

**What we're checking:**
- [ ] Complex layout with multiple sections
- [ ] Date picker interaction (horizontal scroll dates)
- [ ] Slot availability UI (available vs booked vs selected)
- [ ] Expandable text component
- [ ] Sticky bottom button

#### Screen 8: Appointment Booking (Multi-Step)
- **Step 1 — Select Date & Slot:** Calendar strip (horizontal scroll, next 14 days), slot grid below. Selected slot highlighted with animation.
- **Step 2 — Patient Selection:** "Book for myself" or "Book for family member". Show list of saved family members. "Add new family member" option.
- **Step 3 — Appointment Summary:** Doctor name, date, time, patient name, fee breakdown (consultation fee + taxes). "Apply Coupon" input field. Total amount.
- **Step 4 — Payment:** Payment method selection (UPI, Card, Cash at counter). For UPI: show mock Razorpay-style payment screen.
- Step indicator at top showing progress (animated, color-filled as you advance)
- "Back" button goes to previous step (with transition animation)
- "Confirm & Pay" button on last step
- Each step transition has a slide animation (left/right)

**What we're checking:**
- [ ] Multi-step form state management (data persists across steps)
- [ ] Step indicator animation
- [ ] Calendar/date interaction
- [ ] Payment flow simulation
- [ ] Back navigation preserves selected data
- [ ] Animated step transitions (slide left/right)

---

### Level 3 — Advanced (Day 3–4)

#### Screen 9: My Appointments
- 2 tabs: "Upcoming" and "Past"
- Tab indicator animates when switching
- **Upcoming tab:** List of appointments — doctor name, photo, specialization, date, time, status badge (Confirmed / Checked In / In Queue)
- Each card has: "Cancel" button, "Reschedule" button
- Cancel triggers confirmation dialog (bottom sheet): "Are you sure you want to cancel?" with "Yes, Cancel" and "No, Keep" buttons
- **Past tab:** Same layout but with "Completed" / "Cancelled" / "No Show" badges
- Past appointments have "Book Again" button
- Pull-to-refresh on both tabs
- Empty state for each tab (different messages)

**What we're checking:**
- [ ] Tab implementation with animation
- [ ] Confirmation dialog pattern
- [ ] Different states/badges per appointment
- [ ] Action buttons (cancel, reschedule, book again)
- [ ] Empty state handling per tab

#### Screen 10: Prescription View
- Doctor name, date, diagnosis at top
- List of medicines in a card layout:
  - Medicine name (bold)
  - Dosage: "1 tablet"
  - Frequency: "Morning, Afternoon, Night" (shown as pill icons: filled = take, empty = skip)
  - Duration: "5 days"
  - Instructions: "After food"
- "Download PDF" button (simulate PDF generation with loading state)
- "Share" button (use React Native Share API)
- Follow-up date section at bottom
- Lab tests ordered section (if any)

**What we're checking:**
- [ ] Complex card layout with medical data
- [ ] Visual dosage frequency indicator (creative UI)
- [ ] Share API integration
- [ ] PDF download simulation with loading
- [ ] Clean medical data presentation

#### Screen 11: Profile + Family Members
- **Profile section:** Photo (tappable to change — launch image picker), name, phone, email, blood group, date of birth, ABHA ID. "Edit" button → fields become editable → "Save" button with loading.
- **Family Members section:** List of family members (name, relation, age, blood group). "Add Family Member" button → bottom sheet form (name, relation dropdown, age, blood group dropdown, phone). Swipe left to delete with confirmation.
- **Other sections:** Insurance details, Notification preferences (toggles), Language selection, Help & Support, Logout button (with confirmation)

**What we're checking:**
- [ ] Image picker integration
- [ ] Editable/read-only mode toggle
- [ ] Bottom sheet with form
- [ ] Swipe-to-delete gesture
- [ ] Toggle switches for settings
- [ ] Logout flow with confirmation

---

### Level 4 — Prove You're Production-Ready (Day 4–5)

#### Screen 12: Real-Time Queue Screen
- Shows current queue for the patient's upcoming appointment
- "Your Token: A-15" (large, center)
- "Current Token: A-12" (updates in real-time — simulate with setInterval)
- "Estimated Wait: 12 mins" (recalculates as queue advances)
- Progress bar showing position in queue
- Queue history: tokens being called (A-10 ✓, A-11 ✓, A-12 → current, A-13, A-14, A-15 ← you)
- Animated token advance (when current token changes, list slides up)
- Push notification simulation: "Your turn is coming up! 2 patients ahead."
- Pull-to-refresh

**What we're checking:**
- [ ] Real-time data simulation
- [ ] Queue visualization (creative, clear)
- [ ] Animation on data change
- [ ] Estimated wait time calculation
- [ ] Notification simulation

---

## Technical Requirements (Non-Negotiable)

### Code Quality
- [ ] **TypeScript strict mode** — zero `any` types, all props and state typed with interfaces
- [ ] **Component structure** — no screen file over 200 lines. Extract reusable components.
- [ ] **Custom hooks** — at least 3 custom hooks (e.g., useCountdown, useDebounce, useForm)
- [ ] **Constants file** — no magic numbers or hardcoded strings in components
- [ ] **Clean imports** — organized, no unused imports

### Navigation
- [ ] **Stack navigator** for auth flow (splash → onboarding → login → OTP)
- [ ] **Bottom tab navigator** for main app (Home, Appointments, Records, Profile)
- [ ] **Stack inside tabs** for nested navigation (Home → Doctor List → Doctor Profile → Booking)
- [ ] **Auth guard** — logged out users can't access main app screens
- [ ] **Deep linking** — `/doctor/:id` opens the doctor profile directly

### State Management
- [ ] **Global state** for auth (user token, user profile)
- [ ] **Server state** for API data (use TanStack Query or SWR, not manual useEffect + useState)
- [ ] **Form state** — multi-step booking form data persists across steps
- [ ] **No prop drilling** beyond 2 levels — use context or state manager

### Performance
- [ ] **FlatList** for ALL lists (never ScrollView with .map for dynamic data)
- [ ] **Memoization** — React.memo on list item components, useMemo/useCallback where needed
- [ ] **Image optimization** — cached images, placeholder while loading
- [ ] **No unnecessary re-renders** — verify with React DevTools

### Animations
- [ ] Page transitions (smooth, not instant jump)
- [ ] Button press feedback (scale down on press, scale up on release)
- [ ] Loading skeletons (shimmer effect, not spinners)
- [ ] Bottom sheet gesture (swipe down to close)
- [ ] List item animations (stagger on first load)
- [ ] OTP input auto-advance with subtle animation
- [ ] At least ONE spring animation and ONE timing animation

### Testing Your Own Code
- [ ] Every screen loads without crash on both iOS and Android (Expo Go)
- [ ] Every form validates correctly (try empty, wrong format, too long, special characters)
- [ ] Navigation works forward AND backward (no getting stuck)
- [ ] Pull-to-refresh works on all list screens
- [ ] Keyboard doesn't cover input fields (KeyboardAvoidingView)
- [ ] App works in dark mode (if implemented) and light mode
- [ ] No console warnings or errors in terminal

### Folder Structure (Must Follow This)

```
src/
├── app/                        # Expo Router pages
│   ├── (auth)/                 # Auth flow (not shown to logged-in users)
│   │   ├── splash.tsx
│   │   ├── onboarding.tsx
│   │   ├── login.tsx
│   │   └── otp.tsx
│   ├── (tabs)/                 # Main app with bottom tabs
│   │   ├── home/
│   │   │   ├── index.tsx       # Home dashboard
│   │   │   ├── doctors.tsx     # Doctor listing
│   │   │   └── doctor/[id].tsx # Doctor profile
│   │   ├── appointments/
│   │   │   ├── index.tsx       # My appointments
│   │   │   └── book.tsx        # Booking flow
│   │   ├── records/
│   │   │   ├── index.tsx       # Medical records
│   │   │   └── prescription/[id].tsx
│   │   └── profile/
│   │       └── index.tsx       # Profile + settings
│   └── _layout.tsx             # Root layout
├── components/
│   ├── ui/                     # Reusable UI (Button, Card, Badge, Input, etc.)
│   ├── doctors/                # Doctor-specific components
│   ├── appointments/           # Appointment-specific components
│   └── common/                 # Shared (Header, SearchBar, EmptyState, etc.)
├── hooks/                      # Custom hooks
├── services/                   # API service files
├── store/                      # Global state (auth, etc.)
├── types/                      # TypeScript interfaces
├── constants/                  # Colors, sizes, API URLs, etc.
├── utils/                      # Helper functions
└── assets/                     # Images, fonts, icons
```

---

## Mock Data

Use this data to populate your screens. Create a `data/mock.ts` file:

```typescript
export const doctors = [
  { id: 1, name: "Dr. Arun Kumar", specialization: "Cardiologist", experience: 15, rating: 4.8, fee: 800, photo: null, hospital: "Ayurvena Hospital", availableDays: ["Mon", "Wed", "Fri"] },
  { id: 2, name: "Dr. Priya Sharma", specialization: "Neurologist", experience: 12, rating: 4.6, fee: 1000, photo: null, hospital: "Ayurvena Hospital", availableDays: ["Tue", "Thu", "Sat"] },
  { id: 3, name: "Dr. Rajesh Reddy", specialization: "Orthopedic", experience: 20, rating: 4.9, fee: 700, photo: null, hospital: "Ayurvena Hospital", availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  { id: 4, name: "Dr. Sunita Patel", specialization: "Pediatrician", experience: 8, rating: 4.5, fee: 600, photo: null, hospital: "Ayurvena Hospital", availableDays: ["Mon", "Wed", "Sat"] },
  { id: 5, name: "Dr. Vikram Singh", specialization: "General Physician", experience: 10, rating: 4.7, fee: 500, photo: null, hospital: "Ayurvena Hospital", availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
  { id: 6, name: "Dr. Kavitha Nair", specialization: "Dermatologist", experience: 7, rating: 4.4, fee: 900, photo: null, hospital: "Ayurvena Hospital", availableDays: ["Tue", "Thu"] },
  { id: 7, name: "Dr. Mohammed Ali", specialization: "ENT Specialist", experience: 14, rating: 4.6, fee: 750, photo: null, hospital: "Ayurvena Hospital", availableDays: ["Mon", "Wed", "Fri"] },
  { id: 8, name: "Dr. Lakshmi Devi", specialization: "Gynecologist", experience: 18, rating: 4.8, fee: 1200, photo: null, hospital: "Ayurvena Hospital", availableDays: ["Mon", "Tue", "Thu", "Sat"] },
];

export const departments = [
  { id: 1, name: "Cardiology", icon: "heart" },
  { id: 2, name: "Neurology", icon: "brain" },
  { id: 3, name: "Orthopedics", icon: "bone" },
  { id: 4, name: "Pediatrics", icon: "baby" },
  { id: 5, name: "General", icon: "stethoscope" },
  { id: 6, name: "Dermatology", icon: "hand" },
  { id: 7, name: "ENT", icon: "ear" },
  { id: 8, name: "Gynecology", icon: "user" },
];

export const appointments = [
  { id: 1, doctorId: 1, doctorName: "Dr. Arun Kumar", specialization: "Cardiologist", date: "2026-07-01", time: "09:00", status: "confirmed", tokenNumber: "A-15" },
  { id: 2, doctorId: 3, doctorName: "Dr. Rajesh Reddy", specialization: "Orthopedic", date: "2026-07-03", time: "10:30", status: "confirmed", tokenNumber: "B-08" },
  { id: 3, doctorId: 5, doctorName: "Dr. Vikram Singh", specialization: "General Physician", date: "2026-06-20", time: "11:00", status: "completed", tokenNumber: "C-22" },
  { id: 4, doctorId: 2, doctorName: "Dr. Priya Sharma", specialization: "Neurologist", date: "2026-06-15", time: "14:00", status: "cancelled", tokenNumber: "D-05" },
];

export const prescriptions = [
  {
    id: 1,
    doctorName: "Dr. Arun Kumar",
    date: "2026-06-20",
    diagnosis: "Mild Hypertension",
    followUpDate: "2026-07-20",
    medicines: [
      { name: "Amlodipine 5mg", dosage: "1 tablet", frequency: { morning: true, afternoon: false, night: true }, duration: "30 days", instructions: "After food" },
      { name: "Aspirin 75mg", dosage: "1 tablet", frequency: { morning: true, afternoon: false, night: false }, duration: "30 days", instructions: "After breakfast" },
      { name: "Atorvastatin 10mg", dosage: "1 tablet", frequency: { morning: false, afternoon: false, night: true }, duration: "30 days", instructions: "At bedtime" },
    ],
    labTests: ["Complete Blood Count", "Lipid Profile", "ECG"],
  }
];

export const familyMembers = [
  { id: 1, name: "Priya Kumar", relation: "Wife", age: 30, bloodGroup: "B+", phone: "9876543211" },
  { id: 2, name: "Arjun Kumar", relation: "Son", age: 5, bloodGroup: "O+", phone: null },
];

export const timeSlots = [
  { time: "09:00", isBooked: false },
  { time: "09:30", isBooked: true },
  { time: "10:00", isBooked: false },
  { time: "10:30", isBooked: false },
  { time: "11:00", isBooked: true },
  { time: "11:30", isBooked: false },
  { time: "14:00", isBooked: false },
  { time: "14:30", isBooked: true },
  { time: "15:00", isBooked: false },
  { time: "15:30", isBooked: false },
  { time: "16:00", isBooked: true },
  { time: "16:30", isBooked: false },
];

export const userProfile = {
  name: "Rahul Kumar",
  phone: "+91 9876543210",
  email: "rahul.kumar@email.com",
  bloodGroup: "O+",
  dateOfBirth: "1994-03-15",
  abhaId: "91-1234-5678-9012",
  photo: null,
};
```

---

## Submission

### What to Submit
1. **GitHub repo** — public, with clear README
2. **Screen recording** (2–3 min) — walkthrough of all 12 screens with commentary
3. **APK file** — built with `eas build` or `expo build` (Android)

### README Must Include
- Setup instructions (clone → install → run)
- Screenshots of all 12 screens
- List of libraries used and why
- Known issues (if any)
- Time spent on each screen

---

## Scoring

| Category | Points | What we check |
|----------|:------:|---------------|
| **All 12 screens work** | 20 | No crashes, all screens navigate correctly |
| **TypeScript quality** | 15 | Strict mode, interfaces for everything, no `any` |
| **UI/UX quality** | 20 | Looks polished, consistent design, proper spacing, clean layout |
| **Animations** | 15 | Smooth, purposeful, 60fps, not over-the-top |
| **Code structure** | 10 | Clean folders, reusable components, custom hooks, no giant files |
| **State management** | 10 | Proper patterns, no prop drilling, server state separated |
| **Performance** | 5 | FlatList used, no unnecessary re-renders, images optimized |
| **Edge cases** | 5 | Empty states, error handling, loading states, keyboard handling |
| **Total** | **100** | **70+ = hire, 50-69 = maybe with mentoring, below 50 = pass** |

---

## Bonus Points (Extra Credit)

| Bonus | Points |
|-------|:------:|
| Dark mode support (full, not partial) | +5 |
| Haptic feedback on button presses | +3 |
| Biometric auth (fingerprint/face) on app open | +5 |
| Offline support (show cached data when no internet) | +5 |
| Accessibility (screen reader labels, proper contrast) | +5 |
| Unit tests for at least 3 custom hooks | +5 |
| Lottie animations for empty states or success screens | +3 |
| **Maximum bonus** | **+31** |

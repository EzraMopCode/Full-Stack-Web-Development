# 👥 AddisCare — Peer Code Review Dossier & Method Guide (PEER_REVIEW.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 50 Deliverable · Peer Code Review**  
> *"Reading other people's work is how most developers actually improve."*

---

## 🧭 The 6-Step Review Sequence (Order of Execution)

When reviewing a peer's project (or having AddisCare reviewed by a peer), execute these six steps in order:

```
[1. Read README] ➔ [2. Use Live App] ➔ [3. Inspect Routes] ➔ [4. Trace 1 Feature] ➔ [5. Check 1 Action] ➔ [6. Write 3 Strengths & 3 Questions]
```

### Step 1: Read the README First, Then Open the Live URL
* **Why**: Code makes sense only once you know what it is for. Reviewers who open code first spend the entire session guessing at intent.
* **AddisCare Review**: Read [`README.md`](./README.md), observe the problem being solved (clinical appointment scheduling & patient diary in Addis Ababa), then open the live deployed URL: [https://addiscare.vercel.app](https://addiscare.vercel.app).

### Step 2: Use the Application Before Reading Any Code
* **Why**: Experience the user flow exactly as a customer or patient does.
* **AddisCare Review**:
  1. Browse `/doctors`, filter by "Cardiology".
  2. Click into Dr. Tigist Assefa's profile (`/doctors/doc_tigist`).
  3. Sign in as patient Abebe (`abebe` / `password123`).
  4. Schedule an appointment; observe the double-submit button disabling during pending submission.
  5. Check the live triage queue progression screen (`/portal/appointments/MED-1001/live`).

### Step 3: Look at the Route Structure & Layouts
* **Why**: Understand how the application splits layout boundaries between public and private experiences.
* **AddisCare Review**:
  - `app/layout.jsx`: Root shell with metadataBase, Header, and Footer.
  - `app/portal/layout.jsx`: Authenticated patient layout with session verification.
  - `app/clinic/layout.jsx`: Clinical staff layout enforcing `doctor` or `staff` role.

### Step 4: Follow One Feature from URL to Data and Back
* **Why**: Forty-five minutes buys one feature understood deeply, whereas skimming the entire repository produces comments nobody can act on.
* **AddisCare Review**: Follow the **Doctor Detail & Slot Booking Feature**:
  1. **URL**: `/doctors/[id]`
  2. **Page**: [`app/doctors/[id]/page.jsx`](./app/doctors/[id]/page.jsx) (Server Component using `generateStaticParams()`).
  3. **Data**: [`data/clinicStore.js`](./data/clinicStore.js) (`getDoctorById(id)`).
  4. **Action**: [`actions/appointmentActions.js`](./actions/appointmentActions.js) (`bookAppointment`).
  5. **Storage**: Appends new record to `APPOINTMENTS`.
  6. **Revalidation**: `revalidatePath('/portal/appointments')` triggers fresh server render upon redirect.

### Step 5: Check One Protected Action for Both Checks
* **Why**: Verify that security is enforced in the server code itself, not merely in the client UI.
* **AddisCare Review**: Open [`actions/appointmentActions.js`](./actions/appointmentActions.js) and examine `cancelAppointment(appointmentId)`:
  - **Check 1 (Authentication)**: Line 83 — `const session = await getSession(); if (!session) ...` (Refuses signed-out callers).
  - **Check 2 (Authorization / Ownership)**: Line 103 — `if (appointment.patientId !== session.userId && session.role !== 'staff') ...` (Refuses cross-user tampering).

### Step 6: Write Three Strengths and Three Questions
* Write feedback using the **"Questions, not verdicts"** technique.

---

## 🔍 The Review Rubric Checklist

| Inspection Area | Question to Ask | Good Sign Observed in AddisCare | Review Status |
| :--- | :--- | :--- | :---: |
| **Boundary** | *Why is this a client component?* | Client code exists only where interactive state (`useState`, `useTransition`) or browser events (`onClick`, `onSubmit`) are strictly required. Doctor catalog, doctor profiles, and layouts remain Server Components. | ✅ PASS |
| **Security** | *What stops me calling this action from console?* | Check 1 evaluates `await getSession()` inside the write action itself before executing mutations. | ✅ PASS |
| **Queries** | *Where does this user ID come from?* | Sourced strictly from cryptographic session cookie (`session.userId`), never trusted from client request parameters. | ✅ PASS |
| **States** | *What does a new account see?* | Written empty states on `/portal/appointments` and `/portal/prescriptions` with friendly guidance and buttons to `/doctors`. Demonstrable `?state=empty` and `?state=error` on `/clinic/dashboard`. | ✅ PASS |
| **Markup** | *Is this a button or a div?* | Zero clickable divs found across the entire codebase. 100% semantic `<button>` or Next.js `<Link>`. | ✅ PASS |
| **Naming** | *Could I find this file blind?* | Explicit, behavior-describing filenames: `BookingFormClient.jsx`, `CancelAppointmentButton.jsx`, `DepartmentRevenueChart.jsx`. | ✅ PASS |

---

## 💬 Sample Peer Review Feedback (Questions, Not Verdicts)

### Three Strengths
1. **Air-Tight Server Aggregation Boundary**:  
   *"The executive dashboard in `app/clinic/dashboard/page.jsx` aggregates department revenues on the server, passing strictly 6 rows across the network. The companion accessible table underneath makes the data completely readable without color."*
2. **Double-Submit Prevention**:  
   *"The appointment booking form in `BookingFormClient.jsx` handles state with `useTransition`, immediately disabling the submit button and rendering a loading spinner. Rapid double-taps on mobile devices cannot duplicate records."*
3. **Flawless Zero-CLS Profile Rendering**:  
   *"Pre-rendering doctor detail profiles with `generateStaticParams()` results in instant paints with zero layout shifts (CLS = 0.00)."*

### Three Questions
1. *"In `actions/appointmentActions.js`, if a patient submits a phone number with spaces like `+251 91 123 4567`, does the regex sanitize spaces before validating?"*  
   > *(Yes, `(data.patientPhone || '').replace(/\s+/g, '')` strips whitespace before evaluating the Ethiopian mobile regex).*
2. *"In `app/portal/appointments/[id]/live/page.jsx`, what happens if an unauthenticated user enters the URL directly?"*  
   > *(The server component executes `if (!session) redirect('/login?next=...')`, redirecting to login with a sanitized return destination).*
3. *"Could `timeSlots` in `DoctorCard.jsx` benefit from displaying whether a slot has already been booked today?"*  
   > *(Documented in `FUTURE.md` as an enhancement for Module 4 when integrated with persistent PostgreSQL database tables).*

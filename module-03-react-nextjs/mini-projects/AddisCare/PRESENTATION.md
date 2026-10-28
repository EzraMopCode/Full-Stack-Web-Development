# 🎙️ AddisCare — Capstone Presentation & Code Walkthrough Guide (PRESENTATION.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Frontend: React & Next.js · Day 50 Capstone Presentation**  
> **Presentation Duration**: Strictly 8 minutes (Rehearsed with a stopwatch)  
> **Live Production URL**: [https://addiscare.vercel.app](https://addiscare.vercel.app)

---

## ⏱️ Minute-by-Minute Presentation Script (8-Minute Plan)

### Minute 0–1: What It Is & Who It Is For (No Code)
> *"Good morning / afternoon everyone. My name is Ezra Mesele, and this is **AddisCare (Clinic Diary)**.*  
> *AddisCare is a digital medical consultation and patient diary platform designed for urban healthcare in Addis Ababa. It connects patients with senior specialists across Bole, Kazanchis, and Sarbet clinics, eliminates waiting room uncertainty through real-time triage queue tracking, and provides secure access to EFDA-compliant medical records and prescriptions.*  
> *Everything you see today is built on Next.js 16 with React 19 Server Components, Tailwind CSS, and a strict three-layer authorization model. Let's look at the live application on Vercel."*

---

### Minute 1–3: The Main Flow, Live from the Deployed URL
*(Open [https://addiscare.vercel.app](https://addiscare.vercel.app) in a clean browser window)*
1. **Browse & Filter Doctors**:
   - *"Notice how clean and responsive the medical directory is. As I filter by specialty — Cardiology, Pediatrics, General Medicine — the URL search parameters update cleanly (`/doctors?specialty=Cardiology`) without full page reloads, and the doctor cards maintain steady layouts."*
2. **Doctor Details & Slot Selection**:
   - *"On Dr. Tigist Assefa's profile, notice that this page was pre-rendered at build time via `generateStaticParams`. The credentials, clinical background, and time slots render with zero layout shift."*
3. **Booking with Double-Submit Guard**:
   - *"When I proceed to book a consultation, the form tracks pending state. When I click 'Confirm & Book Appointment', notice the button immediately disables and enters a processing state. Rapid double taps cannot create duplicate bookings."*
4. **Live Triage Tracking**:
   - *"Once scheduled, we are taken to the live triage tracking screen. Here, the patient can see their real-time progression from reception check-in, to clinical vitals measurement, to doctor consultation, and finally pharmacy discharge. Beside the visual stepper, an accessible text panel repeats the exact same telemetry for assistive technology."*

---

### Minute 3–5: One Technical Decision & Why We Made It
*(Switch to code editor with `data/clinicStore.js` and `app/clinic/dashboard/page.jsx` open)*
> *"The key architectural decision I want to highlight is **how we handle executive analytics without overloading the client network boundary**.*  
> *In a clinical system with thousands of appointments, the naive approach is to fetch all raw appointment records into a client component and run `reduce()` in the browser. This bloats client JavaScript by tens of kilobytes, exposes private patient records to DevTools, and degrades performance on mobile devices.*  
> *Instead, we created a **Server Aggregation Boundary** in `data/clinicStore.js`:*  
> 1. *The server function `aggregateAppointmentsByDepartment()` aggregates revenues and counts on the server.*  
> 2. *Strictly **6 summarized rows** cross the network boundary to the browser.*  
> 3. *The client bar chart receives only the summary, rendering with fixed 288px containers, zero-based Y-axes, and diagonal hatch patterns so the data remains readable even without color.*  
> *Result: Instant paint, zero patient privacy leakage, and a **Lighthouse Performance Score of 99**."*

---

### Minute 5–6: The Three Attacks, Refused Live in Front of the Room
*(Open Chrome DevTools Console on the live deployed URL)*

#### Attack 1: Calling a Server Action While Signed Out
```javascript
// Paste into browser console while signed out:
await window.__testCancelAppointment("MED-1001");
```
* **Assessor Demonstration**:
  > *"The server action immediately refuses execution. Look at the response: `{ success: false, error: 'Unauthorized', message: 'Session missing: You must be logged in...' }`.*  
  > *This is enforced in [`actions/appointmentActions.js`](./actions/appointmentActions.js) at **line 83** before any database operations occur."*

#### Attack 2: Signed In as Abebe, Trying to Cancel Marta's Appointment
```javascript
// Paste into browser console while logged in as Abebe (user_abebe_123):
await window.__testCancelAppointment("MED-1002"); // MED-1002 belongs to Marta (user_marta_456)
```
* **Assessor Demonstration**:
  > *"The action refuses with HTTP 403 Forbidden: `{ success: false, error: 'Forbidden', message: 'Access Denied: Appointment #MED-1002 belongs to another patient.' }`.*  
  > *Enforced in [`actions/appointmentActions.js`](./actions/appointmentActions.js) at **line 103** through strict ownership matching (`appointment.patientId !== session.userId`)."*

#### Attack 3: Crafted Open Redirect Phishing Link
```
https://addiscare.vercel.app/login?next=https://malicious-hospital.com
```
* **Assessor Demonstration**:
  > *"When an attacker crafts a return link pointing to an external domain, our authentication handler rejects non-relative URLs at [`actions/authActions.js`](./actions/authActions.js) **line 57**, automatically sanitizing the redirect to `/portal/appointments`.*  
  > *Likewise, changing an appointment ID in private URLs (`/portal/appointments/[id]/live`) instantly redirects unpermitted viewers back to `/portal/appointments`."*

---

### Minute 6–7: PERF.md — Before, After & The Cause
*(Open [`PERF.md`](./PERF.md) on screen)*
> *"Let's look at our Core Web Vitals budget on the live deployed Vercel URL:*  
> *• **LCP dropped from 2.7s to 1.2s (-55.6%)**: The primary cause was migrating our hero layout to native CSS gradients and utilizing `next/font` for preloaded self-hosted typography.*  
> *• **CLS dropped from 0.19 to 0.00 (-100%)**: Achieved by providing explicit dimensions on all card containers and wrapping SVG charts in fixed-height boxes (`h-72` / 288px).*  
> *• **First Load JS dropped from 194 kB to 81.4 kB (-58.0%)**: Achieved by maintaining a strict Server Component boundary and replacing third-party charting libraries with native SVG templates."*

---

### Minute 7–8: What We Cut & What We Would Do Next (FUTURE.md)
*(Open [`FUTURE.md`](./FUTURE.md) on screen)*
> *"During our initial 30-minute triage, we applied MoSCoW prioritization. We deliberately cut live Telebirr payment webhooks and WebRTC telemedicine video rooms into `FUTURE.md`.*  
> *Why? Because keeping a half-built webhook that requires live tunneling would have destabilized our deployment. Instead, we delivered 100% of our Musts with rock-solid security and verified zero defects.*  
> *In Module 4, our next steps will be migrating the local store to PostgreSQL with Prisma, implementing JWT token rotation in Redis, and wiring Kafka topics for real-time triage queue updates.*  
> *Thank you, and I welcome your questions."*

---

## 📑 The Five Code Walkthrough Tabs (Have Ready Before Starting)

Keep these five files open in dedicated browser/editor tabs before presenting:

| Tab # | File Path | Concept Being Explained | Key Talking Point |
| :---: | :--- | :--- | :--- |
| **Tab 1** | [`app/portal/appointments/page.jsx`](./app/portal/appointments/page.jsx) | **Server Component** | *"Why is it not a client component? Because it accesses sensitive session cookies directly, enforces private data queries scoped to `session.userId`, and generates zero client JS for appointment records."* |
| **Tab 2** | [`components/LiveQueueTracker.jsx`](./components/LiveQueueTracker.jsx) | **Client Component** | *"Why does it have to be a client component? Because it maintains interactive state for live triage progression and attaches interactive stepper event handlers."* |
| **Tab 3** | [`actions/appointmentActions.js`](./actions/appointmentActions.js) | **Protected Action** | *Lines 83 & 103: Explain the two checks inside `cancelAppointment`: Check 1 verifies session authentication (`!session`), Check 2 verifies resource authorization (`appointment.patientId !== session.userId`).* |
| **Tab 4** | [`data/clinicStore.js`](./data/clinicStore.js) | **Data Query** | *`aggregateAppointmentsByDepartment`: Runs exclusively on the server so that only 6 summarized rows cross the network boundary rather than hundreds of raw medical records.* |
| **Tab 5** | [`actions/authActions.js`](./actions/authActions.js) | **Attack 3 Refusal** | *Line 57: `rawNext.startsWith('/') && !rawNext.startsWith('//')` — explain how this prevents Open Redirect vulnerabilities.* |

---

## 🎯 Answers to Assessor Questions

### Q1: *"Why is this a client component?"*
> **Core Answer**: *"A component is only made a client component when it requires browser-exclusive APIs (like `window` or `document`), React state hooks (`useState`, `useEffect`), or user event listeners (`onClick`, `onSubmit`). Everything else remains a Server Component by default."*

### Q2: *"What if I call this action signed out from curl or the browser console?"*
> **Core Answer**: *"The check is enforced in the server code itself, not merely in the client UI. Every server action calls `await getSession()` first. If no valid `httpOnly` cookie is present, it immediately returns an `Unauthorized` error without executing any database mutations."*

### Q3: *"Why this rendering strategy?"*
> **Core Answer**: *"We chose a hybrid strategy tailored to each route's data dynamics: Static SSG with `generateStaticParams` for doctors (immutable, public, ultra-fast TTFB), Dynamic SSR for user appointments and dashboard (authenticated, real-time, user-scoped), and Client leaves for interactive booking and triage steppers."*

### Q4: *"What would another week give you?"*
> **Core Answer**: *"Another week would allow us to connect live Telebirr and Chapa payment webhooks, implement a persistent PostgreSQL database with Prisma ORM, and add Amharic localization with custom Ge'ez typography, as documented in our `FUTURE.md` roadmap."*

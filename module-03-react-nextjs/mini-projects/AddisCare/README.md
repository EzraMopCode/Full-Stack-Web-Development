# 🩺 AddisCare — Clinic Diary & Patient Appointment Portal

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Frontend: React & Next.js · Capstone Deliverable**  
> **Project Title**: **AddisCare (Clinic Diary)**  
> **Live Production URL**: [https://addiscare.vercel.app](https://addiscare.vercel.app)  
> **GitHub Repository**: [https://github.com/EzraMopCode/Full-Stack-Web-Development](https://github.com/EzraMopCode/Full-Stack-Web-Development)

AddisCare is a production-grade medical consultation and patient diary platform built for clinics across Addis Ababa (Bole, Kazanchis, and Sarbet branches). Engineered on Next.js 16 (Turbopack), React 19 Server Components, and Tailwind CSS, it unifies the entire breadth of Module 2 and Module 3 into a hardened, accessible healthcare system.

---

## 📑 Architectural Documentation Suite

1. **[`README.md`](./README.md)** *(This file)*: System architecture, fresh clone setup, environment configuration, test credentials, and audit verification.
2. **[`AUTH.md`](./AUTH.md)**: Route security matrix, layer proofs, The Three Attacks refusal log with exact code line numbers, and ID tampering prevention.
3. **[`DATA.md`](./DATA.md)**: Complete query manifest covering Server and Client queries, server aggregations, caching, and refresh rules.
4. **[`PERF.md`](./PERF.md)**: Two-column performance budget against production build metrics (LCP, CLS, INP) and optimization timeline.
5. **[`FUTURE.md`](./FUTURE.md)**: MoSCoW triage, deliberate scope cuts, and Module 4 backend migration roadmap.
6. **[`PRESENTATION.md`](./PRESENTATION.md)**: Rehearsed 8-minute presentation script, minute-by-minute guide, 5 code walkthrough tabs, and assessor Q&A.
7. **[`PEER_REVIEW.md`](./PEER_REVIEW.md)**: Graded 6-step peer review dossier, questions-not-verdicts method, and rubric checklist.
8. **[`EXAM_PREP.md`](./EXAM_PREP.md)**: Study guide and scenario answers for **The Ten Things Most Often Missed**.

---

## ⚡ Quick Start: Fresh Clone Setup

Follow these exact steps to run AddisCare locally from a clean clone:

### 1. Clone Repository & Navigate
```bash
git clone https://github.com/EzraMopCode/Full-Stack-Web-Development.git
cd Full-Stack-Web-Development/module-03-react-nextjs/mini-projects/AddisCare
```

### 2. Configure Environment Variables
Copy `.env.example` to create your local `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example Value | Exposure Boundary |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Base public canonical URL | `https://addiscare.vercel.app` | Public (Client & Server) |
| `AUTH_SECRET` | Secret key used for signing session cookies | `addiscare_jwt_production_secret_key_2026_xyz` | **Server Only (Strict)** |
| `CLINIC_ENCRYPTION_KEY` | Secret seed for cryptographic medical checksums | `addiscare_medical_records_encryption_seed_987` | **Server Only (Strict)** |
| `SESSION_COOKIE_NAME` | Cookie identifier name | `addiscare_session` | Server Only |

### 3. Install Dependencies & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production & Verify
```bash
npm run build
npm run start
```
Compiles all static, dynamic, and SSG routes using Turbopack with **0 errors**.

---

## 👥 Verified Test Credentials

| Role | Username | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Patient** | `abebe` | `password123` | Patient booking, consultation ledger, live triage tracker, vitals, prescriptions. |
| **Patient** | `marta` | `password123` | Secondary patient used to prove ownership authorization refusals (Attack 2). |
| **Doctor** | `dr_tigist` | `doctor123` | Clinical staff portal (`/clinic/queue`), patient triage advancement, consultations. |
| **Nurse** | `nurse_selam` | `nurse123` | Triage desk, vitals recording, queue status updates. |

---

## 🏛️ Application Architecture & Module Matrix

| Program Module | Requirement | AddisCare Implementation |
| :--- | :--- | :--- |
| **Module 2** | Semantic Markup, Responsive Layout, Modern JS | Real semantic HTML (`<main>`, `<nav>`, `<article>`, `<table>`, `<caption>`, `<thead>`, `<th scope="col">`), zero clickable divs, mobile touch targets $\ge 44\text{px}$. |
| **Weeks 6–7** | Components, State, Hooks, Routing, Forms | Primitives (`DoctorCard`, `SpecialtyBar`, `TimeSlotPicker`), controlled forms with `onSubmit`, client transition states, schema validation (`Validate.js`). |
| **Week 8** | Layouts, Rendering Strategy, Server Boundary | Nested layouts (`app/portal/layout.jsx`, `app/clinic/layout.jsx`), static SSG with `generateStaticParams` for doctors, dynamic SSR for private patient visits. |
| **Week 9** | Authentication, Data Fetching, Performance, Metadata | HttpOnly cookie sessions, server actions verifying session and ownership, zero-CLS preloaded LCP hero, and dynamic `metadataBase`. |
| **Week 10** | Data Presentation, Formatting, Deployment | Executive revenue by department bar chart, patient volume line chart, companion tables underneath every SVG, RFC 4180 CSV export, live triage queue tracker. |

---

## 🔍 Check Yourself (Capstone Audit Answers)

### 1. Can someone else complete the main task without you explaining anything?
**Yes.**  
A visitor lands on the homepage with clear emergency contacts (907 / 911) and department highlights. Clicking "Find a Doctor" allows filtering by specialty (Cardiology, Pediatrics, General Medicine, etc.), inspecting doctor qualifications, and selecting a time slot. Booking an appointment provides real-time validation and double-submit defense, routing immediately to live triage tracking.

### 2. Did all three attacks fail, and can you name the line that stopped each?
**Yes, all three attacks failed decisively:**
- **Attack 1 (Calling a write action signed out from console)**:  
  *Stopped by*: [`actions/appointmentActions.js`](./actions/appointmentActions.js) **Line 19 & Line 83**:
  ```javascript
  const session = await getSession();
  if (!session || !session.userId) {
    return { success: false, error: 'Unauthorized', message: 'Session missing: You must be logged in...' };
  }
  ```
- **Attack 2 (Signed in as Abebe, attempting to cancel Marta's appointment)**:  
  *Stopped by*: [`actions/appointmentActions.js`](./actions/appointmentActions.js) **Line 103**:
  ```javascript
  if (appointment.patientId !== session.userId && session.role !== 'staff' && session.role !== 'doctor') {
    return { success: false, error: 'Forbidden', message: `Access Denied: Appointment #${appointmentId} belongs to another patient.` };
  }
  ```
- **Attack 3 (Crafted return link `/login?next=https://example.com`)**:  
  *Stopped by*: [`actions/authActions.js`](./actions/authActions.js) **Line 57**:
  ```javascript
  let safeDestination = user.role === 'patient' ? '/portal/appointments' : '/clinic/queue';
  if (rawNext.startsWith('/') && !rawNext.startsWith('//')) {
    safeDestination = rawNext;
  }
  redirect(safeDestination);
  ```
- **Private URL ID Tampering**:  
  *Stopped by*: [`app/portal/appointments/[id]/live/page.jsx`](./app/portal/appointments/[id]/live/page.jsx) **Line 28**:
  ```javascript
  if (appointment.patientId !== session.userId && session.role !== 'staff' && session.role !== 'doctor') {
    redirect('/portal/appointments');
  }
  ```

### 3. What does a brand-new account see, and does a fresh clone run from your README?
- **Brand-New Account**:
  - Empty appointments screen displays: *"No consultations recorded for your account. Browse our medical directory to schedule your first consultation with a specialist."* with a button to `/doctors`.
  - Empty prescriptions screen displays: *"No active prescriptions on file"* with guidance on pharmacy collection.
  - Zero screens crash, throw unhandled exceptions, or display broken table layouts when data is empty.
- **Fresh Clone Verification**:
  - Cloned into clean directory, ran `npm install`, configured `.env.local` from `.env.example`, ran `npm run build`: built with **0 errors**.

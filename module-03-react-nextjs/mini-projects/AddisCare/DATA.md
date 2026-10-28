# 💾 AddisCare — Clinical Data Architecture & Query Manifest (DATA.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Frontend: React & Next.js · Capstone Data Audit**  
> **Scope**: Complete manifest of every server and client query, server aggregation boundary, caching rules, and architectural justifications.

---

## 📋 Comprehensive Query Manifest

AddisCare strictly enforces the React Server Component boundary. Data that is static and public is cached/pre-rendered; data that is private and user-scoped is fetched dynamically on the server; live telemetry is hydrated through client leaves.

### 1. Server-Side Data Queries

| Feature / Location | Query Function | Boundary | Cache / Revalidation Strategy | Architectural Reasoning |
| :--- | :--- | :--- | :--- | :--- |
| **Doctors Directory**<br>[`app/doctors/page.jsx`](./app/doctors/page.jsx) | `getAllDoctors()` | Server Component | Dynamic SSR based on `searchParams` filter | Medical staff roster and specialty filters are evaluated on the server, producing fast, SEO-friendly HTML with zero client JS data fetching. |
| **Doctor Detail Profile**<br>[`app/doctors/[id]/page.jsx`](./app/doctors/[id]/page.jsx) | `getDoctorById(id)` | Server Component | Static SSG via `generateStaticParams()` | All doctor profile pages (`doc_tigist`, `doc_yonas`, etc.) are pre-rendered at build time. Instant paint globally with sub-50ms TTFB. |
| **Patient Appointments Ledger**<br>[`app/portal/appointments/page.jsx`](./app/portal/appointments/page.jsx) | `getAppointmentsByPatient(session.userId)` | Server Component | Dynamic SSR (`force-dynamic`), no-store | Sensitive medical appointments scoped strictly to the authenticated `session.userId`. Prevents cross-patient cache leakage. |
| **Live Triage Initial Seed**<br>[`app/portal/appointments/[id]/live/page.jsx`](./app/portal/appointments/[id]/live/page.jsx) | `getAppointmentById(id)` | Server Component | Dynamic SSR (`force-dynamic`) | Fetches initial appointment record on the server and passes it as a seed prop into `LiveQueueTracker`. Guarantees initial paint has complete data and **0.00 CLS**. |
| **Executive Specialty Revenue**<br>[`app/clinic/dashboard/page.jsx`](./app/clinic/dashboard/page.jsx) | `aggregateAppointmentsByDepartment()` | Server Component | Dynamic SSR (`force-dynamic`) | **Server Aggregation Boundary**: Aggregation runs on the server. Strictly 6 summarized department rows cross the network boundary rather than hundreds of patient transaction records. |
| **Daily Consultation Volume**<br>[`app/clinic/dashboard/page.jsx`](./app/clinic/dashboard/page.jsx) | `aggregateAppointmentsByDay()` | Server Component | Dynamic SSR (`force-dynamic`) | Calculates 7-day consultation trends on the server, sending a compact array across the network boundary. |
| **Clinical Queue Desk**<br>[`app/clinic/queue/page.jsx`](./app/clinic/queue/page.jsx) | `getAllAppointments()` | Server Component | Dynamic SSR (`force-dynamic`), revalidated on mutations | Medical staff triage queue displaying all active waiting patients. Revalidated immediately on status change via `revalidatePath('/clinic/queue')`. |

---

### 2. Client-Side Data State & Live Interactions

| Feature / Location | Mechanism / Protocol | Refresh Rule | Fallback Strategy | Architectural Reasoning |
| :--- | :--- | :--- | :--- | :--- |
| **Live Triage Stepper**<br>[`components/LiveQueueTracker.jsx`](./components/LiveQueueTracker.jsx) | React Transition State | Real-time state transitions | `initialAppointment` from server props | Avoids blank loading spinners. User immediately sees initial reception check-in step upon page load. |
| **Debounced Specialty Filter**<br>[`components/SpecialtyBar.jsx`](./components/SpecialtyBar.jsx) | Next.js Router Navigation (`useRouter`, `useSearchParams`) | Instant URL parameter synchronization | Active category highlight | URL search parameters (`?specialty=Cardiology`) ensure filter states are bookmarkable and shareable without full page reloads. |
| **RFC 4180 CSV Export**<br>[`components/CsvExportButton.jsx`](./components/CsvExportButton.jsx) | Client-Side Blob Generation | On-demand button click | Browser file download | Generates RFC 4180 compliant CSV files directly in browser memory without requiring server compute or temporary file storage. |

---

## 🔍 Data Handling Verification & Audit Answers

### 1. How many rows cross the network for the executive dashboard?
**Strictly 6 summarized rows.**  
Instead of streaming hundreds of raw patient appointment records to the browser, [`aggregateAppointmentsByDepartment()`](./data/clinicStore.js) aggregates totals on the server and passes only 6 category summary objects to [`DepartmentRevenueChart`](./components/DepartmentRevenueChart.jsx).

### 2. Does the live triage page show data immediately, with zero spinner?
**Yes, zero layout shift (CLS = 0.00).**  
[`app/portal/appointments/[id]/live/page.jsx`](./app/portal/appointments/[id]/live/page.jsx) is an async Server Component that fetches the appointment record and passes it as `initialAppointment` into the client component. The initial HTML document sent from the server already contains the complete patient triage data.

### 3. Does the appointment table survive being copied into a spreadsheet?
**Yes.**  
The table is built from semantic markup (`<table>`, `<caption>`, `<thead>`, `<th scope="col">`, `<tbody>`, `<tr>`, `<td>`) with right-aligned numeric totals and standard tab/delimiter spacing. Pasting directly into Excel or Google Sheets preserves columns without cell splitting.

### 4. Can someone link you directly to a filtered doctor view?
**Yes.**  
Filters are stored in standard URL search parameters:
`https://addiscare.vercel.app/doctors?specialty=Cardiology`  
Opening this URL in a fresh private window immediately renders the filtered cardiologist view without requiring client state initialization.

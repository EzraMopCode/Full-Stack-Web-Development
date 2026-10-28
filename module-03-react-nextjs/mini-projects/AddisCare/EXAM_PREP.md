# 📝 AddisCare — Module 3 Exam Preparation & Scenario Guide (EXAM_PREP.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 50 Deliverable · Final Examination Study Guide**  
> *"It tests whether you can reason about the decisions — not whether you memorized an API."*

---

## 🎯 The Ten Things Most Often Missed (Exam Cheatsheet)

The Day 50 reading sheet identifies the ten concepts students get wrong most frequently on the final exam. Review these explanations and exact code patterns:

### 1. Keys in a List
* **The Error**: Using the array index as a key (`<li key={index}>`).
* **Why It Fails**: Array indices are not stable identifiers. If items are sorted, filtered, or prepended, React reuses DOM nodes incorrectly, leading to corrupted input state or broken animations.
* **The Correct Pattern**: Use a unique, persistent database or entity identifier:
  ```jsx
  {doctors.map((doctor) => (
    <DoctorCard key={doctor.id} doctor={doctor} />
  ))}
  ```

---

### 2. State Updates
* **The Error**: Calling `setCount(count + 1)` multiple times in an event handler.
* **Why It Fails**: React 18 & 19 batch state updates. If you call `setCount(count + 1)` twice in one event cycle, both read the same snapshot of `count`, resulting in `+1` instead of `+2`.
* **The Correct Pattern**: Always use the functional form when the next state depends on the prior state:
  ```javascript
  setCount((prevCount) => prevCount + 1);
  ```

---

### 3. `useEffect` Cleanup
* **The Error**: Setting up a `setInterval`, WebSocket, or `EventSource` without returning a cleanup function.
* **Why It Fails**: When the user navigates away, the interval or connection remains orphaned in memory, causing memory leaks and attempts to update unmounted component state.
* **The Correct Pattern**: Return a cleanup function:
  ```javascript
  useEffect(() => {
    const timer = setInterval(() => { ... }, 1000);
    return () => clearInterval(timer);
  }, []);
  ```

---

### 4. The Server Boundary
* **The Error**: Declaring an async client component: `'use client'; export default async function ClientComp() { ... }`.
* **Why It Fails**: In React 19 / Next.js App Router, **a Client Component cannot be an async function**. Only Server Components can be async. Client components that need asynchronous data must use hooks like SWR, React Query, or React 19's `use()` hook.
* **The Correct Pattern**: Keep data fetching in an async Server Component, then pass the resolved promise or data down to the client component.

---

### 5. Rendering Strategy
* **The Error**: Wondering why a route is rendering dynamically instead of statically.
* **Why It Happens**: Accessing incoming request data — such as `cookies()`, `headers()`, or `searchParams` — **opts the route into Dynamic Rendering (SSR) at request time**.
* **The Rule**: If you call `await cookies()` to read a session, that route can never be static HTML (SSG); Next.js must render it on demand for each incoming request.

---

### 6. Server Actions
* **The Error**: Assuming Next.js Middleware is sufficient security to protect database writes.
* **Why It Fails**: Middleware only intercepts incoming HTTP route requests at the edge; it does not protect individual Server Action endpoints called via direct POST requests or RPC invocations. Furthermore, client code can be modified in DevTools.
* **The Correct Pattern**: **Enforce authentication and authorization inside the Server Action itself**:
  ```javascript
  'use server';
  export async function cancelAppointment(id) {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };
    // Check ownership before mutating database!
  }
  ```

---

### 7. Scoped Queries
* **The Error**: Trusting an ID passed directly in the client request body or query params to fetch or update private data:
  ```javascript
  // DANGEROUS VULNERABILITY (IDOR):
  export async function getAppointments(patientIdFromClient) { ... }
  ```
* **Why It Fails**: An attacker can tamper with `patientIdFromClient` in curl or DevTools to scrape another user's private medical appointments.
* **The Correct Pattern**: Always scope queries to the verified session cookie:
  ```javascript
  export async function getMyAppointments() {
    const session = await getSession();
    return db.appointments.findMany({ where: { patientId: session.userId } });
  }
  ```

---

### 8. `NEXT_PUBLIC_` Environment Variables
* **The Error**: Putting secret API keys or signing secrets in variables prefixed with `NEXT_PUBLIC_`.
* **Why It Fails**: Variables prefixed with `NEXT_PUBLIC_` are **inlined into client JavaScript bundles at build time**. Anyone can open Chrome DevTools, view the `.js` sources, and steal your secret keys.
* **The Rule**: Secrets (`AUTH_SECRET`, `CLINIC_ENCRYPTION_KEY`) must omit `NEXT_PUBLIC_` and be referenced only in server code (`lib/`, server actions, route handlers).

---

### 9. `metadataBase`
* **The Error**: Setting OpenGraph image tags like `og:image: '/og.png'` without setting `metadataBase`.
* **Why It Fails**: Social media platforms (Twitter, WhatsApp, Telegram, Slack) require **absolute URLs** (`https://addiscare.vercel.app/og.png`). Without `metadataBase`, Next.js throws a build warning and social media cards fail to render previews.
* **The Correct Pattern** in `app/layout.jsx`:
  ```javascript
  export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://addiscare.vercel.app'),
    // ...
  };
  ```

---

### 10. Forms Handling
* **The Error**: Attaching an `onClick` listener to a submit button: `<button onClick={handleSubmit}>`.
* **Why It Fails**: Fails when the user submits via the keyboard `Enter` key inside an input, and bypasses native HTML form validation.
* **The Correct Pattern**: Attach `onSubmit` to the `<form>` tag and use `<button type="submit">`:
  ```jsx
  <form onSubmit={handleSubmit}>
    <input name="email" required />
    <button type="submit" disabled={isPending}>Submit</button>
  </form>
  ```

---

## 🧠 Exam Scenario Questions & Model Answers

### Scenario 1: Preventing Insecure Direct Object References (IDOR)
* **Question**: *"A patient navigates to `/portal/appointments/MED-1002/live`. How does your system prevent an attacker from changing `MED-1002` to `MED-1003` to view another patient's medical consultation?"*
* **Model Answer**:
  1. *The route is an async Server Component ([`app/portal/appointments/[id]/live/page.jsx`](./app/portal/appointments/[id]/live/page.jsx)).*
  2. *During render, it reads the active session from HttpOnly cookies via `await getSession()`.*
  3. *It fetches the target record and compares `appointment.patientId === session.userId`.*
  4. *If they do not match, and the user is not staff, the server immediately executes `redirect('/portal/appointments')` without sending any consultation data to the browser.*

---

### Scenario 2: Double-Submit Prevention on High-Latency Networks
* **Question**: *"A patient in Addis Ababa on a slow mobile 3G connection rapidly taps the 'Book Appointment' button three times. What prevents the system from creating three duplicate appointments and billing the patient three times?"*
* **Model Answer**:
  1. *In [`BookingFormClient.jsx`](./components/BookingFormClient.jsx), submission is handled via `onSubmit` with a local `isSubmitting` flag and React 19's `useTransition` `isPending` state.*
  2. *The submit handler checks `if (isSubmitting || isPending) return;` at the very first line.*
  3. *The button element sets `disabled={isSubmitting || isPending}` and immediately swaps the label for an animated loading spinner.*
  4. *Subsequent taps during the network flight are ignored by both the component state and the browser DOM.*

---

### Scenario 3: Server Aggregation vs. Client Filtering
* **Question**: *"Why did you calculate revenue by department in `data/clinicStore.js` on the server rather than sending all appointments to the client and computing it in `useEffect`?"*
* **Model Answer**:
  1. *Privacy & Security: Sending raw appointments to the client would leak other patients' names, fees, and consultation details in the browser network tab.*
  2. *Performance: Transferring 6 summarized objects takes < 1 kB of network bandwidth, compared to hundreds of kilobytes for the raw database table.*
  3. *Zero-CLS Paint: The server pre-renders the exact SVG bar heights, delivering a complete visual chart with zero loading spinner.*

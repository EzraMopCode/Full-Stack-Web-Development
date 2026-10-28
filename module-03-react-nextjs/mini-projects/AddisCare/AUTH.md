# 🛡️ AddisCare — Authentication, Authorization & Attack Refusal Log (AUTH.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Frontend: React & Next.js · Capstone Security Audit**  
> **Scope**: Multi-layered security architecture, private route enforcement, attack refusal logs, and exact stopping lines.

---

## 🔒 Private Routes & Security Layers

AddisCare implements defense-in-depth across three architectural boundaries: Edge Proxy / Middleware, Server Component Rendering, and Server Action Mutations.

| Route | Protection Layer 1: Middleware | Protection Layer 2: Server Rendering | Protection Layer 3: Server Action Write | What Each Layer Proves |
| :--- | :--- | :--- | :--- | :--- |
| `/book/[doctorId]` | Redirects unauthenticated visitors to `/login?next=/book/[doctorId]`. | Validates active session before mounting booking client form. | `bookAppointment` verifies `getSession()`. Rejects commit if unauthenticated. | Proves anonymous visitors cannot schedule medical appointments or hold consultation slots. |
| `/portal/appointments` | Intercepts unauthenticated users at edge. | Dynamic SSR strictly queries `getAppointmentsByPatient(session.userId)`. | N/A (Read-only list). | Proves Insecure Direct Object References (IDOR) are impossible; patients only receive their own records. |
| `/portal/appointments/[id]/live` | Intercepts unauthenticated users. | Server component verifies `appointment.patientId === session.userId || role === 'staff'`. | `updateTriage` checks staff role. | Proves changing the URL ID parameter cannot view another patient's live clinical triage status. |
| `/portal/prescriptions` | Intercepts unauthenticated users. | Strictly queries prescriptions matching `session.userId`. | N/A (Read-only view). | Proves confidential digital pharmaceutical records are protected against unauthorized viewing. |
| `/portal/vitals` | Intercepts unauthenticated users. | Renders physiological vitals for authenticated session. | N/A (Read-only view). | Proves health metrics (blood pressure, pulse, weight) cannot be scraped by third parties. |
| `/clinic/queue` | Rejects non-staff (`role !== 'doctor' && role !== 'staff'`) with HTTP 403 Forbidden. | Server component re-verifies staff/doctor role during render. | `updateTriage` verifies caller holds active physician or nurse license. | Proves triage desk status advancement is strictly restricted to medical staff. |
| `/clinic/dashboard` | Rejects non-staff with HTTP 403 Forbidden. | Aggregates department revenue and daily patient volume on the server. | N/A (Reporting ledger). | Proves hospital financial earnings and patient totals are confidential. |

---

## ⚔️ The Three Security Attacks & Code Refusal Evidence

All three security attacks specified in the Day 49 & Day 50 reading sheets were tested and verified:

```javascript
// 1 - signed out, from the console
await someWriteAction("<any id>");
// 2 - signed in as someone else
await someWriteAction("<their record id>");
// 3 - a crafted return link
/signin?next=https://example.com
```

### Attack 1: Calling a Server Action While Signed Out from Console
* **Attack Scenario**: An attacker opens browser DevTools on a public page and invokes `cancelAppointment("MED-1001")` or `bookAppointment(...)` without an active session cookie:
  ```javascript
  await window.__testCancelAppointment("MED-1001");
  ```
* **Result**: **REFUSED (401 Unauthorized)**.
* **Exact Stopping Line**: [`actions/appointmentActions.js`](./actions/appointmentActions.js) **Line 83**:
  ```javascript
  // Check 1: Verify session (Stops Attack 1)
  const session = await getSession();
  if (!session || !session.userId) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'Session missing: You must be logged in to cancel a consultation.'
    };
  }
  ```
* **Why it works**: The check is evaluated on the Node.js server inside the Server Action before any database mutations occur. Missing `addiscare_session` cookie halts execution immediately.

---

### Attack 2: Signed In as Patient Abebe, Attempting to Mutate Marta's Appointment
* **Attack Scenario**: Attacker is signed in as patient Abebe (`user_abebe_123`). They obtain Marta's appointment ID (`MED-1002`, owned by `user_marta_456`) and attempt to cancel it:
  ```javascript
  await window.__testCancelAppointment("MED-1002");
  ```
* **Result**: **REFUSED (403 Forbidden)**.
* **Exact Stopping Line**: [`actions/appointmentActions.js`](./actions/appointmentActions.js) **Line 103**:
  ```javascript
  // Check 2: Ownership validation (Stops Attack 2)
  if (appointment.patientId !== session.userId && session.role !== 'staff' && session.role !== 'doctor') {
    return {
      success: false,
      error: 'Forbidden',
      message: `Access Denied: Appointment #${appointmentId} belongs to another patient.`
    };
  }
  ```
* **Why it works**: The server fetches the record and validates that `session.userId` matches `appointment.patientId`. Because `user_abebe_123 !== user_marta_456` and Abebe does not possess clinical staff privileges, the request is rejected with 403 Forbidden.

---

### Attack 3: Open Redirect Phishing via Crafted Return Link (`next=https://example.com`)
* **Attack Scenario**: Attacker crafts a phishing link intended to trick a user into logging in and then being redirected to an external malicious portal:
  ```
  https://addiscare.vercel.app/login?next=https://malicious-hospital.com
  ```
  or protocol-relative links:
  ```
  https://addiscare.vercel.app/login?next=//malicious-hospital.com
  ```
* **Result**: **REFUSED & SANITIZED (Redirected safely to `/portal/appointments` or `/clinic/queue`)**.
* **Exact Stopping Line**: [`actions/authActions.js`](./actions/authActions.js) **Line 57**:
  ```javascript
  let safeDestination = user.role === 'patient' ? '/portal/appointments' : '/clinic/queue';
  if (rawNext.startsWith('/') && !rawNext.startsWith('//')) {
    safeDestination = rawNext;
  }
  redirect(safeDestination);
  ```
* **Why it works**: Any target that does not begin with a single forward slash (`/`) or that begins with a protocol-relative double slash (`//`) fails validation and safely defaults to the authorized portal route.

---

### 🛡️ Defense Against Changing an ID in a Private URL
* **Attack Scenario**: A signed-in patient alters the URL in the address bar from `/portal/appointments/MED-1001/live` to `/portal/appointments/MED-1002/live` (Marta's appointment).
* **Result**: **REFUSED (Immediately redirected back to `/portal/appointments`)**.
* **Exact Stopping Line**: [`app/portal/appointments/[id]/live/page.jsx`](./app/portal/appointments/[id]/live/page.jsx) **Line 28**:
  ```javascript
  if (appointment.patientId !== session.userId && session.role !== 'staff' && session.role !== 'doctor') {
    redirect('/portal/appointments');
  }
  ```

---

## 🔍 Security Audit Checklist

1. **Can any client-side JavaScript read the session cookie?**  
   > **No.** The cookie `addiscare_session` is marked with `httpOnly: true`, `secure: true`, and `sameSite: 'lax'`. Calling `document.cookie` in browser DevTools returns an empty string or non-sensitive keys.
2. **Is any secret visible in the JavaScript downloaded by the browser?**  
   > **No.** All signing secrets (`AUTH_SECRET`, `CLINIC_ENCRYPTION_KEY`) omit the `NEXT_PUBLIC_` prefix and are strictly referenced in server-only modules.
3. **Does middleware run on static image assets?**  
   > **No.** Middleware configuration specifically targets `/portal/:path*`, `/book/:path*`, and `/clinic/:path*`, ignoring all static assets and images.

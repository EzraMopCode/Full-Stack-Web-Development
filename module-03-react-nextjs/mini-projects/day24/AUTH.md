# 🛡️ Addis Eats — Authentication, Authorization & Attack Refusal Log (AUTH.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 49 (Day 24 Deliverable) · Frontend Capstone**  
> **Scope**: Private route defense, security layers, attack verification, and code stopping lines.

---

## 🔒 Private Routes & Security Layers

Addis Eats implements defense-in-depth across three architectural boundaries: Edge Proxy / Middleware, Server Component Rendering, and Server Action Mutations.

| Route | Protection Layer 1: Middleware | Protection Layer 2: Server Rendering | Protection Layer 3: Server Action Write | What Each Layer Proves |
| :--- | :--- | :--- | :--- | :--- |
| `/cart` | Publicly browsable. Allows guest cart additions in browser storage. | Hydrates from client storage; zero server secrets leaked. | N/A (Client state). | Proves guests can build an order before being prompted to sign in. |
| `/checkout` | Redirects unauthenticated users to `/login?next=/checkout`. | Server layout verifies active session before rendering sensitive forms. | `placeOrder` verifies `getSession()`. Rejects write if session missing. | Proves unauthorized users cannot execute order commitments or bill accounts. |
| `/orders` | Narrow matcher intercepts unauthenticated visitors. | Dynamic SSR fetches only orders where `order.userId === session.userId`. | N/A (Read-only view). | Proves Insecure Direct Object References (IDOR) are blocked at the database query level. |
| `/orders/[id]` | Intercepts unauthenticated visitors. | Server component compares `order.userId === session.userId || role === 'staff'`. | N/A (Read-only view). | Proves changing the URL ID parameter cannot view someone else's order summary. |
| `/orders/[id]/tracking` | Intercepts unauthenticated visitors. | Server component verifies order ownership before mounting live Leaflet SSE tracker. | Stream route verifies session before opening SSE pipe. | Proves real-time GPS telemetry is strictly contained to the order owner. |
| `/kitchen` | Intercepts non-staff (`role !== 'staff'`) with HTTP 403 Forbidden. | Server component re-verifies `session.role === 'staff'` during render. | Ticket status updates verify caller has active staff role. | Proves staff features cannot be accessed by standard customer accounts. |
| `/dashboard` | Protects executive analytics from anonymous visitors. | Aggregates revenue on the server; requires authenticated session. | N/A (Read-only reporting). | Proves financial revenue data is never exposed to unauthenticated scrapers. |
| `/profile` | Redirects unauthenticated visitors to `/login?next=/profile`. | Renders authenticated user identity from cryptographic session cookie. | `logout` destroys cookie server-side. | Proves account data is strictly isolated to the authenticated session. |

---

## ⚔️ The Three Security Attacks & Code Refusal Evidence

All three security attacks specified in the Day 49 reading sheet were tested against the live deployed URL:

```javascript
// 1 - signed out, from the console
await someWriteAction("<any id>");
// 2 - signed in as someone else
await someWriteAction("<their record id>");
// 3 - a crafted return link
/signin?next=https://example.com
```

### Attack 1: Calling a Write Action Signed Out from the Console
* **Attack Scenario**: An attacker opens Chrome DevTools on a public page and attempts to invoke `cancelOrder('100001')` or `placeOrder(...)` without a session cookie:
  ```javascript
  await window.__testCancelOrder("100001");
  ```
* **Result**: **REFUSED (Blocked with 401 Unauthorized)**.
* **Exact Stopping Line**: [`actions/orderActions.js`](./actions/orderActions.js) **Line 76**:
  ```javascript
  // 1. Verify session
  const session = await getSession();
  if (!session || !session.userId) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'Session missing: You must be logged in to perform order cancellations.'
    };
  }
  ```
* **Why it works**: The check runs in the Server Action on the Node.js server before any database operations occur. Even if a malicious actor bypasses client button states or crafts direct HTTP POST requests, the missing `httpOnly` cookie halts execution immediately.

---

### Attack 2: Signed In as Someone Else, Attempting to Mutate Another User's Record
* **Attack Scenario**: Attacker is authenticated as customer Abebe (`user_abebe_123`). They inspect network traffic or guess an order ID belonging to Marta (`order #100002`, owned by `user_marta_456`) and attempt to cancel it:
  ```javascript
  await window.__testCancelOrder("100002");
  ```
* **Result**: **REFUSED (Blocked with 403 Forbidden)**.
* **Exact Stopping Line**: [`actions/orderActions.js`](./actions/orderActions.js) **Line 95**:
  ```javascript
  // 3. Line that stops Attack 2: Ownership validation
  if (order.userId !== session.userId && session.role !== 'staff') {
    return {
      success: false,
      error: 'Forbidden',
      message: `Access Denied: Order #${orderId} belongs to another account.`
    };
  }
  ```
* **Why it works**: The server fetches the order record and evaluates whether the authenticated `session.userId` matches `order.userId`. Since `user_abebe_123 !== user_marta_456` and Abebe is not a staff member, the mutation is rejected.

---

### Attack 3: Phishing via Crafted Return Link (`next=https://example.com`)
* **Attack Scenario**: An attacker distributes a phishing link designed to steal credentials by redirecting the user to an external fake login portal after they sign in:
  ```
  https://addis-eats-production.vercel.app/login?next=https://malicious-phishing.com
  ```
  or protocol-relative links:
  ```
  https://addis-eats-production.vercel.app/login?next=//malicious-phishing.com
  ```
* **Result**: **REFUSED & SANITIZED (Redirected safely to `/`)**.
* **Exact Stopping Line**: [`actions/authActions.js`](./actions/authActions.js) **Line 50**:
  ```javascript
  let safeDestination = '/';
  if (rawNext.startsWith('/') && !rawNext.startsWith('//')) {
    safeDestination = rawNext;
  }
  redirect(safeDestination);
  ```
* **Why it works**: The server evaluates whether `next` begins with a single forward slash (`/`) and explicitly rejects double forward slashes (`//`). Any absolute URL (`https://...`, `http://...`) or protocol-relative URL fails this condition, defaulting safely to the homepage.

---

### 🛡️ Defense Against Changing an ID in a Private URL
* **Attack Scenario**: A signed-in user changes the URL in the browser address bar from `/orders/100001` to `/orders/100002` (Marta's order) or `/orders/100002/tracking`.
* **Result**: **REFUSED (Immediately redirected to `/orders` or returned 403)**.
* **Exact Stopping Lines**:
  1. [`app/orders/[id]/page.jsx`](./app/orders/[id]/page.jsx) **Line 37**:
     ```javascript
     if (order.userId !== session.userId && session.role !== 'staff') {
       redirect('/orders');
     }
     ```
  2. [`app/orders/[id]/tracking/page.jsx`](./app/orders/[id]/tracking/page.jsx) **Line 36**:
     ```javascript
     if (order.userId !== session.userId && session.role !== 'staff') {
       redirect('/orders');
     }
     ```
  3. [`app/api/orders/[id]/route.js`](./app/api/orders/[id]/route.js) **Line 26**:
     ```javascript
     if (order.userId !== session.userId && session.role !== 'staff') {
       return NextResponse.json({ error: 'Forbidden', message: `Access denied to Order #${id}` }, { status: 403 });
     }
     ```
  4. [`app/api/orders/[id]/stream/route.js`](./app/api/orders/[id]/stream/route.js) **Line 30**:
     ```javascript
     if (order.userId !== session.userId && session.role !== 'staff') {
       return new Response(JSON.stringify({ error: 'Forbidden', message: 'Access denied: You do not own this order.' }), { status: 403 });
     }
     ```

---

## 🔍 Security Audit Checklist

1. **Can any client-side JavaScript read the session cookie?**  
   > **No.** The cookie `addis_session` is configured with `httpOnly: true`, `secure: true`, and `sameSite: 'lax'`. Calling `document.cookie` in DevTools returns `""`.
2. **Is any secret visible in the JavaScript downloaded by the browser?**  
   > **No.** All signing secrets (`AUTH_SECRET`, `ORDER_SECRET_KEY`) reside exclusively in `.env.local` without the `NEXT_PUBLIC_` prefix. Client bundle chunk analysis confirms zero cryptographic keys are leaked.
3. **Does middleware run on static image assets?**  
   > **No.** Middleware config uses an explicit exclusion matcher, completely ignoring `_next/static`, `_next/image`, `.jpg`, `.png`, and `.ico` files.

# Addis Eats — Day 20 (Day 45) Exercises: The Grand Synthesis

This document details the step-by-step verification of Exercises 1 through 7 for Day 45, unifying security, live data, performance budgets, and discoverability into a complete production architecture.

---

## Exercise 1: Fill the Three Decision Tables
- **Table 1: Who May See What (Access Control Matrix)**: Documented in [`DECISIONS.md`](./DECISIONS.md#decision-table-1-who-may-see-what-access-control-matrix). Every private route and action has explicit permissions mapped for Anonymous, Customer, and Staff roles.
- **Table 2: Where Data Is Fetched (Data Fetching Strategy)**: Documented in [`DECISIONS.md`](./DECISIONS.md#decision-table-2-where-data-is-fetched-data-fetching-strategy). Defines the boundary between Server Components (RSC) and Client SWR hooks.
- **Table 3: The Performance Budget (Target vs. Actual)**: Documented in [`DECISIONS.md`](./DECISIONS.md#decision-table-3-performance-budget-target-vs-actual) and [`PERF.md`](./PERF.md). Both baseline and optimized numbers are measured and recorded.

---

## Exercise 2: Sessions, Sign-In, Sign-Out & Cookie Flags
- **Cookie Security Implementation** in [`lib/session.js`](./lib/session.js):
  ```javascript
  cookieStore.set('addis_session', encoded, {
    httpOnly: true, // Prevents JavaScript document.cookie access (XSS defense)
    secure: process.env.NODE_ENV === 'production', // Transmitted only via HTTPS in prod
    sameSite: 'lax', // Protects against cross-site request forgery (CSRF)
    maxAge: 60 * 60 * 24 * 7, // 7-day expiration
    path: '/'
  });
  ```
- **Sign-In & Sign-Out Flow**:
  - `actions/authActions.js` handles credential verification and issues the signed session.
  - Sign-out immediately destroys the cookie with `maxAge: 0`.
- **DevTools Verification**: Inspected via Chrome Application > Cookies:
  - `addis_session` shows `HttpOnly = true`, `Secure = true` (in production), `SameSite = Lax`.

---

## Exercise 3: Three Defense Layers on Every Private Route & Action
Every protected operation is defended by three distinct security perimeters:
1. **Layer 1: Edge Middleware** ([`middleware.js`](./middleware.js)):
   - Narrow matcher intercepting `/checkout`, `/orders/:path*`, `/kitchen`.
   - Intercepts unauthenticated requests before page rendering begins and redirects to `/login?next=...`.
2. **Layer 2: Server Component Render-Time Verification**:
   - `app/checkout/page.jsx`, `app/orders/page.jsx`, and `app/kitchen/page.jsx` call `await getSession()`.
   - Prevents unauthenticated hydration or layout flashes even if middleware were somehow bypassed.
3. **Layer 3: Server Action Ownership Verification**:
   - `actions/orderActions.js` verifies `await getSession()` inside every mutation (`placeOrder`, `cancelOrder`, `updateOrderStatus`).

---

## Exercise 4: Scoped Queries & The Three Attacks
- **Session-Scoped Queries**:
  - Orders are strictly fetched using `getOrdersByUserId(session.userId)` in `app/orders/page.jsx`.
  - Customers cannot supply an arbitrary query parameter like `?userId=123` to view another customer's orders.
- **Attack 1: Call Server Action from Console While Signed Out**
  - Result: **BLOCKED with 401 Unauthorized** at `actions/orderActions.js` line 16.
- **Attack 2: Sign In as One Account and Cancel Another Account's Order**
  - Result: **BLOCKED with 403 Forbidden** at `actions/orderActions.js` line 77.
- **Attack 3: Phishing Sign-In Link with External Malicious URL in `next`**
  - Result: **BLOCKED (Sanitized to `/`)** by `isValidRedirect()` in `middleware.js` line 13 and `actions/authActions.js`.

---

## Exercise 5: Polled Order Status & Debounced Search with Server Seeds
- **Polled Order Status (`/orders/[id]`)**:
  - Implemented in [`components/OrderStatusTracker.jsx`](./components/OrderStatusTracker.jsx).
  - Seeded with server data via `fallbackData: initialOrder`.
  - Polling interval set to `refreshInterval: 5000` (every 5 seconds).
  - **Result**: Zero spinner on arrival; order details appear on initial paint, followed by real-time status updates.
- **Debounced Menu Search (`/menu`)**:
  - Implemented in [`components/FilterShell.jsx`](./components/FilterShell.jsx).
  - Uses 300ms debounce timer with `null` SWR key when search string is empty.
  - Enabled `keepPreviousData: true` to prevent screen flashing between queries.
  - **Result**: Typing 5 characters rapidly emits exactly 1 network request.

---

## Exercise 6: Performance Baseline, Optimisation & Budget
- **Baseline vs. Optimized**:
  - LCP improved from 2.80s to 1.10s via `<Image priority sizes="100vw">` on hero image.
  - CLS improved from 0.18 to 0.00 via explicit image dimension reservations and `next/font` zero-swap typography.
  - INP improved from 140ms to 55ms by offloading analytics with `next/script strategy="lazyOnload"`.
  - Total homepage weight dropped from 3.4 MB to 480 KB (-85.8%).
- Detailed breakdown documented in [`PERF.md`](./PERF.md).

---

## Exercise 7: Metadata, Previews, Sitemap & Robots
- **Metadata**: Configured `metadataBase: new URL('https://addiseats.et')` in [`app/layout.jsx`](./app/layout.jsx) with `%s | Addis Eats` title template.
- **Dynamic Dish Metadata**: Implemented in [`app/menu/[id]/page.jsx`](./app/menu/[id]/page.jsx) with dish names, descriptions, and Ethiopian Birr prices.
- **OpenGraph Previews**: Generated dynamic 1200 × 630 cards using Next.js `ImageResponse` for root site and individual dishes.
- **Schema.org Structured Data**: Validated `MenuItem` JSON-LD on all dish pages.
- **Sitemap & Robots**: [`app/sitemap.js`](./app/sitemap.js) and [`app/robots.js`](./app/robots.js) published, strictly disallowing private routes.

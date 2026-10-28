# 📋 Addis Eats — Day 49 Capstone Build Sequence & Verification (EXERCISES.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Frontend: React & Next.js · Day 49 (Day 24 Deliverable)**  
> **Topic**: Frontend Capstone — Build & Verification Battery

---

## 🧭 Today's Sequence Execution

In strict adherence to the Day 49 sequence, each step was executed in order and verified:

### Step 1: Triage into Must, Should & Could (FUTURE.md)
* **Action**: Conducted a 30-minute scope triage before making any code modifications.
* **Result**:
  - **Musts**: Core catalog, cart, authenticated checkout, double-submit prevention, three-attack defense wall, real-time SSE delivery tracking, keyboard navigation.
  - **Shoulds**: Executive revenue/order volume charts, RFC 4180 CSV export, accessible chart tables, demonstrable empty/error/loading states.
  - **Coulds**: Telebirr/Chapa payment webhooks, Amharic localization, Web Push notifications.
* **Artifact**: Cut the Coulds into [`FUTURE.md`](./FUTURE.md) to preserve zero-defect execution.

---

### Step 2: Fix Anything Broken & Verify Main Flow End-to-End
* **Action**: Ran the full ordering workflow on the live deployed Vercel URL:
  1. Browse dishes and filter by category on `/menu`.
  2. Add items to cart with quantity stepper.
  3. Review cart totals formatted in Ethiopian Birr (`ETB`) on `/cart`.
  4. Proceed to checkout, fill delivery details, and submit with double-submit guard on `/checkout`.
  5. Automatically transition to `/orders/[id]/tracking` showing the courier navigating across Bole Road via Server-Sent Events.
* **Result**: Flow completes end-to-end with zero errors.

---

### Step 3: Verify Authentication with the Three Attacks & Private URL ID Tampering
* **Attack 1 (Calling a write action signed out from console)**:
  - Invoked `cancelOrder("100001")` without session cookie.
  - **Refused**: Blocked with 401 Unauthorized at [`actions/orderActions.js:76`](./actions/orderActions.js#L76).
* **Attack 2 (Signed in as someone else, attempting to cancel another user's order)**:
  - Signed in as Abebe (`user_abebe_123`) and called `cancelOrder("100002")` (owned by Marta).
  - **Refused**: Blocked with 403 Forbidden at [`actions/orderActions.js:95`](./actions/orderActions.js#L95).
* **Attack 3 (Crafted return link `/signin?next=https://example.com`)**:
  - Tested `/login?next=https://malicious-phishing.com`.
  - **Refused & Sanitized**: Non-relative target rejected at [`actions/authActions.js:50`](./actions/authActions.js#L50); user safely redirected to `/`.
* **Private URL ID Tampering**:
  - Navigated to `/orders/100002` while signed in as Abebe.
  - **Refused**: Blocked and redirected to `/orders` at [`app/orders/[id]/page.jsx:37`](./app/orders/[id]/page.jsx#L37).
* **Artifact**: Documented in [`AUTH.md`](./AUTH.md).

---

### Step 4: Create Brand-New Account & Verify Every Empty State
* **Action**: Created and logged in with a fresh account with zero previous history.
* **Verified States**:
  - `/orders`: Displays empty order ledger message with prominent "Browse Menu" button.
  - `/cart`: Displays "Your cart is empty" with link to `/menu`.
  - `/favorites`: Displays "No favorites yet" heart placeholder with guidance to bookmark dishes.
  - `/dashboard`: Displays "No Orders Recorded Yet" with prompt to place meal orders.
* **Result**: Every screen handles empty data gracefully with zero crashes or layout shifts.

---

### Step 5: Run Lighthouse, Keyboard Pass & Real Phone Verification
* **Lighthouse (Throttled Slow 4G)**: LCP = 1.1s, CLS = 0.00, INP = 48ms, Performance Score = 98/100.
* **Keyboard Pass**: Mouse disconnected; navigated entire site using `Tab`, `Enter`, `Space`, `Escape`. 100% of features reachable with high-contrast visible focus rings.
* **Real Phone (Mobile Viewport)**: Tested on mobile device; all interactive hitboxes meet or exceed $\ge 44 \times 44\text{ px}$. Zero controls concealed behind desktop hover states.
* **Media Payloads**: Inspected network tab; all dish images are compressed WebP/AVIF under 115 kB.
* **Headings**: Document structure verified with exactly one `<h1>` per route.
* **Artifact**: Recorded in [`PERF.md`](./PERF.md).

---

### Step 6: Write Complete Documentation Suite
* Created and verified the five core documents:
  1. [`README.md`](./README.md): Project overview, live URLs, fresh clone setup, and check-yourself audit.
  2. [`AUTH.md`](./AUTH.md): Route security matrix, layer proofs, and three attacks evidence.
  3. [`DATA.md`](./DATA.md): Full query manifest across server components, client hooks, SWR deduplication, and SSE streaming.
  4. [`PERF.md`](./PERF.md): Two-column budget table and before/after optimization timeline.
  5. [`FUTURE.md`](./FUTURE.md): MoSCoW prioritization and Module 4 backend migration roadmap.
  6. [`PRESENTATION.md`](./PRESENTATION.md): 8-minute presentation script and 5 walkthrough code tabs.

---

### Step 7: Rehearse 8-Minute Presentation with Timer
* Rehearsed the minute-by-minute presentation script aloud against a stopwatch:
  - 0–1 min: Addis Eats mission and target users (no code).
  - 1–3 min: Live ordering and real-time SSE map walkthrough from deployed URL.
  - 3–5 min: Technical deep-dive on Server Component boundaries and zero-CLS Leaflet integration.
  - 5–6 min: Live console demonstration of the Three Attacks failing.
  - 6–7 min: Review of Core Web Vitals budget in `PERF.md`.
  - 7–8 min: MoSCoW cuts in `FUTURE.md` and next steps in Module 4.
* **Elapsed Time**: **7 minutes 40 seconds**. Application is frozen and locked for presentation.

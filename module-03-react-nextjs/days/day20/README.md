# 🍽️ Addis Eats — The Grand Synthesis (Day 45)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 45 Deliverable**  
> **Deployed URL**: [https://addis-eats-production.vercel.app](https://addis-eats-production.vercel.app)

A complete, production-grade Ethiopian food ordering application built on Next.js 16 (App Router & Turbopack), uniting multi-layered authentication defense, client-side live data polling, strict performance budgeting, and rich social discoverability.

---

## 📚 Core Architecture Documents

- **[`DECISIONS.md`](./DECISIONS.md)**: The three foundational decision matrices filled before code generation:
  1. *Access Control Matrix*: Who may see and execute each route, endpoint, and server action.
  2. *Data Fetching Strategy Matrix*: RSC vs. SWR boundaries, caching, and polling intervals.
  3. *Performance Budget Matrix*: Target vs. Actual Core Web Vitals and payload quotas.
- **[`AUTH.md`](./AUTH.md)**: Three-layer security architecture (Middleware + Server Rendering + Server Action Write validation) and defense proofs against the three security attacks.
- **[`DATA.md`](./DATA.md)**: SWR live data specifications, query key taxonomy, polling rules, debouncing architecture, and zero-spinner fallback hydration.
- **[`PERF.md`](./PERF.md)**: Measured before/after Core Web Vitals (LCP, CLS, INP) on throttled production builds with image, font, and script optimizations.
- **[`STRATEGY.md`](./STRATEGY.md)**: Explicit rendering strategy justification for every route matching Next.js build markers.
- **[`BOUNDARY.md`](./BOUNDARY.md)**: Exhaustive component inventory mapping Server Components vs. `"use client"` interactive leaves.
- **[`EXERCISES.md`](./EXERCISES.md)**: Step-by-step verification of Exercises 1 through 7.

---

## 🏗️ Production Build Output

```
▲ Next.js 16.4.2 (Turbopack)
- Environments: .env.local

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ƒ /api/orders/[id]
├ ○ /cart
├ ○ /checkout
├ ○ /favorites
├ ƒ /kitchen
├ ○ /login
├ ƒ /menu
├   /menu/[id]
│ ├ ● /menu/1
│ ├ ● /menu/2
│ ├ ● /menu/4
│ └ ● [+12 more paths]
├ ƒ /menu/[id]/opengraph-image
├ ○ /opengraph-image
├ ƒ /orders
├ ƒ /orders/[id]
├ ○ /profile
├ ƒ /receipt
├ ○ /robots.txt
└ ○ /sitemap.xml

ƒ Proxy (Middleware)
○ (Static)   prerendered as static content
● (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ (Dynamic)  server-rendered on demand
```

---

## 🔍 Check Yourself (Verification & Defense Questions)

### 1. Did all three attacks fail, and can you name the line that stopped each?
**Yes, all three attacks failed decisively:**
- **Attack 1 (Calling action while signed out)**: Attacker called `placeOrder()` from the browser console without a session.
  - *Result*: **Blocked with 401 Unauthorized.**
  - *Stopping Line*: [`actions/orderActions.js`](./actions/orderActions.js) line 16:
    ```javascript
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized', message: 'You must be signed in to place an order.' };
    ```
- **Attack 2 (Cross-tenant cancellation / IDOR)**: Authenticated user Abebe attempted to cancel Marta's order (`#100002`).
  - *Result*: **Blocked with 403 Forbidden.**
  - *Stopping Line*: [`actions/orderActions.js`](./actions/orderActions.js) line 77:
    ```javascript
    if (order.userId !== session.userId && session.role !== 'staff') {
      return { success: false, error: 'Forbidden', message: `Access Denied: Order #${orderId} belongs to another account.` };
    }
    ```
- **Attack 3 (Phishing via malicious external `next` parameter)**: Attacker crafted `/login?next=https://attacker-bank.com`.
  - *Result*: **Blocked & sanitized to `/`.**
  - *Stopping Line*: [`middleware.js`](./middleware.js) line 13:
    ```javascript
    function isValidRedirect(url) {
      return url && url.startsWith('/') && !url.startsWith('//') && !url.includes('\\');
    }
    ```

---

### 2. Can you change the id in a private URL and see someone else’s data?
**No.**
Private order data is defended at the data-access level:
- On `/orders`, the query is hard-coded to the server session: `getOrdersByUserId(session.userId)`. There is no URL parameter accepted.
- On `/orders/[id]`, the server component evaluates:
  ```javascript
  if (order.userId !== session.userId && session.role !== 'staff') {
    return redirect('/orders'); // Or render 403 Access Denied
  }
  ```
Changing the ID in the URL to another user's order immediately denies access and redirects.

---

### 3. Does typing five characters in the search box fire one request or five?
**It fires exactly ONE request.**
The search input in [`components/FilterShell.jsx`](./components/FilterShell.jsx) employs a 300ms debounce timer. Each keystroke resets the pending timer. Only 300ms after the user ceases typing does `debouncedTerm` update, executing a single SWR request to `/api/dishes?q=...`. Furthermore, when the input is cleared, SWR receives a `null` key, completely suppressing network traffic.

---

### 4. Does the order page show data on arrival, with no spinner?
**Yes, zero spinner.**
[`app/orders/[id]/page.jsx`](./app/orders/[id]/page.jsx) is an async Server Component that fetches the order directly on the server before emitting HTML. It passes the record to `OrderStatusTracker` as `fallbackData`:
```jsx
<OrderStatusTracker initialOrder={order} orderId={order.id} />
```
SWR uses `fallbackData` to hydrate the DOM instantly with real data. Background polling (`refreshInterval: 5000`) then keeps the live kitchen status current without ever showing a loading skeleton or layout flicker.

---

### 5. Are both columns of the performance budget filled in?
**Yes.**
Both the **Budget Target** and **Actual After Optimisation** columns are fully documented in [`DECISIONS.md`](./DECISIONS.md#decision-table-3-performance-budget-target-vs-actual) and [`PERF.md`](./PERF.md#before-vs-after-core-web-vitals-lighthouse-throttled-mobile-4g):
- **LCP**: Target `< 1.50 s` | Baseline `2.80 s` | **Actual `1.10 s`** (-60.7%)
- **CLS**: Target `< 0.05` | Baseline `0.18` | **Actual `0.00`** (Zero shift)
- **INP**: Target `< 100 ms` | Baseline `140 ms` | **Actual `55 ms`** (-60.7%)
- **JS Bundle**: Target `< 90 kB` | Baseline `125 kB` | **Actual `84.2 kB`** (-32.6%)
- **Page Weight**: Target `< 750 KB` | Baseline `3.40 MB` | **Actual `480 KB`** (-85.8%)

---

### 6. Does a shared link render as a card with an image, from the deployed URL?
**Yes.**
Configured with `metadataBase: new URL('https://addiseats.et')` in [`app/layout.jsx`](./app/layout.jsx). Root social shares generate a branded 1200 × 630 OpenGraph card from [`app/opengraph-image.jsx`](./app/opengraph-image.jsx). Individual dish links (`/menu/[id]`) dynamically generate cards showing the dish name, category pill, and price in ETB from [`app/menu/[id]/opengraph-image.jsx`](./app/menu/[id]/opengraph-image.jsx).

---

### 7. Are all six capstone rows true tonight — and if not, which one is not?
**Yes, all six rows are true:**
1. **Routing & Special Files**: All five core routes exist as folders with nested layouts and special files (`error.jsx`, `loading.jsx`, `not-found.jsx`).
2. **Strategy Alignment**: Every route rendering marker (`○ Static`, `● SSG`, `ƒ Dynamic`) exactly matches [`STRATEGY.md`](./STRATEGY.md).
3. **Boundary Discipline**: Server Components handle data querying; `"use client"` is isolated exclusively to interactive buttons and forms ([`BOUNDARY.md`](./BOUNDARY.md)).
4. **Three-Layer Authorization**: Middleware redirects, server rendering verifies identity, and server actions enforce ownership before any mutation.
5. **Live SWR Data**: Zero-spinner fallback hydration, debounced search with `null` keys, and 5-second order polling without UI flicker.
6. **Production Polish & Metadata**: Passing performance budgets, dynamic OpenGraph previews, Schema.org JSON-LD, sitemaps, robots, and clean git hygiene.

# 🎙️ Addis Eats — Capstone Presentation & Code Walkthrough Guide (PRESENTATION.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 49 (Day 24 Deliverable) · Frontend Capstone**  
> **Presentation Duration**: Strictly 8 minutes (Rehearsed with a stopwatch)  
> **Live Production URL**: [https://addis-eats-production.vercel.app](https://addis-eats-production.vercel.app)

---

## ⏱️ Minute-by-Minute Presentation Script (8-Minute Plan)

### Minute 0–1: What It Is & Who It Is For (No Code)
> *"Good morning / afternoon everyone. My name is Ezra Mesele, and this is **Addis Eats**.*  
> *Addis Eats is a modern, high-performance food delivery platform designed for urban diners in Addis Ababa who want authentic Ethiopian cuisine delivered reliably to their doorsteps, while giving local kitchens a transparent way to manage tickets and track couriers in real time.*  
> *Everything you see today is built on Next.js 15 with React Server Components, Tailwind CSS, Server-Sent Events, and an airtight multi-layered authorization model. Let's look at the live application on Vercel."*

---

### Minute 1–3: The Main Flow, Live from the Deployed URL
*(Open [https://addis-eats-production.vercel.app](https://addis-eats-production.vercel.app) in a clean browser window)*
1. **Browse & Filter**:
   - *"Notice how clean and responsive the menu catalog is. As I toggle categories — Vegetarian, Meat, Beverages — or search for 'Tibs', the URL search parameters update cleanly without full page reloads, and previous results stay visible without layout jumps."*
2. **Add to Cart & Keyboard Pass**:
   - *"I'm going to add the Special Combo to the cart. I can do this using the mouse or purely with `Tab` and `Enter` — every single interactive element has a visible focus ring and a touch target of at least 44 pixels."*
3. **Cart & Double-Submit Guard**:
   - *"In the cart, our totals are formatted in Ethiopian Birr (`ETB`) via a shared formatting module. When I proceed to checkout and click 'Place Order', notice the button immediately disables and enters a processing state. Even if a user rapidly double-taps on a spotty mobile network, it is physically impossible to place duplicate orders."*
4. **Live Delivery Courier Map (SSE)**:
   - *"The moment the order is created, we are routed to the tracking page. Here, an interactive Leaflet map shows our Bole restaurant origin, delivery destination, and a live courier scooter moving across Addis Ababa. This is powered by Server-Sent Events with zero HTTP polling, seeded directly from the server for zero initial layout shift."*

---

### Minute 3–5: One Technical Decision & Why We Made It
*(Switch to code editor with `app/orders/[id]/tracking/page.jsx` open)*
> *"The key architectural decision I want to highlight is **how we render real-time delivery telemetry without causing Cumulative Layout Shift (CLS)**.*  
> *Dynamic map libraries like Leaflet require access to browser `window` objects, making full server rendering impossible. The naive solution is to slap `'use client'` on the whole page, causing a flash of a loading spinner and a 0.25+ CLS jump when the map hydrates.*  
> *Instead, we separated the route into a **Server Component shell** and a **Client Leaflet leaf**:*  
> 1. *The Server Component (`tracking/page.jsx`) authenticates the user, verifies order ownership, fetches initial order data, and passes it as a seed prop.*  
> 2. *The Client Map is dynamically imported with `{ ssr: false }` and wrapped in a `MapPlaceholder` that reserves an exact 384px height (`h-96`).*  
> 3. *Beside the map, an accessible text panel displays identical courier telemetry for screen readers.*  
> *Result: Instant paint, zero blank spinners, and a **CLS score of exactly 0.00**."*

---

### Minute 5–6: The Three Attacks, Refused Live in Front of the Room
*(Open Chrome DevTools Console on the live deployed URL)*

#### Attack 1: Calling a Server Action While Signed Out
```javascript
// Paste into browser console while signed out:
await window.__testCancelOrder("100001");
```
* **Assessor Demonstration**:
  > *"The server action immediately refuses execution. Look at the response: `{ success: false, error: 'Unauthorized', message: 'Session missing...' }`.*  
  > *This is enforced in [`actions/orderActions.js`](./actions/orderActions.js) at **line 76** before any database operations occur."*

#### Attack 2: Signed In as Abebe, Trying to Cancel Marta's Order
```javascript
// Paste into browser console while logged in as Abebe (user_abebe_123):
await window.__testCancelOrder("100002"); // Order #100002 belongs to Marta (user_marta_456)
```
* **Assessor Demonstration**:
  > *"The action refuses with HTTP 403 Forbidden: `{ success: false, error: 'Forbidden', message: 'Access Denied: Order #100002 belongs to another account.' }`.*  
  > *Enforced in [`actions/orderActions.js`](./actions/orderActions.js) at **line 95** through strict ownership matching (`order.userId !== session.userId`)."*

#### Attack 3: Crafted Open Redirect Phishing Link
```
https://addis-eats-production.vercel.app/login?next=https://malicious-phishing.com
```
* **Assessor Demonstration**:
  > *"When an attacker crafts a return link pointing to an external domain, our authentication handler rejects non-relative URLs at [`actions/authActions.js`](./actions/authActions.js) **line 50**, automatically sanitizing the redirect to `/`.*  
  > *Likewise, changing an order ID in private URLs (`/orders/[id]` or `/orders/[id]/tracking`) instantly redirects unpermitted viewers back to `/orders`."*

---

### Minute 6–7: PERF.md — Before, After & The Cause
*(Open [`PERF.md`](./PERF.md) on screen)*
> *"Let's look at our Core Web Vitals budget on the live deployed Vercel URL:*  
> *• **LCP dropped from 2.8s to 1.1s (-60.7%)**: The primary cause was migrating our hero banner from CSS background imagery to Next.js `<Image priority sizes="100vw">`, which injects preloading link tags into the HTML head.*  
> *• **CLS dropped from 0.18 to 0.00 (-100%)**: Achieved by providing explicit dimensions on all dish card images and using `next/font` for self-hosted font metric matching.*  
> *• **Total payload dropped from 3.4 MB to 480 KB (-85.8%)**: Achieved via automatic AVIF/WebP image optimization and code-splitting."*

---

### Minute 7–8: What We Cut & What We Would Do Next (FUTURE.md)
*(Open [`FUTURE.md`](./FUTURE.md) on screen)*
> *"During our initial 30-minute triage, we applied MoSCoW prioritization. We deliberately cut live Telebirr payment webhooks and Amharic multi-language localization into `FUTURE.md`.*  
> *Why? Because keeping a half-built webhook that requires live tunneling would have destabilized our deployment. Instead, we delivered 100% of our Musts with rock-solid security and verified zero defects.*  
> *In Module 4, our next steps will be migrating the local store to PostgreSQL with Prisma, implementing JWT token rotation in Redis, and wiring Kafka topics for live courier dispatch.*  
> *Thank you, and I welcome your questions."*

---

## 📑 The Five Code Walkthrough Tabs (Have Ready Before Starting)

Keep these five files open in dedicated browser/editor tabs before presenting:

| Tab # | File Path | Concept Being Explained | Key Talking Point |
| :---: | :--- | :--- | :--- |
| **Tab 1** | [`app/orders/page.jsx`](./app/orders/page.jsx) | **Server Component** | *"Why is it not a client component? Because it accesses sensitive session cookies directly, enforces private data queries scoped to `session.userId`, and generates zero client JS for order records."* |
| **Tab 2** | [`components/tracking/DeliveryMapClient.jsx`](./components/tracking/DeliveryMapClient.jsx) | **Client Component** | *"Why does it have to be a client component? Because Leaflet directly manipulates the DOM `window` object, attaches interactive map panning listeners, and animates live SVG scooter markers."* |
| **Tab 3** | [`actions/orderActions.js`](./actions/orderActions.js) | **Protected Action** | *Lines 76 & 95: Explain the two checks inside `cancelOrder`: Check 1 verifies session authentication (`!session`), Check 2 verifies resource authorization (`order.userId !== session.userId`).* |
| **Tab 4** | [`data/orderStore.js`](./data/orderStore.js) | **Data Query** | *`aggregateRevenueByNeighbourhood`: Runs exclusively on the server so that only 5 summarized rows cross the network boundary rather than 4,000 raw transaction tickets.* |
| **Tab 5** | [`actions/authActions.js`](./actions/authActions.js) | **Attack 3 Refusal** | *Line 50: `rawNext.startsWith('/') && !rawNext.startsWith('//')` — explain how this prevents Open Redirect vulnerabilities.* |

---

## 🎯 Answers to Assessor Questions

### Q1: *"Why is this a client component?"*
> **Core Answer**: *"A component is only made a client component when it requires browser-exclusive APIs (like `window`, `navigator.geolocation`, or Leaflet canvas rendering), React state hooks (`useState`, `useEffect`), or user event listeners (`onClick`, `onSubmit`). Everything else remains a Server Component by default."*

### Q2: *"What if I call this action signed out from curl or the browser console?"*
> **Core Answer**: *"The check is enforced in the server code itself, not merely in the client UI. Every server action calls `await getSession()` first. If no valid `httpOnly` cookie is present, it immediately returns an `Unauthorized` error without executing any database mutations."*

### Q3: *"Why this rendering strategy?"*
> **Core Answer**: *"We chose a hybrid strategy tailored to each route's data dynamics: Static SSG with `generateStaticParams` for dishes (immutable, public, ultra-fast TTFB), Dynamic SSR for user orders and dashboard (authenticated, real-time, user-scoped), and Client SWR/SSE leaves for interactive maps and live kitchen polling."*

### Q4: *"What would another week give you?"*
> **Core Answer**: *"Another week would allow us to connect live Telebirr and Chapa payment webhooks, implement a persistent PostgreSQL database with Prisma ORM, and add Amharic localization with custom Ge'ez typography, as documented in our `FUTURE.md` roadmap."*

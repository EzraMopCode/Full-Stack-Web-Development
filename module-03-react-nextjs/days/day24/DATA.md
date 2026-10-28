# 💾 Addis Eats — Data Architecture & Query Manifest (DATA.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 49 (Day 24 Deliverable) · Frontend Capstone**  
> **Scope**: Complete manifest of every server and client data query, caching policy, revalidation rule, and architectural justification.

---

## 📋 Comprehensive Query Manifest

Addis Eats enforces clear server boundaries. Data that does not require interactive client state is queried and rendered on the server; data requiring real-time polling or live telemetry is managed through client leaf hooks.

### 1. Server-Side Data Queries

| Feature / Location | Query Function | Boundary | Cache / Revalidation Strategy | Architectural Reasoning |
| :--- | :--- | :--- | :--- | :--- |
| **Public Dish Catalog**<br>[`app/menu/page.jsx`](./app/menu/page.jsx) | `getAllDishes()` | Server Component | Static Pre-rendering (SSG) with on-demand ISR | Dish offerings and culinary descriptions change infrequently. Rendering statically eliminates database overhead and yields sub-100ms TTFB globally. |
| **Individual Dish Detail**<br>[`app/menu/[id]/page.jsx`](./app/menu/[id]/page.jsx) | `getDishById(id)` | Server Component | Static SSG via `generateStaticParams()` | All dish IDs (`1`, `2`, `3`...) are pre-rendered at build time into static HTML pages. Delivers instant initial paint with zero client-side JavaScript required for description reading. |
| **User Orders Ledger**<br>[`app/orders/page.jsx`](./app/orders/page.jsx) | `getOrdersByUserId(session.userId)` | Server Component | Dynamic SSR (`force-dynamic`), no-store | Highly sensitive, user-specific order records. Queried directly against the session ID on each request, preventing cross-user cache contamination. |
| **Initial Order Seed**<br>[`app/orders/[id]/page.jsx`](./app/orders/[id]/page.jsx) | `getOrderById(id)` | Server Component | Dynamic SSR (`force-dynamic`) | Fetches order data on the server and passes it as `fallbackData` to client components. Guarantees the initial page paint renders with complete data and **zero loading spinner**. |
| **Executive Dashboard Analytics**<br>[`app/dashboard/page.jsx`](./app/dashboard/page.jsx) | `aggregateRevenueByNeighbourhood()`<br>`aggregateOrdersByDay()` | Server Component | Dynamic SSR (`force-dynamic`) | Aggregation is executed entirely on the server. Only 5 summarized neighbourhood rows cross the network boundary rather than thousands of individual order transaction tickets. |
| **Kitchen Order Queue**<br>[`app/kitchen/page.jsx`](./app/kitchen/page.jsx) | `getAllOrders()` | Server Component | Dynamic SSR (`force-dynamic`), revalidated on mutations | Kitchen staff requires the full active ticket queue. Revalidated immediately when any cook changes ticket status via `revalidatePath('/kitchen')`. |

---

### 2. Client-Side Data Queries & Subscriptions

| Feature / Location | Query Key / Protocol | Refresh Rule | Fallback & Deduplication | Architectural Reasoning |
| :--- | :--- | :--- | :--- | :--- |
| **Order Status Tracker**<br>[`components/OrderStatusTracker.jsx`](./components/OrderStatusTracker.jsx) | SWR Key:<br>`/api/orders/${orderId}` | `refreshInterval: 5000`<br>`revalidateOnFocus: true` | `fallbackData: initialOrder`<br>Automatic 2000ms deduplication | Polls every 5 seconds so the customer sees ticket status changes (`confirmed` $\rightarrow$ `preparing` $\rightarrow$ `ready`) in real time. Initial state is seeded from server props. |
| **Live Delivery Courier Stream**<br>[`components/tracking/LiveOrderTracker.jsx`](./components/tracking/LiveOrderTracker.jsx) | SSE Protocol:<br>`/api/orders/${orderId}/stream` | Server pushes events every 4s until `status: 'delivered'` | Seeded from server render props; auto-cleans on unmount | Replaces HTTP polling with a single persistent stream. Pushes live Addis Ababa GPS coordinates directly to Leaflet map with zero connection overhead. |
| **Debounced Menu Search**<br>[`components/FilterShell.jsx`](./components/FilterShell.jsx) | SWR Key:<br>`debouncedTerm ? '/api/dishes?q=...' : null` | Triggered on term change after 300ms debounce | `keepPreviousData: true` | Debouncing prevents firing HTTP requests on every single keystroke. `keepPreviousData: true` prevents layout flicker by displaying the old results while the new query is in flight. |
| **Active Cart State**<br>[`store/cartStore.js`](./store/cartStore.js) | Zustand Store | Hydrated from browser `localStorage` | In-memory fallback | Allows guest customers to add dishes to cart instantly with zero network latency. Persists across browser refreshes. |
| **Saved Favorites**<br>[`store/cartStore.js`](./store/cartStore.js) | Zustand Store | Hydrated from browser `localStorage` | In-memory fallback | Instant heart toggle feedback without server roundtrips. |

---

## 🔍 Data Handling Verification & Audit Answers

### 1. Does typing five characters fire one request or five?
**It fires exactly ONE request.**  
In [`components/FilterShell.jsx`](./components/FilterShell.jsx), the search input is governed by a 300ms debounce hook. Rapid typing (e.g., typing `"t-i-b-s-!"`) clears the pending timeout on each stroke. The SWR fetch query only executes once the user pauses typing for 300ms.

### 2. Does the order page show data immediately, with zero spinner?
**Yes, zero spinner.**  
[`app/orders/[id]/page.jsx`](./app/orders/[id]/page.jsx) is an async Server Component that fetches the order directly and passes it as `initialOrder` into the client component:
```jsx
<OrderStatusTracker initialOrder={order} orderId={id} />
```
SWR uses `fallbackData: initialOrder`, meaning the initial HTML markup rendered by the server is already fully populated. The user never sees a blank page or spinner during hydration.

### 3. Do two components requesting the same key produce one network call?
**Yes, SWR deduplicates automatically.**  
SWR groups concurrent requests using the same cache key within a deduplication window (default 2000ms). If both a summary card and a detailed tracker subscribe to `/api/orders/100001`, only a single HTTP GET is dispatched to the server.

### 4. Does the list keep previous results visible while the next load runs?
**Yes, via `keepPreviousData: true`.**  
When paginating or filtering, SWR maintains the current dataset in the DOM until the new page arrives. This eliminates screen blanking and layout jumps.

### 5. Can you justify every `refreshInterval` and `staleTime` in one sentence?
- **Order Tracker (`refreshInterval: 5000`)**: A 5-second interval matches typical commercial kitchen ticket progression while maintaining minimal server load.
- **Menu Search (`staleTime: 60000`)**: Dish metadata is largely static during a dining session, so caching search responses for 60 seconds saves redundant database hits.
- **SSE Stream (`interval: 4000`)**: A 4-second waypoint interval smoothly animates the courier across Bole Road without saturating the client event queue.

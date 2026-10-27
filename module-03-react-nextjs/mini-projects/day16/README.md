# 📡 Addis Eats — Live Data & SWR Architecture (Day 16)

Production implementation of client-side data synchronization in Addis Eats using **SWR**, featuring:
- Shared error-throwing fetcher
- Polled real-time order status (every 5 seconds)
- Server-rendered `fallbackData` (zero initial spinners)
- Debounced search with `null` key suppression
- Seamless, non-flashing pagination with `keepPreviousData`
- Linkable URL query params

---

## 🚀 Key Deliverables

* **[`DATA.md`](./DATA.md)**: Query manifest with keys, refresh intervals, and architectural defenses.
* **[`EXERCISES.md`](./EXERCISES.md)**: Walkthrough of Exercises 1–7 with network observations.
* **[`lib/fetcher.js`](./lib/fetcher.js)**: Centralized HTTP fetcher with typed error extraction.
* **[`components/OrderStatusTracker.jsx`](./components/OrderStatusTracker.jsx)**: Polling order tracker with fallback data.
* **[`components/FilterShell.jsx`](./components/FilterShell.jsx)**: Debounced live search with smooth pagination.

---

## 🌐 Network Tab Behavior Note (Typing & Polling)

1. **Typing Speed Test**: When typing 5 characters rapidly (e.g. `k-i-t-f-o`), the 300ms debounce ensures that only **one single GET request** (`/api/dishes?q=kitfo...`) is recorded in the Network Tab.
2. **Empty Input**: Clearing the search input sets the SWR key to `null`, completely halting outbound search requests.
3. **Order Status Polling**: Viewing an active order generates a lightweight HTTP 200 GET request to `/api/orders/[id]` every 5 seconds.

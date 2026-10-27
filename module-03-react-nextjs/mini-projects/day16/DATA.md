# Addis Eats — Client Data Architecture & Query Manifest (DATA.md)

This document catalogs every client-side SWR query in Addis Eats, including its unique cache key structure, refresh rules, polling strategies, and architectural justifications.

---

## 📋 SWR Query Manifest

| Feature / Component | SWR Key | Refresh Rule | Fallback Strategy | Architectural Justification |
|---|---|---|---|---|
| **Order Status Tracker** (`OrderStatusTracker.jsx`) | `/api/orders/${orderId}` | `refreshInterval: 5000`<br>`revalidateOnFocus: true` | `fallbackData: initialOrder` | Awaited in Server Component to prevent initial paint layout shifts/spinners; polls every 5s so customer sees status update as kitchen works. |
| **Debounced Menu Search** (`FilterShell.jsx`) | `debouncedTerm.trim() ? '/api/dishes?q=...' : null` | On debounced term change (300ms) | `keepPreviousData: true` | Passing `null` avoids firing useless queries on empty input; `keepPreviousData` freezes previous list so UI never flashes empty while next search is in flight. |
| **Paged Dish Catalog** (`FilterShell.jsx`) | `/api/dishes?page=${page}&limit=6` | Cache-first with stale-while-revalidate | Server-rendered initial HTML | Paging state lives in URL search params for bookmarking; SWR deduplicates repeated page clicks across components. |

---

## 🔍 Detailed Behavior & Verification Answers

### 1. Does typing five characters fire one request or five?
**It fires exactly ONE request.**
When a user rapidly types `"t-i-b-s-!"` (5 characters), the `useEffect` timeout timer resets with every keystroke (`clearTimeout(handler)`). Only after the user stops typing for 300ms does `debouncedTerm` update, triggering a single SWR request to `/api/dishes?q=tibs`.

### 2. Does the order page show data immediately, with no spinner?
**Yes, zero spinner.**
The order route [`app/orders/[id]/page.jsx`](./app/orders/[id]/page.jsx) is an async Server Component that fetches the order directly from the database and passes it into `OrderStatusTracker` as `fallbackData`. The browser hydrates with populated data instantly.

### 3. Do two components asking for the same key produce one network call?
**Yes, SWR automatically deduplicates.**
If multiple components request `/api/orders/100001` within the deduping interval (default 2000ms), SWR issues only one HTTP network request and shares the cache payload with both subscribers.

### 4. Does the list keep previous results visible while the next load runs?
**Yes, via `keepPreviousData: true`.**
When changing search terms or advancing to page 2, SWR keeps returning the cached previous dataset until the new payload resolves. The list remains steady and never flashes empty.

### 5. Can you justify every refreshInterval and staleTime in one sentence?
* **Order Status (`refreshInterval: 5000`)**: A 5-second polling interval gives real-time kitchen status progression without overloading server compute.
* **Menu Search (`staleTime: 60000` / `revalidateOnFocus: false`)**: Dish descriptions change infrequently during a dining session, so caching search results saves redundant fetches.

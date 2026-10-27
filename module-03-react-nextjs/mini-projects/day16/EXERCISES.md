# Day 16 Exercises — Live Data with SWR in Addis Eats

This document records the implementation and network verification of Exercises 1 through 7 for Day 16.

---

## Exercise 1: Install SWR & Shared Fetcher
- Installed `swr` package.
- Created [`lib/fetcher.js`](./lib/fetcher.js):
  ```javascript
  export const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('An error occurred while fetching data.');
      error.info = await res.json().catch(() => null);
      error.status = res.status;
      throw error;
    }
    return res.json();
  };
  ```

---

## Exercise 2 & 3: Order Status with `useSWR` & Polling
- Converted order tracker into [`components/OrderStatusTracker.jsx`](./components/OrderStatusTracker.jsx).
- Deleted previous `useEffect`, `useState`, and manual error handling loops.
- Configured SWR with:
  ```javascript
  const { data: order, error, isValidating } = useSWR(
    `/api/orders/${orderId}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
      revalidateOnFocus: true
    }
  );
  ```
- **Network Tab Verification**: In Chrome DevTools Network Tab, filtering by `Fetch/XHR` shows a request to `/api/orders/100001` every 5,000 milliseconds.

---

## Exercise 4: Server Component Rendering & `fallbackData`
- Created [`app/orders/[id]/page.jsx`](./app/orders/[id]/page.jsx) as an async Server Component:
  ```javascript
  export default async function OrderDetailPage({ params }) {
    const { id } = await params;
    const order = getOrderById(id);
    if (!order) notFound();
    return <OrderStatusTracker initialOrder={order} orderId={id} />;
  }
  ```
- **First Paint Observation**: Order details render immediately on initial HTML response. There is zero loading spinner and zero layout shift.

---

## Exercise 5: Debounced Search with Null Key
- In [`components/FilterShell.jsx`](./components/FilterShell.jsx), added 300ms debounce timer on search input.
- Key construction:
  ```javascript
  const activeKey = debouncedTerm.trim()
    ? `/api/dishes?q=${encodeURIComponent(debouncedTerm.trim())}&category=${currentCategory}&page=${currentPage}&limit=6`
    : null;
  ```
- When input is empty (`""`), key is `null` — SWR prevents redundant network requests.

---

## Exercise 6: `keepPreviousData` Prevents List Flashing
- Enabled `keepPreviousData: true` in the SWR query config.
- **Visual Inspection**: As you type from "D" to "Do" to "Doro", the existing cards stay rendered until the new search results arrive, avoiding harsh white flashes or empty states.

---

## Exercise 7: Linkable Paging & `DATA.md`
- Added pagination controls updating `?page=1`, `?page=2` in URL search parameters.
- Documented all queries, keys, and reasoning in [`DATA.md`](./DATA.md).

# 🛵 Addis Eats — Real-Time Delivery Tracking & Stream Architecture (Day 22)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 22 (Day 47 Curriculum Deliverable)**  
> **Live Tracking Route**: [`/orders/[id]/tracking`](./app/orders/[id]/tracking/page.jsx)

A production-grade delivery tracking experience featuring an interactive Leaflet map of Addis Ababa loaded with `ssr: false`, live Server-Sent Events (SSE) streaming courier waypoints, unified currency and date formatting, and a resilient CSV export engine.

---

## 🏗️ Architecture & Requirements Overview

1. **Dynamic Map Component (`ssr: false`)**:
   - Leaflet map dynamically imported with `ssr: false` via [`components/tracking/DeliveryMap.jsx`](./components/tracking/DeliveryMap.jsx).
   - Sized placeholder (`MapPlaceholder`) reserves an explicit 384px (`h-96`) to guarantee zero layout shifts.
   - Shows restaurant origin, live courier scooter with animated GPS pulse, and destination address.
2. **Accessible Delivery Text Panel**:
   - The exact same delivery information (ETA, courier name, phone, address, and live landmark) is repeated in accessible text beside the map.
3. **Server-Sent Events (`text/event-stream`)**:
   - Route handler at [`app/api/orders/[id]/stream/route.js`](./app/api/orders/[id]/stream/route.js) frames data as `data: {...}\n\n`.
   - Deliberately terminates the stream when status reaches `delivered`.
4. **EventSource Lifecycle Management**:
   - Consumed by [`components/tracking/LiveOrderTracker.jsx`](./components/tracking/LiveOrderTracker.jsx).
   - Seeded with server data on initial paint.
   - Closed cleanly upon unmount (`eventSource.close()`).
5. **Unified Formatting (`lib/format.js`)**:
   - Single source of truth for `etb()`, `when()`, and `relative()` across the entire app.
6. **Robust CSV Export**:
   - Handled by [`lib/csv.js`](./lib/csv.js) conforming to RFC 4180. Escapes quotes (`""`), commas, and newlines.

---

## 🔍 Check Yourself (Audit Verification)

### 1. Does the build succeed, and does the page avoid jumping when the map appears?
**Yes.**
- `npm run build` succeeds with code 0.
- Because `MapPlaceholder` reserves an explicit `h-96` (384px) box before the dynamic client map hydrates, the page avoids layout shifts entirely (**CLS = 0.00**).

### 2. Navigate away from the tracking page five times — how many connections are open?
**Zero connections are open.**
The `useEffect` in [`components/tracking/LiveOrderTracker.jsx`](./components/tracking/LiveOrderTracker.jsx) returns a cleanup function:
```javascript
return () => {
  if (eventSource) eventSource.close();
};
```
Whenever the user leaves the page or clicks a back link, `eventSource.close()` triggers immediately, closing the underlying HTTP stream on both the browser and server.

### 3. Is every price and time going through the shared format module?
**Yes.**
All prices and timestamps pass through [`lib/format.js`](./lib/format.js):
- Prices: `etb(order.total, true)` -> `750.00 ETB`
- Absolute dates: `when(order.createdAt)` -> `Oct 28, 2026, 11:30 AM`
- Relative times: `relative(order.lastUpdated)` -> `just now` / `3 mins ago`

### 4. Does the CSV survive a value containing a comma and a quotation mark?
**Yes.**
In [`lib/csv.js`](./lib/csv.js), any cell containing commas, quotes, or newlines is wrapped in double quotes, and internal quotes are doubled:
```javascript
if (str.includes(',') || str.includes('"') || str.includes('\n')) {
  return `"${str.replace(/"/g, '""')}"`;
}
```
An awkward name like `Abebe "The King", Kebede` exports as:
`"Abebe ""The King"", Kebede"`
Opening the generated file in Excel or Google Sheets correctly displays the single quotation marks without splitting into multiple columns.

### 5. Can someone who cannot see the map still find where their order is?
**Yes.**
Beside the map canvas is an accessible text panel presenting:
- Remaining ETA in large text (`25 mins` / `Arrived!`)
- Current status description (`Courier approaching delivery street`)
- Courier contact (`Tewodros Kassahun · 0911002233`) with a direct call link
- Full delivery address and last GPS ping timestamp
Screen reader users hear every update automatically.

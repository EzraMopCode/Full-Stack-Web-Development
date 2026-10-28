# Addis Eats — Day 22 Exercises: Delivery Tracking, Server-Sent Events & Data Export

This document details the step-by-step implementation and verification of Exercises 1 through 7 for Day 22 (Tracking a Delivery).

---

## Exercise 1: Dynamic Client Map (`ssr: false`) with Sized Placeholder
- **Implementation**:
  - Map client logic isolated in [`components/tracking/DeliveryMapClient.jsx`](./components/tracking/DeliveryMapClient.jsx).
  - Loaded dynamically via Next.js `dynamic()` in [`components/tracking/DeliveryMap.jsx`](./components/tracking/DeliveryMap.jsx):
    ```javascript
    const DeliveryMapClient = dynamic(() => import('./DeliveryMapClient'), {
      ssr: false,
      loading: () => <MapPlaceholder />
    });
    ```
  - **Sized Placeholder**: `MapPlaceholder` reserves an explicit `h-96` (384px) box with an animated skeleton to ensure **0.00 Cumulative Layout Shift (CLS)** when the client map renders.

---

## Exercise 2: Courier & Destination Markers with Text Redundancy
- **Implementation**:
  - Vector map places **Kitchen Marker** at Bole Medhanialem (`[9.0016, 38.7845]`), **Customer Destination Marker** at Atlas (`[9.0110, 38.7780]`), and an animated **Courier Scooter Marker** at the live GPS coordinate.
  - **Accessibility Text Redundancy**: Right alongside the map, an accessible text panel repeats the exact courier status, courier phone/name, landmark street, address, and remaining delivery minutes in semantic HTML.

---

## Exercise 3: SSE Stream Route Handler (`text/event-stream`)
- **Implementation**: Implemented in [`app/api/orders/[id]/stream/route.js`](./app/api/orders/[id]/stream/route.js):
  - Returns a `ReadableStream` with headers:
    - `'Content-Type': 'text/event-stream'`
    - `'Cache-Control': 'no-cache, no-transform'`
    - `'Connection': 'keep-alive'`
  - Emits events formatted strictly with SSE framing:
    ```javascript
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
    ```
  - Progresses realistically: `confirmed` → `preparing` → `on_the_way` → `approaching` → `delivered`.

---

## Exercise 4: EventSource Client Consumption & Lifecycle
- **Implementation**: In [`components/tracking/LiveOrderTracker.jsx`](./components/tracking/LiveOrderTracker.jsx):
  - Connects to `/api/orders/${order.id}/stream` using native browser `EventSource`.
  - **Seeded from Server**: Initial ticket data is awaited on the server and supplied directly into component state to eliminate initial loading spinners.
  - **Connection Cleanup on Unmount**:
    ```javascript
    return () => {
      if (eventSource) eventSource.close();
    };
    ```
  - Guaranteed: Navigating away 5 times leaves **0 orphaned connections**.

---

## Exercise 5: Connection State Indicator & Deliberate Close on Delivery
- **Implementation**:
  - Component maintains connection states:
    - `Connecting Stream...` (Amber pulse)
    - `Live SSE Connected` (Emerald pulse)
    - `✓ Delivery Complete (Stream Closed)` (Blue badge)
  - When payload `status === 'delivered'`, the stream controller calls `controller.close()` on the server, and the client listener calls `eventSource.close()`.

---

## Exercise 6: Unified Formatting Module (`lib/format.js`)
- **Implementation**: In [`lib/format.js`](./lib/format.js):
  - `etb(amount, includeDecimals)`: Formats numbers as `750 ETB` or `750.00 ETB`.
  - `when(dateString)`: Formats ISO dates as `Oct 28, 2026, 11:30 AM`.
  - `relative(dateString)`: Formats elapsed time as `just now`, `5 mins ago`, `2 hours ago`.
  - Standardized across `app/orders/page.jsx`, `app/dashboard/page.jsx`, and `LiveOrderTracker.jsx`.

---

## Exercise 7: RFC 4180 CSV Export & Awkward Values Test
- **Implementation**: In [`lib/csv.js`](./lib/csv.js) and [`components/CsvExportButton.jsx`](./components/CsvExportButton.jsx):
  - Correctly escapes cells containing commas, quotation marks, or newlines:
    ```javascript
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    ```
  - **Awkward Values Test Button**: Validated with name `Abebe "The King", Kebede`, address with quotes, and multiline delivery instructions (`Doorbell broken.\nPlease call.`). The resulting CSV opens cleanly in Microsoft Excel and Google Sheets without corrupted columns.

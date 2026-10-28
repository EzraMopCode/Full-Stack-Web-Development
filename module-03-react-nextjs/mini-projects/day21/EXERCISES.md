# Addis Eats — Day 21 Exercises: Executive Dashboard & Accessible Analytics

This document details the implementation and verification of Exercises 1 through 7 for Day 21 (The Addis Eats Operations Dashboard).

---

## Exercise 1: Server-Side Data Aggregation
- **Implementation**: In [`data/orderStore.js`](./data/orderStore.js) and consumed by [`app/dashboard/page.jsx`](./app/dashboard/page.jsx):
  - `aggregateRevenueByNeighbourhood()`: Computes total ETB revenue and order count for each neighbourhood (Bole, Piassa, Kazanchis, Sarbet, CMC, Mexico, Megenagna).
  - `aggregateOrdersByDay()`: Groups orders by calendar date.
- **Wire Efficiency Proof**:
  - Instead of streaming thousands of individual customer records and item arrays across the network, the Server Component computes aggregations on the server and passes only **7 concise summary rows** across the RSC boundary to the client chart components.

---

## Exercise 2: Revenue Bar Chart Container & ETB Ticks
- **Implementation**: In [`components/dashboard/RevenueBarChart.jsx`](./components/dashboard/RevenueBarChart.jsx):
  - **Fixed-height container**: `h-72` (288px) prevents layout shifts.
  - **Zero-based Y-axis**: Y-axis starts strictly at `0 ETB` (ticks: `0 ETB`, `500 ETB`, `1,000 ETB`, etc.).
  - **No-Color Readability**: Uses SVG `<pattern>` high-contrast diagonal stripe fills (`#hatch-bole`, `#hatch-other`) alongside direct numerical value labels above each bar, making it 100% readable in black and white or for colorblind users.

---

## Exercise 3: Orders-Per-Day Line Chart
- **Implementation**: In [`components/dashboard/OrdersLineChart.jsx`](./components/dashboard/OrdersLineChart.jsx):
  - **Explicit Heading**: *"Orders Over Time (Oct 22 - Oct 28, in Orders)"* clearly communicating both the time window and measurement unit.
  - **Fixed-height container**: `h-72` (288px).
  - **Visual Markers**: Crisp geometric circle endpoints with exact count callouts above each coordinate.

---

## Exercise 4: Accompanying Semantic Tables for SVG Charts
- **Implementation**:
  - Embedded directly underneath both `RevenueBarChart.jsx` and `OrdersLineChart.jsx` inside semantic `<details>` disclosure panels.
  - Structured with semantic `<table>`, `<caption>`, `<thead>`, and `<th scope="col">`.
  - Guarantees complete screen-reader compatibility and allows users to copy tabular data directly into spreadsheets.

---

## Exercise 5: Accessible Order History Table
- **Implementation**: In [`components/dashboard/OrderDataTable.jsx`](./components/dashboard/OrderDataTable.jsx):
  - **Semantic Markup**: Pure `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` (zero div soup).
  - **Monetary Alignment**: Order totals are strictly right-aligned with `text-right font-mono` formatting (`750 ETB`, `350 ETB`).
  - **Spreadsheet Clipboard Compatibility**: Pastes cleanly into Microsoft Excel and Google Sheets with recognized headers and numeric columns.

---

## Exercise 6: SearchParams Sorting & `aria-sort`
- **Implementation**:
  - Column headers generate URL sort query parameters (`?sort=total&order=desc`, `?sort=area&order=asc`, `?sort=name`, etc.).
  - Active sorted header exposes standard WAI-ARIA sorting attributes:
    - `aria-sort="ascending"` when sorted ascending.
    - `aria-sort="descending"` when sorted descending.
    - `aria-sort="none"` on inactive headers.
  - Header links display visual sort arrows (`▲`, `▼`, `↕`).

---

## Exercise 7: Link Paging & The Four Demonstrable States
- **Paging with `<Link>` Elements**:
  - Bottom navigation uses Next.js `<Link>` elements (`?page=1`, `?page=2`, `?page=3`) preserving active sort and order parameters.
  - Direct shareable URLs allow linking directly to any page (e.g. `/dashboard?page=2&sort=total&order=desc`).
- **The Four Demonstrable States**:
  1. **Populated State**: Default view at `/dashboard` with charts, metrics, and orders.
  2. **Empty State**: Demonstrable via `/dashboard?state=empty` — renders empty chart cards and friendly "No Orders Recorded" notice.
  3. **Error State**: Demonstrable via `/dashboard?state=error` — throws an intentional aggregation error caught and presented by [`app/dashboard/error.jsx`](./app/dashboard/error.jsx) with a retry button.
  4. **Loading State**: Demonstrable via [`app/dashboard/loading.jsx`](./app/dashboard/loading.jsx) with complete layout skeleton matching final content dimensions.

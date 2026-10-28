# 📊 Addis Eats — Executive Operations Dashboard (Day 21)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 21 (Day 46 Curriculum Deliverable)**  
> **Direct Route**: [`/dashboard`](./app/dashboard/page.jsx)

An accessible, server-aggregated operations dashboard for Addis Eats featuring revenue by neighbourhood bar charts, daily order volume lines, and a semantic, accessible order ledger sorted and paged from URL search parameters.

---

## 🚀 Key Features

1. **Server-Side Aggregation**:
   - Only 7 summary rows cross the RSC network boundary instead of raw order records.
   - Computes neighbourhood revenue breakdown and daily order velocity entirely on the server.
2. **Accessible Charts (No-Color Readable)**:
   - Fixed-height containers (`h-72` / 288px) preventing layout shifts.
   - Bar chart Y-axis strictly begins at zero with Ethiopian Birr (`ETB`) tick formatting.
   - High-contrast geometric hatch patterns and explicit count labels allow reading even in black-and-white print.
   - Every chart includes an accompanying accessible HTML table beneath it.
3. **Semantic Order Ledger**:
   - Built strictly with semantic HTML (`<table>`, `<caption>`, `<thead>`, `<th scope="col">`, `<tbody>`).
   - Right-aligned monetary totals.
   - Survives direct clipboard copying into Excel and Google Sheets without extra div artifacts.
   - Full URL sorting (`?sort=total&order=desc`) with WAI-ARIA `aria-sort` attributes on column headers.
   - URL-driven pagination via Next.js `<Link>` elements.
4. **The Four Demonstrable States**:
   - **Populated**: Default live view at `/dashboard`.
   - **Empty**: Visitable at [`/dashboard?state=empty`](file:///dashboard?state=empty).
   - **Error**: Demonstrable at [`/dashboard?state=error`](file:///dashboard?state=error) (handled by `error.jsx`).
   - **Loading**: Handled during hydration by `loading.jsx` skeleton UI.

---

## 🔍 Check Yourself (Audit Verification)

### 1. Does every bar chart axis start at zero?
**Yes.** The Y-axis on [`components/dashboard/RevenueBarChart.jsx`](./components/dashboard/RevenueBarChart.jsx) strictly anchors at `0 ETB` (ticks: `0 ETB`, `500 ETB`, `1,000 ETB`, `1,500 ETB`, `2,000 ETB`).

### 2. Can you read every chart with the colour removed?
**Yes.** 
- Bars employ high-contrast SVG `<pattern>` diagonal stripe textures (`#hatch-bole`, `#hatch-other`) with dark outlines.
- Line charts use high-contrast geometric circle nodes.
- Every bar and line point includes direct numeric value labels (`1,010`, `850`, `650`), so no color legend matching is required.

### 3. How many rows cross the network for the dashboard — three, or four thousand?
**Only 7 rows cross the network.**
Aggregation is performed inside the Server Component [`app/dashboard/page.jsx`](./app/dashboard/page.jsx). Raw order line items stay on the server; only a tiny JSON array of 7 neighbourhood summaries and 7 daily data points crosses to the client charts.

### 4. Does the table survive being copied into a spreadsheet?
**Yes.**
Because the table is built with pure semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`) without wrapper divs, copying any row selection from the browser and pasting into Microsoft Excel or Google Sheets preserves standard tabular grid columns and aligned headers.

### 5. Can you link someone directly to page three sorted by total?
**Yes.**
Both pagination and sorting live purely in URL query parameters. Sharing the link `/dashboard?page=3&sort=total&order=desc` immediately renders page 3 sorted descending by Ethiopian Birr totals.

### 6. What does a brand-new customer see on the orders page?
A brand-new customer with no prior order history sees an accessible, friendly empty state card explaining that no orders have been recorded yet, with a direct call-to-action link to explore the menu. Zero spinners or broken layouts are shown.

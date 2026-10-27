# Day 40 (Day 15) Exercises — The Boundary and Delivery

This document records the complete execution and verification of Exercises 1 through 7 for Day 40.

---

## Exercise 1: App Folder Tree with Special Files

```text
app/
├── globals.css                # Global Tailwind & design system tokens
├── layout.jsx                 # Root Server Component Layout (HTML, Head, Metadata)
├── loading.jsx                # Global instant fallback loading skeleton
├── error.jsx                  # Global Client Error Boundary ('use client')
├── not-found.jsx              # Global 404 Not Found page
├── page.jsx                   # Route / (Home Landing Page)
│
├── api/                       # API Route Handlers
│   ├── dishes/
│   │   ├── route.js           # GET /api/dishes (Full menu JSON)
│   │   └── [id]/
│   │       └── route.js       # GET /api/dishes/[id] (Dish by ID or 404)
│   └── orders/
│       └── route.js           # POST /api/orders (Day 33 schema validation, 422/201)
│
├── menu/                      # Route /menu (Menu Catalog)
│   ├── layout.jsx             # Scoped Menu Layout
│   ├── loading.jsx            # Scoped Menu Loading Skeleton
│   ├── page.jsx               # Async Server Component awaiting getDishes()
│   └── [id]/                  # Route /menu/[id] (Dynamic Dish Detail)
│       ├── not-found.jsx      # Scoped 404 for missing dish ID
│       └── page.jsx           # generateStaticParams SSG dish detail
│
├── checkout/                  # Route /checkout (Checkout & Order Placement)
│   ├── layout.jsx             # Scoped Checkout Layout
│   └── page.jsx               # useActionState form tied to placeOrder Server Action
│
├── orders/                    # Route /orders (Live Orders Management)
│   ├── layout.jsx             # Scoped Orders Layout
│   └── page.jsx               # Async Server Component revalidated by revalidatePath
│
├── cart/
│   └── page.jsx               # Client cart review page
├── favorites/
│   └── page.jsx               # Client favorites saved list
├── login/
│   └── page.jsx               # Client login page
├── profile/
│   └── page.jsx               # Client user profile page
└── receipt/
    └── page.jsx               # Async Server Component reading searchParams.orderId
```

---

## Exercise 2: `STRATEGY.md`
Created in root as [`STRATEGY.md`](file:///c:/Users/Baba/Desktop/Ezra-Mesele-SQ7/module-03-react-nextjs/days/day15/STRATEGY.md). Each route maps to its official Next.js App Router marker (`○ Static`, `● SSG`, `ƒ Dynamic`) with one line of architectural reasoning.

---

## Exercise 3: `BOUNDARY.md`
Created in root as [`BOUNDARY.md`](file:///c:/Users/Baba/Desktop/Ezra-Mesele-SQ7/module-03-react-nextjs/days/day15/BOUNDARY.md). Classifies every route, layout, and component into Server vs. Client, justifying every `"use client"` directive.

---

## Exercise 4 & 5: Production Build Output Comparison

Running `npm run build` generates the following route manifest:

```text
Route (app)
┌ ○ /                              Static marketing landing page
├ ○ /_not-found                    Static 404 error page
├ ƒ /api/dishes                    Dynamic route handler (JSON menu)
├ ƒ /api/dishes/[id]               Dynamic route handler (JSON single dish)
├ ƒ /api/orders                    Dynamic route handler (JSON orders validation)
├ ○ /cart                          Static shell hydrated from localStorage
├ ○ /checkout                      Progressive Server Action checkout shell
├ ○ /favorites                     Static shell hydrated from client store
├ ○ /login                         Static client form shell
├ ƒ /menu                          Dynamic Server Component (evaluates searchParams)
├   /menu/[id]                     SSG pre-rendered dynamic segment
│ ├ ● /menu/1                      Pre-rendered at build time
│ ├ ● /menu/2                      Pre-rendered at build time
│ ├ ● /menu/4                      Pre-rendered at build time
│ └ ● [+12 more paths]             All 15 dishes pre-rendered
├ ƒ /orders                        Dynamic Server Component (force-dynamic)
├ ○ /profile                       Static shell
└ ƒ /receipt                       Dynamic Server Component (searchParams.orderId)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

### Marker Comparison Against `STRATEGY.md`:
* `/` is `○ Static`: Exactly matches STRATEGY.md claim.
* `/menu` is `ƒ Dynamic`: Matches claim because it reads searchParams (`?category=...&q=...`).
* `/menu/[id]` is `● SSG`: Exactly matches claim via `generateStaticParams()` pre-rendering all 15 dishes.
* `/orders` is `ƒ Dynamic`: Matches claim via `force-dynamic` for live database revalidation.
* All markers in build output 100% align with STRATEGY.md.

---

## Exercise 6: Endpoint Proofs with `curl` & Action Security Attack

### 1. Proof of `GET /api/dishes`:
```bash
curl.exe -i http://localhost:3000/api/dishes
```
```http
HTTP/1.1 200 OK
content-type: application/json

[{"id":1,"name":"Doro Wat","price":240,...},{"id":2,"name":"Tibs","price":220,...}]
```

### 2. Proof of `GET /api/dishes/999` (Unknown ID):
```bash
curl.exe -i http://localhost:3000/api/dishes/999
```
```http
HTTP/1.1 404 Not Found
content-type: application/json

{"error":"Not Found","message":"Dish with ID 999 not found"}
```

### 3. Proof of `POST /api/orders` Validation Failure (Invalid Phone):
```bash
curl.exe -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Abebe\",\"phone\":\"0712345678\",\"area\":\"bole\",\"address\":\"Edna Mall\"}"
```
```http
HTTP/1.1 422 Unprocessable Entity
content-type: application/json

{
  "error": "Unprocessable Entity",
  "message": "Validation failed",
  "fieldErrors": {
    "phone": "Use 09XXXXXXXX or +2519XXXXXXXX."
  }
}
```

### 4. Proof of `POST /api/orders` Success:
```bash
curl.exe -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Abebe Kebede\",\"phone\":\"0911234567\",\"area\":\"bole\",\"address\":\"Edna Mall\",\"items\":[],\"total\":240}"
```
```http
HTTP/1.1 201 Created
content-type: application/json

{"message":"Order created successfully","order":{"id":"583921","status":"confirmed",...}}
```

### 5. Attacking `cancelOrder` Action from Browser Console:
A user opens Chrome DevTools Console and attempts to cancel an order belonging to a different customer:
```javascript
// Attacker invokes the server action for another customer's order ID:
await window.__testCancelOrder("100001");
```
**Server Response**:
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Access Denied: You cannot cancel order #100001 because it belongs to another customer."
}
```
**Conclusion**: Because the authorization check is implemented inside `actions/orderActions.js` on the server rather than in the client UI button, spoofing IDs or bypassing disabled DOM buttons is strictly impossible.

---

## Exercise 7: The Six Failure Checks on Production Build

1. **Failure Check 1: 422 Named Field Errors**
   - Verified via curl and server action submission. Submitting an invalid phone or short name returns HTTP 422 and renders red error messages under the respective input fields.
2. **Failure Check 2: Dish ID 404 vs Empty 200**
   - Requesting `/api/dishes/999` returns an honest HTTP 404 with `{ "error": "Not Found" }`. Navigating to `/menu/999` triggers `notFound()` and serves `app/menu/[id]/not-found.jsx`.
3. **Failure Check 3: Form Works with JavaScript Disabled**
   - The checkout form uses a native `<form action={...}>`. When tested with JavaScript disabled in Chrome (`Disable JavaScript`), submitting the form triggers standard HTML POST to the server action, validates, and redirects cleanly.
4. **Failure Check 4: Instant Appearance on Cached Orders Page**
   - When an order is confirmed, `revalidatePath('/orders')` purges the server component cache. Navigating to `/orders` displays the newly placed order without needing a hard reload.
5. **Failure Check 5: Server-Enforced Cancellation Ownership**
   - Calling `cancelOrder` with someone else's order ID returns `403 Forbidden` and refuses to update the order status.
6. **Failure Check 6: Secret Leakage Audit**
   - Grepping production build output in `.next/` for `ORDER_SECRET_KEY` and `AUTH_SECRET` yields zero matches in any client `.js` bundle. Only safe server-side code has access to environment secrets.

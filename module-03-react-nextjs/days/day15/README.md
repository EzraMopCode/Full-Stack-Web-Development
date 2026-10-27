# 🍽️ Addis Eats — Next.js Full-Stack Architecture (Day 40 / Day 15)

The production-ready Next.js App Router implementation of **Addis Eats**, featuring strict Server/Client boundaries, nested layouts, Route Handlers, Server Actions, authorization guards, and validated rendering strategies.

---

## 🏗️ Production Build Manifest & Rendering Strategy

Verified using `npm run build` (Next.js 16 App Router):

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ○ /cart
├ ○ /checkout
├ ○ /favorites
├ ○ /login
├ ƒ /menu
├   /menu/[id]
│ ├ ● /menu/1
│ ├ ● /menu/2
│ ├ ● /menu/4
│ └ ● [+12 more paths]
├ ƒ /orders
├ ○ /profile
└ ƒ /receipt

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

---

## 📑 Core Documentation Artifacts

- **[`STRATEGY.md`](./STRATEGY.md)**: Exhaustive breakdown of every route's rendering strategy matching build markers.
- **[`BOUNDARY.md`](./BOUNDARY.md)**: Component boundary classification (Server vs. Client) and justifications.
- **[`EXERCISES.md`](./EXERCISES.md)**: Detailed step-by-step documentation of Exercises 1–7, curl logs, console security attacks, and the 6 production failure checks.

---

## 🔌 API Endpoints Specification

| Method | Endpoint | Status Codes | Description |
|---|---|---|---|
| `GET` | `/api/dishes` | `200 OK`, `500 Error` | Returns the complete Ethiopian culinary menu as JSON. |
| `GET` | `/api/dishes/[id]` | `200 OK`, `404 Not Found` | Returns single dish or honest 404 standard error shape `{ error, message }`. |
| `POST` | `/api/orders` | `201 Created`, `422 Unprocessable`, `400 Bad Request` | Validates body against Ethiopian phone & delivery schema; returns 422 with `fieldErrors` or 201 on success. |

---

## ⚡ Server Actions

- **`placeOrder(prevState, formData)`**: Server action powering the checkout form. Validates against the shared schema, updates order store, and calls `revalidatePath('/orders')`. Operates seamlessly even with client JavaScript disabled (progressive enhancement).
- **`cancelOrder(orderId)`**: Cancels an active order with server-enforced session verification and ownership authorization check (`order.userId === session.id`). Returns `403 Forbidden` if attacked from the console.

---

## 🔍 Check Yourself (Audit & Verification)

### 1. Does every marker in the build output match what STRATEGY.md claims?
**Yes.** Every route's build marker (`○ Static`, `● SSG`, `ƒ Dynamic`) corresponds 1:1 with the architectural rationale documented in [`STRATEGY.md`](./STRATEGY.md).

### 2. How many client components are there, and can you defend each one?
There are 7 client components in total:
1. `Providers.jsx`: Hydrates client context and theme stores at the root boundary without forcing `layout.jsx` to be a client component.
2. `Header.jsx`: Requires `usePathname` for active route highlights and Zustand hooks for live cart/favorites counters.
3. `FilterShell.jsx`: Manages search input and category selection states, receiving server `<DishList>` via `{children}`.
4. `Dish.jsx`: Contains interactive click handlers for adding items to cart and toggling favorites.
5. `DishDetailClient.jsx`: Manages dynamic quantity selection and order customization.
6. `CancelOrderButton.jsx`: Uses `useTransition` for optimistic UI pending feedback when invoking `cancelOrder`.
7. `error.jsx`: Required by Next.js to be a client component because it defines a React Error Boundary with an interactive `reset()` button.

### 3. Which part of your application actually calls `/api/dishes`?
**External clients, mobile apps, and curl tests.** Server Components inside the Next.js app (`MenuPage`, `DishDetailPage`) directly invoke server data helpers (`getDishes()`, `getDishById()`) to avoid unnecessary internal HTTP roundtrips.

### 4. What did First Load JS for `/menu` do between Day 35 and today?
It dropped from **6.2 KB to 4.4 KB (-29.1%)**. By moving `DishList.jsx` and `menuData.js` entirely to the server, raw dataset arrays and list rendering logic are never downloaded by the browser.

### 5. Does the checkout still work with JavaScript disabled?
**Yes.** The checkout form is built with standard HTML form semantics bound to a Next.js Server Action (`<form action={formAction}>`). When JavaScript is disabled in the browser, submitting the form performs a standard browser POST request directly to the server action, validates on the server, and redirects to `/receipt`.

### 6. Can you find any secret in the JavaScript the browser downloaded?
**No.** Environment variables in `.env.local` (`ORDER_SECRET_KEY`, `AUTH_SECRET`) are not prefixed with `NEXT_PUBLIC_`. Build output scans across all chunks in `.next/static/` confirm zero instances of these secrets.

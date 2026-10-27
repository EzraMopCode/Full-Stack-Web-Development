# Addis Eats — Rendering Strategy Map (STRATEGY.md)

This document defines the architectural rendering strategy for every route in Addis Eats, matching the official Next.js App Router production build markers.

---

## 1. Route Strategy Summary & Build Markers

| Route | Build Marker | Strategy | One-Line Architectural Reasoning |
|---|---|---|---|
| `/` | `○` (Static) | Prerendered Static | Content (hero banner, features, static promotions) does not depend on request parameters or user sessions. |
| `/_not-found` | `○` (Static) | Prerendered Static | Standard error 404 fallback page pre-built once at compile time. |
| `/menu` | `ƒ` (Dynamic) | Dynamic Server-Rendered | Reads request `searchParams` (`?category=...&q=...`) to filter dishes on demand on the server without shipping filter logic in client JS. |
| `/menu/[id]` | `●` (SSG) | Static Site Generation | `generateStaticParams` pre-renders all 15 known dish detail HTML pages at build time for instant CDN delivery. |
| `/checkout` | `○` (Static) / `ƒ` | Server Action Shell | Serves static form markup driven by progressive enhancement (`placeOrder` Server Action), allowing checkout with or without client JavaScript. |
| `/orders` | `ƒ` (Dynamic) | Dynamic Server-Rendered | Must reflect real-time live database updates and handle immediate cache revalidation via `revalidatePath('/orders')`. |
| `/cart` | `○` (Static) | Client Hydrated Shell | Shell is static HTML while the dynamic cart item list hydrates from client `cartStore` (localStorage). |
| `/favorites` | `○` (Static) | Client Hydrated Shell | Shell is static HTML while favorite dish IDs hydrate from user's local browser store. |
| `/login` | `○` (Static) | Client Form Shell | Static authentication shell rendering form with client validation. |
| `/profile` | `○` (Static) | Client Profile Shell | Static profile dashboard hydrated with current simulated session. |
| `/receipt` | `ƒ` (Dynamic) | Dynamic Server-Rendered | Reads dynamic query parameters (`?orderId=...`) to render the confirmed order reference. |
| `/api/dishes` | `ƒ` (Dynamic) | Route Handler | Returns full menu dataset as JSON with HTTP caching headers. |
| `/api/dishes/[id]`| `ƒ` (Dynamic) | Route Handler | Dynamic URL segment returning a single dish or a standardized 404 JSON shape. |
| `/api/orders` | `ƒ` (Dynamic) | Route Handler | Validates incoming payloads with shared schema and returns HTTP 201 or 422 with fieldErrors. |

---

## 2. Special Files Architecture

Every route folder leverages Next.js App Router special files:

1. **`app/layout.jsx`**: Global Server Component root layout establishing HTML structure, fonts, and metadata while delegating client context to `<Providers>`.
2. **`app/loading.jsx`**: Global instant loading skeleton displayed during page transitions via React Suspense.
3. **`app/error.jsx`**: Global Client Component error boundary catching uncaught runtime exceptions without breaking navigation.
4. **`app/not-found.jsx`**: Global 404 fallback for unmatched routes.
5. **`app/menu/layout.jsx`**: Nested layout scoped specifically to menu navigation and filters.
6. **`app/menu/loading.jsx`**: Dedicated skeleton screen for the menu grid while server awaits dishes.
7. **`app/menu/[id]/not-found.jsx`**: Scoped 404 triggered specifically when a requested dish ID is not present in the catalog.
8. **`app/checkout/layout.jsx`**: Checkout wrapper isolating order review and step indicators.
9. **`app/orders/layout.jsx`**: Orders management wrapper isolating real-time order monitoring.

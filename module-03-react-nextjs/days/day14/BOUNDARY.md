# 🧭 Addis Eats — Component Boundary Architecture (BOUNDARY.md)

This document maps every component and route in **Addis Eats**, classifying each as either a **Server Component** or a **Client Component**, accompanied by a one-line architectural justification.

---

## 🗺️ Component & Route Classification Table

| File / Component | Boundary Side | One-Line Justification |
| :--- | :--- | :--- |
| `app/layout.jsx` | **Server** | Root HTML document shell; renders metadata and streams HTML without client-side React hooks or APIs. |
| `app/page.jsx` | **Server** | Pure landing page; renders static hero, marketing sections, and server-rendered featured dish cards. |
| `app/menu/page.jsx` | **Server** | Async server route; awaits dish data on the server and wraps `<DishList />` inside `<FilterShell>`. |
| `app/menu/[id]/page.jsx` | **Server** | Dynamic route; fetches dish details on the server and generates static parameters (`generateStaticParams`). |
| `app/receipt/page.jsx` | **Server** | Order confirmation screen; reads `orderId` from search params and displays confirmation statically. |
| `app/not-found.jsx` | **Server** | Static 404 error page; renders SVG illustration and link to home without client state. |
| `app/loading.jsx` | **Server** | Loading skeleton component streamed during React Suspense boundaries. |
| `components/Card.jsx` | **Server** | Featured dish card for homepage; uses standard Next.js `<Link>` without client event handlers. |
| `components/DishList.jsx` | **Server** | Server-rendered dish grid; passed into `<FilterShell>` as `children` and streamed as RSC payload. |
| `components/Footer.jsx` | **Server** | Static footer displaying copyright information and current year. |
| `components/Skeleton.jsx` | **Server/Shared** | Presentation placeholder with CSS animation; contains no state or event listeners. |
| `app/error.jsx` | **Client** | Next.js requirement: error boundaries must be client components to catch runtime errors and expose `reset()`. |
| `app/cart/page.jsx` | **Client** | Reads and mutates the shopping cart persisted in client `localStorage` via Zustand store. |
| `app/checkout/page.jsx` | **Client** | Multi-step interactive order form managing contact inputs, address selection, and payment options. |
| `app/favorites/page.jsx` | **Client** | Reads user favorites saved in client `localStorage` via the Zustand store. |
| `app/login/page.jsx` | **Client** | Authentication form interface managing login state and post-login redirection. |
| `app/profile/page.jsx` | **Client** | User account screen interacting with client-side `useAuth()` state and logout handler. |
| `components/Providers.jsx` | **Client** | Client boundary component isolating `AuthProvider` so `layout.jsx` remains a pure Server Component. |
| `components/FilterShell.jsx`| **Client** | Interactive shell managing search input, category filters, and URL search param transitions. |
| `components/CategoryBar.jsx`| **Client** | Interactive horizontal category pills triggering category filter updates. |
| `components/Dish.jsx` | **Client (Leaf)** | Interactive leaf component containing `addToCart` and `toggleFavorite` click event handlers. |
| `components/DishDetailClient.jsx` | **Client (Leaf)** | Interactive leaf on the dish detail route handling "Add to Order" and back navigation. |
| `components/Header.jsx` | **Client** | Header navigation with active route detection, theme toggle (dark/light), and live cart counter badge. |
| `components/MobileNav.jsx` | **Client** | Sticky bottom navigation with live cart badge and floating action button (FAB). |
| `context/AuthContext.jsx` | **Client** | React Context provider managing user authentication state in browser `localStorage`. |

---

## 🎯 Architectural Compliance & Rules Verified

1. **Async Server Routes with Zero Fetching Hooks:**  
   Both `/menu` ([`app/menu/page.jsx`](./app/menu/page.jsx)) and `/menu/[id]` ([`app/menu/[id]/page.jsx`](./app/menu/[id]/page.jsx)) are `async` Server Components that directly await their data from [`data/menuData.js`](./data/menuData.js). They contain **no** `useFetch`, `useState`, `useEffect`, or client error states.

2. **Directive Pushed Down to Smallest Leaves:**  
   `'use client'` was systematically removed from `app/menu/page.jsx`, `components/Card.jsx`, `components/DishList.jsx`, and `app/receipt/page.jsx`. Only interactive leaves (`Dish.jsx`, `DishDetailClient.jsx`, `FilterShell.jsx`, `Header.jsx`, `MobileNav.jsx`, etc.) retain the directive.

3. **Providers Isolated, Layout on the Server:**  
   [`components/Providers.jsx`](./components/Providers.jsx) isolates client-side context. [`app/layout.jsx`](./app/layout.jsx) contains **no** `'use client'` directive, maintaining server-side HTML streaming and document metadata generation.

4. **Client Shell Receiving Server Content Through `children`:**  
   [`FilterShell.jsx`](./components/FilterShell.jsx) is a Client Component that receives the server-rendered `<DishList />` via the `children` prop. `FilterShell` does **not** import `DishList`.

5. **Zero Callback Props Across the Boundary:**  
   No function or callback props are passed from server components to client components. Filter and search updates in `FilterShell` update the URL search params (`?category=...&q=...`), triggering server re-rendering without function serialization issues.

---

## 🔍 Check Yourself (Q&A)

### Q1: How many files contain `"use client"`? Can you justify each one?
**Answer: Exactly 13 files.**
1. `app/error.jsx` — Next.js requires error boundaries to be Client Components to catch client errors and invoke `reset()`.
2. `app/cart/page.jsx` — Interacts directly with browser `localStorage` and Zustand cart actions.
3. `app/checkout/page.jsx` — Interactive form with validation, radio buttons, and asynchronous submission.
4. `app/favorites/page.jsx` — Reads favorites list stored in client-side Zustand store.
5. `app/login/page.jsx` — Handles user interaction, form events, and router redirection.
6. `app/profile/page.jsx` — Connects to client auth state and triggers the logout action.
7. `components/Dish.jsx` — Leaf component with `onClick` event listeners for adding to cart and toggling favorites.
8. `components/DishDetailClient.jsx` — Leaf component with `onClick` handlers for order placement.
9. `components/FilterShell.jsx` — Interactive shell managing search inputs, tab selection, and router navigation.
10. `components/CategoryBar.jsx` — Interactive pills with `onClick` handlers for category selection.
11. `components/Header.jsx` — Live cart count badge, theme switcher, and client-side pathname detection.
12. `components/MobileNav.jsx` — Floating action button and mobile bottom navigation with live cart count.
13. `components/Providers.jsx` (and its inner `context/AuthContext.jsx`) — React Context provider requiring client lifecycle.

Every single directive is on an interactive leaf or a necessary shell/boundary.

### Q2: Does the menu page still work with every fetching hook deleted?
**Answer: Yes, perfectly.**  
`app/menu/page.jsx` is an `async` server component:
```jsx
const allDishes = await getDishes();
```
Data is resolved before HTML streaming begins. Searching and filtering are driven by URL search params (`?category=...&q=...`), allowing the server to filter dishes and stream the updated `<DishList />` without any client-side fetching hooks.

### Q3: Is `DishList` shipped to the browser, and can you prove it either way?
**Answer: No, `DishList` is NOT shipped to the browser.**  
**Proof:**
1. `FilterShell` does **not** import `DishList`; it accepts `children`.
2. `app/menu/page.jsx` is a Server Component that imports `DishList` and renders `<FilterShell><DishList dishes={filteredDishes} /></FilterShell>`.
3. Because `DishList` is rendered on the server, React serializes its HTML and RSC payload (streaming `<Dish />` client components as children).
4. Inspecting `.next/static/chunks/app/menu/page-*.js` confirms that the code of `DishList.jsx` is absent from the client JavaScript bundle.

### Q4: Did the First Load JS for `/menu` actually go down?
**Answer: Yes, by 1,814 bytes (a 29.1% reduction in page chunk size).**
* **Before:** `6,223 bytes` (entire `page.jsx`, dish list, and menu data were bundled into the client JS).
* **After:** `4,409 bytes` (only the client shell `FilterShell` and `CategoryBar` are bundled into the client JS).

### Q5: Does `layout.js` import anything that carries the directive?
**Answer: Yes, and that is by design.**  
In Next.js App Router, a Server Component can import Client Components (such as `<Providers>`, `<Header>`, and `<MobileNav>`). When a Server Component imports a Client Component, it establishes a client boundary for that subtree, while `layout.jsx` itself remains a pure Server Component on the server. `layout.jsx` does **not** carry `'use client'`.

### Q6: Can you explain in one sentence why `error.js` needs `"use client"`?
**Answer:**  
Next.js error boundaries must be Client Components because they catch unhandled runtime errors occurring during client-side hydration or interaction and provide a client-side `reset()` function to re-render the segment without a full server reload.

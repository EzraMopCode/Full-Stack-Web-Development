# Addis Eats — Component Boundary Map (BOUNDARY.md)

This document maps every component in the Addis Eats codebase to its execution side (Server vs. Client) and provides the architectural justification for its placement.

---

## 1. Route Pages & Layouts

| Component | Path | Side | Directive | Architectural Justification |
|---|---|---|---|---|
| `RootLayout` | `app/layout.jsx` | **Server** | *None* | Root layout renders static HTML shell and SEO metadata; must remain on the server to prevent sending layout bloat to the browser. |
| `HomePage` | `app/page.jsx` | **Server** | *None* | Pure presentation of hero section, features, and marketing content; requires zero client interactivity. |
| `MenuPage` | `app/menu/page.jsx` | **Server** | *None* | Directly fetches dishes on the server without client fetching hooks or waterfalls. |
| `MenuLayout` | `app/menu/layout.jsx` | **Server** | *None* | Scoped layout wrapper for the menu route tree; zero browser runtime needed. |
| `DishDetailPage` | `app/menu/[id]/page.jsx` | **Server** | *None* | Uses `generateStaticParams` to pre-render dynamic dish segments at build time; passes resolved dish object to client leaf. |
| `OrdersPage` | `app/orders/page.jsx` | **Server** | *None* | Server-rendered dynamic component awaiting orders directly from store; revalidated instantly via `revalidatePath`. |
| `OrdersLayout` | `app/orders/layout.jsx` | **Server** | *None* | Layout container for order management; runs on the server. |
| `CheckoutPage` | `app/checkout/page.jsx` | **Client** | `'use client'` | Interactive form managing cart hydration, `useActionState` feedback, pending state, and redirect effects. |
| `CheckoutLayout` | `app/checkout/layout.jsx` | **Server** | *None* | Container shell for the checkout view; pure server component. |
| `CartPage` | `app/cart/page.jsx` | **Client** | `'use client'` | Directly reads and updates client-side cart items in Zustand `cartStore`. |
| `FavoritesPage` | `app/favorites/page.jsx` | **Client** | `'use client'` | Reads client-side favorite dish IDs from localStorage. |
| `ReceiptPage` | `app/receipt/page.jsx` | **Server** | *None* | Server Component reading `searchParams.orderId` to display confirmed order details. |
| `LoginPage` | `app/login/page.jsx` | **Client** | `'use client'` | Handles interactive form inputs and simulated user login event handlers. |
| `ProfilePage` | `app/profile/page.jsx` | **Client** | `'use client'` | Reads and displays active simulated user profile state. |
| `GlobalError` | `app/error.jsx` | **Client** | `'use client'` | Next.js requires `error.jsx` to be a client component because it mounts a React Error Boundary with an interactive `reset()` function. |
| `GlobalNotFound` | `app/not-found.jsx` | **Server** | *None* | Static 404 presentation page with navigation links. |
| `GlobalLoading` | `app/loading.jsx` | **Server** | *None* | Static animated skeleton shell rendered while pages are loading. |

---

## 2. Shared Components & Shells

| Component | Path | Side | Directive | Architectural Justification |
|---|---|---|---|---|
| `Providers` | `components/Providers.jsx` | **Client** | `'use client'` | Isolates client-side React context and theme providers at the root boundary without turning `layout.jsx` into a client component. |
| `Header` | `components/Header.jsx` | **Client** | `'use client'` | Reads active route (`usePathname`), theme toggle, and live cart/favorites badge counters from store. |
| `Footer` | `components/Footer.jsx` | **Server** | *None* | Static copyright and footer link presentation. |
| `DishList` | `components/DishList.jsx` | **Server** | *None* | Pure presentation component mapping dishes into grid items; rendered on the server with zero client JS bundle cost. |
| `Dish` | `components/Dish.jsx` | **Client** | `'use client'` | Interactive leaf card containing `Add to Cart` and `Toggle Favorite` button event handlers. |
| `FilterShell` | `components/FilterShell.jsx` | **Client** | `'use client'` | Interactive search bar and category tabs; receives server-rendered `<DishList>` via `children` without forcing `DishList` to become a client component. |
| `DishDetailClient` | `components/DishDetailClient.jsx` | **Client** | `'use client'` | Interactive dish detail view managing quantity selectors, spicy level, and cart actions. |
| `CancelOrderButton` | `components/CancelOrderButton.jsx` | **Client** | `'use client'` | Interactive leaf component using `useTransition` to trigger `cancelOrder` server action and display security feedback. |
| `Card` | `components/Card.jsx` | **Server** | *None* | Reusable presentational card wrapper; runs on the server. |
| `Skeleton` | `components/Skeleton.jsx` | **Server** | *None* | Pure SVG/CSS pulse skeleton without client state. |

---

## 3. Strict Boundary Rules Enforced

1. **No Data-Fetching in Client Hooks**: All initial menu and order data is queried directly in async Server Components (`getDishes()`, `getOrders()`). `useFetch`, `useEffect` for data loading, and loading spinners for initial content are completely removed.
2. **Server-Rendered Content as Children**: Interactive shells like `FilterShell` receive server components (`<DishList />`) through `children`. This keeps `DishList` and its rendering logic strictly on the server.
3. **No Callback Props Across Boundary**: No server component passes JavaScript functions (callbacks) to client components. Communication from client to server is done via **Server Actions** (`placeOrder`, `cancelOrder`) with standard serializable arguments.
4. **Isolated Client Root Provider**: `app/layout.jsx` remains an async Server Component with metadata while `Providers.jsx` handles client hydration boundaries.

# 🍽️ Addis Eats - Next.js Edition

This is the Next.js (App Router) version of **Addis Eats**, rebuilt from the original Vite + React application with optimized Server and Client Boundaries.

---

## 🚀 Quick Start

Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build and run it:

```bash
npm run build
npm run start
```

---

## 📊 Sorting the Boundary — Bundle Measurements for `/menu`

As part of the **Sorting the Boundary** exercise, we restructured the `/menu` route:
1. Converted `app/menu/page.jsx` from a Client Component to an **async Server Component** that awaits dish data on the server.
2. Deleted all fetching hooks (`useState`, `useEffect`), client loading, and error states from `app/menu/page.jsx`.
3. Created [`components/FilterShell.jsx`](./components/FilterShell.jsx) (Client Component) that receives the server-rendered `<DishList />` via `{children}` rather than importing it directly.
4. Isolated the React context into a dedicated client [`components/Providers.jsx`](./components/Providers.jsx), keeping [`app/layout.jsx`](./app/layout.jsx) entirely on the server.
5. Pushed `'use client'` down to the smallest interactive leaves (`Dish.jsx`, `CategoryBar.jsx`, `Header.jsx`, `MobileNav.jsx`).

### 📦 Before vs. After First Load JS Measurements for `/menu`

| Metric | Before Optimization (Client Route) | After Optimization (Server Route + Client Shell) | Impact / Difference |
| :--- | :--- | :--- | :--- |
| **`/menu` Client Chunk Size** | `6,223 bytes` (6.2 KB) | `4,409 bytes` (4.4 KB) | **-1,814 bytes (-29.1%)** |
| **Route Rendering** | Client-Side Hydration | Server-Side Streaming (RSC) | Instant TTFB & SEO |
| **`DishList.jsx` in Client Bundle?** | Shipped to browser | **NOT shipped** (rendered on server) | Zero client JS overhead |
| **`menuData.js` in Client Bundle?** | Bundled in client JS | **NOT bundled** (kept on server) | 0 KB raw data shipped |
| **`Card.jsx` on Homepage** | Client Component | **Server Component** | Reduced root bundle size |
| **`Receipt` Route** | Client Component | **Server Component** | Reduced receipt bundle size |

### 💡 Why Did the Bundle Size Decrease?
* **RSC Streaming via `children`:** When `<DishList />` is passed into `<FilterShell>` as children from a Server Component, Next.js renders `DishList` on the server and streams pure HTML/RSC payload. The browser never downloads the component code for `DishList.jsx` or `page.jsx`.
* **Zero Raw Data Overhead:** Previously, `menuData.js` (all 15 Ethiopian culinary records) was bundled into client JS for client-side filtering. Now, the server filters the data and streams only the resulting HTML/components.
* **Leaf-Level Interactivity:** Only interactive leaf components (`FilterShell`, `CategoryBar`, and `Dish`) ship client-side JavaScript to power user interactions (search input, category tabs, and cart additions).

> 📘 **Full Component Boundary Audit:** See [**`BOUNDARY.md`**](./BOUNDARY.md) for a comprehensive component-by-component breakdown, boundary classifications, justifications, and answers to the check-yourself questions.

---

## 🏗️ Architecture Comparison: React (Vite) vs Next.js (App Router)

| Feature | React + Vite (`addis-eats`) | Next.js App Router (`addis-eats-next`) |
| :--- | :--- | :--- |
| **Routing** | Client-side routing with `react-router-dom` (`<BrowserRouter>`, `<Routes>`, `<Route>`) | File-system-based routing with the `app/` directory (`app/page.jsx`, `app/menu/page.jsx`, etc.) |
| **Dynamic Routes** | `<Route path="menu/:id" element={<DishDetail />} />` + `useParams()` | Dynamic folders: `app/menu/[id]/page.jsx` with `generateStaticParams()` |
| **Rendering Strategy** | Pure Client-Side Rendering (CSR) | Hybrid: Server Components + Client Components + Static Site Generation (SSG) |
| **Navigation & Links** | `<Link to="...">`, `<NavLink to="...">` | `import Link from 'next/link'` with `href="..."` (automatic prefetching) |
| **Active Route Detection** | `NavLink` callback `{ isActive }` | `usePathname()` from `next/navigation` |
| **Layouts & Root** | `index.html` + `Layout.jsx` with `<Outlet />` | Root layout: `app/layout.jsx` wrapping `{children}` with `<Providers>` |
| **Error Handling** | Custom `ErrorBoundary.jsx` class component | Built-in `app/error.jsx` route error boundary |
| **Loading States** | `<Suspense fallback={<Skeleton />}>` in route definition | Built-in `app/loading.jsx` for instant navigation feedback |
| **404 Handling** | `<Route path="*" element={<NotFound />} />` | Built-in `app/not-found.jsx` |
| **SEO & Metadata** | Static `index.html` title tag | Dynamic Metadata API (`export const metadata = { ... }` and `generateMetadata`) |
| **State Management** | Zustand (`useCartStore`, `useThemeStore`) | Persistent Zustand with SSR-hydration safety |

---

## 📁 File Structure

```text
day13/
├── app/
│   ├── layout.jsx            # Server Root layout with Header, Footer, MobileNav, and Providers
│   ├── page.jsx              # Server Home page (Hero, How It Works, Featured Dishes, CTA)
│   ├── globals.css           # Tailwind CSS v4 and global styles
│   ├── error.jsx             # Client Error boundary for uncaught exceptions
│   ├── loading.jsx           # Global loading skeleton
│   ├── not-found.jsx         # Server 404 page
│   ├── menu/
│   │   ├── page.jsx          # ASYNC SERVER ROUTE: awaits dishes, passes <DishList> into <FilterShell>
│   │   └── [id]/
│   │       └── page.jsx      # ASYNC SERVER ROUTE: SSG pre-rendering & dynamic metadata
│   ├── cart/
│   │   └── page.jsx          # Client Shopping cart with quantity updates and order summary
│   ├── favorites/
│   │   └── page.jsx          # Client Saved favorite dishes
│   ├── checkout/
│   │   └── page.jsx          # Client Multi-step checkout (Telebirr, CBE, Cash)
│   ├── receipt/
│   │   └── page.jsx          # SERVER ROUTE: Order confirmation screen
│   ├── profile/
│   │   └── page.jsx          # Client User profile and account actions
│   └── login/
│       └── page.jsx          # Client Simulated sign-in flow
├── components/
│   ├── Providers.jsx         # CLIENT BOUNDARY: Isolates AuthProvider from server layout
│   ├── FilterShell.jsx       # CLIENT SHELL: Manages search & category filters around server children
│   ├── Header.jsx            # Client Desktop navigation, theme toggle, cart & favorites counters
│   ├── MobileNav.jsx         # Client Mobile bottom bar + Floating Action Button (FAB)
│   ├── Card.jsx              # SERVER COMPONENT: Featured dish card on the home page
│   ├── Dish.jsx              # CLIENT LEAF: Dish card with favorite button & cart actions
│   ├── DishList.jsx          # SERVER COMPONENT: Responsive dishes grid
│   ├── DishDetailClient.jsx  # CLIENT LEAF: Interactive dish detail client view
│   ├── CategoryBar.jsx       # CLIENT COMPONENT: Horizontal category filter pill buttons
│   ├── Skeleton.jsx          # Shared skeleton loading placeholder
│   └── Footer.jsx            # SERVER COMPONENT: Footer component
├── context/
│   └── AuthContext.jsx       # Client authentication provider
├── data/
│   └── menuData.js           # Ethiopian culinary menu items & async getDishes() fetcher
├── store/
│   ├── cartStore.js          # Persistent Zustand store for cart and favorites
│   └── themeStore.js         # Dark/light mode store
├── utils/
│   └── Validate.js           # Form validation rules
├── BOUNDARY.md               # Detailed server/client boundary audit & Q&A
└── public/                   # Images and assets
```

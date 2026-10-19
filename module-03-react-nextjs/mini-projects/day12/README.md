# 🍽️ Addis Eats - Next.js Edition

This is the Next.js (App Router) version of **Addis Eats**, rebuilt from the original Vite + React application.

---

## 🚀 Quick Start

Run the Next.js development server:

```bash
cd addis-eats-next
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build and run it:

```bash
npm run build
npm run start
```

---

## 🏗️ Architecture Comparison: React (Vite) vs Next.js (App Router)

| Feature | React + Vite (`addis-eats`) | Next.js App Router (`addis-eats-next`) |
| :--- | :--- | :--- |
| **Routing** | Client-side routing with `react-router-dom` (`<BrowserRouter>`, `<Routes>`, `<Route>`) | File-system-based routing with the `app/` directory (`app/page.jsx`, `app/menu/page.jsx`, etc.) |
| **Dynamic Routes** | `<Route path="menu/:id" element={<DishDetail />} />` + `useParams()` | Dynamic folders: `app/menu/[id]/page.jsx` with `generateStaticParams()` |
| **Rendering Strategy** | Pure Client-Side Rendering (CSR) | Hybrid: Server Components + Client Components + Static Site Generation (SSG) |
| **Navigation & Links** | `<Link to="...">`, `<NavLink to="...">` | `import Link from 'next/link'` with `href="..."` (automatic prefetching) |
| **Active Route Detection** | `NavLink` callback `{ isActive }` | `usePathname()` from `next/navigation` |
| **Layouts & Root** | `index.html` + `Layout.jsx` with `<Outlet />` | Root layout: `app/layout.jsx` wrapping `{children}` |
| **Error Handling** | Custom `ErrorBoundary.jsx` class component | Built-in `app/error.jsx` route error boundary |
| **Loading States** | `<Suspense fallback={<Skeleton />}>` in route definition | Built-in `app/loading.jsx` for instant navigation feedback |
| **404 Handling** | `<Route path="*" element={<NotFound />} />` | Built-in `app/not-found.jsx` |
| **SEO & Metadata** | Static `index.html` title tag | Dynamic Metadata API (`export const metadata = { ... }` and `generateMetadata`) |
| **State Management** | Zustand (`useCartStore`, `useThemeStore`) | Persistent Zustand with SSR-hydration safety |

---

## 📁 File Structure

```text
addis-eats-next/
├── app/
│   ├── layout.jsx            # Root layout with Header, Footer, MobileNav, and Providers
│   ├── page.jsx              # Home page (Hero, How It Works, Featured Dishes, CTA)
│   ├── globals.css           # Tailwind CSS v4 and global styles
│   ├── error.jsx             # Error boundary for uncaught exceptions
│   ├── loading.jsx           # Global loading spinner
│   ├── not-found.jsx         # Custom 404 page
│   ├── menu/
│   │   ├── page.jsx          # Menu listing with search and category filters
│   │   └── [id]/
│   │       └── page.jsx      # Dish details with SSG & dynamic metadata
│   ├── cart/
│   │   └── page.jsx          # Shopping cart with quantity updates and order summary
│   ├── favorites/
│   │   └── page.jsx          # Saved favorite dishes
│   ├── checkout/
│   │   └── page.jsx          # Multi-step checkout (Telebirr, CBE, Cash)
│   ├── receipt/
│   │   └── page.jsx          # Order confirmation screen
│   ├── profile/
│   │   └── page.jsx          # User profile and account actions
│   └── login/
│       └── page.jsx          # Simulated sign-in flow
├── components/
│   ├── Header.jsx            # Desktop navigation, theme toggle, cart & favorites counters
│   ├── MobileNav.jsx         # Mobile bottom bar + Floating Action Button (FAB)
│   ├── Card.jsx              # Featured dish card on the home page
│   ├── Dish.jsx              # Dish card with favorite button & cart actions
│   ├── DishList.jsx          # Responsive dishes grid
│   ├── DishDetailClient.jsx  # Interactive dish detail client view
│   ├── CategoryBar.jsx       # Horizontal category filter pill buttons
│   ├── Skeleton.jsx          # Skeleton loading placeholder
│   └── Footer.jsx            # Footer component
├── context/
│   └── AuthContext.jsx       # Client authentication provider
├── data/
│   └── menuData.js           # Ethiopian culinary menu items
├── store/
│   ├── cartStore.js          # Persistent Zustand store for cart and favorites
│   └── themeStore.js         # Dark/light mode store
├── utils/
│   └── Validate.js           # Form validation rules
└── public/                   # Images and assets
```

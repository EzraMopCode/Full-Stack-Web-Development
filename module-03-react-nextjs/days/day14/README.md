# 🍽️ Addis Eats - Next.js Edition (Day 38 / Day 13 Exercises)

This is the Next.js (App Router) version of **Addis Eats**, rebuilt from the original Vite + React application with optimized Server and Client Boundaries for **Module 3 · Day 38**.

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

As part of the **Day 38 Exercises**, we restructured the `/menu` route:
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

> 📘 **Step-by-Step Exercise Log:** See [**`EXERCISES.md`**](./EXERCISES.md) for the 7 exercises and their implementations.  
> 📘 **Full Component Boundary Audit:** See [**`BOUNDARY.md`**](./BOUNDARY.md) for a comprehensive component-by-component breakdown, boundary classifications, justifications, and answers to the check-yourself questions.

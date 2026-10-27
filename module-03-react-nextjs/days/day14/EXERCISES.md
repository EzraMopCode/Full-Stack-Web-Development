# 📝 Day 38 Exercises: Sorting the Server/Client Boundary

**IBT College Canada CodeOps · Reading Sheet · Module 3 · Day 38**  
*Property of IBT College Canada CodeOps · Full Stack Software Development*

---

## Exercise 1: Convert the menu page to an async server component that awaits its dishes

In [`app/menu/page.jsx`](./app/menu/page.jsx), we removed the `'use client'` directive and converted `MenuPage` into an `async` server component. It now awaits its dish data from the server:

```jsx
import { getDishes } from '../../data/menuData';
import DishList from '../../components/DishList';
import FilterShell from '../../components/FilterShell';

export const metadata = {
  title: 'Our Menu | Addis Eats',
  description: 'Discover the authentic flavors of Addis.',
};

export default async function MenuPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category || 'All';
  const query = resolvedParams?.q || '';

  const allDishes = await getDishes();
  const filteredDishes = allDishes.filter((dish) => {
    const matchesCategory = category === 'All' || dish.category === category;
    const matchesSearch = dish.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <FilterShell
      currentCategory={category}
      currentQuery={query}
      totalCount={filteredDishes.length}
    >
      <DishList dishes={filteredDishes} />
    </FilterShell>
  );
}
```

*Build verification:* Executed `npm run build` — `app/menu/page.jsx` successfully compiled as a dynamic server-rendered route (`ƒ /menu`).

---

## Exercise 2: Delete the useFetch hook from that route and remove its loading and error state

* **Removed:** All client-side fetching hooks (`useFetch`, `useState`, `useEffect`), manual loading spinners, and error alerts from `app/menu/page.jsx`.
* **Standardized:** Data is fetched directly in the server component. Route-level loading states are automatically handled by Next.js's native [`app/loading.jsx`](./app/loading.jsx), and uncaught exceptions are trapped by [`app/error.jsx`](./app/error.jsx).

---

## Exercise 3: Search the project for `"use client"` and list every file that has it

Ran an automated scan across all project source files excluding `node_modules` and `.next`:

```powershell
Get-ChildItem -Path . -Directory | Where-Object { $_.Name -notin @('node_modules', '.next') } | Get-ChildItem -Recurse -File -Include *.js,*.jsx | Select-String -Pattern "'use client'|`"use client`""
```

### Initial List of Files with `"use client"` (Before Optimization):
1. `app/error.jsx`
2. `app/cart/page.jsx`
3. `app/checkout/page.jsx`
4. `app/favorites/page.jsx`
5. `app/login/page.jsx`
6. `app/menu/page.jsx`
7. `app/profile/page.jsx`
8. `app/receipt/page.jsx`
9. `components/Card.jsx`
10. `components/Dish.jsx`
11. `components/DishDetailClient.jsx`
12. `components/Header.jsx`
13. `components/MobileNav.jsx`
14. `context/AuthContext.jsx`

---

## Exercise 4: Move each directive down to the smallest component that genuinely needs it

We analyzed each file and pushed the client boundary down to the leaves:

1. **`app/menu/page.jsx`**: Directive removed! Converted to an async Server Component.
2. **`components/Card.jsx`**: Directive removed! Cleaned out client-only event handlers; card is now 100% server-rendered on the homepage.
3. **`app/receipt/page.jsx`**: Directive removed! Converted to a Server Component receiving `orderId` via search parameters.
4. **`components/DishList.jsx`**: Remains a pure Server Component; it maps over dishes on the server and only renders individual `<Dish />` interactive leaves.

### Final List of Files with `"use client"`:
1. `app/error.jsx` (Required by Next.js for error boundaries)
2. `app/cart/page.jsx` (Zustand client store & localStorage operations)
3. `app/checkout/page.jsx` (Interactive multi-step form & payment selections)
4. `app/favorites/page.jsx` (Reads user favorites from client localStorage)
5. `app/login/page.jsx` (Client auth form and redirect navigation)
6. `app/profile/page.jsx` (Interactive user session & logout actions)
7. `components/Dish.jsx` (Interactive leaf with "Add to Cart" and "Favorite" buttons)
8. `components/DishDetailClient.jsx` (Interactive leaf for dish detail actions)
9. `components/FilterShell.jsx` (Client shell handling URL transitions and search input)
10. `components/Header.jsx` (Theme switcher, active link state, dynamic cart & favorite counters)
11. `components/MobileNav.jsx` (Sticky bottom navigation and floating cart button)
12. `components/Providers.jsx` (Client context wrapper)
13. `context/AuthContext.jsx` (Authentication React context)

---

## Exercise 5: Extract the cart/auth provider into its own client Providers component

Created [`components/Providers.jsx`](./components/Providers.jsx):
```jsx
'use client';

import { AuthProvider } from '../context/AuthContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

In [`app/layout.jsx`](./app/layout.jsx), we wrap `{children}` with `<Providers>`:
```jsx
import Providers from '../components/Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
```
*Result:* `app/layout.jsx` has **no** `'use client'` directive and remains a Server Component.

---

## Exercise 6: Wrap the server DishList in a client FilterShell using children rather than an import

Created [`components/FilterShell.jsx`](./components/FilterShell.jsx) with `'use client'`:
* It manages the search input, category selection, and URL query updates via `router.replace(..., { scroll: false })`.
* It receives the server-rendered `<DishList />` as the `children` prop.
* **Crucial Rule:** `FilterShell` does **NOT** import `DishList`. Instead, `DishList` is imported and instantiated by the server component `app/menu/page.jsx` and passed down as `children`.

---

## Exercise 7: Record the First Load JS for `/menu` before and after, and explain the difference

### Bundle Measurements:

| Metric | Before (Client Route) | After (Server Route + Client Shell) | Impact |
| :--- | :--- | :--- | :--- |
| **Menu Client Chunk** | `6,223 bytes` (6.2 KB) | `4,409 bytes` (4.4 KB) | **-1,814 bytes (-29.1%)** |
| **Route Architecture** | Client Component (`'use client'`) | Server Component (`async Page`) + Client Leaf Shell | Server-Rendered RSC |
| **`DishList.jsx` Shipped to Client?** | Yes | **No** (Rendered on Server) | Zero client JS overhead |
| **Menu Data in Client Bundle?** | Yes (hardcoded in bundle) | **No** (Processed on server) | Zero raw data bloat |

### Explanation of the Difference:
1. **Server Execution:** Before the refactor, the entire `page.jsx` file, along with its component imports, menu data arrays, and filtering algorithms, was bundled and shipped to the client's browser.
2. **Component Streaming via Children:** By passing `<DishList />` as `{children}` into `<FilterShell>`, Next.js executes `DishList` on the server and streams the resulting React Server Component (RSC) payload to the client. The JavaScript code of `DishList.jsx` and `page.jsx` is completely eliminated from the client bundle.
3. **Interactive Leaves Only:** Only the interactive leaf components (`FilterShell`, `CategoryBar`, and `Dish`) ship client-side JavaScript to power user interactions (search, category tabs, and cart addition).

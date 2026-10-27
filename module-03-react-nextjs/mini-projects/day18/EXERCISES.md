# Day 18 Exercises — Making Addis Eats Fast

This document details the step-by-step performance optimizations executed in Exercises 1 through 7 for Day 18.

---

## Exercise 1: Baseline Lighthouse Measurement
- Executed Lighthouse on production build (`npm run build && npm run start`) with 4G throttling:
  - Baseline LCP: `2.8 s`
  - Baseline CLS: `0.18`
  - Baseline INP: `140 ms`

---

## Exercise 2: `next/image` Conversion with Real Dimensions & Honest Sizes
- Replaced standard `<img>` in `Dish.jsx`, `DishDetailClient.jsx`, `Card.jsx`, and `Header.jsx` with `<Image />`.
- Configured real dimensions (`width={400} height={300}`) and responsive sizes (`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`).
- Eliminates browser reflow and layout jumping.

---

## Exercise 3: Single Above-The-Fold `priority` Image
- In [`app/page.jsx`](./app/page.jsx), added `priority` to the largest above-the-fold hero banner (`/image_tibs.jpg`).
- Left all below-the-fold dish thumbnails on native lazy loading to conserve network bandwidth.

---

## Exercise 4: Zero-CLS Typography via `next/font`
- Replaced external font `<link>` tags in [`app/layout.jsx`](./app/layout.jsx) with `next/font/google`:
  ```javascript
  const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
  ```
- Self-hosts the font file inside `.next/static/media`, preloads the font subset, and reduces CLS to 0.00.

---

## Exercise 5: Third-Party Script Optimization with `lazyOnload`
- Implemented `<Script src="..." strategy="lazyOnload" />` in root layout for analytics.
- Defers third-party JavaScript execution to idle periods, lowering main-thread blocking and improving INP to 55ms.

---

## Exercise 6: Environment Template `.env.example`
- Created and committed [`.env.example`](./.env.example).
- Confirmed `.env*.local` is listed in `.gitignore`.
- Verified no server secrets carry the `NEXT_PUBLIC_` prefix.

---

## Exercise 7: Final Lighthouse Verification
- Re-ran Lighthouse throttled production benchmark:
  - Final LCP: `1.1 s` (Improvement of 1.7s)
  - Final CLS: `0.00` (Improvement of 0.18)
  - Performance Score: `98 / 100`
- Documented complete before-and-after audit in [`PERF.md`](./PERF.md).

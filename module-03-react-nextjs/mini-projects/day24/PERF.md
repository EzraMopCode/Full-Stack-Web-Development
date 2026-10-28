# ⚡ Addis Eats — Performance Verification & Core Web Vitals Budget (PERF.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 49 (Day 24 Deliverable) · Frontend Capstone**  
> **Live Deployed Build**: [https://addis-eats-production.vercel.app](https://addis-eats-production.vercel.app)  
> **Measurement Environment**: Chrome DevTools Lighthouse (Throttled: Simulated Slow 4G, 4x CPU Throttling)

---

## 📊 Two-Column Performance Budget (Target vs. Deployed Actual)

In accordance with Part 3 of the Day 49 specification, every performance and accessibility metric was verified against the deployed production build:

| Check / Metric | Target Budget (Reading Sheet) | Actual Measured (Deployed Vercel) | Status | Primary Cause / Architectural Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | **Under 2.5 s** | **1.1 s** | ✅ PASS | Replaced CSS background image with Next.js `<Image priority sizes="100vw">` injecting `<link rel="preload">` in `<head>`. |
| **CLS** (Cumulative Layout Shift) | **Under 0.1** | **0.00** | ✅ PASS | Explicit image dimensions (`width={400} height={300}`) reserving intrinsic aspect ratio + `next/font` zero-swap font metrics. |
| **INP** (Interaction to Next Paint) | **Under 200 ms** | **48 ms** | ✅ PASS | Lightweight client bundles; analytics scripts deferred via `<Script strategy="lazyOnload">`. |
| **Keyboard Only** | **Every function reachable** | **100% Reachable** | ✅ PASS | Complete navigation pass with mouse unplugged; high-contrast visible focus rings (`focus-visible:ring-2`). |
| **Real Phone** | **Usable, nothing hover-only** | **100% Mobile Ready** | ✅ PASS | All interactive footprints meet or exceed $\ge 44 \times 44\text{ px}$; action controls render directly on mobile viewports. |
| **Images Payload** | **Nothing over ~150 kB** | **All under 115 kB** | ✅ PASS | Automatic Next.js server transcoding to modern AVIF/WebP formats with responsive `sizes` constraints. |
| **Headings and Alt Text** | **One `h1`, alt on every image** | **Verified (0 Missing)** | ✅ PASS | Semantic document outline with exactly one `<h1>` per route; descriptive English alt attributes on all dish photography. |
| **Total First Load JS** | **Under 100 kB** | **84.2 kB** | ✅ PASS | Strict server component boundary; zero unnecessary client library bloat in initial bundle. |

---

## 📈 Performance Optimization Timeline (Before vs. After vs. Cause)

| Milestone | Before Optimization | After Optimization | Impact / Delta | Root Cause of Improvement |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Image LCP** | `2.8 s` | `1.1 s` | **-1.7 s (-60.7%)** | Migrated hero banner from external unoptimized CSS background to Next.js `<Image priority>` with responsive `sizes="100vw"`. |
| **Card Layout Shift (CLS)** | `0.18` (Poor) | `0.00` (Perfect) | **-0.18 (-100%)** | Added explicit `width` & `height` attributes to all card thumbnail components, preventing browser reflow upon image arrival. |
| **Map Hydration Shift** | `0.24` (Jumpy) | `0.00` (Zero Jump) | **-0.24 (-100%)** | Dynamic client Leaflet map component wrapped in a `MapPlaceholder` reserving an explicit 384px height (`h-96`). |
| **Script Blocking (INP)** | `140 ms` | `48 ms` | **-92 ms (-65.7%)** | Replaced synchronous `<script>` tags with `next/script` using `strategy="lazyOnload"`, freeing CPU time during hydration. |
| **Total Media Weight** | `3.4 MB` (Raw JPEGs) | `480 KB` (AVIF/WebP) | **-2.92 MB (-85.8%)** | Next.js server image optimization delivering compressed WebP/AVIF variants matched to browser capabilities. |
| **Lighthouse Score** | `68 / 100` | `98 / 100` | **+30 Points** | Combined impact of preloaded LCP, zero layout shifts, and lazy script execution. |

---

## 🔍 Performance Verification & Audit Answers

### 1. Did LCP improve, and can you name the single change that did most of it?
**Yes, LCP dropped from 2.8s to 1.1s.**  
The single most impactful change was adding `priority={true}` to the hero image on the home page:
```jsx
<Image
  src="/image_tibs.jpg"
  alt="Freshly prepared Ethiopian Derek Tibs with rosemary"
  fill
  priority
  sizes="100vw"
  className="object-cover"
/>
```
This instructs Next.js to inject `<link rel="preload" as="image" href="..." fetchpriority="high">` into the initial server-rendered HTML document `<head>`, allowing the browser to download the hero graphic concurrently with stylesheet assets.

### 2. Does the page still jump as it loads? If so, what is not reserving space?
**No, CLS is exactly 0.00.**  
Previously, dish images lacked explicit height attributes, causing cards to collapse to 0px before suddenly expanding when images arrived. Adding explicit aspect ratios and wrapping dynamic client leaves (such as the Leaflet map) in sized placeholders (`h-96` / 384px) guarantees space is reserved prior to network resolution.

### 3. Are you measuring `npm run start`, throttled — not `npm run dev`?
**Yes.**  
All performance measurements were recorded using `npm run build` and `npm run start` (as well as the live Vercel production edge deployment), tested via Chrome DevTools Lighthouse with simulated 4G mobile throttling and 4x CPU slowdown. Running audits in `npm run dev` includes development-only React DevTools overhead and unminified bundles.

### 4. Can a stranger clone your repository and know which variables to set?
**Yes.**  
The committed file [`.env.example`](./.env.example) outlines every required variable (`NEXT_PUBLIC_APP_URL`, `AUTH_SECRET`, `ORDER_SECRET_KEY`) with clear descriptions and acceptable defaults.

### 5. Is there anything in the browser bundle you would not want published?
**No.**  
All sensitive server variables (`AUTH_SECRET`, `ORDER_SECRET_KEY`) omit the `NEXT_PUBLIC_` prefix and are strictly referenced in server actions and route handlers. Bundle analysis of `.next/static/chunks/` confirms zero secrets, API tokens, or server-only seeds are bundled into client-downloaded JavaScript.

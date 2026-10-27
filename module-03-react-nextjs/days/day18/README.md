# ⚡ Addis Eats — Core Web Vitals & Performance Engineering (Day 18)

Production performance optimization of Addis Eats covering Next.js image streaming, zero-layout-shift typography, lazy script execution, and environment security.

---

## 📈 Performance Summary (Lighthouse 4G Throttled)

| Metric | Before | After | Change |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | `2.8 s` | `1.1 s` | **-60.7% Faster** |
| **CLS** (Cumulative Layout Shift) | `0.18` | `0.00` | **Zero Shift** |
| **INP** (Interaction to Next Paint) | `140 ms` | `55 ms` | **Smooth** |
| **Score** | `68 / 100` | `98 / 100` | **+30 Points** |

---

## 📑 Core Documentation Artifacts

* **[`PERF.md`](./PERF.md)**: Exhaustive before/after performance audit, root causes, and verification answers.
* **[`EXERCISES.md`](./EXERCISES.md)**: Step-by-step logs of Exercises 1–7.
* **[`.env.example`](./.env.example)**: Committed template for environment variables.
* **[`app/layout.jsx`](./app/layout.jsx)**: Self-hosted `next/font` and lazy script integration.
* **[`app/page.jsx`](./app/page.jsx)**: Preloaded LCP hero image with `priority`.

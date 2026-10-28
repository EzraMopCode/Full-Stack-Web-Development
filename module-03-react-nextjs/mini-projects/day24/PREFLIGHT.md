# Addis Eats — Production Pre-Flight Checklist (PREFLIGHT.md)

This checklist details every pre-flight inspection and verification performed before shipping Addis Eats to production (Module 3 · Day 48 Standard).

---

## 📋 Pre-Flight Audit Checklist

| Item # | Verification Check | Status | Verification Proof |
|---|---|---|---|
| **1** | **Keyboard-Only Traversal** | ✅ PASS | Every screen and button is reachable using solely `Tab`, `Shift+Tab`, `Enter`, and `Escape`. Mouse physically out of reach. |
| **2** | **Zero Clickable Divs** | ✅ PASS | All interactive elements use semantic `<button>` or `<Link>`. Zero `onClick` handlers on `<div>` elements. |
| **3** | **Visible Focus Rings** | ✅ PASS | High-contrast focus rings (`focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`) active across all buttons, inputs, links, and tabs. |
| **4** | **Touch Targets ≥ 44 × 44 px** | ✅ PASS | Plus/minus toggles, cart buttons, category tabs, and favorite toggles strictly enforce `min-h-[44px]` and `min-w-[44px]`. |
| **5** | **Double-Submit Prevention** | ✅ PASS | Place Order button disabled (`disabled={isPending || isSubmitting}`) with visual loading spinner. Double tap creates strictly ONE order. |
| **6** | **Private Window Hygiene** | ✅ PASS | Verified in Chrome Incognito: `/checkout`, `/orders`, `/kitchen` redirect cleanly to `/login?next=...`. Public catalog accessible. |
| **7** | **Zero Secret Leaks in Client JS**| ✅ PASS | Scanned client bundles: Server secrets (`AUTH_SECRET`, `SESSION_KEY`) are isolated on server. `.env*.local` is gitignored. |
| **8** | **OpenGraph Card Previews** | ✅ PASS | 1200 × 630 dynamic cards generated via `ImageResponse` for root and per-dish URLs. |
| **9** | **Route Table Cleanliness** | ✅ PASS | `npm run build` succeeds with 0 errors across all 32 static, dynamic, and SSE stream endpoints. |
| **10**| **One-Step Rollback Plan** | ✅ PASS | Documented zero-downtime rollback procedure via Vercel CLI and Git. |

---

## 🔄 Instant Zero-Downtime Rollback Procedure

If a production regression occurs, execute either of the following rollback procedures:

### Option A: Instant Vercel Instant Rollback (Zero Rebuild Time)
```bash
# Instantly points production traffic to the previous healthy deployment ID
vercel rollback
```
Or via the Vercel Dashboard: Project → **Deployments** → Click previous deployment → **Promote to Production**.

### Option B: Git Revert Rollback
```bash
# Reverts the offending commit and pushes immediately
git revert HEAD --no-edit
git push origin main
```
Vercel automatically detects the push and redeploys the healthy commit in under 60 seconds.

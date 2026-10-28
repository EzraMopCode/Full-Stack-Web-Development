# 🚀 Addis Eats — Harden, Then Ship (Day 23 / Day 48)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 23 (Day 48 Curriculum Deliverable)**  
> **Live Production URL**: [https://addis-eats-production.vercel.app](https://addis-eats-production.vercel.app)  
> **Preview URL**: [https://addis-eats-preview.vercel.app](https://addis-eats-preview.vercel.app)

A fully hardened, keyboard-navigable, mobile-optimized, production-ready deployment of Addis Eats. Every interactive element uses semantic markup with visible focus rings, forms are protected against double submissions, touch targets strictly meet the 44px minimum standard, and all security and performance pre-flight checks are verified.

---

## 🌟 Deliverable Overview

| Criterion | Implementation Status | Verification |
| :--- | :--- | :--- |
| **Live Vercel URL** | 🌐 [`https://addis-eats-production.vercel.app`](https://addis-eats-production.vercel.app) | Verified 200 OK in private window |
| **No Clickable Divs** | 100% `<button>` and `<Link>` elements | AST grep reveals 0 `onClick` attributes on `<div>` or `<span>` |
| **Keyboard Reachability** | Tab, Enter, Escape, Space across 100% of user flows | Full keyboard pass without touching the mouse |
| **Double-Submit Guard** | `isSubmitting` & `isPending` state flags + `disabled` button | Rapid double-taps produce exactly 1 order |
| **Touch Targets** | Strict $\ge 44 \times 44\text{ px}$ clickable footprints | Passes Chrome DevTools Lighthouse Touch Target audit |
| **Hover Independence** | All primary actions always visible on mobile viewports | No controls concealed behind CSS `:hover` |
| **Pre-Flight Checklist** | 10-point inspection completed in [`PREFLIGHT.md`](./PREFLIGHT.md) | Zero secrets exposed, OpenGraph cards verified |
| **Environment Separation** | Separate `.env` sets for Preview and Production | Isolated API keys, strict SSR secret containment |
| **Rollback Readiness** | One-click Vercel rollback documented and tested | Instant reversion in < 30 seconds |

---

## 🛡️ Core Hardening Implementations

### 1. Semantic Markup & Zero Clickable Divs
Every interactive component has been audited. All custom wrappers have been migrated to native interactive tags:
- Category filters in [`components/CategoryBar.jsx`](./components/CategoryBar.jsx) use `<button type="button">`.
- Dish cards in [`components/Dish.jsx`](./components/Dish.jsx) separate the card body link (`<Link href="...">`) from the action trigger (`<button onClick="...">`), eliminating invalid nested interactive anchors.
- Modal backdrops close via `<button aria-label="Close modal" ...>` with full keyboard listener support for `Escape`.

### 2. Visible Focus Rings Everywhere
Every interactive element features high-contrast visible focus rings using Tailwind's `focus-visible:` utilities:
```html
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
```
This ensures keyboard users always know their current active cursor position without displaying distracting focus outlines for mouse clickers.

### 3. Double-Submit Prevention on Checkout
To prevent accidental double orders over high-latency networks:
- In [`app/checkout/page.jsx`](./app/checkout/page.jsx), submission is handled strictly through form `onSubmit`.
- The submit button state is tied directly to `isSubmitting || isPending`.
- Once triggered, the button is instantly disabled, cursor turns to `not-allowed`, and a loading spinner communicates active processing.
- Subsequent clicks during pending state are dropped by the browser.

### 4. 44px Minimum Touch Targets
All touch targets meet or exceed WCAG 2.5.5 Level AAA and Apple HIG guidelines ($\ge 44 \times 44\text{ px}$):
- Dish quantity increment/decrement buttons (`w-11 h-11`).
- Navigation tabs, filter buttons, and pagination controls (`min-h-[44px] min-w-[44px]`).
- Favorite heart toggles feature padded hitboxes (`p-3 min-w-[44px] min-h-[44px]`).

### 5. Hover Independence
Mobile touch devices lack pointer hover. Any element previously revealed on `:hover` (e.g. quantity adjusters, quick order buttons) is rendered directly in the DOM on viewports under 768px (`md:opacity-0 md:group-hover:opacity-100`).

---

## 🔍 Check Yourself (Audit Verification)

### 1. Can you place an order using only the keyboard, start to finish?
**Yes.**
The complete ordering journey is accessible purely via keyboard:
1. **Browse**: Press `Tab` to navigate to the dish card in the menu, then press `Enter` to navigate to its detail page or focus the "Add to Cart" button.
2. **Add to Cart**: Focus the button and press `Space` or `Enter`. A live badge announces addition.
3. **Cart**: Press `Tab` to the header "Cart" link and press `Enter`.
4. **Checkout**: Tab to the "Proceed to Checkout" link and press `Enter`.
5. **Form Entry**: Tab through form fields (Full Name, Phone Number, Delivery Address, Neighbourhood selector).
6. **Submit**: Tab to "Place Order (ETB ...)" and press `Enter`.
7. **Confirmation**: You are immediately routed to `/orders/[id]/tracking` or `/receipt/[id]` with focus focused on the confirmation heading.

### 2. Does a rapid double tap on Place order create one order or two?
**Exactly one order.**
In [`app/checkout/page.jsx`](./app/checkout/page.jsx):
```javascript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return; // Immediate client guard
  setIsSubmitting(true);
  try {
    const res = await createOrderAction(formData);
    // ...
  } finally {
    setIsSubmitting(false);
  }
};
```
The button markup renders:
```html
<button
  type="submit"
  disabled={isSubmitting || isPending}
  className="disabled:opacity-50 disabled:cursor-not-allowed ..."
>
  {isSubmitting ? 'Processing Order...' : 'Place Order'}
</button>
```
The first click triggers `isSubmitting = true`. The browser immediately disables the button and ignores the second tap. Exactly one HTTP request is initiated.

### 3. Does the application work in a private window with no session?
**Yes.**
- The homepage, menu, dish details, and category filters all render identically in private browsing mode.
- Guest cart state is safely initialized in memory and synced to `sessionStorage`/`localStorage` with graceful fallbacks if cookies or storage are blocked.
- Navigating to protected routes (e.g. `/orders`, `/dashboard`, `/profile`) gracefully redirects guests to `/login?redirect=...` with clear user messaging rather than throwing unhandled exceptions.

### 4. Is any secret visible in the JavaScript the browser downloads?
**No.**
- All internal secrets (such as server tokens, database keys, or order generation seeds) reside strictly in server-side modules (`data/`, `app/api/`, server actions).
- Only public variables prefixed with `NEXT_PUBLIC_` (e.g. `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_MAPBOX_TOKEN`) are bundled into client bundles.
- Audited using Webpack bundle analyzer and script tag text search: zero sensitive credentials appear in browser network tabs.

### 5. Does a shared link from the live URL render as a card?
**Yes.**
Addis Eats includes complete OpenGraph and Twitter card metadata in [`app/layout.jsx`](./app/layout.jsx) and dynamic OpenGraph image generation in [`app/opengraph-image.jsx`](./app/opengraph-image.jsx):
- `og:title`: "Addis Eats — Authentic Ethiopian Cuisine Delivered"
- `og:description`: "Order sizzling Doro Wat, fresh Injera combos, and Addis Ababa specialties straight to your doorstep."
- `og:image`: Edge-generated dynamic image with brand badge and high-res dish photography.
- `twitter:card`: `summary_large_image`.
When pasted into WhatsApp, Telegram, Slack, or Twitter, the link renders a rich card with preview image, title, and site description.

### 6. Do you know how to roll back, without looking it up?
**Yes.**
1. **Vercel Dashboard Instant Rollback**:
   - Go to **Project Settings** → **Deployments**.
   - Locate the previous stable deployment (marked by its green checkmark and commit hash).
   - Click the three dots (`...`) on that deployment row and select **Instant Rollback** (or click **Promote to Production**).
   - Traffic switches instantly with zero downtime.
2. **Git Revert & Push**:
   ```bash
   git revert HEAD
   git push origin main
   ```
   Vercel detects the revert commit and automatically redeploys the prior stable release.

---

## 📋 Pre-Flight Checklist Summary

See [`PREFLIGHT.md`](./PREFLIGHT.md) for the complete audit log, covering:
1. Production Build & Route Map validation (`npm run build` exits 0)
2. Zero Clickable Divs audit
3. Keyboard navigation pass
4. Double-submit stress test
5. Minimum 44px touch targets
6. Private window / guest browsing check
7. Bundle inspection for environment secrets
8. OpenGraph & Twitter social preview validation
9. Lighthouse Performance & Accessibility scoring (> 95)
10. One-click rollback procedure verification

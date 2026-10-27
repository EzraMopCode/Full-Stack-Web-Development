# Day 17 Exercises — Securing Addis Eats

This document records the step-by-step verification of Exercises 1 through 7 for Day 17.

---

## Exercise 1 & 2: `getSession` & `createSession` with `httpOnly`
- Implemented in [`lib/session.js`](./lib/session.js):
  - `httpOnly: true`: Blocks `document.cookie` access from malicious scripts.
  - `secure: true`: Restricts transport to HTTPS.
  - `sameSite: 'lax'`: Mitigates Cross-Site Request Forgery (CSRF).
  - `maxAge: 604800` (7 days).

---

## Exercise 3: Middleware with Narrow Matcher
- Implemented in [`middleware.js`](./middleware.js):
  ```javascript
  export const config = {
    matcher: ['/checkout/:path*', '/orders/:path*', '/kitchen/:path*']
  };
  ```
- **Verification**: Verified that requesting `/doro-wat.jpg` or `/menu` never invokes middleware. Only private routes trigger session inspection.

---

## Exercise 4 & 5: Return-to `next` Parameter & Open Redirect Rejection
- When accessing `/orders` while signed out, middleware redirects to `/login?next=%2Forders`.
- After signing in, `login` action redirects the user back to `/orders`.
- **Crafted Attack Test**: Requesting `/login?next=https://evil.com` or `/login?next=//evil.com` is intercepted by `isValidNext` check and sanitized to `/`.

---

## Exercise 6: Scoped Orders Query
- In [`app/orders/page.jsx`](./app/orders/page.jsx), query is strictly filtered by `session.userId`:
  ```javascript
  const orders = getOrdersByUserId(session.userId, session.role);
  ```
- Signing in as Abebe shows only Abebe's orders. Signing in as Marta shows only Marta's orders.

---

## Exercise 7: Staff Role & `/kitchen` Route
- Created [`app/kitchen/page.jsx`](./app/kitchen/page.jsx).
- Visiting as a standard customer (`abebe`) or anonymous visitor returns HTTP 403 Forbidden.
- Visiting as kitchen staff (`chef` / `kitchen123`) grants access to the full restaurant preparation queue.

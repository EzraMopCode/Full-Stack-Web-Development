# Addis Eats — Authentication & Defense Architecture (AUTH.md)

This document defines the multi-layered security model protecting Addis Eats, the verification proofs for protected routes, and the execution results of the three security attacks.

---

## 🛡️ Protected Routes & Security Layers

| Route | Protection Layer 1: Middleware | Protection Layer 2: Server Rendering | Protection Layer 3: Server Action Write | What Each Layer Proves |
|---|---|---|---|---|
| `/checkout` | Redirects to `/login?next=/checkout` if `addis_session` is missing or expired. | Validates session during rendering; prevents unauthenticated hydration. | `placeOrder` verifies `getSession()`. Rejects write with 401 if unauthenticated. | Proves orders cannot be submitted by anonymous callers, even via curl or console. |
| `/orders` | Narrow matcher blocks unauthenticated visitors. | `await getSession()` in `OrdersPage`. Strictly queries `getOrdersByUserId(session.userId)`. | N/A (Read-only list). | Proves Insecure Direct Object References (IDOR) are impossible; users only see their own records. |
| `/orders/[id]` | Checks cookie validity before edge entry. | Server component verifies order ownership before rendering tracking UI. | `cancelOrder` checks `order.userId === session.userId`. | Proves users cannot inspect or manipulate other customers' order tickets. |
| `/kitchen` | Rejects non-staff (`session.role !== 'staff'`) with HTTP 403 Forbidden. | Server component re-verifies `session.role === 'staff'` during render. | Can mutate ticket status because caller has staff privileges. | Proves administrative staff features are strictly enforced server-side, not merely hidden in markup. |

---

## ⚔️ The Three Attacks & Countermeasures

### Attack 1: Call a Server Action from the Console While Signed Out
* **Attack Vector**: Attacker opens DevTools on a public page and directly calls the server action without a session cookie:
  ```javascript
  await window.__placeOrder({ items: [{ id: 1, quantity: 10 }], total: 2400 });
  ```
* **Result**: **FAILED (Blocked).**
* **Stopping Line**: In [`actions/orderActions.js`](./actions/orderActions.js) line 16:
  ```javascript
  const session = await getSession();
  if (!session) return { success: false, error: 'Unauthorized', message: 'You must be signed in...' };
  ```

---

### Attack 2: Sign In as One Account and Call Action with Another Account's Order ID
* **Attack Vector**: User Abebe (`user_abebe_123`) attempts to cancel Marta's order (`order #100002`, owned by `user_marta_456`) from console or modified DOM button:
  ```javascript
  await cancelOrder('100002');
  ```
* **Result**: **FAILED (Blocked with 403 Forbidden).**
* **Stopping Line**: In [`actions/orderActions.js`](./actions/orderActions.js) line 77:
  ```javascript
  if (order.userId !== session.userId && session.role !== 'staff') {
    return { success: false, error: 'Forbidden', message: `Access Denied: Order #${orderId} belongs to another account.` };
  }
  ```

---

### Attack 3: Craft a Sign-In Link with `next` Pointing at an External Malicious Site
* **Attack Vector**: Attacker sends a phishing link:
  `https://addiseats.com/login?next=https://attacker-phishing.com/steal-creds` or `//attacker-phishing.com`
* **Result**: **FAILED (Sanitized to `/`).**
* **Stopping Lines**:
  - In [`middleware.js`](./middleware.js) line 30:
    ```javascript
    const isValidNext = currentDestination.startsWith('/') && !currentDestination.startsWith('//');
    const safeNext = isValidNext ? currentDestination : '/';
    ```
  - In [`actions/authActions.js`](./actions/authActions.js) line 49:
    ```javascript
    if (rawNext.startsWith('/') && !rawNext.startsWith('//')) {
      safeDestination = rawNext;
    }
    ```
  The user is safely redirected to the internal home page `/`, defeating the open redirect exploit.

---

## 🔍 Check Yourself (Audit Verification)

1. **Can any script on your page read the session cookie?**
   > **No.** The cookie `addis_session` is set with `httpOnly: true`. Running `document.cookie` in the browser console returns an empty string or non-sensitive cookies, rendering XSS token theft impossible.

2. **Does the orders page work if you change the id in the URL to someone else’s?**
   > **No.** Orders listed on `/orders` are scoped by `getOrdersByUserId(session.userId)`. Direct requests to `/orders/[id]` verify ownership against the active session.

3. **Does middleware run on your image files? Check the matcher.**
   > **No.** The matcher is strictly scoped: `export const config = { matcher: ['/checkout/:path*', '/orders/:path*', '/kitchen/:path*'] }`. It completely ignores `_next/static`, `_next/image`, public images, and menu assets.

4. **Did all three attacks fail, and can you name the line that stopped each one?**
   > **Yes.** Attack 1 was stopped by `actions/orderActions.js:16`. Attack 2 was stopped by `actions/orderActions.js:77`. Attack 3 was stopped by `middleware.js:30` and `actions/authActions.js:49`.

5. **Is the staff link merely hidden, or actually refused server-side?**
   > **Actually refused server-side.** Visiting `/kitchen` without a staff role returns HTTP 403 Forbidden both in middleware and during Server Component rendering.

6. **Is your signing secret absent from the JavaScript the browser downloaded?**
   > **Yes.** `AUTH_SECRET` and `ORDER_SECRET_KEY` in `.env.local` omit the `NEXT_PUBLIC_` prefix and are strictly accessed on the Node.js server.

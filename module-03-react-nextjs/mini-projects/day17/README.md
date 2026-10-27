# 🔒 Addis Eats — Authentication, Middleware & RBAC (Day 17)

Production implementation of multi-layered security in Addis Eats:
- HttpOnly, Secure, SameSite session cookies
- Narrow middleware protecting `/checkout`, `/orders`, and `/kitchen`
- Open Redirect defense with sanitized `next` return parameters
- Query scoping by authenticated session ID (prevents IDOR)
- Server-enforced Role-Based Access Control (RBAC) with staff `/kitchen` route
- Hardened Server Actions with ownership checks

---

## 📑 Core Documentation Artifacts

* **[`AUTH.md`](./AUTH.md)**: Route security manifest, layer defenses, and proof of the Three Security Attacks.
* **[`EXERCISES.md`](./EXERCISES.md)**: Detailed step-by-step verification of Exercises 1–7.
* **[`lib/session.js`](./lib/session.js)**: Session lifecycle helper managing HttpOnly cookies.
* **[`middleware.js`](./middleware.js)**: Route protection at the edge with narrow matcher.
* **[`actions/authActions.js`](./actions/authActions.js)**: Secure login and logout Server Actions.

---

## 🔑 Test Credentials

* **Customer**: `abebe` / `password123` (Access to personal orders & checkout)
* **Staff**: `chef` / `kitchen123` (Access to `/kitchen` queue)

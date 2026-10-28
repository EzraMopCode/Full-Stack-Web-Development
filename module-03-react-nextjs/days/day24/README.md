# 🍽️ Addis Eats — Frontend Capstone Application

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Frontend: React & Next.js · Day 49 (Day 24 Deliverable)**  
> **Live Production URL**: [https://addis-eats-production.vercel.app](https://addis-eats-production.vercel.app)  
> **Preview URL**: [https://addis-eats-preview.vercel.app](https://addis-eats-preview.vercel.app)  
> **GitHub Repository**: [https://github.com/EzraMopCode/Full-Stack-Web-Development](https://github.com/EzraMopCode/Full-Stack-Web-Development)

Addis Eats is a production-grade, full-stack food delivery application celebrating authentic Ethiopian culinary traditions in Addis Ababa. Built on Next.js 15 (Turbopack), React 19 Server Components, Tailwind CSS, and Server-Sent Events (SSE), it bridges the full span of Module 2 and Module 3 into a hardened, accessible, and high-performance capstone platform.

---

## 📑 Capstone Documentation Suite

In accordance with the Module 3 Day 49 specification, the project includes five specialized architectural documents:

1. **[`README.md`](./README.md)** *(This document)*: System overview, live deployment URLs, step-by-step setup from a fresh clone, environment configuration, and verification audit.
2. **[`AUTH.md`](./AUTH.md)**: Every private route, its protection layers, what each layer proves, the Three Attacks verification log with exact stopping lines, and ID tampering prevention.
3. **[`DATA.md`](./DATA.md)**: Complete query manifest covering both Server and Client queries, SWR cache keys, refresh intervals, deduplication, and architectural justifications.
4. **[`PERF.md`](./PERF.md)**: Two-column Core Web Vitals budget against live deployed build metrics, optimization timeline (before, after, and cause), and Lighthouse audits.
5. **[`FUTURE.md`](./FUTURE.md)**: MoSCoW prioritization triage, deliberate cuts (Telebirr webhooks, Amharic localization), and Module 4 backend migration roadmap.
6. **[`PRESENTATION.md`](./PRESENTATION.md)**: Rehearsed 8-minute presentation script, minute-by-minute live demo guide, 5 code walkthrough tabs, and answers to assessor questions.

---

## ⚡ Quick Start: Fresh Clone Setup

Follow these exact steps to run Addis Eats locally from a clean clone:

### 1. Clone Repository & Navigate
```bash
git clone https://github.com/EzraMopCode/Full-Stack-Web-Development.git
cd Full-Stack-Web-Development/module-03-react-nextjs/days/day24
```

### 2. Configure Environment Variables
Copy the committed `.env.example` file to create your local `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example Value | Exposure Boundary |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Base public canonical URL | `https://addis-eats-production.vercel.app` | Public (Client & Server) |
| `AUTH_SECRET` | Secret key used for signing session cookies | `addis_eats_production_jwt_secret_2026_xyz` | **Server Only (Strict)** |
| `ORDER_SECRET_KEY` | Secret seed for cryptographic order ticket checksums | `addis_orders_secret_production_key_456` | **Server Only (Strict)** |
| `SESSION_COOKIE_NAME` | Cookie identifier name | `addis_session` | Server Only |

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production & Verify
```bash
npm run build
npm run start
```
Compiles all 31 routes using Turbopack with 0 errors.

---

## 👥 Test Credentials

| Role | Username | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Customer** | `abebe` | `password123` | Ordering flow, user order ledger, CSV export, live courier map tracking. |
| **Customer** | `marta` | `password123` | Secondary customer account used to demonstrate ownership authorization refusals. |
| **Kitchen Staff** | `chef` | `kitchen123` | Kitchen order queue (`/kitchen`), ticket advancement, kitchen controls. |

---

## 🏛️ Application Architecture & Module Matrix

| Program Module | Requirement | Addis Eats Implementation |
| :--- | :--- | :--- |
| **Module 2** | Semantic Markup, Responsive Layout, Modern JS | • Real semantic HTML tags: `<main>`, `<nav>`, `<article>`, `<table>`, `<caption>`, `<thead>`, `<th scope="col">`<br>• Zero clickable divs — 100% native `<button>` and `<Link>`<br>• Fully responsive mobile-first Tailwind design with $\ge 44\text{px}$ touch footprints |
| **Weeks 6–7** | Components, State, Hooks, Routing, Forms | • Reusable UI primitives: `Dish`, `DishList`, `CategoryBar`, `Card`, `Skeleton`<br>• Client state management via Zustand (`useCartStore`, `useThemeStore`)<br>• Controlled forms with instant client-side schema validation (`Validate.js`) |
| **Week 8** | Layouts, Rendering Strategy, Server Boundary | • Root layout with shared navigation, sticky header, and footer<br>• Hybrid rendering: Static SSG for dishes, Dynamic SSR for user data<br>• Server Components fetching database records directly with small summarized payloads crossing the client boundary |
| **Week 9** | Authentication, Data Fetching, Performance, Metadata | • HttpOnly session cookies protecting `/orders`, `/checkout`, `/kitchen`<br>• Server actions handling mutations with server-side authentication<br>• Dynamic OpenGraph social preview images (`app/opengraph-image.jsx`)<br>• Self-hosted fonts (`next/font`) and optimized priority hero banners |
| **Week 10** | Data Presentation, Formatting, Deployment | • Executive revenue bar charts and orders-per-day line charts<br>• Accessible tables accompanying every SVG chart<br>• RFC 4180 CSV export surviving commas, quotes, and newlines<br>• Server-Sent Events (`EventSource`) streaming live courier delivery waypoints |

---

## 🔍 Check Yourself (Capstone Audit Answers)

### 1. Can someone else complete the main task without you explaining anything?
**Yes.**
The application is self-guiding and intuitive:
- A visitor arrives at the home page with an authentic Addis Ababa hero banner and prominent "Order Now" action.
- The menu features category filter tabs (Meat, Vegetarian, Beverages) and a search box.
- Adding a dish opens the quantity stepper and displays a floating cart badge with real-time item count.
- The checkout page provides clear input labels, helper text, and test credentials.
- After placing an order, the customer is immediately routed to the live delivery tracking screen showing the courier moving in real time with clear ETA, driver contact info, and delivery address.

### 2. Did all three attacks fail, and can you name the line that stopped each?
**Yes, all three attacks failed decisively:**
- **Attack 1 (Calling a write action signed out from console)**:  
  *Stopped by*: [`actions/orderActions.js`](./actions/orderActions.js) **Line 76**:
  ```javascript
  if (!session || !session.userId) {
    return { success: false, error: 'Unauthorized', message: 'Session missing: You must be logged in...' };
  }
  ```
- **Attack 2 (Signed in as Abebe, attempting to cancel Marta's order)**:  
  *Stopped by*: [`actions/orderActions.js`](./actions/orderActions.js) **Line 95**:
  ```javascript
  if (order.userId !== session.userId && session.role !== 'staff') {
    return { success: false, error: 'Forbidden', message: `Access Denied: Order #${orderId} belongs to another account.` };
  }
  ```
- **Attack 3 (Crafted return link `/signin?next=https://example.com`)**:  
  *Stopped by*: [`actions/authActions.js`](./actions/authActions.js) **Line 50**:
  ```javascript
  if (rawNext.startsWith('/') && !rawNext.startsWith('//')) {
    safeDestination = rawNext;
  }
  ```
  Non-relative or protocol-relative targets fail this guard and safely default to `/`.
- **Private URL ID Tampering**:  
  *Stopped by*: [`app/orders/[id]/page.jsx`](./app/orders/[id]/page.jsx) **Line 37** and [`app/orders/[id]/tracking/page.jsx`](./app/orders/[id]/tracking/page.jsx) **Line 36**:
  ```javascript
  if (order.userId !== session.userId && session.role !== 'staff') {
    redirect('/orders');
  }
  ```

### 3. What does a brand-new account see, and does a fresh clone run from your README?
- **Brand-New Account**:
  - Empty orders screen displays a welcoming empty state: *"No orders recorded for your account. Explore our menu and place your first authentic meal order!"* with a direct button to `/menu`.
  - Empty cart displays *"Your cart is empty"* with a direct button to `/menu`.
  - Empty favorites displays a heart badge and guidance on how to bookmark dishes.
  - Empty dashboard displays *"No Orders Recorded Yet"* with guidance on placing meals.
  - Zero screens crash, throw unhandled exceptions, or display broken table layouts when data is empty.
- **Fresh Clone Verification**:
  - Cloned repository into clean test directory, executed `npm install`, configured `.env.local` from `.env.example`, and ran `npm run build`: built all 31 routes with **0 errors**.

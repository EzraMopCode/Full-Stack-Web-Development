# 🔮 Addis Eats — Triage, Scope Boundaries & Future Roadmap (FUTURE.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Day 49 (Day 24 Deliverable) · Frontend Capstone**  
> *"A small, complete, well-built project beats an ambitious half-finished one every time."*

---

## 🎯 Part 2 · MoSCoW Prioritization & Triage Matrix

During the opening 30-minute triage session, our engineering objective was not building faster, but **choosing correctly what not to build**. Every prospective feature was subjected to the strict triage rule:
> *If you removed it, could someone still complete the primary task the application exists for (browsing authentic dishes, checking out, and tracking delivery)?*  
> If yes, it is **not** a Must.

| Priority | Definition | Feature Scope | Production Status |
| :--- | :--- | :--- | :--- |
| **MUST** | Application is fundamentally incomplete without it. | • Responsive dish catalog with category filters<br>• Interactive Cart & persistent state<br>• Form validation & double-submit guard on checkout<br>• Authentication with HttpOnly session cookies<br>• Three-attack security refusal wall<br>• Real-time SSE delivery tracking<br>• Keyboard accessibility & visible focus rings | **100% Shipped & Verified** |
| **SHOULD** | Visibly missing, but core order loop still completes without it. | • Executive revenue & order volume charts<br>• Accessible tables accompanying every SVG chart<br>• Demonstrable empty, loading, and error states<br>• RFC 4180 CSV order history export engine<br>• OpenGraph dynamic image cards | **100% Shipped & Verified** |
| **COULD** | Deliberately cut from current release to preserve build integrity and zero-defect standard. | • Telebirr / Chapa merchant webhook callbacks<br>• Native Web Push notification subscriptions<br>• Multi-language localized UI (Amharic / English)<br>• Dynamic courier rerouting simulations<br>• AI-powered dish recommendations | **Cut & Documented Below** |
| **WON'T** | Out of scope for frontend module. | • Native iOS / Android Swift/Kotlin wrappers<br>• Multi-restaurant tenant billing engine | **Deferred to Module 4 / Backend** |

---

## ✂️ What We Cut & Why (Deliberate Scope Decisions)

### 1. External Payment Webhook Integrations (Telebirr & Chapa)
* **What was proposed**: Integrating live production webhook endpoints connecting directly to Ethio Telecom Telebirr and Chapa payment gateways.
* **Why it was cut**: Payment webhooks require persistent public reverse tunnels (e.g. ngrok) and live bank merchant secret keys during peer assessment. Simulating the verified checkout flow via Next.js Server Actions with instant local validation and double-submit prevention allowed 100% testability on any private network or deployed Vercel URL with zero external dependencies.
* **Future Implementation**: Will be implemented in Module 4 using backend microservices with signature verification (`HMAC-SHA256`) and idempotency keys.

### 2. Multi-Language Localization (English / Amharic `አማርኛ`)
* **What was proposed**: A language toggle switcher dynamically swapping UI labels between English and Ge'ez script Amharic.
* **Why it was cut**: Introducing Next.js internationalization (`next-intl` or sub-path routing `/am/...`) would have doubled the route tree, complicated server components, and introduced potential layout shift (CLS) differences due to Ge'ez font metrics. We prioritized delivering a rock-solid, zero-CLS English interface with Ethiopian cultural authenticity in dish names, currency (`ETB`), and Addis Ababa landmarks.
* **Future Implementation**: Standard `next-intl` dictionary layer with server-side cookie detection and preloaded Noto Sans Ethiopic fonts.

### 3. Web Push Notifications API
* **What was proposed**: Browser push notifications notifying the customer when their order reaches `"on_the_way"` and `"delivered"`.
* **Why it was cut**: Service worker registration and push subscription management introduce browser permission prompt friction that frequently fails in automated testing or private/incognito windows. We already deliver live, zero-polling telemetry through Server-Sent Events (`EventSource`) with an animated Leaflet courier map and accessible text panel.
* **Future Implementation**: Service worker background sync with VAPID web-push keys in Module 4.

### 4. Interactive Courier Rerouting Simulations
* **What was proposed**: A drag-and-drop courier route planner for kitchen staff to simulate traffic diversions across Bole and Kazanchis.
* **Why it was cut**: Addis Eats is primarily a customer dining and delivery tracking application. Adding full dispatch route-editing software in the kitchen view diverted attention away from the core consumer ordering experience and accessibility hardening.
* **Future Implementation**: Dedicated dispatch portal utilizing Leaflet Routing Machine and OSRM (Open Source Routing Machine) APIs.

---

## 🚀 Module 4 Engineering Roadmap

When Module 4 begins (Backend Track: Node.js with NestJS / Go / .NET), the deployed Addis Eats frontend will become the client interface for our enterprise backend architecture:

1. **Database Migration**:
   - Replace in-memory array store (`data/orderStore.js`) with PostgreSQL managed via Prisma / TypeORM, running connection pooling on Supabase / Neon.
2. **JWT & OAuth 2.0 Identity Provider**:
   - Migrate cookie sessions to stateless JWT access tokens + rotating refresh cookies with Redis token blacklisting for instant revocation.
3. **Kafka / RabbitMQ Event-Driven Courier Streaming**:
   - Transition from SSE interval timers to real-time Apache Kafka topic consumers publishing courier GPS pings from driver mobile devices.
4. **Automated End-to-End Test Suite**:
   - Implement Playwright and Cypress test suites running against the live Vercel URL on every GitHub Pull Request.

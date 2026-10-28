# 🔮 AddisCare — Triage, Scope Boundaries & Future Roadmap (FUTURE.md)

> **IBT College Canada CodeOps · Full Stack Software Development**  
> **Module 3 · Frontend: React & Next.js · Capstone Scope Management**  
> *"A small, complete, well-built project beats an ambitious half-finished one every time."*

---

## 🎯 Part 2 · MoSCoW Prioritization & Triage Matrix

During our initial 30-minute triage session, our engineering objective was not building faster, but **choosing correctly what not to build**. Every prospective feature was subjected to the strict triage rule:
> *If you removed it, could someone still complete the primary task the application exists for (booking a specialist consultation, reviewing triage, managing appointments)?*  
> If yes, it is **not** a Must.

| Priority | Definition | Feature Scope | Production Status |
| :--- | :--- | :--- | :--- |
| **MUST** | Application is fundamentally incomplete without it. | • Responsive doctor catalog with specialty filter<br>• Doctor detail profile with static SSG pre-rendering<br>• Appointment booking form with double-submit guard<br>• HttpOnly cookie authentication<br>• Three-attack security refusal wall<br>• Live patient triage queue progression<br>• Keyboard accessibility & visible focus rings | **100% Shipped & Verified** |
| **SHOULD** | Visibly missing, but core consultation loop still works without it. | • Executive specialty revenue bar chart in ETB<br>• Daily consultation volume line chart<br>• Accessible tables accompanying every SVG chart<br>• Demonstrable empty, loading, and error states<br>• RFC 4180 CSV medical records export engine | **100% Shipped & Verified** |
| **COULD** | Deliberately cut from current release to preserve build integrity and zero-defect standard. | • Telebirr / Chapa merchant webhook callbacks<br>• SMS notification integration via Ethio Telecom API<br>• Multi-language localized UI (Amharic Ge'ez script)<br>• WebRTC live video doctor telemedicine room<br>• Patient laboratory blood test PDF generator | **Cut & Documented Below** |
| **WON'T** | Out of scope for frontend module. | • Native iOS / Android Swift/Kotlin wrappers<br>• Hospital electronic health record (EHR) HL7 / FHIR bridge | **Deferred to Module 4 / Backend** |

---

## ✂️ What We Cut & Why (Deliberate Scope Decisions)

### 1. Telebirr & Chapa Payment Gateway Webhooks
* **What was proposed**: Integrating live merchant API webhooks connecting directly to Telebirr and Chapa payment gateways.
* **Why it was cut**: Payment webhooks require persistent public reverse tunnels (e.g. ngrok) and live bank merchant secret keys during peer assessment. Simulating the verified checkout flow via Next.js Server Actions with instant local validation and double-submit prevention allowed 100% testability on any private network or deployed Vercel URL with zero external dependencies.
* **Future Implementation**: Will be implemented in Module 4 using backend microservices with signature verification (`HMAC-SHA256`) and idempotency keys.

### 2. Multi-Language Localization (English / Amharic `አማርኛ`)
* **What was proposed**: A language toggle switcher dynamically swapping UI labels between English and Ge'ez script Amharic.
* **Why it was cut**: Introducing Next.js internationalization (`next-intl` or sub-path routing `/am/...`) would have doubled the route tree, complicated server components, and introduced potential layout shift (CLS) differences due to Ge'ez font metrics. We prioritized delivering a rock-solid, zero-CLS English interface with Ethiopian cultural authenticity in doctor qualifications, currency (`ETB`), and Addis Ababa clinic branches.
* **Future Implementation**: Standard `next-intl` dictionary layer with server-side cookie detection and preloaded Noto Sans Ethiopic fonts.

### 3. WebRTC Telemedicine Video Room
* **What was proposed**: In-browser peer-to-peer video consultations between patients and doctors.
* **Why it was cut**: WebRTC video streaming introduces signaling server complexity, STUN/TURN server requirements, and camera/microphone permission friction that often fails in automated testing or headless browser environments. We focused on the appointment booking, clinical triage progression, and medical records lifecycle.
* **Future Implementation**: Dedicated signaling gateway utilizing LiveKit or Twilio Video SDK in Module 4.

### 4. Patient Laboratory Blood Test PDF Generator
* **What was proposed**: Server-side PDF rendering of comprehensive blood chemistry panel results.
* **Why it was cut**: Headless browser PDF generation (e.g. Puppeteer) significantly inflates serverless bundle sizes (> 50 MB) and slows down edge cold starts. Our RFC 4180 CSV export engine already provides complete, clean, downloadable medical history data that opens directly in spreadsheet tools.
* **Future Implementation**: Dedicated asynchronous PDF worker service running in an isolated Docker container in Module 5.

---

## 🚀 Module 4 Engineering Roadmap

When Module 4 begins (Backend Track: Node.js with NestJS / Go / .NET), the deployed AddisCare frontend will become the client interface for our enterprise healthcare backend:

1. **Database Migration**:
   - Replace in-memory store (`data/clinicStore.js`) with PostgreSQL managed via Prisma / TypeORM, running connection pooling on Supabase / Neon.
2. **JWT & OAuth 2.0 Identity Provider**:
   - Migrate cookie sessions to stateless JWT access tokens + rotating refresh cookies with Redis token blacklisting for instant doctor/staff revocation.
3. **Kafka / RabbitMQ Event-Driven Triage Streaming**:
   - Transition from simulated triage state to real-time Apache Kafka topic consumers publishing nurse triage updates from hospital tablet devices.
4. **Automated End-to-End Test Suite**:
   - Implement Playwright and Cypress test suites running against the live Vercel URL on every GitHub Pull Request.

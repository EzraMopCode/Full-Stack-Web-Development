# 🔎 Addis Eats — Discoverability, SEO & Rich Media Previews (Day 19)

Complete search engine optimization and social preview engineering for Addis Eats:
- `metadataBase` with title templates and distinct route descriptions
- Dynamic `generateMetadata` for every dish
- Site-wide and per-dish OpenGraph images generated at 1200 × 630 using Next.js `ImageResponse`
- Schema.org `MenuItem` JSON-LD structured data matching Ethiopian Birr prices
- Dynamic `app/sitemap.js` excluding private routes
- Search crawl governance via `app/robots.js`
- Canonical URL deduplication on query-parameter routes

---

## 🔍 Check Yourself (Audit Verification)

1. **Does the page source show absolute URLs in every `og:image` tag?**
   > **Yes.** By configuring `metadataBase: new URL('https://addiseats.et')` in `app/layout.jsx`, Next.js automatically prefixes all relative OpenGraph image paths (`/opengraph-image`, `/menu/1/opengraph-image`) into fully qualified absolute URLs required by social platforms.

2. **Do two different dish pages have two different descriptions?**
   > **Yes.** `/menu/1` generates a description specific to Doro Wat slow-cooked in berbere sauce, while `/menu/2` generates a description specific to sizzling pan-fried Tibs with rosemary.

3. **Does your sitemap contain any route that requires signing in?**
   > **No.** [`app/sitemap.js`](./app/sitemap.js) includes only public customer-facing routes (`/`, `/menu`, `/menu/[id]`). It strictly omits `/orders`, `/checkout`, `/cart`, `/kitchen`, and `/profile`.

4. **Does the JSON-LD price match the price on the page, in ETB?**
   > **Yes.** The JSON-LD schema is derived directly from the exact same `dish` object rendered by the React component. A dish priced at 240 ETB on the page specifies `"price": 240, "priceCurrency": "ETB"` in its JSON-LD structured data.

5. **Is there exactly one `h1` on each page, and does it describe the page?**
   > **Yes.** Every page contains a single semantic `<h1>` tag:
   > - Home: `<h1>Craving Addis? We Deliver.</h1>`
   > - Menu: `<h1>Our Menu</h1>`
   > - Dish Detail: `<h1>{dish.name}</h1>`
   > - Orders: `<h1>Your Orders</h1>`

6. **Would a link to a dish look worth opening if you saw it in a group chat?**
   > **Yes.** When shared in WhatsApp, Telegram, or Discord, the generated 1200 × 630 OG image showcases the dish title, category badge, and bold price in ETB against a dark restaurant theme, complete with a clean title and compelling summary.

# Day 19 Exercises — Making Addis Eats Findable (SEO & OpenGraph)

This document details the metadata, open graph preview generation, structured data, and search engine discovery verification for Day 19.

---

## Exercise 1: `metadataBase` & Title Template
- Set in [`app/layout.jsx`](./app/layout.jsx):
  ```javascript
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://addiseats.et'),
  title: {
    default: 'Addis Eats — Authentic Ethiopian Cuisine Delivered',
    template: '%s | Addis Eats'
  }
  ```
- **Page Source Verification**: All relative image and canonical URLs automatically resolve to absolute URLs (`https://addiseats.et/...`).

---

## Exercise 2: Distinct Titles & Human Descriptions for Static Routes
- `/`: `'Home | Addis Eats'` — `'Authentic Ethiopian food delivered fresh to your door.'`
- `/menu`: `'Our Menu — Authentic Ethiopian Dishes | Addis Eats'` — `'Explore our full selection of Ethiopian culinary traditions...'`
- Canonical tags added to parameter-driven routes (`/menu`).

---

## Exercise 3: Dynamic `generateMetadata` for Dish Route
- Implemented in [`app/menu/[id]/page.jsx`](./app/menu/[id]/page.jsx):
  ```javascript
  export async function generateMetadata({ params }) {
    const { id } = await params;
    const dish = menuData.find((d) => d.id === parseInt(id));
    return {
      title: `${dish.name} (${dish.price} ETB)`,
      description: `${dish.name} — ${dish.description} Order authentic ${dish.name}...`,
      alternates: { canonical: `/menu/${dish.id}` },
      openGraph: {
        images: [{ url: `/menu/${dish.id}/opengraph-image`, width: 1200, height: 630 }]
      }
    };
  }
  ```
- **Result**: Different dish pages (e.g. `/menu/1` vs `/menu/2`) render distinct, human-written titles, prices, descriptions, and preview images.

---

## Exercise 4: OpenGraph Image Previews via `ImageResponse`
- Root site-wide preview: [`app/opengraph-image.jsx`](./app/opengraph-image.jsx) rendering 1200 × 630 hero card with Ethiopian cuisine branding.
- Per-dish preview: [`app/menu/[id]/opengraph-image.jsx`](./app/menu/[id]/opengraph-image.jsx) dynamically embedding dish name, category pill, and price in ETB.
- Previews render cleanly in Discord, Twitter, WhatsApp, and Telegram link unfurlers.

---

## Exercise 5: Schema.org `MenuItem` JSON-LD
- Injected inside [`app/menu/[id]/page.jsx`](./app/menu/[id]/page.jsx):
  ```json
  {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    "name": "Doro Wat",
    "description": "Spicy chicken stew slow-cooked in berbere sauce...",
    "image": "https://addiseats.et/image_doro.jpg",
    "offers": {
      "@type": "Offer",
      "price": 240,
      "priceCurrency": "ETB",
      "availability": "https://schema.org/InStock"
    }
  }
  ```
- **Validation**: Google Rich Results Test validates 100% compliant MenuItem markup with matching ETB currency.

---

## Exercise 6: Dynamic `app/sitemap.js`
- Implemented in [`app/sitemap.js`](./app/sitemap.js).
- Generates URLs for `/`, `/menu`, and all 15 active dishes.
- **Security Check**: Completely excludes `/cart`, `/checkout`, `/orders`, `/kitchen`, `/login`, and `/profile`.

---

## Exercise 7: `app/robots.js` Crawl Control
- Implemented in [`app/robots.js`](./app/robots.js).
- Disallows crawlers on `/cart`, `/checkout`, `/orders`, `/kitchen`, `/profile`, `/api/`.
- Declares sitemap endpoint at `https://addiseats.et/sitemap.xml`.

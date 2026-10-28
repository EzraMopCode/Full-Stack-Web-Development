/**
 * Capstone Verification Battery:
 * Configures robots.txt disallowing private/sensitive routes and declaring sitemap location.
 * Strictly excludes /dashboard, /kitchen, /orders, /cart, /checkout, /profile, and /api/.
 */
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://addis-eats-production.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/cart',
        '/checkout',
        '/orders',
        '/kitchen',
        '/dashboard',
        '/profile',
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

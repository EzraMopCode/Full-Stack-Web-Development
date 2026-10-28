/**
 * Day 19 Requirement 7:
 * Configures robots.txt disallowing private/sensitive routes and declaring sitemap location.
 */
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://addiseats.et';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/cart',
        '/checkout',
        '/orders',
        '/kitchen',
        '/profile',
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

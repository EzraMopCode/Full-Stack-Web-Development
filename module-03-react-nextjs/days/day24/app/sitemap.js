import { menuData } from '@/data/menuData';

/**
 * Day 19 Requirement 6:
 * Generates sitemap.xml dynamically from real menu data.
 * Strictly excludes private routes (/cart, /checkout, /orders, /kitchen, /profile, /login).
 */
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://addis-eats-production.vercel.app';

  // Static public routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic dish routes derived from real records
  const dishRoutes = menuData.map((dish) => ({
    url: `${baseUrl}/menu/${dish.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...dishRoutes];
}

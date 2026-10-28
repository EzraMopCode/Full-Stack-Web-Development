export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://addiscare.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/portal/',
        '/clinic/',
        '/book/',
        '/api/'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

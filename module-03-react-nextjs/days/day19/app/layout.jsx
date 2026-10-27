import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Day 19 Requirement 1: metadataBase & title template with human-written default description
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://addiseats.et'),
  title: {
    default: 'Addis Eats — Authentic Ethiopian Cuisine Delivered',
    template: '%s | Addis Eats',
  },
  description: 'Order sizzling Tibs, comforting Shiro, Doro Wat, and traditional fasting platters delivered hot and fresh across Addis Ababa.',
  keywords: ['Ethiopian Food', 'Addis Ababa Food Delivery', 'Tibs', 'Shiro', 'Doro Wat', 'Kitfo'],
  authors: [{ name: 'Addis Eats Culinary Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    url: 'https://addiseats.et',
    siteName: 'Addis Eats',
    title: 'Addis Eats — Authentic Ethiopian Cuisine Delivered',
    description: 'Fresh, sizzling traditional meals delivered fast across Addis Ababa. Order online with Telebirr and CBE.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Addis Eats — Authentic Ethiopian Cuisine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Addis Eats — Authentic Ethiopian Cuisine Delivered',
    description: 'Fresh, sizzling traditional meals delivered fast across Addis Ababa.',
    creator: '@addiseats',
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <MobileNav />
          </div>
        </Providers>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ADDISEATS01"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

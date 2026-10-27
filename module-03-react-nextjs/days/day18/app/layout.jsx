import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

// Exercise 4: Self-hosted optimized font with zero CLS
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Addis Eats | Authentic Ethiopian Food Delivery',
  description: 'Order sizzling Tibs, comforting Shiro, Doro Wat, and authentic Ethiopian dishes delivered fresh to your door.',
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

        {/* Exercise 5: Third-party analytics script with lazyOnload strategy */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ADDISEATS01"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

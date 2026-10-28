import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://addiscare.vercel.app'),
  title: {
    default: 'AddisCare — Clinic Diary & Appointment Management',
    template: '%s | AddisCare'
  },
  description: 'Specialist medical consultations, doctor appointment scheduling, and patient health diary for clinics in Addis Ababa.',
  openGraph: {
    title: 'AddisCare — Clinic Diary & Appointment Management',
    description: 'Book verified doctors in Addis Ababa, track consultation queue in real time, and download medical records.',
    url: 'https://addiscare.vercel.app',
    siteName: 'AddisCare Clinic Diary',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AddisCare — Clinic Diary & Appointment Management',
    description: 'Book verified doctors in Addis Ababa, track consultation queue in real time, and download medical records.',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-white">
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-teal-600 text-white font-bold rounded-lg shadow-lg"
        >
          Skip to main content
        </a>
        
        <Header />
        
        <main id="main-content" className="flex-1">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}

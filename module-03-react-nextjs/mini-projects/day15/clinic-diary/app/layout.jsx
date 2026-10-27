import './globals.css';
import Header from '../components/Header';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Clinic Diary — Capstone Project',
  description: "A receptionist's view of clinic appointments with Next.js App Router.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app-shell">
            <Header />
            <main>{children}</main>
            <footer>Clinic Diary — capstone project, CodeOps Full Stack.</footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

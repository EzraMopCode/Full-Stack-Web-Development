import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Ezra Mesele | Front-End Developer",
  description:
    "Ezra Mesele — Front-End Developer specializing in React.js, Next.js, and modern web experiences.",
  keywords: ["Front-End Developer", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Ezra Mesele" }],
  openGraph: {
    title: "Ezra Mesele | Front-End Developer",
    description: "Professional portfolio of Ezra Mesele — Front-End Developer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-[family-name:var(--font-poppins)] antialiased`}>
        {children}
      </body>
    </html>
  );
}

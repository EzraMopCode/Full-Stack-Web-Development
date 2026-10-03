import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Way Beeter food delivery system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
          
          {children}
      </body>
    </html>
  );
}

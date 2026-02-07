import type { Metadata } from "next";
import { Inter } from "next/font/google";  // ← Change here
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",      // We'll use this CSS variable
  display: "swap",               // Good FOUT/FOIT handling
  // Optional: If you want specific weights only (Inter is variable by default)
  // weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DiscTracker – Your Disc Golf Companion",
  description: "Track your discs, log throws, analyze flight stats, and manage your bag.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
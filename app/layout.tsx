import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Self-hosted (no Google download at build time, so deploys can't fail on it)
const playfair = localFont({
  src: [
    { path: "./fonts/playfair-display-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/playfair-display-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sambhav Foundation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
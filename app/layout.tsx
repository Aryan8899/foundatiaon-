import type { Metadata } from "next";
import localFont from "next/font/local";
import { LanguageProvider } from "@/main/Languageprovider";
import { DonationProvider } from "@/main/Donationprovider";
import "./globals.css";

// Self-hosted fonts (files live in app/fonts/). No Google download at build
// time, so deploys can't fail on fonts.
// Montserrat = English text (matches the logo). Noto Sans Oriya = Odia text.
const montserrat = localFont({
  src: [
    { path: "./fonts/montserrat-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/montserrat-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/montserrat-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/montserrat-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/montserrat-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/montserrat-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const odia = localFont({
  src: [
    { path: "./fonts/noto-sans-oriya-oriya-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-sans-oriya-oriya-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/noto-sans-oriya-oriya-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/noto-sans-oriya-oriya-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-odia",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sambhav Foundation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${odia.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <DonationProvider>{children}</DonationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
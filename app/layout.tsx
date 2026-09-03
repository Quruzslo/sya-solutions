import React from "react";
import "./styles.css";
import { Playfair_Display, Inter } from "next/font/google";
import { Metadata } from "next";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import ScrollToTop from "../components/srolltoTop";
import CookieBanner from "../components/cookieBanner/CookieBanner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HashScrollHandler from "@/components/HashScrollHandler";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sya-solutions.hu"),
  title: {
    default: "Független Pénzügyi Tanácsadás | SYA Solutions",
    template: "%s | SYA Solutions",
  },
  description:
    "Független pénzügyi tanácsadás magánszemélyeknek, családoknak és vállalkozásoknak. Személyre szabott stratégiák, hitel- és vagyonépítési megoldások.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "SYA Solutions – Független Pénzügyi Tanácsadás",
    description:
      "Független pénzügyi tanácsadás magánszemélyeknek, családoknak és vállalkozásoknak. Személyre szabott stratégiák és megbízható szakmai háttér.",
    url: "https://www.sya-solutions.hu",
    siteName: "SYA Solutions",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SYA Solutions – Független Pénzügyi Tanácsadás",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SYA Solutions – Független Pénzügyi Tanácsadás",
    description:
      "Független pénzügyi tanácsadás magánszemélyeknek, családoknak és vállalkozásoknak.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className={`${playfair.variable} ${inter.variable}`}>
      <body data-theme="light" className="flex flex-col min-h-screen ">
        <Header></Header>
        <main className="flex-1 flex flex-col w-full ">{children}</main>
        <HashScrollHandler />
        <ScrollToTop />
        <Footer></Footer>
        <SpeedInsights />
        <CookieBanner />
      </body>
    </html>
  );
}

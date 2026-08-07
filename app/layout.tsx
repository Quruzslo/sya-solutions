import React from "react";
import "./styles.css";
import { Playfair_Display, Inter } from "next/font/google";
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

export const metadata = {
  metadataBase: new URL("https://www.sya-solutions.hu"),
  description:
    "Személyre szabott pénzügyi segítség az egész családnak, vállalkozóknak és magánszemélyeknek.",
  alternates: {
    canonical: "/",
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

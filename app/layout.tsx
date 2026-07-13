import React from "react";
import "./styles.css";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import ScrollToTop from "../components/srolltoTop";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "S.Y.A Solutions",
  description:
    "Személyre szabott pénzügyi segítség az egész családnak, vállalkozóknak és magánszemélyeknek.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen bg-[var(--color-feher)]">
        <Header></Header>
        <main className="flex-1 flex flex-col w-full ">{children}</main>
        <ScrollToTop />
        <Footer></Footer>
        <SpeedInsights />
      </body>
    </html>
  );
}

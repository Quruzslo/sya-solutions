import React from 'react'
import './styles.css'
import { Playfair_Display } from 'next/font/google'
import { Inter } from 'next/font/google'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  description: 'Személyre szabott pénzügyi segítség az egész családnak',
  title: 'S.Y.A Solutions',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  )
}

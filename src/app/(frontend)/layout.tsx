import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Személyre szabott pénzügyi segítség az egész családnak',
  title: 'S.Y.A Solutions',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="hu">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

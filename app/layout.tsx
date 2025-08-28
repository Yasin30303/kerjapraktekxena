import type { Metadata } from 'next'
import './globals.css'
import {Inter} from 'next/font/google'
export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}
const InterFont = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${InterFont.className}`}>
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navigation/Navbar'
import Footer from './components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Signapse - AI Sign Language Translation',
  description: 'Experience the future of accessibility with AI-powered ISL translation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // We can't directly pass functions between layout and page components
  // The Navbar has internal handling for this
  return (
    <html lang="en" className={`${inter.variable} overflow-x-hidden`}>
      <body className="font-sans overflow-x-hidden">
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
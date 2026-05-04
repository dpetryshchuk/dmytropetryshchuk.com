import type { Metadata } from 'next'
import { Source_Serif_4, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['300', '400', '600'],
})

const sans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '600', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Dmytro Petryshchuk',
  description: 'Builder. Curious about people and systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Source_Serif_4, Montserrat, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ScrollProgress } from '@/components/ScrollProgress'

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['400', '600'],
})

const sans = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
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
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}

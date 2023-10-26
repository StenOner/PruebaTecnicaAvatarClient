import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Scroll from '@/components/ui/Scroll'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'One Piece Movies',
  description: 'Make a list from your favourite One Piece movies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Scroll />
      <body className={inter.className}>
        <Header />
        <main className='flex min-h-screen w-full flex-col p-10'>
          {children}
        </main>
      </body>
    </html>
  )
}

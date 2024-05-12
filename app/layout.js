import { Oswald } from 'next/font/google'
import './globals.css'

import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

const inter = Oswald({ subsets: ['latin'] })

export const metadata = {
  title: 'SHARE EASY',
  description: 'FILE SHARING APP -> POWERED BY NEXTJS',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />

          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

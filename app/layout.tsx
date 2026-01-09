import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'No-Code Platform - Build Websites Without Code',
  description: 'Drag and drop your way to a beautiful website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


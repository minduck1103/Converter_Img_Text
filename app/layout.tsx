import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Converter',
  description: 'Convert Image to something',
  generator: 'cud-dev',
  icons: {
    icon:'/favicon.png',
    shortcut: '/favicon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

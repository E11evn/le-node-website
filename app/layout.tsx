import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'le-node — GTM on autopilot',
  description:
    'Plug-and-play AI for revenue teams. Automate outbound, enrich leads, and run ABM campaigns — without touching code.',
  metadataBase: new URL('https://le-node.com'),
  openGraph: {
    title: 'le-node — GTM on autopilot',
    description: 'Plug-and-play AI for revenue teams.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import SectionLineObserver from '@/components/SectionLineObserver'

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
      <body>
        {/* Site-wide structural frame: left and right content boundaries */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]">
          <div className="relative h-full max-w-[72rem] mx-auto">
            <div className="absolute left-0  top-0 bottom-0 w-px" style={{ background: 'rgba(128,128,128,0.18)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: 'rgba(128,128,128,0.18)' }} />
          </div>
        </div>
        <SectionLineObserver />
        {children}
      </body>
    </html>
  )
}

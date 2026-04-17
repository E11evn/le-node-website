import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Nanum_Myeongjo, Open_Sans } from 'next/font/google'
import './globals.css'
import ScrollReveal from '@/components/ScrollReveal'

const nanum = Nanum_Myeongjo({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-nanum',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${nanum.variable} ${openSans.variable}`}>
      <body>
        {/* Site-wide structural frame: left and right content boundaries */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]">
          <div className="relative h-full max-w-[72rem] mx-auto">
            <div className="vline absolute left-0  top-0 bottom-0 w-px" />
            <div className="vline absolute right-0 top-0 bottom-0 w-px" />
          </div>
        </div>
        <ScrollReveal />
        {children}
      </body>
    </html>
  )
}

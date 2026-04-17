/**
 * /sandbox — archived original homepage.
 *
 * Not linked from the main navigation and excluded from search results.
 */

import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import WhyLeNode from '@/components/WhyLeNode'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sandbox — le-node',
  robots: { index: false, follow: false },
}

export default function SandboxPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Social proof strip */}
        <div className="border-y border-border py-10">
          <div className="container-content">
            <p className="text-sm text-muted text-center mb-8 uppercase tracking-widest font-medium">
              Trusted by revenue teams
            </p>
            <div className="flex items-center justify-center gap-10 flex-wrap">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-6 w-24 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>

        <HowItWorks />
        <WhyLeNode />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}

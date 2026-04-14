'use client'
import { useState } from 'react'
import Link from 'next/link'
import HeroBackground from './HeroBackground'
import NodeLoader from './NodeLoader'

export default function Hero() {
  const [computing, setComputing] = useState(false)

  return (
    <section
      className="relative overflow-hidden bg-white no-top-line no-reveal"
      style={{ minHeight: '80vh', maxHeight: '80vh', paddingTop: '6rem', paddingBottom: '4rem', display: 'flex', alignItems: 'center' }}
    >
      {/* Layer 1 — animated background (grid + floating icons) */}
      <HeroBackground onSetComputing={setComputing} />

      {/* Layer 1.5 — NodeLoader centered in hero */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
        <NodeLoader computing={computing} />
      </div>

      {/* Layer 2 — hero text: tag → h1 → spacer → explanation → CTA */}
      <div className="relative z-10 container-content text-center max-w-3xl mx-auto w-full">

        {/* Tag + h1 raised slightly higher */}
        <div style={{ marginTop: '-48px' }}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#0043FA] bg-[#EEF3FF] mb-6">
            <span
              className="animate-dot-glow"
              style={{ width: 10, height: 10, borderRadius: '50%', background: '#0043FA', display: 'inline-block', flexShrink: 0, ['--glow-color' as string]: 'rgba(0, 67, 250, 0.6)' }}
            />
            <span style={{ color: '#0043FA', fontSize: '1rem', fontWeight: 500 }}>AI-native operating system</span>
          </div>

          <h1 className="text-display font-bold text-[#1D1D22] mb-4">
            Your GTM Motion,
            <br />
            <span style={{ color: '#0043FA' }}>on Autopilot.</span>
          </h1>
        </div>

        {/* Spacer — reserves vertical room for the NodeLoader (60px + equal margins) */}
        <div style={{ height: '100px' }} />

        <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed mb-10">
          le-node orchestrates the best-in-class GTM tools to automatically identify
          and engage with your ideal customers, and gets back to you with opportunities.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/waitlist" className="btn-primary text-base px-6 py-3">
            Join waitlist
          </Link>
          <a
            href="#how-it-works"
            className="text-base font-medium text-[#0043FA] hover:underline"
          >
            Discover how that works →
          </a>
        </div>

      </div>
    </section>
  )
}

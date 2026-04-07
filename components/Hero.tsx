import Link from 'next/link'
import HeroBackground from './HeroBackground'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-white no-top-line"
      style={{ minHeight: '80vh', paddingTop: '6rem', paddingBottom: '4rem', display: 'flex', alignItems: 'center' }}
    >
      {/* Layer 1 — animated background (grid + floating icons) */}
      <HeroBackground />

      {/* Layer 2 — hero text: h1 → CTA → explanation */}
      <div className="relative z-10 container-content text-center max-w-3xl mx-auto">

        <h1 className="text-display font-bold text-[#1D1D22] mb-10">
          Your entire GTM motion.
          <br />
          <span style={{ color: '#0043FA' }}>On autopilot.</span>
        </h1>

        {/* Primary CTA — future beam target from floating icons */}
        <div className="mb-10">
          <Link href="/waitlist" className="btn-primary text-base px-6 py-3">
            Join waitlist
          </Link>
        </div>

        <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
          le-node handles the research, outreach, and enrichment — so your team
          focuses on closing. No code. No complexity. Just pipeline.
        </p>

      </div>
    </section>
  )
}

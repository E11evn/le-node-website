import Link from 'next/link'
import HeroBackground from './HeroBackground'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-white !border-t-0"
      style={{ minHeight: '80vh', paddingTop: '6rem', paddingBottom: '4rem', display: 'flex', alignItems: 'center' }}
    >
      {/* Layer 1 — animated illustration */}
      <HeroBackground />

      {/* Layer 2 — hero text */}
      <div className="relative z-10 container-content text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0043FA] text-xs font-semibold tracking-wide mb-8">
          AI-native GTM automation
        </div>

        <h1 className="text-display font-bold text-[#1D1D22] mb-6">
          Your entire GTM motion.
          <br />
          <span style={{ color: '#0043FA' }}>On autopilot.</span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 leading-relaxed">
          le-node handles the research, outreach, and enrichment — so your team
          focuses on closing. No code. No complexity. Just pipeline.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/waitlist" className="btn-primary text-base px-6 py-3">
            Join waitlist
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center text-base px-6 py-3 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors duration-150"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  )
}

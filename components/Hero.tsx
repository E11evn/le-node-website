import Link from 'next/link'
import HeroBackground from './HeroBackground'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[580px] bg-[#0D0E14] !border-t-0"
      style={{ paddingTop: '6rem', paddingBottom: '4rem' }}
    >
      {/* Layer 1 — animated illustration */}
      <HeroBackground />

      {/* Layer 2 — radial dark gradient so text is readable over the animation */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 56% at 50% 50%, rgba(8,8,16,0.90) 0%, rgba(8,8,16,0.50) 55%, transparent 100%)',
        }}
      />

      {/* Layer 3 — hero text */}
      <div className="relative z-10 container-content text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-wide mb-8">
          AI-native GTM automation
        </div>

        <h1 className="text-display font-bold text-white mb-6">
          Your entire GTM motion.
          <br />
          <span style={{ color: '#0043FA' }}>On autopilot.</span>
        </h1>

        <p className="text-xl text-white/60 mb-10 leading-relaxed">
          le-node handles the research, outreach, and enrichment — so your team
          focuses on closing. No code. No complexity. Just pipeline.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/waitlist" className="btn-primary text-base px-6 py-3">
            Join waitlist
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center text-base px-6 py-3 rounded-lg border border-white/20 text-white/75 font-medium hover:bg-white/10 transition-colors duration-150"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  )
}
